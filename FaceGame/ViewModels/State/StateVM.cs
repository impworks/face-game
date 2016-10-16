using System;

namespace FaceGame.ViewModels.State
{
    /// <summary>
    /// A player's current game state.
    /// </summary>
    public class StateVM
    {
        public string Id { get; set; }
        public DateTime Start { get; set; }

        public FaceVM[] Faces { get; set; }
        public int Score { get; set; }

        public bool IsFinished { get; set; }
    }
}
