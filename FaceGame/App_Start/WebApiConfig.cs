using System.Web.Http;

namespace FaceGame
{
    public static class WebApiConfig
    {
        public static string UrlPrefix => "api";
        public static string UrlPrefixRelative => "~/api";

        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
        }
    }
}
