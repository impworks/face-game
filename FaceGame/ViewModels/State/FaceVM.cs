namespace FaceGame.ViewModels.State
{
    /// <summary>
    /// Information about a person whose name should be guessed.
    /// </summary>
    public class FaceVM
    {
        public int Id { get; set; }

        public int X { get; set; }
        public int Y { get; set; }

        public int Width { get; set; }
        public int Height { get; set; }

        public bool HasMiddleName { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }

        /// <summary>
        /// Returns a copy of the face definition, but with empty info.
        /// </summary>
        public FaceVM CreateBlankCopy()
        {
            return new FaceVM
            {
                Id = Id,
                X = X,
                Y = Y,
                Width = Width,
                Height = Height,
                HasMiddleName = HasMiddleName
            };
        }
    }
}
