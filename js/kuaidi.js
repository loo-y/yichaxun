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
var resDiv, sNum, selects, requestUrl;
var appid = "568AC6659ED39224A0E687698018D747";
var requestType = "json";
var requestEncode = "utf8";

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
    requestUrl = "http://api.ickd.cn/?com={0}&nu={1}&id={2}&type=&encode="
        .format(selects[selects.selectedIndex].value,
                sNum.value,
                appid,
                requestType,
                requestEncode);

    WinJS.xhr({ url: requestUrl })
        .done(function complete(result) {
            if (result.status === 200) {
                resDiv.innerText = result.responseText;
            }
        });
}
