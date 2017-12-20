using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StarrySky.FRP.Web.Models
{
    /// <summary>
    /// 资金管理 前台模型
    /// </summary>
    public class AccountViewModel
    {
    }

    /// <summary>
    /// 资金收入 datagrid列表 查询 viewmodel
    /// </summary>
    public class VM_AccountForInDatagrid : DataGridPage
    {
        public int accountId { get; set; }
        /// <summary>
        /// 收入类型
        /// </summary>
        public int revenueType { get; set; }
        /// <summary>
        /// 收入时间查询 开始时间
        /// </summary>
        public DateTime? inStartDate { get; set; }
        /// <summary>
        /// 收入时间查询 结束时间
        /// </summary>
        public DateTime? inEndDate { get; set; }
    }

    /// <summary>
    /// 资金收入 datagrid列表 展示 viewmodel
    /// </summary>
    public class VM_AccountForIn
    {
        /// <summary>
        /// 账户名称
        /// </summary>
        public string AccountName { get; set; }
        /// <summary>
        /// 收入时间
        /// </summary>
        public DateTime InDate { get; set; }
        /// <summary>
        /// 总共资金
        /// </summary>
        public decimal TotalMoney { get; set; }
        /// <summary>
        /// 个税资金
        /// </summary>
        public decimal TaxMoney { get; set; }
        /// <summary>
        /// 社保
        /// </summary>
        public decimal SocialSecurityMoney { get; set; }
        /// <summary>
        /// 实际到手资金
        /// </summary>
        public decimal ActualMoney { get; set; }
        /// <summary>
        /// 收入类型
        /// </summary>
        public string RevenueType { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Memo { get; set; }
    }
}