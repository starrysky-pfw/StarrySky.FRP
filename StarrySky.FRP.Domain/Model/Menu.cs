using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarrySky.FRP.Domain.Model
{
    /// <summary>
    /// 菜单
    /// </summary>
    public class Menu : IBaseIndex
    {
        public int Id { get; set; }
        /// <summary>
        /// 菜单名
        /// </summary>
        public string MenuName { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string Memo { get; set; }

    }
}
