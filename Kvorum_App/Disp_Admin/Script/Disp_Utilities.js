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
    var searchParams = new URLSearchParams(window.location.search)
    var eml = searchParams.get('eml')
    var ClId = sessionStorage.getItem("Clien_ID")
    if (eml == null) {
    if (LogId == null) {
            window.location.href = "../ClientLogin.aspx";

        }
        if (ClId == null) {
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
                    sessionStorage.setItem("Clien_ID", jsondata_[0].CLIENT_ID)
                    sessionStorage.setItem("Log", LogId)
                    sessionStorage.setItem("role", jsondata_[0].ROLE_)
                    sessionStorage.setItem("REQUEST_ID", jsondata_[0].REQUEST_ID)
                    sessionStorage.setItem("REQUEST_STATUS", jsondata_[0].REQUEST_STATUS)
                }

            }
        })
    }
    // LogId = 312;

    //getLog
    var obj_Chk = {
        Log: LogId
    };
    $.ajax({
        type: "POST",
        url: "RegisterRequest.aspx/CheckkDisp",
        data: JSON.stringify(obj_Chk),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            var jsondata_2 = JSON.parse(result.d)

            if (jsondata_2.HasDisp == 0) {
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

    var obj_lg = {
       
        EventModul: "Disp",
        lg_: LogId
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
                if (jsondata_2[i].EVENT_STATUS != "") {
                    $("#lgs_").append("<li>" + jsondata_2[i].DATESTAMP + ": " + jsondata_2[i].EVENT_MESSAGE + ": " + accNa_me + "</li> ")
                }
                else {
                    $("#lgs_").append("<li>" + jsondata_2[i].EVENT_MESSAGE + "</li> ")
                }
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
    //getVersion

    $.ajax({
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/GetVersion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //res = result;
            //console.log(result);
            var jsondata = JSON.stringify(result.ResultData)
            var jsondata_ = JSON.parse(jsondata)
            $("#vers").text("Версия: " + jsondata_.VERSION);
        },
        error: function (r) {
            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        }
    });
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
        url: "AllRequsts.aspx/GetDispName",
        data: JSON.stringify(oobj3),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //  console.log(result)

            //var jsondata_1 = JSON.stringify(result.d)
            var jsondata_2 = JSON.parse(result.d)
            // console.log(jsondata_2)
            $("#fiodsp").text(jsondata_2.dspName)
            $("#PhnDispo").text("+7 (495) 199-3854     доб.  " + jsondata_2.Phone)//phnDisp2
            //$("#phnDisp2").text(jsondata_2.Phone) //<i class="fa fa-phone"   aria-hidden="true"></i>
            $("#phnDisp2").text("+7 (495) 199-3854    доб.  " + jsondata_2.Phone)
            //$("#DispName").text(jsondata_2.DName+" ,       ")
            $("#DispName").text("\"" + jsondata_2.DName + "\",  ")
            sessionStorage.setItem("Ddid", jsondata_2.DDId)
            sessionStorage.setItem("DispPhoneNumber", jsondata_2.Phone)
            sessionStorage.setItem("PhonePwd", jsondata_2.PhPwd);
            sessionStorage.setItem("PhoneUrl", jsondata_2.PhUrl);
            //lftRol
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
            url: "RegisterRequest.aspx/GetOtcet",
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

    if (loc == "/Disp_Admin/RegisterRequest.aspx") {
        sessionStorage.setItem('changes', null)
        $('a[href="RegisterRequest.aspx"]').css('background-color', '#FFDEAD')
        sessionStorage.setItem("All", "Notall");
    

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
        sessionStorage.removeItem("RId");
        sessionStorage.removeItem("st")
        $('#requestNumber').keypress(validateNumber);
        //$('#rmNum').keypress(validateNumber);
        //$("#flt").click(function ()
        //{
        //   // alert("awd")
        //  alertMessage("sef", "awd", "awd");
        //    //alertWithButton("assss","asss","aasfesg")

        //})
        gtCounts(LogId);

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

    
       
        //gtTypeOfroom()
        //alertMessage("sef", "awd", "awd");]
       // gtObjectsById(LogId)
     //   gtStatuses();

        // $("#flt").click(function ()
        //{

        //    alertMessage("awd","awd","awd")
        //})
        $('.ui-loader-background').show();
        $('#loader').show();
        // gtRequestTable2(LogId)
      //  getRequestTable(LogId)
        //$("#startTimeP,#endTimeP").removeAttr('max')
      //  $('#body').load('../Super_Disp/DispRequests.aspx #contentRegister')
        loadUnitedSuperUtilites_And_page()
    }
    if (loc == "/Disp_Admin/AllRequsts.aspx") {
        sessionStorage.setItem('changes', null)
        $('a[href="AllRequsts.aspx"]').css('background-color', '#FFDEAD')
        sessionStorage.setItem("All", "all");
        $('.ui-loader-background').show();
        $('#loader').show();
      //  GetAllRequest(LogId, dkoy)//AAll
        loadUnitedSuperUtilites_And_page()

        gtAllCounts(dkoy)
        sessionStorage.removeItem("RId");
        sessionStorage.removeItem("st")
        gtATypeOfroom()
        //alert(dkoy);
        gtAStatuses()
        gtAObjectsById(LogId)
        $('#ArequestNumber').keypress(validateNumber);
        //  $('#ArmNum').keypress(validateNumber);
        $("#AllFiltering").click(function () {
            $('.formTable tr:not(:first)').remove();
            var fltObj = [];
            fltObj.push({ "MOBILE_NUMBER": ($("#ArequestNumber").val() == "") ? 0 : $("#ArequestNumber").val(), "ROOM_NUMBER": ($("#ArmNum").val() == "") ? "0" : $("#ArmNum").val(), "OBJECT_ID": $("#Aobject").val(), "ROOM_TYPE_ID": $("#Art").val(), "FIRST_NAME": $("#Afrstname").val(), "CR_DATE_FROM": $("#AstartTime").val(), "CR_DATE_TO": $("#AendTime").val(), "STATUSE": $("#Asts").val() })
            // var ss = //ClId
            // makeAFilter2(LogId, dkoy, fltObj)
            $('.ui-loader-background').show();
            $('#loader').show();
            makeAFilter(LogId, dkoy, fltObj)


        })
        $("#Aflt").click(function () {
            var fltdisplay = $("#Afilter1").css("display")
            if (fltdisplay == 'none') {
                $("#Afilter1").show('1000');
            }
            else {
                $("#Afilter1").hide('1000');
            }
        })
        $('#Adgrm').click(function () {
            var dgrmvsbl = $("#Adgrm_").css("display");
            if (dgrmvsbl == "none") {
                $("#Adgrm_").show();
                gtdiagram3();
                gtdiagram4();
                // $('a:contains("CanvasJS.com")').hide();
                //$('span:contains("Trial Version")').hide();
                // $("button[state='menu']").hide();
                // $(".canvasjs-chart-toolbar").remove();
                //  $(".canvasjs-chart-canvas:contains(Trial)").hide();
            }
            else {
                $("#Adgrm_").hide();
            }

        })
        $("#Asearch").click(function () {
            var stx = $("#AshortSearch").val();
            if (stx.length != 0) {
                $('.formTable tr:not(:first)').remove();
                Asearch2(dkoy, stx, LogId)
                Asearch1(dkoy, stx, LogId)
            }
        })
        $("#AshortSearch").keyup(function () {
            var stx1 = $("#AshortSearch").val();
            if (stx1 == 0) {
                $('.formTable tbody').children('tr:not(:first)').remove();
                GetAllRequest(LogId, dkoy)
            }
        })
        $('#Asbrflt').click(function () {
            $('.formTable tr:not(:first)').remove();
            //gtRequestTable2(LogId)
            //getRequestTable(LogId)
            GetAllRequest(LogId, dkoy)
            $("#ArequestNumber").val("");
            $("#ArmNum").val("");
            $("#Aobject").val(0);
            $("#Art").val(0);
            $("#Afrstname").val("");
            $("#Asts").val(0)
            $("#AstartTime").val("");
            $("#AendTime").val("");


        })
        $("#Aotchet").click(function () {
            n = new Date();
            y = n.getFullYear();
            m = n.getMonth() + 1;
            d = n.getDate();
            //document.getElementById("startTimeP").innerHTML = d+ "." + m + "." + y ;
            var start = y + "-" + m + "-" + d
            //$('#startTimeP').val(start)
            //$('#endTimeP').val(start)
            alertOtcet("orx", "a", "n")
            // getDate2();
        })
        $("#OkOt").click(function () {
            gtAOtcet(dkoy, $("#startTimeP").val(), $("#endTimeP").val())
            // alert("Ok");
        })
        $("#startTimeP,#endTimeP").change(function () {

            var start = $("#startTimeP").val();
            var end = $("#endTimeP").val();
            if (start != "" && end != "") {
                $("#OkOt").removeAttr('disabled');
            }
        })
    }
    function loadUnitedSuperUtilites_And_page() {
       // $('#body').load('../Super_Disp/DispRequests.aspx #contentRegister')
        var script = document.createElement("script");

        script.src = "../Super_Disp/Utilities/UnitedSuper_Utilities.js"//?+ Math.random();
        script.type = "text/javascript";
        document.getElementsByTagName("body")[0].appendChild(script);
    }
    function gtAOtcet(d, from, to) {

        var o_bj = { "dd": d, "CrFrom": from, "CrTo": to }
        $.ajax({
            type: "POST",
            url: "RegisterRequest.aspx/GetOtcetAll",
            data: JSON.stringify(o_bj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsonData_ = JSON.parse(data.d);
                var fPath;
                for (var i = 0; i < jsonData_.length; i++) {
                    fPath = jsonData_[i].ACCOUNT_NAME;
                }
                fPath = window.location.protocol + '//' + window.location.host + "/Disp_Admin/" + fPath
                //console.log(fPath)
                var MyLink = document.getElementById('')
                var MyLink = document.getElementById('Asvc')
                MyLink.setAttribute('href', fPath);
                MyLink.click();
                $("#OtmenOt").click()
            }
        })
    }
    function Asearch1(d, St, log) {
        var Sobj1 = { "dd": d, "txt": St, "lg": log }
        $.ajax({
            type: "POST",
            url: "AllRequsts.aspx/AllSearch1",
            data: JSON.stringify(Sobj1),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                for (var i = 0; i < jsondata_.length; i++) {
                    if (jsondata_[i].ATRIBUTE == "Curr") {
                        var objsDatas;
                        if (jsondata_[i].ADRESS.endsWith(', ')) {
                            objsDatas = jsondata_[i].ADRESS + " " + jsondata_[i].ROOM_TYPE + " № " + jsondata_[i].ROOM_NUMBER
                        }
                        else {
                            objsDatas = jsondata_[i].ADRESS + ", " + jsondata_[i].ROOM_TYPE + " № " + jsondata_[i].ROOM_NUMBER
                        }//<td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].ROOM_TYPE + "</a></td>
                        var tic = (jsondata_[i].COMMENT_FILE == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                        var emergency = (jsondata_[i].EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";

                        $("#header_").after("<tr><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].REQUEST_ID + "</a></td><td><a " + emergency + " class='ind' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + rc[0].indName + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") title='" + objsDatas + "' class='adr' href='CreateRequest.aspx'>" + objsDatas + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].CR_DATE.substring(0, jsondata_[i].CR_DATE.indexOf(' ')) + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' title='" + jsondata_[i].REQUEST_TEXT + "'>" + jsondata_[i].REQUEST_TEXT + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")  href='CreateRequest.aspx'>" + jsondata_[i].ACCOUNT_NAME + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].PLAN_END_DATE.substring(0, jsondata_[i].PLAN_END_DATE.indexOf(' ')) + "</a></td><td><a " + emergency + " href='CreateRequest.aspx'onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")>" + jsondata_[i].STATUS
                            + "</a></td><td style='border: 2px solid lightgray;border - right: none;'>" + tic + "</td></tr>")

                        // gtObjBiInd(i, jsondata_[i].INDIVIDUAL_ID);// <td class='prs" + i + "'></td>
                        // gtIspol(i, jsondata_[i].REQUEST_ID)
                        // gtservices(i, jsondata_[i].REQUEST_ID, jsondata_[i].STATUS_ID)
                    }//style="color: black;"
                    if (jsondata_[i].ATRIBUTE == "NotC") {
                        var objsDatas;
                        if (jsondata_[i].ADRESS.endsWith(', ')) {
                            objsDatas = jsondata_[i].ADRESS + " " + jsondata_[i].ROOM_TYPE + " № " + jsondata_[i].ROOM_NUMBER
                        }
                        else {
                            objsDatas = jsondata_[i].ADRESS + ", " + jsondata_[i].ROOM_TYPE + " № " + jsondata_[i].ROOM_NUMBER
                        }//<td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' style='color:black'> " + jsondata_[i].ROOM_TYPE + "</a></td>
                        var tic = (jsondata_[i].COMMENT_FILE == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : ""; 7
                        var emergency_ = (jsondata_[i].EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "style='color: black;'";

                        $("#header_").after("<tr><td><a " + emergency_ + " href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")   >" + jsondata_[i].REQUEST_ID + "</a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'" + emergency_ + " >" + jsondata_[i].FIRST_NAME + "</a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' " + emergency_ + " title='" + objsDatas + "'>" + objsDatas + "</a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' " + emergency_ + ">" + jsondata_[i].CR_DATE.substring(0, jsondata_[i].CR_DATE.indexOf(' ')) + "</a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")  href='CreateRequest.aspx' " + emergency_ + " title='" + jsondata_[i].REQUEST_TEXT + "'>" + jsondata_[i].REQUEST_TEXT + "</a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' " + emergency_ + ">" + jsondata_[i].ACCOUNT_NAME + "</a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' " + emergency_ + ">" + jsondata_[i].PLAN_END_DATE.substring(0, jsondata_[i].PLAN_END_DATE.indexOf(' ')) + "</a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' " + emergency_ + ">" + jsondata_[i].STATUS
                            + "</a></td><td style='border: 2px solid lightgray;border - right: none;'>" + tic + "</td></tr>")

                        // gtObjBiInd(i, jsondata_[i].INDIVIDUAL_ID);//<td style='color: black;' class='prsS" + i + "'></td>
                        // gtIspol(i, jsondata_[i].REQUEST_ID)
                        // gtservices3(i, jsondata_[i].REQUEST_ID, jsondata_[i].STATUS_ID)
                        //$(".prs" + i + "").find("[onclick='SendId(" + jsondata_[i].REQUEST_ID + ")']").removeAttr("href")
                        // $("[onclick='SendId(" + jsondata_[i].REQUEST_ID +")']").removeAttr("href")
                    }
                }
            }
        })
    }
    function Asearch2(d, St, log) {
        var Sobj2 = { "dd": d, "txt": St, "lg": log }
        $.ajax({
            type: "POST",
            url: "AllRequsts.aspx/AllSearch2",
            data: JSON.stringify(Sobj2),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                for (var i = 0; i < jsondata_.length; i++) {
                    if (jsondata_[i].ATRIBUTE == "Curr") {
                        var rc = jsondata_[i].REQUEST_COMMENT.substring(jsondata_[i].REQUEST_COMMENT.indexOf('|') + 1, jsondata_[i].REQUEST_COMMENT.length)
                        rc = JSON.parse(rc);
                        var objsDatas;
                        if (rc[0].Object_Adress.endsWith(', ')) {
                            objsDatas = rc[0].Object_Adress + " " + jsondata_[i].ROOM_TYPE + " № " + rc[0].room
                        }
                        else {
                            objsDatas = rc[0].Object_Adress + ", " + jsondata_[i].ROOM_TYPE + " № " + rc[0].room
                        }//<td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].ROOM_TYPE + "</a></td>

                        var tic = (jsondata_[i].COMMENT_FILE == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                        var emergency = (jsondata_[i].EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";

                        $("#header_").after("<tr><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].REQUEST_ID + "</a></td><td><a " + emergency + " class='ind' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + rc[0].indName + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") title='" + objsDatas + "' class='adr' href='CreateRequest.aspx'>" + objsDatas + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].CR_DATE.substring(0, jsondata_[i].CR_DATE.indexOf(' ')) + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' title='" + jsondata_[i].REQUEST_TEXT + "'>" + jsondata_[i].REQUEST_TEXT + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")  href='CreateRequest.aspx'>" + jsondata_[i].ACCOUNT_NAME + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].PLAN_END_DATE.substring(0, jsondata_[i].PLAN_END_DATE.indexOf(' ')) + "</a></td><td><a " + emergency + " href='CreateRequest.aspx'onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")>" + jsondata_[i].STATUS
                            + "</a></td><td style='border: 2px solid lightgray;border - right: none;'>" + tic + "</td></tr>")


                    }
                    if (jsondata_[i].ATRIBUTE == "NotC") {
                        var rc = jsondata_[i].REQUEST_COMMENT.substring(jsondata_[i].REQUEST_COMMENT.indexOf('|') + 1, jsondata_[i].REQUEST_COMMENT.length)
                        rc = JSON.parse(rc);
                        var objsDatas;
                        if (rc[0].Object_Adress.endsWith(', ')) {
                            objsDatas = rc[0].Object_Adress + " " + jsondata_[i].ROOM_TYPE + " № " + rc[0].room
                        }
                        else {
                            objsDatas = rc[0].Object_Adress + ", " + jsondata_[i].ROOM_TYPE + " № " + rc[0].room
                        }//<td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' style='color:black'>" + jsondata_[i].ROOM_TYPE + "</a></td>
                        var tic = (jsondata_[i].COMMENT_FILE == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : ""; 7
                        var emergency_ = (jsondata_[i].EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "style='color: black;'";

                        $("#header_").after("<tr><td><a " + emergency_ + " href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")   >" + jsondata_[i].REQUEST_ID + "</a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'" + emergency_ + " >" + rc[0].indName + "</a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' " + emergency_ + " title='" + objsDatas + "'>" + objsDatas + "</a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' " + emergency_ + ">" + jsondata_[i].CR_DATE.substring(0, jsondata_[i].CR_DATE.indexOf(' ')) + "</a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")  href='CreateRequest.aspx' " + emergency_ + " title='" + jsondata_[i].REQUEST_TEXT + "'>" + jsondata_[i].REQUEST_TEXT + "</a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' " + emergency_ + ">" + jsondata_[i].ACCOUNT_NAME + "</a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' " + emergency_ + ">" + jsondata_[i].PLAN_END_DATE.substring(0, jsondata_[i].PLAN_END_DATE.indexOf(' ')) + "</a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' " + emergency_ + ">" + jsondata_[i].STATUS
                            + "</a></td><td style='border: 2px solid lightgray;border - right: none;'>" + tic + "</td></tr>")




                    }
                }
            }
        })
    }
    function drawChart3() {
        var otprav = parseInt($('#Otpravv').text())
        var AVrapot = parseInt($("#AvraboteC").text());
        var AOtmen = parseInt($("#AOtmenC").text());
        var Azakrit = parseInt($("#AzakritC").text());
        var ArabotVipol = parseInt($("#AvpolneneC").text());
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['В работе', AVrapot],
            ['Отправлена', otprav],
            ['Отменена', AOtmen],
            ['Закрыто', Azakrit],
            ['Работа выпонена', ArabotVipol]

        ]);

        var options = {
            title: 'Количество'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);//// 
        sessionStorage.setItem("ADownKol2", chart.getImageURI())
        //  console.log(chart.getImageURI())
        //download(chart.getImageURI(), 'Количество.png', "image/png")
    }
    function gtdiagram3() {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart3);
        $("div[dir='ltr']").css("margin-left", '-70px')

    }
    function drawVisualization2() {

        var allof = parseInt($("#AAlloff").text())
        var zakrit = parseInt($("#AzakritC").text())
        var wrapper = new google.visualization.ChartWrapper({
            chartType: 'ColumnChart',
            dataTable: [['', 'Всего создано', 'Закрыто'],
            ['', allof, zakrit]],
            options: { 'title': 'Закрытые заявки' },
            containerId: 'vis_div2'
        });
        wrapper.draw();
        var imageUri = wrapper.getChart().getImageURI();
        sessionStorage.setItem("DownVseqo4", imageUri)
        // download(imageUri, 'Закрытие заявки.png', "image/png")
    }
    function gtdiagram4() {
        google.charts.load('current');   // Don't need to specify chart libraries!
        google.charts.setOnLoadCallback(drawVisualization2);


    }
    function gtAllCounts(d) {
        var obj = { "dd": d }
        $.ajax({
            type: "POST",
            url: "AllRequsts.aspx/getAllCounts",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var jsonData_ = $.parseJSON(data.d);
                $("#AvraboteC").text(jsonData_.CVrabot);
                $("#AvpolneneC").text(jsonData_.CVipol);
                $("#AOtmenC").text(jsonData_.COtmen);
                $("#AzakritC").text(jsonData_.CZakrit);
                $("#AAlloff").text(jsonData_.Alloff)
                $('#Otpravv').text(jsonData_.Otpravv);
            }
        })
    }
    function makeAFilter2(log, d, fltO) {
        var AFobj2 = { "lg": log, "dd": d, "flt": fltO }
        $.ajax({
            type: "POST",
            url: "AllRequsts.aspx/AFiltering2",
            data: JSON.stringify(AFobj2),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                for (var i = 0; i < jsondata_.length; i++) {
                    if (jsondata_[i].ATRIBUTE == "Curr") {
                        var rc = jsondata_[i].REQUEST_COMMENT.substring(jsondata_[i].REQUEST_COMMENT.indexOf('|') + 1, jsondata_[i].REQUEST_COMMENT.length)
                        rc = JSON.parse(rc);
                        var objsDatas;
                        if (rc[0].Object_Adress.endsWith(', ')) {
                            objsDatas = rc[0].Object_Adress + " " + jsondata_[i].ROOM_TYPE + " № " + rc[0].room
                        }
                        else {
                            objsDatas = rc[0].Object_Adress + ", " + jsondata_[i].ROOM_TYPE + " № " + rc[0].room
                        }//<td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].ROOM_TYPE + "</a></td>
                        var tic = (jsondata_[i].COMMENT_FILE == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                        var emergency = (jsondata_[i].EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";

                        $("#header_").after("<tr><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].REQUEST_ID + "</a></td><td><a " + emergency + " class='ind' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + rc[0].indName + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") class='adr' href='CreateRequest.aspx' title='" + objsDatas + "' >" + objsDatas + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].CR_DATE.substring(0, jsondata_[i].CR_DATE.indexOf(' ')) + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")href='CreateRequest.aspx' title='" + jsondata_[i].REQUEST_TEXT + "'>" + jsondata_[i].REQUEST_TEXT + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")  href='CreateRequest.aspx'>" + jsondata_[i].ACCOUNT_NAME + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].PLAN_END_DATE.substring(0, jsondata_[i].PLAN_END_DATE.indexOf(' ')) + "</a></td><td><a " + emergency + " href='CreateRequest.aspx'onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")>" + jsondata_[i].STATUS
                            + "</a></td><td style='border: 2px solid lightgray;border - right: none;'>" + tic + "</td></tr >")

                    }
                    if (jsondata_[i].ATRIBUTE == "NotC") {
                        var rc = jsondata_[i].REQUEST_COMMENT.substring(jsondata_[i].REQUEST_COMMENT.indexOf('|') + 1, jsondata_[i].REQUEST_COMMENT.length)
                        rc = JSON.parse(rc);
                        var objsDatas;
                        if (rc[0].Object_Adress.endsWith(', ')) {
                            objsDatas = rc[0].Object_Adress + " " + jsondata_[i].ROOM_TYPE + " № " + rc[0].room
                        }
                        else {
                            objsDatas = rc[0].Object_Adress + ", " + jsondata_[i].ROOM_TYPE + " № " + rc[0].room
                        }//<td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' style='color:black'>" + jsondata_[i].ROOM_TYPE + "</a></td>
                        var tic = (jsondata_[i].COMMENT_FILE == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                        var emergency_NC = (jsondata_[i].EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : ' style = "color: black;"';

                        $("#header_").after("<tr><td><a " + emergency_NC + " href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")  >" + jsondata_[i].REQUEST_ID + "</a></td><td><a  href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")   " + emergency_NC + " >" + rc[0].indName + "</a></td><td><a href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")   " + emergency_NC + " title='" + objsDatas + "'>" + objsDatas + "</a></td><td><a href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")   " + emergency_NC + ">" + jsondata_[i].CR_DATE.substring(0, jsondata_[i].CR_DATE.indexOf(' ')) + "</a></td><td><a href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")   " + emergency_NC + " title='" + jsondata_[i].REQUEST_TEXT + "'>" + jsondata_[i].REQUEST_TEXT + "</a></td><td><a href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")   " + emergency_NC + ">" + jsondata_[i].ACCOUNT_NAME + "</a></td><td><a href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")   " + emergency_NC + ">" + jsondata_[i].PLAN_END_DATE.substring(0, jsondata_[i].PLAN_END_DATE.indexOf(' ')) + "</a></td><td><a href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")   " + emergency_NC + ">" + jsondata_[i].STATUS
                            + "</a></td><td style='border: 2px solid lightgray;border - right: none;'>" + tic + "</td></tr >")


                    }
                }
            }
        })
    }
    function makeAFilter(log, d, fltO) {
        var AFobj = { "lg": log, "dd": d, "flt": fltO }
        $.ajax({
            type: "POST",
            url: "AllRequsts.aspx/AFiltering",
            data: JSON.stringify(AFobj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                $('#AllRequestTables').dataTable({
                    orderCellsTop: true,
                    "destroy": true,
                    data: jsondata_,

                    columns: [{
                        'data': 'MOBILE_NUMBER',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency
                            if (oData.ATRIBUTE == "NotC") {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? "style='color:red;font-weight:bolder'" : "style='color: black;'";
                            }
                            if (oData.ATRIBUTE == 'Curr') {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : '';
                            }

                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.MOBILE_NUMBER + '</a>');
                        },
                        'fnCreatedRow': function (nRow, aData, iDataIndex) {
                            //$(nRow).attr('onclick', 'SendId(' + aData.REQUEST_ID + ',' + aData.STATUS_ID+')');
                            $('#AllRequestTables tbody tr:eq(' + iDataIndex + ')').attr('onclick', 'SendId(' + aData.REQUEST_ID + ',' + aData.STATUS_ID + ')');
                        },
                    },
                    {
                        'data': 'FIRST_NAME',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency
                            if (oData.ATRIBUTE == "NotC") {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? "style='color:red;font-weight:bolder'" : "style='color: black;'";
                            }
                            if (oData.ATRIBUTE == 'Curr') {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : '';
                            }


                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.FIRST_NAME + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'ADRESS',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency
                            if (oData.ATRIBUTE == "NotC") {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? "style='color:red;font-weight:bolder'" : "style='color: black;'";
                            }
                            if (oData.ATRIBUTE == 'Curr') {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : '';
                            }


                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.ADRESS + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'CR_DATE',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency
                            if (oData.ATRIBUTE == "NotC") {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? "style='color:red;font-weight:bolder'" : "style='color: black;'";
                            }
                            if (oData.ATRIBUTE == 'Curr') {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : '';
                            }


                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.CR_DATE.substring(0, oData.CR_DATE.indexOf(' ')) + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'REQUEST_TEXT',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency
                            if (oData.ATRIBUTE == "NotC") {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? "style='color:red;font-weight:bolder'" : "style='color: black;'";
                            }
                            if (oData.ATRIBUTE == 'Curr') {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : '';
                            }


                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.REQUEST_TEXT + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'ACCOUNT_NAME',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency
                            if (oData.ATRIBUTE == "NotC") {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? "style='color:red;font-weight:bolder'" : "style='color: black;'";
                            }
                            if (oData.ATRIBUTE == 'Curr') {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : '';
                            }
                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.ACCOUNT_NAME + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'PLAN_END_DATE',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency
                            if (oData.ATRIBUTE == "NotC") {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? "style='color:red;font-weight:bolder'" : "style='color: black;'";
                            }
                            if (oData.ATRIBUTE == 'Curr') {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : '';
                            }
                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.PLAN_END_DATE.substring(0, oData.PLAN_END_DATE.indexOf(' ')) + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },
                    {
                        'data': 'STATUS',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency
                            if (oData.ATRIBUTE == "NotC") {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? "style='color:red;font-weight:bolder'" : "style='color: black;'";
                            }
                            if (oData.ATRIBUTE == 'Curr') {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : '';
                            }
                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.STATUS + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'PLAN_END_DATE',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            //var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                            //$(nTd).html('<a href="#" ' + emergency + '  >' + oData.PLAN_END_DATE.substring(0, oData.PLAN_END_DATE.indexOf(' ')) + '</a>');
                            var tic = (oData.COMMENT_FILE == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                            $(nTd).html(tic);
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    ],

                    "language": {
                        // "url":"//cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
                        "processing": "Подождите...",
                        "search": "Поиск",
                        "lengthMenu": "Показать _MENU_ записей",
                        "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
                        "infoEmpty": "Записи с 0 до 0 из 0 записей",
                        "infoFiltered": "(отфильтровано из _MAX_ записей)",
                        "infoPostFix": "",
                        "loadingRecords": "Загрузка записей...",
                        "zeroRecords": "Записи отсутствуют.",
                        "emptyTable": "В таблице отсутствуют данные",
                        "paginate": {
                            "first": "Первая",
                            "previous": "Предыдущая",
                            "next": "Следующая",
                            "last": "Последняя"
                        },
                        //"aria": {
                        //    "sortAscending": ": активировать для сортировки столбца по возрастанию",
                        //    "sortDescending": ": активировать для сортировки столбца по убыванию"
                        //}
                    }

                })
                // $('#AllRequestTables').children('thead').children('tr').children('th').each(function () { $(this).append('<i style="margin-left:  5px;" data-icon="w" class="fa fa-unsorted" aria-hidden="true"></i>') })
                $('.ui-loader-background').hide();
                $('#loader').hide();
                //for (var i = 0; i < jsondata_.length; i++) {
                //    if (jsondata_[i].ATRIBUTE == "Curr") {
                //        var objsDatas;
                //        if (jsondata_[i].ADRESS.endsWith(', ')) {
                //            objsDatas = jsondata_[i].ADRESS + " " + jsondata_[i].ROOM_TYPE + " № " + jsondata_[i].ROOM_NUMBER
                //        }
                //        else {
                //            objsDatas = jsondata_[i].ADRESS + ", " + jsondata_[i].ROOM_TYPE + " № " + jsondata_[i].ROOM_NUMBER
                //        }//<td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].ROOM_TYPE + "</a></td>
                //        var tic = (jsondata_[i].COMMENT_FILE == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                //        var emergency = (jsondata_[i].EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";

                //        $("#header_").after("<tr><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].REQUEST_ID + "</a></td><td><a " + emergency +" onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].FIRST_NAME
                //            + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")  href='CreateRequest.aspx' title='" + objsDatas + "'>" + objsDatas + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].CR_DATE.substring(0, jsondata_[i].CR_DATE.indexOf(' ')) + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")href='CreateRequest.aspx' title='" + jsondata_[i].REQUEST_TEXT + "'>" + jsondata_[i].REQUEST_TEXT + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")  href='CreateRequest.aspx'>" + jsondata_[i].ACCOUNT_NAME + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].PLAN_END_DATE.substring(0, jsondata_[i].PLAN_END_DATE.indexOf(' ')) + "</a></td><td><a " + emergency +" href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") >" + jsondata_[i].STATUS
                //            + "</a></td><td style='border: 2px solid lightgray;border - right: none;'>" + tic +"</td></tr >")
                //        // gtObjBiInd(i, jsondata_[i].INDIVIDUAL_ID);
                //        // gtIspol(i, jsondata_[i].REQUEST_ID) <td class='prs" + i + "'></td>
                //        // gtservices(i, jsondata_[i].REQUEST_ID, jsondata_[i].STATUS_ID)
                //    }//style="color: black;"
                //    if (jsondata_[i].ATRIBUTE == "NotC") {
                //        var objsDatas;
                //        if (jsondata_[i].ADRESS.endsWith(', ')) {
                //            objsDatas = jsondata_[i].ADRESS + " " + jsondata_[i].ROOM_TYPE + " № " + jsondata_[i].ROOM_NUMBER
                //        }
                //        else {
                //            objsDatas = jsondata_[i].ADRESS + ", " + jsondata_[i].ROOM_TYPE + " № " + jsondata_[i].ROOM_NUMBER
                //        }//<td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' style='color:black'>" + jsondata_[i].ROOM_TYPE + "</a></td>
                //        var tic = (jsondata_[i].COMMENT_FILE == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                //        $("#header_").after("<tr><td><a href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")  style='color: black;' >" + jsondata_[i].REQUEST_ID + "</a></td><td><a href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")  style='color: black;'>" + jsondata_[i].FIRST_NAME
                //            + "</a></td><td><a href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")  style='color: black;' title='" + objsDatas + "'>" + objsDatas + "</a></td><td><a href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")  style='color: black;'>" + jsondata_[i].CR_DATE.substring(0, jsondata_[i].CR_DATE.indexOf(' ')) + "</a></td><td><a href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")  style='color: black;' title='" + jsondata_[i].REQUEST_TEXT + "'>" + jsondata_[i].REQUEST_TEXT + "</a></td><td><a href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")  style='color: black;'>" + jsondata_[i].ACCOUNT_NAME + "</a></td><td><a href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")  style='color: black;'>" + jsondata_[i].PLAN_END_DATE.substring(0, jsondata_[i].PLAN_END_DATE.indexOf(' ')) + "</a></td><td><a href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")  style=' color: black;'>" + jsondata_[i].STATUS + "</a></td><td style='border: 2px solid lightgray;border - right: none;'>" + tic +"</td></tr >")
                //        // gtObjBiInd(i, jsondata_[i].INDIVIDUAL_ID);
                //        // gtIspol(i, jsondata_[i].REQUEST_ID) //<td style='color: black;' class='prsS" + i + "'></td>
                //        //  gtservices3(i, jsondata_[i].REQUEST_ID, jsondata_[i].STATUS_ID)
                //        //$(".prs" + i + "").find("[onclick='SendId(" + jsondata_[i].REQUEST_ID + ")']").removeAttr("href")
                //        // $("[onclick='SendId(" + jsondata_[i].REQUEST_ID +")']").removeAttr("href")
                //    }
                //}
            }
        })
    }
    function gtATypeOfroom() {
        $.ajax({
            type: "POST",
            url: "RegisterRequest.aspx/getRoomTypes",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                // console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {
                    $("#Art").append('<option value="' + jsondata_[i].ROOM_TYPE_ID + '">' + jsondata_[i].ROOM_TYPE + '</option>')

                }
            }
        })
    }
    function gtAStatuses() {

        $.ajax({
            type: "POST",
            url: "RegisterRequest.aspx/getStatuses",

            contentType: "application/json; charset=utf-8",

            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                // console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {
                    if (jsondata_[i].STATUS_ID == 1 || jsondata_[i].STATUS_ID == 2 || jsondata_[i].STATUS_ID == 3 || jsondata_[i].STATUS_ID == 4 || jsondata_[i].STATUS_ID == 5) {

                        $("#Asts").append('<option value="' + jsondata_[i].STATUS_ID + '">' + jsondata_[i].STATUS + '</option>')
                    }
                }



            }

        })
    }
    function gtAObjectsById(lgId) {
        var obj = { "lg": lgId }
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/GetObjcurrentdsp",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                // console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {
                    //<label class="checkBx" style="">ул. Локомотивная, , Д. 16, </label>

                    $("#Aobject").append('<option value=' + jsondata_[i].Object_Id + ' >' + jsondata_[i].ObjectAdress + '</option>')





                }



            }

        })
    }



    function GetAllRequest(L, dkoy) {
        var obj2 = { "Lg": L, "dd": dkoy }
        $.ajax({
            type: "POST",
            url: "AllRequsts.aspx/GetAllRequest",
            data: JSON.stringify(obj2),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data)
                var jsondata_ = JSON.parse(data.d)


                $('#AllRequestTables').dataTable({
                    orderCellsTop: true,
                    "destroy": true,
                    data: jsondata_,

                    columns: [{
                        'data': 'MOBILE_NUMBER',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency
                            if (oData.ATRIBUTE == "NotC") {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? "style='color:red;font-weight:bolder'" : "style='color: black;'";
                            }
                            if (oData.ATRIBUTE == 'Curr') {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : '';
                            }

                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.MOBILE_NUMBER + '</a>');
                        },
                        'fnCreatedRow': function (nRow, aData, iDataIndex) {
                            //$(nRow).attr('onclick', 'SendId(' + aData.REQUEST_ID + ',' + aData.STATUS_ID+')');
                            $('#AllRequestTables tbody tr:eq(' + iDataIndex + ')').attr('onclick', 'SendId(' + aData.REQUEST_ID + ',' + aData.STATUS_ID + ')');
                        },
                    },
                    {
                        'data': 'FIRST_NAME',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency
                            if (oData.ATRIBUTE == "NotC") {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? "style='color:red;font-weight:bolder'" : "style='color: black;'";
                            }
                            if (oData.ATRIBUTE == 'Curr') {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : '';
                            }


                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.FIRST_NAME + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'ADRESS',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency
                            if (oData.ATRIBUTE == "NotC") {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? "style='color:red;font-weight:bolder'" : "style='color: black;'";
                            }
                            if (oData.ATRIBUTE == 'Curr') {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : '';
                            }


                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.ADRESS + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'CR_DATE',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency
                            if (oData.ATRIBUTE == "NotC") {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? "style='color:red;font-weight:bolder'" : "style='color: black;'";
                            }
                            if (oData.ATRIBUTE == 'Curr') {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : '';
                            }


                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.CR_DATE.substring(0, oData.CR_DATE.indexOf(' ')) + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'REQUEST_TEXT',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency
                            if (oData.ATRIBUTE == "NotC") {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? "style='color:red;font-weight:bolder'" : "style='color: black;'";
                            }
                            if (oData.ATRIBUTE == 'Curr') {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : '';
                            }


                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.REQUEST_TEXT + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'ACCOUNT_NAME',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency
                            if (oData.ATRIBUTE == "NotC") {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? "style='color:red;font-weight:bolder'" : "style='color: black;'";
                            }
                            if (oData.ATRIBUTE == 'Curr') {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : '';
                            }
                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.ACCOUNT_NAME + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'PLAN_END_DATE',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency
                            if (oData.ATRIBUTE == "NotC") {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? "style='color:red;font-weight:bolder'" : "style='color: black;'";
                            }
                            if (oData.ATRIBUTE == 'Curr') {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : '';
                            }
                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.PLAN_END_DATE.substring(0, oData.PLAN_END_DATE.indexOf(' ')) + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },
                    {
                        'data': 'STATUS',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency
                            if (oData.ATRIBUTE == "NotC") {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? "style='color:red;font-weight:bolder'" : "style='color: black;'";
                            }
                            if (oData.ATRIBUTE == 'Curr') {
                                emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : '';
                            }
                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.STATUS + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'PLAN_END_DATE',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            //var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                            //$(nTd).html('<a href="#" ' + emergency + '  >' + oData.PLAN_END_DATE.substring(0, oData.PLAN_END_DATE.indexOf(' ')) + '</a>');
                            var tic = (oData.COMMENT_FILE == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                            $(nTd).html(tic);
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    ],
                    "aaSorting": [],
                    "language": {
                        // "url":"//cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
                        "processing": "Подождите...",
                        "search": "Поиск",
                        "lengthMenu": "Показать по _MENU_ заявок",
                        "info": "Заявки с _START_ до _END_ из _TOTAL_ заявок",
                        "infoEmpty": "Заявки с 0 до 0 из 0 заявок",
                        "infoFiltered": "(отфильтровано из _MAX_ записей)",
                        "infoPostFix": "",
                        "loadingRecords": "Загрузка записей...",
                        "zeroRecords": "Записи отсутствуют.",
                        "emptyTable": "В таблице отсутствуют данные",
                        "paginate": {
                            "first": "Первая",
                            "previous": "Предыдущая",
                            "next": "Следующая",
                            "last": "Последняя"
                        },
                        //"aria": {
                        //    "sortAscending": ": активировать для сортировки столбца по возрастанию",
                        //    "sortDescending": ": активировать для сортировки столбца по убыванию"
                        //}
                    }

                })

                $('#AllRequestTables').children('thead').children('tr').children('th').each(function () {


                    $('#icSort').remove();

                })
                $('#AllRequestTables').children('thead').children('tr').children('th').each(function () {


                    $(this).append('<i style="margin-left: 5px;" id="icSort" data-icon="w" class="fa fa-unsorted" aria-hidden="true"></i>')

                })
                $('.ui-loader-background').hide();
                $('#loader').hide();
            }
        })
    }

    function getDate2() {
        var dtToday = new Date();

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();

        if (month < 10)
            month = '0' + month.toString();
        if (day < 10)
            day = '0' + day.toString();

        var maxDate = year + '-' + month + '-' + day;
        // $('#calen').attr('max', maxDate);
        //$('#startTimeP').attr('max', maxDate);
        //$('#startTimeP').val(maxDate);
        //$('#endTimeP').attr('max', maxDate);
        //$('#endTimeP').val(maxDate);
        // $("#calen").

        return maxDate;


    }
    function alertOtcet(Header_, text_, footer_) {
        $("#mh").text(Header_);
        $("#txt").text();
        //$('#startTimeP,#endTimeP').val(new Date().toDateInputValue())
        //document.getElementById('startTimeP').valueAsDate = new Date();
        //document.getElementById('endTimeP').valueAsDate = new Date();
        $("#mf").text(footer_)
        var modal = document.getElementById('myModal3');
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        $("#close_3").click(function () {
            modal.style.display = "none";
        })
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        $("#OtmenOt").click(function () {
            modal.style.display = "none";
        })
    }
    function gtCounts(lg_) {
        var obj = { "lg": lg_ }
        $.ajax({
            type: "POST",
            url: "RegisterRequest.aspx/GetCounts",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data)
                var jsonData_ = $.parseJSON(data.d);
                //console.log(jsonData_.Vrabot)
                $("#vraboteP").text(jsonData_.Vrabot.replace(',', '.'));
                $("#vraboteC").text(jsonData_.CVrabot);
                $("#vpolnenP").text(jsonData_.Vipol.replace(',', '.'));;
                $("#vpolneneC").text(jsonData_.CVipol);
                $("#OtmenP").text(jsonData_.Otmen.replace(',', '.'));;
                $("#OtmenC").text(jsonData_.COtmen);
                $("#zakritP").text(jsonData_.Zakrit.replace(',', '.'));//
                $("#zakritC").text(jsonData_.CZakrit);
                $("#Alloff").text(jsonData_.Alloff);
            }
        })
    }
    function explodePie(e) {
        if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
        } else {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
        }
        e.chart.render();

    }
    function drawChart() {

        var Vrapot = parseInt($("#vraboteC").text());
        var Otmen = parseInt($("#OtmenC").text());
        var zakrit = parseInt($("#zakritC").text());
        var rabotVipol = parseInt($("#vpolneneC").text());
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['В работе', Vrapot],
            ['Отменена', Otmen],
            ['Закрыто', zakrit],
            ['Работа выпонена', rabotVipol]

        ]);

        var options = {
            title: 'Количество'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);//// 
        sessionStorage.setItem("DownKol", chart.getImageURI())
        //  console.log(chart.getImageURI())
        //download(chart.getImageURI(), 'Количество.png', "image/png")
    }
    function gtdiagram() {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
        $("div[dir='ltr']").css("margin-left", '-70px')

    }
    function drawVisualization() {
        var allof = parseInt($("#Alloff").text())
        var zakrit = parseInt($("#zakritC").text())
        var wrapper = new google.visualization.ChartWrapper({
            chartType: 'ColumnChart',
            dataTable: [['', 'Всего создано', 'Закрыто'],
            ['', allof, zakrit]],
            options: { 'title': 'Закрытые заявки' },
            containerId: 'vis_div'
        });
        wrapper.draw();
        var imageUri = wrapper.getChart().getImageURI();
        sessionStorage.setItem("DownVseqo", imageUri)
        // download(imageUri, 'Закрытие заявки.png', "image/png")
    }
    function gtdiagram2() {

        google.charts.load('current');   // Don't need to specify chart libraries!
        google.charts.setOnLoadCallback(drawVisualization);

        //var chart = new CanvasJS.Chart("chartContainer2", {
        //    animationEnabled: true,
        //    theme: "light2", // "light1", "light2", "dark1", "dark2"
        //    title: {
        //        text: "Закрытые заявки"
        //    },
        //    axisY: {
        //        title: ""
        //    },

        //    data: [{
        //        type: "column",
        //        showInLegend: true,
        //        legendMarkerColor: "grey",
        //        legendText: "",
        //        dataPoints: [
        //            { y: parseInt(allof), label: "Всего создано" },
        //            { y: parseInt(zakrit), label: "Закрыто" }

        //        ]
        //    }]

        //});
        //chart.render();
    }

    function search2(lg_, stxt_) {
        var ob_j = { "lg": lg_, "Stxt": stxt_ }
        $.ajax({
            type: "POST",
            url: "RegisterRequest.aspx/SearchRequest2",
            data: JSON.stringify(ob_j),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                if (jsondata_.length != 0) {
                    for (var i = 0; i < jsondata_.length; i++) {//<td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].ROOM_TYPE + "</a></td>
                        var tic = (jsondata_[i].REQUEST_COMMENT == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                        var emergency = (jsondata_[i].EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";

                        $("#header_").after("<tr><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].REQUEST_ID + "</a></td><td><a " + emergency + " class='ind" + i + "' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'></a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") class='adr2" + i + "' href='CreateRequest.aspx'></a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].CR_DATE.substring(0, jsondata_[i].CR_DATE.indexOf(' ')) + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' title='" + jsondata_[i].REQUEST_TEXT + "'>" + jsondata_[i].REQUEST_TEXT + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") class='isp2" + i + "' href='CreateRequest.aspx'></a></td><td><a  " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].PLAN_END_DATE.substring(0, jsondata_[i].PLAN_END_DATE.indexOf(' ')) + "</a></td><td><a " + emergency + " href='CreateRequest.aspx'onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")>" + jsondata_[i].STATUS
                            + "</a></td><td>" + tic + "</td></tr >")
                        gtComments2(i, jsondata_[i].REQUEST_ID, jsondata_[i].ROOM_TYPE)//<td class='prs2" + i + "'></td>

                        gtIspol2(i, jsondata_[i].REQUEST_ID)

                    }

                }
                else {
                    // $('.formTable tr:not(:first)').remove();
                }
            }
        })
    }
    function search1(lg_, stxt_) {
        var ob_j = { "lg": lg_, "Stxt": stxt_ }
        $.ajax({
            type: "POST",
            url: "RegisterRequest.aspx/SearchRequest1",
            data: JSON.stringify(ob_j),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                if (jsondata_.length != 0) {

                    for (var i = 0; i < jsondata_.length; i++) {//<td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].ROOM_TYPE + "</a></td>
                        var tic = (jsondata_[i].REQUEST_COMMENT == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                        var emergency = (jsondata_[i].EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";

                        $("#header_").after("<tr><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].REQUEST_ID + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].FIRST_NAME
                            + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") class='adr" + i + "' href='CreateRequest.aspx'></a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].CR_DATE.substring(0, jsondata_[i].CR_DATE.indexOf(' ')) + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' title='" + jsondata_[i].REQUEST_TEXT + "'>" + jsondata_[i].REQUEST_TEXT + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") class='isp" + i + "' href='CreateRequest.aspx'></a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].PLAN_END_DATE.substring(0, jsondata_[i].PLAN_END_DATE.indexOf(' ')) + "</a></td><td><a " + emergency + " href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") >" + jsondata_[i].STATUS
                            + "</a></td><td>" + tic + "</td></tr >")
                        gtObjBiInd(i, jsondata_[i].INDIVIDUAL_ID, jsondata_[i].ROOM_TYPE);//<td class='prs" + i + "'></td>
                        gtIspol(i, jsondata_[i].REQUEST_ID)
                        // gtservices(i, jsondata_[i].REQUEST_ID)

                    }
                }
                else {
                    // $('.formTable tr:not(:first)').remove();
                }
            }
        })

    }
  
    function makefilter2(objflt2, lg2) {
        var obj = { "flt": objflt2, "Log": lg2 }
        $.ajax({
            type: "POST",
            url: "RegisterRequest.aspx/Filterin2",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                if (jsondata_.length != 0) {
                    for (var i = 0; i < jsondata_.length; i++) {

                        var tic = (jsondata_[i].ACCOUNT_NAME == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                        var emergency = (jsondata_[i].EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        $("#header_").after("<tr><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].REQUEST_ID + "</a></td><td><a " + emergency + " class='ind" + i + "' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'></a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") class='adr2" + i + "' href='CreateRequest.aspx'></a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].CR_DATE.substring(0, jsondata_[i].CR_DATE.indexOf(' ')) + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' title='" + jsondata_[i].REQUEST_TEXT + "'>" + jsondata_[i].REQUEST_TEXT + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") class='isp2" + i + "' href='CreateRequest.aspx'></a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].PLAN_END_DATE.substring(0, jsondata_[i].PLAN_END_DATE.indexOf(' ')) + "</a></td><td><a " + emergency + " href='CreateRequest.aspx'onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")>" + jsondata_[i].STATUS
                            + "</a></td><td style='border: 2px solid lightgray;border-right: none;'>" + tic + "</td></tr >")
                        gtComments2(i, jsondata_[i].REQUEST_ID, jsondata_[i].ROOM_TYPE)//<td class='prs2" + i + "'></td>
                        //gtObjBiInd2(i, rc[0].Object_Id);
                        gtIspol2(i, jsondata_[i].REQUEST_ID)
                        // gtservices2(i, jsondata_[i].REQUEST_ID, jsondata_[i].STATUS_ID)

                        // console.log("ind Id: " + jsondata_[i].INDIVIDUAL_ID)
                        //<td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].ATRIBUTE + "</a></td>
                    }
                    //for (var i = 0; i < jsondata_.length; i++) {
                    //    $("#header_").after("<tr><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].REQUEST_ID + "</a></td><td><a class='ind" + i + "' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'></a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") class='adr2" + i + "' href='CreateRequest.aspx'></a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].CR_DATE.substring(0, jsondata_[i].CR_DATE.indexOf(' ')) + "</a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' title='" + jsondata_[i].REQUEST_TEXT + "'>" + jsondata_[i].REQUEST_TEXT + "</a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") class='isp2" + i + "' href='CreateRequest.aspx'></a></td><td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].PLAN_END_DATE.substring(0, jsondata_[i].PLAN_END_DATE.indexOf(' ')) + "</a></td><td><a href='CreateRequest.aspx'onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")>" + jsondata_[i].STATUS
                    //        + "</a></td></tr >")
                    //    gtComments2(i, jsondata_[i].REQUEST_ID, jsondata_[i].ROOM_TYPE)//<td class='prs2" + i + "'></td>
                    //    //gtObjBiInd2(i, rc[0].Object_Id);
                    //    gtIspol2(i, jsondata_[i].REQUEST_ID)
                    //    //gtservices2(i, jsondata_[i].REQUEST_ID)
                    //}
                }
                else {
                    // $('.formTable tbody').children('tr:not(:first)').remove();
                }
            }
        })
    }
  
    function gtTypeOfroom2(selected) {

        $.ajax({
            type: "POST",
            url: "RegisterRequest.aspx/getRoomTypes",

            contentType: "application/json; charset=utf-8",

            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                // console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {
                    $("#Room_Type").append('<option value="' + jsondata_[i].ROOM_TYPE_ID + '">' + jsondata_[i].ROOM_TYPE + '</option>')

                }
                if (selected != "") {
                    $("#Room_Type").val(selected);
                }



            }

        })
    }
    
    function gtObjectsById(lgId) {
        var obj = { "lg": lgId }
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/GetObjcurrentdsp",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                // console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {
                    //<label class="checkBx" style="">ул. Локомотивная, , Д. 16, </label>

                    $("#object").append('<option value=' + jsondata_[i].Object_Id + ' >' + jsondata_[i].ObjectAdress + '</option>')





                }



            }

        })

    }
    function getChecked() {
        var totalCost = 0
        $('#Servs input[name="services1"]:checked').each(function () {
            var dtUrl = $(this).attr("data-url");//quantiti or not
            var dataName = $(this).attr("value");//servicetypeName_and Servis name
            var itemId = $(this).attr("itemid");//ServiceId
            var cost = $(this).next('label').text()
            //   totalCost = totalCost + parseInt($(this).next('label').text())
            var edizm = $(this).attr('data-edizm');
            $("#PrServiceH").show();
            $("#PrService").show();
            if (dtUrl == 1) {
                //onkeyup="multiPlaying(this,500)" <td><input type="text" onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" value="1"></td>
                $("#PrServiceH tbody").append('<tr><td itemid="' + itemId + '"> ' + dataName + '</td><td><input type="text" onkeyup=multiPlaying(this,"' + cost + '")  onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" value="1"></td><td>' + edizm + '</td><td  style="width:120px;text-align:center;"><a>' + cost + '</a></td><td><a itemid="' + itemId + '" data="' + dataName + '" onclick="RemoveRow(this)" data-url="' + dtUrl + '" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</a></td></tr>')
            }
            if (dtUrl == 0) {
                /*<tr><td style="width: 500px;" itemid="11">Доступ - Одноразовый пропуск</td><td><input disabled="disabled" type="text" value=""></td><td><button onclick="RemoveRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</button></td></tr>*/
                //<td  ><input disabled="disabled" type="text" value=""></td>
                $("#PrServiceH tbody").append('*<tr><td   itemid="' + itemId + '"> ' + dataName + '</td><td><input disabled="disabled" type="text" value=""></td><td>' + edizm + '</td><td style="width:120px;text-align:center;"><a onclick=Open_Pop(this) >' + cost + '</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-url="' + dtUrl + '" onclick="RemoveRow(this)" itemid="' + itemId + '" data="' + dataName + '"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</a></td></tr>')

            }
            $('#total').remove();
            // 

            //$('#total').text('Итого: ' + totalC)
            $(this).remove();
            $('label[itemid="' + itemId + '"]').remove();
            $("#close_7").click();
        })
        for (var i = 0; i < $('#PrServiceH tbody tr').length; i++) {
            var c = $('#PrServiceH tbody tr:eq(' + i + ') td:eq(3) a').text();
            if (c != 'Договорная') {

                totalCost = totalCost + parseFloat(c);
            }
        }
        $('#total').remove();
        $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + totalCost + '  руб</label>')
        if (totalCost == 0) {
            $('#total').hide();
        }
        else {
            $('#total').show();
        }
        //  $('#shServ').attr('disabled', 'disabled')
    }
    //GetProduct
    function GetProduct(e, obj, gs) {
        var obj = { o: obj, g: gs }
        $.ajax({
            url: "CreateRequest.aspx/GetProductServices",
            data: JSON.stringify(obj),
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //  console.log(data);
                var jsondata = JSON.parse(data.d);

                var total = 0

                $('#Servs').empty()
                for (var i = 0; i < jsondata.length; i++) {

                    if (jsondata[i].COST.indexOf('.') == -1) {
                        jsondata[i].COST = (jsondata[i].COST != "Договорная") ? jsondata[i].COST + ".00" : jsondata[i].COST
                    }

                    //data="' + jsondata[i].SERVICE_TYPE_NAME + '-' + jsondata[i].SERVICE_NAME + '"
                    if (jsondata[i].QUANTITY_IS == true) {//' + jsondata[i].SERVICE_TYPE_NAME + ' ' + jsondata[i].SERVICE_TYPE_NAME + ' -
                        $("#Servs").append('<div onclick="MakeCheckCheckBox(this)" class="col-md-12" style="margin-top:0px"><input type="checkbox" class="col-md-1" data-edizm="' + jsondata[i].SERVICE_TYPE_NAME + '" name="services1" value="' + jsondata[i].SERVICE_NAME + '" data-url="1" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left:-40px;margin-right: -23px;"><label   style="float:right;width:5%" itemid="' + jsondata[i].SERVICE_ID + '">' + jsondata[i].COST + '</label><label   style="margin-left: -38px !important; width:70%" itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_NAME + '</label></div><br/>')
                    }
                    else {//data="' + jsondata[i].SERVICE_TYPE_NAME + '-' + jsondata[i].SERVICE_NAME + '"
                        $("#Servs").append('<div onclick="MakeCheckCheckBox(this)" class="col-md-12" style="margin-top:0px"><input type="checkbox"  class="col-md-1" data-edizm="' + jsondata[i].SERVICE_TYPE_NAME + '" name="services1" value="' + jsondata[i].SERVICE_NAME + '"  data-url="0" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left:-40px;margin-right: -23px;"><label  style="float:right;width:5%" itemid="' + jsondata[i].SERVICE_ID + '">' + jsondata[i].COST + '</label><label   style="margin-left: -38px !important; width:70%" itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_NAME + '</label></div><br/>')
                    }


                }
                $('#Servs .col-md-12').each(function () {
                    var servId = $(this).children('input[type="checkbox"]').attr('itemid');
                    var repeat = false;
                    $('#PrServiceH tbody tr').each(function () {
                        var SServId = $(this).children('td:eq(0)').attr('itemid');
                        if (SServId == servId) {
                            repeat = true;
                        }

                    })
                    if (repeat == true) {
                        $(this).next('br').remove();
                        $(this).remove();
                    }
                })
                //for (var i = 0; i < jsondata.length; i++) {
                //    if (jsondata[i].QUANTITY_IS == true) {
                //        /**/
                //        $("#AddedTable").append('<tr><td style="width: 500px;" itemid=' + jsondata[i].SERVICE_ID + '> ' + jsondata[i].SERVICE_TYPE_NAME + ' -' + jsondata[i].SERVICE_NAME + '</td><td style="width: 70px;" ><input type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57"  onkeyup=multiPlaying(this,' + jsondata[i].COST + ') value="1"></td><td><button onclick=AddtoMain(this) class="btn delBtn">Добавить</button></td></tr>')
                //        total += parseInt(jsondata[i].COST)//<td style="width: 120px;">' + jsondata[i].COST + '</td>
                //    }
                //    else {
                //        $("#AddedTable").append('<tr><td style="width: 500px;" itemid=' + jsondata[i].SERVICE_ID + '>' + jsondata[i].SERVICE_TYPE_NAME + ' - ' + jsondata[i].SERVICE_NAME + '</td><td style="width: 70px;" ><input disabled="disabled" type="text" value=""></td>><td><button onclick=AddtoMain(this)  class="btn delBtn">Добавить</button></td></tr>')//<td style="width: 120px;">' + jsondata[i].COST + '</td
                //        total += parseInt(jsondata[i].COST)
                //    }
                //}
                //console.log(total)
                $("#ItCost").val(total)
            }
        })
    }

    function GetProductsByGrup(obj, g) {
        var obj = { "o": obj, "dr": g }
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/GetProductsByGrup",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata = JSON.parse(data.d);
                var total = 0
                $('#Servs').empty()
                for (var i = 0; i < jsondata.length; i++) {
                    jsondata[i].COST = (jsondata[i].COST != "Договорная") ? jsondata[i].COST + ".00" : jsondata[i].COST

                    //data="' + jsondata[i].SERVICE_TYPE_NAME + '-' + jsondata[i].SERVICE_NAME + '"
                    if (jsondata[i].QUANTITY_IS == true) {//' + jsondata[i].SERVICE_TYPE_NAME + ' ' + jsondata[i].SERVICE_TYPE_NAME + ' -
                        $("#Servs").append('<input type="radio" data-edizm="' + jsondata[i].SERVICE_TYPE_NAME + '" name="services1" value="' + jsondata[i].SERVICE_NAME + '" data-url="1" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left:5px"><label style="float:right" itemid="' + jsondata[i].SERVICE_ID + '">' + jsondata[i].COST + '</label><label style="margin-top: -22px !important;" itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_NAME + '</label>')
                    }
                    else {//data="' + jsondata[i].SERVICE_TYPE_NAME + '-' + jsondata[i].SERVICE_NAME + '"
                        $("#Servs").append('<input type="radio" data-edizm="' + jsondata[i].SERVICE_TYPE_NAME + '" name="services1" value="' + jsondata[i].SERVICE_NAME + '"  data-url="0" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left:5px"><label style="float:right" itemid="' + jsondata[i].SERVICE_ID + '">' + jsondata[i].COST + '</label><label style="margin-top: -22px !important;" itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_NAME + '</label>')
                    }


                }
            }
        })
    }
    function getProductBySearch(obj, t, gs) {
        var obj = { "o": obj, "txt": t, "d": gs }
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/getProductsbyText",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata = JSON.parse(data.d);
                var total = 0
                $('#Servs').empty()
                var jsondata = JSON.parse(data.d);

                var total = 0

                $('#Servs').empty()
                for (var i = 0; i < jsondata.length; i++) {

                    if (jsondata[i].COST.indexOf('.') == -1) {
                        jsondata[i].COST = (jsondata[i].COST != "Договорная") ? jsondata[i].COST + ".00" : jsondata[i].COST
                    }

                    //data="' + jsondata[i].SERVICE_TYPE_NAME + '-' + jsondata[i].SERVICE_NAME + '"
                    if (jsondata[i].QUANTITY_IS == true) {//' + jsondata[i].SERVICE_TYPE_NAME + ' ' + jsondata[i].SERVICE_TYPE_NAME + ' -
                        $("#Servs").append('<div class="col-md-12" style="margin-top:0px"><input type="checkbox" class="col-md-1" data-edizm="' + jsondata[i].SERVICE_TYPE_NAME + '" name="services1" value="' + jsondata[i].SERVICE_NAME + '" data-url="1" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left:-40px;margin-right: -23px;"><label style="float:right;width:5%" itemid="' + jsondata[i].SERVICE_ID + '">' + jsondata[i].COST + '</label><label style="margin-left: -38px !important; width:70%" itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_NAME + '</label></div><br/>')
                    }
                    else {//data="' + jsondata[i].SERVICE_TYPE_NAME + '-' + jsondata[i].SERVICE_NAME + '"
                        $("#Servs").append('<div class="col-md-12" style="margin-top:0px"><input type="checkbox"  class="col-md-1" data-edizm="' + jsondata[i].SERVICE_TYPE_NAME + '" name="services1" value="' + jsondata[i].SERVICE_NAME + '"  data-url="0" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left:-40px;margin-right: -23px;"><label style="float:right;width:5%" itemid="' + jsondata[i].SERVICE_ID + '">' + jsondata[i].COST + '</label><label style="margin-left: -38px !important; width:70%" itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_NAME + '</label></div><br/>')
                    }


                }
                $('#Servs .col-md-12').each(function () {
                    var servId = $(this).children('input[type="checkbox"]').attr('itemid');
                    var repeat = false;
                    $('#PrServiceH tbody tr').each(function () {
                        var SServId = $(this).children('td:eq(0)').attr('itemid');
                        if (SServId == servId) {
                            repeat = true;
                        }

                    })
                    if (repeat == true) {
                        $(this).next('br').remove();
                        $(this).remove();
                    }
                })
                //for (var i = 0; i < jsondata.length; i++) {
                //    if (jsondata[i].QUANTITY_IS == true) {
                //        /**/
                //        $("#AddedTable").append('<tr><td style="width: 500px;" itemid=' + jsondata[i].SERVICE_ID + '> ' + jsondata[i].SERVICE_TYPE_NAME + ' -' + jsondata[i].SERVICE_NAME + '</td><td style="width: 70px;" ><input type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57"  onkeyup=multiPlaying(this,' + jsondata[i].COST + ') value="1"></td><td><button onclick=AddtoMain(this) class="btn delBtn">Добавить</button></td></tr>')
                //        total += parseInt(jsondata[i].COST)//<td style="width: 120px;">' + jsondata[i].COST + '</td>
                //    }
                //    else {
                //        $("#AddedTable").append('<tr><td style="width: 500px;" itemid=' + jsondata[i].SERVICE_ID + '>' + jsondata[i].SERVICE_TYPE_NAME + ' - ' + jsondata[i].SERVICE_NAME + '</td><td style="width: 70px;" ><input disabled="disabled" type="text" value=""></td>><td><button onclick=AddtoMain(this)  class="btn delBtn">Добавить</button></td></tr>')//<td style="width: 120px;">' + jsondata[i].COST + '</td
                //        total += parseInt(jsondata[i].COST)
                //    }
                //}
                //console.log(total)
                // $("#ItCost").val(total)
                //for (var i = 0; i < jsondata.length; i++) {
                //    jsondata[i].COST = (jsondata[i].COST != "Договорная") ? jsondata[i].COST + ".00" : jsondata[i].COST

                //    //data="' + jsondata[i].SERVICE_TYPE_NAME + '-' + jsondata[i].SERVICE_NAME + '"
                //    if (jsondata[i].QUANTITY_IS == true) {//' + jsondata[i].SERVICE_TYPE_NAME + ' ' + jsondata[i].SERVICE_TYPE_NAME + ' -
                //        $("#Servs").append('<input type="radio" data-edizm="' + jsondata[i].SERVICE_TYPE_NAME + '" name="services1" value="' + jsondata[i].SERVICE_NAME + '" data-url="1" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left:5px"><label style="float:right" itemid="' + jsondata[i].SERVICE_ID + '">' + jsondata[i].COST + '</label><label style="margin-top: -22px !important;" itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_NAME + '</label>')
                //    }
                //    else {//data="' + jsondata[i].SERVICE_TYPE_NAME + '-' + jsondata[i].SERVICE_NAME + '"
                //        $("#Servs").append('<input type="radio" data-edizm="' + jsondata[i].SERVICE_TYPE_NAME + '" name="services1" value="' + jsondata[i].SERVICE_NAME + '"  data-url="0" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left:5px"><label style="float:right" itemid="' + jsondata[i].SERVICE_ID + '">' + jsondata[i].COST + '</label><label style="margin-top: -22px !important;" itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_NAME + '</label>')
                //    }


                //}
            }
        })
    }
    function getGroupOfProducts() {
        $.ajax({
            url: "CreateRequest.aspx/getGroupOfProducts",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $('#productGroup').empty();
                $('#productGroup').append('<option value="0">Все</option>')
                var jsondata = JSON.parse(data.d);
                for (var i = 0; i < jsondata.length; i++) {
                    $('#productGroup').append('<option value="' + jsondata[i].SERVICE_NAME + '">' + jsondata[i].SERVICE_TYPE_NAME + '</option>')
                }
            }
        })
    }
    function getDelivery(selected) {
        $.ajax({
            url: "CreateRequest.aspx/getDelivery",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //  console.log(data);
                var jsondata = JSON.parse(data.d);

                for (var i = 0; i < jsondata.length; i++) {
                    $("#TDost").append('<option itemid="' + jsondata[i].DELIVERY_COST + '" value="' + jsondata[i].DELIVERY_TYPE_ID + '">' + jsondata[i].DELIVERY_TYPE_NAME + '</option>')
                }
                //console.log(total)
                if (selected != "") {
                    $("#TDost").val(selected);
                    $("#StDost").val($('#TDost option:selected').attr('itemid'))
                    //var stdost = $("#StDost").val($('#TDost option:selected').attr('itemid'))
                    //$("#ItCost").val(parseInt($(this).val()) - parseInt(stdost))

                }

            }
        })
    }
    function getCurrentDisp(lg) {
        var obj = { "logId": lg }
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/GetCurrDisp",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                // console.log(jsondata_)
                for (var i = 0; i < jsondata_.length; i++) {
                    // console.log(jsondata_[i].ACCOUNT_NAME)
                    $("#IspolFio").val(jsondata_[i].ACCOUNT_NAME)
                    $("#IspolFio").attr("itemid", lg)
                    //   $("#Otven").val(jsondata_[i].ACCOUNT_NAME)
                    $("#Otven").attr("itemid", lg)
                    //  $("#IspolList").append('<option value="'+lg+'">'+jsondata_[i].ACCOUNT_NAME+'</option>')
                }


            }

        })
    }
    function getEngTextDispForVerVrbt(logId, selected) {
        var obj = {
            lg: logId,

        };
        //alert(JSON.stringify(obj));

        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/GetTexniksAndothers",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var jsondata_ = JSON.parse(result.d)

                // console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {

                    if (jsondata_[i].RS == "3") {
                        // $("#IspolList").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' </option>')
                        $("#ispol2").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' (Диспетчер)</option>')
                    }
                    if (jsondata_[i].RS == "2") {
                        //$("#IspolList").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' (Инженер)</option>')
                        $("#ispol2").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' (Инженер)</option>')
                    }
                    if (jsondata_[i].RS == "6") {
                        //$("#IspolList").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' (Техник)</option>')
                        $("#ispol2").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' (Техник)</option>')
                    }

                }
                if (selected != "") {
                    //$("#IspolList").val(selected);
                    // $("#ispol2").val(selected);
                    $("#Ispolname").text($("#IspolList option:selected").text()).attr("itemid", $("#IspolList option:selected").val())
                }
            }
        })
    }
    function GetAccFortexnik(LgId, selected) {
        var obj = {
            lg: LgId,

        };
        //alert(JSON.stringify(obj));

        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/GetTexniks",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                // console.log(result)

                var jsondata_ = JSON.parse(result.d)

                // console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {

                    if (jsondata_[i].RS == "3") {
                        $("#IspolList").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' </option>')
                        $("#ispol2").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' </option>')
                    }
                    if (jsondata_[i].RS == "2") {
                        $("#IspolList").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' (Инженер)</option>')
                        $("#ispol2").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' (Инженер)</option>')
                    }
                    if (jsondata_[i].RS == "6") {
                        $("#IspolList").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' (Техник)</option>')
                        $("#ispol2").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' (Техник)</option>')
                    }

                }
                if (selected != "") {
                    $("#IspolList").val(selected);
                    // $("#ispol2").val(selected);
                    $("#Ispolname").text($("#IspolList option:selected").text()).attr("itemid", $("#IspolList option:selected").val())
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
    function ShowProducts() {

        $("#mh7").text("Выбор услуги");

        //$("#mf").text(footer_)
        var modal = document.getElementById('myModal7');
        var span = document.getElementsByClassName("close2")[0];
        modal.style.display = "block";
        $("#close_7").click(function () {
            modal.style.display = "none";
        })
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    }
    if (loc == "/Disp_Admin/CreateRequest.aspx") {
        loadSuperDisp_Utilities_And_()
       // $('#body').load('../Super_Disp/CreateDispRequest.aspx #contentRegister')
        //$("#StDost").val(0);
        //// $('a[href="RegisterRequest.aspx"]').css('background-color','#FFDEAD')
        //$("#Acnum").keyup(function () {
        //    $("#Acnum_S").hide();
        //    gettDatasByAccNumber($(this).val())
        //})

        //$(document).on('change', '#productGroup', function () {
        //    var groupVal = $(this).val();
        //    if (groupVal != 0) {
        //        GetProductsByGrup($('#objctZ').val(), groupVal);
        //    }
        //    else {
        //        GetProduct($('#objctZ').val());

        //    }
        //    $('#SearchProduct').val("")
        //})
        ////$('#SearchProduct').keyup(function () {
        ////    var txt = $(this).val();
        ////    if (txt.length >= 4) {
        ////        //$('#productGroup').val(0);
        ////        //getProductBySearch($('#objctZ').val(), txt, $('#GServices').val())


        ////    }
        ////})



        //$(document).on('change', '#objctZ', function () {
        //    // $("#IspolList_S").hide();
        //    var objs = $(this).val();
        //    if (objs != 0) {
        //        $("#adr_S").hide();
        //        // GetGroupOfServices("", objs);
        //        var resp = $('#Sets').attr('data-r')
                
        //        $('#Sets').attr('onchange', 'GetRelatedDirects(0,this,' + objs + ')')
        //        GetRelatedSets("", objs)
        //    }
        //    $('#Room_Type').val(0)
        //    $('#Room,#Acnum,#Ind').val("");
        //    $('#IndList').empty().hide();

        //})
        //sessionStorage.setItem("slcObj", "");
        //var R_id = sessionStorage.getItem("RId")
        //$(document).on('change', '#GServices', function () {
        //    $('#PrServiceH tbody').empty();
        //    $('#total').remove();
        //})
        //$("#shServ").click(function () {
        //    var objectId = $('#objctZ').val();
        //    if (objectId != 0) {
        //        if ($('#GServices').val() != 0) {
        //            GetProduct(objectId, $('#GServices').val());
        //            //getGroupOfProducts();
        //            ShowProducts();
        //        }
        //        else {
        //            $('#GServicesErr').remove();
        //            $('#Phn').after('<label style="color:red" id="GServicesErr">Необходимо выбрать группу услуг</label>')
        //            window.setTimeout(function () {
        //                $('#GServicesErr').hide(1000);
        //                $('#GServicesErr').remove();
        //            }, 3000)
        //        }
        //    }
        //    else {
        //        $('#adr_S').text("Необходимо выбрать адрес объекта").show();
        //    }

        //})
        //$("#AddT").click(function () {
        //    //getChecked();
        //    //$("#PrService_S").hide();
        //    // $('#AddT').val('');
        //    var selectedElms = $('#NewServs').jstree("get_selected", true);
        //    var level = 0

        //    level = selectedElms[0].original.LEVEL

        //    if (level == "1") {
        //        var id = selectedElms[0].id
        //        var text = selectedElms[0].text
        //        $('#Sets').val(id).attr('data-search','Set')
        //        $('#Sets').change()


        //        $('#PrServiceH').removeAttr('data-d')
        //        $('#PrServiceH').show()
        //        $('#PrServiceH tbody').empty();
        //        $('#PrServiceH thead tr th:eq(3)').show();
        //        $('#PrServiceH thead tr th:eq(0)').text('Наименование направления')
        //        $('#PrServiceH thead tr').each(function () {
        //            $(this).children('th:eq(1),th:eq(2)').hide();

        //        })

        //        $('#PrServiceH').attr('data-s', id)

        //        $('#PrServiceH tbody').append('<tr><td data-s=' + id + '>' + text + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
        //    }
        //    if (level == "2") {
        //        var id = selectedElms[0].id
        //        var text = selectedElms[0].text
        //        $('#Sets').val(selectedElms[0].parent)
        //        //  $('#Sets').change()
        //        $('#left').parent().remove();
        //        var directId = id.replace('dir', '');

        //        $('#PrServiceH').after('<select id="temprorySet" data-search="search"  style="display:none"><option value=' + selectedElms[0].parent + '>-<option></select>')
        //        //  sessionStorage.setItem("st",2)
        //        GetRelatedDirects(directId, $('#temprorySet'), $('#objctZ').val(), undefined, 'search');
        //        $('#temprorySet').remove();
        //        //$("#PrServiceH").attr('data-d', directId);
        //        //$("#PrServiceH tbody tr:eq(0)").remove();
        //        //$('#PrServiceH tbody').append('<tr><td data-d=' + directId + '>' + text + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-d=' + directId + ' onclick="RemoveDirectRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

        //    }
        //    if (level == "3") {
        //        sessionStorage.removeItem("finded")
        //        sessionStorage.setItem("finded", JSON.stringify(selectedElms))
        //        $('#Sets').val(selectedElms[0].original.SS_ID).attr('data-search', 'Ssearch')
        //        //  $('#Sets').change()
        //        $('#left').parent().remove();
        //        for (var j = 0; j < selectedElms.length; j++) {
        //            var d = 0
        //            if (j == 0) {
        //                var sid = selectedElms[j].original.SS_ID;
        //                d = selectedElms[j].parent
        //                d = d.replace('dir', '');
        //                $('#PrServiceH').after('<select id="temprorySet" data-search="search"   style="display:none"><option value=' + sid + '>-<option></select>')
        //                var ts = $('#temprorySet').val();
        //                GetRelatedDirects(d, $('#temprorySet'), $('#objctZ').val(), undefined, "Ssearch")
        //                $('#temprorySet').remove();
        //                $("#PrServiceH tbody tr:eq(0)").remove();
        //                //$("#PrServiceH").attr('data-d', d);
        //            }
        //            //var itemId = selectedElms[j].id
        //            //itemId = itemId.replace('serv', '');
        //            //var dataName = selectedElms[j].text
        //            //var cost = selectedElms[j].original.COST
        //            //var kolDis = (cost == 'Договорная') ? 'disabled="disabled"' : '';

        //            //var doqi = (cost == 'Договорная') ? '<a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div>' : '<a>' + cost + '</a>'

        //            //var edizm = selectedElms[j].original.UNIT_OF_MEASURE_NAME;
        //            //var dtUrl = selectedElms[j].original.QUANTITY_IS
        //            //$('#PrServiceH').show();
        //            //$('#PrServiceH thead th').show();
        //            //$('#PrServiceH thead tr th:eq(0)').text('Наименование услуги')
        //            //if (dtUrl == "1") {
        //            //    //onkeyup="multiPlaying(this,500)" <td><input type="text" onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" value="1"></td>
        //            //    $("#PrServiceH tbody").append('<tr data-d=' + d + '><td itemid="' + itemId + '"> ' + dataName + '</td><td><input type="text" ' + kolDis + '  onkeyup=multiPlaying(this,"' + cost + '")  onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" value="1"></td><td>' + edizm + '</td><td  style="width:120px;text-align:center;">' + doqi + '</td><td><a itemid="' + itemId + '" data="' + dataName + '" onclick="RemoveRow(this)" data-url="' + dtUrl + '" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</a></td></tr>')
        //            //}
        //            //if (dtUrl == "0") {
        //            //    /*<tr><td style="width: 500px;" itemid="11">Доступ - Одноразовый пропуск</td><td><input disabled="disabled" type="text" value=""></td><td><button onclick="RemoveRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</button></td></tr>*/
        //            //    //<td  ><input disabled="disabled" type="text" value=""></td>
        //            //    $("#PrServiceH tbody").append('*<tr data-d=' + d + '><td   itemid="' + itemId + '"> ' + dataName + '</td><td><input disabled="disabled" type="text" value=""></td><td>' + edizm + '</td><td style="width:120px;text-align:center;"><a onclick=Open_Pop(this) >' + cost + '</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-url="' + dtUrl + '" onclick="RemoveRow(this)" itemid="' + itemId + '" data="' + dataName + '"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</a></td></tr>')

        //            //}

        //        }


        //        //if (j == selectedElms.length) {
        //        //    var totalCost = 0
        //        //    $("#PrServiceH tbody tr").each(function () {
        //        //        var cost = (isNaN($(this).children('td:eq(3)').text())) ? "0.00" : $(this).children('td:eq(3)').text();
        //        //        totalCost = parseFloat(totalCost) + parseFloat(cost)
        //        //    })
        //        //    $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + totalCost + '  руб</label>')
        //        //}
        //        //   var directId = id.replace('srv', '');
        //    }

        //    $('#close_7').click();
        //})
        //$('#SearchService').click(function () {
        //    var succSearch = true;
        //    //if ($('#searchtxt').val().length == 0)
        //    //{
        //    //    succSearch = false
        //    //    $('#lblSearchingErr').remove()
        //    //    $('#lblsearchtxt').after('<label id="lblSearchingErr" style="color:red;font-weight: bold;">Необходимо заполнить поле "Поиск"</label>');
        //    //    window.setTimeout(function () {$('#lblSearchingErr').remove();}, 3000);
        //    //    $("#mh7").text("ПОИСК УСЛУГ");
        //    //}
        //    if ($('#objctZ').val() == 0) {
        //        succSearch = false
        //        $('#adr_S').text('Необходимо выбрать адрес объекта').show()
        //        $("html, body").animate({ scrollTop: 50 }, "slow");
        //        window.setTimeout(function () { $('#adr_S').hide().text(""); }, 3000);
        //    }
        //    if (succSearch == true) {
        //        $("#mh7").text("ПОИСК УСЛУГ");
        //        $('#myModal7').show();
        //        Give_Selected_Set_Direct_Service_For_Search($('#objctZ').val())//$('#objctZ').val()
        //    }
        //    $("#close_7").click(function () {
        //        $('#myModal7').hide();
        //       // $('#NewServs').empty()
        //        var totalCost = 0
        //        $('#total').remove();
        //        $("#PrServiceH tbody tr").each(function () {
        //            var cost = (isNaN($(this).children('td:eq(3)').text())) ? "0.00" : $(this).children('td:eq(3)').text();
        //            totalCost = parseFloat(totalCost) + parseFloat(cost)
        //            totalCost = (isNaN(totalCost)) ? "0.00" : totalCost
        //        })
        //        $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + totalCost + '  руб</label>')
        //     //   $('#NewServs').jstree(true).destroy();
        //       // $('#NewServs').jstree("destroy").empty();
        //        $('#NewServs').jstree("deselect_all");
        //    })
        //})
        //$('#NewServs').on('changed.jstree', function (e, data) {
        //    //
        //    var selectedElms = $('#NewServs').jstree("get_selected", true);
        //    //console.log(selectedElms)
        //    var checked = [];
        //    //for (var i = 0; i < data.selected.length; i++) {

        //    //    //console.log(data.instance.get_node(data.selected[i]).original.LEVEL)

        //    //    checked.push({
        //    //        "text": data.instance.get_node(data.selected[i]).text,
        //    //        "LEVEL": data.instance.get_node(data.selected[i]).original.LEVEL,
        //    //        "parent": data.instance.get_node(data.selected[i]).original.parent
        //    //    })
        //    //    // var v = $("#NewServs").jstree(true).get_json('#', { 'flat': true });

        //    //    //console.log(e)

        //    //}
        //    //console.log(checked);
        //    var level_count_Set = 0
        //    var level_count_direct = 0
        //    var level_count_service = 0
        //    // check if Selected set bigger than 1
        //    for (var i = 0; i < selectedElms.length; i++) {

        //        var level = selectedElms[i].original.LEVEL
        //        if (level == "1") {
        //            level_count_Set = level_count_Set + 1

        //        }
        //        if (level_count_Set > 1) {
        //            data.instance.uncheck_node(selectedElms[i - 1]);

        //            data.instance.check_node(selectedElms[i]);


        //        }

        //        if (level == "2") {
        //            level_count_direct = level_count_direct + 1
        //        }

        //        if (level_count_direct != 0) {
        //            data.instance.uncheck_node(selectedElms[i - 1]);

        //            data.instance.check_node(selectedElms[i]);


        //        }
        //        if (level == "1" || level_count_direct != 0) {
        //            data.instance.uncheck_node(selectedElms[i - 1]);

        //            data.instance.check_node(selectedElms[i]);
        //        }

        //        if (level == "1" || level_count_Set != 0) {
        //            data.instance.uncheck_node(selectedElms[i - 1]);

        //            data.instance.check_node(selectedElms[i]);
        //        }
        //        if (i != 0) {
        //            var parent = selectedElms[i].parent
        //            if (parent != selectedElms[i - 1].parent) {
        //                data.instance.uncheck_node(selectedElms[i - 1]);

        //                data.instance.check_node(selectedElms[i]);
        //            }
        //        }

        //    }

        //    //selectedElms = $('#NewServs').jstree("get_selected", true);
        //    //// check if has selected direct
        //    //
        //    //for (var i = 0; i < selectedElms.length; i++) {
        //    //    var level = selectedElms[i].original.LEVEL

        //    //}




        //})


        //if (R_id == "" || R_id == undefined || R_id == null) {
        //    sessionStorage.setItem('changes', null);
        //    getResponsibels_();
        //    $('#SearchService,#searchtxt,#lblsearchtxt').show();

        //    $('#Otven').removeAttr('disabled');
        //    $('#file_btn').click(function () {
        //        $('#files').click();
        //    })
        //    $(document).click(function (s) {
        //        if ($(s.target).is('select')) {

        //            sessionStorage.setItem('changes', true)
        //        }

        //    })
        //    $(document).keyup(function (e) {
        //        sessionStorage.setItem('changes', true)
        //    })
        //    //GetProduct();
        //    $('#SendComent').hide();
        //    $('#hedrZ').attr('Z_id', '0')
        //    var dispId = $("#lgId").text();
        //    // GetGroupOfServices("")
        //    dispId = dispId.substring(dispId.indexOf('_') + 1, dispId.length)
        //    var dspname = $("#fiodsp").text()
        //    getCurrentDisp(LogId)
        //    GetAccFortexnik(LogId, "");
        //    getcurrdspObj(LogId, "")

        //    $(document).on('change', '#Room_Type', function () {
        //        $("#Room_Type_S").hide();
        //    })
        //    gtTypeOfroom2("");
        //    getDate();
        //    getTime();
        //    $("#Room").blur(function () {//Ind
        //        var room = $("#Room").val();
        //        var slcObj = $("#objctZ").val();//sessionStorage.getItem("slcObj");
        //        var roomtype = $("#Room_Type").val()
        //        if (slcObj != 0 && roomtype != 0) {
        //            if (room.length != 0) {
        //                //slcObj = JSON.parse(slcObj)
        //                //slcObj = slcObj[0].Object_Id
        //                // console.log(slcObj)
        //                getIndDatas(slcObj, room, roomtype);
        //            }
        //        }
        //    })


        //    $("#SaveDD").click(function () {

        //        var slcObj = $("#objctZ").val();
        //        var successRequest = true;
        //        if (slcObj == 0) {
        //            successRequest = false;
        //            $("#adr_S").text("Необходимо выбрать адрес объекта").show();
        //            $("html, body").animate({ scrollTop: 50 }, "slow");
        //            window.setTimeout(function () { $('#adr_S').hide(); }, 3000);
        //        }
        //        var rm_Type = $("#Room_Type").val();
        //        if (rm_Type == 0) {
        //            successRequest = false;
        //            $("#Room_Type_S").text('Пожалуйста, выберите "Тип помещения"').show();
        //            // $("html, body").animate({ scrollTop: 50 }, "slow");
        //            $("html, body").animate({ scrollTop: 50 }, "slow");
        //            window.setTimeout(function () { $('#Room_Type_S').hide(); }, 3000);
        //        }

        //        var room_ = $("#Room").val();
        //        if (room_.length == 0) {
        //            successRequest = false
        //            $("#Room_S").text("Необходимо заполнить поле \"Помещение\"").show();
        //            $("html, body").animate({ scrollTop: 50 }, "slow");
        //            window.setTimeout(function () { $('#Room_S').hide(); }, 3000);
        //        }
        //        var accnmbr = $("#Acnum").val();
        //        if (accnmbr.length == 0) {
        //            successRequest = false
        //            $("#Acnum_S").text("Необходимо заполнить поле \"Номер лицевого счета\"").show();
        //            $("html, body").animate({ scrollTop: 50 }, "slow");
        //            window.setTimeout(function () { $('#Acnum_S').hide(); }, 3000);
        //        }
        //        var Ind = $("#Ind").val();
        //        if (Ind.length == 0) {
        //            successRequest = false
        //            $("#Ind_S").text("Необходимо заполнить поле \"Заявитель\"").show();
        //            $("html, body").animate({ scrollTop: 50 }, "slow");
        //            window.setTimeout(function () { $('#Ind_S').hide(); }, 3000);
        //        }

        //        var Phn = $("#Phn").val();
        //        if (Phn.length == 0) {
        //            successRequest = false
        //            $("#Phn_S").text("Необходимо заполнить поле \"Номер телефона\"").show();
        //            $("html, body").animate({ scrollTop: 50 }, "slow");
        //            window.setTimeout(function () { $('#Phn_S').hide(); }, 3000);
        //        }

        //        var Set = $('#Sets').val();
        //        var level = 0;
        //        var P_Services = []
        //        var CostSet = 0
        //        var gs;
        //        if (Set == 0) {
        //            successRequest = false;
        //            $('#Set_S').remove();
        //            $('#Sets').prev().before('<span id="Set_S" style="float: right;font-weight: bold;color: red">Пожалуйста выберите "Направление"</span>')
        //            window.setTimeout(function () { $('#Set_S').hide(); }, 3000);
        //        }
        //        else {

        //            var dataS = $('#PrServiceH').attr('data-s')
        //            if (dataS != undefined && $('#PrServiceH').attr('data-d') == undefined) {
        //                level = 1
        //                gs = Set
        //                CostSet = $('#PrServiceH tbody tr:eq(0) td:eq(1)').text();
        //                //if (CostSet =='Договорная') {

        //                //    successRequest = false
        //                //    $('#lblCost').remove();
        //                //    $("html, body").animate({ scrollTop: 550 }, "slow");
        //                //    $('#PrServiceH tbody tr:eq(0)').children('td:eq(1)').children('a').after('<label style="color:red" id="lblCost">Необходимо указать стоимость</label>')
        //                //    window.setTimeout(function () {
        //                //        // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
        //                //        $('#lblCost').hide(1000);
        //                //        $('#lblCost').remove();
        //                //    }, 3000);
        //                //}
        //            }
        //        }
        //        var tr = $('#PrServiceH tbody tr').length
        //        if (tr == 0 && Set != 0) {
        //            $('#PrServiceH').show();
        //            $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').hide();
        //            $('#PrServiceH thead tr th:eq(0)').text('Наименование Направления')
        //            var sid = $('#Sets').val();
        //            $('#PrServiceH').attr('data-s', sid)
        //            //$('#PrServiceH').hide();
        //            $('#PrServiceH tbody').append('<tr><td data-s=' + $('#Sets').val() + '>' + $('#Sets').children(':selected').text() + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

        //            level = 1
        //            //CostSet = $('#PrServiceH tbody tr:eq(0) td:eq(1)').text();
        //            //if (CostSet == 'Договорная') {

        //            //    successRequest = false
        //            //    $('#lblCost').remove();
        //            //    $("html, body").animate({ scrollTop: 550 }, "slow");
        //            //    $('#PrServiceH tbody tr:eq(0)').children('td:eq(1)').children('a').after('<label style="color:red" id="lblCost">Необходимо указать стоимость</label>')
        //            //    window.setTimeout(function () {
        //            //        // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
        //            //        $('#lblCost').hide(1000);
        //            //        $('#lblCost').remove();
        //            //    }, 3000);
        //            //}
        //            //else {
        //            //    level=1
        //            //}

        //        }
        //        var directId = 0
        //        var costDirect = 0
        //        if ($('#PrServiceH tbody tr').length != 0) {
        //            directId = $('#PrServiceH').attr('data-d');
        //            if (directId != undefined && $('#PrServiceH').attr('data-s') == undefined) {
        //                level = 2
        //                gs = directId
        //                costDirect = $('#PrServiceH tbody tr:eq(0) td:eq(1)').text();
        //                //if (costDirect == 'Договорная') {
        //                //    successRequest = false
        //                //    $('#lblCost').remove();
        //                //    $("html, body").animate({ scrollTop: 550 }, "slow");
        //                //    $('#PrServiceH tbody tr:eq(0)').children('td:eq(1)').children('a').after('<label style="color:red" id="lblCost">Необходимо указать стоимость</label>')
        //                //    window.setTimeout(function () {
        //                //        // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
        //                //        $('#lblCost').hide(1000);
        //                //        $('#lblCost').remove();
        //                //    }, 3000);
        //                //}
        //            }
        //            else {


        //                var P_Services = []
        //                if ($('#PrServiceH').attr('data-d') == undefined && $('#PrServiceH').attr('data-s') == undefined) {
        //                    level = 3;
        //                    gs = directId
        //                    $("#PrServiceH tbody tr").each(function () {

        //                        var quant = $(this).children('td:eq(1)').find('input').val();//$(this).next('td').find('input').val();
        //                        //if (quant.length != 0 || quant == 0) {
        //                        //    quant=1
        //                        //}
        //                        quant = (quant == "" || quant == null || quant == undefined) ? 0 : quant
        //                        var Cost = $(this).children('td:eq(3)').children('a').text();//$(this).next('td').next('td').text();
        //                        if (Cost == "Договорная") {
        //                            successRequest = false
        //                            $('#lblCost').remove();
        //                            $("html, body").animate({ scrollTop: 550 }, "slow");
        //                            $(this).children('td:eq(3)').children('a').after('<label style="color:red" id="lblCost">Необходимо указать стоимость</label>')
        //                            window.setTimeout(function () {
        //                                // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
        //                                $('#lblCost').hide(1000);
        //                                $('#lblCost').remove();
        //                            }, 3000);

        //                        }
        //                        var serviceId = $(this).children('td:eq(0)').attr('itemid');
        //                        P_Services.push({ 'SERVICE_ID': serviceId, 'QUANTITY': quant, 'COST': Cost })

        //                    })
        //                }
        //            }

        //        }
        //        var Calendar = $("#calen1").val();
        //        var time = $("#tm").val();

        //        if (Calendar == "" || time == "") {
        //            successRequest = false;
        //            if (time == "") {
        //                $("#tm_S").text("Необходимо заполнить поле \"Планируемое время\"").show();

        //            }
        //            if (Calendar == "") {
        //                $("#tm_S").text("Необходимо заполнить поле \"Планируемая дата\"").show();

        //            }
        //            $("html, body").animate({ scrollTop: 500 }, "slow");
        //            window.setTimeout(function () { $('#tm_S').hide(); }, 3000);
        //        } else {


        //            var mindate = getDate();
        //            var mintime = getTime("");
        //            if (Calendar < mindate) {
        //                successRequest = false
        //                $("#calen1").val(Calendar)
        //                $("#tm").val(time);
        //                $("#tm_S").text("Необходимо указать дату  не ранее текущей ").show();
        //                $("html, body").animate({ scrollTop: 500 }, "slow");
        //                window.setTimeout(function () { $('#tm_S').hide(); }, 3000);

        //            }
        //            if (time <= mintime && Calendar == mindate) {
        //                successRequest = false
        //                $("#tm_S").text("Необходимо указать  время  не ранее текущей").show();
        //                $("#calen1").val(Calendar)
        //                $("#tm").val(time);
        //                window.setTimeout(function () { $('#tm_S').hide(); }, 3000);
        //            }

        //        }
        //        var otvets = $("#Otven").attr('itemid');
        //        var RText = $("#RText").val();
        //        RText = encodeURIComponent(RText)
        //        var indid = $("#Ind").attr("itemid");

        //        slcObj = JSON.parse(slcObj)
        //        var ObjId = $("#objctZ").val();
        //        var sclObjName = $("#objctZ option:selected").text();
        //        var indid = $("#Ind").attr("itemid")
        //        var RComment = $('#RComment').val()
        //        if (indid == undefined) {
        //            var objNotInd = [];
        //            objNotInd.push({ "Object_Adress": sclObjName, "Object_Id": ObjId, "room": room_, "indName": Ind, "phon": Phn, "score": $('#Acnum').val() })
        //            RComment = RComment + "|" + JSON.stringify(objNotInd)
        //            indid = 0;
        //        }

        //        RComment = encodeURI(RComment)
        //        var RImg = []; // $(".foto-disp").attr("data-url")
        //        //for (var i = 0; i < 4; i++) {
        //        //    RImg.push({ "REQUEST_COMMENT_": "=", "COMMENT_FILE": $("#fotoDisp" + i + "").attr("data-url"), "COMMENT_DATETIME": "++" });
        //        //}
        //        $("#imgss img").each(function () {
        //            var ImgSrc = $(this).attr("data-url")
        //            RImg.push({ "REQUEST_COMMENT_": "=", "COMMENT_FILE": ImgSrc, "COMMENT_DATETIME": "++" })
        //        })
        //        var em_ = $('#chkem').prop('checked')
        //        em_ = "" + em_ + ""
        //        var opl = $('#opl').prop('checked');
        //        opl = "" + opl + ""
        //        var ispol = $('#IspolList').val();
        //        var obj = {
        //            'slcObj': slcObj,
        //            'IndId_': indid,
        //            'Lg': LogId,
        //            'em': em_,
        //            'DId': 0,
        //            'Pdate': Calendar,
        //            'Ptime': time,
        //            'spId': ispol,
        //            'Rt': RText,
        //            'prs': P_Services,
        //            'Rc': RComment,
        //            'Cf': RImg,
        //            'RoomT': rm_Type,
        //            'NUMBER': accnmbr,
        //            'opl': opl,
        //            'phn': Phn,
        //            'gs': Set,
        //            'HReq': $('#hedrZ').attr('z_id'),
        //            'level': level,
        //            'dId': (directId == undefined) ? 0 : directId,
        //            'sid': Set,
        //            'costDirect': costDirect,
        //            'CostSet': CostSet,
        //            'indName': $('#Ind').val(),
        //            'RESPONSIBLE_ID': $('#Otven').val()


        //        }

        //        if (successRequest == true) {
        //            // alert(ok)
        //            $('.ui-loader-background,#loader').show()
        //            SaveRequest(obj);
        //        }


        //    })
        //    $("#SaveMO").click(function () {
        //        $("#SaveDD").click();

        //    })
        //    var st = sessionStorage.getItem("st")
        //    $("#backUo").click(function () {

        //        var result = confirm("Внесенные данные будут утеряны");
        //        if (result == true) {
        //            var comes = sessionStorage.getItem("All");
        //            if (comes == "Notall") {
        //                window.location.href = "RegisterRequest.aspx"
        //            }
        //            else {
        //                window.location.href = "AllRequsts.aspx"
        //            }

        //        } else {

        //            return false;
        //        }
        //    })
        //    $('a[href="RegisterRequest.aspx"]').click(function () {

        //        var changes = sessionStorage.getItem('changes');
        //        if (changes == "true") {
        //            var result = confirm("Внесенные данные будут утеряны");
        //            if (result == true) {
        //                window.location.href = "RegisterRequest.aspx"

        //            } else {

        //                return false;
        //            }
        //        }
        //    })
        //    $('a[href="AllRequsts.aspx"]').click(function () {
        //        var changes = sessionStorage.getItem('changes');
        //        if (changes == "true") {
        //            var result = confirm("Внесенные данные будут утеряны");
        //            if (result == true) {
        //                window.location.href = "RegisterRequest.aspx"

        //            } else {

        //                return false;
        //            }
        //        }
        //    })


        //    $("#CloseServ").click(function () { $("#close_7").click(); })
        //}
        //$("#Room").keyup(function () { $("#Room_S").hide() })
        //$("#Room").bind("keyup mouseup", function () { $("#Room_S").hide() })

        //$("#dost").click(function () {
        //    if ($(this).prop('checked') == true) {
        //        $("#TDost").prop("disabled", false)
        //        //$("#StDost").prop("disabled", false)
        //    }
        //    else {
        //        $("#TDost").prop("disabled", true)
        //        $("#StDost").val(0)
        //        $("#TDost").val(0)
        //        //  $("#StDost").prop("disabled", true)
        //        var total = 0;
        //        $("#PrService tr td:nth-child(3)").each(function () {
        //            var currentTd = $(this).text()

        //            total += parseInt(currentTd)

        //            // console.log($(this).text());
        //        })

        //        $("#ItCost").val(total);
        //    }
        //})
        ////if (R_id == "" || R_id == undefined || R_id == null) {
        ////    getDelivery("");
        ////}
        //$(document).on('change', '#TDost', function () {
        //    var stDely = $('#TDost option:selected').attr('itemid');
        //    $("#StDost").val(stDely);
        //    var stSelectedValue = $('#TDost option:selected').val();
        //    if (stSelectedValue == 0) {
        //        $("#StDost").val(0);
        //        var total = 0;
        //        $("#PrService tr td:nth-child(3)").each(function () {
        //            var currentTd = $(this).text()

        //            total += parseInt(currentTd)

        //            // console.log($(this).text());
        //        })
        //        $("#ItCost").val(total);
        //    }
        //    else {
        //        var total = 0;
        //        $("#PrService tr td:nth-child(3)").each(function () {
        //            var currentTd = $(this).text()

        //            total += parseInt(currentTd)

        //            // console.log($(this).text());
        //        })
        //        var stDost = $("#StDost").val();
        //        total = parseInt(total) + parseInt(stDost)
        //        $("#ItCost").val(total);
        //    }
        //    //  sessionStorage.setItem("sum", $("#ItCost").val())
        //    // total = sessionStorage.getItem("sum");
        //    //sessionStorage.setItem("sum", $("#ItCost").val())
        //})
        //$("#files").change(function () {
        //    // $("#loader").show();
        //    var filePath = $('#files').val();
        //    $('.ui-loader-background,#loader').show()
        //    var index = filePath.lastIndexOf("\\") + 1;
        //    var filename = filePath.substr(index);

        //    readURL(this, filename);

        //})
        //function readURL(input, imgName) {
        //    if (input.files && input.files[0]) {
        //        var reader = new FileReader();
        //        reader.readAsDataURL(input.files[0]);
        //        reader.onload = function (e) {


        //            $('#fotoDisp0').attr('src', e.target.result);

        //            //var nameImg = imgName
        //            //var arrayBuffer = reader.result
        //            //var bytes = new Uint8Array(arrayBuffer);
        //            //var obj = { baseString: bytes, imgName: nameImg };
        //            var formData = new FormData();
        //            var file = document.getElementById("files").files[0];

        //            formData.append('file', file, encodeURI(file.name));
        //            formData.append('object_id', '1');
        //            //console.log(formData);



        //            $.ajax({
        //                type: "POST",
        //                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
        //                data: formData,
        //                type: 'POST',
        //                contentType: "multipart/form-data",
        //                processData: false,
        //                // async: false,
        //                success: function (result) {

        //                    //alert("OK. See Console -  press F12");
        //                    // console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
        //                    //var jsondata_1 = jQuery.parseJSON(result)
        //                    //var jsondata_1 = JSON.stringify(result)
        //                    // var jsondata_1 = JSON.parse(result)
        //                    //  $("#files").hide();
        //                    var imgslenght = $("#imgss").find("img").length;
        //                    if (imgslenght != 5) {
        //                        imgslenght++
        //                        //  var lastImgItem = $("#imgss").find("img:last").attr("itemid");
        //                        // lastImgItem++;
        //                        $(input).after('<div class="col-xs-2" id="zImg"><img class="foto-disp" id="fotoDisp' + imgslenght + '" itemid=' + imgslenght + '  data-url="0"  src=""></div>')//../Files/upl.png
        //                        $("#files").val("");
        //                    }
        //                    if (imgslenght == 5) {
        //                        $("#files,#file_btn").hide();

        //                    }
        //                    var F_ile = result.URL
        //                    var extention = F_ile.substr(F_ile.indexOf(".") + 1)
        //                    if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
        //                        $('#fotoDisp' + imgslenght + '').attr('src', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
        //                    }
        //                    if (extention == "docx" || extention == "doc") {
        //                        $('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/word.png')
        //                        $('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
        //                        $('#fotoDisp' + imgslenght + '').after('<span style="font-size: 20px;">' + imgName + '</span>')
        //                    }
        //                    if (extention == "xlsx" || extention == "xls") {
        //                        $('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/excel.png')
        //                        $('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
        //                        $('#fotoDisp' + imgslenght + '').after('<span style="font-size: 20px;">' + imgName + '</span>')
        //                    }
        //                    if (extention == "pdf" || extention == "PDF") {
        //                        $('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/pedefe.png')
        //                        $('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
        //                        $('#fotoDisp' + imgslenght + '').after('<span style="font-size: 20px;">' + imgName + '</span>')
        //                    }
        //                    if (extention == "txt" || extention == "TXT") {
        //                        $('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/texete.png')
        //                        $('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
        //                        $('#fotoDisp' + imgslenght + '').after('<span style="font-size: 20px;">' + imgName + '</span>')
        //                    }
        //                    //$("#hdPr2").show()
        //                    //$("#zImg2").show()
        //                    //$("#files2").show()

        //                    $('.ui-loader-background,#loader').hide()

        //                },

        //                error: function (datas) {


        //                    console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

        //                    var filePath = $('#files').val();
        //                    var index = filePath.lastIndexOf("\\") + 1;
        //                    var filename = filePath.substr(index);
        //                    readURL(input, filename)
        //                    /*

            
            

        //    readURL(this, filename);*/


        //                },
        //                failure: function (r) {
        //                    alert("FAIL");
        //                }
        //            });


        //        }


        //    }
        //}

        //$("#files2").change(function () {
        //    // $("#loader").show();
        //    var filePath = $('#files2').val();

        //    var index = filePath.lastIndexOf("\\") + 1;
        //    var filename = filePath.substr(index);

        //    readURL2(this, filename);

        //})
        //function readURL2(input, imgName) {
        //    if (input.files && input.files[0]) {
        //        var reader = new FileReader();
        //        reader.readAsDataURL(input.files[0]);
        //        reader.onload = function (e) {


        //            $('#fotoDisp1').attr('src', e.target.result);

        //            //var nameImg = imgName
        //            //var arrayBuffer = reader.result
        //            //var bytes = new Uint8Array(arrayBuffer);
        //            //var obj = { baseString: bytes, imgName: nameImg };
        //            var formData = new FormData();
        //            var file = document.getElementById("files2").files[0];

        //            formData.append('file', file, file.name);
        //            formData.append('object_id', '1');
        //            //console.log(formData);



        //            $.ajax({
        //                type: "POST",
        //                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
        //                data: formData,
        //                type: 'POST',
        //                contentType: "multipart/form-data",
        //                processData: false,
        //                // async: false,
        //                success: function (result) {

        //                    //alert("OK. See Console -  press F12");
        //                    // console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
        //                    //var jsondata_1 = jQuery.parseJSON(result)
        //                    //var jsondata_1 = JSON.stringify(result)
        //                    // var jsondata_1 = JSON.parse(result)
        //                    $("#files2").hide();
        //                    var F_ile = result.URL
        //                    var extention = F_ile.substr(F_ile.indexOf(".") + 1)
        //                    if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
        //                        $('#fotoDisp1').attr('src', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $('#fotoDisp1').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $("#fotoDisp1").parent().prepend('<i class="fa fa-close" onclick=removeF(1) aria-hidden="true" style="color:red;"></i>')
        //                    }
        //                    if (extention == "docx" || extention == "doc") {
        //                        $('#fotoDisp1').attr('src', window.location.protocol + '//' + window.location.host + '/img/word.png')
        //                        $('#fotoDisp1').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $("#fotoDisp1").parent().prepend('<i class="fa fa-close" onclick=removeF(1) aria-hidden="true" style="color:red;"></i>')
        //                    }
        //                    if (extention == "xlsx" || extention == "xls") {
        //                        $('#fotoDisp1').attr('src', window.location.protocol + '//' + window.location.host + '/img/excel.png')
        //                        $('#fotoDisp1').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $("#fotoDisp1").parent().prepend('<i class="fa fa-close" onclick=removeF(1) aria-hidden="true" style="color:red;"></i>')
        //                    }
        //                    if (extention == "pdf" || extention == "PDF") {
        //                        $('#fotoDisp1').attr('src', window.location.protocol + '//' + window.location.host + '/img/pedefe.png')
        //                        $('#fotoDisp1').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $("#fotoDisp1").parent().prepend('<i class="fa fa-close" onclick=removeF(1) aria-hidden="true" style="color:red;"></i>')
        //                    }
        //                    if (extention == "txt" || extention == "TXT") {
        //                        $('#fotoDisp1').attr('src', window.location.protocol + '//' + window.location.host + '/img/texete.png')
        //                        $('#fotoDisp1').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $("#fotoDisp1").parent().prepend('<i class="fa fa-close" onclick=removeF(1) aria-hidden="true" style="color:red;"></i>')
        //                    }
        //                    $("#hdPr3").show()
        //                    $("#zImg3").show()
        //                    $("#files3").show()
        //                    $("#loader").hide();

        //                },

        //                error: function (datas) {


        //                    console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

        //                    var filePath = $('#files2').val();
        //                    var index = filePath.lastIndexOf("\\") + 1;
        //                    var filename = filePath.substr(index);
        //                    readURL2(input, filename)
        //                    /*

            
            

        //    readURL(this, filename);*/


        //                },
        //                failure: function (r) {
        //                    alert("FAIL");
        //                }
        //            });


        //        }


        //    }
        //}

        //$("#files3").change(function () {
        //    // $("#loader").show();
        //    var filePath = $('#files3').val();

        //    var index = filePath.lastIndexOf("\\") + 1;
        //    var filename = filePath.substr(index);

        //    readURL3(this, filename);

        //})
        //function readURL3(input, imgName) {
        //    if (input.files && input.files[0]) {
        //        var reader = new FileReader();
        //        reader.readAsDataURL(input.files[0]);
        //        reader.onload = function (e) {


        //            $('#fotoDisp2').attr('src', e.target.result);

        //            //var nameImg = imgName
        //            //var arrayBuffer = reader.result
        //            //var bytes = new Uint8Array(arrayBuffer);
        //            //var obj = { baseString: bytes, imgName: nameImg };
        //            var formData = new FormData();
        //            var file = document.getElementById("files3").files[0];

        //            formData.append('file', file, file.name);
        //            formData.append('object_id', '1');
        //            //console.log(formData);



        //            $.ajax({
        //                type: "POST",
        //                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
        //                data: formData,
        //                type: 'POST',
        //                contentType: "multipart/form-data",
        //                processData: false,
        //                // async: false,
        //                success: function (result) {

        //                    //alert("OK. See Console -  press F12");
        //                    // console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
        //                    //var jsondata_1 = jQuery.parseJSON(result)
        //                    //var jsondata_1 = JSON.stringify(result)
        //                    // var jsondata_1 = JSON.parse(result)
        //                    $("#files3").hide();
        //                    var F_ile = result.URL
        //                    var extention = F_ile.substr(F_ile.indexOf(".") + 1)
        //                    if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
        //                        $('#fotoDisp2').attr('src', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $('#fotoDisp2').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))

        //                        $("#fotoDisp2").parent().prepend('<i class="fa fa-close" onclick=removeF(2) aria-hidden="true" style="color:red;"></i>')
        //                    }
        //                    if (extention == "docx" || extention == "doc") {
        //                        $('#fotoDisp2').attr('src', window.location.protocol + '//' + window.location.host + '/img/word.png')
        //                        $('#fotoDisp2').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $("#fotoDisp2").parent().prepend('<i class="fa fa-close" onclick=removeF(2) aria-hidden="true" style="color:red;"></i>')
        //                    }
        //                    if (extention == "xlsx" || extention == "xls") {
        //                        $('#fotoDisp2').attr('src', window.location.protocol + '//' + window.location.host + '/img/excel.png')
        //                        $('#fotoDisp2').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $("#fotoDisp2").parent().prepend('<i class="fa fa-close" onclick=removeF(2) aria-hidden="true" style="color:red;"></i>')
        //                    }
        //                    if (extention == "pdf" || extention == "PDF") {
        //                        $('#fotoDisp2').attr('src', window.location.protocol + '//' + window.location.host + '/img/pedefe.png')
        //                        $('#fotoDisp2').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $("#fotoDisp2").parent().prepend('<i class="fa fa-close" onclick=removeF(2) aria-hidden="true" style="color:red;"></i>')
        //                    }
        //                    if (extention == "txt" || extention == "TXT") {
        //                        $('#fotoDisp2').attr('src', window.location.protocol + '//' + window.location.host + '/img/texete.png')
        //                        $('#fotoDisp2').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $("#fotoDisp2").parent().prepend('<i class="fa fa-close" onclick=removeF(2) aria-hidden="true" style="color:red;"></i>')
        //                    }
        //                    $("#hdPr4").show()
        //                    $("#zImg4").show()
        //                    $("#files4").show()
        //                    $("#loader").hide();

        //                },

        //                error: function (datas) {


        //                    //console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

        //                    var filePath = $('#files3').val();
        //                    var index = filePath.lastIndexOf("\\") + 1;
        //                    var filename = filePath.substr(index);
        //                    readURL3(input, filename)
        //                    /*

            
            

        //    readURL(this, filename);*/


        //                },
        //                failure: function (r) {
        //                    alert("FAIL");
        //                }
        //            });


        //        }


        //    }
        //}

        //$("#files4").change(function () {
        //    // $("#loader").show();
        //    var filePath = $('#files4').val();

        //    var index = filePath.lastIndexOf("\\") + 1;
        //    var filename = filePath.substr(index);

        //    readURL4(this, filename);

        //})
        //function readURL4(input, imgName) {
        //    if (input.files && input.files[0]) {
        //        var reader = new FileReader();
        //        reader.readAsDataURL(input.files[0]);
        //        reader.onload = function (e) {


        //            $('#fotoDisp3').attr('src', e.target.result);

        //            //var nameImg = imgName
        //            //var arrayBuffer = reader.result
        //            //var bytes = new Uint8Array(arrayBuffer);
        //            //var obj = { baseString: bytes, imgName: nameImg };
        //            var formData = new FormData();
        //            var file = document.getElementById("files4").files[0];

        //            formData.append('file', file, file.name);
        //            formData.append('object_id', '1');
        //            //console.log(formData);



        //            $.ajax({
        //                type: "POST",
        //                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
        //                data: formData,
        //                type: 'POST',
        //                contentType: "multipart/form-data",
        //                processData: false,
        //                // async: false,
        //                success: function (result) {

        //                    //alert("OK. See Console -  press F12");
        //                    // console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
        //                    //var jsondata_1 = jQuery.parseJSON(result)
        //                    //var jsondata_1 = JSON.stringify(result)
        //                    // var jsondata_1 = JSON.parse(result)
        //                    $("#files4").hide();
        //                    var F_ile = result.URL
        //                    var extention = F_ile.substr(F_ile.indexOf(".") + 1)
        //                    if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
        //                        $('#fotoDisp3').attr('src', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $('#fotoDisp3').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $("#fotoDisp3").parent().prepend('<i class="fa fa-close" onclick=removeF(3) aria-hidden="true" style="color:red;"></i>')
        //                    }
        //                    if (extention == "docx" || extention == "doc") {
        //                        $('#fotoDisp3').attr('src', window.location.protocol + '//' + window.location.host + '/img/word.png')
        //                        $('#fotoDisp3').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $("#fotoDisp3").parent().prepend('<i class="fa fa-close" onclick=removeF(3) aria-hidden="true" style="color:red;"></i>')
        //                    }
        //                    if (extention == "xlsx" || extention == "xls") {
        //                        $('#fotoDisp3').attr('src', window.location.protocol + '//' + window.location.host + '/img/excel.png')
        //                        $('#fotoDisp3').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $("#fotoDisp3").parent().prepend('<i class="fa fa-close" onclick=removeF(3) aria-hidden="true" style="color:red;"></i>')
        //                    }
        //                    if (extention == "pdf" || extention == "PDF") {
        //                        $('#fotoDisp3').attr('src', window.location.protocol + '//' + window.location.host + '/img/pedefe.png')
        //                        $('#fotoDisp3').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $("#fotoDisp3").parent().prepend('<i class="fa fa-close" onclick=removeF(3) aria-hidden="true" style="color:red;"></i>')
        //                    }
        //                    if (extention == "txt" || extention == "TXT") {
        //                        $('#fotoDisp3').attr('src', window.location.protocol + '//' + window.location.host + '/img/texete.png')
        //                        $('#fotoDisp3').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //                        $("#fotoDisp3").parent().prepend('<i class="fa fa-close" onclick=removeF(3) aria-hidden="true" style="color:red;"></i>')
        //                    }

        //                    $("#loader").hide();

        //                },

        //                error: function (datas) {


        //                    //console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

        //                    var filePath = $('#files4').val();
        //                    var index = filePath.lastIndexOf("\\") + 1;
        //                    var filename = filePath.substr(index);
        //                    readURL4(input, filename)
        //                    /*

            
            

        //    readURL(this, filename);*/


        //                },
        //                failure: function (r) {
        //                    alert("FAIL");
        //                }
        //            });


        //        }


        //    }
        //}
        //function AddImage(strErrData, slctName) {
        //    var r_t = strErrData.responseText.substring(strErrData.responseText.indexOf('<'), 0);
        //    r_t = JSON.parse(r_t)
        //    $(slctName).attr("src", r_t.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
        //}


        //$("#adr").keyup(function () {
        //    $("#adr_S").hide();
        //    var adres = $("#adr").val();
        //    if (adres.length >= 4) {
        //        //console.log("""")
        //        var obj = { txt: adres }

        //        $.ajax({
        //            url: "/Client_Admin/CreateOpject.aspx/GetStreetsBytext",
        //            data: JSON.stringify(obj),
        //            dataType: "json",
        //            type: "POST",
        //            contentType: "application/json; charset=utf-8",
        //            success: function (data) {
        //                // console.log(data);
        //                var jsondata = JSON.parse(data.d);
        //                //console.log(jsondata.d[0].CODE);
        //                // console.log(data.d.CODE)
        //                $.each(jsondata, function (key, value) {
        //                    $("#adrList").append('<option value="' + value.Name + ' " itemid=' + value.CODE + '></option>')
        //                    // console.log(value.Name)
        //                })
        //            }
        //        })

        //    }
        //    else {
        //        $("#adrList").empty();
        //    }
        //})
        //$("#Ind").keyup(function () { $("#Ind_S").hide() })
        //$("#Phn").keyup(function () { $("#Phn_S").hide() })

        //$("#calen1,#tm").change(function () { $("#tm_S").hide() })
        ////if (R_id == "" || R_id == undefined || R_id == null) {
        ////    //getListSpecialist("");

        ////}
        //$("#RText").keyup(function () { $("#RText_S").hide() })
        //$("#RComment").keyup(function () { $("#RComment_S").hide() })
        ////if (R_id == "" || R_id == undefined || R_id == null) {

        ////}

        //function sensComment(rid, rc, dturl) {
        //    if (rc.length != 0) {
        //        var obj = { "rq": rid, "cmnt": rc }
        //        $.ajax({
        //            type: "POST",
        //            url: "CreateRequest.aspx/sntComment",
        //            data: JSON.stringify(obj),
        //            contentType: "application/json; charset=utf-8",
        //            dataType: "json",
        //            success: function (data) {
        //                var hst = $("#hstCom").text().trim();
        //                if (hst == "-") {
        //                    $("#hstCom").empty();
        //                    $("#hstCom").append("<h4 style='margin-bottom:  -6px;'>- " + rc + "  </h4> (сегодня в " + getTime("") + ")")
        //                    $("#RComment").val("")

        //                }
        //                else {
        //                    $("#hstCom").append("<h4 style='margin-bottom:  -6px;'>- " + rc + "  </h4>     (сегодня в " + getTime("") + ")")
        //                    $("#RComment").val("")

        //                }
        //            }
        //        })
        //    }

        //    if (dturl != 0) {
        //        H_fileSave(rid, dturl)
        //        $("#HImg").attr("src", window.location.protocol + '//' + window.location.host + "/Files/upl.png").attr("data-url", "0")
        //    }
        //    $('#fileH_btn').show();

        //}

        //function RabotVipol(rid) {
        //    var modal = document.getElementById('myModal5');
        //    var span = document.getElementsByClassName("close")[0];
        //    modal.style.display = "block";
        //    $('#f_iles2').attr('onchange', 'fileForVipol(this)')
        //    $("#close_5").click(function () {
        //        modal.style.display = "none";
        //        $('#f_iles2').removeAttr('onchange');
        //        $(".modal-body2 img").remove()
        //        $(".modal-body2 h4").remove();
        //        $(".modal-body2 i").remove()
        //    })
        //    window.onclick = function (event) {
        //        if (event.target == modal) {
        //            modal.style.display = "none";
        //            $(".modal-body2 img").remove()
        //            $(".modal-body2 h4").remove();
        //            $(".modal-body2 i").remove()
        //        }
        //    }
        //    $("#Close_Ot").click(function () {
        //        modal.style.display = "none";
        //        $(".modal-body2 img").remove()
        //        $(".modal-body2 h4").remove();
        //        $(".modal-body2 i").remove()
        //    })
        //    $("#OkVipol").click(function () {
        //        var imgs = [];
        //        $(".modal-body2 img").each(function () {
        //            var ImgSrc = $(this).attr("data-url")
        //            imgs.push({ "ImgAdres": ImgSrc });
        //        })
        //        var imgsCount = imgs.length;
        //        if (imgsCount == 0) {
        //            imgs.push({ "ImgAdres": 0 });
        //        }
        //        var P_Services = []
        //        $("#PrServiceH tbody tr").each(function () {
        //            var quant = $(this).children('td:eq(1)').find('input').val();
        //            quant = (quant == "" || quant == null || quant == undefined) ? 0 : quant
        //            var Cost = $(this).children('td:eq(3)').children('a').text();
        //            Cost = parseInt(Cost)
        //            var serviceId = $(this).children('td:eq(0)').attr('itemid');
        //            P_Services.push({ 'SERVICE_ID': serviceId, 'QUANTITY': quant, 'COST': Cost })
        //        })
        //        var opl = $('#opl').prop('checked');
        //        opl = "" + opl + ""
        //        var lg_id = $('#lgId').text()
        //        var grupservis = $('#PrServiceH tbody').children('tr:eq(0)').attr('data-d')//($('#subMenu').attr('data-d') == undefined) ? 0 : $('#subMenu').attr('data-d')
        //        var objV = {
        //            "Rid": R_id, "rsf": imgs, "rst": $("#cmntsts2").val(), 'prs': P_Services, 'opl': opl, 'login_id': lg_id
        //        }
        //        if (P_Services.length != 0) {
        //            $.ajax({
        //                type: "POST",
        //                url: "CreateRequest.aspx/makeVipol",
        //                data: JSON.stringify(objV),
        //                contentType: "application/json; charset=utf-8",
        //                dataType: "json",
        //                success: function (data) {//Заявка по работе <Номер заявки> выполнена
        //                    SaveFCM('Заявки', 'Заявка получила статус "Выполнена"', '"По заявке № ' + R_id + ' работа выполнена.', '', $('#Acnum').val(), LogId, 'CreateRequest.aspx', R_id)
        //                    SaveLog("Работа выполнена", "Важное", "Диспетчер", "Диспетчеризация", "Работа по заявке < " + R_id + " > выполнена", LogId);
        //                    var comes = sessionStorage.getItem("All");
        //                    if (comes == "Notall") {
        //                        window.location.href = "RegisterRequest.aspx"
        //                    }
        //                    else {
        //                        window.location.href = "AllRequsts.aspx"
        //                    }
        //                }
        //            })
        //        }
        //        else {
        //            $('#errorServs').remove();
        //            $('#PrServiceH').before('<label id="errorServs"style="color:red">Необходимо выбрать услугу</label>')
        //            window.setTimeout(function () { $('#errorServs').remove(); }, 4000)

        //        }
        //        console.log(JSON.stringify(imgs))
        //    })
        //}

        //function vernutVrabot(rid) {
        //    var modal = document.getElementById('myModal6');
        //    var span = document.getElementsByClassName("close")[0];
        //    modal.style.display = "block";
        //    $("#close_6").click(function () {
        //        modal.style.display = "none";
        //    })
        //    window.onclick = function (event) {
        //        if (event.target == modal) {
        //            modal.style.display = "none";
        //        }
        //    }
        //}

        //if (R_id != "" && R_id != undefined && R_id != null) {
        //    $('#fileH_btn').click(function () {
        //        $('#fileH').click();
        //    })
        //    $("#fileH").change(function () {
        //        // $("#loader").show();
        //        var filePath = $('#f_iles2').val();
        //        //<img id="imgdwnl2" style="width:71px"/>//
        //        var lastimage = $("#hstCom h4:last-child").text();
        //        $("#cmntsts2").after()
        //        var index = filePath.lastIndexOf("\\") + 1;
        //        var filename = filePath.substr(index);

        //        readURLH(this, filename);

        //    })
        //    function readURLH(input, imgName) {
        //        if (input.files && input.files[0]) {
        //            var reader = new FileReader();
        //            reader.readAsDataURL(input.files[0]);
        //            reader.onload = function (e) {
        //                //  $('.foto-disp').attr('src', e.target.result);
        //                //var nameImg = imgName
        //                //var arrayBuffer = reader.result
        //                //var bytes = new Uint8Array(arrayBuffer);
        //                //var obj = { baseString: bytes, imgName: nameImg };
        //                var formData = new FormData();
        //                var file = document.getElementById("fileH").files[0];

        //                formData.append('file', file, encodeURI(file.name));
        //                formData.append('object_id', '1');
        //                //console.log(formData);
        //                $.ajax({
        //                    type: "POST",
        //                    url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
        //                    data: formData,
        //                    type: 'POST',
        //                    contentType: "multipart/form-data",
        //                    processData: false,
        //                    // async: false,
        //                    success: function (result) {

        //                        //alert("OK. See Console -  press F12");
        //                        // console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
        //                        // $("#fileH").val("")
        //                        //var jsondata_1 = jQuery.parseJSON(result)
        //                        //var jsondata_1 = JSON.stringify(result)
        //                        // var jsondata_1 = JSON.parse(result)
        //                        /// 

        //                        var itemnum = $("#himgs > img:last").attr("itemid");
        //                        if (itemnum == undefined) {
        //                            itemnum = 0;
        //                            itemnum++;
        //                        }
        //                        else {
        //                            itemnum++;
        //                        }
        //                        $("#RComment_S").hide();
        //                        var F_ile = result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/")
        //                        var extention = F_ile.substr(F_ile.lastIndexOf(".") + 1)
        //                        //
        //                        if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {//<img   id="HImg" data-url="0" src=" ../Files/upl.png" style="display:none;width:71px;float: right;margin-right:  52%;">
        //                            //$("#HImg").attr('data-url', F_ile).attr('src', F_ile)
        //                            //$("#HImg").after('<i class="fa fa-close" style="float: right;color:red;" aria-hidden="true"></i>')
        //                            $("#himgs").append('<img class="HistImg" itemid="' + itemnum + '" data-url="' + F_ile + '" src="' + F_ile + '"  ><i class="fa fa-close removing" onclick="removeF2(this,' + itemnum + ')"  aria-hidden="true"></i>')
        //                        }
        //                        if (extention == "docx" || extention == "doc") {
        //                            //$("#HImg").attr('data-url', F_ile).attr('src', window.location.protocol + '//' + window.location.host + "/img/word.png")
        //                            $("#himgs").append('<img class="HistImg" itemid="' + itemnum + '" data-url="' + F_ile + '"  src="' + window.location.protocol + '//' + window.location.host + '/img/word.png"  ><i class="fa fa-close removing" onclick="removeF2(this,' + itemnum + ')" aria-hidden="true"></i><h4 itemid="' + itemnum + '" class="titleF2">' + file.name + '</h4>')
        //                        }
        //                        if (extention == "xlsx" || extention == "xls") {
        //                            //$("#HImg").attr('data-url', F_ile).attr('src', window.location.protocol + '//' + window.location.host + "/img/excel.png")
        //                            $("#himgs").append('<img class="HistImg" itemid="' + itemnum + '" data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png"  ><i class="fa fa-close removing" onclick="removeF2(this,' + itemnum + ')" aria-hidden="true"></i><h4 itemid="' + itemnum + '" class="titleF2">' + file.name + '</h4>')
        //                        }
        //                        if (extention == "pdf" || extention == "PDF") {
        //                            //$("#HImg").attr('data-url', F_ile).attr('src', window.location.protocol + '//' + window.location.host + "/img/excel.png")
        //                            $("#himgs").append('<img class="HistImg" itemid="' + itemnum + '" data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png"  ><i class="fa fa-close removing" onclick="removeF2(this,' + itemnum + ')" aria-hidden="true"></i><h4 itemid="' + itemnum + '" class="titleF2">' + file.name + '</h4>')
        //                        }
        //                        if (extention == "txt" || extention == "TXT") {
        //                            //$("#HImg").attr('data-url', F_ile).attr('src', window.location.protocol + '//' + window.location.host + "/img/texete.png")
        //                            $("#himgs").append('<img class="HistImg" itemid="' + itemnum + '" data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png"><i class="fa fa-close removing" onclick="removeF2(this,' + itemnum + ')" aria-hidden="true"></i><h4 itemid="' + itemnum + '" class="titleF2">' + file.name + '</h4>')
        //                        }
        //                        // H_fileSave(R_id, result.URL.replace('~', '..'))
        //                        var imgscount = $("#himgs > img").length;
        //                        if (imgscount >= 5) {
        //                            $('#fileH_btn').hide();
        //                        }

        //                        //  $('.foto-disp').attr('src', )
        //                        $("#loader").hide();

        //                    },

        //                    error: function (datas) {

        //                        //datas = JSON.stringify(datas, null, 2)
        //                        ////var rt = datas.responseText
        //                        ////rt = JSON.parse(rt);
        //                        ////$(".foto-disp").attr('src', rt.URL.replace('~', '..'))
        //                        //Addimage2(datas);
        //                        console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

        //                        var filePath = $('#fileH').val();
        //                        var index = filePath.lastIndexOf("\\") + 1;
        //                        var filename = filePath.substr(index);
        //                        readURLH(input, filename)
        //                    },
        //                    failure: function (r) {
        //                        alert("FAIL");
        //                    }
        //                });


        //            }


        //        }
        //    }
        //    function H_fileSave(rid, imgC) {//ImgAdres
        //        var img_s = [];
        //        imgC = $("#himgs > img:last").attr("itemid");
        //        for (var i = 1; i <= imgC; i++) {
        //            var imgAdres = ($(".HistImg[itemid='" + i + "']").attr("data-url") != undefined) ? $(".HistImg[itemid='" + i + "']").attr("data-url") : "";
        //            img_s.push({ "ImgAdres": imgAdres })
        //        }
        //        var obj = { "R": rid, "imgs": img_s }
        //        $.ajax({
        //            type: "POST",
        //            url: "CreateRequest.aspx/SaveHFile",
        //            data: JSON.stringify(obj),
        //            contentType: "application/json; charset=utf-8",
        //            dataType: "json",
        //            success: function (data) {
        //                //$("#hstCom").append('<a href="' + F_Url + '" download=""><img class="foto-disp" data-url="' + F_Url + '"  src="../Files/03774a21-4965-4a11-823c-1f040143dc2d.jpg"></a>')
        //                $("#himgs").empty();
        //                for (var i = 0; i < img_s.length; i++) {


        //                    var F_ile = img_s[i].ImgAdres
        //                    if (F_ile != "") {



        //                        var extention = F_ile.substr(F_ile.lastIndexOf(".") + 1)
        //                        if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
        //                            $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '"  src="' + F_ile + '" style="width:71px" /></a>')
        //                            $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (сегодня в " + getTime("") + ")  </h5> ")
        //                        }
        //                        if (extention == "docx" || extention == "doc") {
        //                            $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/word.png" style="width:71px" /></a>')
        //                            $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (сегодня в " + getTime("") + ")  </h5> ")

        //                        }
        //                        if (extention == "xlsx" || extention == "xls") {
        //                            $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png"style="width:71px" /></a>')
        //                            $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (сегодня в " + getTime("") + ")  </h5> ")

        //                        }
        //                        if (extention == "pdf" || extention == "PDF") {
        //                            $("#hstCom").append('<br><a href="' + F_ile + '" download=""> <img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png" style="width:71px" /></a>')
        //                            $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (сегодня в " + getTime("") + ")  </h5> ")

        //                        }
        //                        if (extention == "txt" || extention == "TXT") {
        //                            $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png"style="width:71px" /></a>')
        //                            $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (сегодня в " + getTime("") + ")  </h5> ")

        //                        }
        //                    }

        //                }
        //            }
        //        })
        //    }
        //    GetRequesByR(R_id)
        //    var st = sessionStorage.getItem("st")
        //    $('#file_btn').hide();
        //    if (st == 2) {
        //        $('#SearchService').show();
        //        $('a[href="RegisterRequest.aspx"]').click(function () {
        //            var changes = sessionStorage.getItem('changes');
        //            if (changes == "true") {
        //                var result = confirm("Внесенные данные будут утеряны");
        //                if (result == true) {
        //                    window.location.href = "RegisterRequest.aspx"

        //                } else {

        //                    return false;
        //                }
        //            }
        //        })

        //        $('a[href="AllRequsts.aspx"]').click(function () {
        //            var changes = sessionStorage.getItem('changes');
        //            if (changes == "true") {
        //                var result = confirm("Внесенные данные будут утеряны");
        //                if (result == true) {
        //                    window.location.href = "RegisterRequest.aspx"

        //                } else {

        //                    return false;
        //                }
        //            }
        //        })

        //        $(document).click(function (s) {
        //            var class_ = s.target.className;
        //            if (class_ == "btn delBtn" || class_ == "accMenu" || class_ == "col-md-1" || class_ == "checkBx" || class_ != "") {
        //                sessionStorage.setItem('changes', true);
        //            }

        //        })

        //        $(document).keyup(function (s) {
        //            var id = s.target.id;
        //            if (id == "RComment" && id != "") {
        //                sessionStorage.setItem('changes', true);
        //            }

        //        })

        //        $('#Acnum').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
        //        //  $('#IspolList').empty();
        //        if (true) {
        //            //$('#Rj,#RJ2').show();
        //            //$("#calenOF").val(getDate());
        //            //$('#calenOT').val(getDate())
        //            //$("#tmOF1").val(getTime());
        //            //// $('#tmOT1').val(getTime())
        //            //var timeOt = $("#tmOF1").val();
        //            //timeOt = timeOt.split(':')
        //            //ot1Hour = timeOt[0];
        //            //ot1Min = timeOt[1];
        //            //timeOt = (parseInt(ot1Hour) + 1) + ":" + ot1Min
        //            //$('#tmOT1').val(timeOt);
        //            //$('#tmOT2').val(timeOt);
        //            //$("#tmOF2").val(getTime());
        //            //$('#calenOF,#calenOT').change(function () {
        //            //    var calenvalue = $(this).val();
        //            //    if (calenvalue < getDate()) {
        //            //        $(this).val(getDate())
        //            //    }
        //            //})
        //            //$('#tmOT1').change(function () {

        //            //    var of1 = $('#tmOF1').val().split(':');
        //            //    var hourof1 = of1[0];
        //            //    var ot1 = $('#tmOT1').val().split(':');
        //            //    var hourot1 = ot1[0];
        //            //    if (hourot1 <= hourof1) {
        //            //        var minof1 = of1[1];
        //            //        var tmOT1 = (parseInt(hourof1) + 1) + ":" + minof1
        //            //        $('#tmOT1').val(tmOT1);
        //            //    }


        //            //})
        //            //$('#tmOT2').change(function () {

        //            //    var of2 = $('#tmOF2').val().split(':');
        //            //    var hourof2 = of2[0];
        //            //    var ot2 = $('#tmOT2').val().split(':');
        //            //    var hourot2 = ot2[0];
        //            //    if (hourot2 <= hourof2) {
        //            //        var minof2 = of2[1];
        //            //        var tmOT2 = (parseInt(hourof2) + 1) + ":" + minof2
        //            //        $('#tmOT2').val(tmOT2);
        //            //    }


        //            //})
        //            //$("#tmOF1").change(function () {
        //            //    if ($(this).val() == "") {
        //            //        $(this).val(getTime());
        //            //    }
        //            //})
        //            //$("#tmOF2").change(function () {
        //            //    if ($(this).val() == "") {
        //            //        $(this).val(getTime());
        //            //    }
        //            //})
        //        }
        //        // getTime();
        //        // $("#shServ").hide();
        //        $("#hdPr").text("Прикрепленный файл")
        //        $("#hedrZ").attr("Z_id", R_id);
        //        $('#objctZ').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');//mms3
        //        // $("#chkem").attr('disabled', 'disabled')
        //        $("#Room,#opl").attr('disabled', 'disabled')
        //        $("#Ind").attr('disabled', 'disabled')
        //        $("#Phn").attr('disabled', 'disabled')
        //        $("#AddedTable").hide();
        //        $("#fileH_btn").show();
        //        $("#HImg").show();
        //        // $("#PrServiceH").find('th:eq(2)').hide();
        //        // $("#calen1").attr('disabled', 'disabled')
        //        //  $("#tm").attr('disabled', 'disabled')
        //        // $("#IspolList").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
        //        $("#Room_Type,#GServices").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
        //        $("#SendComent,#hstCom,#hstComh").show();
        //        $("#RText").attr('disabled', 'disabled');
        //        // $("#files").attr('disabled', 'disabled');
        //        $("#files").hide();
        //        // $("#SaveDD").text("Работа выполнена")
        //        $('#Otven').removeAttr('disabled')
        //        $("#backUo").text("Отменить заявку")
        //        $("#SaveDD").click(function () {

        //            var successRequest = true;


        //            var Set = $('#Sets').val();
        //            var level = 0;
        //            var P_Services = []
        //            var CostSet = 0
        //            if (Set == 0) {
        //                successRequest = false;
        //                $('#Set_S').remove();
        //                $('#Sets').prev().before('<span id="Set_S" style="float: right;font-weight: bold;color: red">Пожалуйста выберите "Направление"</span>')
        //                window.setTimeout(function () { $('#Set_S').hide(); }, 3000);
        //            }
        //            else {

        //                var dataS = $('#PrServiceH').attr('data-s')
        //                if (dataS != undefined && $('#PrServiceH').attr('data-d') == undefined) {
        //                    level = 1
        //                    CostSet = $('#PrServiceH tbody tr:eq(0) td:eq(1)').text();
        //                    CostSet = (CostSet == 'Договорная') ? '0.00' : CostSet
        //                    //if (CostSet == 'Договорная') {

        //                    //    successRequest = false
        //                    //    $('#lblCost').remove();
        //                    //    $("html, body").animate({ scrollTop: 550 }, "slow");
        //                    //    $('#PrServiceH tbody tr:eq(0)').children('td:eq(1)').children('a').after('<label style="color:red" id="lblCost">Необходимо указать стоимость</label>')
        //                    //    window.setTimeout(function () {
        //                    //        // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
        //                    //        $('#lblCost').hide(1000);
        //                    //        $('#lblCost').remove();
        //                    //    }, 3000);
        //                    //}
        //                }
        //            }
        //            var tr = $('#PrServiceH tbody tr').length
        //            if (tr == 0 && Set != 0) {
        //                $('#PrServiceH').show();
        //                $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').hide();
        //                $('#PrServiceH thead tr th:eq(0)').text('Наименование Направления')
        //                var sid = $('#Sets').val();
        //                $('#PrServiceH').attr('data-s', sid)
        //                //$('#PrServiceH').hide();
        //                $('#PrServiceH tbody').append('<tr><td data-s=' + $('#Sets').val() + '>' + $('#Sets').children(':selected').text() + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
        //                CostSet = $('#PrServiceH tbody tr:eq(0) td:eq(1)').text();
        //                CostSet = (CostSet == 'Договорная') ? '0.00' : CostSet
        //                //if (CostSet == 'Договорная') {

        //                //    successRequest = false
        //                //    $('#lblCost').remove();
        //                //    $("html, body").animate({ scrollTop: 550 }, "slow");
        //                //    $('#PrServiceH tbody tr:eq(0)').children('td:eq(1)').children('a').after('<label style="color:red" id="lblCost">Необходимо указать стоимость</label>')
        //                //    window.setTimeout(function () {
        //                //        // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
        //                //        $('#lblCost').hide(1000);
        //                //        $('#lblCost').remove();
        //                //    }, 3000);
        //                //}
        //                //else {
        //                //    level = 1
        //                //}

        //            }
        //            var directId = 0
        //            var costDirect = 0
        //            if ($('#PrServiceH tbody tr').length != 0) {
        //                directId = $('#PrServiceH').attr('data-d');
        //                if (directId != undefined && $('#PrServiceH').attr('data-s') == undefined) {
        //                    level = 2
        //                    costDirect = $('#PrServiceH tbody tr:eq(0) td:eq(1)').text();
        //                    costDirect = (costDirect == 'Договорная') ? '0.00' : costDirect
        //                    //if (costDirect == 'Договорная') {
        //                    //    successRequest = false
        //                    //    $('#lblCost').remove();
        //                    //    $("html, body").animate({ scrollTop: 550 }, "slow");
        //                    //    $('#PrServiceH tbody tr:eq(0)').children('td:eq(1)').children('a').after('<label style="color:red" id="lblCost">Необходимо указать стоимость</label>')
        //                    //    window.setTimeout(function () {
        //                    //        // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
        //                    //        $('#lblCost').hide(1000);
        //                    //        $('#lblCost').remove();
        //                    //    }, 3000);
        //                    //}
        //                }
        //                else {


        //                    var P_Services = []
        //                    if ($('#PrServiceH').attr('data-d') == undefined && $('#PrServiceH').attr('data-s') == undefined) {
        //                        level = 3;
        //                        $("#PrServiceH tbody tr").each(function () {

        //                            var quant = $(this).children('td:eq(1)').find('input').val();//$(this).next('td').find('input').val();
        //                            //if (quant.length != 0 || quant == 0) {
        //                            //    quant=1
        //                            //}
        //                            quant = (quant == "" || quant == null || quant == undefined) ? 0 : quant
        //                            var Cost = $(this).children('td:eq(3)').children('a').text();//$(this).next('td').next('td').text();
        //                            Cost = (Cost == 'Договорная') ? '0.00' : Cost
        //                            //if (Cost == "Договорная") {
        //                            //    successRequest = false
        //                            //    $('#lblCost').remove();
        //                            //    $("html, body").animate({ scrollTop: 550 }, "slow");
        //                            //    $(this).children('td:eq(3)').children('a').after('<label style="color:red" id="lblCost">Необходимо указать стоимость</label>')
        //                            //    window.setTimeout(function () {
        //                            //        // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
        //                            //        $('#lblCost').hide(1000);
        //                            //        $('#lblCost').remove();
        //                            //    }, 3000);

        //                            //}
        //                            var serviceId = $(this).children('td:eq(0)').attr('itemid');
        //                            P_Services.push({ 'SERVICE_ID': serviceId, 'QUANTITY': quant, 'COST': Cost })

        //                        })
        //                    }
        //                }

        //            }
        //            var em_ = $('#chkem').prop('checked')
        //            em_ = "" + em_ + ""
        //            var opl = $('#opl').prop('checked');
        //            opl = "" + opl + ""

        //            var Calendar = $("#calen1").val();
        //            var time = $("#tm").val();

        //            if (Calendar == "" || time == "") {
        //                successRequest = false;
        //                if (time == "") {
        //                    $("#tm_S").text("Необходимо заполнить поле \"Планируемое время\"").show();

        //                }
        //                if (Calendar == "") {
        //                    $("#tm_S").text("Необходимо заполнить поле \"Планируемая дата\"").show();

        //                }
        //                $("html, body").animate({ scrollTop: 500 }, "slow");
        //                window.setTimeout(function () { $('#tm_S').hide(); }, 3000);
        //            } else {


        //                var mindate = getDate();
        //                var mintime = getTime("");
        //                if (Calendar < mindate) {
        //                    successRequest = false
        //                    $("#calen1").val(Calendar)
        //                    $("#tm").val(time);
        //                    $("#tm_S").text("Необходимо указать дату  не ранее текущей ").show();
        //                    $("html, body").animate({ scrollTop: 500 }, "slow");
        //                    window.setTimeout(function () { $('#tm_S').hide(); }, 3000);

        //                }
        //                if (time <= mintime && Calendar == mindate) {
        //                    successRequest = false
        //                    $("#tm_S").text("Необходимо указать  время  не ранее текущей").show();
        //                    $("#calen1").val(Calendar)
        //                    $("#tm").val(time);
        //                    window.setTimeout(function () { $('#tm_S').hide(); }, 3000);
        //                }

        //            }

        //            var ispol = $('#IspolList').val();
        //            if (ispol == 0) {
        //                $("html, body").animate({ scrollTop: 500 }, "slow");
        //                $('#IspolList_S').text('Необходимо выбрать исполнителя').show();
        //                window.setTimeout(function () { $('#IspolList_S').hide(); }, 3000);
        //                successRequest = false
        //            }

        //            if (successRequest == true) {
        //                var obj =
        //                {
        //                    'Rid': R_id,
        //                    'prs': P_Services,
        //                    'opl': opl,
        //                    'login_id': sessionStorage.getItem("Log"),
        //                    'level': level,
        //                    'sid': Set,
        //                    'dId': (directId == undefined) ? 0 : directId,
        //                    'costDirect': costDirect,
        //                    'CostSet': CostSet,
        //                    'em': em_,
        //                    'Pdate': Calendar,
        //                    'Ptime': time,
        //                    'SpId': ispol,
        //                    'RESPONSIBLE_ID': $('#Otven').val()


        //                }

        //                otpravToVrabot(obj, R_id)
        //            }

        //        })
        //        $("#SaveMO").click(function () {

        //            $("#SaveDD").click()

        //        })
        //        $("#backUo").click(function () {
        //            var successOtmen = true

        //            var objOt = { "Rid": R_id, 'login_id': $('#lgId').text() }
        //            if (successOtmen == true) {
        //                $('#myModal5').show();
        //                $('#reasonlbl').remove();
        //                $('#myModal5').children('.modal-content2').children('.modal-header2').append('<label id="reasonlbl" style="font-size: 20px;color: rgb(0,147,233);">Укажите причину отмены заявки</label>').css('color', 'black')
        //                $('#cmntsts2').text('');
        //                $('#f_iles2').attr('onchange', 'FileForOtmen(this)')
        //                $('#OkVipol').click(function () {
        //                    var imgs = []
        //                    $('#myModal5 .modal-body2').children('img').each(function () {
        //                        imgs.push({ "ImgAdres": $(this).attr('data-url') })
        //                    })
        //                    if (imgs.length != 0) {
        //                        SaveFileOtmen(R_id, imgs);
        //                        // SaveFileZakrito(R_id, imgs);
        //                    }
        //                    var textZakrit = $('#cmntsts2').val()
        //                    if (textZakrit.length != 0) {

        //                        SaveCommentOtmen(R_id, textZakrit);
        //                    }

        //                    $('#close_5').click();
        //                    MakeOtmen(objOt)
        //                })
        //                //$('#f_iles2').change(function () {
        //                //    // $("#loader").show();
        //                //    var filePath = $('#f_iles2').val();
        //                //    //<img id="imgdwnl2" style="width:71px"/>//
        //                //    var lastimage = $("#hstCom h4:last-child").text();
        //                //    $("#cmntsts2").after()
        //                //    var index = filePath.lastIndexOf("\\") + 1;
        //                //    var filename = filePath.substr(index);
        //                //    // filename = encodeURI();
        //                //    readU_RLZakrit(this, filename);
        //                //})
        //                $('#close_5').click(function () {
        //                    $('#myModal5 .modal-body2').children('.titleF,.fa,img,br').remove();
        //                    $('#myModal5').hide();
        //                    //$('#cmntsts2').text('Все работы по данной заявке выполнены')
        //                    $('#cmntsts2').val('');
        //                })
        //                $('#Close_Ot').click(function () {
        //                    $('#close_5').click();
        //                })

        //            }

        //        })
        //        //$('#backUo').click(function ()
        //        //{
        //        //    var objOt = { "Rid": R_id, 'login_id': $('#lgId').text() }
        //        //    MakeOtmen(objOt)
        //        //})
        //        function otpravToVrabot(o, r) {
        //            $.ajax({
        //                type: "POST",
        //                url: "CreateRequest.aspx/otpravToVrabot",
        //                data: JSON.stringify(o),
        //                contentType: "application/json; charset=utf-8",
        //                dataType: "json",
        //                success: function (data) {
        //                    SaveLog("Принять в работу", "Простое", "Диспетчер", "Диспетчеризация", "Заявка < " + r + " >принята в работу", LogId);
        //                    var comes = sessionStorage.getItem("All");
        //                    if (comes == "Notall") {
        //                        window.location.href = "RegisterRequest.aspx"
        //                    }
        //                    else {
        //                        window.location.href = "AllRequsts.aspx"
        //                    }

        //                }
        //            })
        //        }
        //        //$('#SaveDD,#SaveMO').click(function () {
        //        //    var Calendar = $("#calen1").val();
        //        //    var time = $("#tm").val();
        //        //    if (Calendar != "" && time != "") {
        //        //        var mindate = getDate();
        //        //        var mintime = getTime("");
        //        //        if (Calendar >= mindate) {
        //        //            $('#calen1').val(Calendar)
        //        //            $("#tm").val(time)
        //        //            if ((Calendar == mindate && time > mintime) || (Calendar > mindate)) {
        //        //                time = time.replace('-', ':')
        //        //                time = time.replace(':', '-')

        //        //                var ODF = $('#calenOF').val();
        //        //                var ODT = $('#calenOT').val();
        //        //                var OTF1 = $('#tmOF1').val();
        //        //                OTF1 = OTF1.replace(":", "-");
        //        //                var OTF2 = $('#tmOF2').val();
        //        //                OTF2 = OTF2.replace(":", "-");
        //        //                var OTT1 = $('#tmOT1').val().replace(":", "-");
        //        //                var OTT2 = $("#tmOT2").val().replace(":", "-")

        //        //                var ispol = $('#IspolList').val();
        //        //                if (ispol != 0) {

        //        //                    MakeVipolJ(R_id, ispol, Calendar, time, ODF, ODT, OTF1, OTF2, OTT1, OTT2)
        //        //                }
        //        //                else {
        //        //                    $("html, body").animate({ scrollTop: 380 }, "slow");
        //        //                    $("#IspolList_S").text("Необходимо выберите исполнитель").show();
        //        //                }
        //        //            }
        //        //            else {
        //        //                //) || ()
        //        //                if (time <= mintime) {
        //        //                    $("#tm_S").text("Нельзя указывать время раньше текущего").show();
        //        //                    $("#calen1").val(Calendar)
        //        //                    $("#tm").val(time);
        //        //                }
        //        //                if (Calendar < mindate) {
        //        //                    $("#tm_S").text("Нельзя указывать дату, которая ранее текущей").show();
        //        //                    $("#calen1").val(Calendar)
        //        //                    $("#tm").val(time);
        //        //                }
        //        //                $("html, body").animate({ scrollTop: 550 }, "slow");

        //        //            }
        //        //        }
        //        //        else {
        //        //            $("#calen1").val(Calendar)
        //        //            $("#tm").val(time);
        //        //            $("#tm_S").text("Нельзя указывать дату, которая ранее текущей ").show();
        //        //            $("html, body").animate({ scrollTop: 50 }, "slow");
        //        //        }
        //        //    }
        //        //    else {
        //        //        if (time == "") {
        //        //            $("#tm_S").text("Необходимо заполнить поле \"Планируемое время\"").show();
        //        //        }
        //        //        if (Calendar == "") {
        //        //            $("#tm_S").text("Необходимо заполнить поле \"Планируемая дата\"").show();

        //        //        }
        //        //        $("html, body").animate({ scrollTop: 50 }, "slow");
        //        //    }
        //        //})
        //        //// MakeVipolJ(R_id, ispol, Calendar, time)
        //        //function MakeVipolJ(rid, ispol, calen, tm, ODF, ODT, OTF1, OTF2, OTT1, OTT2) {
        //        //    var obj = { "rid": rid, "ispol": ispol, "calen": calen, "tm": tm, "ODF": ODF, "ODT": ODT, "OTF1": OTF1, "OTF2": OTF2, "OTT1": OTT1, "OTT2": OTT2 }
        //        //    $.ajax({
        //        //        type: "POST",
        //        //        url: "CreateRequest.aspx/MakeVipolJ",
        //        //        data: JSON.stringify(obj),
        //        //        contentType: "application/json; charset=utf-8",
        //        //        dataType: "json",
        //        //        success: function (data) {
        //        //            window.location.href = "AllRequsts.aspx";
        //        //        }
        //        //    })

        //        //}
        //    }
        //    if (st == 1) {
        //        //  $('#opl').attr('disabled','disabled')
        //        $('a[href="RegisterRequest.aspx"]').click(function () {
        //            var changes = sessionStorage.getItem('changes');
        //            if (changes == "true") {
        //                var result = confirm("Внесенные данные будут утеряны");
        //                if (result == true) {
        //                    window.location.href = "RegisterRequest.aspx"

        //                } else {

        //                    return false;
        //                }
        //            }
        //        })

        //        $('a[href="AllRequsts.aspx"]').click(function () {
        //            var changes = sessionStorage.getItem('changes');
        //            if (changes == "true") {
        //                var result = confirm("Внесенные данные будут утеряны");
        //                if (result == true) {
        //                    window.location.href = "RegisterRequest.aspx"

        //                } else {

        //                    return false;
        //                }
        //            }
        //        })

        //        $(document).click(function (s) {
        //            var class_ = s.target.className;
        //            if (class_ == "btn delBtn" || class_ == "accMenu" || class_ == "col-md-1" || class_ == "checkBx" || class_ != "") {
        //                sessionStorage.setItem('changes', true);
        //            }

        //        })

        //        $(document).keyup(function (s) {
        //            var id = s.target.id;
        //            if (id == "RComment" && id != "") {
        //                sessionStorage.setItem('changes', true);
        //            }

        //        })

        //        //$(document).keyup(function () {
        //        //    alert('hello')
        //        //})
        //        // $("#shServ").hide();
        //        $('#Acnum').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
        //        $("#hdPr").text("Прикрепленный файл")
        //        $("#hedrZ").attr("Z_id", R_id);
        //        $('#objctZ').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');//mms3
        //        $("#chkem").attr('disabled', 'disabled')
        //        $("#Room").attr('disabled', 'disabled')
        //        $("#Ind").attr('disabled', 'disabled')
        //        $("#Phn,#Sets,#Otven").attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)')
        //        $("#AddedTable").hide();
        //        $("#fileH_btn").show();
        //        $("#HImg").show();
        //        // $("#PrServiceH").find('th:eq(2)').hide();
        //        $("#calen1").attr('disabled', 'disabled')
        //        $("#tm").attr('disabled', 'disabled')
        //        $("#IspolList").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
        //        $("#Room_Type").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
        //        $("#SendComent").show();
        //        $("#RText").attr('disabled', 'disabled');
        //        // $("#files").attr('disabled', 'disabled');
        //        $("#files").hide();
        //        $('#hstComh,#hstCom').show();
        //        $("#SaveDD").text("Работа выполнена")
        //        $("#backUo").text("Отменить заявку")
        //        $("#SaveDD").click(function () {
        //            var successVipol = true;
        //            //var GService = $('#GServices').val()
        //            ////if (GService == 0) {
        //            ////    successVipol = false
        //            ////    $('#GServices_Err').remove();
        //            ////    $('#Phn').after('<label style="color:red" id="GServices_Err">Необходимо выбрать группу услуг</label>')
        //            ////    window.setTimeout(function () {
        //            ////        $('#GServices_Err').remove();
        //            ////    }, 3000)
        //            ////    $("html, body").animate({ scrollTop: 500 }, "slow");
        //            ////}
        //            //var P_Services = []
        //            //$("#PrServiceH tbody tr").each(function () {
        //            //    var quant = $(this).children('td:eq(1)').find('input').val();//$(this).next('td').find('input').val();
        //            //    //if (quant.length != 0 || quant == 0) {
        //            //    //    quant=1
        //            //    //}
        //            //    quant = (quant == "" || quant == null || quant == undefined) ? 0 : quant
        //            //    var Cost = $(this).children('td:eq(3)').children('a').text();//$(this).next('td').next('td').text();
        //            //    if (Cost == "Договорная") {
        //            //        $('#lblCost').remove();
        //            //        $("html, body").animate({ scrollTop: 550 }, "slow");
        //            //        $(this).children('td:eq(3)').children('a').after('<label style="color:red" id="lblCost">Необходимо указать стоимость</label>')
        //            //        window.setTimeout(function () {
        //            //            // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
        //            //            $('#lblCost').hide(1000);
        //            //            $('#lblCost').remove();
        //            //        }, 3000);
        //            //        successVipol = false;
        //            //    }
        //            //    var serviceId = $(this).children('td:eq(0)').attr('itemid');
        //            //    P_Services.push({ 'SERVICE_ID': serviceId, 'QUANTITY': quant, 'COST': Cost })

        //            //})
        //            //P_Services = JSON.stringify(P_Services)
        //            //P_Services = JSON.parse(P_Services)
        //            //if (P_Services.length==0) {
        //            //    successVipol = false
        //            //    $("#PrService_S").text("Необходимо выбрать услугу").show();
        //            //    $("html, body").animate({ scrollTop: 50 }, "slow");
        //            //}
        //            if (successVipol == true) {

        //                RabotVipol(R_id)
        //            }
        //        })



        //        $("#backUo").click(function () {
        //            var successOtmen = true

        //            var objOt = { "Rid": R_id, 'login_id': $('#lgId').text() }
        //            if (successOtmen == true) {
        //                $('#myModal5').show();
        //                $('#reasonlbl').remove();
        //                $('#myModal5').children('.modal-content2').children('.modal-header2').append('<label id="reasonlbl" style="font-size: 20px;color: rgb(0,147,233);">Укажите причину отмены заявки</label>').css('color', 'black')
        //                $('#cmntsts2').text('');
        //                $('#f_iles2').attr('onchange', 'FileForOtmen(this)')
        //                $('#OkVipol').click(function () {
        //                    var imgs = []
        //                    $('#myModal5 .modal-body2').children('img').each(function () {
        //                        imgs.push({ "ImgAdres": $(this).attr('data-url') })
        //                    })
        //                    if (imgs.length != 0) {
        //                        SaveFileOtmen(R_id, imgs);
        //                        // SaveFileZakrito(R_id, imgs);
        //                    }
        //                    var textZakrit = $('#cmntsts2').val()
        //                    if (textZakrit.length != 0) {

        //                        SaveCommentOtmen(R_id, textZakrit);
        //                    }

        //                    $('#close_5').click();
        //                    MakeOtmen(objOt)
        //                })
        //                //$('#f_iles2').change(function () {
        //                //    // $("#loader").show();
        //                //    var filePath = $('#f_iles2').val();
        //                //    //<img id="imgdwnl2" style="width:71px"/>//
        //                //    var lastimage = $("#hstCom h4:last-child").text();
        //                //    $("#cmntsts2").after()
        //                //    var index = filePath.lastIndexOf("\\") + 1;
        //                //    var filename = filePath.substr(index);
        //                //    // filename = encodeURI();
        //                //    readU_RLZakrit(this, filename);
        //                //})
        //                $('#close_5').click(function () {
        //                    $('#myModal5 .modal-body2').children('.titleF,.fa,img,br').remove();
        //                    $('#myModal5').hide();
        //                    //$('#cmntsts2').text('Все работы по данной заявке выполнены')
        //                    $('#cmntsts2').val('');
        //                })
        //                $('#Close_Ot').click(function () {
        //                    $('#close_5').click();
        //                })

        //            }

        //        })

        //        function SaveFileOtmen(rid, img_s) {
        //            var obj = { "R": rid, "imgs": img_s }
        //            $.ajax({
        //                type: "POST",
        //                url: "CreateRequest.aspx/SaveHFile",
        //                data: JSON.stringify(obj),
        //                contentType: "application/json; charset=utf-8",
        //                dataType: "json",
        //                success: function (data) {

        //                }
        //            })
        //        }

        //        function SaveCommentOtmen(rid, rc) {
        //            var obj = { "rq": rid, "cmnt": rc }
        //            $.ajax({
        //                type: "POST",
        //                url: "CreateRequest.aspx/sntComment",
        //                data: JSON.stringify(obj),
        //                contentType: "application/json; charset=utf-8",
        //                dataType: "json",
        //                success: function (data) {

        //                }

        //            })
        //        }


        //    }

        //    $("#SendComent").click(function () {
        //        var imgD_url = $("#himgs > img").length;
        //        if ($("#RComment").val().length != 0 || imgD_url != 0) {
        //            sensComment(R_id, $("#RComment").val(), imgD_url)
        //            // alert("Ok")
        //        }
        //        else {
        //            $("#RComment_S").text("Введите, пожалуйста, комментарий или прикрепите файл").show()
        //        }

        //    })
        //    // GetSelectedServ(R_id)
        //    // $("#SaveDD").text("Редактировать Заявку")
        //    if (st == 4 || st == 5) {
        //        $("#hdPr").text("Прикрепленный файл")
        //        // $('#hstComh,#hstCom,#RComment').hide()
        //        $('#SaveDD').hide();
        //        $("#backUo").show().text('Назад');
        //        $('#backUo').click(function () { window.location.href = "RegisterRequest.aspx" });
        //        $('#opl').attr('disabled', 'disabled')
        //        // $("#shServ").hide();
        //        $('#Acnum').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
        //        if (st == 5) {
        //            $("#hedrZ").attr("Z_id", R_id);
        //            GetRSComment(R_id)
        //            // $("#lstcmnt").show();
        //            $("#lstcmnt").click(function () {
        //                var last = $("#hstCom h4:last-child").text();
        //                //alertMessage("", last, "");
        //                Commentst();

        //                //alert(last)
        //            })
        //        }
        //        else {
        //            $("#hedrZ").attr("Z_id", R_id);
        //        }


        //        $("#hComennt").hide();
        //        $("#RComment").hide();
        //        $('#objctZ,#Sets,#Otven').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
        //        $("#chkem,opl").attr('disabled', 'disabled')
        //        $("#Room").attr('disabled', 'disabled')
        //        $("#Ind").attr('disabled', 'disabled')
        //        $("#Phn").attr('disabled', 'disabled')
        //        $("#AddedTable").hide();
        //        // $("#PrServiceH").find('th:eq(2)').hide();
        //        $("#calen1").attr('disabled', 'disabled')
        //        $("#tm").attr('disabled', 'disabled')
        //        $("#IspolList").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
        //        $("#Room_Type").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
        //        $("#RText").attr('disabled', 'disabled');
        //        // $("#files").attr('disabled', 'disabled');
        //        $("#files").hide();
        //        $("#RComment,#SendComent,#hstComh,#hstCom,#hComennt").attr('disabled', 'disabled').show();;
        //        $("#SaveDD").hide();
        //        $("#objctZ").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)')

        //        //  $('#PrServiceH tr:eq(0) td:eq(4) .delBtn').attr('disabled', 'disabled');

        //    }
        //    if (st == 3) {
        //        $('#opl').attr('disabled', 'disabled');
        //        // $("#shServ").hide();
        //        $("#hdPr").text("Прикрепленный файл")
        //        GetRSComment(R_id)
        //        $('#objctZ,#Otven').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
        //        getEngTextDispForVerVrbt(LogId, "2");
        //        $("#hedrZ").attr("Z_id", R_id);
        //        $("#chkem").attr('disabled', 'disabled')
        //        $("#Room").attr('disabled', 'disabled')
        //        $("#Ind").attr('disabled', 'disabled')
        //        $("#Phn").attr('disabled', 'disabled')
        //        $("#cmntsts").css("max-height", "109px").css("max-width", "100%")
        //        $("#fileH_btn").show();
        //        $("#HImg").show();
        //        $("#AddedTable").hide();
        //        // $("#PrServiceH").find('th:eq(2)').hide();
        //        $("#calen1").attr('disabled', 'disabled')
        //        $("#tm").attr('disabled', 'disabled')
        //        $("#IspolList").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
        //        $("#Room_Type,#Sets").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
        //        $("#RText").attr('disabled', 'disabled');
        //        //$("#files").attr('disabled', 'disabled');
        //        $("#files").hide();
        //        $("#SaveDD").text("Закрыть Заявку")
        //        $("#backUo").text("Вернуть заявку в работу ")
        //        $("#lstcmnt").show();
        //        $("#SendComent").show();
        //        $('#hstComh,#hstCom').show();
        //        //$("#SendComent").click(function () {
        //        //    if ($("#RComment").val().length!=0) {
        //        //        sensComment(R_id, $("#RComment").val())
        //        //    }
        //        //    else {
        //        //        $("#RComment_S").text("Введите, пожалуйста, комментарий").show()
        //        //    }

        //        //})
        //        $("#vrntVrabot").click(function () {
        //            // var GService = ($('#subMenu').attr('data-d') == undefined) ? 0 : $('#subMenu').attr('data-d');
        //            // if (GService != 0) {
        //            var successVernuVrabot = true
        //            //    var P_Services = []
        //            //$("#PrServiceH tbody tr").each(function () {
        //            //    var quant = $(this).children('td:eq(1)').find('input').val();//$(this).next('td').find('input').val();
        //            //    //if (quant.length != 0 || quant == 0) {
        //            //    //    quant=1
        //            //    //}
        //            //    quant = (quant == "" || quant == null || quant == undefined) ? 0 : quant
        //            //    var Cost = $(this).children('td:eq(3)').children('a').text();//$(this).next('td').next('td').text();
        //            //    if (Cost == "Договорная") {
        //            //        $('#lblCost').remove();
        //            //        $("html, body").animate({ scrollTop: 550 }, "slow");
        //            //        $(this).children('td:eq(3)').children('a').after('<label style="color:red" id="lblCost">Необходимо указать стоимость</label>')
        //            //        window.setTimeout(function () {
        //            //            // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
        //            //            $('#lblCost').hide(1000);
        //            //            $('#lblCost').remove();
        //            //        }, 3000);
        //            //        successVernuVrabot = false;
        //            //    }
        //            //    var serviceId = $(this).children('td:eq(0)').attr('itemid');
        //            //    P_Services.push({ 'SERVICE_ID': serviceId, 'QUANTITY': quant, 'COST': Cost })

        //            //})
        //            //P_Services = JSON.stringify(P_Services)
        //            //P_Services = JSON.parse(P_Services)
        //            //var opl = $('#opl').prop('checked');
        //            //opl = "" + opl + ""

        //            var ispol_2 = ($("#ispol2 option:selected").val() == 0) ? $("#Ispolname").attr("itemid") : $("#ispol2 option:selected").val()
        //            var objOt = { "Rid": R_id, "Ispol": ispol_2, 'login_id': $('#lgId').text() }
        //            if (successVernuVrabot == true) {
        //                $.ajax({
        //                    type: "POST",
        //                    url: "CreateRequest.aspx/MakeVrabote",
        //                    data: JSON.stringify(objOt),
        //                    contentType: "application/json; charset=utf-8",
        //                    dataType: "json",
        //                    success: function (data) {
        //                        SaveLog("Вернуть заявку в работу", "Важное", "Техник", "Диспетчеризация", "К вам возвращена заявка <" + R_id + ">", LogId);
        //                        var comes = sessionStorage.getItem("All");
        //                        if (comes == "Notall") {
        //                            window.location.href = "RegisterRequest.aspx"
        //                        }
        //                        else {
        //                            window.location.href = "AllRequsts.aspx"
        //                        }
        //                    }
        //                })
        //            }
        //            //   }
        //            //else {
        //            //    $('#GServices_Err').remove();
        //            //    $('#Phn').after('<label style="color:red" id="GServices_Err">Необходимо выбрать группу услуг</label>')
        //            //    window.setTimeout(function () {
        //            //        $('#GServices_Err').remove();
        //            //    }, 3000)
        //            //    $("html, body").animate({ scrollTop: 500 }, "slow");
        //            //}
        //        })
        //        $("#lstcmnt").click(function () {
        //            var last = $("#hstCom h4:last-child").text();
        //            //alertMessage("", last, "");
        //            Commentst();

        //            //alert(last)
        //        })
        //        $("#SaveDD").click(function () {
        //            var successZakrit = true;
        //            //var P_Services = []
        //            //$("#PrServiceH tbody tr").each(function () {
        //            //    var quant = $(this).children('td:eq(1)').find('input').val();//$(this).next('td').find('input').val();
        //            //    //if (quant.length != 0 || quant == 0) {
        //            //    //    quant=1
        //            //    //}
        //            //    quant = (quant == "" || quant == null || quant == undefined) ? 0 : quant
        //            //    var Cost = $(this).children('td:eq(3)').children('a').text();//$(this).next('td').next('td').text();
        //            //    if (Cost == "Договорная") {
        //            //        $('#lblCost').remove();
        //            //        $("html, body").animate({ scrollTop: 550 }, "slow");
        //            //        $(this).children('td:eq(3)').children('a').after('<label style="color:red" id="lblCost">Необходимо показать стоимость</label>')
        //            //        window.setTimeout(function () {
        //            //            // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
        //            //            $('#lblCost').hide(1000);
        //            //            $('#lblCost').remove();
        //            //        }, 3000);
        //            //        successZakrit = false;
        //            //    }
        //            //    var serviceId = $(this).children('td:eq(0)').attr('itemid');
        //            //    P_Services.push({ 'SERVICE_ID': serviceId, 'QUANTITY': quant, 'COST': Cost })

        //            //})
        //            //if (P_Services.length == 0) {
        //            //    successZakrit = false;
        //            //    $("#PrService_S").text("Необходимо выбрать услугу").show();
        //            //    $("html, body").animate({ scrollTop: 50 }, "slow");
        //            //}
        //            var opl = $('#opl').prop('checked');
        //            opl = "" + opl + ""
        //            if (successZakrit == true) {
        //                var objV = { "Rid": R_id, "comment": $("#RComment").val(), 'login_id': $('#lgId').text() }
        //                // alert("Ok");
        //                // MakeZakrit(objV)
        //                $('#myModal5').show();
        //                $('#f_iles2').attr('onchange', 'fileForZakrit(this)');
        //                $('#lblreason').remove();
        //                $('#myModal5').children('.modal-content2').children('.modal-header2').append('<label id="lblreason" style="font-size: 20px;color: rgb(0,147,233);">Укажите причину закрыть заявки</label>').css('color', 'black')
        //                $('#cmntsts2').text('Все работы по данной заявке выполнены');
        //                $('#OkVipol').click(function () {
        //                    var imgs = []
        //                    $('#myModal5 .modal-body2').children('img').each(function () {
        //                        imgs.push({ "ImgAdres": $(this).attr('data-url') })
        //                    })
        //                    if (imgs.length != 0) {
        //                        SaveFileZakrito(R_id, imgs);
        //                    }
        //                    var textZakrit = $('#cmntsts2').val()
        //                    if (textZakrit.length != 0) {

        //                        SaveCommentZakrito(R_id, textZakrit);
        //                    }

        //                    //$('#close_5').click();
        //                    MakeZakrit(objV)
        //                })
        //                //$('#f_iles2').change(function () {
        //                //    // $("#loader").show();
        //                //    var filePath = $('#f_iles2').val();
        //                //    //<img id="imgdwnl2" style="width:71px"/>//
        //                //    var lastimage = $("#hstCom h4:last-child").text();
        //                //    $("#cmntsts2").after()
        //                //    var index = filePath.lastIndexOf("\\") + 1;
        //                //    var filename = filePath.substr(index);
        //                //    // filename = encodeURI();
        //                //    readU_RLZakrit(this, filename);
        //                //})


        //                $('#close_5').click(function () {
        //                    $('#cmntsts2').text('');
        //                    $('#myModal5 .modal-body2').children('.titleF,.fa,img,br').remove();
        //                    $('#myModal5').hide();
        //                    $('#f_iles2').removeAttr('onchange')
        //                    //$('#cmntsts2').text('Все работы по данной заявке выполнены')
        //                })
        //                $('#Close_Ot').click(function () {
        //                    $('#close_5').click();
        //                })
        //                // $('#Close_Ot').click(function () { $('#close_5').click() })
        //            }

        //        })
        //        function SaveFileZakrito(rid, img_s) {
        //            var obj = { "R": rid, "imgs": img_s }
        //            $.ajax({
        //                type: "POST",
        //                url: "CreateRequest.aspx/SaveHFile",
        //                data: JSON.stringify(obj),
        //                contentType: "application/json; charset=utf-8",
        //                dataType: "json",
        //                success: function (data) {

        //                }
        //            })
        //        }
        //        function SaveCommentZakrito(rid, rc) {
        //            var obj = { "rq": rid, "cmnt": rc }
        //            $.ajax({
        //                type: "POST",
        //                url: "CreateRequest.aspx/sntComment",
        //                data: JSON.stringify(obj),
        //                contentType: "application/json; charset=utf-8",
        //                dataType: "json",
        //                success: function (data) {

        //                }

        //            })
        //        }
        //        $("#backUo").click(function () {
        //            var successVernut = true
        //            //var P_Services = []
        //            //$("#PrServiceH tbody tr").each(function () {
        //            //    var quant = $(this).children('td:eq(1)').find('input').val();//$(this).next('td').find('input').val();
        //            //    //if (quant.length != 0 || quant == 0) {
        //            //    //    quant=1
        //            //    //}
        //            //    quant = (quant == "" || quant == null || quant == undefined) ? 0 : quant
        //            //    var Cost = $(this).children('td:eq(3)').children('a').text();//$(this).next('td').next('td').text();
        //            //    if (Cost == "Договорная") {
        //            //        $('#lblCost').remove();
        //            //        $("html, body").animate({ scrollTop: 550 }, "slow");
        //            //        $(this).children('td:eq(3)').children('a').after('<label style="color:red" id="lblCost">Необходимо указать стоимость</label>')
        //            //        window.setTimeout(function () {
        //            //            // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
        //            //            $('#lblCost').hide(1000);
        //            //            $('#lblCost').remove();
        //            //        }, 3000);
        //            //        successVernut = false;
        //            //    }
        //            //    var serviceId = $(this).children('td:eq(0)').attr('itemid');
        //            //    P_Services.push({ 'SERVICE_ID': serviceId, 'QUANTITY': quant, 'COST': Cost })

        //            //})
        //            //if (P_Services.length==0) {
        //            //    successVernut = false;
        //            //    $("#PrService_S").text("Необходимо выбрать услугу").show();
        //            //    $("html, body").animate({ scrollTop: 50 }, "slow");
        //            //}
        //            //var opl = $('#opl').prop('checked');
        //            //opl = "" + opl + ""
        //            if (successVernut == true) {
        //                //   var objVernut = { "Rid": R_id, 'prs': P_Services, 'opl': opl }
        //                vernutVrabot(R_id)
        //            }
        //        })
        //        $('#GServices').attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)')
        //        $('#shServ,#Acnum').attr('disabled', 'disable');


        //        //$('#PrServiceH tbody tr').each(function ()
        //        //{
        //        //    $(this).children('td:eq(1)').children('input').attr('disabled', 'disabled')
        //        //    $(this).children('td:eq(3)').children('a').removeAttr('onclick');
        //        //    $(this).children('td:eq(4)').children('button').attr('disabled','disabled')
        //        //})
        //        //$("#backUo").click(function () {
        //        //   
        //        //})
        //    }

        //}


    }
    function MakeOtmen(objOt) {
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/MakeOtmen",
            data: JSON.stringify(objOt),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                SaveLog("Отменить заявку", "Важное", "Диспетчер", "Диспетчеризация", "Заявка  < " + R_id + " > отменена", LogId);
                var comes = sessionStorage.getItem("All");
                if (comes == "Notall") {
                    window.location.href = "RegisterRequest.aspx"
                }
                else {
                    window.location.href = "AllRequsts.aspx"
                }
            }
        })
    }
    function MakeZakrit(obj) {
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/MakeZakrit",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                SaveLog("Закрыть заявку", "Простое", "Диспетчер", "Диспетчеризация", "Заявка < " + R_id + " > закрыта", LogId);
                var comes = sessionStorage.getItem("All");
                if (comes == "Notall") {
                    window.location.href = "RegisterRequest.aspx"
                }
                else {
                    window.location.href = "AllRequsts.aspx"
                }
            }
        })
    }
    function SaveRequest(obj) {
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/SaveRequest",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data)
                var jsondata = $.parseJSON(data.d);
                var jsonReq = jsondata.RequestId;
                $('.ui-loader-background,#loader').hide()
                SaveLog("Принять в работу", "Простое", "Диспетчер", "Диспетчеризация", "Заявка < " + jsondata.RequestId + " >принята в работу", LogId);
                var comes = sessionStorage.getItem("All");
                if (jsondata.result == "Ok") {

                    if (comes == "Notall") {
                        window.location.href = "RegisterRequest.aspx"
                    }
                    else {
                        window.location.href = "AllRequsts.aspx"
                    }
                }
                if (jsondata.result == "Halfok") {
                    alertMessage("!", "Заявка № " + jsondata.RequestId + " сохранена только в системе " + window.location.host + "  В мобильном приложении она будет недоступна.", ":(")

                    window.onclick = function (event) {

                        if (comes == "Notall") {
                            window.location.href = "RegisterRequest.aspx"
                        }
                        else {
                            window.location.href = "AllRequsts.aspx"
                        }

                    }
                }

            }

        })
    }
    function SaveRequestStatus(obj) {
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/SaveRequestStatus",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata = $.parseJSON(data.d);
                var jsonReq = jsondata.RequestId;

                SaveLog("Принять в работу", "Простое", "Диспетчер", "Диспетчеризация", "Заявка < " + jsondata.RequestId + " >принята в работу", LogId);
                var comes = sessionStorage.getItem("All");
                if (comes == "Notall") {
                    window.location.href = "RegisterRequest.aspx"
                }
                else {
                    window.location.href = "AllRequsts.aspx"
                }
            }

        })
    }
    function GetRSComment(rid) {
        var obj = { "rid": rid }
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/GetRStTF",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //
                var jsondata_ = JSON.parse(data.d)
                $("#cmntsts").text(" ").text(jsondata_[0].RS_TEXT);
                for (var i = 0; i < jsondata_.length; i++) {
                    // 
                    if (jsondata_[i].ImgAdres != 0) {
                        var F_ile = jsondata_[i].ImgAdres
                        var extention = F_ile.substr(F_ile.lastIndexOf(".") + 1)
                        if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
                            $("#modal-footer4").append('<a href="' + jsondata_[i].ImgAdres + '" download="' + jsondata_[i].ImgAdres + '" ><img   src="' + jsondata_[i].ImgAdres + '" style="width:71px"/></a>')
                        }
                        if (extention == "doc" || extention == "docx") {
                            $("#modal-footer4").append('<a href="' + jsondata_[i].ImgAdres + '" download="' + jsondata_[i].ImgAdres + '" ><img   src="' + window.location.protocol + '//' + window.location.host + '/img/word.png" style="width:71px"/></a>')
                        }
                        if (extention == "xls" || extention == "xlsx") {
                            $("#modal-footer4").append('<a href="' + jsondata_[i].ImgAdres + '" download="' + jsondata_[i].ImgAdres + '" ><img   src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png" style="width:71px"/></a>')
                        }
                        if (extention == "pdf" || extention == "PDF") {
                            $("#modal-footer4").append('<a href="' + jsondata_[i].ImgAdres + '" download="' + jsondata_[i].ImgAdres + '" ><img   src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png" style="width:71px"/></a>')
                        }
                        if (extention == "txt" || extention == "TXT") {
                            $("#modal-footer4").append('<a href="' + jsondata_[i].ImgAdres + '" download="' + jsondata_[i].ImgAdres + '" ><img   src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png" style="width:71px"/></a>')
                        }

                    }

                }
            }
        })
    }
    function Addimage2(strErrData) {
        var r_t = strErrData.responseText.substring(strErrData.responseText.indexOf('<'), 0);
        r_t = JSON.parse(r_t)
        $("#cmntsts2").after('<img  src=' + r_t.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' style="width:71px" />')
    }
    function getTime(h) {
        var dtToday = new Date();
        var hours = dtToday.getHours();
        var minut = dtToday.getMinutes();
        if (hours < 10) {
            hours = '0' + hours.toString();
        }
        if (minut < 10) {
            minut = '0' + minut.toString()
        }
        var time;
        if (h != "") {
            time = (parseInt(hours) + 1) + ":" + minut
            $("#tm").val(time);
        }
        if (h == "") {
            time = hours + ":" + minut
        }


        return time;
    }
    function getDate() {
        var dtToday = new Date();

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();

        if (month < 10)
            month = '0' + month.toString();
        if (day < 10)
            day = '0' + day.toString();

        var maxDate = year + '-' + month + '-' + day;
        // $('#calen').attr('max', maxDate);
        $('#calen1').attr('min', maxDate);
        $('#calen1').val(maxDate);
        // $("#calen").

        return maxDate;


    }
    function getcurrdspObj(lgId, slcted) {
        var obj = { "lg": lgId }
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/GetObjcurrentdsp",
            data: JSON.stringify(obj),
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                // console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {
                    //<label class="checkBx" style="">ул. Локомотивная, , Д. 16, </label>
                    //if (slcted == jsondata_[i].Object_Id) {
                    //onclick=selOb(this,' + jsondata_[i].Object_Id + ')
                    //$("#objctZ").append('<label class="checkBx"  style="background-color:#2b4b90;color:white">' + jsondata_[i].ObjectAdress + '</label>')
                    $("#objctZ").append('<option  value=' + jsondata_[i].Object_Id + '  >' + jsondata_[i].ObjectAdress + '</option>')
                    var objsId = []
                    objsId.push({ "Object_Id": jsondata_[i].ObjectAdress })
                    sessionStorage.setItem("slcObj", JSON.stringify(objsId))
                    // }
                    if (slcted != "") {//

                        // $("#objctZ").append('<label class="checkBx" onclick=selOb(this,' + jsondata_[i].Object_Id + ') style="">' + jsondata_[i].ObjectAdress + '</label>')
                        $("#objctZ").val(slcted)


                        // GetRelatedSets(selectedSetId, rc[0].Object_Id)
                    }



                }
                // GetGroupOfServices(1, slcted)



            }

        })
    }
    function GetRequesByR(R) {
        var obj = { "Rid": R }
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/GetRequestbyId",
            data: JSON.stringify(obj),
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                // console.log(jsondata_)
                $("#hedrZ").text('Заявка № ' + jsondata_[0].MOBILE_NUMBER + '   (Статус заявки "' + jsondata_[0].STATUS + '")')
                if (jsondata_[0].ACCOUNT_NAME != "~") {
                    for (var i = 0; i < jsondata_.length; i++) {

                        // console.log(jsondata_[i].ACCOUNT_NAME)
                        $("#chkem").prop("checked", jsondata_[i].EMERGENCY_TREATMENT)
                        $('#opl').prop("checked", jsondata_[i].PAYMENT)//.attr('disabled','disabled')
                        // $("#adr").val(jsondata_[i].ADRESS)
                        $("#Ind").val(jsondata_[i].im_FIRST_NAME)
                        $("#Phn").val(jsondata_[i].i_IND_PHONE_NUMBER)
                        if (jsondata_[i].ADRESS.length != 0) {
                            GetRelatedSets(jsondata_[i].SERVICE_GROUP_ID, jsondata_[i].ADRESS)
                        }
                        var jsonServices = JSON.parse(jsondata_[i].ROOM_COUNT)
                        //console.log(jsonServices)
                        var st = sessionStorage.getItem("st")
                        for (var j = 0; j < jsonServices.length; j++) {
                            var LEVEL = jsonServices[j].LEVEL;
                            var COST = jsonServices[j].COST
                            var SERVICE_SET_NAME = jsonServices[j].SERVICE_SET_NAME

                            if (LEVEL == 1) {
                                $('#PrServiceH').show()
                                $('#PrServiceH tbody').empty();
                                $('#PrServiceH thead tr th:eq(3)').show();
                                $('#PrServiceH thead tr th:eq(0)').text('Наименование Направления')
                                $('#PrServiceH thead tr').each(function () {
                                    $(this).children('th:eq(1),th:eq(2)').hide();

                                })

                                $('#PrServiceH').attr('data-s', jsonServices[j].P_SERVICE_ID)
                                var sid = jsondata_[i].SERVICE_GROUP_ID;
                                $('#PrServiceH').after('<select id="temprorySet"  style="display:none"><option value=' + sid + '>-<option></select>')
                                var ts = $('#temprorySet').val();
                                GetRelatedDirects(0, $('#temprorySet'), jsondata_[i].ADRESS, jsondata_[i].RESPONSIBLE_ID)

                                $('#temprorySet').remove();
                                $("#PrServiceH tbody tr:eq(0)").remove();
                                $('#PrServiceH tbody').append('<tr><td data-s=' + jsonServices[j].P_SERVICE_ID + '>' + SERVICE_SET_NAME + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">' + COST + '</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
                                if (COST != "Договорная") {
                                    $('#total').remove();
                                    $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + COST + '  руб</label>')

                                }
                            }

                            if (LEVEL == 2) {
                                $('#PrServiceH tbody').empty();

                                $('#PrServiceH thead tr th:eq(0)').text('Наименование группа услуг')
                                $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').hide()

                                $('#PrServiceH tbody tr').each(function () {
                                    $(this).children('td:eq(1),td:eq(2)').hide();
                                })
                                var sid = jsondata_[i].SERVICE_GROUP_ID;
                                $('#PrServiceH').after('<select id="temprorySet"  style="display:none"><option value=' + sid + '>-<option></select>')
                                var ts = $('#temprorySet').val();
                                GetRelatedDirects(jsonServices[j].P_SERVICE_ID, $('#temprorySet'), jsondata_[i].ADRESS, jsondata_[i].RESPONSIBLE_ID)
                                $('#temprorySet').remove();
                                $("#PrServiceH tbody tr:eq(0)").remove();
                                $('#PrServiceH tbody').append('<tr><td data-d=' + jsonServices[j].P_SERVICE_ID + '>' + jsonServices[j].DIRECTION_NAME + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">' + COST + '</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-d=' + jsonServices[j].P_SERVICE_ID + ' onclick="RemoveDirectRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

                                if (COST != "Договорная") {
                                    $('#total').remove();
                                    $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + COST + '  руб</label>')

                                }
                                $('#PrServiceH').show().attr('data-d', jsonServices[j].P_SERVICE_ID);
                                $('#PrServiceH').removeAttr('data-s');
                            }

                            if (LEVEL == 3) {
                                //$('#PrServiceH tbody').empty();
                                if (j == 0) {
                                    var sid = jsondata_[i].SERVICE_GROUP_ID;
                                    $('#PrServiceH').after('<select id="temprorySet"  style="display:none"><option value=' + sid + '>-<option></select>')
                                    var ts = $('#temprorySet').val();
                                    GetRelatedDirects(jsonServices[i].DIRECTION_ID, $('#temprorySet'), jsondata_[i].ADRESS, jsondata_[i].RESPONSIBLE_ID)
                                    $('#temprorySet').remove();
                                    $("#PrServiceH tbody tr:eq(0)").remove();
                                }

                                $('#PrServiceH').show();
                                $('#PrServiceH thead th').show();
                                $('#PrServiceH thead tr th:eq(0)').text('Наименование услуги')
                                $("#PrServiceH tbody").append('<tr ><td itemid="' + jsonServices[j].P_SERVICE_ID + '"> ' + jsonServices[j].SERVICE_NAME + '</td><td><input type="text"  onkeyup=multiPlaying(this,"' + COST + '")  onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" value="1"></td><td>' + jsonServices[j].UNIT_OF_MEASURE_NAME + '</td><td  style="width:120px;text-align:center;">' + COST + '</td><td><a itemid="' + jsonServices[j].P_SERVICE_ID + '" data="' + jsonServices[j].SERVICE_NAME + '" onclick="RemoveRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</a></td></tr>')
                                if (j == jsonServices.length - 1) {
                                    var totalCost = 0
                                    $('#total').remove();
                                    $("#PrServiceH tbody tr").each(function () {
                                        var cost = (isNaN($(this).children('td:eq(3)').text())) ? "0.00" : $(this).children('td:eq(3)').text();
                                        totalCost = parseFloat(totalCost) + parseFloat(cost)
                                        totalCost = (isNaN(totalCost)) ? "0.00" : totalCost
                                    })
                                    $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + totalCost + '  руб</label>')
                                }

                            }

                            if (st == "1" || st == "3" || st == "4" || st == "5") {
                                $('#PrServiceH tbody tr td').each(function () {

                                    $(this).children('a').attr('disabled', 'disabled').removeAttr('onclick');
                                    $(this).children('input[type="text"]').attr('disabled', 'disabled');
                                })
                                $('.accMenu').removeAttr('onclick')//.children('input[type="checkbox"]').hide()

                                //$('#Sets').next('.col-md-12').children('div').each(function ()
                                //{
                                //    $(this).children('div').each(function ()
                                //    {
                                //        $(this).removeAttr('onclick')
                                //        $(this).children('input[type="checkbox"]').hide();
                                //    })
                                //})
                            }


                        }
                        gtTypeOfroom2(jsondata_[i].ROOM_T);
                        var date_ = jsondata_[i].PLAN_END_DATE
                        date_ = date_.substr(0, 10);
                        var year = date_.substr(6, 10);

                        var month = date_.substr(3, 2)
                        var day = date_.substr(0, 2)
                        if (jsondata_[i].INDIVIDUAL_ID == 0) {

                            //gtCommenst(R)//fuck
                            gtCommenst(jsondata_[i].SERVICE_GROUP_ID, R)

                            $("#RComment").val("")//mustdo
                            //console.log(rc[0].room)

                        }
                        else {
                            $('#Ind').val(jsondata_[i].FIRST_NAME)

                            getHasInds(jsondata_[i].INDIVIDUAL_ID)
                            getcurrdspObj(LogId, jsondata_[i].ADRESS)
                            //$("#hstComh").show();
                            //$("#hstCom").append('<h4> -- ' + jsondata_[i].REQUEST_COMMENT + '</h4>').show();
                            gtCommenst("", R)
                            $("#RComment").val("")
                            $('#Acnum').val(jsondata_[i].SERVICE_NAME);
                            $('#Phn').val(jsondata_[i].TOTAL_COST);
                        }

                        date_ = year + "-" + month + "-" + day
                        //$("#Room").val(jsondata_[i].ROOM_COUNT)
                        $("#calen1").val(date_)
                        $("#tm").val(jsondata_[i].PLAN_END_TIME)
                        // $("#Otven").val(jsondata_[i].ACCOUNT_NAME);
                        $("#Otven").attr("itemid", jsondata_[i].LOG_IN_ID)
                        $("#RText").val(jsondata_[i].REQUEST_TEXT)
                        // $("#RComment").val(jsondata_[i].REQUEST_COMMENT)
                        //$("#fotoDisp").attr("src", jsondata_[i].COMMENT_FILE)
                        $("#ItCost").val(jsondata_[i].TOTAL_COST);
                        if (jsondata_[i].DELIVERY_TYPE_ID != 0) {
                            $("#dost").prop("checked", true)
                            $("#TDost").removeAttr("disabled")
                            // getDelivery(jsondata_[i].DELIVERY_TYPE_ID)
                            // var stdost = $("#StDost").val()
                            // $("#ItCost").val(parseInt(jsondata_[i].TOTAL_COST) - parseInt(stdost))
                        }
                        // $("#IspolList").append('<option value="' + jsondata_[i].SPECIALIS_ID + '">' + jsondata_[i].ATRIBUTE + ' </option>')
                        // getListSpecialist(jsondata_[i].SPECIALIS_ID);
                        GetAccFortexnik(LogId, jsondata_[i].SPECIALIST_ID)

                        //GetGroupOfServices(jsondata_[0].SERVICE_GROUP_ID, jsondata_[0].ADRESS)

                    }
                }
                else {
                    var lg = sessionStorage.getItem("Log");
                    for (var i = 0; i < jsondata_.length; i++) {
                        $("#chkem").prop("checked", jsondata_[i].EMERGENCY_TREATMENT)
                        $('#opl').prop("checked", jsondata_[i].PAYMENT)
                        var st = sessionStorage.getItem("st")
                        //if (st != 4 || st!=5) {
                        // $('#hstComh,#hstCom,#RComment').show()
                        //}
                        if (jsondata_[i].REQUEST_TEXT.indexOf('|') == -1) {
                            $('#RText').text(jsondata_[i].REQUEST_TEXT)
                        }
                        else {
                            var rtext = jsondata_[i].REQUEST_TEXT.split('|');
                            rtext = rtext[0] + "\n" + rtext[1].replace('-', ':').replace('-', ':')
                            $('#RText').text(rtext)
                        }
                        getcurrdspObj(lg, jsondata_[i].OBJECT_ID);
                        //GetGroupOfServices(jsondata_[i].SERVICE_GROUP_ID, jsondata_[i].OBJECT_ID)
                        if (jsondata_[i].ROOM_T.length != 0) {
                            gtTypeOfroom2(jsondata_[i].ROOM_T);
                        }
                        else {
                            $('#Room_Type').children('option').remove();
                        }
                        $("#Room").val(jsondata_[i].ROOM_NUMBER)
                        $("#Acnum").val(jsondata_[i].NUMBER);
                        $("#Ind").val(jsondata_[i].FIRST_NAME)
                        $("#Phn").val(jsondata_[i].PHONE);
                        var jsonServices = JSON.parse(jsondata_[i].TOTAL_COST)
                        //console.log(jsonServices)
                        var st = sessionStorage.getItem("st")
                        var resp = jsondata_[i].RESPONSIBLE_ID
                        if (resp.length == 0) {
                            resp = "yes"
                        }
                        for (var j = 0; j < jsonServices.length; j++) {
                            var LEVEL = jsonServices[j].LEVEL;
                            var COST = jsonServices[j].COST
                            var SERVICE_SET_NAME = jsonServices[j].SERVICE_SET_NAME

                            if (LEVEL == 1) {
                                $('#PrServiceH').show()
                                $('#PrServiceH tbody').empty();
                                $('#PrServiceH thead tr th:eq(3)').show();
                                $('#PrServiceH thead tr th:eq(0)').text('Наименование Направления')
                                $('#PrServiceH thead tr').each(function () {
                                    $(this).children('th:eq(1),th:eq(2)').hide();

                                })

                                $('#PrServiceH').attr('data-s', jsonServices[j].P_SERVICE_ID)
                                var sid = (jsondata_[i].SERVICE_GROUP_ID == 0) ? jsonServices[j].P_SERVICE_ID : jsondata_[i].SERVICE_GROUP_ID
                                GetRelatedSets(jsonServices[i].P_SERVICE_ID, jsondata_[i].OBJECT_ID, resp)
                                $('#PrServiceH').after('<select id="temprorySet"  style="display:none"><option value=' + sid + '>kuqqi<option></select>')
                                var ts = $('#temprorySet').val();
                                GetRelatedDirects(0, $('#temprorySet'), jsondata_[i].OBJECT_ID, resp)

                                $('#temprorySet').remove();
                                $("#PrServiceH tbody tr:eq(0)").remove();
                                $('#PrServiceH tbody').append('<tr><td data-s=' + jsonServices[j].P_SERVICE_ID + '>' + SERVICE_SET_NAME + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">' + COST + '</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
                                if (COST != "Договорная") {

                                    $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + COST + '  руб</label>')

                                }
                            }

                            if (LEVEL == 2) {
                                $('#PrServiceH tbody').empty();

                                $('#PrServiceH thead tr th:eq(0)').text('Наименование группа услуг')
                                $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').hide()

                                $('#PrServiceH tbody tr').each(function () {
                                    $(this).children('td:eq(1),td:eq(2)').hide();
                                })
                                var sid = jsondata_[i].SERVICE_GROUP_ID;
                                $('#PrServiceH').after('<select id="temprorySet"  style="display:none"><option value=' + jsonServices[j].SS_ID + '>kuqqi<option></select>')
                                var ts = $('#temprorySet').val();
                                GetRelatedSets(jsonServices[j].SS_ID, jsondata_[i].OBJECT_ID, resp)
                                GetRelatedDirects(jsondata_[i].SERVICE_GROUP_ID, $('#temprorySet'), jsondata_[i].OBJECT_ID, resp)
                                $('#temprorySet').remove();
                                $("#PrServiceH tbody tr:eq(0)").remove();
                                $('#PrServiceH tbody').append('<tr><td data-d=' + jsonServices[j].P_SERVICE_ID + '>' + jsonServices[j].DIRECTION_NAME + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">' + COST + '</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-d=' + jsonServices[j].P_SERVICE_ID + ' onclick="RemoveDirectRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

                                if (COST != "Договорная") {

                                    $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + COST + '  руб</label>')

                                }
                                $('#PrServiceH').show().attr('data-d', jsonServices[j].P_SERVICE_ID);
                                $('#PrServiceH').removeAttr('data-s');
                            }

                            if (LEVEL == 3) {
                                //$('#PrServiceH tbody').empty();
                                if (j == 0) {
                                    var sid = jsondata_[i].SERVICE_GROUP_ID;
                                    $('#PrServiceH').after('<select id="temprorySet"  style="display:none"><option value=' + sid + '>kuqqi<option></select>')
                                    var ts = $('#temprorySet').val();
                                    GetRelatedDirects(sid, $('#temprorySet'), jsondata_[i].OBJECT_ID, resp)
                                    $('#temprorySet').remove();
                                    $("#PrServiceH tbody tr:eq(0)").remove();
                                }

                                $('#PrServiceH').show();
                                $('#PrServiceH thead th').show();
                                $('#PrServiceH thead tr th:eq(0)').text('Наименование услуги')
                                $("#PrServiceH tbody").append('<tr ><td itemid="' + jsonServices[j].P_SERVICE_ID + '"> ' + jsonServices[j].SERVICE_NAME + '</td><td><input type="text"  onkeyup=multiPlaying(this,"' + COST + '")  onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" value="1"></td><td>' + jsonServices[j].UNIT_OF_MEASURE_NAME + '</td><td  style="width:120px;text-align:center;">' + COST + '</td><td><a itemid="' + jsonServices[j].P_SERVICE_ID + '" data="' + jsonServices[j].SERVICE_NAME + '" onclick="RemoveRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</a></td></tr>')
                                if (j == jsonServices.length - 1) {
                                    $('#total').remove();
                                    var totalCost = 0
                                    $("#PrServiceH tbody tr").each(function () {
                                        var cost = (isNaN($(this).children('td:eq(3)').text())) ? "0.00" : $(this).children('td:eq(3)').text();
                                        totalCost = parseFloat(totalCost) + parseFloat(cost)
                                        totalCost = (isNaN(totalCost)) ? "0.00" : totalCost
                                    })
                                    $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + totalCost + '  руб</label>')

                                }

                            }

                            if (st == "1" || st == "3" || st == "4" || st == "5") {
                                $('#PrServiceH tbody tr td').each(function () {

                                    $(this).children('a').attr('disabled', 'disabled').removeAttr('onclick');
                                    $(this).children('input[type="text"]').attr('disabled', 'disabled');
                                })
                                $('.accMenu').removeAttr('onclick')//.children('input[type="checkbox"]').hide()

                                //$('#Sets').next('.col-md-12').children('div').each(function ()
                                //{
                                //    $(this).children('div').each(function ()
                                //    {
                                //        $(this).removeAttr('onclick')
                                //        $(this).children('input[type="checkbox"]').hide();
                                //    })
                                //})
                            }


                        }
                        $('#IspolList').empty();
                        $("#IspolList").append('<option value=0>Выберите исполнителя</option>')
                        //GetAccFortexnik(lg, "")
                        if (jsondata_[i].PLAN_END_DATE.length != 0) {
                            var date_ = jsondata_[i].PLAN_END_DATE
                            date_ = date_.substr(0, 10);
                            var year = date_.substr(6, 10);

                            var month = date_.substr(3, 2)
                            var day = date_.substr(0, 2)
                            date_ = year + "-" + month + "-" + day
                            $("#calen1").val(date_)
                            if (jsondata_[i].PLAN_END_TIME.length != 0) {
                                $("#tm").val(jsondata_[i].PLAN_END_TIME)
                            }
                        }
                        else {
                            getDate();
                            getTime();
                        }

                        getCurrentDisp(lg)
                        gtCommenst("", R)
                        GetAccFortexnik(LogId, jsondata_[i].SPECIALIST_ID)
                        //GetAccFortexnik(LogId, jsondata_[i].SPECIALIS_ID)
                    }
                }
                //  $('#Otven').empty();
                //  getResponsibels_(jsondata_[0].RESPONSIBLE_ID);
                //  GetSelectedServ(R, jsondata_[0].SERVICE_GROUP_ID)
                //  var objectid = jsondata_[0].OBJECT_ID
                // GetGroupOfServices(jsondata_[0].SERVICE_GROUP_ID, objectid )
                $("#lblIspo").hide();
                $("#emIspo").hide();
                $("#IspolFio").hide();
            }

        })
    }
    function gtCommenst(selectedSetId, Rid_) {
        var objC = { "rid": Rid_ }
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/GetCommentsById",
            data: JSON.stringify(objC),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d);
                for (var i = 0; i < jsondata_.length; i++) {
                    if (jsondata_[i].REQUEST_COMMENT_.indexOf('|') > 0 || jsondata_[i].REQUEST_COMMENT_.indexOf('|') == 0) {
                        var rc = jsondata_[i].REQUEST_COMMENT_.substring(jsondata_[i].REQUEST_COMMENT_.indexOf('|') + 1, jsondata_[i].REQUEST_COMMENT_.length)
                        rc = JSON.parse(rc);
                        //console.log(jsondata_)
                        $("#Room").val(rc[0].room)//indName
                        $("#Ind").val(rc[0].indName)
                        $("#Phn").val(rc[0].phon)
                        $('#Acnum').val(rc[0].score)//, "score": 

                        if (selectedSetId != "") {
                            GetRelatedSets(selectedSetId, rc[0].Object_Id)

                        }
                        getcurrdspObj(LogId, rc[0].Object_Id)

                        $("#hstComh").show();

                        var date_ = jsondata_[i].COMMENT_DATETIME
                        var comment = jsondata_[i].REQUEST_COMMENT_.substring(0, jsondata_[i].REQUEST_COMMENT_.indexOf('|'));
                        if (comment != " " && comment != "") {
                            $("#hstCom").append('<h4 style="margin-bottom:  -6px;">- ' + comment + '</h4> (' + date_ + ')').show();
                        }

                        $("#hstCom").show().css("height", "190px");

                    }
                    else {
                        if (jsondata_[i].H_COMMNET_FILE != "") {
                            var F_Url = jsondata_[i].H_COMMNET_FILE
                            var extention = F_Url.substr(F_Url.lastIndexOf(".") + 1)
                            if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
                                //="" ifrPopup("", F_Url)   
                                $("#hstCom").append('<br/><a href="' + F_Url + '" download ><img data-url="' + F_Url + '"  src="' + F_Url + '" style="width:71px" /></a>')
                                $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (" + jsondata_[i].COMMENT_DATETIME + ")  </h5> ")
                            }
                            if (extention == "docx" || extention == "doc") {//   onclick=ifrPopup(this)
                                $("#hstCom").append('<br/><a href="' + F_Url + '" download="" ><img data-url="' + F_Url + '" src="' + window.location.protocol + '//' + window.location.host + '/img/word.png"style="width:71px" /></a>')
                                $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (" + jsondata_[i].COMMENT_DATETIME + ")  </h5> ")

                            }
                            if (extention == "xlsx" || extention == "xls") {//   onclick=ifrPopup(this)
                                $("#hstCom").append('<br/><a ><img data-url="' + F_Url + '" src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png" style="width:71px" /></a>')
                                $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- ( " + jsondata_[i].COMMENT_DATETIME + ")  </h5> ")

                            }
                            if (extention == "pdf" || extention == "PDF") {//href="' + F_Url + '" download=""
                                $("#hstCom").append('<br><a href="' + F_Url + '" download="" > <img data-url="' + F_Url + '" src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png"style="width:71px" /></a>')
                                $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (" + jsondata_[i].COMMENT_DATETIME + ")  </h5> ")

                            }
                            if (extention == "txt" || extention == "TXT") {//href="' + F_Url + '" download=""
                                $("#hstCom").append('<br/><a href="' + F_Url + '" download="" ><img data-url="' + F_Url + '" src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png" style="width:71px" /></a>')
                                $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- ( " + jsondata_[i].COMMENT_DATETIME + ")  </h5> ")

                            }
                        }
                        $("#hstComh").show();

                        if (jsondata_[i].REQUEST_COMMENT_ != " " && jsondata_[i].REQUEST_COMMENT_ != "") {
                            var date_ = jsondata_[i].COMMENT_DATETIME
                            $("#hstCom").append('<h4 style="margin-bottom:  -6px;">- ' + jsondata_[i].REQUEST_COMMENT_ + '<h4/> (' + date_ + ')').show();
                        }
                        $("#hstCom").show().css("height", "130px");
                        $("#imgLink").attr("href", jsondata_[i].COMMENT_FILE)
                        $("#imgdwnl").attr("src", jsondata_[i].COMMENT_FILE)
                    }
                }


            }
        })
        getCommentFiles(Rid_);
    }

    function getCommentFiles(r) {
        var objC = { "R": r }
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/CommentFiles",
            data: JSON.stringify(objC),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d);
                for (var i = 0; i < jsondata_.length; i++) {
                    if (jsondata_[i].COMMENT_FILE != null && jsondata_[i].COMMENT_FILE != "" && jsondata_[i].COMMENT_FILE != " ") {
                        $("#imgss").append('<div class="col-xs-2" id="zImg"><img class="foto-disp" id="fotoDisp' + i + '"  data-url="0"  src="../Files/upl.png"></div>')
                        var F_ile = jsondata_[i].COMMENT_FILE
                        var extention = F_ile.substr(F_ile.lastIndexOf(".") + 1)
                        if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != 'txt' && extention != 'TXT') {

                            $("#fotoDisp" + i + "").parent().append('<a href="' + jsondata_[i].COMMENT_FILE + '" download><img class="foto-disp" data-url="' + jsondata_[i].COMMENT_FILE + '" id="fotoDisp1' + i + '" src="' + jsondata_[i].COMMENT_FILE + '"></a>').show()
                            $("#fotoDisp" + i + "").remove();
                        }
                        if (extention == "docx" || extention == "doc") {

                            $("#fotoDisp" + i + "").parent().append('<a href="' + jsondata_[i].COMMENT_FILE + '" download><img class="foto-disp" data-url="' + jsondata_[i].COMMENT_FILE + '" id="fotoDisp1' + i + '" src="' + window.location.protocol + '//' + window.location.host + '/img/word.png"></a>').show()
                            $("#fotoDisp" + i + "").remove();
                        }
                        if (extention == "xlsx" || extention == "xls") {

                            $("#fotoDisp" + i + "").parent().append('<a href="' + jsondata_[i].COMMENT_FILE + '" download><img class="foto-disp" data-url="' + jsondata_[i].COMMENT_FILE + '" id="fotoDisp1' + i + '" src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png"></a>').show()
                            $("#fotoDisp" + i + "").remove();
                        }
                        if (extention == "pdf" || extention == "PDF") {

                            $("#fotoDisp" + i + "").parent().append('<a href="' + jsondata_[i].COMMENT_FILE + '" download><img class="foto-disp" data-url="' + jsondata_[i].COMMENT_FILE + '" id="fotoDisp1' + i + '" src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png"></a>').show()
                            $("#fotoDisp" + i + "").remove();
                        }
                        if (extention == "txt" || extention == "TXT") {
                            $("#fotoDisp" + i + "").parent().append('<a href="' + jsondata_[i].COMMENT_FILE + '" download><img class="foto-disp" data-url="' + jsondata_[i].COMMENT_FILE + '" id="fotoDisp1' + i + '" src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png"></a>').show()
                            $("#fotoDisp" + i + "").remove();
                        }


                    }
                    else {
                        $("#fotoDisp" + i + "").hide();
                    }
                    //if (jsondata_[i].COMMENT_FILE == null || jsondata_[i].COMMENT_FILE == "" || jsondata_[i].COMMENT_FILE != " ") {
                    //    $("#fotoDisp" + i + "").hide();
                    //}
                    $("#files,#files2,#files3,#files4").nextAll('br').remove();
                }
                if (jsondata_.length == 0) {
                    $("#fotoDisp0").hide();
                    $("#hdPr").hide();
                }
            }
        })
    }
    function getHasInds(ind_) {
        var obj = { "indId": ind_ }
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/gethasInd",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata = JSON.parse(data.d);
                if (jsondata.length != 0) {
                    //$("#Ind").val(jsondata[0].FIRST_NAME).attr("itemid", jsondata[0].INDIVIDUAL_ID)
                    // $("#Phn").val(jsondata[0].PHONE)
                    $("#Room").val(jsondata[0].ROOM_NUMBER)
                    // $("#Room_Type").val(jsondata[0].ROOM_TYPE_ID)
                    //getcurrdspObj(LogId, jsondata[0].OBJECT_ID);
                }


            }
        })
    }
    function getIndDatas(sObj, rm, r_t) {
        var obj = { "rm": rm, "obj": sObj, "RoomT": r_t }
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/getInddata",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata = JSON.parse(data.d);
                $("#AcnumList").empty();
                if (jsondata.length != 0) {
                    $("#numList").empty()
                    //$("#Ind").val(jsondata[0].FIRST_NAME).attr("itemid", jsondata[0].INDIVIDUAL_ID)
                    //$("#Phn").val(jsondata[0].PHONE)//
                    //$("#Room_Type").val(jsondata[0].ROOM_TYPE_ID)
                    if (jsondata.length != 1) {
                        for (var i = 0; i < jsondata.length; i++) {
                            $("#AcnumList").append('<label style="color: black;position:  relative;left: 1%;" onclick=selectAcc(this)>' + jsondata[i].NUMBER + ' </label>').show();
                        }
                        $("#AcnumList").show('1000')

                    }
                    else {
                        $("#Acnum").val(jsondata[0].NUMBER)
                        $("#AcnumList").hide();
                        getHasInds2(jsondata[0].NUMBER)
                    }

                }


            }
        })

    }

    function GetSelectedServ(R, d) {
        $("#PrService2").show();
        $("#PrService").show();
        $("#PrServiceH").show();
        var obj = { "R_id": R }
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/GetPServiceByid",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                $('#PrServiceH').show()
                var totalcost = 0
                for (var i = 0; i < jsondata_.length; i++) {
                    var dtUrl = jsondata_[i].QUANTITY_IS;//quantiti or not
                    var dataName = jsondata_[i].SERVICE_NAME;//servicetypeName_and Servis name
                    var itemId = jsondata_[i].SERVICE_ID;//ServiceId
                    var cost = jsondata_[i].COST
                    var edizm = jsondata_[i].SERVICE_TYPE_NAME;
                    if (dtUrl == 1) {
                        //onkeyup="multiPlaying(this,500)" <td><input type="text" onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" value="1"></td>
                        $("#PrServiceH tbody").append('<tr data-d=' + d + '><td itemid="' + itemId + '"> ' + dataName + '</td><td><input type="text" onkeyup=multiPlaying(this,"' + cost + '")  onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" value="' + jsondata_[i].QUANTITY + '"></td><td>' + edizm + '</td><td  style="width:120px;text-align:center;"><a>' + cost + '</a></td><td><a itemid="' + itemId + '" data="' + dataName + '" onclick="RemoveRow(this)" data-url="' + dtUrl + '" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</a></td></tr>')
                    }
                    if (dtUrl == 0) {
                        /*<tr><td style="width: 500px;" itemid="11">Доступ - Одноразовый пропуск</td><td><input disabled="disabled" type="text" value=""></td><td><button onclick="RemoveRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</button></td></tr>*/
                        //<td  ><input disabled="disabled" type="text" value=""></td>
                        $("#PrServiceH tbody").append('*<tr><td   itemid="' + itemId + '"> ' + dataName + '</td><td><input disabled="disabled" type="text" value=""></td><td>' + edizm + '</td><td style="width:120px;text-align:center;"><a onclick=Open_Pop(this) >' + cost + '</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-url="' + dtUrl + '" onclick="RemoveRow(this)" itemid="' + itemId + '" data="' + dataName + '"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</a></td></tr>')

                    }
                    totalcost = totalcost + parseFloat(cost);

                }
                $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + totalcost + ' руб</label>')
                if (totalcost == 0) {
                    $('#total').hide();
                }
                else {
                    $('#total').show();
                }
                //if (jsondata_.length == 0) {
                //    $('#PrServiceH').hide();
                //}
                //$('#shServ').attr('disabled', 'disabled');
                var s_t = sessionStorage.getItem('st');
                if (s_t == 4 || s_t == 5 || s_t == 3) {

                    //$('#PrServiceH tbody tr:eq(0) td:eq(4) .delBtn').attr('disabled', 'disabled');
                    //$('#PrServiceH tbody tr:eq(0) td:eq(3) a').removeAttr('onclick');
                    $('#PrServiceH tbody tr').each(function () {
                        $(this).children('td:eq(1)').children('input').attr('disabled', 'disabled')
                        $(this).children('td:eq(3)').children('a').removeAttr('onclick');
                        $(this).children('td:eq(4)').children('button').attr('disabled', 'disabled')
                    })

                }
            }


        })
    }

    function gettDatasByAccNumber(nmbr) {
        var obj = { "nmbr": nmbr }
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/GetDatasByAccNum",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                if (jsondata_.length == 1) {
                    //$('#IndList').empty().hide();
                    //$("#objctZ").val(jsondata_[0].OBJECT_ID);
                    //$("#Room_Type").val(jsondata_[0].ROOM_TYPE_ID);
                    //$("#Room").val(jsondata_[0].ROOM_NUMBER);
                    //$("#Ind").val(jsondata_[0].FIRST_NAME).attr('itemid', jsondata_[0].INDIVIDUAL_ID);;
                    //$("#Phn").val(jsondata_[0].PHONE);
                }
                else {
                    if (jsondata_.length > 1) {
                        $('#IndList').empty();
                        $("#objctZ").val(jsondata_[0].OBJECT_ID);
                        $("#Room_Type").val(jsondata_[0].ROOM_TYPE_ID);
                        $("#Room").val(jsondata_[0].ROOM_NUMBER);
                        for (var i = 0; i < jsondata_.length; i++) {
                            $("#IndList").append('<label data-number="' + jsondata_[i].PHONE + '" itemid="' + jsondata_[i].INDIVIDUAL_ID + '" style="color: black;position:  relative;left: 1%;" onclick="selectInd(this)">' + jsondata_[i].FIRST_NAME + ' </label>').show();
                        }
                    }
                }
            }
        })
    }

    function getRequestTable(lg) {
        var obj = { "LogId": lg }
        $.ajax({
            type: "POST",
            url: "RegisterRequest.aspx/GetRequestTable",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                // console.log(data)
                var jsondata_ = JSON.parse(data.d)
                // console.log(jsondata_)
                //for (var i = 0; i < jsondata_.length; i++) {//<td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")   href='CreateRequest.aspx'>" + jsondata_[i].ROOM_TYPE + "</a></td>
                //    var tic = (jsondata_[i].REQUEST_COMMENT == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                //    var emergency = (jsondata_[i].EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                //    $("#header_").after("<tr><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].REQUEST_ID + "</a></td><td><a " + emergency +" onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].FIRST_NAME
                //        + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") class='adr" + i + "' href='CreateRequest.aspx'></a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].CR_DATE.substring(0, jsondata_[i].CR_DATE.indexOf(' ')) + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")href='CreateRequest.aspx' title='" + jsondata_[i].REQUEST_TEXT + "'>" + jsondata_[i].REQUEST_TEXT + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") class='isp" + i + "' href='CreateRequest.aspx'></a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].PLAN_END_DATE.substring(0, jsondata_[i].PLAN_END_DATE.indexOf(' ')) + "</a></td><td><a " + emergency +" href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") >" + jsondata_[i].STATUS
                //        + "</a></td><td>" + tic + "</td></tr >")


                $('#RequestTables').DataTable({
                    orderCellsTop: true,
                    "destroy": true,
                    data: jsondata_,

                    columns: [{
                        'data': 'MOBILE_NUMBER',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')"' + emergency + '  >' + oData.MOBILE_NUMBER + '</a>');
                        },
                        'fnCreatedRow': function (nRow, aData, iDataIndex) {
                            //$(nRow).attr('onclick', 'SendId(' + aData.REQUEST_ID + ',' + aData.STATUS_ID+')');
                            $('#RequestTables tbody tr:eq(' + iDataIndex + ')').attr('onclick', 'SendId(' + aData.REQUEST_ID + ',' + aData.STATUS_ID + ')');
                        },
                    },
                    {
                        'data': 'FIRST_NAME',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.FIRST_NAME + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'ADRESS',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.ADRESS + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'CR_DATE',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.CR_DATE.substring(0, oData.CR_DATE.indexOf(' ')) + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'REQUEST_TEXT',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.REQUEST_TEXT + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'ACCOUNT_NAME',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.ACCOUNT_NAME + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'PLAN_END_DATE',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.PLAN_END_DATE.substring(0, oData.PLAN_END_DATE.indexOf(' ')) + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },
                    {
                        'data': 'STATUS',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.STATUS + '</a>');
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    {
                        'data': 'PLAN_END_DATE',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            //var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                            //$(nTd).html('<a href="#" ' + emergency + '  >' + oData.PLAN_END_DATE.substring(0, oData.PLAN_END_DATE.indexOf(' ')) + '</a>');
                            var tic = (oData.REQUEST_COMMENT == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                            $(nTd).html(tic);
                        },
                        "fnCreatedRow": function (nRow, oData, iDataIndex) {
                            $(nRow).attr('onclick', 'SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')');
                        },
                    },

                    ],
                    "aaSorting": [],
                    "language": {
                        // "url":"//cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
                        "processing": "Подождите...",
                        "search": "Поиск",
                        "lengthMenu": "Показать по _MENU_ заявок",
                        "info": "Заявки с _START_ до _END_ из _TOTAL_ заявок",
                        "infoEmpty": "Заявки с 0 до 0 из 0 заявок",
                        "infoFiltered": "(отфильтровано из _MAX_ записей)",
                        "infoPostFix": "",
                        "loadingRecords": "Загрузка записей...",
                        "zeroRecords": "Записи отсутствуют.",
                        "emptyTable": "В таблице отсутствуют данные",
                        "paginate": {
                            "first": "Первая",
                            "previous": "Предыдущая",
                            "next": "Следующая",
                            "last": "Последняя"
                        },
                        //"aria": {
                        //    "sortAscending": ": активировать для сортировки столбца по возрастанию",
                        //    "sortDescending": ": активировать для сортировки столбца по убыванию"
                        //}
                    }

                })//.order([0, 'desc']).draw();
                //$('#RequestTables').order([1, 'desc']).draw();
                $('#RequestTables').children('thead').children('tr').children('th').each(function () { $(this).append('<i style="margin-left:  5px;" data-icon="w" class="fa fa-unsorted" aria-hidden="true"></i>') })
                $('.ui-loader-background').hide();
                $('#loader').hide();
                //sss
                //   gtObjBiInd(i, jsondata_[i].INDIVIDUAL_ID, jsondata_[i].ROOM_TYPE);//<td class='prs" + i + "'></td>
                // gtIspol(i, jsondata_[i].REQUEST_ID)
                // gtservices(i, jsondata_[i].REQUEST_ID, jsondata_[i].STATUS_ID)

                // console.log("ind Id: " + jsondata_[i].INDIVIDUAL_ID)
                //<td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].ATRIBUTE + "</a></td>
                //   }
                // $(".formTable").find("tr:eq(1)").find("td:eq(2)").css("background-color", "yellow")


            }

        })
    }

    function gtRequestTable2(lg) {
        var obj2 = { "LogId": lg }
        $.ajax({
            type: "POST",
            url: "RegisterRequest.aspx/gtRstTable",
            data: JSON.stringify(obj2),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data)
                var jsondata_ = JSON.parse(data.d)


                // console.log("rc: " + )
                for (var i = 0; i < jsondata_.length; i++) {
                    // var rc = jsondata_[i].REQUEST_COMMENT.substring(jsondata_[i].REQUEST_COMMENT.indexOf('|') + 1, jsondata_[i].REQUEST_COMMENT.length)
                    //// console.log("rc: " + rc)
                    // rc = JSON.parse(rc);  <td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")   href='CreateRequest.aspx'>" + jsondata_[i].ROOM_TYPE + "</a></td>
                    var tic = (jsondata_[i].ACCOUNT_NAME == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                    var emergency = (jsondata_[i].EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";

                    $("#header_").after("<tr><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].REQUEST_ID + "</a></td><td><a " + emergency + " class='ind" + i + "' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'></a></td><td><a  " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") class='adr2" + i + "' href='CreateRequest.aspx'></a></td><td><a  " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].CR_DATE.substring(0, jsondata_[i].CR_DATE.indexOf(' ')) + "</a></td><td><a  " + emergency + "  onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx' title='" + jsondata_[i].REQUEST_TEXT + "'>" + jsondata_[i].REQUEST_TEXT + "</a></td><td><a  " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") class='isp2" + i + "' href='CreateRequest.aspx'></a></td><td><a  " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].PLAN_END_DATE.substring(0, jsondata_[i].PLAN_END_DATE.indexOf(' ')) + "</a></td><td><a  " + emergency + " href='CreateRequest.aspx'onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")>" + jsondata_[i].STATUS
                        + "</a></td><td style='border: 2px solid lightgray;border-right: none;'>" + tic + "</td></tr >")
                    gtComments2(i, jsondata_[i].REQUEST_ID, jsondata_[i].ROOM_TYPE)//<td class='prs2" + i + "'></td>
                    //gtObjBiInd2(i, rc[0].Object_Id);
                    gtIspol2(i, jsondata_[i].REQUEST_ID)
                    // gtservices2(i, jsondata_[i].REQUEST_ID, jsondata_[i].STATUS_ID)

                    // console.log("ind Id: " + jsondata_[i].INDIVIDUAL_ID)
                    //<td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].ATRIBUTE + "</a></td>
                }
                // $(".formTable").find("tr:eq(1)").find("td:eq(2)").css("background-color", "yellow")


            }

        })
    }
    function gtComments2(num, Rid_, roomT) {
        // var objC = { "rid": Rid_ }
        var objC = { "rid": Rid_ }
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/GetCommentsById",
            data: JSON.stringify(objC),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d);
                for (var i = 0; i < jsondata_.length; i++) {
                    if (jsondata_[i].REQUEST_COMMENT_.indexOf('|') > 0) {
                        var rc = jsondata_[i].REQUEST_COMMENT_.substring(jsondata_[i].REQUEST_COMMENT_.indexOf('|') + 1, jsondata_[i].REQUEST_COMMENT_.length)
                        rc = JSON.parse(rc);
                        $(".ind" + num + "").text(rc[0].indName)
                        gtObjBiInd2(num, rc[0].Object_Id, roomT, rc[0].room);
                    }
                }
            }
        })

    }
    function alertWithButton(Header_, text_, footer_) {
        $("#mh2").text(Header_);
        $("#txt2").text(text_);
        $("#mf2").text(footer_)
        var modal = document.getElementById('myModal2');
        var span = document.getElementsByClassName("close_")[0];
        modal.style.display = "block";
        $("#close_,#cls").click(function () {
            modal.style.display = "none";
        })
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    function alertMessage(Header_, text_, footer_) {
        $("#mh").text(Header_);
        $("#txt").text(text_);
        $("#mf").text(footer_)
        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        $("#close").click(function () {
            modal.style.display = "none";
        })
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }



    function Commentst() {
        //$("#mh").text(Header_);
        //$("#txt").text(text_);
        //$("#mf").text(footer_)
        var modal = document.getElementById('myModal4');
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        $("#close_4").click(function () {
            modal.style.display = "none";
        })
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    if (loc == '/Disp_Admin/SRequests.aspx') {
        sessionStorage.setItem("st", "")
        sessionStorage.setItem("RId", "");

        gtStatuses();
        sessionStorage.setItem('changes', null)
        $('a[href="SRequests.aspx"]').css('background-color', '#FFDEAD')
        sessionStorage.setItem("All", "Notall");
        sessionStorage.removeItem("RId");
        sessionStorage.removeItem("st");
       // getcurrdspObjForFilter(LogId);

        $('.ui-loader-background').show();
        $('#loader').show();
        SUPP = sessionStorage.getItem('SUPP')

        getRequestDisp_Table(LogId);

        $("#flt").click(function () {
            var fltdisplay = $("#filter1").css("display")
            if (fltdisplay == 'none') {
                $("#filter1").show('1000');
            }
            else {
                $("#filter1").hide('1000');
            }
        })

        $("#filtering").click(function () {
            $('.formTable tr:not(:first)').remove();
            var firstname = $("#frstname").val();
            firstname = "\"" + firstname + "\"";
            var fltObj = [];
            fltObj.push({ "REQUEST_ID": ($("#requestNumber").val() == "") ? 0 : $("#requestNumber").val(), "ROOM_NUMBER": ($("#rmNum").val() == "") ? "0" : $("#rmNum").val(), "OBJECT_ID": $("#object").val(), "ROOM_TYPE_ID": 0, "FIRST_NAME": $("#frstname").val(), "CR_DATE_FROM": $("#startTime").val(), "CR_DATE_TO": $("#endTime").val(), "STATUSE": $("#sts").val() })
            $('.ui-loader-background').show();
            $('#loader').show();
            makefilter(fltObj, LogId)
            //makefilter2(fltObj, LogId);
            //if ($("#requestNumber").val() == "" && $("#rmNum").val() == "" && $("#object").val() == 0 && $("#rt").val() == 0 && $("#frstname").val() && $("#startTime").val() == "" && $("#endTime").val() == "" && $("#sts").val()==0) {
            //    gtRequestTable2(LogId)
            //    getRequestTable(LogId)
            //}
        })


    }
})
function getRequestDisp_Table(loginId) {
    //  SN = encodeURI(SN)
    var o = { lg: loginId }
    $.ajax({
        type: "POST",
        url: "SRequests.aspx/GetRequestTable",
        data: JSON.stringify(o),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var jsondata_ = JSON.parse(data.d)
            //console.log(jsondata_);
            //' + oData.ATRIBUTE + '
            //\''+ oData.ATRIBUTE +'\'
            $('#RequestTables').DataTable({
                orderCellsTop: true,
                "destroy": true,
                data: jsondata_,

                columns: [{
                    'data': 'REQUEST_ID',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')"' + emergency + '  >' + oData.REQUEST_ID + '</a>');
                    },
                    'fnCreatedRow': function (nRow, aData, iDataIndex) {
                        //$(nRow).attr('onclick', 'SendId(' + aData.REQUEST_ID + ',' + aData.STATUS_ID+')');
                        $('#RequestTables tbody tr:eq(' + iDataIndex + ')').attr('onclick', 'SendId(\'' + oData.ATRIBUTE + '\',' + aData.STATUS + ')');
                    },
                },
                {
                    'data': 'FIRST_NAME',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')" ' + emergency + '  >' + oData.FIRST_NAME + '</a>');
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')');
                    },
                },

                {
                    'data': 'ADRESS',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')" ' + emergency + '  >' + oData.ADRESS + '</a>');
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')');
                    },
                },

                {
                    'data': 'CR_DATE',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')" ' + emergency + '  >' + oData.CR_DATE.substring(0, oData.CR_DATE.indexOf(' ')) + '</a>');
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')');
                    },
                },

                {
                    'data': 'REQUEST_TEXT',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')" ' + emergency + '  >' + oData.REQUEST_TEXT + '</a>');
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')');
                    },
                },

                {
                    'data': 'ACCOUNT_NAME',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')" ' + emergency + '  >' + oData.ACCOUNT_NAME + '</a>');
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')');
                    },
                },

                {
                    'data': 'PLAN_END_DATE',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')" ' + emergency + '  >' + oData.PLAN_END_DATE.substring(0, oData.PLAN_END_DATE.indexOf(' ')) + '</a>');
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')');
                    },
                },
                {
                    'data': 'STATUS',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')" ' + emergency + '  >' + oData.STATUS_ID + '</a>');
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')');
                    },
                },

                {
                    'data': 'TOTAL_COST',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        //var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        //$(nTd).html('<a href="#" ' + emergency + '  >' + oData.PLAN_END_DATE.substring(0, oData.PLAN_END_DATE.indexOf(' ')) + '</a>');
                        var tic = (oData.TOTAL_COST != null && oData.TOTAL_COST.length != 0) ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                        $(nTd).html(tic);
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS_ID + ')');
                    },
                },

                ],
                "aaSorting": [],
                "language": {
                    // "url":"//cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
                    "processing": "Подождите...",
                    "search": "Поиск",
                    "lengthMenu": "Показать по _MENU_ заявок",
                    "info": "Заявки с _START_ до _END_ из _TOTAL_ заявок",
                    "infoEmpty": "Заявки с 0 до 0 из 0 заявок",
                    "infoFiltered": "(отфильтровано из _MAX_ записей)",
                    "infoPostFix": "",
                    "loadingRecords": "Загрузка записей...",
                    "zeroRecords": "Записи отсутствуют.",
                    "emptyTable": "В таблице отсутствуют данные",
                    "paginate": {
                        "first": "Первая",
                        "previous": "Предыдущая",
                        "next": "Следующая",
                        "last": "Последняя"
                    },
                    //"aria": {
                    //    "sortAscending": ": активировать для сортировки столбца по возрастанию",
                    //    "sortDescending": ": активировать для сортировки столбца по убыванию"
                    //}
                }

            })

            $('#RequestTables').children('thead').children('tr').children('th').each(function () { $(this).append('<i style="margin-left:  5px;" data-icon="w" class="fa fa-unsorted" aria-hidden="true"></i>') })
            $('.ui-loader-background').hide();
            $('#loader').hide();

        }

    })
}

function ChangeToSend(e) {
    var LogId = sessionStorage.getItem("Log")
    if (LogId == $(e).val()) {
        $("#SaveMO").hide();
        $("#SaveDD").show()
    }
    else {
        $("#SaveMO").show();
        $("#SaveDD").hide()
    }

}
function CRequest(e) {
    var color = $(e).css("color");
    if (color == "rgb(0, 0, 0)") {
        alert("Ok")
    }

}
function DownKol() {
    var imageUri = sessionStorage.getItem("DownKol")
    download(imageUri, 'Количество.png', "image/png")
}
function Open_Pop(e) {
    //$('#changeCost').show(1000);
    $(e).parent().children('#changeCost').show(1000)
    if ($(e).text() != "Договорная") {
        $('#dqCost').val($(e).text());
    }
}
function CloseDiv(e) {
    $(e).parent('#changeCost').hide(1000);
    $(e).parent().children('#dqCost').val("");
}
function MakeCost(e) {
    var dqCost = $(e).parent().children('#dqCost').val();
    if (dqCost.length != 0 && dqCost >= 0) {
        var totalcost = 0
        $(e).parent().parent('td').find('a').text(dqCost);
        //  $('#total').text("Итого: " + $('#dqCost').val())
        //  $('#dqCost').val($('#dqCost').val());
        $('#PrServiceH tbody tr').each(function () {
            var servicecost = $(this).children('td:eq(3)').children('a').text();
            var DirectAndSetCost = $(this).children('td:eq(1)').children('a').text()
            var dataS = $('#PrServiceH').attr('data-s')
            var dataD = $('#PrServiceH').attr('data-d')
            //  var cost = (dataS != undefined || dataD != undefined) ? DirectAndSetCost : servicecost;
            var cost = (DirectAndSetCost.length != 0) ? parseFloat(DirectAndSetCost) : parseFloat(servicecost)
            if (cost != 'Договорная') {
                cost = (isNaN(cost))?'0.00':cost
                totalcost = parseFloat(totalcost) + parseFloat(cost)
                totalcost = (isNaN(totalcost)) ? "0.00" : totalcost
            }
            $('#total').remove();
            $('#PrServiceH').after('<label id="total" style="float: right; display: block;">Итого: ' + totalcost + ' руб</label>');
        })
       
    }
    else {
        //
        $(e).parent().parent('td').find('a').text("Договорная");
        var totalcost = 0
        $('#PrServiceH tbody tr').each(function () {
            var servicecost = $(this).children('td:eq(3)').children('a').text();
            var DirectAndSetCost = $(this).children('td:eq(1)').children('a').text()
            var dataS = $('#PrServiceH').attr('data-s')
            var dataD = $('#PrServiceH').attr('data-d')
            //  var cost = (dataS != undefined || dataD != undefined) ? DirectAndSetCost : servicecost;
            var cost = (DirectAndSetCost.length != 0) ? parseFloat(DirectAndSetCost) : parseFloat(servicecost)
            if (cost != 'Договорная') {
                cost = (isNaN(cost)) ? '0.00' : cost
                totalcost = parseFloat(totalcost) + parseFloat(cost)
                totalcost = (isNaN(totalcost)) ? "0.00" : totalcost
            }
            $('#total').remove();
            $('#PrServiceH').after('<label id="total" style="float: right; display: block;">Итого: ' + totalcost + ' руб</label>');
        })
        // $('#dqCost').val("Договорная")
        // $('#total').text("Итого: Договорная")
    }
    $(e).parent('#changeCost').hide(1000);
}
function DownVseqo() {
    var imageUri2 = sessionStorage.getItem("DownVseqo")
    download(imageUri2, 'Закрытие заявки.png.png', "image/png")
}
function gtservices2(num, rid_, st) {
    var objps = { "rid": rid_ }
    $.ajax({
        type: "POST",
        url: "RegisterRequest.aspx/gtSerives",
        data: JSON.stringify(objps),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            for (var i = 0; i < jsondata_.length; i++) {
                $(".prs2" + num + "").append("<a onclick=SendId(" + rid_ + "," + st + ") href='CreateRequest.aspx'>" + jsondata_[i].SERVICE_NAME + "</a><br/>")
            }

        }
    })

}

function selectAcc(e) {
    $("#AcnumList label").css("background-color", "").css("color", "black");
    $(e).css("background-color", "#23527c").css("color", "white");
    $("#Acnum").empty().val($(e).text())
    getHasInds2($(e).text())
}
function getHasInds2(scr) {
    var obj = { "score": scr }
    $.ajax({
        type: "POST",
        url: "CreateRequest.aspx/gethasInd2",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata = JSON.parse(data.d);
            $('#IndList').empty();

            if (jsondata.length != 1) {
                $("#Ind").val("")
                $("#Phn").val("")
                //$("#Ind").val(jsondata[0].FIRST_NAME).attr("itemid", jsondata[0].INDIVIDUAL_ID)
                //$("#Phn").val(jsondata[0].PHONE)
                //$("#Room").val(jsondata[0].ROOM_NUMBER)
                // $("#Room_Type").val(jsondata[0].ROOM_TYPE_ID)
                for (var i = 0; i < jsondata.length; i++) {
                    $("#IndList").append('<label data-number="' + jsondata[i].PHONE + '" itemid="' + jsondata[i].INDIVIDUAL_ID + '" style="color: black;position:  relative;left: 1%;" onclick="selectInd(this)">' + jsondata[i].FIRST_NAME + ' </label>').show();
                }

                //  getcurrdspObj(LogId, jsondata[0].OBJECT_ID);
            }
            else {
                $('#IndList').empty().hide();
                $("#Ind").empty().val(jsondata[0].FIRST_NAME).attr("itemid", jsondata[0].INDIVIDUAL_ID)
                $("#Phn").empty().val(jsondata[0].PHONE)
            }


        }
    })
}

function selectInd(e) {
    $("#Ind").val("");
    $("#Phn").val("");
    $("#Ind").val($(e).text()).attr('itemid', $(e).attr('itemid'))
    $("#Phn").val($(e).attr('data-number'))
    $("#IndList label").css("background-color", "").css("color", "black");
    $(e).css("background-color", "#23527c").css("color", "white");
}

function gtservices3(num, rid_, st) {
    var objps = { "rid": rid_ }
    $.ajax({
        type: "POST",
        url: "RegisterRequest.aspx/gtSerives",
        data: JSON.stringify(objps),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            for (var i = 0; i < jsondata_.length; i++) {
                $(".prsS" + num + "").append("<a onclick=SendId(" + rid_ + "," + st + ") href='CreateRequest.aspx' style='color: black;' >" + jsondata_[i].SERVICE_NAME + "</a><br/>")
            }

        }
    })
}
function gtservices(num, rid_, st) {
    var objps = { "rid": rid_ }
    $.ajax({
        type: "POST",
        url: "RegisterRequest.aspx/gtSerives",
        data: JSON.stringify(objps),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            for (var i = 0; i < jsondata_.length; i++) {
                $(".prs" + num + "").append("<a onclick=SendId(" + rid_ + "," + st + ") href='CreateRequest.aspx'>" + jsondata_[i].SERVICE_NAME + "</a><br/>")
            }

        }
    })
}
function gtIspol2(num, rid_) {
    var objspes = { "rid": rid_ }
    $.ajax({
        type: "POST",
        url: "RegisterRequest.aspx/gtSpecials",
        data: JSON.stringify(objspes),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            $(".isp2" + num + "").append(jsondata_[0].ACCOUNT_NAME)
        }
    })
}
function gtIspol(num, rid_) {
    var objspes = { "rid": rid_ }
    $.ajax({
        type: "POST",
        url: "RegisterRequest.aspx/gtSpecials",
        data: JSON.stringify(objspes),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            $(".isp" + num + "").append(jsondata_[0].ACCOUNT_NAME)
        }
    })
}
function gtObjBiInd2(num, ObjId_, rmt, rm) {
    var objind = { "objId": ObjId_ }
    $.ajax({
        type: "POST",
        url: "RegisterRequest.aspx/getObjById",
        data: JSON.stringify(objind),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            var objsDatas;
            if (jsondata_[0].ObjectAdress.endsWith(', ')) {
                objsDatas = jsondata_[0].ObjectAdress + " " + rmt + " № " + rm
            }
            else {
                objsDatas = jsondata_[0].ObjectAdress + ", " + rmt + " № " + rm
            }
            $(".adr2" + num + "").append(objsDatas).attr('title', objsDatas)
        }
    })
}
function gtObjBiInd(num, indid, rmt_) {
    var objind = { "ind": indid }
    $.ajax({
        type: "POST",
        url: "RegisterRequest.aspx/GetObjgectForInd",
        data: JSON.stringify(objind),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            var objsDatas;
            if (jsondata_[0].ObjectAdress.endsWith(', ')) {
                objsDatas = jsondata_[0].ObjectAdress + " " + rmt_ + " № " + jsondata_[0].ObjectPhoto
            }
            else {
                objsDatas = jsondata_[0].ObjectAdress + ", " + rmt_ + " № " + jsondata_[0].ObjectPhoto
            }
            $(".adr" + num + "").append(objsDatas).attr('title', objsDatas)
        }
    })

}
function selOb(e, idob) {
    var objsId = []
    $('#objctZ').find('label').css('background-color', '').css('color', '')
    $(e).css('background-color', '#2b4b90').css('color', 'white')
    objsId.push({ "Object_Id": idob, "Object_Adress": $(e).text() })
    // console.log(JSON.parse(objsId))
    sessionStorage.setItem("slcObj", JSON.stringify(objsId))
    $("#adr_S").hide();
    //console.log(JSON.stringify(objsId))
}
function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if (key < 48 || key > 57) {
        return false;
    } else {
        return true;
    }
};
function MakeCheckCheckBox(e, d) {
    var totalCost = 0
    var grupchecked = false
    $('#left,#right').children('div').each(function () {
        grupchecked = $(this).children('input[type="checkbox"]').prop('checked');
        var Grupid = $(this).children('input[type="checkbox"]').parent().attr('data-d');
        if (grupchecked == true && Grupid != d) {
            // alert('secili olan grup var')
            grupchecked = $(this).text()
            return false;
        }

    })
    var resultW = true
    if (grupchecked != false && grupchecked != undefined) {
        //confirm
        var newService = $(e).attr('value')
        resultW = confirm('Вы действительно хотите изменить группу услуг с "' + grupchecked + '" на услугу "' + newService + '"?');
    }
    if (resultW == true) {

        if ($(e).prop('checked') == true) {

            if ($('#PrServiceH').attr('data-d') != undefined) {
                $('#PrServiceH tbody').empty();
            }

            if ($('#PrServiceH').attr('data-s') != undefined) {///???
                $('#PrServiceH tbody').empty();
            }
            //  $('#PrServiceH tbody').empty();
            // $(e).children('input[type="checkbox"]').attr('checked', true);

            var dtUrl = $(e).attr('data-url');
            var dataName = $(e).attr("value");
            var itemId = $(e).attr("itemid");
            var cost = $(e).next('label').text();
            var doqi = (cost == 'Договорная') ? '<a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div>' : '<a>' + cost + '</a>'
            var edizm = $(e).attr('data-edizm');
            $('#PrServiceH').show();
            var kolDis = (cost == 'Договорная') ? 'disabled="disabled"' : '';
            //$('#listServiceH').show()
            if (dtUrl == 1) {
                //onkeyup="multiPlaying(this,500)" <td><input type="text" onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" value="1"></td>
                $("#PrServiceH tbody").append('<tr data-d=' + d + '><td itemid="' + itemId + '"> ' + dataName + '</td><td><input type="text" ' + kolDis + '  onkeyup=multiPlaying(this,"' + cost + '")  onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" value="1"></td><td>' + edizm + '</td><td  style="width:120px;text-align:center;">' + doqi + '</td><td><a itemid="' + itemId + '" data="' + dataName + '" onclick="RemoveRow(this)" data-url="' + dtUrl + '" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</a></td></tr>')
            }
            if (dtUrl == 0) {
                /*<tr><td style="width: 500px;" itemid="11">Доступ - Одноразовый пропуск</td><td><input disabled="disabled" type="text" value=""></td><td><button onclick="RemoveRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</button></td></tr>*/
                //<td  ><input disabled="disabled" type="text" value=""></td>
                $("#PrServiceH tbody").append('*<tr data-d=' + d + '><td   itemid="' + itemId + '"> ' + dataName + '</td><td><input disabled="disabled" type="text" value=""></td><td>' + edizm + '</td><td style="width:120px;text-align:center;"><a onclick=Open_Pop(this) >' + cost + '</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-url="' + dtUrl + '" onclick="RemoveRow(this)" itemid="' + itemId + '" data="' + dataName + '"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</a></td></tr>')

            }
            $('#left,#right').children('div').each(function () {

                $(this).children('input[type="checkbox"]').prop('checked', false)

            })

            $('#PrServiceH').removeAttr('data-d');
            $('#PrServiceH').removeAttr('data-s')
            $('#PrServiceH thead tr th:eq(0)').text('Наименование услуги')
            $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2),#PrServiceH thead tr th:eq(3)').show()
            $('#PrServiceH tbody tr').each(function () {
                $(this).children('td:eq(1),td:eq(2),td:eq(3)').show();
            })
            //for (var i = 0; i < $('#PrServiceH tbody tr').length; i++) {
            //    var c = $('#PrServiceH tbody tr:eq(' + i + ') td:eq(3) a').text();
            //    if (c != 'Договорная') {

            //        totalCost = totalCost + parseFloat(c);
            //    }
            //}
            // var totalCost = 0
            $('#PrServiceH tbody tr').each(function () {
                var c = $(this).children('td:eq(3)').text()
                if (c != 'Договорная') {

                    totalCost = totalCost + parseFloat(c);
                }
            })
            $('#total').remove();
            $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + totalCost + '  руб</label>')
            if (totalCost == 0) {
                $('#total').hide();
            }
            else {
                $('#total').show();
            }
            $(e).parent().parent().prev().children('input[type="checkbox"]').prop('checked', true)
        }
        else {
            var itemId = $(e).attr("itemid");
            $('#PrServiceH tr').children('td[itemid=' + itemId + ']').parent().remove();
            for (var i = 0; i < $('#PrServiceH tbody tr').length; i++) {
                var c = $('#PrServiceH tbody tr:eq(' + i + ') td:eq(3) a').text();
                if (c != 'Договорная') {

                    totalCost = totalCost + parseFloat(c);
                }
            }
            $('#total').remove();
            $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + totalCost + '  руб</label>')
            if (totalCost == 0) {
                $('#total').hide();
            }
            else {
                $('#total').show();
            }
            //  $(e).parent().parent().prev().children('input[type="checkbox"]').prop('checked', true)
            var checked = "unchecked"
            $(e).parent().parent().children('div').each(function () {
                var chk_values = $(this).children('input[type="checkbox"]').prop('checked');
                if (chk_values == true) {
                    checked = "checked";
                    return false;
                }
            })
            if (checked == "unchecked") {
                $(e).parent().parent().prev().children('input[type="checkbox"]').prop('checked', false)
            }

        }
        //$(e).next('br').remove();
        //$(e).remove(); 
        var tr = $('#PrServiceH tbody tr').length
        if (tr == 0) {
            $('#PrServiceH').show();
            $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').hide();
            $('#PrServiceH thead tr th:eq(0)').text('Наименование Направления')
            var sid = $('#Sets').val();
            $('#PrServiceH').attr('data-s', sid)
            //$('#PrServiceH').hide();
            $('#PrServiceH tbody').append('<tr><td data-s=' + $('#Sets').val() + '>' + $('#Sets').children(':selected').text() + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

        }
    }
    else {
        $(e).prop('checked', false)
    }
}
function SaveFCM(SECTION, EVENT, TEXT, PROJECT_ID, SCORE_ID, LOG_IN_ID, PAGE, ID) {
    var frmData = new FormData();
    frmData.append('SECTION', SECTION);
    frmData.append('EVENT', EVENT);
    frmData.append('TEXT', TEXT);
    frmData.append('PROJECT_ID', PROJECT_ID);
    frmData.append('SCORE_ID', SCORE_ID)
    frmData.append('LOG_IN_ID', LOG_IN_ID)
    frmData.append('PAGE', PAGE)
    frmData.append('ID', ID);
    $.ajax({
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + window.location.port + '/ProjectApi/Request_Fili/INSERT_FCM_LOG',//'http://localhost:63362/Request_Fili/INSERT_FCM_LOG',//
        data: frmData,

        contentType: false,// 'multipart/form-data',
        processData: false,
        //  dataType: "JSON",
        cache: false,
        // timeout: 3600000,
        //crossDomain: true,

        success: function (result) {

        }
    })

}
function GetGroupOfServices(selected, obj) {
    var o = { "Obj": obj }
    $.ajax({
        type: "POST",
        url: "../Manager/Apartments.aspx/GetHasDirectService",
        data: JSON.stringify(o),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d)
            //for (var i = 0; i < jsondata_.length; i++) {
            //    $('#GServices').append('<option value=' + jsondata_[i].INDIVIDUAL_ID + '>' + jsondata_[i].LAST_NAME + '</option>')
            //}
            //if (selected != "") {
            //    $('#GServices').val(selected);

            //}
            //HGroup
            $('#Phn').after('<label id="HGroup">Группа услуг </label>')
            if (j.length > 4) {
                $('#HGroup').after('<div class="col-md-12"><div id="left" class="col-md-6"></div><div id="right" class="col-md-6"></div></div><br/>')
                for (var i = 0; i < j.length; i++) {
                    if (i % 2 == 0) {
                        $('#left').append('<div data-d=' + j[i].DIRECTION_ID + ' onclick="getServices(this,' + j[i].DIRECTION_ID + ')" data-active="on" class="accMenu"> <img src=' + j[i].ICON_ADRESS + '   class="icon">' + j[i].DIRECTION_NAME + ' <i class="fa fa-chevron-down GrupOpenIcon" aria-hidden="true"   ></i><input type="checkbox" class="chkDirect" style="float:right;margin-right: 10px;" onclick="selectDirectOnly(this)" ></div>')
                    }
                    else {
                        $('#right').append('<div data-d=' + j[i].DIRECTION_ID + ' onclick="getServices(this,' + j[i].DIRECTION_ID + ')" data-active="on" class="accMenu"> <img src=' + j[i].ICON_ADRESS + '   class="icon">' + j[i].DIRECTION_NAME + ' <i class="fa fa-chevron-down GrupOpenIcon" aria-hidden="true"    ></i><input type="checkbox"  class="chkDirect" style="float:right;margin-right: 10px;" onclick="selectDirectOnly(this)"></div>')//margin-left: 70;
                    }
                }
            }
            else {
                $('#HGroup').after('<div class="col-md-12"><div id="left" class="col-md-12"></div></div>')

                for (var i = 0; i < j.length; i++) {

                    $('#left').append('<div data-d=' + j[i].DIRECTION_ID + ' onclick="getServices(this,' + j[i].DIRECTION_ID + ')" data-active="on" class="accMenu"> <img src=' + j[i].ICON_ADRESS + '   class="icon">' + j[i].DIRECTION_NAME + ' <i class="fa fa-chevron-down" aria-hidden="true"  data-active="on" style="float:right;margin-right: 5px;color: #2b4b90;"></i></div>')

                }
            }
            if (selected != "") {
                var st = sessionStorage.getItem("st");
                if (st == 2) {
                    //alert("22")
                    $('.accMenu').hide();
                    $('.accMenu[data-d="' + selected + '"]').show();
                    $('.accMenu[data-d="' + selected + '"]').parent().append('<input type="button" onclick="showAllServices()" class="btn genBtn" value="Изменить Группу Услуг"/>')
                }
                else {
                    $('.accMenu').hide();
                    $('.accMenu[data-d="' + selected + '"]').show();
                }
                if (st == 3) {
                    $('.accMenu[data-d="' + selected + '"]').removeAttr('onclick');
                }
                if (st == 4 || st == 5) {
                    $('.accMenu[data-d="' + selected + '"]').removeAttr('onclick');
                }
            }
        }
    })
}
function showAllServices() {
    $('.accMenu').show();
    $('input[onclick="showAllServices()"]').remove();
}
function getServices(e, d) {
    //var st = sessionStorage.getItem("st");
    //if (st == null) {
    //  $('#PrServiceH').children('tbody').empty();
    //    $('#PrServiceH').hide();
    //}
    var is_checked = $(e).children('input[type="checkbox"]').prop('checked')
    $('#listServiceH').hide();
   


    if ($(e).attr('data-active') == 'on') {
        var trcountProductt = $('#PrServiceH tbody').children('tr').length;
        if (trcountProductt != 0) {
            $('#PrServiceH tbody').children('tr').each(function () {
                var dataD = parseInt($(this).attr('data-d'));
                if (dataD != d && $('#PrServiceH').attr('data-d') == undefined) {
                    $(this).remove();
                }
            })
        }
        $(e).parent().children('div').children('.fa').attr('class', 'fa fa-chevron-down GrupOpenIcon')
        $(e).children('.fa').attr('class', 'fa fa-chevron-up GrupOpenIcon')
        $(e).attr('data-active', 'off')
        $('.subMenu').remove();

        $(e).after('<div id="subMenu" data-d=' + d + ' class="subMenu"  ></div>')
        GetProductN(e, $('#objctZ').val(), d)
        //testAnim('fadeInDown');
        $('#left,#right').children('div').each(function () {
            $(this).attr('data-active', 'on')
            $(this).children('.GrupOpenIcon').attr('class', 'fa fa-chevron-down GrupOpenIcon')
        })
        $(e).attr('data-active', 'off')
        $(e).children('.GrupOpenIcon').attr('class', 'fa fa-chevron-up GrupOpenIcon')
    }
     else {
        $(e).children('.fa').attr('class', 'fa fa-chevron-down GrupOpenIcon')
        $(e).attr('data-active', 'on')
        $(e).next('#subMenu').remove();
        var tr = $('#PrServiceH tbody tr').length
        if (tr == 0) {
            $('#PrServiceH').show();
            $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').hide();
            $('#PrServiceH thead tr th:eq(0)').text('Наименование Направления')
            var sid = $('#Sets').val();
            $('#PrServiceH').attr('data-s', sid)
            //$('#PrServiceH').hide();
            $('#PrServiceH tbody').append('<tr><td data-s=' + $('#Sets').val() + '>' + $('#Sets').children(':selected').text() + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

        }
    }
    $('#total').remove();
    var totalCost = 0
    $("#PrServiceH tbody tr").each(function () {
        var cost = (isNaN($(this).children('td:eq(3)').text())) ? "0.00" : $(this).children('td:eq(3)').text();
        totalCost = parseFloat(totalCost) + parseFloat(cost)
        totalCost = (isNaN(totalCost)) ? "0.00" : totalCost
    })
    $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + totalCost + '  руб</label>')



}
function GetProductN(e, obj, gs) {
    var obj = { o: obj, g: gs }
    $.ajax({
        url: "CreateRequest.aspx/GetProductServices",
        data: JSON.stringify(obj),
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var jsondata = JSON.parse(data.d);
            var total = 0
            $(e).parent().next('#subMenu').empty();
            for (var i = 0; i < jsondata.length; i++) {


                if (jsondata[i].COST.indexOf('.') == -1) {
                    jsondata[i].COST = (jsondata[i].COST != "Договорная") ? jsondata[i].COST + ".00" : jsondata[i].COST
                }
                if (jsondata[i].QUANTITY_IS == true) {
                    //data="' + jsondata[i].SERVICE_TYPE_NAME + '-' + jsondata[i].SERVICE_NAME + '"
                    //' + jsondata[i].SERVICE_TYPE_NAME + ' ' + jsondata[i].SERVICE_TYPE_NAME + ' -
                    $(e).next('#subMenu').append('<div itemid="' + jsondata[i].SERVICE_ID + '"    class="col-md-12" style="margin-top:0px"><input type="checkbox" onclick="MakeCheckCheckBox(this,' + gs + ')" class="col-md-1" data-edizm="' + jsondata[i].SERVICE_TYPE_NAME + '" name="services1" value="' + jsondata[i].SERVICE_NAME + '" data-url="1" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left: -20px;margin-top: 8px;"><label   style="float:right;width:10%" itemid="' + jsondata[i].SERVICE_ID + '">' + jsondata[i].COST + '</label><label   style="margin-left: 20px !important; width:70%" itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_NAME + '</label></div><br/>')


                }
                else {//data="' + jsondata[i].SERVICE_TYPE_NAME + '-' + jsondata[i].SERVICE_NAME + '"
                    $(e).next('#subMenu').append('<div itemid="' + jsondata[i].SERVICE_ID + '"   class="col-md-12" style="margin-top:0px"><input type="checkbox" onclick="MakeCheckCheckBox(this,' + gs + ')"  class="col-md-1" data-edizm="' + jsondata[i].SERVICE_TYPE_NAME + '" name="services1" value="' + jsondata[i].SERVICE_NAME + '"  data-url="0" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left: -20px;margin-top: 8px;"><label  style="float:right;width:10%" itemid="' + jsondata[i].SERVICE_ID + '">' + jsondata[i].COST + '</label><label   style="margin-left: 20px !important; width:70%" itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_NAME + '</label></div><br/>')
                }


            }
            var trcountProductt = $('#PrServiceH tbody').children('tr').length;
            if (trcountProductt != 0) {
                $('#PrServiceH tbody').children('tr').each(function () {
                    var itemidtr = $(this).children('td:eq(0)').attr('itemid');
                    // $('#subMenu div[itemid="' + itemidtr + '"]+br').remove();
                    $('#subMenu div[itemid="' + itemidtr + '"]').children('input[type="checkbox"]').prop('checked', true);

                })
            }
            var finded = sessionStorage.getItem("finded");
            if (finded != null) {
                finded = JSON.parse(finded)
                $('#subMenu').children('div').each(function () {

                    var serviceid = $(this).attr('itemid');
                    for (var i = 0; i < finded.length; i++) {
                        var findedid = finded[i].id
                        findedid = findedid.replace('srv', '');
                      
                        if (serviceid == findedid)
                        {
                            $(this).children('input[type="checkbox"]').click();
                        }
                    }


                })

            }
            sessionStorage.removeItem("finded")
        }
    })
}

$.fn.rotate = function (degrees, step, current) {
    var self = $(this);
    current = current || 0;
    step = step || 5;
    current += step;
    self.css({
        '-webkit-transform': 'rotate(' + current + 'deg)',
        '-moz-transform': 'rotate(' + current + 'deg)',
        '-ms-transform': 'rotate(' + current + 'deg)',
        'transform': 'rotate(' + current + 'deg)'
    });
    if (current != degrees) {
        setTimeout(function () {
            self.rotate(degrees, step, current);
        }, 5);
    }
};
function RemoveRow(e) {
    var totalcost = 0
    //var itemid = $(e).attr("itemid");
    //var dtUrl = $(e).attr("data-url");//disabled or not
    //var data = $(e).attr("data");
    //var productName = data.substr(data.indexOf('-') + 1, data.length);
    //var cost = $(e).parent().prev('td').text();
    //$("#Servs").prepend('<input type="radio" name="services1" data="' + data + '" data-url="' + dtUrl + '" itemid="' + itemid + '"  style="margin-left:5px"><label style="float:right" itemid=' + itemid + '>' + cost + '</label><label style="margin-top: -22px !important;" itemid="' + itemid + '" class="checkBx">' + productName + '</label>');
    var serviceName = $(e).attr('data');
    var serviceId = $(e).attr('itemid');
    var dataUrl = $(e).attr('data-url');
    var edizm = $(e).parent().prev().prev().text();
    var cost = $(e).parent().prev().children('a').text();
    //$('#subMenu').prepend('<div onclick="MakeCheckCheckBox(this)" class="col-md-12" style="margin-top:0px"><input type="checkbox" class="col-md-1" data-edizm="' + edizm + '" name="services1" value="' + serviceName + '" data-url="1" itemid="' + serviceId + '" style="margin-left: -20px;margin-top: 8px;"><label style="float:right;width:10%" itemid="' + serviceId + '">' + cost + '</label><label style="margin-left: 20px !important; width:70%" itemid="' + cost + '" class="checkBx">' + serviceName + '</label></div><br/>')
    $('#subMenu').children('div[itemid=' + serviceId + ']').children('input[type="checkbox"]').prop('checked', false)
    $(e).parent().parent('tr').hide(1000);
    $(e).parent().parent('tr').remove();
    $('#shServ').removeAttr('disabled')
  
     
    if ($('#PrServiceH tbody tr').length == 0) {
        $('#PrServiceH').hide();
        $('#listServiceH').hide();
    }
 
    var tr = $('#PrServiceH tbody tr').length
    if (tr == 0) {
        $('#PrServiceH').show();
        $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').hide();
        $('#PrServiceH thead tr th:eq(0)').text('Наименование Направления')
        var sid = $('#Sets').val();
        $('#PrServiceH').attr('data-s', sid)
        //$('#PrServiceH').hide();
        $('#PrServiceH tbody').append('<tr><td data-s=' + $('#Sets').val() + '>' + $('#Sets').children(':selected').text() + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

    }
    $('#PrServiceH tbody tr').each(function () {
        var servicecost = $(this).children('td:eq(3)').children('a').text();
        var DirectAndSetCost = $(this).children('td:eq(1)').children('a').text()
        var dataS = $('#PrServiceH').attr('data-s')
        var dataD = $('#PrServiceH').attr('data-d')
        //  var cost = (dataS != undefined || dataD != undefined) ? DirectAndSetCost : servicecost;
        var cost = (DirectAndSetCost.length != 0) ? parseFloat(DirectAndSetCost) : parseFloat(servicecost)
        if (cost != 'Договорная') {
            cost = (isNaN(cost)) ? '0.00' : cost
            totalcost = parseFloat(totalcost) + parseFloat(cost)
            totalcost = (isNaN(totalcost)) ? "0.00" : totalcost
        }
        $('#total').remove();
        $('#PrServiceH').after('<label id="total" style="float: right; display: block;">Итого: ' + totalcost + ' руб</label>');
    })
}
function AddtoMain(e) {
    $("#PrServiceH").show('1000');
    $("#PrService").show('1000');
    var total = $("#ItCost").val();
    var removedCost = $(e).closest('td').prev('td').text()
    var tdinput = $(e).closest('td').prev('td').prev('td').find('input');
    tdinput.attr("onkeyup", "multiPlaying(this," + removedCost + ")");
    tdinput.val(1)
    total = parseInt(total) + parseInt(removedCost)
    //var stDost = $("#StDost").val()
    //total = parseInt(total) + parseInt(stDost)
    $("#ItCost").val(total);
    // console.log(total)
    $(e).text('')
    $(e).append('<i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить')

    $(e).attr('onclick', 'RemoveRow(this)')
    var currentRow = $(e).closest('tr').clone()
    $(e).closest("tr").remove();
    $("#PrService").prepend(currentRow)
    //$("#AddedTable").hide('1000')
    //$("#PrService2").hide('1000')
    //$("#PrService_S").hide();
}
function multiPlaying(e, Cost) {
    var totalC = 0
    if ($(e).val() != 0 && $(e).val().length != 0) {
        //Cost = Cost.substr(0, Cost.indexOf('.') + 1)
        Cost = parseFloat($(e).val()) * Cost
        $(e).parent().next('td').next('td').children('a').text(Cost);

        var totalCost = 0
        $('#total').remove();
        $("#PrServiceH tbody tr").each(function () {
            var cost = (isNaN($(this).children('td:eq(3)').text())) ? "0.00" : $(this).children('td:eq(3)').text();
            totalCost = parseFloat(totalCost) + parseFloat(cost)
            totalCost = (isNaN(totalCost)) ? "0.00" : totalCost
        })
        $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + totalCost + '  руб</label>')

    }
    else {
        $(e).parent().next('td').next('td').children('a').text(Cost);
        // $(e).val("1")
    }
   
    // $('#total').text('Итого: ' + Cost);
    //var TdVal = $(e).closest('td').next('td').text();
    //sessionStorage.setItem("cost", Cost);
    ////  $(e).closest('td').text($(e).val() * $(e).closest('td').text())
    //if ($(e).val() == 0 || $(e).val().length==0) {
    //    //$(e).val(1)
    //    TdVal = sessionStorage.getItem("cost")
    //    //var total = $("#ItCost").val();
    //    //total = parseInt(total) - parseInt(TdVal)
    //    //$("#ItCost").val(total);
    //    $(e).closest('td').next('td').text(TdVal);
    //    sessionStorage.removeItem("TdVal")
    //    var total = 0
    //    $("#PrService tr td:nth-child(3)").each(function () {
    //        var currentTd = $(this).text()

    //        total += parseInt(currentTd)

    //        // console.log($(this).text());
    //    })
    //    var stDost = $("#StDost").val()
    //    total = parseInt(total) + parseInt(stDost)
    //    $("#ItCost").val(total);
    //}
    //else {
    //   // 
    //    var total = $("#ItCost").val();
    //    //var nextValue = $(e).closest('td').next('td').text()
    //  //  total = parseInt(total) - parseInt(TdVal)

    //    TdVal = $(e).val() * TdVal;
    //    //total = parseInt(total) + parseInt(TdVal)
    //    //$("#ItCost").val(total);
    //    $(e).closest('td').next('td').text(TdVal);

    //    var total=0
    //    $("#PrService tr td:nth-child(3)").each(function () {
    //        var currentTd = $(this).text()

    //        total += parseInt(currentTd)

    //       // console.log($(this).text());
    //    })
    //    var stDost = $("#StDost").val();
    //    total = parseInt(total) + parseInt(stDost)
    //    $("#ItCost").val(total);


    //}
    ////

}
//function SendId(RId, st) {
//    sessionStorage.setItem("st", st)
//    sessionStorage.setItem("RId", RId);
//    window.location.href = "CreateRequest.aspx"
//}
function ADwonKol() {
    var image_Uri = sessionStorage.getItem("ADownKol2")
    download(image_Uri, 'Количество (Все Заявки).png', "image/png")
}
// 
function AdwonVseqo() {
    var image_Uri4 = sessionStorage.getItem("DownVseqo4")
    download(image_Uri4, 'Закрытие заявки (Все Заявки).png.png', "image/png")

}
function removeF(num) {
    // if (num == 0) {
    //.remove()//.val("");
    $("#fotoDisp" + num + "").parent().remove();
    $("#fotoDisp" + num + "").attr("data-url", "0").remove();//.attr("src", window.location.protocol + '//' + window.location.host + '/Files/upl.png')

    $("i[onclick='removeF(" + num + ")']").remove();
    var imgslenght = $("#imgss ").find('img').length;
    if (imgslenght < 5) {
        //var lastinputFileItem = $(".knop").find("img:last").attr("itemid");
        $("#file_btn").show();
    }
    // }
    //else {
    //    $("#files" + (num + 1) + "").remove();//.show().val("");
    //    $(".foto-disp" + num + "").remove();//.attr("data-url", "0").attr("src", window.location.protocol + '//' + window.location.host + '/Files/upl.png')
    //    $("i[onclick='removeF(" + num + ")']").remove()//.hide();
    //}
}
function removeF2(e, num) {
    $(e).remove();
    $(".HistImg[itemid='" + num + "']").remove();
    $(".titleF2[itemid='" + num + "']").remove();
    $('#fileH_btn').show();
}
function removeF3(e, num) {
    $(e).remove();
    $("#f_iles2").show();
    $("img[itemid='" + num + "']").remove();
    $(".titleF[itemid='" + num + "']").remove();
}

function readUrlAll(input, itemnum) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {
            var formData = new FormData();
            var file = input.files[0]
            formData.append('file', file, file.name);
            formData.append('object_id', '1');
            $.ajax({
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
                data: formData,
                type: 'POST',
                contentType: "multipart/form-data",
                processData: false,
                // async: false,
                success: function (result) {

                    //alert("OK. See Console -  press F12");
                    // console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    //var jsondata_1 = jQuery.parseJSON(result)
                    //var jsondata_1 = JSON.stringify(result)
                    // var jsondata_1 = JSON.parse(result)
                    $(input).hide();
                    var F_ile = result.URL
                    var extention = F_ile.substr(F_ile.indexOf(".") + 1)
                    if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
                        $('.foto-disp[itemid=' + itemnum + ']').attr('src', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                        $('.foto-disp[itemid=' + itemnum + ']').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                        $('.foto-disp[itemid=' + itemnum + ']').parent().prepend('<i class="fa fa-close" onclick=removeF(' + itemnum + ') aria-hidden="true" style="color:red;"></i>')
                    }
                    if (extention == "docx" || extention == "doc") {
                        $('.foto-disp[itemid=' + itemnum + ']').attr('src', window.location.protocol + '//' + window.location.host + '/img/word.png')
                        $('.foto-disp[itemid=' + itemnum + ']').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                        $('.foto-disp[itemid=' + itemnum + ']').parent().prepend('<i class="fa fa-close" onclick=removeF(' + itemnum + ') aria-hidden="true" style="color:red;"></i>')
                    }
                    if (extention == "xlsx" || extention == "xls") {
                        $('.foto-disp[itemid=' + itemnum + ']').attr('src', window.location.protocol + '//' + window.location.host + '/img/excel.png')
                        $('.foto-disp[itemid=' + itemnum + ']').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                        $('.foto-disp[itemid=' + itemnum + ']').parent().prepend('<i class="fa fa-close" onclick=removeF(' + itemnum + ') aria-hidden="true" style="color:red;"></i>')
                    }
                    if (extention == "pdf" || extention == "PDF") {
                        $('.foto-disp[itemid=' + itemnum + ']').attr('src', window.location.protocol + '//' + window.location.host + '/img/pedefe.png')
                        $('.foto-disp[itemid=' + itemnum + ']').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                        $('.foto-disp[itemid=' + itemnum + ']').parent().prepend('<i class="fa fa-close" onclick=removeF(' + itemnum + ') aria-hidden="true" style="color:red;"></i>')
                    }
                    if (extention == "txt" || extention == "TXT") {
                        $('.foto-disp[itemid=' + itemnum + ']').attr('src', window.location.protocol + '//' + window.location.host + '/img/texete.png')
                        $('.foto-disp[itemid=' + itemnum + ']').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                        $('.foto-disp[itemid=' + itemnum + ']').parent().prepend('<i class="fa fa-close" onclick=removeF(' + itemnum + ') aria-hidden="true" style="color:red;"></i>')
                    }
                    //$("#hdPr2").show()
                    //$("#zImg2").show()
                    //$("#files2").show()
                    var imgslenght = $("#imgss ").find('img').length;
                    if (imgslenght != 5) {
                        // imgslenght++
                        var lastImgItem = $("#imgss").find("img:last").attr("itemid");
                        lastImgItem++;
                        $(input).after('<div class="col-xs-2" id="zImg"><img class="foto-disp" itemid=' + imgslenght + '  data-url="0"  src="../Files/upl.png"></div><input itemid=' + itemnum + ' onchange=readUrlAll(this,' + imgslenght + ') class="knop"   style="margin-left: 9vw;" type="file" />')
                    }
                    $("#loader").hide();

                },

                error: function (datas) {


                    console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

                    var filePath = $(input).val();
                    var index = filePath.lastIndexOf("\\") + 1;
                    var filename = filePath.substr(index);
                    readURL(input, filename)
                    /*

    
    

    readURL(this, filename);*/


                },
                failure: function (r) {
                    alert("FAIL");
                }
            });
        }
    }
}
function MaskPhone(e) {
    $(e).inputmask("+7(999) 999-99-99");
}
function GetRelatedSets(selected, Obj, resp) {
    var o = { "obj": Obj }
    $.ajax({
        type: "POST",
        url: "CreateRequest.aspx/GetRelatedSets",
        data: JSON.stringify(o),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d);
            $('#Sets').empty();
            $('#Sets').append('<option value="0">Выберите Направление</option>')
            for (var i = 0; i < j.length; i++) {

                $('#Sets').append('<option value=' + j[i].SERVICE_SET_ID + ' data-r=' + j[i].LOG_IN_ID + ' data-ac=\"' + j[i].ACCOUNT_NAME + '\">' + j[i].SERVICE_SET_NAME + '</option>')
            }

            if (selected != "") {
                $('#Sets').val(selected);
                if (resp == "yes") {
                    getResponsibels_($('#Sets option:selected').attr('data-r'))
                }
                $('#Sets').attr('onchange', 'GetRelatedDirects(' + selected + ',this,' + Obj + ')')
            }

        }
    })
}
function getResponsibels_(s) {
    $.ajax({
        type: "POST",
        url: "CreateRequest.aspx/GetResponsibels_",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var j = JSON.parse(data.d);
            $('#Otven').empty();
            for (var i = 0; i < j.length; i++) {
                var has=false
                if ($('#Otven option').length != 0) {
                    $('#Otven option').each(function () {
                        var login = $(this).attr('value')
                        if (login != j[i].LOG_IN_ID) {
                            has = true;
                           
                        }
                    })

                }
                else {
                    $('#Otven').append('<option value=' + j[i].LOG_IN_ID + '>' + j[i].ACCOUNT_NAME + '</option>');
                }
                if (has==true) {
                    $('#Otven').append('<option value=' + j[i].LOG_IN_ID + '>' + j[i].ACCOUNT_NAME + '</option>');
                }

            }
            if (s != undefined && s != "") {
                $('#Otven').val(s)
            }
        }
    })
}
function GetRelatedDirects(selected, e, objId, resp, issearch) {
    $('#total').remove();
    if ($(e).val() != 0) {
        if (resp != "no") {
            var responsId = $('option:selected', e).attr('data-r');
            resp = (resp == undefined) ? responsId : resp;

            getResponsibels_(resp)
        }
        $('#Set_S').remove();
        $(e).next().remove();
        var Obj = { "ss": $(e).val(), 'obj': objId }
        $.ajax({
            type: "POST",
            url: "CreateRequest.aspx/GetExistSeriveDirect",
            data: JSON.stringify(Obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var j = JSON.parse(data.d)
                if (j.length > 4) {
                    $('#Sets').after('<div class="col-md-12"><div id="left" class="col-md-6"></div><div id="right" class="col-md-6"></div></div>')
                    for (var i = 0; i < j.length; i++) {
                        if (i % 2 == 0) {
                            $('#left').append('<div data-d=' + j[i].DIRECTION_ID + ' onclick="getServices(this,' + j[i].DIRECTION_ID + ')" data-active="on" class="accMenu"> </i><input type="checkbox" class="chkDirect" style="float:left;margin-right: 10px;" onclick="selectDirectOnly(this)" > <img src=' + j[i].ICON_ADRESS + '   class="icon">' + j[i].DIRECTION_NAME + ' <i class="fa fa-chevron-down GrupOpenIcon" aria-hidden="true"   </div>')
                        }
                        else {
                            $('#right').append('<div data-d=' + j[i].DIRECTION_ID + ' onclick="getServices(this,' + j[i].DIRECTION_ID + ')" data-active="on" class="accMenu"><input type="checkbox"  class="chkDirect" style="float:left;margin-right: 10px;" onclick="selectDirectOnly(this)"> <img src=' + j[i].ICON_ADRESS + '   class="icon">' + j[i].DIRECTION_NAME + ' <i class="fa fa-chevron-down GrupOpenIcon" aria-hidden="true"    ></i></div>')
                        }
                    }
                }
                else {
                    $('#Sets').after('<div class="col-md-12"><div id="left" class="col-md-6"></div><div id="right" class="col-md-6"></div></div><br/>')
                    for (var i = 0; i < j.length; i++) {

                        $('#left').append('<div data-d=' + j[i].DIRECTION_ID + ' onclick="getServices(this,' + j[i].DIRECTION_ID + ')" data-active="on" class="accMenu"><input type="checkbox" class="chkDirect" style="float:left;margin-right: 10px;" onclick="selectDirectOnly(this)" > <img src=' + j[i].ICON_ADRESS + '   class="icon">' + j[i].DIRECTION_NAME + ' <i class="fa fa-chevron-down GrupOpenIcon" aria-hidden="true"   ></i></div>')

                    }
                }
                var rid = sessionStorage.getItem("RId")
                var showAllLength = $('#showAll').length
                var st = sessionStorage.getItem("st");
                //if (rid.length != 0 && selected != 0 && showAllLength == 0 && st==2) {
                ////    $('#showAll').remove();
                //    $('.accMenu').parent().append('<input type="button" id="showAll" onclick="showAllServices()" class="btn genBtn" value="Изменить Группа Услуг"/>')
                //}

                if (selected != 0) {

                    if (st == 1) {
                        $('.accMenu').removeAttr('onclick').children('input[type="checkbox"]').hide();
                    }
                    if (st == 2) {
                        //alert('2')
                     var issearch2=   $(e).attr('data-search')
                        if (issearch2 == undefined) {
                              $('.accMenu').hide();
                            $('.accMenu[data-d="' + selected + '"]').show();
                            $('.accMenu[data-d="' + selected + '"]').parent().append('<input type="button" onclick="showAllServices()" class="btn genBtn" value="Изменить Группу Услуг"/>')
                            $('.accMenu[data-d="' + selected + '"]').children('input[type="checkbox"]').prop('checked', true);
                        }
                        if (issearch2=="Set") {
                            $('.accMenu').removeAttr('onclick').children('input[type="checkbox"]').hide();
                        }
                        
                        if (issearch2 == "search") {
                            // $('.accMenu[data-d="' + selected + '"]').children('input[type="checkbox"]').prop('checked', true);
                            $('.accMenu[data-d="' + selected + '"]').children('input[type="checkbox"]').click();
                        }
                        if (issearch2 == "Ssearch") {
                            $('.accMenu[data-d="' + selected + '"]').click();


                        }
                    }
                    else {
                        if (issearch == undefined) {
                            $('.accMenu').hide();
                            $('.accMenu[data-d="' + selected + '"]').show();
                            $('.accMenu').removeAttr('onclick').children('input[type="checkbox"]').hide();
                            $('.accMenu').children('.fa').hide();
                        }
                        if (issearch == "search") {
                            // $('.accMenu[data-d="' + selected + '"]').children('input[type="checkbox"]').prop('checked', true);
                            $('.accMenu[data-d="' + selected + '"]').children('input[type="checkbox"]').click();
                        }
                        if (issearch == "Ssearch") {
                            $('.accMenu[data-d="' + selected + '"]').click();

                           
                        }
                    }
                    if (st == 3) {
                        $('.accMenu[data-d="' + selected + '"]').removeAttr('onclick');
                    }
                    if (st == 4 || st == 5) {
                        $('.accMenu[data-d="' + selected + '"]').removeAttr('onclick');
                    }
                }
                if (selected == 0 && rid != null && st != 2) {
                    $('.accMenu').removeAttr('onclick').children('input[type="checkbox"]').hide();
                }
            }
        })

        $('#PrServiceH').removeAttr('data-d')
        $('#PrServiceH').show()
        $('#PrServiceH tbody').empty();
        $('#PrServiceH thead tr th:eq(3)').show();
        $('#PrServiceH thead tr th:eq(0)').text('Наименование направления')
        $('#PrServiceH thead tr').each(function () {
            $(this).children('th:eq(1),th:eq(2)').hide();

        })

        if (issearch == undefined) {
        $('#PrServiceH').attr('data-s', $(e).val())
        }

        $('#PrServiceH tbody').append('<tr><td data-s=' + $(e).val() + '>' + $(e).children(':selected').text() + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
    }
    else {
        $(e).next().remove();
        $('#PrServiceH').hide().removeAttr('data-d');
        $('#PrServiceH').hide().removeAttr('data-s');
        $('#PrServiceH thead tr th:eq(0)').text('Наименование услуги')
        $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2),#PrServiceH thead tr th:eq(3)').show()
        $('#PrServiceH tbody tr').each(function () {
            $(this).children('td:eq(1),td:eq(2),td:eq(3)').show();
        })
    }
    $('#total').remove();
    var totalCost = 0
    $("#PrServiceH tbody tr").each(function () {
        var cost = (isNaN($(this).children('td:eq(3)').text())) ? "0.00" : $(this).children('td:eq(3)').text();
        totalCost = parseFloat(totalCost) + parseFloat(cost)
        totalCost = (isNaN(totalCost)) ? "0.00" : totalCost
    })
    $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + totalCost + '  руб</label>')


}
function SearchServsForJsTree(e) {
    var value = $(e).val()
    $('#NewServs').jstree(true).search(value);
}
function Give_Selected_Set_Direct_Service_For_Search(objid) {
    var Obj = { "objid": objid }
    $.ajax({
        type: "POST",
        url: "CreateRequest.aspx/Give_Selected_Set_Direct_Service_For_Search",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jdata = JSON.parse(data.d)
            // jdata = JSON.stringify(jdata)
           // console.log(jdata);
            $('#NewServs').jstree({
                'core': {
                    //  'loaded_state' : true,

                    'data': jdata
                },
                'checkbox': { three_state: false },
                'plugins': ["search", "checkbox"]
            })

            $('#SearchProduct').attr('onkeyup', 'SearchServsForJsTree(this)')
        }
    })



}
function RemoveSetRow(e) {
    $('#total').remove();
    $('#PrServiceH').hide().removeAttr('data-s');
    $(e).parent().parent().remove();
    var tr = $('#PrServiceH tbody tr').length
    if (tr == 0) {
        $('#PrServiceH').show();
        $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').hide();
        $('#PrServiceH thead tr th:eq(0)').text('Наименование Направления')
        var sid = $('#Sets').val();
        $('#PrServiceH').attr('data-s', sid)
        //$('#PrServiceH').hide();
        $('#PrServiceH tbody').append('<tr><td data-s=' + $('#Sets').val() + '>' + $('#Sets').children(':selected').text() + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

    }
}

function selectDirectOnly(e) {
    $('#PrServiceH').removeAttr('data-s')
    var dataD = $('#PrServiceH').attr('data-d')

    var grupchecked = false
    $('#left,#right').children('div').each(function () {
        $(this).attr('data-active', 'on')
        $(this).children('.GrupOpenIcon').attr('class', 'fa fa-chevron-down GrupOpenIcon')
        grupchecked = $(this).children('input[type="checkbox"]').prop('checked');
        var Grupid = $(this).children('input[type="checkbox"]').parent().attr('data-d');
        if (grupchecked == true && Grupid != $(e).parent().attr('data-d')) {
            // alert('secili olan grup var')
            grupchecked = $(this).text()
            return false;
        }
    })

    var countOfdirect = $('#PrServiceH tbody tr').length;
    if (dataD == undefined && grupchecked == false) {
        if ($(e).prop('checked') == true) {
            var dataD = $(e).parent().attr('data-d');
            var DName = $(e).parent().text();
            $('#PrServiceH tbody').empty();
            $('#PrServiceH').show().attr('data-d', dataD);
            $('#PrServiceH thead tr th:eq(0)').text('Наименование группа услуг')
            $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').hide()
            //if ($('#PrServiceH tbody tr').length != 0) {
            //    $('#PrServiceH tbody tr').each(function ()
            //    {
            //        $(this).children('td:last').children('.btn').click();
            //    })
            //    }
            $('#PrServiceH tbody tr').each(function () {
                $(this).children('td:eq(1),td:eq(2)').hide();
            })
            $('#PrServiceH tbody').append('<tr><td data-d=' + dataD + '>' + DName + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-d=' + dataD + ' onclick="RemoveDirectRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
            $('#left,#right').children('div').each(function () {

                $(this).children('input[type="checkbox"]').prop('checked', false)

            })

            $('#subMenu').remove();

            $(e).prop('checked', true)

        }
        else {
            $('#PrServiceH tbody').empty();
            $('#PrServiceH').hide().removeAttr('data-d');
            $('#PrServiceH thead tr th:eq(0)').text('Наименование услуги')
            $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2),#PrServiceH thead tr th:eq(3)').show()
            $('#PrServiceH tbody tr').each(function () {
                $(this).children('td:eq(1),td:eq(2),td:eq(3)').show();
            })



        }
    }
    else {
        var sDataD = $(e).parent().attr('data-d');
        var oldGrup = $('#PrServiceH tbody tr:eq(0) td:eq(0)').text();
        if (sDataD == dataD) {
            $('#PrServiceH tbody').empty();
            $('#PrServiceH').hide().removeAttr('data-d');
            $('#PrServiceH thead tr th:eq(0)').text('Наименование услуги')
            $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2),#PrServiceH thead tr th:eq(3)').show()
            $('#PrServiceH tbody tr').each(function () {
                $(this).children('td:eq(1),td:eq(2),td:eq(3)').show();
            })
        }
        else {
            var oldGrup = $('#PrServiceH tbody tr:eq(0) td:eq(0)').text();
            var newGrup = $(e).parent().text()
            if (oldGrup!='-') {
                var resultZ = confirm('Вы действительно хотите изменить группу услуг с "' + oldGrup + '" на "' + newGrup + '"?');
            }
            else {
                resultZ=true
            }
            if (resultZ == true) {
                if ($(e).prop('checked') == true) {

                    var dataD = $(e).parent().attr('data-d');
                    var DName = $(e).parent().text();
                    $('#PrServiceH tbody').empty();
                    $('#PrServiceH').show().attr('data-d', dataD);
                    $('#PrServiceH thead tr th:eq(0)').text('Наименование группа услуг')
                    $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').hide()
                    //if ($('#PrServiceH tbody tr').length != 0) {
                    //    $('#PrServiceH tbody tr').each(function ()
                    //    {
                    //        $(this).children('td:last').children('.btn').click();
                    //    })
                    //    }
                    $('#PrServiceH tbody tr').each(function () {
                        $(this).children('td:eq(1),td:eq(2)').hide();
                    })
                    $('#PrServiceH tbody').append('<tr><td data-d=' + dataD + '>' + DName + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-d=' + dataD + ' onclick="RemoveDirectRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
                    $('#left,#right').children('div').each(function () {

                        $(this).children('input[type="checkbox"]').prop('checked', false)

                    })
                    //$('#subMenu').children('div').each(function () {
                    //    $(this).children('input[type="checkbox"]').prop('checked', false)
                    //})
                    //var dataD = $(e).parent().attr('data-d');
                    //var DName = $(e).parent().text();
                    //$('#PrServiceH tbody').empty();
                    //$('#PrServiceH').show().attr('data-d', dataD);
                    //$('#PrServiceH thead tr th:eq(0)').text('Наименование группа услуг')
                    //$('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2),#PrServiceH thead tr th:eq(3)').hide()
                    ////if ($('#PrServiceH tbody tr').length != 0) {
                    ////    $('#PrServiceH tbody tr').each(function ()
                    ////    {
                    ////        $(this).children('td:last').children('.btn').click();
                    ////    })
                    ////    }
                    //$('#PrServiceH tbody tr').each(function () {
                    //    $(this).children('td:eq(1),td:eq(2),td:eq(3)').hide();
                    //})
                    //$('#PrServiceH tbody').append('<tr><td data-d=' + dataD + '>' + DName + '</td><td><a data-d=' + dataD + ' onclick="RemoveDirectRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
                    //$('#left,#right').children('div').each(function () {

                    //    $(this).children('input[type="checkbox"]').prop('checked', false)

                    //})

                    $('#subMenu').remove();

                    $(e).prop('checked', true)
                }
            }
            else {
                $(e).prop('checked', false)
                return false;
            }
        }

       
    }
    var tr = $('#PrServiceH tbody tr').length
    if (tr == 0) {
        $('#PrServiceH').show();
        $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').hide();
        $('#PrServiceH thead tr th:eq(0)').text('Наименование Направления')
        var sid = $('#Sets').val();
        $('#PrServiceH').attr('data-s', sid)
        //$('#PrServiceH').hide();
        $('#PrServiceH tbody').append('<tr><td data-s=' + $('#Sets').val() + '>' + $('#Sets').children(':selected').text() + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

    }
    $('#total').remove();
    var totalCost = 0
    $("#PrServiceH tbody tr").each(function () {
        var cost = (isNaN($(this).children('td:eq(3)').text())) ? "0.00" : $(this).children('td:eq(3)').text();
        totalCost = parseFloat(totalCost) + parseFloat(cost)
        totalCost = (isNaN(totalCost)) ? "0.00" : totalCost
    })
    $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + totalCost + '  руб</label>')


}
function RemoveDirectRow(e) {
    $('#total').remove();
    $('#PrServiceH').removeAttr('data-d')
    $('#left,#right').children('div').each(function () {

        $(this).children('input[type="checkbox"]').prop('checked', false)

    })
    $('#PrServiceH tbody').empty();
    $('#PrServiceH tbody').empty();
    $('#PrServiceH thead tr th:eq(3)').show();
    $('#PrServiceH thead tr th:eq(0)').text('Наименование  направления')
    var sid = $('#Sets').val();
    $('#PrServiceH').attr('data-s', sid)
    //$('#PrServiceH').hide();
    $('#PrServiceH tbody').append('<tr><td data-s=' + $('#Sets').val() + '>' + $('#Sets').children(':selected').text() + '</td><td style="width:120px;text-align:center;"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

}

function fileForZakrit(e) {
    var filePath = $(e).val();
    var index = filePath.lastIndexOf("\\") + 1;
    var filename = filePath.substr(index);
    readU_RLZakrit(e, filename);
}
function readU_RLZakrit(input, imgName) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {
            //  $('.foto-disp').attr('src', e.target.result);
            //var nameImg = imgName
            //var arrayBuffer = reader.result
            //var bytes = new Uint8Array(arrayBuffer);
            //var obj = { baseString: bytes, imgName: nameImg };
            var formData = new FormData();
            var file = document.getElementById("f_iles2").files[0];

            formData.append('file', file, encodeURI(file.name));
            formData.append('object_id', '1');
            //console.log(formData);
            $.ajax({
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
                data: formData,
                type: 'POST',
                contentType: "multipart/form-data",
                processData: false,
                // async: false,
                success: function (result) {


                    //alert("OK. See Console -  press F12");
                    console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    //var jsondata_1 = jQuery.parseJSON(result)
                    //var jsondata_1 = JSON.stringify(result)
                    // var jsondata_1 = JSON.parse(result)
                    ///
                    var itemnum2 = $(".modal-body2 > img:first").attr("itemid");
                    if (itemnum2 == undefined) {
                        itemnum2 = 0;
                        itemnum2++;
                    }
                    else {
                        itemnum2++;
                    }
                    var F_ile = result.URL
                    //var FileName = $("#f_iles2").val();
                    // FileName = FileName.substr(FileName.lastIndexOf("\\",))  <h4 itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4>
                    var extention = F_ile.substr(F_ile.indexOf(".") + 1)
                    if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
                        $("#cmntsts2").after('<br><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + '  src=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i>')
                    }
                    if (extention == "docx" || extention == "doc") {
                        $("#cmntsts2").after('<br><h4 itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' src="' + window.location.protocol + '//' + window.location.host + '/img/word.png"style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i>')

                    }
                    if (extention == "xlsx" || extention == "xls") {
                        $("#cmntsts2").after('<br><h4 itemid="' + itemnum2 + '" itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png"style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i>')

                    }
                    if (extention == "pdf" || extention == "PDF") {
                        $("#cmntsts2").after('<br><h4 itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png" style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i>')

                    }
                    if (extention == "txt" || extention == "TXT") {
                        $("#cmntsts2").after('<br><h4 itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png"style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i>')

                    }
                    var allOfImgs = $('.modal-body2 > img').length;
                    if (allOfImgs == 5) {
                        $("#f_iles2").hide();
                    }
                    //  $('.foto-disp').attr('src', )
                    $("#loader").hide();

                },

                error: function (datas) {

                    //datas = JSON.stringify(datas, null, 2)
                    ////var rt = datas.responseText
                    ////rt = JSON.parse(rt);
                    ////$(".foto-disp").attr('src', rt.URL.replace('~', '..'))
                    //Addimage2(datas);
                    console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

                    var filePath = $('#f_iles2').val();
                    var index = filePath.lastIndexOf("\\") + 1;
                    var filename = filePath.substr(index);
                    readU_RLZakrit(input, filename)
                },
                failure: function (r) {
                    alert("FAIL");
                }
            });


        }


    }
}
function FileForOtmen(e) {
    var filePath = $(e).val();
    var index = filePath.lastIndexOf("\\") + 1;
    var filename = filePath.substr(index);
    readU_RLOtmen(e, filename)
}
function readU_RLOtmen(input, imgName) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {
            //  $('.foto-disp').attr('src', e.target.result);
            //var nameImg = imgName
            //var arrayBuffer = reader.result
            //var bytes = new Uint8Array(arrayBuffer);
            //var obj = { baseString: bytes, imgName: nameImg };
            var formData = new FormData();
            var file = document.getElementById("f_iles2").files[0];

            formData.append('file', file, encodeURI(file.name));
            formData.append('object_id', '1');
            //console.log(formData);
            $.ajax({
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
                data: formData,
                type: 'POST',
                contentType: "multipart/form-data",
                processData: false,
                // async: false,
                success: function (result) {


                    //alert("OK. See Console -  press F12");
                    //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    //var jsondata_1 = jQuery.parseJSON(result)
                    //var jsondata_1 = JSON.stringify(result)
                    // var jsondata_1 = JSON.parse(result)
                    ///
                    var itemnum2 = $(".modal-body2 > img:first").attr("itemid");
                    if (itemnum2 == undefined) {
                        itemnum2 = 0;
                        itemnum2++;
                    }
                    else {
                        itemnum2++;
                    }
                    var F_ile = result.URL
                    //var FileName = $("#f_iles2").val();
                    // FileName = FileName.substr(FileName.lastIndexOf("\\",))  <h4 itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4>
                    var extention = F_ile.substr(F_ile.indexOf(".") + 1)
                    if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
                        $("#cmntsts2").after('<br><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + '  src=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i>')
                    }
                    if (extention == "docx" || extention == "doc") {
                        $("#cmntsts2").after('<br><h4 itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' src="' + window.location.protocol + '//' + window.location.host + '/img/word.png"style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i>')

                    }
                    if (extention == "xlsx" || extention == "xls") {
                        $("#cmntsts2").after('<br><h4 itemid="' + itemnum2 + '" itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png"style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i>')

                    }
                    if (extention == "pdf" || extention == "PDF") {
                        $("#cmntsts2").after('<br><h4 itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png" style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i>')

                    }
                    if (extention == "txt" || extention == "TXT") {
                        $("#cmntsts2").after('<br><h4 itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png"style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i>')

                    }
                    var allOfImgs = $('.modal-body2 > img').length;
                    if (allOfImgs == 5) {
                        $("#f_iles2").hide();
                    }
                    //  $('.foto-disp').attr('src', )
                    $("#loader").hide();

                },

                error: function (datas) {

                    //datas = JSON.stringify(datas, null, 2)
                    ////var rt = datas.responseText
                    ////rt = JSON.parse(rt);
                    ////$(".foto-disp").attr('src', rt.URL.replace('~', '..'))
                    //Addimage2(datas);
                    console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

                    var filePath = $('#f_iles2').val();
                    var index = filePath.lastIndexOf("\\") + 1;
                    var filename = filePath.substr(index);
                    readU_RLOtmen(input, filename)
                },
                failure: function (r) {
                    alert("FAIL");
                }
            });


        }


    }
}
function loadSuperDisp_Utilities_And_() {
  //  $('#body').load('../Super_Disp/CreateDispRequest.aspx #contentRegister')

    var script = document.createElement("script");
    script.src = "../Super_Disp/Utilities/SuperDisp_Utulities.js" //?+ Math.random();
    script.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(script);
}
function fileForVipol(e) {
    var filePath = $(e).val();
    var index = filePath.lastIndexOf("\\") + 1;
    var filename = filePath.substr(index);
    readU_RLVipol(e, filename)
}
function readU_RLVipol(input, imgName) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {
            //  $('.foto-disp').attr('src', e.target.result);
            //var nameImg = imgName
            //var arrayBuffer = reader.result
            //var bytes = new Uint8Array(arrayBuffer);
            //var obj = { baseString: bytes, imgName: nameImg };
            var formData = new FormData();
            var file = document.getElementById("f_iles2").files[0];

            formData.append('file', file, encodeURI(file.name));
            formData.append('object_id', '1');
            //console.log(formData);
            $.ajax({
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
                data: formData,
                type: 'POST',
                contentType: "multipart/form-data",
                processData: false,
                // async: false,
                success: function (result) {


                    //alert("OK. See Console -  press F12");
                    //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    //var jsondata_1 = jQuery.parseJSON(result)
                    //var jsondata_1 = JSON.stringify(result)
                    // var jsondata_1 = JSON.parse(result)
                    ///
                    var itemnum2 = $(".modal-body2 > img:first").attr("itemid");
                    if (itemnum2 == undefined) {
                        itemnum2 = 0;
                        itemnum2++;
                    }
                    else {
                        itemnum2++;
                    }
                    var F_ile = result.URL
                    //var FileName = $("#f_iles2").val();
                    // FileName = FileName.substr(FileName.lastIndexOf("\\",))  <h4 itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4>
                    var extention = F_ile.substr(F_ile.indexOf(".") + 1)
                    if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
                        $("#cmntsts2").after('<br><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + '  src=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i>')
                    }
                    if (extention == "docx" || extention == "doc") {
                        $("#cmntsts2").after('<br><h4 itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' src="' + window.location.protocol + '//' + window.location.host + '/img/word.png"style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i>')

                    }
                    if (extention == "xlsx" || extention == "xls") {
                        $("#cmntsts2").after('<br><h4 itemid="' + itemnum2 + '" itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png"style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i>')

                    }
                    if (extention == "pdf" || extention == "PDF") {
                        $("#cmntsts2").after('<br><h4 itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png" style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i>')

                    }
                    if (extention == "txt" || extention == "TXT") {
                        $("#cmntsts2").after('<br><h4 itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png"style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i>')

                    }
                    var allOfImgs = $('.modal-body2 > img').length;
                    if (allOfImgs == 5) {
                        $("#f_iles2").hide();
                    }
                    //  $('.foto-disp').attr('src', )
                    $("#loader").hide();

                },

                error: function (datas) {

                    //datas = JSON.stringify(datas, null, 2)
                    ////var rt = datas.responseText
                    ////rt = JSON.parse(rt);
                    ////$(".foto-disp").attr('src', rt.URL.replace('~', '..'))
                    //Addimage2(datas);
                    console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

                    var filePath = $('#f_iles2').val();
                    var index = filePath.lastIndexOf("\\") + 1;
                    var filename = filePath.substr(index);
                    readU_RLVipol(input, filename)
                },
                failure: function (r) {
                    alert("FAIL");
                }
            });


        }


    }
}