namespace FaceGame.ViewModels.State
{
    /// <summary>
    /// A player's current game state.
    /// </summary>
    public class StateVM
    {
        public FaceVM[] Faces { get; set; }
        public int Score { get; set; }
        public bool IsFinished { get; set; }
    }
}
