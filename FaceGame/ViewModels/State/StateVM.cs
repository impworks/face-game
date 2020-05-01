using System;

namespace FaceGame.ViewModels.State
{
    /// <summary>
    /// A player's current game state.
    /// </summary>
    public class StateVM
    {
        public string Name { get; set; }
        public string Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime? End { get; set; }

        public FaceVM[] Faces { get; set; }
        public int Score { get; set; }

        public bool IsFinished { get; set; }
    }
}
