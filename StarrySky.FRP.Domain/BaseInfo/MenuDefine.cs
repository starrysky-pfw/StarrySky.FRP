using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarrySky.FRP.Domain
{

    /// <summary>
    /// 银行
    /// </summary>
    public enum BankMenu
    {
        工商银行 = 1,
        中国银行 = 3,
        建设银行 = 4,
        成都银行 = 5
    }

    /// <summary>
    /// 收入类型
    /// </summary>
    public enum RevenueType
    {
        工资 = 1,
        礼金 = 3,
        红包 = 5
    }

    /// <summary>
    /// 消费种类 枚举
    /// </summary>
    public enum ConsumeType
    {
        房贷 = 2,
        交通 = 4,
        购物 = 5,
        通讯 = 7,
        餐饮 = 8,
        人情 = 10,
        其余 = 12
    }
}
