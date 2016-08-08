using System.Web.Http;
using FaceGame.Code;
using FaceGame.ViewModels.Messages;

namespace FaceGame.Controllers
{
    /// <summary>
    /// The game-handler controller.
    /// </summary>
    [RoutePrefix("~/api/")]
    public class GameController: ApiController
    {
        public GameController(HiscoreManager hiscoreMgr, StateManager stateMgr)
        {
            _hiscoreManager = hiscoreMgr;
            _stateManager = stateMgr;
        }

        private readonly HiscoreManager _hiscoreManager;
        private readonly StateManager _stateManager;
        
        /// <summary>
        /// Checks an identification attempt.
        /// </summary>
        [Route("identify")]
        [HttpPost]
        public IdentificationResponseVM Identify(IdentificationVM request)
        {
            // todo
            return new IdentificationResponseVM();
        }

        /// <summary>
        /// Completes the game and (possibly) adds the user's name to the scoreboard.
        /// </summary>
        [Route("complete")]
        [HttpPost]
        public int Complete(string name)
        {
            // todo
            return 1;
        }
    }
}
