namespace FaceGame.ViewModels.Messages
{
    /// <summary>
    /// Result of an identification check.
    /// </summary>
    public class IdentificationResponseVM
    {
        public bool IsFirstNameCorrect { get; set; }
        public bool IsLastNameCorrect { get; set; }
        public bool IsMiddleCorrect { get; set; }

        public int ScoreAdded { get; set; }
    }
}
