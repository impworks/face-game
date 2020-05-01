using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using FaceGame.ViewModels.Data;
using FaceGame.ViewModels.Messages;
using FaceGame.ViewModels.State;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace FaceGame.Code
{
    /// <summary>
    /// Gameplay state manager.
    /// </summary>
    public class StateManager
    {
        private const string DEFINITION_PATH = "~/Content/group.json";
        private const string STATES_PATH = "~/Content/states.json";
        private const string LOG_PATH = "~/Content/logs/actions.{0}.json";

        public const int FIRST_NAME_SCORE = 10;
        public const int LAST_NAME_SCORE = 5;
        public const int MIDDLE_NAME_SCORE = 30;

        private static GroupDefinitionVM _group;
        private static GroupDefinitionVM Group => _group ?? (_group = LoadGroupDefinition());

        private static List<StateVM> _states;
        private static List<StateVM> States => _states ?? (_states = LoadStates());

        #region Public methods

        /// <summary>
        /// Creates a new state for a new player.
        /// </summary>
        public StateVM CreateNewState(string name)
        {
            var state = new StateVM
            {
                Id = Guid.NewGuid().ToString().Substring(0, 8),
                Name = name,
                Start =  DateTime.Now,
                Faces = Group.Faces.Select(x => x.CreateBlankCopy()).ToArray()
            };

            States.Add(state);
            SaveStates(States);

            return state;
        }

        /// <summary>
        /// Validates an identification attempt.
        /// </summary>
        public IdentificationResponseVM Identify(string sid, IdentificationVM ident)
        {
            var state = States.FirstOrDefault(x => x.Id == sid);
            if(state == null)
                throw new Exception("State not found.");

            var face = state.Faces.FirstOrDefault(x => x.Id == ident.Id);
            if(face == null)
                throw new ArgumentException("Face not found!");

            if(new[] { face.FirstName, face.LastName, face.MiddleName }.Any(x => !string.IsNullOrEmpty(x)))
                throw new ArgumentException("Face already detected!");

            var faceDef = Group.Faces.First(x => x.Id == ident.Id);

            face.FirstName = ident.FirstName;
            face.LastName = ident.LastName;
            if (faceDef.HasMiddleName)
                face.MiddleName = ident.MiddleName;

            var result = new IdentificationResponseVM
            {
                IsFirstNameCorrect = IsCorrect(faceDef.FirstName, face.FirstName),
                IsLastNameCorrect = IsCorrect(faceDef.LastName, face.LastName),
                IsMiddleNameCorrect = faceDef.HasMiddleName && IsCorrect(faceDef.MiddleName, face.MiddleName)
            };

            result.ScoreAdded = (result.IsFirstNameCorrect ? FIRST_NAME_SCORE : 0)
                                + (result.IsLastNameCorrect ? LAST_NAME_SCORE : 0)
                                + (result.IsMiddleNameCorrect ? MIDDLE_NAME_SCORE : 0);

            state.Score += result.ScoreAdded;

            face.FirstNameState = result.IsFirstNameCorrect;
            face.LastNameState = result.IsLastNameCorrect;
            face.MiddleNameState = result.IsMiddleNameCorrect;

            LogIdentification(state, ident);

            SaveStates(States);

            return result;
        }

        /// <summary>
        /// Creates a new face.
        /// </summary>
        public void Define(FaceVM face)
        {
            face.HasMiddleName = !string.IsNullOrEmpty(face.MiddleName);
            face.FirstNameState = face.LastNameState = face.MiddleNameState = null;
            face.Id = Group.Faces.Any() ? Group.Faces.Select(x => x.Id).Max() + 1 : 1;

            Group.Faces.Add(face);

            var data = JsonConvert.SerializeObject(Group, Formatting.Indented);
            File.WriteAllText(HttpContext.Current.Server.MapPath(DEFINITION_PATH), data);
        }

        /// <summary>
        /// Pushes newly-added faces to state.
        /// </summary>
        public void PatchState(StateVM state)
        {
            if (state.Faces.Length == Group.Faces.Count)
                return;

            var newFaces = Group.Faces.Where(x => !state.Faces.Any(y => y.Id == x.Id));
            state.Faces = state.Faces.Concat(newFaces).ToArray();
        }

        /// <summary>
        /// Marks the game as finished.
        /// </summary>
        public int FinishGame(StateVM state)
        {
            state.IsFinished = true;
            state.End = DateTime.Now;

            foreach (var face in state.Faces)
            {
                face.FirstNameState = face.FirstNameState ?? false;
                face.LastNameState = face.LastNameState ?? false;
                if (face.HasMiddleName)
                    face.MiddleNameState = face.MiddleNameState ?? false;
            }

            SaveStates(States);

            return States.OrderByDescending(x => x.Score)
                         .Select((x, idx) => new {Id = x.Id, Rank = idx + 1})
                         .First(x => x.Id == state.Id)
                         .Rank;
        }

        /// <summary>
        /// Returns the list of all states.
        /// </summary>
        public IReadOnlyList<StateVM> GetAllStates()
        {
            return States;
        }

        #endregion

        #region Helpers

        /// <summary>
        /// Loads group definition from disk.
        /// </summary>
        private static GroupDefinitionVM LoadGroupDefinition()
        {
            var path = HttpContext.Current.Server.MapPath(DEFINITION_PATH);
            var data = File.ReadAllText(path);
            return JsonConvert.DeserializeObject<GroupDefinitionVM>(data);
        }

        /// <summary>
        /// Loads known states.
        /// </summary>
        private static List<StateVM> LoadStates()
        {
            var path = HttpContext.Current.Server.MapPath(STATES_PATH);
            if(!File.Exists(path))
                return new List<StateVM>();

            var data = File.ReadAllText(path);
            return JsonConvert.DeserializeObject<List<StateVM>>(data);
        }

        /// <summary>
        /// Saves states to disk.
        /// </summary>
        private static void SaveStates(List<StateVM> states)
        {
            var path = HttpContext.Current.Server.MapPath(STATES_PATH);
            var data = JsonConvert.SerializeObject(states, Formatting.Indented);
            File.WriteAllText(path, data);
        }

        /// <summary>
        /// Checks if the entered name matches expected value.
        /// </summary>
        private static string Clean(string name)
        {
            return name?.ToLowerInvariant().Trim().Replace("ё", "е");
        }

        /// <summary>
        /// Checks if the given version matches the definition.
        /// </summary>
        private static bool IsCorrect(string def, string opt)
        {
            opt = Clean(opt);
            return Clean(def).Split(',').Any(x => x == opt);
        }

        /// <summary>
        /// Logs the identification to current user's action log.
        /// </summary>
        private static void LogIdentification(StateVM state, IdentificationVM vm)
        {
            var filePath = HttpContext.Current.Server.MapPath(string.Format(LOG_PATH, state.Id));
            Directory.CreateDirectory(Path.GetDirectoryName(filePath));

            var array = new JArray();
            if (File.Exists(filePath))
            {
                var rawData = File.ReadAllText(filePath);
                array = JArray.Parse(rawData);
            }

            var data = JObject.FromObject(new IdentificationLogVM
            {
                Date = DateTime.Now,
                IP = HttpContext.Current.Request.UserHostAddress,
                Content = vm
            });

            array.Add(data);

            File.WriteAllText(filePath, array.ToString(Formatting.Indented));
        }

        #endregion
    }
}

