using StarrySky.FRP.DbProvider;
using StarrySky.FRP.Domain.Model;
using StarrySky.FRP.Service;
using StarrySky.FRP.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StarrySky.FRP.Web.Controllers
{
    /// <summary>
    /// 资金管理
    /// </summary>
    public class AccountController : Controller
    {
        #region 账户基本信息管理
        // GET: Account
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 添加账户视图
        /// </summary>
        /// <returns></returns>
        public ActionResult CreateAccount_View()
        {
            return PartialView();
        }

        /// <summary>
        /// 添加账户
        /// </summary>
        /// <returns></returns>
        public ActionResult CreateAccount_Post()
        {
            return PartialView();
        }
        #endregion

        #region 收入
        /// <summary>
        /// 收入  主页
        /// </summary>
        /// <returns></returns>
        public ActionResult AccountForIn_Index()
        {
            return View();
        }

        public JsonResult AccountForIn_Post()
        {
            return Json("");
        }

        /// <summary>
        /// 收入资金列表
        /// </summary>
        /// <param name="revenueType">收入类型</param>
        /// <param name="inDate">收入时间</param>
        /// <returns></returns>
        public JsonResult AccountForInDataGridData(VM_AccountForInDatagrid dg)
        {
            var actInRepo = ServiceManager.GetService<IRepo<AccountForIn>>();
            var inActData = actInRepo.Where(s => !s.Delete);
            if (dg.accountId != 0)
            {
                inActData = inActData.Where(s => s.AccountId == dg.accountId);
            }
            if (dg.revenueType != 0)
            {
                inActData = inActData.Where(s => s.RevenueType == (Domain.RevenueType)dg.revenueType);
            }
            if (dg.inStartDate.HasValue)
            {
                inActData = inActData.Where(s => s.InDate >= dg.inStartDate && s.InDate <= dg.inEndDate);
            }

            var inActRst = inActData.OrderBy(s => s.Id).Skip(dg.rows * (dg.page - 1)).Take(dg.rows).Select(s => new VM_AccountForIn
            {
                AccountName = s.Account.AccountName,
                InDate = s.InDate,
                TotalMoney = s.TotalMoney,
                TaxMoney = s.TaxMoney,
                SocialSecurityMoney = s.SocialSecurityMoney,
                Memo = s.Memo,
                ActualMoney = s.ActualMoney,
                RevenueType = s.RevenueType.ToString()
            }).ToList();

            for (int i = 0; i < 10; i++)
            {
                inActRst.Add(new VM_AccountForIn
                {
                    AccountName = "账户" + i,
                    ActualMoney = 10000,
                    InDate = DateTime.Now,
                    TaxMoney = 20000,
                    Memo = "今天发了部分工资",
                    RevenueType = "工资",
                    SocialSecurityMoney = 240,
                    TotalMoney = 50000
                });
            }
            return Json(inActRst);
            //return Json(new DataGridBase() { rows = 10, total = 20, data = rst }, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}