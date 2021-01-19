 

$(function () {

    $('#OutD').click(function () {
        window.location.href = '../HomePage.aspx';
    })
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


    var SLogId = sessionStorage.getItem("Log")
    var searchParams = new URLSearchParams(window.location.search)
    var eml = searchParams.get('eml')
    var role = sessionStorage.getItem("role")
    if (eml == null) {
    if (SLogId == null) {
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
                    SLogId = jsondata_[0].LOGIN_ID
                  //  ClId = jsondata_[0].CLIENT_ID
                    sessionStorage.setItem("Clien_ID", jsondata_[0].CLIENT_ID)
                    sessionStorage.setItem("Log", SLogId)
                    role = jsondata_[0].ROLE_
                    sessionStorage.setItem("role", jsondata_[0].ROLE_)
                    sessionStorage.setItem("REQUEST_ID", jsondata_[0].REQUEST_ID)
                    sessionStorage.setItem("REQUEST_STATUS", jsondata_[0].REQUEST_STATUS)
                }

            }
        })
    }
    var oobj3 = { lg: SLogId }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/GetDispName",
        data: JSON.stringify(oobj3),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var jsondata_2 = JSON.parse(result.d)
            $("#fiodsp").text(jsondata_2[0].ACCOUNT_NAME).attr('email', jsondata_2[0].E_MAIL);
        }
    })
    var loc = window.location.pathname;
    $("#flt").click(function () {
        var fltdisplay = $("#filter1").css("display")
        if (fltdisplay == 'none') {
            $("#filter1").show('1000');
        }
        else {
            $("#filter1").hide('1000');
        }
    })


    if (loc =='/Super_Disp/DispRequests.aspx') {
     //var oobj3 = { lg: SLogId }
     //   $.ajax({
     //       type: "POST",
     //       url: "../Super_Disp/CreateDispRequest.aspx/GetDispName",
     //       data: JSON.stringify(oobj3),
     //       contentType: "application/json; charset=utf-8",
     //       dataType: "json",
     //       success: function (result) {
     //           var jsondata_2 = JSON.parse(result.d)
     //           $("#fiodsp").text(jsondata_2[0].ACCOUNT_NAME).attr('email', jsondata_2[0].E_MAIL);
     //       }
     //   })
    }
    $("#lgId").text('Login_' + SLogId);
    //var obj_Chk = {
    //    Log: SLogId
    //};
   
        $('.ui-loader-background,#loader').show()
        var path = window.location.pathname.toString();
        var EVENT_MODULE = (path.indexOf("Manager/") > -1) ? "Manager" : (path.indexOf("Super_Disp/") > -1) ? "SuperDisp" : (path.indexOf("Responsible_Admin/") > -1) ? "Responsible" : (path.indexOf("Disp_Admin/") > -1) ? "Disp" : "Диспетчер поставщика";
        var obj_lg = {
            lg_: SLogId,
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


 
   
    

    $('.ui-loader-background,#loader').show()
    var page2 = getPageName2(loc)
    if (page2 != 'CreateRequest') { //|| page2 !='CreateDispRequest'
        localStorage.removeItem("RId");
        localStorage.removeItem("st")
    }
    
   // $(document).ready(GetDispsRequests(SLogId));

    //$(window).bind("load", function () {

    //    GetDispsRequests(SLogId)
    //});
    $("#filtering").click(function () {
        $('.formTable tr:not(:first)').remove();
        var firstname = $("#frstname").val();
        firstname = "\"" + firstname + "\"";
        var fltObj = [];
        fltObj.push({ "MOBILE_NUMBER":  $("#requestNumber").val(), "ROOM_NUMBER": $("#rmNum").val(), "OBJECT_ID": $("#object").val(), "ROOM_TYPE_ID": $("#rt").val(), "FIRST_NAME": $("#frstname").val(), "CR_DATE_FROM": $("#startTime").val(), "CR_DATE_TO": $("#endTime").val(), "STATUSE": $("#sts").val() })
        $('.ui-loader-background').show();
        $('#loader').show();
        var all = (window.location.pathname.indexOf('AllRequsts.aspx')!=-1)?1:0
        makefilter(fltObj, SLogId, role, all)
        //makefilter2(fltObj, LogId);
        //if ($("#requestNumber").val() == "" && $("#rmNum").val() == "" && $("#object").val() == 0 && $("#rt").val() == 0 && $("#frstname").val() && $("#startTime").val() == "" && $("#endTime").val() == "" && $("#sts").val()==0) {
        //    gtRequestTable2(LogId)
        //    getRequestTable(LogId)
        //}
    })

    $('#sbrflt').click(function () {
        $('.formTable tr:not(:first)').remove();
     
        var all = (window.location.pathname.indexOf('AllRequsts.aspx') != -1) ? 1 : 0
        if (role != 15) {
            alert('test 2 alert')
             GetDispsRequests(SLogId, role, all)
        }
        else {
            GetSuppRequests(SLogId, role, all)
        }
        $("#requestNumber").val("");
        $("#rmNum").val("");
        $("#object").val(0);
        $("#rt").val(0);
        $("#frstname").val("");
        $("#sts").val(0)
        $("#startTime").val("");
        $("#endTime").val("");

    })
    getcurrdspObjForFilter(SLogId, role)
    gtTypeOfroom();
    gtStatuses();
   
    $(document).ready(function ()
    {
        //$('#DispSRequestTables').moment('DD.MM.YYYY');
        $('body').append('<script src="../Disp_Admin/Script/date-de.js"></script>').append('<script src="../Disp_Admin/Script/natural.js"></script>')
        if (loc != '/Disp_Admin/AllRequsts.aspx') {
            if (role!=15) {
                GetDispsRequests(SLogId, role, 0)
            }
            else {
                GetSuppRequests(SLogId, role,0)
            }
        }
        else {
            if (role!=15) {
                GetDispsRequests(SLogId, role, 1)
            }
            else {
                GetSuppRequests(SLogId, role, 0)
            }
           
        }
        if (loc != '/Super_Disp/DispRequests.aspx' && loc != '/Super_Disp/CreateDispRequest.aspx') {
            $('#contentRegister').css('width', '100%')
        }
        if (loc == '/Responsible_Admin/Resp_Requests.aspx') {
            sessionStorage.removeItem("REQUEST_ID")
            sessionStorage.removeItem("REQUEST_STATUS")
           // $('#createR').hide();
        }
    })
    
    //setTimeout(function () {
       
    //}, 500);
    $('#createR').click(function ()
    {
        if (loc != '/Super_Disp/DispRequests.aspx') {
            window.location.href = "CreateRequest.aspx"
        }
        else {
            window.location.href = "CreateDispRequest.aspx";
        }
    })
    

    //$(document).on('click', '#contentRegister #createR', function ()
    //{
    //    if (loc != '/Super_Disp/DispRequests.aspx') {
    //        window.location.href = "CreateRequest.aspx"
    //    }
    //    else {
    //        window.location.href = "CreateDispRequest.aspx";
    //    }
    //})
   
    //window.addEventListener('load', function () {
    //    GetDispsRequests(SLogId);
    //})

     
})
//document.write('<' + 'script type="../Disp_Admin/Script/date-de.js"></' + 'script>')
function makefilter(objfilt, lg, role, all) {
    var obj = { "flt": objfilt, "Log": lg, "role":role,"all":all }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/DispRequests.aspx/Filtering",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            console.log(jsondata_)

            $('#DispSRequestTables').dataTable({

                "destroy": true,
                data: jsondata_,
                "aaSorting": [],
                "aoColumnDefs": [
                    { "sType": "date", "aTargets": [4, 6] }
                ],
                "deferRender": true,
                columns: [{

                    'data': 'MOBILE_NUMBER',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";//' + emergency + ' 
                        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.MOBILE_NUMBER + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.MOBILE_NUMBER + '</a>');
                    }

                },


                {

                    'data': 'FIRST_NAME',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.FIRST_NAME + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.FIRST_NAME + '</a>');
                    }
                },
                {

                    'data': 'OBJECT_ADRESS',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.OBJECT_ADRESS + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.OBJECT_ADRESS + '</a>');
                    }
                },
                {

                    'data': 'ROOM_NUMBER',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.ROOM_NUMBER + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.ROOM_NUMBER + '</a>');
                    }
                },
                {

                    'data': 'CR_DATE',


                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency + ' onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.CR_DATE.substring(0, oData.CR_DATE.indexOf(' ')) + '</a>');
                    }
                },
                {

                    'data': 'REQUEST_TEXT',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.REQUEST_TEXT + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.REQUEST_TEXT + '</a>');
                    }
                },

                {

                    'data': 'PLAN_END_DATE',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency + ' onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.PLAN_END_DATE.substring(0, 10) + '</a>');
                    }
                },
                {

                    'data': 'REQUEST_TYPE',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.REQUEST_TYPE + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.REQUEST_TYPE + '</a>');
                    }


                },
                {

                    'data': 'STATUS',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#"' + emergency + ' title =\"' + oData.STATUS + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.STATUS + '</a>');
                    }
                },
                {

                    'data': 'RESPONSIBLE_NAME',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.RESPONSIBLE_NAME + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.RESPONSIBLE_NAME + '</a>');
                    }


                },
                {

                    'data': 'PAYMENT',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var PAYED = (oData.PAYMENT != "0" && oData.PAYMENT != "") ? '<span class="glyphicon glyphicon-ok"></span>' : "";
                        $(nTd).html('<a href="#" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + PAYED + '</a>');
                    }


                }



                ],

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
                $('.ui-loader-background').hide();
                $('#loader').hide();
        }


        
    })
}

function getcurrdspObjForFilter(lgId, role) {
    var obj = { "lg": lgId, "role": role }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/DispRequests.aspx/getObjectDisp",
        data: JSON.stringify(obj),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d);
            for (var i = 0; i < j.length; i++) {
                $('#object').append('<option value=' + j[i].OBJECT_ID + '>' + j[i].OBJECT_ADRESS + '</option>')
            }

        }
    })
}
function gtTypeOfroom() {

    $.ajax({
        type: "POST",
        url: "../Disp_Admin/RegisterRequest.aspx/getRoomTypes",

        contentType: "application/json; charset=utf-8",

        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // console.log(jsondata_)

            for (var i = 0; i < jsondata_.length; i++) {
                $("#rt").append('<option value="' + jsondata_[i].ROOM_TYPE_ID + '">' + jsondata_[i].ROOM_TYPE + '</option>')

            }



        }

    })
}
function gtStatuses() {
    $.ajax({
        type: "POST",
        url: "../Disp_Admin/RegisterRequest.aspx/getStatuses",

        contentType: "application/json; charset=utf-8",

        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // console.log(jsondata_)

            for (var i = 0; i < jsondata_.length; i++) {
                $("#sts").append('<option value="' + jsondata_[i].STATUS_ID + '">' + jsondata_[i].STATUS + '</option>')

            }



        }

    })
}
function SendId(RId, st) {
    
    // alert("supplier")
   // var page = getPageName2(window.location.pathname)
//  localStorage.setItem("st", st)
 // localStorage.setItem("RId", RId);
    //appDatas = { st: st, RId: RId }
    //$('body').data("appDatas",appDatas)
    //var test = $('body').data("appDatas")
    //if (page !="DispRequests") {

    //    window.location.href = "CreateRequest.aspx?RId=" + RId + "&st=" + st
    //}
    //else {
    //    window.location.href = "CreateDispRequest.aspx?RId=" + RId + "&st=" + st
    //}
   
  //  window.location.href = "CreateDispRequest.aspx?RId=" + RId + "&st=" + st

    var loc = window.location.pathname
    var back = (loc.indexOf('Responsible') != -1 || loc.indexOf('Manager') != -1 || loc.indexOf('Disp_Admin') != -1) ? 'CreateRequest.aspx' : 'CreateDispRequest.aspx' //(loc.indexOf('Super_Disp') != -1) ? 'CreateDispRequest.aspx' : 'SRequests.aspx'
   // console.log(back)
    window.location.href = back + "?RId=" + RId + "&st=" + st
}
function GetSuppRequests(lg, rl, all)
{
    var obj = {
        lg: lg,
        role: rl,
        all: all
    };
    $.ajax({
        type: "POST",
        url: "../Super_Disp/DispRequests.aspx/GetDispsRequests",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {



            var jsondata_ = JSON.parse(data.d);//JSON.parse(data_test)//
            //console.log(jsondata_)
            var whichClick = (rl == 17) ? "CLICK_SUPERDISP" : (rl == 3) ? "CLICK_DISP" : (rl == 15) ? "CLICK_SUPPDISP" : (rl == 16) ? "CLICK_RESP" : "CLICK_MANAGER"
            $('#DispSRequestTables').dataTable({

                "destroy": true,
                data: jsondata_,
                "order": [[4, "desc"]],
                columnDefs: [
                    { type: 'de_date', targets: 6 },
                    { type: 'de_date', targets: 4 },
                    { type: 'natural', targets: 3 },
                    { type: 'natural', targets: 0 }],
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                    //   console.log(data["FIRST_NAME"])


                    if (data[whichClick] == "" || data[whichClick] == "False") {
                        $(row).addClass('NewRequest');
                    }


                },
                columns: [{

                    'data': 'MOBILE_NUMBER',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";//' + emergency + ' 
                        var mobileNumber = (oData[whichClick] == "" || oData[whichClick] == "False") ? oData.MOBILE_NUMBER + "*" : oData.MOBILE_NUMBER
                        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.MOBILE_NUMBER + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + mobileNumber + '</a>');
                    }

                },


                {

                    'data': 'FIRST_NAME',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.FIRST_NAME + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.FIRST_NAME + '</a>');
                    }
                },
                {

                    'data': 'OBJECT_ADRESS',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.OBJECT_ADRESS + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.OBJECT_ADRESS + '</a>');
                    }
                },
                {

                    'data': 'ROOM_NUMBER',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.ROOM_NUMBER + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.ROOM_NUMBER + '</a>');
                    }
                },
                {

                    'data': 'CR_DATE',


                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency + ' onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.CR_DATE + '</a>');//.substring(0,10)
                    }
                },
                {

                    'data': 'REQUEST_TEXT',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.REQUEST_TEXT + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.REQUEST_TEXT + '</a>');
                    }
                },
                    //{

                    //    'data': 'RESPONSIBLE_NAME',
                    //    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                    //        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                    //        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.RESPONSIBLE_NAME + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.RESPONSIBLE_NAME + '</a>');
                    //    }


                    //},

                {

                    'data': 'PLAN_END_DATE',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        var plandate = (oData.PLAN_END_DATE == '01.01.1900') ? oData.CR_DATE : oData.PLAN_END_DATE
                        $(nTd).html('<a href="#" ' + emergency + ' onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + plandate + '</a>');//.substring(0, 10)
                    }
                },
               
                {

                    'data': 'STATUS',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        //#fb1700
                        var color = (oData.STATUS_ID == "4") ? 'black_' : (oData.STATUS_ID == "3") ? "orange" : (oData.STATUS_ID == "2") ? "yellow" : (oData.STATUS_ID == "1") ? "blue" : "green";
                        var circul = '<span class="circ ' + color + '"></span>'
                        $(nTd).html('<a href="#"' + emergency + ' title =\"' + oData.STATUS + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + circul + '' + oData.STATUS + '</a>');
                    }
                },
               
                {

                    'data': 'PAYMENT',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var PAYED = (oData.PAYMENT != "0" && oData.PAYMENT != "") ? '<span class="glyphicon glyphicon-ok"></span>' : "";
                        $(nTd).html('<a href="#" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + PAYED + '</a>');
                    }


                }



                ],

                "language": {
                    // "url":"//cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
                    "url": "http://cdn.datatables.net/plug-ins/1.10.20/i18n/Russian.json",
                    //"processing": "Подождите...",
                    //"search": "Поиск",
                    //"lengthMenu": "Показать по _MENU_ заявок",
                    //"info": "Заявки с _START_ до _END_ из _TOTAL_ заявок",
                    //"infoEmpty": "Заявки с 0 до 0 из 0 заявок",
                    //"infoFiltered": "(отфильтровано из _MAX_ записей)",
                    //"infoPostFix": "",
                    //"loadingRecords": "Загрузка записей...",
                    //"zeroRecords": "Записи отсутствуют.",
                    //"emptyTable": "В таблице отсутствуют данные",
                    //"paginate": {
                    //    "first": "Первая",
                    //    "previous": "Предыдущая",
                    //    "next": "Следующая",
                    //    "last": "Последняя"
                    //},
                    //"aria": {
                    //    "sortAscending": ": активировать для сортировки столбца по возрастанию",
                    //    "sortDescending": ": активировать для сортировки столбца по убыванию"
                    //}
                }
            })
            $('.ui-loader-background,#loader').hide()
        }
    })
}
function GetDispsRequests(lg,rl,all) {
    var obj = {
        lg: lg,
        role: rl,
        all: all
    };
    $.ajax({
        type: "POST",
        url: "../Super_Disp/DispRequests.aspx/GetDispsRequests",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
       
        success: function (data) {
           
           
           
            var jsondata_ = JSON.parse(data.d);//JSON.parse(data_test)//
           //console.log(jsondata_)
            var whichClick = (rl == 17) ? "CLICK_SUPERDISP" : (rl == 3) ? "CLICK_DISP" : (rl == 15) ? "CLICK_SUPPDISP" : (rl == 16) ? "CLICK_RESP" : "CLICK_MANAGER"
            //console.log(whichClick)
            $('#DispSRequestTables').dataTable({

                "destroy": true,
                data: jsondata_,
                "order": [[4, "desc"],],//[0, "desc"]
                columnDefs: [
                    { type: 'de_date', targets: 6 },
                    { type: 'de_date', targets: 4 },
                    { type: 'natural', targets: 3 },
                    { type: 'natural', targets: 0 }],
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                 //   console.log(data["FIRST_NAME"])
                   
                    
                    if (data[whichClick] == "" || data[whichClick] == "False") {
                           $(row).addClass('NewRequest');
                        }
                    
                     
                },
                columns: [{

                    'data': 'MOBILE_NUMBER',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        
                       // console.log(oData["CLICK_SUPERDISP"])
                       
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";//' + emergency + '
                        var mobileNumber = (oData[whichClick] == "" || oData[whichClick] == "False") ? oData.MOBILE_NUMBER + "*" : oData.MOBILE_NUMBER
                        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.MOBILE_NUMBER + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + mobileNumber + '</a>');
                    }
                    
                },


                {

                    'data': 'FIRST_NAME',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.FIRST_NAME + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.FIRST_NAME + '</a>');
                    }
                },
                {

                    'data': 'OBJECT_ADRESS',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : ""; 
                        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.OBJECT_ADRESS + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.OBJECT_ADRESS + '</a>');
                    }
                },
                {

                    'data': 'ROOM_NUMBER',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency + ' title=\"' + oData.ROOM_NUMBER + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.ROOM_NUMBER + '</a>');
                    }
                },
                {

                    'data': 'CR_DATE',
                    

                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var CR_DATE = oData.CR_DATE
                        CR_DATE = CR_DATE.substr(0, 10);
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency + ' onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + CR_DATE + '</a>');//.substring(0,10)
                    }
                },
                {

                    'data': 'REQUEST_TEXT',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" '+emergency+' title=\"' + oData.REQUEST_TEXT + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.REQUEST_TEXT + '</a>');
                    }
                },

                {

                    'data': 'PLAN_END_DATE',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        var plandate = (oData.PLAN_END_DATE == '01.01.1900') ? oData.CR_DATE : oData.PLAN_END_DATE
                        $(nTd).html('<a href="#" ' + emergency + ' onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + plandate + '</a>');//.substring(0, 10)
                    }
                },
                 {

                    'data': 'REQUEST_TYPE',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" ' + emergency+' title=\"' + oData.REQUEST_TYPE + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.REQUEST_TYPE + '</a>');
                    }


                    },
                    {

                        'data': 'STATUS',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                            //#fb1700
                            var color = (oData.STATUS_ID == "4") ? 'black_' : (oData.STATUS_ID == "3") ? "orange" : (oData.STATUS_ID == "2") ? "yellow" : (oData.STATUS_ID == "1") ?"blue":"green";
                            var circul = '<span class="circ '+color+'"></span>'
                            $(nTd).html('<a href="#"' + emergency + ' title =\"' + oData.STATUS + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>'+circul+'' + oData.STATUS + '</a>');
                        }
                    },
                    {

                        'data': 'RESPONSIBLE_NAME',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency = (oData.EMERGENCY_TREATMENT == "True") ? 'style="color:red;font-weight:bolder"' : "";
                            $(nTd).html('<a href="#" ' + emergency+' title=\"' + oData.RESPONSIBLE_NAME + '\" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + oData.RESPONSIBLE_NAME + '</a>');
                        }


                    },
                    {

                        'data': 'PAYMENT',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var PAYED = (oData.PAYMENT != "0" && oData.PAYMENT != "") ? '<span class="glyphicon glyphicon-ok"></span>' : "";
                            $(nTd).html('<a href="#" onclick=SendId(\"' + oData.REQUEST_ID + '\",' + oData.STATUS_ID + ')>' + PAYED+ '</a>');
                        }


                    }



                ],

                 
                "language": {
                    // "url":"//cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
                    "url": "http://cdn.datatables.net/plug-ins/1.10.20/i18n/Russian.json",
                    //"processing": "Подождите...",
                    //"search": "Поиск",
                    //"lengthMenu": "Показать по _MENU_ заявок",
                    //"info": "Заявки с _START_ до _END_ из _TOTAL_ заявок",
                    //"infoEmpty": "Заявки с 0 до 0 из 0 заявок",
                    //"infoFiltered": "(отфильтровано из _MAX_ записей)",
                    //"infoPostFix": "",
                    //"loadingRecords": "Загрузка записей...",
                    //"zeroRecords": "Записи отсутствуют.",
                    //"emptyTable": "В таблице отсутствуют данные",
                    //"paginate": {
                    //    "first": "Первая",
                    //    "previous": "Предыдущая",
                    //    "next": "Следующая",
                    //    "last": "Последняя"
                    //},
                    //"aria": {
                    //    "sortAscending": ": активировать для сортировки столбца по возрастанию",
                    //    "sortDescending": ": активировать для сортировки столбца по убыванию"
                    //}
                },
                "initComplete": function (settings, json) {
                    changeDatatableElementStructures()
                  

                   // console.log ('bitti2')
                }
            })
          
            $('.ui-loader-background,#loader').hide()
        }
    })
}
function changeDatatableElementStructures(){
    $('#DispSRequestTables_wrapper').prepend($('#TableTools'))
    $('#ListLength').append($('select[name="DispSRequestTables_length"]'))
    $('select[name="DispSRequestTables_length"]').children('option').each(function () {
        // .text('Показывать ' + $(this).val() + ' записей')
        $(this).text('Показывать ' + $(this).val() + ' записей')
    })
    $('#DispSRequestTables_length').remove();
    $('#SearchForTable').append($('#DispSRequestTables_filter').children('label').children('input[type="search"]').attr('class', 'w-100 transp border-0 ml-2 pr-2 pt-1').attr('placeholder', 'Поиск заявки'))
    $('#DispSRequestTables_filter').remove();
}
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "date-euro-pre": function (a) {
        var x;

        if ($.trim(a) !== '') {
            var frDatea = $.trim(a).split(' ');
            var frTimea = (undefined != frDatea[1]) ? frDatea[1].split(':') : [00, 00, 00];
            var frDatea2 = frDatea[0].split('.');
            x = (frDatea2[2] + frDatea2[1] + frDatea2[0] + frTimea[0] + frTimea[1] + ((undefined != frTimea[2]) ? frTimea[2] : 0)) * 1;
        }
        else {
            x = Infinity;
        }

        return x;
    },

    "date-euro-asc": function (a, b) {
        return a - b;
    },

    "date-euro-desc": function (a, b) {
        return b - a;
    }
});
function CheckFilterDate(e)
{
    var id = $(e).attr('id');
    
        var startTime = $(e).val();
    var endTime = $('#endTime').val();
    if (endTime.length != 0 && startTime.length != 0) {
            if (ComputeBiggerDate(startTime, endTime, '-') == 1) {
                $('#fltErr').remove()
                $('#frstname').after('<label  id="fltErr" style="color:red">Период создания "с" не может быть больше чем "по" </label>')
                $('#filtering').attr('disabled', 'disabled');
            }
            else {
                $('#filtering').removeAttr('disabled')
                $('#fltErr').remove()
            }
    } 


    if ($(e).val().length != 0)
    {
        var today = new Date()
        today = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        if (ComputeBiggerDate($(e).val(), today, '-') == 1) {
            $('#fltErr2').remove()
            $('#frstname').after('<label  id="fltErr2" style="color:red">Период не может быть больше  текущего </label>')
            $('#filtering').attr('disabled', 'disabled');
        }
        else {
            $('#filtering').removeAttr('disabled')
            $('#fltErr2').remove()
        }
    }
}
function ComputeBiggerDate(date1, date2, splitter) {
    var result
    date1 = date1.split(splitter)
    date2 = date2.split(splitter)
    var year1 = parseInt(date1[2])
    var year2 = parseInt(date2[2])

    var month1 = parseInt(date1[1])
    var month2 = parseInt(date2[1])

    var day1 = parseInt(date1[0])
    var day2 = parseInt(date2[0])

    if (year1 > year2) {
        result = 1
    }
    else if (year1 == year2) {
        result = 0
    }
    else if (year2 > year1) {
        result = 2
    }

    if (result.length == 0 || result == 0) {
        if (month1 > month2) {
            result = 1
        }
        else if (month1 == month2) {
            result = 0
        }
        else if (month2 > month1) {
            result = 2
        }
    }

    if (result.length == 0 || result == 0) {
        if (day1 > day2) {
            result = 1
        }
        else if (day1 == day2) {
            result = 0
        }
        else if (day2 > day1) {
            result = 2
        }
    }
    return result
}
function getPageName2(url) {
    var index = url.lastIndexOf("/") + 1;
    var filenameWithExtension = url.substr(index);
    var filename = filenameWithExtension.split(".")[0]; // <-- added this line
    return filename;                                    // <-- added this line
}