using System;
using System.IO;
using System.Linq;
using System.Web;
using FaceGame.ViewModels.Data;
using FaceGame.ViewModels.Messages;
using FaceGame.ViewModels.State;
using Newtonsoft.Json;

namespace FaceGame.Code
{
    /// <summary>
    /// Gameplay state manager.
    /// </summary>
    public class StateManager
    {
        private const string FILE_PATH = "~/Content/group.json";

        private const int FIRST_NAME_SCORE = 5;
        private const int LAST_NAME_SCORE = 5;
        private const int MIDDLE_NAME_SCORE = 20;

        private static GroupDefinitionVM _group;
        private static GroupDefinitionVM Group => _group ?? (_group = LoadGroupDefinition());

        #region Public methods

        /// <summary>
        /// Creates a new state for a new player.
        /// </summary>
        public StateVM CreateNewState()
        {
            return new StateVM
            {
                Score = 0,
                Faces = Group.Faces.Select(x => x.CreateBlankCopy()).ToArray()
            };
        }

        /// <summary>
        /// Validates an identification attempt.
        /// </summary>
        public IdentificationResponseVM ApplyResponse(StateVM state, IdentificationVM ident)
        {
            var face = state.Faces.FirstOrDefault(x => x.Id == ident.Id);
            if(face == null)
                throw new ArgumentException("Face not found!");

            if(new[] { face.FirstName, face.LastName, face.MiddleName }.Any(x => !string.IsNullOrEmpty(x)))
                throw new ArgumentException("Face already detected!");

            var result = new IdentificationResponseVM
            {
                IsFirstNameCorrect = Clean(face.FirstName) == Clean(ident.FirstName),
                IsLastNameCorrect = Clean(face.LastName) == Clean(ident.LastName),
                IsMiddleNameCorrect = face.HasMiddleName && Clean(face.MiddleName) == Clean(ident.MiddleName)
            };

            result.ScoreAdded = (result.IsFirstNameCorrect ? FIRST_NAME_SCORE : 0)
                                + (result.IsLastNameCorrect ? LAST_NAME_SCORE : 0)
                                + (result.IsMiddleNameCorrect ? MIDDLE_NAME_SCORE : 0);

            state.Score += result.ScoreAdded;

            return result;
        }

        #endregion

        #region Helpers

        /// <summary>
        /// Loads group definition from disk.
        /// </summary>
        private static GroupDefinitionVM LoadGroupDefinition()
        {
            var path = HttpContext.Current.Server.MapPath(FILE_PATH);
            var data = File.ReadAllText(path);
            return JsonConvert.DeserializeObject<GroupDefinitionVM>(data);
        }

        /// <summary>
        /// Checks if the entered name matches expected value.
        /// </summary>
        private static string Clean(string name)
        {
            return name?.ToLowerInvariant().Trim().Replace("ё", "е");

        }

        #endregion
    }
}
