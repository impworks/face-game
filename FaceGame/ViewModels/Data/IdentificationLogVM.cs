using System;
using FaceGame.ViewModels.Messages;

namespace FaceGame.ViewModels.Data
{
    public class IdentificationLogVM
    {
        public IdentificationVM Content { get; set; }

        public DateTime Date { get; set; }
        public string IP { get; set; }
    }
}
