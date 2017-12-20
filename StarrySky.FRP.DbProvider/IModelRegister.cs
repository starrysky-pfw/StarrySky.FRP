using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarrySky.FRP.DbProvider
{
    /// <summary>
    /// 模型注册接口
    /// </summary>
    public interface IModelRegister
    {
        /// <summary>
        /// 模型注册
        /// </summary>
        /// <param name="builder"></param>
        void Init(DbModelBuilder builder);

        /// <summary>
        /// 初始化
        /// </summary>
        /// <param name="context"></param>
        void Seed(DbContext context);
    }
}
