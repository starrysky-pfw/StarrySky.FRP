using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StarrySky.FRP.Service;
using System.ComponentModel.DataAnnotations;
using StarrySky.FRP.Domain.Model;

namespace StarrySky.FRP.Manager
{
    /// <summary>
    /// 用户管理
    /// </summary>
    public interface IUserManager
    {
        /// <summary>
        /// 初始化用户
        /// </summary>
        /// <param name="user"></param>
        void InitSystemUser();

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        ValidationResult CreateUser(User user);
    }
}
