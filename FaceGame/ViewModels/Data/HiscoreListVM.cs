﻿using System.Collections.Generic;
using FaceGame.ViewModels.State;

namespace FaceGame.ViewModels.Data
{
    public class HiscoreListVM
    {
        public IReadOnlyList<StateVM> Plays { get; set; }
    }
}
