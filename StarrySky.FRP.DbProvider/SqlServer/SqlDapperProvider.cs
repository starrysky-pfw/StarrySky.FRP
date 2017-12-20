using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace StarrySky.FRP.DbProvider.SqlServer
{
    public class SqlDapperProvider
    {
        IDbConnection conn = null;

        public SqlDapperProvider()
        {
            if (conn == null)
            {
                conn = new SqlConnection("database = Test;uid =sa;pwd=sql2012");
            }
        }
        public IDbConnection SqlConnection()
        {
            return conn;
        }

        public IEnumerable<dynamic> Query(string sql, object param = null, IDbTransaction transaction = null, bool buffered = true, int? commandTimeout = null, CommandType? commandType = null)
        {
            return conn.Query(sql, param, transaction, buffered, commandTimeout, commandType);
        }

        public IEnumerable<T> Query<T>(string sql, object param = null, IDbTransaction transaction = null, bool buffered = true, int? commandTimeout = null, CommandType? commandType = null) where T : class, new()
        {
            return conn.Query<T>(sql, param, transaction, buffered, commandTimeout, commandType);
        }

        public int Execute(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            return conn.Execute(sql, param, transaction, commandTimeout, commandType);
        }

        public List<T> AsList<T>(IEnumerable<T> source)
        {
            return SqlMapper.AsList(source);
        }

        public object ExecuteScalar(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null)
        {
            return conn.ExecuteScalar(sql, param = null, transaction, commandTimeout, commandType);
        }
    }

    public interface aaa
    {

    }
}
