using StarrySky.FRP.DbProvider;
using StarrySky.FRP.Domain.Model;
using StarrySky.FRP.Manager;
using StarrySky.FRP.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StarrySky.FRP.Web.Controllers
{
    public class HomeController : BaseController
    {
        /// <summary>
        /// 登陆
        /// </summary>
        /// <returns></returns>
        public ActionResult Login()
        {
            return View();
        }

        /// <summary>
        /// 登陆方法
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Login(string name, string pwd)
        {
            var userRepo = ServiceManager.GetService<IRepo<User>>();

            if (string.IsNullOrEmpty(name))
            {
                return Faild("登录名不能为空");
            }
            if (string.IsNullOrEmpty(pwd))
            {
                return Faild("密码不能为空");
            }

            var userMsg = userRepo.Where(s => s.LoginName == name.Trim() && s.PassWord == pwd.Trim()).FirstOrDefault();
            if (userMsg == null)
            {
                return Faild("用户名或密码错误");
            }
            if (userMsg.Delete)
            {
                return Faild("用户名已删除");
            }
            return View("Index");
        }

        /// <summary>
        /// 首页
        /// </summary>
        /// <returns></returns>

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}