using System;

namespace FaceGame.ViewModels.Data
{
    public class HiscoreVM
    {
        public string Name { get; set; }
        public string Id { get; set; }
        public int Score { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
