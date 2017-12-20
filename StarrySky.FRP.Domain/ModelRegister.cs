using StarrySky.FRP.DbProvider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using StarrySky.FRP.Domain.Map;

namespace StarrySky.FRP.Domain
{
    /// <summary>
    /// 模型注册类
    /// </summary>
    public class ModelRegister : IModelRegister
    {
        /// <summary>
        /// 模型注册
        /// </summary>
        /// <param name="builder"></param>
        public void Init(DbModelBuilder builder)
        {
            builder.Configurations.Add(new AccountMap());
            builder.Configurations.Add(new AccountForInMap());
            builder.Configurations.Add(new AccountForOutMap());
            builder.Configurations.Add(new RoleMap());
            builder.Configurations.Add(new UserMap());
            builder.Configurations.Add(new UserRoleMap());
        }

        /// <summary>
        /// 初始化操作
        /// </summary>
        /// <param name="context"></param>
        public void Seed(DbContext context)
        {

        }
    }
}
