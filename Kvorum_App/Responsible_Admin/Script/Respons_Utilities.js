$(function () {

    $(".logoMain2,.logoImgSmall").click(function () {
        sessionStorage.clear();
        //  document.referrer = "HomePage.aspx"
        //history.back(-1);
        //history.length = 0
        //window.history.go(-2);
        //window.close();
        // history.go(-1)
        // history.forward(-1)
        //  history.forward()
        //  window.caches="HomePage.aspx"

        //location.hash ="HomePage.aspx"
        //window.caches.delete;
        // location.hash.length = 0;
        history.replaceState({ visited: true }, 'HomePage.aspx');
        window.location.href = "../HomePage.aspx"
    })

    $(".logoMain2,.logoImgSmall").mousedown(function () {
        sessionStorage.clear();
        //  document.referrer = "HomePage.aspx"
        //  history.back(-1);
        // history.length = 0
        // window.history.go(-2);
        //  window.close();
        // history.go(-1)
        // history.forward(-1)
        //  history.forward()
        //  history.
        window.location.href = "../HomePage.aspx"
        //
        // 

        //  
        //    
    })
    function SaveLog(EVENT_TYPE, EVENT_STATUS, EVENT_ROLE, EVENT_MODULE, EVENT_MESSAGE, EVENT_MAKER) {
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
                //console.log(JSON.stringify(result));
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
    /**
    sessionStorage.clear();
        window.location.href = "../ClientLogin.aspx"
     */
    $("#vse1").click(function () {
        $("#ad1").removeAttr("class");
        $(this).attr("class", "current")
    })
    $("#ad1").click(function () {
        $("#vse1").removeAttr("class");
        $(this).attr("class", "current")
    })
    $("#OutD").click(function () {
        sessionStorage.clear();
        window.location.href = "../ClientLogin.aspx"
    })

    var LogId = sessionStorage.getItem("Log")
    var ClId = sessionStorage.getItem("Clien_ID")
     
    var searchParams = new URLSearchParams(window.location.search)
    var eml = searchParams.get('eml')
    if (eml == null) {
        if (LogId == null) {
            window.location.href = "../ClientLogin.aspx";
        }
    }
    else {
        var obj = { "eml": eml }
        $.ajax({
            type: "POST",
            url: "../Super_Disp/CreateDispRequest.aspx/CHECK_EMAIL_GUID_RESPONSE",
            data: JSON.stringify(obj),
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                if (jsondata_[0].RESULT == 0) {
                    window.location.href = "../ClientLogin.aspx";
                }
                else {
                    LogId = jsondata_[0].LOGIN_ID
                    ClId = jsondata_[0].CLIENT_ID
                    sessionStorage.setItem("Log", LogId)
                    sessionStorage.setItem("Clien_ID", jsondata_[0].CLIENT_ID)
                    sessionStorage.setItem("role", jsondata_[0].ROLE_)
                    sessionStorage.setItem("REQUEST_ID", jsondata_[0].REQUEST_ID)
                    sessionStorage.setItem("REQUEST_STATUS", jsondata_[0].REQUEST_STATUS)
                }

            }
        })
    }
    //getLog
    var obj_Chk = {
        Log: LogId
    };
    $.ajax({
        type: "POST",
        url: "Resp_Requests.aspx/CheckCountOfRequestForResponsible",
        data: JSON.stringify(obj_Chk),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            var jsondata_2 = JSON.parse(result.d)

            if (jsondata_2.CountRequest == 0) {
                alertMessage("", "Для Вашей учётной записи нет доступной диспетчерской. Необходимо обратиться к администратору.", "")
                $("#close").click(function () {
                    $("#OutD").click();
                })
                window.onclick = function () { $("#OutD").click(); }
            }




        },

        error: function (r) {
            // //alert("Error");
            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            alert("FAIL");
        }
    });

    //var obj_lg = {
    //    Clid: ClId,
    //    EventModul: "Dispo",
    //    logDisp: LogId
    //};
    //$.ajax({
    //    type: "POST",
    //    url: "../Client_Admin/CreateOpject.aspx/GetLogs",
    //    data: JSON.stringify(obj_lg),
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        //  console.log(result)

    //        //var jsondata_1 = JSON.stringify(result.d)
    //        var jsondata_2 = JSON.parse(result.d)
    //        // console.log()
    //        //lftRol
    //        for (var i = 0; i < jsondata_2.length; i++) {
    //            var accNa_me;
    //            if (jsondata_2[i].ACCOUNT_NAME == "") {
    //                accNa_me = jsondata_2[i].E_MAIL
    //            }
    //            else {
    //                accNa_me = jsondata_2[i].ACCOUNT_NAME;
    //            }
    //            $("#lgs_").append("<li>" + jsondata_2[i].DATESTAMP + ": " + jsondata_2[i].EVENT_MESSAGE + ": " + accNa_me + "</li> ")
    //            //  $("#lgId_").text("Login_" + jsondata_2[i].ACCOUNT_QUANTITY)
    //        }


    //    },

    //    error: function (r) {
    //        // //alert("Error");
    //        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
    //    },
    //    failure: function (r) {
    //        alert("FAIL");
    //    }
    //});
    //getVersion

    //$.ajax({
    //    type: "POST",
    //    url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/GetVersion",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        //res = result;
    //        //console.log(result);
    //        var jsondata = JSON.stringify(result.ResultData)
    //        var jsondata_ = JSON.parse(jsondata)
    //        $("#vers").text("Версия: " + jsondata_.VERSION);
    //    },
    //    error: function (r) {
    //        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
    //    },
    //    failure: function (r) {
    //        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
    //    }
    //});
    $("#searchLog").keyup(function () {
        var srhvLog = $(this).val();
        srhvLog = (srhvLog.indexOf(":") > -1) ? srhvLog.replace(":", "|") : srhvLog;
        if (srhvLog.length != 0) {

            $("#lgs_").empty();
            var obj_lg2 = {
                l_g: LogId, Stext: $(this).val(), Cl: ClId
            };
            $.ajax({
                type: "POST",
                url: "../Client_Admin/CreateOpject.aspx/SearchLog",
                data: JSON.stringify(obj_lg2),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //  console.log(result)

                    //var jsondata_1 = JSON.stringify(result.d)
                    var jsondata_2 = JSON.parse(result.d)
                    // console.log()
                    //lftRol
                    for (var i = 0; i < jsondata_2.length; i++) {
                        var accNa_me;
                        if (jsondata_2[i].ACCOUNT_NAME == "") {
                            accNa_me = jsondata_2[i].E_MAIL
                        }
                        else {
                            accNa_me = jsondata_2[i].ACCOUNT_NAME;
                        }
                        $("#lgs_").append("<li>" + jsondata_2[i].DATESTAMP + ": " + jsondata_2[i].EVENT_MESSAGE + ": " + accNa_me + "</li> ")
                        //  $("#lgId_").text("Login_" + jsondata_2[i].ACCOUNT_QUANTITY)
                    }


                },

                error: function (r) {
                    // //alert("Error");
                    console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                },
                failure: function (r) {
                    alert("FAIL");
                }
            });
        }
        else {
            $("#lgs_").empty();
            var obj_lg = {
                Clid: ClId,
                EventModul: "Dispo",
                logDisp: LogId
            };
            $.ajax({
                type: "POST",
                url: "../Client_Admin/CreateOpject.aspx/GetLogs",
                data: JSON.stringify(obj_lg),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //  console.log(result)

                    //var jsondata_1 = JSON.stringify(result.d)
                    var jsondata_2 = JSON.parse(result.d)
                    // console.log()
                    //lftRol
                    for (var i = 0; i < jsondata_2.length; i++) {
                        var accNa_me;
                        if (jsondata_2[i].ACCOUNT_NAME == "") {
                            accNa_me = jsondata_2[i].E_MAIL
                        }
                        else {
                            accNa_me = jsondata_2[i].ACCOUNT_NAME;
                        }
                        $("#lgs_").append("<li>" + jsondata_2[i].DATESTAMP + ": " + jsondata_2[i].EVENT_MESSAGE + ": " + accNa_me + "</li> ")
                        //  $("#lgId_").text("Login_" + jsondata_2[i].ACCOUNT_QUANTITY)
                    }


                },

                error: function (r) {
                    // //alert("Error");
                    console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                },
                failure: function (r) {
                    alert("FAIL");
                }
            });
        }


    })

    $("#lgId").text('Login_' + LogId);
    var oobj3 = { LgId: LogId }
    $.ajax({
        type: "POST",
        url: "Resp_Requests.aspx/getRespName",
        data: JSON.stringify(oobj3),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //  console.log(result)

            //var jsondata_1 = JSON.stringify(result.d)
            var jsondata_2 = JSON.parse(result.d)
            // console.log(jsondata_2)
            $("#fiodsp").text(jsondata_2.RespName)
            $("#PhnDispo").text("+7 (495) 199-3854     доб.  ")//phnDisp2  + jsondata_2.Phone
            //$("#phnDisp2").text(jsondata_2.Phone) //<i class="fa fa-phone"   aria-hidden="true"></i>
            $("#phnDisp2").text("+7 (495) 199-3854    доб.  ")//+ jsondata_2.Phone
            //$("#DispName").text(jsondata_2.DName+" ,       ")
            $("#DispName").text("\"" + jsondata_2.RespName + "\",  ")
            //sessionStorage.setItem("Ddid", jsondata_2.DDId)
            //sessionStorage.setItem("DispPhoneNumber", jsondata_2.Phone)
            //sessionStorage.setItem("PhonePwd", jsondata_2.PhPwd);
            //sessionStorage.setItem("PhoneUrl", jsondata_2.PhUrl);
            ////lftRol
            //for (var i = 0; i < jsondata_2.length; i++) {
            //    $("#lftRol").append(" " + jsondata_2[i].ROLE_NAME + ", ")
            //    $("#lgId_").text("Login_" + jsondata_2[i].ACCOUNT_QUANTITY)
            //}


        },


        failure: function (r) {
            // alert("FAIL");
        }
    });
    var dkoy = sessionStorage.getItem("Ddid");
    if (LogId == null) {
        // window.location.href = '../Client_Admin/AlertingError.aspx?reason=l'
    }
    var loc = window.location.pathname;



    function gtOtcet(lg, from, to) {
        var o_bj = { "log": lg, "CrFrom": from, "CrTo": to }
        $.ajax({
            type: "POST",
            url: "Resp_Requests.aspx/GetOtcet",
            data: JSON.stringify(o_bj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //var dt = JSON.stringify(data)
                ////dt.replace("\\","")
                ////console.log(dt);
                //console.log(data)
                var jsonData_ = JSON.parse(data.d);
                var fPath;
                for (var i = 0; i < jsonData_.length; i++) {
                    fPath = jsonData_[i].ACCOUNT_NAME;
                }
                fPath = window.location.protocol + '//' + window.location.host + "/Disp_Admin/" + fPath
                console.log(fPath)
                var MyLink = document.getElementById('')
                var MyLink = document.getElementById('svc')
                MyLink.setAttribute('href', fPath);
                MyLink.click();
                $("#OtmenOt").click()
                // window.location.href = fPath;
                //.open(fPath);
                //  w.focus();
            }
        })
    }

    if (loc == "/Responsible_Admin/Resp_Requests.aspx") {
        sessionStorage.setItem('changes', null)
        $('.ui-loader-background,#loader').remove();
      //  $('a[href="Resp_Requests.aspx"]').css('background-color', '#FFDEAD')
        sessionStorage.setItem("All", "Notall");
        $("#flt").click(function () {
            var fltdisplay = $("#filter1").css("display")
            if (fltdisplay == 'none') {
                $("#filter1").show('1000');
            }
            else {
                $("#filter1").hide('1000');
            }
        })

        $("#OkOt").click(function () {
            gtOtcet(LogId, $("#startTimeP").val(), $("#endTimeP").val())
        })
        // alert(dkoy);
        $("#startTimeP,#endTimeP").change(function () {

            var start = $("#startTimeP").val();
            var end = $("#endTimeP").val();
            if (start != "" && end != "") {
                $("#OkOt").removeAttr('disabled');
            }
        })
        $("#otchet").click(function () {
            //  
            n = new Date();
            y = n.getFullYear();
            m = n.getMonth() + 1;
            d = n.getDate();
            //document.getElementById("startTimeP").innerHTML = d+ "." + m + "." + y ;
            var start = y + "-" + m + "-" + d
            //$('#startTimeP').val(start)
            //$('#endTimeP').val(start)
            alertOtcet("orx", "a", "n")
            //   getDate2();
        })
   

        $('#dgrm').click(function () {
            var dgrmvsbl = $("#dgrm_").css("display");
            if (dgrmvsbl == "none") {
                $("#dgrm_").show();
                gtdiagram();
                gtdiagram2();
                $('a:contains("CanvasJS.com")').hide();
                $('span:contains("Trial Version")').hide();
                $("button[state='menu']").hide();
                $(".canvasjs-chart-toolbar").remove();
                //  $(".canvasjs-chart-canvas:contains(Trial)").hide();
            }
            else {
                $("#dgrm_").hide();
            }

        })
        $("#search").click(function () {
            var stx = $(".shortSearch").val();
            if (stx.length != 0) {
                $('.formTable tr:not(:first)').remove();
                search1(LogId, stx)
                search2(LogId, stx)
            }


        })
        $(".shortSearch").keyup(function () {
            var stx1 = $(".shortSearch").val();
            if (stx1 == 0) {
                $('.formTable tbody').children('tr:not(:first)').remove();
                gtRequestTable2(LogId)
                getRequestTable(LogId)
            }
        })

        $("#filtering").click(function () {
            $('.formTable tr:not(:first)').remove();
            var firstname = $("#frstname").val();
            firstname = "\"" + firstname + "\"";
            var fltObj = [];
            fltObj.push({ "MOBILE_NUMBER": ($("#requestNumber").val() == "") ? 0 : $("#requestNumber").val(), "ROOM_NUMBER": ($("#rmNum").val() == "") ? "0" : $("#rmNum").val(), "OBJECT_ID": $("#object").val(), "ROOM_TYPE_ID": $("#rt").val(), "FIRST_NAME": $("#frstname").val(), "CR_DATE_FROM": $("#startTime").val(), "CR_DATE_TO": $("#endTime").val(), "STATUSE": $("#sts").val() })
            $('.ui-loader-background').show();
            $('#loader').show();
            makefilter(fltObj, LogId)
            //makefilter2(fltObj, LogId);
            //if ($("#requestNumber").val() == "" && $("#rmNum").val() == "" && $("#object").val() == 0 && $("#rt").val() == 0 && $("#frstname").val() && $("#startTime").val() == "" && $("#endTime").val() == "" && $("#sts").val()==0) {
            //    gtRequestTable2(LogId)
            //    getRequestTable(LogId)
            //}
        })
        $('#sbrflt').click(function () {
            $('.formTable tr:not(:first)').remove();
            gtRequestTable2(LogId)
            getRequestTable(LogId)
            $("#requestNumber").val("");
            $("#rmNum").val("");
            $("#object").val(0);
            $("#rt").val(0);
            $("#frstname").val("");
            $("#sts").val(0)
            $("#startTime").val("");
            $("#endTime").val("");

        })
       // gtTypeOfroom()
        //alertMessage("sef", "awd", "awd");]
        //gtObjectsById(LogId)
       // gtStatuses();

        // $("#flt").click(function ()
        //{

        //    alertMessage("awd","awd","awd")
        //})
        $('.ui-loader-background').show();
        $('#loader').show();
        // gtRequestTable2(LogId)
       // getRequestTable(LogId)
       // $('#body').load('../Super_Disp/DispRequests.aspx #contentRegister')
        //$("#startTimeP,#endTimeP").removeAttr('max')
        loadUnitedSuperUtilites_And_page()
    }
    if (loc == "/Responsible_Admin/CreateRequest.aspx")
    {
        GetLogs();
       // $('#body').load('../Super_Disp/CreateDispRequest.aspx #contentRegister')
        loadSuperDisp_Utilities_And_()
       // loadUnitedSuperUtilites_And_page()
    }
  
    


   

  
})
function GetLogs()
{
    var path = window.location.pathname.toString();
    var LogId = sessionStorage.getItem("Log")
    var EVENT_MODULE = (path.indexOf("Manager/") > -1) ? "Manager" : (path.indexOf("Super_Disp/") > -1) ? "SuperDisp" : (path.indexOf("Responsible_Admin/") > -1) ? "Responsible" : (path.indexOf("Disp_Admin/") > -1) ? "Disp" : "Диспетчер поставщика";
    var obj_lg = {
        lg_: LogId,
        EventModul: EVENT_MODULE,
    };
    $.ajax({
        type: "POST",
        url: "../Client_Admin/CreateOpject.aspx/GetLogs",
        data: JSON.stringify(obj_lg),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //  ////console.log(result)

            //var jsondata_1 = JSON.stringify(result.d)
            var jsondata_2 = JSON.parse(result.d)
            // ////console.log()
            //lftRol
            for (var i = 0; i < jsondata_2.length; i++) {
                var accNa_me;
                if (jsondata_2[i].ACCOUNT_NAME == "") {
                    accNa_me = jsondata_2[i].E_MAIL
                }
                else {
                    accNa_me = jsondata_2[i].ACCOUNT_NAME;
                }
                if (jsondata_2[i].EVENT_STATUS != "") {
                    $("#lgs_").append("<li>" + jsondata_2[i].DATESTAMP + ": " + jsondata_2[i].EVENT_MESSAGE + ": " + accNa_me + "</li> ")
                }
                else {
                    $("#lgs_").append("<li>" + jsondata_2[i].EVENT_MESSAGE + "</li> ")
                }
            }

            $('.ui-loader-background,#loader').hide()
        },

        error: function (r) {
            // //alert("Error");
            ////console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            $('.ui-loader-background,#loader').hide()
        },
        failure: function (r) {
            $('.ui-loader-background,#loader').hide()
            alert("FAIL");
        }
    });
}
function loadSuperDisp_Utilities_And_() {
   // $('#body').load('../Super_Disp/CreateDispRequest.aspx #contentRegister')

    var script = document.createElement("script");
    script.src = "../Super_Disp/Utilities/SuperDisp_Utulities.js"//;?" + Math.random()+"
    script.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(script);
}
function loadUnitedSuperUtilites_And_page() {
    $('#body').load('../Super_Disp/DispRequests.aspx #contentRegister')
    var script = document.createElement("script");

    script.src = "../Super_Disp/Utilities/UnitedSuper_Utilities.js?" + Math.random()+""//
    script.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(script);
}
