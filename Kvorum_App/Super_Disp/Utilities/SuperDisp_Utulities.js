
function SaveLog_S(EVENT_TYPE, EVENT_STATUS, EVENT_ROLE, EVENT_MODULE, EVENT_MESSAGE, EVENT_MAKER) {
   
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
            //////console.log(JSON.stringify(result));
        },
        error: function (r) {
            //////console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            //////console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        }
    });
    return;
}
$(document).ready(function () {


    $('#OutD').click(function () {
     //   window.location.href = 'https://upravbot.ru/IDS4/connect/endsession'//'../HomePage.aspx';
        SignOutIdendity();
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

    var loc = window.location.pathname;
    var SLogId = sessionStorage.getItem("Log")
    //setTimeout(function () { alert("Hello"); }, 10000);
    var clientId = sessionStorage.getItem("Clien_ID")
    var eml = urlParam('eml')
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
                    //  console.log("jsondata_")
                    // console.log(jsondata_)
                    SLogId = jsondata_[0].LOG_IN_ID

                    //  console.log('document.location')
                    // console.log(document.location)
                    sessionStorage.setItem("Log", SLogId),
                        sessionStorage.setItem("Clien_ID", jsondata_[0].CLIENT_ID)
                    clientId = jsondata_[0].CLIENT_ID
                    sessionStorage.setItem("role", jsondata_[0].ROLE_)
                    sessionStorage.setItem("REQUEST_ID", jsondata_[0].REQUEST_ID)
                    sessionStorage.setItem("REQUEST_STATUS", jsondata_[0].REQUEST_STATUS)
                    var Req_guid = jsondata_[0].REQ_GUID
                    if (Req_guid != undefined) {
                        document.location.search = "?RId=" + Req_guid + "&st=" + jsondata_[0].STATUS
                    }
                }

            }
        })
    }
    $("#lgId").text('Login_' + SLogId);
    var oobj3 = { lg: SLogId }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/GetDispName",
        data: JSON.stringify(oobj3),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var jsondata_2 = JSON.parse(result.d)
            $("#fiodsp").text(jsondata_2[0].ACCOUNT_NAME).attr('email', jsondata_2[0].E_MAIL).attr('supp-guid', jsondata_2[0].SUPP_GUID);
            $("#fiodsp").parent().prev('span').attr('style', 'background: #eaeaea url("' + jsondata_2[0].ICON + '") center center; background-size: cover;')
        }
    })

    $("#lgId").text('Login_' + SLogId);
    var obj_Chk = {
        Log: SLogId
    };
    if (loc == '/Super_Disp/CreateDispRequest.aspx') {
        $('.ui-loader-background,#loader').show()
        var path = window.location.pathname;
        var EVENT_MODULE = (path.indexOf("Manager/") > -1) ? "Manager" : (path.indexOf("Super_Disp/") > -1) ? "SuperDisp" : (path.indexOf("Responsible_Admin/") > -1) ? "Responsible" : (path.indexOf("Disp_Admin/") > -1) ? "Disp" : "Диспетчер поставщика";
        var obj_lg = {


            EventModul: EVENT_MODULE,
            lg_: SLogId
        };
        $.ajax({
            type: "POST",
            url: "../Client_Admin/CreateOpject.aspx/GetLogs",
            data: JSON.stringify(obj_lg),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //  //////console.log(result)

                //var jsondata_1 = JSON.stringify(result.d)
                var jsondata_2 = JSON.parse(result.d)
                // //////console.log()
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

                $('.ui-loader-background,#loader').hide()
            },

            error: function (r) {
                // //alert("Error");
                //////console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                $('.ui-loader-background,#loader').hide()
            },
            failure: function (r) {
                $('.ui-loader-background,#loader').hide()
                alert("FAIL");

            }
        });
    }
    // GETSUPPNAME(SLogId)
    //if (loc == '/Responsible_Admin/CreateRequest.aspx') {
    //    $('#IspolList').after('<div id="dvaddsps" onclick=checkmanysps(this)><input type="button" id="AddSpecialist" onclick="Add_Specialist()" class="btn btn-default logBtn" value="Добавить исполнителя"></div>')
    //}
    var page_ = getPageName(loc)

    if (page_ === 'CreateDispRequest' || page_ === 'CreateRequest') {

        if (page_ == 'CreateDispRequest') {
            $('#contentRegister').removeAttr('style')
        }
        else {

            $('#contentRegister').css('width', '100%')

        }
        $(document).on('change', '#prjcts', function () {
            // $('#prjcts_lbl').remove()
            getObjectByProjectId("", $(this).val())
            //  $('.ui-loader-background,#loader').show()
            $('#PrServiceH tbody').empty();
            $('#PrServiceH').hide();
        //    GetAllServicesOfProject($(this).children('option:selected').attr('guid'))
            //getDirection_K("", $(this).children('option:selected').attr('guid'));

        })

        $(document).on('change', '#RequestKind', function () {
            // $('#prjcts_lbl').remove()

            $('.ui-loader-background,#loader').show()
            $('#PrServiceH tbody').empty();
            $('#PrServiceH').hide();
            if ($(this).val() == 1) {
                $('#reqType').children('option[value="0"]').remove()
                $('#chkem,#lblEm').hide();
            }
            else {
                $('#reqType').prepend('<option value="0">Внутренняя</option>')
                $('#chkem,#lblEm').show();
            }
            GetAllServicesOfProject($('#prjcts').children('option:selected').attr('guid'), $(this).val())
            getDirection_K("", $('#prjcts').children('option:selected').attr('guid'), "", $(this).val());

        })

        $(document).on('change', '#objctZ', function () {
            // $("#IspolList_S").hide();
            var objs = $(this).val();
            if (objs != 0) {
                $("#adr_S").hide();
                // GetGroupOfServices("", objs);
                var resp = $('#Sets').attr('data-r')

                $('#Sets').attr('onchange', 'GetRelatedDirects(0,this,' + objs + ')')
                GetDispsByObjectid("", $(this).val())
                GetRelatedSets("", objs)
                GetPerFormers("", objs);
                //  GetAccFortexnik(objs, "");
            }
            $('#Room_Type').val(0)
            $('#Room,#Acnum,#Ind').val("");
            $('#IndList').empty().hide();
            $('#AcnumList').hide();



        })

        $(document).on('keyup', '#Acnum', function () {
            $("#Acnum_S").hide();
            GetDatasByAccNum($(this).val())
        })
        $(document).on('blur', '#Room', function () {//Ind
            var room = $("#Room").val();
            var slcObj = $("#objctZ").val();//sessionStorage.getItem("slcObj");
            var roomtype = $("#Room_Type").val()
            if (slcObj != 0 && roomtype != 0) {
                if (room.length != 0) {
                    //slcObj = JSON.parse(slcObj)
                    //slcObj = slcObj[0].Object_Id
                    // ////console.log(slcObj)
                    getInddata(slcObj, room, roomtype);
                }
            }
        })

        $(document).on('click', '#file_btn', function () {
            $('#files').click();
        })
        $(document).on('change', '#files', function () {
            // $("#loader").show();
            $('.ui-loader-background,#loader').show()
            var filePath = $('#files').val();

            var index = filePath.lastIndexOf("\\") + 1;
            var filename = filePath.substr(index);

            readURLSuper(this, filename);

        })

        $(document).on('click', '#SearchService', function () {
            var succSearch = true;
            //if ($('#searchtxt').val().length == 0)
            //{
            //    succSearch = false
            //    $('#lblSearchingErr').remove()
            //    $('#lblsearchtxt').after('<label id="lblSearchingErr" style="color:red;font-weight: bold;">Необходимо заполнить поле "Поиск"</label>');
            //    window.setTimeout(function () {$('#lblSearchingErr').remove();}, 5000);
            //    $("#mh7").text("ПОИСК УСЛУГ");
            //}
            if ($('#objctZ').val() == 0) {
                succSearch = false
                $('#adr_S').text('Необходимо выбрать адрес объекта').show()
                $("html, body").animate({ scrollTop: 50 }, "slow");
                window.setTimeout(function () { $('#adr_S').hide().text(""); }, 5000);
            }
            if (succSearch == true) {
                $("#mh7").text("ПОИСК УСЛУГ");
                $('#myModal7').show();
                Give_Selected_Set_Direct_Service_For_Search($('#objctZ').val())//$('#objctZ').val()
            }
            $("#close_7").click(function () {
                $('#myModal7').hide();
                // $('#NewServs').empty()
                var totalCost = 0
                $('#total').remove();
                $("#PrServiceH tbody tr").each(function () {
                    var cost = (isNaN($(this).children('td:eq(3)').text())) ? "0.00" : $(this).children('td:eq(3)').text();
                    totalCost = parseFloat(totalCost) + parseFloat(cost)
                    totalCost = (isNaN(totalCost)) ? "0.00" : totalCost
                })
                totalCost = parseFloat(totalCost)
                   
                $('#PrServiceH').after('<div class="totalh7" > <h7 id="total" total-summ=\"' + totalCost.toFixed(2) + '\" style="float: right;">Итого: ' + totalCost.toFixed(2) + '  руб</h7></div>')
                //   $('#NewServs').jstree(true).destroy();
                $('#NewServs').jstree("destroy").empty();
                $('#NewServs').jstree("deselect_all");
            })

            $("#AddT").click(function () {
                //getChecked();
                //$("#PrService_S").hide();
                // $('#AddT').val('');
                var selectedElms = $('#NewServs').jstree("get_selected", true);
                var level = 0

                level = selectedElms[0].original.LEVEL

                if (level == "1") {
                    var id = selectedElms[0].id
                    var text = selectedElms[0].text
                    $('#Sets').val(id).attr('data-search', 'Set')
                    $('#Sets').change()


                    $('#PrServiceH').removeAttr('data-d')
                    $('#PrServiceH').show()
                    $('#PrServiceH tbody').empty();
                    $('#PrServiceH thead tr th:eq(3)').show();
                    $('#PrServiceH thead tr th:eq(0)').text('Наименование направления')
                    $('#PrServiceH thead tr').each(function () {
                        $(this).children('th:eq(1),th:eq(2)').hide();

                    })

                    $('#PrServiceH').attr('data-s', id)

                    $('#PrServiceH tbody').append('<tr><td data-s=' + id + '>' + text + '</td><td class="CostTd"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
                }
                if (level == "2") {
                    var id = selectedElms[0].id
                    var text = selectedElms[0].text
                    $('#Sets').val(selectedElms[0].parent)
                    //  $('#Sets').change()
                    $('#left').parent().remove();
                    var directId = id.replace('dir', '');

                    $('#PrServiceH').after('<select id="temprorySet" data-search="search"  style="display:none"><option value=' + selectedElms[0].parent + '>-<option></select>')
                    //  sessionStorage.setItem("st",2)
                    GetRelatedDirects(directId, $('#temprorySet'), $('#objctZ').val(), undefined, 'search');
                    $('#temprorySet').remove();
                    //$("#PrServiceH").attr('data-d', directId);
                    //$("#PrServiceH tbody tr:eq(0)").remove();
                    //$('#PrServiceH tbody').append('<tr><td data-d=' + directId + '>' + text + '</td><td class="CostTd"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-d=' + directId + ' onclick="RemoveDirectRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

                }
                if (level == "3") {
                    sessionStorage.removeItem("finded")
                    sessionStorage.setItem("finded", JSON.stringify(selectedElms))
                    $('#Sets').val(selectedElms[0].original.SS_ID).attr('data-search', 'Ssearch')
                    //  $('#Sets').change()
                    $('#left').parent().remove();
                    for (var j = 0; j < selectedElms.length; j++) {
                        var d = 0
                        if (j == 0) {
                            var sid = selectedElms[j].original.SS_ID;
                            d = selectedElms[j].parent
                            d = d.replace('dir', '');
                            $('#PrServiceH').after('<select id="temprorySet" data-search="search"   style="display:none"><option value=' + sid + '>-<option></select>')
                            var ts = $('#temprorySet').val();
                            GetRelatedDirects(d, $('#temprorySet'), $('#objctZ').val(), undefined, "Ssearch")
                            $('#temprorySet').remove();
                            $("#PrServiceH tbody tr:eq(0)").remove();
                            //$("#PrServiceH").attr('data-d', d);
                        }
                        //var itemId = selectedElms[j].id
                        //itemId = itemId.replace('serv', '');
                        //var dataName = selectedElms[j].text
                        //var cost = selectedElms[j].original.COST
                        //var kolDis = (cost == 'Договорная') ? 'disabled="disabled"' : '';

                        //var doqi = (cost == 'Договорная') ? '<a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div>' : '<a>' + cost + '</a>'

                        //var edizm = selectedElms[j].original.UNIT_OF_MEASURE_NAME;
                        //var dtUrl = selectedElms[j].original.QUANTITY_IS
                        //$('#PrServiceH').show();
                        //$('#PrServiceH thead th').show();
                        //$('#PrServiceH thead tr th:eq(0)').text('Наименование услуг')
                        //if (dtUrl == "1") {
                        //    //onkeyup="multiPlaying(this,500)" <td><input type="text" onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" value="1"></td>
                        //    $("#PrServiceH tbody").append('<tr data-d=' + d + '><td itemid="' + itemId + '"> ' + dataName + '</td><td><input type="text" ' + kolDis + '  onkeyup=multiPlaying(this,"' + cost + '")  onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" value="1"></td><td>' + edizm + '</td><td  class="CostTd">' + doqi + '</td><td><a itemid="' + itemId + '" data="' + dataName + '" onclick="RemoveRow(this)" data-url="' + dtUrl + '" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</a></td></tr>')
                        //}
                        //if (dtUrl == "0") {
                        //    /*<tr><td style="width: 500px;" itemid="11">Доступ - Одноразовый пропуск</td><td><input disabled="disabled" type="text" value=""></td><td><button onclick="RemoveRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</button></td></tr>*/
                        //    //<td  ><input disabled="disabled" type="text" value=""></td>
                        //    $("#PrServiceH tbody").append('*<tr data-d=' + d + '><td   itemid="' + itemId + '"> ' + dataName + '</td><td><input disabled="disabled" type="text" value=""></td><td>' + edizm + '</td><td class="CostTd"><a onclick=Open_Pop(this) >' + cost + '</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-url="' + dtUrl + '" onclick="RemoveRow(this)" itemid="' + itemId + '" data="' + dataName + '"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</a></td></tr>')

                        //}

                    }


                    //if (j == selectedElms.length) {
                    //    var totalCost = 0
                    //    $("#PrServiceH tbody tr").each(function () {
                    //        var cost = (isNaN($(this).children('td:eq(3)').text())) ? "0.00" : $(this).children('td:eq(3)').text();
                    //        totalCost = parseFloat(totalCost) + parseFloat(cost)
                    //    })
                    //    $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + totalCost + '  руб</label>')
                    //}
                    //   var directId = id.replace('srv', '');
                }

                $('#close_7').click();
            })
        })
        $('#NewServs').on('changed.jstree', function (e, data) {
            //
            var selectedElms = $('#NewServs').jstree("get_selected", true);
            //////console.log(selectedElms)
            var checked = [];
            //for (var i = 0; i < data.selected.length; i++) {

            //    //////console.log(data.instance.get_node(data.selected[i]).original.LEVEL)

            //    checked.push({
            //        "text": data.instance.get_node(data.selected[i]).text,
            //        "LEVEL": data.instance.get_node(data.selected[i]).original.LEVEL,
            //        "parent": data.instance.get_node(data.selected[i]).original.parent
            //    })
            //    // var v = $("#NewServs").jstree(true).get_json('#', { 'flat': true });

            //    //////console.log(e)

            //}
            //////console.log(checked);
            var level_count_Set = 0
            var level_count_direct = 0
            var level_count_service = 0
            // check if Selected set bigger than 1
            for (var i = 0; i < selectedElms.length; i++) {

                var level = selectedElms[i].original.LEVEL
                if (level == "1") {
                    level_count_Set = level_count_Set + 1

                }
                if (level_count_Set > 1) {
                    data.instance.uncheck_node(selectedElms[i - 1]);

                    data.instance.check_node(selectedElms[i]);


                }

                if (level == "2") {
                    level_count_direct = level_count_direct + 1
                }

                if (level_count_direct != 0) {
                    data.instance.uncheck_node(selectedElms[i - 1]);

                    data.instance.check_node(selectedElms[i]);


                }
                if (level == "1" || level_count_direct != 0) {
                    data.instance.uncheck_node(selectedElms[i - 1]);

                    data.instance.check_node(selectedElms[i]);
                }

                if (level == "1" || level_count_Set != 0) {
                    data.instance.uncheck_node(selectedElms[i - 1]);

                    data.instance.check_node(selectedElms[i]);
                }
                if (i != 0) {
                    var parent = selectedElms[i].parent
                    if (parent != selectedElms[i - 1].parent) {
                        data.instance.uncheck_node(selectedElms[i - 1]);

                        data.instance.check_node(selectedElms[i]);
                    }
                }

            }

            //selectedElms = $('#NewServs').jstree("get_selected", true);
            //// check if has selected direct
            //
            //for (var i = 0; i < selectedElms.length; i++) {
            //    var level = selectedElms[i].original.LEVEL

            //}




        })
        $(document).on('click', '#CloseServ', function () { $("#close_7").click(); })

        //var Rid_st = $('body').data("appDatas")
        //Rid_st = JSON.parse(Rid_st)
        var R_id = urlParam('RId')//Rid_st.RId //appDatas.RId //localStorage.getItem("RId")
        $('#hstComh').after('<label id="attention_hstComh" style="color:red">Внимание! Комментарий не будет отображаться в приложении для жителей.</label>')
        
        if (R_id == "" || R_id == undefined || R_id == null) {

       //     $('label[class="w-95"],label[class="transp backLab"]').remove()
            $('label[class="w-95"],label[class="transp backLab"]').attr('class', 'transp backLab')
          //  $('label[for="prjcts"],label[for="objctZ"],label[for="RequestKind"],label[for="Room_Type"],label[for="IspolList"],label[for="Otven"]').remove()
            $('select').select2({
                containerCssClass: "wrap"
            })
            $('#RequestKind').select2({
                minimumResultsForSearch: "Infinity"
            })
            $('#dvSendUppl').attr('style','display:none !important');
            
            $('#updateRequest').hide();
            $(document).on('click', '#Close_Ot', function () {
                modal.style.display = "none";
                $(".modal-body2 img").remove()
                $(".modal-body2 h4").remove();
                $(".modal-body2 i").remove()
            })
            var role = sessionStorage.getItem("role")
            if (role == "15") {
                getCurrentDispObject("", SLogId);
            }
            $('#SaveDD').hide()
            setTimeout(function () {
                GetProjects(SLogId, "");//ss
                getResponsibels_();
                gtTypeOfroom2("");
                getDate();
                GetKindOfRequest("")
                getTime();
                $('#SearchService').show();
                $('#dvSendUppl').hide();
                $('#hedrZ').attr('Z_id', '0')
                $('#SaveDD').attr('data-status', '1')
                $('#SaveMO').attr('data-status', '2')
            }, 1000)


            $(document).on('click', '#backUo', function () {
                //window.location = 'DispRequests.aspx'
                //parent.history.back();
                var loc = window.location.pathname
                var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
                window.location.href = back
            })
          
            $(document).on('click', '#SaveDD', function () {

                var successRequest = true;

                successRequest = checkControls().isSuccess
                var ismc = checkControls($(this)).ismc
                if (successRequest == true && ismc == "True") {
                    // alert(ok)
                     $('.ui-loader-background,#loader').show()
                    SaveRequest_Super(JSON.stringify(checkControls($(this)).obj), JSON.stringify(checkControls().P_Services), JSON.stringify(checkControls().RImg), null);
                }
                if (successRequest == true && ismc == "False") {

                    GetAndSaveDatasSuppRequest($(this), successRequest)

                }


            })//SaveDD
            $(document).on('click', '#SaveMO', function () {

                var successRequest = true;

                successRequest = checkControls().isSuccess
                var ismc = checkControls($(this)).ismc
              
                if (ismc == "True" && RequestKind == 1) {
                    ismc = "False"
                }
                if (successRequest == true && ismc == "True") {
                    // alert(ok)
                    $('.ui-loader-background,#loader').show()
                    SaveRequest_Super(JSON.stringify(checkControls($(this)).obj), JSON.stringify(checkControls().P_Services), JSON.stringify(checkControls().RImg), null);
                }
                if (successRequest == true && ismc == "False") {

                    GetAndSaveDatasSuppRequest($(this), successRequest)

                }



            })

            if (role != "15") {
                $('#SaveMO,#backUo').show();//#SaveDD,
            }
            else {
                $('#SaveDD').show();
            }
        }

        if (R_id != "" && R_id != undefined && R_id != null) { 
            $('#IspolList').select2({
                containerCssClass: "wrap"
            })
            $(document).ready(function () {
                R_id = R_id.replace("disp_", "");
                $(document).on('click', '#fileH_btn', function () {
                    $('#fileH').click();
                })
                $(document).on('change', '#fileH', function () {
                    // $("#loader").show();
                    $('.ui-loader-background,#loader').show()
                    var filePath = $('#f_iles2').val();
                    //<img id="imgdwnl2" style="width:71px"/>//
                    var lastimage = $("#hstCom h4:last-child").text();
                    $("#cmntsts2").after()
                    var index = filePath.lastIndexOf("\\") + 1;
                    var filename = filePath.substr(index);

                    readURLHSuper(this, filename);

                })
               
                
                if ($.isNumeric(R_id)) {
                    GetRequesByR(R_id)
                }
                else {
                    $('#chkem').hide()
                    $('#chkem').next().hide()
                    GetSuppRequesByR(R_id)
                }
                var st = urlParam('st')// Rid_st.st//appDatas.RId//localStorage.getItem("st")
                //$('#file_btn').hide();
                $('.w-95').attr('class','transp backLab')
                if (st == 2) {
                    $('#SearchService').show();

                    $('#updateRequest').attr('data-status',st)
                    $(document).click(function (s) {
                        var class_ = s.target.className;
                        if (class_ == "btn delBtn" || class_ == "accMenu" || class_ == "col-md-1" || class_ == "checkBx" || class_ != "") {
                            sessionStorage.setItem('changes', true);
                        }

                    })

                    $(document).keyup(function (s) {
                        var id = s.target.id;
                        if (id == "RComment" && id != "") {
                            sessionStorage.setItem('changes', true);
                        }

                    })

                    $('#Acnum').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');

                    $("#hdPr").text("Прикрепленный файл")
                    $("#hedrZ").attr("Z_id", R_id);
                    $('#objctZ,#prjcts').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');//mms3
                    // $("#chkem").attr('disabled', 'disabled')
                    $("#Room,#Entrance,#Floor").attr('disabled', 'disabled')
                    $("#Ind").attr('disabled', 'disabled')
                    $("#Phn").attr('disabled', 'disabled')
                    $("#AddedTable").hide();
                    $("#fileH_btn").show();
                    $("#HImg").show();
                    // $("#PrServiceH").find('th:eq(2)').hide();
                    // $("#calen1").attr('disabled', 'disabled')
                    //  $("#tm").attr('disabled', 'disabled')
                    // $("#IspolList").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#Room_Type,#GServices").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#dvSendUppl,#hstCom,#hstComh").show();
                    $("#RText").attr('disabled', 'disabled');
                    // $("#files").attr('disabled', 'disabled');
                    $("#files").hide();
                    // $("#SaveDD").text("Работа выполнена")
                    $('#Otven').removeAttr('disabled')
                    $("#backUo").text("Отменить заявку")
                    $(document).on('click', '#SaveDD', function () {
                        var successRequest = true;
                        successRequest = checkControls().isSuccess
                        if (successRequest == true) {
                            var obj =
                            {
                                'Rid': $('#hedrZ').attr('z_id'),
                                'prs': checkControls().P_Services,
                                'opl': checkControls().obj.opl,
                                'login_id': checkControls().obj.Lg,
                                'em': checkControls().obj.em,
                                'Pdate': checkControls().obj.Pdate,
                                'Ptime': checkControls().obj.Ptime,
                                'SpId': (checkControls().obj.spId == undefined) ? null : checkControls().obj.spId,
                                'RESPONSIBLE_ID': checkControls().obj.RESPONSIBLE_ID,
                                'TOTAL_COST': checkControls().obj.TOTAL_COST,
                                'RESPONSIBLE_EMAIL': checkControls().obj.RESPONSIBLE_EMAIL,
                                'PERFORMER_EMAIL': (checkControls().obj.PERFORMER_EMAIL == undefined) ? null : checkControls().obj.PERFORMER_EMAIL,
                                'AUTHOR': checkControls().obj.AUTHOR_COMMENT,
                                'StatusId': checkControls($(this)).obj.STATUS_ID,
                                'path': window.location.pathname,
                                'SPECIATISTS_': null,
                                'request_type': checkControls().obj.request_type,
                                'RequestKind': checkControls().obj.RequestKind


                            }
                            $('.ui-loader-background,#loader').show();
                            if ($.isNumeric(R_id)) {
                                otpravToVrabot(obj, R_id)
                            }
                            else {
                                otpravToVrabotSupp(obj, R_id)
                            }
                        }

                    })
                    $(document).on('click', '#SaveMO', function () {

                        $('#updateRequest').click();
                     

                    })
                    $(document).on('click', '#backUo', function () {
                        var successOtmen = true

                        var objOt = { "Rid": checkControls().obj.HReq, 'login_id': checkControls().obj.Lg, 'path': checkControls().obj.path }
                        if (successOtmen == true) {
                            $('#myModal5').show();
                            $('#reasonlbl').remove();
                            $('#myModal5').children('.modal-content2').children('.modal-header2').prepend('<label id="reasonlbl" class="textBlack font24b w-90 mb-0" >Укажите причину отмены заявки</label>').css('color', 'black')
                            $('#cmntsts2').text('');
                            $('#f_iles2').attr('onchange', 'FileForOtmen(this)')
                            $('#OkVipol').click(function () {
                                var imgs = []
                                $('#myModal5 .modal-body2').find('img').each(function () {
                                    imgs.push({ "ImgAdres": $(this).attr('data-url') })
                                })
                                if (imgs.length != 0) {
                                    if ($.isNumeric(R_id)) {
                                        SaveFileOtmen(R_id, JSON.stringify(imgs), $('#fiodsp').text(), 4);
                                    }

                                    // SaveFileZakrito(R_id, imgs);
                                }
                                var textZakrit = $('#cmntsts2').val()
                                if (textZakrit.length != 0) {

                                    if ($.isNumeric(R_id)) {
                                        SaveCommentOtmen(R_id, textZakrit, $('#fiodsp').text(), 4);
                                    }
                                }


                                if ($.isNumeric(R_id)) {
                                    MakeOtmen(objOt, R_id, textZakrit)
                                    $('#close_5').click();
                                }
                                else {

                                    MakeOtmenSupp(R_id, JSON.stringify(imgs), textZakrit)
                                    $('#close_5').click();
                                }
                            })

                            $('#close_5').click(function () {
                                $('#myModal5 .modal-body2').children('.titleF,.fa,img,br').remove();
                                $('#myModal5').hide();
                                //$('#cmntsts2').text('Все работы по данной заявке выполнены')
                                $('#cmntsts2').val('');
                            })
                            $('#Close_Ot').click(function () {
                                $('#close_5').click();
                            })

                        }

                    })
                    $(document).on('click', '#updateRequest', function () {
                        var successRequest = checkControls().isSuccess;
                      
                      

                        if (successRequest == true) {
                            var obj = {
                                'slcObj': checkControls().obj.slcObj,
                                'IndId_': checkControls().obj.IndId_,
                                'Lg': checkControls().obj.Lg,
                                'em': checkControls().obj.em,
                                'Pdate': checkControls().obj.Pdate,
                                'Ptime': checkControls().obj.Ptime,
                                'spId': checkControls().obj.spId,
                                'Rt': checkControls().obj.Rt,

                                'Rc': checkControls().obj.Rc,

                                'RoomT': checkControls().obj.RoomT,
                                'NUMBER': checkControls().obj.NUMBER,
                                'opl': checkControls().obj.opl,
                                'phn': checkControls().obj.phn,
                                'HReq': checkControls().obj.HReq,
                                'indName': checkControls().obj.indName,
                                'TOTAL_COST': checkControls().obj.TOTAL_COST,
                                'RESPONSIBLE_ID': checkControls().obj.RESPONSIBLE_ID,
                                'RESPONSIBLE_EMAIL': checkControls().obj.RESPONSIBLE_EMAIL,
                                'AUTHOR_COMMENT': checkControls().obj.AUTHOR_COMMENT,
                                'PERFORMER_EMAIL': checkControls().obj.PERFORMER_EMAIL,
                                'STATUS_ID': 0,
                                'request_type': checkControls().obj.request_type,
                                'RequestKind': checkControls().obj.RequestKind,
                                'path': window.location.pathname


                            }
                            //  alert(ok)
                            var HReq = $('#hedrZ').attr('z_id');
                            if ($.isNumeric(R_id)) {

                                $('.ui-loader-background,#loader').show()
                                SaveRequest_Super(JSON.stringify(obj), JSON.stringify(checkControls().P_Services), JSON.stringify(checkControls().RImg), null);
                            }
                            else {
                                $('.ui-loader-background,#loader').show()
                                Save_SUPPLIER_Request_Super(JSON.stringify(obj), JSON.stringify(checkControls().P_Services));
                            }
                        }

                    })



                }
                if (st == 1) {

                    $('#updateRequest').attr('data-status', st)
                    $(document).click(function (s) {
                        var class_ = s.target.className;
                        if (class_ == "btn delBtn" || class_ == "accMenu" || class_ == "col-md-1" || class_ == "checkBx" || class_ != "") {
                            sessionStorage.setItem('changes', true);
                        }

                    })

                    $(document).keyup(function (s) {
                        var id = s.target.id;
                        if (id == "RComment" && id != "") {
                            sessionStorage.setItem('changes', true);
                        }

                    })
                    $('#updateRequest').show();

                    $('#updateRequest').click(function () {
                        UpdateRequest(0)
                    })

                    $('#Acnum').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#hdPr").text("Прикрепленный файл")
                    $("#hedrZ").attr("Z_id", R_id);
                    $('#objctZ,#prjcts,#disps').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');//mms3
                    //   $("#chkem").attr('disabled', 'disabled')
                    $("#Room,#Entrance,#Floor").attr('disabled', 'disabled')
                    $("#Ind").attr('disabled', 'disabled')
                    $("#Phn,#Sets").attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)')
                    $("#AddedTable").hide();
                    $("#fileH_btn").show();
                    $("#HImg").show();
                   
                    $("#Room_Type").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#dvSendUppl").show();
                    $("#RText").attr('disabled', 'disabled');
                    // $("#files").attr('disabled', 'disabled');
                    $("#files").hide();
                    $('#hstComh,#hstCom').show();
                    $('#SaveDD').text("Работа выполнена")
                    $("#backUo").text("Отменить заявку")
                    $(document).on('click', '#SaveDD', function () {
                        var successVipol = checkControls().isSuccess;
                       
                     
                        if (successVipol == true) {

                            RabotVipolSuper(R_id)
                        }
                    })

                    $(document).on('click', '#SaveMO', function () {
                        var imgs = [];
                        $(".modal-body2 img").each(function () {
                            var ImgSrc = $(this).attr("data-url")
                            imgs.push({ "ImgAdres": ImgSrc });
                        })
                        var imgsCount = imgs.length;
                        if (imgsCount == 0) {
                            imgs.push({ "ImgAdres": 0 });
                        }
                        var P_Services = [];
                        var ServicesLength = $('#PrServiceH tbody tr').length;
                        var ismc = "";
                        var successRequest = true;
                        var RequestKind = $("#RequestKind").val();
                        if (RequestKind == 0) {
                            $('#RequestKindr_S').remove();
                            $("#RequestKind").after('<span id="RequestKindr_S" style="float: right; font-weight: bold; color: red; display: none">Необходимо выбрать вид заявку</span>')
                            successRequest = false;
                            // $("#adr_S").text("Необходимо выбрать адрес объекта").show();

                            $("html, body").animate({ scrollTop: 50 }, "slow");
                            window.setTimeout(function () { $('#adr_S').hide(); }, 5000);
                        }
                        if (ServicesLength == 0) {
                            $('#servicelbl').remove()
                            $("#objctZ").after('<label id="servicelbl" style="color:red;font-weight: bold;float:left">Необходимо выбрать услуг</label>').show();
                            successRequest = false;
                            $("html, body").animate({ scrollTop: 50 }, "slow");
                            window.setTimeout(function () { $('#servicelbl').remove(); }, 5000);// 
                        }
                        else {

                            $('#PrServiceH tbody tr').each(function () {
                                var SERVICE_GUID = ($(this).attr('service-guid') != undefined) ? $(this).attr('service-guid') : ($(this).attr('grup-guid') != undefined) ? $(this).attr('grup-guid') : $('.selectdrc').attr('guid')
                                ismc = $(this).attr('ismc');
                                var QUANTITY = $(this).children('td:eq(1)').children('input[type="text"]').val();
                                QUANTITY = (QUANTITY == undefined) ? 0 : QUANTITY.replace(',', '.')

                                var eq = ($('#PrServiceH thead tr th:eq(0)').text() == 'Наименование направления') ? 1 : 3
                                var COST = $(this).children('td:eq(' + eq + ')').children('a').text()


                                COST = (COST == undefined || COST == 'Договорная') ? '0.00' : COST

                                P_Services.push({ COST: COST, QUANTITY: QUANTITY, SERVICE_GUID: SERVICE_GUID })

                            })
                        }

                        var RESPONSIBLE_ID = (ismc == "True" || ismc == undefined) ? $('#Otven').val() : null
                        var RESPONSIBLE_EMAIL = (ismc == "True" || ismc == undefined) ? $('#Otven option:selected').attr('email') : null
                        var PERFORMER_EMAIL = (ismc == "True" || ismc == undefined) ? $('#IspolList option:selected').attr('email') : null
                        var ispol = (ismc == "True" || ismc == undefined) ? $('#IspolList').val() : null
                        var opl = $('#opl').prop('checked');
                        opl = "" + opl + ""
                        //var lg_id = $('#lgId').text()
                        //var grupservis = $('#PrServiceH tbody').children('tr:eq(0)').attr('data-d')//($('#subMenu').attr('data-d') == undefined) ? 0 : $('#subMenu').attr('data-d')
                        $('.ui-loader-background,#loader').show();
                        var SLog_id = sessionStorage.getItem("Log")
                        var rid = $('#hedrZ').attr('z_id')
                        var SPECIATISTS = null
                        if (location.pathname == '/Responsible_Admin/CreateRequest.aspx' && $('.manysps').length != 0) {
                            SPECIATISTS = Sps_json()
                        }
                        var request_type = $('#reqType').val()

                        var objV = {
                            "Rid": $('#hedrZ').attr('z_id'),
                            "rsf": JSON.stringify(imgs),
                            "rst": $("#cmntsts2").val(),
                            'opl': opl,
                            'login_id': SLog_id,
                            "ispol": (ispol == undefined) ? null : ispol,
                            "ispolEmail": (PERFORMER_EMAIL == undefined) ? null : ispol,
                            "RESPONSIBLE_ID": RESPONSIBLE_ID,
                            "RESPONSIBLE_EMAIL": RESPONSIBLE_EMAIL,
                            'TOTAL_COST': $('#total').text(),
                            "prs_json": JSON.stringify(P_Services),
                            "Pdate": $('#calen1').val(),
                            "Ptime": $('#tm').val(),
                            'RequestKind': $('#RequestKind option:selected').attr('guid'),
                            'REQUEST_TYPE': request_type,
                            'path': window.location.pathname,
                            'SPECIATISTS_': SPECIATISTS
                        }
                        $.ajax({
                            type: "POST",
                            url: "../Super_Disp/CreateDispRequest.aspx/Vrabot_to_Otprav",//http://localhost:64339/
                            data: JSON.stringify(objV),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {//Заявка по работе <Номер заявки> выполнена
                                var mn = $('#hedrZ').attr('mn');
                                SaveFCM('Заявки', 'Заявка получила статус «Отправлена»', 'Заявке № ' + mn + ' в статусе «Отправлена».', '', $('#Acnum').val(), SLog_id, 'CreateDispRequest.aspx', rid)
 
                                //  SaveLog_S("Работа выполнена", "Важное", "Диспетчер", "Диспетчеризация", "Работа по заявке < " + rid + " > выполнена", SLog_id);
                                //window.location.href = "DispRequests.aspx"
                                //parent.history.back();
                                var loc = window.location.pathname
                                var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
                                window.location.href = back
                            }
                        })
                        //var R_id = $('#hedrZ').attr('z_id')
                        //if ($.isNumeric(R_id)) {



                        //}
                        //else {
                        //    GetAndSaveDatasSuppRequest($(this), successRequest)
                        //}

                    })

                    $(document).on('click', '#backUo', function () {
                        var successOtmen = true

                        var objOt = { "Rid": R_id, 'login_id': SLogId, 'path': window.location.pathname }
                        if (successOtmen == true) {
                            $('#myModal5').show();
                            $('#reasonlbl').remove();
                            $('#myModal5').children('.modal-content2').children('.modal-header2').prepend('<label  id="reasonlbl" class="textBlack font24b w-90 mb-0" >Укажите причину отмены заявки</label>').css('color', 'black')
                            $('#cmntsts2').text('');
                            $('#f_iles2').attr('onchange', 'FileForOtmen(this)')
                            $()
                            $('#OkVipol').click(function () {
                                $('.ui-loader-background,#loader').show()
                                var imgs = []
                                $('#myModal5 .modal-body2').find('img').each(function () {
                                    imgs.push({ "ImgAdres": $(this).attr('data-url') })
                                })
                                if (imgs.length != 0) {
                                    if ($.isNumeric(R_id)) {
                                        SaveFileOtmen(R_id, JSON.stringify(imgs), $('#fiodsp').text(), 4);
                                    }
                                    // SaveFileZakrito(R_id, imgs);
                                }
                                var textZakrit = $('#cmntsts2').val()
                                if (textZakrit.length != 0) {

                                    if ($.isNumeric(R_id)) {
                                        SaveCommentOtmen(R_id, textZakrit, $('#fiodsp').text(), 4);
                                    }
                                }
                                if ($.isNumeric(R_id)) {
                                    MakeOtmen(objOt)
                                    $('#close_5').click();
                                }
                                else {
                                    MakeOtmenSupp(R_id, JSON.stringify(imgs), textZakrit)
                                    $('#close_5').click();
                                }

                            })

                            $('#close_5').click(function () {
                                $('#myModal5 .modal-body2').children('.titleF,.fa,img,br').remove();
                                $('#myModal5').hide();
                                //$('#cmntsts2').text('Все работы по данной заявке выполнены')
                                $('#cmntsts2').val('');
                            })
                            $('#Close_Ot').click(function () {
                                $('#close_5').click();
                            })

                        }

                    })

                    R_id = R_id.replace("disp_", "");

                    if (!$.isNumeric(R_id)) {
                        $('#SaveMO').hide();
                    }


                }

                $(document).on('click', '#SendComent', function () {
                    var imgD_url = $("#zImg > img").length;
                    if ($("#RComment").val().length != 0 || imgD_url != 0) {
                        sensComment(R_id, $("#RComment").val(), imgD_url, $('#fiodsp').text())
                        // alert("Ok")
                    }
                    else {
                        $("#RComment_S").text("Введите, пожалуйста, комментарий или прикрепите файл").show()
                        window.setTimeout(function () { $('#RComment_S').hide(); }, 5000);
                    }

                })

                if (st == 4 || st == 5) {
                    $("#hdPr").text("Прикрепленный файл")
                    // $('#hstComh,#hstCom,#RComment').hide()
                    $('#SaveDD,#updateRequest,#SaveMO').hide();
                    $("#backUo").show().text('Назад');
                    $('#backUo').click(function () {
                        var loc = window.location.pathname
                        var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
                        window.location.href = back
                        //parent.history.back();
                    });
                    $('#opl').attr('disabled', 'disabled')
                    // $("#shServ").hide();
                    $('#Acnum,#RequestKind,#reqType').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    if (st == 5) {
                        $("#hedrZ").attr("Z_id", R_id);
                        GetRSComment(R_id)
                        // $("#lstcmnt").show();
                        $(document).on('click', '#lstcmnt', function () {
                            var last = $("#hstCom h4:last-child").text();
                            //alertMessage("", last, "");
                            Commentst();

                            //alert(last)
                        })
                    }
                    else {
                        $("#hedrZ").attr("Z_id", R_id);
                    }


                    $("#hComennt").hide();
                    $("#RComment").hide();
                    $('#objctZ,#Sets,#Otven,#prjcts,#disps').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');

                    $("#chkem,opl").attr('disabled', 'disabled')
                    $("#Room,#Entrance,#Floor").attr('disabled', 'disabled')
                    $("#Ind").attr('disabled', 'disabled')
                    $("#Phn").attr('disabled', 'disabled')
                    $("#AddedTable").hide();
                    // $("#PrServiceH").find('th:eq(2)').hide();
                    $("#calen1").attr('disabled', 'disabled')
                    $("#tm").attr('disabled', 'disabled')
                    $("#IspolList").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#Room_Type").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#RText").attr('disabled', 'disabled');
                    // $("#files").attr('disabled', 'disabled');
                    $("#files").hide();
                    $('#dvSendUppl').show();
                    $("#RComment,#SendComent,#hstComh,#hstCom,#hComennt").attr('disabled', 'disabled').show();;
                    $("#SaveDD").hide();
                    $("#objctZ").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)')

                    //  $('#PrServiceH tr:eq(0) td:eq(4) .delBtn').attr('disabled', 'disabled');

                }
                if (st == 3) {
                    $("#lstcmnt").show();
                    $('#SaveMO').hide()
                    $('#opl').attr('disabled', 'disabled');
                    // $("#shServ").hide();
                    $("#hdPr").text("Прикрепленный файл")
                    GetRSComment(R_id)
                    // $('#').attr('disabled','disabled')
                    $('#objctZ,#Otven,#prjcts,#disps,#reqType,#RequestKind').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    // getEngTextDispForVerVrbt(LogId, "2");
                    $("#hedrZ").attr("Z_id", R_id);
                    $("#chkem").attr('disabled', 'disabled')
                    $("#Room,#Entrance,#Floor").attr('disabled', 'disabled')
                    $("#Ind").attr('disabled', 'disabled')
                    $("#Phn").attr('disabled', 'disabled')
                    $("#cmntsts").css("max-height", "109px").css("max-width", "100%")
                    $("#fileH_btn").show();
                    $("#HImg").show();
                    $("#AddedTable,#updateRequest").hide();
                    // $("#PrServiceH").find('th:eq(2)').hide();
                    $("#calen1").attr('disabled', 'disabled')
                    $("#tm").attr('disabled', 'disabled')
                    $("#IspolList").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#Room_Type,#Sets,#Otven").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#RText").attr('disabled', 'disabled');
                    //$("#files").attr('disabled', 'disabled');
                    $("#files").hide();
                    $("#SaveDD").text("Закрыть Заявку")
                    var role = sessionStorage.getItem("role")
                    if (role == 16) {
                        $("#SaveDD").hide();
                    }
                    $("#backUo").text("Вернуть заявку в работу ")
                   
                    if (!$.isNumeric(R_id)) {
                        $("#lstcmnt").hide();
                    }
                    $("#dvSendUppl").show();
                    $('#hstComh,#hstCom').show();

                    $(document).on('click', '#vrntVrabot', function () {
                        // var GService = ($('#subMenu').attr('data-d') == undefined) ? 0 : $('#subMenu').attr('data-d');
                        // if (GService != 0) {
                        var successVernuVrabot = true
                        var SLog_id = sessionStorage.getItem("Log")
                        var ispol_2 = ($("#ispol2 option:selected").val() == 0) ? $("#Ispolname").attr("itemid") : $("#ispol2 option:selected").val()
                        var ispol2_Email = ($("#ispol2 option:selected").val() == 0) ? $("#IspolList option:selected").attr('email') : $("#ispol2 option:selected").attr('email')
                        var lenght_nameSup = $('#nameSup').length
                        if (lenght_nameSup != 0) {
                            ispol_2 = null;
                            ispol2_Email = null

                        }
                        var objOt = { "Rid": R_id, "Ispol": ispol_2, 'ispolEmail': ispol2_Email, 'login_id': SLog_id, 'path': window.location.pathname }


                        if (successVernuVrabot == true) {
                            $.ajax({
                                type: "POST",
                                url: "../Super_Disp/CreateDispRequest.aspx/MakeVrabote",
                                data: JSON.stringify(objOt),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (data) {

                                    SaveLog_S("Вернуть заявку в работу", "Важное", "Техник", "Диспетчеризация", "К вам возвращена заявка <" + R_id + ">", SLog_id);
                                    var mn = $('#hedrZ').attr('mn');
                               

                                    SaveFCM('Заявка', 'Заявка №  ' + mn + 'возвращена в работу', 'Заявка №  ' + mn + 'возвращена в работу', '', $('#Acnum').val(), SLog_id, 'CreateDispRequest.aspx', R_id)
                                    //window.location.href = "DispRequests.aspx"
                                    //parent.history.back();
                                    var loc = window.location.pathname
                                    var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
                                    window.location.href = back

                                }
                            })
                        }
                        //   }
                        //else {
                        //    $('#GServices_Err').remove();
                        //    $('#Phn').after('<label style="color:red" id="GServices_Err">Необходимо выбрать группу услуг</label>')
                        //    window.setTimeout(function () {
                        //        $('#GServices_Err').remove();
                        //    }, 5000)
                        //    $("html, body").animate({ scrollTop: 500 }, "slow");
                        //}
                    })
                    $(document).on('click', '#lstcmnt', function () {
                        var last = $("#hstCom h4:last-child").text();
                        //alertMessage("", last, "");
                        Commentst();

                        //alert(last)
                    })
                    $(document).on('click', '#SaveDD', function () {
                        var successZakrit = true;

                        var opl = $('#opl').prop('checked');
                        opl = "" + opl + ""
                        var SLog_id = sessionStorage.getItem("Log")
                        if (successZakrit == true) {
                            var objV = { "Rid": R_id, "comment": $("#RComment").val(), 'login_id': SLog_id, 'path': window.location.pathname }
                            // alert("Ok");
                            // MakeZakrit(objV)
                            $('#myModal5').show();
                            $('#f_iles2').attr('onchange', 'fileForZakrit(this)');
                            $('#lblreason').remove();
                            $('#myModal5').children('.modal-content2').children('.modal-header2').prepend('<label id="lblreason" class="textBlack font24b w-90 mb-0" >Укажите причину закрытия заявки</label>').css('color', 'black')
                            $('#cmntsts2').text('');
                            $('#OkVipol').click(function () {
                                var imgs = []
                                $('#myModal5 .modal-body2').children('img').each(function () {
                                    imgs.push({ "ImgAdres": $(this).attr('data-url') })
                                })
                                if (imgs.length != 0) {
                                    if ($.isNumeric(R_id)) {

                                        SaveFileZakrito(R_id, JSON.stringify(imgs), $('#fiodsp').text(), 5);
                                    }
                                }
                                var textZakrit = $('#cmntsts2').val()
                                if (textZakrit.length != 0) {

                                    if ($.isNumeric(R_id)) {
                                        SaveCommentZakrito(R_id, textZakrit, $('#fiodsp').text(), 5);
                                    }
                                }

                                $('.ui-loader-background,#loader').show();
                                if ($.isNumeric(R_id)) {
                                    MakeZakrit(objV, R_id)
                                }
                                else {
                                    MakeZakritSupp(R_id, JSON.stringify(imgs), textZakrit)
                                }
                            })



                            $('#close_5').click(function () {
                                $('#cmntsts2').text('');
                                $('#myModal5 .modal-body2').children('.titleF,.fa,img,br').remove();
                                $('#myModal5').hide();
                                $('#f_iles2').removeAttr('onchange')
                                //$('#cmntsts2').text('Все работы по данной заявке выполнены')
                            })
                            $('#Close_Ot').click(function () {
                                $('#close_5').click();
                            })

                        }

                    })


                    $(document).on('click', '#backUo', function () {
                        var successVernut = true


                        if ($.isNumeric(R_id)) {
                            var lenght_nameSup = $('#nameSup').length
                            if (lenght_nameSup == 0) {
                                vernutVrabot(R_id)
                            }
                            else {
                                $('#vrntVrabot').click();
                            }
                        }
                        else {

                            var P_Services = [];
                            var ismc = "";
                            $('#PrServiceH tbody tr').each(function () {


                                var SERVICE_NAME = $(this).attr('service-name')
                                SERVICE_NAME = (SERVICE_NAME == undefined) ? $(this).attr('grup-name') : SERVICE_NAME;
                                SERVICE_NAME = (SERVICE_NAME == undefined) ? $(this).children('td:eq(0)').text() : SERVICE_NAME;
                                var SERVICE_GUID = ($(this).attr('service-guid') != undefined) ? $(this).attr('service-guid') : ($(this).attr('grup-guid') != undefined) ? $(this).attr('grup-guid') : $('.selectdrc').attr('guid')
                                ismc = $(this).attr('ismc');
                                var QUANTITY = $(this).children('td:eq(1)').children('input[type="text"]').val();
                                QUANTITY = (QUANTITY == undefined) ? 0 : QUANTITY.replace(',', '.')

                                var eq = ($('#PrServiceH thead tr th:eq(0)').text() == 'Наименование направления') ? 1 : 3
                                var COST = $(this).children('td:eq(' + eq + ')').children('a').text()


                                COST = (COST == undefined || COST == 'Договорная') ? '0.00' : COST

                                P_Services.push({ COST: COST, QUANTITY: QUANTITY, SERVICE_GUID: SERVICE_GUID, SERVICE_NAME: SERVICE_NAME })

                            })
                            var opl = $('#opl').prop('checked');
                            var em_ = $('#chkem').prop('checked')

                            var Calendar = $("#calen1").val();
                            var time = $("#tm").val();
                            var ispol = "";
                            var RESPONSIBLE_ID = 0;
                            var RESPONSIBLE_EMAIL = "";
                            var PERFORMER_EMAIL = "";

                            var request_type = $('#reqType').val()
                            var role = sessionStorage.getItem("role")
                            if (role == 15) {
                                request_type = "1"
                            }
                            if (ismc == "True") {
                                RESPONSIBLE_ID = $('#Otven').val();
                                RESPONSIBLE_EMAIL = $('#Otven option:selected').attr('email')
                                if ($("#ispol2 option:selected").val() == 0) {
                                    ispol = $('#IspolList').val()
                                    PERFORMER_EMAIL = $('#IspolList option:selected').attr('email')
                                }
                                else {
                                    PERFORMER_EMAIL = $('#ispol2 option:selected').attr('email')
                                    ispol = $("#ispol2 option:selected").val()
                                }
                            }
                            else {
                                ispol = null
                            }
                            var obj =
                            {
                                'Rid': $('#hedrZ').attr('z_id'),
                                'prs': P_Services,
                                'opl': opl,
                                'login_id': SLogId,
                                'em': em_,
                                'Pdate': Calendar,
                                'Ptime': time,
                                'SpId': $('#IspolList').val(),
                                'RESPONSIBLE_ID': RESPONSIBLE_ID,
                                'TOTAL_COST': $('#total').text(),
                                'RESPONSIBLE_EMAIL': RESPONSIBLE_EMAIL,
                                'PERFORMER_EMAIL': PERFORMER_EMAIL,
                                'AUTHOR': $('#fiodsp').text(),
                                'StatusId': "1",
                                'path': window.location.pathname,
                                'SPECIATISTS_': null,
                                'request_type': request_type,
                                'RequestKind': $('#RequestKind option:selected').attr('guid'),


                            }
                            //SPECIATISTS
                            otpravToVrabotSupp(obj, R_id)
                        }

                    })
                    $('#GServices').attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)')
                    $('#shServ,#Acnum').attr('disabled', 'disable');
                  
                }
            })
        }
        if (role == 15) {
            $('#Otven,#AddSpecialist').hide();//#IspolList,
            $('#lblSupp,#nameSup,.sps').remove();
            $('#Otven').prev('label').hide()//,#IspolList_S
            $('#planTime').next('br').after('<label id="lblSupp">Наименование поставщика</label><input type="text" disabled="disabled"   id="nameSup">')

        }
        $("#reqType").select2({
            minimumResultsForSearch: Infinity
        });
    }
})
function GetSelectedServices() {
    var P_Services = [];
    successRequest=true
    var ismc=""
    $('#PrServiceH tbody tr').each(function () {

        var SERVICE_NAME = $(this).attr('service-name')
        SERVICE_NAME = (SERVICE_NAME == undefined) ? $(this).attr('grup-name') : SERVICE_NAME;
        SERVICE_NAME = (SERVICE_NAME == undefined) ? $(this).children('td:eq(0)').text() : SERVICE_NAME;
        var SERVICE_GUID = ($(this).attr('service-guid') != undefined) ? $(this).attr('service-guid') : ($(this).attr('grup-guid') != undefined) ? $(this).attr('grup-guid') : $('.selectdrc').attr('guid')
        ismc = $(this).attr('ismc');
        var QUANTITY = $(this).children('td:eq(1)').children('input[type="text"]').val();
        QUANTITY = (QUANTITY == undefined) ? 0 : QUANTITY.replace(',', '.')

      //  var eq = ($('#PrServiceH thead tr th:eq(0)').text() == 'Наименование направления') ? 1 : 3
        var COST = $(this).children('td:eq(3)').children('a').text()


        COST = (COST == undefined || COST == 'Договорная') ? '0.00' : COST

        P_Services.push({ COST: COST, QUANTITY: QUANTITY, SERVICE_GUID: SERVICE_GUID, SERVICE_NAME: SERVICE_NAME })

    })
    var suppServices=[]
    $('#PrServiceH tbody tr').each(function () {
        SERVICE_GUID = ($(this).attr('service-guid') != undefined) ? $(this).attr('service-guid') : ($(this).attr('grup-guid') != undefined) ? $(this).attr('grup-guid') : $('.selectdrc').attr('guid')
        ismc = $(this).attr('ismc');
        SERVICE_NAME = $(this).attr('service-name')
        SERVICE_NAME = (SERVICE_NAME == undefined) ? $(this).attr('grup-name') : SERVICE_NAME;
        SERVICE_NAME = (SERVICE_NAME == undefined) ? $(this).children('td:eq(0)').text() : SERVICE_NAME;
        SERVICE_COUNT = $(this).children('td:eq(1)').children('input[type="text"]').val();
        SERVICE_COUNT = (SERVICE_COUNT == undefined) ? 0 : SERVICE_COUNT.replace(',', '.')

        var eq = 3;// ($('#PrServiceH thead tr th:eq(0)').text() == 'Наименование направления') ? 1 : 3
        SERVICE_COST = $(this).children('td:eq(3)').children('a').text()

        if (SERVICE_COST == undefined || SERVICE_COST == 'Договорная') {
            successRequest = false
            $('#costErr').remove()
            var Td_position = $(this).children('td:eq(' + eq + ')').offset().top
            $(this).children('td:eq(' + eq + ')').children('a').after('<label id="costErr" style="color:red">Необходимо указать сумму</label>')
            $("html, body").animate({ scrollTop: (Td_position -100)}, "slow");
            window.setTimeout(function () { $('#costErr').remove(); }, 5000);
        }
        // SERVICE_COST = (SERVICE_COST == undefined || SERVICE_COST == 'Договорная') ? '0.00' : SERVICE_COST

        // P_Services.push({ COST: COST, QUANTITY: QUANTITY, SERVICE_GUID: SERVICE_GUID })
        suppServices.push({
            "SERVICE_GUID": SERVICE_GUID,
            "SERVICE_NAME": SERVICE_NAME,
            //  "MASTER_GUID": GUID,
            "SERVICE_COST": SERVICE_COST,
            "SERVICE_COUNT": SERVICE_COUNT,
            "SERVICE_END_COST": SERVICE_COST,
            "SERVICE_PERCENT": "",
            "SERVICE_SHOP_ID": "",
            "SERVICE_COMMENT": "",
            "SERVICE_CUSTOM": ""
        })
    })
    return { 'P_Services': P_Services, 'ismc': ismc, 'suppServices': suppServices, 'successRequest': successRequest}
}

function ErrorForControls(e, text) {
    var e_class = $(e).attr('class')
    if (e_class == 'select2-hidden-accessible') {
        $(e).parent().find('.select2-selection').attr('style', 'border-color:#f06d06 !important') 
        if (text != undefined) {
            var originalText = $(e).next().next('label').text()
            $(e).next().next('label').attr('style', 'color: red').text(text)
            var select2Id = $(e).attr('id');
            var spanId = '#select2-' + select2Id + '-container'
            var original_title = $(spanId).attr('title')
            $(spanId).attr('title', text)
            window.setTimeout(function () {
                $(e).removeAttr('title'),
                    $(spanId).attr('title', original_title)
                $(e).next().next('label').removeAttr('style').text(originalText)

            }, 5000);
        }
        window.setTimeout(function () {
            $(e).parent().find('.select2-selection').removeAttr('style')
        }, 5000);
    }
    else {
        $(e).attr('style', 'border-color:#f06d06;')
    }
    var position = $(e).offset().top//getOffset(e).top//e.position();
    $("html, body").animate({ scrollTop: (position-100) }, "slow");
    
    window.setTimeout(function () { $(e).removeAttr('style'); $('#servicelbl').remove()}, 5000);
   
    if (text != undefined) {
        var originalText = $(e).next('label').text()
        $(e).next('label').attr('style', 'color: red').text(text)
        window.setTimeout(function () {
            $(e).next('label').removeAttr('style').text(originalText)
            
        }, 5000);
    }
}
function checkControls(e) {
   var  isSuccess=true
    var prjcts = $("#prjcts").val();
    if (prjcts == 0) {
        isSuccess = false;
        ErrorForControls($("#prjcts"))
    }
    var slcObj = $("#objctZ").val();
    if (isSuccess == true) {
     
        if (slcObj == 0) {
            isSuccess=false
            ErrorForControls($("#objctZ"))
        }
    }
    var RequestKind = $("#RequestKind").val();
    var role = sessionStorage.getItem("role")
    if (isSuccess==true) {
        if (role=="15") {
            RequestKind=1
        }
        if (RequestKind == 0) {
            isSuccess=false
            ErrorForControls($("#RequestKind"))
        }
    }
    var P_Services = [];
    if (isSuccess == true) {
    
        var ServicesLength = $('#PrServiceH tbody tr').length;
       
        if (ServicesLength == 0) {
            isSuccess = false;
            $('#servicelbl').remove()
            $('#directions').before('<label id="servicelbl" style="color:red;font-weight: bold;float:left">Необходимо выбрать услуг</label>')
            ErrorForControls($('#SerchService'));
        }
        else {
            isSuccess = GetSelectedServices().successRequest
            P_Services = GetSelectedServices().P_Services
        }
    }
    var ismc = GetSelectedServices().ismc
    var RESPONSIBLE_ID = (ismc == "True" || ismc == undefined) ? $('#Otven').val() : null
    var RESPONSIBLE_EMAIL = (ismc == "True" || ismc == undefined) ? $('#Otven option:selected').attr('email') : null
    var PERFORMER_EMAIL = $('#IspolList option:selected').attr('email')//(ismc == "True" || ismc == undefined) ? $('#IspolList option:selected').attr('email') : null
    var ispol = $('#IspolList').val()// (ismc == "True" || ismc == undefined) ? $('#IspolList').val() : null

    var rm_Type = $("#Room_Type").val();
    if (isSuccess == true) {
    
        if (rm_Type == 0) {
            isSuccess = false;
            ErrorForControls($('#Room_Type'));
        }
    }
    var room_ = $("#Room").val();
    if (isSuccess == true) {
    
        if (room_.length == 0) {
            isSuccess = false;
            ErrorForControls($('#Room'));
        }
    }
    var accnmbr = $("#Acnum").val();
    if (isSuccess==true) {
    
        if (accnmbr.length == 0) {
            isSuccess = false;
            ErrorForControls($('#Acnum'));
        }
    }
    var Ind = $("#Ind").val();
    if (isSuccess == true) {
     
        if (Ind.length == 0) {
            isSuccess = false;
            ErrorForControls($('#Ind'));
        }
    }
    var Phn = $("#Phn").val();
    if (isSuccess == true) {

        if (Phn.length == 0) {
            isSuccess = false;
            ErrorForControls($('#Ind'));
        }
    }


   
    var Calendar = $("#calen1").val();
    var time = $("#tm").val();
    if (isSuccess == true) {
       
     if (Calendar == "" || time == "") {
        
         if (time == "") {
           
             isSuccess = false;
             ErrorForControls($('#tm'));
            }
            if (Calendar == "") {
                isSuccess = false;
                ErrorForControls($('#calen1'));

            }
           
        }
        else {


            var mindate = getDateForCheck();
            var mintime = getTime("");
            if (Calendar < mindate) {
                successRequest = false
                $("#calen1").val(Calendar)
                $("#tm").val(time);
                isSuccess = false;
                ErrorForControls($('#calen1'),'Необходимо указать дату  не ранее текущей ');

            }
            if (time <= mintime && Calendar == mindate) {
                successRequest = false
                $("#tm_S").text("Необходимо указать время  не ранее текущего").show();
                $("#calen1").val(Calendar)
                $("#tm").val(time);
                isSuccess = false;
                ErrorForControls($('#tm'), 'Необходимо указать время  не ранее текущего');
            }

        }
    }
    var otvets = $("#Otven").attr('itemid');
    var RText = $("#RText").val();
    RText = encodeURIComponent(RText)
    var indid = $("#Ind").attr("itemid");

    slcObj = JSON.parse(slcObj)
    var ObjId = $("#objctZ").val();
    var sclObjName = $("#objctZ option:selected").text();
    var indid = $("#Ind").attr("itemid")
    var RComment = $('#RComment').val()
    if (isSuccess == true) {

        if (indid == undefined) {
            //var objNotInd = [];
            //objNotInd.push({ "Object_Adress": sclObjName, "Object_Id": ObjId, "room": room_, "indName": Ind, "phon": Phn, "score": $('#Acnum').val() })
            //RComment = RComment + "|" + JSON.stringify(objNotInd)
            indid = 0;

            // alert("Помещение не найдено в системе")
            isSuccess = false;
            ErrorForControls($('#Ind'), 'Помещение не найдено в системе');
        }

    }
    RComment = encodeURI(RComment)
    var RImg = []; // $(".foto-disp").attr("data-url")
    //for (var i = 0; i < 4; i++) {
    //    RImg.push({ "REQUEST_COMMENT_": "=", "COMMENT_FILE": $("#fotoDisp" + i + "").attr("data-url"), "COMMENT_DATETIME": "++" });
    //}
    $("#imgss img").each(function () {
        var ImgSrc = $(this).attr("data-url")
        RImg.push({ "REQUEST_COMMENT_": "=", "COMMENT_FILE": ImgSrc, "COMMENT_DATETIME": "++" })
    })
    var ImgSrc = "";
     $("#imgss img").each(function (i) {

        if (i == 0) {
            ImgSrc = $(this).attr("data-url")
        }
        else {
            ImgSrc = ImgSrc + "," + $(this).attr("data-url")
        }

        // RImg.push({ "REQUEST_COMMENT_": "=", "COMMENT_FILE": ImgSrc, "COMMENT_DATETIME": "++" })
    })
    var em_ = $('#chkem').prop('checked')
    em_ = "" + em_ + ""
    var opl = $('#opl').prop('checked');
    opl = "" + opl + ""
    var request_type = $('#reqType').val()
   
    if (role == 15) {
        request_type = "1"
    }
    var SPECIATISTS = null
    if (location.pathname == '/Responsible_Admin/CreateRequest.aspx' && $('.manysps').length != 0) {


        //SPECIATISTS = Sps_json();//JSON.stringify(spesialists_)
        //if (SPECIATISTS == false) {
        //    successRequest = false
        //}
    }
    var SLogId = sessionStorage.getItem("Log")
    RESPONSIBLE_EMAIL = (RESPONSIBLE_EMAIL == undefined) ? "no@mail.com" : RESPONSIBLE_EMAIL
    var obj = {
        'slcObj': slcObj,
        'IndId_': indid,
        'Lg': SLogId,
        'em': em_,
        'Pdate': Calendar,
        'Ptime': time,
        'spId': ispol,
        'Rt': RText,

        'Rc': RComment,

        'RoomT': rm_Type,
        'NUMBER': accnmbr,
        'opl': opl,
        'phn': Phn,
        'HReq': $('#hedrZ').attr('z_id'),
        'indName': $('#Ind').val(),
        'TOTAL_COST': $('#total').text(),
        'RESPONSIBLE_ID': RESPONSIBLE_ID,
        'RESPONSIBLE_EMAIL': RESPONSIBLE_EMAIL,
        'AUTHOR_COMMENT': $('#fiodsp').text(),
        'PERFORMER_EMAIL': PERFORMER_EMAIL,
        'STATUS_ID': $(e).attr('data-status'),
        'request_type': request_type,
        'RequestKind': $('#RequestKind option:selected').attr('guid'),
        'path': window.location.pathname



    }
    //console.log('json Object');
    //console.log(JSON.stringify(obj));

    //console.log('json P_Services');
   // console.log(JSON.stringify(P_Services));

  //  console.log('json RImg');
   // console.log(JSON.stringify(RImg));
    if (ismc == "True" && RequestKind == 1) {
        ismc = "False"
    }

    return { 'isSuccess': isSuccess, 'ismc': ismc, 'P_Services': P_Services, 'obj': obj, 'RImg': RImg, 'RImgM': ImgSrc, 'suppServices': GetSelectedServices().suppServices}
}
function checkmanysps(e) {
    var lastPerformerListSpsVal = $('.PerformerListSps:last').val()
    var disabled = $('#AddSpecialist').attr('disabled')
    if ($('.manysps').length == 10 && disabled === "disabled" && lastPerformerListSpsVal != 0) {
        //  alert('В заявке указано максимальное количество исполнителей!')
        alertMessage(':(', 'В заявке указано максимальное количество исполнителей!', '')
        $('#tempBut').remove();
        $('#myModal .modal-content .modal-footer').append('<input type="button" onclick="removeme(this)" id="tempBut" value="OK" style="color: blue;width: 25%;background: white;border-color: white;">')

        setTimeout(function () { $('#tempBut').click() }, 5000);
    }

}
function removeme(e) {
    $('#myModal .modal-content .modal-header #close').click()
    $('#tempBut').remove();

}
function Add_Specialist(selected) {
    //.css('display','none!important');

    var position = ($('.sps').length == 0) ? '#IspolList' : '.sps:last'

    var checked = ($('.sps').length == 0) ? 'checked="checked"' : ''
    var last = ($('.sps').length == 0) ? '' : ':last'
    var extradiv = ($('.sps').length == 0 && selected == undefined) ? '<div class="col-md-12 manysps"  ><div class="col-md-4"><i class="fa fa-close Spsremove" onclick="removeSps(this)" aria-hidden="true" ></i><select class="PerformerListSps"></select></div><div class="col-md-4"><input type="radio" name="sps" class="spsRadio"></div><div class="col-md-4"><select class="ServicesSps" multiple="multiple"></select></div></div>' : ''
    //  var lastSpsval = ($('.sps').length != 0) ? $('.PerformerListSps:last').val() : $('#IspolList').val();
    $(position).after('<div style="margin-left:-30px!important;" class="sps"><div class="col-md-12 hdrlbl" ><div class="col-md-5"><label>Выберите исполнителя</label></div><div class="col-md-4"><label>Ответственный за выполнение</label></div></div><div class="col-md-12 manysps" id=""><div class="col-md-4"><i class="fa fa-close Spsremove" onclick="removeSps(this)" aria-hidden="true" ></i><select class="PerformerListSps"></select></div><div class="col-md-4"><input type="radio" name="sps" ' + checked + ' class="spsRadio"></div><div class="col-md-4"><select class="ServicesSps" class="ServicesSps" multiple="multiple"></select></div></div>' + extradiv + '</div>')
    if ($('.hdrlbl').length > 1) {
        $('.hdrlbl:last').remove();
    }
    var IspolList_length = $('#IspolList').length
    if (IspolList_length != 0) {
        $('#loader').data('IspolList', $('#IspolList'))
        $('#hedrZ').data('lblispol', $('#lblispol'))
    }

    var IspolList = $('#loader').data('IspolList')
    var spesicalists = $(IspolList).children('option').clone()
    // console.log($('#IspolList'))
    $('#IspolList,#lblispol').remove()

    $('.PerformerListSps:last').append('<option value="0">Выберите исполнителя</option>').attr('onchange', 'activateAddButon(this)')
    $('.PerformerListSps' + last + '').append(spesicalists)

    $('.PerformerListSps').each(function () {
        var value = $(this).val();
        if (value != 0) {
            $('.PerformerListSps:last').children('option[value="' + value + '"]').remove();
        }
    })


    if (selected == undefined) {
        $('#SaveDD').hide();
        $('#SaveMO').show()
        $('#PrServiceH tbody tr').each(function () {
            var grup_guid = $(this).attr('grup-guid');
            var service_guid = $(this).attr('service-guid')
            var attrGuid = (service_guid != undefined) ? 'grup-guid="' + grup_guid + '" service-guid="' + service_guid + '"' : (grup_guid != undefined) ? 'grup-guid="' + grup_guid + '"' : 'guid="' + $('.selectdrc').attr('guid') + '"'
            var service_name = '';
            if (grup_guid == undefined && service_guid == undefined) {
                service_name = $(this).children('td:eq(0)').text()

            }
            else {
                service_name = $(this).attr('title')
                service_name = service_name.substring(service_name.length, service_name.lastIndexOf('>') + 1);
            }



            $('.ServicesSps' + last + '').append('<option ' + attrGuid + '>' + service_name + '</option>')

        })
        $('.PerformerListSps' + last + '').children('option:eq(0)').attr('selected', 'selected')

    }
    else {
        (selected.IS_RESPONSIBLE == "True") ? $('.spsRadio:last').attr('checked', 'checked') : '';
        //  $('.spsRadio:last').attr('checked', spsRadio);
        $('.PerformerListSps' + last + '').children('option[value="' + selected.SPECIALIST_ID + '"]').attr('selected', 'selected')


        var SGUID = JSON.parse(selected.SGUID);

        for (var i = 0; i < SGUID.length; i++) {

            var attr = SGUID[i].serviceGuid
            var serviceName = SGUID[i].serviceName
            $('.ServicesSps' + last + '').append('<option ' + attr + ' >' + serviceName + '</option>')//
        }


        var st = urlParam('st')
        if (st == 4 || st == 5 || st == 3) {

            $('.PerformerListSps,.spsRadio').attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)')
            $('.Spsremove').attr('disabled', 'disabled').removeAttr('onclick').css('color', 'rgb(235, 235, 228)')
        }

    }

    $('#AddSpecialist').attr('disabled', 'disabled')

    $('.ServicesSps').multiselect({
        nonSelectedText: 'Выберите Услуги',
        selectAllText: 'Выберите все услуги',
        allSelectedText: 'Все услуги выбраны',
        nSelectedText: 'Выбранных услуг',
        includeSelectAllOption: true,


        onInitialized: function () {
            if (selected != undefined) {
                var st = urlParam('st')
                if (st == 4 || st == 5 || st == 3) {
                    $('input[type=checkbox]').attr('disabled', 'disabled')
                    //  enableClickableOptGroups:true
                    //  $('.ServicesSps').multiselect({ enableClickableOptGroups: true})
                    // templates: { }
                }
            }

        }

    });

    //$('#lblispol').hide()
    // $('#IspolList').attr('style', 'display: none !important;')
    //  $('select[onchange="ChangeToSend(this)"]').hide()


}
function Sps_json() {
    var result = true
    var spesialists_ = []
    $('.manysps').each(function () {
        var spId = $(this).children('div:eq(0)').children('.PerformerListSps').val();
        var spEmail = $(this).children('div:eq(0)').children('.PerformerListSps').children('option:selected').attr('email');
        var isResp = $(this).children('div:eq(1)').children('.spsRadio').prop('checked')
        isResp = (isResp == true) ? '1' : '0'
        var sguid = "";
        var services_of_Specialit = [];
        if (spId != 0) {
            var hasSelected = 0
            $(this).children('div:eq(2)').children('.multiselect-native-select').children('.ServicesSps').children('option').each(function () {
                var selected = 'no-s="0"';
                if ($(this).is(':selected')) {
                    selected = 'selected="selected"'
                    hasSelected = 1
                }

                var grup_guid = $(this).attr('grup-guid')
                var service_guid = $(this).attr('service-guid')
                var guid = $(this).attr('guid')
                //sguid = (service_guid != undefined) ? service_guid : (grup_guid != undefined) ? grup_guid : guid
                var serviceName = $(this).text();
                sguid = (service_guid != undefined) ? 'grup-guid="' + grup_guid + '" service-guid="' + service_guid + '" ' + selected + '' : (grup_guid != undefined) ? 'grup-guid="' + grup_guid + '" ' + selected + '' : 'guid="' + guid + '" ' + selected + ''
                services_of_Specialit.push({ "serviceGuid": sguid, 'serviceName': serviceName.trim() })

            })
            if (hasSelected == 0) {
                $('#errServssps').remove();
                // $("html, body").animate({ scrollTop: 1500 }, "slow");
                $("html, body").delay().animate({
                    scrollTop: $('#calen1').offset().top
                }, 500);
                $(this).children('div:eq(2)').children('.multiselect-native-select').append('<label style="color:red" id="errServssps">Необходимо выберите услуги</label>')
                result = false
                setTimeout(function () { $('#errServssps').remove(); }, 5000);
            }
        }
        if (result != false) {
            // result=false
            spesialists_.push({ "spId": spId, "sguid": JSON.stringify(services_of_Specialit), 'isResp': isResp, 'spEmail': spEmail })
            result = JSON.stringify(spesialists_)
        }
    })
    if (result != false) {
        result = JSON.stringify(spesialists_)
    }
    return result
}
function removeSps(e) {
    $('#AddSpecialist').removeAttr('disabled')
    $(e).parent().parent().parent().remove();
    if ($('.manysps').length == 0) {
        // $('#lblispol,#IspolList').show();
        var IspolList = $('#loader').data('IspolList')
        var lblispol = $('#hedrZ').data('lblispol');
        $('#planTime').next('br').after(lblispol)
        $('#lblispol').after(IspolList);
        $('.hdrlbl').remove();
        $('#SaveDD').show();
        $('#SaveMO').hide()
    }
}
function activateAddButon(e) {
    if ($(e).val() == 0) {
        $('#AddSpecialist').attr('disabled', 'disabled')
    }
    else {

        if ($('.manysps').length < 10) {
            $('#AddSpecialist').removeAttr('disabled')
        }
    }
}
function Change_suppreq_statusSuper(lg, reqGuid, status_id, dss, ReqNum) {
    var obj = { tokenID: lg, REQ_GUID: reqGuid, STATUS_ID: status_id, DESCRIPTION: dss }
    $.ajax({
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + '//WCFServices/MATORIN.QUICK_API.svc/Change_suppreq_status',
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var SLog_id = sessionStorage.getItem("Log")
            var statusText = (status_id == "1") ? "принята в работу" : (status_id == "3") ? " выполнена" : (status_id == "5") ? "закрыта" : "отменена"
            SaveLog_S(statusText, "Простое", "Диспетчер", "Диспетчеризация", "Заявка < " + ReqNum + " > " + statusText + "", SLog_id);
            var loc = window.location.pathname;
            var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
            window.location.href = back
            //parent.history.back();
        }
    })
}
function RabotVipolSuper(R_id) {
    var modal = document.getElementById('myModal5');
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    $('#reasonlbl').text('');
    $('#cmntsts2').val('Все работы по данной заявке выполнены')
    $('#f_iles2').attr('onchange', 'fileForVipol(this)')
    $("#close_5").click(function () {
        modal.style.display = "none";
        $('#f_iles2').removeAttr('onchange');
        $(".modal-body2 img").remove()
        $(".modal-body2 h4").remove();
        $(".modal-body2 i").remove()
    })
    //window.onclick = function (event) {
    //    if (event.target == modal) {
    //        modal.style.display = "none";
    //        $(".modal-body2 img").remove()
    //        $(".modal-body2 h4").remove();
    //        $(".modal-body2 i").remove()
    //    }
    //}
    $("#Close_Ot").click(function () {
        modal.style.display = "none";
        $(".modal-body2 img").remove()
        $(".modal-body2 h4").remove();
        $(".modal-body2 i").remove()
    })
    $("#OkVipol").click(function () {
        var imgs = [];
        $(".modal-body2 img").each(function () {
            var ImgSrc = $(this).attr("data-url")
            imgs.push({ "ImgAdres": ImgSrc });
        })
        var imgsCount = imgs.length;
        if (imgsCount == 0) {
            imgs.push({ "ImgAdres": 0 });
        }
        var P_Services = checkControls().P_Services;
         
        $('.ui-loader-background,#loader').show();
        var SLog_id = sessionStorage.getItem("Log")
        var rid = checkControls().obj.HReq//$('#hedrZ').attr('z_id')
        //var SPECIATISTS = null
        var role = sessionStorage.getItem("role")
        //var request_type = $('#reqType').val()
        var role = sessionStorage.getItem("role")
        var SuccessVipol = checkControls().isSuccess

        if (SuccessVipol == true) {

            var objV = {
                "Rid": checkControls().obj.HReq, //$('#hedrZ').attr('z_id'),
                "rsf": JSON.stringify(imgs),
                "rst": $("#cmntsts2").val(),
                'opl': checkControls().obj.opl,
                'login_id': checkControls().obj.Lg,//SLog_id,
                "ispol": (checkControls().obj.spId == undefined) ? null : checkControls().obj.spId,
                "ispolEmail": (checkControls().obj.PERFORMER_EMAIL == undefined) ? null : checkControls().obj.PERFORMER_EMAIL,
                "RESPONSIBLE_ID": checkControls().obj.RESPONSIBLE_ID,
                "RESPONSIBLE_EMAIL": checkControls().obj.RESPONSIBLE_EMAIL,
                'TOTAL_COST': checkControls().obj.TOTAL_COST,//$('#total').text(),
                "prs_json": JSON.stringify(P_Services),
                "Pdate": checkControls().obj.Pdate,// $('#calen1').val(),
                "Ptime": checkControls().obj.Ptime,// $('#tm').val(),
                'path': checkControls().obj.path,//window.location.pathname,
                'SPECIATISTS_': null,
                'request_type': checkControls().obj.request_type,
                'RequestKind': checkControls().obj.RequestKind// $('#RequestKind option:selected').attr('guid'),
            }
            var Url;
            if ($.isNumeric(R_id)) {
                Url = "../Super_Disp/CreateDispRequest.aspx/makeVipol"
            }
            else {
                Url = "../Super_Disp/CreateDispRequest.aspx/makeVipolSupp"
            }
            $.ajax({
                type: "POST",
                url: Url,//http://localhost:64339/
                data: JSON.stringify(objV),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {//Заявка по работе <Номер заявки> выполнена
                    var mn = $('#hedrZ').attr('mn')
                    if (Url != "../Super_Disp/CreateDispRequest.aspx/makeVipolSupp") {
                        SaveFCM('Заявка', 'Заявка получила статус «Выполнена»', 'Заявке № ' + mn + 'в статусе «Выполнена».', '', $('#Acnum').val(), SLog_id, 'CreateDispRequest.aspx', rid)
                    }
                    
                    //  SaveLog_S("Работа выполнена", "Важное", "Диспетчер", "Диспетчеризация", "Работа по заявке < " + rid + " > выполнена", SLog_id);
                    //window.location.href = "DispRequests.aspx"
                    var loc = window.location.pathname
                    var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
                    window.location.href = back
                    //parent.history.back();
                }
            })

        }

    })
    //$("#OkVipol").click(function () {
    //    var LogId = sessionStorage.getItem("Log")
    //  //  Change_suppreq_statusSuper(LogId, $('#hedrZ').attr('guid'), "3", $('#cmntsts2').val(), $('#hedrZ').attr('r_num'))
    //})
}
function UpdateRequest(e) {
    var successRequest = checkControls().isSuccess;

  

    if (successRequest == true) {
        var obj = {
            'slcObj': checkControls().obj.slcObj,
            'IndId_': checkControls().obj.IndId_,
            'Lg': checkControls().obj.Lg,
            'em': checkControls().obj.em,
            'Pdate': checkControls().obj.Pdate,
            'Ptime': checkControls().obj.Ptime,
            'spId': checkControls().obj.spId,
            'Rt': checkControls().obj.Rt,

            'Rc': checkControls().obj.Rc,

            'RoomT': checkControls().obj.RoomT,
            'NUMBER': checkControls().obj.NUMBER,
            'opl': checkControls().obj.opl,
            'phn': checkControls().obj.phn,
            'HReq': checkControls().obj.HReq,
            'indName': checkControls().obj.indName,
            'TOTAL_COST': checkControls().obj.TOTAL_COST,
            'RESPONSIBLE_ID': checkControls().obj.RESPONSIBLE_ID,
            'RESPONSIBLE_EMAIL': checkControls().obj.RESPONSIBLE_EMAIL,
            'AUTHOR_COMMENT': checkControls().obj.AUTHOR_COMMENT,
            'PERFORMER_EMAIL': checkControls().obj.PERFORMER_EMAIL,
            'STATUS_ID': e,
            'request_type': checkControls().obj.request_type,
            'RequestKind': checkControls().obj.RequestKind,
            'path': window.location.pathname

        }
        //  alert(ok)
        //  //console.log(obj)
        $('.ui-loader-background,#loader').show()
        var R_id = urlParam('RId')
        R_id = R_id.replace("disp_", "");
        if ($.isNumeric(R_id)) {
            SaveRequest_Super(JSON.stringify(obj), JSON.stringify(checkControls().P_Services), JSON.stringify(checkControls().RImg), null);
        }
        else {
            Save_SUPPLIER_Request_Super(JSON.stringify(obj), JSON.stringify(checkControls().P_Services));
        }
    }
}
function urlParam(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null) {
        // return null;
        results = decodeURI(results[1])
    }
    else {
        if (name == "st") {

            results = sessionStorage.getItem("REQUEST_STATUS")
        }
        if (name == "RId") {
            results = sessionStorage.getItem("REQUEST_ID")
        }
    }
    return results;
}
function getPageName(url) {
    var index = url.lastIndexOf("/") + 1;
    var filenameWithExtension = url.substr(index);
    var filename = filenameWithExtension.split(".")[0]; // <-- added this line
    return filename;                                    // <-- added this line
}
function Save_SUPPLIER_Request_Super(jsonRequestString, prs_json) {
    var frmData = new FormData();
    frmData.append('jsonRequestString', jsonRequestString);
    frmData.append('prs_json', prs_json);
    //frmData.append('Cf_json', Cf_json);, Cf_json,
    // frmData.append('SPECIATISTS', SPECIATISTS)SPECIATISTS
    $.ajax({
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + location.port + '/ProjectApi/Request_Fili/Save_SUPPLIER_Request_Super',//"http://localhost:63362/Request_Fili/Save_SUPPLIER_Request_Super",//
        error: function (t) { $('.ui-loader-background,#loader').show(); alert(t) },
        data: frmData,
        contentType: false,//"application/json; charset=utf-8",
        processData: false,
        cache: false,
        //  dataType: "json",
        success: function (data) {
            var jsondata = JSON.parse(data);
            //////console.log(data)
            if (jsondata.result == "Ok") {

                // window.location.href = "DispRequests.aspx"
                var loc = window.location.pathname
                var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
                window.location.href = back
                //parent.history.back();
            }
        }
    })
}
function GetAndSaveDatasSuppRequest(e, successRequest) {
    var SUPPLIER = $('#PrServiceH').children('tbody').children('tr:eq(0)').attr('supp-name');
    var SUPPLIER_GUID = $('#PrServiceH').children('tbody').children('tr:eq(0)').attr('supp-guid');
    var time = $('#tm').val();
    var Calendar = $('#calen1').val()
    var accnmbr = $('#Acnum').val();
    var hm = time.split(':')
    var plusTwoOurs = (parseInt(hm[0]) >= 23 ? 0 : parseInt(hm[0])) + 2
    plusTwoOurs = plusTwoOurs + ":" + hm[1]

    var ImgSrc = checkControls().RImgM;
    var request_type = $('#reqType').val()
    var role = sessionStorage.getItem("role")
    if (role == 15) {
        request_type = "1"
    }
    var PERFORMER_EMAIL = $('#IspolList option:selected').attr('email')
    var ispol = $('#IspolList').val()
    var suppServices = checkControls().suppServices;
   

    var obj_ = {
        'tokenID': "",
        'LOGIN': accnmbr,
        'STATUS': $(e).attr('data-status'),
        'AUTHOR': $('#fiodsp').text(),
        'OBJECT': $('#objctZ option:selected').text(),
        'OBJECT_ID': $('#objctZ').val(),
        'ROOM': $('#Room').val(),
        'CLIENT': $('#Ind').val(),
        'PHONE_NUMBER': $('#Phn').val(),
        'COMMENT': $('#RText').val(),
        'FILES': ImgSrc,
        'PAYMENT_SUMM': $('#total').attr('total-summ'),
        'SUPPLIER': SUPPLIER,
        'SUPPLIER_GUID': SUPPLIER_GUID,
        'COMMENTS': "",
        'cmnt': $('#RComment').val(),
        'CUSTOM': "",
        'spId': ispol,
        'WORKDATE': Calendar,
        'WORKBEGIN': time,
        'WORKEND': plusTwoOurs,
        'PERFORMER_EMAIL': PERFORMER_EMAIL,
        'request_type': request_type,
        'lg': sessionStorage.getItem("Log"),
        'path': window.location.pathname
    }
  
    if (successRequest == true) {
        $('.ui-loader-background,#loader').show()
        Add_Supplier_request(obj_, suppServices)
    }
}
function Add_Supplier_request(jsonRequestString, prs_json) {
    var frmData = new FormData();
    frmData.append('jsonRequestString', JSON.stringify(jsonRequestString));
    frmData.append('prs_json', JSON.stringify(prs_json));
    // frmData.append('Cf_json', Cf_json);
    $.ajax({
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + location.port + '/ProjectApi/Request_Fili/Add_Supplier_request',//"http://localhost:63362/Request_Fili/Add_Supplier_request",//
        error: function (t) { $('.ui-loader-background,#loader').show(); alert(t) },
        data: frmData,
        contentType: false,//"application/json; charset=utf-8",
        processData: false,
        cache: false,
        //  dataType: "json",
        success: function (data) {
            var jsondata = JSON.parse(data)
            if (jsondata.result == "Ok") {

                // window.location.href = "DispRequests.aspx"
                //SaveFCM('Заявки', 'Заявка получила статус «Выполнена»', 'Заявке № ' + jsonReq + ' в статусе «Отправлена».', '', $('#Acnum').val(), SLog_id, 'CreateDispRequest.aspx', jsonReq)
                var loc = window.location.pathname
                var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
                window.location.href = back
                //parent.history.back();
            }
            else {
                $('.ui-loader-background,#loader').hide()
                alert(jsondata.result)
            }
        }
    })
}
function SaveRequest_Super(jsonRequestString, prs_json, Cf_json, SPECIATISTS) {

    //
    //var obj = { 'jsonRequestString': jsonRequestString, 'prs_json': prs_json, 'Cf_json': Cf_json }
    var frmData = new FormData();
    frmData.set('jsonRequestString', jsonRequestString);
    frmData.append('prs_json', prs_json);
    frmData.append('Cf_json', Cf_json);
    frmData.append('SPECIATISTS', SPECIATISTS)
    console.log(frmData)
    $.ajax({
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + location.port + '/ProjectApi/Request_Fili/SaveRequest_Super',//"http://localhost:63362/Request_Fili/SaveRequest_Super",//
        error: function (t) { $('.ui-loader-background,#loader').show(); alert(t) },
        data: frmData,
        contentType: false,//"application/json; charset=utf-8",
        processData: false,
        cache: false,
        //  dataType: "json",
        success: function (data) {
            //////console.log(data)
            var jsondata = JSON.parse(data);
            var jsonReq = jsondata.RequestId;
            var mn = jsondata.MobileN
            var SLog_id = sessionStorage.getItem("Log")
            //    SaveLog_S("Принять в работу", "Простое", "Диспетчер", "Диспетчеризация", "Заявка < " + jsondata.RequestId + " >принята в работу", SLog_id);
            //SaveFCM('Заявки', 'Заявка обновлена', 'Заявке № ' + mn + ' в статусе обновлена.', '', $('#Acnum').val(), SLog_id, 'CreateDispRequest.aspx', jsonReq)
            var comes = sessionStorage.getItem("All");
            if (jsondata.result == "Ok") {

                // window.location.href = "DispRequests.aspx"
                var loc = window.location.pathname
                var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
                window.location.href = back
                //parent.history.back();
            }
            if (jsondata.result == "Halfok") {
                alertMessage("!", "Заявка № " + jsondata.RequestId + " сохранена только в системе " + window.location.host + "  В мобильном приложении она будет недоступна.", ":(")
                window.onclick = function (event) {
                    //   window.location.href = "DispRequests.aspx"
                    var loc = window.location.pathname
                    var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
                    window.location.href = back
                    //parent.history.back();
                }

            }

        }


    })
}
function CalculatTotaleCost() {
    var T_cost = 0;
    $('#total').remove();

    $('#PrServiceH tbody tr').each(function () {
      //  var eq = ($('#PrServiceH thead tr th:eq(0)').text() == 'Наименование направления') ? 1 : 3
        var servicecost = $(this).children('td:eq(' + 3 + ')').children('a').text();
        servicecost = servicecost.replace(',', '.')
        servicecost = isNaN(servicecost) ? '0.00' : servicecost
        T_cost = parseFloat(T_cost) + parseFloat(servicecost)

    })
    T_cost = isNaN(T_cost) ? parseFloat('0.00') : T_cost

    $('.totalh7').remove()
     $('#PrServiceH').after('<div class="totalh7" > <h7 id="total" total-summ=\"' + T_cost.toFixed(2) + '\" style="float: right">Итого: ' + T_cost.toFixed(2) + ' руб</h7></div>');
   

}
function SelectFinded_K(e, SERVICE_GUID) {
    var selected = $(e).prop('checked');
    var suppGuid = $(e).attr('supp-guid');
    var grupName = $(e).attr('grupp-name')
    var edizm = $(e).attr('data-edizm');
    var ServiceName = (edizm.length == 0) ? "" : '<i class="glyphicon glyphicon-arrow-right SuppGrupRelations"></i>' + $(e).parent().children('.serviceName').text();

    var grupGuid = SERVICE_GUID
    var serviceguid = $(e).attr('service-guid')
    var service_cost = (edizm.length == 0) ? '<a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div>' : '<a>' + $(e).attr('service-cost') + '</a>'

    var kolvo = (edizm.length == 0) ? "-" : '<input type="text" class="quantity" onkeyup=multiPlaying(this,\"' + $(e).attr('service-cost') + '\") onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57 || event.charCode == 44" value="1">';
    edizm = (edizm.length == 0) ? "-" : "";
    var SuppName = $(e).attr('supp-name')

    var calculate = true;
    if (selected == true) {
        var sameGrup = true;
        if ($('#PrServiceH thead tr th:eq(0)').text() == 'Наименование направления') {
            $('#PrServiceH thead tr th:eq(0)').text('Наименование услуг')
            //  $('#PrServiceH tbody').empty();
            $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').show()
        }
        serviceguid = (serviceguid == undefined) ? 'grup-guid="' + grupGuid + '"' : ' service-guid="' + serviceguid + '"'

        $('#PrServiceH tbody').prepend('<tr supp-name=\"' + SuppName + '\" supp-guid=' + suppGuid + ' ' + serviceguid + ' grup-name=\"' + grupName + '\" title=\"' + SuppName + ' -> ' + grupName + ' -> ' + ServiceName + '\" ><td>' + SuppName + '<i class="glyphicon glyphicon-arrow-right SuppGrupRelations"></i>' + grupName + ServiceName + '</td><td>' + kolvo + '</td><td style="text-align:center">' + edizm + '</td><td class="CostTd">' + service_cost + '</td><td><a guid=' + grupGuid + ' onclick="RemoveDirectRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')


        //checking suppguid, is different or not
        if ($('#PrServiceH tbody tr').length != 0) {

            $('#PrServiceH tbody tr').each(function () {
                if ($(this).attr('grup-name') != undefined) {
                    var trgrupName = $(this).attr('grup-name').trim();
                    if (trgrupName != grupName) {
                        sameGrup = $(this).attr('grup-name');
                        return false;

                    }
                }
                else {
                    $(this).remove()
                }
                //var trSuppGuid = $(this).attr('supp-guid');
                //if (trSuppGuid != suppGuid) {
                //    sameSupp = $(this).attr('supp-name');
                //    return false;

                //}
            })

        }
        //if suppguids is diferent then rremove from the table
        var headSer = $('#PrServiceH thead tr th:eq(0)').text()
        if (sameGrup != true && headSer == 'Наименование услуг') {
            var resultGrup = confirm('В заявке возможно указать услуги только одного группу услуг. Вы уверены, что хотите изменить группу услуг с "' + sameGrup + '" на "' + grupName + '"?');
            if (resultGrup == true) {
                if ($('#PrServiceH tbody tr').length != 0) {

                    $('#PrServiceH tbody tr').each(function (index, value) {
                        var TrGrupName = $(this).attr('grup-name').trim();

                        $('.grups').children('div').children('input:checkbox:checked').each(function () {

                            var selectedGrupName = $(this).next('#grup').text().trim();
                            if (selectedGrupName == TrGrupName) {
                                var trGrupGuid = $(this).attr('grup-guid');
                                $('#PrServiceH tbody tr[grup-guid=\"' + trGrupGuid + '\"]').remove();
                                $(this).prop('checked', false)
                            }
                        })


                        $('.subMenu').not($(e).parent().parent('.subMenu')).each(function () {

                            $(this).children('div').children('input[type="checkbox"]').each(function () {
                                var serviceGud = $(this).attr('service-guid')
                                $('#PrServiceH tbody tr[service-guid=\"' + serviceGud + '\"]').remove();
                                $(this).prop("checked", false)
                            })
                        })

                    })

                }


            }
            else {
                $(e).prop('checked', false)
                if ($('#PrServiceH tbody tr').length != 0) {

                    $('#PrServiceH tbody tr').each(function () {
                        var trSuppGuid = $(this).attr('supp-guid');
                        if (trSuppGuid == suppGuid) {
                            $(this).remove();
                            ////console.log("deleted")
                        }
                    })
                }
            }
        }



    }
    else {
        $('#PrServiceH tbody tr').each(function () {
            var trServiceGuid = $(this).attr('service-guid')
            var trgrupGuid = $(this).attr('grup-guid')
            if (trServiceGuid == undefined) {
                if (grupGuid == trgrupGuid) {
                    $(this).remove()
                    $('.chkGrups[grup-guid="' + grupGuid + '"]').prop('checked', false)
                }
            }
            else {
                if (grupGuid == trServiceGuid) {
                    $(this).remove()
                    $('input[type="checkbox"][service-guid="' + grupGuid + '"]').prop('checked', false)
                }
            }
        })

        if ($('#PrServiceH tbody tr').length == 0) {

            $('#PrServiceH thead tr th:eq(3)').show();
            $('#PrServiceH thead tr th:eq(0)').text('Наименование направления')
            $('#PrServiceH thead tr').each(function () {
                $(this).children('th:eq(1),th:eq(2)').hide();

            })
            var text = $('.selectdrc').children('#drctName').children('label').text();

            if ($('.selectdrc').length != 0) {
                $('#PrServiceH tbody').append('<tr><td >' + text + '</td><td class="CostTd"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-url="0" disabled="disabled"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
            }
            else {
                calculate = false
                $('#PrServiceH').hide();
                $('#total').remove();
            }



        }
        $('.ui-loader-background,#loader').hide()
    }
    if (calculate == true) {
        $('#PrServiceH').show();
        CalculatTotaleCost()
    }


}
function Search_Service(e) {
    var SText = $(e).val().toLowerCase();
    if (SText.length != 0) {

        $('#subMenuSearch .mngTable tbody').empty();
        var j = $('body').data('search');

        var jsondata = j.filter(function (srv) {

            return srv.SEARCH_STRING.indexOf(SText) > -1
        })
      console.log('SearchResult')

        console.log(jsondata)
        for (var i = 0; i < jsondata.length; i++) {
            var grupOrService = (jsondata[i].PARENT_GUID == 0) ? 'grup-guid="' + jsondata[i].SERVICE_GUID + '"' : 'service-guid="' + jsondata[i].SERVICE_GUID + '"'
            var onlyGrupGuid = (jsondata[i].PARENT_GUID == 0) ? jsondata[i].SERVICE_GUID : jsondata[i].PARENT_GUID
            //subMenuSearch
            //$('#').prepend('<div grup-guid="' + onlyGrupGuid + '"   class="col-md-12" ><input type="checkbox" onclick=SelectFinded_K(this,\"' + jsondata[i].SERVICE_GUID + '\") supp-name=\"' + jsondata[i].SERVICE_SUPPLIER + '\" ' + grupOrService + 'service-cost=\"' + jsondata[i].SERVICE_COST + '\" class="col-md-1 chkServc" grupp-name=\"' + jsondata[i].SERVICE_GROUP + '\" supp-guid=\"' + jsondata[i].SUPPLIER_GUID + '\"  data-edizm="' + jsondata[i].SERVICE_UNIT + '"  itemid="' + jsondata[i].SERVICE_GUID + '"  ><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + jsondata[i].SERVICE_COST + '<i class="glyphicon glyphicon-ruble" ></i></label><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + jsondata[i].SERVICE_UNIT + '</label><label   itemid="' + jsondata[i].SERVICE_GUID + '" class="serviceName">' + jsondata[i].SERVICE_NAME + '</label></div><br/>')
            var role = sessionStorage.getItem("role")
            var suppguid = $('#drct[direct-suppguid]').attr('direct-suppguid')
            suppguid = (suppguid == undefined) ? $('#fiodsp').attr('supp-guid') : suppguid
            if (jsondata[i].PARENT_GUID == "0") {
                //guid-direction=\"' + DIRECTION_GUID + '\"
                //' + jsondata[i].SERVICE_SUPPLIER + '<i class="	glyphicon glyphicon-arrow-right SuppGrupRelations"></i>
                if (role == 17) {
                    $('#subMenuSearch .mngTable tbody').append('<tr title="' + jsondata[i].SERVICE_NOTES + '" grup-guid="' + jsondata[i].PARENT_GUID + '"  supp-name=\"' + jsondata[i].NAME + '\" ><td><div title="' + jsondata[i].SERVICE_NOTES + '" grup-guid="' + jsondata[i].PARENT_GUID + '"  supp-name=\"' + jsondata[i].NAME + '\"  class="col-md-12" ><input type="checkbox"  grup-name=\"' + jsondata[i].SERVICE_GROUP + '\" ismc=\"' + jsondata[i].IS_MC + '\" onclick=SelectService_K(this,\"' + jsondata[i].SERVICE_GUID + '\") service-guid=' + jsondata[i].SERVICE_GUID + ' service-cost=\"' + jsondata[i].SERVICE_COST + '\" class="col-md-1 chkServc" supp-guid=\"' + jsondata[i].SUPPLIER_GUID + '\"  data-edizm="' + jsondata[i].SERVICE_UNIT + '"  itemid="' + jsondata[i].SERVICE_GUID + '"  ><label   itemid="' + jsondata[i].SERVICE_GUID + '"  class="serviceName">' + jsondata[i].SERVICE_NAME + '</label></div></td><td><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + jsondata[i].SERVICE_UNIT + '</label></td><td><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + jsondata[i].SERVICE_COST + '</label></td></tr>')
                }


                if (role == 15) {
                    if (suppguid == jsondata[i].SUPPLIER_GUID) {
                        $('#subMenuSearch .mngTable tbody').append('<tr title="' + jsondata[i].SERVICE_NOTES + '" grup-guid="' + jsondata[i].PARENT_GUID + '"  supp-name=\"' + jsondata[i].NAME + '\" ><td><div title="' + jsondata[i].SERVICE_NOTES + '" grup-guid="' + jsondata[i].PARENT_GUID + '"  supp-name=\"' + jsondata[i].NAME + '\"  class="col-md-12" ><input type="checkbox"  grup-name=\"' + jsondata[i].SERVICE_GROUP + '\" ismc=\"' + jsondata[i].IS_MC + '\" onclick=SelectService_K(this,\"' + jsondata[i].SERVICE_GUID + '\") service-guid=' + jsondata[i].SERVICE_GUID + ' service-cost=\"' + jsondata[i].SERVICE_COST + '\" class="col-md-1 chkServc" supp-guid=\"' + jsondata[i].SUPPLIER_GUID + '\"  data-edizm="' + jsondata[i].SERVICE_UNIT + '"  itemid="' + jsondata[i].SERVICE_GUID + '"  ><label   itemid="' + jsondata[i].SERVICE_GUID + '"  class="serviceName">' + jsondata[i].SERVICE_NAME + '</label></div></td><td><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + jsondata[i].SERVICE_UNIT + '</label></td><td><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + jsondata[i].SERVICE_COST + '</label></td></tr>')
                    }
                }
                if (role == 16) {
                    if (jsondata[i].IS_MC == "True") {
                        $('#subMenuSearch .mngTable tbody').append('<tr title="' + jsondata[i].SERVICE_NOTES + '" grup-guid="' + jsondata[i].PARENT_GUID + '"  supp-name=\"' + jsondata[i].NAME + '\" ><td><div title="' + jsondata[i].SERVICE_NOTES + '" grup-guid="' + jsondata[i].PARENT_GUID + '"  supp-name=\"' + jsondata[i].NAME + '\"  class="col-md-12" ><input type="checkbox"  grup-name=\"' + jsondata[i].SERVICE_GROUP + '\" ismc=\"' + jsondata[i].IS_MC + '\" onclick=SelectService_K(this,\"' + jsondata[i].SERVICE_GUID + '\") service-guid=' + jsondata[i].SERVICE_GUID + ' service-cost=\"' + jsondata[i].SERVICE_COST + '\" class="col-md-1 chkServc" supp-guid=\"' + jsondata[i].SUPPLIER_GUID + '\"  data-edizm="' + jsondata[i].SERVICE_UNIT + '"  itemid="' + jsondata[i].SERVICE_GUID + '"  ><label   itemid="' + jsondata[i].SERVICE_GUID + '"  class="serviceName">' + jsondata[i].SERVICE_NAME + '</label></div></td><td><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + jsondata[i].SERVICE_UNIT + '</label></td><td><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + jsondata[i].SERVICE_COST + '</label></td></tr>')
                    }
                }


            }
            else {

                var SCost = jsondata[i].SERVICE_COST;
                if ($.isNumeric(jsondata[i].SERVICE_COST)) {
                    SCost = jsondata[i].SERVICE_COST + ' <i class="glyphicon glyphicon-ruble" ></i>'
                }
                //' + jsondata[i].SERVICE_SUPPLIER + '<i class="glyphicon glyphicon-arrow-right SuppGrupRelations"></i>
                if (role == 17 || role == 3) {
                     
                    $('#subMenuSearch .mngTable tbody').append('<tr title="' + jsondata[i].SERVICE_NOTES + '" grup-guid="' + jsondata[i].PARENT_GUID + '"  supp-name=\"' + jsondata[i].SERVICE_SUPPLIER + '\" ><td><div title="' + jsondata[i].SERVICE_NOTES + '" grup-guid="' + jsondata[i].PARENT_GUID + '"  supp-name=\"' + jsondata[i].SERVICE_SUPPLIER + '\"  class="col-md-12" ><input type="checkbox" id="chk_' + i + '" grup-name=\"' + jsondata[i].SERVICE_GROUP + '\" ismc=\"' + jsondata[i].IS_MC + '\" onclick=SelectService_K(this,\"' + jsondata[i].SERVICE_GUID + '\",\"' + jsondata[i].PARENT_GUID +'\") service-guid=' + jsondata[i].SERVICE_GUID + ' service-cost=\"' + jsondata[i].SERVICE_COST + '\" class="col-md-1 chkServc checkbox-item" supp-guid=\"' + jsondata[i].SUPPLIER_GUID + '\"  data-edizm="' + jsondata[i].SERVICE_UNIT + '"  itemid="' + jsondata[i].SERVICE_GUID + '"  ><label for="chk_' + i +'"  itemid="' + jsondata[i].SERVICE_GUID + '"  class="serviceName">' + jsondata[i].SERVICE_GROUP +'<i class="fa fa-arrow-right SuppGrupRelations"></i>' + jsondata[i].SERVICE_NAME + '</label></div></td><td><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + jsondata[i].SERVICE_UNIT + '</label></td><td><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + jsondata[i].SERVICE_COST + '</label></td></tr>')
                }

                if (role == 15) {
                    if (suppguid == jsondata[i].SUPPLIER_GUID) {
                         
                        $('#subMenuSearch .mngTable tbody').append('<tr title="' + jsondata[i].SERVICE_NOTES + '" grup-guid="' + jsondata[i].PARENT_GUID + '"  supp-name=\"' + jsondata[i].SERVICE_SUPPLIER + '\" ><td><div title="' + jsondata[i].SERVICE_NOTES + '" grup-guid="' + jsondata[i].PARENT_GUID + '"  supp-name=\"' + jsondata[i].SERVICE_SUPPLIER + '\"  class="col-md-12" ><input type="checkbox"  id="chk_' + i + '" grup-name=\"' + jsondata[i].SERVICE_GROUP + '\" ismc=\"' + jsondata[i].IS_MC + '\" onclick=SelectService_K(this,\"' + jsondata[i].SERVICE_GUID + '\",\"' + jsondata[i].PARENT_GUID +'\") service-guid=' + jsondata[i].SERVICE_GUID + ' service-cost=\"' + jsondata[i].SERVICE_COST + '\" class="col-md-1 chkServc checkbox-item" supp-guid=\"' + jsondata[i].SUPPLIER_GUID + '\"  data-edizm="' + jsondata[i].SERVICE_UNIT + '"  itemid="' + jsondata[i].SERVICE_GUID + '"  ><label for="chk_' + i +'"  itemid="' + jsondata[i].SERVICE_GUID + '"  class="serviceName">' + jsondata[i].SERVICE_GROUP + '<i class="fa fa-arrow-right SuppGrupRelations"></i>' + jsondata[i].SERVICE_NAME + '</label></div></td><td><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + jsondata[i].SERVICE_UNIT + '</label></td><td><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + jsondata[i].SERVICE_COST + '</label></td></tr>')

                    }
                }

                if (role == 16) {
                    if (jsondata[i].IS_MC == "True") {
                        //$('#subMenuSearch').prepend('<div grup-guid="' + jsondata[i].PARENT_GUID + '"  supp-name=\"' + jsondata[i].SERVICE_SUPPLIER + '\"  class="col-md-12 serviceDivs" ><input type="checkbox" grup-name=\"' + jsondata[i].SERVICE_GROUP + '\" ismc=\"' + jsondata[i].IS_MC + '\" onclick=SelectService_K(this,\"' + jsondata[i].SERVICE_GUID + '\") service-guid=' + jsondata[i].SERVICE_GUID + ' service-cost=\"' + jsondata[i].SERVICE_COST + '\" class="col-md-1 chkServc" supp-guid=\"' + jsondata[i].SUPPLIER_GUID + '\"  data-edizm="' + jsondata[i].SERVICE_UNIT + '"  itemid="' + jsondata[i].SERVICE_GUID + '"  ><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + SCost + ' </i></label><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + jsondata[i].SERVICE_UNIT + '</label><label   itemid="' + jsondata[i].SERVICE_GUID + '" style="display:none" class="serviceName">' + jsondata[i].SERVICE_NAME + '</label><div>' + jsondata[i].SERVICE_GROUP + '<i class="glyphicon glyphicon-arrow-right SuppGrupRelations"></i>' + jsondata[i].SERVICE_NAME + '</div></div><br/>')

                        $('#subMenuSearch .mngTable tbody').append('<tr title="' + jsondata[i].SERVICE_NOTES + '" grup-guid="' + jsondata[i].PARENT_GUID + '"  supp-name=\"' + jsondata[i].SERVICE_SUPPLIER + '\" ><td><div title="' + jsondata[i].SERVICE_NOTES + '" grup-guid="' + jsondata[i].PARENT_GUID + '"  supp-name=\"' + jsondata[i].SERVICE_SUPPLIER + '\"  class="col-md-12" ><input type="checkbox" id="chk_' + i + '"  grup-name=\"' + jsondata[i].SERVICE_GROUP + '\" ismc=\"' + jsondata[i].IS_MC + '\" onclick=SelectService_K(this,\"' + jsondata[i].SERVICE_GUID + '\",\"' + jsondata[i].PARENT_GUID +'\") service-guid=' + jsondata[i].SERVICE_GUID + ' service-cost=\"' + jsondata[i].SERVICE_COST + '\" class="col-md-1 chkServc checkbox-item" supp-guid=\"' + jsondata[i].SUPPLIER_GUID + '\"  data-edizm="' + jsondata[i].SERVICE_UNIT + '"  itemid="' + jsondata[i].SERVICE_GUID + '"  ><label  for="chk_' + i +'"  itemid="' + jsondata[i].SERVICE_GUID + '"  class="serviceName">' + jsondata[i].SERVICE_GROUP + '<i class="fa fa-arrow-right SuppGrupRelations"></i>' + jsondata[i].SERVICE_NAME + '</label></div></td><td><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + jsondata[i].SERVICE_UNIT + '</label></td><td><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + jsondata[i].SERVICE_COST + '</label></td></tr>')

                    }
                }


            }
        }

        $('#PrServiceH tbody tr').each(function () {
            var service_guid = $(this).attr('service-guid')
            var grup_guid = $(this).attr('grup-guid')
            var grupOrService = (service_guid == undefined) ? '[grup-guid="' + grup_guid + '"]' : '[service-guid="' + service_guid + '"]'

            if (service_guid == undefined) {
                $('#subMenuSearch div').children('input[type="checkbox"][grup-guid="' + grup_guid + '"]').prop('checked', true)
            }
            else {
                $('#subMenuSearch div').children('input[type="checkbox"][service-guid="' + service_guid + '"]').prop('checked', true)
            }
        })
    }
    else {
        $('#subMenuSearch .mngTable tbody').empty();
    }

}
function showResultArea(text) {
    if (text == "open") {
        if ($('#subMenuSearch').length == 0) {
            $('#subMenuSearch').empty();
            $('#SerchService').parent().after('<div id="subMenuSearch" class="w-100 rounded8 border-1 mt-4 mb-4 grups subMenu" style="display:none"><table class="mngTable border-0  w-100" id="Services_" grup-guid="E27FB1E9-7714-4105-B8ED-7D6BEED09A28"><thead class="bgLightGrey rad-top16"><tr><th>Наименование услуг</th><th>Ед.изм</th><th style="width: 120px;">Стоимость(руб.)</th></tr></thead><tbody></tbody></table></div>')
           
            $('#subMenuSearch').show('1000')
        }
    }
    else {

        if ($('#SerchService').val().length == 0) {
            $('#subMenuSearch').hide('1000')
            setTimeout(function () {
               
                    $('#subMenuSearch').remove();
              
            }, 1500);
           
        }
    }
}
function GetAllServicesOfProject(PROJECT_GUID, RKind) {
    var loc_ = window.location.pathname
    var respid = 0
    if (loc_ == '/Responsible_Admin/CreateRequest.aspx') {
        respid = sessionStorage.getItem("Log")
    }
    var obj2 = { "PROJECT_GUID": PROJECT_GUID, "lg": respid, "baseDirectionId": RKind }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/GetAllServicesOfProject",
        data: JSON.stringify(obj2),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var j = JSON.parse(data.d);
            var ServicesResponsibles = j.ServicesResponsibles;
            ServicesResponsibles = JSON.parse(ServicesResponsibles)
            j = j.AllServices
            j = JSON.parse(j)

            $('body').data('search', j);
            $('body').data('resps', ServicesResponsibles)
            $('#SerchService').show()

            /*
             
             var j = JSON.parse(data.d);

            $('body').data('search', j);
            $('#SerchService').show()
             */
            // $('#SerchService').remove();
            //$('#RequestKind').after('<input type="text" id="SerchService" onfocus=showResultArea("open") onblur=showResultArea("close") onkeyup=Search_Service(this) placeholder="Поиск Услуг"/>')
        }
    })

}
function getCurrentDispObject(selected, lg) {
    var obj = { lg: lg }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/getObjectDisp",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var j = JSON.parse(result.d)
            // console.log(j);
            $('#RequestKind').parent().hide()
            $('#objctZ').attr('onchange', "GetAllServicesAndRelationalDirection(this)")
            for (var i = 0; i < j.length; i++) {
                $('#objctZ').append('<option value=' + j[i].Object_Id + ' proj-guid=\"' + j[i].PROJECT_GUID + '\">' + j[i].ObjectAdress + '</option>')
            }
            if (selected != "") {
                $('#objctZ').val(selected);
            }
        }
    })
}
function GetAllServicesAndRelationalDirection(e) {
    var projectGuid = $(e).children('option:selected').attr('proj-guid')
    GetAllServicesOfProject(projectGuid);
    var RequestKind = '1'//$('#RequestKind').val()
    getDirection_K("", projectGuid,0, RequestKind);
    $('#prjcts').children('option[guid="' + projectGuid + '"]').attr('selected', 'selected')
}
function getDirection_K(selected, PROJECT_GUID, otv, RequestKind) {
    var loc_ = window.location.pathname
    var respid = 0
    if (loc_ == '/Responsible_Admin/CreateRequest.aspx') {
        respid = sessionStorage.getItem("Log")
    }

    var Supp_Guid = null
    if (loc_ == '/Supplier_Admin/CreateDispRequest.aspx') {
        Supp_Guid = $('#fiodsp').attr('supp-guid')
    }
    var obj2 = { "PROJECT_GUID": PROJECT_GUID, 'respid': respid, "Supp_Guid": Supp_Guid, "RequestKind": RequestKind }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/get_ub_directions",
        data: JSON.stringify(obj2),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            //  $('#directions').remove();
            $('#directions').empty();
            $('#grups').remove();
            var j = JSON.parse(data.d)
            //  ////console.log(selected)
            $('#SerchService').parent().after('<div id="directions" class="w-100 flexHoriz flex-wrap justify-content-arround"></div>')
            for (var i = 0; i < j.length; i++) {
                var class_ = 'class="col-md-3 drct w-24 drct border-1 rounded8 text-center"'//

                if (selected != "") {
                    var SERVICE_GUID_s = selected[0].SERVICE_GUID
                    var guid_j = j[i].GUID
                    if (selected[0].SERVICE_GUID == j[i].GUID) {
                        class_ = 'class="col-md-3 drct selectdrc w-24 drct border-1 rounded8 text-center"'

                        $('#PrServiceH').show()
                        $('#PrServiceH tbody').empty();
                        $('#PrServiceH thead tr th:eq(3)').show();
                        $('#PrServiceH thead tr th:eq(0)').text('Наименование направления')
                        //$('#PrServiceH thead tr').each(function () {
                        //    $(this).children('th:eq(1),th:eq(2)').hide();

                        //})
                        var text = j[i].NAME
                        $('#PrServiceH tbody').append('<tr><td >' + text + '</td><td class="CostTd"><a onclick="Open_Pop(this)">' + selected[0].COST + '</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-url="0" disabled="disabled"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
                        GetRelatedGroups_K("", PROJECT_GUID, selected[0].SERVICE_GUID, otv)
                    }
                    else {
                        var SERVICE_SUPPLIER = selected[0].SERVICE_SUPPLIER
                        if (i == 0 && selected[0].SERVICE_SUPPLIER != undefined) {
                            GetRelatedGroups_K(selected, PROJECT_GUID, selected[0].BASE_DIRECTION_GUID, otv)
                        }
                    }


                }
                //remail=\"' + j[i].E_MAIL + '\" rvalue=\"' + j[i].RESPONSIBLE_ID + '\" rname=\"' + j[i].ACCOUNT_NAME + '\"
                $('#directions').append('<div id="drct" onclick="SelectDirect(this)"  guid=' + j[i].GUID + ' ' + class_ + '><img src=\"' + j[i].ICON + '\" class="w-50"><div id="drctName" class="drctName font18b"><label>' + j[i].NAME + '</label></div></div>')
                //if (selected=="") {
                //    if (loc_ == '/Responsible_Admin/CreateRequest.aspx') {
                //        $('.drct').not('div[rvalue="' + respid + '"]').remove()
                //    }
                //}
            }
            if (selected != "") {

                var st = urlParam('st')
                if (st == 4 || st == 5 || st == 3) {
                    $('.selectdrc,.drct').removeAttr('onclick');
                }

            }

            $('.ui-loader-background,#loader').hide()

        }


    })

}
function selectGrupOnly_K(e, otv) {
    var selected = $(e).prop('checked');
    var suppGuid = $(e).next('#grup').attr('supp-guid');
    var grupName = $(e).next('#grup').text();
    var grupGuid = $(e).next('#grup').attr('grup-guid');
    var SuppName = $(e).next('#grup').attr('supp-name');
    var ismc = $(e).attr('ismc');
    
    if (selected == true) {
        var sameGrup = true;
        var preservices = $('#PrServiceH thead tr th:eq(0)').text()
        $('#PrServiceH').show();
        $('#PrServiceH thead tr th:eq(0)').text('Наименование услуг')
        $('#PrServiceH tbody tr:not([grup-guid])').remove();
        $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').show()
        var data_child = $(e).attr('data-child')
        if (data_child == 1) {
            
            var subMenichildDivLength = $('.subMenu').children('table[grup-guid="' + grupGuid + '"]').length
            if (subMenichildDivLength == 0) {
               
                $(e).parent('div').children('#grup[grup-guid="' + grupGuid + '"]').trigger('click');
            }

        }
        //  $('#PrServiceH tbody').empty();
        //  $('#subMenu,#grups').find('input[type="checkbox"]').prop('checked', false).not($(e))
        //' + SuppName + '<i class="	glyphicon glyphicon-arrow-right SuppGrupRelations"></i>
        $('#PrServiceH tbody').prepend('<tr isgrup="true" grup-name=\"' + grupName + '\" supp-name=\"' + SuppName + '\" ismc=\"' + ismc + '\" supp-guid=' + suppGuid + ' grup-name=\"' + grupName + '\" grup-guid=' + grupGuid + ' title=\"' + SuppName + ' -> ' + grupName + '\" ><td>' + grupName + '</td><td>-</td><td>-</td><td class="CostTd"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a guid=' + grupGuid + ' onclick="RemoveDirectRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')


        //checking suppguid, is different or not
        if ($('#PrServiceH tbody tr').length != 0) {



            $('#PrServiceH tbody tr').each(function () {



                var trgrupGuid = $(this).attr('grup-guid');
                if (trgrupGuid != undefined) {
                    if (trgrupGuid != grupGuid) {
                        sameGrup = $(this).attr('grup-name');
                        return false;

                    }
                }
                else {
                    var TrService = $(this).attr('service-guid');
                    $('.subMenu').each(function () {
                        var selectedGrupOfService = $(this).children('div').children('input[type="checkbox"][service-guid=\"' + TrService + '\"]').parent().attr('grup-guid');
                        if (selectedGrupOfService != grupGuid) {
                            sameGrup = grupGuid
                            return false;
                        }
                    })
                }


            })

        }
        $('.chkGrups[grup-guid="' + grupGuid + '"]').prop('checked', true);
        //if suppguids is diferent then rremove from the table
        if (sameGrup != true && $('#PrServiceH thead tr th:eq(0)').text() == 'Наименование услуг') {
            var resultGrup = confirm('В заявке возможно указать услуги только одного группу услуг. Вы уверены, что хотите изменить группу услуг с "' + sameGrup + '" на "' + grupName + '"?');
            if (resultGrup == true) {
                if ($('#PrServiceH tbody tr').length != 0) {

                    $('#PrServiceH tbody tr[grup-guid!="' + grupGuid + '"]').remove();
                    $('.chkGrups[grup-guid!="' + grupGuid + '"]').prop('checked', false);
                    $('.chkServc[grup-name!="' + grupName + '"]').prop('checked', false);

                }


            }
            else {
                $(e).prop('checked', false)
                if ($('#PrServiceH tbody tr').length != 0) {

                    $('#PrServiceH tbody tr').each(function () {
                        var trgrupGuid = $(this).attr('grup-guid');
                        if (trgrupGuid == grupGuid) {
                            $(this).remove();
                            // ////console.log("deleted")
                        }
                    })
                }
            }
        }
        getResponsibels_ForCheckGroup(grupGuid)
        $('#PrServiceH tbody tr').each(function () {
            var ismc_ = $(this).attr('ismc');

            if (ismc_ == "False") {
                $('#AddSpecialist').removeAttr('disabled')
                $('#Otven,#AddSpecialist').hide();//#IspolList,
                $('#lblSupp,#nameSup,.sps').remove();
                $('#Otven').prev('label').hide()//,#IspolList_S
                $('#planTime').next('br').after('<label id="lblSupp">Наименование поставщика</label><input type="text" disabled="disabled" value=\"' + SuppName + '\" id="nameSup">')
                $('#IspolList').children('option[supp-guid!=' + suppGuid + ']').not('option[value="0"]').hide()
            }
            else {
                $('#IspolList,#Otven,#AddSpecialist').show();
                if (otv == undefined) {
                    $('#Otven').prop("selectedIndex", 0);
                }
                else {
                    $('#Otven').val(otv)
                }
                $('#Otven,#IspolList_S').prev('label').show()
                $('#lblSupp,#nameSup').remove();
            }
        })


        var SubMenuCount = $(e).parent('div').parent('div').children('#subMenu').length
        if (SubMenuCount != 0) {
            var SubMenuChildren = $('#subMenu').children('#Services_').children('tbody').children('tr').length
            if (SubMenuChildren == 1) {

                $('#PrServiceH tbody').children('tr[isgrup="true"]').remove();
                var is_Checked = $('#subMenu').children('#Services_').children('tbody').children('tr').children('td:eq(0)').children('div').children('input[type="checkbox"]').prop('checked')
                if (is_Checked == false) {
                    $('#subMenu').children('#Services_').children('tbody').children('tr').children('td:eq(0)').children('div').children('input[type="checkbox"]').trigger('click')
                }

            }
        }
    }
    else {
        removeFromSps()
        $('#PrServiceH tbody tr').each(function () {
            var trgrupGuid = $(this).attr('grup-guid')
            if (grupGuid == trgrupGuid) {
                $(this).remove()
            }
        })

        $('.chkGrups[grup-guid="' + grupGuid + '"]').prop('checked', false);
        if ($('#PrServiceH tbody tr').length == 0) {
            $('#IspolList').children('option[supp-guid!=' + suppGuid + ']').not('option[value="0"]').show()
            $('#PrServiceH thead tr th:eq(3)').show();
            $('#PrServiceH thead tr th:eq(0)').text('Наименование направления')
            //$('#PrServiceH thead tr').each(function () {
            //    $(this).children('th:eq(1),th:eq(2)').hide();

            //})
            var text = $('.selectdrc').children('#drctName').children('label').text();
            var directGuid = $('.selectdrc').attr('direct-guid');
            $('#PrServiceH tbody').append('<tr><td >' + text + '</td><td>-</td><td>-</td><td class="CostTd"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-url="0" disabled="disabled"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')



        }
        $('.ui-loader-background,#loader').hide()
        var SubMenuCount = $(e).parent('div').parent('div').children('#subMenu').length
        if (SubMenuCount != 0) {
            var SubMenuChildren = $('#subMenu').children('#Services_').children('tbody').children('tr').length
            if (SubMenuChildren == 1) {

                $('#PrServiceH tbody').children('tr[isgrup="true"]').remove();
                var is_Checked = $('#subMenu').children('#Services_').children('tbody').children('tr').children('td:eq(0)').children('div').children('input[type="checkbox"]').prop('checked')
                if (is_Checked == true) {
                    $('#subMenu').children('#Services_').children('tbody').children('tr').children('td:eq(0)').children('div').children('input[type="checkbox"]').trigger('click')
                }

            }
        }
    }

    CalculatTotaleCost()
    //  getSpesicalisetsBySupplierGuid(suppGuid)
}

function GetRelatedGroups_K(selected, PROJECT_GUID, DIRECTION_GUID, otv) {
    var Obj = { "PROJECT_GUID": PROJECT_GUID, 'DIRECTION_GUID': DIRECTION_GUID, SERVICE_GUID: "" }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/get_ub_services",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var rid = urlParam('RId')
            var checkboxDissable;
            //if (rid != null) {
            //    if (rid.indexOf('disp_') == -1) {
            //        checkboxDissable = 'disabled="disabled" title="Заявка создана жителем,  нельзя добавлять и убирать группу услуг и услугу"'
            //    }
            //}
            var j = JSON.parse(data.d)
            j = JSON.parse(j.SERVICE_GROUPS)
            console.log('Groups')

         console.log(j)
            $('#grups').remove();
            $('#directions').after('<div id="grups" class="w-100 rounded8 border-1 mt-4 mb-4 grups"></div>')
            for (var i = 0; i < j.length; i++) {

                //   ////console.log(j[i]);
                //   if (j[i].NAME == 'ТЭО' || j[i].NAME == 'Vipklimat') {//should delete after testing
                // 
                var checkedGrup = "";
                $('#PrServiceH tbody tr').each(function () {
                    var grup_guid = $(this).attr('grup-guid');
                    if (grup_guid == j[i].SERVICE_GUID && $(this).attr('service-guid') == undefined) {
                        checkedGrup = 'checked="checked"'
                    }
                })
                //' + checkboxDissable + '
                $('#grups').append('<div guid-direction=\"' + DIRECTION_GUID + '\"><div class="p-3 flexHoriz" ><input type="checkbox"  ismc="' + j[i].IS_MC + '" class="chkGrups mr-3" ' + checkedGrup + ' data-child="' + j[i].CHILDS +'"  grup-guid=\"' + j[i].SERVICE_GUID + '\"   onclick="selectGrupOnly_K(this)"><div Id="grup" supp-name=\"' + j[i].NAME + '\" supp-guid=\"' + j[i].GUID + '\"  onclick=getServices_K(this,\"' + j[i].SERVICE_GUID + '\",0) data-active="on" class="accMenu" grup-guid=\"' + j[i].SERVICE_GUID + '\"> <img src=\"' + j[i].ICON + '" class="icon mr-2">' + j[i].SERVICE_NAME + '<i class="fa fa-chevron-down GrupOpenIcon ml-3" aria-hidden="true"> </i></div></div></div>')

                //  }
            }


            var role = sessionStorage.getItem("role")
            if (selected != "") {
                for (var k = 0; k < selected.length; k++) {
                    //var SERVICE_GUID_k = selected[k].SERVICE_GUID;
                    //var SERVICE_GUID_j = j[i].SERVICE_GUID
                    //if (selected[k].SERVICE_GUID == j[i].SERVICE_GUID) {
                    //    checked = 'checked="true"';

                    //}
                    $('input[type="checkbox"][grup-guid=\"' + selected[k].SERVICE_GUID + '\"]').prop('checked', true);
                    if ($('input[type="checkbox"][grup-guid=\"' + selected[k].SERVICE_GUID + '\"]').length!=0) {
                        var position = $('input[type="checkbox"][grup-guid=\"' + selected[k].SERVICE_GUID + '\"]').offset().top;
                        $("#grups").animate({ scrollTop: position }, "slow");
                    }
                    if (role == 15) {
                        //  var selectedGuid = (selected[k].PARENT_GUID != "0") ? selected[k].PARENT_GUID : selected[k].SERVICE_GUID
                        $('#drct[guid=\"' + selected[k].BASE_DIRECTION_GUID + '\"]').attr('direct-suppguid', selected[k].SUPPLIER_GUID)
                        $('#grups').find('#grup:not([supp-guid=\"' + selected[k].SUPPLIER_GUID + '\"])').parent().remove();
                    }
                    $('#drct[guid=\"' + selected[k].BASE_DIRECTION_GUID + '\"]').attr('class', 'col-md-3 drct selectdrc')
                    var loc_ = window.location.pathname
                    if (loc_ == '/Responsible_Admin/CreateRequest.aspx') {
                        respid = sessionStorage.getItem("Log")
                        $('.drct').not('.selectdrc, div[rvalue="' + respid + '"]').remove()
                    }
                    $('#PrServiceH thead tr th:eq(0)').text('Наименование услуг')

                    $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').show()
                    var ismc_ = selected[k].IS_MC;
                    if (ismc_ == "False") {
                        $('#AddSpecialist').removeAttr('disabled')
                        $('#Otven,#AddSpecialist').hide();//#IspolList,
                        $('#lblSupp,#nameSup,.sps').remove();
                        $('#Otven').prev('label').hide()//,#IspolList_S
                        $('#planTime').next('br').after('<label id="lblSupp">Наименование поставщика</label><input type="text" disabled="disabled" value=\"' + selected[k].SERVICE_SUPPLIER + '\" id="nameSup">')
                    }
                    else {
                        $('#IspolList,#Otven,#AddSpecialist').show();
                        if (otv != undefined) {
                            $('#Otven').val(otv);
                        }
                        else {
                            $('#Otven').prop("selectedIndex", 0);
                        }
                        $('#Otven,#IspolList_S').prev('label').show()
                        $('#lblSupp,#nameSup').remove();
                    }
                    if (selected[k].parent_id == 0) {
                        $('#PrServiceH tbody').prepend('<tr supp-name=\"' + selected[k].SERVICE_SUPPLIER + '\" ismc=\"' + selected[k].IS_MC + '\" supp-guid=' + selected[k].SUPPLIER_GUID + ' grup-name=\"' + selected[k].SERVICE_NAME + '\" grup-guid=\"' + selected[k].SERVICE_GUID + '\" title=\"' + selected[k].SERVICE_SUPPLIER + ' -> ' + selected[k].SERVICE_NAME + '\" ><td>' + selected[k].SERVICE_SUPPLIER + '<i class="	glyphicon glyphicon-arrow-right SuppGrupRelations"></i>' + selected[k].SERVICE_NAME + '</td><td>-</td><td>-</td><td class="CostTd"><a onclick="Open_Pop(this)">' + selected[k].COST + '</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a guid=' + selected[k].SERVICE_GUID + ' ' + checkboxDissable + ' onclick="RemoveDirectRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
                        $('#PrServiceH').show()
                    }
                    else {

                        var groupDiv = $('#grup[grup-guid=\"' + selected[k].PARENT_GUID + '\"]')

                        var group_guid = selected[k].PARENT_GUID

                        if (group_guid != "0") {
                            if (k == 0) {
                                getServices_K(groupDiv, group_guid, selected, otv)
                            }
                        }

                    }
                }
                var st = urlParam('st')
                if (st == 4 || st == 5 || st == 3) {
                    $('.chkGrups').removeAttr('onclick').attr('disabled', 'disabled');
                    $('.grups').children('div').children('div').removeAttr('onclick')
                    $('a[onclick="Open_Pop(this)"],a[onclick="RemoveDirectRow(this)"]').removeAttr('onclick').attr('disabled', 'disabled').css('text-decoration', 'none');
                }

            }


            if (role == 15) {
                var SUPPLIER_GUID = $('#fiodsp').attr('supp-guid')
                $('#grups').find('#grup:not([supp-guid=\"' + SUPPLIER_GUID + '\"])').parent().remove();
            }
            if (role == 16) {
                //  $('#grups').find('input[ismc="False"]').parent().remove();
            }
            var DirectSuppGuid = $('#drct[direct-suppguid]').length
            // console.log('DirectSuppGuid: ' + DirectSuppGuid)
            if (DirectSuppGuid != 0) {
                DirectSuppGuid = $('#drct[direct-suppguid]').attr('direct-suppguid')
                //  console.log('DirectSuppGuid: ' + DirectSuppGuid)
                $('#grups').find('#grup:not([supp-guid=\"' + DirectSuppGuid + '\"])').parent().remove();
            }


            $('.ui-loader-background,#loader').hide()
        }
    })
}
function getServices_K(e, SERVICE_GUID, selected, otv) {
    var data_active = $(e).attr('data-active')
    
    $('.ui-loader-background,#loader').show()
    if ($(e).attr('data-active') == 'on') {
        $(e).parent().children('div').children('.fa').attr('class', 'fa fa-chevron-down GrupOpenIcon ml-3')
        $(e).children('.fa').attr('class', 'fa fa-chevron-up GrupOpenIcon ml-3')
        $(e).attr('data-active', 'off')
        $('.subMenu').remove();
        var DIRECTION_GUID = $('.selectdrc').attr('guid');
        var PROJECT_GUID = $('#prjcts').children('option:selected').attr('guid');
        var Obj = { "PROJECT_GUID": PROJECT_GUID, 'DIRECTION_GUID': DIRECTION_GUID, 'SERVICE_GUID': SERVICE_GUID }
        $.ajax({
            type: "POST",
            url: "../Super_Disp/CreateDispRequest.aspx/get_ub_services",
            data: JSON.stringify(Obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var rid = urlParam('RId')
                var checkboxDissable = "";
                //if (rid != null) {
                //    if (rid.indexOf('disp_') == -1) {
                //        checkboxDissable = 'disabled="disabled" title="Заявка создана жителем,  нельзя добавлять и убирать группу услуг и услугу"'
                //    }
                //}
                $('#Otven').empty();
                var jsondata = JSON.parse(data.d);
                var RESPONSIBLES = JSON.parse(jsondata.RESPONSIBLE_GROUPS)
                jsondata = JSON.parse(jsondata.SERVICE_GROUPS)
                for (var i = 0; i < RESPONSIBLES.length; i++) {
                    $('#Otven').append('<option email=\"' + RESPONSIBLES[i].E_MAIL + '\" value="' + RESPONSIBLES[i].LOG_IN_ID + '">' + RESPONSIBLES[i].ACCOUNT_NAME + '</option>')
                }
                $(e).next('#subMenu').empty();
                console.log('Services')
                console.log(jsondata)
                for (var i = 0; i < jsondata.length; i++) {
                    if (selected != 0 && $('#subMenu[data-d="' + SERVICE_GUID + '"]').length == 0) {
                        $(e).after('<div id="subMenu" data-d=' + SERVICE_GUID + ' class="subMenu"  ></div>')
                    }
                    var checkedService = '';
                    $('#PrServiceH tbody tr').each(function () {
                        var service_guidSearch = $(this).attr('service-guid');
                        if (service_guidSearch == jsondata[i].SERVICE_GUID) {
                            checkedService = 'checked="checked"'
                        }
                    })
                    var SCost = jsondata[i].SERVICE_COST;
                    if ($.isNumeric(jsondata[i].SERVICE_COST)) {
                        SCost = jsondata[i].SERVICE_COST + ' <i class="glyphicon glyphicon-ruble" ></i>'
                    }
                    if (i == 0) {
                        $('#subMenu').append('<table class="mngTable border-0  w-100" id="Services_" grup-guid="' + SERVICE_GUID + '" ><thead class="bgLightGrey rad-top16"><tr><th>Наименование услуг</th><th>Ед.изм</th><th style="width: 120px;">Стоимость(руб.)</th></tr></thead><tbody></tbody></table>')
                    }

                    $('.mngTable[grup-guid="' + SERVICE_GUID + '"] tbody').append('<tr title="' + jsondata[i].SERVICE_NOTES + '" grup-guid="' + SERVICE_GUID + '"  supp-name=\"' + jsondata[i].NAME + '\" ><td><div title="' + jsondata[i].SERVICE_NOTES + '" grup-guid="' + SERVICE_GUID + '"  supp-name=\"' + jsondata[i].NAME + '\"  class="col-md-12" ><input type="checkbox" ' + checkedService + ' ' + checkboxDissable + ' grup-name=\"' + $(e).text().trim() + '\" ismc=\"' + jsondata[i].IS_MC + '\" onclick=SelectService_K(this,\"' + jsondata[i].SERVICE_GUID + '\") service-guid=' + jsondata[i].SERVICE_GUID + ' service-cost=\"' + jsondata[i].SERVICE_COST + '\" class="col-md-1 chkServc checkbox-item" id="chk' + i + '" supp-guid=\"' + jsondata[i].GUID + '\"  data-edizm="' + jsondata[i].SERVICE_UNIT + '"  itemid="' + jsondata[i].SERVICE_GUID + '"  ><label   itemid="' + jsondata[i].SERVICE_GUID + '"  class="serviceName" for="chk' + i +'">' + jsondata[i].SERVICE_NAME + '</label></div></td><td><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + jsondata[i].SERVICE_UNIT + '</label></td><td><label class="serviceCost"   itemid="' + jsondata[i].SERVICE_GUID + '">' + SCost + '</label></td></tr>')

                     


                }
                if (jsondata.length == 1) {
                    var is_grupChecked = $(e).parent('div').children('input[type="checkbox"]').prop('checked');
                    if (is_grupChecked == true) {
                        $('.subMenu').children('table').find('input[type="checkbox"]').trigger('click')
                    }
                }
                if (selected != 0) {
                    $('#Otven').val(selected[0].RESPONSIBLE_ID)
                    for (var i = 0; i < selected.length; i++) {
                        //////console.log(selected[i].SERVICE_SUPPLIER)
                        //console.log(selected)
                        if (selected[i].PARENT_GUID != 0) {
                            //$('#subMenu #Services_ tbody').children('tr[grup-guid=\"' + selected[i].PARENT_GUID + '\"]').children('td:eq(0)').children('div[grup-guid=\"' + selected[i].PARENT_GUID + '\"]').children('input[type="checkbox"][service-guid=\"' + selected[i].SERVICE_GUID + '\"]').prop('checked', true)


                            //$('#subMenu #Services_ tbody tr[grup-guid=\"' + selected[i].PARENT_GUID + '\"] td:eq(0) div[grup-guid=\"' + selected[i].PARENT_GUID + '\"]').children('input[type="checkbox"][service-guid=\"' + selected[i].SERVICE_GUID + '\"]').prop('checked', true)
                            $('input[type="checkbox"][service-guid=\"' + selected[i].SERVICE_GUID + '\"]').prop('checked', true)
                            var position = $('input[type="checkbox"][service-guid=\"' + selected[i].SERVICE_GUID + '\"]').length
                            if ($('input[type="checkbox"][service-guid=\"' + selected[i].SERVICE_GUID + '\"]').length != 0) {
                                var positionSubmenu = $("#subMenu").offset().top
                                $("#grups").animate({ scrollTop: positionSubmenu }, "slow");
                                var positionService = $('input[type="checkbox"][service-guid=\"' + selected[i].SERVICE_GUID + '\"]').offset().top;
                                $("#subMenu").animate({ scrollTop: positionService }, "slow");
                              
                            }
                            $('#PrServiceH thead tr th:eq(0)').text('Наименование услуг')
                            var edizm = selected[i].SERVICE_UNIT

                            var ismc_ = selected[i].IS_MC;
                            if (ismc_ == "False") {
                                $('#AddSpecialist').removeAttr('disabled')
                                $('#Otven,#AddSpecialist').hide();//#IspolList,
                                $('#lblSupp,#nameSup,.sps').remove();
                                $('#Otven').prev('label').hide()//,#IspolList_S
                                $('#planTime').next('br').after('<label id="lblSupp">Наименование поставщика</label><input type="text" disabled="disabled" value=\"' + selected[i].SERVICE_SUPPLIER + '\" id="nameSup">')
                            }
                            else {
                                $('#IspolList,#Otven,#AddSpecialist').show();
                                //

                                if (otv != undefined) {
                                    // $('#Otven').val(otv)
                                }
                                else {
                                    // $('#Otven').prop("selectedIndex", 0);
                                }
                                $('#Otven,#IspolList_S').prev('label').show()
                                $('#lblSupp,#nameSup').remove();
                            }

                            $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').show()

                            if ($('#PrServiceH tbody tr[service-guid="' + selected[i].SERVICE_GUID + '"]').length == 0) {
                                //  var q = (selected[i].QUANTITY.substr(selected[i].QUANTITY.indexOf(',') + 1, 2) == '00') ? selected[i].QUANTITY.substr(0, selected[i].QUANTITY.indexOf(',')) : selected[i].QUANTITY

                                // console.log(q)

                                var st = urlParam('st')
                                var disabled = "";
                                if (st == 4 || st == 5 || st == 3) {
                                    disabled = "disabled=disabled"
                                }
                                // console.log(selected[i].COST)
                                // console.log("selected[" + i + "].COST")
                                //  console.log(i)
                                // console.log(selected.length)

                                ////   console.log(selected[i].SERVICE_NAME)
                                //   console.log("selected[i]")
                                //   console.log(selected[i])
                                var cost_forOne = $('#subMenu').children('div[grup-guid=\"' + selected[i].PARENT_GUID + '\"]').children('input[type="checkbox"][service-guid=\"' + selected[i].SERVICE_GUID + '\"]').next('.serviceCost').text();

                                cost_forOne = (parseFloat(selected[i].COST) == 0) ? 'Договорная' : cost_forOne

                                var costTd = ($.isNumeric(cost_forOne)) ? '<a>' + selected[i].COST + '</a>' : (selected[i].COST == "") ? '<a onclick="Open_Pop(this)">Договорная</a>' : (parseFloat(selected[i].COST) == 0) ? '<a  onclick="Open_Pop(this)" >0</a>' : (parseFloat(selected[i].COST) != 0) ? '<a  onclick="Open_Pop(this)" >' + selected[i].COST + '</a>' : ""




                                $('#PrServiceH tbody').prepend('<tr service-name=\"' + selected[i].SERVICE_NAME + '\" service-guid=' + selected[i].SERVICE_GUID + ' ismc=\"' + selected[i].IS_MC + '\" supp-name=\"' + selected[i].SERVICE_SUPPLIER + '\" supp-guid=' + selected[i].SUPPLIER_GUID + ' grup-name=\"' + selected[i].SERVICE_GROUP + '\" grup-guid=' + selected[i].PARENT_GUID + ' title=\"' + selected[i].SERVICE_SUPPLIER + ' -> ' + selected[i].SERVICE_GROUP + ' -> ' + selected[i].SERVICE_NAME + '\" ><td>' + selected[i].SERVICE_SUPPLIER + '<i class="glyphicon glyphicon-arrow-right SuppGrupRelations"></i>' + selected[i].SERVICE_GROUP + '<i class="glyphicon glyphicon-arrow-right SuppGrupRelations"></i>' + selected[i].SERVICE_NAME + '</td><td><input type="text" ' + disabled + ' onkeyup=multiPlaying(this,\"' + cost_forOne.trim() + '\") class="quantity" onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57 || event.charCode == 44" value=\"' + selected[i].QUANTITY + '\"></td><td style="text-align:center">' + edizm + '</td><td class="CostTd">' + costTd + '<div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a guid=' + selected[i].SERVICE_GUID + ' ' + checkboxDissable + ' onclick="RemoveDirectRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
                            }
                        }
                        $('#PrServiceH').show();
                    }
                }
                if (selected != 0) {
                    var st = urlParam('st')
                    if (st == 4 || st == 5 || st == 3) {
                        $('.subMenu').children('div').each(function () {
                            $(this).children('input[type="checkbox"]').attr('disabled', 'disabled').removeAttr('onclick')
                            $('a[onclick="Open_Pop(this)"],a[onclick="RemoveDirectRow(this)"]').removeAttr('onclick').attr('disabled', 'disabled');
                        })

                    }

                }
                $('.ui-loader-background,#loader').hide()
            }
        })

        $(e).parent().after('<div id="subMenu" data-d=' + SERVICE_GUID + ' class="subMenu"  ></div>')

    }
    else {
        $(e).children('.fa').attr('class', 'fa fa-chevron-down GrupOpenIcon ml-3')
        $(e).attr('data-active', 'on')
        $(e).parent().next('#subMenu').remove();
        $('.ui-loader-background,#loader').hide()
    }

}

function SelectService_K(e, SERVICE_GUID, otv) {
    var selected = $(e).prop('checked');
    var suppGuid = $(e).attr('supp-guid');
    var grupName = $(e).attr('grup-name').trim()
    var ServiceName = $(e).parent().children('.serviceName').text();
    var grupGuid = $(e).parent().attr('grup-guid')//SERVICE_GUID
    var edizm = $(e).attr('data-edizm');
    var service_cost = $(e).attr('service-cost')
    var multiPlayVal = service_cost
    if (!$.isNumeric(service_cost)) {
        service_cost = '<a onclick="Open_Pop(this)">Договорная</a>'

    }
    else {
        if (service_cost == 0) {
            service_cost = '<a onclick="Open_Pop(this)">0</a>'
            multiPlayVal = "Договорная"
        }
        else {
            service_cost = '<a>' + service_cost + '</a>'
        }


    }
    var SuppName = $(e).parent().attr('supp-name');
    var ismc = $(e).attr('ismc');
    var title = $(e).parent().attr('title')
    if (selected == true) {
        var sameGrup = true;
        $('#PrServiceH').show();
        $('#PrServiceH thead tr th:eq(0)').text('Наименование услуг')
        // $('#PrServiceH tbody').empty();
        $('#PrServiceH tbody tr:not([grup-guid])').remove();
        $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').show()
        //  $('#subMenu,#grups').find('input[type="checkbox"]').prop('checked', false).not($(e))
        //  $('#PrServiceH tbody').empty();
        //' + SuppName + '<i class="glyphicon glyphicon-arrow-right SuppGrupRelations"></i>
        $('#PrServiceH tbody').prepend('<tr title="' + title + '" service-name="' + ServiceName + '" supp-name=\"' + SuppName + '\" grup-guid=\"' + grupGuid + '\" ismc=\"' + ismc + '\" supp-guid=' + suppGuid + ' grup-name=\"' + grupName + '\" service-guid=' + SERVICE_GUID + ' title=\"' + SuppName + ' -> ' + grupName + ' -> ' + ServiceName + '\" ><td>' + grupName + '<i class="glyphicon glyphicon-arrow-right SuppGrupRelations"></i>' + ServiceName + '</td><td><input type="text" class="quantity" onkeyup=multiPlaying(this,\"' + multiPlayVal + '\") onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57 || event.charCode == 44" value="1"></td><td style="text-align:center">' + edizm + '</td><td class="CostTd">' + service_cost + '<div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a guid=' + SERVICE_GUID + ' onclick="RemoveDirectRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

        //var grup_guid = $('#subMenu').attr('data-d')//$(e).parent().parent('#subMenu').attr('data-d')
        //checking suppguid, is different or not
        if ($('#PrServiceH tbody tr').length != 0) {

            $('#PrServiceH tbody tr').each(function () {

                var trgrupGuid = $(this).attr('grup-guid')
                if (grupGuid != trgrupGuid) {
                    sameGrup = $(this).attr('grup-name');
                }
                //var trgrupName = $(this).attr('grup-name').trim();
                //if (trgrupName != grupName) {
                //    sameGrup = $(this).attr('grup-name');
                //    return false;

                //}
            })

        }
        $('.chkServc[service-guid="' + SERVICE_GUID + '"]').prop('checked', true);
        //if suppguids is diferent then rremove from the table
        if (sameGrup != true && $('#PrServiceH thead tr th:eq(0)').text() == 'Наименование услуг') {
            var resultGrup = confirm('В заявке возможно указать услуги только одного группу услуг. Вы уверены, что хотите изменить группу услуг с "' + sameGrup + '" на "' + grupName + '"?');
            if (resultGrup == true) {

                if ($('#PrServiceH tbody tr').length != 0) {


                    $('#PrServiceH tbody tr').each(function () {

                        var trGrupGuid = $(this).attr('grup-guid');
                        $('.chkGrups:not([grup-guid="' + trGrupGuid + '"])').prop('checked', false);
                        $('.chkServc:not([grup-name="' + grupName + '"])').prop('checked', false);
                        $('#PrServiceH tbody tr[grup-guid!="' + grupGuid + '"]').remove();

                    })


                }


            }
            else {

                $(e).prop('checked', false)
                if ($('#PrServiceH tbody tr').length != 0) {

                    $('#PrServiceH tbody tr').each(function () {
                        var trSuppGuid = $(this).attr('supp-guid');
                        if (trSuppGuid == suppGuid) {
                            $(this).remove();
                            ////console.log("deleted")
                        }
                    })
                }
            }
        }

        $('#PrServiceH tbody tr').each(function () {
            var ismc_ = $(this).attr('ismc');

            if (ismc_ == "False") {
                $('#AddSpecialist').removeAttr('disabled')
                $('#Otven,#AddSpecialist').hide();//#IspolList,
                $('#lblSupp,#nameSup,.sps').remove();
                $('#Otven').prev('label').hide()//#IspolList_S
                $('#planTime').next('br').after('<label id="lblSupp">Наименование поставщика</label><input type="text" disabled="disabled" value=\"' + SuppName + '\" id="nameSup">')
                var suppGuid2 = $(e).attr('supp-guid');
                $('#IspolList').children('option[supp-guid!=' + suppGuid2 + ']').not('option[value="0"]').hide()
            }
            else {
                $('#IspolList,#Otven,#AddSpecialist').show();
                if (otv != undefined) {
                    //  $('#Otven').val(otv);
                }
                else {
                    //   $('#Otven').prop("selectedIndex", 0);
                }
                $('#Otven,#IspolList_S').prev('label').show()
                $('#lblSupp,#nameSup').remove();
            }
        })
        var SubMenuChildren = $('#Services_').children('tbody').children('tr').length
        if (SubMenuChildren == 1) {
            var Is_checked = $('input[type="checkbox"][grup-guid="' + grupGuid + '"]').prop('checked')

            if (Is_checked == false) {
                $('input[type="checkbox"][grup-guid="' + grupGuid + '"]').trigger('click');
            }
        }
    }
    else {
        var SubMenuChildren = $('#Services_').children('tbody').children('tr').length
        if (SubMenuChildren == 1) {
            var Is_checked = $('input[type="checkbox"][grup-guid="' + grupGuid + '"]').prop('checked')

            if (Is_checked == true) {
                $('input[type="checkbox"][grup-guid="' + grupGuid + '"]').trigger('click');
            }
        }
        removeFromSps();
        var suppGuid2 = $(e).attr('supp-guid');

        $('.chkServc[service-guid="' + SERVICE_GUID + '"]').prop('checked', false);
        $('#PrServiceH tbody tr').each(function () {
            var trgrupGuid = $(this).attr('service-guid')
            if (SERVICE_GUID == trgrupGuid) {
                $(this).remove()
            }
        })

        if ($('#PrServiceH tbody tr').length == 0) {
            $('#IspolList').children('option[supp-guid!=' + suppGuid2 + ']').not('option[value="0"]').show()
            $('#PrServiceH thead tr th:eq(3)').show();
            $('#PrServiceH thead tr th:eq(0)').text('Наименование направления')
            //$('#PrServiceH thead tr').each(function () {
            //    $(this).children('th:eq(1),th:eq(2)').hide();

            //})
            var text = $('.selectdrc').children('#drctName').children('label').text();
            var directGuid = $('.selectdrc').attr('direct-guid');
            $('#PrServiceH tbody').append('<tr><td >' + text + '</td><td>-</td><td>-</td><td class="CostTd"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-url="0" disabled="disabled"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')



        }
        $('.ui-loader-background,#loader').hide()
    }

    CalculatTotaleCost()
    // getSpesicalisetsBySupplierGuid(suppGuid)

}
function getResponsibels_ForCheckGroup(gg) {
    var Obj = { "gg": gg }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/getResponsibels_ForCheckGroup",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#Otven').select2('destroy')
            var j = JSON.parse(data.d);
            $('#Otven').empty();
            for (var i = 0; i < j.length; i++) {
                $('#Otven').append('<option email=\"' + j[i].E_MAIL + '\" value=' + j[i].LOG_IN_ID + '>' + j[i].ACCOUNT_NAME + '</option>');
            }
            $('#Otven').select2()
        }
    })
}
function getSpesicalisetsBySupplierGuid(sup) {
    if (sup != undefined) {
        var o = { supGuid: sup }
        $.ajax({
            type: "POST",
            url: "../Super_Disp/CreateDispRequest.aspx/getSpesicalisetsBySupplierGuid",
            data: JSON.stringify(o),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $('#AddSpecialist').data('PerformerListSps', data)
                //var j = JSON.parse(data.d);
                //for (var i = 0; i < length; i++) {
                //    $('#PerformerListSps').append('<option value="' + j[i].LOGIN_ID + '"> ' + j[i].ACCOUNT_NAME + '</option>')
                //}
            }
        })
    }
}

function SelectDirect(e) {
    $('.drct').attr('class', 'col-md-3 drct w-24 border-1 rounded8 text-center');
    $(e).attr('class', 'col-md-3 drct selectdrc w-24 border-1 rounded8 text-center');
    $('.ui-loader-background,#loader').show()
    GetRelatedGroups_K("", $('#prjcts').children('option:selected').attr('guid'), $(e).attr('guid'))
    //if ($('#PrServiceH tbody tr').length==0) {
    $('#PrServiceH').show()
    $('#PrServiceH tbody').empty();
    $('#PrServiceH thead tr th:eq(3)').show();
    $('#PrServiceH thead tr th:eq(0)').text('Наименование направления')
    //$('#PrServiceH thead tr').each(function () {
    //    $(this).children('th:eq(1),th:eq(2)').hide();

    //})

    var text = $(e).children('#drctName').children('label').text();

    $('#PrServiceH tbody').append('<tr><td >' + text + '</td><td>-</td><td>-</td><td class="CostTd"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-url="0" disabled="disabled"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
    // }
    var rvalue = $(e).attr('rvalue')
    var rname = $(e).attr('rname');
    var remail = $(e).attr('remail');
    var role = sessionStorage.getItem("role")
    if (role != 15) {
        $('#IspolList,#Otven').show();
        $('#Otven,#IspolList_S').prev('label').show()
        $('#lblSupp,#nameSup').remove();
    }

    var Count_resp = $('#Otven').children('option[value=\"' + rvalue + '\"]').length
    if (Count_resp == 0) {
        //  $('#Otven').prepend('<option email=\"' + remail + '\" value=\"' + rvalue + '\">' + rname + '</option>')
        //   $('#Otven').val(rvalue);
    }
    else {
        //   $('#Otven').val(rvalue);
    }
    CalculatTotaleCost()

}
function ChangeToSend(e) {
    var Selectedvalue = $(e).val()
    var currentUSer = sessionStorage.getItem("Log")
    if (Selectedvalue != 0) {

        if (Selectedvalue == currentUSer) {
            //   $("#SaveMO").hide();//Отправить Испонителю
            //  $("#SaveDD").show().attr('data-status', '1')//Принять в Работу
            var st = urlParam('st')
            if (st != 1) {
                $("#SaveDD").text('Принять в Работу').attr('data-status', '1').show()
            }
            else {
                $("#SaveDD").text('Работа выполнена').attr('data-status', '3').show()
            }
        }
        else {
            $('#SaveDD').hide()
            //  $("#SaveDD").text('Отправить Испонителю').attr('data-status', '2')
            // $("#SaveMO").show();//Отправить Испонителю
            // $("#SaveDD").hide().attr('data-status', '2')//Принять в Работу
        }
    }
    else {
        //  $("#SaveDD").text('Принять в Работу').attr('data-status', '1')
        $('#SaveDD').hide()
    }

}
function selectInd(e) {
    $("#Ind").val("");
    $("#Phn").val("");
    $("#Ind").val($(e).text()).attr('itemid', $(e).attr('itemid'))
    $("#Phn").val($(e).attr('data-number'))
    $("#IndList label").css("background-color", "").css("color", "black");
    $(e).css("background-color", "#23527c").css("color", "white");
}
function otpravToVrabotSupp(o, r) {
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/otpravToVrabotSupp",
        data: JSON.stringify(o),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var SLog_id = sessionStorage.getItem("Log")
            SaveLog_S("Принять в работу", "Простое", "Диспетчер", "Диспетчеризация", "Заявка < " + r + " >принята в работу", SLog_id);
            var comes = sessionStorage.getItem("All");

            var loc = window.location.pathname
            var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
            window.location.href = back
        }
    })
}
function otpravToVrabot(o, r) {
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/otpravToVrabot",
        data: JSON.stringify(o),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var SLog_id = sessionStorage.getItem("Log")
            SaveLog_S("Принять в работу", "Простое", "Диспетчер", "Диспетчеризация", "Заявка < " + r + " >принята в работу", SLog_id);
            var mn = $('#hedrZ').attr('mn')
            SaveFCM('Заявка', 'Заявка получила статус «В работе»', 'Заявке № ' + mn + ' в статусе «В работе».', '', $('#Acnum').val(), SLog_id, 'CreateDispRequest.aspx', r)
            var comes = sessionStorage.getItem("All");
            // window.location.href = "DispRequests.aspx"
            //parent.history.back();
            var loc = window.location.pathname
            var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
            window.location.href = back


        }
    })
}
function vernutVrabot(rid) {
    if ($('.manysps').length == 0) {
        var modal = document.getElementById('myModal6');
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        $("#close_6").click(function () {
            modal.style.display = "none";
        })
    }
    else {
        var SLog_id = sessionStorage.getItem("Log")
        var objOt = { "Rid": rid, "Ispol": 0, 'ispolEmail': "", 'login_id': SLog_id, 'path': window.location.pathname }

        $.ajax({
            type: "POST",
            url: "../Super_Disp/CreateDispRequest.aspx/MakeVrabote",
            data: JSON.stringify(objOt),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                SaveLog_S("Вернуть заявку в работу", "Важное", "Техник", "Диспетчеризация", "К вам возвращена заявка <" + rid + ">", SLog_id);
                //window.location.href = "DispRequests.aspx"
                //parent.history.back();
                //Заявка №[Номер заявки] возвращена в работу
                var SLog_id = sessionStorage.getItem("Log")
                var mn = $('#hedrZ').attr('mn');
                SaveFCM('Заявка', 'Заявка №  ' + mn + 'возвращена в работу', 'Заявка №  ' + mn + 'возвращена в работу', '', $('#Acnum').val(), SLog_id, 'CreateDispRequest.aspx', rid)
                var loc = window.location.pathname
                var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
                window.location.href = back

            }
        })
    }

}
function MakeZakritSupp(R_id, imgs, text) {
    var opl = $('#opl').prop('checked');
    opl = "" + opl + ""
    var objOt = { "R_id": R_id, "imgs": imgs, "text": text, "opl": opl, "login_id": sessionStorage.getItem("Log"), 'path': window.location.pathname }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/MakeZakritSupp",
        data: JSON.stringify(objOt),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var SLog_id = sessionStorage.getItem("Log")
            //  SaveLog_S("Закрыть заявку", "Простое", "Диспетчер", "Диспетчеризация", "Заявка < " + R_id + " > закрыта", SLog_id);
            //parent.history.back();
            var loc = window.location.pathname
            var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
            window.location.href = back
        }
    })
}

function MakeZakrit(obj, R_id) {
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/MakeZakrit",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var SLog_id = sessionStorage.getItem("Log")
            //  SaveLog_S("Закрыть заявку", "Простое", "Диспетчер", "Диспетчеризация", "Заявка < " + R_id + " > закрыта", SLog_id);
            //parent.history.back();
            var mn = $('#hedrZ').attr('mn')
            SaveFCM('Заявка', 'Заявка получила статус «Закрыта»', '"Заявке № ' + mn + 'в статусе «Закрыта».', '', $('#Acnum').val(), SLog_id, 'CreateDispRequest.aspx', R_id)
            var loc = window.location.pathname
            var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
            window.location.href = back
        }
    })
}
function SaveCommentZakrito(rid, rc, AUTHOR, status) {
    var obj = { "rq": rid, "cmnt": rc, "AUTHOR": AUTHOR, 'lg': sessionStorage.getItem("Log"), 'path': window.location.pathname, status: status }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/sntComment",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

        }

    })
}
function SaveFileZakrito(rid, img_s, AUTHOR, status) {
    var obj = { "R": rid, "imgs": img_s, "AUTHOR": AUTHOR, status: status }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/SaveHFile",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

        }
    })
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
            //////console.log(formData);
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
                    //   ////console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
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
                    ////console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

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
function Commentst() {
    //$("#mh").text(Header_);
    //$("#txt").text(text_);
    //$("#mf").text(footer_)
    var modal = document.getElementById('myModal4');
    $('#myModal4').children('.modal-content2').css("width", "50%")

    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    $("#close_4").click(function () {
        modal.style.display = "none";
    })

}
function GetRSComment(rid) {
    if ($.isNumeric(rid)) {
        var obj = { "rid": rid }
        $.ajax({
            type: "POST",
            url: "../Super_Disp/CreateDispRequest.aspx/GetRStTF",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //
                //$('#divlst').append('<i id="lstcmnt" class="fa fa-exclamation-circle" style ="font-size: 300%; color: green;" ></i>')
               
                $('#myModal4').children('.modal-content2').children('.modal-header2').children('label').remove();
                $('#myModal4').children('.modal-content2').children('.modal-footer2').empty()
                $('#myModal4').children('.modal-content2').children('.modal-body2').children('#cmntsts,#genPass').remove()
                $('#myModal4').children('.modal-content2').children('.modal-body2').append('<textarea disabled="disabled" style="width: 522px; height: 205px; max-width: 100%; min-width: 100%; max-height: 109px; min-height: 109px; margin: 0px;" id="cmntsts"> </textarea>')
                var jsondata_ = JSON.parse(data.d)
                if (jsondata_.length == 0) {
                    //   $('#lstcmnt').hide();
                }
                $("#cmntsts").text(" ");
                for (var i = 0; i < jsondata_.length; i++) {
                    // 
                    $("#cmntsts").append(jsondata_[i].RS_TEXT + '\n');
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

}
function RabotVipol(rid) {
    var modal = document.getElementById('myModal5');
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    $('#f_iles2').attr('onchange', 'fileForVipol(this)')
    $("#close_5").click(function () {
        modal.style.display = "none";
        $('#f_iles2').removeAttr('onchange');
        $(".modal-body2 img").remove()
        $(".modal-body2 h4").remove();
        $(".modal-body2 i").remove()
    })
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            $(".modal-body2 img").remove()
            $(".modal-body2 h4").remove();
            $(".modal-body2 i").remove()
        }
    }
    $("#Close_Ot").click(function () {
        modal.style.display = "none";
        $(".modal-body2 img").remove()
        $(".modal-body2 h4").remove();
        $(".modal-body2 i").remove()
    })
    $("#OkVipol").click(function () {
        var imgs = [];
        $(".modal-body2 img").each(function () {
            var ImgSrc = $(this).attr("data-url")
            imgs.push({ "ImgAdres": ImgSrc });
        })
        var imgsCount = imgs.length;
        if (imgsCount == 0) {
            imgs.push({ "ImgAdres": 0 });
        }
        var P_Services = []
        $("#PrServiceH tbody tr").each(function () {
            var quant = $(this).children('td:eq(1)').find('input').val();
            quant = (quant == "" || quant == null || quant == undefined) ? 0 : quant
            var Cost = $(this).children('td:eq(3)').children('a').text();
            Cost = parseInt(Cost)
            var serviceId = $(this).children('td:eq(0)').attr('itemid');
            P_Services.push({ 'SERVICE_ID': serviceId, 'QUANTITY': quant, 'COST': Cost })
        })
        var opl = $('#opl').prop('checked');
        opl = "" + opl + ""
        var lg_id = $('#lgId').text()
        var grupservis = $('#PrServiceH tbody').children('tr:eq(0)').attr('data-d')//($('#subMenu').attr('data-d') == undefined) ? 0 : $('#subMenu').attr('data-d')
        var objV = {
            "Rid": rid, "rsf": JSON.stringify(imgs), "rst": $("#cmntsts2").val(), 'opl': opl, 'login_id': lg_id
        }

        $.ajax({
            type: "POST",
            url: "../Super_Disp/CreateDispRequest.aspx/makeVipol",
            data: JSON.stringify(objV),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {//Заявка по работе <Номер заявки> выполнена
                var SLog_id = sessionStorage.getItem("Log")
                var mn = $('#hedrZ').attr('mn')
                SaveFCM('Заявки', 'Заявка получила статус «Выполнена»', 'По заявке № ' + mn + ' работа выполнена.', '', $('#Acnum').val(), SLog_id, 'CreateDispRequest.aspx', rid)
                SaveLog_S("Работа выполнена", "Важное", "Диспетчер", "Диспетчеризация", "Работа по заявке < " + rid + " > выполнена", SLog_id);
                //window.location.href = "DispRequests.aspx"
                //parent.history.back();
                var loc = window.location.pathname
                var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
                window.location.href = back
            }
        })


    })
}
function fileForVipol(e) {
    $('.ui-loader-background,#loader').show()
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
            //////console.log(formData);
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
                    //////console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
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
                    $('.ui-loader-background,#loader').hide()

                },

                error: function (datas) {

                    //datas = JSON.stringify(datas, null, 2)
                    ////var rt = datas.responseText
                    ////rt = JSON.parse(rt);
                    ////$(".foto-disp").attr('src', rt.URL.replace('~', '..'))
                    //Addimage2(datas);
                    ////console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

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
function MakeOtmenSupp(R_id, imgs, text) {
    var opl = $('#opl').prop('checked');
    opl = "" + opl + ""
    var objOt = { "R_id": R_id, "imgs": imgs, "text": text, "opl": opl, "login_id": sessionStorage.getItem("Log"), '_path': window.location.pathname, "SpId": $('#IspolList').val() }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/MakeOtmenSupp",
        data: JSON.stringify(objOt),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var SLog_id = sessionStorage.getItem("Log")
            SaveLog_S("Отменить заявку", "Важное", "Диспетчер", "Диспетчеризация", "Заявка  < " + R_id + " > отменена", SLog_id);
            var mn = $('#hedrZ').attr('mn')

            var loc = window.location.pathname
            var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
            window.location.href = back
        }
    })
}
function MakeOtmen(objOt, R_id) {
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/MakeOtmen",
        data: JSON.stringify(objOt),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var SLog_id = sessionStorage.getItem("Log")
            SaveLog_S("Отменить заявку", "Важное", "Диспетчер", "Диспетчеризация", "Заявка  < " + R_id + " > отменена", SLog_id);
            var mn = $('#hedrZ').attr('mn')
            SaveFCM('Заявка', 'Заявка получила статус «Отменена»', '"Заявке № ' + mn + 'в статусе «Отменена».', '', $('#Acnum').val(), SLog_id, 'CreateDispRequest.aspx', R_id)
            //   window.location.href = "DispRequests.aspx"
            //parent.history.back();
            var loc = window.location.pathname
            var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
            window.location.href = back

        }
    })
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
function SaveCommentOtmen(rid, rc, AUTHOR, status) {
    var SLogId = sessionStorage.getItem("Log")
    var obj = { "rq": rid, "cmnt": rc, "AUTHOR": AUTHOR, 'lg': sessionStorage.getItem("Log"), 'path': window.location.pathname, status: status }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/sntComment",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

        }

    })
}
function SaveFileOtmen(rid, img_s, AUTHOR, status) {
    var obj = { "R": rid, "imgs": img_s, "AUTHOR": AUTHOR, status: status }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/SaveHFile",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

        }
    })
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
            //////console.log(formData);
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
                    //////console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
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
                    ////console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

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
function FileForOtmen(e) {
    $('.ui-loader-background,#loader').show()
    var filePath = $(e).val();
    var index = filePath.lastIndexOf("\\") + 1;
    var filename = filePath.substr(index);
    readU_RLOtmenSuper(e, filename)
}
function readU_RLOtmenSuper(input, imgName) {
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
            //////console.log(formData);
            $.ajax({
                type: "POST",
                url: window.location.protocol + '//' + window.location.host +"/WCFServices/Constructor_API.svc/UploadFile",//
                data: formData,
                type: 'POST',
                contentType: "multipart/form-data",
                processData: false,
                // async: false,
                success: function (result) {


                    //alert("OK. See //console -  press F12");
                    //////console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
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
                        $("#cmntsts2").after('<div class="f_Otmen"><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + '  src=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i></div>')
                    }
                    if (extention == "docx" || extention == "doc") {
                        $("#cmntsts2").after('<div class="f_Otmen"><h4 itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' src="' + window.location.protocol + '//' + window.location.host + '/img/word.png"style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i></div>')

                    }
                    if (extention == "xlsx" || extention == "xls") {
                        $("#cmntsts2").after('<div class="f_Otmen"><h4 itemid="' + itemnum2 + '" itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png"style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i></div>')

                    }
                    if (extention == "pdf" || extention == "PDF") {
                        $("#cmntsts2").after('<div class="f_Otmen"><h4 itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png" style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i></div>')

                    }
                    if (extention == "txt" || extention == "TXT") {
                        $("#cmntsts2").after('<div class="f_Otmen"><h4 itemid="' + itemnum2 + '" class="titleF">' + imgName + '</h4><img itemid="' + itemnum2 + '" data-url=' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + ' src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png"style="width:71px" /><i class="fa fa-close removing2" onclick="removeF3(this,' + itemnum2 + ')"   aria-hidden="true"></i></div>')

                    }
                    var allOfImgs = $('.modal-body2 > img').length;
                    if (allOfImgs == 5) {
                        $("#f_iles2").hide();
                    }
                    //  $('.foto-disp').attr('src', )
                    $('.ui-loader-background,#loader').hide()

                },

                error: function (datas) {

                    //datas = JSON.stringify(datas, null, 2)
                    ////var rt = datas.responseText
                    ////rt = JSON.parse(rt);
                    ////$(".foto-disp").attr('src', rt.URL.replace('~', '..'))
                    //Addimage2(datas);
                    //////console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

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
function H_fileSave(rid, imgC, AUTHOR) {//ImgAdres
    var img_s = [];
 //   imgC = $('.foto-disp:first').attr('itemid')//$("#himgs > img:last").attr("itemid");
    //for (var i = 1; i <= imgC; i++) {
    //    //   var imgAdres = ($(".HistImg[itemid='" + i + "']").attr("data-url") != undefined) ? $(".HistImg[itemid='" + i + "']").attr("data-url") : "";
    //    var imgAdres = $('#fotoDisp' + i + '').attr('data-url')
    //    img_s.push({ "ImgAdres": imgAdres })
    //}
    $('.foto-disp').each(function () {
        var imgAdres = $(this).attr('data-url')
        img_s.push({ "ImgAdres": imgAdres })
    })
    var obj = { "R": rid, "imgs": JSON.stringify(img_s), 'AUTHOR': AUTHOR, 'status': 5 }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/SaveHFile",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //$("#hstCom").append('<a href="' + F_Url + '" download=""><img class="foto-disp" data-url="' + F_Url + '"  src="../Files/03774a21-4965-4a11-823c-1f040143dc2d.jpg"></a>')
            $("#himgs").empty();
            for (var i = 0; i < img_s.length; i++) {


                var F_ile = img_s[i].ImgAdres
                if (F_ile != "") {



                    var extention = F_ile.substr(F_ile.lastIndexOf(".") + 1)
                    if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
                        $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '"  src="' + F_ile + '" style="width:71px" /></a>')
                        $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>" + AUTHOR + " : (сегодня в " + getTime("") + ")  </h5> ")
                    }
                    if (extention == "docx" || extention == "doc") {
                        $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/word.png" style="width:71px" /></a>')
                        $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>" + AUTHOR + " : (сегодня в " + getTime("") + ")  </h5> ")

                    }
                    if (extention == "xlsx" || extention == "xls") {
                        $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png"style="width:71px" /></a>')
                        $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>" + AUTHOR + " : (сегодня в " + getTime("") + ")  </h5> ")

                    }
                    if (extention == "pdf" || extention == "PDF") {
                        $("#hstCom").append('<br><a href="' + F_ile + '" download=""> <img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png" style="width:71px" /></a>')
                        $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>" + AUTHOR + " : (сегодня в " + getTime("") + ")  </h5> ")

                    }
                    if (extention == "txt" || extention == "TXT") {
                        $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png"style="width:71px" /></a>')
                        $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>" + AUTHOR + " : (сегодня в " + getTime("") + ")  </h5> ")

                    }
                }

            }

            $("#hstCom").scrollTop(1000);
        }
    })
}
function sensComment(rid, rc, dturl, AUTHOR) {
    if (rc.length != 0) {

        var obj = { "rq": rid, "cmnt": rc, "AUTHOR": AUTHOR, "lg": sessionStorage.getItem("Log"), "path": window.location.pathname, status: null }
        $.ajax({
            type: "POST",
            url: "../Super_Disp/CreateDispRequest.aspx/sntComment",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var hst = $("#hstCom").text().trim();
                if (hst == "-") {
                    $("#hstCom").empty();
                    $("#hstCom").append("<h4 style='margin-bottom:  -6px;'>" + AUTHOR + " : " + rc + "  </h4> (сегодня в " + getTime("") + ")")
                    $("#RComment").val("")

                }
                else {
                    $("#hstCom").append("<h4 style='margin-bottom:  -6px;'>" + AUTHOR + " : " + rc + "  </h4>     (сегодня в " + getTime("") + ")")
                    $("#RComment").val("")

                }

                $("#hstCom").scrollTop(1000);
            }
        })
    }

    if (dturl != 0) {
        H_fileSave(rid, dturl, AUTHOR)
        //      $("#HImg").attr("src", window.location.protocol + '//' + window.location.host + "/Files/upl.png").attr("data-url", "0")
        $('#zImg').remove()

    }
    $('#fileH_btn').show();

}
function readURLHSuper(input, imgName) {
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
            var file = document.getElementById("fileH").files[0];

            formData.append('file', file, encodeURI(file.name));
            formData.append('object_id', '1');
            //////console.log(formData);
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
                    // ////console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    // $("#fileH").val("")
                    //var jsondata_1 = jQuery.parseJSON(result)
                    //var jsondata_1 = JSON.stringify(result)
                    // var jsondata_1 = JSON.parse(result)
                    /// 

                    var itemnum = $("#himgs > img:last").attr("itemid");
                    if (itemnum == undefined) {
                        itemnum = 0;
                        itemnum++;
                    }
                    else {
                        itemnum++;
                    }
                    $("#RComment_S").hide();
                    var F_ile = result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/")
                    var extention = F_ile.substr(F_ile.lastIndexOf(".") + 1)
                    //
                    if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {//<img   id="HImg" data-url="0" src=" ../Files/upl.png" style="display:none;width:71px;float: right;margin-right:  52%;">
                        //$("#HImg").attr('data-url', F_ile).attr('src', F_ile)
                        //$("#HImg").after('<i class="fa fa-close" style="float: right;color:red;" aria-hidden="true"></i>')
                        $("#himgs").append('<img class="HistImg" itemid="' + itemnum + '" data-url="' + F_ile + '" src="' + F_ile + '"  ><i class="fa fa-close removing" onclick="removeF2(this,' + itemnum + ')"  aria-hidden="true"></i>')
                    }
                    if (extention == "docx" || extention == "doc") {
                        //$("#HImg").attr('data-url', F_ile).attr('src', window.location.protocol + '//' + window.location.host + "/img/word.png")
                        $("#himgs").append('<img class="HistImg" itemid="' + itemnum + '" data-url="' + F_ile + '"  src="' + window.location.protocol + '//' + window.location.host + '/img/word.png"  ><i class="fa fa-close removing" onclick="removeF2(this,' + itemnum + ')" aria-hidden="true"></i><h4 itemid="' + itemnum + '" class="titleF2">' + file.name + '</h4>')
                    }
                    if (extention == "xlsx" || extention == "xls") {
                        //$("#HImg").attr('data-url', F_ile).attr('src', window.location.protocol + '//' + window.location.host + "/img/excel.png")
                        $("#himgs").append('<img class="HistImg" itemid="' + itemnum + '" data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png"  ><i class="fa fa-close removing" onclick="removeF2(this,' + itemnum + ')" aria-hidden="true"></i><h4 itemid="' + itemnum + '" class="titleF2">' + file.name + '</h4>')
                    }
                    if (extention == "pdf" || extention == "PDF") {
                        //$("#HImg").attr('data-url', F_ile).attr('src', window.location.protocol + '//' + window.location.host + "/img/excel.png")
                        $("#himgs").append('<img class="HistImg" itemid="' + itemnum + '" data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png"  ><i class="fa fa-close removing" onclick="removeF2(this,' + itemnum + ')" aria-hidden="true"></i><h4 itemid="' + itemnum + '" class="titleF2">' + file.name + '</h4>')
                    }
                    if (extention == "txt" || extention == "TXT") {
                        //$("#HImg").attr('data-url', F_ile).attr('src', window.location.protocol + '//' + window.location.host + "/img/texete.png")
                        $("#himgs").append('<img class="HistImg" itemid="' + itemnum + '" data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png"><i class="fa fa-close removing" onclick="removeF2(this,' + itemnum + ')" aria-hidden="true"></i><h4 itemid="' + itemnum + '" class="titleF2">' + file.name + '</h4>')
                    }
                    // H_fileSave(R_id, result.URL.replace('~', '..'))
                    var imgscount = $("#himgs > img").length;
                    if (imgscount >= 5) {
                        $('#fileH_btn').hide();
                    }

                    //  $('.foto-disp').attr('src', )
                    $('.ui-loader-background,#loader').hide()

                },

                error: function (datas) {

                    //datas = JSON.stringify(datas, null, 2)
                    ////var rt = datas.responseText
                    ////rt = JSON.parse(rt);
                    ////$(".foto-disp").attr('src', rt.URL.replace('~', '..'))
                    //Addimage2(datas);
                    ////console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

                    var filePath = $('#fileH').val();
                    var index = filePath.lastIndexOf("\\") + 1;
                    var filename = filePath.substr(index);
                    readURLH(input, filename)
                },
                failure: function (r) {
                    alert("FAIL");
                }
            });


        }


    }
}
function removeF2(e, num) {
    $(e).parent().remove();
 
    $('#f_iles2').show().val('');
}
function removeF3(e, num) {
    $(e).remove();
    $("#f_iles2").show();
    $("img[itemid='" + num + "']").remove();
    $(".titleF[itemid='" + num + "']").remove();
}
function getHasInds(Type_, ind_) {
    var obj = { "indId": ind_ }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/gethasInd",
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
                if (Type_ != "M") {
                    $("#Entrance").val(jsondata[0].ENTRANCE)
                    $("#Floor").val(jsondata[0].FLOOR)
                }
            }


        }
    })
}
function GetRequesByR(R) {
    var obj = { "Rid": R, 'path': window.location.pathname }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/GetRequestbyId",
        error: function (t) { console.log(t); $('.ui-loader-background,#loader').hide(); alert("Error!!!") },
        data: JSON.stringify(obj),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            console.log(jsondata_)
            var Slog = sessionStorage.getItem("Log")
            var st = urlParam('st')
            $("#hedrZ").text('Заявка № ' + jsondata_[0].MOBILE_NUMBER + '   (Статус заявки "' + jsondata_[0].STATUS + '")')
            $("#hedrZ").attr("mn", jsondata_[0].MOBILE_NUMBER);

            if (jsondata_[0].ACCOUNT_NAME != "~") {
                for (var i = 0; i < jsondata_.length; i++) {
                    var json_Project_guid_andId = JSON.parse(jsondata_[i].PROJECT_ID)
                    GetProjects(Slog, json_Project_guid_andId[0].PROJECT_ID, jsondata_[i].RESPONSIBLE_ID);
                    getObjectByProjectId(jsondata_[i].ADRESS, json_Project_guid_andId[0].PROJECT_ID)
                   
                    //GetDispsByObjectid(jsondata_[i].DISP_ID, jsondata_[i].ADRESS)

                    // ////console.log(jsondata_[i].ACCOUNT_NAME)
                    $("#chkem").prop("checked", jsondata_[i].EMERGENCY_TREATMENT)
                    $('#opl').prop("checked", (jsondata_[i].PAYMENT != "0" && jsondata_[i].PAYMENT != "") ? true : false)//.attr('disabled','disabled')
                    // $("#adr").val(jsondata_[i].ADRESS)
                    $("#Ind").val(jsondata_[i].im_FIRST_NAME)
                    $("#Phn").val(jsondata_[i].i_IND_PHONE_NUMBER)
                    //if (jsondata_[i].ADRESS.length != 0) {
                    //    GetRelatedSets(jsondata_[i].SERVICE_GROUP_ID, jsondata_[i].ADRESS)
                    //}
                    var jsonServices = JSON.parse(jsondata_[i].ROOM_COUNT)
                    if (jsonServices.length != 0) {
                        jsonServices[0]["RESPONSIBLE_ID"] = jsondata_[i].RESPONSIBLE_ID
                    }

                    var reqType_WorkKind = jsondata_[i].REQUEST_TYPE.split('|')
                    jsondata_[i].REQUEST_TYPE = reqType_WorkKind[0]
                    reqType_WorkKind = reqType_WorkKind[1]
                    GetKindOfRequest(reqType_WorkKind)
                    if (st != 4 && st != 5 && st != 3) {
                        GetAllServicesOfProject(json_Project_guid_andId[0].GUID, reqType_WorkKind)
                    }
                    $('#reqType').val(jsondata_[i].REQUEST_TYPE)
                    //  console.log("jsonServices")
                    // console.log(jsonServices)
                    var st = urlParam('st') //sessionStorage.getItem("st")
                    getDirection_K(jsonServices, json_Project_guid_andId[0].GUID, jsondata_[i].RESPONSIBLE_ID, reqType_WorkKind);


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
                        //////console.log(rc[0].room)

                    }
                    else {
                        $('#Ind').val(jsondata_[i].FIRST_NAME).attr('itemid', jsondata_[i].INDIVIDUAL_ID)

                        getHasInds("U", jsondata_[i].INDIVIDUAL_ID)
                        getcurrdspObj(jsondata_[i].DISP_ID, jsondata_[i].ADRESS)//WAS LogId
                        //$("#hstComh").show();
                        //$("#hstCom").append('<h4> -- ' + jsondata_[i].REQUEST_COMMENT + '</h4>').show();
                        gtCommenst("", R)
                        $("#RComment").val("")
                        $('#Acnum').val(jsondata_[i].SERVICE_NAME);
                        //$('#Phn').val(jsondata_[i].TOTAL_COST);
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
                    //  GetAccFortexnik(jsondata_[i].LOG_IN_ID, jsondata_[i].SPECIALIST_ID)
                    var isResponsibleProfile = window.location.pathname
                    if (isResponsibleProfile != '/Responsible_Admin/CreateRequest.aspx') {

                        GetPerFormers(jsondata_[i].SPECIALIS_ID, jsondata_[i].ADRESS)
                    }
                    else {
                        var sps = JSON.parse(jsondata_[i].SPECIALISTS)
                        if (sps.length == 1) {
                            if (sps[0].SPECIALIS_ID == jsondata_[i].SPECIALIS_ID && sps[0].SGUID == undefined) {
                                GetPerFormers(jsondata_[i].SPECIALIS_ID, jsondata_[i].ADRESS)
                            }
                        }
                        else {
                            if (sps.length != 0) {
                                GetPerFormers("", jsondata_[i].ADRESS)
                            }
                            else {
                                GetPerFormers(jsondata_[i].SPECIALIS_ID, jsondata_[i].ADRESS)
                            }

                            for (var j = 0; j < sps.length; j++) {
                                Add_Specialist(sps[j])
                                $('#AddSpecialist').removeAttr('disabled')

                            }
                        }

                    }
                    getResponsibels_(jsondata_[i].RESPONSIBLE_ID)
                    //GetGroupOfServices(jsondata_[0].SERVICE_GROUP_ID, jsondata_[0].ADRESS)

                }
               
                $('#PrServiceH').after(' <div class="totalh7"><h7 id="total" total-summ=\"' + jsondata_[0].TOTAL_COST + '\" style="float: right;">' + jsondata_[0].TOTAL_COST + '</h7></div>');
            }
            else {
                //    var lg = sessionStorage.getItem("Log");
                for (var i = 0; i < jsondata_.length; i++) {
                    GetProjects(jsondata_[i].PROJECT_ID, jsondata_[i].RESPONSIBLE_ID);
                    $('#disps').children('option:eq(0)').remove();
                    //   GetDispsByObjectid(undefined, jsondata_[i].OBJECT_ID)
                    $("#chkem").prop("checked", jsondata_[i].EMERGENCY_TREATMENT)
                    $('#opl').prop("checked", jsondata_[i].PAYMENT)
                    //var st = sessionStorage.getItem("st")
                    var st = urlParam('st')
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
                    var dspsId = $('#disps').children('option:eq(1)').val();
                    //getcurrdspObj(lg, jsondata_[i].OBJECT_ID);
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
                    //////console.log(jsonServices)
                    //var st = sessionStorage.getItem("st")
                    var st = urlParam('st')
                    var resp = jsondata_[i].RESPONSIBLE_ID
                    if (resp.length == 0) {
                        resp = "yes"
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

                    //  getCurrentDisp(lg)
                    gtCommenst("", R)
                    //  GetAccFortexnik(LogId, jsondata_[i].SPECIALIST_ID)
                    //GetAccFortexnik(LogId, jsondata_[i].SPECIALIS_ID)
                    GetPerFormers(jsondata_[i].SPECIALIS_ID, jsondata_[i].OBJECT_ID)
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
function GetSuppRequesByR(R) {
    var obj = { "GUID": R, 'path': window.location.pathname }
    $.ajax({
        type: "POST",
        url: '../Super_Disp/CreateDispRequest.aspx/usp_QUICK_API_GET_REQUEST',//'http://localhost:64339/Super_Disp/CreateDispRequest.aspx/usp_QUICK_API_GET_REQUEST', //window.location.protocol + '//' + window.location.host + '//WCFServices/MATORIN.QUICK_API.svc/Get_supplier_request',
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            //jsondata_ = jsondata_[0]
            console.log("jsondata_");
            $('#lblEm,#chkem').hide()
            //  delete jsondata_[2]
            console.log(jsondata_);
            //console.log("RequestDatas:");
            var Slog = sessionStorage.getItem("Log")
            var st = urlParam('st')
            $("#hedrZ").text('Заявка № ' + jsondata_[0].MOBILE_NUMBER + '   (Статус заявки "' + jsondata_[0].STATUS + '")').attr('mn', jsondata_[0].MOBILE_NUMBER)
            for (var i = 0; i < 1; i++) {//jsondata_.length
                var json_Project_guid_andId = JSON.parse(jsondata_[i].PROJECT_ID)
                GetProjects(Slog, json_Project_guid_andId[0].PROJECT_ID, jsondata_[i].RESPONSIBLE_ID);
                getObjectByProjectId(jsondata_[i].ADRESS, json_Project_guid_andId[0].PROJECT_ID)
                if (st != 4 && st != 5 && st != 3) {
                    GetAllServicesOfProject(json_Project_guid_andId[0].GUID,1)
                }
                $('#reqType').attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)')
                //GetDispsByObjectid(jsondata_[i].DISP_ID, jsondata_[i].ADRESS)

                // ////console.log(jsondata_[i].ACCOUNT_NAME)
                $("#chkem").prop("checked", jsondata_[i].EMERGENCY_TREATMENT)
                $('#opl').prop("checked", (jsondata_[i].PAYMENT != "0" && jsondata_[i].PAYMENT != "") ? true : false)//.attr('disabled','disabled')
                // $("#adr").val(jsondata_[i].ADRESS)
                $("#Ind").val(jsondata_[i].im_FIRST_NAME)
                $("#Phn").val(jsondata_[i].i_IND_PHONE_NUMBER)
                $("#Entrance").val(jsondata_[i].Entrance_Tex)
                $("#Floor").val(jsondata_[i].Floor_Tex)
                /* ,mms.Entrance_Tex
      ,mms.Floor_Tex*/
                //if (jsondata_[i].ADRESS.length != 0) {
                //    GetRelatedSets(jsondata_[i].SERVICE_GROUP_ID, jsondata_[i].ADRESS)
                //}
                var jsonServices = JSON.parse(jsondata_[i].ROOM_COUNT)
                //console.log("jsonServices")
                // console.log(jsonServices)
                var st = urlParam('st') //sessionStorage.getItem("st")
                if (jsonServices.length != 0) {
                    jsonServices[0]["RESPONSIBLE_ID"] = jsondata_[i].RESPONSIBLE_ID
                }
                GetKindOfRequest(1)
                getDirection_K(jsonServices, json_Project_guid_andId[0].GUID, jsondata_[i].RESPONSIBLE_ID, 1);

                $('#reqType').val(jsondata_[i].REQUEST_TYPE)
                getDate();
                getTime();


                gtTypeOfroom2(jsondata_[i].ROOM_T);

                if (jsondata_[i].INDIVIDUAL_ID == 0) {

                    //gtCommenst(R)//fuck
                    // gtCommenst(jsondata_[i].SERVICE_GROUP_ID, R)

                    $("#RComment").val("")//mustdo
                    //////console.log(rc[0].room)

                }
                else {
                    $('#Ind').val(jsondata_[i].FIRST_NAME).attr('itemid', jsondata_[i].INDIVIDUAL_ID)

                    getHasInds("M", jsondata_[i].INDIVIDUAL_ID)
                    getcurrdspObj(jsondata_[i].DISP_ID, jsondata_[i].ADRESS)//WAS LogId
                    //$("#hstComh").show();
                    //$("#hstCom").append('<h4> -- ' + jsondata_[i].REQUEST_COMMENT + '</h4>').show();
                    gtCommenst("", R)
                    $("#RComment").val("")
                    $('#Acnum').val(jsondata_[i].SERVICE_NAME);
                    //$('#Phn').val(jsondata_[i].TOTAL_COST);
                }
                var jsonWorkDatesAndFiles = JSON.parse(jsondata_[i].PLAN_END_DATE)
                // console.log(jsonWorkDatesAndFiles)

                DocumentsTenants(jsonWorkDatesAndFiles.FILES, jsondata_[i].FIRST_NAME)

                var date_ = jsonWorkDatesAndFiles.WORKDATE
                date_ = date_.substr(0, 10);
                var year = date_.substr(6, 10);

                var month = date_.substr(3, 2)
                var day = date_.substr(0, 2)
                date_ = year + "-" + month + "-" + day
                //$("#Room").val(jsondata_[i].ROOM_COUNT)
                $("#calen1").val(date_)
                $("#tm").val(jsonWorkDatesAndFiles.WORKBEGIN)
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
                //  GetAccFortexnik(jsondata_[i].LOG_IN_ID, jsondata_[i].SPECIALIST_ID)
                var isResponsibleProfile = window.location.pathname
                GetPerFormers(jsondata_[i].SPECIALIS_ID, jsondata_[i].ADRESS)
                //if (isResponsibleProfile != '/Responsible_Admin/CreateRequest.aspx') {


                //}
                //else {
                //var sps = JSON.parse(jsondata_[i].SPECIALISTS)
                //if (sps.length == 1) {
                //    if (sps[0].SPECIALIS_ID == jsondata_[i].SPECIALIS_ID && sps[0].SGUID == undefined) {
                //        GetPerFormers(jsondata_[i].SPECIALIS_ID, jsondata_[i].ADRESS)
                //    }
                //}
                //else {
                //    if (sps.length != 0) {
                //        GetPerFormers("", jsondata_[i].ADRESS)
                //    }
                //    else {
                //        GetPerFormers(jsondata_[i].SPECIALIS_ID, jsondata_[i].ADRESS)
                //    }

                //    for (var j = 0; j < sps.length; j++) {
                //        Add_Specialist(sps[j])
                //        $('#AddSpecialist').removeAttr('disabled')

                //    }
                //}

                //  }
                getResponsibels_(jsondata_[i].RESPONSIBLE_ID)
                //GetGroupOfServices(jsondata_[0].SERVICE_GROUP_ID, jsondata_[0].ADRESS)

            }
          
            $('#PrServiceH').after('<div class="totalh7"><h7 id="total" total-summ=\"' + jsondata_[0].TOTAL_COST + '\" style="float: right">' + jsondata_[0].TOTAL_COST + '</h7></div>');


        }

    })
}
function DocumentsTenants(files, AUTHOR) {
    console.log(files)
    var img_s = ""
    if (files.indexOf('prev') == -1) {
        img_s = files.split(',')
    }
    else {
        img_s = ParseForProff(files)
    }
    console.log(img_s)
    for (var i = 0; i < img_s.length; i++) {


        var F_ile = img_s[i]
        if (F_ile != "") {



            var extention = F_ile.substr(F_ile.lastIndexOf(".") + 1)
            if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
                $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '"  src="' + F_ile + '" style="width:71px" /></a>')
                $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>" + AUTHOR + " </h5> ")
            }
            if (extention == "docx" || extention == "doc") {
                $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/word.png" style="width:71px" /></a>')
                $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>" + AUTHOR + "    </h5> ")

            }
            if (extention == "xlsx" || extention == "xls") {
                $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png"style="width:71px" /></a>')
                $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>" + AUTHOR + "</h5> ")

            }
            if (extention == "pdf" || extention == "PDF") {
                $("#hstCom").append('<br><a href="' + F_ile + '" download=""> <img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png" style="width:71px" /></a>')
                $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>" + AUTHOR + "</h5> ")

            }
            if (extention == "txt" || extention == "TXT") {
                $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png"style="width:71px" /></a>')
                $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>" + AUTHOR + "</h5> ")

            }
        }

    }
    $("#hstCom").scrollTop(1000);
}
function GetAccFortexnik(objId, selected) {
    var obj = {
        objId: objId,

    };
    //alert(JSON.stringify(obj));

    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/GetTexniks",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            // ////console.log(result)

            var jsondata_ = JSON.parse(result.d)

            // ////console.log(jsondata_)
            $("#IspolList").empty();
            var SLogId = sessionStorage.getItem("Log")
            $("#IspolList").append('<option value="0"></option>')
            $("#IspolList").append('<option value="' + SLogId + '">' + $('#fiodsp').text() + ' </option>')
            for (var i = 0; i < jsondata_.length; i++) {

                if (jsondata_[i].RS == "3") {
                    $("#IspolList").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' </option>')
                    $("#ispol2").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' </option>')
                }
                //if (jsondata_[i].RS == "2") {
                //    $("#IspolList").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' (Инженер)</option>')
                //    $("#ispol2").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' (Инженер)</option>')
                //}
                if (jsondata_[i].RS == "6") {
                    $("#IspolList").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' (Техник)</option>')
                    $("#ispol2").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' (Техник)</option>')
                }

            }
            if (selected != "") {
                $("#IspolList").val(selected);
                // $("#ispol2").val(selected);
                $("#Ispolname").text($("#IspolList option:selected").text()).attr("itemid", $("#IspolList option:selected").val())
                $("#Ispolname").attr('email', $("#IspolList option:selected").attr('email'))
            }

        },

        error: function (r) {
            // //alert("Error");
            ////console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            alert("FAIL");
        }
    });

}
function getCommentFiles(r) {
    if ($.isNumeric(r)) {
        var objC = { "R": r }
        $.ajax({
            type: "POST",
            url: "../Super_Disp/CreateDispRequest.aspx/CommentFiles",
            data: JSON.stringify(objC),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d);
                if (jsondata_.length!=0) {
                if (jsondata_[0].COMMENT_FILE.indexOf('prev') != -1) {

                        var filesProff = ParseForProff(jsondata_[0].COMMENT_FILE)
                        jsondata_ = []
                        for (var k = 0; k < filesProff.length; k++) {
                            jsondata_.push({ "COMMENT_FILE": filesProff[k] })
                        }
                    }
                }
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
}
function gtCommenst(selectedSetId, Rid_) {

    var objC = { "rid": Rid_ }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/GetCommentsById",
        data: JSON.stringify(objC),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d);
            for (var i = 0; i < jsondata_.length; i++) {
                if (jsondata_[i].REQUEST_COMMENT.indexOf('|') > 0 || jsondata_[i].REQUEST_COMMENT.indexOf('|') == 0) {
                    var rc = jsondata_[i].REQUEST_COMMENT.substring(jsondata_[i].REQUEST_COMMENT.indexOf('|') + 1, jsondata_[i].REQUEST_COMMENT.length)
                    rc = JSON.parse(rc);
                    //////console.log(jsondata_)
                    $("#Room").val(rc[0].room)//indName
                    $("#Ind").val(rc[0].indName)
                    $("#Phn").val(rc[0].phon)
                    $('#Acnum').val(rc[0].score)//, "score": 

                    if (selectedSetId != "") {
                        GetRelatedSets(selectedSetId, rc[0].Object_Id)

                    }
                    //getcurrdspObj($('#disps').val(), rc[0].Object_Id)

                    $("#hstComh").show();

                    var date_ = jsondata_[i].COMMENT_DATETIME
                    var comment = jsondata_[i].REQUEST_COMMENT.substring(0, jsondata_[i].REQUEST_COMMENT.indexOf('|'));
                    if (comment != " " && comment != "") {
                        $("#hstCom").append('<h4 style="margin-bottom:  -6px;">' + jsondata_[i].AUTHOR + ' :  ' + comment + '</h4> (' + date_ + ')').show();
                    }

                    $("#hstCom").parent().show()//.css("height", "190px");

                }
                else {
                    if (jsondata_[i].H_COMMNET_FILE != "") {
                        var F_Url = jsondata_[i].H_COMMNET_FILE
                        var extention = F_Url.substr(F_Url.lastIndexOf(".") + 1)
                        if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
                            //="" ifrPopup("", F_Url)   
                            $("#hstCom").append('<br/><a href="' + F_Url + '" download ><img data-url="' + F_Url + '"  src="' + F_Url + '" style="width:71px" /></a>')
                            $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>" + jsondata_[i].AUTHOR + " : (" + jsondata_[i].COMMENT_DATETIME + ")  </h5> ")
                        }
                        if (extention == "docx" || extention == "doc") {//   onclick=ifrPopup(this)
                            $("#hstCom").append('<br/><a href="' + F_Url + '" download="" ><img data-url="' + F_Url + '" src="' + window.location.protocol + '//' + window.location.host + '/img/word.png"style="width:71px" /></a>')
                            $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>" + jsondata_[i].AUTHOR + " : (" + jsondata_[i].COMMENT_DATETIME + ")  </h5> ")

                        }
                        if (extention == "xlsx" || extention == "xls") {//   onclick=ifrPopup(this)
                            $("#hstCom").append('<br/><a ><img data-url="' + F_Url + '" src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png" style="width:71px" /></a>')
                            $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>" + jsondata_[i].AUTHOR + " : ( " + jsondata_[i].COMMENT_DATETIME + ")  </h5> ")

                        }
                        if (extention == "pdf" || extention == "PDF") {//href="' + F_Url + '" download=""
                            $("#hstCom").append('<br><a href="' + F_Url + '" download="" > <img data-url="' + F_Url + '" src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png"style="width:71px" /></a>')
                            $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>" + jsondata_[i].AUTHOR + " : (" + jsondata_[i].COMMENT_DATETIME + ")  </h5> ")

                        }
                        if (extention == "txt" || extention == "TXT") {//href="' + F_Url + '" download=""
                            $("#hstCom").append('<br/><a href="' + F_Url + '" download="" ><img data-url="' + F_Url + '" src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png" style="width:71px" /></a>')
                            $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>" + jsondata_[i].AUTHOR + " : ( " + jsondata_[i].COMMENT_DATETIME + ")  </h5> ")

                        }
                    }
                    $("#hstComh").show();

                    if (jsondata_[i].REQUEST_COMMENT != " " && jsondata_[i].REQUEST_COMMENT != "") {
                        var date_ = jsondata_[i].COMMENT_DATETIME
                        $("#hstCom").append('<h4 style="margin-bottom:  -6px;">' + jsondata_[i].AUTHOR + ' : ' + jsondata_[i].REQUEST_COMMENT + '<h4/> (' + date_ + ')').show();
                    }
                    $("#hstCom").parent().show()//.css("height", "130px");
                    $("#imgLink").attr("href", jsondata_[i].COMMENT_FILE)
                    $("#imgdwnl").attr("src", jsondata_[i].COMMENT_FILE)
                }
            }

            $("#hstCom").scrollTop(1000);
        }
    })
    getCommentFiles(Rid_);

}
function getcurrdspObj(lgId, slcted) {
    var obj = { "lg": lgId }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/GetObjcurrentdsp",
        data: JSON.stringify(obj),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // ////console.log(jsondata_)

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
//function SendId(RId, st) {
//    if (RId.indexOf('disp_') != -1) {
//        sessionStorage.setItem("st", st)
//        sessionStorage.setItem("RId", RId);
//        window.location.href = "CreateDispRequest.aspx"

//    }
//    else {
//        // alert("supplier")
//    }

//}
function SaveRequest(obj) {
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/SaveRequest",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //////console.log(data)
            var jsondata = $.parseJSON(data.d);
            var jsonReq = jsondata.RequestId;
            var SLog_id = sessionStorage.getItem("Log")
            SaveLog_S("Принять в работу", "Простое", "Диспетчер", "Диспетчеризация", "Заявка < " + jsondata.RequestId + " >принята в работу", SLog_id);
            var comes = sessionStorage.getItem("All");
            if (jsondata.result == "Ok") {

                //   window.location.href = "DispRequests.aspx"
                //parent.history.back();
                var loc = window.location.pathname
                var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
                window.location.href = back
            }
            if (jsondata.result == "Halfok") {
                alertMessage("!", "Заявка № " + jsondata.RequestId + " сохранена только в системе " + window.location.host + "  В мобильном приложении она будет недоступна.", ":(")
                window.onclick = function (event) {
                    //    window.location.href = "DispRequests.aspx"
                    //parent.history.back();

                    var loc = window.location.pathname
                    var back = (loc.indexOf('Responsible') != -1) ? 'Resp_Requests.aspx' : (loc.indexOf('Manager') != -1) ? 'RequestsManager.aspx' : (loc.indexOf('Disp_Admin') != -1) ? 'RegisterRequest.aspx' : (loc.indexOf('Super_Disp') != -1) ? 'DispRequests.aspx' : 'SRequests.aspx'
                    window.location.href = back
                }

            }

        }

    })
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
function readURLSuper(input, imgName) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {


            $('#fotoDisp0').attr('src', e.target.result);

            //var nameImg = imgName
            //var arrayBuffer = reader.result
            //var bytes = new Uint8Array(arrayBuffer);
            //var obj = { baseString: bytes, imgName: nameImg };
            var formData = new FormData();
            var file = document.getElementById("files").files[0];

            formData.append('file', file, encodeURI(file.name));
            formData.append('object_id', '1');
            //////console.log(formData);



            $.ajax({
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",//
                data: formData,
                type: 'POST',
                contentType: "multipart/form-data",
             processData: false,
                async: false,
                success: function (result) {

                    //alert("OK. See Console -  press F12");
                    // ////console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    //var jsondata_1 = jQuery.parseJSON(result)
                    //var jsondata_1 = JSON.stringify(result)
                    // var jsondata_1 = JSON.parse(result)
                    //  $("#files").hide();

                    var F_ile = result.URL
                    var extention = F_ile.substr(F_ile.indexOf(".") + 1)
                    var imgslenght = $("#imgss").find("img").length;
                    /* if (imgslenght == 5) {
                        $("#files,#file_btn").hide();

                    } else {
                        var src = (extention.toLowerCase() == 'jpg' || extention.toLowerCase() == 'png') ? result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") : window.location.protocol + '//' + window.location.host + '/' + 'img/' + extention.toLowerCase() + '.png'
                        $('#imgss').prepend('<div class="m-2" id="zImg"><img class="foto-disp" id="fotoDisp' + imgslenght + '" itemid=' + imgslenght + '  data-url="0"  src="' + src + '"><br><span style="font-size: 20px;">' + imgName + '</span></div>')
                        //$("#files").val("");
                    }
                     
                     */

                    if (imgslenght != 5) {
                        imgslenght++
                        //  var lastImgItem = $("#imgss").find("img:last").attr("itemid");
                        // lastImgItem++;
                        $(input).after('<div class="col-xs-2" id="zImg"><img class="foto-disp" id="fotoDisp' + imgslenght + '" itemid=' + imgslenght + '  data-url="0"  src=""></div>')//../Files/upl.png
                        $("#files").val("");
                    }
                    if (imgslenght == 5) {
                        $("#files,#file_btn").hide();

                    }
                    var F_ile = result.URL
                    var extention = F_ile.substr(F_ile.indexOf(".") + 1)
                    if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
                        $('#fotoDisp' + imgslenght + '').attr('src', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                        $('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                        $('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                    }
                    if (extention == "docx" || extention == "doc") {
                        $('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/word.png')
                        $('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                        $('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                        $('#fotoDisp' + imgslenght + '').after('<span style="font-size: 20px;">' + imgName + '</span>')
                    }
                    if (extention == "xlsx" || extention == "xls") {
                        $('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/excel.png')
                        $('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                        $('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                        $('#fotoDisp' + imgslenght + '').after('<span style="font-size: 20px;">' + imgName + '</span>')
                    }
                    if (extention == "pdf" || extention == "PDF") {
                        $('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/pedefe.png')
                        $('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                        $('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                        $('#fotoDisp' + imgslenght + '').after('<span style="font-size: 20px;">' + imgName + '</span>')
                    }
                    if (extention == "txt" || extention == "TXT") {
                        $('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/texete.png')
                        $('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                        $('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                        $('#fotoDisp' + imgslenght + '').after('<span style="font-size: 20px;">' + imgName + '</span>')
                    }

                    //$("#hdPr2").show()
                    //$("#zImg2").show()
                    //$("#files2").show()

                    $('.ui-loader-background,#loader').hide()

                },

                error: function (datas) {


                    ////console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

                    //var filePath = $('#files').val();
                    //var index = filePath.lastIndexOf("\\") + 1;
                    //var filename = filePath.substr(index);
                    //readURLSuper(input, filename)
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
function GetPerFormers(selected, obj) {
    var Obj = { "obj": obj }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/GetPerFormers",
        data: JSON.stringify(Obj),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            // ////console.log(result)
            $("#IspolList,#ispol2").select2('destroy')
            $("#IspolList").empty();
            var jsondata_ = JSON.parse(result.d)

            //  ////console.log(jsondata_)
            var SLogId = sessionStorage.getItem("Log")
            
            // var eml = urlParam('eml')
            $("#IspolList").append('<option  selected="true" value="0"> </option>')
            $("#ispol2").append('<option  value="0"></option>')
            var loc = window.location.pathname
            if (loc.indexOf('Responsible_Admin') == -1) {
                $("#IspolList").append('<option email=\"' + $('#fiodsp').attr('email') + '\" value="' + SLogId + '">' + $('#fiodsp').text() + ' </option>')
                $("#ispol2").append('<option  email=\"' + $('#fiodsp').attr('email') + '\" value="' + SLogId + '">' + $('#fiodsp').text() + ' </option>')
            }
            for (var i = 0; i < jsondata_.length; i++) {

                if (jsondata_[i].RS == "3") {
                    if (SLogId != jsondata_[i].LOG_IN_ID) {
                        $("#IspolList").append('<option email=\"' + jsondata_[i].E_MAIL + '\"  value="' + jsondata_[i].LOG_IN_ID + '" supp-guid=\"' + jsondata_[i].SUPP_GUID + '\">' + jsondata_[i].ACCOUNT_NAME + ' (Диспетчер)</option>')
                        $("#ispol2").append('<option email=\"' + jsondata_[i].E_MAIL + '\" value="' + jsondata_[i].LOG_IN_ID + '" supp-guid=\"' + jsondata_[i].SUPP_GUID + '\">' + jsondata_[i].ACCOUNT_NAME + ' </option>')
                    }
                }
                //if (jsondata_[i].RS == "2") {
                //    $("#IspolList").append('<option email=\"' + jsondata_[i].E_MAIL + '\" value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' (Инженер)</option>')
                //    $("#ispol2").append('<option email=\"' + jsondata_[i].E_MAIL + '\" value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' (Инженер)</option>')
                //}
                if (jsondata_[i].RS == "6") {
                    $("#IspolList").append('<option email=\"' + jsondata_[i].E_MAIL + '\" value="' + jsondata_[i].LOG_IN_ID + '"supp-guid=\"' + jsondata_[i].SUPP_GUID + '\">' + jsondata_[i].ACCOUNT_NAME + ' (Техник)</option>')
                    $("#ispol2").append('<option email=\"' + jsondata_[i].E_MAIL + '\" value="' + jsondata_[i].LOG_IN_ID + '" supp-guid=\"' + jsondata_[i].SUPP_GUID + '\">' + jsondata_[i].ACCOUNT_NAME + ' (Техник)</option>')
                }
                if (jsondata_[i].RS == "16") {
                    $("#IspolList").append('<option email=\"' + jsondata_[i].E_MAIL + '\" value="' + jsondata_[i].LOG_IN_ID + '"supp-guid=\"' + jsondata_[i].SUPP_GUID + '\">' + jsondata_[i].ACCOUNT_NAME + ' (Ответственный)</option>')
                    $("#ispol2").append('<option email=\"' + jsondata_[i].E_MAIL + '\" value="' + jsondata_[i].LOG_IN_ID + '"supp-guid=\"' + jsondata_[i].SUPP_GUID + '\">' + jsondata_[i].ACCOUNT_NAME + ' (Ответственный)</option>')
                }

            }
            if (selected != "") {

                $("#IspolList").val(selected);
                // $("#ispol2").val(selected);
                $("#Ispolname").text($("#IspolList option:selected").text()).attr("itemid", $("#IspolList option:selected").val())
                $("#Ispolname").attr('email', $("#IspolList option:selected").attr('email'))


            }
            if (selected == 0) {
                var role = sessionStorage.getItem("role")
                if (role != "15") {
                    $('#SaveDD').hide();
                }
            }
            $("#IspolList,#ispol2").select2()
        }
    })
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
function multiPlaying(e, Cost) {
    var totalC = 0
    //  var iUk = $(e).next('td').next('td').children('a').attr('isuk')
    if ($.isNumeric(Cost)) {
        if ($(e).val() != 0 && $(e).val().length != 0) {
            //Cost = Cost.substr(0, Cost.indexOf('.') + 1)

            Cost = parseFloat($(e).val().replace(',', '.')) * Cost
            Cost = Cost.toFixed(2)
            $(e).parent().next('td').next('td').children('a').text(Cost);

            //var totalCost = 0
            //$('#total').remove();
            //$("#PrServiceH tbody tr").each(function () {
            //    var cost = (isNaN($(this).children('td:eq(3)').text())) ? "0.00" : $(this).children('td:eq(3)').text();
            //    totalCost = parseFloat(totalCost) + parseFloat(cost)
            //    totalCost = (isNaN(totalCost)) ? "0.00" : totalCost
            //})
            // totalCost = parseFloat(totalCost)
            CalculatTotaleCost();
            //  $('#PrServiceH').after('<label id="total" style="float: right;">Итого: ' + totalCost.toFixed(2) + '  руб</label>')

        }
        else {
            $(e).parent().next('td').next('td').children('a').text(Cost);
            // $(e).val("1")
        }
    }
    else {
        var doqValue = $(e).parent().next('td').next('td').children('a').text();
        if (!$.isNumeric(doqValue)) {
            $(e).val('1')
        }
        else {
            if ($(e).val().length != 0) {
                Cost = doqValue
                Cost = parseFloat($(e).val().replace(',', '.')) * Cost
                Cost = Cost.toFixed(2)
                $(e).parent().next('td').next('td').children('a').text(Cost);
                CalculatTotaleCost();
            }
        }
    }




}
function RemoveDirectRow(e) {
    //$('#total').remove();
    //$('#PrServiceH').removeAttr('data-d')
    // var rid = urlParam('RId')

    ///  if (rid != null) {
    // if (rid.indexOf('disp_') != -1) {
  
    var trGrupGuid = $(e).attr('guid')
    $('.chkGrups[grup-guid="' + trGrupGuid + '"]').prop('checked', false);
    $('.chkServc[service-guid="' + trGrupGuid + '"]').prop('checked', false);
    //$('.grups').children('div').children('div').children('input:checkbox:checked').each(function () {
    //    var checkedGrupGuid = $(this).next('#grup').attr('grup-guid')
    //    if (trGrupGuid == checkedGrupGuid) {
    //        $(this).prop('checked', false);
    //    }

    //})
   
    //$('.subMenu').children('.mngTable tbody tr').children('td:eq(0) div input:checkbox:checked').each(function () {
    //    var checkedServiceGuid = $(this).attr('service-guid')
    //    if (trGrupGuid == checkedServiceGuid) {
    //        $(this).prop('checked', false);
    //    }
    //})
    //var guidsps = ($(e).parent().parent().attr('service-guid') != undefined) ? 'service-guid="' + $(e).parent().parent().attr('service-guid') + '"' : ($(e).parent().parent().attr('grup-guid') != undefined) ? 'grup-guid="' + $(e).parent().parent().attr('grup-guid') + '"' : 'guid="' + $('.selectdrc').attr('guid') + '"'
    // removeFromSps()
    $(e).parent().parent().remove();

    if ($('#PrServiceH tbody tr').length == 0) {
        $('#IspolList').children().show()
        $('#PrServiceH thead tr th:eq(3)').show();
        $('#PrServiceH thead tr th:eq(0)').text('Наименование направления')
        //$('#PrServiceH thead tr').each(function () {
        //    $(this).children('th:eq(1),th:eq(2)').hide();

        //})
        var text = $('.selectdrc').children('#drctName').children('label').text();
        var directGuid = $('.selectdrc').attr('direct-guid');
        $('#PrServiceH tbody').append('<tr><td >' + text + '</td><td>-</td><td>-</td><td class="CostTd"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-url="0" disabled="disabled"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')



    }
    CalculatTotaleCost();
    //  }

    // }


}
function removeFromSps(guid) {
    // $('.ServicesSps').children('option[' + guid + ']').remove();
    $('#AddSpecialist').removeAttr('disabled')
    $('.sps').remove();
    $('#lblispol,#IspolList').show();
    $('.hdrlbl').remove();
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
        $('#PrServiceH tbody').append('<tr><td data-s=' + $('#Sets').val() + '>' + $('#Sets').children(':selected').text() + '</td><td class="CostTd"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

    }
}
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
        $('#PrServiceH tbody').append('<tr><td data-s=' + $('#Sets').val() + '>' + $('#Sets').children(':selected').text() + '</td><td class="CostTd"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

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
        totalcost = parseFloat(totalcost)
        $('#total').remove();
        
        $('#PrServiceH').after('<div class="totalh7"><h7 id="total" total-summ=\"' + totalcost.toFixed(2) + '\" style="float: right">Итого: ' + totalcost.toFixed(2) + ' руб</label></div>');
    })
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
    dqCost = (dqCost.length == 0) ? 'Договорная' : dqCost
    $(e).parent().parent('td').find('a').text(dqCost);
    //$(e).closest('#').attr('onkeyup', 'multiPlaying(this,"' + dqCost + '")')

    $(e).parent('#changeCost').hide(1000);
    CalculatTotaleCost();
}
function Give_Selected_Set_Direct_Service_For_Search(objid) {
    var Obj = { "objid": objid }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/Give_Selected_Set_Direct_Service_For_Search",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jdata = JSON.parse(data.d)
            // jdata = JSON.stringify(jdata)
            //  ////console.log(jdata);
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
            var doqi = (cost == 'Договорная') ? '<a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div>' : '<a>' + cost + '</a>'
            var edizm = $(e).attr('data-edizm');
            $('#PrServiceH').show();
            var kolDis = (cost == 'Договорная') ? 'disabled="disabled"' : '';
            //$('#listServiceH').show()
            if (dtUrl == 1) {
                //onkeyup="multiPlaying(this,500)" <td><input type="text" onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" value="1"></td>
                $("#PrServiceH tbody").append('<tr data-d=' + d + '><td itemid="' + itemId + '"> ' + dataName + '</td><td><input type="text" ' + kolDis + '  onkeyup=multiPlaying(this,"' + cost + '")  onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57 || event.charCode == 44" class="quantity" value="1"></td><td>' + edizm + '</td><td  class="CostTd">' + doqi + '</td><td><a itemid="' + itemId + '" data="' + dataName + '" onclick="RemoveRow(this)" data-url="' + dtUrl + '" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</a></td></tr>')
            }
            if (dtUrl == 0) {
                /*<tr><td style="width: 500px;" itemid="11">Доступ - Одноразовый пропуск</td><td><input disabled="disabled" type="text" value=""></td><td><button onclick="RemoveRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</button></td></tr>*/
                //<td  ><input disabled="disabled" type="text" value=""></td>
                $("#PrServiceH tbody").append('*<tr data-d=' + d + '><td   itemid="' + itemId + '"> ' + dataName + '</td><td><input disabled="disabled" type="text" value=""></td><td>' + edizm + '</td><td class="CostTd"><a onclick=Open_Pop(this) >' + cost + '</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-url="' + dtUrl + '" onclick="RemoveRow(this)" itemid="' + itemId + '" data="' + dataName + '"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</a></td></tr>')

            }
            $('#left,#right').children('div').each(function () {

                $(this).children('input[type="checkbox"]').prop('checked', false)

            })

            $('#PrServiceH').removeAttr('data-d');
            $('#PrServiceH').removeAttr('data-s')
            $('#PrServiceH thead tr th:eq(0)').text('Наименование услуг')
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
                    c = isNaN(c) ? "0.00" : c
                    totalCost = totalCost + parseFloat(c);
                }
            })
            $('#total').remove();
            totalCost = parseFloat(totalCost)
                
            $('#PrServiceH').after('<div class="totalh7" > <h7 id="total" total-summ=\"' + totalCost.toFixed(2) + '\" style="float: right;">Итого: ' + totalCost.toFixed(2) + '  руб</h7></div>')
            //if (totalCost == 0) {
            //    $('#total').hide();
            //}
            //else {
            //    $('#total').show();
            //}
            $(e).parent().parent().prev().children('input[type="checkbox"]').prop('checked', true)
        }
        else {
            var itemId = $(e).attr("itemid");
            $('#PrServiceH tr').children('td[itemid=' + itemId + ']').parent().remove();
            for (var i = 0; i < $('#PrServiceH tbody tr').length; i++) {
                var c = $('#PrServiceH tbody tr:eq(' + i + ') td:eq(3) a').text();
                if (c != 'Договорная') {
                    c = isNaN(c) ? "0.00" : c
                    totalCost = totalCost + parseFloat(c);
                }
            }
            $('#total').remove();
            totalCost = parseFloat(totalCost)
                
            $('#PrServiceH').after('<div class="totalh7" > <h7 id="total" total-summ=\"' + totalCost.toFixed(2) + '\" style="float: right;">Итого: ' + totalCost.toFixed(2) + '  руб</h7></div >')
            //if (totalCost == 0) {
            //    $('#total').hide();
            //}
            //else {
            //    $('#total').show();
            //}
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
            $('#PrServiceH tbody').append('<tr><td data-s=' + $('#Sets').val() + '>' + $('#Sets').children(':selected').text() + '</td><td class="CostTd"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

        }
    }
    else {
        $(e).prop('checked', false)
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
            //$('#PrServiceH thead tr th:eq(0)').text('Наименование группа услуг')
            //$('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2)').hide()
            //if ($('#PrServiceH tbody tr').length != 0) {
            //    $('#PrServiceH tbody tr').each(function ()
            //    {
            //        $(this).children('td:last').children('.btn').click();
            //    })
            //    }
            $('#PrServiceH tbody tr').each(function () {
                $(this).children('td:eq(1),td:eq(2)').hide();
            })
            $('#PrServiceH tbody').append('<tr><td data-d=' + dataD + '>' + DName + '</td><td>-</td><td>-<td><td class="CostTd"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-d=' + dataD + ' onclick="RemoveDirectRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
            $('#left,#right').children('div').each(function () {

                $(this).children('input[type="checkbox"]').prop('checked', false)

            })

            $('#subMenu').remove();

            $(e).prop('checked', true)

        }
        else {
            $('#PrServiceH tbody').empty();
            $('#PrServiceH').hide().removeAttr('data-d');
            $('#PrServiceH thead tr th:eq(0)').text('Наименование услуг')
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
            $('#PrServiceH thead tr th:eq(0)').text('Наименование услуг')
            $('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2),#PrServiceH thead tr th:eq(3)').show()
            $('#PrServiceH tbody tr').each(function () {
                $(this).children('td:eq(1),td:eq(2),td:eq(3)').show();
            })
        }
        else {
            var oldGrup = $('#PrServiceH tbody tr:eq(0) td:eq(0)').text();
            var newGrup = $(e).parent().text()
            if (oldGrup != '-') {
                var resultZ = confirm('Вы действительно хотите изменить группу услуг с "' + oldGrup + '" на "' + newGrup + '"?');
            }
            else {
                resultZ = true
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
                    $('#PrServiceH tbody').append('<tr><td data-d=' + dataD + '>' + DName + '</td><td class="CostTd"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-d=' + dataD + ' onclick="RemoveDirectRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
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
        $('#PrServiceH tbody').append('<tr><td data-s=' + $('#Sets').val() + '>' + $('#Sets').children(':selected').text() + '</td><td>-</td><td>-<td><td class="CostTd"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

    }
    $('#total').remove();
    var totalCost = 0
    $("#PrServiceH tbody tr").each(function () {
        var cost = (isNaN($(this).children('td:eq(3)').text())) ? "0.00" : $(this).children('td:eq(3)').text();
        totalCost = parseFloat(totalCost) + parseFloat(cost)
        totalCost = (isNaN(totalCost)) ? "0.00" : totalCost
    })
    totalCost = parseFloat(totalCost)
         
    $('#PrServiceH').after('< div class="totalh7" > <h7 id="total" total-summ=\"' + totalCost.toFixed(2) + '\" style="float: right;">Итого: ' + totalCost.toFixed(2) + '  руб</h7></div>')


}
function GetProductN(e, obj, gs) {
    var obj = { o: obj, g: gs }
    $.ajax({
        url: "../Super_Disp/CreateDispRequest.aspx/GetProductServices",
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
                    $(e).next('#subMenu').append('<div itemid="' + jsondata[i].SERVICE_ID + '"    class="col-md-12" style="margin-top:0px"><input type="checkbox" onclick="MakeCheckCheckBox(this,' + gs + ')" class="col-md-1" data-edizm="' + jsondata[i].UNIT_OF_MEASURE_NAME + '" name="services1" value="' + jsondata[i].SERVICE_NAME + '" data-url="1" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left: -20px;margin-top: 8px;"><label   style="float:right;width:10%" itemid="' + jsondata[i].SERVICE_ID + '">' + jsondata[i].COST + '</label><label   style="margin-left: 20px !important; width:70%" itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_NAME + '</label></div><br/>')


                }
                else {//data="' + jsondata[i].SERVICE_TYPE_NAME + '-' + jsondata[i].SERVICE_NAME + '"
                    $(e).next('#subMenu').append('<div itemid="' + jsondata[i].SERVICE_ID + '"   class="col-md-12" style="margin-top:0px"><input type="checkbox" onclick="MakeCheckCheckBox(this,' + gs + ')"  class="col-md-1" data-edizm="' + jsondata[i].UNIT_OF_MEASURE_NAME + '" name="services1" value="' + jsondata[i].SERVICE_NAME + '"  data-url="0" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left: -20px;margin-top: 8px;"><label  style="float:right;width:10%" itemid="' + jsondata[i].SERVICE_ID + '">' + jsondata[i].COST + '</label><label   style="margin-left: 20px !important; width:70%" itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_NAME + '</label></div><br/>')
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

                        if (serviceid == findedid) {
                            $(this).children('input[type="checkbox"]').click();
                        }
                    }


                })

            }
            sessionStorage.removeItem("finded")
        }
    })
}
function getDateForCheck() {
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
    return maxDate;
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
            $('#PrServiceH tbody').append('<tr><td data-s=' + $('#Sets').val() + '>' + $('#Sets').children(':selected').text() + '</td><td class="CostTd"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')

        }
    }
    $('#total').remove();
    var totalCost = 0
    $("#PrServiceH tbody tr").each(function () {
        var cost = (isNaN($(this).children('td:eq(3)').text())) ? "0.00" : $(this).children('td:eq(3)').text();
        totalCost = parseFloat(totalCost) + parseFloat(cost)
        totalCost = (isNaN(totalCost)) ? "0.00" : totalCost
    })
    totalCost = parseFloat(totalCost)
        
    $('#PrServiceH').after('< div class="totalh7" > <h7 id="total" total-summ=\"' + totalCost.toFixed(2) + '\" style="float: right;">Итого: ' + totalCost.toFixed(2) + '  руб</h7></div>')



}
function getResponsibels_(s) {
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/GetResponsibels_",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          //  $('#Otven').select2('destroy')
            var j = JSON.parse(data.d);
            $('#Otven').empty();
            $('#Otven').append('<option value="0" email="no@mail.com"></option>');
            for (var i = 0; i < j.length; i++) {
                var has = false
                if ($('#Otven option').length != 0) {
                    $('#Otven option').each(function () {
                        var login = $(this).attr('value')
                        if (login != j[i].LOG_IN_ID) {
                            has = true;

                        }
                    })

                }
                else {
                    $('#Otven').append('<option email=\"' + j[i].E_MAIL + '\" value=' + j[i].LOG_IN_ID + '>' + j[i].ACCOUNT_NAME + '</option>');
                }
                if (has == true) {
                    $('#Otven').append('<option email=\"' + j[i].E_MAIL + '\" value=' + j[i].LOG_IN_ID + '>' + j[i].ACCOUNT_NAME + '</option>');
                }

            }
            var loc_ = window.location.pathname

            if (loc_ == '/Responsible_Admin/CreateRequest.aspx') {
                var SLogId = sessionStorage.getItem("Log")
                $('#Otven').val(SLogId)//.attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)')
            }
            if (s != undefined && s != "") {
                $('#Otven').val(s)
            }
            $('#Otven').select2();
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
            url: "../Super_Disp/CreateDispRequest.aspx/GetExistSeriveDirect",
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
                var rid = urlParam('RId')//sessionStorage.getItem("RId")
                var showAllLength = $('#showAll').length
                //var st = sessionStorage.getItem("st");
                var st = urlParam('st')
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
                        var issearch2 = $(e).attr('data-search')
                        if (issearch2 == undefined) {
                            $('.accMenu').hide();
                            $('.accMenu[data-d="' + selected + '"]').show();
                            $('.accMenu[data-d="' + selected + '"]').parent().append('<input type="button" onclick="showAllServices()" class="btn genBtn" value="Изменить Группу Услуг"/>')
                            $('.accMenu[data-d="' + selected + '"]').children('input[type="checkbox"]').prop('checked', true);
                        }
                        if (issearch2 == "Set") {
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
                    if (st == 4 || st == 5 || st == 3) {
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

        $('#PrServiceH tbody').append('<tr><td data-s=' + $(e).val() + '>' + $(e).children(':selected').text() + '</td><td class="CostTd"><a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" class="changeCost"><input type="number" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" class="h48 btn btn1 flexCenter doqClose"><input type="button" onclick="MakeCost(this)" value="OK" class="h48 btn btn1 flexCenter doqOk"></div></td><td><a data-url="0" onclick="RemoveSetRow(this)"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>Удалить</a></td></tr>')
    }
    else {
        $(e).next().remove();
        $('#PrServiceH').hide().removeAttr('data-d');
        $('#PrServiceH').hide().removeAttr('data-s');
        $('#PrServiceH thead tr th:eq(0)').text('Наименование услуг')
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
    totalCost = parseFloat(totalCost)
      
    $('#PrServiceH').after('<div class="totalh7" > <h7 id="total" total-summ=\"' + totalCost.toFixed(2) + '\" style="float: right;">Итого: ' + totalCost.toFixed(2) + '  руб</h7></div>')


}
function GetRelatedSets(selected, Obj, resp) {
    var o = { "obj": Obj }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/GetRelatedSets",
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
function MaskPhone(e) {
    $(e).inputmask("+7(999) 999-99-99");
}
function getHasInds2(scr) {
    var obj = { "score": scr }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/gethasInd2",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata = JSON.parse(data.d);
            $('#IndList').empty();

            if (jsondata.length != 1) {
                $("#Ind").val("").next('label').attr('class', 'transp backLab')
                $("#Phn").val("").next('label').attr('class', 'transp backLab')
                //$("#Ind").val(jsondata[0].FIRST_NAME).attr("itemid", jsondata[0].INDIVIDUAL_ID)
                //$("#Phn").val(jsondata[0].PHONE)
                //$("#Room").val(jsondata[0].ROOM_NUMBER)
                // $("#Room_Type").val(jsondata[0].ROOM_TYPE_ID)
                for (var i = 0; i < jsondata.length; i++) {
                    $("#IndList").append('<label data-number="' + jsondata[i].PHONE + '" itemid="' + jsondata[i].INDIVIDUAL_ID + '" style="color: black;position:  relative;left: 1%;" onclick="selectInd(this)">' + jsondata[i].FIRST_NAME + ' </label>').show();
                }

                //  getcurrdspObj(SLogId, jsondata[0].OBJECT_ID);
            }
            else {
                $('#IndList').empty().hide();
                $("#Ind").empty().val(jsondata[0].FIRST_NAME).attr("itemid", jsondata[0].INDIVIDUAL_ID).next().next('label').attr('class', 'transp backLab')
                $("#Phn").empty().val(jsondata[0].PHONE).next('label').attr('class', 'transp backLab')
            }


        }
    })
}
function getInddata(sObj, rm, r_t) {
    var obj = { "rm": rm, "obj": sObj, "RoomT": r_t }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/getInddata",
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
                $('#Floor').val(jsondata[0].FLOOR).next('label').attr('class','transp backLab')
                $('#Entrance').val(jsondata[0].ENTRANCE).next('label').attr('class', 'transp backLab')
                if (jsondata.length != 1) {
                    for (var i = 0; i < jsondata.length; i++) {
                        $("#AcnumList").append('<label style="color: black;position:  relative;left: 1%;" onclick=selectAcc(this)>' + jsondata[i].NUMBER + ' </label>').show();
                    }
                    $("#AcnumList").show('1000')

                }
                else {
                    $("#Acnum").val(jsondata[0].NUMBER).next('label').attr('class', 'transp backLab')
                    $("#AcnumList").hide();
                    getHasInds2(jsondata[0].NUMBER)
                }

            }


        }
    })

}

function GetDatasByAccNum(nmbr) {
    var obj = { "nmbr": nmbr }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/GetDatasByAccNum",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            if (jsondata_.length == 1) {
                $('#IndList').empty().hide();
                $("#objctZ").val(jsondata_[0].OBJECT_ID);
                $("#Room_Type").val(jsondata_[0].ROOM_TYPE_ID);
                $("#Room").val(jsondata_[0].ROOM_NUMBER);
                $("#Ind").val(jsondata_[0].FIRST_NAME).attr('itemid', jsondata_[0].INDIVIDUAL_ID);;
                $("#Phn").val(jsondata_[0].PHONE);
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
function gtTypeOfroom2(selected) {

    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/getRoomTypes",

        contentType: "application/json; charset=utf-8",

        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // ////console.log(jsondata_)

            for (var i = 0; i < jsondata_.length; i++) {
                $("#Room_Type").append('<option value="' + jsondata_[i].ROOM_TYPE_ID + '">' + jsondata_[i].ROOM_TYPE + '</option>')

            }
            if (selected != "") {
                $("#Room_Type").val(selected);
            }



        }

    })
}
function GetDispsByObjectid(selected, obj) {
    var obj2 = { "obj": obj }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/GetDispsByObjectid",
        data: JSON.stringify(obj2),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d)
            $('#disps').children('option:not(:first)').remove();
            for (var i = 0; i < j.length; i++) {
                $('#disps').append('<option value=' + j[i].LOG_IN_ID + '>' + j[i].ACCOUNT_NAME + '</option>')
            }

            if (selected != "" && selected != undefined) {
                $('#disps').val(selected)
            }
            if (selected == undefined) {
                getcurrdspObj(j[0].LOG_IN_ID, obj);
            }

        }
    })

}
function getObjectByProjectId(selected, prj) {

    var obj2 = { "prj": prj }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/getObjectByProjectId",
        data: JSON.stringify(obj2),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d)
            $('#objctZ').children('option:not(:first)').remove();
            for (var i = 0; i < j.length; i++) {
                $('#objctZ').append('<option value=' + j[i].OBJECT_ID + '>' + j[i].OBJECT_ADRESS + '</option>')
            }

            if (selected != "") {
                $('#objctZ').val(selected)
            }

        }
    })
}
function ParseForProff(files) {
    var img_s = ""
    if (files.indexOf('|') != -1) {
        img_s = files.split('|')
        for (var k = 0; k < img_s.length; k++) {
            var img_child = img_s[k].split(';')
            img_child = img_child.splice(!img_child.indexOf('prev'), 1)
            img_s[k] = img_child[0]
        }
    }
    else {
        img_s = files.split('|')
        for (var k = 0; k < img_s.length; k++) {
            var img_child = img_s[k].split(';')
            img_child = img_child.splice(!img_child.indexOf('prev'), 1)
            img_s[k] = img_child[0]
        }
    }
    return img_s;
}
function SearchServsForJsTree(e) {
    var value = $(e).val()
    $('#NewServs').jstree(true).search(value);
}
function GetKindOfRequest(selected) {

    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/GetKindOfRequest",

        contentType: "application/json; charset=utf-8",

        success: function (data) {
            var jsondata_ = JSON.parse(data.d);
            for (var i = 0; i < jsondata_.length; i++) {

                $('#RequestKind').append('<option value=' + jsondata_[i].BaseDirectionGroupId + ' guid=' + jsondata_[i].WORK_KIND_GUID + '>' + jsondata_[i].BaseDirectionGroupTitle + '</option>')
                //if (selected == "") {
                //    $('#RequestKind').append('<option value=' + jsondata_[i].BaseDirectionGroupId + ' guid=' + jsondata_[i].WORK_KIND_GUID + '>' + jsondata_[i].BaseDirectionGroupTitle + '</option>')
                //}
                //else {
                //    var R_id = urlParam('RId')
                //    R_id = R_id.replace("disp_", "");
                //    if ($.isNumeric(R_id))
                //    {
                //        if (jsondata_[i].WORK_KIND_GUID !='DFA3A95F-A678-4B56-B5F5-23F73B7BFEE1') {
                //            $('#RequestKind').append('<option value=' + jsondata_[i].BaseDirectionGroupId + ' guid=' + jsondata_[i].WORK_KIND_GUID + '>' + jsondata_[i].BaseDirectionGroupTitle + '</option>')
                //        }

                //    }
                //    else {
                //        if (jsondata_[i].WORK_KIND_GUID == 'DFA3A95F-A678-4B56-B5F5-23F73B7BFEE1') {
                //            $('#RequestKind').append('<option value=' + jsondata_[i].BaseDirectionGroupId + ' guid=' + jsondata_[i].WORK_KIND_GUID + '>' + jsondata_[i].BaseDirectionGroupTitle + '</option>')
                //        } 
                //    }

                //}
            }
            if (selected != "") {
                $('#RequestKind').val(selected)
                if (selected == 1) {
                    $('#RequestKind').children('option[value!="' + selected + '"]').remove();
                }
                else {
                    $('#RequestKind').children('option[value="1"]').remove();
                }
            }
        }
    })

}
function GetProjects(lg, selected, resp) {
    var obj2 = { "lg": lg, 'path': window.location.pathname }
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/GetProjects",
        data: JSON.stringify(obj2),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#prjcts').not(':first').empty();

            var jsondata_ = JSON.parse(data.d);
            for (var i = 0; i < jsondata_.length; i++) {
                $('#prjcts').append('<option value=' + jsondata_[i].PROJECT_ID + ' guid=' + jsondata_[i].GUID + '>' + jsondata_[i].PROJECT_NAME + '</option>')
            }
            if (selected != "") {
                $('#prjcts').val(selected)
            }
            if (lg == resp) {
                $('#prjcts option:not(:first):not(:selected)').remove();
            }
        }
    })

}
function SignOutIdendity()
{
    var obj2 = { "lg": ""}
    $.ajax({
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/SignOutIdendity",
      //  data: JSON.stringify(obj2),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

        }
    })

}
function selectAcc(e) {
    $("#AcnumList label").css("background-color", "").css("color", "black");
    $(e).css("background-color", "#23527c").css("color", "white");
    $("#Acnum").empty().val($(e).text())
    getHasInds2($(e).text())
}




