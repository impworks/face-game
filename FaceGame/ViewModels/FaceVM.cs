namespace FaceGame.ViewModels
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
    }
}
