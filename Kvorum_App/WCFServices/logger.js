function SaveLog(EVENT_TYPE, EVENT_STATUS, EVENT_ROLE, EVENT_MODULE, EVENT_MESSAGE, EVENT_MAKER)
{
    var obj = {
        EVENT_TYPE: EVENT_TYPE,
        EVENT_STATUS: EVENT_STATUS,
        EVENT_ROLE: EVENT_ROLE,
        EVENT_MODULE: EVENT_MODULE,
        EVENT_MESSAGE: EVENT_MESSAGE,
        EVENT_MAKER: EVENT_MAKER
    };
    $.ajax({
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/InsertLog",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(JSON.stringify(result)); 
        },
        error: function (r) {
            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        }
    });
    return;
}

function GetLog(EVENT_TYPE, EVENT_ROLE, EVENT_MODULE) {
    var obj = {
        EVENT_TYPE: EVENT_TYPE,
        EVENT_ROLE: EVENT_ROLE,
        EVENT_MODULE: EVENT_MODULE        
    };
    $.ajax({
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/GetLog",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(JSON.stringify(result));
        },
        error: function (r) {
            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        }
    });
    return;
}