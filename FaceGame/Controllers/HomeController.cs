using System.Web.Mvc;
using FaceGame.Code;
using FaceGame.ViewModels.Data;

namespace FaceGame.Controllers
{
    /// <summary>
    /// Main controller for view pages.
    /// </summary>
    public class HomeController : Controller
    {
        public HomeController(StateManager stateMgr)
        {
            _stateMgr = stateMgr;
        }

        private readonly StateManager _stateMgr;

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
            var states = _stateMgr.GetAllStates();
            return View(new HiscoreListVM { Plays = states });
        }
    }
}
