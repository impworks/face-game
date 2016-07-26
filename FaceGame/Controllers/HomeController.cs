using System.Collections.Generic;
using System.Web.Mvc;
using FaceGame.ViewModels;
using Newtonsoft.Json;
using FileIO = System.IO.File;

namespace FaceGame.Controllers
{
    /// <summary>
    /// Main controller for view pages.
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// Displays the main game screen.
        /// </summary>
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Displays the hiscore table.
        /// </summary>
        public ActionResult Hiscores()
        {
            var scoresVm = LoadHiscores();
            return View(scoresVm);
        }

        /// <summary>
        /// Loads hiscores from server.
        /// </summary>
        private HiscoreListVM LoadHiscores()
        {
            var path = Server.MapPath("~/Content/hiscores.json");
            if (!FileIO.Exists(path))
                return new HiscoreListVM {Scores = new List<HiscoreVM>()};

            var contents = FileIO.ReadAllText(path);
            var data = JsonConvert.DeserializeObject<HiscoreListVM>(contents);
            return data;
        }
    }
}
