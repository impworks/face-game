using System.Web.Http;
using FaceGame.Code;
using LightInject;

namespace FaceGame
{
    public class LightInjectConfig
    {
        public static void Configure()
        {
            var container = new ServiceContainer();
            container.RegisterControllers();
            container.RegisterApiControllers();

            container.Register<StateManager>(new PerRequestLifeTime());

            container.EnablePerWebRequestScope();
            container.EnableWebApi(GlobalConfiguration.Configuration);

            container.EnableMvc();
        }
    }
}
