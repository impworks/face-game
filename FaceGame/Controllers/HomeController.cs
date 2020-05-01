using System.Web.Mvc;
using FaceGame.Code;
using FaceGame.ViewModels.Data;
using FaceGame.ViewModels.State;

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

        private StateVM State
        {
            get { return System.Web.HttpContext.Current.Session[nameof(StateVM)] as StateVM; }
            set { System.Web.HttpContext.Current.Session[nameof(StateVM)] = value; }
        }

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
            if (State == null)
                return RedirectToAction("Rules");

            return View();
        }

        /// <summary>
        /// Displays the hiscore table.
        /// </summary>
        public ActionResult Scores()
        {
            var states = _stateMgr.GetAllStates();
            return View(new ScoreListVM { Plays = states });
        }
    }
}
