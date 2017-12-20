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

    }
}