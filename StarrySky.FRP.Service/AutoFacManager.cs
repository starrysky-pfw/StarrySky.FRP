using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using Microsoft.Extensions.Configuration;

namespace StarrySky.FRP.Service
{
    /// <summary>
    /// Ioc  AutoFac
    /// </summary>
    public static class AutoFacManager
    {
        public static ContainerBuilder builder = null;
        public static IComponentContext context = null;

        static AutoFacManager()
        {
            var config = new ConfigurationBuilder();
            config.AddJsonFile("autofac.json");
            builder = new ContainerBuilder();
            builder.RegisterModule(new Autofac.Configuration.ConfigurationModule(config.Build()));
        }

        /// <summary>
        /// 返回 AutoFac 容器
        /// </summary>
        /// <returns></returns>
        public static IComponentContext AutoFacContainer()
        {
            //builder.RegisterType<TestA>().As<ITestA>();  //尝试用代码注册 
            //var tmp = builder.Build().Resolve<ITestA>();
            if (context == null)
            {
                context = builder.Build();
            }
            return context;
        }

        /// <summary>
        /// 注册泛型
        /// </summary>
        /// <param name="implementer"></param>
        /// <param name="services"></param>
        public static void RegisterGeneric(Type implementer, params Type[] services)
        {
            builder.RegisterGeneric(implementer).As(services);
        }


        public static void RegisterType(Type implementer)
        {
            builder.RegisterType(implementer);
        }
    }

    public class TestA : ITestA
    {
        public void write()
        {
            Console.WriteLine("aaa");
        }
    }

    public interface ITestA
    {
        void write();
    }
}
