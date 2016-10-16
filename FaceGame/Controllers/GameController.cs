using System.Net;
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
    [RoutePrefix("api")]
    public class GameController: ApiController
    {
        public GameController(HiscoreManager hiscoreMgr, StateManager stateMgr)
        {
            _hiscoreManager = hiscoreMgr;
            _stateManager = stateMgr;
        }

        private readonly HiscoreManager _hiscoreManager;
        private readonly StateManager _stateManager;

        private StateVM State
        {
            get { return HttpContext.Current.Session[nameof(StateVM)] as StateVM; }
            set { HttpContext.Current.Session[nameof(StateVM)] = value; }
        } 

        /// <summary>
        /// Requests current state or creates a new one.
        /// </summary>
        [Route("state")]
        [HttpGet]
        public StateVM GetState()
        {
            if (State == null)
                State = _stateManager.CreateNewState();

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
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            return _stateManager.Identificate(State, request);
        }

        /// <summary>
        /// Completes the game and (possibly) adds the user's name to the scoreboard.
        /// </summary>
        [Route("complete")]
        [HttpPost]
        public int Complete(CompletionVM vm)
        {
            if (State == null || State.Score == 0 || State.IsFinished || string.IsNullOrEmpty(vm.Name))
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            State.IsFinished = true;
            var rank = _hiscoreManager.AddHiscore(vm.Name, State.Score);

            return rank;
        }
    }
}
