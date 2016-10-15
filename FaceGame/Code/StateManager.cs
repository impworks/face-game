﻿using System;
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
        public IdentificationResponseVM Identificate(StateVM state, IdentificationVM ident)
        {
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

        /// <summary>
        /// Checks if the given version matches the definition.
        /// </summary>
        private static bool IsCorrect(string def, string opt)
        {
            opt = Clean(opt);
            return Clean(def).Split(',').Any(x => x == opt);
        }

        #endregion
    }
}
