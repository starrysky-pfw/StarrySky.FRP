using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StarrySky.FRP.Web.Models
{
    /// <summary>
    /// datagrid分页
    /// </summary>
    public class DataGridPage
    {
        public int page { get; set; }
        public int rows { get; set; }
    }

    /// <summary>
    /// datagrid模型
    /// </summary>
    public class DataGridModel
    {
        public int total { get; set; }
        public object data { get; set; }
        public object footer { get; set; }
    }

    /// <summary>
    /// 响应结果
    /// </summary>
    public class ResponseRst
    {
        /// <summary>
        /// 结果编码
        /// </summary>
        public RstCode Code { get; set; }
        /// <summary>
        /// 信息
        /// </summary>
        public string Msg { get; set; }
    }

    public enum RstCode
    {
        success = 0,
        faild = 1,
    }
}