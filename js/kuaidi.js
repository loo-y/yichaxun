//http://api.ickd.cn/?com=huitong&nu=210119808574&id=568AC6659ED39224A0E687698018D747&type=json&encode=utf8

/* 
    爱查快递api查询url
    com:必须，快递公司代码（英文），所支持快递公司见如下列表
    nu：必须，快递单号，长度必须大于5位
    id：必须，授权KEY，申请请点击快递查询API申请方式
    type：可选，返回结果类型，值分别为 html json text xml；
    encode:可选，gbk（默认）|utf8；
    ord：可选，asc（默认）|desc，返回结果排序;
    lang:可选，en返回英文结果，目前仅支持部分快递（EMS、顺丰、DHL）。
*/
var resDiv, sNum, selects, requestUrl, responseText, expTextName, message, mailNo, status, process, datalength;
var appid = "568AC6659ED39224A0E687698018D747";
var requestType = "json";
var requestEncode = "utf8";
var responseStatus = ["查询失败", "正常", "派送中", "已签收", "退回"];
var errorCode = ["", "单号不存在", "验证码错误", "链接查询服务器失败", "程序内部错误", "程序执行错误", "快递单号格式错误", "快递公司错误", "未知错误"];

String.prototype.format = function () {
    // use this string as the format
    // walk through each argument passed in
    for (var fmt = this, ndx = 0; ndx < arguments.length; ++ndx) {
        // replace {0} with argument[0], {1} with argument[1], etc.
        fmt = fmt.replace(new RegExp('\\{' + ndx + '\\}', "g"), arguments[ndx]);
    }
    // return the formatted string
    return fmt;
};

function clickF() {
    requestUrl = "http://api.ickd.cn/?com={0}&nu={1}&id={2}&type={3}&encode={4}"
        .format(selects[selects.selectedIndex].value,
                sNum.value,
                appid,
                requestType,
                requestEncode);

    WinJS.xhr({ url: requestUrl })
        .done(function complete(result) {
            if (result.status === 200) {
                responseText = eval("("+result.responseText+")");
                expTextName.innerText = responseText.expTextName;
                message.innerText = responseText.message;
                mailNo.innerText = responseText.mailNo;
                status.innerText = (!parseInt(responseText.status) && responseText.errorCode) ? errorCode[responseText.errorCode] : responseStatus[responseText.status] ;
                process.innerHTML = "";
                responseText.data && (datalength = responseText.data.length);
                if (datalength > 0) {
                    var table, otr, otd, tr, td, i;
                    table = document.createElement("table");
                    otr = document.createElement("tr");
                    otd = document.createElement("td");
                    otd.appendChild(document.createTextNode("时间日期"));
                    td = otd.cloneNode(false);
                    td.appendChild(document.createTextNode("发送状态"));
                    otr.appendChild(otd);
                    otr.appendChild(td);
                    table.appendChild(otr);

                    for (i = 0; i < datalength; i++) {
                        tr = otr.cloneNode(false);
                        //time
                        td = otd.cloneNode(false);
                        td.appendChild(document.createTextNode(responseText.data[i].time));
                        tr.appendChild(td);
                        //context
                        td = otd.cloneNode(false);
                        td.appendChild(document.createTextNode(responseText.data[i].context));
                        tr.appendChild(td);
                        //append to table
                        table.appendChild(tr);
                    }
                    process.appendChild(table);
                }
            }
        });
}
