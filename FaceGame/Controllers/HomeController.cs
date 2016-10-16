using System.Web.Mvc;
using FaceGame.Code;

namespace FaceGame.Controllers
{
    /// <summary>
    /// Main controller for view pages.
    /// </summary>
    public class HomeController : Controller
    {
        public HomeController(HiscoreManager hiscoreMgr)
        {
            _hiscoreMgr = hiscoreMgr;
        }

        private readonly HiscoreManager _hiscoreMgr;

        /// <summary>
        /// Displays the rules.
        /// </summary>
        public ActionResult Rules()
        {
            return View();
        }

        /// <summary>
        /// Displays the main game screen.
        /// </summary>
        public ActionResult Game()
        {
            return View();
        }

        /// <summary>
        /// Displays the hiscore table.
        /// </summary>
        public ActionResult Hiscores()
        {
            var scores = _hiscoreMgr.Hiscores;
            return View(scores);
        }
    }
}
