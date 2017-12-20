using StarrySky.FRP.DbProvider;
using StarrySky.FRP.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace StarrySky.FRP.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            ServiceManager.RegisterType(typeof(DbProvider.SqlServer.SqlDapperProvider));
            ServiceManager.RegisterGeneric(typeof(Repo<>), typeof(IRepo<>));   //注册Repo<>  泛型服务
            ServiceManager.GetService<Manager.IUserManager>().InitSystemUser();  //初始化系统用户
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
