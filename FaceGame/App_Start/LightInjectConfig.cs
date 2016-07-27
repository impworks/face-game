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

            container.Register<HiscoreManager>(new PerRequestLifeTime());
            container.Register<StateManager>(new PerRequestLifeTime());

            container.EnableMvc();
        }
    }
}
