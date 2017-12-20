using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarrySky.FRP.Domain.Model
{
    /// <summary>
    /// 账户
    /// </summary>
    public class Account : IBaseIndex, ICreateOn
    {
        public int Id { get; set; }
        /// <summary>
        /// 账户名称
        /// </summary>
        public string AccountName { get; set; }
        /// <summary>
        /// 银行
        /// </summary>
        public BankMenu BankMenu { get; set; }
        /// <summary>
        /// 卡号
        /// </summary>
        public string CardNumber { get; set; }

        public DateTime CreateOn { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Memo { get; set; }
    }

    /// <summary>
    /// 收入
    /// </summary>
    public class AccountForIn : IBaseIndex, IDelete
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
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
        public RevenueType RevenueType { get; set; }
        public bool Delete { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Memo { get; set; }

        public virtual Account Account { get; set; }
    }

    /// <summary>
    /// 支出
    /// </summary>
    public class AccountForOut : IBaseIndex, IDelete
    {
        public int Id { get; set; }

        public int AccountId { get; set; }
        /// <summary>
        /// 资金
        /// </summary>
        public decimal TotalMoney { get; set; }
        /// <summary>
        /// 支出类型
        /// </summary>
        public ConsumeType ConsumeType { get; set; }
        /// <summary>
        /// 时间
        /// </summary>
        public DateTime OutDate { get; set; }
        public bool Delete { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Memo { get; set; }

        public virtual Account Account { get; set; }
    }
}
