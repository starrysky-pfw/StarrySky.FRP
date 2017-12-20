using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using StarrySky.FRP.Service;
using Autofac;

namespace StarrySky.FRP.DbProvider.SqlServer
{
    /// <summary>
    /// sql  数据库上下文
    /// </summary>
    public class SqlDbContext : DbContext
    {
        public SqlDbContext() : base("name=dbContext")
        {
            if (!Database.Exists())
            {
                Database.SetInitializer(new CreateDatabase());
            }
            else
            {
                Database.SetInitializer(new MigrateDatabase());  //自动更新 升级数据库
            }
        }

        /// <summary>
        /// 根据模型创建表
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //处理模型的创建
            ServiceManager.GetService<IModelRegister>().Init(modelBuilder);
        }

        public void ValidataionError()
        {
            var errors = GetValidationErrors();
            foreach (var item in errors)
            {

            }
        }
    }

    #region 创建数据库
    /// <summary>
    /// 创建数据库
    /// </summary>
    public class CreateDatabase : CreateDatabaseIfNotExists<SqlDbContext>
    {
        public override void InitializeDatabase(SqlDbContext context)
        {
            base.InitializeDatabase(context);
        }

        protected override void Seed(SqlDbContext context)
        {
            base.Seed(context);
            ServiceManager.GetService<IModelRegister>().Seed(context);
        }
    }
    #endregion

    #region 迁移数据库
    /// <summary>
    /// 迁移配置
    /// </summary>
    public class Migrationcfg : DbMigrationsConfiguration<SqlDbContext>
    {
        public Migrationcfg()
        {
            this.AutomaticMigrationsEnabled = true;  //允许自动迁移
        }

        protected override void Seed(SqlDbContext context)
        {
            base.Seed(context);
            ServiceManager.GetService<IModelRegister>().Seed(context);
        }
    }

    public class MigrateDatabase : MigrateDatabaseToLatestVersion<SqlDbContext, Migrationcfg>
    {
        public override void InitializeDatabase(SqlDbContext context)
        {
            base.InitializeDatabase(context);
        }
    }
    #endregion
}
