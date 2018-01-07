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
            Application["CurrentGuests"] = 0;
            Application["AllGuests"] = 0;
        }


        protected void Session_Start(Object sender, EventArgs e)
        {
            Application.Lock();
            Application["CurrentGuests"] = (int)Application["CurrentGuests"] + 1;//总在线用户数
            Application["AllGuests"] = (int)Application["AllGuests"] + 1;//访问网站的总用户数

            int CurrentGuests = (int)Application["CurrentGuests"];
            int AllGuests = (int)Application["AllGuests"];
            Console.WriteLine(CurrentGuests);
            Console.WriteLine(AllGuests);
            Application.UnLock();
        }

        protected void Session_End(Object sender, EventArgs e)//当前用户退出网站时,在线用户数量-1,
        {
            Application.Lock();
            Application["CurrentGuests"] = (int)Application["CurrentGuests"] - 1;//总在线用户数量-1
            int CurrentGuests = (int)Application["CurrentGuests"];
            Application.UnLock();
        }
    }
}
