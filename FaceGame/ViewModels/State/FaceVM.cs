namespace FaceGame.ViewModels.State
{
    /// <summary>
    /// Information about a person whose name should be guessed.
    /// </summary>
    public class FaceVM
    {
        public int Id { get; set; }

        public int X1 { get; set; }
        public int Y1 { get; set; }

        public int X2 { get; set; }
        public int Y2 { get; set; }

        public bool HasMiddleName { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }

        public bool? FirstNameState { get; set; }
        public bool? LastNameState { get; set; }
        public bool? MiddleNameState { get; set; }

        /// <summary>
        /// Returns a copy of the face definition, but with empty info.
        /// </summary>
        public FaceVM CreateBlankCopy()
        {
            return new FaceVM
            {
                Id = Id,
                X1 = X1,
                Y1 = Y1,
                X2 = X2,
                Y2 = Y2,
                HasMiddleName = HasMiddleName
            };
        }
    }
}
