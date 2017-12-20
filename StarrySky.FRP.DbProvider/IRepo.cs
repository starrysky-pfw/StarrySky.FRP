using StarrySky.FRP.DbProvider.SqlServer;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace StarrySky.FRP.DbProvider
{
    /// <summary>
    /// 仓储接口
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IRepo<T> where T : class, new()
    {
        void Add(T t);

        void AddRange(List<T> t);

        ValidationResult Create(T t, bool save = false);

        IQueryable<T> Where(Expression<Func<T, bool>> predicate);

        void SaveChanges();
    }

    /// <summary>
    /// 仓储
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class Repo<T> : IRepo<T> where T : class, new()
    {
        SqlDbContext context = null;
        public Repo()
        {
            context = new SqlDbContext();
        }

        public void Add(T t)
        {
            context.Set<T>().Add(t);
        }

        public void AddRange(List<T> t)
        {
            context.Set<T>().AddRange(t);
        }

        public ValidationResult Create(T t, bool save = false)
        {
            try
            {
                context.Set<T>().Add(t);
                if (save)
                {
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                return new ValidationResult(e.Message);
            }
            return null;
        }

        public IQueryable<T> Where(Expression<Func<T, bool>> predicate)
        {
            return context.Set<T>().Where(predicate);
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}
