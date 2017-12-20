using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autofac;

namespace StarrySky.FRP.Service
{
    /// <summary>
    /// 服务
    /// </summary>
    public static class ServiceManager
    {
        /// <summary>
        /// 获取服务
        /// </summary>
        /// <param name="t"></param>
        /// <returns></returns>
        public static T GetService<T>()
        {
            return AutoFacManager.AutoFacContainer().Resolve<T>();
        }

        /// <summary>
        /// 注册泛型
        /// </summary>
        /// <param name="implementer"></param>
        /// <param name="services"></param>
        public static void RegisterGeneric(Type implementer, params Type[] services)
        {
            AutoFacManager.RegisterGeneric(implementer, services);
        }

        public static void RegisterType(Type implementer)
        {
            AutoFacManager.RegisterType(implementer);
        }
    }
}
