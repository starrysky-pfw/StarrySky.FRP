using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarrySky.FRP.Domain.Model
{
    /// <summary>
    /// 用户和角色关系表
    /// </summary>
    public class UserRole : IBaseIndex
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RoleId { get; set; }

        public virtual Role Role { get; set; }
        public virtual User User { get; set; }
    }
}
