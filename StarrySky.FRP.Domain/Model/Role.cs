using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarrySky.FRP.Domain.Model
{
    /// <summary>
    ///  角色
    /// </summary>
    public class Role : IBaseIndex, IDelete
    {
        public int Id { get; set; }
        /// <summary>
        /// 角色 编码
        /// </summary>
        public int Code { get; set; }
        /// <summary>
        /// 角色名
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 删除
        /// </summary>
        public bool Delete { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Memo { get; set; }
    }
}
