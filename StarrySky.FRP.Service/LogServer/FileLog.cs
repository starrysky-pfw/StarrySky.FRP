using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StarrySky.FRP.Service.LogServer
{
    /// <summary>
    /// 文件日志
    /// </summary>
    public static class FileLog
    {
        public static void Log(FileType type, string aa, string msg)
        {

        }
    }

    /// <summary>
    /// 文件类型
    /// </summary>
    public enum FileType
    {
        /// <summary>
        /// 错误
        /// </summary>
        error,
        /// <summary>
        /// 信息
        /// </summary>
        info
    }
}
