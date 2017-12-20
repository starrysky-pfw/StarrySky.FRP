
$(function () {
    $.ajaxSetup({ cache: false });
});

//检测浏览器是否支持html5
function testHTML5() {
    if (window.applicationCache)
        return true;
    else
        return false;
}

function formSetting(btnExpression, fromExpression, method, sucessCallBack, failCallBack, validateFuc) {
    //AJAX提交
    if (method.toLowerCase() == "ajax") {
        subSucessCBack = sucessCallBack;
        subFailCBack = failCallBack;
        $(btnExpression).click(function () {
            ajaxSubmit(fromExpression, sucessCallBack, failCallBack, validateFuc)
        });
    } else {
        $(btnExpression).click(formSubmit);
    }
}

//退出系统
function _LoginOut() {
    MessageBox.showYesNoHasFun("确认退出", "是否退出程序？", function (data) {
        if (data) {
            $.ajax({
                url: "/RightFrame/Home/UserLoginOut",
                success: function (datas) {
                    if (window.top.ws != undefined && window.top.ws != null) {
                        window.top.ws.close();
                    }
                    window.location = "/RightFrame/Home/Login";
                }
            });
        }
    })
}

/*中文日期控件*/
function datetimepickerCN(expression, format) {
    var dtFormat = "yyyy-mm-dd";
    if (format) {
        dtFormat = format;
    }

    return $(expression).datetimepicker({
        language: 'zh-CN',
        format: dtFormat,
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2
    })
}

/*中文日期控件*/
function datetimepickerMonthCN(expression, format) {
    var dtFormat = "yyyy-mm";
    if (format) {
        dtFormat = format;
    }

    $(expression).datetimepicker({
        language: 'zh-CN',
        format: dtFormat,
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2
    })
}

///日期大小比较 注意日期格式  yyyy-mm-dd
function dateCompare(startdate, enddate) {
    if (startdate == "" && startdate != undefined && enddate == "" && enddate != undefined) {
        return true;
    }
    var arr = startdate.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var starttimes = starttime.getTime();

    var arrs = enddate.split("-");
    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
    var lktimes = lktime.getTime();

    if (starttimes > lktimes) {
        return false;
    }
    else {
        return true;
    }
}

//检查数组中是否有重复元素
function IsCF(ary) {
    var nary = ary.sort();
    for (var i = 0; i < ary.length; i++) {
        if (nary[i] == nary[i + 1]) {
            return true;
        }
    }
    return false;
}

//分组验证的方法
//使用方法 1 在每组的容器上加上.validationGroup  容器的id为tab id  用于跳转
function Validate() {
    var $groups = $(".validationGroup");
    var isValid = true;
    for (var i = 0; i < $groups.length; i++) {
        $($groups[i]).find(':input').each(function (i, item) {
            if (!$(item).valid()) {
                isValid = false;
                return isValid;
            }
        });
        if (!isValid) {
            //跳出
            var tabId = $($groups[i]).attr("id");
            $("a[href='#" + tabId + "']").click();
            break;
        }
    }
    return isValid;
}

/* ajax 提交*/
function ajaxSubmit(exprssion, sucessCallBack, failCallBack, validateFuc) {
    var objForm;
    if (exprssion) {
        objForm = $(exprssion);
    } else {
        objForm = $(document.forms[0]);
    }
    var purl = objForm.attr("action");
    if (!Validate()) {
        return;
    }
    //设置初始默认值
    if ($(objForm).valid()) {

        if (validateFuc) {
            if (!validateFuc()) {
                return;
            }
        }
        loadStart();
        $.ajax({
            url: purl,
            type: "post",
            data: $(objForm).serialize(),
            success: function (data) {
                loadEnd();
                //显示添加结果
                if (data.ret == 1) {
                    if (sucessCallBack) {
                        sucessCallBack(data);
                    }
                } else {
                    if (failCallBack) {
                        if (!failCallBack(data)) {
                            MessageBox.showYes("提示", data.msg);
                        }
                    } else {
                        MessageBox.showYes("错误", "发生系统错误:" + data.msg);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                loadEnd();
                MessageBox.showYes("错误", "发生系统错误:" + errorThrown);
            }
        });
    }
}

//动态加载css
function addCss(url) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

//动态加载js
function addJs(url, successCallBack) {
    $.getScript(url, successCallBack)
}

/* form提交 */
function formSubmit(exprssion) {
    var objForm;
    if (!exprssion) {
        objForm = $(exprssion);
    } else {
        objForm = $(document.forms[0]);
    }
    if ($(objForm).valid()) {
        objForm.submit();
    }
}

//图标类型 枚举  info消息图标  question问题图标  warning警告图标  error错误   不够可以添加
var IconType = { info: "info", question: "question", warning: "warning", error: "error" }

var MessageBox = {
    showYes: function (title, message, iconType) {
        $.messager.defaults = { ok: "是" };
        $.messager.alert(title, message, iconType);
    },
    showYesHasFun: function (title, message, iconType, callBack) {
        $.messager.defaults = { ok: "是" };
        $.messager.alert(title, message, iconType, callBack);
    },
    showYesNoHasFun: function (title, message, callBack) {
        $.messager.defaults = { ok: "是", cancel: "否" };
        $.messager.confirm(title, message, callBack);
    },
    showOkCanelHasFun: function (title, message, callBack) {
        $.messager.defaults = { ok: "确认", cancel: "取消" };
        $.messager.confirm(title, message, callBack);
    },
    showFuZuiHasFun: function (title, message, callBack) {
        $.messager.defaults = { ok: "覆盖", cancel: "追加" };
        $.messager.confirm(title, message, callBack);
    },
    showAlert: function (title, message, btn1Msg, btn2Msg, callBack) {
        $.messager.defaults = { ok: btn1Msg, cancel: btn2Msg };
        $.messager.confirm(title, message, callBack);
    }
}

function comparisonToDay(str) {
    if (new Date(str) > new Date()) {
        return true;
    } else {
        return false;
    }
}

function getDateYMD(date) {
    if (date == undefined) {
        date = new Date();
    }
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

function loadStart(winObj) {
    var win = window;
    if (winObj != undefined) {
        win = winObj;
    }
    var bd = win.document.body;
    var winWidth = $(win).width();
    var winHeight = $(win).height();
    var tempSize = parseInt(winHeight / 10);
    var tempWidth = parseInt((winWidth - tempSize) / 2);
    var tempHeight = parseInt((winHeight - tempSize) / 2);
    $(bd).append("<div id='loadingForWing'><div style ='width: 100%; height: 100%; background: #f8f8f8; z-index: 1000000; position: fixed; left: 0px; top: 0px; opacity: 0.5;'></div><img src='/Images/loading.gif' width='" + tempSize + "px' height='" + tempSize + "px' style='display:block; position: fixed;left: " + tempWidth + "px; top:" + tempHeight + "px;' /></div>")
}

function loadEnd(winObj) {
    var bd = window.document.body;
    if (winObj != undefined) {
        bd = winObj.document.body;
    }
    $(bd).find("#loadingForWing").remove();
}

function clearChecked() {
    $(".add_department_role a").each(function () {
        $(this).removeClass("belong_role_active");
        $(this).find(".icheckbox_square-orange").removeClass("checked");
        $('input').iCheck('uncheck');
    });
}

////以下为图片的处理
//上传图片时的file注册
function RegPic(express) {
    $(express).change(function () {
        if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE6.0") {
            var imgName = splitName($(this).val());
            $("#file" + num).hide();
            num = num + 1;
            var AddInput = "<input type='file' name='fileImg' value='" + imgName + "' id='file" + num + "' multiple='multiple' value='' />";
            $("#ImgDiv").append(AddInput);
            $("div[class=picture_div]").append("<div class='picture_div_imgBox'><div class='picture_div_img' onmouseover='yiru(this)' onmouseout='yichu(this)' title='您的浏览器版本过低，图片无法显示。请升级浏览器版本。'><div class='picture_div_img_gb_left'><span>影像名称：</span><input type='text' name='fileNames' value='" + imgName + "' class='form-control noneradius' /></div><div class='picture_div_img_gb_right'><img src='../../../../Images/gb.png' title='关闭' name ='" + fullName + "' id='" + num + "' onclick='deImg(this)' /></div><div class='picture_div_img_cont'><img src='../../../../Images/w.jpg' style='max-width: 100%;' /></div></div></div>");
            RegPic("#file" + num);
        }
        else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0") {
            var imgName = splitName($(this).val());
            $("#file" + num).hide();
            num = num + 1;
            var AddInput = "<input type='file' name='fileImg' value='" + imgName + "' id='file" + num + "' multiple='multiple' value='' />";
            $("#ImgDiv").append(AddInput);
            $("div[class=picture_div]").append("<div class='picture_div_imgBox'><div class='picture_div_img' onmouseover='yiru(this)' onmouseout='yichu(this)' title='您的浏览器版本过低，图片无法显示。请升级浏览器版本。'><div class='picture_div_img_gb_left'><span>影像名称：</span><input type='text' name='fileNames' value='" + imgName + "' class='form-control noneradius' /></div><div class='picture_div_img_gb_right'><img src='../../../../Images/gb.png' title='关闭' name ='" + fullName + "' id='" + num + "' onclick='deImg(this)' /></div><div class='picture_div_img_cont'><img src='../../../../Images/w.jpg' style='max-width: 100%;' /></div></div></div>");
            RegPic("#file" + num);
        }
        else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") {
            var imgName = splitName($(this).val());
            $("#file" + num).hide();
            num = num + 1;
            var AddInput = "<input type='file' name='fileImg' value='" + imgName + "' id='file" + num + "' multiple='multiple' value='' />";
            $("#ImgDiv").append(AddInput);
            $("div[class=picture_div]").append("<div class='picture_div_imgBox'><div class='picture_div_img' onmouseover='yiru(this)' onmouseout='yichu(this)' title='您的浏览器版本过低，图片无法显示。请升级浏览器版本。'><div class='picture_div_img_gb_left'><span>影像名称：</span><input type='text' name='fileNames' value='" + imgName + "' class='form-control noneradius' /></div><div class='picture_div_img_gb_right'><img src='../../../../Images/gb.png' title='关闭' name ='" + fullName + "' id='" + num + "' onclick='deImg(this)' /></div><div class='picture_div_img_cont'><img src='../../../../Images/w.jpg' style='max-width: 100%;' /></div></div></div>");
            RegPic("#file" + num);
        }
        else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0") {
            var imgName = splitName($(this).val());
            $("#file" + num).hide();
            num = num + 1;
            var AddInput = "<input type='file' name='fileImg' value='" + imgName + "' id='file" + num + "' multiple='multiple' value='' />";
            $("#ImgDiv").append(AddInput);
            $("div[class=picture_div]").append("<div class='picture_div_imgBox'><div class='picture_div_img' onmouseover='yiru(this)' onmouseout='yichu(this)' title='您的浏览器版本过低，图片无法显示。请升级浏览器版本。'><div class='picture_div_img_gb_left'><span>影像名称：</span><input type='text' name='fileNames' value='" + imgName + "' class='form-control noneradius' /></div><div class='picture_div_img_gb_right'><img src='../../../../Images/gb.png' title='关闭' name ='" + fullName + "' id='" + num + "' onclick='deImg(this)' /></div><div class='picture_div_img_cont'><img src='../../../../Images/w.jpg' style='max-width: 100%;' /></div></div></div>");
            RegPic("#file" + num);
        }
        else {
            for (var i = 0; i < this.files.length; i++) {
                var objUrl = getObjectURL(this.files[i]);
                if (objUrl) {
                    var fullName = this.files.item(i).name;     //得到全部名称
                    var arr = fullName.split('.');
                    imgName = arr[0];
                    $("div[class=picture_div]").append("<div class='picture_div_imgBox'><div class='picture_div_img'  onmouseover='yiru(this)' onmouseout='yichu(this)'><div class='picture_div_img_gb_left'><span>影像名称：</span><input type='text' name='fileNames' value='" + imgName + "' class='form-control noneradius' /></div><div class='picture_div_img_gb_right'><img src='../../../../Images/gb.png' title='关闭' name ='" + fullName + "' id='" + num + "' onclick='deImg(this)' /></div><div class='picture_div_img_cont'><img src='" + objUrl + "' style='max-width: 100%;' /></div></div></div>");
                }
            }

            $("#file" + num).hide();
            num = num + 1;
            var AddInput = "<input type='file' name='fileImg'  id='file" + num + "' multiple='multiple' accept='image/*'/>";
            $("#ImgDiv").append(AddInput);
            RegPic("#file" + num);
            imgHover();
        }
    });
}

//取名称
function splitName(filename) {
    var arr = filename.split('.');//注split可以用字符或字符串分割
    var my = arr[arr.length - 2];//这就是要取得的图片名称
    var atts = my.split("\\");
    my = atts[atts.length - 1];
    return my;
}

//建立一個可存取到該file的url
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {          // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) {               // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {         // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

//删除企业影像图片
function deImg(obj) {
    $(obj).parents(".picture_div_imgBox").hide(function () {
        $(this).remove();
    });
    var getName = $(obj).attr("name");           //得到当前选择的图片Id,根据此Id移除对应的file
    delImgName = delImgName + getName + ",";
}

//有添加图片功能  需要的重置
function PicReset() {
    //将以前的file全部清除，重新添加file0
    $("#ImgDiv").children("input[type=file]").each(function () {
        $(this).remove();
    });

    var addFile = "<input type='file' name='fileImg' id='file0' multiple='multiple' />";
    $("#ImgDiv").append(addFile);

    $("div[class=picture_div]").html("");       //清除显示的图片信息
    num = 0;            //将num设置为0
    RegPic("#file0");               //重新注册
}

//图片特效
function imgHover() {
    $(".picture_div_img").each(function () {
        $(this).hover(function () {
            var heights = $(this).children(".picture_div_img_cont").children("img").height() + 35;
            $(this).css("position", "relative").css("height", heights + "px").children(".picture_div_img_cont").css("height", heights - 32 + "px");
        }, function () {
            $(this).css("position", "static").css("height", "240px").children(".picture_div_img_cont").css("height", "207px");
        });
    });
}

//得到当前时间【格式：yyyy-mm-dd】
function GetCurDate() {
    var myDate = new Date();
    var year = myDate.getFullYear();    //获取完整的年份(4位)
    var month = myDate.getMonth();       //获取当前月份(0-11)
    var data = myDate.getDate();        //获取当前前(1-31)
    var curdate = year + "-" + month + 1 + "-" + data;
    return curdate;
}

//以下为封装的省市级联js插件
(function ($) {
    $.fn.cityCasCade = function (operation, province, city) {
        var selectCity = null, params = null, overparams = null;
        if (typeof operation == "string") {
            if (operation == "select") {
                if (province) {
                    $(this).find("option").each(function () {
                        if ($(this).val() == province) {
                            this.selected = true;
                            $(this).change();
                            if (city) {
                                $($.fn.cityCascadeParam.selectCity).find("option").each(function () {
                                    if ($(this).val() == city) {
                                        this.selected = true;
                                        $(this).change();
                                    }
                                });
                            }
                        }
                    });
                }
                return $(this);
            }
            selectCity = operation;
        }
        else {
            if (operation.selector) selectCity = operation.selector;
            if (operation.overide && operation.data) overparams = operation.data;
            else params = operation.data;
        }
        $.fn.cityCascadeParam = {};
        $.fn.cityCascadeParam.data = _provinces_;
        $.fn.cityCascadeParam.selectCity = null;
        if (selectCity) $.fn.cityCascadeParam.selectCity = selectCity;
        else throw "城市选择器不能为空";
        $.fn.cityCascadeParam.cityValue = $($.fn.cityCascadeParam.selectCity + ":first").val();
        $.fn.cityCascadeParam.cityText = $($.fn.cityCascadeParam.selectCity + ":first").text();
        if (overparams) $.fn.cityCascadeParam.data = overparams;
        else $.extend($.fn.cityCascadeParam.data, params);
        $.fn.cityCascadeParam.loadProvince = function (self) {
            for (var p in $.fn.cityCascadeParam.data) {
                var opt = document.createElement("option");
                opt.innerHTML = p;
                opt.value = p;
                self.appendChild(opt);
            }
        }
        $.fn.cityCascadeParam.loadCity = function (parent) {
            var self = $($.fn.cityCascadeParam.selectCity).get(0);
            if (!self) throw "未找到城市下拉框 城市选择器 >>" + $.fn.cityCascadeParam.selectCity;
            var selectProvince = $(parent).val();
            if (selectProvince in $.fn.cityCascadeParam.data) {
                var citys = $.fn.cityCascadeParam.data[selectProvince];
                self.innerHTML = "";
                for (var index = 0; index < citys.length; index++) {
                    opt = document.createElement("option");
                    opt.innerHTML = citys[index];
                    opt.value = citys[index];
                    self.appendChild(opt);
                }
            } else {
                self.innerHTML = "";
                opt = document.createElement("option");
                opt.innerHTML = $.fn.cityCascadeParam.cityText;
                opt.value = $.fn.cityCascadeParam.cityValue;
                self.appendChild(opt);
            }
        }
        this.each(function () {
            $.fn.cityCascadeParam.loadProvince(this);
            $(this).change(function () {
                $.fn.cityCascadeParam.loadCity(this);
            });
        });
        return $(this);
    }
})($);
var _provinces_ = { 四川省: ["成都市", "自贡市", "攀枝花市", "泸州市", "德阳市", "绵阳市", "广元市", "遂宁市", "内江市", "乐山市", "南充市", "眉山市", "宜宾市", "广安市", "达州市", "雅安市", "巴中市", "资阳市", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州"], 山西省: ["太原市", "大同市", "阳泉市", "长治市", "晋城市", "朔州市", "晋中市", "运城市", "忻州市", "临汾市", "吕梁市"], 内蒙古: ["呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市", "鄂尔多斯市", "呼伦贝尔市", "巴彦淖尔市", "乌兰察布市", "兴安盟", "锡林郭勒盟", "阿拉善盟"], 辽宁省: ["沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市", "丹东市", "锦州市", "营口市", "阜新市", "辽阳市", "盘锦市", "铁岭市", "朝阳市", "葫芦岛市"], 吉林省: ["长春市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "松原市", "白城市", "延边朝鲜族自治州"], 黑龙江省: ["哈尔滨市", "齐齐哈尔市", "鸡西市", "鹤岗市", "双鸭山市", "大庆市", "伊春市", "佳木斯市", "七台河市", "牡丹江市", "黑河市", "绥化市", "大兴安岭地区"], 上海: ["上海"], 江苏省: ["南京市", "无锡市", "徐州市", "常州市", "苏州市", "南通市", "连云港市", "淮安市", "盐城市", "扬州市", "镇江市", "泰州市", "宿迁市"], 浙江省: ["杭州市", "宁波市", "温州市", "嘉兴市", "湖州市", "绍兴市", "金华市", "衢州市", "舟山市", "台州市", "丽水市"], 安徽省: ["合肥市", "芜湖市", "蚌埠市", "淮南市", "马鞍山市", "淮北市", "铜陵市", "安庆市", "黄山市", "滁州市", "阜阳市", "宿州市", "巢湖市", "六安市", "亳州市", "池州市", "宣城市"], 福建省: ["福州市", "厦门市", "莆田市", "三明市", "泉州市", "漳州市", "南平市", "龙岩市", "宁德市"], 江西省: ["南昌市", "景德镇市", "萍乡市", "九江市", "新余市", "鹰潭市", "赣州市", "吉安市", "宜春市", "抚州市", "上饶市"], 山东省: ["济南市", "青岛市", "淄博市", "枣庄市", "东营市", "烟台市", "潍坊市", "济宁市", "泰安市", "威海市", "日照市", "莱芜市", "临沂市", "德州市", "聊城市", "滨州市", "菏泽市"], 河南省: ["郑州市", "开封市", "洛阳市", "平顶山市", "安阳市", "鹤壁市", "新乡市", "焦作市", "濮阳市", "许昌市", "漯河市", "三门峡市", "南阳市", "商丘市", "信阳市", "周口市", "驻马店市"], 湖北省: ["武汉市", "黄石市", "十堰市", "宜昌市", "襄樊市", "鄂州市", "荆门市", "孝感市", "荆州市", "黄冈市", "咸宁市", "随州市", "恩施土家族苗族自治州"], 湖南省: ["长沙市", "株洲市", "湘潭市", "衡阳市", "邵阳市", "岳阳市", "常德市", "张家界市", "益阳市", "郴州市", "永州市", "怀化市", "娄底市", "湘西土家族苗族自治州"], 广东省: ["广州市", "韶关市", "深圳市", "珠海市", "汕头市", "佛山市", "江门市", "湛江市", "茂名市", "肇庆市", "惠州市", "梅州市", "汕尾市", "河源市", "阳江市", "清远市", "东莞市", "中山市", "潮州市", "揭阳市", "云浮市"], 广西省: ["南宁市", "柳州市", "桂林市", "梧州市", "北海市", "防城港市", "钦州市", "贵港市", "玉林市", "百色市", "贺州市", "河池市", "来宾市", "崇左市"], 海南省: ["海口市", "三亚市"], 重庆市: ["重庆"], 贵州省: ["贵阳市", "六盘水市", "遵义市", "安顺市", "铜仁地区", "黔西南布依族苗族自治州", "毕节地区", "黔东南苗族侗族自治州", "黔南布依族苗族自治州"], 云南省: ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "思茅市", "临沧市", "楚雄彝族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州", "大理白族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州"], 西藏自治区: ["拉萨市", "昌都地区", "山南地区", "日喀则地区", "那曲地区", "阿里地区", "林芝地区"], 陕西省: ["西安市", "铜川市", "宝鸡市", "咸阳市", "渭南市", "延安市", "汉中市", "榆林市", "安康市", "商洛市"], 甘肃省: ["兰州市", "嘉峪关市", "金昌市", "白银市", "天水市", "武威市", "张掖市", "平凉市", "酒泉市", "庆阳市", "定西市", "陇南市", "临夏回族自治州", "甘南藏族自治州"], 青海省: ["西宁市", "海东地区", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州"], 宁夏自治区: ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市"], 新疆自治区: ["乌鲁木齐市", "克拉玛依市", "吐鲁番地区", "哈密地区", "昌吉回族自治州", "博尔塔拉蒙古自治州", "巴音郭楞蒙古自治州", "阿克苏地区", "克孜勒苏柯尔克孜自治州", "喀什地区", "和田地区", "伊犁哈萨克自治州", "塔城地区", "阿勒泰地区"], 台湾省: ["台北市"], 香港特区: ["香港"], 澳门特区: ["澳门"], 河北省: ["石家庄", "唐山", "秦皇岛", "张家口", "承德", "廊坊", "邯郸", "邢台", "保定", "沧州", "衡水"] };

var expireType = { day: 1, hours: 2 }
//key 名字 value 值 expiredays 过期时间 expireType 过期时间类型 默认是按天过期
function setCookie(key, value, expire, _expireType) {
    var exdate = new Date();
    if (_expireType == expireType.day) {
        exdate.setDate(exdate.getDate() + expiredays);
    } else if (_expireType == expireType.hours) {
        exdate.setHours(exdate.getHours() + expiredays);
    } else {
        exdate.setDate(exdate.getDate() + expiredays);
    }
    document.cookie = key + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookies
function getCookie(key) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(key + "=");
        if (c_start != -1) {
            c_start = c_start + key.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function runPrefixMethod(element, method) {
    var usablePrefixMethod;
    ["webkit", "moz", "ms", "o", ""].forEach(function (prefix) {
        if (usablePrefixMethod) return;
        if (prefix === "") {
            // 无前缀，方法首字母小写
            method = method.slice(0, 1).toLowerCase() + method.slice(1);

        }

        var typePrefixMethod = typeof element[prefix + method];

        if (typePrefixMethod + "" !== "undefined") {
            if (typePrefixMethod === "function") {
                usablePrefixMethod = element[prefix + method]();
            } else {
                usablePrefixMethod = element[prefix + method];
            }
        }
    });
    return usablePrefixMethod;
};

//清空查询
function emptyQuery(obj) {
    $(obj).find("input").val("");
    $(obj).find("select").each(function () {
        $(this).children("option:first").prop("selected", "selected");
    });
}

//将1,234,567.00转换为1234567.00  
function moneyToNumValue(val) {
    var num = val.trim();
    var ss = num.toString();
    if (ss.length == 0) {
        return "0";
    }
    return ss.replace(/,/g, "");
}

//调用：fmoney("12345.675910", 3)，返回12,345.676 
function fmoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
    r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}

//格式化日期
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

//获取当前时间
function getTimeYg(format) {
    var newDate = new Date();
    var newDates = new Date(newDate.getTime());
    var d = newDates.format(format);
    return d;
}

//格式化日期
function formatDates(date, format) {
    var newDate = new Date(date);
    var newDates = new Date(newDate.getTime());
    var d = newDates.format(format);
    return d;
}

//格式时间戳
function formatTimestamp(date, format) {
    if (format == undefined) {
        format = "yyyy-MM-dd";
    }
    var d = eval('new ' + date.substr(1, date.length - 2));
    return formatDates(d, format);
}

//日期前一天
function preDate(date, format) {
    var newDate = new Date(date);
    var nextDate = new Date(newDate.getTime() - 24 * 60 * 60 * 1000);
    var d = nextDate.format(format);
    return d;
}

//日期后一天
function nextDate(date, format) {
    var newDate = new Date(date);
    var nextDate = new Date(newDate.getTime() + 24 * 60 * 60 * 1000);
    var d = nextDate.format(format);
    return d;
}

//得到星期数
function getDateWeek(date) {
    var today = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    var newDate = new Date(date);
    return today[newDate.getDay()];
}

//模态框垂直居中
function centerModals(obj) {
    var $clone = $(obj).clone().css('display', 'block').appendTo('body');
    var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
    top = top > 0 ? top : 0;
    $clone.remove();
    $(obj).find('.modal-content').css("margin-top", top);
}

/*
生成guid
*短时间内基本不会重复
*/
function newGuid() {
    var d = new Date().getTime();
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return guid;
}

(function ($) {
    $.extend({
        /*
        obj：加载对象（可空默认为当前body）
        msg：加载说明（可空）
        */
        showLoad: function (obj, msg) {
            if (obj == undefined) {
                obj = "body";
            }
            if (msg == undefined || msg == "") {
                msg = "数据加载中。。。";
            }
            $(obj).append('<div id="ygLoadBox" name="ygLoadBox"><table><tr><td><img id="ygLoadBox_Img" name="ygLoadBox_Img" src="/Images/loading2.gif"><p id="ygLoadBox_title">' + msg + '</p></td></tr></table></div>');
        },
        /*
         obj：关闭加载对象（可空默认为当前body）
        */
        hideLoad: function (obj) {
            if (obj == undefined) {
                obj = "body";
            }
            $(obj).find("div[name=ygLoadBox]").each(function (i, o) {
                $(o).remove();
            });
        },
        /**
        *用户习惯存储
        * @param {String} viewKey 页面guid
        * @param {Int} habitType 操作类型
        * @param {String} setVal 值
        * @param {Function} backFunc 成功
        * @param {Function} errorFunc 失败
        */
        userHabitSave: function (viewKey, habitType, setVal, backFunc, errorFunc) {
            var postData = {
                ViewKey: viewKey,
                HabitType: habitType,
                SetVal: setVal,
            };
            $.ajax({
                url: "/RightFrame/BasicInfo/UserHabit_Set",
                type: "post",
                data: postData,
                traditional: true,
                success: function (data) {
                    if (data.ret != 1) {
                        MessageBox.showYes("提示", data.msg, IconType.warning);
                        if (errorFunc != undefined)
                            errorFunc(data.msg);
                    } else {
                        backFunc({
                            HabitType: habitType,
                            SetVal: setVal,
                        });
                    }
                },
                error: function (e) {
                    MessageBox.showYes("提示", "设置保存异常！", IconType.error);
                    if (errorFunc != undefined)
                        errorFunc(e.message);
                }
            });
        }
    });

    $.fn.extend({
        //获取选择器信息
        getComboInputInfo: function () {
            var id = $(this).combo("getValue");
            if (id == null || id == undefined || id == "" || id == 0) {
                id = 0;
            }
            var name = $(this).combo("getText");
            return { Id: id, Name: name };
        },
        //初始化EasyUI时间控件
        initDateCombo: function (openClear) {
            if (openClear == undefined && $.fn.datebox.defaults.buttons.length <= 2) {
                //给时间框控件扩展一个清除的按钮
                $.fn.datebox.defaults.cleanText = '清空';
                (function ($) {
                    var buttons = $.extend([], $.fn.datebox.defaults.buttons);
                    buttons.splice(1, 0, {
                        text: function (target) {
                            return $(target).datebox("options").cleanText;
                        },
                        handler: function (target) {
                            $(target).datebox("setValue", "");
                            $(target).datebox("hidePanel");
                        }
                    });
                    $.extend($.fn.datebox.defaults, {
                        buttons: buttons
                    });
                })(jQuery);
            }
            $(this).datebox({
                editable: false
            });
        },
        /*
        设置选择器值和文本
        Id：值
        Name：文本
        */
        setComboIdName: function (Id, Name) {
            $(this).combo("setValue", Id);
            $(this).combo("setText", Name);
        },
        /*
        绑定input按键事件
        key：键数字
        backFunc：回调
        */
        bindEve: function (key, backFunc) {
            $(this).keypress(function (event) {
                if (event.which == key) backFunc();
            });
        },
        comboClear: function (comboEnumItem) {
            switch (comboEnumItem) {
                case comboEnum.combo:
                    $(this).combo("clear");
                    break;
                case comboEnum.combobox:
                    $(this).combobox("clear");
                    break;
                case comboEnum.combotree:
                    $(this).combotree("clear");
                    break;
                case comboEnum.combogrid:
                    $(this).combogrid("clear");
                    break;
                case comboEnum.numberbox:
                    $(this).numberbox("clear");
                    break;
                case comboEnum.datetimebox:
                    $(this).combo("clear");
                    break;
                default:
                    $(this).combo("clear");
                    break;
            }
        },
        /**
        * 初始化自动补全控件
        * @param {String} url 查询路径
        * @param {Function} changeFunc(newValue, oldValue) 输入回调
        * @param {Function} selectFunc(record) 选择回调
        * @param {Object} defaultIdName 初始化的默认值（可空）
        * @param {Function} beforeLoad(param) 附加查询参数（可空）
        */
        initComboInput: function (url, changeFunc, selectFunc, defaultIdName, beforeLoad) {
            if (typeof changeFunc != "function") {
                changeFunc = function () { };
            }
            if (typeof selectFunc != "function") {
                selectFunc = function () { };
            }
            var input = $(this).combobox({
                valueField: "Id",
                textField: "Name",
                method: "get",
                mode: "remote",
                url: url,
                onShowPanel: function () {
                    $(this).combobox("reload");
                },
                onBeforeLoad: function (param) {
                    param.name = (param.q || "").trim();
                    if (typeof beforeLoad == "function") beforeLoad(param);
                },
                onSelect: selectFunc,
                onChange: changeFunc,
            });
            if (defaultIdName != undefined && defaultIdName != null) {
                $(this).combobox("select", defaultIdName.Id);
            }
            return input;
        }
    });
})(jQuery);

var comboEnum = {
    combo: "combo",
    combobox: "combobox",
    combotree: "combotree",
    combogrid: "combogrid",
    numberbox: "numberbox",
    datetimebox: "combobox",
}

/**
* 存储到本地
* @param {String} key 页面guid
* @param {String} val 值
*/
function setItemYG(key, val) {
    try {
        var retObj = getItemYG(key);
        if (retObj == null) {
            localStorage.setItem(key, JSON.stringify(([val])));
        } else {
            retObj = JSON.parse(retObj);
            var isCz = false;
            for (var i in retObj) {
                if (retObj[i].HabitType == val.HabitType) {
                    retObj[i] = val;
                    isCz = true;
                }
            }
            if (!isCz) {
                retObj.push(val);
            }
            localStorage.setItem(key, JSON.stringify(retObj));
        }
        return true;
    } catch (e) {
        return false;
    }
}

/**
* 覆盖localStorage
* @param {Array} data 数据
*/
function coverYGStorage(data) {
    localStorage.clear();
    for (var i in data) {
        var temp = [];
        for (var k in data[i].Val) {
            var temps = data[i].Val[k];
            temp.push({
                HabitType: temps.HabitType,
                SetVal: temps.SetVal
            });
        }
        localStorage.setItem(data[i].ViewKey, JSON.stringify(temp));
    }
}

/**
* 根据key获取值
* @param {String} key 页面guid 
*/
function getItemYG(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        return null;
    }
}

var defaultNum = 10;
/**
* 获取习惯
* @param {String} key 页面guid
* @param {Int} habitType 操作类型
*/
function getItemYGByHabitType(key, habitType) {
    var ret = getItemYG(key);
    if (ret != null && ret != "") {
        ret = JSON.parse(ret);
        var t = "";
        for (var i in ret) {
            if (ret[i].HabitType == habitType) {
                t = ret[i].SetVal;
                break;
            }
        }
        if (t != "") {
            return t;
        } else {
            switch (Number(habitType)) {
                case 1:
                    return defaultNum;
                default:
                    return "";
            }
        }
    } else {
        switch (Number(habitType)) {
            case 1:
                return defaultNum;
            default:
                return "";
        }
    }
}

/**
* 习惯处理
* @param {String} key 页面guid
* @param {String} grid 表格id
*/
function habitDispose(key, grid) {
    gridRowEve(key, grid);
    var ret = getItemYG(key);
    ret = JSON.parse(ret);
    try {
        if (ret != null) {
            for (var i in ret) {
                var item = ret[i];
                switch (Number(item.HabitType)) {
                    case 0://列显示隐藏
                        item.SetVal = JSON.parse(item.SetVal);
                        for (var i in item.SetVal) {
                            var items = item.SetVal[i];
                            if (!items.val) {
                                $(grid).datagrid("hideColumn", items.key);
                            }
                        }
                        break;
                    case 1://显示条数设置
                        var panel = $(grid).datagrid("getPager");
                        panel.pagination('refresh', {
                            pageSize: item.SetVal,
                        });
                        break;
                }
            }
        }
    } catch (e) { }
}

/**
* 绑定条数选择事件
* @param {String} viewKey 页面guid
* @param {String} grid 表格id
*/
function gridRowEve(viewKey, grid) {
    var panel = $(grid).datagrid("getPager");
    try {
        var options = panel.pagination("options");
        gridPageSize = options.pageSize;

        $(panel).pagination({
            onChangePageSize: function (pageSize) {
                if (pageSize != gridPageSize) {
                    gridPageSize = pageSize;
                    $.userHabitSave(viewKey, 1, pageSize, function (ret) {
                        setItemYG(viewKey, ret);
                    });
                }
            }
        });

    } catch (e) {
        //这里报错肯定是获取底部分页栏失败，不处理任何操作
    }
}