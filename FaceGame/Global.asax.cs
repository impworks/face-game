using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.SessionState;

namespace FaceGame
{
    public class FaceGameApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            LightInjectConfig.Configure();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }

        protected void Application_PostAuthorizeRequest()
        {
            var isWebApiRequest = HttpContext.Current.Request.AppRelativeCurrentExecutionFilePath.StartsWith(WebApiConfig.UrlPrefixRelative);
            if (isWebApiRequest)
                HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
        }
    }
}
