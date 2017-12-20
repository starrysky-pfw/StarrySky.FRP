using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarrySky.FRP.Domain
{
    /// <summary>
    /// 模型  基类接口
    /// </summary>
    public interface IBaseIndex
    {
        /// <summary>
        /// Id
        /// </summary>
        int Id { get; set; }
    }

    /// <summary>
    /// 创建时间 接口
    /// </summary>
    public interface ICreateOn
    {
        /// <summary>
        /// 创建时间
        /// </summary>
        DateTime CreateOn { get; set; }
    }

    /// <summary>
    /// 删除
    /// </summary>
    public interface IDelete
    {
        bool Delete { get; set; }
    }
}
