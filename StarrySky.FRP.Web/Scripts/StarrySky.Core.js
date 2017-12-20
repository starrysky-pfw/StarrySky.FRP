
(function ($) {
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
});