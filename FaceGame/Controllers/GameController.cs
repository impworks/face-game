using System;
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
        public GameController(StateManager stateMgr)
        {
            _stateManager = stateMgr;
        }

        private readonly StateManager _stateManager;

        private StateVM State
        {
            get { return HttpContext.Current.Session[nameof(StateVM)] as StateVM; }
            set { HttpContext.Current.Session[nameof(StateVM)] = value; }
        }

        /// <summary>
        /// Creates new state.
        /// </summary>
        [HttpPost, Route("play")]
        public StateVM Play(PlayVM request)
        {
            return State = _stateManager.CreateNewState(request.Name);
        }

        /// <summary>
        /// Requests current state.
        /// </summary>
        [Route("state")]
        [HttpGet]
        public StateVM GetState()
        {
            if (State == null)
                throw new Exception("No state");

            _stateManager.PatchState(State);

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

            return _stateManager.Identify(State.Id, request);
        }

        /// <summary>
        /// Completes the game and (possibly) adds the user's name to the scoreboard.
        /// </summary>
        [Route("complete")]
        [HttpPost]
        public int Complete(PlayVM vm)
        {
            if (State == null || State.Score == 0 || State.IsFinished || string.IsNullOrEmpty(vm.Name))
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            var rank = _stateManager.FinishGame(State);
            State = null;
            return rank;
        }

        /// <summary>
        /// Defines a new face.
        /// </summary>
        [Route("define")]
        [HttpPost]
        public void Design(FaceVM face)
        {
            var req = HttpContext.Current.Request;
            var auth = req.Url.Authority;

            if (!auth.StartsWith("localhost"))
                return;

            _stateManager.Define(face);
        }
    }
}
