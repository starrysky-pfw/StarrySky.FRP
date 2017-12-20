using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StarrySky.FRP.Domain.Model;
using StarrySky.FRP.Service;
using StarrySky.FRP.DbProvider;

namespace StarrySky.FRP.Manager
{
    public class UserManager : IUserManager
    {
        /// <summary>
        /// 初始化系统用户
        /// </summary>
        /// <param name="user"></param>
        public void InitSystemUser()
        {
            var userRepo = ServiceManager.GetService<IRepo<User>>();
            var mapper = ServiceManager.GetService<DbProvider.SqlServer.SqlDapperProvider>();
            if (!userRepo.Where(s => s.Code == 10000).Any())
            {
                User user = new User
                {
                    Code = 10000,
                    LoginName = "myadmin",
                    PassWord = "admin",
                    UserName = "myadmin",
                    Birthday = DateTime.Now.AddYears(-20),
                    CreateOn = DateTime.Now
                };
                int inRst = mapper.Execute("insert into [User] values (@Code,@LoginName,@PassWord,@UserName,@Birthday,@CreateOn,@Delete)", user);
                if (inRst > 0)
                {
                    Console.WriteLine("插入成功！");
                }
            }
        }

        /// <summary>
        /// 添加用户信息
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public ValidationResult CreateUser(User user)
        {
            var userRepo = ServiceManager.GetService<IRepo<User>>();
            return userRepo.Create(user, true);
        }
    }
}
