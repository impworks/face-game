using System.Web;
using System.Web.Http;
using FaceGame.Code;
using FaceGame.ViewModels.Messages;
using FaceGame.ViewModels.State;

namespace FaceGame.Controllers
{
    /// <summary>
    /// The game-handler controller.
    /// </summary>
    [RoutePrefix("~/api")]
    public class GameController: ApiController
    {
        public GameController(HiscoreManager hiscoreMgr, StateManager stateMgr)
        {
            _hiscoreManager = hiscoreMgr;
            _stateManager = stateMgr;
        }

        private readonly HiscoreManager _hiscoreManager;
        private readonly StateManager _stateManager;

        private StateVM State => HttpContext.Current.Session[nameof(StateVM)] as StateVM;

        /// <summary>
        /// Requests current state or creates a new one.
        /// </summary>
        [Route("state")]
        [HttpGet]
        public StateVM GetState()
        {
            if (State == null)
                HttpContext.Current.Session[nameof(StateVM)] = _stateManager.CreateNewState();

            return State;
        }
        
        /// <summary>
        /// Checks an identification attempt.
        /// </summary>
        [Route("identify")]
        [HttpPost]
        public IdentificationResponseVM Identify(IdentificationVM request)
        {
            if (State == null)
                return null;

            return _stateManager.Identificate(State, request);
        }

        /// <summary>
        /// Completes the game and (possibly) adds the user's name to the scoreboard.
        /// </summary>
        [Route("complete")]
        [HttpPost]
        public int Complete(string name)
        {
            if (State == null)
                return 0;

            _hiscoreManager.AddHiscore(name, State.Score);
            return State.Score;
        }
    }
}
