using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StarrySky.FRP.Web.Controllers
{
    public class BaseController : Controller
    {
        /// <summary>
        /// 成功
        /// </summary>
        /// <param name="msg">提示信息</param>
        /// <returns></returns>
        public JsonResult Success(string msg = "")
        {
            return Json(new Models.ResponseRst { Msg = msg });
        }

        /// <summary>
        /// 失败
        /// </summary>
        /// <param name="msg">失败</param>
        /// <returns></returns>
        public JsonResult Faild(string msg = "")
        {
            return Json(new Models.ResponseRst { Code = Models.RstCode.faild, Msg = msg });
        }

        /// <summary>
        /// 全局捕获 未捕获的异常   
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void OnException(ExceptionContext filterContext)
        {
            // 错误日志   后续要实现记录功能
            string controllerNamer = filterContext.RouteData.Values["controller"].ToString();
            string actionName = filterContext.RouteData.Values["action"].ToString();
            string error = filterContext.Exception.Message.ToString();
            base.OnException(filterContext);
        }
    }
}