$(function () {
    //function SaveLog(EVENT_TYPE, EVENT_STATUS, EVENT_ROLE, EVENT_MODULE, EVENT_MESSAGE, EVENT_MAKER) {
    //    var obj = {
    //        EVENT_TYPE: EVENT_TYPE,
    //        EVENT_STATUS: EVENT_STATUS,
    //        EVENT_ROLE: EVENT_ROLE,
    //        EVENT_MODULE: EVENT_MODULE,
    //        EVENT_MESSAGE: EVENT_MESSAGE,
    //        EVENT_MAKER: EVENT_MAKER
    //    };
    //    $.ajax({error: function (e) {$('.ui-loader-background').hide();$('#loader').hide();alert(e.responseJSON.Message)},
    //        type: "POST",
    //        url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/InsertLog",
    //        data: JSON.stringify(obj),
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function(result) {
    //            //console.log(JSON.stringify(result));
    //        },
    //        error: function(r) {
    //            //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
    //        },
    //        failure: function(r) {
    //            //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
    //        }
    //    });
    //    return;
    //}
    var Log = sessionStorage.getItem("Log");
    var searchParams = new URLSearchParams(window.location.search)
    var eml = searchParams.get('eml')
    var ClId = sessionStorage.getItem("Clien_ID")
    if (eml == null) {
        if (Log == null) {
            window.location.href = "../ClientLogin.aspx";
        }
    }
    else {
        var obj = { "eml": eml }
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
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
                    Log = jsondata_[0].LOGIN_ID
                    ClId = jsondata_[0].CLIENT_ID
                    sessionStorage.setItem("Clien_ID", jsondata_[0].CLIENT_ID)
                    sessionStorage.setItem("Log", Log)
                    sessionStorage.setItem("role", jsondata_[0].ROLE_)
                    sessionStorage.setItem("REQUEST_ID", jsondata_[0].REQUEST_ID)
                    sessionStorage.setItem("REQUEST_STATUS", jsondata_[0].REQUEST_STATUS)
                }

            }
        })
    }
    $("#Out").click(function () {
        sessionStorage.clear();
        window.location.href = "../ClientLogin.aspx";
    })
    $("#idk").text("Логин: Login_" + Log + "");
    var oobj3 = { lg: Log }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "../Super_Disp/CreateDispRequest.aspx/GetDispName",
        data: JSON.stringify(oobj3),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var jsondata_2 = JSON.parse(result.d)
            $("#fiodsp").text(jsondata_2[0].ACCOUNT_NAME).attr('email', jsondata_2[0].E_MAIL)
            $("#fiodsp").parent().prev('span').attr('style', 'background: #eaeaea url("' + jsondata_2[0].ICON + '") center center; background-size: cover;')
        }
    })
    getlog2(Log, "Manager");

    $("#serchUpro").keyup(function () {
        var val = $(this).val();
        if (val.length != 0) {
            SearchLog(Log, $(this).val(), ClId)
        }
        else {
            $("#lgs").empty();
            getlog2(Log, "Manager");
        }

    })
    $('#UplPayment').click(function () {
        var oval = $('#objsM').val();
        if (oval != 0) {
            $('#ModalBNP').show();
            //   SavePaymentsFromExcel("709", "ПУ_Счетчики_Королева_Королева_13.07_Last.xlsx", 358)
            //  SavePaymentsMass("dd9e5b8b-2e32-44ba-9453-cd2f6cdd6f39.xlsx", 358)
        }
        else {
            $('#objsM').after('<label id="objsM_E" style="color:red">Необходимо выбрать объект</label>')
        }

        //$('#ObjBnp').append($('#objsM >option').clone())
        //Приложение 13. Форма загрузки начислений и платежей.xlsx
        //SavePaymentsFromExcel('Форма загрузки начислений и платежей.xlsx')
    })
    $('#UplKvart').click(function () {

        var oval = $('#objsM').val();
        if (oval != 0) {
            $('#ModalKVART').show();
            //SavePaymentsFromExcel("526", "35828392-af77-4e15-a2ce-ef078b9441ca.xlsx", 326)
            // SavePaymentsMass("731fddb9-0b70-41b8-8354-ad908de356bf.xlsx",326)
        }
        else {
            $('#objsM').after('<label id="objsM_E" style="color:red">Необходимо выбрать объект</label>')
        }
    })
    $('#toShablon').click(function () {
        $('#ModalKVART').hide();
        $('#ModalBNP').show();
    })
    $('#objsM').change(function () {

        if ($(this).val() != 0) {
            $('#objsM_E').remove();


        }


    })
    $('#closekvart').click(function () {
        $('#ModalKVART').hide();
    })
    $('#closebnp').click(function () {

        $('#ModalBNP').hide();
        $('#fileBnP').val('');
        $('#loadPmnt1').hide().removeAttr('onclick')
        $('#Successlbl,#Errorlbl').text('');
        $('#errDiv').remove();
        $('#loadPmn_t_Error').hide();
    });


    $('#AddServices').click(function () {
        if ($('#objsM').val() != 0) {
            GetGroupOfServices($('#objsM').val())
            $('#myModalSs').show();
        }
        else {
            $('#objsM').after('<label id="objsM_E" style="color:red">Необходимо выбрать объект</label>')
        }
    })
    $('.closeSs').click(function () {
        $('.modal-bodySs').empty();
        $('#myModalSs').hide();
    })
    $('#AddSs').click(function () {
        var successProd = true
        if (successProd == true) {
            if ($('#GroupSHas').length == 0) {
                successProd = false
                $('#errPrdS').remove()
                $('.modal-bodySs').prepend('<label id="errPrdS" style="color:red">Необходимо выбрать группа услуг<label>')
                window.setTimeout(function () {
                    $('#errPrdS').remove();
                }, 3000)
            }
            if ($('#GroupSHas').is(':empty')) {
                successProd = false
                $('#errPrdS').remove()
                $('.modal-bodySs').prepend('<label id="errPrdS" style="color:red">Необходимо выбрать группа услуг<label>')
                window.setTimeout(function () {
                    $('#errPrdS').remove();
                }, 3000)
            }
        }
        if (successProd == true) {
            if ($('#ServiceHasCost').length == 0) {
                successProd = false
                $('#errPrdS').remove()
                $('.modal-bodySs').prepend('<label id="errPrdS" style="color:red">Необходимо выбрать услугу<label>')
                window.setTimeout(function () {
                    $('#errPrdS').remove();
                }, 3000)
            }
            if ($('#ServiceHasCost').is(':empty')) {
                successProd = false
                $('#errPrdS').remove()
                $('.modal-bodySs').prepend('<label id="errPrdS" style="color:red">Необходимо выбрать  услугу<label>')
                window.setTimeout(function () {
                    $('#errPrdS').remove();
                }, 3000)
            }
        }
        if (successProd == true) {
            $('#ServiceHasCost').children('.col-md-12').each(function () {
                var nmbrVal = $(this).children('#nmbr').val().trim();
                var propchk = $(this).children('#chk').prop('checked');
                if (nmbrVal.length == 0 && propchk == false) {
                    successProd = false
                    $('#errPrdS,#errPrdS2').remove()

                    $(this).children('#chk').after('<label id="errPrdS" style="color:red">Пожалуйста, введите стоимость или выберите признак "Договорная"<label>')
                    $('.modal-bodySs .col-md-4:eq(2)').prepend('<label id="errPrdS2" style="color:red">Пожалуйста, введите стоимость или выберите признак "Договорная"<label>')
                    window.setTimeout(function () {
                        $('#errPrdS,#errPrdS2').remove();
                    }, 3000)
                }
            })
        }
        if (successProd == true) {
            var prss = []
            $('#ServiceHasCost').children('.col-md-12').each(function () {
                var nmbrVal = $(this).children('#nmbr').val().trim();
                var propchk = ($(this).children('#chk').prop('checked') == false) ? nmbrVal : "Договорная";
                var productId = $(this).children('#chk').attr('itemid');
                prss.push({ "PRODUCT_SERVICE_ID": productId, "COST": propchk })
            })
            var Object_id = $('#objsM').val();
            SaveProductToProject(Object_id, prss)
        }
    })

    function SaveProductToProject(o, prodPrj) {
        var obj = { "objId": o, 'prss': prodPrj }
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Apartments.aspx/AddProductServiceToProject",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                $('.closeSs').click();
            }
        })
    }

    function GetGroupOfServices(objId) {
        //$('.modal-bodySs .col-md-12').append('<div class="col-md-4"><label>Группа услуг</label><div id="GroupS" class="GroupS1"></div></div>');
        $('.modal-bodySs').append('<div class="col-md-12"> <h4 style="margin-left: 45%;">Cуществующие услуги</h4><div class="col-md-4"><label>Группа услуг</label><div id="GroupSHas" class="GroupS1"></div></div></div>')
        getHasDirectServices(objId);
        $('.modal-bodySs').append('<div class="col-md-12" style="margin-top: 35px;"><h4 style="margin-left: 45%;">Выбрать новую услугу</h4><div class="col-md-4"><label>Группа услуг</label><div id="GroupS" class="GroupS1"></div></div></div>')
        GetAlltDirectServices(objId)
        //$.ajax({error: function (e) {$('.ui-loader-background').hide();$('#loader').hide();alert(e.responseJSON.Message)},
        //    type: "POST",
        //    url: "../Disp_Admin/CreateRequest.aspx/GetGroupOfServices",
        //    contentType: "application/json; charset=utf-8",
        //    success: function (data) {
        //        var j = JSON.parse(data.d)
        //        for (var i = 0; i < j.length; i++) {
        //            $('#GroupS').append('<div class="margTop0"><input type="checkbox" class="col-md-1" onclick=MakeCheckGrupS(' + j[i].INDIVIDUAL_ID + ',this)><label itemid="144" class="checkBx">' + j[i].LAST_NAME+'</label></div>')
        //        }
        //    }
        //})
    }

    function GetAlltDirectServices(objId) {
        var o = { "Obj": objId }
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Apartments.aspx/GetAlltDirectServices",
            data: JSON.stringify(o),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var j = JSON.parse(data.d)
                $('#GroupS').append('<input type="button" value="Добавить Группа услуг" data-active="on" onclick="AddGroupS(this)" class="btn genBtn" style="margin-left:25%;margin-top:5px;">')
                for (var i = 0; i < j.length; i++) {
                    $('#GroupS').append('<div  id="d_' + j[i].DIRECTION_ID + '" class="margTop0"><input type="checkbox" class="col-md-1" onclick=MakeCheckGrupS(' + j[i].DIRECTION_ID + ',this)><label itemid="144"  class="checkBx">' + j[i].DIRECTION_NAME + '</label></div>')
                    // GetHasService(obj, j[i].INDIVIDUAL_ID, j[i].LAST_NAME)
                }
            }
        })
    }

    function getHasDirectServices(obj) {
        var o = { "Obj": obj }
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Apartments.aspx/GetHasDirectService",
            data: JSON.stringify(o),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var j = JSON.parse(data.d)

                for (var i = 0; i < j.length; i++) {
                    $('#GroupSHas').append('<div  id="d_' + j[i].DIRECTION_ID + '" class="margTop0"><input type="checkbox" checked="checked" class="col-md-1" onclick=MakeCheckHasGrupS(' + j[i].DIRECTION_ID + ',this)><label itemid="144" style="width: 70%;" class="checkBx">' + j[i].DIRECTION_NAME + '</label><img src=' + j[i].ICON_ADRESS + ' itemid=' + j[i].ICON_ID + ' onclick=ChangeIcon(this) style="width: 30px;height: 30px;float: right;margin-top: -20px;"></div>')
                    GetHasService(obj, j[i].DIRECTION_ID, j[i].DIRECTION_NAME)
                }
            }
        })

    }

    function GetHasService(obj, d, GroupName) {

        if ($('#GrupHasServices').length == 0) {
            $('.modal-bodySs').children('.col-md-12:eq(0)').append('<div class="col-md-4"><label>Услуги</label><div id="GrupHasServices" class="GroupS1"></div></div>')
        }
        var obj_ = { "obj": obj, "d": d }
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Apartments.aspx/GetHasServices",
            data: JSON.stringify(obj_),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var j = JSON.parse(data.d);
                if (j.length != 0) {

                    //$('#GrupServices').append('<div class="col-md-12" style="margin-top:0px;align-items: center !important;"><hr/><input type="button" class="btn genBtn" value="Добавить Услугу" data-open="on" onclick="showAddForm(' + dId + ',this)" data-g=' + dId + ' itemid="423" style="-right: -23px; */float: left;width: 100%;"></div>')

                    //for (var i = 0; i < j.length; i++) {
                    //    if (i > 0) {
                    //        $('#GrupHasServices').append('<div data-d='+d+' class="margTop0"><input type="checkbox" onclick="MakeCheckHasProductService(' + j[i].ROOM_ID + ',this)" class="col-md-1" data-g=' + d + ' checked="checked"   itemid="' + j[i].ROOM_ID + '" style="-right: -23px; */float: left;"><label itemid="144" class="checkBx">' + j[i].FIRST_NAME + '</label></div>')
                    //    }
                    //    if (i == 0) {
                    //        $('#GrupHasServices').append('<div data-d=' + d +' class="margTop0"><hr/><div class="cornFlower">' + GroupName + '</div><input type="checkbox" checked="checked" onclick="MakeCheckHasProductService(' + j[i].ROOM_ID + ',this)" class="col-md-1" data-g=' + d + '    itemid="' + j[i].ROOM_ID + '" style="-right: -23px; */float: left;"><label itemid="144" class="checkBx">' + j[i].FIRST_NAME + '</label></div>')
                    //    }
                    //    getHastCost(obj, j[i].ROOM_ID,j[i].FIRST_NAME)
                    //}
                    $('#GrupHasServices').append('<div id="d_' + d + '"><div data-d=' + d + ' class="margTop0"><hr/><div class="cornFlower">' + GroupName + '</div></div>')
                    for (var i = 0; i < j.length; i++) {
                        $('#GrupHasServices').children('#d_' + d).append('<div data-d=' + d + ' class="margTop0"><input type="checkbox" onclick="MakeCheckHasProductService(' + j[i].ROOM_ID + ',this)" class="col-md-1" data-g=' + d + ' checked="checked"   itemid="' + j[i].ROOM_ID + '" style="-right: -23px; */float: left;"><label  itemid="144" class="checkBx">' + j[i].FIRST_NAME + '</label></div>')
                        getHastCost(obj, j[i].ROOM_ID, j[i].FIRST_NAME, d)
                    }

                }
            }
        })
    }
    function getHastCost(o, sid, SName, d) {
        if ($('#ServiceHasCost').length == 0) {
            $('.modal-bodySs').children('.col-md-12:eq(0)').append('<div class="col-md-4"><label>Стоимость (руб.)</label><div id="ServiceHasCost" style="border: 1px solid #000;box-shadow: 3px 4px 5px rgba(0,0,0,0.3);width: 100%;height: 260px !important;overflow: auto;"></div></div>')
        }
        var obj = { "obj": o, "sid": sid }
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Apartments.aspx/GetHasCost",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var j = JSON.parse(data.d);
                ////console.log(j);
                for (var i = 0; i < j.length; i++) {
                    var nmbr = (j[i].COST != 'Договорная') ? 'value=' + j[i].COST : 'disabled=disabled'
                    var doq = (j[i].COST == 'Договорная') ? 'checked=checked' : ''
                    $('#ServiceHasCost').append('<div id="d_' + d + '" class="margTop0" itemid=' + sid + '><label itemid=' + sid + ' class="checkBx" style="margin-left: 0px !important;">' + SName + '</label><input type="number" ' + nmbr + ' id="nmbr" onchange="checkNumber(this)" min="0" itemid=' + sid + ' style="-right: -23px; */float: left;"><label style="float:right;" >Договорная</label><input itemid=' + sid + ' id="chk" onclick="checkCheckbox(this)" type="checkbox" ' + doq + ' style="float: right; margin-right:7px;"><hr></div>')
                }
            }
        })
    }



    //$('#loadPmnt1').click(function ()
    //{
    //    var fileName = $('#fileBnP').attr('data-file')
    //    var objId = $('#objsM').val();
    //    SavePaymentsFromExcel(Log, fileName, objId);
    //})
    var MainHeight = $('body').height()
    $('.ui-loader-background,.modal2,.modalBnp,.modalkvart,modalSs').height(MainHeight)
    $('select').select2({
        containerCssClass: "wrap"
    })

    var loc = window.location.pathname;
    if (loc == '/Manager/Payments.aspx') {
        $('#loadPmnt').click(function () {
            if ($('#tblBnp tr td').length != 0) {
                var SCORE_ID //ЛС
                var PERIOD_M  //Период (месяц)
                var PERIOD_Y  //Период (год)
                var SERVICE  //Услуга
                var BBP //Остаток на начало периода
                var CHARGED  //Начислено
                var RECEIVED //Поступило
                var TOTAL_P   //Остаток на конец периода
                var TYPE //Тип начисления/платежа

                var plateji = []
                if ($('#ObjBnp').val() != 0) {
                    var success = true;
                    $('#tblBnp tr td').each(function () {
                        var tdtext = ""//$(this).text().trim();
                        if ($(this).children('select').length != 0) {
                            tdtext = $(this).find('select option:selected').text();
                        }
                        if ($(this).children('input[type="text"]').length != 0) {
                            tdtext = $(this).children('input[type="text"]').val().trim();
                        }
                        if (tdtext.length == 0 && $(this).attr('data-remove') != "x") {
                            // $(this).css("background-color", "red");
                            $(this).children('i').remove();
                            $(this).append('<i class="fa fa-exclamation-circle" style="color:red;margin-left:  50%;font-size:  25px;" aria-hidden="true"></i>')
                            $('#errEmpty').remove()
                            $('#errEmpty2').remove()
                            if ($(this).children('input[type=text]').length != 0) {

                                $('#sled').children('p').after('<label id="errEmpty" style="color:red">Необходимо заполнить все ячейки в данной строке</label>')
                            }
                            else {
                                if ($(this).index() == 8) {
                                    $('#sled').children('p').after('<label id="errEmpty2" style="color:red">Некорректно заполнено поле «Тип начисления/платежа</label>')
                                }
                            }
                            success = false
                        }
                    })
                    //dublirovaniye
                    if (success == true) {
                        var trLength = $('#tblBnp tr').length;
                        for (var i = 0; i < trLength; i++) {
                            var Service = $('#tblBnp tr:eq(' + i + ') td:eq(3) select option:selected').text();
                            var lc = $('#tblBnp tr:eq(' + i + ') td:eq(0) input[type="text"]').val();

                            for (var j = i + 1; j < trLength; j++) {
                                if (j != 0) {
                                    var Service2 = $('#tblBnp tr:eq(' + j + ') td:eq(3) select option:selected').text();
                                    var lc2 = $('#tblBnp tr:eq(' + j + ') input[type="text"]').val();
                                    if (Service == Service2 && lc2 == lc) {
                                        $('#tblBnp tr:eq(' + j + ') td:eq(3),#tblBnp tr:eq(' + j + ') td:eq(0)').css('color', 'red').css('font-weight', 'bold')
                                        $('#tblBnp tr:eq(' + i + ') td:eq(3),#tblBnp tr:eq(' + i + ') td:eq(0)').css('color', 'red').css('font-weight', 'bold')
                                        success = false
                                        if ($('#dubl').length == 0) {

                                            $('#sled').after('<label id="dubl" style="color:red">Для некоторых лицевых счетов обнаружено дублирование данных по услугом!Пожалуйста, удалите некорректные данные</label>')

                                        }
                                    }

                                }
                            }
                        }
                    }
                    //checking all reds
                    if (success == true) {
                        for (var i = 0; i < $('#tblBnp tr').length; i++) {
                            var color = $("#tblBnp tr:eq(" + i + ") td:eq(0) input[type='text']").css("color")
                            if (color == "rgb(255, 0, 0)") {
                                if ($('#tblBnp tr:eq(" + i + ") td:eq(0)  #lblSc_err').length == 0) {
                                    $("#tblBnp tr:eq(" + i + ") td:eq(0) input[type='text']").after('<label id="lblSc_err" style="color: red">Введенный лицевой счёт не существует!</label>')
                                    success == false
                                    window.setTimeout(function () {
                                        $('#lblSc_err').hide(1000);
                                        $('#lblSc_err').remove();
                                    }, 3000)
                                }
                            }
                        }
                    }
                    if (success == true) {
                        for (var i = 0; i < $('#tblBnp tr').length; i++) {
                            SCORE_ID = $('#tblBnp tr:eq(' + i + ') td:eq(0)').children('input[type="text"]').val()
                            PERIOD_M = $('#tblBnp tr:eq(' + i + ') td:eq(1)').children('select').val();
                            PERIOD_Y = $('#tblBnp tr:eq(' + i + ') td:eq(2)').children('input[type="text"]').val()
                            SERVICE = $('#tblBnp tr:eq(' + i + ') td:eq(3)').children('select').val();
                            BBP = $('#tblBnp tr:eq(' + i + ') td:eq(4)').children('input[type="text"]').val()
                            CHARGED = $('#tblBnp tr:eq(' + i + ') td:eq(5)').children('input[type="text"]').val()
                            RECEIVED = $('#tblBnp tr:eq(' + i + ') td:eq(6)').children('input[type="text"]').val()
                            TOTAL_P = $('#tblBnp tr:eq(' + i + ') td:eq(7)').children('input[type="text"]').val()
                            TYPE = $('#tblBnp tr:eq(' + i + ') td:eq(8)').children('select').val();
                            plateji.push({ "SCORE_ID": SCORE_ID, "PERIOD_M": PERIOD_M, "PERIOD_Y": PERIOD_Y, "SERVICE": SERVICE, "BBP": BBP, "CHARGED": CHARGED, "RECEIVED": RECEIVED, "TOTAL_P": TOTAL_P, "TYPE": TYPE })
                        }
                        SaveMassPlatej(plateji)
                    }
                }
                else {
                    if ($('#objsBnp_E').length == 0) {

                        $('#ObjBnp').after('<label id="objsBnp_E" style="color:red">Необходимо выбрать объект</label>')

                    }
                }
            }
            else {
                if ($('#flS').length == 0) {
                    $('#fileBnP').after('<label id="flS" style="color:red"> Cначала  выберите excel файл</label>');
                }
            }
        });
        $('#UplPayment').click(function () {
            $('#ModalBNP').show();

            $('#ObjBnp').append($('#objsM >option').clone())
            //Приложение 13. Форма загрузки начислений и платежей.xlsx
            //SavePaymentsFromExcel('Форма загрузки начислений и платежей.xlsx')
        })
        $('#ObjBnp').change(function () {
            $('#objsBnp_E').remove();
        })
        $('#closebnp').click(function () {
            $('#ObjBnp').val(0)
            $('#ObjBnp').empty();
            $('#fileBnP').val('')
            $('#tblBnp').empty();
            $('#ModalBNP').hide();
            $('.modal-contentBnp').css('width', '57%')
            $('#flS,#objsBnp_E,#dubl,#errEmpty2').remove();
        });
    }
    if (loc == "/Manager/AddApartment.aspx") {

        $("#countR").keypress(validateNumber)
        $("#GenS").keypress(validateNumber)
        $("#LiveS").keypress(validateNumber)
        $('#entr').keyup(function () {
            var number = $(this).val().replace('-', '')
            $(this).val(number)
        })

        $('#rnum').keyup(function () {
            var number = $(this).val().replace('=', '')
            let pattern = /[\u0400-\u04FF]/;
            if (pattern.test($('input#rnum').val())) {
                $('input#rnum').val("")
                ErrorForControls($('#rnum'), 'Только латинские буквы');
            }
            else {
                $(this).val(number)
            }
        })
        // $('[onkeyup="hideErrsMessage2(this)"]').keypress(validateNumber)
        // $('div[class="tab-pane fade active in"] .row:last-child:nth-last-child(0)').keypress(validateNumber)
        //$('input[data-valid="Upravbot"]').keypress(validateNumber)
        $('#genPass').keyup(function () {
            var password = $("#genPass").val();
            if (password.length > 5) {
                $(".domOk").hide();
                $(".pssErr").show().attr("src", "/img/Äè.png")
                var numbers_ = /[0-9]/g
                var upperCaseLetters = /[A-Z]/g;
                var lowerCaseLetters = /[a-z]/g;
                if (password.match(/[a-z]/g) || password.match(/[A-Z]/g)) {
                    $(".pssErr").show().attr("src", "/img/Äè.png")
                    $(".domOk").hide();

                    if (password.match(/(.)\1/)) {
                        $(".domOk").show();
                        $(".domOk").text('Пароль должен содержать символы в разных регистрах')

                    }
                    else {
                        $(".pssErr").show().attr("src", "/img/Äè.png")
                        $(".domOk").hide();
                    }
                    if (password.match(numbers_) && password.match(upperCaseLetters) && password.match(lowerCaseLetters)) {
                        $(".pssErr").show().attr("src", "/img/Äè.png")
                        $(".domOk").hide();
                    }
                    else {
                        $(".domOk").show();
                        $(".domOk").text("Пароль должен содержать символы в разных регистрах")
                        $(".pssErr").show().attr("src", "/img/NO.png")
                    }

                }
                else {
                    $(".domOk").show();
                    $(".domOk").text("Пароль должен содержать латинские символы и цифры")

                }
                if (!password.match(numbers_)) {
                    $(".pssErr").show().attr("src", "/img/NO.png")
                    $(".domOk").text("Пароль должен содержать латинские символы и цифры")
                }

            }
            else {
                $(".domOk").show();
                $(".domOk").text("Данное поле должно содержать как минимум 6 символов")
                $(".pssErr").show().attr("src", "img/NO.png")
            }
            var domOk = $('.domOk').css('display')
            if (domOk == "none") {
                // //console.log('none')
                //  CheckPass(password)
            }
        })
        var apartId = sessionStorage.getItem("apart")//
        $("#tr1").click(function () {
            $("#table1").toggle("slow");
        });
        $("#entr,#floor,#rnum,#countR,#GenS,#LiveS").keyup(function () {
            hideErrsMessage(this);
            if ($(this).attr('id') == 'rnum' || $(this).attr('id') == 'floor') {
                if ($(this).val().length != 0 && $('#objs').val() != 0 && $('#RoomF').val() != 0 && $('#r_t').val() != 0 && $('#floor').val().length != 0) {

                    CHeck_Obj_RMF_RMT_RMN($(this), $('#objs').val(), $('#RoomF').val(), $('#r_t').val(), $('#rnum').val(), Log, $('#floor').val())
                }
            }
        })
        $(document).on('change', '#objs,#RoomF,#r_t', function () {
            hideErrsMessage($(this))

            if ($(this).attr('id') == 'objs') {
                if ($(this).val() != 0 && $('#objs').val() != 0 && $('#RoomF').val() != 0 && $('#r_t').val() != 0 && $('#rnum').val().length != 0 && $('#floor').val().length != 0) {

                    CHeck_Obj_RMF_RMT_RMN($(this), $('#objs').val(), $('#RoomF').val(), $('#r_t').val(), $('#rnum').val(), Log, $('#floor').val())
                }
            }
            if ($(this).attr('id') == 'RoomF') {
                if ($(this).val() != 0 && $('#objs').val() != 0 && $('#RoomF').val() != 0 && $('#r_t').val() != 0 && $('#rnum').val().length != 0 && $('#floor').val().length != 0) {

                    CHeck_Obj_RMF_RMT_RMN($(this), $('#objs').val(), $('#RoomF').val(), $('#r_t').val(), $('#rnum').val(), Log, $('#floor').val())
                }
            }
            if ($(this).attr('id') == 'r_t') {
                if ($(this).val() != 0 && $('#objs').val() != 0 && $('#RoomF').val() != 0 && $('#r_t').val() != 0 && $('#rnum').val().length != 0 && $('#floor').val().length != 0) {

                    CHeck_Obj_RMF_RMT_RMN($(this), $('#objs').val(), $('#RoomF').val(), $('#r_t').val(), $('#rnum').val(), Log, $('#floor').val())
                }
            }
        })
        getOwnerShip();

        $('#backAppart').click(function () {
            window.location.href = "Apartments.aspx";


            var tabCount3 = $('#nav-tab li:nth-last-child(2)').attr('itemid');

        })
        $("#SaveUp").click(function () {
            var SuccesResult = checkControlsM().Issuccess

            //  console.log(checkControlsM().obj)
            if (SuccesResult == true) {
                SaveApart(checkControlsM().obj, Log)
            }
            if (true) {
                //var objs = $("#objs").val();
                //           if (objs != 0) {
                //               var entr = ($("#entr").val().length == 0) ? 0 : $("#entr").val();
                //               if (entr.length != 0) {
                //                   var floor = ($("#floor").val().length == 0) ? 0 : $("#floor").val();//$("#floor").val();
                //                   if (floor.length != 0) {
                //                       var rnum = $("#rnum").val();
                //                       if (rnum.length != 0) {
                //                           var RoomF = $('#RoomF').val();
                //                           if (RoomF != 0) {
                //                               var r_t = $('#r_t').val();
                //                               if (r_t != 0) {
                //                                   var countR = ($("#countR").val().length == 0) ? 0 : $("#countR").val(); //$("#countR").val();
                //                                   if (countR.length != 0) {
                //                                       var GenS = ($("#GenS").val().length == 0) ? 0 : $("#GenS").val();//$("#GenS").val();
                //                                       if (GenS.length != 0) {
                //                                           var LiveS = ($("#LiveS").val().length == 0) ? 0 : $("#LiveS").val();//$("#LiveS").val();
                //                                           if (LiveS.length != 0) {
                //                                               var txtDatas = []
                //                                               var success = true
                //                                               $('.tab-pane').each(function () {
                //                                                   var data_tab = $(this).attr('data-tab')
                //                                                   var lc = $(this).children().find('#lc').val().trim();
                //                                                   var ID_lc = $(this).children().find('#lc').attr('data-id')//scoreGuid
                //                                                   var pass = $(this).children().find('#pss').val().trim();
                //                                                   var typeProp = $(this).children().find('#typeProp').val();

                //                                                   var LiveSq = $(this).children().find('#LiveSq').val().trim()
                //                                                   LiveSq = (LiveSq.length == 0) ? " " : LiveSq

                //                                                   var GenSq = $(this).children().find('#GenSq').val().trim();
                //                                                   GenSq = (GenSq.length == 0) ? " " : GenSq

                //                                                   var LiveSqB = $(this).children().find('#LiveSqB').val().trim();
                //                                                   LiveSqB = (LiveSqB.length == 0) ? " " : LiveSqB

                //                                                   var AmRoom = $(this).children().find('#AmRoom').val().trim();
                //                                                   AmRoom = (AmRoom.length == 0) ? " " : AmRoom
                //                                                   var data_sms = "";
                //                                                   var data_em = "";
                //                                                   var data_exp = "";
                //                                                   ID_lc = (ID_lc == undefined) ? '0' : ID_lc

                //                                                   if (lc != undefined && lc.length == 0) {
                //                                                       $('#lc_E+br').remove()
                //                                                       $('#lc_E').remove()
                //                                                       $(this).children().find('#lc').after('<label id="lc_E" class="lc_E">Необходимо заполнить поле "Номер лицевого счета"</label><br/>')
                //                                                       success = false
                //                                                       $('.tab-pane').attr('class', 'tab-pane fade')
                //                                                       $(this).attr('class', 'tab-pane fade active in')

                //                                                       $('#nav-tab').children('li').attr('class', '');
                //                                                       $('#nav-tab').children('li[itemid="' + data_tab + '"]').attr('class', 'active')
                //                                                       return false;
                //                                                   }
                //                                                   //console.log('lc: '+lc)
                //                                                   if (pass != undefined && pass.length != 0) {
                //                                                       data_sms = $(this).children().find('#pss').attr('data-sms')
                //                                                       data_sms = (data_sms == undefined) ? "" : data_sms

                //                                                       data_em = $(this).children().find('#pss').attr('data-em')
                //                                                       data_em = (data_em == undefined) ? "" : data_em

                //                                                       data_exp = $(this).children().find('#pss').attr('data-exp')
                //                                                       data_exp = (data_exp == undefined) ? "" : data_exp
                //                                                   }
                //                                                   lc = lc + "|" + pass + "|" + data_sms + "|" + data_em + "|" + data_exp
                //                                                   //console.log('pass: '+pass)
                //                                                   //console.log('data_sms: '+data_sms)
                //                                                   //console.log('data_em: '+data_em)
                //                                                   //console.log('data_exp: ' + data_exp)
                //                                                   if (typeProp != undefined && typeProp == 0) {
                //                                                       //$('#typeProp_E').remove()
                //                                                       //$('#typeProp_E+br').remove()
                //                                                       //$(this).children().find('#typeProp').after('<label id="typeProp_E" class="typeProp_E">Пожалуйста, Выберите собственность</label><br/>')

                //                                                       //success = false
                //                                                       //$('.tab-pane').attr('class', 'tab-pane fade')
                //                                                       //$(this).attr('class', 'tab-pane fade active in')

                //                                                       //$('#nav-tab').children('li').attr('class', '');
                //                                                       //$('#nav-tab').children('li[itemid="' + data_tab + '"]').attr('class', 'active')
                //                                                       //break;
                //                                                   }
                //                                                   //console.log('typeProp: ' + typeProp)
                //                                                   if (LiveSq != undefined && LiveSq.length == 0) {
                //                                                       LiveSq = " "
                //                                                       //$('#LiveSq_E').remove()
                //                                                       //    $('#LiveSq_E+br').remove()
                //                                                       //  $(this).children().find('#LiveSq').after('<label id="LiveSq_E"  class="LiveSq_E">Необходимо заполнить поле "Жилая площадь по данному"</label><br/>')
                //                                                       //success = false
                //                                                       //$('.tab-pane').attr('class', 'tab-pane fade')
                //                                                       //$(this).attr('class', 'tab-pane fade active in')

                //                                                       //$('#nav-tab').children('li').attr('class', '');
                //                                                       //$('#nav-tab').children('li[itemid="' + data_tab + '"]').attr('class', 'active')
                //                                                       // return break;

                //                                                   }
                //                                                   //console.log('LiveSq 1 : ' + LiveSq)
                //                                                   if (GenSq != undefined && GenSq.length == 0) {
                //                                                       //   $('#GenSq_E').remove();
                //                                                       //$('#GenSq_E+br').remove();
                //                                                       //   $(this).children().find('#GenSq').after('<label id="GenSq_E" class="GenSq_E">Необходимо заполнить поле "Общая площадь по данному"</label><br/>')

                //                                                       //success = false
                //                                                       //$('.tab-pane').attr('class', 'tab-pane fade')
                //                                                       //$(this).attr('class', 'tab-pane fade active in')

                //                                                       //$('#nav-tab').children('li').attr('class', '');
                //                                                       //$('#nav-tab').children('li[itemid="' + data_tab + '"]').attr('class', 'active')
                //                                                       // return break;
                //                                                       GenSq = " ";
                //                                                   }
                //                                                   //console.log("GenSq 2 : " + GenSq)
                //                                                   if (LiveSqB != undefined && LiveSqB.length == 0) {

                //                                                       //$('#LiveSqB_E+br').remove()
                //                                                       //$('#LiveSqB_E').remove()
                //                                                       //$(this).children().find('#LiveSqB').after('<label id="LiveSqB_E" class="LiveSqB_E">Необходимо заполнить поле "Общая площадь без летних зон по данному "</label><br/>')
                //                                                       //success = false
                //                                                       //$('.tab-pane').attr('class', 'tab-pane fade')
                //                                                       //$(this).attr('class', 'tab-pane fade active in')

                //                                                       //$('#nav-tab').children('li').attr('class', '');
                //                                                       //$('#nav-tab').children('li[itemid="' + data_tab + '"]').attr('class', 'active')
                //                                                       // return  break;
                //                                                       LiveSqB = " ";
                //                                                   }
                //                                                   //console.log("LiveSqB 3 : " + LiveSqB)

                //                                                   if (AmRoom != undefined && AmRoom.length == 0) {

                //                                                       //$('#AmRoom_E+br').remove()
                //                                                       //$('#AmRoom_E').remove()
                //                                                       //$(this).children().find('#AmRoom').after('<label id="AmRoom_E" class="AmRoom_E">Необходимо заполнить поле "Количество комнат"</label><br/>')
                //                                                       //success = false
                //                                                       //$('.tab-pane').attr('class', 'tab-pane fade')
                //                                                       //$(this).attr('class', 'tab-pane fade active in')

                //                                                       //$('#nav-tab').children('li').attr('class', '');
                //                                                       //$('#nav-tab').children('li[itemid="' + data_tab + '"]').attr('class', 'active')
                //                                                       // return break;
                //                                                       AmRoom = " ";
                //                                                   }
                //                                                   // //console.log("AmRoom 4 : " + AmRoom)

                //                                                   var itms = $(this).children().find('#itms')
                //                                                   var itmsS = []
                //                                                   $(itms).children('.row').each(function () {
                //                                                       var itemid = $(this).attr('itemid');
                //                                                       var sobs = $(this).children().find('#sobs' + itemid + '').val().trim()
                //                                                       var dol = "";
                //                                                       var tel = $(this).children().find('#tel' + itemid + '').val().trim()
                //                                                       var email = $(this).children().find('#email' + itemid + '').val().trim()
                //                                                       if (sobs == undefined) {
                //                                                           spobs = "";
                //                                                       }
                //                                                       //console.log('sobs 1: ' + sobs)
                //                                                       if (typeProp == 3) {
                //                                                           dol = $(this).children().find('#dol' + itemid + '').val().trim();
                //                                                           if (dol.length == 0) {
                //                                                               // $('dol' + itemid + '_E').remove()
                //                                                               // $('dol' + itemid + '_E+br').remove()
                //                                                               $('.dols+br').remove();
                //                                                               $('.dols').remove();
                //                                                               $(this).children().find('#dol' + itemid + '').after('<label id="dol_E" class="dols">Необходимо заполнить поле "Доля"</label><br/>')

                //                                                               success = false
                //                                                               $('.tab-pane').attr('class', 'tab-pane fade')
                //                                                               // $(this).parent().find('.tab-pane').attr('class', 'tab-pane fade active in')
                //                                                               $('#tab' + data_tab + '').attr('class', 'tab-pane fade active in')
                //                                                               $('#nav-tab').children('li').attr('class', '');
                //                                                               $('#nav-tab').children('li[itemid="' + data_tab + '"]').attr('class', 'active')
                //                                                               return false;
                //                                                           }
                //                                                           else {
                //                                                               var dol_ = dol.replace(',', '.')
                //                                                               var dol_ = (dol_)
                //                                                               if (dol_ <= 0 || dol_ >= 1) {
                //                                                                   $('.dols+br').remove();
                //                                                                   $('.dols').remove();
                //                                                                   $(this).children().find('#dol' + itemid + '').after('<label id="dol_E" class="dols">Некорректное значение</label><br/>')

                //                                                                   success = false
                //                                                                   $('.tab-pane').attr('class', 'tab-pane fade')
                //                                                                   // $(this).parent().find('.tab-pane').attr('class', 'tab-pane fade active in')
                //                                                                   $('#tab' + data_tab + '').attr('class', 'tab-pane fade active in')
                //                                                                   $('#nav-tab').children('li').attr('class', '');
                //                                                                   $('#nav-tab').children('li[itemid="' + data_tab + '"]').attr('class', 'active')
                //                                                                   return false;
                //                                                               }
                //                                                           }
                //                                                       }
                //                                                       //console.log('dol 2: ' + dol)
                //                                                       if (tel != undefined) {
                //                                                           if (pass.length != 0 && data_sms == "has" && tel.length == 0) {
                //                                                               //    $('.tels+br').remove()
                //                                                               //  $('.tels').remove()
                //                                                               $(this).children().find('#tel' + itemid + '').after('<label id="tel_E"  class="tels">Для рассылки пароля не хватает следующих данных "Номер телефона"</label><br/>')

                //                                                               success = false
                //                                                               $('.tab-pane').attr('class', 'tab-pane fade')
                //                                                               $('#tab' + data_tab + '').attr('class', 'tab-pane fade active in')
                //                                                               // $(this).parent().find('.tab-pane').attr('class', 'tab-pane fade active in')

                //                                                               $('#nav-tab').children('li').attr('class', '');
                //                                                               $('#nav-tab').children('li[itemid="' + data_tab + '"]').attr('class', 'active')
                //                                                               return false;

                //                                                           }
                //                                                           else {
                //                                                               tel = (tel.length == 0) ? "" : tel;
                //                                                           }
                //                                                       }
                //                                                       else {
                //                                                           tel = "";
                //                                                       }

                //                                                       //console.log('tel 3: ' + tel)
                //                                                       if (email != undefined) {
                //                                                           if (pass.length != 0 && data_em == "has" && email.length == 0) {
                //                                                               //   $('.emails+br').remove()
                //                                                               //   $('.emails').remove()
                //                                                               $(this).children().find('#email' + itemid + '').after('<label id="email_E" class="emails" style="color:red;padding: 0px 0;">Для рассылки пароля не хватает следующих данных: "E-mail"</label><br/>')

                //                                                               success = false
                //                                                               $('.tab-pane').attr('class', 'tab-pane fade')
                //                                                               //  $(this).parent().find('.tab-pane').attr('class', 'tab-pane fade active in')
                //                                                               $('#tab' + data_tab + '').attr('class', 'tab-pane fade active in')
                //                                                               $('#nav-tab').children('li').attr('class', '');
                //                                                               $('#nav-tab').children('li[itemid="' + data_tab + '"]').attr('class', 'active')
                //                                                               return false;
                //                                                           }
                //                                                           else {
                //                                                               email = (email.length == 0) ? "" : email;
                //                                                           }

                //                                                       }
                //                                                       else {
                //                                                           email = "";
                //                                                       }

                //                                                       //console.log('email 4: ' + tel)
                //                                                       itmsS.push({ "FIRST_NAME": sobs, "SHARE": dol, "PHONE": tel, "EMAIL": email })

                //                                                   })
                //                                                   if (lc != undefined && typeProp != undefined && LiveSq != undefined && GenSq != undefined && LiveSqB != undefined && AmRoom != undefined) {
                //                                                       txtDatas.push({ "NUMBER": lc, "OWNERSHIP_TYPE_ID": typeProp, "LIVE_SQUARE": LiveSq, "GEN_SQUARE": GenSq, "WITHOUT_SUMMER_SQUARE": LiveSqB, "ROOM_QUANT": AmRoom, "A_D": itmsS, "ID": ID_lc })
                //                                                   }
                //                                               })
                //                                               console.log(txtDatas)
                //                                               //var lc_e = $('#lc_E').length;
                //                                               //if (lc_e != 0) {
                //                                               //    success = false

                //                                               //}
                //                                               //if ($('#emailV_E').length != 0) {
                //                                               //    success = false
                //                                               //}
                //                                               //if ($('#PhoneV_E').length != 0) {
                //                                               //    success = false
                //                                               //}
                //                                               //if ($('#LiveS_E').length != 0) {
                //                                               //    success = false
                //                                               //}
                //                                               //if ($('#LiveSq_E').length != 0) {
                //                                               //    success = false
                //                                               //}
                //                                               //if ($('#GenS_E').length != 0) {
                //                                               //    success = false
                //                                               //}
                //                                               //if ($('#GenSq_E').length != 0) {
                //                                               //    success = false
                //                                               //}
                //                                               //if ($('#countRErr').length != 0 && $('#LiveSqBErr').length == 0 && $('#GenSErrA').length == 0 && $('#countRErrA').length != 0 && $('#LiveS_').length != 0) {
                //                                               //    success = false
                //                                               //    
                //                                               //}



                //                                               if (success == true) {
                //                                                   //--Saving

                //                                                   ////console.log(obj)
                //                                                   if (apartId == "null") {
                //                                                       var obj = { "OBJECT_ID": objs, "ENTRANCE": entr, "FLOOR": floor, "ROOM_NUMBER": rnum, "ROOM_FOR_ID": RoomF, "ROOM_TYPE_ID": r_t, "CHAMB_AMOUNT": countR, "GEN_SQUARE": GenS, "LIVE_SQUARE": LiveS, "adbs": txtDatas };
                //                                                       $('.ui-loader-background').show();
                //                                                       $('#loader').show();
                //                                                       SaveApart(obj, Log)
                //                                                       //alert('Ok')
                //                                                   }
                //                                                   else {
                //                                                       //var IDROom = sessionStorage.getItem("ID")
                //                                                       var objUp = { "ROOM_ID": apartId, "OBJECT_ID": objs, "ENTRANCE": entr, "FLOOR": floor, "ROOM_NUMBER": rnum, "ROOM_FOR_ID": RoomF, "ROOM_TYPE_ID": r_t, "CHAMB_AMOUNT": countR, "GEN_SQUARE": GenS, "LIVE_SQUARE": LiveS, "adbs": txtDatas };
                //                                                       var roomtype = $("#r_t option:selected").text();
                //                                                       $('.ui-loader-background').show();
                //                                                       $('#loader').show();
                //                                                       UpdateApart(objUp, Log, rnum, roomtype);
                //                                                   }

                //                                               }

                //                                           }
                //                                           else {
                //                                               if ($('#LiveSE').length == 0) {
                //                                                   $("#LiveS").after('<label id= "LiveSE" class="errs">Необходимо заполнить поле "Жилая площадь"</label>')
                //                                               }

                //                                           }
                //                                       }
                //                                       else {
                //                                           if ($('#GenSE').length == 0) {
                //                                               $("#GenS").after('<label id= "GenSE" class="errs">Необходимо заполнить поле "Общая площадь"</label>')
                //                                           }

                //                                       }
                //                                   }
                //                                   else {
                //                                       if ($('#countRE').length == 0) {
                //                                           $("#countR").after('<label id= "countRE" class="errs">Необходимо заполнить поле "Количество комнат"</label>')
                //                                       }

                //                                   }
                //                               }
                //                               else {
                //                                   if ($('#r_tE').length == 0) {
                //                                       $("#r_tH").after('<label id= "r_tE" class="errs">Необходимо выбрать "Тип помещения"</label>')
                //                                   }

                //                               }
                //                           }
                //                           else {
                //                               if ($('#RoomFE').length == 0) {
                //                                   $("#RoomFH").after('<label id= "RoomFE" class="errs">Необходимо выбрать "Назначение помещения"</label>')
                //                               }

                //                           }
                //                       }
                //                       else {
                //                           if ($('#rnumE').length == 0) {
                //                               $("#rnumH").after('<label id= "rnumE" class="errs">Необходимо заполнить поле "Номер помещения"</label>')
                //                           }

                //                       }
                //                   }
                //                   else {
                //                       if ($('#floorE').length == 0) {
                //                           $("#floorH").after('<label id= "floorE" class="errs">Необходимо заполнить поле "Этаж"</label>')
                //                       }

                //                   }
                //               }
                //               else {
                //                   if ($('#entrE').length == 0) {
                //                       $("#entrH").after('<label id= "entrE" class="errs">Необходимо заполнить поле "Подъезд"</label>')
                //                   }

                //               }
                //           }
                //           else {
                //               if ($('#objsE').length == 0) {
                //                   $("#objsH").after('<label id= "objsE" class="errs">Необходимо выбрать объект</label>')
                //               }

                //           }
            }
        })

        $('#RoomF').change(function () {
            gtTypeOfroom("", $(this).val())
        })
        $('.closeVn').click(function () {
            $('#myModalVn').hide();
            $('.Servc:not(:first)').remove();
            $('.removingNac3').remove();
            $('#Service,#UNITS').val('').removeAttr('placeholder').removeAttr('class').css('width', '100%').css('box-shadow', '').css('border', '');
            $('#ONBEGIN,#OVERALL,#PAYMENTS,#sumNac,#VOLUME,#TARIFF,#LGOTA,#RECALC,#OVERALL2,#ONEND').val('0.00').removeAttr('placeholder').removeAttr('class').css('width', '100%').css('box-shadow', '').css('border', '');
            $('#vnTable').remove();
            $('#Period,#ONBEGIN,#PAYMENTS,#OVERALL,#ONEND').val('');
            //  $(e).removeAttr('placeholder').removeAttr('class').css('width', '100%').css('box-shadow', '').css('border', '')


        })

        if (apartId == "null") {
            $("#SaveUp").text('Сохранить');
            gtTypeOfroom("")
            getRoomFor("");
            GetUproObj(Log, "");
            $("#plus").click(function () {
                var lastItm = $('.ls:last').attr('itemid')
                addTab(lastItm)
            })

            //$('.tab-content:last,.nav-tabs:last').remove();

        }
        else {
            $('#QRGenerate').show();
            $('#AllLs').children('div[itemid="0"]').remove();
            $('#PageH').text('Редактировать помещение')

            $('#plusNac').click(function () {
                $('#errPer').remove()
                var period = $('#Period').val();
                if (period.length != 0) {
                    if ($('#vnTable').length == 0) {
                        $('.modal-bodyVn').children('div:eq(0)').after('<div class="col-md-12 vndiv" itemid="0"><table id="vnTable" class="table"><thead><tr><td>Услуга:</td><td>Объем услуг:</td><td>Ед.изм.:</td><td>Тариф руб/ед:</td><td>Льготы субсидии:</td><td>Перерасчеты (+/-):</td><td>Начислено:</td></tr></thead><tbody id="vnTableBody"></tbody></table></div>')

                        $('#vnTableBody').append('<tr data-guid="0"><td><input type="text" id="srv"></td><td><input type="number"      style="width: 100%"></td><td><input type="text"      style="width: 100%"></td><td><input  type="number"   style="width: 100%" ></td><td><input type="number" style="width: 100%"></td><td><input  type="number" style="width: 100%"></td><td><input type="number" onkeyup="AddingNac(this)"  style="width: 100%"  id="Nac0"></td><td><span id="removingNac" onclick="RemoveNacDiv(this)" >x</span></td></tr>')

                        $('#vnTableBody').append('<tr data-guid="0"><td><input type="text" id="srv"  value=\"Итого за ' + period + ':\"  "></td><td><input type="number"      style="width: 100%"></td><td><input type="text"      style="width: 100%"></td><td><input  type="number"   style="width: 100%" ></td><td><input type="number" style="width: 100%"></td><td><input  type="number" style="width: 100%"></td><td><input type="number" onkeyup="AddingNac(this)"  style="width: 100%"  id="Nac0"></td></tr>')
                    }
                    else {
                        $('#vnTableBody').find('tr:last').before('<tr data-guid="0"><td><input type="text" id="srv"></td><td><input type="number"      style="width: 100%"></td><td><input type="text"      style="width: 100%"></td><td><input  type="number"   style="width: 100%" ></td><td><input type="number" style="width: 100%"></td><td><input  type="number" style="width: 100%"></td><td><input type="number" onkeyup="AddingNac(this)"  style="width: 100%"  id="Nac0"></td><td><span id="removingNac" onclick="RemoveNacDiv(this)" >x</span></td></tr>')
                    }

                }
                else {

                    $('#Period').before('<label id="errPer" style="color:red">Необходимо заполнить</label>')
                    window.setTimeout(function () {
                        $('#errPer').remove()
                    }, 5000);
                }
                //var Servc = '<div class="col-md-12 Servc" data-total="0.00"><div class="col-md-1 "><label>Услуга:</label><input type="text" id="Service" onkeyup="AddingNac(this)" value="" style="width: 100%;"></div><div class="col-md-1 onbegin" style="margin-right: 48px;"><label style="">Остаток на начало периода:</label><input id="ONBEGIN" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width: 100%;" maxlength="6"></div><div class="col-md-1 payments"><label>Поступило</label><input id="PAYMENTS" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width: 100%;" maxlength="6"></div><div class="col-md-1 Volume"><label>Объем услуг</label><input id="VOLUME" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width: 100%;" maxlength="6"></div><div class="col-md-1 edizm"><label>Ед.изм.</label><select id="UNITS"><option>-</option><option>шт</option><option>м²</option><option>м³</option><option>см</option><option>п.м.</option><option>кг</option><option>г</option><option>л</option><option>мл</option><option>ч</option><option>сек</option></select></div><div class="col-md-1 tarif"><label>Тариф руб/ед.</label><input id="TARIFF" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width:100%;" maxlength="6"></div><div class="col-md-1 overall"><label>Начислено:</label><input id="OVERALL" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width:100%;"></div><div class="col-md-1 lgot"><label>Льготы субсидии</label><input id="LGOTA" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width: 100%;"></div><div class="col-md-1 recalc"><label>Перерасчеты (+/-)</label><input id="RECALC" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width: 100%;"></div><div class="col-md-1 overall2"><label>Итого Начислено</label><input id="OVERALL2" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width: 100%;"></div><div class="col-md-1 onend"><i class="fa fa-close removing3 removingNac3" onclick="removingNac3(this)" aria-hidden="true" style="cursor:pointer;margin-right: -2em;"></i><label>Итого к оплате руб.</label><input id="ONEND" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width: 100%;"></div></div>'
                //$('.modal-bodyVn').prepend(Servc);


                //if ($('.onend:last').children('.removingNac3').length == 0) {
                //    $('.onend:last').prepend('<i class="fa fa-close removing3 removingNac3"  onclick="removingNac3(this)" aria-hidden="true" style="cursor:pointer;margin-right: -2em;"></i>')

                //}


            })
            $('.tab-content #tab0').remove();
            $("#SaveUp").text("Сохранить");
            $("#plus").click(function () {
                var lastItm = $('.ls:last').attr('itemid')
                addTab(lastItm)
            })
            $("#DeletePOM").show();
            $("#DeletePOM").click(function () {
                $("#deleteO").val("Удалить");
                $("#cls").val("Отмена");
                alertWithButton2("Удалить помещение", "При удалении помещения будут удалены лицевые счета, счетчики и данные о собственниках, привязанные к данному помещению", "", "", "", apartId, Log);
            })
            $('#AddVp').click(function () {
                var Vps = [];
                $('.Vpdiv').each(function () {
                    var VpValue = $(this).children('div:eq(2)').children('#plat0').val();
                    var detail_ind_id = $(this).attr('itemid');
                    Vps.push({ "DETAIL_INF_ID": detail_ind_id, "PAYMENT_SUM": VpValue })
                })
                var score = $('.tab-content').children('.active').children('.row').children('div:eq(0)').children('#lc').val();
                var obj = { "pds": Vps, "generalPost": $('#sumplat').val(), 'sc': score }
                var tableId = $('.tab-content').children('.active').children('#Paying').children('#tab-4').children('.table').children('tbody').attr('id');
                tableId = '#' + tableId
                AddVPToNac(obj, tableId);

                //var tableId = $(e).parent().children('.table').children('tbody').attr('id');


                //GetRFP(score, tableId)
            })

            getRoomDetail(Log, apartId)
            $('.closeVp').click(function () {
                $('.Vpdiv').remove();
                $('#myModalVp').hide();
                $('#sumplat').val('')
            })


        }
    }
    if (loc == "/Manager/Apartments.aspx") {
        // SaveFCM('s', 's', 's', '', 's', '', 's', '')



        $('.ui-loader-background').show();
        $('#loader').show();
        sessionStorage.setItem("apart", null)
        getRoomForBase();
        gtTypeOfroomBase();
        getRoomNumbersBas(Log);
        GenerateQRCOde(Log)
        // getRoom(Log);
        var SMAsterObj = sessionStorage.getItem("SMAsterObj")
        if (SMAsterObj == null || SMAsterObj == undefined || SMAsterObj == 0) {
            getRoom(Log)
        }
        else {
            getRoomBYO_ID(Log, SMAsterObj)
        }




        $('#qr').click(function () {
            $('#myModal4').show()
            $('#myModal4').children('.modal-content2').children('.modal-header2').children('label').text('Выберите необходимый тип помещения')

            $('#myModal4').children('.modal-content2').children('.modal-body2,.modal-footer2').empty();

            GetRoomTypesFor_QRCodes(Log, $('#objsM').val());




            $('#myModal4').children('.modal-content2').children('.modal-footer2').append('<a id="qrAccept" onclick="CreateQrCode(this)"  class="btn genBtn qr" href="#">Применить</a>')
            $('#myModal4').children('.modal-content2').children('.modal-footer2').css('height', '50px')
        })
        $('#close_4').click(function () {
            $('#myModal4').hide()
        })

        $('#UplAcc').click(function () {
            //  ShowExcelByOpenXml('8b1083e3-eaab-4c9e-8818-d129225100a4.xlsx')// for SupplierServices
            //  SaveDatasFromExcel(428, 'eeed773d-409a-4c4e-ad68-51c041eccea9.xlsx', Log)
            if ($('#objsM').val() != 0) {
                $('#UploadAcc').show();
                $('#mh2').text('Загрузка лицевых счетов')
                //  ShowExcelByOpenXml('4bb24425-f617-4f05-818c-d73ae6fbabfa.xlsx')

            }
            else {
                if ($('#objsM_E').length == 0) {
                    $('#objsM').after('<label id="objsM_E" style="color:red">Необходимо выбрать объект</label>')
                }
            }

        })
        $('#closeUpl').click(function () {
            $('#UploadAcc').hide();
            $('#scores').empty();
            $('#files').val('');

            //$('#datatable_length,#datatable_filter,#datatable_info,#datatable_paginate').remove()
            //$('#loadLC2 table').removeAttr('role').removeAttr('aria-describedby').removeClass('dataTable').removeClass('no-footer')
            //$('#loadLC2 table thead tr th').removeClass('sorting').removeAttr('tabindex').removeAttr('aria-controls').removeAttr('colspan').removeAttr('rowspan').removeAttr('aria-label').removeAttr('style').removeAttr('aria-sort').removeAttr('style').removeAttr('class');
            //$('#loadLC2 table thead tr').removeAttr('role');
            //location.reload();


            //var table2 = $('#datatable').DataTable();

            //table2
            //    .clear()
            //    .draw();
            //$('#datatable').dataTable().fnClearTable();
            //  $('#datatable').dataTable({});
            //$('#datatable').dataTable({
            //    "bDestroy": false
            //});
            //    $("#datatable").DataTable()

            //$("#datatable").dataTable({
            //    paging: false,
            //    retrieve: true,
            //    searching: false
            //});

            //  $('#dataTable').dataTable().empty()
            //  $('#datatable').dataTable().fnClearTable();
            //  $("#dataTable").dataTable().fnDestroy();
            //   $("#dataTable").dataTable().remove();
            // $("#dataTable").dataTable().clear();
            //$("#dataTable").dataTable().reload();
            //  $("#dataTable").dataTable().emptyInit();
            // $("#datatable").dataTable().ajax.reload(null, false); 
            // $dataTable({data:""})
            //$("#dataTable").DataTable({
            //    ajax: "data.json"
            //});
            //var oTable = $('#datatable').dataTable();

            //// Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
            //oTable.fnClearTable();


            //var table = $('#loadLC2 table');
            //$('#datatable_wrapper').remove();
            //$('#loadLC2 div:eq(0)').after(table);
            //$('#loadLC table').remove();
        })
        $('#PassGen').click(function () {
            var SObj = $('#objsM').val();
            //  if (SObj != 0) {
            // ShowExcelByOpenXml("ebabbae0-1493-4932-8170-383df48905eb.xlsx")
            //  SaveAccFromExcel(393, "ebabbae0-1493-4932-8170-383df48905eb.xlsx");
            PassModal(SObj)
            //  }
            //   else {
            //   $('#objsM').after('<label id="objsM_E" style="color:red">Необходимо выбрать объект</label>')
            // }
        })
        $('#ObjAdr').change(function () {
            var objPss = $(this).val();
            getRoomBYO_ID2(Log, $(this).val())
            if (objPss != 0) {
                // $('#objsM').val(objPss);
                // $('#objsM').change();
                // $('#roomsPass').empty();
                //                for (var i = 0; i < $('#rooms tr').length; i++) {
                //    // var ss = ;
                //    // $('#roomsPass tr:eq(' + i + ') td:eq(0)').text();
                //    $('#roomsPass').append('<tr><td><input onclick=removechkerr(this) type="checkbox" value="' + $('#rooms tr:eq(' + i + ') td:eq(5)').text() + '"/></td><td>' + $('#rooms tr:eq(' + i + ') td:eq(5)').text() + '</td><td>' + $('#rooms tr:eq(' + i + ') td:eq(0)').text() + '</td><td>' + $('#rooms tr:eq(' + i + ') td:eq(1)').text() + '</td><td>' + $('#rooms tr:eq(' + i + ') td:eq(2)').text() + '</td></tr>')
                //    var lc = $('#rooms tr:eq(' + i + ') td:eq(5)').text()
                //    var twodata = $('#roomsPass tr td:contains('+lc+')').length
                //    if (i != 0) {
                //        if (twodata == 2) {
                //            // $('#roomsPass tr:eq(' + (i+1) + ')').remove();
                //            $('#roomsPass tr td:contains(' + lc + '):first').parent().remove()
                //        }
                //    }

                //    //$('#roomsPass tr:eq(' + i + ') td:eq(1)').text()
                //    //$('#roomsPass tr:eq(' + i + ') td:eq(2)').text()
                //    //$('#roomsPass tr:eq(' + i + ') td:eq(3)').text()

                //}
            }
        })
        $('#appPurp').click(function () {
            $('#appType').children().hide()
            $(this).children('input[type=checkbox]:checked').prop('checked', 'checked').each(function () {
                //   console.log('Selected checkbox value is : ' + $(this).attr('value'))
                var rmf = $(this).attr('value')
                $('#appType').children('input[type=checkbox][data-rmf="' + rmf + '"]').show()
                $('#appType').children('input[type=checkbox][data-rmf="' + rmf + '"]').next('label').show()
            })
            var chekcedLength = $(this).children('input[type=checkbox]:checked').length
            if (chekcedLength == 0) {
                $('#appType').children().show()

            }

        })


        // $('#roomPass').find('input[type="checkbox"]').click(function () { alert('ad') })
        $("#fltr").click(function () {
            var fltObj = [];
            var RM_FOR = []
            var RM_TYPE = []
            var RM_NUMBER = []

            var SRMF = $('.multiselect-selected-text:eq(0)').text().split(',');
            $('#appPurp input[type="checkbox"]').each(function () {
                if ($(this).is(':checked') == true) {
                    RM_FOR.push({ "ROOM_FOR": $(this).val() })
                }

            })

            if (RM_FOR.length == 0) {
                RM_FOR.push({ "ROOM_FOR": 0 })
            }
            ////console.log('rmfor / ' + JSON.stringify(RM_FOR))



            var nsn = $('.multiselect-selected-text:eq(1)').text()
            // if (nsn != 'Выберите тип помещения' && nsn != 'Выберите Тип помещения') {
            $('#appType input[type="checkbox"]').each(function () {
                if ($(this).is(':checked') == true) {
                    RM_TYPE.push({ "ROOM_TYPE": $(this).val() })
                }
            })
            if (RM_TYPE.length == 0) {
                RM_TYPE.push({ "ROOM_TYPE": 0 })
            }
            ////console.log('rmtip / ' + JSON.stringify(RM_TYPE))
            RM_NUMBER.push({ "ROOM_NUMBER": ($('#appNum').val().length == 0) ? null : $('#appNum').val() })

            var flt = []
            flt.push({
                "RM_FOR": RM_FOR, "RM_TYPE": RM_TYPE, "RM_NUMBER": RM_NUMBER, "FIRST_NAME": $("#fio").val(), "NUMBER": $("#persAcc").val()
            })
            // //console.log("ROOM_NUMBER / " + JSON.stringify(ROOM_NUMBER))
            //fltObj.push({ "ROOM_FOR_ID": ($("#appPurp").val() == 0) ? 0 : $("#appPurp").val(), "ROOM_TYPE_ID": ($("#appType").val() == 0) ? 0 : $("#appType").val(), "ROOM_NUMBER": ($("#appNum").val() == 0) ? null : $("#appNum").val(), "FIRST_NAME": $("#fio").val(), "NUMBER": $("#persAcc").val() })
            $('.ui-loader-background').show();
            $('#loader').show();
            makeFiltering(Log, flt, $('#objsM').val())

        })
        $("#sbros").click(function () {
            $("#appPurp,#appType").val(0)
            $('#appNum').val("")
            $("#fio,#persAcc").val("");
            $("#rooms").empty();
            $('#objsM').val(0);
            sessionStorage.setItem('SMAsterObj', '0')
            getRoom(Log);
            $('#appPurp input[type="checkbox"]').each(function () { $(this).prop('checked', false) })
            $('#appType input[type="checkbox"]').each(function () { $(this).prop('checked', false) })
        })


        $('#objsM').change(function () {

            if ($(this).val() != 0) {
                $('#objsM_E').remove();
                $('.ui-loader-background').show();
                $('#loader').show();
                getRoomBYO_ID(Log, $(this).val())
                sessionStorage.setItem("SMAsterObj", $(this).val())
                $('#appPurp input[type="checkbox"]').each(function () { $(this).prop('checked', false) })
                $('#appType input[type="checkbox"]').each(function () { $(this).prop('checked', false) })
                $("#fio,#persAcc").val("");
                $('#appNum').val("");
            }
            if ($(this).val() == 0) {
                // $('#objsM_E').remove();
                // getRoomBYO_ID(Log, $(this).val())
                $('#sbros').click();
                sessionStorage.setItem("SMAsterObj", $(this).val())
                getRoom(Log);
            }

        })


        $('#cancelLast,#closeUpl').click(function () {
            $('#errEx').remove();
            if ($('#scores tr').length != 0) {
                $('#deleteO').val('ДА');
                //$('#deleteO').val('ДА');
                $('#deleteO').click(function () {
                    //$('#closeUpl').click();

                    var table = $('#datatable').DataTable();

                    table.clear().draw();
                    $('#cls,#close_').click();
                    $('#UploadAcc').hide();
                    $('#flS').remove();
                    $('#mh2').show();

                })
                $('#myModal2 #mh2').text("");
                alertWithButton2("Вы Уверены", "Вы действительно хотите отменить данную операцию?", "", "", "", "", "")
            }
            else {
                $('#closeUpl').click();
            }

        })
        $("#files").change(function () {
            var obj = $("#objsM").val();
            if (obj != 0) {
                $('#objsM_E').remove();
                //  SaveAccFromExcel(obj, "");

                $("#loader").show();
                var filePath = $('#files').val();
                $("#files_E").remove();
                var index = filePath.lastIndexOf("\\") + 1;
                var filename = filePath.substr(index);
                var ext = this.value.split('.').pop();
                // //console.log(ext);
                if (ext == "xlsx" || ext == "xls") {
                    // $(document.body).attr('disabled', 'disabled');
                    $('.ui-loader-background').show();
                    $("#loader").show();
                    $('#errEx').remove();
                    //readU_RL(this, filename, obj);
                    readURL(this, filename, obj);
                    // $("#flS").hide();
                }
                else {
                    $('.ui-loader-background').hide();
                    $("#loader").hide();
                    $("#files").after('<label id="files_E" style="color:red">Неверный  формат файла</label>').show();
                }
            }
            else {
                $("#objsM").after('<label id="objsM_E" style="color:red">Необходимо выбрать объект</label>');
                $("#files").val("");
                $('#UploadAcc').hide();
                $('#scores').empty();
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }

        })
        $("#loadEx").click(function () {
            if ($('#scores tr').length != 0) {
                var exadr = $(this).attr('data-file');

                if (exadr != undefined) {
                    var obj = $("#objsM").val();
                    if (obj != 0) {
                        $('.ui-loader-background').show();
                        $("#loader").show();

                        var SCORE_ID = "";
                        var ROOM_NUMBER = "";
                        var ROOM_FOR_ID = "";
                        var ROOM_TYPE = "";
                        var ENTRANCE = "";
                        var OWNERSHIP_TYPE_ID = "";
                        var PHONE = "";
                        var EMAIL = "";
                        var SHARE = "";
                        var FIRST_NAME = "";
                        var LIVE_SQUARE = "";
                        var WITHOUT_SUMMER_SQUARE = "";
                        var Pass = "";
                        var success = true;
                        var table = $('#datatable').DataTable();


                        var pageLength = $('#datatable_paginate span a:last').text();
                        pageLength = parseInt(pageLength)
                        ////console.log()

                        for (var v = 1; v <= pageLength; v++) {
                            if (success == false) {
                                break;
                            }
                            $('#datatable_paginate span a[data-dt-idx="' + v + '"]').click();
                            var dataLenght = $('#scores tr').length;
                            for (var i = 0; i < dataLenght; i++) {

                                SCORE_ID = $('#scores tr:eq(' + i + ') td:eq(0)').text().trim();
                                var RoomFoorText = $('#scores tr:eq(' + i + ') td:eq(4)').text().trim();
                                if (SCORE_ID.length == 0 && RoomFoorText != 'Помещение общего пользования' && RoomFoorText != 'Обособленное нежилое помещение') {
                                    $('#datatable_paginate span a[data-dt-idx="' + v + '"]').click();
                                    $('#scores tr:eq(' + i + ') td:eq(0)').css('background-color', 'red');
                                    success = false;

                                    $('.ui-loader-background').hide();
                                    $("#loader").hide();
                                    ////console.log('scorede')
                                    break;
                                }

                                //   ENTRANCE = $('#scores tr:eq(' + i + ') td:eq(1)').text().trim();

                                //if (ENTRANCE.length != 0) {
                                //    if (!isNaN(ENTRANCE)) {
                                //        success
                                //    }
                                //}
                                ROOM_NUMBER = $('#scores tr:eq(' + i + ') td:eq(3)').text().trim();
                                if (ROOM_NUMBER.length == 0) {
                                    $('#datatable_paginate span a[data-dt-idx="' + v + '"]').click();
                                    $('#scores tr:eq(' + i + ') td:eq(3)').css('background-color', 'red');
                                    success = false
                                    $('.ui-loader-background').hide();
                                    $("#loader").hide();
                                    ////console.log('roomnumberde')
                                    break;
                                }

                                ROOM_FOR_ID = $('#scores tr:eq(' + i + ') td:eq(4)').text().trim();
                                if (ROOM_FOR_ID.length == 0) {
                                    $('#datatable_paginate span a[data-dt-idx="' + v + '"]').click();
                                    $('#scores tr:eq(' + i + ') td:eq(4)').css('background-color', 'red');
                                    success = false
                                    $('.ui-loader-background').hide();
                                    $("#loader").hide();
                                    ////console.log('rumforide')
                                    break;
                                }

                                ROOM_TYPE = $('#scores tr:eq(' + i + ') td:eq(5)').text().trim();
                                if (ROOM_TYPE.length == 0) {
                                    $('#datatable_paginate span a[data-dt-idx="' + v + '"]').click();
                                    $('#scores tr:eq(' + i + ') td:eq(5)').css('background-color', 'red');
                                    success = false
                                    $('.ui-loader-background').hide();
                                    $("#loader").hide();
                                    ////console.log('roomtypede')
                                    break;
                                }
                                var TypeSobs = $('#scores tr:eq(' + i + ') td:eq(6)').text().trim();
                                if (TypeSobs == "Долевая" && TypeSobs.length != 0) {
                                    $('#dol_Err').remove();
                                    var dol_value = $('#scores tr:eq(' + i + ') td:eq(9)').text().trim().replace(',', '.');
                                    dol_value = parseFloat(dol_value)
                                    if (dol_value <= 0 || dol_value >= 1) {
                                        $('#scores tr:eq(' + i + ') td:eq(9)').append('<label id="dol_Err" style="color:red">Некорректное значение</label>')
                                        success = false
                                        $('.ui-loader-background').hide();
                                        $("#loader").hide();
                                        ////console.log('roomtypede')
                                        break;
                                    }
                                }




                            }
                            if (success == true) {

                            }
                        }
                        if (success == true) {
                            // alert('OK')
                            SaveDatasFromExcel(obj, exadr, Log);
                        }
                        else {
                            $('#errEx').remove();
                            $('#sledUpLC').after('<label style="color:red" id="errEx">Для загрузки данных необходимо внести корректные данные в обязательные для заполнения поля</label>')
                            $('#files').val('');
                            $('.ui-loader-background').hide();
                            $("#loader").hide();
                        }


                        //  alert(dataLenght)
                        // 
                    }
                    else {
                        if ($('#objsM_E').length == 0) {

                            $("#objsM").after('<label id="objsM_E" style="color:red">Необходимо выбрать объект</label>');
                            $('#scores').empty();
                            $('#filesLC').val('')
                            $('#flS').remove();
                            $('#UploadAcc').hide()
                        }
                    }
                }
                else {
                    $("#cls,#deleteO").hide();
                    alertWithButton2("Ошибка", "Пожалуйста, выбирайте Excel файлы, соответствующие шаблону для загрузки", "", "", "", "", "")
                }
            }
            else {
                $('#filesLC').after('<label id="flS" style="color:red"> Cначала выберите файл excel</label>')
            }
        })
        $('#closeUpl').click(function () { $('#errEx').remove(); $('#filesLC').val('') })
        $('#bezPar').click(function () {
            $('#Errchk').remove()
            var scores = [];
            $('#roomsPass input[type="checkbox"]:checked').each(function () {
                scores.push({ "NUMBER": $(this).val() });

            })
            if ($(this).prop('checked') == true) {

                PassLess(Log, $('#ObjAdr').val(), scores)
                $('#prosrec').prop('checked', false)
            }
            else {
                $('#roomsPass').empty();
                getRoomBYO_ID2(Log, $('#ObjAdr').val(), scores)
                //for (var i = 0; i < $('#rooms tr').length; i++) {

                //    $('#roomsPass').append('<tr><td><input type="checkbox" value="' + $('#rooms tr:eq(' + i + ') td:eq(5)').text() + '"/></td><td>' + $('#rooms tr:eq(' + i + ') td:eq(5)').text() + '</td><td>' + $('#rooms tr:eq(' + i + ') td:eq(0)').text() + '</td><td>' + $('#rooms tr:eq(' + i + ') td:eq(1)').text() + '</td><td>' + $('#rooms tr:eq(' + i + ') td:eq(2)').text() + '</td></tr>')
                //}
            }
        })
        $('#prosrec').click(function () {
            $('#Errchk').remove()
            if ($(this).prop('checked') == true) {
                expiredTenants(Log, $('#ObjAdr').val())
                $('#bezPar').prop('checked', false)
            }
            else {
                $('#roomsPass').empty();
                getRoomBYO_ID2(Log, $('#ObjAdr').val())
                //for (var i = 0; i < $('#rooms tr').length; i++) {

                //    $('#roomsPass').append('<tr><td><input type="checkbox" value="' + $('#rooms tr:eq(' + i + ') td:eq(5)').text() + '"/></td><td>' + $('#rooms tr:eq(' + i + ') td:eq(5)').text() + '</td><td>' + $('#rooms tr:eq(' + i + ') td:eq(0)').text() + '</td><td>' + $('#rooms tr:eq(' + i + ') td:eq(1)').text() + '</td><td>' + $('#rooms tr:eq(' + i + ') td:eq(2)').text() + '</td></tr>')
                //}
            }
        })
        $('#sms2').click(function () {
            if ($(this).prop('checked') == true) {
                $(this).attr('data-ras', 'has')
            }
            else {
                $(this).attr('data-ras', 'has')
            }
        })
        $('#em2').click(function () {
            if ($(this).prop('checked') == true) {
                $(this).attr('data-ras', 'has')
            }
            else {
                $(this).attr('data-ras', 'has')
            }
        })

        $('#GenPassMass').click(function () {
            var scores = [];

            if ($('#ObjAdr').val() != 0) {
                $('#roomsPass input[type="checkbox"]:checked').each(function () {
                    scores.push({ "NUMBER": $(this).val() });
                })
                if (scores.length != 0) {

                    generatePassMass(scores, $('#ObjAdr').val(), $('#sms2').attr('data-ras'), $('#em2').attr('data-ras'), 0)
                }
                else {
                    if ($('#Errchk').length == 0) {
                        $('#loadLC .table').after('<span style="color:red" id="Errchk">Пожалуйста, выберите лицевые счета</span>')
                    }

                    // $("#Errchk").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                    $('#Errchk').fadeTo(100, 0.3, function () { $(this).fadeTo(500, 1.0); })
                }
            }
            else {
                $('#pssmssErr').remove();
                $('#ObjAdr').after('<label style="color:red" id="pssmssErr">Необходимо выбрать объект</label>')
                window.setTimeout(function () {
                    $('#pssmssErr').hide(1000);
                    $('#pssmssErr').remove();
                }, 3000);
            }
        })
    }
    if (loc == "/Manager/Counters.aspx") {
        $('.ui-loader-background').show();
        $('#rumNumF,#scF,#meterNumF').val('')
        $('#loader').show();

        var SMAsterObj = sessionStorage.getItem("SMAsterObj")
        if (SMAsterObj == null || SMAsterObj == undefined || SMAsterObj == 0) {
            getMeter(Log)
        }
        else {
            getMeterbyObject(Log, SMAsterObj)
            Get_Dead_Line(SMAsterObj)
        }
        getROomTYpeForfilter();
        $('#downCounter').click(function () {

            $('.ui-loader-background').show();
            $('#loader').show();
            GetCounters_For_Excel(Log)
        })
        GetMeterTypesFilter();
        //$('#rmTypeF').multiselect({

        //    includeSelectAllOption: true

        //});
        $('#rumNumF').keyup(function () {

            var value = $(this).val()
            if (value.indexOf('-') != -1) {
                value = value.replace('-', '')
                $(this).val(value)
            }
        })
        $('#meterNumF').keyup(function () {

            var value = $(this).val()
            if (value < 0) {
                value = value.replace('-', '')
                $(this).val(value)
            }
        })
        $('#arx').click(function () {
            var arxName = $(this).text();
            var objId = $('#objsM').val();
            if (arxName == 'Счетчики в архиве') {
                $(this).text('Активные счетчики')
                $('#mtrs').empty();
                $('.ui-loader-background').show();
                $('#loader').show();

                getArxMeter(Log, objId)
            }
            else {
                $(this).text('Счетчики в архиве')
                $('#mtrs').empty();
                $('.ui-loader-background').show();
                $('#loader').show();
                if (objId == 0) {
                    getMeter(Log)
                }
                else {
                    getMeterbyObject(Log, objId)
                }
            }
        })
        $('#loadExC').click(function () {
            $('.ui-loader-background').show();
            $('#loader').show();
            var SCORE_ID
            var METERS_NUMBER
            var TYPE
            var TYPE_ID
            var PREVIOUS_DATE
            var NEXT_DATE
            var AMUNT_TARIF
            var TARIF

            var OBJECT_ID
            var ROOM_TYPE

            var td = $('#cntrs tr td').length;
            var success = true;
            var mtrs = []
            var d = new Date();

            var month = d.getMonth() + 1;
            var day = d.getDate();

            var strDate = (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + d.getFullYear()
            strDate = strDate.split('-');
            var elekts = []
            var Lastpage = $('#tblCntrs_paginate span a:last').text();
            Lastpage = parseInt(Lastpage)
            //checking for empty field

            if (success == true) {

                for (var p = 1; p <= Lastpage; p++) {
                    $('#tblCntrs_paginate span a:contains(' + p + '):first').click();
                    var tr = $('#cntrs tr').length
                    for (var i = 0; i < tr; i++) {
                        if ($('#cntrs tr:eq(' + i + ') td:eq(2)').text() == "Электроэнергия") {
                            SCORE_ID = $('#cntrs tr:eq(' + i + ') td:eq(0)').text();
                            METERS_NUMBER = $('#cntrs tr:eq(' + i + ') td:eq(1)').text();
                            TYPE = $('#cntrs tr:eq(' + i + ') td:eq(2)').text()
                            TYPE_ID = (TYPE == "ГВС") ? "1" : (TYPE == "ХВС") ? "2" : (TYPE == "Теплоэнергия") ? "3" : (TYPE == "Электроэнергия") ? "4" : "5"

                            // TYPE_ID = $('#cntrs tr:eq(' + i + ') td:eq(6)').text()
                            PREVIOUS_DATE = $('#cntrs tr:eq(' + i + ') td:eq(3)').text().split('.')
                            PREVIOUS_DATE = PREVIOUS_DATE[2] + "-" + PREVIOUS_DATE[1] + "-" + PREVIOUS_DATE[0]
                            //  PREVIOUS_DATE = PREVIOUS_DATE.replace('.', '-').replace('.', '-');
                            NEXT_DATE = $('#cntrs tr:eq(' + i + ') td:eq(4)').text().split('.')
                            NEXT_DATE = NEXT_DATE[2] + "-" + NEXT_DATE[1] + "-" + NEXT_DATE[0]
                            AMUNT_TARIF = $('#cntrs tr:eq(' + i + ') td:eq(5)').text();
                            OBJECT_ID = $('#cntrs tr:eq(' + i + ') td:eq(7)').text();
                            ROOM_TYPE = $('#cntrs tr:eq(' + i + ') td:eq(8)').text().split('.')
                            ROOM_TYPE = ROOM_TYPE[2] + "-" + ROOM_TYPE[1] + "-" + ROOM_TYPE[0]


                            TYPE = $('#cntrs tr:eq(' + i + ') td:eq(6)').text()
                            elekts.push({ "SCORE_ID": SCORE_ID, "METERS_NUMBER": METERS_NUMBER, "TYPE": TYPE, "TYPE_ID": TYPE_ID, "PREVIOUS_DATE": PREVIOUS_DATE, "NEXT_DATE": NEXT_DATE, "AMUNT_TARIF": AMUNT_TARIF, "OBJECT_ID": OBJECT_ID, "ROOM_TYPE": ROOM_TYPE })
                        }
                        else {
                            SCORE_ID = $('#cntrs tr:eq(' + i + ') td:eq(0)').text();
                            METERS_NUMBER = $('#cntrs tr:eq(' + i + ') td:eq(1)').text();
                            TYPE = $('#cntrs tr:eq(' + i + ') td:eq(2)').text()
                            TYPE_ID = (TYPE == "ГВС") ? "1" : (TYPE == "ХВС") ? "2" : (TYPE == "Теплоэнергия") ? "3" : (TYPE == "Электроэнергия") ? "4" : "5"
                            //TYPE_ID = $('#cntrs tr:eq(' + i + ') td:eq(6)').text()
                            //TYPE_ID = (TYPE_ID == '-') ? 1 : TYPE_ID

                            PREVIOUS_DATE = $('#cntrs tr:eq(' + i + ') td:eq(3)').text().split('.')
                            PREVIOUS_DATE = PREVIOUS_DATE[2] + "-" + PREVIOUS_DATE[1] + "-" + PREVIOUS_DATE[0]
                            //  PREVIOUS_DATE = PREVIOUS_DATE.replace('.', '-').replace('.', '-');
                            NEXT_DATE = $('#cntrs tr:eq(' + i + ') td:eq(4)').text().split('.')
                            NEXT_DATE = NEXT_DATE[2] + "-" + NEXT_DATE[1] + "-" + NEXT_DATE[0]
                            AMUNT_TARIF = $('#cntrs tr:eq(' + i + ') td:eq(5)').text();
                            AMUNT_TARIF = (AMUNT_TARIF == '-') ? 1 : AMUNT_TARIF
                            OBJECT_ID = $('#cntrs tr:eq(' + i + ') td:eq(7)').text();
                            ROOM_TYPE = $('#cntrs tr:eq(' + i + ') td:eq(8)').text().split('.')
                            ROOM_TYPE = ROOM_TYPE[2] + "-" + ROOM_TYPE[1] + "-" + ROOM_TYPE[0]
                            mtrs.push({ "SCORE_ID": SCORE_ID, "METERS_NUMBER": METERS_NUMBER, "TYPE": TYPE, "TYPE_ID": TYPE_ID, "PREVIOUS_DATE": PREVIOUS_DATE, "NEXT_DATE": NEXT_DATE, "AMUNT_TARIF": AMUNT_TARIF, "OBJECT_ID": OBJECT_ID, "ROOM_TYPE": ROOM_TYPE })
                        }
                    }
                }
            }

            if (success == true) {
                // //console.log("Mtrs:")
                // //console.log(mtrs)

                //   //console.log("Eleks:")
                //  //console.log(elekts)
                //alert("Ok")
                // var lengt_h = $('#cntrs tr').text();
                //  //console.log(lengt_h)
                SaveMetterMass($('#objsM').val(), mtrs, elekts, Log)

            }
        })
        $('#uplCounter').click(function () {
            //    ShowInTable(428, 'ff0c80cf-4cdd-4f22-95fc-0806ff33758a.xlsx')
            if ($('#objsM').val() != 0) {

                $('#UploadCounter').show();

                //  getRoomCOuntforMtr($('#objsM').val())

            }
            else {
                $('#objsM_E').remove();
                $('#objsM').after('<label id="objsM_E" style="color:red">Необходимо выбрать объект</label>')
            }//5a82c21c-9aa5-4778-8953-79706f3311d5.xlsx
            //ShowInTable('177b53a6-145e-4645-8b07-7fec2ff8473b.xlsx')
            //$('#UploadCounter').show();
        })
        $('#deadLine').click(function () {
            if ($('#objsM').val() != 0) {
                $('#DeadLineCntr').show();
                var adres = $('#objsM option:selected').text();
                $('#mhDead').empty();
                $('#mhDead').text(adres);
            }
            else {
                $('#objsM_E').remove();
                $('#objsM').after('<label id="objsM_E" style="color:red">Необходимо выбрать объект</label>')
            }
        })
        $('#closeDead,#cancelDead').click(function () {
            $('#DeadLineCntr').hide();
        })
        $('#closeUplC,#cancelLast,#cancelLast:eq(1)').click(function () {
            // location.reload();
            //alert('hellko')

            $('#UploadCounter').children('.modal-content2').children('.modal-header2').children('#mh2:eq(1)').remove();
            $('#UploadCounter').children('.modal-content2').children('.modal-body2').children('#loadLC:eq(1)').remove();
            $('#UploadCounter').children('.modal-content2').children('.modal-footer2').children('#cancelLast:eq(1),#loadExC:eq(1)').remove();

            $('#UploadCounter').children('.modal-content2').children('.modal-header2').children('#mh2:eq(0)').show();
            $('#UploadCounter').children('.modal-content2').children('.modal-body2').children('#loadLC:eq(0)').show();
            $('#UploadCounter').children('.modal-content2').children('.modal-footer2').children('#cancelLast:eq(0),#loadExC:eq(0)').show();

            $('#filesUPLC').val('')
            $('#cntrs').empty();
            $('#flS,#ErrSpan,#Erra').remove();
            $('#UploadCounter').hide();

            // $('#tblCntrs_length,#tblCntrs_filter,#tblCntrs_info,#tblCntrs_paginate').remove();
            //$('#tblCntrs').removeAttr('class').removeAttr('role').removeAttr('aria-describedby')
            // $('#tblCntrs thead tr th').removeAttr('class').removeAttr('tabindex').removeAttr('aria-controls').removeAttr('rowspan').removeAttr('colspan').removeAttr('aria-sort').removeAttr('aria-label').removeAttr('style')
            //$('#tblCntrs thead tr').removeAttr('role')
            $('#cntrs').empty();
            $('.odd').remove();
            //  $('#tblCntrs').dataTable().fnClearTable();

            //var table = $('#tblCntrs');
            //table.addClass('table')

            //    $('#tblCntrs_wrapper').remove();
            //$('#loadLC div:eq(0)').after(table)

            var table = $('#tblCntrs').DataTable();
            table.destroy();
            $('#tblCntrs').children('#cntrs').empty();
        })
        $('#MeterFilter').click(function () {
            //$('.ui-loader-background').show();
            //$('#loader').show();
            var arx;
            if ($('#noArch').is(':checked') == true) {
                arx = "0"
            }
            else {

                arx = "1"
            }

            var RM_TYPE = []
            var Mflt = []
            $('#rmTypeF input[type="checkbox"]').each(function () {
                if ($(this).is(':checked') == true) {
                    RM_TYPE.push({ "ROOM_TYPE": $(this).val() })
                }
            })
            if (RM_TYPE.length == 0) {
                RM_TYPE.push({ "ROOM_TYPE": 0 })
            }

            var M_TYPE = []
            $('#mtrsTypeF input[type="checkbox"]').each(function () {
                if ($(this).is(':checked') == true) { M_TYPE.push({ "TYPE_ID": $(this).val() }) }
            })
            if (M_TYPE.length == 0) {
                M_TYPE.push({ "TYPE_ID": 0 })
            }
            $('#mtrs').empty();
            //var nsn2 = $('.multiselect-selected-text:eq(1)').text()
            //if (nsn2 != 'Выберите тип счетчика') {
            //    $('.multiselect-container:eq(1) .active a input[type="checkbox"]').each(function () {
            //        M_TYPE.push({ "TYPE_ID": $(this).val() })
            //    })
            //}
            //else {
            //    M_TYPE.push({ "TYPE_ID": 0 })

            //}
            // //console.log(JSON.stringify(M_TYPE))
            Mflt.push({ "RM_TYPE": RM_TYPE, "M_TYPE": M_TYPE, "ROOM_NUMBER": ($("#rumNumF").val() == 0) ? "0" : $("#rumNumF").val(), "NUMBER": ($("#scF").val().length == 0) ? "0" : $("#scF").val(), "METER_NUMBER": ($("#meterNumF").val().length == 0) ? "0" : $("#meterNumF").val() })
            //var fltObj = { "lg": Log, "ROOM_TYPE_ID": ($("#rmTypeF").val() == 0) ? "0" : $("#rmTypeF").val(), "ROOM_NUMBER": ($("#rumNumF").val() == 0) ? "0" : $("#rumNumF").val(), "TYPE_ID": ($("#mtrsTypeF").val() == 0) ? "0" : $("#mtrsTypeF").val(), "SCORE_ID": ($("#scF").val().length == 0) ? "0" : $("#scF").val(), "METERS_NUMBER": ($("#meterNumF").val().length == 0) ? "0" : $("#meterNumF").val(), "arx": arx };
            //fltObj.push({ "lg": Log, "ROOM_TYPE_ID": ($("#rmTypeF").val() == 0) ? "0" : $("#rmTypeF").val(), "ROOM_NUMBER": ($("#rumNumF").val() == 0) ? "0" : $("#rumNumF").val(), "TYPE_ID": ($("#mtrsTypeF").val() == 0) ? "0" : $("#mtrsTypeF").val(), "SCORE_ID": ($("#scF").val().length == 0) ? "0" : $("#scF").val(), "METERS_NUMBER": ($("#meterNumF").val().length == 0) ? "0" : $("#meterNumF").val() })
            $('.ui-loader-background').show();
            $('#loader').show();
            var objId_ = $('#objsM').val()
            makeMeterFilter(Log, Mflt, arx, objId_)
            //if (RM_TYPE.length == 0 && M_TYPE.length==0) {

            //}
            //else {

            //}

        })
        $('#ResetFilter').click(function () {
            $('#rmTypeF,#mtrsTypeF').val(0)
            $('#rumNumF,#scF,#meterNumF').val("");
            $('#mtrs').empty();
            $('#rmTypeF').children('input[type="checkbox"]').each(function () {
                $(this).prop('checked', false)
            })
            $('#mtrsTypeF').children('input[type="checkbox"]').each(function () {
                $(this).prop('checked', false)
            })
            $('#noArch').prop('checked', false);
            var objM = $('#objsM').val()
            if (objM == 0) {
                getMeter(Log);
            }
            else {
                getMeterbyObject(Log, objM)
            }
        })
        $(document).on('change', '#objsM', function () {
            sessionStorage.setItem("SMAsterObj", $(this).val())
            $('.ui-loader-background').show();
            $('#loader').show();
            var arxName = $('#arx').text();
            if (arxName == 'Активные счетчики') {
                getArxMeter(Log, $(this).val())
            }
            else {
                //  $('#arx').text('Счетчики в архиве')
                if ($(this).val() != 0) {
                    $('#objsM_E').remove();
                    $('#mtrs').empty()

                    getMeterbyObject(Log, $(this).val())
                    Get_Dead_Line($(this).val())
                    sessionStorage.setItem("SMAsterObj", $(this).val())
                }
                else {
                    $('#mtrs').empty()
                    getMeter(Log)
                }
                //$('.ui-loader-background').hide();
                //$('#loader').hide();
            }

        })
        $('#mb5').append('<div class="row"><div class="container"><div class="col-xs-12 col-sm-3"></div></div></div>')
        $('#mb5 .col-xs-12').load('AddCounter.aspx #pop')




        $(document).on('blur', '#nextControl', function () {
            var lst = $('#lstControl').val().split('-')
            var lstday = lst[2];
            var lstmnt = lst[1];
            var lstyear = lst[0];
            lstday = parseInt(lstday) + 1
            lstday = (lstday < 10) ? "0" + lstday : lstday
            var nextdate = lstyear + '-' + lstmnt + '-' + lstday;
            //var nxt = $(this).val().split('-');
            //var nxtday = nxt[2];
            //var nxtmnt = nxt[1];
            //var nxtyear = nxt[0];

            //if ($(this).val() <= $('#lstControl').val()) {
            //    
            //    $(this).val(nextdate)
            //}
            if ($(this).val().length != 0) {
                var nxt = $(this).val()
                var lstval = $('#lstControl').val()
                if (nxt <= lstval) {
                    $(this).val(nextdate)
                }
            }
            else {
                $(this).val(nextdate)
            }

        })
        $(document).on('change', '#lstControl', function () {
            if ($(this).val().length != 0) {
                var dtToday = new Date();

                var month = dtToday.getMonth() + 1;
                month = (month < 10) ? "0" + month : month
                var day = dtToday.getDate();
                day = (day < 10) ? "0" + day : day
                var year = dtToday.getFullYear();
                var maxDate = year + '-' + month + '-' + day;
                var thisval = $(this).val()
                if (thisval > maxDate) {
                    $(this).val(maxDate)
                }
            }
            else {
                getDateM();
            }
        })

        $(document).on('change', '#sc', function () { $('#Hsc').remove(); })

        $(document).on('change', '#meterNum', function () {
            $('#HmeterNum').remove();
            checkMeterNum($(this))

        })
        //$(document).on('blur', '#meterNum', function () {
        //    //  alert('awd')

        //})
        $(document).on('change', '#mtrsType', function () {
            $('#HmtrsType').remove();
            if ($(this).val() != 4) {
                $('#AmntTarif+br,#AmntTarif,#KolTarif,.TarifH,.Tarif').remove();
                if ($('#readingH1').length == 0) {

                    $('#nextControl').after('<label data-num="1" id="readingH1">Начальное показание</label><input type="number" data-num="1" min="0" onkeyup="PositiveValues(this)" id="reading1" style="width: 50%;">')
                }

            }
            else {
                if ($('#KolTarif').length != 1) {
                    $(this).after('<label id="KolTarif">Количество тарифов</label>')
                    $('#KolTarif').after('<input type="number" onkeyup="PositiveValues(this)" max="3" min=0 id="AmntTarif" style="width: 50%;"><br>')
                }

            }
        })

        $(document).on('change', '#currMdate', function () {
            //getDateM();
            if ($(this).val().length != 0) {
                var dtToday = new Date();

                var month = dtToday.getMonth() + 1;
                month = (month < 10) ? "0" + month : month
                var day = dtToday.getDate();
                day = (day < 10) ? "0" + day : day
                var year = dtToday.getFullYear();
                var maxDate = year + '-' + month + '-' + day;
                var thisval = $(this).val()
                if (thisval > maxDate) {
                    $(this).val(maxDate)
                }
            }
            else {
                getDateM();
            }
        })
        $(document).on('keyup', '#AmntTarif', function () {
            $('.modal-content2').css('height', '900px')
            if ($('#mtrsType').val() == 4) {
                $('#HAmntTarif').remove();
                $('label[data-num="1"]').remove();
                $('input[data-num="1"]').remove();
                var mntval = $(this).val();
                if (mntval > 3) {
                    mntval = 3
                    $(this).val(3)
                }
                if (mntval > 1) {
                    $('#readingH1,#reading1').remove();
                    for (var i = mntval; i >= 1; i--) {
                        $('#nextControl').after('<label data-num="1" class="TarifH" id="readingH' + i + '">Начальное показание T ' + i + '</label><input type="number" data-num="1"  min="0" onkeyup="PositiveValues(this)" class="Tarif" id="reading' + i + '" style="width: 50%;">')
                        var mch = $('#myModal5').children('div:eq(0)').css('height');
                        mch = mch.substring(0, mch.indexOf('p'));
                        mch = parseInt(mch) + 25;
                        mch = mch + 'px'
                        $('.modal-content2').css('height', mch)

                    }
                }
                if (mntval == "" || mntval == 0 || mntval == 1) {
                    $('label[data-num="1"]').remove();
                    $('input[data-num="1"]').remove();
                    $('#nextControl').after('<label data-num="1" class="TarifH"  id="readingH1">Начальное показание</label><input  type="number" min="0" onkeyup="PositiveValues(this)" class="Tarif"  data-num="1" id="reading1" style="width: 50%;">')
                    $('#myModal5 .modal-content2').css('height', '35vw')
                }
            }
        })
        $(document).on('change', '#files', function () {
            $("#loader").show();
            var filePath = $('#files').val();

            var index = filePath.lastIndexOf("\\") + 1;
            var filename = filePath.substr(index);
            var ext = this.value.split('.').pop();/*(extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT")*/
            // //console.log(ext);
            if (ext == "jpg" || ext == "png" || ext == "docx" || ext == "doc" || ext == "docx" || ext == "xls" || ext == "xlsx" || ext == "pdf" || ext == "PDF" || ext == "txt" || ext == "TXT") {
                readURL(this, filename);
                $("#flS").hide();
            }
            else {
                $('#flS').remove();
                $("#files").after('<label id="flS" style="color:red"> Неверный  формат файла</label>');
                $("#loader").hide();
            }
        })

        function readURL(input, imgName) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {


                    $('.foto-disp').attr('src', e.target.result);

                    //var nameImg = imgName
                    //var arrayBuffer = reader.result
                    //var bytes = new Uint8Array(arrayBuffer);
                    //var obj = { baseString: bytes, imgName: nameImg };
                    var formData = new FormData();
                    var file = document.getElementById("files").files[0];

                    formData.append('file', file, encodeURI(file.name));
                    formData.append('object_id', '1');
                    ////console.log(formData);



                    $.ajax({
                        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
                        type: "POST",
                        url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",//window.location.protocol + '//' + window.location.host + "
                        data: formData,
                        type: 'POST',
                        contentType: false,
                        processData: false,
                        cache: false,
                        timeout: 3600000,
                        crossDomain: true,
                        //async: false,
                        success: function (result) {
                            $("#loader").hide();
                            $("#files").hide();
                            var F_ile = result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/")
                            var extention = F_ile.substr(F_ile.lastIndexOf(".") + 1)
                            //
                            if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
                                $("#files").after('<img class="HistImg"  data-url="' + F_ile + '" src="' + F_ile + '"  ><i class="fa fa-close removing" onclick="removeFM(this)"  aria-hidden="true"></i>')
                            }
                            if (extention == "docx" || extention == "doc") {

                                $("#files").after('<img class="HistImg"  data-url="' + F_ile + '"  src="' + window.location.protocol + '//' + window.location.host + '/img/word.png"  ><i class="fa fa-close removing" onclick="removeFM(this)" aria-hidden="true"></i><h4  class="titleF2">' + file.name + '</h4>')
                            }
                            if (extention == "xlsx" || extention == "xls") {

                                $("#files").after('<img class="HistImg"  data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png"  ><i class="fa fa-close removing" onclick="removeFM(this)" aria-hidden="true"></i><h4  class="titleF2">' + file.name + '</h4>')
                            }
                            if (extention == "pdf" || extention == "PDF") {

                                $("#files").after('<img class="HistImg"  data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png"  ><i class="fa fa-close removing" onclick="removeFM(this)" aria-hidden="true"></i><h4  class="titleF2">' + file.name + '</h4>')
                            }
                            if (extention == "txt" || extention == "TXT") {

                                $("#files").after('<img class="HistImg"  data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png"><i class="fa fa-close removing" onclick="removeFM(this)" aria-hidden="true"></i><h4  class="titleF2">' + file.name + '</h4>')
                            }


                            var mch = $('.modal-content2').css('height');
                            mch = mch.substring(0, mch.indexOf('p'));
                            mch = parseInt(mch) + 35;
                            mch = mch + 'px'
                            $('.modal-content2').css('height', mch)




                        },

                        error: function (r) {

                            //  //alert("Error");
                            //  //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                            $("#loader").hide();
                            var filePath = $('#files').val();
                            var index = filePath.lastIndexOf("\\") + 1;
                            var filename = filePath.substr(index);
                            // readURL(input, filename)
                        },
                        complete: function (r) {
                            //var jsonEroorData = JSON.parse(r);

                            //if (r.readyState == 4 && r.status == 200) { //do something }; 
                            //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
                            //    $("#loader").hide();
                            //}
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });


                }


            }
        }




        $('#addCounter').click(function () {
            var objsM = $('#objsM').val();
            if (objsM != 0) {
                getDateM();
                GetMeterTypes();
                getRoomTYpeByO($('#objsM').val());
                if ($('#objsM_E').length == 0) {
                    $('#HAddC').text('asd')
                    PopupIframe('Добавить счетик по объекту "' + $('#objsM >option:selected').text() + '"', 'AddCounter.aspx', '#pop')

                }
            }
            else {
                if ($('#objsM_E').length == 0) {
                    $('#objsM').after('<label id="objsM_E" style="color:red">Необходимо выбрать объект</label>')
                }
            }
        })

        $(document).on('change', '#RoomType', function () {
            $('#HRoomType').remove();
            GetRoomNumber($('#objsM').val(), $(this).val())
        })
        $(document).on('change', '#RoomNum', function () {
            $('#HRoomNum').remove();
            getScore($(this).val())
        })

        $(document).on('click', '#pop #AddC', function () {
            var RoomType = $('#RoomType').val();
            if (RoomType != 0) {
                var RoomNum = $('#RoomNum option:selected').text();
                if (RoomNum != 0) {
                    var sc = $('#sc').val();
                    if (sc != 0 && sc != undefined) {
                        var meterNum = $('#meterNum').val()
                        if (meterNum.length != 0 && meterNum != 0) {
                            var mtrsType = $('#mtrsType').val();
                            if (mtrsType != 0) {
                                var AmntTarif = $('#AmntTarif').val();
                                AmntTarif = (AmntTarif == undefined) ? 1 : AmntTarif
                                if (AmntTarif != 0 && AmntTarif.length != 0) {
                                    var lstControl = $('#lstControl').val();
                                    var nextControl = $('#nextControl').val();
                                    var readings = []
                                    $('input[data-num="1"]').each(function () {
                                        var r = $(this).val()
                                        if (r.length != 0) {
                                            readings.push({ "VALUE_": r })
                                        }
                                        else {
                                            var lblIdErr = '#H' + $(this).attr('id');
                                            $(lblIdErr).remove();
                                            $(this).after('<label style="color:red" data-lbl="lblErr" id="H' + $(this).attr('id') + '">Необходимо заполнить поле "Начальное показание"</label>')

                                            window.setTimeout(function () {
                                                // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
                                                $(lblIdErr).hide(1000);
                                                $(lblIdErr).remove();
                                            }, 3000);
                                        }
                                    })
                                    if ($('label[data-lbl="lblErr"]').length == 0) {
                                        var HistImg = ($('.HistImg').length == 1) ? $('.HistImg').attr('data-url') : "";
                                        var IS_AUTO = ($('#is_auto').prop('checked') == true) ? "Y" : "N";
                                        var obj = { "ROOM_TYPE_ID": RoomType, "OBJECT_ID": $('#objsM').val(), "ROOM_NUMBER": RoomNum, "SCORE_ID": sc, "METERS_NUMBER": meterNum, "TYPE_ID": mtrsType, "AMUNT_TARIF": AmntTarif, "PREVIOUS_DATE": lstControl, "NEXT_DATE": nextControl, "InitialDate": $('#currMdate').val(), "file": HistImg, "METERS_VALUES": readings, "IS_AUTO": IS_AUTO }
                                        if ($('#HmeterNum').length == 0) {

                                            SaveMeter(obj);

                                        }
                                    }

                                }
                                else {
                                    $('#HAmntTarif').remove();
                                    $('#AmntTarif').after('<label style="color:red" id ="HAmntTarif"> Необходимо заполнить поле "Количество тарифов"</label>')
                                    window.setTimeout(function () {
                                        // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
                                        $('#HAmntTarif').hide(1000);
                                        $('#HAmntTarif').remove();
                                    }, 2000);
                                }
                            }
                            else {
                                $('#HmtrsType').remove();
                                $('#mtrsType').after('<label  style="color:red" id ="HmtrsType"> Необходимо выбрать тип счетчика</label>')
                                window.setTimeout(function () {
                                    // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
                                    $('#HmtrsType').hide(1000);
                                    $('#HmtrsType').remove();
                                }, 2000);
                            }
                        }
                        else {
                            $('#HmeterNum').remove();
                            $('#meterNum').after('<label style="color:red" id ="HmeterNum"> Необходимо заполнить поле "Номер счетчика"</label>')
                            window.setTimeout(function () {
                                // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
                                $('#HmeterNum').hide(1000);
                                $('#HmeterNum').remove();
                            }, 2000);
                        }

                    }
                    else {
                        $('#Hsc').remove()
                        $('#sc').after('<label style="color:red" id ="Hsc"> Необходимо выбрать ЛС</label>')
                        window.setTimeout(function () {

                            $('#Hsc').hide(1000);
                            $('#Hsc').remove();
                        }, 2000);
                    }
                }
                else {
                    $('#HRoomNum').remove()
                    $('#RoomNum').after('<label style="color:red" id ="HRoomNum"> Необходимо выбрать номер помещения</label>')
                    window.setTimeout(function () {

                        $('#HRoomNum').hide(1000);
                        $('#HRoomNum').remove();
                    }, 2000);
                }
            }
            else {
                $('#HRoomType').remove()
                $('#RoomType').after('<label style="color:red" id ="HRoomType"> Необходимо выбрать тип помещения</label>')
                window.setTimeout(function () {
                    // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
                    $('#HRoomType').hide(1000);
                    $('#HRoomType').remove();
                }, 2000);
            }
        })

    }
    if (loc == '/Manager/CreateNews.aspx') {
        CKEDITOR.replace('editor1', { height: 100 });
        getDateAndTime();
        getProjectNamebyLogin(Log);
        $('#backto').click(function () {
            window.location.href = 'NewsRegister.aspx';
        })
        var NewsGuid = sessionStorage.getItem('NewsGuid')
        if (NewsGuid != '') {
            GetNewsDetail(NewsGuid)
            $('#SaveNews').click(function () {
                var SuccessNews = true
                var dateNews = $('#dateNews').val();
                dateNews = dateNews.split('-').reverse().join('.')
                var timeNews = $('#timeNews').val();
                var HeaderText = $('#HeaderText').val()
                if (HeaderText.length == 0) {
                    $('#HeaderTextLbl').remove()
                    $('#HeaderText').prev().after('<label  id="HeaderTextLbl"style="color:red">Необходимо заполнит поле "Заголовок новости"</label>')
                    window.setTimeout(function () { $('#HeaderTextLbl').remove() }, 3000);
                    SuccessNews = false
                }
                var NewText = CKEDITOR.instances["NewText"].getData();
                if (NewText.length == 0) {
                    $('#NewTextLbl').remove()
                    $('#NewText').after('<label  id="NewTextLbl"style="color:red">Необходимо заполнит поле "Текст новости"</label>')
                    window.setTimeout(function () { $('#NewTextLbl').remove() }, 3000);
                    SuccessNews = false
                }
                var PreviewText = $('#PreviewText').val()
                if (PreviewText.length == 0) {
                    $('#PreviewTextLbl').remove()
                    $('#PreviewText').prev().after('<label  id="PreviewTextLbl"style="color:red">Необходимо заполнит поле "Краткий текст"</label>')
                    window.setTimeout(function () { $('#PreviewTextLbl').remove() }, 3000);
                    SuccessNews = false
                }
                var FileNews = ($('#FileNews').length != 0) ? $('#FileNews').parent().attr('href') : '';
                var fileName = ($('#FileNews').length != 0) ? $('#fileName').text() : '';
                var imgNews = ($('#imgNews').length != 0) ? $('#imgNews').attr('src') : '';
                var ImpNews = $('#ImpNews').prop('checked');
                var NewsFor = $("input[type='radio'][name='newsFor']:checked").attr('data-project');
                NewsFor = (NewsFor == undefined) ? '0' : NewsFor;
                var fixed = $('#fixed').prop('checked')

                if (SuccessNews == true) {
                    var Active = $('#Active').prop('checked')

                    $('.ui-loader-background').show();
                    $('#loader').show();
                    UpdateNews(dateNews, timeNews, NewText, PreviewText, HeaderText, FileNews, fileName, imgNews, ImpNews, NewsFor, Log, Active, fixed, NewsGuid)
                }
            })
            $('#SavePublish').click(function () {
                var SuccessNews = true
                var dateNews = $('#dateNews').val();
                dateNews = dateNews.split('-').reverse().join('.')
                var timeNews = $('#timeNews').val();
                var HeaderText = $('#HeaderText').val()
                if (HeaderText.length == 0) {
                    $('#HeaderTextLbl').remove()
                    $('#HeaderText').prev().after('<label  id="HeaderTextLbl"style="color:red">Необходимо заполнит поле "Заголовок новости"</label>')
                    window.setTimeout(function () { $('#HeaderTextLbl').remove() }, 3000);
                    SuccessNews = false
                }
                var NewText = CKEDITOR.instances["NewText"].getData();
                if (NewText.length == 0) {
                    $('#NewTextLbl').remove()
                    $('#NewText').after('<label  id="NewTextLbl"style="color:red">Необходимо заполнит поле "Текст новости"</label>')
                    window.setTimeout(function () { $('#NewTextLbl').remove() }, 3000);
                    SuccessNews = false
                }
                var PreviewText = $('#PreviewText').val()
                if (PreviewText.length == 0) {
                    $('#PreviewTextLbl').remove()
                    $('#PreviewText').prev().after('<label  id="PreviewTextLbl"style="color:red">Необходимо заполнит поле "Краткий текст"</label>')
                    window.setTimeout(function () { $('#PreviewTextLbl').remove() }, 3000);
                    SuccessNews = false
                }
                var FileNews = ($('#FileNews').length != 0) ? $('#FileNews').parent().attr('href') : '';
                var fileName = ($('#FileNews').length != 0) ? $('#fileName').text() : '';
                var imgNews = ($('#imgNews').length != 0) ? $('#imgNews').attr('src') : '';
                var ImpNews = $('#ImpNews').prop('checked');
                var NewsFor = $("input[type='radio'][name='newsFor']:checked").attr('data-project');
                NewsFor = (NewsFor == undefined) ? '0' : NewsFor;
                var fixed = $('#fixed').prop('checked')

                if (SuccessNews == true) {
                    $('.ui-loader-background').show();
                    $('#loader').show();
                    UpdateNews(dateNews, timeNews, NewText, PreviewText, HeaderText, FileNews, fileName, imgNews, ImpNews, NewsFor, Log, true, fixed, NewsGuid)
                }
            })
        }
        else {
            $('#SavePublish').click(function () {
                var SuccessNews = true
                var dateNews = $('#dateNews').val();
                dateNews = dateNews.split('-').reverse().join('.')
                var timeNews = $('#timeNews').val();
                var HeaderText = $('#HeaderText').val()
                if (HeaderText.length == 0) {
                    $('#HeaderTextLbl').remove()
                    $('#HeaderText').prev().after('<label  id="HeaderTextLbl"style="color:red">Необходимо заполнит поле "Заголовок новости"</label>')
                    window.setTimeout(function () { $('#HeaderTextLbl').remove() }, 3000);
                    SuccessNews = false
                }
                var NewText = CKEDITOR.instances["NewText"].getData();
                if (NewText.length == 0) {
                    $('#NewTextLbl').remove()
                    $('#NewText').after('<label  id="NewTextLbl"style="color:red">Необходимо заполнит поле "Текст новости"</label>')
                    window.setTimeout(function () { $('#NewTextLbl').remove() }, 3000);
                    SuccessNews = false
                }
                var PreviewText = $('#PreviewText').val()
                if (PreviewText.length == 0) {
                    $('#PreviewTextLbl').remove()
                    $('#PreviewText').prev().after('<label  id="PreviewTextLbl"style="color:red">Необходимо заполнит поле "Краткий текст"</label>')
                    window.setTimeout(function () { $('#PreviewTextLbl').remove() }, 3000);
                    SuccessNews = false
                }
                var FileNews = ($('#FileNews').length != 0) ? $('#FileNews').parent().attr('href') : '';
                var fileName = ($('#FileNews').length != 0) ? $('#fileName').text() : '';
                var imgNews = ($('#imgNews').length != 0) ? $('#imgNews').attr('src') : '';
                var ImpNews = $('#ImpNews').prop('checked');
                var NewsFor = $("input[type='radio'][name='newsFor']:checked").attr('data-project');
                NewsFor = (NewsFor == undefined) ? '0' : NewsFor;
                var fixed = $('#fixed').prop('checked')

                if (SuccessNews == true) {
                    $('.ui-loader-background').show();
                    $('#loader').show();
                    SaveNews(dateNews, timeNews, NewText, PreviewText, HeaderText, FileNews, fileName, imgNews, ImpNews, NewsFor, Log, true, fixed)
                }
            })
            $('#SaveNews').click(function () {
                var SuccessNews = true
                var dateNews = $('#dateNews').val();
                dateNews = dateNews.split('-').reverse().join('.')
                var timeNews = $('#timeNews').val();
                var HeaderText = $('#HeaderText').val()
                if (HeaderText.length == 0) {
                    $('#HeaderTextLbl').remove()
                    $('#HeaderText').prev().after('<label  id="HeaderTextLbl"style="color:red">Необходимо заполнит поле "Заголовок новости"</label>')
                    window.setTimeout(function () { $('#HeaderTextLbl').remove() }, 3000);
                    SuccessNews = false
                }
                var NewText = CKEDITOR.instances["NewText"].getData();
                if (NewText.length == 0) {
                    $('#NewTextLbl').remove()
                    $('#NewText').after('<label  id="NewTextLbl"style="color:red">Необходимо заполнит поле "Текст новости"</label>')
                    window.setTimeout(function () { $('#NewTextLbl').remove() }, 3000);
                    SuccessNews = false
                }
                var PreviewText = $('#PreviewText').val()
                if (PreviewText.length == 0) {
                    $('#PreviewTextLbl').remove()
                    $('#PreviewText').prev().after('<label  id="PreviewTextLbl"style="color:red">Необходимо заполнит поле "Краткий текст"</label>')
                    window.setTimeout(function () { $('#PreviewTextLbl').remove() }, 3000);
                    SuccessNews = false
                }
                var FileNews = ($('#FileNews').length != 0) ? $('#FileNews').parent().attr('href') : '';
                var fileName = ($('#FileNews').length != 0) ? $('#fileName').text() : '';
                var imgNews = ($('#imgNews').length != 0) ? $('#imgNews').attr('src') : '';
                var ImpNews = $('#ImpNews').prop('checked');
                var NewsFor = $("input[type='radio'][name='newsFor']:checked").attr('data-project');
                NewsFor = (NewsFor == undefined) ? '0' : NewsFor;
                var fixed = $('#fixed').prop('checked')

                if (SuccessNews == true) {
                    SaveNews(dateNews, timeNews, NewText, PreviewText, HeaderText, FileNews, fileName, imgNews, ImpNews, NewsFor, Log, false, fixed)
                }
            })
        }

        $("#filesN").change(function () {




            $("#loader").show();
            $('.ui-loader-background').show();
            var filePath = $('#filesN').val();

            var index = filePath.lastIndexOf("\\") + 1;
            var filename = filePath.substr(index);
            var ext = this.value.split('.').pop();
            ext = ext.toLowerCase()
            if (ext == "png" || ext == "jpg") {
                $('.ui-loader-background').show();
                $("#loader").show();
                $('#errEx,#files_E').remove();

                readURLNews(this, filename);
            }
            else {
                $('.ui-loader-background').hide();
                $("#loader").hide();
                $("#filesN").after('<label id="files_E" style="color:red">(png*, jpg*)</label>').show();
            }



        })
        $("#NewsFile").change(function () {




            $("#loader").show();
            $('.ui-loader-background').show();
            var filePath = $('#NewsFile').val();

            var index = filePath.lastIndexOf("\\") + 1;
            var filename = filePath.substr(index);
            var ext = this.value.split('.').pop();


            $('.ui-loader-background').show();
            $("#loader").show();
            $('#errEx').remove();
            readURLNews(this, filename);




        })


        $('#closebnp').click(function () {
            $('#ModalBNP').children('.modal-contentBnp').children('.modal-bodybnp').children('div:eq(1)').remove();
            $('#ModalBNP').children('.modal-contentBnp').children('.modal-headerBnp').children('h2:eq(1)').remove();
            $('#ModalBNP').children('.modal-contentBnp').children('.modal-bodybnp').children('#loadBnP').show();
            $('#ModalBNP').children('.modal-contentBnp').children('.modal-headerBnp').children('h2').show();
            $('#ModalBNP').hide();
        })
        $('#ShowNews').click(function () {
            var NewText = CKEDITOR.instances["NewText"].getData();
            var SuccessNews = true
            var dateNews = $('#dateNews').val();
            dateNews = dateNews.split('-').reverse().join('.')
            if (NewText.length == 0) {
                $('#NewTextLbl').remove()
                $('#NewText').after('<label  id="NewTextLbl"style="color:red">Необходимо заполнит поле "Текст новости"</label>')
                window.setTimeout(function () { $('#NewTextLbl').remove() }, 3000);
                SuccessNews = false
            }
            var imgNews = ($('#imgNews').length != 0) ? $('#imgNews').attr('src') : '';
            var PreviewText = $('#PreviewText').val()

            if (PreviewText.length == 0) {
                $('#PreviewTextLbl').remove()
                $('#PreviewText').prev().after('<label  id="PreviewTextLbl"style="color:red">Необходимо заполнит поле "Краткий текст"</label>')
                window.setTimeout(function () { $('#PreviewTextLbl').remove() }, 3000);
                SuccessNews = false
            }

            var HeaderText = $('#HeaderText').val()

            if (HeaderText.length == 0) {
                $('#HeaderTextLbl').remove()
                $('#HeaderText').prev().after('<label  id="HeaderTextLbl"style="color:red">Необходимо заполнит поле "Краткий текст"</label>')
                window.setTimeout(function () { $('#HeaderTextLbl').remove() }, 3000);
                SuccessNews = false
            }
            if (SuccessNews == true) {
                $('#ModalBNP').children('.modal-contentBnp').children('.modal-bodybnp').css('width', '100%')
                $('#ModalBNP').children('.modal-contentBnp').children('.modal-bodybnp').children('#loadBnP').hide();
                $('#ModalBNP').children('.modal-contentBnp').children('.modal-headerBnp').children('h2').hide();
                $('#ModalBNP').children('.modal-contentBnp').children('.modal-headerBnp').children('#closebnp').css('height', '42px')
                $('#ModalBNP').children('.modal-contentBnp').children('.modal-headerBnp').css('height', '6px')
                //$('#ModalBNP').children('.modal-contentBnp').children('.modal-headerBnp').append('<h2 style="color:black">' + PreviewText+'</h2>')
                //$('#ModalBNP').children('.modal-contentBnp').children('.modal-bodybnp').append('<div>' + NewText + '</div>')
                //$('#ModalBNP').children('.modal-contentBnp').children('.modal-bodybnp').find('h2').css('color', 'black')
                //$('#ModalBNP').children('.modal-contentBnp').children('.modal-bodybnp').children('div:eq(1)').append('<input type="button" onclick="closeNewsPreview(this)" id="newsCansel" value="Отмена" style="float: right;background: white;font-size: 18px;width: 103px;">')
                $('#ModalBNP').children('.modal-contentBnp').children('.modal-bodybnp').append('<div class="newsChunk" ><h4><span class="newsDate">' + dateNews + '</span>' + HeaderText + '</h4><img src="' + imgNews + '" style="float: left; margin: 5px 10px 0 0; height: 8.5em; width: auto;" /><p id="Ptext">' + PreviewText + '...<a onclick="ShowMore()">Подробнее</a></a></p><div style="margin-top: 6%;"><input type="button" onclick="closeNewsPreview(this)" id="newsCansel" value="Отмена" style="float: right;background: white;font-size: 18px;width: 103px;"><input type="button" onclick="SaveNews2(this)" id="newsCansel" value="Сохранить новость" style="float: right;background: white;font-size: 18px;width: auto;margin-right: 3%;margin-left: 3%;"><input type="button" onclick="PublishNews2(this)" id="newsCansel" value="Опубликовать новость" style="float: right;background: white;font-size: 18px;width: auto;"></div></div>')
                if (imgNews.length == 0) {
                    $('.newsChunk').children('img').remove();
                }
                $('#ModalBNP').show();
            }
        })

    }
    if (loc == '/Manager/NewsRegister.aspx') {
        GetNewsRegister(Log);
        sessionStorage.setItem('NewsGuid', '')

    }
    if (loc == "/Manager/CounterCard.aspx") {
        var mid = sessionStorage.getItem("mid")
        if (mid == null) {
            window.location.href = "Counters.aspx"
        }
        else {
            $('#tab1 .row:eq(0) select').attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)');
            $('#tab1 .row:eq(0) input[type="number"],input[type="text"],input[type="date"]').attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)')
            //$('#tab1 .row:eq(1) .btn').attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)')

            $('#SaveUp').click(function () {
                if ($(this).text() == "Редактировать") {
                    //  $('#tab1 .row:eq(0) select').removeAttr('disabled').removeAttr('style');
                    $('#tab1 .row:eq(0) input[type="date"]').removeAttr('disabled').removeAttr('style')
                    $('#is_auto').removeAttr('disabled', 'disabled');
                    $('#TRoomC,#roomNum,#Ps,#nxt,#lst').attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)');
                    //$('#MeterN').removeAttr('disabled').removeAttr('style')
                    $('#Ps').removeAttr('disabled').removeAttr('style')
                    if ($('#tab1 .row:eq(1) .table tbody tr td').length != 0) {
                        $('#TMeterC').attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)');
                        $('#amT').attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)');
                    }

                    //var d = new Date();
                    //var strDate = d.getDate() + "." + d.getMonth() + "." + d.getFullYear();
                    //var nxtVal = $('#nxt').val().split('-');
                    //nxtVal = nxtVal[2] + '.' + nxtVal[1] + '.' + nxtVal[0];
                    //// //console.log(nxtVal + "/" + strDate);
                    //if (nxtVal > strDate) {
                    //    //  //console.log("boyuk")
                    //    $('#tab1 .row:eq(1) .btn').attr('disabled', 'disabled').css('background-color', 'rgb(149,153,156)')
                    //}
                    //else {
                    //    // //console.log("kicik")
                    //    $('#tab1 .row:eq(1) .btn').removeAttr('disabled').removeAttr('style')

                    //} 
                    $(this).text('Сохранить')
                }

                else {

                    // var object = {"METERS_ID, METERS_NUMBER, AMUNT_TARIF,PREVIOUS_DATE,NEXT_DATE,TYPE_ID,ROOM_NUMBER,ROOM_TYPE_ID,SCORE_ID":}
                    if (true)//$('#TRoomC').val() != 0 
                    {

                        if (true)//$('#roomNum').val() != 0
                        {
                            if (true)//$('#Ps').val() != 0
                            {

                                if ($('#MeterN').val().length != 0 && $('#MeterN').val() != 0) {
                                    var IS_AUTO = ($('#is_auto').prop('checked') == true) ? 'Y' : 'N';
                                    var object = { "METERS_ID": mid, "ROOM_TYPE_ID": $('#TRoomC').val(), "ROOM_NUMBER": $('#roomNum').val(), "SCORE_ID": $('#Ps').val(), "METERS_NUMBER": $('#MeterN').val(), "TYPE_ID": $('#TMeterC').val(), "AMUNT_TARIF": $('#amT').val(), "PREVIOUS_DATE": $('#lst').val(), "NEXT_DATE": $('#nxt').val(), 'IS_AUTO': IS_AUTO }
                                    UpdateMeter(object)
                                }
                                else {
                                    $('#MeterN').after('<label id="ErrmN" style="color:red">Необходимо заполнить поле "Номер счетчика"</label')
                                    window.setTimeout(function () {
                                        $('#ErrmN').hide(1000);
                                        $('#ErrmN').remove();
                                    }, 3000);
                                }
                            }
                            else {
                                $('#HPs').remove()
                                $('#Ps').after('<label style="color:red" id="HPs">Необходимо выбрать "Лицевой счет"</label>')
                                window.setTimeout(function () {
                                    $('#HPs').hide(1000);
                                    $('#HPs').remove();
                                }, 3000)
                            }
                        }
                        else {
                            $('#HroomNum').remove();
                            $('#roomNum').after('<label id="HroomNum" style="color:red">Необходимо выбрать "Номер помещения"<label>')
                            window.setTimeout(function () {
                                $('#HroomNum').hide(1000);
                                $('#HroomNum').remove();
                            }, 3000)
                        }
                    }
                    else {
                        $('#HTRoomC').remove()
                        $('#TRoomC').after('<label style="color:red" id="HTRoomC">Необходимо выбрать "Тип помещения"</label>')
                        window.setTimeout(function () {
                            $('#HTRoomC').hide(1000);
                            $('#HTRoomC').remove();
                        }, 3000)
                    }

                }

            })
            //  getROomTYpeCardC("");
            //   GetMeterTypesCard("")
            getMeterCard(mid);
            getHistoryMeter(mid)


            $('#nxt').on("keyup change", function () {
                var d = new Date();
                var strDate = d.getDate() + "." + d.getMonth() + "." + d.getFullYear();
                var nxtVal = $(this).val()
                if (nxtVal.length != 0) {
                    nxtVal = nxtVal.split('-');
                    nxtVal = nxtVal[2] + '.' + nxtVal[1] + '.' + nxtVal[0];
                    // //console.log(nxtVal + "/" + strDate);
                    if (nxtVal > strDate) {
                        //  //console.log("boyuk")
                        $('#tab1 .row:eq(1) .btn').attr('disabled', 'disabled').css('background-color', 'rgb(149,153,156)')
                    }
                    else {
                        // //console.log("kicik")
                        $('#tab1 .row:eq(1) .btn').removeAttr('disabled').removeAttr('style')

                    }
                }
                else {
                    $(this).val($(this).attr('value'))
                }
            })
            $('#lst').on("keyup change", function () {
                if ($(this).val().length == 0) {
                    $(this).val($(this).attr('value'))
                }
            })
            $(document).on('change', '#lstControlZ,#dataPokz', function () {
                var lstZ = $(this).val();
                if (lstZ.length != 0) {
                    //var dtToday = new Date();

                    //var month = dtToday.getMonth() + 1;
                    //var day = dtToday.getDate();
                    //var year = dtToday.getFullYear();

                    //if (month < 10)
                    //    month = '0' + month.toString();
                    //if (day < 10)
                    //    day = '0' + day.toString();
                    //var dayNe = parseInt(day)
                    //dayNe = (dayNe < 10) ? '0' + dayNe : dayNe;
                    //var dateOfNextControl = year + '-' + month + '-' + dayNe;
                    //$('#lstControlZ,#dataPokz').val(dateOfNextControl);

                }
                else {
                    $(this).val(getDateM())
                }

            })
            $('#nxtControlZ').change(function () {
                var nxtdate_ = $(this).val()
                if (nxtdate_.length != 0) {
                    var lst = $('#lstControlZ').val()
                    lst = lst.split('-');
                    var lstday = lst[2];
                    var lstmnt = lst[1];
                    var lstyear = lst[0];

                    var nxt = $(this).val().split('-');
                    var nxtday = nxt[2];
                    var nxtmnt = nxt[1];
                    var nxtyear = nxt[0];

                    if ($(this).val() <= $('#lstControlZ').val()) {
                        lstday = parseInt(lstday) + 1
                        lstday = (lstday < 10) ? '0' + lstday : lstday
                        var nextdate = lstyear + '-' + lstmnt + '-' + lstday;
                        $(this).val(nextdate)
                    }
                }
                else {
                    $('#nxtControlZ').val($('#nxtControlZ').attr("value"))
                }

            })
            //$('#OtmenZ').click(function () { $('#close_Z').click() })
            $(document).on('click', '#OtmenZ', function () { $('#close_Z').click() })
            $('#zamen').click(function () {

                PopupZamen("Orxan", "Orxan", "")
            })
            $(document).on('keyup', '#newCounterNum', function () {
                $('#HmeterNum').remove();
                checkMeterNum($(this))
            })
            $(document).on('change', '#DRemove', function () {
                if ($(this).val().length != 0) {
                    var d = new Date();
                    var strDate = new Date(Date.now()).toLocaleString()
                    strDate = strDate.slice(0, 10)// d.getDate() + "." + d.getMonth() + "." + d.getFullYear();

                    var DRemove = $(this).val().split('-');
                    DRemove = DRemove[2] + '.' + DRemove[1] + '.' + DRemove[0];
                    if (ComputeBiggerDate(DRemove, strDate, '.') == 1) {
                        $(this).val(getDateM);
                    }

                }
                else {
                    $(this).val(getDateM);
                }
            })
            $(document).on('change', '#Sdate', function () {
                if ($(this).val().length != 0) {
                    var d = new Date();
                    var strDate = new Date(Date.now()).toLocaleString()
                    strDate = strDate.slice(0, 10)// d.getDate() + "." + d.getMonth() + "." + d.getFullYear();

                    var DRemove = $(this).val().split('-');
                    DRemove = DRemove[2] + '.' + DRemove[1] + '.' + DRemove[0];
                    if (ComputeBiggerDate(DRemove, strDate, '.') == 1) {
                        $(this).val(getDateM);
                    }

                }
                else {
                    $(this).val(getDateM);
                }
            })
            $(document).on('click', '#ChangeC', function () {
                var success = true
                var obj = "";

                if ($('#newCounterNum').val().length != 0) {
                    var readings = []
                    $('input[data-num="1"]').each(function () {
                        var r = $(this).val()
                        if (r.length != 0 && r != 0) {
                            readings.push({ "VALUE_": r })
                        }
                        else {
                            $(this).after('<label style="color:red" data-lbl="lblErr" id="ErrmN">Необходимо заполнить поле "Начальное показание"</label>')
                            window.setTimeout(function () {
                                $('#ErrmN').hide(1000);
                                $('#ErrmN').remove();
                            }, 3000);
                            success = false
                        }
                    })
                }
                else {
                    success = false
                    $('#newCounterNum').after('<label id="ErrmN" style="color:red">Необходимо заполнить поле "Номер нового счетчика"</label')
                    window.setTimeout(function () {
                        $('#ErrmN').hide(1000);
                        $('#ErrmN').remove();
                    }, 3000);
                }
                if ($('#changeCounter .HistImg').length == 0) {
                    success = false;
                    $('#flS').remove();
                    $('#file_Z').after('<label id="flS" style="color:red"> Для замены счетчика необходимо прикрепить подтверждающий документ</label>')
                }
                if ($('#HmeterNum').length != 0) {
                    success = false
                }
                if (success == true) {
                    if ($('#istPok').attr('data-active') != 1) {
                        if ($('#typeCountZ').val() == 4) {
                            if ($('#Elekt_T3').length != 0) {
                                AddMeterVal("", mid, "T1", $('#oldCNum').val(), $('#NacPokZT1').val(), "");
                                AddMeterVal("", mid, "T2", $('#oldCNum').val(), $('#NacPokZT2').val(), "");
                                AddMeterVal("", mid, "T3", $('#oldCNum').val(), $('#NacPokZT3').val(), "");
                            }
                            if ($('#Elekt_T2').length != 0) {
                                AddMeterVal("", mid, "T1", $('#oldCNum').val(), $('#NacPokZT1').val(), "");
                                AddMeterVal("", mid, "T2", $('#oldCNum').val(), $('#NacPokZT2').val(), "");

                            }
                            if ($('#Elekt_T1').length != 0) {
                                AddMeterVal(e, mid, "T1", $('#oldCNum').val(), $('#NacPokZT1').val(), "");


                            }
                        }
                        else {
                            var PrevClstData = $('#PrevClstData').val()
                            var meterType = $("#typeCountZ :selected").text();
                            AddMeterVal("", mid, meterType, $('#oldCNum').val(), PrevClstData, "");
                        }
                    }
                    var HistImg = ($('.HistImg').length == 1) ? $('.HistImg').attr('data-url') : "";
                    var o_bj = { "mid": mid, "ROOM_TYPE_ID": $('#TRoomC').val(), "OBJECT_ID": $('#meterNum').attr('data-obj'), "ROOM_NUMBER": $('#rmNumZ').val(), "SCORE_ID": $('#PsZ').val(), "METERS_NUMBER": $('#newCounterNum').val(), "TYPE_ID": $('#typeCountZ').val(), "AMUNT_TARIF": ($('#typeCountZ').val() != 4) ? 1 : $('#amTZN').val(), "PREVIOUS_DATE": $('#lstControlZ').val(), "NEXT_DATE": $('#nxtControlZ').val(), "InitialDate": $('#dataPokz').val(), "file": HistImg, "METERS_VALUES": readings, 'PrevnxtZ': $('#PrevnxtZ').val() }
                    //SaveMeter(o_bj);
                    MakeArxive(o_bj)
                }
            })
            $('#OkP').click(function () {
                var last = $('#lstP').val();
                var next = $('#nxtP').val();
                var HistImg = ($('.HistImg').length == 1) ? $('.HistImg').attr('data-url') : "";
                var removal = ($('#removal').is(":checked") == true) ? "со снятием" : "";
                var dRemoval = ($('#removal').is(":checked") == true) ? $("#DRemove").val() : "-";
                var dInstal = ($('#removal').is(":checked") == true) ? $('#DInstal').val() : "-";
                var success = true;
                if (HistImg.length == 0) {
                    success = false
                    $('#HistImgErr').remove()
                    $('#file_P').after('<label id="HistImgErr" style="color:red">Необходимо выбрать файл!</label>')
                    window.setTimeout(function () {
                        $('#HistImgErr').hide(1000);
                        $('#HistImgErr').remove();
                    }, 3000);

                }
                if (dRemoval.length == 0) {
                    success = false;
                    $('#dremovelErr').remove()
                    $('#DRemove').after('<label id="dremovelErr" style="color:red">Необходимо заполнить поле "Дата снятия"</label>')
                    window.setTimeout(function () {
                        $('#dremovelErr').hide(1000);
                        $('#dremovelErr').remove();
                    }, 3000);
                }
                if (dInstal.length == 0) {
                    success = false;
                    $('#DInstalErr').remove()
                    $('#DInstal').after('<label id="DInstalErr" style="color:red">Необходимо заполнить поле "Дата установки"</label>')
                    window.setTimeout(function () {
                        $('#DInstalErr').hide(1000);
                        $('#DInstalErr').remove();
                    }, 3000);
                }
                if (last.length == 0) {
                    success = false
                    $('#lastErr').remove()
                    $('#lstP').after('<label id="lastErr" style="color:red">Необходимо заполнить поле "Дата поверки"</label>')
                    window.setTimeout(function () {
                        $('#lastErr').remove();
                    }, 3000);
                }
                if (next.length == 0) {
                    success = false
                    $('#nextErr').remove()
                    $('#nxtP').after('<label id="nextErr" style="color:red">Необходимо заполнить поле "Дата поверки"</label>')
                    window.setTimeout(function () {
                        $('#nextErr').hide(1000);
                        $('#nextErr').remove();
                    }, 3000);
                }
                if (success == true) {

                    MakePoverka(mid, last, next, HistImg, $('#meterNum').attr('data-obj'), dRemoval, dInstal, removal)
                }
            })
            $('#lstP').change(function () {
                var nxtdate_ = $(this).val()
                if (nxtdate_.length != 0) {
                    var lst = $('#lstP').val()
                    lst = lst.split('-');
                    var lstday = lst[2];
                    var lstmnt = lst[1];
                    var lstyear = lst[0];

                    var nxt = $(this).val().split('-');
                    var nxtday = nxt[2];
                    var nxtmnt = nxt[1];
                    var nxtyear = nxt[0];

                    if ($(this).val() <= $('#lstP').attr('value')) {
                        //var nextdate = lstyear + '-' + lstmnt + '-' + (parseInt(lstday) + 1);
                        //$(this).val(nextdate)
                        $('#lstP').val($('#lstP').attr("value"))
                    }
                }
                else {
                    $('#lstP').val($('#lstP').attr("value"))
                }

            })
            $('#nxtP').blur(function () {
                if ($(this).val().length != 0) {
                    if ($(this).val() <= $('#lstP').val()) {
                        $(this).val($(this).attr('value'))
                    }
                }
                else {
                    $(this).val($(this).attr('value'));
                }
            })
            $('#Pove').click(function () {
                PopupPove("", "", "")
            })
            $('#StopC').click(function () {
                if ($(this).text().trim() != 'Возобновить работу') {
                    StopPopup()
                }
                else {
                    var dtToday = new Date();

                    var month = dtToday.getMonth() + 1;
                    month = (month < 10) ? "0" + month : month
                    var day = dtToday.getDate();
                    day = (day < 10) ? "0" + day : day
                    var year = dtToday.getFullYear();
                    var maxDate = year + '-' + month + '-' + day;
                    // $('#lstP').val(maxDate);
                    PopupPove("", "", "Возобновить работу")
                    //$('#lstP,#nxtP').val(maxDate);
                }
            })
            $('#Stop_C').click(function () {
                var St_date = $('#Sdate').val();
                if (St_date.length != 0) {
                    var comment = $('#cmntS').val();
                    if (comment.length != 0) {
                        var file = ($('.HistImg').length != 0) ? $('.HistImg').attr('data-url') : "";
                        MakeStop(mid, St_date, comment, file, Log)
                    }
                    else {
                        $('#cmntS').after('<label id="errS" style="color:red">Пожалуйста, заполните Комментарий</label>')
                        window.setTimeout(function () {
                            // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
                            $('#errS').hide(1000);
                            $('#errS').remove();
                        }, 5000);
                    }
                }
                else {
                    $('#Sdate').after('<label id="errS" style="color:red">Пожалуйста, заполните Дата выхода из строя</label>')
                    window.setTimeout(function () {
                        // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
                        $('#errS').hide(1000);
                        $('#errS').remove();
                    }, 5000);
                }
            })
            $('#bacS').click(function () { window.location.href = "Counters.aspx" })
            $('#delC').click(function () {
                DelPopUp();
            })
            $('#del_C').click(function () {

                DeleteCounter(mid);
            })
        }
    }
    function UpdateMeter(Obj) {
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "CounterCard.aspx/UpdateMeter",
            data: JSON.stringify(Obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                $('#tab1 .row:eq(0) select').attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)');
                $('#tab1 .row:eq(0) input[type="number"],input[type="text"],input[type="date"]').attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)')
                $('#SaveUp').text('Редактировать')
                window.location.href = "/Manager/Counters.aspx"
            }
        })
    }
    function readU_RL(input, imgName, o) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = function (e) {


                $('.foto').attr('src', e.target.result);

                //var nameImg = imgName
                //var arrayBuffer = reader.result
                //var bytes = new Uint8Array(arrayBuffer);
                //var obj = { baseString: bytes, imgName: nameImg };
                var formData = new FormData();
                var file = $('#files').get(0).files//document.getElementById("files").files;

                formData.append('file', file[0], encodeURI(file.name));
                formData.append('object_id', '1');
                ////console.log(formData);



                $.ajax({
                    error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
                    type: "POST",
                    url: "Apartments.aspx/UplFile",//window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile"
                    data: { "stream": formData },
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    cache: false,
                    timeout: 3600000,
                    crossDomain: true,
                    contentType: "multipart/form-data",
                    processData: false,
                    // async: false,
                    success: function (result) {
                        ////console.log(result)
                        //////console.log(result)
                        ////alert("OK. See Console -  press F12");
                        //// //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                        ////var jsondata_ = jQuery.parseJSON(result)
                        ////var jsondata_1 = JSON.stringify(result)
                        //// var jsondata_1 = JSON.parse(result)
                        ////  $('.foto').attr('src', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))//replace('~', '..'))
                        //var file = result.URL
                        //file = file.substring(file.lastIndexOf('/') + 1, file.lenght)
                        //SaveAccFromExcel(o, file)



                    },

                    error: function (r) {
                        // $(".foto").attr('src', '/img/brickdom.png')
                        //  $("#loader").hide();
                        //// //alert("Error");
                        //var jsonEroorData = JSON.parse(r);
                        //if (jsonEroorData.readyState==4) {
                        //    $('.foto').attr('src', result.URL.replace('~', '..'))
                        //    $("#loader").hide();
                        //}
                        //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        ////console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

                        var filePath = $('#files').val();
                        var index = filePath.lastIndexOf("\\") + 1;
                        var filename = filePath.substr(index);
                        var Obj = $('#objsM').val();
                        //  readURL(input, filename, o)
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });


            }


        }
    }
    function readURL(input, imgName, o) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = function (e) {


                $('.foto').attr('src', e.target.result);

                //var nameImg = imgName
                //var arrayBuffer = reader.result
                //var bytes = new Uint8Array(arrayBuffer);
                //var obj = { baseString: bytes, imgName: nameImg };
                var formData = new FormData();
                var file = document.getElementById("files").files[0];

                formData.append('file', file, encodeURI(file.name));
                formData.append('object_id', '1');
                ////console.log(formData);



                $.ajax({
                    error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
                    type: "POST",
                    url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
                    data: formData,
                    type: 'POST',
                    contentType: "multipart/form-data",
                    processData: false,
                    // async: false,
                    success: function (result) {

                        ////console.log(result)
                        //alert("OK. See Console -  press F12");
                        // //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                        //var jsondata_ = jQuery.parseJSON(result)
                        //var jsondata_1 = JSON.stringify(result)
                        // var jsondata_1 = JSON.parse(result)
                        //  $('.foto').attr('src', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))//replace('~', '..'))
                        var file = result.URL
                        file = file.substring(file.lastIndexOf('/') + 1, file.lenght)
                        SaveAccFromExcel(o, file)



                    },

                    error: function (r) {
                        // $(".foto").attr('src', '/img/brickdom.png')
                        //  $("#loader").hide();
                        //// //alert("Error");
                        //var jsonEroorData = JSON.parse(r);
                        //if (jsonEroorData.readyState==4) {
                        //    $('.foto').attr('src', result.URL.replace('~', '..'))
                        //    $("#loader").hide();
                        //}
                        //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        ////console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

                        var filePath = $('#files').val();
                        var index = filePath.lastIndexOf("\\") + 1;
                        var filename = filePath.substr(index);
                        var Obj = $('#objsM').val();
                        readURL(input, filename, o)
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });


            }


        }
    }
    getObjectForMaster(Log)
    if (loc == "/Manager/Services.aspx") {
        getProjects(Log)

        $('#prj').change(function () {
            GetExistDirections($(this).val());
            //GetDirectionsGrups($(this).val())
        })

        $('#ConnectServices').click(function () {

            var sets = [];
            var successServiceSet = true

            $('#AllServiceSets').children('input[type="checkbox"]').each(function () {
                var SetId = $(this).attr('data-s')
                if ($(this).prop('checked') == true) {


                    if ($(this).next().children('img').length == 1) {
                        sets.push({ "SetId": SetId, 'IconId': $(this).next().children('img').attr('itemid') });
                    }
                    else {
                        $('#hSetErr' + SetId).remove();
                        $(this).next().next().after('<label id="hSetErr' + SetId + '" style="color:red">Пожалуйста выберите иконку для выбранный Направление<label>')
                        window.setTimeout(function () {
                            $('#hSetErr' + SetId).remove();
                        }, 3000)
                        successServiceSet = false;
                    }

                }
                //if (sets.length == 0) {
                //    successServiceSet = false;
                //    $('#SetErr').remove();
                //    $('#HSet').after('<label style="color:red" id="SetErr">Пожалйста выберите Направления</label>')
                //    window.setTimeout(function () {
                //        $('#SetErr').remove();
                //    }, 3000)
                //}
            })
            if (successServiceSet == true && sets.length == 0) {
                $('#SetErr').remove();
                successServiceSet = false;
                $('#HSet').after('<label style="color:red" id="SetErr">Пожалйста выберите Направления</label>')
                window.setTimeout(function () {
                    $('#SetErr').remove();
                }, 3000)
            }
            var directs = []
            var successServiceDirects = true

            $('#AllDirects').children('div').each(function () {
                $(this).children('div').each(function () {
                    var datas = $(this).attr('data-s');
                    if (datas != undefined) {
                        if ($(this).children('input[type="checkbox"]').prop('checked') == true) {

                            var directId = $(this).children('input[type="checkbox"]').attr('data-d');
                            if ($(this).children('a').children('img').length == 1) {

                                var diconId_ = $(this).children('a').children('img').attr('itemid');
                                directs.push({ "DirectId": directId, "DiconId": diconId_ })
                            }
                            else {
                                $('#ErrDirect' + directId).remove()
                                $(this).children('label').after('<label style="color:red" id="ErrDirect' + directId + '">Пожалуйста, Выберите иконку для выбранных группа услуг<label>')
                                window.setTimeout(function () {
                                    $('#ErrDirect' + directId).remove();
                                }, 3000)
                                successServiceDirects = false;
                            }
                        }
                    }
                })

                //if (directs.length == 0) {
                //    $('#ErrNoDirect').remove();
                //    $('#HDirect').after('<label style="color:red" id="ErrNoDirect">Пожалуйста, Выберите Группа услуг<label>')
                //    window.setTimeout(function () {
                //        $('#ErrNoDirect').remove();
                //    }, 3000)
                //}
            })
            if (successServiceDirects == true && directs.length == 0) {
                $('#ErrNoDirect').remove();
                successServiceDirects = false;
                $('#HDirect').after('<label style="color:red" id="ErrNoDirect">Пожалуйста, Выберите Группа услуг<label>')
                window.setTimeout(function () {
                    $('#ErrNoDirect').remove();
                }, 3000)
            }

            var services = []
            var successService = true
            $('#AllServicesCost').children('div').each(function () {
                $(this).children('div').each(function () {
                    var serviceId = $(this).attr('data-serv');
                    if (serviceId != undefined) {
                        var cost = $(this).children('input[type="number"]').val();
                        var doqovor = $(this).children('input[type="checkbox"]').prop('checked');
                        if (doqovor == false && cost.length == 0) {
                            $('#costErr' + serviceId).remove();
                            $(this).children('input[type="checkbox"]').after('<label style="color:red" id="costErr' + serviceId + '">Пожалуйста, вводите стоимость или выберайте договорная</label>')
                            successService = false;
                            window.setTimeout(function () {
                                $('#costErr' + serviceId).remove();
                            }, 3000)
                        }
                        else {
                            cost = (cost.length == 0) ? 'Договорная' : cost
                            services.push({ 'serviceId': serviceId, 'cost': cost })
                        }
                    }
                    else {

                    }
                })
            })
            if (successService == true && services.length == 0) {
                successService = false;
                $('#ErrNoService').remove()
                $('#HService').after('<label style="color:red" id="ErrNoService">Пожалуйста, Выберите Группа услуг<label>')
                window.setTimeout(function () {
                    $('#ErrNoService').remove()
                }, 3000)
            }
            if (successServiceSet == true && successServiceDirects == true && successService == true) {
                ////console.log(sets)
                ////console.log(directs)
                ////console.log(services)
                ConnectServicetoProject(sets, directs, services, $('#prj').val())
            }
        })
    }
    if (loc == "/Manager/CreatePoll.aspx") {
        getProjectNamebyLogin(Log)
        GetDatePoll_And_Control(undefined, null)
        CKEDITOR.replace('editor1', { height: 100 });
    }
    if (loc == "/Manager/RequestsManager.aspx") {

        // $('.ui-loader-background,#loader').show()
        sessionStorage.removeItem("RId");
        sessionStorage.removeItem("st")
        //  GetRequestsForManager(Log)
        loadUnitedSuperUtilites_And_page()

        //   $('#contentRegister').css('width', '100%')

    }
    if (loc == '/Manager/CreateRequest.aspx') {

        loadSuperDisp_Utilities_And_()



    }


})
function addTab(lastitm, jdata) {

    $('.ls').children('div:first').children('.removing3').remove()
    $('.ls').children('div:first').prepend('<i class="fa fa-close removing3" itemid="0" onclick="deltab(this)" aria-hidden="true"></i>')
    var LastLs = giveElements((parseInt(lastitm) + 1), jdata).NewTab
    $(LastLs).children('div[data-tabid="2"]').children('div:not(:first)').remove();
    $(LastLs).children('div[data-tabid="2"]').children('button[onclick],span[onclick]').remove();
    //  $('#AllLs').prepend(LastLs)
    $('#plus').before(LastLs)
    //  $('.ls:last').after(LastLs)
    $('.ls:last').find('input[type="text"]').val('')
    $('.ls:last').find('.select2').remove();
    var itmNumb = (parseInt(lastitm) + 1)
    $('div[itemid="' + itmNumb + '"]').children('div[data-tabid="2"]').find('select').select2({
        containerCssClass: "wrap"
    })

    if (jdata != undefined) {
        var lsVal = (jdata.NUMBER == undefined) ? '' : jdata.NUMBER
        $('#lc_' + itmNumb).val(lsVal)
        var ROOM_QUANT = jdata.ROOM_QUANT;
        ROOM_QUANT = ROOM_QUANT.split('|')
        var pass = ROOM_QUANT[1]
        $('#pss_' + itmNumb).val(pass)
        var LIVE_SQUARE = jdata.LIVE_SQUARE
        $('#LiveSq_' + itmNumb).val(LIVE_SQUARE)
        var GEN_SQUARE = jdata.GEN_SQUARE
        $('#GenSq_' + itmNumb).val(GEN_SQUARE)
        var LiveSqB = jdata.WITHOUT_SUMMER_SQUARE
        $('#LiveSqB_' + itmNumb).val(LiveSqB)
        var AmRoom = ROOM_QUANT[0]
        $('#AmRoom_' + itmNumb).val(AmRoom)
        var OWNERSHIP_TYPE_ID = jdata.OWNERSHIP_TYPE_ID
        var A_D = jdata.A_D
        $('#typeProp_' + itmNumb).attr('data-j', 'j').data('j', A_D)
        $('#typeProp_' + itmNumb).select2('val', OWNERSHIP_TYPE_ID)//.val(OWNERSHIP_TYPE_ID)
    }


}
function giveElements(i, jdata) {
    var sobs0 = '<div itemid="' + i + '" class="row mb-3 mr-2 ml-1 w-30 p-0 border-1 rounded8 inds' + i + '"> <div class="col-md-10 m-0 p-0"> <div class="posRel m-0 p-0"> <input id="sobs' + i + '" class="border-0"  onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" type="text"> <label for="sobs' + i + '" class="transp backLab">Собственник</label> </div> </div> </div>'
    var dol0 = '<div itemid="' + i + '" class="row mb-3 mr-2 ml-1 w-20 p-0 border-1 rounded8 inds' + i + '"> <div class="col-md-10 m-0 p-0"> <div class="posRel m-0 p-0"> <input id="dol' + i + '" required class="border-0"  onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 44" type="text"> <label for="dol' + i + '" class="transp backLab">Доля</label> </div> </div> </div>'

    var tel0 = '<div itemid="' + i + '" class="row mb-3 mr-2 ml-1 w-20 p-0 border-1 rounded8 inds' + i + '"> <div class="col-md-10 m-0 p-0"> <div class="posRel m-0 p-0"> <input id="tel' + i + '" class="border-0"  onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" type="text"> <label for="tel' + i + '" class="transp backLab">Номер телефона</label> </div> </div> </div>'
    var email0 = '<div itemid="' + i + '" class="row mb-3 mr-2 ml-1 w-20 p-0 border-1 rounded8 inds' + i + '"> <div class="col-md-10 m-0 p-0"> <div class="posRel m-0 p-0"> <input id="email' + i + '"  onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" class="border-0" type="text"> <label for="email' + i + '" class="transp backLab">E-mail</label></div></div></div>'
    var AddElem = '<button itemid="' + i + '" onclick="AddElem(this,' + i + ')" class="transp border-0 flexCenter mt-n3"> <span class="bgLightGrey w24 rounded-pill"></span> <img src="../img/ic-plus.svg" class="w12 reddishSvg position-absolute" alt=""> </button>'
    var deleteInd = '<span itemid="' + i + '" class="flexCenter mr-3" id="delInd" onclick="delElem(this,' + i + ')"> <span class="bgDarkGrey w24 rounded-pill"></span> <span class="font-weight-bold position-absolute" id="counter"> <img src="../img/close.svg" class="w12 brightness" alt=""> </span> </span>'
    // var NUMBER = jdata.NUMBER
    var lsText = (jdata == undefined) ? 'Лицевые счета' : jdata.NUMBER

    var NewTab = '<div id="ls" class="ls" itemid="' + i + '"> <div class=" h60 w-100 bgWhite shadow rounded16 pl-3 mt-4 pr-3 "><i class="fa fa-close removing3" itemid="' + i + '" onclick="deltab(this)" aria-hidden="true"></i> <ol class="list-unstyled list-inline flexHoriz te-menu m-0 h-100 "> <li onclick="OpenTab(1,this)" class="w200 mr-3 h-100 m-0 pointer"> <a class=" font-weight-bold">' + lsText + '</a> </li> <li onclick="OpenTab(2,this)" class="w200 mr-3 h-100 m-0 active pointer"> <a class=" font-weight-bold">Собственники</a> </li> <li onclick="OpenTab(2,this)" style="display: none" class="w200 mr-3 h-100 m-0 pointer"> <a class=" font-weight-bold">Начисления&nbsp;и&nbsp;платежи</a> </li> </ol> </div> <div data-tabid="2" class="w-100 flexHoriz flex-wrap bgWhite shadow rounded16 p-4 mt-4"> <div class="posRel h56 rounded-lg  w-100"> <select onchange="typePropChange(this)" id="typeProp_' + i + '" tabindex="-1" class="select2-hidden-accessible" aria-hidden="true"> <option value="0">Выберите собственность</option> <option value="1">Совместная</option><option value="2">Единоличная</option><option value="3">Долевая</option><option value="4">Социальный найм</option></select><span class="select2 select2-container select2-container--default" dir="ltr" style="width: 934.149px;"><span class="selection"><span class="select2-selection select2-selection--single wrap" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-typeProp-container"><span class="select2-selection__rendered" id="select2-typeProp-container" title="Выберите собственность">Выберите собственность</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span> <label for="typeProp_' + i + '" class="w-95 transp backLab">Тип собственности</label> </div> </div> <div data-tabid="1" style="display: none !important" class="w-100 flexHoriz flex-wrap bgWhite shadow rounded16 p-4 mt-4"> <div class="row mb-3 mr-2 ml-1 w-100 p-0 rounded8"> <div class="col-md-12 m-0 p-0"> <div class="posRel h56 rounded-lg mb-3"> <input onkeyup="hideErrsMessage2(this)" required="" type="text" id="lc_' + i + '"> <label for="lc_' + i + '" class="w-95 transp backLab">Лицевой счет</label> </div> </div> <div class="flexHoriz justify-content-between mb-2 w-100"> <div class="posRel h56 rounded-lg w-48 m-0"> <input disabled="disabled" onkeyup="hideErrsMessage2(this)" type="text" id="pss_' + i + '" style="width: 71%;"> <label for="pss_' + i + '" class="w-95 transp backLab">Пароль</label> </div> <button onclick="Generate(this)" id="GENER_Modal_' + i + '" class="btn btn1 outline shadow-none m-0 rounded-lg w-48 h56"> <span> <img src="../img/ic-pass.svg" class="mr-2" alt=""> <span class="text-truncate">Сгенерировать</span> </span> </button> </div> <div class="flexHoriz justify-content-between mb-2 w-100"> <div class="posRel h56 rounded-lg w-48"> <input id="LiveSq_' + i + '" onkeyup="hideErrsMessage2(this)"> <label for="LiveSq_' + i + '" class="w-95 transp backLab">Жилая площадь, м<sup>2</sup></label> </div> <div class="posRel h56 rounded-lg w-48"> <input id="GenSq_' + i + '" onkeyup="hideErrsMessage2(this)"> <label for="GenSq_' + i + '" class="w-95 transp backLab">Общая площадь, м<sup>2</sup></label> </div> </div> <div class="flexHoriz justify-content-between mb-2 w-100"> <div class="posRel h56 rounded-lg w-48"> <input id="LiveSqB_' + i + '" onkeyup="hideErrsMessage2(this)"> <label for="LiveSqB_' + i + '" class="w-95 transp backLab">Общая площадь без летних зон по данному л/с, м<sup>2</sup></label> </div> <div class="posRel h56 rounded-lg w-48"> <input id="AmRoom_' + i + '" onkeyup="hideErrsMessage2(this)"> <label for="AmRoom_' + i + '" class="w-95 transp backLab">Количество комнат<sup>2</sup></label> </div> </div> </div> </div><hr> </div>'

    return { sobs: sobs0, dol: dol0, tel: tel0, email: email0, AddElem: AddElem, deleteInd: deleteInd, NewTab: NewTab }
}
function typePropChange(e, jdata) {
    var typPropeval = $(e).val()
    var data_j = $(e).attr('data-j')

    if (data_j != undefined) {
        data_j = $(e).data('j')
        if (typPropeval != 0) {
            $(e).parent('div').parent('div').children('div:not(:first)').remove();
            $(e).parent('div').parent('div').children('button[onclick],span[onclick]').remove()

            for (var i = 0; i < data_j.length; i++) {
                if (i == 0 && typPropeval == 3) {
                    $(e).parent().after(giveElements(i).AddElem)
                }

                $(e).parent().after(giveElements(i).email)
                var email = data_j[i].EMAIL
                var idemail="#email"+i
                $(e).parent().parent().children('div').find(idemail).val(email)

                $(e).parent().after(giveElements(i).tel)
                var Phone = data_j[i].PHONE
                var idphone = "#tel" + i
                $(e).parent().parent().children('div').find(idphone).val(Phone)


                if (typPropeval == 3) {
                    $(e).parent().after(giveElements(i).dol)
                    var dol = data_j[i].SHARE
                }
                $(e).parent().after(giveElements(i).sobs)
                var first_name = data_j[i].FIRST_NAME
                var idSobs = '#sobs' + i
                $(e).parent().parent().children('div').find(idSobs).val(first_name)
            }

            //for (var i = data_j.length; i >= 0; i--) {

            //    if (i == 1 && typPropeval == 3) {
            //        $(e).parent().after(giveElements(i).AddElem)
            //    }
            //    $(e).parent().after(giveElements(i).email)
                
            //    $(e).parent().after(giveElements(i).tel)
            //    if (typPropeval == 3) {
            //        $(e).parent().after(giveElements(i).dol)
            //    }
            //    $(e).parent().after(giveElements(i).sobs)
            //    var first_name = data_j[i-1].FIRST_NAME
            //    $(e).parent().children('#sobs' + i-1).val(first_name)
            //}

        }
        else {
            $(e).parent('div').parent('div').children('div:not(:first)').remove();
            $(e).parent('div').parent('div').children('button[onclick],span[onclick]').remove()
        }
    }
    else {

        if (typPropeval != 0) {
            $(e).parent('div').parent('div').children('div:not(:first)').remove();
            $(e).parent('div').parent('div').children('button[onclick],span[onclick]').remove()
            if (typPropeval == 1) {

                for (var i = 1; i >= 0; i--) {
                    $(e).parent().after(giveElements(i).email)
                    $(e).parent().after(giveElements(i).tel)
                    $(e).parent().after(giveElements(i).sobs)
                }
            }
            else if (typPropeval == 2 || typPropeval == 4) {

                $(e).parent().after(giveElements(0).email)
                $(e).parent().after(giveElements(0).tel)
                $(e).parent().after(giveElements(0).sobs)
            }
            else if (typPropeval == 3) {
                for (var i = 1; i >= 0; i--) {

                    if (i == 1) {
                        $(e).parent().after(giveElements(i).AddElem)
                    }
                    $(e).parent().after(giveElements(i).email)
                    $(e).parent().after(giveElements(i).tel)
                    $(e).parent().after(giveElements(i).dol)
                    $(e).parent().after(giveElements(i).sobs)
                }
            }
        }
        else {
            $(e).parent('div').parent('div').children('div:not(:first)').remove();
            $(e).parent('div').parent('div').children('button[onclick],span[onclick]').remove()
        }
    }
}
function OpenTab(countTab, e) {
    $(e).parent('ol').children('li').attr('class', 'w200 mr-3 h-100 m-0 pointer')
    $(e).attr('class', 'w200 mr-3 h-100 m-0 active pointer')
    $(e).parents('.ls').children('div[data-tabid="1"],div[data-tabid="2"]').attr('style', 'display:none !important')
    $(e).parents('.ls').children('div[data-tabid="' + countTab + '"]').attr('style', 'display:flex !important')
}
function GetRoomTypesFor_QRCodes(lg, obj) {
    var objJ = { lg: lg, obj: obj }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",

        url: "Apartments.aspx/GetRoomTypesFor_QRCodes",
        data: JSON.stringify(objJ),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            var j = JSON.parse(data.d)
            $('#myModal4').children('.modal-content2').children('.modal-body2').empty();
            for (var i = 0; i < j.length; i++) {
                $('#myModal4').children('.modal-content2').children('.modal-body2').append('<input type="checkbox" class="chk" value="' + j[i].ROOM_TYPE_ID + '"/><label class="labelQr">' + j[i].ROOM_TYPE + ' (' + j[i].COUNTS + ')</label>')
            }


        }
    })
}
function GenerateQRCOde(Log) {
    var objJ = { lg: Log }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",

        url: "Apartments.aspx/GenerateQrCode",
        data: JSON.stringify(objJ),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            var j = JSON.parse(data.d)
            if (j.result = "OK") {
                //$('.ui-loader-background').hide();
                //$('#loader').hide();
                // window.open('../QRS.aspx?obj=' + objId + '&lg=' + Log + '&types=' + btoa(JSON.stringify(Room_types)) + '&roomId=' + roomId + '', '_blank')
                //$('#qra').attr('href', '../QRS.aspx?obj=' + objId + '&lg=' + Log + '&types=' + btoa(JSON.stringify(Room_types)) + '&roomId=' + roomId + '')
                //$('#qra').click()
                //var id = $(e).attr('id');

            }
        }
    })
}
function loadUnitedSuperUtilites_And_page() {
    //$('#body').load('../Super_Disp/DispRequests.aspx #contentRegister')

    var script = document.createElement("script");

    script.src = "../Super_Disp/Utilities/UnitedSuper_Utilities.js?" + Math.random();
    script.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(script);
}
function loadSuperDisp_Utilities_And_() {
    // $('#body').load('../Super_Disp/CreateDispRequest.aspx #contentRegister')

    //for (; ;) {
    //    var contentRegisterCOunt = $('#contentRegister').length
    //    if (contentRegisterCOunt==1) {

    //    }
    //}
    var script = document.createElement("script");
    script.src = "../Super_Disp/Utilities/SuperDisp_Utulities.js?" + Math.random();
    script.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(script);
}
function GetRequestsForManager(lg) {
    var obj = { "lg": lg }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "RequestsManager.aspx/GetRequestsForManager",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d);
            $('#DispSRequestTables').dataTable({

                "destroy": true,
                data: jsondata_,
                "aaSorting": [],
                "deferRender": true,
                columns: [{

                    'data': 'REQUEST_NUMBER',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        //  var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";' + emergency + ' 
                        $(nTd).html('<a href="#" onclick=SendId(\"' + oData.GUID + '\",' + oData.STATUS_ID + ')>' + oData.REQUEST_NUMBER + '</a>');
                    },
                    'fnCreatedRow': function (nRow, aData, iDataIndex) {
                        //$(nRow).attr('onclick', 'SendId(' + aData.REQUEST_ID + ',' + aData.STATUS_ID+')');
                        $('#DispSRequestTables tbody tr:eq(' + iDataIndex + ')').attr('onclick', 'SendId(' + aData.GUID + ',' + aData.STATUS_ID + ')');
                    },
                },


                {

                    'data': 'CLIENT',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        //var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";' + emergency + ' 
                        $(nTd).html('<a href="#" title=\"' + oData.CLIENT + '\" onclick=SendId(\"' + oData.GUID + '\",' + oData.STATUS_ID + ')>' + oData.CLIENT + '</a>');
                    },
                    'fnCreatedRow': function (nRow, aData, iDataIndex) {
                        //$(nRow).attr('onclick', 'SendId(' + aData.REQUEST_ID + ',' + aData.STATUS_ID+')');
                        $('#DispSRequestTables tbody tr:eq(' + iDataIndex + ')').attr('onclick', 'SendId(' + aData.GUID + ',' + aData.STATUS_ID + ')');
                    },
                },
                {

                    'data': 'OBJECT_ADRESS',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        //var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";' + emergency + ' 
                        $(nTd).html('<a href="#" title=\"' + oData.OBJECT_ADRESS + '\" onclick=SendId(\"' + oData.GUID + '\",' + oData.STATUS_ID + ')>' + oData.OBJECT_ADRESS + '</a>');
                    },
                    'fnCreatedRow': function (nRow, aData, iDataIndex) {
                        //$(nRow).attr('onclick', 'SendId(' + aData.REQUEST_ID + ',' + aData.STATUS_ID+')');
                        $('#DispSRequestTables tbody tr:eq(' + iDataIndex + ')').attr('onclick', 'SendId(' + aData.GUID + ',' + aData.STATUS_ID + ')');
                    },
                },
                {

                    'data': 'ROOM',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        //var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";' + emergency + ' 
                        $(nTd).html('<a href="#" onclick=SendId(\"' + oData.GUID + '\",' + oData.STATUS_ID + ')>' + oData.ROOM + '</a>');
                    },
                    'fnCreatedRow': function (nRow, aData, iDataIndex) {
                        //$(nRow).attr('onclick', 'SendId(' + aData.REQUEST_ID + ',' + aData.STATUS_ID+')');
                        $('#DispSRequestTables tbody tr:eq(' + iDataIndex + ')').attr('onclick', 'SendId(' + aData.GUID + ',' + aData.STATUS_ID + ')');
                    },
                },
                {

                    'data': 'CRDATE',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        //var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";' + emergency + ' 
                        $(nTd).html('<a href="#" onclick=SendId(\"' + oData.GUID + '\",' + oData.STATUS_ID + ')>' + oData.CRDATE.substring(0, oData.CRDATE.indexOf(' ')) + '</a>');
                    },
                    'fnCreatedRow': function (nRow, aData, iDataIndex) {
                        //$(nRow).attr('onclick', 'SendId(' + aData.REQUEST_ID + ',' + aData.STATUS_ID+')');
                        $('#DispSRequestTables tbody tr:eq(' + iDataIndex + ')').attr('onclick', 'SendId(' + aData.GUID + ',' + aData.STATUS_ID + ')');
                    },
                },
                {

                    'data': 'COMMENT',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        //var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";' + emergency + ' 
                        $(nTd).html('<a href="#" title=\"' + oData.COMMENT + '\" onclick=SendId(\"' + oData.GUID + '\",' + oData.STATUS_ID + ')>' + oData.COMMENT + '</a>');
                    },
                    'fnCreatedRow': function (nRow, aData, iDataIndex) {
                        //$(nRow).attr('onclick', 'SendId(' + aData.REQUEST_ID + ',' + aData.STATUS_ID+')');
                        $('#DispSRequestTables tbody tr:eq(' + iDataIndex + ')').attr('onclick', 'SendId(' + aData.GUID + ',' + aData.STATUS_ID + ')');
                    },
                },

                {

                    'data': 'WORKDATE',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        //var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";' + emergency + ' 
                        $(nTd).html('<a href="#" onclick=SendId(\"' + oData.GUID + '\",' + oData.STATUS_ID + ')>' + oData.WORKDATE.substring(0, 10) + '</a>');
                    },
                    'fnCreatedRow': function (nRow, aData, iDataIndex) {
                        //$(nRow).attr('onclick', 'SendId(' + aData.REQUEST_ID + ',' + aData.STATUS_ID+')');
                        $('#DispSRequestTables tbody tr:eq(' + iDataIndex + ')').attr('onclick', 'SendId(' + aData.GUID + ',' + aData.STATUS_ID + ')');
                    },
                },
                {

                    'data': 'STATUS',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        //var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";' + emergency + ' 
                        $(nTd).html('<a href="#" onclick=SendId(\"' + oData.GUID + '\",' + oData.STATUS_ID + ')>' + oData.STATUS + '</a>');
                    },
                    'fnCreatedRow': function (nRow, aData, iDataIndex) {
                        //$(nRow).attr('onclick', 'SendId(' + aData.REQUEST_ID + ',' + aData.STATUS_ID+')');
                        $('#DispSRequestTables tbody tr:eq(' + iDataIndex + ')').attr('onclick', 'SendId(' + aData.GUID + ',' + aData.STATUS_ID + ')');
                    },
                }, {

                    'data': 'REQUEST_TYPE',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        //var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";' + emergency + ' 
                        $(nTd).html('<a href="#" onclick=SendId(\"' + oData.GUID + '\",' + oData.STATUS_ID + ')>' + oData.REQUEST_TYPE + '</a>');
                    },
                    'fnCreatedRow': function (nRow, aData, iDataIndex) {
                        //$(nRow).attr('onclick', 'SendId(' + aData.REQUEST_ID + ',' + aData.STATUS_ID+')');
                        $('#DispSRequestTables tbody tr:eq(' + iDataIndex + ')').attr('onclick', 'SendId(' + aData.GUID + ',' + aData.STATUS_ID + ')');
                    },
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
            $('.ui-loader-background,#loader').hide()
        }
    })
}

function removingNac3(e) {
    if ($('.Servc').length > 1) {
        $(e).parent('.onend').parent('.Servc').remove()
    }
    else {
        $(e).remove();
    }
    var totalNac = 0
    if ($('.removingNac3').length == 1) {
        $('.removingNac3').remove();
    }

    //$('#sumNac').val(totalNac.toFixed(2))
}
function Get_Dead_Line(objId) {
    var obj = { "objId": objId }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/Get_Dead_Line",//http://localhost:64339/Manager/
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d);
            // //console.log(j);

            $('#startDead').val(j[0].START_CNTR)
            $('#endDead').val(j[0].STOP_CNTR);
            $('#mnth').prop('checked', j[0].ON_END_CNTR)
        }
    })
}

function GetCounters_For_Excel(lg) {

    var obj = { "lg": lg }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/GetCounters_For_Excel",//http://localhost:64339/Manager/
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            ////console.log(data)

            var jsondata = JSON.parse(data.d)
            if (jsondata.result == "Ok") {
                //  var fPath = window.location.protocol + '//' + window.location.host + '/Files/' + jsondata.MetersExcel + '';
                window.location.href = window.location.protocol + '//' + window.location.host + '/Files/' + jsondata.MetersExcel + '';
                //$('#Exxcel').attr('href', fPath)


                //  $('#Exxcel').remove();
                //$('#downCounter').after('<a id="Exxcel" href="../Files/' + jsondata.MetersExcel + '"   download></a>')
                //$('#Exxcel').click(function ()
                //{

                //    alert('ok')
                //})

                //$('#Exxcel').click(function (e) {
                //        e.preventDefault();  //stop the browser from following
                //        window.location.href = '../Files/' + jsondata.MetersExcel + '';
                //});

                // $('#Exxcel').remove();

            }
            $('.ui-loader-background').hide();
            $('#loader').hide();
        },

        complete: function (e) {
            $('#Exxcel').click();
        }
    })

}

function CounterIndication(e) {
    $('.ui-loader-background').show();
    $('#loader').show();
    var filePath = $(e).val();
    var fileName = filePath.substring(filePath.indexOf('\\') + 1);
    var fileExtention = fileName.split('.').pop();
    $('#flS').remove();
    if (fileExtention == 'xlsx' || fileExtention == 'xls') {
        var reader = new FileReader();
        reader.readAsDataURL(e.files[0])

        reader.onload = function () {

            var frm = new FormData();
            frm.append("file", e.files[0], encodeURI(fileName))

            $.ajax({
                error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",//window.location.protocol + '//' + window.location.host + "
                data: frm,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                timeout: 3600000,
                crossDomain: true,

                success: function (result) {

                    var F_ile = result.URL
                    F_ile = F_ile.substring(F_ile.lastIndexOf('/') + 1, F_ile.lenght)
                    ShowIndiCations($('#objsM').val(), F_ile)

                }
            })
        }

    }
    else {
        $(e).after('<label id="flS" style="color:red"> Неверный  формат файла</label>');
        $("#loader,.ui-loader-background").hide();
    }
}
function ShowIndiCations(objId, url) {
    var obj = { "obj": objId, "file": url }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/ShowIndiCations",//http://localhost:64339/Manager/
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ErrSpan,#Erra').remove()
            //    //console.log(data);
            $('#filesInd').val('');

            var jsondata = JSON.parse(data.d)


            $("#loader,.ui-loader-background").hide();
            // //console.log(jsondata);
            if (jsondata.result == "Ok") {//$('#flS,ErrSpan,Erra').remove();
                if (jsondata.mtrsFalse_count != 0) {
                    $('#filesInd').after('<span id="ErrSpan" style="color:red">Обнаружены ошибочные данные (' + jsondata.mtrsFalse_count + ').</span><a id="Erra" href="../Files/Error_Excel/' + jsondata.mtrsFalse + '" style="color: red;" download> Скачать файл с ошибками</a>')
                }
                // var tblIndics = '';
                $('#Indics').empty();
                if (jsondata.mtrsTrue.length != 0) {
                    ////console.log(jsondata.mtrsTrue);

                    $('#tblIndics').dataTable({
                        "destroy": true,
                        responsive: true,
                        data: jsondata.mtrsTrue,
                        "deferRender": true,
                        columns: [
                            {
                                'data': 'SCORE_ID',

                                createdCell: function (td, cellData, rowData, row, col) {
                                    if (cellData.indexOf('(') != -1) {
                                        $(td).css('color', 'red')

                                    }
                                },


                            },
                            {
                                'data': 'METERS_NUMBER',
                                createdCell: function (td, cellData, rowData, row, col) {
                                    if (cellData.indexOf('(') != -1) {
                                        $(td).css('color', 'red')
                                    }
                                }
                            },
                            {
                                'data': 'TYPE',

                            },

                            {
                                'data': 'AMUNT_TARIF',

                            },
                            {
                                'data': 'TYPE_ID',

                            },

                            {
                                'data': 'OBJECT_ID',

                            },
                            {
                                'data': 'ROOM_TYPE',

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
                            "aria": {
                                "sortAscending": ": активировать для сортировки столбца по возрастанию",
                                "sortDescending": ": активировать для сортировки столбца по убыванию"
                            }
                        }

                    })
                }




            }
            if (jsondata.result != "Ok") {
                $('#filesInd').after('<label id="flS" style="color:red"> ' + jsondata.result + '</label>')
                $("#loader,.ui-loader-background").hide();
            }
            $("#loader,.ui-loader-background").hide();

        }
    })

}
function UI_ForIndication(e) {
    //$('#objsM').val()

    // ShowIndiCations(358, '342d756d-42e6-4767-aa15-48839cb31efa.xlsx')

    $('#UploadCounter').children('.modal-content2').children('.modal-header2').children('#mh2').hide();
    $('#UploadCounter').children('.modal-content2').children('.modal-header2').append('<h2 id="mh2" style="text-align: left; color: black">Массовая загрузка показаний счетчиков</h2>')

    $('#UploadCounter').children('.modal-content2').children('.modal-body2').children('#loadLC').hide()
    $('#UploadCounter').children('.modal-content2').children('.modal-body2').append('<div id="loadLC"><div style="padding-left: 20px;"><a href="../img/Форма загрузки показаний счетчиков.xlsx" download="" title="Скачать форму">Форма загрузки показаний счетчиков</a><br><br><input id="filesInd" onchange="CounterIndication(this)" type="file"><br></div><table class="table" id="tblIndics"><thead><tr><th>ЛС</th><th>Номер счетчика</th><th>Тип счетчика</th><th>Количество тарифов</th><th>Тариф</th><th>Показания</th><th>Дата внесения показаний</th></tr></thead><tbody id="Indics"></tbody></table><br></div>')

    //  $('#UploadCounter').children('.modal-content2').children('.modal-body2').children('#loadLC_2').show();

    $('#UploadCounter').children('.modal-content2').children('.modal-footer2').children('#loadExC').hide();
    $('#UploadCounter').children('.modal-content2').children('.modal-footer2').append('<input type="button" id="loadExC" onclick="AddCounterValue_mass(this)" name="name" value="Загрузить" style="float: left; width: 25%; height: 78%; background-color: white; color: black; font-weight: 700;">')


    if ($('#objsM').val() != 0) {
        $('#UploadCounter').show();
    }
    else {
        $('#objsM_E').remove();
        $('#objsM').after('<label id="objsM_E" style="color:red">Необходимо выбрать объект</label>')
    }


}

function AddCounterValue_mass(e) {

    $('.ui-loader-background').show();
    $('#loader').show();
    var SCORE_ID
    var METERS_NUMBER
    var TYPE
    var AMUNT_TARIF
    var TARIF
    var OBJECT_ID
    var ROOM_TYPE

    var mtrs = []
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    var strDate = (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + d.getFullYear()
    strDate = strDate.split('-');

    var Lastpage = $('#tblIndics_paginate span a:last').text();
    Lastpage = parseInt(Lastpage)
    for (var p = 1; p <= Lastpage; p++) {
        $('#tblIndics_paginate span a:contains(' + p + '):first').click();
        var tr = $('#Indics tr').length
        for (var i = 0; i < tr; i++) {

            SCORE_ID = $('#Indics tr:eq(' + i + ') td:eq(0)').text();
            METERS_NUMBER = $('#Indics tr:eq(' + i + ') td:eq(1)').text();
            TYPE = $('#Indics tr:eq(' + i + ') td:eq(2)').text()
            AMUNT_TARIF = $('#Indics tr:eq(' + i + ') td:eq(3)').text();
            TYPE = (TYPE == "Электроэнергия") ? $('#Indics tr:eq(' + i + ') td:eq(4)').text() : TYPE;
            OBJECT_ID = $('#Indics tr:eq(' + i + ') td:eq(5)').text();
            ROOM_TYPE = $('#Indics tr:eq(' + i + ') td:eq(6)').text().split('.')
            ROOM_TYPE = ROOM_TYPE[2] + "-" + ROOM_TYPE[1] + "-" + ROOM_TYPE[0]
            mtrs.push({ "SCORE_ID": SCORE_ID, "METERS_NUMBER": METERS_NUMBER, "TYPE": TYPE, "AMUNT_TARIF": AMUNT_TARIF, "OBJECT_ID": OBJECT_ID, "ROOM_TYPE": ROOM_TYPE })

        }
    }
    ////console.log(mtrs)


    var obj = { "trueValues": mtrs }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/AddCounterValue_mass",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //  async:false,
        success: function (data) {
            $('#closeUplC').click();


            $('.ui-loader-background').hide();
            $('#loader').hide();

        }
    })


}

function GetDatePoll_And_Control(e, typ) {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    if (typ == 5) {
        var valuedate = $(e).val()
        //var today2 = today.split('-').reverse().join('-')
        //valuedate = valuedate.split('-').reverse().join('-')
        if (ComputeBiggerDateNotReverse(today, valuedate, '-') == 1) {
            $(e).val(today)
        }

    }
    if (e == undefined && typ == null) {

        $('#dateVoteStart,#dateVoteEnd').val(today).attr('min', today);

    }

}
function flPolls(e, flt) {
    $("#loader").show();
    $('.ui-loader-background').show();
    var filePath = $(e).val();
    var index = filePath.lastIndexOf("\\") + 1;
    var filename = filePath.substr(index);
    $('#files_E').remove();
    var ext = e.value.split('.').pop();
    if (ext == "png" || ext == "jpg") {
        readURLVariantsFoto(e, flt);
    }
    else {
        $('.ui-loader-background').hide();
        $("#loader").hide();
        if (flt == undefined) {
            $(e).before('<label id="files_E" style="color:red;float:right">(png*, jpg*)</label>');
        }
        else {
            $(e).after('<label id="files_E" style="color:red">(png*, jpg*)</label>')
        }
    }
}
function readURLVariantsFoto(input, imgName) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {


            $('.foto-disp').attr('src', e.target.result);

            //var nameImg = imgName
            //var arrayBuffer = reader.result
            //var bytes = new Uint8Array(arrayBuffer);
            //var obj = { baseString: bytes, imgName: nameImg };
            var formData = new FormData();
            // var idFiles = $(input).attr('id')
            var file = input.files[0];

            formData.append('file', file, encodeURI(file.name));
            formData.append('object_id', '1');
            ////console.log(formData);



            $.ajax({
                error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",//window.location.protocol + '//' + window.location.host + "
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                timeout: 3600000,
                crossDomain: true,

                success: function (result) {
                    $("#loader").hide();
                    ////console.log(result)

                    var F_ile = result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/")//style="font-size: 14px;float: right;" 
                    if (imgName == undefined) {
                        $(input).after('<img src=' + F_ile + ' ><i class="fa fa-close removing3" itemid="1" onclick="removeVariantImg(this)" aria-hidden="true"></i>')
                    }
                    else {
                        $(input).after('<img src=' + F_ile + ' style="width:10%;"><i class="fa fa-close removing3"  style="float:left" onclick="removeVariantImg(this)" aria-hidden="true"></i>')
                    }


                    $(input).val('').hide();


                    $('.ui-loader-background').hide();
                    $("#loader").hide();

                },

                error: function (r) {

                    //  //alert("Error");
                    //  //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    $("#loader").hide();
                    var filePath = $('#files').val();
                    var index = filePath.lastIndexOf("\\") + 1;
                    var filename = filePath.substr(index);
                    // readURL(input, filename)
                },
                complete: function (r) {
                    //var jsonEroorData = JSON.parse(r);

                    //if (r.readyState == 4 && r.status == 200) { //do something }; 
                    //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
                    //    $("#loader").hide();
                    //}
                },
                failure: function (r) {
                    alert("FAIL");
                }
            });


        }


    }
}
function removeVariantImg(e) {
    $(e).prev('img').remove();
    $(e).prev('input[type="file"]').show();
    $(e).remove();
}
function AddQuestion(e) {
    $(e).before('<div id="question" class="question"><button id="delQuest1" onclick="RemoveQuestion(this)" class="delQuest"><i class="fa fa-close"></i></button>&nbsp;<label>Вопрос</label><br><textarea rows="4" id="voteText1" cols="50">Текст вопроса</textarea><br><p>Варианты ответа:</p><div style="margin-bottom: -10px; margin-top: -20px;"><br><input type="radio" checked="checked" id="selType_one" name="selType"><span style="margin-right: 15px">Множественный выбор</span><input type="radio" name="selType" id="selType_many" style=""><span> Единичный выбор</span></div><ul style="margin: 2em 0 0.5em 0;"><li class="variants"><button onclick="removeVariant(this)" class=""><i class="fa fa-close"></i></button>&nbsp;<input type="file" onchange="flPolls(this)"><input type="text" id="voteQ1V1"></li><br><li class="variants"><button onclick="removeVariant(this)" class=""><i class="fa fa-close"></i></button>&nbsp;<input type="file"  onchange="flPolls(this)"><input type="text" id="voteQ1V2"></li></ul><button id="addQuestVar" onclick="AddVariant(this)" style="padding: 0.3em;"><i class="fa fa-plus"></i></button>&nbsp;Добавить вариант ответа</div>')
    //  var elementPosotion = $(e).prev('#question').height()
    //("html, body").animate({ scrollTop: elementPosotion }, "slow");
    $(window).scrollTop($(e).prev('#question').offset().top);
    $('#question').children('button').children('i').removeAttr('style')





}
function AddVariant(e) {
    $(e).prev().append('<br><li class="variants"><button onclick="removeVariant(this)"><i class="fa fa-close"></i></button>&nbsp;<input type="file"  onchange="flPolls(this)"><input type="text" id="voteQ1V2"></li>');
    $('.variants').children('button').children('i').removeAttr('style')
}

function removeVariant(e) {
    var countoVaraint = $('.variants').length
    if (countoVaraint > 2) {
        $(e).parent().next('br').remove();
        $(e).parent().remove();
    }
    else {

        $(e).children('i').css('color', 'lightgray');
    }

}


function RemoveQuestion(e) {
    var countOfQuestion = $('.question').length
    if (countOfQuestion > 1) {
        $(e).parent().next('br').remove();
        $(e).parent().remove();
    }
    else {
        $(e).children('i').css('color', 'lightgray');
    }
}

function GenerateJson(e) {
    jsonObj = [];
    $(e).children(':input').each(function () {
        var id = $(this).attr('id');
        var value = $(this).val();
        item = {}
        item["id"] = id;
        item["value"] = value;
        jsonObj.push(item);
    })

    ////console.log(jsonObj);
}


function GetNewsRegister(Log) {
    var obj = { "guid": null, "lg": Log }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "NewsRegister.aspx/GetNews",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var jsondata_ = JSON.parse(data.d)
            ////console.log(jsondata_)  
            $('#tblNews').dataTable({
                "destroy": true,
                columnDefs: [{ type: 'datetime', targets: 0 }],
                data: jsondata_,
                columns: [
                    {
                        'data': 'PUBLISH_DATETIME',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            var PUBLISH_DATETIME = oData.PUBLISH_DATETIME
                            PUBLISH_DATETIME = PUBLISH_DATETIME.substr(0, 16)
                            PUBLISH_DATETIME = PUBLISH_DATETIME.split(' ')
                            PUBLISH_DATETIME = PUBLISH_DATETIME[0].split('-').reverse().join('.') + ' ' + PUBLISH_DATETIME[1]
                            $(nTd).html('<a href="#"  onclick=GoToNews("' + oData.NEWS_GUID + '")>' + PUBLISH_DATETIME + '</a>');
                        }
                    },
                    {
                        'data': 'NEWS_HEADER',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {

                            $(nTd).html('<a href="#"  onclick=GoToNews("' + oData.NEWS_GUID + '")>' + oData.NEWS_HEADER + '</a>');
                        }
                    },
                    {
                        'data': 'ACCOUNT_NAME',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {

                            $(nTd).html('<a href="#"  onclick=GoToNews("' + oData.NEWS_GUID + '")>' + oData.ACCOUNT_NAME + '</a>');
                        }
                    },
                    {
                        'data': 'IS_IMPORTANT',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            var IS_IMPORTANT = (oData.IS_IMPORTANT == '0') ? '<i style="" data-icon="w" class="fa fa-minus" aria-hidden="true"></i>' : '<i style="" data-icon="w" class="fa fa-check" aria-hidden="true"></i>'
                            $(nTd).html('<a style="cursor:pointer" onclick=GoToNews("' + oData.NEWS_GUID + '")>' + IS_IMPORTANT + '</a>');
                        }
                    },
                    {
                        'data': 'TOP_ATTACHED',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            var TOP_ATTACHED = (oData.TOP_ATTACHED == '0') ? '<i style="" data-icon="w" class="fa fa-minus" aria-hidden="true"></i>' : '<i style="" data-icon="w" class="fa fa-plus" aria-hidden="true"></i>'
                            $(nTd).html('<a style="cursor:pointer" onclick=GoToNews("' + oData.NEWS_GUID + '") >' + TOP_ATTACHED + '</a>');
                        }
                    },
                    {
                        'data': 'PROJECT_NAME',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            var PROJECT_NAME = (oData.PROJECT_NAME == null) ? 'Для всех' : oData.PROJECT_NAME
                            $(nTd).html('<a href="#"  onclick=GoToNews("' + oData.NEWS_GUID + '") >' + PROJECT_NAME + '</a>');
                        }
                    }

                ],
                "order": [[0, 'desc']],
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
                    "aria": {
                        "sortAscending": ": активировать для сортировки столбца по возрастанию",
                        "sortDescending": ": активировать для сортировки столбца по убыванию"
                    }
                }
            })
        }
    })
}
function GetNewsDetail(guid) {
    var obj = { "guid": guid, "lg": null }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "NewsRegister.aspx/GetNews",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //   $('#SaveNews').text('Редактировать')
            $('#SaveNews,#SavePublish').attr('data-state', 'Update')
            var j = JSON.parse(data.d)
            ////console.log(j)
            var dateNews = j[0].PUBLISH_DATETIME
            dateNews = dateNews.substr(0, 10)
            //  dateNews = dateNews.split('-').reverse().join('.')
            $('#dateNews').val(dateNews)
            var timeNews = j[0].PUBLISH_DATETIME
            timeNews = timeNews.substring(11, 16);
            $('#timeNews').val(timeNews)
            $('#HeaderText').val(j[0].NEWS_HEADER)
            CKEDITOR.instances["NewText"].setData(j[0].NEWS_TEXT);
            $('#PreviewText').val(j[0].PREVIEW_TEXT)
            if (j[0].FILE_NAME != null) {
                $('#NewsFile').after('<a href="' + j[0].FILES + '"><img id="FileNews" src="../img/prik.png" style="width: 8%;"></a><i class="fa fa-close removing3" itemid="1" onclick="removeNewsFayl(this)" style="font-size: 14px; float: left;" aria-hidden="true"></i><label id="fileName">' + j[0].FILE_NAME + '</label>')
                $('#NewsFile').hide();
            }


            if (j[0].IMAGE != null) {
                $('#filesN').after('<img id="imgNews" src="' + j[0].IMAGE + '" style="width: 8%;"><i class="fa fa-close removing3" itemid="1" onclick="removeNewsImg(this)" style="font-size: 14px; float: left;" aria-hidden="true"></i>')
                $('#filesN').hide();
            }
            $('#ImpNews').prop('checked', j[0].IS_IMPORTANT)
            if (j[0].PROJECT_ID == null) {
                $('#forAll').prop('checked', true);
            }
            $('#fixed').prop('checked', j[0].TOP_ATTACHED)

            $('#fixed').before('<div style="border-style: groove; border-color: linen; width: 32%;"><span></span><br><input type="radio" id="Active" name="Activate" data-project="23"><span id="forAlbl" style="margin-right: 15px;"> Активно</span><input type="radio" checked="checked" name="Activate" id="NoneActive"><span> не Активно</span></div>')
            $('#Active').prop('checked', j[0].ACTIVE)
        }
    })
}
function GoToNews(guid) {
    sessionStorage.setItem('NewsGuid', guid)
    window.location.href = "CreateNews.aspx";
}
function SaveNews2() {
    var NewsGuid = sessionStorage.getItem('NewsGuid')
    var Log = sessionStorage.getItem("Log");
    if (NewsGuid != '') {

        var FileNews = ($('#FileNews').length != 0) ? $('#FileNews').parent().attr('href') : '';
        var fileName = ($('#FileNews').length != 0) ? $('#fileName').text() : '';
        var imgNews = ($('#imgNews').length != 0) ? $('#imgNews').attr('src') : '';
        var ImpNews = $('#ImpNews').prop('checked');
        var NewsFor = $("input[type='radio'][name='newsFor']:checked").attr('data-project');
        NewsFor = (NewsFor == undefined) ? '0' : NewsFor;
        var fixed = $('#fixed').prop('checked')
        var PreviewText = $('#PreviewText').val()
        var NewText = CKEDITOR.instances["NewText"].getData();
        var dateNews = $('#dateNews').val();
        dateNews = dateNews.split('-').reverse().join('.')
        var timeNews = $('#timeNews').val();
        var HeaderText = $('#HeaderText').val()
        var Active = $('#Active').prop('checked')
        UpdateNews(dateNews, timeNews, NewText, PreviewText, HeaderText, FileNews, fileName, imgNews, ImpNews, NewsFor, Log, Active, fixed, NewsGuid)
    }
    else {
        $('#SaveNews').click();
    }

}
function PublishNews2() {
    var NewsGuid = sessionStorage.getItem('NewsGuid')
    var Log = sessionStorage.getItem("Log");
    if (NewsGuid != '') {
        var FileNews = ($('#FileNews').length != 0) ? $('#FileNews').parent().attr('href') : '';
        var fileName = ($('#FileNews').length != 0) ? $('#fileName').text() : '';
        var imgNews = ($('#imgNews').length != 0) ? $('#imgNews').attr('src') : '';
        var ImpNews = $('#ImpNews').prop('checked');
        var NewsFor = $("input[type='radio'][name='newsFor']:checked").attr('data-project');
        NewsFor = (NewsFor == undefined) ? '0' : NewsFor;
        var fixed = $('#fixed').prop('checked')
        var PreviewText = $('#PreviewText').val()
        var NewText = CKEDITOR.instances["NewText"].getData();
        var dateNews = $('#dateNews').val();
        dateNews = dateNews.split('-').reverse().join('.')
        var timeNews = $('#timeNews').val();
        var HeaderText = $('#HeaderText').val()
        UpdateNews(dateNews, timeNews, NewText, PreviewText, HeaderText, FileNews, fileName, imgNews, ImpNews, NewsFor, Log, true, fixed, NewsGuid)
    }
    else {
        $('#SavePublish').click();
    }

}
function ShowMore() {
    $('#Ptext').empty();
    var NewText = CKEDITOR.instances["NewText"].getData();
    $('#Ptext').append(NewText)
    $('#ModalBNP').children('.modal-contentBnp').children('.modal-bodybnp').find('h2').css('color', 'black')

}
var port = location.port
function closeNewsPreview(e) {
    $('#closebnp').click();
}
if (port.length == 0) {
    if (window.location.protocol == "https:") {
        port = ':443'
    }
    else {
        port = ':80'
    }
}
else {
    port = '';
}
function SaveNews(dateNews, timeNews, NewText, PreviewText, HeaderText, FileUrl, FileName, imgNews, ImpNews, NewsFor, Log, active, fixed_) {
    NewText = NewText.replace(/\</g, '&lt;')
    NewText = NewText.replace(/\>/g, '&gt;')
    var frmData = new FormData();
    frmData.append('dateNews', dateNews);
    frmData.append('timeNews', timeNews);
    frmData.append('NewText', NewText);
    frmData.append('PreviewText', PreviewText);
    frmData.append('HeaderText', HeaderText)
    frmData.append('FileUrl', FileUrl)
    frmData.append('FileName', FileName)
    frmData.append('imgNews', imgNews);
    frmData.append('ImpNews', ImpNews);
    frmData.append('NewsFor', NewsFor);
    frmData.append('lg', Log);
    frmData.append('active', active);
    frmData.append('fixed', fixed_)
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + port + '/ProjectApi/Request_Fili/SaveNews',//'http://localhost:63362/Request_Fili/SaveNews',//
        data: frmData,

        contentType: false,// 'multipart/form-data',
        processData: false,
        //  dataType: "JSON",
        cache: false,
        // timeout: 3600000,
        //crossDomain: true,

        success: function (data) {
            data = JSON.parse(data)
            if (active == true) {
                var PROJECT_ID = $("input[type='radio'][name='newsFor']:checked").attr('data-project');
                PROJECT_ID = (PROJECT_ID == undefined) ? '' : PROJECT_ID;
                SaveFCM('Новости', 'Новости', $('#HeaderText').val(), PROJECT_ID, '', Log, 'CreateNews.aspx', data[0].NEWS_ID)
            }
            //var r = data
            window.location.href = 'NewsRegister.aspx'
        }
    })
}
function UpdateNews(dateNews, timeNews, NewText, PreviewText, HeaderText, FileUrl, FileName, imgNews, ImpNews, NewsFor, Log, active, fixed_, guid) {
    NewText = NewText.replace(/\</g, '&lt;')
    NewText = NewText.replace(/\>/g, '&gt;')
    var frmData = new FormData();
    frmData.append('dateNews', dateNews);
    frmData.append('timeNews', timeNews);
    frmData.append('NewText', NewText);
    frmData.append('PreviewText', PreviewText);
    frmData.append('HeaderText', HeaderText)
    frmData.append('FileUrl', FileUrl)
    frmData.append('FileName', FileName)
    frmData.append('imgNews', imgNews);
    frmData.append('ImpNews', ImpNews);
    frmData.append('NewsFor', NewsFor);
    frmData.append('lg', Log);
    frmData.append('active', active);
    frmData.append('fixed', fixed_);
    frmData.append('guid', guid)
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + port + '/ProjectApi/Request_Fili/UpdateNews',//'http://localhost:63362/Request_Fili/SaveNews'
        data: frmData,

        contentType: false,// 'multipart/form-data',
        processData: false,
        //  dataType: "JSON",
        cache: false,
        // timeout: 3600000,
        //crossDomain: true,

        success: function (result) {
            var r = result
            window.location.href = 'NewsRegister.aspx'
        }
    })
}
function readURLNews(input, imgName) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {


            $('.foto-disp').attr('src', e.target.result);

            //var nameImg = imgName
            //var arrayBuffer = reader.result
            //var bytes = new Uint8Array(arrayBuffer);
            //var obj = { baseString: bytes, imgName: nameImg };
            var formData = new FormData();
            var idFiles = $(input).attr('id')
            var file = document.getElementById(idFiles).files[0];

            formData.append('file', file, encodeURI(file.name));
            formData.append('object_id', '1');
            ////console.log(formData);



            $.ajax({
                error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",//window.location.protocol + '//' + window.location.host + "
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                timeout: 3600000,
                crossDomain: true,

                success: function (result) {
                    $("#loader").hide();

                    var F_ile = result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/")
                    var extention = F_ile.substr(F_ile.lastIndexOf(".") + 1)
                    if (idFiles == 'filesN') {
                        $("#filesN").hide();
                        $("#filesN").after('<img id="imgNews" src=' + F_ile + ' style="width: 8%;"><i class="fa fa-close removing3" itemid="1" onclick="removeNewsImg(this)" style="font-size: 14px; float: left;" aria-hidden="true"></i>')
                    }
                    else {
                        $("#NewsFile").after('<a href=' + F_ile + '><img id="FileNews" src="../img/prik.png" style="width: 8%;"/></a><i class="fa fa-close removing3" itemid="1" onclick="removeNewsFayl(this)" style="font-size: 14px; float: left;" aria-hidden="true"></i><label id="fileName"> ' + imgName + '</label>')
                        $('#NewsFile').hide();
                    }


                    $('.ui-loader-background').hide();
                    $("#loader").hide();

                },

                error: function (r) {

                    //  //alert("Error");
                    //  //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    $("#loader").hide();
                    var filePath = $('#files').val();
                    var index = filePath.lastIndexOf("\\") + 1;
                    var filename = filePath.substr(index);
                    // readURL(input, filename)
                },
                complete: function (r) {
                    //var jsonEroorData = JSON.parse(r);

                    //if (r.readyState == 4 && r.status == 200) { //do something }; 
                    //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
                    //    $("#loader").hide();
                    //}
                },
                failure: function (r) {
                    alert("FAIL");
                }
            });


        }


    }
}
function removeNewsFayl(e) {
    $(e).prev().remove();
    $('#fileName').remove();

    $(e).remove();
    $('#NewsFile').show().val('');
}
function removeNewsImg(e) {
    $(e).prev().remove();
    $(e).remove();
    $('#filesN').show().val('');
}

function getProjectNamebyLogin(lg) {

    var Obj = { "lg": lg }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "CreateNews.aspx/getProjectNamebyLogin",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d)
            $('#forAlbl').text(j[0].PROJECT_NAME)
            $('#forAlbl').prev().prop('checked', 'checked').attr('data-project', j[0].PROJECT_ID);
        }
    })
}

function getDateAndTime() {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    $('#dateNews').val(today);

    var d = new Date(),
        h = d.getHours(),
        m = d.getMinutes();
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    $('#timeNews').val(h + ':' + m)
}
function ConnectServicetoProject(sets, directs, services, prj) {
    var Obj = { "prj": prj, 'sets': JSON.stringify(sets), 'directs': JSON.stringify(directs), 'services': JSON.stringify(services) }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Services.aspx/ConnectServicetoProject",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            AddNewServicesToProject()
            GetExistDirections(prj)


        }
    })
}
function GenerateQr_For_Room() {
    // $('.ui-loader-background').show();
    //  $('#loader').show();
    var objId = $('#objs').val();
    var Log = sessionStorage.getItem("Log");
    var Room_types = []

    Room_types.push({ 'ROOM_TYPE': $('#r_t').val() })
    window.open('../QRS.aspx?obj=' + objId + '&lg=' + Log + '&types=' + btoa(JSON.stringify(Room_types)) + '&roomId=' + sessionStorage.getItem("apart") + '', '_blank')
    // GenerateQRCOde(objId, Log, Room_types, parseInt(sessionStorage.getItem("apart")))

}
function CreateQrCode(e) {


    var objId = $('#objsM').val();
    var Log = sessionStorage.getItem("Log");
    var Room_types = [];
    $('#myModal4').children('.modal-content2').children('.modal-body2').children('input[type = "checkbox"]:checked').each(function () {
        Room_types.push({ 'ROOM_TYPE': parseInt($(this).attr('value')) })
        //Room_types = Room_types +  $(this).attr('value') + ",";
    })
    window.open('../QRS.aspx?obj=' + objId + '&lg=' + Log + '&types=' + btoa(JSON.stringify(Room_types)) + '&roomId=' + 0 + '', '_blank')
}
function getProjects(lg) {
    var Obj = { "UprId": lg }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Services.aspx/GetProjects",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            var j = JSON.parse(data.d)
            for (var i = 0; i < j.length; i++) {

                $('#prj').append('<option guid=' + j[0].GUID + ' value=' + j[i].GUID + '>' + j[i].PROJECT_NAME + '</option>')
            }                                                               //PROJECT_ID
            GetExistDirections(j[0].GUID)
            // GetDirectionsGrups(j[0].PROJECT_ID)

        }
    })
}

function GetExistDirections(prj) {

    var Obj = { "project_Guid": prj }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Services.aspx/GetExistDirections",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            var j = JSON.parse(data.d)
            $('#ExistDirections,#ExistServices,#ExistGrups,#ExistCostServices').empty();

            if (j.length != 0) {
                for (var i = 0; i < j.length; i++) {
                    $('#ExistDirections').append('<div onclick=SelectDirect(this,\"' + j[i].GUID + '\",\"' + prj + '\") data-r=' + j[i].RESPONSIBLE_ID + ' data-direct=' + j[i].GUID + '><img src=' + j[i].ICON + '  class="directimg"><label class="directLabel">' + j[i].NAME + '</label><hr></div>')
                    GetDirectionsGrups(j[i].GUID, j[i].NAME, prj)
                }
            }
        }
    })
}
function GetDirectionsGrups(DIRECTION_GUID, DirectNAME, PROJECT_GUID) {

    var Obj = { "PROJECT_GUID": PROJECT_GUID, 'DIRECTION_GUID': DIRECTION_GUID, SERVICE_GUID: "" }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Services.aspx/GetDirections_Grups_and_Services",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        error: function (e) {
            console.log(e)
            console.log(Obj)
            console.log('++')
        },
        success: function (data) {
            var j = JSON.parse(data.d)


            console.log(j)
            if (j.length != 0) {
                //  $('#ExistGrups').append('<div data-direct=' + DIRECTION_GUID + ' class="cornFlower">' + DirectNAME + '</div><hr/>')
                for (var i = 0; i < j.length; i++) {
                    //if (i==0) {
                    //    $('#ExistGrups').append('<div data-s=' + SSID + '><div class="cornFlower">' + SSNAME+'</div></div>')

                    //}
                    // if (j[i].NAME == 'ТЭО' || j[i].NAME == 'Vipklimat') {

                    //selectDirect
                    $('#ExistGrups').append('<div onclick=selectGrups(this,\"' + DIRECTION_GUID + '\",\"' + j[i].SERVICE_GUID + '\") onclick data-direct=' + DIRECTION_GUID + ' data-grup=' + j[i].SERVICE_GUID + '><img src=' + j[i].SERVICE_ICON + ' class="GrupImg">' + DirectNAME + '<i class="glyphicon glyphicon-arrow-right SuppGrupRelations"></i><label class="grupLabel">' + j[i].SERVICE_NAME + '</label><hr></div>')
                    if (i == 0) {

                    }
                    getExisServices(PROJECT_GUID, DIRECTION_GUID, j[i].SERVICE_GUID, DirectNAME, j[i].SERVICE_NAME)
                    // }
                }
            }
        }
    })
}
function getExisServices(prj, DIRECTION_GUID, SERVICE_GUID, DIRECTION_NAME, SERVICE_NAME) {
    var Obj = { "PROJECT_GUID": prj, 'DIRECTION_GUID': DIRECTION_GUID, 'SERVICE_GUID': SERVICE_GUID }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Services.aspx/GetDirections_Grups_and_Services",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (e) {
            console.log('--')
            console.log(Obj)
            console.log(e)
        },
        success: function (data) {

            var j = JSON.parse(data.d)

            if (j.length != 0) {
                $('#ExistServices').append('<div data-grup=' + SERVICE_GUID + ' data-direct=' + DIRECTION_GUID + ' class="cornFlower">' + DIRECTION_NAME + ' > ' + SERVICE_NAME + '</div></div>')
                for (var i = 0; i < j.length; i++) {
                    var hr = (i == j.length - 1) ? '<hr>' : '<br/>';

                    //  var ss = 'onlclick="SelectService(this,\"' + j[i].SERVICE_GUID + '\",\"' + DIRECTION_GUID + '\",\"' + SERVICE_GUID + '\")"'
                    $('#ExistServices').append('<div onclick=\"SelectService(this,\"' + j[i].SERVICE_GUID + '\",\"' + DIRECTION_GUID + '\",\"' + SERVICE_GUID + '\")" data-cost=\"' + j[i].SERVICE_COST + '\" data-edizm=\"' + j[i].SERVICE_UINIT + '\" data-quant="true" data-grup=\"' + SERVICE_GUID + '\" data-direct=\"' + DIRECTION_GUID + '\"><div itemid=\"' + j[i].SERVICE_GUID + '\"><label itemid=\"' + j[i].SERVICE_GUID + '\">' + j[i].SERVICE_NAME + '</label>' + hr + '</div></div>')



                }



                //append('<div data-s=' + s + ' data-d=' + d + '><div>' + SSNAME + ' > ' + dname + '</div></div>')
                for (var i = 0; i < j.length; i++) {
                    if (i == 0) {
                        $('#ExistCostServices').append('<div data-service=' + j[i].SERVICE_GUID + '  data-grup=' + SERVICE_GUID + ' data-direct=' + DIRECTION_GUID + ' class="cornFlower">' + DIRECTION_NAME + ' > ' + SERVICE_NAME + ' </div>')
                    }

                    var nmbr = (j[i].SERVICE_COST != 'Договорная') ? 'value=' + j[i].SERVICE_COST : 'disabled=disabled'
                    var doq = (j[i].SERVICE_COST == 'Договорная') ? 'checked=checked' : ''
                    $('#ExistCostServices').append('<div data-grup=' + SERVICE_GUID + ' data-direct=' + DIRECTION_GUID + ' data-service=' + j[i].SERVICE_GUID + ' class="margTop0"><label itemid=' + SERVICE_GUID + ' class="checkBx ServiceLabel" >' + j[i].SERVICE_NAME + '</label><input type="number" ' + nmbr + ' id="nmbr" onchange="checkNumber(this)" min="0" itemid=' + SERVICE_GUID + ' class="ServiceNmbr"><label class="labelDoq" >Договорная</label><input itemid=' + SERVICE_GUID + ' id="chk" onclick="checkCheckbox(this)" type="checkbox" ' + doq + ' class="Servicechkbx"><hr></div>')
                }
            }

        }
    })
}
function SelectDirect(e, d_guid, p_Guid) {
    $('#ExistDirections').children('div').css('background-color', 'white');

    $('#ExistDirections').children('div').children('.btn').remove();

    $(e).css('background-color', 'lightskyblue');

    $(e).children('label').after('<input type="button" onclick=DeleteDirection_(this,\"' + d_guid + '\") class="btn genBtn" value="Удалить"><input type="button" onclick=UpdateDirectService(this,"' + d_guid + '\") class="btn genBtn" style="float:right" value="Редактировать" >')
    $('#cls').click(function () {
        $('#mh2').text('');
        $('.modal-body2').empty();
        $('.modal-body2').append('<p id="txt2" style="font-size: 23px;">Some text in the Modal Body</p>')
        $('#deleteO').val('Удалить')
    })
}
function SelectService(e, servId, sId, dId) {
    $('#ExistServices').children('div').css('background-color', 'white');

    $('#ExistServices').children('div').children('div').children('.btn').remove();

    $(e).css('background-color', 'lightskyblue');

    $(e).children('div').children('label').after('<input type="button" onclick=DelService(this,' + servId + ') class="btn genBtn" value="Удалить"><input type="button" onclick=UpdService(this,' + servId + ') class="btn genBtn" style="float:right" value="Редактировать" >')
    $('#cls').click(function () {
        $('#mh2').text('');
        $('.modal-body2').empty();
        $('.modal-body2').append('<p id="txt2" style="font-size: 23px;">Some text in the Modal Body</p>')
        $('#deleteO').val('Удалить')
    })
}
function DelService(e, ServId) {
    alertWithButton2("Удалить услугу", "Услуга будет удалено вместе со связанными стоимостими", "", "", "", "", "");
    $('#myModal2').children('.modal-content2').children('.modal-footer2').children('input[type="button"]:eq(1)').attr('onclick', 'deletingService(' + ServId + ')')
}
function deletingService(servId) {
    var obj = { 'ServId': servId, 'prj': $('#prj').val() }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Services.aspx/DeleteService",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //  $('#ExistGrups, #ExistServices, #ExistCostServices').children('div[data-d=' + dId + ']').remove();
            GetExistDirections($('#prj').val())
            $('#myModal2').hide()
        }
    })
}
function selectGrups(e, d_guid, grup_guid) {//selectDirect
    $('#ExistGrups').children('div').css('background-color', 'white');

    $('#ExistGrups').children('div').children('.btn').remove();

    $(e).css('background-color', 'lightskyblue');

    $(e).children('label').after('<input type="button" onclick=Delete_Grup(this,\"' + grup_guid + '\") class="btn genBtn" value="Удалить"><input type="button" onclick=UpdateDirect(this,\"' + d_guid + '\",\"' + grup_guid + '\") class="btn genBtn" style="float:right" value="Редактировать" >')



}

function AddNewServicesToProject() {

    //alertWithButton2("Добавить Направления", "", "", "", "", "", "", "")
    //$('#myModal2').children('.modal-content2').children('.modal-body2').empty();
    //$('#myModal2').children('.modal-content2').children('.modal-body2').css('height', '').css('width','100%');
    //$('#myModal2').children('.modal-content2').css('width','70%')
    //window.onclick = undefined;
    //$('#myModal2').children('.modal-content2').children('.modal-body2').append('<div class="col-sm-6 col-md-3"><h4>Направления</h4><div class="bordBox"><ul id="AllServiceSets" class="catList"></ul></div></div><div class="col-sm-6 col-md-3"><h4>Группы Услуг</h4><div class="bordBox"><ul id="AllServiceDirect" class="catList"></ul></div></div><div class="col-sm-6 col-md-3"><h4>Услуги</h4><div class="bordBox"><ul id="AllServices" class="catList"></ul></div></div><div class="col-sm-6 col-md-3"><h4>Стоимость (руб.)</h4><div id="AllServicesCost" class="bordBox"></div></div>')

    // 

    var IsVisible = $('#AllSSS').css('display');
    if (IsVisible == 'none') {
        getAllServices()
        $('#AllSSS').slideDown();
    }
    else {

        $('#AllSSS').slideUp();
        $('#AllServiceSets,#AllDirects,#AllServices,#AllServicesCost').empty();
    }
    //


}
function getAllServices() {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Services.aspx/GetAllServiceSet",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            ////console.log(data)
            var j = JSON.parse(data.d);
            for (var i = 0; i < j.length; i++) {
                $('#AllServiceSets').append('<input type="checkbox" onclick=getDirectsForAll(this,' + j[i].SERVICE_SET_ID + ') data-s=' + j[i].SERVICE_SET_ID + ' id="Sname2"><a class="genBtn" data-s=' + j[i].SERVICE_SET_ID + ' onclick=IconsForAll(this,' + j[i].SERVICE_SET_ID + '); style="float: right;font-size: 12px;">Иконка</a><label data-s=' + j[i].SERVICE_SET_ID + ' style="margin-left: 20px !important;">' + j[i].SERVICE_SET_NAME + '</label><hr/>')

            }

        }
    })
}
function getDirectsForAll(e, sid) {
    var ischecked = $(e).prop('checked');// 
    if (ischecked == true) {
        var SetName = $(e).next().next().text();
        $('#AllDirects').append('<div data-s="' + sid + '"><div style="border-style: double;border-color: rgb(0, 100, 223);">' + SetName + '</div></div>')
        var obj = { 'sid': sid }
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Services.aspx/GetAllDirectsforAll",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var j = JSON.parse(data.d)
                for (var i = 0; i < j.length; i++) {
                    $('#AllDirects').children('div[data-s=' + sid + ']').append('<div data-s="' + sid + '" data-d=' + j[i].DIRECTION_ID + '><input onclick="GetServicesForAll(this,' + j[i].DIRECTION_ID + ',' + sid + ')" type="checkbox" data-d="' + j[i].DIRECTION_ID + '" data-s="' + sid + '" ><a class="genBtn" data-d="' + j[i].DIRECTION_ID + '" onclick="DIconsForAll(this,' + j[i].DIRECTION_ID + ',' + sid + ');" style="float: right;font-size:12px;">Иконка</a><label  style= "margin-left:20px !important;"> ' + j[i].DIRECTION_NAME + '</label><hr/></div>')
                }
            }
        })

    }
    else {
        $('#AllServicesCost').children('div[data-s=' + sid + ']+br').remove();
        $('#AllServicesCost').children('div[data-s=' + sid + ']+br').remove();
        $('#AllServicesCost').children('div[data-s=' + sid + ']+br').remove();
        $('#AllDirects,#AllServices,#AllServicesCost').children('div[data-s=' + sid + ']').remove();

    }
}

function GetServicesForAll(e, dId, sid) {
    var Dname = $(e).next().next().text();
    var SName = $('#AllServiceSets').children('label[data-s=' + sid + ']').text()
    if ($(e).prop('checked') == true) {

        //

        $('#AllServices').append('<div data-s=' + sid + ' data-d=' + dId + '><div style="border-style: double;border-color: rgb(0, 100, 223);">' + SName + ' / ' + Dname + '</div></div>')

        var obj = { 'dId': dId }
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Services.aspx/GetServicesForAll",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var j = JSON.parse(data.d);
                for (var i = 0; i < j.length; i++) {

                    $('#AllServices').children('div[data-d=' + dId + ']').append('<div data-serv=' + j[i].SERVICE_ID + ' data-s="' + sid + '" data-d="' + dId + '"><input onclick="MakeSelectService(this,' + j[i].SERVICE_ID + ',' + sid + ',' + dId + ')" type="checkbox" data-s="' + sid + '" data-d="' + dId + '"><label style="margin-left:20px !important;">' + j[i].SERVICE_NAME + '</label><hr></div>')

                    //$('#AllServicesCost').children('div[data-d=' + dId + ']').append('<div  data-serv=' + j[i].SERVICE_ID + ' data-s="' + sid + '" data-d="' + dId + '" class="margTop0"><label itemid="1" class="checkBx" style="margin-left: 0px !important;">' + j[i].SERVICE_NAME+'</label><input type="number"  id="nmbr" onchange="checkNumber(this)" min="0" itemid="1" style="-right: -23px; */float: left;"><label style="float:right;">Договорная</label><input itemid="1" id="chk" onclick="checkCheckboxDis(this)" type="checkbox" style="float: right; margin-right:7px;"><hr></div>')
                }


                $('#ExistServices').children('div[data-d=' + dId + ']').each(function () {
                    var existServId = $(this).children('div').attr('itemid');
                    if (existServId != undefined) {
                        for (var i = 0; i < j.length; i++) {

                            if (existServId == j[i].SERVICE_ID) {
                                $('#AllServices').children('div[data-d=' + dId + ']').children('div[data-serv=' + j[i].SERVICE_ID + ']').remove();
                                //$('#AllServicesCost').children('div[data-d=' + dId + ']').children('div[data-serv=' + j[i].SERVICE_ID + ']').remove();
                            }
                        }
                    }
                })


            }
        })
    }
    else {
        $('#AllServices').children('div[data-d=' + dId + ']').remove();
        $('#AllServicesCost').children('div[data-d="' + dId + '"]+br').remove();
        $('#AllServicesCost').children('div[data-d="' + dId + '"]+br').remove();
        $('#AllServicesCost').children('div[data-d="' + dId + '"]+br').remove();
        $('#AllServicesCost').children('div[data-d=' + dId + ']').remove();
    }
}

function MakeSelectService(e, servId, sid, dId) {
    if ($(e).prop('checked') == true) {
        var SNmaeAndDName = $(e).parent().parent().children('div:eq(0)').text();
        var ServiceName = $(e).next().text();


        if ($('#AllServicesCost').children('div[data-d=' + dId + ']').length == 0) {
            $('#AllServicesCost').append('<div data-s="' + sid + '" data-d="' + dId + '" ><div  style="border-style: double;border-color: rgb(0, 100, 223)">' + SNmaeAndDName + '</div><div  data-serv=' + servId + ' data-s="' + sid + '" data-d="' + dId + '" class="margTop0"><label itemid="1" class="checkBx" style="margin-left: 0px !important;">' + ServiceName + '</label><input type="number"  id="nmbr" onchange="checkNumber(this)" min="0" itemid="1" style="-right: -23px; */float: left;"><label style="float:right;">Договорная</label><input  id="chk" onclick="checkCheckboxDis(this)" type="checkbox" style="float: right; margin-right:7px;"><hr></div></div><br><br><br>')
        }
        else {
            $('#AllServicesCost').children('div[data-d=' + dId + ']').append('<div  data-serv=' + servId + ' data-s="' + sid + '" data-d="' + dId + '" class="margTop0"><label itemid="1" class="checkBx" style="margin-left: 0px !important;">' + ServiceName + '</label><input type="number"  id="nmbr" onchange="checkNumber(this)" min="0" itemid="1" style="-right: -23px; */float: left;"><label style="float:right;">Договорная</label><input  id="chk" onclick="checkCheckboxDis(this)" type="checkbox" style="float: right; margin-right:7px;"><hr></div>')
        }
    }
    else {
        //  $('#AllServicesCost').children('div[data-serv=' + servId + ']').remove();
        $('#AllServicesCost').children('div[data-d="' + dId + '"]').children('div[data-serv=' + servId + ']').remove();

        if ($('#AllServicesCost').children('div[data-d="' + dId + '"]').children('.col-md-12').length == 0) {
            $('#AllServicesCost').children('div[data-d="' + dId + '"]+br').remove();
            $('#AllServicesCost').children('div[data-d="' + dId + '"]+br').remove();
            $('#AllServicesCost').children('div[data-d="' + dId + '"]+br').remove();
            $('#AllServicesCost').children('div[data-d="' + dId + '"]').remove();
            //  $('#AllServicesCost').children('div[data-d="' + dId + '"]').find('br').remove();
        }
    }



}
function checkCheckboxDis(e) {
    if ($(e).prop('checked') == true) {
        $(e).prev().prev().attr('disabled', 'disabled');
    }
    else {
        $(e).prev().prev().removeAttr('disabled');
    }
}

function DIconsForAll(e, dId, sid) {
    $(e).removeClass('genBtn').empty();
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Services.aspx/GetServiceDirectIcon",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            $('#AllDirects').parent().attr('class', 'col-sm-6 col-md-2');
            $('#AllDirectIconsAll').parent().remove();
            $('#AllDirects').parent().after('<div class="col-sm-6 col-md-1"><h4> Иконки</h4><div id="AllDirectIconsAll" class="bordBox"></div></div>')
            var j = JSON.parse(data.d)

            for (var i = 0; i < j.length; i++) {
                $('#AllDirectIconsAll').append('<a ><img onclick="SelectedDirectIcon(this,' + j[i].ICON_ID + ',' + dId + ',' + sid + ')" style="width: 110%;" src=' + j[i].ICON_ADRESS + ' class="icon" alt=""></a><hr>')
            }

        }
    })
}

function SelectedDirectIcon(e, diconid, dId, sid) {
    var diconSrc = $(e).attr('src');
    $('#AllDirects').children('div[data-s=' + sid + ']').children('div[data-d=' + dId + ']').children('a[data-d=' + dId + ']').empty()
    $('#AllDirects').children('div[data-s=' + sid + ']').children('div[data-d=' + dId + ']').children('a[data-d=' + dId + ']').removeClass('genBtn')
    $('#AllDirects').children('div[data-s=' + sid + ']').children('div[data-d=' + dId + ']').children('a[data-d=' + dId + ']').css('width', '20%')
    $('#AllDirects').children('div[data-s=' + sid + ']').children('div[data-d=' + dId + ']').children('a[data-d=' + dId + ']').append('<img src=' + diconSrc + ' style="width:100%" itemid=' + diconid + ' data-d=' + dId + ' data-s=' + sid + '/>')
    $('#AllDirects').parent().attr('class', 'col-sm-6 col-md-3')
    $('#AllDirectIconsAll').parent().remove();
}

function IconsForAll(e, sid) {
    $(e).removeClass('genBtn').empty();
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Services.aspx/getServiceSetIcon",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            $(e).parent().parent().attr('class', 'col-sm-6 col-md-2');
            $('#AllSetIconsAll').parent().remove();
            $(e).parent().parent().after('<div class="col-sm-6 col-md-1"><h4> Иконки</h4><div id="AllSetIconsAll" class="bordBox"></div></div>')
            var j = JSON.parse(data.d)

            for (var i = 0; i < j.length; i++) {
                $('#AllSetIconsAll').append('<a ><img onclick="SelectedSetIcon(this,' + j[i].S_ICON_ID + ',' + sid + ')" style="width: 110%;" src=' + j[i].S_ICON_ADRESS + ' class="icon" alt=""></a><hr>')
            }

        }
    })
}
function SelectedSetIcon(e, siconid, sid) {
    var iconSrc = $(e).attr('src');
    $('#AllServiceSets').children('a[data-s=' + sid + ']').empty()
    $('#AllServiceSets').children('a[data-s=' + sid + ']').removeClass('genBtn')
    $('#AllServiceSets').children('a[data-s=' + sid + ']').css('width', '20%')
    $('#AllServiceSets').children('a[data-s=' + sid + ']').append('<img src=' + iconSrc + ' style="width:100%" itemid=' + siconid + ' data-s=' + sid + '/>')
    $('#AllServiceSets').parent().attr('class', 'col-sm-6 col-md-3')
    $(e).parent().parent().parent().remove();
}
function UpdateDirect(e, sId, dId) {
    alertWithButton2("Редактировать Группа услуг", "", "", "", "", "", "", "");
    $('#myModal2').children('.modal-content2').css('width', '37%')
    var DName = $(e).prev().prev().text();
    var iconD = $(e).prev().prev().prev().attr('src');
    var iconDId = $(e).prev().prev().prev().attr('itemid');
    window.onclick = undefined;
    $('.modal-body2').empty().css('width', '100%')
    //$('.modal-body2').append('<div class="col-md-12"><div class="col-md-6" ><label> Название Группа Услуг</label><input type="text" id="Dname" value="' + DName + '" data-s=' + sId + ' data-d=' + dId + ' style="width: auto;"><img onclick="showAllDirectIcons(this)" id="directIcon" src=' + iconD + ' itemid=' + iconDId + ' style="width: 9%;margin-top: -5px;"></div></div>')
    $('.modal-body2').append('<div class="col-md-12"><div class="col-md-6"><label> Название Группа Услуг</label><input type="text" id="Dname" value="' + DName + '" data-s=' + sId + ' data-d=' + dId + ' style="width: auto;"><img onclick="showAllDirectIcons(this)" id="directIcon" src=' + iconD + ' itemid=' + iconDId + ' style="width: 11%;"></div></div>')
    $('#myModal2').children('.modal-content2').children('.modal-footer2').children('input[type="button"]:eq(1)').attr('onclick', 'UpdatingDirect()')
    $('#myModal2').children('.modal-content2').children('.modal-footer2').children('input[type="button"]:eq(1)').val('Редактировать')


}
function UpdatingDirect() {
    var succDirect = true;
    var directName = $('#Dname').val().trim()
    var dId = $('#Dname').attr('data-d');
    var sId = $('#Dname').attr('data-s');
    var iconId = $('#directIcon').attr('itemid')
    if (directName.length == 0) {
        succDirect = false
        $('#DErrName').remove()
        $('#D_Icon').after('<label id="DErrName" style="color:red">Необходимо заполнить "Название Группа Услуг"</label>')
        window.setTimeout(function () {
            $('#DErrName').remove();
        }, 3000)
    }
    if (succDirect == true) {
        var obj = { 'DName': directName, 'dId': dId, 'DIconId': iconId, 'prj': $('#prj').val() }
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Services.aspx/UpdateDirect",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                GetExistDirections($('#prj').val())
                $('#cls').click();
            }
        })
    }

}
//DeleteDirect(this,\"' + grup_guid + '\",\"' + d_guid + '\")
function Delete_Grup(e, grup_guid) {
    alertWithButton2("Удалить Группа услуг", "Группа услуг будет удалено вместе со связанными с ним услугами", "", "", "", "", "");
    $('#myModal2').children('.modal-content2').children('.modal-footer2').children('input[type="button"]:eq(1)').attr('onclick', 'deleteSG(\"' + grup_guid + '\")')
}
function deleteSG(g_guid) {
    var obj = { 'g_guid': g_guid }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Services.aspx/Delete_Grup_Service",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //$('#ExistGrups, #ExistServices, #ExistCostServices').children('div[data-d=' + dId + ']').remove();
            //var elementsLength = $('#ExistGrups').children('div[data-s=' + sId + ']').children().length;
            //if (elementsLength == 0) {
            //    $('#ExistGrups').children('div[data-s=' + sId + ']').remove();

            //}
            GetExistDirections($('#prj').val())
            $('#cls').click();
            $('#myModal2').hide()
        }
    })

}

function AddNewSet() {
    alertWithButton2("Создать Направления", "", "", "", "", "", "")
    $('.modal-body2').empty();
    window.onclick = undefined;
    $('#edizm').remove();
    $('.modal-content2').width('35%')
    $('.modal-body2').css('height', '')
    $('.modal-body2').append('<div class="col-md-12"><div class="col-md-6"><label> Название Направление</label><input type="text" id="Sname"     style="width: 50%;"><img onclick="showAllSetIcons(this)" id="setIcon" src="../img/icons/ic_rem4_512.png" itemid="7" style="width: 11%;/* float: right; */"><label>Название Группа Услуг</label><input type="text" value="" id="DName" style="width: 50%;"><img onclick="showAllDirectIcons(this)" id="directIcon" src="../img/icons/icon_other.png" itemid="23" style="width:11%;"><label>Название Услуг</label><input type="text" id="ServiceNameNew" style="width: 50%;"><br><label>Ответственный по Направлению</label><select id="Respons"><option value="0">Выберите ответственного по направлению</option></select><div><label>Единица измерения</label><select id="edizm" style="width: auto;"><option value="0">Выберите единица измерения</option></select><br></div><div style="width: 50%;/* float: right; */margin-right: 53%;"><label style="width: 25%;">Стоимость (руб.)</label><input type="number" id="costServiceNew"><label style="width: 20%;float: right;/* margin-right: 60px !important; */">Договорная</label><input type="checkbox" id="DoqNew" onclick="checkCheckbox(this)" style="float: right;margin-right: 5%;/* margin-bottom: 57% !important; */"></div><div/>')
    getEdizm();
    GetResponsibels();

    $('#myModal2').children('.modal-content2').children('.modal-footer2').children('input[type="button"]:eq(1)').attr('onclick', 'AddSet()')
    $('#myModal2').children('.modal-content2').children('.modal-footer2').children('input[type="button"]:eq(1)').val('Сохранить')
    //$('#deleteO').attr('id','AddSet')
    $('#AddSet').val('Сохранить').click(function () {


        //  var SetSuccess = true;
        //if ($('#Sname').val().length == 0) {
        //    SetSuccess = false;
        //    $('#ssErr').remove();
        //    $('#Sname').after('<label id="ssErr" style="color:red">Необходимо заполнить поля "Название Направление"</label>')
        //    window.setTimeout(function () {
        //        $('#ssErr').remove();
        //    }, 3000)
        //}

        //if ($('#DName').val().length == 0) {
        //    SetSuccess = false;
        //    $('#ssDName').remove();
        //    $('#DName').after('<label id="ssDName" style="color:red">Необходимо заполнить поля "Название Группа Услуг"</label>')
        //    window.setTimeout(function () {
        //        $('#ssDName').remove();
        //    }, 3000)
        //}

        //if ($('#ServiceNameNew').val().length == 0) {
        //    SetSuccess = false;
        //    $('#ssServiceNameNew').remove();
        //    $('#ServiceNameNew').after('<label id="ssServiceNameNew" style="color:red">Необходимо заполнить поля "Название Услуг"</label>')
        //    window.setTimeout(function () {
        //        $('#ssServiceNameNew').remove();
        //    }, 3000)
        //}

        //if ($('#edizm').val() == 0) {
        //    SetSuccess = false;
        //    $('#ssedizm').remove();
        //    $('#edizm').after('<label id="ssedizm" style="color:red">Необходимо выбрать единица измерения</label>')
        //    window.setTimeout(function () {
        //        $('#ssedizm').remove();
        //    }, 3000)
        //}

        //if ($('#costServiceNew').val().length == 0 && $('#DoqNew').prop('checked') == false) {
        //    SetSuccess = false;
        //    $('#sscostServiceNew').remove();
        //    $('#DoqNew').after('<label id="sscostServiceNew" style="color:red">Пожалуйста, введите стоимость или выберите признак "Договорная"</label>')
        //    window.setTimeout(function () {
        //        $('#sscostServiceNew').remove();
        //    }, 3000)
        //}
        //if ($('#costServiceNew').val() == 0 && $('#DoqNew').prop('checked') == false) {
        //    SetSuccess = false;
        //    $('#sscostServiceNew').remove();
        //    $('#DoqNew').after('<label id="sscostServiceNew" style="color:red">Пожалуйста, введите стоимость или выберите признак "Договорная"</label>')
        //    window.setTimeout(function () {
        //        $('#sscostServiceNew').remove();
        //    }, 3000)
        //}
        //if (SetSuccess == true) {
        //    // alert('updated')
        //    var ssn = $('#Sname').val();

        //    var prj = $('#prj').val();
        //    var siconid = $('#setIcon').attr('itemid');
        //    var dname = $('#DName').val();
        //    var dIconId = $('#directIcon').attr('itemid')
        //    var sname = $('#ServiceNameNew').val();
        //    var quantity = ($('#isQuantity').prop('checked') == false) ? '0' : '1'
        //    var unit = $('#edizm').val();
        //    var cost = ($('#DoqNew').prop('checked') == false) ? $('#costServiceNew').val() : "Договорная";
        //    var obj = { "ssn": ssn, 'prj': prj, 'siconid': siconid, 'dname': dname, "dIconId": dIconId, 'sname': sname, 'quantity': quantity, 'unit': unit, 'cost': cost }

        //    $.ajax({error: function (e) {$('.ui-loader-background').hide();$('#loader').hide();alert(e.responseJSON.Message)},
        //        type: "POST",
        //        url: "Services.aspx/SaveSetServices",
        //        data: JSON.stringify(obj),
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        success: function (data) {
        //            GetExistDirections($('#prj').val())
        //            $('#cls').click();
        //        }
        //    })

        //}

    })

    $('#cls').click(function () {
        $('#mh2').text('');
        $('.modal-body2').empty();
        $('.modal-body2').append('<p id="txt2" style="font-size: 23px;">Some text in the Modal Body</p>')
        $('#deleteO').val('Удалить')
    })
}

function AddNewGrup() {
    alertWithButton2("Создать Группа услуг", "", "", "", "", "", "")
    $('.modal-body2').empty();
    window.onclick = undefined;
    $('#edizm').remove();
    $('.modal-content2').width('35%')
    $('.modal-body2').css('width', '100%');
    $('.modal-body2').css('height', '')
    $('#myModal2').children('.modal-content2').children('.modal-body2').empty();
    //onclick="showAllDirectIcons(this)"
    $('.modal-body2').append('<div class="col-md-12"><div class="col-md-6"><label> Напрваления</label><select id="directions" style="width:50%"><option value="0">Выберите Направление</option></select><label>Название Группа Услуг</label><input type="text" value="" id="GName" style="width: 50%;"><img  id="GrupIcon" onclick="showAllSetIcons(this)" src="../img/icons/icon_art.png" itemid="2" style="width: 8%;cursor:pointer"><input class="knop" id="f_ilesForD" style="display:none" type="file" onchange=fileForDirect(this,"GrupIcon")><label>Название Услуг</label><input type="text" id="ServiceNameNew" style="width: 50%;"><br><div><label>Единица измерения</label><select id="edizm" style="width: auto;"><option value="0">Выберите единица измерения</option></select></div><div style="width: 50%;/* float: right; */margin-right: 53%;"><label style="width: 25%;">Стоимость (руб.)</label><input type="number" id="costServiceNew"><label style="width: 20%;float: right;/* margin-right: 60px !important; */">Договорная</label><input type="checkbox" id="DoqNew" onclick="checkCheckbox(this)" style="float: right;margin-right: 5%;/* margin-bottom: 57% !important; */"><div></div>')
    getEdizm();
    getExistForDroptown();
    // getExistSuppliers('suppliers_'); <label> Поставщик</label> <select id="suppliers_" style="width:50%"><option value="0">Выберите Поставщик</option></select>
    $('#myModal2').children('.modal-content2').children('.modal-footer2').children('input[type="button"]:eq(1)').attr('onclick', 'AddGrup()')
    $('#myModal2').children('.modal-content2').children('.modal-footer2').children('input[type="button"]:eq(1)').val('Сохранить')
}

function AddService() {
    alertWithButton2("Создать Услугу", "", "", "", "", "", "")
    $('.modal-body2').css('height', '')
    window.onclick = undefined;
    $('#edizm').remove();
    $('.modal-content2').width('35%')
    $('.modal-body2').css('width', '100%');
    $('.modal-body2').css('height', '');

    $('#myModal2').children('.modal-content2').children('.modal-body2').empty();
    $('.modal-body2').append('<div class="col-md-12"><div class="col-md-6"><label> Напрваления</label><select onchange="getRelationDirects(this)" id="sets" style="width:50%"><option value="0">Выберите Направление</option></select><label>Группа Услуг</label><select id="DName" style="width:50%"><option value="0">Выберите Группа услуг</option></select><label>Название Услуг</label><input type="text" id="ServiceNameNew" style="width: 50%;"><br><div><label>Единица измерения</label><select id="edizm" style="width: auto;"><option value="0">Выберите единица измерения</option></select><br><input id="isQuantity" type="checkbox"><label style="margin-left: 25px !important;">Исчисляемый</label><br></div><div style="width: 50%;/* float: right; */margin-right: 53%;"><label style="width: 25%;">Стоимость (руб.)</label><input type="number" id="costServiceNew"><label style="width: 20%;float: right;/* margin-right: 60px !important; */">Договорная</label><input type="checkbox" id="DoqNew" onclick="checkCheckbox(this)" style="float: right;margin-right: 5%;/* margin-bottom: 57% !important; */"></div></div><br><br><div></div></div>')

    getEdizm();
    getExistForDroptown()
    $('#cls').click(function () {
        $('#mh2').text('');
        $('.modal-body2').empty();
        $('.modal-body2').append('<p id="txt2" style="font-size: 23px;">Some text in the Modal Body</p>')
        $('#deleteO').val('Удалить')
    })
    $('#myModal2').children('.modal-content2').children('.modal-footer2').children('input[type="button"]:eq(1)').attr('onclick', 'AddNewService()')
    $('#myModal2').children('.modal-content2').children('.modal-footer2').children('input[type="button"]:eq(1)').val('Сохранить')
}
function UpdService(e, servId) {
    alertWithButton2("Редактировать услугу", "", "", "", "", "", "")
    $('.modal-body2').empty();
    var ServiceName = $(e).prev().prev('label').text();


    $('.modal-body2').css('height', '')
    window.onclick = undefined;
    $('#edizm').remove();
    $('.modal-content2').width('35%')
    $('.modal-body2').css('width', '100%');
    $('.modal-body2').css('height', '');
    $('#myModal2').children('.modal-content2').children('.modal-body2').empty();
    $('.modal-body2').append('<div class="col-md-6"><label>Название Услуг</label><input type="text" id="ServiceNameNew" value="' + ServiceName + '" style="width: 50%;"><br><div><label>Единица измерения</label><select id="edizm" style="width: auto;"><option value="0">Выберите единица измерения</option></select><br><input id="isQuantity" type="checkbox"><label style="margin-left: 25px !important;">Исчисляемый</label><br></div><div style="width: 50%;/* float: right; */margin-right: 53%;"><label style="width: 25%;">Стоимость (руб.)</label><input type="number" id="costServiceNew"><label style="width: 20%;float: right;/* margin-right: 60px !important; */">Договорная</label><input type="checkbox" id="DoqNew" onclick="checkCheckbox(this)" style="float: right;margin-right: 5%;/* margin-bottom: 57% !important; */"></div></div>')
    var edizm = $(e).parent().parent().attr('data-edizm');
    getEdizm(edizm);

    var isquantity = $(e).parent().parent().attr('data-quant');
    $('#isQuantity').prop('checked', (isquantity == "false") ? false : true)
    var cost = $(e).parent().parent().attr('data-cost');
    if (cost != 'Договорная') {
        $('#costServiceNew').val(cost)
    }
    else {
        $('#costServiceNew').attr('disabled', 'disabled')
        $('#DoqNew').prop('checked', true);
    }

    $('#edizm').val(edizm);
    $('#myModal2').children('.modal-content2').children('.modal-footer2').children('input[type="button"]:eq(1)').attr('onclick', 'UpdatingService(' + servId + ')')
    $('#myModal2').children('.modal-content2').children('.modal-footer2').children('input[type="button"]:eq(1)').val('Редактировать')

}
function getRelationDirects(e) {
    $('#DName option:not(:first)').remove();
    var sid = $(e).val();
    $('#ExistGrups').children('div[data-s=' + sid + ']').each(function () {
        var DName = $(this).children('label').text();
        var dId = $(this).attr('data-d');
        if (DName != undefined && dId != undefined) {
            $('#DName').append('<option value=' + dId + '>' + DName + '</option>')
        }
    })

}
function AddNewService() {
    var SetSuccess = true;
    if ($('#sets').val() == 0) {
        SetSuccess = false;
        $('#ssErr').remove();
        $('#sets').after('<label id="ssErr" style="color:red">Необходимо выбрать   Направление</label>')
        window.setTimeout(function () {
            $('#ssErr').remove();
        }, 3000)
    }

    if ($('#DName').val() == 0) {
        SetSuccess = false;
        $('#ssDName').remove();
        $('#DName').after('<label id="ssDName" style="color:red">Необходимо выбрать Группа Услуг"</label>')
        window.setTimeout(function () {
            $('#ssDName').remove();
        }, 3000)
    }

    if ($('#ServiceNameNew').val().length == 0) {
        SetSuccess = false;
        $('#ssServiceNameNew').remove();
        $('#ServiceNameNew').after('<label id="ssServiceNameNew" style="color:red">Необходимо заполнить поля "Название Услуг"</label>')
        window.setTimeout(function () {
            $('#ssServiceNameNew').remove();
        }, 3000)
    }

    if ($('#edizm').val() == 0) {
        SetSuccess = false;
        $('#ssedizm').remove();
        $('#edizm').after('<label id="ssedizm" style="color:red">Необходимо выбрать единица измерения</label>')
        window.setTimeout(function () {
            $('#ssedizm').remove();
        }, 3000)
    }

    if ($('#costServiceNew').val().length == 0 && $('#DoqNew').prop('checked') == false) {
        SetSuccess = false;
        $('#sscostServiceNew').remove();
        $('#DoqNew').after('<label id="sscostServiceNew" style="color:red">Пожалуйста, введите стоимость или выберите признак "Договорная"</label>')
        window.setTimeout(function () {
            $('#sscostServiceNew').remove();
        }, 3000)
    }
    if ($('#costServiceNew').val() == 0 && $('#DoqNew').prop('checked') == false) {
        SetSuccess = false;
        $('#sscostServiceNew').remove();
        $('#DoqNew').after('<label id="sscostServiceNew" style="color:red">Пожалуйста, введите стоимость или выберите признак "Договорная"</label>')
        window.setTimeout(function () {
            $('#sscostServiceNew').remove();
        }, 3000)
    }

    if (SetSuccess == true) {
        var sid = $('#sets').val();
        var prj = $('#prj').val();
        var dname = $('#DName').val();

        var sname = $('#ServiceNameNew').val();
        var quantity = ($('#isQuantity').prop('checked') == false) ? '0' : '1'
        var unit = $('#edizm').val();
        var cost = ($('#DoqNew').prop('checked') == false) ? $('#costServiceNew').val() : "Договорная";
        var obj = { 'prj': prj, 'dId': dname, 'sname': sname, 'quantity': quantity, 'unit': unit, 'cost': cost }


        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Services.aspx/AddNewService",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                GetExistDirections($('#prj').val())
                $('#cls').click();
            }
        })

    }
}
function UpdatingService(servId) {
    var SetSuccess = true;
    if ($('#ServiceNameNew').val().length == 0) {
        SetSuccess = false;
        $('#ssServiceNameNew').remove();
        $('#ServiceNameNew').after('<label id="ssServiceNameNew" style="color:red">Необходимо заполнить поля "Название Услуг"</label>')
        window.setTimeout(function () {
            $('#ssServiceNameNew').remove();
        }, 3000)
    }

    if ($('#edizm').val() == 0) {
        SetSuccess = false;
        $('#ssedizm').remove();
        $('#edizm').after('<label id="ssedizm" style="color:red">Необходимо выбрать единица измерения</label>')
        window.setTimeout(function () {
            $('#ssedizm').remove();
        }, 3000)
    }

    if ($('#costServiceNew').val().length == 0 && $('#DoqNew').prop('checked') == false) {
        SetSuccess = false;
        $('#sscostServiceNew').remove();
        $('#DoqNew').after('<label id="sscostServiceNew" style="color:red">Пожалуйста, введите стоимость или выберите признак "Договорная"</label>')
        window.setTimeout(function () {
            $('#sscostServiceNew').remove();
        }, 3000)
    }
    if ($('#costServiceNew').val() == 0 && $('#DoqNew').prop('checked') == false) {
        SetSuccess = false;
        $('#sscostServiceNew').remove();
        $('#DoqNew').after('<label id="sscostServiceNew" style="color:red">Пожалуйста, введите стоимость или выберите признак "Договорная"</label>')
        window.setTimeout(function () {
            $('#sscostServiceNew').remove();
        }, 3000)
    }
    if (SetSuccess == true) {

        var prj = $('#prj').val();

        var sname = $('#ServiceNameNew').val();
        var quantity = ($('#isQuantity').prop('checked') == false) ? '0' : '1'
        var unit = $('#edizm').val();
        var cost = ($('#DoqNew').prop('checked') == false) ? $('#costServiceNew').val() : "Договорная";
        //var obj = { 'prj': prj, 'dId': dname, 'sname': sname, 'quantity': quantity, 'unit': unit, 'cost': cost }
        var obj = { 'sname': sname, 'quantity': quantity, 'unit': unit, 'servId': servId, 'prj': prj, 'cost': cost }

        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Services.aspx/UpdatingService",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                GetExistDirections($('#prj').val())
                $('#cls').click();
            }
        })

    }
}
function AddGrup() {
    var GrupSuccess = true;
    if ($('#suppliers_').val() == 0) {
        if ($('#directions').val() == 0) {
            GrupSuccess = false;
            $('#dSErr').remove();
            $('#suppliers_').after('<label id="dSErr" style="color:red">Необходимо выбрать Поставщик</label>')
            window.setTimeout(function () {
                $('#dSErr').remove();
            }, 3000)
        }
    }
    if ($('#directions').val() == 0) {
        GrupSuccess = false;
        $('#ddErr').remove();
        $('#directions').after('<label id="ddErr" style="color:red">Необходимо выбрать Направление</label>')
        window.setTimeout(function () {
            $('#ddErr').remove();
        }, 3000)
    }
    if ($('#GName').val().length == 0) {
        GrupSuccess = false;
        $('#ddDName').remove();
        $('#GrupIcon').after('<label id="ddDName" style="color:red">Необходимо заполнить поля "Название Группа Услуг"</label>')
        window.setTimeout(function () {
            $('#ddDName').remove();
        }, 3000)
    }
    if ($('#ServiceNameNew').val().length == 0) {
        GrupSuccess = false;
        $('#ssServiceNameNew').remove();
        $('#ServiceNameNew').after('<label id="ssServiceNameNew" style="color:red">Необходимо заполнить поля "Название Услуг"</label>')
        window.setTimeout(function () {
            $('#ssServiceNameNew').remove();
        }, 3000)
    }

    if ($('#edizm').val() == 0) {
        GrupSuccess = false;
        $('#ssedizm').remove();
        $('#edizm').after('<label id="ssedizm" style="color:red">Необходимо выбрать единица измерения</label>')
        window.setTimeout(function () {
            $('#ssedizm').remove();
        }, 3000)
    }
    if ($('#costServiceNew').val().length == 0 && $('#DoqNew').prop('checked') == false) {
        GrupSuccess = false;
        $('#sscostServiceNew').remove();
        $('#DoqNew').after('<label id="sscostServiceNew" style="color:red">Пожалуйста, введите стоимость или выберите признак "Договорная"</label>')
        window.setTimeout(function () {
            $('#sscostServiceNew').remove();
        }, 3000)
    }
    if ($('#costServiceNew').val() == 0 && $('#DoqNew').prop('checked') == false) {
        GrupSuccess = false;
        $('#sscostServiceNew').remove();
        $('#DoqNew').after('<label id="sscostServiceNew" style="color:red">Пожалуйста, введите стоимость или выберите признак "Договорная"</label>')
        window.setTimeout(function () {
            $('#sscostServiceNew').remove();
        }, 3000)
    }
    if (GrupSuccess == true) {
        var GRUP_NAME = $('#GName').val();
        var direction_guid = $('#directions').val();
        //    var SERVICE_SUPPLIER = $('#suppliers_').children('option:selected').text()
        // var SUPPLIER_GUID = $('#suppliers_').val()
        var SERVICE_PROJECT = $('#prj').children('option:selected').text()
        var GRUP_ICON = $('#GrupIcon').attr('src');
        var SERVICE_NAME = $('#ServiceNameNew').val()
        //var dIconId = $('#directIcon').attr('itemid')
        //   var sname = 
        // var quantity = ($('#isQuantity').prop('checked') == false) ? '0' : '1'
        var SERVICE_UNIT = $('#edizm').children('option:selected').text()
        var SERVICE_COST = ($('#DoqNew').prop('checked') == false) ? $('#costServiceNew').val() : "Договорная";
        //, 'SERVICE_SUPPLIER': SERVICE_SUPPLIER, 'SUPPLIER_GUID': SUPPLIER_GUID
        var obj = { "GRUP_NAME": GRUP_NAME, 'SERVICE_PROJECT': SERVICE_PROJECT, "GRUP_ICON": GRUP_ICON, 'direction_guid': direction_guid, 'SERVICE_NAME': SERVICE_NAME, 'SERVICE_UNIT': SERVICE_UNIT, 'SERVICE_COST': SERVICE_COST }
        //  console.log(obj)
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Services.aspx/SaveDirectsGrup",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                GetExistDirections($('#prj').val())
                $('#cls').click();
            }
        })

    }

}
function getExistSuppliers(dropId) {
    var logId = sessionStorage.getItem("Log");
    var obj = { 'lg': logId }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Services.aspx/getExistSuppliers",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            for (var i = 0; i < json.length; i++) {
                $('#' + dropId).append('<option value=\"' + json[i].GUID + '\">' + json[i].NAME + '</option>')
            }

        }
    })
}
function getExistForDroptown() {
    $('#ExistDirections').children('div').each(function () {
        var d_guid = $(this).attr('data-direct');
        var Dname = $(this).children('label').text();
        $('#directions').append('<option value=' + d_guid + '> ' + Dname + ' </option>')

    })
}
function ConnectSets() {
}
function AddSet() {

    var SetSuccess = true;
    if ($('#Sname').val().length == 0) {
        SetSuccess = false;
        $('#ssErr').remove();
        $('#Sname').after('<label id="ssErr" style="color:red">Необходимо заполнить поля "Название Направление"</label>')
        window.setTimeout(function () {
            $('#ssErr').remove();
        }, 3000)
    }

    if ($('#DName').val().length == 0) {
        SetSuccess = false;
        $('#ssDName').remove();
        $('#DName').after('<label id="ssDName" style="color:red">Необходимо заполнить поля "Название Группа Услуг"</label>')
        window.setTimeout(function () {
            $('#ssDName').remove();
        }, 3000)
    }

    if ($('#ServiceNameNew').val().length == 0) {
        SetSuccess = false;
        $('#ssServiceNameNew').remove();
        $('#ServiceNameNew').after('<label id="ssServiceNameNew" style="color:red">Необходимо заполнить поля "Название Услуг"</label>')
        window.setTimeout(function () {
            $('#ssServiceNameNew').remove();
        }, 3000)
    }

    if ($('#Respons').val() == 0) {
        SetSuccess = false;
        $('#ssRespons').remove();
        $('#Respons').after('<label id="ssRespons" style="color:red">Необходимо выбрать ответственного по направлению</label>')
        window.setTimeout(function () {
            $('#ssRespons').remove();
        }, 3000)
    }

    if ($('#edizm').val() == 0) {
        SetSuccess = false;
        $('#ssedizm').remove();
        $('#edizm').after('<label id="ssedizm" style="color:red">Необходимо выбрать единица измерения</label>')
        window.setTimeout(function () {
            $('#ssedizm').remove();
        }, 3000)
    }

    if ($('#costServiceNew').val().length == 0 && $('#DoqNew').prop('checked') == false) {
        SetSuccess = false;
        $('#sscostServiceNew').remove();
        $('#DoqNew').after('<label id="sscostServiceNew" style="color:red">Пожалуйста, введите стоимость или выберите признак "Договорная"</label>')
        window.setTimeout(function () {
            $('#sscostServiceNew').remove();
        }, 3000)
    }
    if ($('#costServiceNew').val() == 0 && $('#DoqNew').prop('checked') == false) {
        SetSuccess = false;
        $('#sscostServiceNew').remove();
        $('#DoqNew').after('<label id="sscostServiceNew" style="color:red">Пожалуйста, введите стоимость или выберите признак "Договорная"</label>')
        window.setTimeout(function () {
            $('#sscostServiceNew').remove();
        }, 3000)
    }
    if (SetSuccess == true) {
        // alert('updated')
        var ssn = $('#Sname').val();

        var PROJECT_GUID = $('#prj option:selected').attr('guid');
        var SERVICE_PROJECT = $('#prj option:selected').text();
        var RESPONSIBLE_ID = $('#Respons').val()
        var SERVICE_NAME = $('#ServiceNameNew').val();
        var DIRECTION_NAME = $('#Sname').val();
        var D_ICON = $('#setIcon').attr('src')
        var GRUP_ICON = $('#directIcon').attr('src')
        var GRUP_NAME = $('#DName').val();

        var SERVICE_UNIT = $('#edizm option:selected').text();
        var SERVICE_COST = ($('#DoqNew').prop('checked') == false) ? $('#costServiceNew').val() : "Договорная";
        var obj = { "GRUP_ICON": GRUP_ICON, 'PROJECT_GUID': PROJECT_GUID, 'RESPONSIBLE_ID': RESPONSIBLE_ID, 'DIRECTION_NAME': DIRECTION_NAME, "D_ICON": D_ICON, 'GRUP_NAME': GRUP_NAME, 'SERVICE_PROJECT': SERVICE_PROJECT, 'SERVICE_UNIT': SERVICE_UNIT, 'SERVICE_COST': SERVICE_COST, 'SERVICE_NAME': SERVICE_NAME }

        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Services.aspx/SaveDirectionGrupServices",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                GetExistDirections($('#prj').val())
                $('#cls').click();
            }
        })

    }
}


function UpdateDirectService(e, d_guid) {
    alertWithButton2("Редактировать", "", "", "", "", "", "")
    $('.modal-body2').empty();
    //window.onclick = function () {
    //    var ss = $('#myModal2').css('display')
    //    if (ss == 'block') {
    //        //$('#mh2').text('');
    //        //$('.modal-body2').empty();
    //        //$('.modal-body2').append('<p id="txt2" style="font-size: 23px;">Some text in the Modal Body</p>')
    //        //$('#deleteO').val('Удалить')
    //        $('#cls').click();
    //    }
    //}
    window.onclick = undefined;
    $('#myModal2').children('.modal-content2').css('width', '37%')

    var Dname = $(e).prev().prev().text();
    var icon = $(e).parent().children('img').attr('src')
    var iconId = $(e).parent().children('img').attr('itemid')//<label style="width: 25%;">Стоимость (руб.)</label><input type="number" id="costService"><div style="width: 25%;float: right; margin-right: 53%;"><input type="checkbox" style="float: left;/* margin-right: 75%; *//* margin-bottom: 57% !important; */"><label style="width: 20%;float: right;margin-right: 65px !important;">Договорная</label>
    $('#edizm').remove();
    $('.modal-body2').append('<div class="col-md-12"><div class="col-md-6"><label> Название Направление</label><input type="text" id="Dname" value="' + Dname + '" data-direct=' + d_guid + ' style="width: 50%;"><img onclick="showAllSetIcons(this)" id="DIcon" src=' + icon + '  style="width: 11%;cursor:pointer"><input class="knop" id="f_ilesForD" style="display:none" type="file" onchange=fileForDirect(this,"DIcon")></div><div class="col-md-6"><label>Ответственный по Направлению</label><select id="Respons"><option value="0">Выберите ответственного по направлению</option></select></div></div>')
    getEdizm();
    GetResponsibels($(e).parent().attr('data-r'));
    $('#myModal2').children('.modal-content2').children('.modal-footer2').children('input[type="button"]:eq(1)').attr('onclick', 'UpdateDirect()')
    $('#myModal2').children('.modal-content2').children('.modal-footer2').children('input[type="button"]:eq(1)').val('Редактировать')
    //$('#deleteO').attr('id','#UpdateDirect')
    $('#UpdateDirect').val('Редактировать').click(function () {


        //var SetSuccess = true;
        // if ($('#Sname').val().length == 0) {
        //     SetSuccess = false;
        //     $('#ssErr').remove();
        //     $('#Sname').after('<label id="ssErr" style="color:red">Необходимо заполнить поля "Название Направление"</label>')
        //     window.setTimeout(function () {
        //         $('#ssErr').remove();
        //     }, 3000)
        // }

        // if ($('#DName').val().length == 0) {
        //     SetSuccess = false;
        //     $('#ssDName').remove();
        //     $('#DName').after('<label id="ssDName" style="color:red">Необходимо заполнить поля "Название Группа Услуг"</label>')
        //     window.setTimeout(function () {
        //         $('#ssDName').remove();
        //     }, 3000)
        // }

        // if ($('#ServiceNameNew').val().length == 0) {
        //     SetSuccess = false;
        //     $('#ssServiceNameNew').remove();
        //     $('#ServiceNameNew').after('<label id="ssServiceNameNew" style="color:red">Необходимо заполнить поля "Название Услуг"</label>')
        //     window.setTimeout(function () {
        //         $('#ssServiceNameNew').remove();
        //     }, 3000)
        // }

        // if ($('#edizm').val() == 0) {
        //     SetSuccess = false;
        //     $('#ssedizm').remove();
        //     $('#edizm').after('<label id="ssedizm" style="color:red">Необходимо выбрать единица измерения</label>')
        //     window.setTimeout(function () {
        //         $('#ssedizm').remove();
        //     }, 3000)
        // }

        // if ($('#costServiceNew').val().length == 0 && $('#DoqNew').prop('checked') == false) {
        //     SetSuccess = false;
        //     $('#sscostServiceNew').remove();
        //     $('#DoqNew').after('<label id="sscostServiceNew" style="color:red">Пожалуйста, введите стоимость или выберите признак "Договорная"</label>')
        //     window.setTimeout(function () {
        //         $('#sscostServiceNew').remove();
        //     }, 3000)
        // }
        // if ($('#costServiceNew').val() == 0 && $('#DoqNew').prop('checked') == false) {
        //     SetSuccess = false;
        //     $('#sscostServiceNew').remove();
        //     $('#DoqNew').after('<label id="sscostServiceNew" style="color:red">Пожалуйста, введите стоимость или выберите признак "Договорная"</label>')
        //     window.setTimeout(function () {
        //         $('#sscostServiceNew').remove();
        //     }, 3000)
        // }
        // if (SetSuccess == true) {
        //     // alert('updated')
        //     var ssn = $('#Sname').val();
        //     var sid = $('#Sname').attr('data-s')
        //     var prj = $('#prj').val();
        //     var siconid = $('#setIcon').attr('itemid');
        //     var dname = $('#DName').val();
        //     var dIconId = $('#directIcon').attr('itemid')
        //     var sname = $('#ServiceNameNew').val();
        //     var quantity = ($('#isQuantity').prop('checked') == false) ? '0' : '1'
        //     var unit = $('#edizm').val();
        //     var cost = ($('#DoqNew').prop('checked') == false) ? $('#costServiceNew').val() : "Договорная";
        //     var obj = { "ssn": ssn, 'sid': sid, 'prj': prj, 'siconid': siconid, 'dname': dname, "dIconId": dIconId, 'sname': sname, 'quantity': quantity, 'unit': unit, 'cost': cost }

        //     $.ajax({error: function (e) {$('.ui-loader-background').hide();$('#loader').hide();alert(e.responseJSON.Message)},
        //         type: "POST",
        //         url: "Services.aspx/UpdateServiceSet",
        //         data: JSON.stringify(obj),
        //         contentType: "application/json; charset=utf-8",
        //         dataType: "json",
        //         success: function (data) {
        //             GetExistDirections($('#prj').val())
        //             $('#cls').click();
        //         }
        //     })

        // }



        //GetExistDirections($('#prj').val())
    })

    $('#cls').click(function () {
        $('#mh2').text('');
        $('.modal-body2').empty();
        $('.modal-body2').append('<p id="txt2" style="font-size: 23px;">Some text in the Modal Body</p>')
        $('#deleteO').val('Удалить')
    })

}
function UpdateDirect() {
    var SetSuccess = true;
    if ($('#Dname').val().length == 0) {
        SetSuccess = false;
        $('#ssErr').remove();
        $('#Sname').after('<label id="ssErr" style="color:red">Необходимо заполнить поля "Название Направление"</label>')
        window.setTimeout(function () {
            $('#ssErr').remove();
        }, 3000)
    }

    if ($('#Respons').val() == 0) {
        SetSuccess = false;
        $('#ssRespons').remove();
        $('#Respons').after('<label id="ssRespons" style="color:red">Необходимо выбрать ответственного по направлению</label>')
        window.setTimeout(function () {
            $('#ssRespons').remove();
        }, 3000)
    }

    if (SetSuccess == true) {
        // alert('updated')
        var Dname = $('#Dname').val();//#Sname
        var d_guid = $('#Dname').attr('data-direct')
        var prj = $('#prj').val();
        var DIcon = $('#DIcon').attr('src');//setIcon
        var respons_id = $('#Respons').val();
        //var dname = $('#DName').val();
        //var dIconId = $('#directIcon').attr('itemid')
        //var sname = $('#ServiceNameNew').val();
        //var quantity = ($('#isQuantity').prop('checked') == false) ? '0' : '1'
        //var unit = $('#edizm').val();
        //var cost = ($('#DoqNew').prop('checked') == false) ? $('#costServiceNew').val() : "Договорная";
        //, 'dname': dname, "dIconId": dIconId, 'sname': sname, 'quantity': quantity, 'unit': unit, 'cost': cost
        var obj = { "d_guid": d_guid, 'NAME': Dname, 'ICON': DIcon, 'respId': respons_id }

        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Services.aspx/UpdateDirect",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                GetExistDirections($('#prj').val())
                $('#cls').click();
            }
        })

    }
    //if ($('#DName').val().length == 0) {
    //    SetSuccess = false;
    //    $('#ssDName').remove();
    //    $('#DName').after('<label id="ssDName" style="color:red">Необходимо заполнить поля "Название Группа Услуг"</label>')
    //    window.setTimeout(function () {
    //        $('#ssDName').remove();
    //    }, 3000)
    //}

    //if ($('#ServiceNameNew').val().length == 0) {
    //    SetSuccess = false;
    //    $('#ssServiceNameNew').remove();
    //    $('#ServiceNameNew').after('<label id="ssServiceNameNew" style="color:red">Необходимо заполнить поля "Название Услуг"</label>')
    //    window.setTimeout(function () {
    //        $('#ssServiceNameNew').remove();
    //    }, 3000)
    //}

    //if ($('#edizm').val() == 0) {
    //    SetSuccess = false;
    //    $('#ssedizm').remove();
    //    $('#edizm').after('<label id="ssedizm" style="color:red">Необходимо выбрать единица измерения</label>')
    //    window.setTimeout(function () {
    //        $('#ssedizm').remove();
    //    }, 3000)
    //}

    //if ($('#costServiceNew').val().length == 0 && $('#DoqNew').prop('checked') == false) {
    //    SetSuccess = false;
    //    $('#sscostServiceNew').remove();
    //    $('#DoqNew').after('<label id="sscostServiceNew" style="color:red">Пожалуйста, введите стоимость или выберите признак "Договорная"</label>')
    //    window.setTimeout(function () {
    //        $('#sscostServiceNew').remove();
    //    }, 3000)
    //}
    //if ($('#costServiceNew').val() == 0 && $('#DoqNew').prop('checked') == false) {
    //    SetSuccess = false;
    //    $('#sscostServiceNew').remove();
    //    $('#DoqNew').after('<label id="sscostServiceNew" style="color:red">Пожалуйста, введите стоимость или выберите признак "Договорная"</label>')
    //    window.setTimeout(function () {
    //        $('#sscostServiceNew').remove();
    //    }, 3000)
    //}

}

function showAllSetIcons(e) {
    $('#f_ilesForD').click()
    //$.ajax({
    //    error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
    //    type: "POST",
    //    url: "Services.aspx/getServiceSetIcon",
    //    contentType: "application/json; charset=utf-8",
    //    async: false,
    //    success: function (data) {
    //        var j = JSON.parse(data.d)
    //        $('#Icons,#hi').remove();
    //        $('.modal-body2').children('div:eq(0)').css('width', '')
    //        // $('.modal-content2').css('width', '40%')//.css('height', '80%')
    //        // $('.modal-footer2').css('margin-top', '25%')
    //        $('.modal-body2').children('.col-md-12').children('.col-md-6:eq(1)').remove();
    //        $('.modal-body2').children('.col-md-12').append('<div class="col-md-6"><label id="hi" >Выберите Иконку</label><div id="Icons" style="border: 1px solid #000;box-shadow: 3px 4px 5px rgba(0,0,0,0.3);width: 35%;height: 260px !important;overflow: auto"></div></div>')
    //        for (var i = 0; i < j.length; i++) {
    //            $('#Icons').append('<div  class="col-md-12" style="margin-top: 35px;"><input onclick="SelectDirectIcon(this,' + j[i].S_ICON_ID + ')" type="radio" name="ico"><img src=' + j[i].S_ICON_ADRESS + '  style="width: 80%;height: 80%;height: 8;float: right;margin-top: -37px;"></div>')
    //        }
    //    }
    //})
}
function fileForDirect(e, imgId) {
    var filePath = $('#f_ilesForD').val();
    if (filePath.length != 0) {
        $("#loader,.ui-loader-background").show();
        $('.ui-loader-background').show();
        var index = filePath.lastIndexOf("\\") + 1;
        var filename = filePath.substr(index);
        var ext = $('#f_ilesForD').val().split('.').pop();
        ext = ext.toLowerCase()
        if (ext == "png" || ext == "jpg") {
            $('.ui-loader-background').show();
            $("#loader,.ui-loader-background").show();
            $('#errEx,#files_E').remove();
            var input = e //$('#f_ilesForD')

            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {


                    $('#' + imgId).attr('src', e.target.result);

                    //var nameImg = imgName
                    //var arrayBuffer = reader.result
                    //var bytes = new Uint8Array(arrayBuffer);
                    //var obj = { baseString: bytes, imgName: nameImg };
                    var formData = new FormData();
                    var idFiles = $(input).attr('id')
                    var file = document.getElementById(idFiles).files[0];

                    formData.append('file', file, encodeURI(file.name));
                    formData.append('object_id', '1');
                    //console.log(formData);



                    $.ajax({
                        type: "POST",
                        url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",//window.location.protocol + '//' + window.location.host + "
                        data: formData,
                        type: 'POST',
                        contentType: false,
                        processData: false,
                        //cache: false,
                        timeout: 3600000,
                        crossDomain: true,

                        success: function (result) {
                            $("#loader,.ui-loader-background").hide();

                            var F_ile = result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/")
                            var extention = F_ile.substr(F_ile.lastIndexOf(".") + 1)
                            $('#' + imgId).attr('src', F_ile)


                            $('.ui-loader-background').hide();
                            $("#loader,.ui-loader-background").hide();

                        },

                        error: function (r) {

                            //  //alert("Error");
                            //  console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                            $("#loader,.ui-loader-background").hide();
                            var filePath = $('#files').val();
                            var index = filePath.lastIndexOf("\\") + 1;
                            var filename = filePath.substr(index);
                            // readURL(input, filename)
                        },
                        complete: function (r) {
                            //var jsonEroorData = JSON.parse(r);

                            //if (r.readyState == 4 && r.status == 200) { //do something }; 
                            //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
                            //    $("#loader,.ui-loader-background").hide();
                            //}
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });


                }


            }
        }
        else {
            $('.ui-loader-background').hide();
            $("#loader,.ui-loader-background").hide();
            $('#errEx,#files_E').remove();
            $('#f_ilesForD').val('');
            $('#' + imgId + '').after('<label id="files_E" style="color:red">(png*, jpg*)</label>').show();
        }

    }
}
function SelectDirectIcon(e, siconId) {
    var sicon_adres = $(e).next().attr('src');
    $('#setIcon').attr('src', sicon_adres).attr('itemid', siconId);
    $('#Icons,#hi').remove();
    $('.modal-content2').css('width', '37%')//.css('height', '')
    $('.modal-footer2').css('margin-top', '')

}
function showAllDirectIcons(e) {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Services.aspx/GetServiceDirectIcon",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {

            var j = JSON.parse(data.d)
            $('#Icons,#hi').remove();
            $('.modal-body2').css('height', '80%')
            // $('.modal-body2').children('div:eq(0)').css('width', '50%')
            //   $('.modal-content2').css('width', '40%')//.css('height', '80%')
            // $('.modal-footer2').css('margin-top', '25%')
            $('.modal-body2').children('.col-md-12').children('.col-md-6:eq(1)').remove();
            $('.modal-body2').children('.col-md-12').append('<div class="col-md-6" ><label id="hi" >Выберите Иконку</label><div id="Icons" style="border: 1px solid #000;box-shadow: 3px 4px 5px rgba(0,0,0,0.3);width: 35%;height: 260px !important;overflow: auto;"></div></div>')
            for (var i = 0; i < j.length; i++) {
                $('#Icons').append('<div><div  class="col-md-12" style="margin-top: 35px;"><input onclick="SelectDirectIcon(this,' + j[i].ICON_ID + ')" type="radio" name="ico"><img src=' + j[i].ICON_ADRESS + '  style="width: 80%;height: 80%;height: 8;float: right;margin-top: -37px;"></div></div>')
            }
        }
    })
}

function SelectDirectIcon(e, diconId) {
    var dicon_adres = $(e).next().attr('src');
    //$('.modal-body2').children('div:eq(0)').css('width', '55%')
    $('#directIcon').attr('src', dicon_adres).attr('itemid', diconId);
    $('#Icons').parent().remove();
    //$('.modal-content2').css('width', '')
}
function DeleteDirection_(e, d_guid) {
    alertWithButton2("Вы уверены?", "Направление услуг будет удалено вместе со связанными с ним услугами", "", "", "", "", "");
    $('#myModal2').children('.modal-content2').children('.modal-footer2').children('input[type="button"]:eq(1)').attr('onclick', 'DeleteDirection(\"' + d_guid + '\")')
    // $('#deleteO').attr('id','deleteSet')
    $('#deleteSet').click(function () {

        //var Obj = { "sid": sid }
        //    $.ajax({error: function (e) {$('.ui-loader-background').hide();$('#loader').hide();alert(e.responseJSON.Message)},
        //        type: "POST",
        //        url: "Services.aspx/DeleteSetService",
        //        data: JSON.stringify(Obj),
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        async: false,
        //        success: function (data) {
        //            $('#ExistSet,#ExistGrups,#ExistServices,#ExistCostServices').children('div[data-s=' + sid + ']').remove();
        //            $('#cls').click();
        //        }
        //    })



    })

}
function DeleteDirection(d_guid) {
    var Obj = { "d_guid": d_guid }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Services.aspx/DeleteDirection",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            $('#ExistDirections,#ExistGrups,#ExistServices,#ExistCostServices').children('div[data-direct=' + d_guid + ']').remove();
            $('#cls').click();
        }
    })
}
function AddGroupS(e) {
    if ($(e).attr('data-active') == "on") {

        $(e).after('<div id="AddingGroupS"><label>Имя Группа Услуг</label><input type="text" id="NameGS"><input type="button" class="btn genBtn" id="ShICon" onclick="showAllIcons(this)" value="Выбрать Иконку" style="margin-left: 25%;"><input type="button" class="btn genBtn" onclick="SaveDirect(this)" value="Сохранить" disabled="disabled" style="margin-left: 31%;margin-top: 8px;"><hr></div>')
        $(e).attr('data-active', "off")
        $(e).val("Убрать Форм")

        $('#GroupS .col-md-12').each(function () {
            $(this).children('.col-md-1').attr('disabled', 'disabled')
        });
        $('#GrupServices .col-md-12').each(function () {
            $(this).children('.col-md-1').attr('disabled', 'disabled')
            $(this).children('.btn').attr('disabled', 'disabled')
            $(this).attr('class', 'col-md-12 box')
            // $(this).children('div').children('.col-md-12').attr('class', 'col-md-12 box')
        });
        $('#GroupS').children('.col-md-12').attr('class', 'col-md-12 box');
        $('#GrupServices').children('.col-md-12').attr('class', 'col-md-12 box');
    }
    else {
        $('#AddingGroupS').remove();
        $(e).val("Добавить Группа услуг")
        $(e).attr('data-active', "on")
        $('#selectIcons').remove();
        var countIsQuantity = $('#GrupServices #isQuantity').length
        if (countIsQuantity != 0) {
            var dataD = $('#GrupServices #isQuantity').attr('data-g')
            $('#GroupS #d_' + dataD).attr('class', 'col-md-12');
            $('#GroupS #d_' + dataD).children('input[type="checkbox"]').removeAttr('disabled')

            $('#GrupServices #d_' + dataD).attr('class', 'col-md-12');
            $('#GrupServices #d_' + dataD).children('input').removeAttr('disabled');
        }
        else {
            $('#GroupS').children('.col-md-12').each(function () {
                $(this).attr('class', 'col-md-12');
                $(this).children('input[type="checkbox"]').removeAttr('disabled')

            })
            $('#GrupServices').children('div').each(function () {
                $(this).children('.col-md-12').attr('class', 'col-md-12')
                $(this).children('.col-md-12').children('input').removeAttr('disabled');
            })
        }
    }

}
function SaveDirect(e) {
    var succDirect = true;
    if ($('#NameGS').val().trim().length == 0) {
        succDirect = false
        $('#ErrNameGS').remove();
        $('#NameGS').after('<label id="ErrNameGS" style="color:red">Необходимо заполнить поля "Имя Группа Услуг"</label>')
        window.setTimeout(function () {
            $('#ErrNameGS').remove();
        }, 3000)
    }
    var iconsId = [];
    if (succDirect == true) {
        $('#selectIcons #Icons').children('input[type="checkbox"]').each(function () {
            if ($(this).prop('checked') == true) {
                iconsId.push({ "ROOM_NUMBER": $(this).attr('itemid') })
            }
        })
        if (iconsId.length == 0) {
            $('#iconErr').remove();
            $(e).after('<label id="iconErr" style="color:red">Необходимо выбрать иконки</label>')
            window.setTimeout(function () {
                $('#iconErr').remove();
            }, 3000)
        }
    }

    if (succDirect == true) {
        var obj = { "d": $('#NameGS').val(), "icns": iconsId }
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Apartments.aspx/SaveDirect",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var j = JSON.parse(data.d);
                //$('#GroupS').append('')
                if (iconsId.length == 1) {
                    $('#GroupS').append('')
                }
            }
        })
    }

}
function showAllIcons(e) {
    var value = $(e).val();
    value = value.indexOf('Применит');

    if ($('#selectIcons').length == 0) {
        $('#GroupS').parent().before('<div id="selectIcons" style="margin-right: -19%;width: 42%;" class="col-md-4"><label>Выберите Иконку</label><div id="Icons" style="border: 1px solid #000;box-shadow: 3px 4px 5px rgba(0,0,0,0.3);width: 43%;height: 260px !important;overflow: auto;"></div></div>')
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Apartments.aspx/getAllIcons",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var j = JSON.parse(data.d);
                for (var i = 0; i < j.length; i++) {

                    $('#Icons').append('<img src=' + j[i].ICON_ADRESS + ' itemid=' + j[i].ICON_ID + ' onclick="ChangeIcon(this)" style="margin-left: 15%;float: right;width: 45%;"><input type="checkbox" itemid=' + j[i].ICON_ID + ' onclick=SelectIconForDirect(this) style="margin-left: 12%;margin-top: 25%;"><hr/>')

                }
            }
        })
    }
    else {
        if ($('#selectIcons').css('display') == 'none') {
            $('#selectIcons').show();
        }
        else {
            $('#selectIcons').hide();
        }
    }
    if (value != -1) {
        $('#AddingGroupS').children('input[type="button"]:eq(1)').removeAttr('disabled')
    }






}
function SelectIconForDirect(e) {
    $('#ShICon').val('Применит (' + $('#Icons input:checkbox:checked').length + ')')
}
function getRelationService(e, selected) {
    var rfp = $(e).val()
    var obj = { "RFP_TYPE": rfp }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/getRelationService",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsond = JSON.parse(data.d)
            if (selected == undefined) {
                $(e).parent().next('td').children('#srv').children('option:not(:first)').remove();
                $(e).parent().next('td').children('#srv').removeAttr('disabled')
            }


            for (var i = 0; i < jsond.length; i++) {
                //if (jsond[i].RFP_SERVICE_ID>17) {

                $(e).parent().next('td').children('#srv').append('<option value=' + jsond[i].RFP_SERVICE_ID + '>' + jsond[i].SERVICE_NAME + '</option>')

                //}
            }
            if (selected != undefined) {
                $(e).parent().next('td').children('#srv').val(selected)
            }
            var vndiv = $('.vndiv').length
            var vnDivServsIs = [];
            //if (vndiv > 1) {
            //    $('.vndiv:not(:last)').each(function () {

            //        vnDivServsIs.push({ "RFP_SERVICE_ID": $(this).children('div:eq(1)').children('select').val() })
            //    })

            //    for (var i = 0; i < vnDivServsIs.length; i++) {
            //        var nvDivServiceId = vnDivServsIs[i].RFP_SERVICE_ID
            //        $(e).parent().next('div').children('#srv').children('option').each(function ()
            //        {
            //            var currentServiceId = $(this).val();
            //            if (currentServiceId == nvDivServiceId) {
            //                $(this).remove();
            //            }
            //        })
            //    }


            //}
        }
    })
}
function RemoveNacDiv(e) {
    var data_s_ = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').attr('data-guid')
    if (data_s_ == undefined) {
        if ($('#vnTableBody').children('tr').length == 2) {
            $('#vnTable').remove()
        }
        else {
            $(e).parent().parent().remove();
        }
        $('.vndiv:last').children('div:eq(0)').children('select').removeAttr('disabled')//.attr('disabled', 'disabled')
        $('.vndiv:last').children('div:eq(1)').children('select').removeAttr('disabled')//.attr('disabled', 'disabled')
    }
    else {
        var service = $(e).parent().parent().find('#srv').val();
        var result = confirm('Вы действительно хотите удалить услугу "' + service + '" ?')
        var pay_guid = $(e).parent().parent().attr('data-guid')
        if (result == true) {
            DeleteKvart(pay_guid)
            $(e).parent().parent().remove()
        }
    }

}
function DeleteKvart(PAY_GUID) {
    var Obj = { "PAY_GUID": PAY_GUID }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/DeleteKvart",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {

        }
    })
}
function getMonthsAndYears(s) {
    var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    var d = new Date();
    var today = d.toISOString().substring(0, d.toISOString().indexOf('T'))
    today = today.split('-')
    var year = today[0]
    var mm = d.getMonth();
    var currentMonth = months[d.getMonth()];
    $('#Period').empty();
    for (var i = mm; i >= 0; i--) {
        $('#Period').append('<option value=' + months[i] + '_' + year + '>' + months[i] + ' ' + year + '</option>')
    }
    //for (var i = mm; i >= 0; i--) {
    //    $('#Period').append('<option value=' + months[i] + '_' + parseInt(year - 1) + '>' + months[i] + ' ' + parseInt(year - 1) + '</option>')
    //}

    for (var i = 0; i < months.length; i++) {
        var min = months[i]
        if (min == months[0]) {

            for (var j = months.length - 1; j >= i + 1; j--) {
                var ss = months[j];
                $('#Period').append('<option value=' + months[j] + '_' + (parseFloat(year) - 1) + '>' + months[j] + ' ' + (parseFloat(year) - 1) + '</option>')
            }
            $('#Period').append('<option value=' + months[i] + '_' + (parseFloat(year) - 1) + '>' + months[i] + ' ' + (parseFloat(year) - 1) + '</option>')
            break;
        }

    }

    for (var i = 0; i < months.length; i++) {
        var min = months[i]
        if (min == currentMonth) {

            for (var j = months.length - 1; j >= i + 1; j--) {
                var ss = months[j];
                $('#Period').append('<option value=' + months[j] + '_' + (parseFloat(year) - 2) + '>' + months[j] + ' ' + (parseFloat(year) - 2) + '</option>')
            }
            $('#Period').append('<option value=' + months[i] + '_' + (parseFloat(year) - 2) + '>' + months[i] + ' ' + (parseFloat(year) - 2) + '</option>')
            break;
        }

    }

    if (s != "") {
        s = s.replace(' ', '_')
        $('#Period').val(s)
    }
}
function getMonthsAndYearsPlatej() {
    var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    var d = new Date();
    var today = d.toISOString().substring(0, d.toISOString().indexOf('T'))
    today = today.split('-')
    var year = today[0]
    var mm = d.getMonth();
    var currentMonth = months[d.getMonth()];
    $('#PeriodP').empty();
    for (var i = mm; i >= 0; i--) {
        $('#PeriodP').append('<option value=' + months[i] + '_' + year + '>' + months[i] + ' ' + year + '</option>')
    }
    for (var i = mm; i >= 0; i--) {
        $('#PeriodP').append('<option value=' + months[i] + '_' + parseInt(year - 1) + '>' + months[i] + ' ' + parseInt(year - 1) + '</option>')
    }
    for (var i = 0; i < months.length; i++) {
        var min = months[i]
        if (min == currentMonth) {

            for (var j = months.length - 1; j >= i + 1; j--) {
                var ss = months[j];
                $('#PeriodP').append('<option value=' + months[j] + '_' + (parseFloat(year) - 2) + '>' + months[j] + ' ' + (parseFloat(year) - 2) + '</option>')
            }
            $('#PeriodP').append('<option value=' + months[i] + '_' + (parseFloat(year) - 2) + '>' + months[i] + ' ' + (parseFloat(year) - 2) + '</option>')
            break;
        }

    }
}
function GetTipNac(index, selected) {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/GetTipNac",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            var jsond = JSON.parse(data.d);
            if (selected == "") {
                $('#tipN0').children('option:not(:first)').remove();
                for (var i = 0; i < jsond.length; i++) {
                    if (jsond[i].DOMAIN_NAME == 1) {

                        $('#tipN0').append('<option value=' + jsond[i].DOMAIN_NAME + '>' + jsond[i].MAN_COMP_NAME + '</option>')

                    }
                }
            }
            else {
                for (var i = 0; i < jsond.length; i++) {
                    $('#vnTableBody').children('tr:eq(' + index + ')').children('td:eq(0)').children('#tipN0').append('<option value=' + jsond[i].DOMAIN_NAME + '>' + jsond[i].MAN_COMP_NAME + '</option>')
                }
                selected = selected.split('|');
                $('#vnTableBody').children('tr:eq(' + index + ')').children('td:eq(0)').children('#tipN0').val(selected[0])
                getRelationService($('#vnTableBody').children('tr:eq(' + index + ')').children('td:eq(0)').children('#tipN0'), selected[1])
            }
        }
    })
}

function AddingNac(e) {
    $('#errPer').remove()
    if ($(e).attr('id') == "Period") {
        var period = $(e).val().trim()
        $('#vnTableBody').find('tr:last').find('#srv').val('Итого за ' + period + ':')
        // $('#srv:last').val('Итого за ' + period + ':')
        if (period.length == 0) {
            $('#Period').before('<label id="errPer" style="color:red">Необходимо заполнить</label>')
            window.setTimeout(function () {
                $('#errPer').remove()
            }, 5000);
        }
    }
    //$(e).removeAttr('placeholder').removeAttr('class').css('width', '100%').css('box-shadow', '').css('border', '')
    //if ($(e).attr('id') != "Service") {
    //    if ($(e).attr('id') != "ONBEGIN" && $(e).attr('id') != "RECALC" && $(e).attr('id') != "ONEND") {
    //        if ($(e).val() < 0) {
    //            $(e).val('0');
    //        }
    //    }
    //    if ($(e).attr('type') == 'number') {
    //        // $(e).mask('000.00', { reverse: true })
    //    }
    //    if ($(e).attr('id') == 'VOLUME' || $(e).attr('id') == 'TARIFF') {
    //        var VOLUME = parseFloat($(e).parent().parent().children('.Volume').children('#VOLUME').val())
    //        VOLUME = (isNaN(VOLUME)) ? parseFloat('0,00') : VOLUME
    //        var TARIFF = parseFloat($(e).parent().parent().children('.tarif').children('#TARIFF').val());
    //        TARIFF = (isNaN(TARIFF)) ? parseFloat('0,00') : TARIFF
    //        var ovrl = VOLUME * TARIFF
    //        $(e).parent().parent().children('.overall').children('#OVERALL').val(ovrl.toFixed(2));
    //    }

    //    var ONBEGIN = parseFloat($(e).parent().parent().children('.onbegin').children('#ONBEGIN').val());
    //    ONBEGIN = (isNaN(ONBEGIN)) ? parseFloat('0,00') : ONBEGIN;

    //    var OVERALL = parseFloat($(e).parent().parent().children('.overall').children('#OVERALL').val());
    //    OVERALL = (isNaN(OVERALL)) ? parseFloat('0,00') : OVERALL;

    //    var PAYMENTS = parseFloat($(e).parent().parent().children('.payments').children('#PAYMENTS').val());
    //    PAYMENTS = (isNaN(PAYMENTS)) ? parseFloat('0,00') : PAYMENTS;

    //    var total_Step = (ONBEGIN + OVERALL) - PAYMENTS
    //    $(e).parent().parent().children('.onend,.overall2').children('#ONEND,#OVERALL2').val(total_Step.toFixed(2))
    //    //$('.Servc').each(function () {
    //    //    var ONBEGIN = parseFloat($(this).children('div:eq(1)').children('#ONBEGIN').val());
    //    //    ONBEGIN = (isNaN(ONBEGIN)) ? parseFloat('0,00') : ONBEGIN;

    //    //    var OVERALL = parseFloat($(this).children('div:eq(2)').children('#OVERALL').val());
    //    //    OVERALL = (isNaN(OVERALL)) ? parseFloat('0,00') : OVERALL;

    //    //    var PAYMENTS = parseFloat($(this).children('div:eq(3)').children('#PAYMENTS').val());
    //    //    PAYMENTS = (isNaN(PAYMENTS)) ? parseFloat('0,00') : PAYMENTS;

    //    //    var total_Step = (ONBEGIN + OVERALL) - PAYMENTS
    //    //    totalNac = parseFloat(totalNac) + parseFloat(total_Step)
    //    //    $(this).attr('data-total', totalNac.toFixed(2));
    //    //})
    //    // $('#sumNac').val(totalNac.toFixed(2))
    //    // $('#sumNac').mask('##.00', { reverse: true, maxlength: false })
    //}

}
function SaveMassPlatej(platej) {
    var Obj = { "platej": platej }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Payments.aspx/MassLoadPayment",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) { $('#closebnp').click(); }
    })
}
function removal(e) {
    if ($(e).is(":checked") == true) {
        $(e).after('<br><label id="dRemovalLbl" class="sameLine">Дата снятия</label><input class="sameInputLine" type="date" id="DRemove" ><br><label id="DInstalLbl" class="sameLine">Дата установки</label><input class="sameInputLine" type="date" id="DInstal" ><br>')
        var dtToday = new Date();

        var month = dtToday.getMonth() + 1;
        month = (month < 10) ? "0" + month : month
        var day = dtToday.getDate();
        day = (day < 10) ? "0" + day : day
        var year = dtToday.getFullYear();
        var maxDate = year + '-' + month + '-' + day;
        $('#DInstal,#DRemove').val(maxDate);
    }
    else {
        $("#removal+br").remove();
        $('#DRemove+br').remove();
        $('#DInstal+br').remove();
        $('#dRemovalLbl,#DRemove,#DInstalLbl,#DInstal').remove()

    }
}
function ShowExcelByOpenXml(f) {
    var Obj = { "file": f }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },

        type: "POST",
        url: "Apartments.aspx/ShowExcel",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (errdata) { console.log(errdata); $('.ui-loader-background,#loader').hide(); },
        success: function (data) {

            var jsondata = JSON.parse(data.d);
            // console.log(jsondata)
            ////console.log(jsondata.Numbers[1].NUMBER)
            // console.log(jsondata.Numbers);
            $('#scores').empty();
            ////console.log(jsondata)
            if (jsondata.result == "Ok") {
                data = JSON.parse(data.d);

                var comesNumbers = []
                for (var i = 0; i < jsondata.Numbers.length; i++) {
                    comesNumbers.push({ 'NUMBER': jsondata.Numbers[i].NUMBER, 'ENTRANCE': jsondata.Numbers[i].ENTRANCE, 'FLOOR': jsondata.Numbers[i].FLOOR, 'ROOM_NUMBER': jsondata.Numbers[i].ROOM_NUMBER, 'ROOM_FOR': jsondata.Numbers[i].ROOM_FOR, 'OWNERSHIP_TYPE_ID': jsondata.Numbers[i].OWNERSHIP_TYPE_ID, 'PHONE': jsondata.Numbers[i].PHONE, 'EMAIL': jsondata.Numbers[i].EMAIL, 'SHARE': jsondata.Numbers[i].SHARE, 'FIRST_NAME': jsondata.Numbers[i].FIRST_NAME, 'GEN_SQUARE': jsondata.Numbers[i].GEN_SQUARE, 'LIVE_SQUARE': jsondata.Numbers[i].LIVE_SQUARE, 'WITHOUT_SUMMER_SQUARE': jsondata.Numbers[i].WITHOUT_SUMMER_SQUARE, 'Pass': jsondata.Numbers[i].Pass })
                }
                //comesNumbers = JSON.stringify(comesNumbers)
                // data = JSON.stringify(data.Numbers)
                $('#datatable').dataTable(
                    {
                        "destroy": true,
                        data: jsondata.Numbers,

                        columns: [
                            { 'data': 'NUMBER' },
                            { 'data': 'ENTRANCE' },
                            { 'data': 'FLOOR' },
                            {
                                'data': 'ROOM_NUMBER',
                                'searchable': false
                            },
                            {
                                'data': 'ROOM_FOR',
                                'searchable': false
                            },
                            {
                                'data': 'ROOM_TYPE',
                                'searchable': false
                            },
                            {
                                'data': 'OWNERSHIP_TYPE_ID',
                                'searchable': false
                            },
                            {
                                'data': 'PHONE',
                                'searchable': false
                            },
                            {
                                'data': 'EMAIL',
                                'searchable': false
                            },
                            {
                                'data': 'SHARE',
                                'searchable': false
                            },
                            {
                                'data': 'FIRST_NAME',
                                'searchable': false
                            },
                            {
                                'data': 'GEN_SQUARE',
                                'searchable': false
                            },
                            {
                                'data': 'LIVE_SQUARE',
                                'searchable': false
                            },
                            {
                                'data': 'WITHOUT_SUMMER_SQUARE',
                                'searchable': false
                            },
                            {
                                'data': 'Pass',
                                'searchable': false
                            }

                        ],

                        //destroy: true,
                        "language": {
                            // "url":"//cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
                            "processing": "Подождите...",
                            "search": "Поиск по л/с",
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
                            "aria": {
                                "sortAscending": ": активировать для сортировки столбца по возрастанию",
                                "sortDescending": ": активировать для сортировки столбца по убыванию"
                            }
                        }
                    })
                for (var i = 0; i < $('#scores tr').length; i++) {
                    var score = $('#scores tr:eq(' + i + ') td:eq(0)').text().trim()
                    var rmnum = $('#scores tr:eq(' + i + ') td:eq(1)').text().trim()
                    var rmfor = $('#scores tr:eq(' + i + ') td:eq(2)').text().trim()
                    var rmtip = $('#scores tr:eq(' + i + ') td:eq(3)').text().trim()
                    if (score.length == 0 && rmnum.length == 0 && rmfor.length == 0 && rmtip.length == 0) {
                        $('#scores tr:eq(' + i + ')').remove()
                    }
                    //if (score =="№ ЛС*") {
                    //    $('#scores tr:eq(' + i + ')').remove()
                    //}

                }

                //for (var i = 1; i < jsondata.Numbers.length; i++) {
                //    ////console.log(jsondata.Numbers[i].NUMBER);
                //    if (jsondata.Numbers[i].NUMBER != "") {
                //        $('#scores').append('<tr><td>' + jsondata.Numbers[i].NUMBER + '</td><td>' + jsondata.Numbers[i].ROOM_NUMBER + '</td><td>' + jsondata.Numbers[i].ROOM_FOR + '</td><td>' + jsondata.Numbers[i].ROOM_TYPE + '</td><td>' + jsondata.Numbers[i].OWNERSHIP_TYPE_ID + '</td><td>' + jsondata.Numbers[i].PHONE + '</td><td>' + jsondata.Numbers[i].EMAIL + '</td><td>' + jsondata.Numbers[i].SHARE + '</td><td>' + jsondata.Numbers[i].FIRST_NAME + '</td><td>' + jsondata.Numbers[i].GEN_SQUARE + '</td><td>' + jsondata.Numbers[i].LIVE_SQUARE + '</td><td>' + jsondata.Numbers[i].WITHOUT_SUMMER_SQUARE + '</td><td>' + jsondata.Numbers[i].Pass + '</td></tr>')
                //    }

                //}
                $('#loadEx').attr('data-file', f)
            }
            else {
                $('#deleteO').hide();
                $('#files').val('');
                alertWithButton2("Ошибка", "Загружаемый Excel-документ не соответствует шаблону. С корректным шаблоном документа можете ознакомиться здесь <a  href='../img / Форма загрузки ЛС.xlsx' download>ссылка на скачивание шаблона</a> ", "", "", "", "", "");
            }
            $('.ui-loader-background').hide();
            $("#loader").hide();
        },
        complete: function () {
            $('#loader2,#loader').hide(); $('#loader2 .w3-blue').css('width', '0%')
            $('#lblloader').text("").css('margin-left', '0%');
            $('.ui-loader-background').hide();
        }

    })
}
function BNPFileChange(e) {
    if ($('#ObjBnp').val() != 0) {
        $("#loader").show();
        $('#objsBnp_E').remove()
        var filePath = $('#fileBnP').val();

        var index = filePath.lastIndexOf("\\") + 1;
        var filename = filePath.substr(index);
        var ext = e.value.split('.').pop();/*(extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT")*/
        // //console.log(ext);
        if (ext == "xls" || ext == "xlsx") {
            $('.ui-loader-background').show();
            $("#loader").show();
            readURL_BNP(e, filename);

            $("#flS").hide();
        }
        else {
            $("#fileBnP").after('<label id="flS" style="color:red"> Неверный  формат файла</label>');
            $("#loader").hide();
            $('.ui-loader-background').hide()
        }
    }
    else {
        $(e).val('');
        if ($('#objsBnp_E').length == 0) {

            $('#ObjBnp').after('<label id="objsBnp_E" style="color:red">Необходимо выбрать объект</label>')

        }
    }
}

function readURL_BNP(input, imgName) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {


            $('.foto-disp').attr('src', e.target.result);

            //var nameImg = imgName
            //var arrayBuffer = reader.result
            //var bytes = new Uint8Array(arrayBuffer);
            //var obj = { baseString: bytes, imgName: nameImg };
            var formData = new FormData();
            var file = document.getElementById("fileBnP").files[0];

            formData.append('file', file, encodeURI(file.name));
            formData.append('object_id', '1');
            ////console.log(formData);



            $.ajax({
                error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",//window.location.protocol + '//' + window.location.host + "
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                timeout: 3600000,
                crossDomain: true,
                //async: false,
                success: function (result) {
                    var file = result.URL
                    file = file.substring(file.lastIndexOf('/') + 1, file.lenght)
                    // var o = $('#objsM').val()
                    // SaveAccFromExcel(o, file)
                    //$('.modal-contentBnp').css('width', '85%')
                    var lg1 = sessionStorage.getItem("Log")
                    var Objval = $('#objsM').val();
                    $('#errDiv').remove();
                    //  $('#loadPmnt1').removeAttr('disabled');
                    // $('#loadPmnt1').attr('onclick', 'SavePaymentsFromExcel(' + lg1 + ',' + file + ',' + Objval + ')').removeAttr('disabled')
                    $(input).attr('data-file', file);
                    // $('#loader').hide();
                    SavePaymentsFromExcel(sessionStorage.getItem("Log"), file, $('#objsM').val())
                }
            })
        }
    }
}
function kvartFileChange(e) {
    $("#loader").show();
    $('#objsBnp_E').remove()
    var filePath = $('#fileBnP').val();

    var index = filePath.lastIndexOf("\\") + 1;
    var filename = filePath.substr(index);
    var ext = e.value.split('.').pop();/*(extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT")*/
    // //console.log(ext);
    if (ext == "xls" || ext == "xlsx") {
        $('.ui-loader-background').show();
        $("#loader").show();
        readURLkvart(e, filename);

        $("#flS").hide();
    }
    else {
        $("#fileBnP").after('<label id="flS" style="color:red"> Неверный  формат файла</label>');
        $("#loader").hide();
        $('.ui-loader-background').hide()
    }
}
function readURLkvart(input, imgName) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {


            $('.foto-disp').attr('src', e.target.result);

            //var nameImg = imgName
            //var arrayBuffer = reader.result
            //var bytes = new Uint8Array(arrayBuffer);
            //var obj = { baseString: bytes, imgName: nameImg };
            var formData = new FormData();
            var file = document.getElementById("filekvart").files[0];

            formData.append('file', file, encodeURI(file.name));
            formData.append('object_id', '1');
            ////console.log(formData);



            $.ajax({
                error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFileKvartplata",//window.location.protocol + '//' + window.location.host + "
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                timeout: 3600000,
                crossDomain: true,


                success: function (result) {
                    var file = result.URL
                    file = file.replace('~', '');
                    ////console.log(file);
                    $('#loadPmntKvart').attr('href', window.location.protocol + '//' + window.location.host + '' + file).removeAttr('disabled')
                    // $('#filekvart').after('<a id="payExs" href=' + window.location.protocol + '//' + window.location.host + '' + file + '></a>')
                    // $('#payExs').click();

                    //file = file.substring(file.lastIndexOf('/') + 1, file.lenght)
                    //// var o = $('#objsM').val()
                    //// SaveAccFromExcel(o, file)
                    ////$('.modal-contentBnp').css('width', '85%')
                    //var lg1 = sessionStorage.getItem("Log")
                    //var Objval = $('#objsM').val();
                    //$('#errDiv').remove();
                    ////  $('#loadPmnt1').removeAttr('disabled');
                    //// $('#loadPmnt1').attr('onclick', 'SavePaymentsFromExcel(' + lg1 + ',' + file + ',' + Objval + ')').removeAttr('disabled')
                    //$(input).attr('data-file', file);
                    //// $('#loader').hide();
                    //SavePaymentsFromExcel(sessionStorage.getItem("Log"), file, $('#objsM').val())
                    $("#loader").hide();
                    $('.ui-loader-background').hide()
                }
            })
        }
    }
}
function SavePaymentsFromExcel(lg, fl, obj) {
    var Obj = { "lg": lg, "file": fl, "obj": obj }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Payments.aspx/ShowPayments",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            var jsondata = JSON.parse(data.d);
            $('#tblBnp').empty();
            $("#loader").hide();
            if (jsondata.result != "Ok") {
                //$('#fileBnP').after('<label id="flS" style="color:red"> ' + jsondata.result + '</label>')
                //
                //$('#errDiv').remove()
                //$('#fileBnP').after('<div id="errDiv" style="border-style:groove;border-color:red;color:red;width:  50%;margin-left:  23%;font-size:  large;">Файл не соответствует шаблону. Ознакомиться с шаблоном загрузки можно по ссылке: <a style="black" href="../img/Форма загрузки начислений и платежей.xlsx">«Ссылка на шаблон»</a></div>')
                //$('#fileBnP').val('').removeAttr('data-file')
                //$('#loadPmnt1').hide()
                //$('#Successlbl').text('Строки с корректными данными : ' + jsondata.SuccesCount + ' строк из ' + jsondata.AllCount + '')
                //$('#Errorlbl').text('Строки содержащие ошибки : ' + jsondata.ErrorCount + ' строк из ' + jsondata.AllCount + '')
                ////if (jsondata.SuccesCount > 0) {
                ////    // jsondata.SuccessAdress = window.location.protocol + '//' + window.location.host + "/" + jsondata.SuccessAdress
                ////    $('#loadPmnt1').hide().attr('onclick', 'SavePaymentsMass("' + jsondata.SuccessAdress + '",' + obj + ')')
                ////}
                //if (jsondata.ErrorCount > 0) {
                //    jsondata.ErrorAdress = window.location.protocol + '//' + window.location.host + "/Files/Error_Excel/" + jsondata.ErrorAdress
                //    $('#loadPmn_t_Error').show().attr('href', jsondata.ErrorAdress)
                //}

                $('#errDiv').remove()
                $('#fileBnP').after('<div id="errDiv" style="border-style:groove;border-color:red;color:red;width:  50%;margin-left:  23%;font-size:  large;">Файл не соответствует шаблону. Ознакомиться с шаблоном загрузки можно по ссылке: <a style="black" href="../img/Форма загрузки начислений и платежей.xlsx">«Ссылка на шаблон»</a></div>')

            }
            if (jsondata.result == "Ok") {

                $('#Successlbl').text('Строки с корректными данными : ' + jsondata.SuccesCount + ' строк из ' + jsondata.AllCount + '')
                $('#Errorlbl').text('Строки содержащие ошибки : ' + jsondata.ErrorCount + ' строк из ' + jsondata.AllCount + '')
                if (jsondata.SuccesCount > 0) {
                    // jsondata.SuccessAdress = window.location.protocol + '//' + window.location.host + "/" + jsondata.SuccessAdress
                    $('#loadPmnt1').show().attr('onclick', 'SavePaymentsMass("' + jsondata.SuccessAdress + '",' + obj + ')')
                    $('#loadPmnt1').after('<label style="margin-left: 44% !important;width: 44%;">Отправить квитанцию на житель</label><input type="checkbox" id="sendReciept_" style="margin-top: -15px;margin-left: 40%;">')
                }
                if (jsondata.ErrorCount > 0) {
                    jsondata.ErrorAdress = window.location.protocol + '//' + window.location.host + "/Files/Error_Excel/" + jsondata.ErrorAdress
                    $('#loadPmn_t_Error').show().attr('href', jsondata.ErrorAdress)
                }
            }
            //else {

            //    $('#fileBnP').val('');
            //    alertWithButton2("Ошибка", "Загружаемый Excel-документ не соответствует шаблону. С корректным шаблоном документа можете ознакомиться здесь <a  href='../img/Форма загрузки начислений и платежей.xlsx' download>ссылка на скачивание шаблона</a>")
            //}
            $('.ui-loader-background').hide();
            $("#loader").hide();
        }
    })
}
function SavePaymentsMass(file, ob_j) {
    $('.ui-loader-background').show();
    $("#loader").show();
    var Log = sessionStorage.getItem("Log");
    var sendReciept = $('#sendReciept_').prop('checked');
    var Obj = { "f": file, "o": ob_j, "lg": Log, "sendReciept": sendReciept }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Payments.aspx/SavePaymentsMass",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            $('#closebnp').click();
            $('.ui-loader-background').hide();
            $("#loader").hide();
        }
    })
}
function MaskY(e) {
    $(e).inputmask("9999");
    $(e).parent().children('i').remove();
    $('#errEmpty').remove();
}
function validateNum(e) {
    var id = $(e).attr("id");
    if (id.indexOf('bbp') > -1 || id.indexOf('ch') > -1 || id.indexOf('res') > -1 || id.indexOf('tot') > -1) {


        //if (/\D/g.test(e.value)) e.value = e.value.replace(/\D/g, '')
        e.value = e.value.replace(/[^0-9\.,-]/g, '')
        $(e).parent().children('i').remove();
        $('#errEmpty').remove()

    }
    if (id.indexOf('sc') > -1) {
        CheckSrcore(e, $(e).val(), $('#ObjBnp').val())
    }
}
function CheckSrcore(e, sc, Obj) {
    var obj = { "sc": sc, "Obj": Obj }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Payments.aspx/CHeckScore",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d)
            if (j.result == 0) {
                if ($('#lblSc_err').length == 0) {

                    $(e).after('<label id="lblSc_err" style="color: red">Данный лицевой счет не обнаружен!</label>')
                    window.setTimeout(function () {
                        $('#lblSc_err').hide(1000);
                        $('#lblSc_err').remove();
                    }, 3000)
                }

            }
            else {
                $('#lblSc_err').remove();
                $(e).css("color", "black")
            }
        }
    })
}
function removeTD(e) {
    $(e).parent().parent().remove();
    $('#dubl').remove();
    for (var i = 0; i < $('#tblBnp tr').length; i++) {
        $('#tblBnp tr:eq(' + i + ') td:eq(0)').css("color", "black").css("font-weight", "")
        $('#tblBnp tr:eq(' + i + ') td:eq(3)').css("color", "black").css("font-weight", "")
    }
}
function ErrorForControls(e, text) {
    var e_class = $(e).attr('class')
    if (e_class == 'select2-hidden-accessible') {
        $(e).parent().find('.select2-selection').attr('style', 'border-color:#f06d06 !important')
        if (text != undefined) {
            //var originalText = $(e).next().next('label').text()
            $(e).next().next('label').hide()
            // $(e).closest('#ErrorLabel_').remove()
            //   var ErrorLabel_ = $(e).parent().children('#ErrorLabel_').length
            if ($(e).parent().children('#ErrorLabel_').length == 0) {
                $(e).next().next('label').after('<label id="ErrorLabel_" title="' + text + '" class="w-95 transp backLab" style="color:red">' + text + '</label>')//.attr('style', 'color: red').text(text)
            }
            var select2Id = $(e).attr('id');
            var spanId = '#select2-' + select2Id + '-container'
            // var original_title = $(spanId).attr('title')
            $(spanId).attr('title', text)
            window.setTimeout(function () {
                //  $(e).removeAttr('title'),
                $('#ErrorLabel_').remove()
                $(e).next().next('label').show()
                //$(spanId).attr('title', original_title)
                //  $(e).next().next('label').removeAttr('style').text(originalText)

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
    $("html, body").animate({ scrollTop: position }, "slow");

    window.setTimeout(function () { $(e).removeAttr('style'); $('#servicelbl').remove() }, 5000);

    if (text != undefined && e_class != 'select2-hidden-accessible') {
        //  var originalText = $(e).next('label').text()
        $(e).next('label').hide()
        if ($(e).parent().children('#ErrorLabel_txt').length == 0) {
            $(e).next('label').after('<label id="ErrorLabel_txt" title="' + text + '" class="w-95 transp backLab" style="color:red">' + text + '</label>')//.attr('style', 'color: red').text(text)
        }
        //   $(e).next('label').attr('style', 'color: red').text(text)
        //  $(e).attr('title', text)
        window.setTimeout(function () {
            //  $(e).next('label').removeAttr('style').text(originalText)
            $(e).next('label').show()
            //   $(e).attr('title', '')
            $('#ErrorLabel_txt').remove();
        }, 5000);
    }
}

function checkControlsM() {
    var Issuccess = true
    $('[required]').each(function () {
        var tagName = this.tagName
        var labelName = $(this).parent().children('label').text();
        if (tagName == 'SELECT') {

            if ($(this).val() == 0) {
                ErrorForControls(this, 'Необходимо выбрать "' + labelName + '"')
                Issuccess = false
            }
        }
        if (tagName == 'INPUT') {
            if ($(this).val().trim().length == 0) {
                ErrorForControls(this, 'Необходимо заполнить поле "' + labelName + '"')
                Issuccess = false
            }
        }

    })

    $('.ls').each(function () {
        var data_tabid = "";
        $('[required]').each(function () {
            var tagName = this.tagName
            var labelName = $(this).parent().children('label').text();

            if (tagName == 'INPUT') {
                if ($(this).val().trim().length == 0) {
                    data_tabid = $(this).parents('div[data-tabid]').attr('data-tabid')
                    Issuccess = false
                }
            }
        })
        if (Issuccess == false) {

            if (data_tabid == 1) {
                $(this).children().find('ol').children('li:eq(0)').click()
            }
            else if (data_tabid == 2) {
                $(this).children().find('ol').children('li:eq(1)').click()
            }
        }
    })
    if (Issuccess == true) {
        var objs = $("#objs").val();
        var entr = ($("#entr").val().length == 0) ? 0 : $("#entr").val();
        var floor = ($("#floor").val().length == 0) ? 0 : $("#floor").val();
        var rnum = $("#rnum").val();
        var RoomF = $('#RoomF').val();
        var r_t = $('#r_t').val();
        var countR = ($("#countR").val().length == 0) ? 0 : $("#countR").val();
        var GenS = ($("#GenS").val().length == 0) ? 0 : $("#GenS").val();
        var LiveS = ($("#LiveS").val().length == 0) ? 0 : $("#LiveS").val();
        var txtDatas = []
        $('.ls').each(function () {
            var lc = $(this).children().find('#lc').val().trim()
            var ID_lc = $(this).children().find('#lc').attr('data-id')//scoreGuid
            var pass = $(this).children().find('#pss').val().trim();
            var typeProp = $(this).children().find('#typeProp').val();
            var LiveSq = $(this).children().find('#LiveSq').val().trim()
            LiveSq = (LiveSq.length == 0) ? " " : LiveSq
            var GenSq = $(this).children().find('#GenSq').val().trim();
            GenSq = (GenSq.length == 0) ? " " : GenSq
            var LiveSqB = $(this).children().find('#LiveSqB').val().trim();
            LiveSqB = (LiveSqB.length == 0) ? " " : LiveSqB
            var AmRoom = $(this).children().find('#AmRoom').val().trim();
            AmRoom = (AmRoom.length == 0) ? " " : AmRoom
            var data_sms = "";
            var data_em = "";
            var data_exp = "";
            ID_lc = (ID_lc == undefined) ? '0' : ID_lc
            if (pass != undefined && pass.length != 0) {
                data_sms = $(this).children().find('#pss').attr('data-sms')
                data_sms = (data_sms == undefined) ? "" : data_sms

                data_em = $(this).children().find('#pss').attr('data-em')
                data_em = (data_em == undefined) ? "" : data_em

                data_exp = $(this).children().find('#pss').attr('data-exp')
                data_exp = (data_exp == undefined) ? "" : data_exp
            }
            var itmsS = []
            var ItemCount = $(this).children('div[data-tabid="2"]').find('div[itemid]').last().attr('itemid')
            for (var i = 0; i <= ItemCount; i++) {
                var itemid = i//$(this).attr('itemid');
                var data_tab_Children = $(this).children('div[data-tabid="2"]').children('div[itemid="' + itemid + '"]')
                var sobs = $(data_tab_Children).children().find('#sobs' + itemid + '').val().trim()
                var sobs = $(this).children().find('#sobs' + itemid + '').val().trim()
                if (sobs == undefined) {
                    spobs = "";
                }
                var dol = "";
                if (typeProp == 3) {
                    dol = $(this).children().find('#dol' + itemid + '').val().trim();
                    dol = dol.replace(',', '.')
                }
                var tel = $(this).children().find('#tel' + itemid + '').val().trim()
                if (tel != undefined) {
                    if (pass.length != 0 && data_sms == "has" && tel.length == 0) {
                        ErrorForControls($(this).children().find('#tel' + itemid + ''), 'Для рассылки пароля не хватает следующих данных "Номер телефона"')
                        Issuccess = false
                    }
                }
                var email = $(this).children().find('#email' + itemid + '').val().trim()
                if (email != undefined) {
                    if (pass.length != 0 && data_em == "has" && email.length == 0) {
                        ErrorForControls($(this).children().find('#email' + itemid + ''), 'Для рассылки пароля не хватает следующих данных: "E-mail"')
                        Issuccess = false
                    }

                }
                else {
                    email = "";
                }
                itmsS.push({ "FIRST_NAME": sobs, "SHARE": dol, "PHONE": tel, "EMAIL": email })
            }


            lc = lc + "|" + pass + "|" + data_sms + "|" + data_em + "|" + data_exp
            txtDatas.push({ "NUMBER": lc, "OWNERSHIP_TYPE_ID": typeProp, "LIVE_SQUARE": LiveSq, "GEN_SQUARE": GenSq, "WITHOUT_SUMMER_SQUARE": LiveSqB, "ROOM_QUANT": AmRoom, "A_D": itmsS, "ID": ID_lc })
        })


        var obj = { "OBJECT_ID": objs, "ENTRANCE": entr, "FLOOR": floor, "ROOM_NUMBER": rnum, "ROOM_FOR_ID": RoomF, "ROOM_TYPE_ID": r_t, "CHAMB_AMOUNT": countR, "GEN_SQUARE": GenS, "LIVE_SQUARE": LiveS, "adbs": txtDatas };
        console.log(obj)
    }
    console.log(obj)
    return { Issuccess: Issuccess, obj: obj }
}
function CHeck_Obj_RMF_RMT_RMN(e, OBJECT_ID, ROOM_FOR_ID, ROOM_TYPE_ID, ROOM_NUMBER, LOG_IN_ID, FLOOR) {
    var obj = { "OBJECT_ID": OBJECT_ID, "ROOM_FOR_ID": ROOM_FOR_ID, "ROOM_TYPE_ID": ROOM_TYPE_ID, "ROOM_NUMBER": ROOM_NUMBER, "LOG_IN_ID": LOG_IN_ID, 'FLOOR': FLOOR }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Apartments.aspx/CHeck_Obj_RMF_RMT_RMN",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d);
            var ids = $(e).attr('id')
            if (j.result != "0") {

                if ($('#' + ids + 'E').length == 0) {
                    //$('#' + ids + 'H').after('<label id="' + ids + 'E" style="color:red">Помещение с таким назначением, этажом,номером и типом уже есть на данном объекте! </label>')
                    ErrorForControls(e, 'Помещение с таким назначением, этажом,номером и типом уже есть на данном объекте! ')
                }
            }
            else {
                // $('#' + ids + 'E').remove();
                $('#RoomFE,#objsE,#rnumE,#RoomFE,#r_tE').remove();
            }
        }
    })
}
function getRoomBYO_ID2(l, o, selectedS) {
    $("#loader,.ui-loader-background").show();

    var obj = { "lg": l, "o": o }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Apartments.aspx/GetRoomByO_Id2",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            $('#roomsPass').empty()
            for (var i = 0; i < jsondata_.length; i++) {
                var color = "black"
                if (jsondata_[i].NUMBER.indexOf('~') > -1) {
                    jsondata_[i].NUMBER = jsondata_[i].NUMBER.replace('~', '');
                    jsondata_[i].NUMBER = jsondata_[i].NUMBER + ""//(Has Password)
                    // color = "green"
                    color = "black"

                }
                var checked = "";
                if (selectedS != undefined && selectedS.length != 0) {

                    for (var j = 0; j < selectedS.length; j++) {
                        if (jsondata_[i].NUMBER == selectedS[j].NUMBER) {
                            checked = 'checked="checked"'
                        }
                    }
                }
                $('#roomsPass').append('<tr><td><input onclick=removechkerr(this) type="checkbox" ' + checked + ' value="' + jsondata_[i].NUMBER + '"/></td><td style="color:' + color + '">' + jsondata_[i].NUMBER + '</td><td>' + jsondata_[i].ROOM_FOR + '</td><td>' + jsondata_[i].ROOM_TYPE + '</td><td>' + jsondata_[i].ROOM_NUMBER + '</td><td>' + jsondata_[i].FIRST_NAME + '</td></tr>')

                //var lc = jsondata_[i].NUMBER//$('#rooms tr:eq(' + i + ') td:eq(5)').text()
                //var twodata = $('#roomsPass tr td:contains(' + lc + ')').length
                //if (i != 0) {
                //    if (twodata == 2) {
                //        // $('#roomsPass tr:eq(' + (i+1) + ')').remove();
                //        $('#roomsPass tr td:contains(' + lc + '):first').parent().remove()
                //    }
                //}

                $("#loader,.ui-loader-background").hide();


            }
        }
    })
}
function CheckPass(p) {
    var obj = { "p": p }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/CHeckPass",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d);
            if (j.result == "1") {
                $('.domOk').text('Данный пароль уже есть в системе').show();
            }
            else {
                $('.domOk').hide();
            }
        }
    })
}
function LCFileChange(e) {
    $("#loader").show();
    $('.ui-loader-background').show();
    $('#loader2').show();
    var filePath = $('#filesLC').val();
    $('#errEx').remove();
    var index = filePath.lastIndexOf("\\") + 1;
    var filename = filePath.substr(index);
    var ext = e.value.split('.').pop();/*(extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT")*/
    // //console.log(ext);
    if (ext == "xls" || ext == "xlsx") {
        readURL_LC(e, filename);
        $("#file_S").hide();
        $('#flS').remove();
    }
    else {
        $("#filesLC").after('<label id="flS" style="color:red"> Неверный  формат файла</label>');
        $("#loader,.ui-loader-background").hide();
    }
}
function readURL_LC(input, imgName) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {


            $('.foto-disp').attr('src', e.target.result);

            //var nameImg = imgName
            //var arrayBuffer = reader.result
            //var bytes = new Uint8Array(arrayBuffer);
            //var obj = { baseString: bytes, imgName: nameImg };
            var formData = new FormData();
            var file = document.getElementById("filesLC").files[0];

            formData.append('file', file, encodeURI(file.name));
            formData.append('object_id', '1');
            ////console.log(formData);



            $.ajax({
                error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",//window.location.protocol + '//' + window.location.host + "
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                timeout: 3600000,
                crossDomain: true,
                //async: false,
                success: function (result) {
                    var file = result.URL
                    file = file.substring(file.lastIndexOf('/') + 1, file.lenght)
                    var o = $('#objsM').val()
                    //SaveAccFromExcel(o, file)
                    $('#datatable_length,#datatable_filter,#datatable_info,#datatable_paginate').remove()
                    $('#loadLC2 table').removeAttr('role').removeAttr('aria-describedby').removeClass('dataTable').removeClass('no-footer')
                    $('#loadLC2 table thead tr th').removeClass('sorting').removeAttr('tabindex').removeAttr('aria-controls').removeAttr('colspan').removeAttr('rowspan').removeAttr('aria-label').removeAttr('style').removeAttr('aria-sort').removeAttr('style').removeAttr('class');
                    $('#loadLC2 table thead tr').removeAttr('role');
                    //$('#datatable').dataTable({
                    //    "retrive": true,

                    //});
                    //  $.getScript('../Manager/js/jquery.dataTables.js');
                    //$("body").load('../Manager/js/jquery.dataTables.js')
                    // reload_js('js/jquery.dataTables.js');
                    ShowExcelByOpenXml(file)
                    $('#filesLC').val('');
                }
            })
        }
    }
}
function CntrSortingby(e, by, asc) {
    var Log = sessionStorage.getItem('Log');
    var ob = { "lg": Log, "by": by, "asc": asc }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/GetMeterBySorting",
        data: JSON.stringify(ob),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#mtrs').empty();
            $('i[data-icon="w"]').attr('class', 'fa fa-unsorted')
            var icon = $(e).attr('class');
            if (asc == "asc") {
                $(e).attr('class', 'fa fa-caret-down').attr("onclick", "CntrSortingby(this, '" + by + "','desc')")
            }
            if (asc == "desc") {
                $(e).attr('class', 'fa fa-caret-up').attr("onclick", "CntrSortingby(this, '" + by + "','asc')")
            }
            var j = JSON.parse(data.d)
            var d = new Date();

            var month = d.getMonth() + 1;
            var day = d.getDate();

            var strDate = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day


            for (var i = 0; i < j.length; i++) {
                var nxt = j[i].NEXT_DATE.substring(0, j[i].NEXT_DATE.indexOf(' ')).split('.')
                nxt = nxt[2] + '-' + nxt[1] + '-' + nxt[0];
                var src = "";
                if (nxt <= strDate) {
                    src = '<img src="/img/timesup.png" alt="">'
                }

                $('#mtrs').append('<tr><td></td><td><a href="#" onclick="gotoM(' + j[i].METERS_ID + ')">' + j[i].ROOM_TYPE + '</a></td><td><a href="#" onclick="gotoM(' + j[i].METERS_ID + ')">' + j[i].ROOM_NUMBER + '</a></td><td><a href="#" onclick="gotoM(' + j[i].METERS_ID + ')">' + j[i].SCORE_ID + '</a></td><td><a href="#" onclick="gotoM(' + j[i].METERS_ID + ')">' + j[i].TYPE + '</a></td><td><a href="#" onclick="gotoM(' + j[i].METERS_ID + ')">' + j[i].METERS_NUMBER + '</a></td><td><a href="#" onclick="gotoM(' + j[i].METERS_ID + ')">' + j[i].PREVIOUS_DATE.substring(0, j[i].PREVIOUS_DATE.indexOf(' ')) + '</a></td><td><a href="#" onclick="gotoM(' + j[i].METERS_ID + ')">' + j[i].NEXT_DATE.substring(0, j[i].NEXT_DATE.indexOf(' ')) + '</a></td><td>' + src + '</td></tr>')
            }
        }
    })
}
function DelPopUp() {
    var modal = document.getElementById('myModalDelC');
    var span = document.getElementsByClassName("close_D")[0];

    var tipMeter = $('#TMeterC').val();
    if (tipMeter != 4) {
        //del_C
        var pokazing = $('#tab1 .col-xs-6 .table tbody tr').length; //$('#tab1 .col-xs-6 .table tr:last td:eq(1)').text();
        //  //console.log(pokazing)
        if (parseInt(pokazing) > 1) {
            $('#del_C').val('Архивировать')
            $('#myModalDelC .modal-body2 h2').text('Счетчики, по которым были переданы показания, не могут быть удалены. Вы уверены, что хотите перенести данный счетчик в архив?')
        }
    }
    else {
        var t1 = $('#tab1 .col-xs-6 .table tbody tr').length;
        //var t2 = $('#tab1 .col-xs-6 .table tr:last td:eq(2)').text();
        //var t3 = $('#tab1 .col-xs-6 .table tr:last td:eq(3)').text();
        if (parseInt(t1) > 1) {
            $('#del_C').val('Архивировать')
            $('#myModalDelC .modal-body2 h2').text('Счетчики, по которым были переданы показания, не могут быть удалены. Вы уверены, что хотите перенести данный счетчик в архив?')
        }
    }
    $("#close_D,#cls,#OtS").click(function () {
        modal.style.display = "none";

    })
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";

        }
    }
    modal.style.display = "block";
}
function DeleteCounter(mid) {
    var obj = { "mid": mid }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "CounterCard.aspx/DeleteCounter",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            window.location.href = "Counters.aspx"
        }
    })
}
function MakeStop(mid, St_date, cmnt, file, lg) {
    var obj = { "mid": mid, "St_date": St_date, "cmnt": cmnt, "file": file, "lg": lg }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "CounterCard.aspx/MakeStop",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#SaveUp,#zamen,#Pove,#delC').attr('disabled', 'disabled').css('background', " #999");
            $('#close_St').click();
            $('#StopC').text('Возобновить работу');
            $('#hist').empty();
            $('#lblDataPosProver').after('<div id="iconStop_C" style="width: 40%;/* height: 53%; */border-style:  ridge;float:  right;font-size:  large;text-align: center;border-color:  red;"><i style="font-size:24px;color:  red;float: left;margin-left: 11px;margin-top: 3px;" class="fa fa-pause-circle"></i><label style="font-weight:100;color:red;font-size:14px;">Счетчик приостановлен</label></div>')
            $('#tab1 .row:eq(1) .btn').attr('disabled', 'disabled').css('background-color', 'rgb(149,153,156)')
            getHistoryMeter(mid);
        }
    })
}
function StopPopup() {
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    var strDate = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day
    // $('#lstP').val(new Date.now());
    $('#Sdate').val(strDate).removeAttr('disabled').css("background-color", "");
    var modal = document.getElementById('myModalStopC');
    var span = document.getElementsByClassName("close_P")[0];
    modal.style.display = "block";

    $("#close_St,#cls,#Close_Stop_C").click(function () {
        modal.style.display = "none";

    })
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";

        }
    }

}
function file_StChange(e) {
    $("#loader,.ui-loader-background").show();
    var filePath = $('#file_S').val();

    var index = filePath.lastIndexOf("\\") + 1;
    var filename = filePath.substr(index);
    var ext = e.value.split('.').pop();/*(extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT")*/
    // //console.log(ext);
    if (ext == "jpg" || ext == "png" || ext == "docx" || ext == "doc" || ext == "docx" || ext == "xls" || ext == "xlsx" || ext == "pdf" || ext == "PDF" || ext == "txt" || ext == "TXT") {
        $('#flS').remove()
        readURL_S(e, filename);

        $("#file_S").hide();
    }
    else {
        $('#flS').remove()
        $("#file_S").after('<label id="flS" style="color:red"> Неверный  формат файла</label>');
        $("#loader,.ui-loader-background").hide();
    }
}
function removeFMS(e) {
    $(e).remove();
    $('.HistImg,.titleF2').remove();
    $('.modal-content2').css('height', '90%')
    $('#file_S').show().val('');
}
function readURL_S(input, imgName) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {


            $('.foto-disp').attr('src', e.target.result);

            //var nameImg = imgName
            //var arrayBuffer = reader.result
            //var bytes = new Uint8Array(arrayBuffer);
            //var obj = { baseString: bytes, imgName: nameImg };
            var formData = new FormData();
            var file = document.getElementById("file_S").files[0];

            formData.append('file', file, encodeURI(file.name));
            formData.append('object_id', '1');
            ////console.log(formData);



            $.ajax({
                error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",//window.location.protocol + '//' + window.location.host + "
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                timeout: 3600000,
                crossDomain: true,
                //async: false,
                success: function (result) {
                    $("#loader,.ui-loader-background").hide();
                    $("#file_S").hide();
                    var F_ile = result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/")
                    var extention = F_ile.substr(F_ile.lastIndexOf(".") + 1)
                    //
                    if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
                        $("#file_S").after('<img class="HistImg"  data-url="' + F_ile + '" src="' + F_ile + '"  ><i class="fa fa-close removing" onclick="removeFMS(this)"  aria-hidden="true"></i>')
                    }
                    if (extention == "docx" || extention == "doc") {

                        $("#file_S").after('<img class="HistImg"  data-url="' + F_ile + '"  src="' + window.location.protocol + '//' + window.location.host + '/img/word.png"  ><i class="fa fa-close removing" onclick="removeFMS(this)" aria-hidden="true"></i><h4  class="titleF2">' + file.name + '</h4>')
                    }
                    if (extention == "xlsx" || extention == "xls") {

                        $("#file_S").after('<img class="HistImg"  data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png"  ><i class="fa fa-close removing" onclick="removeFMS(this)" aria-hidden="true"></i><h4  class="titleF2">' + file.name + '</h4>')
                    }
                    if (extention == "pdf" || extention == "PDF") {

                        $("#file_S").after('<img class="HistImg"  data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png"  ><i class="fa fa-close removing" onclick="removeFMS(this)" aria-hidden="true"></i><h4  class="titleF2">' + file.name + '</h4>')
                    }
                    if (extention == "txt" || extention == "TXT") {

                        $("#file_S").after('<img class="HistImg"  data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png"><i class="fa fa-close removing" onclick="removeFMS(this)" aria-hidden="true"></i><h4  class="titleF2">' + file.name + '</h4>')
                    }


                    //var mch = $('.modal-content2').css('height');
                    //mch = mch.substring(0, mch.indexOf('p'));
                    //mch = parseInt(mch) + 35;
                    //mch = mch + 'px'
                    //$('.modal-content2').css('height', mch)




                },

                error: function (r) {

                    //  //alert("Error");
                    //  //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    $("#loader,.ui-loader-background").hide();
                    var filePath = $('#file_S').val();
                    var index = filePath.lastIndexOf("\\") + 1;
                    var filename = filePath.substr(index);
                    // readURL(input, filename)
                },
                complete: function (r) {
                    //var jsonEroorData = JSON.parse(r);

                    //if (r.readyState == 4 && r.status == 200) { //do something }; 
                    //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
                    //    $("#loader").hide();
                    //}
                },
                failure: function (r) {
                    alert("FAIL");
                }
            });


        }


    }
}
function SaveMetterMass(obj, mtrs, elekts, lg) {
    var obj = { "obj": obj, "mtrs": mtrs, "elekts": elekts, "lg": lg }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/SaveMeterMass",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //  async:false,
        success: function (data) {
            ////console.log(data)
            var log = sessionStorage.getItem("Log")
            $('#mtrs').empty()
            $('#cancelLast').click();
            // getMeter(log)
            getMeterbyObject(lg, $('#objsM').val()
            )
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
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
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

function UPLCounter(e) {
    $("#loader,.ui-loader-background").show();
    var filePath = $(e).val();
    $('#ErrSpan,#Erra').remove()
    var index = filePath.lastIndexOf("\\") + 1;
    var filename = filePath.substr(index);
    var ext = e.value.split('.').pop();/*(extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT")*/
    // //console.log(ext);
    $('#flS').remove();
    if (ext == "xls" || ext == "xlsx") {

        readURL_UPLC(e, filename);
        // $("#flS").hide();
    }
    else {
        $(e).after('<label id="flS" style="color:red"> Неверный  формат файла</label>');
        $("#loader,.ui-loader-background").hide();
    }
}
function readURL_UPLC(input, imgName) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {


            $('.foto-disp').attr('src', e.target.result);

            //var nameImg = imgName
            //var arrayBuffer = reader.result
            //var bytes = new Uint8Array(arrayBuffer);
            //var obj = { baseString: bytes, imgName: nameImg };
            var formData = new FormData();
            var file = document.getElementById("filesUPLC").files[0];

            formData.append('file', file, encodeURI(file.name));
            formData.append('object_id', '1');
            ////console.log(formData);



            $.ajax({
                error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",//window.location.protocol + '//' + window.location.host + "
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                timeout: 3600000,
                crossDomain: true,
                //async: false,
                success: function (result) {
                    //  $("#loader").hide();
                    //$("#file_P").hide();
                    var F_ile = result.URL
                    F_ile = F_ile.substring(F_ile.lastIndexOf('/') + 1, F_ile.lenght)
                    ShowInTable($('#objsM').val(), F_ile)
                },

                error: function (r) {

                    //  //alert("Error");
                    //  //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    $("#loader").hide();
                    var filePath = $('#filesUPLC').val();
                    var index = filePath.lastIndexOf("\\") + 1;
                    var filename = filePath.substr(index);
                    // readURL(input, filename)
                },
                complete: function (r) {
                    //var jsonEroorData = JSON.parse(r);

                    //if (r.readyState == 4 && r.status == 200) { //do something }; 
                    //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
                    //    $("#loader").hide();
                    //}
                },
                failure: function (r) {
                    alert("FAIL");
                }
            });


        }


    }
}
function ShowInTable(obj, url) {
    //$('.ui-loader-background').hide();
    //$('#loader').hide();
    var obj = { "obj": obj, "file": url }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/UplCOunters",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //$("#loader,.ui-loader-background").show();
            $('#ErrSpan,#Erra').remove()
            ////console.log(data);
            $('#filesUPLC').val('');

            var jsondata = JSON.parse(data.d)



            ////console.log(jsondata);
            if (jsondata.result == "Ok") {//$('#flS,ErrSpan,Erra').remove();
                if (jsondata.mtrsFalse_count != 0) {
                    $('#filesUPLC').after('<span id="ErrSpan" style="color:red">Обнаружены ошибочные данные (' + jsondata.mtrsFalse_count + ').</span><a id="Erra" href="../Files/Error_Excel/' + jsondata.mtrsFalse + '" style="color: red;" download> Скачать файл с ошибками</a>')
                }
                $('#cntrs').empty();
                if (jsondata.mtrsTrue.length != 0) {
                    ////console.log(jsondata.mtrsTrue);
                    $('#tblCntrs').dataTable({
                        "destroy": true,
                        data: jsondata.mtrsTrue,
                        columns: [
                            {
                                'data': 'SCORE_ID',
                                //render: function (data)
                                //{
                                //    if (data.indexOf('!') == -1) {

                                //    }
                                //}
                                createdCell: function (td, cellData, rowData, row, col) {
                                    if (cellData.indexOf('(') != -1) {
                                        $(td).css('color', 'red')

                                    }
                                },


                            },
                            {
                                'data': 'METERS_NUMBER',
                                createdCell: function (td, cellData, rowData, row, col) {
                                    if (cellData.indexOf('(') != -1) {
                                        $(td).css('color', 'red')
                                    }
                                }
                            },
                            {
                                'data': 'TYPE',

                            },
                            {
                                'data': 'PREVIOUS_DATE',

                            },
                            {
                                'data': 'NEXT_DATE',

                            },
                            {
                                'data': 'AMUNT_TARIF',

                            },
                            {
                                'data': 'TYPE_ID',

                            },

                            {
                                'data': 'OBJECT_ID',

                            },
                            {
                                'data': 'ROOM_TYPE',

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
                            "aria": {
                                "sortAscending": ": активировать для сортировки столбца по возрастанию",
                                "sortDescending": ": активировать для сортировки столбца по убыванию"
                            }
                        }

                    })
                }




            }
            if (jsondata.result != "Ok") {
                $('#filesUPLC').after('<label id="flS" style="color:red"> ' + jsondata.result + '</label>')
                $("#loader,.ui-loader-background").hide();
            }
            $("#loader,.ui-loader-background").hide();

        }
    })

}
function MakePoverka(mid, last, next, HistImg, ObjId, dRemoval, dInstal, removal) {
    var Obj = { "mid": mid, "last": last, "next": next, "HistImg": HistImg, "ObjId": ObjId, "dRemoval": dRemoval, "dInstal": dInstal, "removal": removal }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "CounterCard.aspx/MakePoverka",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            // window.location.href = "Counters.aspx"
            window.location.reload(true);
        }
    })
}
function PopupPove(Header_, text_, footer_) {
    //$('#CtypeP').append($('#TRoomC > option').clone()).val($('#TRoomC').val()).attr('disabled', 'disabled').css('backgroun-color', 'rgb(235, 235, 228);');
    $('#CtypeP').css('background-color', 'rgb(235, 235, 228);')
    $('#CtypeP').append($('#TMeterC > option').clone()).val($('#TMeterC').val()).attr('disabled', 'disabled');
    $('#CnumP').val($('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length))
    //if (footer_ !='Возобновить работу') {
    // $('#lstP').val($('#lst').val()).attr('value', $('#lst').val()).removeAttr('disabled').removeAttr('style');
    //}
    //else {
    var nxt1 = new Date();
    var nxtday1 = nxt1.getDate()
    var nxtmnt1 = nxt1.getMonth() + 1;
    nxtmnt1 = (nxtmnt1 < 10) ? '0' + nxtmnt1 : nxtmnt1
    var nxtyear1 = nxt1.getFullYear();

    nxtday1 = (nxtday1 < 10) ? '0' + nxtday1 : nxtday1
    var nextdate1 = nxtyear1 + '-' + nxtmnt1 + '-' + nxtday1;
    $('#lstP').val(nextdate1).removeAttr('disabled').removeAttr('style')
    // }

    var nxt = $('#lstP').val().split('-');
    var nxtday = nxt[2];
    var nxtmnt = nxt[1];
    var nxtyear = nxt[0];
    nxtday = parseInt(nxtday) + 1
    nxtday = (nxtday < 10) ? '0' + nxtday : nxtday
    var nextdate = nxtyear + '-' + nxtmnt + '-' + nxtday;
    $('#nxtP').val(nextdate).attr('value', nextdate).removeAttr('disabled').removeAttr('style');


    $("#txt2").empty();
    $("#txt2").append(text_);
    $("#mf2").text(footer_)
    var modal = document.getElementById('myModalPover');
    var span = document.getElementsByClassName("close_P")[0];
    modal.style.display = "block";
    $("#close_P,#cls").click(function () {
        modal.style.display = "none";

    })
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";

        }
    }

}
function MakeArxive(Obj) {
    //var Obj = { "mid": mid }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "CounterCard.aspx/SaveMETERAndArxiv",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            var jsondata = $.parseJSON(data.d);
            //window.location.href = "Counters.aspx";
            sessionStorage.setItem("mid", jsondata.result)
            window.location.href = "CounterCard.aspx"
        },
        error: function (er) { ////console.log(er)
        }
    })
}
function ChangeType(e) {
    if ($(e).val() == 4) {
        if ($('#amTZN').length == 0) {
            $('#nxtControlZ+br').after('<label for="amtZ" id="lblAmTz" class="sameLine">Количество тарифов</label><input onkeyup=ChangeTarif(this) onchange=ChangeTarif(this) type="number"   id="amTZN" class="sameInputLine"  ><br>')
        }
    }
    else {
        //   if ($('#amTZN').length !=0) {
        //$('#nxtControlZ+br').remove();
        //$('#amTZN,#lblAmTz').remove();
        //$('#nxtControlZ+br').remove()

        //      } 
        //   $('label[data-num="1"]').remove()
        //   $('input[data-num="1"]+br').remove()
        //   $('input[data-num="1"]').remove()
        //   //
        //   $('#nacPokZlbl').remove()
        //   $('#nxtControlZ+br').after('<label class="sameLine" id="nacPokZlbl">Начальное показание</label>')
        //   $('#nacPokZlbl').after('<input class="sameInputLine" data-num="1" id="nacPokZ" type="number" style="margin-top: 10px;"><br>')
        $('#lblAmTz,#amTZN').remove();
        $('#nxtControlZ+br').remove();
        $('#nacPoZT1,#nacPoZT2,#nacPoZT3').remove()
        $('label[data-num="1"]+br').remove()
        $('label[data-num="1"]').remove()
        $('#nacPoZT1+br,#nacPoZT2+br,#nacPoZT1+br').remove()
        $('#nxtControlZ+br').after('<label class="sameLine" id="nacPokZlbl">Начальное показание</label>')
        $('#nacPokZlbl').after('<input class="sameInputLine" data-num="1" id="nacPokZ" type="number" style="margin-top: 10px;">')

    }
}
function file_zChange(e) {
    $("#loader").show();
    var filePath = $('#file_Z').val();

    var index = filePath.lastIndexOf("\\") + 1;
    var filename = filePath.substr(index);
    var ext = e.value.split('.').pop();/*(extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT")*/
    // //console.log(ext);
    if (ext == "jpg" || ext == "png" || ext == "docx" || ext == "doc" || ext == "docx" || ext == "xls" || ext == "xlsx" || ext == "pdf" || ext == "PDF" || ext == "txt" || ext == "TXT") {
        readURL(e, filename);
        $("#flS").hide();
    }
    else {
        $("#file_Z").after('<label id="flS" style="color:red"> Неверный  формат файла</label>');
        $("#loader").hide();
    }
}
function removeFMZ(e) {
    $(e).remove();
    $('.HistImg,.titleF2').remove();
    $('.modal-content2').css('height', '90%')
    $('#file_Z').show().val('');
}
function readURL(input, imgName) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {


            $('.foto-disp').attr('src', e.target.result);

            //var nameImg = imgName
            //var arrayBuffer = reader.result
            //var bytes = new Uint8Array(arrayBuffer);
            //var obj = { baseString: bytes, imgName: nameImg };
            var formData = new FormData();
            var file = document.getElementById("file_Z").files[0];

            formData.append('file', file, encodeURI(file.name));
            formData.append('object_id', '1');
            ////console.log(formData);



            $.ajax({
                error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",//window.location.protocol + '//' + window.location.host + "
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                timeout: 3600000,
                crossDomain: true,
                //async: false,
                success: function (result) {
                    $("#loader").hide();
                    $("#file_Z").hide();
                    var F_ile = result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/")
                    var extention = F_ile.substr(F_ile.lastIndexOf(".") + 1)
                    //
                    if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
                        $("#file_Z").after('<img class="HistImg"  data-url="' + F_ile + '" src="' + F_ile + '"  ><i class="fa fa-close removing" onclick="removeFMZ(this)"  aria-hidden="true"></i>')
                    }
                    if (extention == "docx" || extention == "doc") {

                        $("#file_Z").after('<img class="HistImg"  data-url="' + F_ile + '"  src="' + window.location.protocol + '//' + window.location.host + '/img/word.png"  ><i class="fa fa-close removing" onclick="removeFMZ(this)" aria-hidden="true"></i><h4  class="titleF2">' + file.name + '</h4>')
                    }
                    if (extention == "xlsx" || extention == "xls") {

                        $("#file_Z").after('<img class="HistImg"  data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png"  ><i class="fa fa-close removing" onclick="removeFMZ(this)" aria-hidden="true"></i><h4  class="titleF2">' + file.name + '</h4>')
                    }
                    if (extention == "pdf" || extention == "PDF") {

                        $("#file_Z").after('<img class="HistImg"  data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png"  ><i class="fa fa-close removing" onclick="removeFMZ(this)" aria-hidden="true"></i><h4  class="titleF2">' + file.name + '</h4>')
                    }
                    if (extention == "txt" || extention == "TXT") {

                        $("#file_Z").after('<img class="HistImg"  data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png"><i class="fa fa-close removing" onclick="removeFMZ(this)" aria-hidden="true"></i><h4  class="titleF2">' + file.name + '</h4>')
                    }


                    var mch = $('.modal-content2').css('height');
                    mch = mch.substring(0, mch.indexOf('p'));
                    mch = parseInt(mch) + 35;
                    mch = mch + 'px'
                    $('.modal-content2').css('height', mch)




                },

                error: function (r) {

                    //  //alert("Error");
                    //  //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    $("#loader").hide();
                    var filePath = $('#file_Z').val();
                    var index = filePath.lastIndexOf("\\") + 1;
                    var filename = filePath.substr(index);
                    // readURL(input, filename)
                },
                complete: function (r) {
                    //var jsonEroorData = JSON.parse(r);

                    //if (r.readyState == 4 && r.status == 200) { //do something }; 
                    //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
                    //    $("#loader").hide();
                    //}
                },
                failure: function (r) {
                    alert("FAIL");
                }
            });


        }


    }
}
function file_pChange(e) {
    $("#loader").show();
    var filePath = $('#file_P').val();

    var index = filePath.lastIndexOf("\\") + 1;
    var filename = filePath.substr(index);
    var ext = e.value.split('.').pop();/*(extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT")*/
    // //console.log(ext);
    if (ext == "jpg" || ext == "png" || ext == "docx" || ext == "doc" || ext == "docx" || ext == "xls" || ext == "xlsx" || ext == "pdf" || ext == "PDF" || ext == "txt" || ext == "TXT") {
        readURL_P(e, filename);
        $("#flS").hide();
    }
    else {
        $("#file_P").after('<label id="flS" style="color:red"> Неверный  формат файла</label>');
        $("#loader").hide();
    }
}
function removeFMP(e) {
    $(e).remove();
    $('.HistImg,.titleF2').remove();
    $('.modal-content2').css('height', '90%')
    $('#file_P').show().val('');
}
function readURL_P(input, imgName) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {


            $('.foto-disp').attr('src', e.target.result);

            //var nameImg = imgName
            //var arrayBuffer = reader.result
            //var bytes = new Uint8Array(arrayBuffer);
            //var obj = { baseString: bytes, imgName: nameImg };
            var formData = new FormData();
            var file = document.getElementById("file_P").files[0];

            formData.append('file', file, encodeURI(file.name));
            formData.append('object_id', '1');
            ////console.log(formData);



            $.ajax({
                error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",//window.location.protocol + '//' + window.location.host + "
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                timeout: 3600000,
                crossDomain: true,
                //async: false,
                success: function (result) {
                    $("#loader").hide();
                    $("#file_P").hide();
                    var F_ile = result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/")
                    var extention = F_ile.substr(F_ile.lastIndexOf(".") + 1)
                    //
                    if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
                        $("#file_P").after('<img class="HistImg"  data-url="' + F_ile + '" src="' + F_ile + '"  ><i class="fa fa-close removing" onclick="removeFMP(this)"  aria-hidden="true"></i>')
                    }
                    if (extention == "docx" || extention == "doc") {

                        $("#file_P").after('<img class="HistImg"  data-url="' + F_ile + '"  src="' + window.location.protocol + '//' + window.location.host + '/img/word.png"  ><i class="fa fa-close removing" onclick="removeFMP(this)" aria-hidden="true"></i><h4  class="titleF2">' + file.name + '</h4>')
                    }
                    if (extention == "xlsx" || extention == "xls") {

                        $("#file_P").after('<img class="HistImg"  data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png"  ><i class="fa fa-close removing" onclick="removeFMP(this)" aria-hidden="true"></i><h4  class="titleF2">' + file.name + '</h4>')
                    }
                    if (extention == "pdf" || extention == "PDF") {

                        $("#file_P").after('<img class="HistImg"  data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png"  ><i class="fa fa-close removing" onclick="removeFMP(this)" aria-hidden="true"></i><h4  class="titleF2">' + file.name + '</h4>')
                    }
                    if (extention == "txt" || extention == "TXT") {

                        $("#file_P").after('<img class="HistImg"  data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png"><i class="fa fa-close removing" onclick="removeFMP(this)" aria-hidden="true"></i><h4  class="titleF2">' + file.name + '</h4>')
                    }


                    //var mch = $('.modal-content2').css('height');
                    //mch = mch.substring(0, mch.indexOf('p'));
                    //mch = parseInt(mch) + 35;
                    //mch = mch + 'px'
                    //$('.modal-content2').css('height', mch)




                },

                error: function (r) {

                    //  //alert("Error");
                    //  //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    $("#loader").hide();
                    var filePath = $('#file_P').val();
                    var index = filePath.lastIndexOf("\\") + 1;
                    var filename = filePath.substr(index);
                    // readURL(input, filename)
                },
                complete: function (r) {
                    //var jsonEroorData = JSON.parse(r);

                    //if (r.readyState == 4 && r.status == 200) { //do something }; 
                    //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
                    //    $("#loader").hide();
                    //}
                },
                failure: function (r) {
                    alert("FAIL");
                }
            });


        }


    }
}
function getHistoryMeter(mid) {
    var Obj = { "mid": mid }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "CounterCard.aspx/GetMeterHist",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            var j = JSON.parse(data.d);
            /*  m.PREVIOUS_DATE = item["DATETIME"].ToString();
                m.SCORE_ID = item["EVENT"].ToString();
                m.ROOM_NUMBER = item["AUTHOR"].ToString();
                m.TYPE = item["FILE_"].ToString();
                ms.Add(m);*/
            for (var i = 0; i < j.length; i++) {
                if (j[i].TYPE == "") {
                    j[i].TYPE = '<a href="#"  title="Скачать"> </a>'
                }
                else {
                    j[i].TYPE = ' <a href="' + j[i].TYPE + '" download title="Скачать">Паспорт счетчика </a>'
                }
                /*<td>' + j[i].TYPE + '</td>*/
                $('#hist').append('<tr><td>' + j[i].PREVIOUS_DATE.substr(0, j[i].PREVIOUS_DATE.indexOf(' ')) + '</td><td>' + j[i].SCORE_ID + '</td><td>' + j[i].TYPE + '</td><td>' + j[i].ROOM_NUMBER + '</td></tr>')
            }
        }
    })
}
function checkPokaz(e, cType) {
    $('#ChangeC').removeAttr('disabled')
    if (cType != 4) {
        var PreviousCountPokaz = parseFloat($(e).val());
        var ExistCountPokaz = parseFloat($('#tab1 .row:eq(1) .table tbody tr:eq(0) td:eq(1)').text())
        if (PreviousCountPokaz < ExistCountPokaz) {
            $('#errPokaz').remove();
            $(e).after('<label id="errPokaz" style="color:red">Показания прежнего счетчика не может быть меньше предыдущих показаний</label>')
            setTimeout(function () { $('#errPokaz').remove() }, 3000)
            $('#ChangeC').attr('disabled', 'disabled');
        }
        else {
            $('#ChangeC').removeAttr('disabled')
        }
        if ($(e).val().length == 0) {
            $('#ChangeC').attr('disabled', 'disabled');
        }
    }
    else {
        var successZamen_ = true;
        if ($('#Elekt_T1').length != 0) {
            var PreviousCountPokaz = parseFloat($('#NacPokZT1').val());
            var ExistCountPokaz = parseFloat($('#tab1 .row:eq(1) .table tbody tr:eq(0) td:eq(1)').text())
            if (PreviousCountPokaz < ExistCountPokaz) {
                $('#errPokaz').remove();
                $(e).after('<label id="errPokaz" style="color:red">Показания прежнего счетчика не может быть меньше предыдущих показаний</label>')
                setTimeout(function () { $('#errPokaz').remove() }, 3000)
                $('#ChangeC').attr('disabled', 'disabled');
            }
            else {
                $('#ChangeC').removeAttr('disabled')
            }
            if ($('#NacPokZT1').val().length == 0) {
                $('#ChangeC').attr('disabled', 'disabled');
            }
        }
        if ($('#Elekt_T2').length != 0) {
            var PreviousCountPokaz = parseFloat($('#NacPokZT1').val());
            var ExistCountPokaz1 = parseFloat($('#tab1 .row:eq(1) .table tbody tr:eq(0) td:eq(1)').text())
            if (PreviousCountPokaz < ExistCountPokaz1) {
                $('#errPokaz1').remove();
                $('#NacPokZT1').after('<label id="errPokaz1" style="color:red">Показания прежнего счетчика не может быть меньше предыдущих показаний</label>')
                setTimeout(function () { $('#errPokaz1').remove() }, 3000)
                //  $('#ChangeC').attr('disabled', 'disabled');
                successZamen_ = false
            }
            if ($('#NacPokZT1').val().length == 0) {
                $('#ChangeC').attr('disabled', 'disabled');
            }
            var PreviousCountPokaz2 = $('#NacPokZT2').val();
            var ExistCountPokaz2 = parseFloat($('#tab1 .row:eq(1) .table tbody tr:eq(0) td:eq(2)').text())
            if (PreviousCountPokaz2 < ExistCountPokaz2) {
                $('#errPokaz2').remove();
                $('#NacPokZT2').after('<label id="errPokaz2" style="color:red">Показания прежнего счетчика не может быть меньше предыдущих показаний</label>')
                setTimeout(function () { $('#errPokaz2').remove() }, 3000)
                // $('#ChangeC').attr('disabled', 'disabled');
                successZamen_ = false
            }
            if ($('#NacPokZT2').val().length == 0) {
                $('#ChangeC').attr('disabled', 'disabled');
            }
            if (successZamen_ == false) {
                $('#ChangeC').attr('disabled', 'disabled');
            }
        }
        if ($('#Elekt_T3').length != 0) {
            if ($('#NacPokZT1').val().length == 0) {
                $('#ChangeC').attr('disabled', 'disabled');
            }
            var PreviousCountPokaz = parseFloat($('#NacPokZT1').val());
            var ExistCountPokaz1 = parseFloat($('#tab1 .row:eq(1) .table tbody tr:eq(0) td:eq(1)').text())
            if (PreviousCountPokaz < ExistCountPokaz1) {
                $('#errPokaz1').remove();
                $('#NacPokZT1').after('<label id="errPokaz1" style="color:red">Показания прежнего счетчика не может быть меньше предыдущих показаний</label>')
                setTimeout(function () { $('#errPokaz1').remove() }, 3000)
                $('#ChangeC').attr('disabled', 'disabled');
                successZamen_ = false
            }

            var PreviousCountPokaz2 = $('#NacPokZT2').val()
            var ExistCountPokaz2 = parseFloat($('#tab1 .row:eq(1) .table tbody tr:eq(0) td:eq(2)').text())
            if (PreviousCountPokaz2 < ExistCountPokaz2) {
                $('#errPokaz2').remove();
                $('#NacPokZT2').after('<label id="errPokaz2" style="color:red">Показания прежнего счетчика не может быть меньше предыдущих показаний</label>')
                setTimeout(function () { $('#errPokaz2').remove() }, 3000)
                $('#ChangeC').attr('disabled', 'disabled');
                successZamen_ = false
            }
            if ($('#NacPokZT2').val().length == 0) {
                $('#ChangeC').attr('disabled', 'disabled');
            }
            var PreviousCountPokaz3 = $('#NacPokZT3').val()
            var ExistCountPokaz3 = parseFloat($('#tab1 .row:eq(1) .table tbody tr:eq(0) td:eq(3)').text())
            if (PreviousCountPokaz3 < ExistCountPokaz3) {
                $('#errPokaz3').remove();
                $('#NacPokZT3').after('<label id="errPokaz3" style="color:red">Показания прежнего счетчика не может быть меньше предыдущих показаний</label>')
                setTimeout(function () { $('#errPokaz3').remove() }, 3000)
                $('#ChangeC').attr('disabled', 'disabled');
                successZamen_ = false
            }
            if ($('#NacPokZT3').val().length == 0) {
                $('#ChangeC').attr('disabled', 'disabled');
            }
            if (successZamen_ == false) {
                $('#ChangeC').attr('disabled', 'disabled');
            }

        }
    }

}
function chekPrevData(e) {
    var prvDate = $(e).val();
    var now = new Date();
    var month = (now.getMonth() + 1);
    var day = now.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;
    if (prvDate.length == 0) {

        $(e).val(today);
    }
    else {
        if (prvDate > today) {
            $(e).val(today);
        }
    }
}
function PopupZamen(Header_, text_, footer_) {
    $('#lstControlZ,#dataPokz').val(getDateM).attr("value", getDateM)
    $('#myModal2 .modal-content2 .modal-body2').css('width', '65%')
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    var dayNe = parseInt(day) + 1
    dayNe = (dayNe < 10) ? '0' + dayNe : dayNe
    var dateOfNextControl = year + '-' + month + '-' + dayNe;
    $('#nxtControlZ').val(dateOfNextControl).attr("value", dateOfNextControl);
    $('#nxtControlZ,#lstControlZ,#dataPokz,#nacPokZ').removeAttr('disabled').css("background-color", "");
    var optionsRoomNum = $("#roomNum > option").clone();
    $('#rmNumZ,label[for="selNA"],label[for="selLC"],#PsZ').hide();
    $('#rmNumZ').append(optionsRoomNum);
    $('#rmNumZ').val($("#roomNum").val())
    var OptionsPs = $('#Ps > option').clone();
    $('#PsZ').empty();
    $('#PsZ').append(OptionsPs);
    $('#PsZ').val($('#Ps').val())
    $('#typeCountZ').empty();
    $('#oldCNum').val("");
    $('#oldCNum').val($('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length))
    var OptionsTYpeCounter = $('#TMeterC > option').clone()
    $('#typeCountZ').append(OptionsTYpeCounter);
    $('#typeCountZ').val($('#TMeterC').val())
    $('#typeCountZ,#PsZ,#rmNumZ').attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)')
    $('#PrevnxtZ').val($('#lst').val())
    if ($('#istPok').attr('data-active') != '1') {
        //.removeAttr('disabled')
        $('#PrevnxtZ').removeAttr('style').attr('onchange', 'chekPrevData(this)')
    }
    if ($('#typeCountZ').val() != 4) {
        var LastDataC = $('#tab1 .row:eq(1) .table tbody tr:eq(0) td:eq(1)').text();
        if ($('#istPok').attr('data-active') != '1') {
            //.removeAttr('disabled')
            $('#PrevClstData').val("").val(LastDataC).removeAttr('style').attr('onkeyup', 'checkPokaz(this,' + $('#typeCountZ').val() + ')');
        }

    }
    else {
        var disable = 'disabled="disabled"';
        //($('#istPok').attr('data-active') == '1') ? 'disabled="disabled"' : ''
        if ($('#amTZN').length == 0) {
            $('#nxtControlZ+br').after('<label for="amtZ" class="sameLine">Количество тарифов</label><input onkeyup=ChangeTarif(this) onchange=ChangeTarif(this) type="number"   id="amTZN" class="sameInputLine"  ><br>')
        }
        $('#PrevClstData+br,#PrevClstData,#PrevClstDatalbl').remove();
        if ($('#amTZ').length == 0) {

            $('#oldCNum+br').after('<label for="amtZ" class="sameLine">Количество тарифов</label><input  id="amTZ" disabled="disabled" class="sameInputLine" value=' + $('#amT').val() + '><br>')

        } if ($('#amT').val() == 1) {
            if ($('#NacPokZT1').length == 0) {

                var tableT1 = $('#tab1 .row:eq(1) .table tbody tr:eq(0) td:eq(1)').text();
                $('#amTZ+br').after('<label for="amtZ" class="sameLine">Прежнего счетчика  показание T1</label><input id="NacPokZT1" ' + disable + ' onkeyup="checkPokaz(this,' + $('#typeCountZ').val() + ')"  class="sameInputLine" value=' + tableT1 + '><br>')
            }

        }
        if ($('#amT').val() == 2) {
            if ($('#NacPokZT1').length == 0 && $('#NacPokZT2').length == 0) {
                var tableT1 = $('#tab1 .row:eq(1) .table tbody tr:eq(0) td:eq(1)').text();
                $('#amTZ+br').after('<label for="amtZ" class="sameLine">Прежнего счетчика  показание T1</label><input id="NacPokZT1" ' + disable + ' onkeyup="checkPokaz(this,' + $('#typeCountZ').val() + ')"  class="sameInputLine" value=' + tableT1 + '><br>')
                var tableT2 = $('#tab1 .row:eq(1) .table tbody tr:eq(0) td:eq(2)').text();
                $('#NacPokZT1+br').after('<label for="amtZ" class="sameLine">Прежнего счетчика  показание T2</label><input id="NacPokZT2" ' + disable + ' onkeyup="checkPokaz(this,' + $('#typeCountZ').val() + ')" class="sameInputLine" value=' + tableT2 + '><br>')
            }
        }
        if ($('#amT').val() == 3) {
            if ($('#NacPokZT1').length == 0 && $('#NacPokZT2').length == 0 && $('#NacPokZT2').length == 0) {
                var tableT1 = $('#tab1 .row:eq(1) .table tbody tr:eq(0) td:eq(1)').text();
                $('#amTZ+br').after('<label for="amtZ" class="sameLine">Прежнего счетчика  показание T1</label><input id="NacPokZT1" ' + disable + ' onkeyup="checkPokaz(this,' + $('#typeCountZ').val() + ')"  class="sameInputLine" value=' + tableT1 + '><br>')

                var tableT2 = $('#tab1 .row:eq(1) .table tbody tr:eq(0) td:eq(2)').text();
                $('#NacPokZT1+br').after('<label for="amtZ" class="sameLine">Прежнего счетчика  показание T2</label><input id="NacPokZT2" ' + disable + ' onkeyup="checkPokaz(this,' + $('#typeCountZ').val() + ')"  class="sameInputLine" value=' + tableT2 + '><br>')

                var tableT3 = $('#tab1 .row:eq(1) .table tbody tr:eq(0) td:eq(3)').text();
                $('#NacPokZT2+br').after('<label for="amtZ" class="sameLine">Прежнего счетчика  показание T3</label><input id="NacPokZT3" ' + disable + ' onkeyup="checkPokaz(this,' + $('#typeCountZ').val() + ')"  class="sameInputLine" value=' + tableT3 + '><br>')
            }
        }
        //   $('#PrevnxtZ,#NacPokZT1').removeAttr('disabled').removeAttr('style')
    }
    $("#mh2").empty();
    $("#mh2").append(Header_);
    if (text_.length >= 10000) {
        $("#txt2").attr("style", "font-size: 23px;width:50%;word-wrap:break-word;")
    }
    else {
        $("#txt2").attr("style", "font-size: 23px")
    }
    $("#txt2").empty();
    $("#txt2").append(text_);
    $("#mf2").text(footer_)
    var modal = document.getElementById('myModal2');
    var span = document.getElementsByClassName("close_")[0];
    modal.style.display = "block";
    $("#close_Z").click(function () {
        modal.style.display = "none";

        $('#changeCounter').empty();
        $('#changeCounter').append(sessionStorage.getItem('changeCounter'))
        // $("#newCounterNum").val("");
        // $('#lstControlZ').val($('#lstControlZ').attr('value'))
        // $('#nxtControlZ').val($('#nxtControlZ').attr('value'))
        // $('#dataPokz').val($('#dataPokz').attr('value'))
        // if ($('#typeCountZ').val() == 4) {
        //     $('#lblAmTz,#amTZN').remove();
        //     $('#nxtControlZ+br').remove();



        //    
        //    
        //     
        //     //$('#nxtControlZ+br').after('<label class="sameLine" id="nacPokZlbl">Начальное показание</label>')
        //
        // }
        //// $('label[data-num="1"]+br,label[data-num="1"]').remove();

        //// $('input[data-num="1"]+br,input[data-num="1"]').remove();
        //// $('#amTZN').val("");
        // // $('#nextControl').after('<label data-num="1"   id="readingH1">Начальное показание</label><input  type="number" data-num="1" id="reading1" style="width: 50%;">')
        // //$('#amTZN+br').after('<label for="amtZ" data-num="1" class="sameLine">Начальное показание </label><input   id="nacPoZT" data-num="1" class="sameInputLine">')
        // //if ($('#amTZN').length != 0) {
        // //    $('#amTZN,#lblAmTz,#nacPokZlbl').remove();
        // //    $('#nxtControlZ+br').remove();
        // //    $('#nacPoZT').after('<br>')


        // //}
        // if (true) {

        // }
    })
    window.onclick = function (event) {
        if (event.target == modal) {
            $('#OtmenZ').click();
            //modal.style.display = "none";
            //$("#newCounterNum").val("");
            //$('#lstControlZ').val($('#lstControlZ').attr('value'))
            //$('#nxtControlZ').val($('#nxtControlZ').attr('value'))
            //$('#dataPokz').val($('#dataPokz').attr('value'))
            //$('label[data-num="1"]+br,label[data-num="1"]').remove();
            //$('input[data-num="1"]+br,input[data-num="1"]').remove();
            //$('#amTZN').val("");
            //// $('#nextControl').after('<label data-num="1"   id="readingH1">Начальное показание</label><input  type="number" data-num="1" id="reading1" style="width: 50%;">')
            //$('#amTZN+br').after('<label for="amtZ" data-num="1" class="sameLine">Начальное показание </label><input   id="nacPoZT" data-num="1" class="sameInputLine">')
        }
    }
    $("#myModal2 #deleteO").click(function () {


    })
    sessionStorage.setItem('changeCounter', $('#changeCounter').html());
    ////console.log();
}
function ChangeTarif(e) {
    var typCOunter = $('#typeCountZ').val()
    var mntval = $(e).val()
    //mntval =  ? 1 : $(e).val()
    //$(e).val(mntval)
    if ($(e).val().length != 0) {
        if ($(e).val() <= 0) {
            mntval = 1
            $(e).val(1)
        }
    }
    if (mntval > 3) {
        $(e).val(3)
    }
    else {

        //for (var i = 1; i <= Eval; i++) {
        //    $('#amTZN+br').after('<label for="amtZ" class="sameLine">Начальное показание T' + i + '</label><input   id="nacPoZT'+i+'" class="sameInputLine"  ><br>')
        //}
        if (mntval > 1) {
            $('#nacPokZlbl,#nacPokZ').remove();
            $('#nacPokZlbl').remove();
            $('label[data-num="1"]+br,label[data-num="1"]').remove();
            $('input[data-num="1"]+br,input[data-num="1"]').remove();
            $('#nacPokZlbl').remove();
            for (var i = mntval; i >= 1; i--) {
                //$('label[data-num="1"]').remove();
                //$('input[data-num="1"]').remove();

                //$('#nextControl').after('<label data-num="1" id="readingH' + i + '">Начальное показание T ' + i + '</label><input type="number" data-num="1" id="reading' + i + '" style="width: 50%;">')
                $('#amTZN+br').after('<label data-num="1" for="amtZ" class="sameLine">Начальное показание T' + i + '</label><input data-num="1"  id="nacPoZT' + i + '" class="sameInputLine"  ><br>')
                //var mch = $('.modal-content2').css('height');
                //mch = mch.substring(0, mch.indexOf('p'));
                //mch = parseInt(mch) + 25;
                //mch = mch + 'px'
                //$('.modal-content2').css('height', mch)

            }
        }
        if (mntval == "" || mntval == 0 || mntval == 1) {
            $('label[data-num="1"]+br,label[data-num="1"]').remove();
            $('input[data-num="1"]+br,input[data-num="1"]').remove();
            // $('#nextControl').after('<label data-num="1"   id="readingH1">Начальное показание</label><input  type="number" data-num="1" id="reading1" style="width: 50%;">')
            $('#amTZN+br').after('<label for="amtZ" data-num="1" class="sameLine">Начальное показание </label><input   id="nacPoZT" data-num="1" class="sameInputLine"><br>')
            $('#nacPokZlbl').remove();
            //  $('.modal-content2').css('height', '90%')
        }
    }
}
function getMeterCard(mid) {
    var Obj = { "mid": mid }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "CounterCard.aspx/GetMeterDetail",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            var j = JSON.parse(data.d)
            //  //console.log(j)
            var Arxive_Susbend = j[0].LOG_IN_ID
            Arxive_Susbend = Arxive_Susbend.split("|");
            if (Arxive_Susbend[0] == "True") {
                $('#btns').hide();
                $('#lblDFuture').after('<div style="width: 40%;/* height: 53%; */border-style:  ridge;float:  right;font-size:  large;text-align: center;border-color:  red;"><i style="font-size:24px;color: gray;float: left;margin-left: 11px;margin-top:  6px;" class="fa"></i><label style="font-weight:300;">Счетчик в архиве</label></div>')
                $('#meterNum').attr('data-arxiv', 'true')
            }
            if (Arxive_Susbend[1] == "True") {
                $('#SaveUp,#zamen,#Pove,#delC').attr('disabled', 'disabled').css('background', " #999");
                $('#StopC').text('Возобновить работу');
                $('#lblDataPosProver').after('<div style="width: 40%;/* height: 53%; */border-style:  ridge;float:  right;font-size:  large;text-align: center;border-color:  red;"><i style="font-size:24px;color:  red;float: left;margin-left: 11px;margin-top: 3px;" class="fa fa-pause-circle"></i><label style="font-weight: 100;color:red;font-size:14px;">Счетчик приостановлен</label></div>')

            }
            $('#meterNum').text('Счетчик № ' + j[0].METERS_NUMBER + '').attr('data-obj', j[0].OBJECT_ID)
            $('#roomNum').append('<option value="' + j[0].ROOM_NUMBER + '">' + j[0].ROOM_NUMBER + '</option>')
            $('#roomNum').val(j[0].ROOM_NUMBER)
            $('#amT').val(j[0].AMUNT_TARIF)
            var IS_AUTO = (j[0].IS_AUTO == "Y") ? true : false;
            $('#is_auto').prop('checked', IS_AUTO)
            $('#MeterN').val(j[0].METERS_NUMBER)
            getROomTYpeCardC(j[0].ROOM_TYPE_ID);
            GetMeterTypesCard(j[0].TYPE_ID);
            getPerScores(j[0].OBJECT_ID, j[0].ROOM_TYPE_ID, j[0].ROOM_NUMBER, j[0].SCORE_ID);
            MeterHistoryVals(mid, j[0].TYPE, j[0].NEXT_DATE.substring(0, j[0].NEXT_DATE.indexOf(' ')))
            cLastDate = j[0].PREVIOUS_DATE.substring(0, j[0].PREVIOUS_DATE.indexOf(' ')).split('.')
            var year = cLastDate[2];
            var month = cLastDate[1];
            var day = cLastDate[0];
            cLastDate = year + '-' + month + '-' + day

            $('#lst').val(cLastDate).attr('value', cLastDate);

            cNextDate = j[0].NEXT_DATE.substring(0, j[0].NEXT_DATE.indexOf(' ')).split('.');
            year = cNextDate[2];
            month = cNextDate[1];
            day = cNextDate[0];
            cNextDate = year + '-' + month + '-' + day;
            $('#nxt').val(cNextDate).attr('value', cNextDate);
        }
    })
}
function MeterHistoryVals(mid, type_, nxtDate) {
    var ob = { "mid": mid }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/getMetersValuesT",
        data: JSON.stringify(ob),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsond = JSON.parse(data.d)
            var d = new Date();
            var strDate = d.getDate() + "." + d.getMonth() + "." + d.getFullYear();
            if (type_ == 'ГВС') {
                for (var i = 0; i < jsond.length; i++) {
                    if (i == 0) {
                        $('#istPok').after('<div class="row"><div class="col-xs-6"><table class="table" style="margin:0;"><thead><tr><td>Дата подачи</td><td>ГВС</td></tr></thead><tbody id="qvs"></tbody></table></div><div class="col-xs-6" style="padding-left:30px;float: right;"><strong>	ГВС:  </strong><input id="nm_qvs" type="number" onkeyup="validateNegative(this)" min=0 style="width:30%;"><button  onclick=AddValue(this,"qvs") class="btn genBtn" style="margin-left:15px;">Внести показания</button></div></div>')
                    }
                    if (jsond.lenght != 0) {
                        $('#qvs').append('<tr><td>' + jsond[i].NEXT_DATE.substring(0, jsond[i].NEXT_DATE.indexOf(' ')) + '</td><td>' + jsond[i].AMUNT_TARIF + '</td></tr>')

                    }
                }
            }
            if (type_ == 'ХВС') {
                for (var i = 0; i < jsond.length; i++) {
                    if (i == 0) {
                        $('#istPok').after('<div class="row"><div class="col-xs-6"><table class="table" style="margin:0;"><thead><tr><td>Дата подачи</td><td>ХВС</td></tr></thead><tbody id="xvs"></tbody></table></div><div class="col-xs-6" style="padding-left:30px;float: right;"><strong>ХВС:  </strong><input id="nm_xvs" type="number" onkeyup="validateNegative(this)" min=0 style="width:30%;"><button  onclick=AddValue(this,"xvs") class="btn genBtn" style="margin-left:15px;">Внести показания</button></div></div>')
                    }
                    if (jsond.lenght != 0) {
                        $('#xvs').append('<tr><td>' + jsond[i].NEXT_DATE.substring(0, jsond[i].NEXT_DATE.indexOf(' ')) + '</td><td>' + jsond[i].AMUNT_TARIF + '</td></tr>')

                    }
                }
            }
            if (type_ == 'Теплоэнергия') {
                for (var i = 0; i < jsond.length; i++) {
                    if (i == 0) {
                        $('#istPok').after('<div class="row"><div class="col-xs-6"><table class="table" style="margin:0;"><thead><tr><td>Дата подачи</td><td>Теплоэнергия</td></tr></thead><tbody id="teplo"></tbody></table></div><div class="col-xs-6" style="padding-left:30px;float: right;"><strong>Теплоэнергия:  </strong><input id="nm_teplo" type="number" onkeyup="validateNegative(this)" min=0 style="width:30%;"><button onclick=AddValue(this,"teplo") class="btn genBtn" style="margin-left:15px;">Внести показания</button></div></div>')
                    }
                    if (jsond.lenght != 0) {
                        $('#teplo').append('<tr><td>' + jsond[i].NEXT_DATE.substring(0, jsond[i].NEXT_DATE.indexOf(' ')) + '</td><td>' + jsond[i].AMUNT_TARIF + '</td></tr>')

                    }
                }
            }
            if (type_ == 'Электроэнергия') {
                // //console.log(type_)
                for (var i = 0; i < jsond.length; i++) {
                    if (i == 0) {

                        var value1 = jsond[i].AMUNT_TARIF;
                        var value2 = jsond[i].LOG_IN_ID;
                        var value3 = jsond[i].METERS_ID;
                        if (value1 != "" && value2 != "" && value3 != "") {
                            //$('#istPok').after('<div class="row"><div class="col-xs-6"><table class="table" style="margin:0;"><thead><tr><td>Дата подачи</td><td>Т1</td><td>Т2</td><td>Т3</td></tr></thead><tbody id="Elekt_T3"></tbody></table></div><div class="col-xs-6" style="padding-left:30px;float: right;"><strong>Электроэнергия T1:</strong><input  type="number" id="nm_T1" style="width:30%;"><button onclick=AddValue(this,"T1") class="btn genBtn" style="margin-left:15px;">Внести показания</button></div><div class="col-xs-6" style="padding-left:30px;"><strong>Электроэнергия T2:</strong><input id="nm_T2" type="number" style="width:30%;"><button onclick=AddValue(this,"T2") class="btn genBtn" style="margin-left:15px;">Внести показания</button></div><div class="col-xs-6" style="padding-left:30px;float: right;"><strong>Электроэнергия T3:</strong><input type="number" id="nm_T3" style="width:30%;"><button onclick=AddValue(this,"T3") class="btn genBtn" style="margin-left:15px;">Внести показания</button></div></div>')

                            //$('#istPok').after('<div class="row"><div class="col-xs-6"><table class="table" style="margin:0;"><thead><tr><td>Дата подачи</td><td>Т1</td><td>Т2</td><td>Т3</td></tr></thead><tbody id="Elekt_T3"></tbody></table></div><div class="col-xs-6 col-xs-12" style="padding-left:30px;float: right;"><div><strong>Электроэнергия T1:</strong><input type="number" id="nm_T1" style="width:30%;"><button onclick=AddValue(this,"T1") class="btn genBtn" style="margin-left:15px;">Внести показания</button></div><div><strong>Электроэнергия T2:</strong><input id="nm_T2" type="number" style="width:30%;"><button onclick=AddValue(this,"T2") class="btn genBtn" style="margin-left:15px;">Внести показания</button></div><div><strong>Электроэнергия T3:</strong><input type="number" id="nm_T3" style="width:30%;"><button onclick=AddValue(this,"T3") class="btn genBtn" style="margin-left:15px;">Внести показания</button></div></div></div>')
                            $('#istPok').parent().children('.row:eq(1)').remove();
                            $('#istPok').after('<div class="row"><div class="col-xs-6"><table class="table" style="margin:0;"><thead><tr><td>Дата подачи</td><td>Т1</td><td>Т2</td><td>Т3</td></tr></thead><tbody id="Elekt_T3"></tbody></table></div><div class="col-xs-6 col-xs-12" style="padding-left:30px;float: right;"><div><strong>Электроэнергия T1:</strong><input type="number" onkeyup="validateNegative(this)" min=0 id="nm_T1" style="width:30%;"> </div><br/><div><strong>Электроэнергия T2:</strong><input id="nm_T2" type="number" onkeyup="validateNegative(this)" min=0 style="width:30%;"></div><br/><div><strong>Электроэнергия T3:</strong><input type="number" onkeyup="validateNegative(this)" min=0 id="nm_T3" style="width:30%;"></div><br/><button onclick=AddValue(this,"") class="btn genBtn" style="margin-left:124px;">Внести показания</button></div></div>')
                        }
                        if (value1 != "" && value2 != "" && value3 == "") {
                            //$('#istPok').after('<div class="row"><div class="col-xs-6"><table class="table" style="margin:0;"><thead><tr><td>Дата подачи</td><td>Т1</td><td>Т2</td></tr></thead><tbody id="Elekt_T2" ></tbody></table></div><div class="col-xs-6" style="padding-left:30px;float: right;"><strong>Электроэнергия T1:</strong><input id="nm_T1" type="number" style="width:30%;"><button  onclick=AddValue(this,"T1") class="btn genBtn" style="margin-left:15px;">Внести показания</button></div><div class="col-xs-6" style="padding-left:30px;"><strong>Электроэнергия T2:</strong><input id="nm_T2" type="number" style="width:30%;"><button onclick=AddValue(this,"T2") class="btn genBtn" style="margin-left:15px;">Внести показания</button></div></div>')

                            //$('#istPok').after('<div class="row"><div class="col-xs-6"><table class="table" style="margin:0;"><thead><tr><td>Дата подачи</td><td>Т1</td><td>Т2</td></tr></thead><tbody id="Elekt_T2" ></tbody></table></div><div class= "col-xs-6" style = "padding-left:30px;float: right;"><div><strong>Электроэнергия T1:</strong><input id="nm_T1" type="number" style="width:30%;"><button onclick=AddValue(this,"T1") class="btn genBtn" style="margin-left:15px;">Внести показания</button></div><div><strong>Электроэнергия T2:</strong><input id="nm_T2" type="number" style="width:30%;"><button onclick=AddValue(this,"T2") class="btn genBtn" style="margin-left:15px;">Внести показания</button></div></div></div> ')

                            $('#istPok').parent().children('.row:eq(1)').remove();
                            $('#istPok').after('<div class="row"><div class="col-xs-6"><table class="table" style="margin:0;"><thead><tr><td>Дата подачи</td><td>Т1</td><td>Т2</td></tr></thead><tbody id="Elekt_T2"></tbody></table></div><div class="col-xs-6 col-xs-12" style="padding-left:30px;float: right;"><div><strong>Электроэнергия T1:</strong><input type="number" onkeyup="validateNegative(this)" min=0 id="nm_T1" style="width:30%;"> </div><br/><div><strong>Электроэнергия T2:</strong><input id="nm_T2" type="number"  onkeyup="validateNegative(this)" min=0 style="width:30%;"></div><br/><br/><button onclick=AddValue(this,"") class="btn genBtn" style="margin-left:124px;">Внести показания</button></div></div>')
                        }

                        if (value1 != "" && value2 == "" && value3 == "") {
                            //$('#istPok').after('<div class="row"><div class="col-xs-6"><table class="table" style="margin:0;"><thead><tr><td>Дата подачи</td><td>Т1</td></tr></thead><tbody id="Elekt_T1"></tbody></table></div><div class="col-xs-6" style="padding-left:30px;float: right;"><strong>Электроэнергия T1:</strong><input id="nm_T1" type="number" style="width:30%;"><button onclick=AddValue(this,"T1") class="btn genBtn" style="margin-left:15px;">Внести показания</button></div></div>')

                            $('#istPok').parent().children('.row:eq(1)').remove();
                            $('#istPok').after('<div class="row"><div class="col-xs-6"><table class="table" style="margin:0;"><thead><tr><td>Дата подачи</td><td>Т1</td></tr></thead><tbody id="Elekt_T1"></tbody></table></div><div class="col-xs-6 col-xs-12" style="padding-left:30px;float: right;"><div><strong>Электроэнергия T1:</strong><input type="number" id="nm_T1" onkeyup="validateNegative(this)" min=0 style="width:30%;"> </div><br/><br/><button onclick=AddValue(this,"") class="btn genBtn" style="margin-left:124px;">Внести показания</button></div></div>')




                        }
                    }
                    if (jsond.lenght != 0) {
                        $('#Elekt_T3').append('<tr><td>' + jsond[i].NEXT_DATE.substring(0, jsond[i].NEXT_DATE.indexOf(' ')) + '</td><td>' + jsond[i].AMUNT_TARIF + '</td><td>' + jsond[i].LOG_IN_ID + '</td><td>' + jsond[i].METERS_ID + '</td></tr>')

                    }
                    if (jsond.lenght != 0) {
                        $('#Elekt_T2').append('<tr><td>' + jsond[i].NEXT_DATE.substring(0, jsond[i].NEXT_DATE.indexOf(' ')) + '</td><td>' + jsond[i].AMUNT_TARIF + '</td><td>' + jsond[i].LOG_IN_ID + '</td>')

                    }
                    if (jsond.lenght != 0) {
                        $('#Elekt_T1').append('<tr><td>' + jsond[i].NEXT_DATE.substring(0, jsond[i].NEXT_DATE.indexOf(' ')) + '</td><td>' + jsond[i].AMUNT_TARIF + '</td>')

                    }
                }


            }
            if (type_ == 'Газ') {
                for (var i = 0; i < jsond.length; i++) {
                    if (i == 0) {
                        $('#istPok').after('<div class="row"><div class="col-xs-6"><table class="table" style="margin:0;"><thead><tr><td>Дата подачи</td><td>Газ</td></tr></thead><tbody id="Gas"></tbody></table></div><div class="col-xs-6" style="padding-left:30px;float: right;"><strong>Газ:  </strong><input id="nm_gas" type="number" onkeyup="validateNegative(this)" min=0 style="width:30%;"><button onclick=AddValue(this,"gas") class="btn genBtn" style="margin-left:15px;">Внести показания</button></div></div>')
                    }
                    if (jsond.lenght != 0) {
                        $('#Gas').append('<tr><td>' + jsond[i].NEXT_DATE.substring(0, jsond[i].NEXT_DATE.indexOf(' ')) + '</td><td>' + jsond[i].AMUNT_TARIF + '</td></tr>')

                    }

                }

            }

            //if ($('#SaveUp').text('Редактировать')) {//nxtDate > strDate
            //    $('#tab1 .row:eq(1) .btn').attr('disabled', 'disabled').css('background-color', 'rgb(149,153,156)')
            //}
            var d = new Date();
            var strDate = new Date(Date.now()).toLocaleString()
            strDate = strDate.slice(0, 10)// d.getDate() + "." + d.getMonth() + "." + d.getFullYear();
            var nxtVal = $('#nxt').val().split('-');
            nxtVal = nxtVal[2] + '.' + nxtVal[1] + '.' + nxtVal[0];
            //
            //Date.parse(nxtVal) < Date.parse(strDate)
            //  //console.log(ComputeBiggerDate(strDate, nxtVal, '.'))


            //if (ComputeBiggerDate(strDate, nxtVal,'.')==1) {
            //    //  //console.log("boyuk")
            //    $('#tab1 .row:eq(1) .btn').attr('disabled', 'disabled').css('background-color', 'rgb(149,153,156)')
            //    $('#istPok').attr('data-active','1')
            //}
            //else {
            //  //  //console.log("kicik")
            //    $('#tab1 .row:eq(1) .btn').removeAttr('disabled').removeAttr('style')
            //    $('#tab1 .row:eq(1) .btn').css('margin-left','15px')

            //}
            //if (nxtVal == strDate) {
            //    $('#tab1 .row:eq(1) .btn').removeAttr('disabled').removeAttr('style')
            //    $('#tab1 .row:eq(1) .btn').css('margin-left', '15px')
            //}
            var arxive = $('#meterNum').attr('data-arxiv');
            if (arxive != undefined) {
                $('.btn').attr('disabled', 'disabled')
            }
            if ($('#StopC').text() == "Возобновить работу") {
                $('#tab1 .row:eq(1) .btn').attr('disabled', 'disabled').css('background-color', 'rgb(149,153,156)')
            }
        }
    })
}
function validateNegative(e) {
    var val = $(e).val()

    val = val.replace('-', '');
    $(e).val(val)

}
function ComputeBiggerDateNotReverse(date1, date2, splitter) {
    var result
    date1 = date1.split(splitter)
    date2 = date2.split(splitter)
    var year1 = parseInt(date1[0])
    var year2 = parseInt(date2[0])

    var month1 = parseInt(date1[1])
    var month2 = parseInt(date2[1])

    var day1 = parseInt(date1[2])
    var day2 = parseInt(date2[2])

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
function AddValue(e, id) {
    //var nxt = $('#nxt').val();
    if (id == "gas") {

        var inpVal = $('#nm_gas').val();

        if (inpVal.length != 0) {
            var lastValTable = $('#Gas tr:eq(0) td:eq(1)').text();
            //if (parseFloat(lastValTable) > parseFloat(inpVal)) {
            //    if ($('#errM').length == 0) {
            //        $(e).after('<label id="errM" style="color:red">Введенные показание меньше предыдущих. Введите корректные данные</label>')
            //        window.setTimeout(function () {
            //            $('#errM').hide(1000);
            //            $('#errM').remove();
            //        }, 3000);
            //    }

            //}
            //else {
            //    var Mid = sessionStorage.getItem("mid");
            //    var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
            //    // //console.log(cnum);
            //    AddMeterVal(e, Mid, 'Газ', cnum, inpVal);
            //}

            var Mid = sessionStorage.getItem("mid");
            var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
            // //console.log(cnum);
            AddMeterVal(e, Mid, 'Газ', cnum, inpVal);
        }
        else {
            if ($('#errM').length == 0) {
                $(e).after('<label id="errM" style="color:red">Необходимо заполнить данное поле</label>')
                window.setTimeout(function () {
                    $('#errM').hide(1000);
                    $('#errM').remove();
                }, 3000);
            }
        }
    }
    if (id == "teplo") {
        var inpVal = $('#nm_teplo').val();
        if (inpVal.length != 0) {
            var lastValTable = $('#teplo tr:eq(0) td:eq(1)').text();
            //if (parseFloat(lastValTable) > parseFloat(inpVal)) {
            //    if ($('#errM').length == 0) {
            //        $(e).after('<label id="errM" style="color:red">Введенные показание меньше предыдущих. Введите корректные данные</label>')
            //        window.setTimeout(function () {
            //            $('#errM').hide(1000);
            //            $('#errM').remove();
            //        }, 3000);
            //    }

            //}
            //else {
            //    var Mid = sessionStorage.getItem("mid");
            //    var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
            //    // //console.log(cnum);
            //    AddMeterVal(e, Mid, 'Теплоэнергия', cnum, inpVal);
            //    $('#nm_teplo').val(0)
            //}
            var Mid = sessionStorage.getItem("mid");
            var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
            // //console.log(cnum);
            AddMeterVal(e, Mid, 'Теплоэнергия', cnum, inpVal);
            $('#nm_teplo').val(0)
        }
        else {
            if ($('#errM').length == 0) {
                $(e).after('<label id="errM" style="color:red">Необходимо заполнить данное поле</label>')
                window.setTimeout(function () {
                    $('#errM').hide(1000);
                    $('#errM').remove();
                }, 3000);
            }
        }
    }
    if (id == "xvs") {
        var inpVal = $('#nm_xvs').val();
        if (inpVal.length != 0) {
            var lastValTable = $('#xvs tr:eq(0) td:eq(1)').text();
            //if (parseFloat(lastValTable) > parseFloat(inpVal)) {
            //    if ($('#errM').length == 0) {
            //        $(e).after('<label id="errM" style="color:red">Введенные показание меньше предыдущих. Введите корректные данные</label>')
            //        window.setTimeout(function () {
            //            $('#errM').hide(1000);
            //            $('#errM').remove();
            //        }, 3000);
            //    }

            //}
            //else {
            //    var Mid = sessionStorage.getItem("mid");
            //    var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
            //    // //console.log(cnum);
            //    AddMeterVal(e, Mid, 'ХВС', cnum, inpVal);
            //    $('#nm_xvs').val(0)
            //}
            var Mid = sessionStorage.getItem("mid");
            var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
            // //console.log(cnum);
            AddMeterVal(e, Mid, 'ХВС', cnum, inpVal);
            $('#nm_xvs').val(0)
        }
        else {
            if ($('#errM').length == 0) {
                $(e).after('<label id="errM" style="color:red">Необходимо заполнить данное поле</label>')
                window.setTimeout(function () {
                    $('#errM').hide(1000);
                    $('#errM').remove();
                }, 3000);
            }
        }
    }
    if (id == "qvs") {
        var inpVal = $('#nm_qvs').val();
        if (inpVal.length != 0) {
            var lastValTable = $('#qvs tr:eq(0) td:eq(1)').text();
            //if (parseFloat(lastValTable) > parseFloat(inpVal)) {
            //    if ($('#errM').length == 0) {
            //        $(e).after('<label id="errM" style="color:red">Введенные показание меньше предыдущих. Введите корректные данные</label>')
            //        window.setTimeout(function () {
            //            $('#errM').hide(1000);
            //            $('#errM').remove();
            //        }, 3000);
            //    }

            //}
            //else {
            //    var Mid = sessionStorage.getItem("mid");
            //    var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
            //    // //console.log(cnum);
            //    AddMeterVal(e, Mid, 'ГВС', cnum, inpVal);
            //    $('#nm_qvs').val(0)
            //}
            var Mid = sessionStorage.getItem("mid");
            var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
            // //console.log(cnum);
            AddMeterVal(e, Mid, 'ГВС', cnum, inpVal);
        }
        else {
            if ($('#errM').length == 0) {
                $(e).after('<label id="errM" style="color:red">Необходимо заполнить данное поле</label>')
                window.setTimeout(function () {
                    $('#errM').hide(1000);
                    $('#errM').remove();
                }, 3000);
            }
        }
    }
    if (id == "") {
        var succElektro = true
        if ($('#Elekt_T3').length != 0) {
            var nm_T1 = $('#nm_T1').val().trim()
            var nm_T2 = $('#nm_T2').val().trim();
            var nm_T3 = $('#nm_T3').val().trim();
            if (nm_T1.length != 0 && nm_T2.length != 0 && nm_T3.length != 0) {
                if (nm_T1.length != 0) {
                    var lastValTable = $('#Elekt_T3 tr:eq(0) td:eq(1)').text();
                    //    if (parseFloat(lastValTable) > parseFloat(nm_T1)) {
                    //        var succElektro = false
                    //        if ($('#errM').length == 0) {


                    //        $('#nm_T1').after('<label id="errM" style="color:red">Введенные показание меньше предыдущих. Введите корректные данные</label>')
                    //        window.setTimeout(function () {$('#errM').remove();}, 3000);
                    //    }

                    //}
                    //    else {
                    //          var Mid = sessionStorage.getItem("mid");
                    //        var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
                    //        var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
                    //  //      AddMeterVal(e, Mid, "T1", cnum, nm_T1, table_id);
                    //     //   alert('ok')
                    //    }
                }
                if (nm_T2.length != 0) {
                    var lastValTable = $('#Elekt_T3 tr:eq(0) td:eq(2)').text();
                    //if (parseFloat(lastValTable) > parseFloat(nm_T2)) {
                    //    var succElektro = false
                    //    if ($('#errM').length == 0) {
                    //        $('#nm_T2').after('<label id="errM" style="color:red">Введенные показание меньше предыдущих. Введите корректные данные</label>')
                    //    window.setTimeout(function () {$('#errM').remove();}, 3000);}
                    //}
                    //else {
                    //    var Mid = sessionStorage.getItem("mid");
                    //    var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
                    //    var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
                    //    //alert('ok')
                    //  //  AddMeterVal(e, Mid, "T2", cnum, nm_T2, table_id); 

                    //}
                }
                if (nm_T3.length != 0) {
                    var lastValTable = $('#Elekt_T3 tr:eq(0) td:eq(3)').text();
                    //    if (parseFloat(lastValTable) > parseFloat(nm_T3)) {
                    //        succElektro=false
                    //    if ($('#errm').length == 0) {
                    //        $('#nm_T3').after('<label id="errm" style="color:red">введенные показание меньше предыдущих. введите корректные данные</label>')
                    //        window.settimeout(function () { $('#errm').remove();}, 3000);}

                    //}
                    //    else {
                    //     var Mid = sessionStorage.getItem("mid");
                    //        var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
                    //        var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
                    //      //  AddMeterVal(e, Mid, "T3", cnum, nm_T3, table_id);
                    //        //alert('ok')
                    //    }
                }
            }
            else {
                succElektro = false
                if ($('#errM').length == 0) {
                    $('#nm_T1').prev('strong').before('<label id="errM" style="color:red">Необходимо заполнить  все поля для показании</label>')
                    window.setTimeout(function () {
                        $('#errM').remove();
                    }, 3000);
                }
            }
            if (succElektro == true && nm_T1.length != 0) {
                var Mid = sessionStorage.getItem("mid");
                var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
                var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
                AddMeterVal(e, Mid, "T1", cnum, nm_T1, table_id);
            }
            if (succElektro == true && nm_T2.length != 0) {
                var Mid = sessionStorage.getItem("mid");
                var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
                var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
                //alert('ok')
                AddMeterVal(e, Mid, "T2", cnum, nm_T2, table_id);
            }
            if (succElektro == true && nm_T3.length != 0) {
                var Mid = sessionStorage.getItem("mid");
                var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
                var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
                AddMeterVal(e, Mid, "T3", cnum, nm_T3, table_id);
            }
        }
        if ($('#Elekt_T2').length != 0) {
            var nm_T1 = $('#nm_T1').val().trim()
            var nm_T2 = $('#nm_T2').val().trim();

            if (nm_T1.length != 0 && nm_T2.length != 0) {
                if (nm_T1.length != 0) {
                    var lastValTable = $('#Elekt_T2 tr:eq(0) td:eq(1)').text();
                    //if (parseFloat(lastValTable) > parseFloat(nm_T1)) {
                    //    var succElektro = false
                    //    if ($('#errM').length == 0) {


                    //        $('#nm_T1').after('<label id="errM" style="color:red">Введенные показание меньше предыдущих. Введите корректные данные</label>')
                    //        window.setTimeout(function () { $('#errM').remove(); }, 3000);
                    //    }

                    //}
                    //else {
                    //    var Mid = sessionStorage.getItem("mid");
                    //    var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
                    //    var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
                    //    //      AddMeterVal(e, Mid, "T1", cnum, nm_T1, table_id);
                    //    //   alert('ok')
                    //}
                }
                if (nm_T2.length != 0) {
                    var lastValTable = $('#Elekt_T2 tr:eq(0) td:eq(2)').text();
                    //if (parseFloat(lastValTable) > parseFloat(nm_T2)) {
                    //    var succElektro = false
                    //    if ($('#errM').length == 0) {
                    //        $('#nm_T2').after('<label id="errM" style="color:red">Введенные показание меньше предыдущих. Введите корректные данные</label>')
                    //        window.setTimeout(function () { $('#errM').remove(); }, 3000);
                    //    }
                    //}
                    //else {
                    //    var Mid = sessionStorage.getItem("mid");
                    //    var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
                    //    var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
                    //    //alert('ok')
                    //    //  AddMeterVal(e, Mid, "T2", cnum, nm_T2, table_id); 

                    //}
                }

            }
            else {
                succElektro = false
                if ($('#errM').length == 0) {
                    $('#nm_T1').prev('strong').before('<label id="errM" style="color:red">Необходимо заполнить все поля для показании</label>')
                    window.setTimeout(function () {
                        $('#errM').remove();
                    }, 3000);
                }
            }
            if (succElektro == true && nm_T1.length != 0) {
                var Mid = sessionStorage.getItem("mid");
                var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
                var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
                AddMeterVal(e, Mid, "T1", cnum, nm_T1, table_id);
            }
            if (succElektro == true && nm_T2.length != 0) {
                var Mid = sessionStorage.getItem("mid");
                var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
                var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
                //alert('ok')
                AddMeterVal(e, Mid, "T2", cnum, nm_T2, table_id);
            }

        }
        if ($('#Elekt_T1').length != 0) {
            var nm_T1 = $('#nm_T1').val().trim()


            if (nm_T1.length != 0) {
                //if (nm_T1.length != 0) {
                //    var lastValTable = $('#Elekt_T1 tr:eq(0) td:eq(1)').text();
                //    if (parseFloat(lastValTable) > parseFloat(nm_T1)) {
                //        var succElektro = false
                //        if ($('#errM').length == 0) {


                //            $('#nm_T1').after('<label id="errM" style="color:red">Введенные показание меньше предыдущих. Введите корректные данные</label>')
                //            window.setTimeout(function () { $('#errM').remove(); }, 3000);
                //        }

                //    }
                //    else {
                //        var Mid = sessionStorage.getItem("mid");
                //        var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
                //        var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
                //        //      AddMeterVal(e, Mid, "T1", cnum, nm_T1, table_id);
                //        //   alert('ok')
                //    }
                //}

            }
            else {
                succElektro = false
                if ($('#errM').length == 0) {
                    $('#nm_T1').prev('strong').before('<label id="errM" style="color:red">Необходимо заполнить поля для показании</label>')
                    window.setTimeout(function () {
                        $('#errM').remove();
                    }, 3000);
                }
            }
            if (succElektro == true && nm_T1.length != 0) {
                var Mid = sessionStorage.getItem("mid");
                var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
                var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
                AddMeterVal(e, Mid, "Elekt_T1", cnum, nm_T1, table_id);
            }


        }
    }
    //if (id == "T1") {
    //    if ($('#Elekt_T1').length != 0) {
    //        var inpVal = $('#nm_T1').val();
    //        if (inpVal.length!=0) {
    //       var lastValTable = $('#Elekt_T1 tr:eq(0) td:eq(1)').text();
    //            if (lastValTable > inpVal) {
    //                if ($('#errM').length == 0) {
    //                    $(e).after('<label id="errM" style="color:red">Введенные показание меньше предыдущих. Введите корректные данные</label>')
    //                    window.setTimeout(function () {
    //                        $('#errM').hide(1000);
    //                        $('#errM').remove();
    //                    }, 3000);
    //                }

    //            }
    //            else {
    //                var Mid = sessionStorage.getItem("mid");
    //                var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
    //                var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
    //                AddMeterVal(e, Mid, table_id, cnum, inpVal);

    //                //console.log(table_id)
    //                $('#nm_T1').val(0)
    //            }
    //        }
    //        else {
    //            if ($('#errM').length == 0) {
    //                $(e).after('<label id="errM" style="color:red">Необходимо заполнить данное поле</label>')
    //                window.setTimeout(function () {
    //                    $('#errM').hide(1000);
    //                    $('#errM').remove();
    //                }, 3000);
    //            }
    //        }
    //    }
    //    if ($('#Elekt_T2').length != 0) {
    //        var inpVal = $('#nm_T1').val();
    //        if (inpVal.length!=0) {
    // var lastValTable = $('#Elekt_T2 tr:eq(0) td:eq(1)').text();
    //            if (lastValTable > inpVal) {
    //                if ($('#errM').length == 0) {
    //                    $(e).after('<label id="errM" style="color:red">Введенные показание меньше предыдущих. Введите корректные данные</label>')
    //                    window.setTimeout(function () {
    //                        $('#errM').hide(1000);
    //                        $('#errM').remove();
    //                    }, 3000);
    //                }

    //            }
    //            else {
    //                var Mid = sessionStorage.getItem("mid");
    //                var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
    //                var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
    //                AddMeterVal(e, Mid, "T1", cnum, inpVal, table_id);

    //                //console.log(table_id)
    //                $('#nm_T1').val(0)
    //            }
    //        }
    //        else {
    //            if ($('#errM').length == 0) {
    //                $(e).after('<label id="errM" style="color:red">Необходимо заполнить данное поле</label>')
    //                window.setTimeout(function () {
    //                    $('#errM').hide(1000);
    //                    $('#errM').remove();
    //                }, 3000);
    //            }
    //        }
    //    }
    //    if ($('#Elekt_T3').length != 0) {
    //        var inpVal = $('#nm_T1').val();
    //        if (inpVal.length!=0) {
    //  var lastValTable = $('#Elekt_T3 tr:eq(0) td:eq(1)').text();
    //            if (lastValTable > inpVal) {
    //                if ($('#errM').length == 0) {
    //                    $(e).after('<label id="errM" style="color:red">Введенные показание меньше предыдущих. Введите корректные данные</label>')
    //                    window.setTimeout(function () {
    //                        $('#errM').hide(1000);
    //                        $('#errM').remove();
    //                    }, 3000);
    //                }

    //            }
    //            else {
    //                var Mid = sessionStorage.getItem("mid");
    //                var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
    //                var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
    //                AddMeterVal(e, Mid, "T1", cnum, inpVal, table_id);

    //                //console.log(table_id)
    //                $('#nm_T1').val(0)
    //            }
    //        }
    //        else {
    //            if ($('#errM').length == 0) {
    //                $(e).after('<label id="errM" style="color:red">Необходимо заполнить данное поле</label>')
    //                window.setTimeout(function () {
    //                    $('#errM').hide(1000);
    //                    $('#errM').remove();
    //                }, 3000);
    //            }
    //        }
    //    }
    //}
    //if (id == "T2") {
    //    if ($('#Elekt_T2').length != 0) {
    //        var inpVal = $('#nm_T2').val();
    //        if (inpVal.length!=0) {
    //  var lastValTable = $('#Elekt_T2 tr:eq(0) td:eq(2)').text();
    //            if (lastValTable > inpVal) {
    //                if ($('#errM').length == 0) {
    //                    $(e).after('<label id="errM" style="color:red">Введенные показание меньше предыдущих. Введите корректные данные</label>')
    //                    window.setTimeout(function () {
    //                        $('#errM').hide(1000);
    //                        $('#errM').remove();
    //                    }, 3000);
    //                }

    //            }
    //            else {
    //                var Mid = sessionStorage.getItem("mid");
    //                var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
    //                var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
    //                AddMeterVal(e, Mid, "T2", cnum, inpVal, table_id);

    //                //console.log(table_id)
    //                $('#nm_T2').val(0)
    //            }
    //        }
    //        else {
    //            if ($('#errM').length == 0) {
    //                $(e).after('<label id="errM" style="color:red">Необходимо заполнить данное поле</label>')
    //                window.setTimeout(function () {
    //                    $('#errM').hide(1000);
    //                    $('#errM').remove();
    //                }, 3000);
    //            }
    //        }
    //    }
    //    if ($('#Elekt_T3').length != 0) {
    //        var inpVal = $('#nm_T2').val();
    //        if (inpVal.length!=0) {
    //  var lastValTable = $('#Elekt_T3 tr:eq(0) td:eq(2)').text();
    //            if (lastValTable > inpVal) {
    //                if ($('#errM').length == 0) {
    //                    $(e).after('<label id="errM" style="color:red">Введенные показание меньше предыдущих. Введите корректные данные</label>')
    //                    window.setTimeout(function () {
    //                        $('#errM').hide(1000);
    //                        $('#errM').remove();
    //                    }, 3000);
    //                }

    //            }
    //            else {
    //                var Mid = sessionStorage.getItem("mid");
    //                var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
    //                var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
    //                AddMeterVal(e, Mid, "T2", cnum, inpVal, table_id);

    //                //console.log(table_id)
    //                $('#nm_T1').val(0)
    //            }
    //        }
    //        else {
    //            if ($('#errM').length == 0) {
    //                $(e).after('<label id="errM" style="color:red">Необходимо заполнить данное поле</label>')
    //                window.setTimeout(function () {
    //                    $('#errM').hide(1000);
    //                    $('#errM').remove();
    //                }, 3000);
    //            }
    //        }
    //    }
    //}
    //if (id == "T3") {

    //    if ($('#Elekt_T3').length != 0) {
    //        var inpVal = $('#nm_T3').val();
    //        if (inpVal.length!=0) {
    // var lastValTable = $('#Elekt_T3 tr:eq(0) td:eq(3)').text();
    //            if (lastValTable > inpVal) {
    //                if ($('#errM').length == 0) {
    //                    $(e).after('<label id="errM" style="color:red">Введенные показание меньше предыдущих. Введите корректные данные</label>')
    //                    window.setTimeout(function () {
    //                        $('#errM').hide(1000);
    //                        $('#errM').remove();
    //                    }, 3000);
    //                }

    //            }
    //            else {
    //                var Mid = sessionStorage.getItem("mid");
    //                var cnum = $('#meterNum').text().substring($('#meterNum').text().indexOf('№ ') + 2, $('#meterNum').text().length);
    //                var table_id = $('#tab1 .row:eq(1) .table tbody').attr('id');
    //                AddMeterVal(e, Mid, "T3", cnum, inpVal, table_id);

    //                //console.log(table_id)
    //                $('#nm_T1').val(0)
    //            }
    //        }
    //        else {
    //            if ($('#errM').length == 0) {
    //                $(e).after('<label id="errM" style="color:red">Необходимо заполнить данное поле</label>')
    //                window.setTimeout(function () {
    //                    $('#errM').hide(1000);
    //                    $('#errM').remove();
    //                }, 3000);
    //            }    
    //        }
    //    }
    //}



}
function AddMeterVal(event, mid, ctip, cnum, val, tblName) {
    var ob = { "type": ctip, "mid": mid, "VALUE_": val, "cnum": cnum }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/AddCounterValue",
        data: JSON.stringify(ob),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var d = new Date();
            var strDate = d.getDate() + "." + d.getMonth() + "." + d.getFullYear();
            if (ctip == "Газ") {
                //$('#Gas').prepend('<tr style="display:none"><td>' + strDate+'</td><td>' + val+'</td></tr>');
                //$('#Gas tr:eq(0)').show('3000');
                $('#tab1 .row:eq(1)').remove();
                MeterHistoryVals(mid, 'Газ')

            }
            if (ctip == "Теплоэнергия") {
                //$('#teplo').prepend('<tr style="display:none"><td>' + strDate + '</td><td>' + val + '</td></tr>');
                //$('#teplo tr:eq(0)').show('3000');
                $('#tab1 .row:eq(1)').remove();
                MeterHistoryVals(mid, 'Теплоэнергия')

            }//
            if (ctip == "ХВС") {
                //$('#xvs').prepend('<tr style="display:none"><td>' + strDate + '</td><td>' + val + '</td></tr>');
                //$('#xvs tr:eq(0)').show('3000');
                $('#tab1 .row:eq(1)').remove();
                MeterHistoryVals(mid, 'ХВС')

            }
            if (ctip == "ГВС") {
                //$('#qvs').prepend('<tr style="display:none"><td>' + strDate + '</td><td>' + val + '</td></tr>');
                //$('#qvs tr:eq(0)').show('3000');
                $('#tab1 .row:eq(1)').remove();
                MeterHistoryVals(mid, 'ГВС')

            }
            if (ctip == "Elekt_T1") {
                //$('#Elekt_T1').prepend('<tr style="display:none"><td>' + strDate + '</td><td>' + val + '</td></tr>');
                //$('#Elekt_T1 tr:eq(0)').show('3000');
                $('#tab1 .row:eq(1)').remove();
                MeterHistoryVals(mid, 'Электроэнергия')
            }
            if (tblName == 'Elekt_T2') {
                $('#tab1 .row:eq(1)').remove();
                MeterHistoryVals(mid, 'Электроэнергия')
            }
            if (tblName == 'Elekt_T3') {
                $('#tab1 .row:eq(1)').remove();
                MeterHistoryVals(mid, 'Электроэнергия')
            }
        }
    })
}
function getPerScores(obj, rt, rm, s) {
    var obj = { "ObjId": obj, "rt": rt, "rm": rm }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "CounterCard.aspx/GetPerScores",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d);
            for (var i = 0; i < j.length; i++) {
                $('#Ps').append('<option value="' + j[i].NUMBER + '">' + j[i].NUMBER + '</option>')
            }
            if (s != "") {
                $('#Ps').find('option').get(0).remove();
                $('#Ps').val(s)
            }
        }
    })
}
function GetMeterTypesCard(s) {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/GetMeterTypes",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // //console.log(jsondata_)

            for (var i = 0; i < jsondata_.length; i++) {
                $("#TMeterC").append('<option value="' + jsondata_[i].ROOM_ID + '">' + jsondata_[i].FIRST_NAME + '</option>')

            }
            if (s != "") {
                $("#TMeterC").val(s)
            }
        }

    })
}
function getROomTYpeCardC(s) {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/GetRoomType",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // //console.log(jsondata_)

            for (var i = 0; i < jsondata_.length; i++) {
                $("#TRoomC").append('<option value="' + jsondata_[i].ROOM_ID + '">' + jsondata_[i].ROOM_TYPE + '</option>')

            }
            if (s != "") {
                $("#TRoomC").val(s);
            }

        }
    })
}
function gotoM(mid) {

    sessionStorage.setItem("mid", mid)
    window.location.href = "CounterCard.aspx"
}
function removechkerr(e) {
    $('#Errchk').remove();
    $('#Errchk').remove();
    //var chkerr = $('#Errchk').length;
    //if (chkerr != 0) {
    //    $('#Errchk').css("color","white");
    //}
    if ($(e).prop('checked') == true) {

    }
}
function generatePassMass(ss, o, sms2, em2, exp2) {
    $('.ui-loader-background,#loader').show();
    var obj = { "scores": ss, "o": o, "sms": sms2, "em": em2, "exp": exp2 }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Apartments.aspx/GenPassMass",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var jsond = JSON.parse(data.d);
            if (jsond.length != 0) {
                var frsts = "";
                for (var i = 0; i < jsond.length; i++) {
                    if (i == 0) {
                        frsts = frsts + jsond[i].GEN_SQUARE
                    }
                    else {
                        frsts = frsts + "," + jsond[i].GEN_SQUARE;
                    }
                    // $('#roomsPass tr td:not(:contains(' + jsond[i].NUMBER + '))').parent().remove();
                }
                for (var i = 0; i < jsond.length; i++) {
                    for (var j = 0; j < $('#roomsPass tr').length; j++) {
                        var score = jsond[i].NUMBER
                        var tdText = $('#roomsPass tr:eq(' + i + ') td:eq(1)').text()
                        if (tdText != score) {
                            $('#roomsPass tr:eq(' + i + ')').remove();
                        }
                    }
                }
                if (jsond[0].LIVE_SQUARE == "em") {
                    $('#Errchk').remove();
                    $('#loadLC .table').after('<span style="color:red" id="Errchk">Для того, чтобы уведомить пользователя (' + frsts + ') о сгенерированном пароле необходимо заполнить поле "E-mail"</span>')
                }
                if (jsond[0].LIVE_SQUARE == "ph") {
                    $('#ErrchkT').remove();
                    $('#loadLC .table').after('<span style="color:red" id="ErrchkT">Для того, чтобы уведомить пользователя (' + frsts + ') о сгенерированном пароле необходимо заполнить поле "Телефон</span>')
                }
            }
            else {
                $('#closeGEN').click();
            }
            $('#closeGEN').click();
            $('.ui-loader-background,#loader').hide();
        }
    })
}
function PassModal(obj) {
    $('#GenPass').show();
    $('#ObjAdr').append($('#objsM > option').clone())
    $('#closeGEN').click(function () {
        $("#roomsPass").empty();
        $('#GenPass').hide();
        $('#sms2,#em2,#bezPar,#prosrec,#closeGEN,#SAll').prop('checked', false);
        $('#psExp1').val('7');
        $('#ObjAdr').empty();
        $('#Errchk').remove()
    })
    $('#mh3').text('ГЕНЕРИРОВАНИЕ ПАРОЛЕЙ ');
    //for (var i = 0; i < $('#rooms tr').length; i++) {
    //    // var ss = ;
    //    // $('#roomsPass tr:eq(' + i + ') td:eq(0)').text();
    //    $('#roomsPass').append('<tr><td><input onclick=removechkerr(this) type="checkbox" value="' + $('#rooms tr:eq(' + i + ') td:eq(5)').text() + '"/></td><td>' + $('#rooms tr:eq(' + i + ') td:eq(5)').text() + '</td><td>' + $('#rooms tr:eq(' + i + ') td:eq(0)').text() + '</td><td>' + $('#rooms tr:eq(' + i + ') td:eq(1)').text() + '</td><td>' + $('#rooms tr:eq(' + i + ') td:eq(2)').text() + '</td></tr>')
    //    var lc = $('#rooms tr:eq(' + i + ') td:eq(5)').text()
    //    var twodata = $('#roomsPass tr td:contains('+lc+')').length
    //    if (i != 0) {
    //        if (twodata == 2) {
    //            // $('#roomsPass tr:eq(' + (i+1) + ')').remove();
    //            $('#roomsPass tr td:contains(' + lc + '):first').parent().remove()
    //        }
    //    }

    //    //$('#roomsPass tr:eq(' + i + ') td:eq(1)').text()
    //    //$('#roomsPass tr:eq(' + i + ') td:eq(2)').text()
    //    //$('#roomsPass tr:eq(' + i + ') td:eq(3)').text()

    //}

    ////console.log("paxra"+paxra);
}
function selectAll(e) {
    $('#Errchk').remove();
    $('#Errchk').remove();
    if ($(e).prop("checked") == true) {

        for (var i = 0; i < $('#roomsPass td').length; i++) {
            $('#roomsPass tr:eq(' + i + ') td:eq(0) input:checkbox').prop('checked', true)
        }
        // $('#roomsPass td:eq(' + i + ') tr:eq(0) input:checkbox')
    }
    else {
        for (var i = 0; i < $('#roomsPass td').length; i++) {
            $('#roomsPass tr:eq(' + i + ') td:eq(0) input:checkbox').prop('checked', false)
        }
    }
}
function PassLess(l, o, selectedS) {
    $('.ui-loader-background,#loader').show();

    var obj = { "lg": l, "o": o }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Apartments.aspx/PassLEss",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            // window.location.href = "Apartments.aspx";
            var jsondata_ = JSON.parse(data.d)
            $("#roomsPass").empty();
            for (var i = 0; i < jsondata_.length; i++) {
                //$("#roomsPass").append('<tr><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].ROOM_FOR + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].ROOM_TYPE + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].ROOM_NUMBER + '</a> </td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].FLOOR + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].ENTRANCE + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].NUMBER + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].FIRST_NAME + '</a></td></tr>')
                var checked = "";
                if (selectedS.length != 0) {

                    for (var j = 0; j < selectedS.length; j++) {
                        if (jsondata_[i].NUMBER == selectedS[j].NUMBER) {
                            checked = 'checked="checked"'
                        }
                    }
                }
                $("#roomsPass").append('<tr><td><input type="checkbox" ' + checked + ' value="' + jsondata_[i].NUMBER + '"/></td><td>' + jsondata_[i].NUMBER + '</td><td>' + jsondata_[i].ROOM_FOR + '</td><td>' + jsondata_[i].ROOM_TYPE + '</td><td>' + jsondata_[i].ROOM_NUMBER + '</td><td>' + jsondata_[i].FIRST_NAME + '</td></tr>')
            }
            $('.ui-loader-background,#loader').hide();

        }
    })
}
function expiredTenants(l, o) {
    var obj = { "lg": l, "o": o }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Apartments.aspx/ExpiredTenants",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            // window.location.href = "Apartments.aspx";
            var jsondata_ = JSON.parse(data.d)
            $("#roomsPass").empty();
            for (var i = 0; i < jsondata_.length; i++) {
                //$("#roomsPass").append('<tr><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].ROOM_FOR + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].ROOM_TYPE + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].ROOM_NUMBER + '</a> </td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].FLOOR + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].ENTRANCE + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].NUMBER + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].FIRST_NAME + '</a></td></tr>')
                $("#roomsPass").append('<tr><td><input type="checkbox" value="' + jsondata_[i].NUMBER + '"/></td><td>' + jsondata_[i].NUMBER + '</td><td>' + jsondata_[i].ROOM_FOR + '</td><td>' + jsondata_[i].ROOM_TYPE + '</td><td>' + jsondata_[i].ROOM_NUMBER + '</td></tr>')
            }

        }
    })
}
function Sortingby(e, by, asc) {

    var Log = sessionStorage.getItem('Log');
    var ob = { "Log": Log, "by": by, "asc": asc }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Apartments.aspx/GetRoomsBySorting",
        data: JSON.stringify(ob),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {


            $('i[data-icon="w"]').attr('class', 'fa fa-unsorted')
            var icon = $(e).attr('class');
            if (asc == "asc") {
                $(e).attr('class', 'fa fa-caret-down').attr("onclick", "Sortingby(this, '" + by + "','desc')")
            }
            if (asc == "desc") {
                $(e).attr('class', 'fa fa-caret-up').attr("onclick", "Sortingby(this, '" + by + "','asc')")
            }
            var jsondata_ = JSON.parse(data.d)
            $("#rooms").empty();
            for (var i = 0; i < jsondata_.length; i++) {
                jsondata_[i].FLOOR = (jsondata_[i].FLOOR == 0) ? "" : jsondata_[i].FLOOR
                jsondata_[i].ENTRANCE = (jsondata_[i].ENTRANCE == 0) ? "" : jsondata_[i].ENTRANCE
                $("#rooms").append('<tr><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].ROOM_FOR + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].ROOM_TYPE + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].ROOM_NUMBER + '</a> </td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].FLOOR + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].ENTRANCE + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].NUMBER + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].FIRST_NAME + '</a></td></tr>')
            }

        }
    })
}
function getRoomBYO_ID(l, o) {
    var obj = { "lg": l, "o": o }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Apartments.aspx/GetRoomByO_Id",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            // window.location.href = "Apartments.aspx";
            var jsondata_ = JSON.parse(data.d)
            //$('.container').removeData('RGUIDS');
            //$('.container').data('RGUIDS', jsondata_[0].GEN_SQUARE)
            $('#ScoresAndRooms').dataTable({
                "destroy": true,
                columnDefs: [{ type: 'natural', targets: 3 }, { type: 'natural', targets: 4 }, { type: 'natural', targets: 5 }, { type: 'natural', targets: 6 }],
                data: jsondata_,

                columns: [
                    {
                        'data': 'CHAMB_AMOUNT',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.CHAMB_AMOUNT + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_FOR',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.ROOM_FOR + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_TYPE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.ROOM_TYPE + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_NUMBER',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.ROOM_NUMBER + '</a>');
                        }
                    },
                    {
                        'data': 'FLOOR',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.FLOOR + '</a>');
                        }
                    },
                    {
                        'data': 'ENTRANCE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.ENTRANCE + '</a>');
                        }
                    },
                    {
                        'data': 'NUMBER',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.NUMBER + '</a>');
                        }
                    },
                    {
                        'data': 'FIRST_NAME',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.FIRST_NAME + '</a>');
                        }
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
                    "aria": {
                        "sortAscending": ": активировать для сортировки столбца по возрастанию",
                        "sortDescending": ": активировать для сортировки столбца по убыванию"
                    }
                }
                ,
                "initComplete": function (settings, json) {
                    changeDatatableElementStructures($('#ScoresAndRooms'))


                    // console.log ('bitti2')
                }
            })
            $('.ui-loader-background').hide();
            $('#loader').hide();
            //$("#rooms").empty();
            //for (var i = 0; i < jsondata_.length; i++) {
            //    jsondata_[i].FLOOR = (jsondata_[i].FLOOR == 0) ? "" : jsondata_[i].FLOOR
            //    jsondata_[i].ENTRANCE = (jsondata_[i].ENTRANCE == 0) ? "" : jsondata_[i].ENTRANCE
            //    $("#rooms").append('<tr><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].ROOM_FOR + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].ROOM_TYPE + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].ROOM_NUMBER + '</a> </td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].FLOOR + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].ENTRANCE + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].NUMBER + '</a></td><td><a href="#" onclick="GoTo(' + jsondata_[i].ROOM_ID + ')">' + jsondata_[i].FIRST_NAME + '</a></td></tr>')
            //}

            //var room_tr = $('#rooms tr').length;
            //var sameSobsAndLC = [];
            //// //console.log($('#rooms tr td:contains(333)').length)

            //for (var i = 0; i < room_tr; i++) {
            //    var firstLc = $('#rooms tr:eq(' + i + ') td:eq(5)').text();
            //    var q = i + 1;
            //    for (var j = q; j < room_tr; j++) {


            //        var secondLc = $('#rooms tr:eq(' + j + ') td:eq(5)').text();
            //        if (firstLc == secondLc) {
            //            var firstSobs = $('#rooms tr:eq(' + i + ') td:eq(6)').text();
            //            var secondSobs = $('#rooms tr:eq(' + j + ') td:eq(6)').text();
            //            firstSobs = firstSobs + "," + secondSobs
            //            $('#rooms tr:eq(' + i + ') td:eq(6) a').text(firstSobs);
            //            $('#rooms tr:eq(' + j + ')').hide();
            //            room_tr = $('#rooms tr').length;
            //        }


            //    }
            //}


        }
    })
}
function makeMeterFilter(lg, fltO, a_rx, objId) {
    var Obj = { "lg": lg, "Mflt": fltO, "arx": a_rx, "objId": objId }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/makeMeterFilter",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //async: false,
        success: function (data) {
            ////console.log(data);
            $('#mtrs').empty();

            var j = JSON.parse(data.d)
            // //console.log(j)
            var d = new Date();

            var month = d.getMonth() + 1;
            var day = d.getDate();

            var strDate = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day


            $('.cntTable').dataTable({
                "destroy": true,
                columnDefs: [
                    { type: 'de_date', targets: 6 },
                    { type: 'de_date', targets: 7 },
                    { type: 'natural', targets: 2 },
                    { type: 'natural', targets: 3 },
                    { type: 'natural', targets: 5 }
                ],
                data: j,

                columns: [
                    {
                        'data': 'OBJECT_ADRESS',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.OBJECT_ADRESS + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_TYPE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.ROOM_TYPE + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_NUMBER',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.ROOM_NUMBER + '</a>');
                        }
                    },
                    {
                        'data': 'SCORE_ID',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.SCORE_ID + '</a>');
                        }
                    },
                    {
                        'data': 'TYPE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.TYPE + '</a>');
                        }
                    },
                    {
                        'data': 'METERS_NUMBER',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.METERS_NUMBER + '</a>');
                        }
                    },

                    {
                        'data': 'PREVIOUS_DATE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.PREVIOUS_DATE + '</a>');// $('.cntTable').dataTable
                        }
                    },

                    {
                        'data': 'NEXT_DATE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.NEXT_DATE + '</a>');//.substring(0, oData.NEXT_DATE.indexOf(' ')) 
                        }
                    },

                    {
                        'data': 'NEXT_DATE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            // $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.NEXT_DATE.substring(0, oData.NEXT_DATE.indexOf(' ')) + '</a>');
                            var nxt = oData.NEXT_DATE.substring(0, oData.NEXT_DATE.indexOf(' ')).split('.')
                            nxt = nxt[2] + '-' + nxt[1] + '-' + nxt[0];
                            var src = "";
                            if (nxt <= strDate) {
                                src = '<img src="/img/timesup.png" alt="">'
                                $(nTd).html(src)
                            }
                            else {
                                $(nTd).html(' ')
                            }
                        }
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
                    "aria": {
                        "sortAscending": ": активировать для сортировки столбца по возрастанию",
                        "sortDescending": ": активировать для сортировки столбца по убыванию"
                    }
                }
            })
            $('.ui-loader-background').hide();
            $('#loader').hide();


        }
    })
}
function getMeter(lg) {
    var Obj = { "lg": lg }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/GetMeters",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // async: false,
        success: function (data) {
            var j = JSON.parse(data.d)
            //console.log(j)
            var d = new Date();

            var month = d.getMonth() + 1;
            var day = d.getDate();

            var strDate = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day



            $('.cntTable').dataTable({
                "destroy": true,
                columnDefs: [
                    { type: 'de_date', targets: 6 },
                    { type: 'de_date', targets: 7 },
                    { type: 'natural', targets: 2 },
                    { type: 'natural', targets: 3 },
                    { type: 'natural', targets: 5 }
                ],
                data: j,
                "deferRender": true,
                columns: [
                    {
                        'data': 'OBJECT_ADRESS',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.OBJECT_ADRESS + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_TYPE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.ROOM_TYPE + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_NUMBER',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.ROOM_NUMBER + '</a>');
                        }
                    },
                    {
                        'data': 'SCORE_ID',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.SCORE_ID + '</a>');
                        }
                    },
                    {
                        'data': 'TYPE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.TYPE + '</a>');
                        }
                    },
                    {
                        'data': 'METERS_NUMBER',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.METERS_NUMBER + '</a>');
                        }
                    },

                    {
                        'data': 'PREVIOUS_DATE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.PREVIOUS_DATE + '</a>');//.substring(0, oData.PREVIOUS_DATE.indexOf(' '))
                        }
                    },

                    {
                        'data': 'NEXT_DATE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.NEXT_DATE + '</a>');//.substring(0, oData.NEXT_DATE.indexOf(' ')) 
                        }
                    },

                    {
                        'data': 'NEXT_DATE',

                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            // $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.NEXT_DATE.substring(0, oData.NEXT_DATE.indexOf(' ')) + '</a>');
                            var nxt = oData.NEXT_DATE.substring(0, oData.NEXT_DATE.indexOf(' ')).split('.')
                            nxt = nxt[2] + '-' + nxt[1] + '-' + nxt[0];
                            var src = "";
                            if (nxt <= strDate) {
                                src = '<img src="/img/timesup.png" alt="">'
                                $(nTd).html(src)
                            }
                            else {
                                $(nTd).html(' ')
                            }
                        },
                        targets: 'no-sort', orderable: false

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
                    "aria": {
                        "sortAscending": ": активировать для сортировки столбца по возрастанию",
                        "sortDescending": ": активировать для сортировки столбца по убыванию"
                    }
                }
            })
            //$('.cntTable').children('thead').children('tr').children('th').each(function () {


            //    $('#cntrSort').remove();

            //})

            //$('.cntTable').children('thead').children('tr').children('th:not(:last)').each(function () {
            //    $(this).append('<i style="margin-left:  5px;" id="cntrSort" data-icon="w" class="fa fa-unsorted" aria-hidden="true"></i>')
            //})

            $('.ui-loader-background').hide();
            $('#loader').hide();

        }
    })
}
function getMeterbyObject(lg, o) {
    $('.ui-loader-background').show();
    $('#loader').show();
    var Obj = { "lg": lg, "o": o }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/GetMetersByObj",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // async: false,
        success: function (data) {
            var j = JSON.parse(data.d)
            var d = new Date();

            var month = d.getMonth() + 1;
            var day = d.getDate();

            var strDate = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day




            $('.cntTable').dataTable({
                "destroy": true,
                columnDefs: [{ type: 'de_date', targets: 6 }, { type: 'de_date', targets: 7 }, { type: 'natural', targets: 2 }, { type: 'natural', targets: 3 }, { type: 'natural', targets: 5 }],
                data: j,
                "deferRender": true,
                columns: [
                    {
                        'data': 'OBJECT_ADRESS',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.OBJECT_ADRESS + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_TYPE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.ROOM_TYPE + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_NUMBER',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.ROOM_NUMBER + '</a>');
                        }
                    },
                    {
                        'data': 'SCORE_ID',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.SCORE_ID + '</a>');
                        }
                    },
                    {
                        'data': 'TYPE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.TYPE + '</a>');
                        }
                    },
                    {
                        'data': 'METERS_NUMBER',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.METERS_NUMBER + '</a>');
                        }
                    },

                    {
                        'data': 'PREVIOUS_DATE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.PREVIOUS_DATE + '</a>');//.substring(0, oData.PREVIOUS_DATE.indexOf(' '))
                        }
                    },

                    {
                        'data': 'NEXT_DATE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.NEXT_DATE + '</a>');//.substring(0, oData.NEXT_DATE.indexOf(' '))
                        }
                    },

                    {
                        'data': 'NEXT_DATE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            // $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.NEXT_DATE.substring(0, oData.NEXT_DATE.indexOf(' ')) + '</a>');
                            var nxt = oData.NEXT_DATE.substring(0, oData.NEXT_DATE.indexOf(' ')).split('.')
                            nxt = nxt[2] + '-' + nxt[1] + '-' + nxt[0];
                            var src = "";
                            if (nxt <= strDate) {
                                src = '<img src="/img/timesup.png" alt="">'
                                $(nTd).html(src)
                            }
                            else {
                                $(nTd).html(' ')
                            }
                        }
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
                    "aria": {
                        "sortAscending": ": активировать для сортировки столбца по возрастанию",
                        "sortDescending": ": активировать для сортировки столбца по убыванию"
                    }
                }
            })
            $('.ui-loader-background').hide();
            $('#loader').hide();


        }
    })
}
function getArxMeter(lg, objId) {
    var Obj = { "lg": lg, 'objId': objId }
    $('.ui-loader-background').show();
    $('#loader').show();
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/GetArxMeters",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            var j = JSON.parse(data.d)
            var d = new Date();

            var month = d.getMonth() + 1;
            var day = d.getDate();

            var strDate = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day



            $('.cntTable').dataTable({
                "destroy": true,
                columnDefs: [{ type: 'de_date', targets: 6 }, { type: 'de_date', targets: 7 }, { type: 'natural', targets: 2 }, { type: 'natural', targets: 3 }, { type: 'natural', targets: 5 }],
                data: j,

                columns: [
                    {
                        'data': 'OBJECT_ADRESS',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.OBJECT_ADRESS + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_TYPE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.ROOM_TYPE + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_NUMBER',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.ROOM_NUMBER + '</a>');
                        }
                    },
                    {
                        'data': 'SCORE_ID',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.SCORE_ID + '</a>');
                        }
                    },
                    {
                        'data': 'TYPE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.TYPE + '</a>');
                        }
                    },
                    {
                        'data': 'METERS_NUMBER',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.METERS_NUMBER + '</a>');
                        }
                    },

                    {
                        'data': 'PREVIOUS_DATE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.PREVIOUS_DATE + '</a>');//.substring(0, oData.PREVIOUS_DATE.indexOf(' ')) 
                        }
                    },

                    {
                        'data': 'NEXT_DATE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.NEXT_DATE + '</a>');//.substring(0, oData.NEXT_DATE.indexOf(' ')) 
                        }
                    },

                    {
                        'data': 'NEXT_DATE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            // $(nTd).html('<a href="#"  onclick="gotoM(' + oData.METERS_ID + ')">' + oData.NEXT_DATE.substring(0, oData.NEXT_DATE.indexOf(' ')) + '</a>');
                            var nxt = oData.NEXT_DATE.substring(0, oData.NEXT_DATE.indexOf(' ')).split('.')
                            nxt = nxt[2] + '-' + nxt[1] + '-' + nxt[0];
                            var src = "";
                            if (nxt <= strDate) {
                                src = '<img src="/img/timesup.png" alt="">'
                                $(nTd).html(src)
                            }
                            else {
                                $(nTd).html(' ')
                            }
                        }
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
                    "aria": {
                        "sortAscending": ": активировать для сортировки столбца по возрастанию",
                        "sortDescending": ": активировать для сортировки столбца по убыванию"
                    }
                }
            })
            $('.ui-loader-background').hide();
            $('#loader').hide();

        }
    })
}
function SaveMeter(o) {

    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/SaveMETER",
        data: JSON.stringify(o),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            $('#mtrs').empty();
            var lg = sessionStorage.getItem('Log');
            getMeter(lg);
            $('#close_5').click();
        }
    })
}
function checkMeterNum(e) {
    var Obj = { "mn": $(e).val() }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/CheckMeterNumber",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            var jsondata_1 = JSON.parse(data.d)
            //$("#RoomType").removeAttr('disabled')
            if (jsondata_1.result == "0") {
                $('#HmeterNum').remove();
            }
            else {
                if ($('#HmeterNum').length == 0) {
                    $(e).after('<label style="color:red" id="HmeterNum">Счетчик с таким номером уже зарегистрирован в системе. Проверьте правильность введенных данных.</label>')
                }

            }


        }

    })
}
function getDateM() {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    var dayNe = parseInt(day) + 1
    if (dayNe < 10) {
        dayNe = '0' + dayNe.toString();
    }
    var dateOfNextControl = year + '-' + month + '-' + dayNe;
    $('#nextControl').val(dateOfNextControl);
    var maxDate = year + '-' + month + '-' + day;
    // $('#calen').attr('max', maxDate);
    // $('#currMdate').attr('min', maxDate);
    $('#currMdate,#lstControl').val(maxDate);
    // $("#calen").

    return maxDate;


}
function GetMeterTypes() {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/GetMeterTypes",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // //console.log(jsondata_)
            //  $("#mtrsType").append('<option value="0">Выберите тип счетчика</option>')
            for (var i = 0; i < jsondata_.length; i++) {
                $("#mtrsType").append('<option value="' + jsondata_[i].ROOM_ID + '">' + jsondata_[i].FIRST_NAME + '</option>')

            }



        }

    })
}
function GetMeterTypesFilter() {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/GetMeterTypes",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // //console.log(jsondata_)

            for (var i = 0; i < jsondata_.length; i++) {
                //$("#mtrsTypeF").append('<option value="' + jsondata_[i].ROOM_ID + '">' + jsondata_[i].FIRST_NAME + '</option>')
                $('#mtrsTypeF').append('<input type="checkbox" data-url="null" value=' + jsondata_[i].ROOM_ID + '   class="dispDatas"><label class="checkBx">' + jsondata_[i].FIRST_NAME + '</label>')

            }
            //$('#mtrsTypeF').multiselect({

            //    includeSelectAllOption: true,
            //    nonSelectedText: 'Выберите Тип счетчика'

            //});
            //$('#mtrsTypeF').hide()
            //$('.multiselect-selected-text:eq(1)').text('Выберите тип счетчика')


        }

    })
}
function PopupIframe(header, src, div) {
    $("#mh5").empty();
    $("#mh5").append(header);

    $("#txt2").empty();
    //$('#HAddC').text('melankoli')

    // $('#RoomType').append('<option value="15">Orxan</option>')



    var modal = document.getElementById('myModal5');
    var span = document.getElementsByClassName("close_5")[0];
    modal.style.display = "block";
    $("#close_5,#cls").click(function () {
        modal.style.display = "none";
        $('#mb5').empty();
        $('#mb5').append('<div class="row"><div class="container"><div class="col-xs-12 col-sm-3"></div></div></div>')
        $('#RoomType,#RoomNum,#sc,#meterNum').empty();
        $('#mb5 .col-xs-12').load('AddCounter.aspx #pop')
        //$('#RoomType,#RoomNum','#sc').empty();

    })
    //window.onclick = function (event) {
    //    if (event.target == modal) {
    //        modal.style.display = "none";
    //        $('#RoomType,#RoomNum,#sc,#meterNum').empty();
    //        $('#close_5').click();
    //    }
    //}

}
function removeFM(e) {
    $(e).remove();
    $('.HistImg,.titleF2').remove();
    //$('.modal-content2').css('height', '90%')
    $('#files').show().val('');
}
function getRoomCOuntforMtr(o) {
    var Obj = { "O": o }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/GetRoomTypeByObjId",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            var jsondata_1 = JSON.parse(data.d)
            if (jsondata_1.length == 0) {
                if ($('#objsM_E').length == 0) {
                    $('#objsM').after('<label id="objsM_E" style="color:red">для этого объекта нет номер помещения</label>');
                }

                $('#closeUplC').click();
            }
        }
    })
}
function getRoomTYpeByO(o) {
    var Obj = { "O": o }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/GetRoomTypeByObjId",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            var jsondata_1 = JSON.parse(data.d)
            $("#RoomType").removeAttr('disabled')
            if (jsondata_1.length == 0) {
                if ($('#objsM_E').length == 0) {
                    $('#objsM').after('<label id="objsM_E" style="color:red">для этого объекта нет номер помещения</label>');
                }

                $('#close_').click();
            }
            if (jsondata_1.length != 1) {
                $("#RoomType").empty();
                $("#RoomType").append('<option value="0">Выберите Тип помещения</option>')
                for (var i = 0; i < jsondata_1.length; i++) {
                    $("#RoomType").append('<option value="' + jsondata_1[i].ROOM_ID + '">' + jsondata_1[i].ROOM_TYPE + '</option>')
                }
            }
            else {
                $("#RoomType").empty();
                $("#RoomType").append('<option value="' + jsondata_1[0].ROOM_ID + '">' + jsondata_1[0].ROOM_TYPE + '</option>').attr('disabled', 'disabled')
                GetRoomNumber(o, jsondata_1[0].ROOM_ID)
            }






        }
    })
}
function GetRoomNumber(o, st) {
    var Obj = { "o": o, "st": st }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/getRoomNumber",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            var jsondata_1 = JSON.parse(data.d)
            //$("#RoomType").removeAttr('disabled')

            $("#RoomNum").empty();

            for (var i = 0; i < jsondata_1.length; i++) {
                $("#RoomNum").append('<option value="' + jsondata_1[i].ROOM_ID + '">' + jsondata_1[i].ROOM_NUMBER + '</option>')
            }

            $("#RoomNum").val(jsondata_1[0].ROOM_ID)
            getScore(jsondata_1[0].ROOM_ID);
        }

    })

}
function getROomTYpeForfilter() {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/GetRoomType",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // //console.log(jsondata_)

            for (var i = 0; i < jsondata_.length; i++) {
                // $("#rmTypeF").append('<option value="' + jsondata_[i].ROOM_ID + '">' + jsondata_[i].ROOM_TYPE + '</option>')
                $('#rmTypeF').append('<input type="checkbox" data-url="null" value=' + jsondata_[i].ROOM_ID + '   class="dispDatas"><label class="checkBx">' + jsondata_[i].ROOM_TYPE + '</label>')
            }
            //$('#rmTypeF').multiselect({

            //    includeSelectAllOption: true,
            //        nonSelectedText:'Выберите Тип помещения'


            //});
            //$('.multiselect-selected-text:eq(0)').text('Выберите тип помещения')

        }
    })
}
function getScore(r) {
    var Obj = { "rmId": r }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/getScoreId",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            var jsondata_1 = JSON.parse(data.d)
            //$("#RoomType").removeAttr('disabled')

            $("#sc").empty();

            for (var i = 0; i < jsondata_1.length; i++) {
                $("#sc").append('<option value="' + jsondata_1[i].ROOM_FOR + '">' + jsondata_1[i].ROOM_FOR + '</option>')
            }

            $("#sc").val(jsondata_1[0].ROOM_FOR)
            //getScore(jsondata_1[i].ROOM_ID);
        }

    })
}
function SaveDatasFromExcel(ob, file, l) {
    var l_g = sessionStorage.getItem("Log")
    var Obj = { "ObjId": ob, "file": file, "l": l_g }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Apartments.aspx/SaveInDBFromEx",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {

            var jsondata = data.d;
            $('#scores').empty();
            // console.log(jsondata)
            jsondata = JSON.parse(jsondata)
            //  console.log(jsondata)
            if (jsondata.result == "HalfOk") {
                var nmbrs = jsondata.Numbers
                var nmburs = "";
                for (var i = 0; i < nmbrs.length; i++) {
                    if (i == 0) {
                        nmburs = nmbrs[i].NUMBER
                    }
                    else {
                        nmburs = nmburs + ", " + nmbrs[i].NUMBER
                    }

                }
                $('#mh2').empty();
                // $('.modal-content2').css('width', '43%')
                $('#cls').hide();
                $('#deleteO').val("OK");
                $('#errEx').remove();
                $('#sledUpLC').after('<label style="color:red" id="errEx"> ' + nmburs + ' уже присутствует у данного объекта.</label>')
                // alertWithButton2('Внимание', nmburs + ' уже присутствует у данного объекта.', "", "", "", "", "")
                // $('#deleteO').click(function () { $('#close_').click(); $('.modal-content2').css('width', '43%') })

            }
            if (jsondata.result == "OK") {
                //for (var i = 0; i < jsondata.NumbersDB.length; i++) {
                //    ////console.log(jsondata.NumbersDB[i].NUMBER);
                //    $('#scores').append('<tr><td>' + jsondata.NumbersDB[i].NUMBER + '</td><td>' + jsondata.NumbersDB[i].ROOM_NUMBER + '</td><td>' + jsondata.NumbersDB[i].ROOM_FOR + '</td><td>' + jsondata.NumbersDB[i].ROOM_TYPE + '</td><td>' + jsondata.NumbersDB[i].OWNERSHIP_TYPE_ID + '</td><td>' + jsondata.NumbersDB[i].SHARE + '</td><td>' + jsondata.NumbersDB[i].FIRST_NAME + '</td><td>' + jsondata.NumbersDB[i].GEN_SQUARE + '</td><td>' + jsondata.NumbersDB[i].LIVE_SQUARE + '</td><td>' + jsondata.NumbersDB[i].WITHOUT_SUMMER_SQUARE + '</td></tr>')
                //}
                var lg = sessionStorage.getItem("Log")
                var ClId = sessionStorage.getItem("Clien_ID")
                SaveLog("Добавить помещение", "Важное", "Личный кабинет (Профиль Управляющего)", "Управляющий", "Были загружены номера помещений", lg)
                $('#lgs').empty();
                getlog2(lg, "Manager");
                var table = $('#datatable').DataTable();

                table
                    .clear()
                    .draw();
                $('.modal-content2').css('width', '43%')
                $('.ui-loader-background').show();
                $("#loader").show();
                $('#UploadAcc').hide();
                $('#scores').empty();
                $('#files').val('');
                //getRoom(l);

                getRoomBYO_ID(l, ob)

            }
            else {
                if (jsondata.result != "HalfOk") {
                    //  $("#cls,#deleteO").hide();
                    // alertWithButton2("Ошибка", jsondata.result, "", "", "", "", "");
                    $('#errEx').remove();
                    $('#sledUpLC').after('<label style="color:red" id="errEx">' + jsondata.ErrMesage + '</label>')
                }
            }
            $('.ui-loader-background').hide();
            $("#loader").hide();

        }
    })
}
function UpdateApart(obj, lg, RoomNumber, RoomType) {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/UpdateRoom",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            // SaveLog("Добавить помещение", "Важное", "Личный кабинет (Профиль Управляющего)", "Управляющий", "Добавлено новое помещение", Log)
            var selObj = $("#objs option:selected").text();
            SaveLog("Редактировать карточку помещения", "Простое", "Личный кабинет (Профиль Управляющего)", "Управляющий", "Данные помещения <" + RoomType + "   " + RoomNumber + "  (Объект " + selObj + ")> были изменены.", lg)
            window.location.href = "Apartments.aspx";
            $('.ui-loader-background').hide();
            $('#loader').hide();
        }
        //error: function (e) {
        //    $('.ui-loader-background').hide();$('#loader').hide();alert(e.responseJSON.Message)}

    })
}
function DeleteROOM(rm, lg) {
    var obj = { "rm": rm }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/DeleteRoom",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            SaveLog("Удалить помещение", "Важное", "Личный кабинет (Профиль Управляющего)", "Управляющий", "Удалено помещение(Объект " + $('#objs option:selected').text() + " /Номер помещения " + $('#rnum').val() + ")", lg)
            $("#cls").click();
            window.location.href = "Apartments.aspx";
        }
    })
}
function getRoomDetail(lg, apId) {
    var obj = { "RoomId": apId }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/GetRoomDetail",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // //console.log(jsondata_)

            for (var i = 0; i < jsondata_.length; i++) {
                jsondata_[i].FLOOR = (jsondata_[i].FLOOR == 0) ? "" : jsondata_[i].FLOOR
                jsondata_[i].ENTRANCE = (jsondata_[i].ENTRANCE == 0) ? "" : jsondata_[i].ENTRANCE
                jsondata_[i].CHAMB_AMOUNT = (jsondata_[i].CHAMB_AMOUNT == 0) ? "" : jsondata_[i].CHAMB_AMOUNT
                jsondata_[i].GEN_SQUARE = (jsondata_[i].GEN_SQUARE == 0) ? "" : jsondata_[i].GEN_SQUARE
                jsondata_[i].LIVE_SQUARE = (jsondata_[i].LIVE_SQUARE == 0) ? "" : jsondata_[i].LIVE_SQUARE


                GetUproObj(lg, jsondata_[i].OBJECT_ID);
                $("#entr").val(jsondata_[i].ENTRANCE)
                $("#floor").val(jsondata_[i].FLOOR);
                $("#rnum").val(jsondata_[i].ROOM_NUMBER);
                getRoomFor(jsondata_[i].ROOM_FOR);
                gtTypeOfroom(jsondata_[i].ROOM_TYPE, jsondata_[i].ROOM_FOR);
                $("#countR").val(jsondata_[i].CHAMB_AMOUNT);
                $("#GenS").val(jsondata_[i].GEN_SQUARE);
                $("#LiveS").val(jsondata_[i].LIVE_SQUARE)
                getBasAccountDatas(apId, jsondata_[i].OBJECT_ID)


            }
        }
    })
}
function getFirstNames(itm, IndId, j) {
    var obj = { "ind": IndId }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/getFirstNames",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // var j=0
            for (var i = 0; i < jsondata_.length; i++) {
                var tyProp = $('.tab-content #tab' + itm + ' #typeProp').val()
                // alert(tyProp)
                if (tyProp == 1) {
                    $('.tab-content #tab' + itm + ' #itms #dolH').parent().remove();
                    $('.tab-content #tab' + itm + ' #itms #sobsH').show();
                    $('.tab-content #tab' + itm + ' #itms #telH').show();
                    $('.tab-content #tab' + itm + ' #itms #emailH').show();

                    $('.tab-content #tab' + itm + ' #itms #emailH').parent().after('<div class="row" itemid="' + j + '"><div class="col-xs-6 col-md-3"><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" type="text" id="sobs' + j + '" itemid="' + j + '"></div><div class="col-xs-6 col-md-3"><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" id="tel' + j + '" type="tel" itemid="' + j + '"></div><div class="col-xs-6 col-md-3""><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" id="email' + j + '" type="email" itemid="' + j + '" style="width:100%; "></div><i class="fa fa-close removing" onclick=delElem(this,' + j + ',"sovs") aria-hidden="true"></i></div>')
                    $('#Adding').show().attr('onclick', 'AddElem("sovs",' + j + ')');
                    //  j++


                }
                //$("#tab" + itm + " .row:nth-last-child(1)  #itms .row #sobs" + itm + "").val(jsondata_[i].FIRST_NAME);
                //$("#tab" + itm + " .row:nth-last-child(1)  #itms .row #tel" + itm + "").val(jsondata_[i].PHONE);
                //$("#tab" + itm + " .row:nth-last-child(1)  #itms .row #email" + itm + "").val(jsondata_[i].EMAIL);
            }
        }
    })
}
function getIndAndShare(itm, nmbr) {
    var obj = { "nmbr": nmbr }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/getIndAndShare",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",

        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            for (var i = 0; i < jsondata_.length; i++) {
                var INDIVIDUAL_ID = jsondata_[i].FIRST_NAME
                getFirstNames(itm, INDIVIDUAL_ID, i)// INDIVIDUAL_ID (FIRST_NAME)
            }
            //for (var i = 0; i < jsondata_.length; i++) {

            //    if (jsondata_[i].PHONE == 2) {
            //        $("#tab" + itm + " .row:nth-last-child(1) #itms #sobsH").show();
            //        $("#tab" + itm + " .row:nth-last-child(1) #itms #dolH").show();
            //        $("#tab" + itm + " .row:nth-last-child(1) #itms #telH").show();
            //        $("#tab" + itm + " .row:nth-last-child(1) #itms #emailH").show();

            //        $('#tab' + itm + ' .row:nth-last-child(1)  #itms #emailH').parent().after('<div class="row" itemid="' + itm + '"><div class="col-xs-6 col-md-3"><input type="text" onkeyup="hideErrsMessage2(this)" id="sobs' + itm + '" itemid="' + itm + '"   /> </div><div class="col-xs-6 col-md-3" style="padding:0 10px 0 15px;"><input onkeyup="hideErrsMessage2(this)" id="dol' + itm + '" type="text" itemid="' + itm + '"   /></div><div class="col-xs-6 col-md-3" ><input onkeyup="hideErrsMessage2(this)" id="tel' + itm + '" type="tel" itemid="' + itm + '"/></div> <div class="col-xs-6 col-md-3""><input onkeyup="hideErrsMessage2(this)" id="email' + itm + '" type="email"  itemid="' + itm +'"/></div></div>');
            //        $("#tab" + itm + " .row:nth-last-child(1)  #itms .row #dol"+itm+"").val(jsondata_[i].SHARE);
            //        getFirstNames(itm, jsondata_[i].FIRST_NAME);
            //    }
            //    if (jsondata_[i].PHONE == 1) {

            //       // $('#tab3').attr('class', 'tab-pane fade')
            //        $("#tab" + itm + " .row:nth-last-child(1) #itms #sobsH").show();
            //        $("#tab" + itm + " .row:nth-last-child(1) #itms #dolH").parent().remove();
            //        $("#tab" + itm + " .row:nth-last-child(1) #itms #telH").show();
            //        $("#tab" + itm + " .row:nth-last-child(1) #itms #emailH").show();
            //        if (i == 0) {
            //            var nextItem = i + 1
            //            $('#tab' + itm + ' .row:nth-last-child(1)  #itms #emailH').parent().after('<div class="row" itemid="' + i + '"><div class="col-xs-6 col-md-3"><input onkeyup="hideErrsMessage2(this)"type="text" id="sobs' + i + '" itemid="' + i + '"></div><div class="col-xs-6 col-md-3"><input onkeyup="hideErrsMessage2(this)" id="tel' + i + '" type="tel" itemid="' + i + '"></div><div class="col-xs-6 col-md-3""><input onkeyup="hideErrsMessage2(this)" id="email' + i + '" type="email" itemid="' + i + '" style="width:100%; "></div><i class="fa fa-close removing" onclick=delElem(this,' + i + ',"sovs") aria-hidden="true"></i></div>')
            //            $('#tab' + itm + ' .row:nth-last-child(1)  #itms:last').after('<div class="row" itemid="' + nextItem + '"><div class="col-xs-6 col-md-3"><input onkeyup="hideErrsMessage2(this)" type="text" id="sobs' + nextItem + '" itemid="' + nextItem + '"></div><div class="col-xs-6 col-md-3"><input id="tel' + nextItem + '" onkeyup="hideErrsMessage2(this)" type="tel" itemid="' + nextItem + '"></div><div class="col-xs-6 col-md-3""><input onkeyup="hideErrsMessage2(this)" id="email' + nextItem + '" type="email" itemid="' + nextItem + '" style="width:100%; "></div><i class="fa fa-close removing" onclick=delElem(this,' + nextItem + ',"sovs") aria-hidden="true"></i></div>')


            //            //$('#Adding').show().attr("sovs", itm);
            //            //getFirstNames(itm, jsondata_[i].FIRST_NAME);
            //           // getFirstNames(nextItem, jsondata_[i].FIRST_NAME);

            //        }

            //    }
            //}
            //PHONE
            //var typeProp = $('#tab' + itm + ' .row:nth-last-child(1)  #typeProp').val()
            //if (typeProp==2) {

            //}
            //if (typeProp==3) {

            //}
            //if (typeProp==) {

            //}
        }
    })
}
function getBasAccountDatas(rmId, OBJECT_ID) {

    var obj = { "RoomId": rmId, "OBJECT_ID": OBJECT_ID }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/GetBaseAccountDatas",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // console.log(jsondata_)
            // 
            var jsondata_A_D;
            if (jsondata_.length < 10) {
                $("#nav-tab li:not(:last)").remove();
            }
            if (jsondata_.length == 10) {
                $("#nav-tab").empty
            }

            $(".tab-content").empty();
            // $('.ls').remove()
            for (var i = jsondata_.length - 1; i >= 0; i--) {
                //  sessionStorage.setItem("ID", jsondata_[i].ID)
                //$("#nav-tab").prepend('<li   itemid=' + i + ' class><i class="fa fa-close removing3" itemid="' + i + '" style="display:none" onclick="deltab(' + i + ',this)" aria-hidden="true"></i><a data-toggle="tab" href="#tab' + i + '"  aria-expanded="true">' + jsondata_[i].NUMBER + '</a></li>')
                //if (jsondata_.length != 1) {
                //    $("#nav-tab li[itemid=" + i + "]").prepend('<i class="fa fa-close removing3" itemid=' + i + ' onclick="deltab(' + i + ',this)" aria-hidden="true"></i>')
                //}
                console.log(jsondata_[i])
                addTab(i, jsondata_[i])
                //giveElements(i, jsondata_[i].NUMBER).NewTab

            }
            //  $('.nav-tabs:last,.tab-content:last').remove();

            // $('.nav-tabs:last,.tab-content:last').remove();
            for (var i = 0; i < jsondata_.length; i++) {

                jsondata_A_D = jsondata_[i].A_D;

                $(".tab-content").append('<div id="tab' + i + '" data-tab="' + i + '" class="tab-pane fade"><div class="row"><div class="col-md-8 col-xs-12"><label for="lc">Номер лицевого счета:</label><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" type="text" id="lc"><label for="typeProp">Тип собственности:</label><select id="typeProp"><option value="0">Выберите собственность</option><option value="1">Совместная</option><option value="2">Единоличная</option><option value="3">Долевая</option><option value="4">Социальный найм</option></select><div id="itms"><div class="col-xs-6 col-md-3"><label id="sobsH" style="display: none;">Собственник</label></div><div class="col-xs-6 col-md-3" style="display: none;"><label id="dolH" style="display: block;">Доля</label></div><div class="col-xs-6 col-md-3"><label id="telH" style="display:none" for="telH">Номер&nbsp;телефона</label></div><div class="col-xs-6 col-md-3"><label id="emailH" style="display: none;">E-mail</label></div></div><button style="display:none" id="Adding" class="btn genBtn">Добавить</button></div><div class="col-md-4 col-xs-12"><label>Жилая площадь по данному л/с, м<sup>2</sup></label><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" id="LiveSq" type="number" style="width:50%;"  ><label>Общая площадь по данному л/с, м<sup>2</sup></label><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" type="number" style="width:50%;" id="GenSq"><label>Общая площадь без летних зон по данному л/с, м<sup>2</sup></label><input id="LiveSqB" onkeyup="hideErrsMessage2(this)"  onchange="hideErrsMessage2(this)"type="number" style="width:50%;"  ><label>Количество комнат</label><input type="number" id="AmRoom" onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)"  ></div></div></div>')
                $('#tab' + i + ' .row:nth-last-child(1)  #typeProp').val(jsondata_[i].OWNERSHIP_TYPE_ID)
                $('#tab' + i + ' .row:nth-last-child(1)  #lc').val(jsondata_[i].NUMBER).attr('data-id', jsondata_[i].ID)
                var ROOM_QUANT = jsondata_[i].ROOM_QUANT.split('|');
                $('#tab' + i + ' .row:nth-last-child(1)  #lc').after('<label for="lc">Пароль:</label><input disabled="disabled" data-sms="not" data-em="not" onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" type="text" id="pss" style="width: 71%;"><button style="margin-left: 3px" onclick="Generate(this)" id="GENER" class="btn genBtn">СГЕНЕРИРОВАТЬ</button>')
                $('#tab' + i + ' .row:nth-last-child(1)  #pss').val(ROOM_QUANT[1])
                jsondata_[i].GEN_SQUARE = (jsondata_[i].GEN_SQUARE == 0) ? "" : jsondata_[i].GEN_SQUARE
                jsondata_[i].LIVE_SQUARE = (jsondata_[i].LIVE_SQUARE == 0) ? "" : jsondata_[i].LIVE_SQUARE

                $('#tab' + i + ' .row:last-child  #LiveSq').val(jsondata_[i].LIVE_SQUARE);
                $('#tab' + i + ' .row:last-child  #GenSq').val(jsondata_[i].GEN_SQUARE);

                jsondata_[i].WITHOUT_SUMMER_SQUARE = (jsondata_[i].WITHOUT_SUMMER_SQUARE == 0) ? "" : jsondata_[i].WITHOUT_SUMMER_SQUARE
                ROOM_QUANT[0] = (ROOM_QUANT[0] == 0) ? "" : ROOM_QUANT[0]
                $('#tab' + i + ' .row:last-child  #LiveSqB').val(jsondata_[i].WITHOUT_SUMMER_SQUARE);
                $('#tab' + i + ' .row:last-child  #AmRoom').val(ROOM_QUANT[0]);
                //AddPayment('#tab' + i + '')

                //$('.tab-content #tab' + i + ' .row').after('<hr><ul class="nav nav-tabs"><li class="active"><a data-toggle="tab" >Начисления и платежи</a></li></ul><div class="tab-content"><div  class="tab-pane fade in active" style="min-height: 100px;"><input type="button" class="btn genBtn" id="DelPay" value="Удалить"><input type="button" class="btn genBtn" id="AddNac" value="Внести начисления"><input type="button" class="btn genBtn" id="AddPay" value="Внести платежи" style="margin-left: 6px;"><table class="table orderList" style="width: 87%;"><thead><tr><td>Период <span class="glyphicon glyphicon-chevron-down"></span></td><td> Остаток на начало периода (-/+)</td> <td>Начислено</td><td>Поступило</td><td>Итого к оплате</td><td>Оплатить до:</td></tr></thead><tbody></tbody></table></div></div>')
                // 
                //
                var k = 0;
                for (var j = jsondata_A_D.length - 1; j >= 0; j--) {
                    if (jsondata_[i].OWNERSHIP_TYPE_ID == 1) {
                        //$('.tab-content #tab' + i + ' #itms #dolH').parent().remove();
                        $('.tab-content #tab' + i + ' #itms #dolH').parent().hide();
                        $('.tab-content #tab' + i + ' #itms #sobsH').show();
                        $('.tab-content #tab' + i + ' #itms #telH').show();
                        $('.tab-content #tab' + i + ' #itms #emailH').show();

                        $('.tab-content #tab' + i + ' #itms #emailH').parent().after('<div class="row" itemid="' + j + '"><div class="col-xs-6 col-md-3"><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" type="text" id="sobs' + j + '" itemid="' + j + '"></div><div class="col-xs-6 col-md-3"><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" id="tel' + j + '" type="tel" itemid="' + j + '"></div><div class="col-xs-6 col-md-3"><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" id="email' + j + '" type="email" itemid="' + j + '"></div><i class="fa fa-close removing" onclick=delElem(this,' + j + ',"sovs") style="display:none" aria-hidden="true"></i></div>')
                        // $('.tab-content #tab' + i + ' .row #Adding').show().attr('onclick', 'AddElem("sovs",' + j + ')');

                        // $("#tab" + i + " .row:nth-last-child(1)  #itms .row #sobs" + j + "").val('Orxan')
                        k++;
                    }
                    if (jsondata_[i].OWNERSHIP_TYPE_ID == 2) {
                        //  $('.tab-content #tab' + i + ' #itms #dolH').hide().parent().removeAttr('class');
                        $('.tab-content #tab' + i + ' #itms #dolH').hide()
                        $('.tab-content #tab' + i + ' #itms #sobsH').show();
                        $('.tab-content #tab' + i + ' #itms #telH').show();
                        $('.tab-content #tab' + i + ' #itms #emailH').show();
                        $('.tab-content #tab' + i + ' #itms #emailH').parent().after('<div class="row" itemid="0"><div class="col-xs-6 col-md-3"><input type="text" onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" id="sobs0" itemid="0"/></div><div class="col-xs-6 col-md-3" style="display:none"><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 44" id="dol0" type="text" itemid="0"/></div><div class="col-xs-6 col-md-3"><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" id="tel0" type="tel" itemid="0"/></div><div class="col-xs-6 col-md-3"><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" id="email0" type="email"  itemid="0"/></div></div>')
                        $("#tab" + i + " .row:nth-last-child(1)  #itms .row #sobs0").val(jsondata_A_D[0].FIRST_NAME);
                        $("#tab" + i + " .row:nth-last-child(1)  #itms .row #dol0").val(jsondata_A_D[0].SHARE);
                        $("#tab" + i + " .row:nth-last-child(1)  #itms .row #email0").val(jsondata_A_D[0].EMAIL);
                        $("#tab" + i + " .row:nth-last-child(1)  #itms .row #tel0").val(jsondata_A_D[0].PHONE);
                    }
                    if (jsondata_[i].OWNERSHIP_TYPE_ID == 3) {
                        $('.tab-content #tab' + i + ' #itms #dolH').show();
                        $('.tab-content #tab' + i + ' #itms #sobsH').show();
                        $('.tab-content #tab' + i + ' #itms #dolH').parent().show();
                        $('.tab-content #tab' + i + ' #itms #telH').show();
                        $('.tab-content #tab' + i + ' #itms #emailH').show();
                        $('.tab-content #tab' + i + ' #itms #emailH').parent().after('<div class="row" itemid="' + j + '"><div class="col-xs-6 col-md-3"><input type="text" onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" id="sobs' + j + '" itemid="' + j + '"></div><div class="col-xs-6 col-md-3"><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 44" id="dol' + j + '" type="text" itemid="' + j + '"></div><div class="col-xs-6 col-md-3"><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" id="tel' + j + '" type="tel" itemid="' + j + '"></div><div class="col-xs-6 col-md-3"><i class="fa fa-close" onclick=delElem(this,' + j + ',"doleva") style="float:right;color:red" aria-hidden="true"></i><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" id="email' + j + '" type="email" itemid="' + j + '"></div></div>')
                        $('.tab-content #tab' + i + ' .row #Adding').show().attr('onclick', 'AddElem("doleva",' + j + ')');
                    }
                    if (jsondata_[i].OWNERSHIP_TYPE_ID == 4) {
                        //    $('.tab-content #tab' + i + ' #itms #dolH').show();
                        // $('.tab-content #tab' + i + ' #itms #dolH').hide().parent().removeAttr('class');
                        $('.tab-content #tab' + i + ' #itms #dolH').hide()
                        $('.tab-content #tab' + i + ' #itms #sobsH').show();
                        $('.tab-content #tab' + i + ' #itms #telH').show();
                        $('.tab-content #tab' + i + ' #itms #emailH').show();
                        $('.tab-content #tab' + i + ' #itms #emailH').parent().after('<div class="row" itemid="0"><div class="col-xs-6 col-md-3"><input type="text" onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" id="sobs0" itemid="0"   /> </div><div class="col-xs-6 col-md-3" style="padding:0 10px 0 15px;display:none"><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 44" id="dol0" type="text" itemid="0"   /></div><div class="col-xs-6 col-md-3" ><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" id="tel0" type="tel" itemid="0"/></div> <div class="col-xs-6 col-md-3""><input onkeyup="hideErrsMessage2(this)" onchange="hideErrsMessage2(this)" id="email0" type="email"  itemid="0"/></div></div>')
                        $("#tab" + i + " .row:nth-last-child(1)  #itms .row #sobs0").val(jsondata_A_D[0].FIRST_NAME);
                        $("#tab" + i + " .row:nth-last-child(1)  #itms .row #dol0").val(jsondata_A_D[0].SHARE);
                        $("#tab" + i + " .row:nth-last-child(1)  #itms .row #email0").val(jsondata_A_D[0].EMAIL);
                        $("#tab" + i + " .row:nth-last-child(1)  #itms .row #tel0").val(jsondata_A_D[0].PHONE);
                    }
                }

                var txtCont = $('.tab-content #tab' + i + ' #itms .row').length
                txtCont = parseInt(txtCont)
                for (var b = 0; b < txtCont; b++) {
                    if (jsondata_[i].OWNERSHIP_TYPE_ID == 1) {
                        var itemid = $('.tab-content #tab' + i + ' #itms .row:eq(' + b + ')').attr('itemid');

                        $("#tab" + i + " .row:nth-last-child(1)  #itms .row #sobs" + b + "").val(jsondata_A_D[itemid].FIRST_NAME);
                        $("#tab" + i + " .row:nth-last-child(1)  #itms .row #tel" + b + "").val(jsondata_A_D[itemid].PHONE);
                        $("#tab" + i + " .row:nth-last-child(1)  #itms .row #email" + b + "").val(jsondata_A_D[itemid].EMAIL);

                    }
                    if (jsondata_[i].OWNERSHIP_TYPE_ID == 3) {
                        var itemid = $('.tab-content #tab' + i + ' #itms .row:eq(' + b + ')').attr('itemid');

                        $("#tab" + i + " .row:nth-last-child(1)  #itms .row #sobs" + b + "").val(jsondata_A_D[itemid].FIRST_NAME);
                        $("#tab" + i + " .row:nth-last-child(1)  #itms .row #tel" + b + "").val(jsondata_A_D[itemid].PHONE);
                        $("#tab" + i + " .row:nth-last-child(1)  #itms .row #email" + b + "").val(jsondata_A_D[itemid].EMAIL);
                        $("#tab" + i + " .row:nth-last-child(1)  #itms .row #dol" + b + "").val(jsondata_A_D[itemid].SHARE);

                    }
                }
                //  $('#typeProp_E').remove();
                $(".active #itms #sobsH").show();
                $(".active #itms #dolH").show();
                $(".active #itms #telH").show();
                $(".active #itms #emailH").show();


                // getIndAndShare(i, jsondata_[i].NUMBER)
            }

            if (jsondata_.length < 10) {
                $("#nav-tab li:nth-last-child(2)").attr("class", "active")
                $(".tab-content > div:last-child").attr('class', 'tab-pane fade in active');
            }
            if (jsondata_.length == 10) {
                $("#nav-tab li:last").attr("class", "active")
            }

            //for (var i = 0; i < jsondata_.lenght; i++) {

            //}

            AddPayment(jsondata_.length, jsondata_[0].ENTRANCE);
        }
    })
}
function showTab(e) {
    var tabnumb = $(e).attr('data-tab')
    $('.faces').attr('class', 'faces tab-pane fade')
    $('.faces[data-tab="' + tabnumb + '"]').attr('class', 'faces tab-pane fade in active')
}
function AddPayment(len, isNew) {
    console.log('isNew: ' + isNew)
    for (var i = 0; i < len; i++) {//<td>Оплачено</td>

        //if (isNew != null) {
        //    $('.tab-content').children('#tab' + i).children('.row').after('<hr><div class="row"><ul class="nav nav-tabs"><li data-tab="0" class="active" onclick="showTab(this)" style="cursor:pointer"><a data-toggle="tab"  aria-expanded="true">Физические лица</a></li><li data-tab="1" onclick="showTab(this)" style="cursor:pointer" class=""><a data-toggle="tab" aria-expanded="false">Юридические лица</a></li><li data-tab="2" onclick="showTab(this)" style="width: 20%;cursor:pointer;" class="GosTab"><a data-toggle="tab" aria-expanded="true">Государственные учреждения</a></li></ul><div class="tab-content"><div id="tab0" data-tab="0" class="faces tab-pane fade in active"><div class="col-md-12"><div class="col-md-5 bordering" ><label> Пользователи помещения</label><table><thead><tr><th>ФИО</th><th>Дата Рождения</th><th>Мобильный телефон</th></tr></thead><tbody><tr><td></td><td></td><td></td></tr></tbody></table></div><div class="col-md-2 arrowDiv" ><i class="fa fa-arrow-right arrows" aria-hidden="true"></i><br><i class="fa fa-arrow-right arrows" aria-hidden="true" ></i></div><div class="col-md-5 bordering"><label>Родственники</label><table><thead><tr><th>ФИО</th><th>Тип родства</th><th>Вид пользвателя</th><th>Дата рождени</th></tr></thead><tbody><tr><td></td><td></td><td></td><td></td></tr></tbody></table></div> </div><a class="btn genBtn" href="AddUsers_.aspx">Добавить физическое лицо</a></div><div id="tab1" data-tab="1" class="faces tab-pane fade"><h6 class="h6color">Юридические лица</h6><table><thead><tr><th>Наименование организации</th><th>Тип собственности</th><th>ИНН</th><th>КПП</th><th>ОГРН</th></tr></thead><tbody><tr><td></td><td></td><td></td><td></td><td></td></tr></tbody></table><a class="btn genBtn" href="AddLegalEntity_.aspx">Добавить юридическое лицо</a></div><div id="tab2" data-tab="2" class="faces tab-pane fade"><h6 class="h6color">Государственные учреждения</h6><table><thead><tr><th>Наименование Государственные учреждения</th><th>Право собственности</th><th>ИНН</th><th>КПП</th></tr></thead><tbody><tr><td></td><td></td><td></td><td></td></tr></tbody></table><a class="btn genBtn" href="GovernmentAgency.aspx">Добавить Государственные учреждения</a></div></div></div>')
        //}
        $('.tab-content').children('#tab' + i).children('.row:last').after('<hr><ul class="nav nav-tabs"><li style="cursor:pointer" onclick="ShowAccurals(this)" class="active"><a >Начисления и платежи</a></li><li style="cursor:pointer" onclick="ShowHistoryAccurals(this)"><a>История оплат</a></li></ul><div id="Paying"><div id="tab-4"  style="min-height: 100px;"><input type="button" class="btn genBtn" disabled=disabled id="DelPay" style="display:none" onclick=DeletingPay(this) value="Удалить"><input type="button" class="btn genBtn" id="AddNac"  onclick="AddNac(this,-1)" value="Внести начисления"><input type="button" class="btn genBtn" id="AddPay" value="Внести платежи" onclick="AddPlatej(this)" style="margin-left: 6px; display:none"><table class="table orderList"  style="width: 87%;"><thead><tr><td>Период / Услуги <span onclick="SortingPay(this)" class="glyphicon glyphicon-chevron-up"></span></td><td> Остаток на начало периода (-/+) руб.</td> <td>Начислено руб.</td><td>Поступило руб.</td><td>Итого к оплате руб.</td><td style="display:none">Оплатить до:</td></tr></thead><tbody id=paytbl_' + i + '></tbody></table></div></div><div id="PayingHistory" style="display:none"><table class="table orderList" id="tblHistory" style="width: 87%; display: table;"><thead><tr><td>Дата</td><td>Поступило (руб.)</td></tr></thead><tbody id="HistoryPays_' + i + '"></tbody></table></div>')
        var lc = $('#tab' + i).children('.row').children('div').children('#lc').val();
        //GetRFP(lc, '#paytbl_' + i);

        GetRFP_KONSTANTIN(lc, '#paytbl_' + i);
        GetRFP_history_KONSTANTIN(lc, '#HistoryPays_' + i);

    }
}
function ShowAccurals(e) {

    $(e).attr('class', 'active');
    $(e).parent().parent().children('#Paying').show();
    $(e).parent().parent().children('#PayingHistory').hide();
    $(e).next().removeAttr('class');

}

function ShowHistoryAccurals(e) {
    $(e).attr('class', 'active');
    $(e).parent().parent().children('#Paying').hide();
    $(e).parent().parent().children('#PayingHistory').show();
    $(e).prev().removeAttr('class');
}

function Payed(e) {
    var summery = $(e).parent().prev().prev().children('a').text();

    var period = $(e).parent().parent().children('td:eq(0)').children('a').text();
    if ($(e).prop('checked') == true) {


        var result = confirm("Вы уверены, что хотите установить " + summery + " руб. за " + period + " оплаченной?");
        if (result == true) {
            var Log = sessionStorage.getItem("Log");
            var chk = "0"
            var rfpId = $(e).parent().prev().attr('itemid')
            var obj = { "rfpId": rfpId, 'chk': chk, 'Log': Log }
            $.ajax({
                error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
                type: "POST",
                url: "AddApartment.aspx/Payed",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (rfpId) {
                    $('#delPayDet').parent().remove();
                    $(e).parent().parent().parent().parent().parent().children('#AddNac').attr('disabled', 'disabled')
                    $(e).parent().parent().next('tr').children('td:eq(0)').children('.table').children('#detBody').children('tr').each(function () {
                        $(this).children('td:last').children('input[type="checkbox"]').prop('checked', true)
                    })
                }
            })
            // alert("checked")
        }
        else {
            $(e).prop('checked', false)
        }
    }
    else {
        var result = confirm("Вы уверены, что хотите снять оплату " + summery + " за " + period + "?");
        if (result == true) {
            var Log = sessionStorage.getItem("Log");
            var chk = "1"
            var rfpId = $(e).parent().prev().attr('itemid')
            var obj = { "rfpId": rfpId, 'chk': chk, 'Log': Log }
            $.ajax({
                error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
                type: "POST",
                url: "AddApartment.aspx/Payed",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (rfpId) {
                    $(e).parent().parent().parent().parent().parent().children('#AddNac').removeAttr('disabled')
                    $(e).parent().parent().next('tr').children('td:eq(0)').children('.table').children('#detBody').children('tr').each(function () {
                        $(this).children('td:last').children('input[type="checkbox"]').prop('checked', false)
                    })
                }
            })
        }
        else {
            $(e).prop('checked', false)
        }
    }
}
function Deleting_Detail(e, dtId) {
    var Log = sessionStorage.getItem("Log");
    var obj = { "lg": Log, 'dtId': dtId }


    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/DeleteDetail_inf",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#closeGEN').click();
            $('#delPayDet').parent().parent().remove();
            var total = 0
            $('#detBody').children('tr').each(function () {
                var cost = $(this).children('td:eq(1)').text();
                total = parseFloat(cost) + total;
            })
            total = total.toFixed(2)
            $('#table1').prev('tr').children('td:eq(2)').text(total)
        }
    })

}
function DeletingPay(e, idPay) {
    var result = confirm("Вы действительно хотите удалить данные за выбранный период?");
    if (result == true) {
        $('.ui-loader-background,#loader').show();
        var ServiceArray = []

        var data_s_ = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').attr('data-guid')
        $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').next('tr').find('#detBody').children('tr').each(function () {
            var data_guid = $(this).attr('data-guid')
            ServiceArray.push({ 'PAY_GUID': data_guid })
        })
        DeleteKvartByPeriod(JSON.stringify(ServiceArray))
    }
    // var PayId = $(e).parent().children('.table').children('#paytbl_1').children('tr[style="background-color: lightskyblue"]').children('td').attr('itemid');
    //alertWithButton2("Удалить", "Вы действительно хотите удалить данные за выбранный период?", "", "", "", "", "")
    //$('#deleteO').click(function () {
    //    var Scoreid = $(e).parent().parent().parent().children('.row').children('div:eq(0)').children('#lc').val();
    //    //alert(Scoreid)
    //    PayDelete(e, idPay, Scoreid)
    //    $('#cls').click();
    //})
    //$('#cls').click(function ()
    //{
    //    $('#myModal2').hide();
    //})
}
function DeleteKvartByPeriod(ServiceArray) {
    var Obj = { "ServiceArray": ServiceArray }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/DeleteKvartByPeriod",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').next('tr').remove()
            $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').remove();
            $('#DelPay').hide();
            $('.ui-loader-background,#loader').hide();
        }
    })
}
function MakeCheckHasProductService(Sid, e) {
    $('#ServiceHasCost').children('.col-md-12').each(function () {
        var scostId = $(this).attr('itemid');
        if (scostId == Sid) {
            $(this).remove();
        }
    })
    if ($('#GrupServices').length == 0) {
        $('#GroupS').parent().after('<div class="col-md-4"><label>Услуги</label><div id="GrupServices" style="border: 1px solid #000;box-shadow: 3px 4px 5px rgba(0,0,0,0.3);width: 100%;height: 260px !important;overflow: auto;"></div></div>')
    }
    var dataD = $(e).parent().attr('data-d')
    $(e).attr('onclick', 'makeCheckProductS(' + $(e).attr('itemid') + ',this,' + dataD + ')');
    var $copiedDiv = $(e).parent().clone();
    var iconId = $('#GroupSHas').children('#d_' + dataD).children('img').attr('itemid')
    var iconAdres = $('#GroupSHas').children('#d_' + dataD).children('img').attr('src')
    if ($('#GrupServices').children('#d_' + dataD).length == 0) {
        var serviceGruoName = $(e).parent().parent().children('.col-md-12:eq(0)').children('div').text();
        $('#GrupServices').prepend('<div id="d_' + dataD + '"><div data-d=' + dataD + ' data-icAd=' + iconAdres + ' data-iconid=' + iconId + ' class="margTop0"><hr><div class="cornFlower">' + serviceGruoName + '</div><input type="button" id="addFormbtn" class="btn genBtn" value="Добавить Услугу" data-open="on" onclick="showAddForm(' + dataD + ',this)" data-g=' + dataD + ' itemid="423" style="-right: -23px; */float: left;width: 100%;"></div></div>')
        $('#GrupServices').children('#d_' + dataD).append($copiedDiv);
    }
    else {
        $('#GrupServices').children('#d_' + dataD).append($copiedDiv);
    }
    $(e).parent().remove();
    if ($('#GrupHasServices').children('#d_' + dataD).children('div[data-d=' + dataD + ']').length == 1) {
        $('#GrupHasServices').children('#d_' + dataD).remove()
        $('#GroupSHas').children('#d_' + dataD).remove();
    }
}
function makeCheckProductS(Sid, e, d) {
    var dataD = $(e).parent().attr('data-d');
    $(e).attr('onclick', 'MakeCheckHasProductService(' + $(e).attr('itemid') + ',this)');
    var $copiedDiv = $(e).parent().clone();
    var serviceGruoName = $(e).parent().parent().children('.col-md-12:eq(0)').children('div').text();//$('#GroupS').children('#d_' + dataD).html();//
    var iconAdres = $('#GrupServices').children('#d_' + dataD).children('.col-md-12:eq(0)').attr('data-icad');
    iconAdres = (iconAdres == undefined) ? $('#GroupS').children('#d_' + dataD).children('img').attr('src') : "";
    var iconId = $('#GrupServices').children('#d_' + dataD).children('.col-md-12:eq(0)').attr('data-iconid');

    iconId = $(iconId == undefined) ? $('#GroupS').children('#d_' + dataD).children('img').attr('itemid') : "";
    $('#ServiceHasCost').prepend('<div id="d_' + dataD + '" itemid="' + Sid + '" class="margTop0"><label itemid="' + Sid + '" class="checkBx" style="margin-left: 0px !important;">' + $(e).next().text() + '</label><input type="number"  id="nmbr" onchange="checkNumber(this)" min="0" itemid="' + Sid + '" style="-right: -23px; */float: left;"><label style="float:right;">Договорная</label><input itemid="' + Sid + '" id="chk" onclick="checkCheckbox(this)" type="checkbox" style="float: right; margin-right:7px;"><hr></div>')

    if ($('#GrupHasServices').children('#d_' + dataD).length == 0) {

        $('#GrupHasServices').prepend('<div id="d_' + dataD + '"><div data-d=' + dataD + ' class="margTop0"><hr><div class="cornFlower">' + serviceGruoName + '</div></div></div>');
        // $('#GrupHasServices').prepend(serviceGruoName);

        //$('#GroupSHas').prepend('<div id="d_' + dataD + '" class="margTop0"><input type="checkbox" checked="checked" class="col-md-1" onclick="MakeCheckGrupS(' + dataD + ',this)"><label itemid="144" style="margin-top: -7px !important;" class="checkBx">' + serviceGruoName + '</label></div>')
        $('#GroupSHas').prepend('<div id="d_' + dataD + '" class="margTop0"><input type="checkbox" checked="checked" class="col-md-1" onclick="MakeCheckHasGrupS(' + dataD + ',this)"><label itemid="144" style="width: 70%;" class="checkBx">' + serviceGruoName + '</label><img src=' + iconAdres + ' itemid=' + iconId + ' onclick="ChangeIcon(this)" style="width: 30px;height: 30px;float: right;margin-top: -20px;"></div>')

        $('#GrupHasServices').children('#d_' + dataD).append($copiedDiv);
    }
    else {
        $('#GrupHasServices').children('#d_' + dataD).append($copiedDiv);
    }
    $(e).parent().remove();
    if ($('#GrupServices').children('#d_' + dataD).children('div[data-d=' + dataD + ']').length == 1) {

        $('#GrupServices').children('#d_' + dataD).remove()
        // $('#GroupSHas').children('#d_' + dataD).remove();

    }
}
function PayDelete(e, id, sc) {
    var Obj = { "sc": sc, "idPay": id }


    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/PayDelete",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(e).parent().children('.table').children().children('tr[style="background-color: lightskyblue;"]').next('tr').remove();
            $(e).parent().children('.table').children().children('tr[style="background-color: lightskyblue;"]').remove();
            $(e).attr('onclick', 'DeletingPay(this)').attr('disabled', 'disabled');
            $(e).next().attr('onclick', 'AddNac(this,-1)')
        }
    })
}

function GetRFP(score, table) {
    var Obj = { "sc": score }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/GetRFP",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            var j = JSON.parse(data.d)
            $(table).empty();
            for (var i = 0; i < j.length; i++) {
                //  var total_SUM = parseFloat(j[i].ACCURED_SUMM) + parseFloat((j[i].PAYMENT_SUM.length != 0) ? j[i].PAYMENT_SUM : "0")
                var PAY_DATE = j[i].PAY_DATE.substr(0, j[i].PAY_DATE.indexOf(' '))
                var checked = (j[i].PAYED == null) ? "" : "checked='true'"

                if (j[i].GENERAL_SUM.length != 0 && j[i].GENERAL_SUM.indexOf('.') == -1 && j[i].GENERAL_SUM.indexOf(',') == -1) {
                    j[i].GENERAL_SUM = j[i].GENERAL_SUM + ".00"
                }
                else {
                    if (j[i].GENERAL_SUM.indexOf('.') != -1) {
                        var bclg = j[i].GENERAL_SUM.split('.')
                        bclg = bclg[1]
                        bclg = (bclg.length == 1) ? '0' : ''
                        j[i].GENERAL_SUM = j[i].GENERAL_SUM + bclg
                    }
                    if (j[i].GENERAL_SUM.indexOf(',') != -1) {
                        var bclg = j[i].GENERAL_SUM.split(',')
                        bclg = bclg[1]
                        bclg = (bclg.length == 1) ? '0' : ''
                        j[i].GENERAL_SUM = j[i].GENERAL_SUM + bclg
                    }
                }
                j[i].BACKLOG_START = (j[i].BACKLOG_START == null) ? '' : j[i].BACKLOG_START
                if (j[i].BACKLOG_START.length != 0 && j[i].BACKLOG_START.indexOf('.') == -1 && j[i].BACKLOG_START.indexOf(',') == -1) {
                    j[i].BACKLOG_START = j[i].BACKLOG_START + ".00"
                }
                else {
                    if (j[i].BACKLOG_START.indexOf('.') != -1) {
                        var bclg = j[i].BACKLOG_START.split('.')
                        bclg = bclg[1]
                        bclg = (bclg.length == 1) ? '0' : ''
                        j[i].BACKLOG_START = j[i].BACKLOG_START + bclg
                    }
                    if (j[i].BACKLOG_START.indexOf(',') != -1) {
                        var bclg = j[i].BACKLOG_START.split(',')
                        bclg = bclg[1]
                        bclg = (bclg.length == 1) ? '0' : ''
                        j[i].BACKLOG_START = j[i].BACKLOG_START + bclg
                    }
                }

                if (j[i].ACCURED_SUMM.indexOf('.') == -1 && j[i].ACCURED_SUMM.indexOf(',') == -1) {
                    j[i].ACCURED_SUMM = j[i].ACCURED_SUMM + ".00"
                }
                else {
                    if (j[i].ACCURED_SUMM.indexOf('.') != -1) {
                        var bclg = j[i].ACCURED_SUMM.split('.')
                        bclg = bclg[1]
                        bclg = (bclg.length == 1) ? '0' : ''
                        j[i].ACCURED_SUMM = j[i].ACCURED_SUMM + bclg
                    }
                    if (j[i].ACCURED_SUMM.indexOf(',') != -1) {
                        var bclg = j[i].ACCURED_SUMM.split(',')
                        bclg = bclg[1]
                        bclg = (bclg.length == 1) ? '0' : ''
                        j[i].ACCURED_SUMM = j[i].ACCURED_SUMM + bclg
                    }
                }









                if (j[i].MONTH_BEGIN.indexOf('.') == -1 && j[i].MONTH_BEGIN.indexOf(',') == -1) {
                    j[i].MONTH_BEGIN = j[i].MONTH_BEGIN + ".00"
                }
                else {
                    if (j[i].MONTH_BEGIN.indexOf('.') != -1) {
                        var bclg = j[i].MONTH_BEGIN.split('.')
                        bclg = bclg[1]
                        bclg = (bclg.length == 1) ? '0' : ''
                        j[i].MONTH_BEGIN = j[i].MONTH_BEGIN + bclg
                    }
                    if (j[i].MONTH_BEGIN.indexOf(',') != -1) {
                        var bclg = j[i].MONTH_BEGIN.split(',')
                        bclg = bclg[1]
                        bclg = (bclg.length == 1) ? '0' : ''
                        j[i].MONTH_BEGIN = j[i].MONTH_BEGIN + bclg
                    }
                }

                //<td><input style="float:left" ' + checked + ' type="checkbox" onclick="Payed(this)"/></td>
                $(table).append('<tr data-detCount=' + j[i].DetCount + '><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + ' data-month=' + j[i].MONTH_BEGIN + '><a style="cursor: pointer;" onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')">' + j[i].DATA_MOUNTH_YEAR + '</a></td><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + '><a style="cursor: pointer;" onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')">' + j[i].BACKLOG_START + '</a></td><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + '><a style="cursor: pointer;" onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')">' + j[i].ACCURED_SUMM + '</a></td><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + '><a style="cursor: pointer;" onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')">' + j[i].RECEIVED + '</a></td><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + '><a style="cursor: pointer;" onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')">' + j[i].GENERAL_SUM + '</a></td><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + ' style="display:none"><a onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')" style="pointer;">' + PAY_DATE + '</a></td></tr>')
            }
        }
    })
}
function GetRFP_KONSTANTIN(score, table) {

    var obj = { 'id': '', 'login': score, 'month': '', 'type': '' };
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + '//WCFServices/MATORIN.QUICK_API.svc/Get_accural_payments',
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log('payes')
            console.log(data);
            var array = data.ResultData
            array = array.RECORDS;

            var groupArray = array.reduce(function (result, current) {
                result[current.MONTH.replace(' ', '_')] = result[current.MONTH.replace(' ', '_')] || [];
                result[current.MONTH.replace(' ', '_')].push(current);
                return result;
            }, {});
            console.log('payesGroup')
            console.log(groupArray);
            $(groupArray).each(function (idx, obj) {
                $.each(obj, function (key, value) {
                    ////console.log(key + ' : ' + value[8].SERVICE);
                    $(table).data(key, value);
                    for (var i = 0; i < value.length; i++) {

                        if (value[i].SERVICE.indexOf('Итого за') != -1) {
                            //  var checked = (value[i].PAYED == "") ? "" : "checked='true'"
                            //  var PayButton = (value[i].PAYED == "") ? '<span class="txtRt" onclick="PayThis(this,0)" style="margin-right:-120px; margin-top:-5px;"><a   title="Оплатить" class="btn" style="background:  rgb(80, 0, 0);width:100px;color: #fff;border-radius: 0 15px 15px 0;">Оплатить</a></span>' : '';

                            /*<td><input type="checkbox" disabled="disabled" ' + checked + '/>' + PayButton + '</td>
                             */
                            $(table).append('<tr data-guid=' + value[i].PAY_GUID + ' onclick="ShowDetail_K(this)"><td itemid=' + key + '><a style="cursor: pointer;" >' + value[i].MONTH + '</a></td><td itemid=\"' + key + '\"><a style="cursor: pointer;" >' + value[i].ONBEGIN + '</a></td><td itemid=' + key + '><a style="cursor: pointer;" >' + value[i].CONSTANT + '</a></td><td itemid=' + key + '><a style="cursor: pointer;" >' + value[i].PAYMENTS + '</a></td><td itemid=' + key + '><a style="cursor: pointer;" >' + value[i].ONEND + '</a></td></tr>')
                        }
                        /*  
                   
     */
                    }
                })
            })
            $('.ui-loader-background').hide();
            $('#loader').hide();
        }
    })

}
function GetRFP_history_KONSTANTIN(sc, table) {


    var obj = { 'login': sc };
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + '//WCFServices/MATORIN.QUICK_API.svc/Get_bank_payments',
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            ////console.log(data);
            var array = data.ResultData
            array = array.RECORDS;
            for (var i = 0; i < array.length; i++) {
                $(table).append('<tr><td>' + array[i].PAY_DATE + '</td><td>' + array[i].PAY_SUMM + '</td></tr>')
            }

        }
    })
}

function ShowDetail(e, rfp_Id) {
    $('#table1').remove();
    $(e).parent().parent().parent().children('tr').css('background-color', 'white');
    $(e).parent().parent().css('background-color', 'lightskyblue')
    var trIndex = $(e).parent().parent().index();
    $(e).parent().parent().parent().parent().parent().children('#AddNac').attr('onclick', 'AddNac(this,' + trIndex + ')')
    var payedCHeck = $(e).parent().parent().children('td:last').children('input[type="checkbox"]').prop('checked')
    if (payedCHeck == false) {
        $(e).parent().parent().parent().parent().parent().children('#DelPay').attr('onclick', 'DeletingPay(this,"' + rfp_Id + '")')
        $(e).parent().parent().parent().parent().parent().children('#DelPay').removeAttr('disabled')
        $(e).parent().parent().parent().parent().parent().children('#AddNac').removeAttr('disabled')
    }
    else {
        $(e).parent().parent().parent().parent().parent().children('#AddNac').attr('disabled', 'disabled')
    }

    var Obj = { "rfpId": rfp_Id }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/GetDailInf",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsond = JSON.parse(data.d);
            ////console.log(jsond)
            /*
             <td>Льготы субсидии</td><td>Перерасчеты (+/-)</td>

<td> Оплачено</td>
             */
            $(e).parent().parent().after('<tr id="table1" data-rfpid=' + rfp_Id + '><td colspan="3"><table class="table listSrv" style="margin:1em;" id="servicesList"><thead><tr><td rowspan="2"></td><td>Объем услуг</td><td>Ед.изм.</td><td>Тариф руб/ед.</td><td>Льготы субсидии</td><td>Перерасчеты (+/-)</td><td>Итого Начислено</td></tr></thead><tbody id="detBody">  </tbody></table></td></tr>')
            //   $(e).parent().parent('tr').attr('data-detCount', jsond.length)
            for (var i = 0; i < jsond.length; i++) {
                if (jsond.length != 0) {
                    var checked = (jsond[i].PAYED == null || jsond[i].PAYED.length == 0) ? "" : "checked='true'"
                    if (jsond[i].ACCURED_SUMM.indexOf('.') == -1 && jsond[i].ACCURED_SUMM.indexOf(',') == -1) {
                        jsond[i].ACCURED_SUMM = jsond[i].ACCURED_SUMM + ".00"
                    }
                    else {
                        if (jsond[i].ACCURED_SUMM.indexOf('.') != -1) {
                            var bclg = jsond[i].ACCURED_SUMM.split('.')
                            bclg = bclg[1]
                            bclg = (bclg.length == 1) ? '0' : ''
                            jsond[i].ACCURED_SUMM = jsond[i].ACCURED_SUMM + bclg
                        }
                        if (jsond[i].ACCURED_SUMM.indexOf(',') != -1) {
                            var bclg = jsond[i].ACCURED_SUMM.split(',')
                            bclg = bclg[1]
                            bclg = (bclg.length == 1) ? '0' : ''
                            jsond[i].ACCURED_SUMM = jsond[i].ACCURED_SUMM + bclg
                        }
                    }
                    //$(e).parent().parent().after('<td colspan="3"><table class="table listSrv" style="margin:1em;" id="servicesList"><tbody><tr><td>' + jsond[i].SERVICE_NAME + '</td><td>' + jsond[i].ACCURED_SUMM + '</td></tr></tbody></table></td>');
                    /*<td><input class="chkBox" type="checkbox" ' + checked + ' onclick="PayedDetail(this,' + jsond[i].DETAIL_INF_ID+')"/></td>*/

                    //var MONTH_BEGIN = (jsond[i].MONTH_BEGIN.length != 0) ? 'data-month=' + jsond[i].MONTH_BEGIN.substring(0, 10) + '' : '';

                    /*
                     <td>' + jsond[i].PRIVILEGES + '</td><td>' + jsond[i].RECALCULATIONS + '</td>

<td><input class="chkBox" type="checkbox" ' + checked + ' onclick="PayedDetail(this,' + jsond[i].DETAIL_INF_ID + ')"/></td>
                     */

                    $(e).parent().parent().next('tr').children('td').children('.listSrv').children('#detBody').append('<tr style="cursor:pointer" data-typeId=' + jsond[i].RECIEPT_F_P_ID + ' onclick="Selection(this,' + jsond[i].DETAIL_INF_ID + ')"><td  data-fixed=' + jsond[i].FIXED + '>' + jsond[i].SERVICE_NAME + '</td><td>' + jsond[i].VOLUME + '</td><td>' + jsond[i].EDIZM + '</td><td>' + jsond[i].TARIF + '</td><td>' + jsond[i].PRIVILEGES + '</td><td>' + jsond[i].RECALCULATIONS + '</td><td data-nacId=' + jsond[i].RFP_SERVICE_ID + ' data-dtId=' + jsond[i].DETAIL_INF_ID + '>' + jsond[i].ACCURED_SUMM + '</td> </tr>')
                }
            }
        }
    })
}
function ShowDetail_K(e) {

    var data_s = $(e).attr('data-s')
    var indexNumber = -1
    if (data_s == undefined) {
        $('#DelPay').show().removeAttr('disabled', 'disabled')
        $('.ui-loader-background').show();
        $('#loader').show();
        $('tr[data-s="selected"]').removeAttr('data-s')
        $(e).attr('data-s', 'selected');
        indexNumber = $(e).index();
        $('#AddNac').attr('onclick', 'AddNac(this,' + indexNumber + ')')
        $('#table1').remove();
        $(e).parent().children('tr').css('background-color', 'white');
        $(e).parent().children('tr').children('td').children('a').css('color', 'black');
        // $('#Pays .txtRt').remove()
        $(e).css('background-color', 'lightskyblue')
        $(e).children('td').children('a').css('color', 'black');

        var key = $(e).children('td:first').attr('itemid');
        var data = $(e).parent().data(key);
        //  //console.log(data);
        $(e).after('<tr id="table1"><td colspan="3"><table class="table listSrv" style="margin:1em;" id="servicesList"><thead><tr><td rowspan="2"></td><td>Объем услуг</td><td>Ед.изм.</td><td>Тариф руб/ед.</td><td>Льготы субсидии</td><td>Перерасчеты (+/-)</td><td>Итого Начислено</td></tr></thead><tbody id="detBody">  </tbody></table></td></tr>')

        for (var i = 0; i < data.length; i++) {
            if (data[i].SERVICE.indexOf('Итого по') == -1) {
                $(e).next('tr').children('td').children('.listSrv').children('#detBody').append('<tr data-guid=' + data[i].PAY_GUID + ' style="cursor: pointer;"><td >' + data[i].SERVICE + '</td><td >' + data[i].VOLUME + '</td><td>' + data[i].UNITS + '</td><td >' + data[i].TARIFF + '</td><td>' + data[i].LGOTA + '</td><td >' + data[i].RECALC + '</td><td>' + data[i].OVERALL + '</td></tr>')
            }
        }

        $('.ui-loader-background').hide();
        $('#loader').hide();
    }
    else {
        $(e).removeAttr('data-s');
        $('#table1').remove();
        $('#AddNac').attr('onclick', 'AddNac(this,' + indexNumber + ')')
        $(e).parent().children('tr').css('background-color', 'white');
        $('#DelPay').hide()
    }
}
function PayedDetail(e, detId) {
    var summery = $(e).parent().prev('td').text() + " руб.";
    var period = $('#table1').prev('tr').children('td:eq(0)').children('a').text()
    var service = $(e).parent().prev().prev().text();
    var result;
    if ($(e).prop('checked') == true) {
        result = confirm("Вы уверены, что хотите установить " + summery + " за " + period + " по " + service + " оплаченной?")
        if (result == true) {
            summery = $(e).parent().prev('td').text()
            var Accured = parseFloat($('#table1').prev('tr').children('td:eq(2)').children('a').text())
            //      Accured = parseFloat(Accured)
            Accured = parseInt(Accured) - parseFloat(summery);
            Accured = Accured.toFixed(2);
            var debt = parseFloat($('#table1').prev('tr').children('td:eq(1)').children('a').text())
            $('#table1').prev('tr').children('td:eq(2)').children('a').text(Accured)
            var End = parseFloat(debt) + parseFloat(Accured)
            $('#table1').prev('tr').children('td:eq(4)').children('a').text(End.toFixed(2))

            var AllSelected = "1";
            $('#detBody').children('tr').each(function () {
                var AllChkSelected = $(this).children('td:eq(2)').children('input[type="checkbox"]').prop('checked');
                if (AllChkSelected == false) {
                    AllSelected = "0"
                }
            })
            if (AllSelected == "1") {
                $('#table1').prev('tr').children('td:eq(6)').children('input[type="checkbox"]').prop('checked', true);
            }
            var obj = { "DetId": detId, "chk": "0", "Log": sessionStorage.getItem("Log"), "all": AllSelected, "Accured_Summ": Accured, "GENERAL_SUMM": End }
            DetPayedFunc(obj)

        }
        else {
            $(e).prop('checked', false);
            //  $(e).parent().after('<td><input type="button" id="delPayDet" onclick="deleteDetail(this,' + detId + ')" value="Удалить" class="btn genBtn"></td>')
        }
    }
    else {
        result = confirm("Вы уверены, что хотите снять оплату " + summery + " за " + period + " по " + service + "?")
        if (result == true) {
            summery = $(e).parent().prev('td').text()
            var Accured = parseFloat($('#table1').prev('tr').children('td:eq(2)').children('a').text())
            //      Accured = parseFloat(Accured)
            Accured = parseInt(Accured) + parseFloat(summery);
            Accured = Accured.toFixed(2);
            var debt = parseFloat($('#table1').prev('tr').children('td:eq(1)').children('a').text())
            $('#table1').prev('tr').children('td:eq(2)').children('a').text(Accured)
            var End = parseFloat(debt) + parseFloat(Accured)
            $('#table1').prev('tr').children('td:eq(4)').children('a').text(End.toFixed(2))
            //  $(e).parent().after('<td><input type="button" id="delPayDet" onclick="deleteDetail(this,' + detId + ')" value="Удалить" class="btn genBtn"></td>')
            var AllSelected = "0";
            $('#detBody').children('tr').each(function () {
                var AllChkSelected = $(this).children('td:eq(2)').children('input[type="checkbox"]').prop('checked');
                if (AllChkSelected == false) {
                    AllSelected = "0"
                }
            })
            if (AllSelected == "0") {
                $('#table1').prev('tr').children('td:eq(6)').children('input[type="checkbox"]').prop('checked', false);
            }
            var obj = { "DetId": detId, "chk": "1", "Log": sessionStorage.getItem("Log"), "all": AllSelected, "Accured_Summ": Accured, "GENERAL_SUMM": End }
            DetPayedFunc(obj)

        }
        else {
            $(e).prop('checked', true);
        }
    }
}

function DetPayedFunc(o) {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/PayedDetail",
        data: JSON.stringify(o),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (rfpId) {
            //  $('#delPayDet').parent().remove();
        }
    })
}
function Selection(e, dtId) {


    var CheckPayy = $('#table1').prev('tr').children('td:last').children('input[type="checkbox"]').prop('checked');
    if (CheckPayy == false) {
        var DetCheckPay = $(e).children('td:last').children('input[type="checkbox"]').prop('checked');
        if (DetCheckPay == false) {
            $('#delPayDet').parent().remove();
            $(e).append('<td><input type="button" id="delPayDet" onclick="deleteDetail(this,' + dtId + ')" value="Удалить" class="btn genBtn"></td>')

        }
    }

    $(e).parent('tbody').children('tr').css('background', '');
    $(e).css('background', 'gainsboro')
}
function deleteDetail(e, dtId) {
    $('#closeGEN').click(function () {
        $('#GenPass').hide();
    })
    $('#GenPass').children('.modal-content2').css('width', '30%');
    $('#mh3').text('Удалить')
    $('#GenPass').children('.modal-content2').children('div:eq(2)').empty();
    $('#GenPass').children('.modal-content2').children('div:eq(2)').append('<input type="button"   name="name" onclick="Deleting_Detail(this,' + dtId + ')" value="Удалить" style="float: left; width: 25%; height: 78%; background-color: white; color: black; font-weight: 700;"/>')

    $('#GenPass').children('.modal-content2').children('div:eq(2)').append('<input type="button" onclick="closing_deleting()" name="name" value="Отмена" style="width: 25%; float: right; height: 78%; background-color: white; color: black; font-weight: 700;">')
    var period = $('#table1').prev('tr').children('td:eq(0)').children('a').text();
    var service = $(e).parent().parent().children('td:eq(0)').text();
    var summ = $(e).parent().parent().children('td:eq(1)').text();
    $('#GenPass').children('.modal-content2').children('.modal-body2').empty()
    /*Вы действительно хотите удалить начисления по услуге [УСЛУГА] за [ПЕРИОД] в сумме [СУММА] руб.?*/
    $('#GenPass').children('.modal-content2').children('.modal-body2').append('<label style="font-size: x-large;font-weight: 500;">Вы действительно хотите удалить начисления по услуге ' + service + ' за ' + period + ' в сумме ' + summ + ' руб.?</label>');

    $('#GenPass').show();
}
function closing_deleting() {
    $('#GenPass').hide();
}
function AddPlatej(e) {
    var score = $(e).parent().parent().parent().children('.row').children('div').children('#lc').val();
    if (score.length != 0) {
        $('#myModalVp').show()
        getMonthsAndYearsPlatej();
        GetServicesByData($('#PeriodP').children('option:selected').text(), score)
        $(document).on('change', '#PeriodP', function () {
            var data = $(this).children('option:selected').text();
            GetServicesByData(data, score)
        })
    }
}
function GetServicesByData(dt, sc) {
    var Obj = { "sc": sc, "data": dt }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/GetSeledPaymentServices",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('.Vpdiv').remove();
            var jsond = JSON.parse(data.d);
            //$('.modal-bodyVp').children('.col-md-12').after('<div class="col-md-12 Vpdiv" itemid="0"><div class="col-md-3" style="width: 33%;"><label>Услуга</label><input type="text" id="srvP" disabled="disabled"></div><div class="col-md-3" style="width: 33%;"><label>Начислено:</label><input type="text" disabled="disabled"></div><div class="col-md-3" style="width: 33%;"><label id="platllbl">Постипула:</label><input type="number" onkeyup="Addingplat(this)" style="width: 100%" id="plat0"></div></div>')
            for (var i = 0; i < jsond.length; i++) {
                $('.modal-bodyVp').children('.col-md-12:eq(0)').after('<div class="col-md-12 Vpdiv" itemid=' + jsond[i].DETAIL_INF_ID + '><div class="col-md-3" style="width: 33%;"><label>Услуга</label><input type="text" id="srvP" value="' + jsond[i].SERVICE_NAME + '" disabled="disabled"></div><div class="col-md-3" style="width: 33%;"><label>Начислено:</label><input type="text" value="' + jsond[i].ACCURED_SUMM + '" disabled="disabled"></div><div class="col-md-3" style="width: 33%;"><label id="platllbl">Постипула:</label><input type="number" onkeyup="Addingplat(this)" style="width: 100%" value="' + jsond[i].PAYMENT_SUM + '" id="plat0"></div></div>')
            }
        }
    })
}
function AddVPToNac(ob, table) {

    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/PaymenSumUpdate",
        data: JSON.stringify(ob),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('.closeVp').click();

            var j = JSON.parse(data.d)
            $(table).empty();
            for (var i = 0; i < j.length; i++) {
                var total_SUM = parseFloat(j[i].ACCURED_SUMM) + parseFloat((j[i].PAYMENT_SUM.length != 0) ? j[i].PAYMENT_SUM : "0")
                var PAY_DATE = j[i].PAY_DATE.substr(0, j[i].PAY_DATE.indexOf(' '))
                $(table).append('<tr><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + '><a style="cursor: ns-resize;" onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')">' + j[i].DATA_MOUNTH_YEAR + '</a></td><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + '><a style="cursor: ns-resize;" onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')">' + j[i].BACKLOG_START + '</a></td><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + '><a style="cursor: ns-resize;" onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')">' + j[i].ACCURED_SUMM + '</a></td><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + '><a style="cursor: ns-resize;" onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')">' + j[i].PAYMENT_SUM + '</a></td><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + '><a style="cursor: ns-resize;" onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')">' + total_SUM + '</a></td><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + '><a onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')" style="cursor: ns-resize;">' + PAY_DATE + '</a></td></tr>')
            }
        }
    })
}
function showAddForm(dId, e) {
    if ($(e).attr('data-open') == "on") {
        $('#GroupS').children('.col-md-12').attr('class', 'col-md-12 box');
        $('#GroupS .col-md-12').each(function () {
            $(this).children('.col-md-1').attr('disabled', 'disabled')
        });
        $('#ServiceCost').remove();
        $('#GrupServices').children('.col-md-12').attr('class', 'col-md-12 box');
        $('#GrupServices .col-md-12').each(function () {
            $(this).children('.col-md-1').attr('disabled', 'disabled')
            $(this).children('.btn').attr('disabled', 'disabled')
        });
        getEdizm();
        $(e).attr('data-open', 'off')
        $(e).val('Убрать Форм').removeAttr('disabled');
        $('#GrupServices').css('width', '162%')
        $(e).parent().attr('class', 'col-md-12')
        //  $('#AddingForm').remove();
        $(e).after('<div id="AddingForm" class="margTop0"><label itemid="144" class="checkBx" style="margin-left: 2px !important;">Добавить новую услугу</label><input type="text" id="servName" class="col-md-1"   data-g="24" itemid="24"><input id="isQuantity" data-g=' + dId + ' type="checkbox"><label style="margin-left: 25px !important;">Исчисляемый</label><label>Единица измерения</label><select id="edizm" style="width: 69%;"><option value="0">Выберите единица измерения</option></select><input type= "button" class="btn genBtn" id="EdizmAdding" value= "+" style= "font-size: 30px;height: 32px;line-height: 1px;margin-bottom: 5px;WIDTH: 5px !important;" onclick= "showTextForEdizm(this)" > <input type="text" id="edizmT" style="width: 40%;display:none"><input type="button" class="btn genBtn" value="Добавить" id="edizmbutton" style="display:none;height: 26px;line-height: 1px;margin-bottom: 5px;WIDTH: 50%;" onclick="SaveEdizm(this)"><input type="button" class="btn genBtn" onclick=SaveProductServ(this,' + dId + ') value="Сохранить услугу"><hr/></div>')
    }
    else {
        $(e).attr('data-open', 'on');
        $(e).next().remove();
        $(e).val('Добавить Услугу')
        $('#GrupServices').css('width', '100%')
        $('#GroupS').children('.col-md-12').attr('class', 'col-md-12');
        $('#GroupS .col-md-12').each(function () {
            $(this).children('.col-md-1').removeAttr('disabled')
        });

        $('#GrupServices').children('.col-md-12').attr('class', 'col-md-12');
        $('#GrupServices .col-md-12').each(function () {
            $(this).children('.col-md-1').removeAttr('disabled')
            $(this).children('.btn').removeAttr('disabled')
        });
    }

}
function Addingplat(e) {
    if ($(e).val() < 0) {
        $(e).val('0');
    }
    var totalPlat = 0
    $('.Vpdiv ').each(function () {
        var platsum = $(this).children('div:eq(2)').children('#plat0').val();
        if (platsum.length != 0 && platsum != 0) {

            totalPlat = parseFloat(totalPlat) + parseFloat(platsum);
        }
    })
    $('#sumplat').val(totalPlat)
}
function AddNac(e, trIndex) {

    if (trIndex == -1) {
        var score = $(e).parent().parent().parent().children('.row').children('div').children('#lc').val();
        if (score.length != 0) {
            var ExistOrNot = false
            var SelectedMandY;
            var BackLog;
            var tbody = $(e).parent().children('.table').children('tbody').attr('id')
            $('.modal-bodyVn').attr('data-ls', score).attr('data-tbody', tbody)
            var Recieved;
            var GeneralSumm;
            var rfpId = 0
            $('#myModalVn').show()
            GetTipNac(-1, "");
            getMonthsAndYears("");
            var sPeriod = $('#Period').children('option:selected').text();
            var Payed
            $('.tab-content').children('.active').children('#Paying').children('div:eq(0)').children('.table').children('tbody').children('tr').each(function () {
                var currPeriod = $(this).children('td:eq(0)').children('a').text()
                if (currPeriod == sPeriod) {
                    $(this).children('td:eq(0)').children('a').click();
                    rfpId = $(this).children('td:eq(0)').attr('itemid')
                    SelectedMandY = currPeriod
                    BackLog = $(this).children('td:eq(1)').children('a').text()
                    Recieved = $(this).children('td:eq(3)').children('a').text();
                    GeneralSumm = $(this).children('td:eq(4)').children('a').text();
                    detTrcount = $(this).attr('data-detcount');
                    Payed = $(this).children('td:last').children('input[type="checkbox"]').prop('checked');
                    ExistOrNot = true
                }
                if (Payed == true) {
                    $('#AddVn').attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)')
                }
                else {
                    $('#AddVn').removeAttr('disabled').css('background-color', 'white')
                }
            })
            if (ExistOrNot == true) {

                $('#Received').val(Recieved)
                $('#BackLog').val(BackLog)
                $('#sumNac').val(GeneralSumm)
                getMonthsAndYears(SelectedMandY);
                $('.vndiv').remove()
                var Obj = { "rfpId": rfpId }
                $.ajax({
                    error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
                    type: "POST",
                    url: "AddApartment.aspx/GetExistDetail",
                    data: JSON.stringify(Obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var jsond = JSON.parse(data.d);
                        for (var i = jsond.length - 1; i >= 0; i--) {
                            if (jsond[i].ACCURED_SUMM.indexOf('.') == -1 && jsond[i].ACCURED_SUMM.indexOf(',') == -1) {
                                jsond[i].ACCURED_SUMM = jsond[i].ACCURED_SUMM + ".00"
                            }
                            else {
                                if (jsond[i].ACCURED_SUMM.indexOf('.') != -1) {
                                    var bclg = jsond[i].ACCURED_SUMM.split('.')
                                    bclg = bclg[1]
                                    bclg = (bclg.length == 1) ? '0' : ''
                                    jsond[i].ACCURED_SUMM = jsond[i].ACCURED_SUMM + bclg
                                }
                                if (jsond[i].ACCURED_SUMM.indexOf(',') != -1) {
                                    var bclg = jsond[i].ACCURED_SUMM.split(',')
                                    bclg = bclg[1]
                                    bclg = (bclg.length == 1) ? '0' : ''
                                    jsond[i].ACCURED_SUMM = jsond[i].ACCURED_SUMM + bclg
                                }
                            }

                            var disabled = (jsond[i].PAYED == null) ? "" : "disabled=disabled"
                            var payed = (jsond[i].PAYED == null) ? "data-payed=0" : "data-payed=1"
                            var removingOperation = (jsond[i].PAYED == null) ? '<span id ="removingNac" onclick = "RemoveNacDiv(this)" style = "float: right;color:red;font-size:20px;font-weight:900;" >x</span >' : ''
                            $('.modal-bodyVn').children('div:eq(0)').after('<div class="col-md-12 vndiv"' + payed + ' itemid="0"><div class="col-md-3" style="width: 33%;"><label>Тип начисления/платежа:</label><select ' + disabled + ' onchange="getRelationService(this)" id="tipN0"><option value="0">Выберите тип начисление</option></select></div><div class="col-md-3" style="width: 33%;"><label>Услуга:</label><select ' + disabled + ' id="srv"><option value="0">Выберите услуги</option></select></div><div class="col-md-3" style="width: 33%;">' + removingOperation + '<label id="Nacllbl">Начислено:</label><input ' + disabled + ' type="number" onkeyup="AddingNac(this)" value=' + jsond[i].ACCURED_SUMM + ' style="width: 100%" id="Nac0"></div></div>')

                            GetTipNac(i, jsond[i].RFP_TYPE_ID + "|" + jsond[i].RFP_SERVICE_ID);
                        }
                        if (jsond.length == 1) {
                            $('#removingNac').remove();
                        }
                    }
                })


                //var detailcount = $('.tab-content').children('.active').children('#Paying').children('div:eq(0)').children('.table').children('#table1').length

                //     $('.vndiv').remove()

                //    for (var i = detTrcount - 1; i >= 0; i--) {
                //        var removingNac = (i == 0) ? ' ' : '<span id = "removingNac" onclick = "RemoveNacDiv(this)" style ="float: right;color:red;font-size:20px;font-weight:900;" > x</span>'
                //        var s = $('.tab-content').children('.active').children('#Paying').children('div:eq(0)').children('.table').children('tbody').children('#table1').children('td:eq(0)').children('.table').children('#detBody').children('tr:eq(' + i + ')').attr('data-typeid')

                //        //$(e).parent().children('.table').children('tbody').children('tr:eq(' + trIndex + ')').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').attr('data-typeid')

                //        var sNac = $('.tab-content').children('.active').children('#Paying').children('div:eq(0)').children('.table').children('tbody').children('#table1').children('td:eq(0)').children('.table').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(1)').attr('data-nacId');

                //        //$(e).parent().children('.table').children('tbody').children('tr:eq(' + trIndex + ')').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(1)').attr('data-nacId');
                //        s = s + "|" + sNac
                //        //  var j = (detTrcount - i)
                //        var NacValue = $('.tab-content').children('.active').children('#Paying').children('div:eq(0)').children('.table').children('tbody').children('#table1').children('td:eq(0)').children('.table').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(1)').text()
                //        //$(e).parent().children('.table').children('tbody').children('tr:eq(' + trIndex + ')').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(1)').text()

                //        $('.modal-bodyVn').children('div:eq(0)').after('<div class="col-md-12 vndiv" itemid="0"><div class="col-md-3" style="width: 33%;"><label>Тип начисления/платежа:</label><select onchange="getRelationService(this)" id="tipN0"><option value="0">Выберите тип начисление</option></select></div><div class="col-md-3" style="width: 33%;"><label>Услуга:</label><select id="srv"><option value="0">Выберите услуги</option></select></div><div class="col-md-3" style="width: 33%;">' + removingNac + '<label id="Nacllbl">Начислено:</label><input type="number" onkeyup="AddingNac(this)" value=' + NacValue + ' style="width: 100%" id="Nac0"></div></div>')
                //        GetTipNac(i, s);

                //    }




            }
            else {
                $('.vndiv:not(:first)').remove();
                $('.vndiv').children('div:eq(0)').children('#tipN0').val(0)
                $('.vndiv').children('div:eq(1)').children('#srv').val(0)
                $('.vndiv').children('div:eq(2)').children('#Nac0').val('0.00')
                $('#removingNac').remove();
                $('#Received,#BackLog,#sumNac').val('0.00')
            }

        }
        else {
            $('#errlc').remove()
            $(e).parent().parent().parent().children('.row').children('div').children('#lc').after('<label id="errlc" style="color:red">Необходимо заполнит поля для лицевой счет</label>')
            window.setTimeout(function () {

                $('#errlc').remove();
            }, 3000)
        }

    }
    else {
        $('#myModalVn').show()
        //GetTipNac();$('.tab-content').find('.active').find('#Paying').find('.table').
        var SelectedMandY = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').find('td:eq(0)').children('a').text()//$(e).parent().children('.table').children('tbody').children('tr:eq(' + trIndex + ')').children('td:eq(0)').children('a').text()
        var ONBEGIN = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').find('td:eq(1)').children('a').text()
        ONBEGIN = parseFloat(ONBEGIN.replace(',', '.'))
        var BackLog = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').find('td:eq(1)').children('a').text()
        var Accured = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').find('td:eq(2)').children('a').text()
        Accured = parseFloat(Accured.replace(',', '.'))
        var Recieved = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').find('td:eq(3)').children('a').text()
        Recieved = parseFloat(Recieved.replace(',', '.'))
        var GeneralSumm = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').find('td:eq(4)').children('a').text()
        GeneralSumm = parseFloat(GeneralSumm.replace(',', '.'));

        $('#PAYMENTS').val(Recieved)
        $('#BackLog').val(BackLog)
        $('#sumNac').val(GeneralSumm)
        $('#Period').val(SelectedMandY)
        $('#ONBEGIN').val(ONBEGIN);
        $('#OVERALL').val(Accured)
        $('#ONEND').val(GeneralSumm)
        // getMonthsAndYears(SelectedMandY);

        var detTrcount = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr').length

        var month_begin = $(e).parent().children('.table').children('tbody').children('tr:eq(' + trIndex + ')').children('td:eq(0)').attr('data-month')
        $('#month_begin').val(month_begin)
        $('.vndiv').remove();//<td>Постоянные:</td>
        $('.modal-bodyVn').children('div:eq(0)').after('<div class="col-md-12 vndiv" itemid="0"><table id="vnTable" class="table"><thead><tr><td>Услуга:</td><td>Объем услуг:</td><td>Ед.изм.:</td><td>Тариф руб/ед:</td><td>Льготы субсидии:</td><td>Перерасчеты (+/-):</td><td>Начислено:</td></tr></thead><tbody id="vnTableBody"></tbody></table></div>')
        for (var i = 0; i < detTrcount; i++) {
            //var removingNac = (i == 0) ? ' ' : '<span id = "removingNac" onclick = "RemoveNacDiv(this)" style ="float: right;color:red;font-size:20px;font-weight:900;" > x</span>'
            var checkedPayed = false// $(e).parent().children('.table').children('tbody').children('tr:eq(' + trIndex + ')').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(7)').children('input[type="checkbox"]').prop('checked')

            var disabled = (checkedPayed == false) ? "" : "disabled=disabled"
            var payed = (checkedPayed == false) ? "data-payed=0" : "data-payed=1"
            var removingOperation = (checkedPayed == false) ? '<td><span id ="removingNac" onclick = "RemoveNacDiv(this)" style = "float: right;color:red;font-size:20px;font-weight:900;">x</span></td>' : ''
            var s = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').attr('data-typeid')
            var sNac = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(6)').attr('data-nacId');
            s = s + "|" + sNac
            //  var j = (detTrcount - i)
            var SERVICES = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(0)').text()


            var NacValue = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(6)').text()
            NacValue = parseFloat(NacValue.replace(',', '.'))

            var VOLUME = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(1)').text()

            var EDIZM = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(2)').text()
            EDIZM = (EDIZM.length != 0) ? 'value=' + EDIZM + '' : '';

            var TARIF = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(3)').text()

            TARIF = parseFloat(TARIF.replace(',', '.'))

            var PRIVILEGES = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(4)').text()
            PRIVILEGES = parseFloat(PRIVILEGES.replace(',', '.'))
            var RECALCULATIONS = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(5)').text()
            RECALCULATIONS = parseFloat(RECALCULATIONS.replace(',', '.'))
            var data_S_guid = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').attr('data-guid')
            //var MONTH_BEGIN = $(e).parent().children('.table').children('tbody').children('tr:eq(' + trIndex + ')').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(0)').attr('data-month')
            //MONTH_BEGIN = (MONTH_BEGIN != undefined) ? MONTH_BEGIN.split('.').reverse().join('-') : '';
            //MONTH_BEGIN = (MONTH_BEGIN.length != 0) ? 'value=' + MONTH_BEGIN + '' : '';

            var ISFIXED = $(e).parent().children('.table').children('tbody').children('tr:eq(' + trIndex + ')').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(0)').attr('data-fixed')
            //ISFIXED = (ISFIXED == "True") ? 'checked=true' : '';

            VOLUME = parseFloat(VOLUME.replace(',', '.'));
            //<td><input type="number" ' + disabled + 'value=' + ISFIXED + '   style="width: 100%"></td>
            $('#vnTableBody').append('<tr data-guid=' + data_S_guid + '><td><input type="text" id="srv" ' + disabled + ' value=\"' + SERVICES + '\"></td><td><input type="number" ' + disabled + ' value=' + VOLUME + '   style="width: 100%"></td><td><input type="text"  ' + disabled + ' ' + EDIZM + '  style="width: 100%"></td><td><input  type="number"  ' + disabled + ' value=' + TARIF + ' style="width: 100%" ></td><td><input type="number" ' + disabled + ' value=' + PRIVILEGES + ' style="width: 100%"></td><td><input  type="number" ' + disabled + ' value=' + RECALCULATIONS + ' style="width: 100%"></td><td><input type="number" ' + disabled + ' onkeyup="AddingNac(this)"  style="width: 100%" value=' + NacValue + ' id="Nac0"></td>' + removingOperation + '</tr>')

            /*<div class="col-md-12 vndiv" ' + payed + ' itemid="0"><div class="col-md-3" style="width: 33%;"><label>Тип начисления/платежа:</label><select onchange="getRelationService(this)" ' + disabled + ' id="tipN0"><option value="0">Выберите тип начисление</option></select></div><div class="col-md-3" style="width: 33%;"><label>Услуга:</label><select id="srv" ' + disabled + '><option value="0">Выберите услуги</option></select></div><div class="col-md-3" style="width: 33%;">' + removingOperation + '<label id="Nacllbl">Начислено:</label><input  type="number" ' + disabled + ' onkeyup="AddingNac(this)" value=' + NacValue + ' style="width: 100%" id="Nac0"></div></div>*/


            //$('.modal-bodyVn').children('div:eq(0)').after('<div class="col-md-12 vndiv" ' + payed + ' itemid="0"><div class="col-md-2"><label>Тип начисления/платежа:</label><select onchange="getRelationService(this)" ' + disabled + ' id="tipN0"><option value="0">Выберите тип начисление</option></select></div><div class="col-md-2"><label>Услуга:</label><select id="srv" ' + disabled + '><option value="0">Выберите услуги</option></select></div><div class="col-md-1"><label>Объем услуг:</label><input type="number" ' + disabled + ' value=' + VOLUME + '   style="width: 100%"></div><div class="col-md-1"><label >Ед.изм.:</label><input type="text"  ' + disabled + ' ' + EDIZM + '  style="width: 100%"></div><div class="col-md-1"><label>Тариф руб/ед:</label><input  type="number"  ' + disabled + ' value=' + TARIF + ' style="width: 100%" ></div><div class="col-md-1"><label >Постоянные:</label><input type="text" ' + disabled + 'value='+ISFIXED+'   style="width: 100%"></div><div class="col-md-1"><label >Льготы субсидии:</label><input type="number" ' + disabled + ' value=' + PRIVILEGES + ' style="width: 100%"></div><div class="col-md-1"><label>Перерасчеты (+/-):</label><input  type="number" ' + disabled + ' value=' + RECALCULATIONS + ' style="width: 100%"></div><div class="col-md-1">' + removingOperation + '<label id="Nacllbl">Начислено:</label><input type="number" ' + disabled + ' onkeyup="AddingNac(this)"  style="width: 100%" value=' + NacValue + ' id="Nac0"></div>')

            //  GetTipNac(i, s);

        }
        if (detTrcount == 1) {
            $('#removingNac').remove();
        }


    }
}
function CheckCurrentRfp(e) {
    var sPeriod = $(e).children('option:selected').text();
    var ExistOrNot = false
    var SelectedMandY;
    var BackLog;
    var Payed;
    var Recieved;
    var GeneralSumm;
    var rfpId = 0
    //$(e).parent().children('.table').children('tbody').children('tr:eq(' + trIndex + ')').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr').length
    $('.tab-content').children('.active').children('#Paying').children('div:eq(0)').children('.table').children('tbody').children('tr').each(function () {
        var currPeriod = $(this).children('td:eq(0)').children('a').text()
        if (currPeriod == sPeriod) {
            $(this).children('td:eq(0)').children('a').click();
            rfpId = $(this).children('td:eq(0)').attr('itemid')
            SelectedMandY = currPeriod
            BackLog = $(this).children('td:eq(1)').children('a').text()
            Recieved = $(this).children('td:eq(3)').children('a').text();
            GeneralSumm = $(this).children('td:eq(4)').children('a').text();
            detTrcount = $(this).attr('data-detcount');
            ExistOrNot = true
            Payed = $(this).children('td:last').children('input[type="checkbox"]').prop('checked');


        }
        if (Payed == true) {
            $('#AddVn').attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)')
        }
        else {
            $('#AddVn').removeAttr('disabled').css('background-color', 'white')
        }
    })
    if (ExistOrNot == true) {

        $('#Received').val(Recieved)
        $('#BackLog').val(BackLog)
        $('#sumNac').val(GeneralSumm)
        getMonthsAndYears(SelectedMandY);
        $('.vndiv').remove()
        var Obj = { "rfpId": rfpId }
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "AddApartment.aspx/GetExistDetail",
            data: JSON.stringify(Obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsond = JSON.parse(data.d);
                for (var i = jsond.length - 1; i >= 0; i--) {
                    if (jsond[i].ACCURED_SUMM.indexOf('.') == -1 && jsond[i].ACCURED_SUMM.indexOf(',') == -1) {
                        jsond[i].ACCURED_SUMM = jsond[i].ACCURED_SUMM + ".00"
                    }
                    else {
                        if (jsond[i].ACCURED_SUMM.indexOf('.') != -1) {
                            var bclg = jsond[i].ACCURED_SUMM.split('.')
                            bclg = bclg[1]
                            bclg = (bclg.length == 1) ? '0' : ''
                            jsond[i].ACCURED_SUMM = jsond[i].ACCURED_SUMM + bclg
                        }
                        if (jsond[i].ACCURED_SUMM.indexOf(',') != -1) {
                            var bclg = jsond[i].ACCURED_SUMM.split(',')
                            bclg = bclg[1]
                            bclg = (bclg.length == 1) ? '0' : ''
                            jsond[i].ACCURED_SUMM = jsond[i].ACCURED_SUMM + bclg
                        }
                    }

                    var disabled = (jsond[i].PAYED == null || jsond[i].PAYED.length == 0) ? "" : "disabled=disabled"
                    var payed = (jsond[i].PAYED == null || jsond[i].PAYED.length == 0) ? "data-payed=0" : "data-payed=1"
                    var removingOperation = (jsond[i].PAYED == null || jsond[i].PAYED.length == 0) ? '<span id ="removingNac" onclick = "RemoveNacDiv(this)" style = "float: right;color:red;font-size:20px;font-weight:900;" >x</span >' : ''

                    var VOLUME = jsond[i].VOLUME;
                    var EDIZM = jsond[i].EDIZM;
                    var TARIF = jsond[i].TARIF;
                    var PRIVILEGES = jsond[i].PRIVILEGES;
                    var RECALCULATIONS = jsond[i].RECALCULATIONS;
                    var MONTH_BEGIN = jsond[i].MONTH_BEGIN.substring(0, 10);
                    MONTH_BEGIN = (MONTH_BEGIN.length != 0) ? MONTH_BEGIN.split('.').reverse().join('-') : '';
                    MONTH_BEGIN = (MONTH_BEGIN.length != 0) ? 'value=' + MONTH_BEGIN + '' : '';
                    var ISFIXED = jsond[i].FIXED;
                    ISFIXED = (ISFIXED == "True") ? 'checked=true' : '';

                    EDIZM = (EDIZM.length != 0) ? 'value=' + EDIZM + '' : '';
                    //$('.modal-bodyVn').children('div:eq(0)').after('<div class="col-md-12 vndiv" ' + payed+' itemid="0"><div class="col-md-3" style="width: 33%;"><label>Тип начисления/платежа:</label><select ' + disabled + ' onchange="getRelationService(this)" id="tipN0"><option value="0">Выберите тип начисление</option></select></div><div class="col-md-3" style="width: 33%;"><label>Услуга:</label><select ' + disabled + ' id="srv"><option value="0">Выберите услуги</option></select></div><div class="col-md-3" style="width: 33%;">' + removingOperation + '<label id="Nacllbl">Начислено:</label><input ' + disabled + ' type="number" onkeyup="AddingNac(this)" value=' + jsond[i].ACCURED_SUMM + ' style="width: 100%" id="Nac0"></div></div>')


                    $('.modal-bodyVn').children('div:eq(0)').after('<div class="col-md-12 vndiv" ' + payed + ' itemid="0"><div class="col-md-2"><label>Тип начисления/платежа:</label><select onchange="getRelationService(this)" ' + disabled + ' id="tipN0"><option value="0">Выберите тип начисление</option></select></div><div class="col-md-2"><label>Услуга:</label><select id="srv" ' + disabled + '><option value="0">Выберите услуги</option></select></div><div class="col-md-1"><label>Объем услуг:</label><input type="number" ' + disabled + ' value=' + VOLUME + '   style="width: 100%"></div><div class="col-md-1"><label >Ед.изм.:</label><input type="text"  ' + disabled + ' ' + EDIZM + '  style="width: 100%"></div><div class="col-md-1"><label>Тариф руб/ед:</label><input  type="number"  ' + disabled + ' value=' + TARIF + ' style="width: 100%" ></div><div class="col-md-1"><label>На начало месяца:</label><input type="date" ' + disabled + '  ' + MONTH_BEGIN + ' style="width: 100%" ></div><div class="col-md-1"><label >Постоянные:</label><input type="checkbox" ' + disabled + ' ' + ISFIXED + '  style="width: 100%"></div><div class="col-md-1"><label >Льготы субсидии:</label><input type="number" ' + disabled + ' value=' + PRIVILEGES + ' style="width: 100%"></div><div class="col-md-1"><label>Перерасчеты (+/-):</label><input  type="number" ' + disabled + ' value=' + RECALCULATIONS + ' style="width: 100%"></div><div class="col-md-1">' + removingOperation + '<label id="Nacllbl">Начислено:</label><input type="number" ' + disabled + ' onkeyup="AddingNac(this)"  style="width: 100%" value=' + jsond[i].ACCURED_SUMM + ' id="Nac0"></div>')


                    GetTipNac(i, jsond[i].RFP_TYPE_ID + "|" + jsond[i].RFP_SERVICE_ID);
                }
                if (jsond.length == 1) {
                    $('#removingNac').remove();
                }
            }
        })


        //var detailcount = $('.tab-content').children('.active').children('#Paying').children('div:eq(0)').children('.table').children('#table1').length

        //     $('.vndiv').remove()

        //    for (var i = detTrcount - 1; i >= 0; i--) {
        //        var removingNac = (i == 0) ? ' ' : '<span id = "removingNac" onclick = "RemoveNacDiv(this)" style ="float: right;color:red;font-size:20px;font-weight:900;" > x</span>'
        //        var s = $('.tab-content').children('.active').children('#Paying').children('div:eq(0)').children('.table').children('tbody').children('#table1').children('td:eq(0)').children('.table').children('#detBody').children('tr:eq(' + i + ')').attr('data-typeid')

        //        //$(e).parent().children('.table').children('tbody').children('tr:eq(' + trIndex + ')').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').attr('data-typeid')

        //        var sNac = $('.tab-content').children('.active').children('#Paying').children('div:eq(0)').children('.table').children('tbody').children('#table1').children('td:eq(0)').children('.table').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(1)').attr('data-nacId');

        //        //$(e).parent().children('.table').children('tbody').children('tr:eq(' + trIndex + ')').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(1)').attr('data-nacId');
        //        s = s + "|" + sNac
        //        //  var j = (detTrcount - i)
        //        var NacValue = $('.tab-content').children('.active').children('#Paying').children('div:eq(0)').children('.table').children('tbody').children('#table1').children('td:eq(0)').children('.table').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(1)').text()
        //        //$(e).parent().children('.table').children('tbody').children('tr:eq(' + trIndex + ')').next('tr').children('td:eq(0)').children('.table ').children('#detBody').children('tr:eq(' + i + ')').children('td:eq(1)').text()

        //        $('.modal-bodyVn').children('div:eq(0)').after('<div class="col-md-12 vndiv" itemid="0"><div class="col-md-3" style="width: 33%;"><label>Тип начисления/платежа:</label><select onchange="getRelationService(this)" id="tipN0"><option value="0">Выберите тип начисление</option></select></div><div class="col-md-3" style="width: 33%;"><label>Услуга:</label><select id="srv"><option value="0">Выберите услуги</option></select></div><div class="col-md-3" style="width: 33%;">' + removingNac + '<label id="Nacllbl">Начислено:</label><input type="number" onkeyup="AddingNac(this)" value=' + NacValue + ' style="width: 100%" id="Nac0"></div></div>')
        //        GetTipNac(i, s);

        //    }




    }
    else {
        $('.vndiv:not(:first)').remove();
        $('.vndiv').children('div:eq(0)').children('#tipN0').val(0).removeAttr('disabled')
        $('.vndiv').children('div:eq(1)').children('#srv').val(0).removeAttr('disabled')
        $('.vndiv').children('div:eq(2)').children('#Nac0').val('0.00').removeAttr('disabled')
        $('#removingNac').remove();
        $('#Received,#BackLog,#sumNac').val('0.00')
    }
}
function AddVnFunc() {
    var data_s_ = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').find('tr[data-s="selected"]').attr('data-guid')
    if (data_s_ == undefined) {
        //var succPay = true;
        //   var ServcArray = []
        //   var tbody = ''
        //   $('.Servc').each(function () {
        //       var LS = $(this).parent().attr('data-ls');
        //       tbody = $(this).parent().attr('data-tbody');
        //       var ADDRESS = $('#objs option:selected').text();

        //       var SERVICE = $(this).children('div:eq(0)').children('#Service').val()
        //       if (SERVICE.length == 0) {
        //           succPay = false
        //           $(this).children('div:eq(0)').children('#Service').attr('placeholder', 'Обязательно').addClass('red_Placeholder').css('border', '1px solid red').css('box-shadow', '    0px 0px 5px 0px red')

        //       }

        //       var ONBEGIN = $(this).children('.onbegin').children('#ONBEGIN').val()
        //       if (ONBEGIN.length == 0) {
        //           ONBEGIN = '0.00';
        //           //succPay = false

        //           //$(this).children('div:eq(1)').children('#ONBEGIN').attr('placeholder', 'Обязательно').addClass('red_Placeholder').css('border', '1px solid red').css('box-shadow','    0px 0px 5px 0px red')
        //       }

        //       var OVERALL = $(this).children('.overall').children('#OVERALL').val();
        //       if (OVERALL.length == 0) {
        //           OVERALL = '0.00'
        //           //succPay = false
        //           //$(this).children('div:eq(2)').children('#OVERALL').attr('placeholder', 'Обязательно').addClass('red_Placeholder').css('border', '1px solid red').css('box-shadow', '    0px 0px 5px 0px red')
        //       }

        //       var PAYMENTS = $(this).children('.payments').children('#PAYMENTS').val();
        //       if (PAYMENTS.length == 0) {
        //           PAYMENTS = '0.00'
        //           //succPay = false
        //           //$(this).children('div:eq(3)').children('#PAYMENTS').attr('placeholder', 'Обязательно').addClass('red_Placeholder').css('border', '1px solid red').css('box-shadow', '    0px 0px 5px 0px red')
        //       }
        //       var VOLUME = ($(this).children('.Volume').children('#VOLUME').val().length == 0) ? '0.00' : $(this).children('.Volume').children('#VOLUME').val()

        //       var TARIFF = ($(this).children('.tarif').children('#TARIFF').val().length == 0) ? '0.00' : $(this).children('.tarif').children('#TARIFF').val()
        //       var LGOTA = ($(this).children('.lgot').children('#LGOTA').val().length == 0) ? '0.00' : $(this).children('.lgot').children('#LGOTA').val()
        //       var RECALC = ($(this).children('.recalc').children('#RECALC').val().length == 0) ? '0.00' : $(this).children('.recalc').children('#RECALC').val()
        //       var OVERALL2 = ($(this).children('.overall2').children('#OVERALL2').val().length == 0) ? '0.00' : $(this).children('.overall2').children('#OVERALL2').val()
        //       var ONEND = ($(this).children('.onend').children('#ONEND').val().length == 0) ? '0.00' : $(this).children('.onend').children('#ONEND').val()
        //       var UNITS = $(this).children('.edizm').children('#UNITS').find('option:selected').text();

        //       if (succPay == true) {
        //           ServcArray.push({
        //               'LS': LS,
        //               'ADDRESS': ADDRESS,
        //               'SERVICE': SERVICE,
        //               'ONBEGIN': ONBEGIN,
        //               'OVERALL': OVERALL,
        //               'UNITS': UNITS,
        //               'PAYMENTS': PAYMENTS,
        //               'VOLUME': VOLUME,
        //               'TARIFF': TARIFF,
        //               'LGOTA': LGOTA,
        //               'RECALC': RECALC,
        //               'OVERALL2': OVERALL2,
        //               'ONEND': ONEND
        //           })
        //       }
        //   })
        //   succPay=false
        //   if (succPay == true) {

        //       //console.log(ServcArray);

        //       //for (var i = 0; i < ServcArray.length; i++) {
        //       //    $('#' + tbody).prepend('<tr><td><a>' + ServcArray[i].SERVICE + '</a></td><td><a>' + ServcArray[i].ONBEGIN + '</a></td><td><a>' + ServcArray[i].OVERALL + '</a></td><td><a>' + ServcArray[i].PAYMENTS + '</a></td><td><a>' + ServcArray[i].ONEND + '</a></td></tr>')
        //       //}
        //       $('.ui-loader-background').show();
        //       $('#loader').show();

        //       Save_Payments2(JSON.stringify(ServcArray), tbody)
        //       $('.closeVn').click();

        //       //  Save_Payments(objPay, tableId);


        //   }
    }
    var success = true
    // else {
    // data_s_ = (data_s_ == undefined)
    // var periodArray = [];
    var servicesArray = []
    var MONTH = $('#Period').val()
    if (MONTH.length == 0) {
        success = false;
        $('#errPer').remove()
        $('#Period').before('<label id="errPer" style="color:red">Необходимо заполнить</label>')
        window.setTimeout(function () {
            $('#errPer').remove()
        }, 5000);
    }

    var ONBEGIN_ = $('#ONBEGIN').val();
    if (ONBEGIN_.length == 0) {
        success = false;
        $('#erronb').remove()
        $('#ONBEGIN').before('<label id="erronb" style="color:red">Необходимо заполнить</label>')
        window.setTimeout(function () {
            $('#erronb').remove()
        }, 5000);
    }
    var OVERALL_ = $('#OVERALL').val()
    if (OVERALL_.length == 0) {
        success = false;
        $('#errOver').remove()
        $('#OVERALL').before('<label id="errOver" style="color:red">Необходимо заполнить</label>')
        window.setTimeout(function () {
            $('#errOver').remove()
        }, 5000);
    }
    var PAYMENTS_ = $('#PAYMENTS').val();
    if (PAYMENTS_.length == 0) {
        success = false;
        $('#errPaym').remove()
        $('#PAYMENTS').before('<label id="errPaym" style="color:red">Необходимо заполнить</label>')
        window.setTimeout(function () {
            $('#errPaym').remove()
        }, 5000);
    }
    var LS_ = $('.tab-content').find('.active').find('#lc').val()//$('.modal-bodyVn').attr('data-ls')
    //  var data_guid = $('.modal-bodyVn').attr('data-id')
    var ADDRESS = $('#objs').children('option:selected').text();
    //periodArray.push({ "LS": LS_, "ADDRESS": ADDRESS, "MONTH": MONTH, "SERVICES": "Итого за " + MONTH + "", "VOLUME": "", "UNITS": "", "TARIFF": "", "ONBEGIN": ONBEGIN_, "CONSTANT": OVERALL_, "LGOTA": "0.000000", "RECALC": "0.000000", "OVERALL": OVERALL_, "PAYMENTS": PAYMENTS_, "PAYDATE": "", "SALDO": "0.000000", "ONEND": OVERALL_, "LOAD_GUID": "NEW_GUID", 'PAY_GUID': data_s_ })
    data_s_ = (data_s_ == undefined) ? '0' : data_s_
    var i = 0;
    $('#vnTableBody tr').each(function () {
        i = i + 1
        // var id_s = $(this).attr('data-id');
        var Data_guid = $(this).attr('data-guid');
        Data_guid = (Data_guid == undefined) ? '0' : Data_guid
        var srv = $(this).children('td:eq(0)').find('input').val();
        if (srv.length == 0) {
            $('#err_srv' + i + '').remove();
            success = false
            $(this).children('td:eq(0)').find('input').after('<label class="err" id="err_srv' + i + '" style="color:red">Необходимо заполнить</label>')
            window.setTimeout(function () {
                $('#err_srv' + i + '').remove()
            }, 5000);
        }
        var volume = $(this).children('td:eq(1)').find('input').val();
        if (volume.length == 0) {
            $('#err_volume' + i + '').remove();
            success = false
            $(this).children('td:eq(1)').find('input').after('<label class="err" id="err_volume' + i + '" style="color:red">Необходимо заполнить</label>')
            window.setTimeout(function () {
                $('#err_volume' + i + '').remove()
            }, 5000);
        }
        var edism = $(this).children('td:eq(2)').find('input').val();
        if (edism.length == 0) {
            success = false
            $('#err_edism' + i + '').remove();
            $(this).children('td:eq(2)').find('input').after('<label class="err" id="err_edism' + i + '" style="color:red">Необходимо заполнить</label>')
            window.setTimeout(function () {
                $('#err_edism' + i + '').remove()
            }, 5000);
        }

        var tarif = $(this).children('td:eq(3)').find('input').val();
        if (tarif.length == 0) {
            success = false
            $('#err_tarif' + i + '').remove();
            $(this).children('td:eq(3)').find('input').after('<label class="err" id="err_tarif' + i + '" style="color:red">Необходимо заполнить</label>')
            window.setTimeout(function () {
                $('#err_tarif' + i + '').remove()
            }, 5000);
        }

        var Lgotes = $(this).children('td:eq(4)').find('input').val();
        var recalc = $(this).children('td:eq(5)').find('input').val();
        var nac = $(this).children('td:eq(6)').find('input').val();
        if (nac.length == 0) {
            success = false
            $('#err_nac' + i + '').remove();
            $(this).children('td:eq(6)').find('input').after('<label class="err" id="err_nac' + i + '" style="color:red">Необходимо заполнить</label>')
            window.setTimeout(function () {
                $('#err_nac' + i + '').remove()
            }, 5000);
        }

        window.setTimeout(function () {
            $('.err').remove()
        }, 5000);

        servicesArray.push({ "LS": LS_, "ADDRESS": ADDRESS, "MONTH": MONTH, "SERVICES": srv, "VOLUME": volume, "UNITS": edism, "TARIFF": tarif, "ONBEGIN": "", "CONSTANT": nac, "LGOTA": Lgotes, "RECALC": recalc, "OVERALL": nac, "PAYMENTS": "", "PAYDATE": "", "SALDO": "0.000000", "ONEND": "", "LOAD_GUID": "NEW_GUID", 'PAY_GUID': Data_guid })
    })
    servicesArray.push({ "LS": LS_, "ADDRESS": ADDRESS, "MONTH": MONTH, "SERVICES": "Итого за " + MONTH + ":", "VOLUME": "", "UNITS": "", "TARIFF": "", "ONBEGIN": ONBEGIN_, "CONSTANT": OVERALL_, "LGOTA": "0.000000", "RECALC": "0.000000", "OVERALL": OVERALL_, "PAYMENTS": PAYMENTS_, "PAYDATE": "", "SALDO": "0.000000", "ONEND": OVERALL_, "LOAD_GUID": "NEW_GUID", 'PAY_GUID': data_s_ })
    // console.log(periodArray)
    // console.log("periodArray")
    console.log("------------")
    console.log(servicesArray)
    console.log("servicesArray")
    var tablebodyId = $('.tab-content').find('.active').find('#Paying').find('.table').find('tbody').attr('id');
    if (success == true) {
        //alert('ok')
        Save_Payments2(JSON.stringify(servicesArray), tablebodyId)
    }
    // }
}
function Save_Payments2(ServcArray, tbody) {
    obj = { 'arr': ServcArray }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/Save_Payments2",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            // //console.log(data);
            var jsondata = $.parseJSON(data.d);
            var Array = JSON.parse(ServcArray);
            $('#' + tbody).empty();
            GetRFP_KONSTANTIN(Array[0].LS, '#' + tbody);
            //    for (var i = 0; i < Array.length; i++) {
            //        $('#' + tbody).prepend('<tr data-guid=' + jsondata.guid + ' style="background-color: white;" onclick="ShowDetail_K(this)"><td><a style="cursor: pointer; color: black;">' + Array[i].SERVICE + '</a></td><td><a style="cursor: pointer; color: black;">' + Array[i].ONBEGIN + '</a></td><td><a style="cursor: pointer; color: black;">' + Array[i].OVERALL + '</a></td><td><a style="cursor: pointer; color: black;">' + Array[i].PAYMENTS + '</a></td><td><a style="cursor: pointer; color: black;">' + Array[i].ONEND + '</a></td></tr>')
            //}
            $('.closeVn').click();
        }
    })
}
function Save_Payments(o, table) {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/SavePayments",
        data: JSON.stringify(o),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('.closeVn').click();

            var j = JSON.parse(data.d)
            $(table).empty();
            for (var i = 0; i < j.length; i++) {
                // var total_SUM = parseFloat(j[i].ACCURED_SUMM) + parseFloat((j[i].PAYMENT_SUM.length != 0) ? j[i].PAYMENT_SUM : "0")
                var PAY_DATE = j[i].PAY_DATE.substr(0, j[i].PAY_DATE.indexOf(' '))
                var checked = (j[i].PAYED == null) ? "" : "checked='true'"

                //if (j[i].GENERAL_SUM.length != 0 && j[i].GENERAL_SUM.indexOf('.') == -1 && j[i].GENERAL_SUM.indexOf(',') == -1) {
                //    j[i].GENERAL_SUM = j[i].GENERAL_SUM + ".00"
                //}
                //else {
                //    if (j[i].GENERAL_SUM.indexOf('.') != -1) {
                //        var bclg = j[i].GENERAL_SUM.split('.')
                //        bclg = bclg[1]
                //        bclg = (bclg.length == 1) ? '0' : ''
                //        j[i].GENERAL_SUM = j[i].GENERAL_SUM + bclg
                //    }
                //    if (j[i].GENERAL_SUM.indexOf(',') != -1) {
                //        var bclg = j[i].GENERAL_SUM.split(',')
                //        bclg = bclg[1]
                //        bclg = (bclg.length == 1) ? '0' : ''
                //        j[i].GENERAL_SUM = j[i].GENERAL_SUM + bclg
                //    }
                //}


                //if (j[i].BACKLOG_START.length != 0 && j[i].BACKLOG_START.indexOf('.') == -1 && j[i].BACKLOG_START.indexOf(',') == -1) {
                //    j[i].BACKLOG_START = j[i].BACKLOG_START + ".00"
                //}
                //else {
                //    if (j[i].BACKLOG_START.indexOf('.') != -1) {
                //        var bclg = j[i].BACKLOG_START.split('.')
                //        bclg = bclg[1]
                //        bclg = (bclg.length == 1) ? '0' : ''
                //        j[i].BACKLOG_START = j[i].BACKLOG_START + bclg
                //    }
                //    if (j[i].BACKLOG_START.indexOf(',') != -1) {
                //        var bclg = j[i].BACKLOG_START.split(',')
                //        bclg = bclg[1]
                //        bclg = (bclg.length == 1) ? '0' : ''
                //        j[i].BACKLOG_START = j[i].BACKLOG_START + bclg
                //    }
                //}

                //if (j[i].ACCURED_SUMM.indexOf('.') == -1 && j[i].ACCURED_SUMM.indexOf(',') == -1) {
                //    j[i].ACCURED_SUMM = j[i].ACCURED_SUMM + ".00"
                //}
                //else {
                //    if (j[i].ACCURED_SUMM.indexOf('.') != -1) {
                //        var bclg = j[i].ACCURED_SUMM.split('.')
                //        bclg = bclg[1]
                //        bclg = (bclg.length == 1) ? '0' : ''
                //        j[i].ACCURED_SUMM = j[i].ACCURED_SUMM + bclg
                //    }
                //    if (j[i].ACCURED_SUMM.indexOf(',') != -1) {
                //        var bclg = j[i].ACCURED_SUMM.split(',')
                //        bclg = bclg[1]
                //        bclg = (bclg.length == 1) ? '0' : ''
                //        j[i].ACCURED_SUMM = j[i].ACCURED_SUMM + bclg
                //    }
                //}
                //total_SUM = total_SUM.toString();
                //if (total_SUM.indexOf('.') == -1 && total_SUM.indexOf(',') == -1) {
                //    total_SUM = total_SUM + ".00"
                //}
                //else {

                //    if (total_SUM.indexOf('.') != -1) {
                //        var bclg = total_SUM.split('.')
                //        bclg = bclg[1]
                //        bclg = (bclg.length == 1) ? '0' : ''
                //        total_SUM = total_SUM + bclg
                //    }
                //    if (total_SUM.indexOf(',') != -1) {
                //        var bclg = total_SUM.split(',')
                //        bclg = bclg[1]
                //        bclg = (bclg.length == 1) ? '0' : ''
                //        total_SUM = total_SUM + bclg
                //    }
                //}
                $(table).append('<tr><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + '><a style="cursor: ns-resize;" onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')">' + j[i].DATA_MOUNTH_YEAR + '</a></td><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + '><a style="cursor: ns-resize;" onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')">' + j[i].BACKLOG_START + '</a></td><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + '><a style="cursor: ns-resize;" onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')">' + j[i].ACCURED_SUMM + '</a></td><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + '><a style="cursor: ns-resize;" onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')">' + j[i].RECEIVED + '</a></td><td itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + '><a style="cursor: ns-resize;" onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')">' + j[i].GENERAL_SUM + '</a></td><td style="display:none;"itemid=' + j[i].RECIEPT_FOR_PAYMENT_ID + '><a onclick="ShowDetail(this,' + j[i].RECIEPT_FOR_PAYMENT_ID + ')" style="cursor: ns-resize;">' + PAY_DATE + '</a></td><td><input style="float:left" ' + checked + ' type="checkbox" onclick="Payed(this)"/></td></tr>')
            }
        }
    })
}
function Generate(e) {
    $("#mh2").append("Orxan");
    //  $('#genPass').attr('disabled','disabled')
    //if (text_.length >= 10000) {
    //    $("#txt2").attr("style", "font-size: 23px;width:50%;word-wrap:break-word;")
    //}
    //else {
    //    $("#txt2").attr("style", "font-size: 23px")
    //}
    $("#txt2").empty();
    $("#txt2").append("");
    $("#mf2").text("")
    var PassControlId = Math.floor(Math.random() * 10000000)
    $(e).parent().children().find('#pss').attr('random-id', PassControlId)
    $('#genPass').val($('.tab-content').children('.active').children('.row').children('div:eq(0)').children('#pss').val())
    GenPas()// Для суббота не надо. Дата (08.02.2019);
    $('#GENER').attr('onclick', 'GetValuesG(' + PassControlId + ')')
    var modal = document.getElementById('myModal4');
    var span = document.getElementById("close_4")[0];
    modal.style.display = "block";
    $("#close_4").click(function () {
        modal.style.display = "none";
        $('#genPass').val('');
        $('#psExp').val('7');
        $('#sms').prop('checked', false)
        $('#em').prop('checked', false)
    })
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            $('#genPass').val('');
            $('#psExp').val('7');
            $('#sms').prop('checked', false)
            $('#em').prop('checked', false)
        }
    }
}
function GetValuesG(e) {
    if ($('.domOk').css('display') == "none") {
        var pss = $('#genPass').val();
        var sms = "";
        var lblpssText = ""
        if ($('#sms').is(':checked')) {
            sms = "has";
            lblpssText = lblpssText + "Сделать смс-рассылку"
        }
        else {
            sms = "not"
        }
        var em = ""
        if ($('#em').is(':checked')) {
            em = "has"
            lblpssText = (lblpssText.trim().length != 0) ? lblpssText + ", " : lblpssText
            lblpssText = lblpssText + "Сделать рассылку на электроннуя почту "
        }
        else {
            em = "not"
        }
        var psExp = ($('#psExp').val() == 0) ? " бессрочный" : $('#psExp').val();
        //   $('#lblpssText').remove();
        if (lblpssText.trim().length != 0) {
            if ($('[random-id=' + e + ']').parent().parent().prev('div').children('#lblpssText').length == 0) {
                $('[random-id=' + e + ']').parent().parent().prev('div').append('<label id="lblpssText">' + lblpssText + '</label>')
            }
            else {
                $('[random-id=' + e + ']').parent().parent().prev('div').children('#lblpssText').text(lblpssText)
            }
        }
        else {
            $('[random-id=' + e + ']').parent().parent().prev('div').children('#lblpssText').remove();
        }
        $('[random-id=' + e + ']').val(pss).attr('data-sms', sms).attr('data-em', em).attr('data-exp', 0);
        $("#close_4").click();


        $('.active label:eq(1)').text(lblpssText)
    }
}
function GenPas() {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/GenPass",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var jas = JSON.parse(data.d);
            $('#genPass').val(jas.result)
        }
    })
}
function makeFiltering(lg, flt, OBJECT_ID) {

    var obj = { "lg": lg, "flt": flt, "OBJECT_ID": OBJECT_ID }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Apartments.aspx/makeFiltering",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            // window.location.href = "Apartments.aspx";
            var jsondata_ = JSON.parse(data.d)

            $('#ScoresAndRooms').dataTable({
                "destroy": true,
                columnDefs: [{ type: 'natural', targets: 3 }, { type: 'natural', targets: 4 }, { type: 'natural', targets: 5 }, { type: 'natural', targets: 6 }],
                data: jsondata_,

                columns: [
                    {
                        'data': 'CHAMB_AMOUNT',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.CHAMB_AMOUNT + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_FOR',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.ROOM_FOR + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_TYPE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.ROOM_TYPE + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_NUMBER',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.ROOM_NUMBER + '</a>');
                        }
                    },
                    {
                        'data': 'FLOOR',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.FLOOR + '</a>');
                        }
                    },
                    {
                        'data': 'ENTRANCE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.ENTRANCE + '</a>');
                        }
                    },
                    {
                        'data': 'NUMBER',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.NUMBER + '</a>');
                        }
                    },
                    {
                        'data': 'FIRST_NAME',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.FIRST_NAME + '</a>');
                        }
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
                    "aria": {
                        "sortAscending": ": активировать для сортировки столбца по возрастанию",
                        "sortDescending": ": активировать для сортировки столбца по убыванию"
                    }
                }
            })
            $('.ui-loader-background').hide();
            $('#loader').hide();

            //var t = 0;
            //var tdText = ""
            //for (var i = 0; i < $('#rooms tr').length; i++) {
            //    var lc = $('#rooms tr:eq(' + i + ') td:eq(5)').text();
            //    if ($('#rooms tr td:contains(' + lc + ')').length > 1) {
            //        $('#rooms tr td:contains(' + lc + ')').each(function () {
            //            if (t == 0) {
            //                tdText = $(this).next('td').text()
            //            }
            //            else {
            //                tdText = tdText + "," + $(this).next('td').text()
            //            }
            //            t = t + 1
            //        })
            //        $('#rooms tr:eq(' + i + ') td:eq(6) a').text(tdText);
            //        $('#rooms tr td:contains(' + lc + '):not(:first)').parent().remove()
            //        tdText = "";/Manager/AddApartment.aspx
            //        t = 0;
            //    }
            //}
        }
    })
}
function GoTo(apId) {
    sessionStorage.setItem("apart", apId)
    // sessionStorage.setItem("ID",ID)
    window.location.href = "AddApartment.aspx"
}
function getRoomNumbersBas(lg) {
    var obj = { "lg": lg }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Apartments.aspx/getRoomNumbersById",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // //console.log(jsondata_)

            //for (var i = 0; i < jsondata_.length; i++) {
            //    $("#appNum").append('<option value="' + jsondata_[i].ROOM_NUMBER + '">' + jsondata_[i].ROOM_NUMBER + '</option>')

            //}
            //$('#appNum').multiselect({

            //    includeSelectAllOption: true,

            //    nonSelectedText:'Выберите Номер помещения'

            //});
            //$('#appNum').hide()
            //$('.multiselect-selected-text:eq(2)').text('Выберите Номер помещения')
        }
    })
}
function getRoom(lg) {
    var obj = { "LogId": lg }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Apartments.aspx/GetRooms",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            // window.location.href = "Apartments.aspx";
            var jsondata_ = JSON.parse(data.d)

            //$('.container').removeData('RGUIDS');
            //$('.container').data('RGUIDS', jsondata_[0].GEN_SQUARE)

            $('#ScoresAndRooms').dataTable({
                "destroy": true,
                columnDefs: [{ type: 'natural', targets: 3 }, { type: 'natural', targets: 4 }, { type: 'natural', targets: 5 }, { type: 'natural', targets: 6 }],
                data: jsondata_,

                columns: [
                    {
                        'data': 'CHAMB_AMOUNT',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.CHAMB_AMOUNT + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_FOR',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#" onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.ROOM_FOR + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_TYPE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.ROOM_TYPE + '</a>');
                        }
                    },
                    {
                        'data': 'ROOM_NUMBER',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.ROOM_NUMBER + '</a>');
                        }
                    },
                    {
                        'data': 'FLOOR',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.FLOOR + '</a>');
                        }
                    },
                    {
                        'data': 'ENTRANCE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.ENTRANCE + '</a>');
                        }
                    },
                    {
                        'data': 'NUMBER',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.NUMBER + '</a>');
                        }
                    },
                    {
                        'data': 'FIRST_NAME',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="GoTo(' + oData.ROOM_ID + ')">' + oData.FIRST_NAME + '</a>');
                        }
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
                    "aria": {
                        "sortAscending": ": активировать для сортировки столбца по возрастанию",
                        "sortDescending": ": активировать для сортировки столбца по убыванию"
                    }
                },
                "initComplete": function (settings, json) {
                    changeDatatableElementStructures($('#ScoresAndRooms'))


                    // console.log ('bitti2')
                }
            })


            $('.ui-loader-background').hide();
            $('#loader').hide();


        }
    })
}
function changeDatatableElementStructures(e) {
    var E_id = $(e).attr('id')
    var Tablewrapper = '#' + E_id + '_wrapper'
    var TableLength = E_id + '_length'
    var TableFilter = '#' + E_id + '_filter'
    $(Tablewrapper).prepend($('#TableTools'))
    $('#ListLength').append($('select[name="' + TableLength + '"]:eq(0)'))
    $('select[name="' + TableLength + '"]').children('option').each(function () {
        // .text('Показывать ' + $(this).val() + ' записей')
        $(this).text('Показывать ' + $(this).val() + ' записей')
    })
    $('#' + TableLength).remove();
    $('#SearchForTable').append($(TableFilter).children('label').children('input[type="search"]').attr('class', 'w-100 transp border-0 ml-2 pr-2 pt-1'))
    $(TableFilter).remove();
}
function deltab(itm, e) {
    if (e == undefined) {
        var AllLs = $('.ls').length
        if (AllLs >= 2) {
            $(itm).parent().parent('.ls').remove()

        }
        else {
            $('.removing3').attr('style', 'color:darkgray')
        }
    }
    else {
        var Allli = $("#nav-tab li").length;
        var text;
        if (Allli > 2) {


            text = $(e).parent().children('[data-toggle="tab"]').text();
            $("#myModal2 #deleteO").val("ДА")//cls
            $("#myModal2 #cls").val("НЕТ")
            alertWithButton2("Удалить лицевой счет", "Вы действительно хотите удалить лицевой счет № " + text + " ?", "", text, itm, "", "")
        }
        else {
            $("#nav-tab i[itemid=" + itm + "]").hide();
        }

    }

    if ($('.removing3').length == 1) {
        $('.removing3').attr('style', 'color:darkgray')

    }


}
function getObjectForMaster(lg_) {
    var dObj = { "lg": lg_ }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/GetUproObj",
        data: JSON.stringify(dObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            var jsondata_1 = JSON.parse(data.d)
            ////console.log(jsondata_1);
            for (var i = 0; i < jsondata_1.length; i++) {
                var objectstatus = "";

                var START_CNTR = jsondata_1[i].START_CNTR
                var STOP_CNTR = jsondata_1[i].STOP_CNTR
                var ON_END_CNTR = jsondata_1[i].ON_END_CNTR
                if ((jsondata_1[i].START_CNTR == 0 || jsondata_1[i].START_CNTR == null) && (jsondata_1[i].STOP_CNTR == 0 || jsondata_1[i].STOP_CNTR == null) && (jsondata_1[i].ON_END_CNTR == false || jsondata_1[i].ON_END_CNTR == null)) {
                    objectstatus = "Срок подачи показаний не установлен";
                }

                else if (jsondata_1[i].START_CNTR !== null && jsondata_1[i].START_CNTR !== 0) {


                    objectstatus = "Показания приборов учета принимаются с " + jsondata_1[i].START_CNTR + " числа текущего месяца ";

                    if (jsondata_1[i].STOP_CNTR != 0 && jsondata_1[i].STOP_CNTR != null) {
                        objectstatus = "Показания приборов учета принимаются с " + jsondata_1[i].START_CNTR + " по " + jsondata_1[i].STOP_CNTR + " число текущего месяца";
                    }
                }
                else if (jsondata_1[i].STOP_CNTR !== null && jsondata_1[i].STOP_CNTR !== 0) {
                    objectstatus = "Показания приборов учета принимаются по " + jsondata_1[i].STOP_CNTR + " число текущего  месяца ";
                }
                $("#objsM").append('<option data-status="' + objectstatus + '"  value="' + jsondata_1[i].Object_Id + '">' + jsondata_1[i].ObjectAdress + '</option>').select2({
                    containerCssClass: "wrap"
                })
            }


            var SMAsterObj = sessionStorage.getItem('SMAsterObj')
            if (SMAsterObj == null) {
                SMAsterObj = 0
            }
            $('#objsM').val(SMAsterObj).select2('val', SMAsterObj)

        }
    })
}
function SaveAccFromExcel(ObjId, fl) {
    var Obj = { "ObjId": ObjId, "file": fl }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Apartments.aspx/SaveAccFromExcel",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            ////console.log(data)
            var jsondata = JSON.parse(data.d);
            $('#scores').empty();
            ////console.log(jsondata)
            if (jsondata.result == "Ok") {
                for (var i = 0; i < jsondata.Numbers.length; i++) {
                    ////console.log(jsondata.Numbers[i].NUMBER);
                    if (jsondata.Numbers[i].NUMBER != "") {
                        $('#scores').append('<tr><td>' + jsondata.Numbers[i].NUMBER + '</td><td>' + jsondata.Numbers[i].ROOM_NUMBER + '</td><td>' + jsondata.Numbers[i].ROOM_FOR + '</td><td>' + jsondata.Numbers[i].ROOM_TYPE + '</td><td>' + jsondata.Numbers[i].OWNERSHIP_TYPE_ID + '</td><td>' + jsondata.Numbers[i].SHARE + '</td><td>' + jsondata.Numbers[i].FIRST_NAME + '</td><td>' + jsondata.Numbers[i].PHONE + '</td><td>' + jsondata.Numbers[i].EMAIL + '</td><td>' + jsondata.Numbers[i].GEN_SQUARE + '</td><td>' + jsondata.Numbers[i].LIVE_SQUARE + '</td><td>' + jsondata.Numbers[i].WITHOUT_SUMMER_SQUARE + '</td></tr>')
                    }

                }
                $('#loadEx').attr('data-file', fl)
            }
            else {
                $('#deleteO').hide();
                $('#files').val('');
                alertWithButton2("Ошибка", "Загружаемый Excel-документ не соответствует шаблону. С корректным шаблоном документа можете ознакомиться здесь <a  href='../img / Форма загрузки ЛС.xlsx' download>ссылка на скачивание шаблона</a> ", "", "", "", "", "");
            }
            $('.ui-loader-background').hide();
            $("#loader").hide();

        }
    })
}
function DeleteAccData(nmbr, t, objT, rmnum, lg) {
    var Obj = { "nmbr": nmbr }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/DeleteAccData",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            // if (Allli > 2) {
            $('#nav-tab li[itemid=' + t + ']').remove();
            //  var tab = 
            // $('div[data-tab="' + itm + '"]').remove();
            //$('.tab-content').find('#tab' + itm + '').remove();
            $('#tab' + t).remove();
            $('.tab-content > div:last').attr('class', 'tab-pane fade active in');
            $('#nav-tab > li:nth-last-child(2)').attr('class', 'active');
            var lg = sessionStorage.getItem("Log")
            var ClId = sessionStorage.getItem("Clien_ID")
            var selObj = $("#objs option:selected").text();
            SaveLog("Удалить лицевой счеть", "Важное", "Личный кабинет (Профиль Управляющего)", "Управляющий", 'Удален лицевой счет" ' + nmbr + '(Объект ' + selObj + ')"', lg)
            $('#lgs').empty();
            getlog2(lg, "Manager");
            /**/
            //(txt, item, tipObj, RoomNumber);
            /**/
            // (txt, item, tipObj, RoomNumber, log);
            // }
            //else {
            //    
            //}
            $("#myModal2 #cls").click();
        }
    })
}

function SortingPay(e) {
    var ar = []
    var thisClass = $(e).attr('class');
    $('#detBody').parent().parent().parent().remove();
    if (thisClass == 'glyphicon glyphicon-chevron-down') {
        $(e).attr('class', 'glyphicon glyphicon-chevron-up');
        //$(e).parent().parent().parent().parent().children('tbody').children('tr:eq(0)').css('background-color', 'red')
        $(e).parent().parent().parent().parent().children('tbody').children('tr').each(function () {
            //$(this).children('td').each(function ()
            //{
            //    var tdVal = $(this).eq(0).children('a').text();
            //    ////console.log(tdVal);
            //})
            ar.push({ "Period": $(this).children('td:eq(0)').children('a').text(), "Ostatok": $(this).children('td:eq(1)').children('a').text(), "Nacisleno": $(this).children('td:eq(2)').children('a').text(), "Postupilo": $(this).children('td:eq(3)').children('a').text(), "Itoqo": $(this).children('td:eq(4)').children('a').text(), "PAYED": $(this).children('td:eq(5)').children('input[type="checkbox"]').prop('checked'), 'Guid': $(this).attr('data-guid') })
        })

        //   //console.log(ar);
        // int[] ar= { 2016,2017,2018,2018,2018};


        var n = ar.length;
        var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']


        for (var x = 0; x < n; x++) {
            var min_index = x;
            for (var y = x; y < n; y++) {
                var Periodx = ar[min_index].Period
                Periodx = Periodx.split(' ');
                var MonthX = months.indexOf(Periodx[0]) + 1

                var PeriodY = ar[y].Period
                PeriodY = PeriodY.split(' ');
                var MonthY = months.indexOf(PeriodY[0]) + 1

                if (parseInt(MonthX) > parseInt(MonthY)) {
                    min_index = y;
                }
            }
            var temp = ar[x];
            ar[x] = ar[min_index];
            ar[min_index] = temp;
        }
        for (var x = 0; x < n; x++) {
            var min_index = x;
            for (var y = x; y < n; y++) {
                var Periodx = ar[min_index].Period
                Periodx = Periodx.split(' ');
                var Yearx = Periodx[1]
                var MonthX = months.indexOf(Periodx[0]) + 1

                var PeriodY = ar[y].Period
                PeriodY = PeriodY.split(' ');
                var YearY = PeriodY[1]
                var MonthY = months.indexOf(PeriodY[0]) + 1

                if (parseInt(Yearx) < parseInt(YearY)) {
                    // if (parseInt(MonthX) < parseInt(MonthY)) {
                    min_index = y;
                    // }
                }
            }
            var temp = ar[x];
            ar[x] = ar[min_index];
            ar[min_index] = temp;
        }
        //////console.log("siralamadan Sonra");
        //////console.log(ar);

        $(e).parent().parent().parent().parent().children('tbody').empty();
        for (var i = 0; i < ar.length; i++) {
            //  var total_SUM = parseFloat(ar[i].ACCURED_SUMM) + parseFloat((ar[i].PAYMENT_SUM.length != 0) ? ar[i].PAYMENT_SUM : "0")
            // var PAY_DATE = ar[i].PAY_DATE.substr(0, ar[i].PAY_DATE.indexOf(' '))
            //ar[i].PAYED = (ar[i].PAYED == true) ? '<input type="checkbox" disabled="disabled" checked="true">' : '<input type="checkbox" disabled="disabled"><span class="txtRt" onclick="PayThis(this,0)" style="margin-right:-120px; margin-top:-5px;"><a title="Оплатить" class="btn" style="background:  rgb(80, 0, 0);width:100px;color: #fff;border-radius: 0 15px 15px 0;">Оплатить</a></span>'

            $(e).parent().parent().parent().parent().children('tbody').append('<tr data-guid=' + ar[i].Guid + '  onclick="ShowDetail_K(this)" ><td itemid=' + ar[i].Period.replace(' ', '_') + '><a style="cursor: pointer;" >' + ar[i].Period + '</a></td><td itemid=' + ar[i].Period + '><a style="cursor:pointer;"  >' + ar[i].Ostatok + '</a></td><td itemid=' + ar[i].Period + '><a style="cursor: pointer;"  >' + ar[i].Nacisleno + '</a></td><td itemid=' + ar[i].Period + '><a style="cursor: pointer;"  >' + ar[i].Postupilo + '</a></td><td itemid=' + ar[i].Period + '><a style="cursor:pointer">  ' + ar[i].Itoqo + '</a></td></tr>')
        }


    }
    else {
        $(e).attr('class', 'glyphicon glyphicon-chevron-down');

        $(e).parent().parent().parent().parent().children('tbody').children('tr').each(function () {
            //$(this).children('td').each(function ()
            //{
            //    var tdVal = $(this).eq(0).children('a').text();
            //    ////console.log(tdVal);
            //})
            //ar.push({ "Period": $(this).children('td:eq(0)').children('a').text(), "Ostatok": $(this).children('td:eq(1)').children('a').text(), "Nacisleno": $(this).children('td:eq(2)').children('a').text(), "Postupilo": $(this).children('td:eq(3)').children('a').text(), "Itoqo": $(this).children('td:eq(4)').children('a').text(), "OplatidDo": $(this).children('td:eq(5)').children('a').text() })

            ar.push({ "Period": $(this).children('td:eq(0)').children('a').text(), "Ostatok": $(this).children('td:eq(1)').children('a').text(), "Nacisleno": $(this).children('td:eq(2)').children('a').text(), "Postupilo": $(this).children('td:eq(3)').children('a').text(), "Itoqo": $(this).children('td:eq(4)').children('a').text(), "PAYED": $(this).children('td:eq(5)').children('input[type="checkbox"]').prop('checked'), 'Guid': $(this).attr('data-guid') })
        })

        // //console.log(ar);
        // int[] ar= { 2016,2017,2018,2018,2018};

        var n = ar.length;

        var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']


        for (var x = 0; x < n; x++) {
            var min_index = x;
            for (var y = x; y < n; y++) {
                var Periodx = ar[min_index].Period
                Periodx = Periodx.split(' ');
                var MonthX = months.indexOf(Periodx[0]) + 1

                var PeriodY = ar[y].Period
                PeriodY = PeriodY.split(' ');
                var MonthY = months.indexOf(PeriodY[0]) + 1

                if (parseInt(MonthX) < parseInt(MonthY)) {
                    min_index = y;
                }
            }
            var temp = ar[x];
            ar[x] = ar[min_index];
            ar[min_index] = temp;
        }

        for (var x = 0; x < n; x++) {
            var min_index = x;
            for (var y = x; y < n; y++) {
                var Periodx = ar[min_index].Period
                Periodx = Periodx.split(' ');
                var Yearx = Periodx[1]

                var PeriodY = ar[y].Period
                PeriodY = PeriodY.split(' ');
                var YearY = PeriodY[1]

                if (parseInt(Yearx) > parseInt(YearY)) {
                    min_index = y;
                }
            }
            var temp = ar[x];
            ar[x] = ar[min_index];
            ar[min_index] = temp;
        }
        //////console.log("siralamadan Sonra");
        //////console.log(ar);

        $(e).parent().parent().parent().parent().children('tbody').empty();
        for (var i = 0; i < ar.length; i++) {
            //  var total_SUM = parseFloat(ar[i].ACCURED_SUMM) + parseFloat((ar[i].PAYMENT_SUM.length != 0) ? ar[i].PAYMENT_SUM : "0")
            // var PAY_DATE = ar[i].PAY_DATE.substr(0, ar[i].PAY_DATE.indexOf(' '))
            // var PAY_DATE = ar[i].PAY_DATE.substr(0, ar[i].PAY_DATE.indexOf(' '))
            ar[i].PAYED = (ar[i].PAYED == true) ? '<input type="checkbox" disabled="disabled" checked="true">' : '<input type="checkbox" disabled="disabled"><span class="txtRt" onclick="PayThis(this,0)" style="margin-right:-120px; margin-top:-5px;"><a title="Оплатить" class="btn" style="background:  rgb(80, 0, 0);width:100px;color: #fff;border-radius: 0 15px 15px 0;">Оплатить</a></span>'

            $(e).parent().parent().parent().parent().children('tbody').append('<tr data-guid=' + ar[i].Guid + '  onclick="ShowDetail_K(this)" ><td itemid=' + ar[i].Period.replace(' ', '_') + '><a style="cursor: pointer;" >' + ar[i].Period + '</a></td><td itemid=' + ar[i].Period + '><a style="cursor:pointer;"  >' + ar[i].Ostatok + '</a></td><td itemid=' + ar[i].Period + '><a style="cursor: pointer;"  >' + ar[i].Nacisleno + '</a></td><td itemid=' + ar[i].Period + '><a style="cursor: pointer;"  >' + ar[i].Postupilo + '</a></td><td itemid=' + ar[i].Period + '><a style="cursor:pointer">  ' + ar[i].Itoqo + '</a></td></tr>')
        }

        //$(e).parent().parent().parent().parent().children('tbody').children('tr:eq(0)').css('background-color', 'red')

    }
}
function PositiveValues(e) {

    // $(e).val('0')
    var pokaz = $(e).val()
    pokaz = pokaz.replace('-', '');
    $(e).val(pokaz);

}
function alertWithButton2(Header_, text_, footer_, txt, item, roomId, log) {
    $("#mh2").empty();
    $("#mh2").append(Header_);
    if (text_.length >= 10000) {
        $("#txt2").attr("style", "font-size: 23px;width:50%;word-wrap:break-word;")
    }
    else {
        $("#txt2").attr("style", "font-size: 23px")
    }
    $("#txt2").empty();
    $("#txt2").append(text_);
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
    $("#myModal2 #deleteO").click(function () {
        if (txt != "") {
            var tipObj = $("#r_t option:selected").text();
            var RoomNumber = $("#rnum").val();

            DeleteAccData(txt, item, tipObj, RoomNumber, log);
        }
        if (roomId != "") {
            DeleteROOM(roomId, log)
        }

    })
}

function MakeCheckGrupS(dId, e) {


    if ($('#GrupServices').length == 0) {
        $(e).parent().parent().parent().after('<div class="col-md-4"><label>Услуги</label><div id="GrupServices" style="border: 1px solid #000;box-shadow: 3px 4px 5px rgba(0,0,0,0.3);width: 100%;height: 260px !important;overflow: auto;"></div></div>')
    }
    var checkedOrNot = $(e).prop('checked')
    //if (checkedOrNot == false) {
    //    $(e).children('input[type="checkbox"]').prop('checked', true)
    //    checkedOrNot = true;
    //}
    //else{
    //    $(e).children('input[type="checkbox"]').prop('checked', false);
    //    checkedOrNot = false;
    //}
    if (checkedOrNot == true) {
        var obj = { "d": dId, "obj": $('#objsM').val() }
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Apartments.aspx/GetProductsByGroup",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (data) {
                var j = JSON.parse(data.d);
                if (j.length != 0) {

                    //$('#GrupServices').append('<div class="col-md-12" style="margin-top:0px;align-items: center !important;"><hr/><input type="button" class="btn genBtn" value="Добавить Услугу" data-open="on" onclick="showAddForm(' + dId + ',this)" data-g=' + dId + ' itemid="423" style="-right: -23px; */float: left;width: 100%;"></div>')

                    //for (var i = 0; i < j.length; i++) {
                    //    if (i>0) {
                    // $('#GrupServices').append('<div class="margTop0"><input type="checkbox" onclick="MakeCheckProductService(' + j[i].ROOM_ID + ',this)" class="col-md-1" data-g=' + dId + '    itemid="' + j[i].ROOM_ID + '" style="-right: -23px; */float: left;"><label itemid="144" class="checkBx">' + j[i].FIRST_NAME + '</label></div>')
                    //    }
                    //    if (i == 0) {
                    //        $('#GrupServices').append('<div class="margTop0"><hr/><div class="cornFlower">'+$(e).next().text()+'</div><input type="button" id="addFormbtn" class="btn genBtn" value="Добавить Услугу" data-open="on" onclick="showAddForm(' + dId + ',this)" data-g=' + dId + ' itemid="423" style="-right: -23px; */float: left;width: 100%;"><input type="checkbox" onclick="MakeCheckProductService(' + j[i].ROOM_ID + ',this)" class="col-md-1" data-g=' + dId + '    itemid="' + j[i].ROOM_ID + '" style="-right: -23px; */float: left;"><label itemid="144" class="checkBx">' + j[i].FIRST_NAME + '</label></div>')
                    //    }
                    //}

                    $('#GrupServices').append('<div id="d_' + dId + '"><div data-d=' + dId + ' class="margTop0"><hr/><div class="cornFlower">' + $(e).next().text() + '</div><input type="button" id="addFormbtn" class="btn genBtn" value="Добавить Услугу" data-open="on" onclick="showAddForm(' + dId + ',this)" data-g=' + dId + ' itemid="423" style="-right: -23px; */float: left;width: 100%;"></div>')
                    for (var i = 0; i < j.length; i++) {

                        $('#GrupServices').children('#d_' + dId).append('<div data-d=' + dId + ' class="margTop0"><input type="checkbox" onclick="makeCheckProductS(' + j[i].ROOM_ID + ',this)" class="col-md-1" data-g=' + dId + '    itemid="' + j[i].ROOM_ID + '" style="-right: -23px; */float: left;"><label  itemid="144" class="checkBx">' + j[i].FIRST_NAME + '</label></div>')
                    }
                    var a = 0
                    $('#GrupHasServices').children('#d_' + dId).children('.col-md-12').each(function () {

                        var HasId = $(this).children('input[type="checkbox"]').attr('itemid');
                        //if (a == 0) {
                        //    continue;
                        //}

                        $('#GrupServices').children('#d_' + dId).children('.col-md-12').each(function () {
                            var servicId = $(this).children('input[type="checkbox"]').attr('itemid');

                            if (servicId == HasId && servicId != undefined) {

                                $(this).remove();
                            }

                        })
                        // a = a + 1;

                    })



                }
                else {
                    $('#ServiceCost').remove();
                    $('#GroupS .col-md-12').each(function () {
                        $(this).children('.col-md-1').attr('disabled', 'disabled')
                    });
                    $('#GrupServices .col-md-12').each(function () {
                        $(this).children('.col-md-1').attr('disabled', 'disabled')
                        $(this).children('.btn').attr('disabled', 'disabled')
                    });
                    $('#GroupS').children('.col-md-12').attr('class', 'col-md-12 box');
                    $('#GrupServices').children('.col-md-12').attr('class', 'col-md-12 box');

                    $(e).parent().attr('class', 'col-md-12');
                    $(e).removeAttr('disabled');
                    $('#AddingForm').remove();
                    $('#GrupServices').css('width', '162%')
                    $('#GrupServices').append('<div id="d_' + dId + '" class="margTop0"><hr/><div class="cornFlower">' + $(e).next().text() + '</div><label itemid="144" class="checkBx" style="margin-left: 2px !important;">Добавить новую услугу</label><input type="text" id="servName" class="col-md-1"   data-g="24" itemid="24"><input id="isQuantity" data-g=' + dId + ' type="checkbox"><label style="margin-left: 25px !important;">Исчисляемый</label><label>Единица измерения</label><select id="edizm" style="width: 69%;"><option value="0">Выберите единица измерения</option></select><input type= "button" class="btn genBtn" id="EdizmAdding" value= "+" style= "font-size: 30px;height: 32px;line-height: 1px;margin-bottom: 5px;WIDTH: 5px !important;" onclick= "showTextForEdizm(this)" > <input type="text" id="edizmT" style="width: 40%;display:none"><input type="button" class="btn genBtn" value="Добавить" id="edizmbutton" style="display:none;height: 26px;line-height: 1px;margin-bottom: 5px;WIDTH: 50%;" onclick="SaveEdizm(this)"><input type="button" class="btn genBtn" onclick=SaveProductServ(this,' + dId + ') value="Сохранить услугу"><hr/></div>')
                    getEdizm();
                }
            }
        })
        GetRelatedIcons(e, dId)
    }
    else {
        $('#Icons').parent().remove();
        $('#GroupS .col-md-12').each(function () {
            $(this).children('.col-md-1').removeAttr('disabled')
        });
        $('#GroupS').children('.col-md-12').attr('class', 'col-md-12');

        $('#GrupServices').children(+$(e).parent().attr('id')).remove();
        $('#GrupServices').css('width', '100%')
        $('#GrupServices').children('.col-md-12').each(function () {
            var dataG = $(this).children('input[type="checkbox"]').attr('data-g')
            if (dataG == dId) {
                $(this).remove();
            }
            var dataGButton = $(this).children('input[type="button"]').attr('data-g')
            if (dataGButton == dId) {
                $(this).remove();
            }

            $('#GrupServices .col-md-12').each(function () {
                $(this).children('.col-md-1').removeAttr('disabled')
                $(this).children('.btn').removeAttr('disabled')
            });

            $('#GrupServices').children('.col-md-12').attr('class', 'col-md-12');
        })//children('input[type="checkbox"]').attr('data-g', dId).parent().remove();
        $('#ServiceCost').parent().remove();
        $(e).next().css('width', '');
        $(e).next().next().remove();

    }


}
function SelectIcon(e, dId) {
    var iconAdres = $(e).next().attr('src');
    var iconId = $(e).next().attr('itemid');
    $('#GroupS').children('#d_' + dId).children('label').css('width', '70%');
    $('#GroupS').children('#d_' + dId).children('label').after('<img src=' + iconAdres + ' itemid=' + iconId + ' onclick="ChangeIcon(this,' + dId + ')" style="width: 30px;height: 30px;float: right;margin-top: -20px;">')
    $('#Icons').parent().remove();
    //$('#GrupServices').children('input[data-g="' + dId + '"]').parent().attr('class', 'col-md-12');
    //$('#GrupServices').children('input[data-g="' + dId + '"]').parent().children('input[disabled="disabled"]').removeAttr('disabled')
    if ($('#edizm').length != 0) {
        $('#GrupServices').children('#d_' + dId).attr('class', 'col-md-12');
        $('#GrupServices').children('#d_' + dId).children('input[disabled="disabled"]').removeAttr('disabled')
    }
    else {
        $('#GroupS').children('.col-md-12').each(function () {
            $(this).attr('class', 'col-md-12');
            $(this).children('input[type="checkbox"]').removeAttr('disabled')
        })
        $('#GrupServices').children('div').children('.col-md-12').each(function () {
            $(this).attr('class', '.col-md-12');
            //  $(this).children('.col-md-1').children('input[type="checkbox"]').removeAttr('disabled');
        })
        //$('#GrupServices').children('div .col-md-12').each(function () {
        //    $(this).children('.col-md-1').removeAttr('disabled')

        //});
        $('#GrupServices input[disabled="disabled"]').removeAttr("disabled");

    }

}
function ChangeIcon(e, d) {
    var checkbox = $(e).parent().children('.col-md-1');
    GetRelatedIcons(checkbox, d);
    $(e).remove();
}
function GetRelatedIcons(e, d) {
    var obj = { "d": d }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Apartments.aspx/GetRelatedIcons",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d);
            if (j.length == 1) {
                $(e).next().css('width', '70%')
                $(e).next().after('<img src="' + j[0].ICON_ADRESS + '" itemid=' + j[0].ICON_ID + '  style="width: 30px;height: 30px;float: right;margin-top: -20px;">')
            }
            else {
                if ($('#Icons').length == 0) {
                    $('#GroupS').parent().before('<div style="margin-right: -18%;" class="col-md-4"><label>Выберите Иконку</label><div id="Icons" style="border: 1px solid #000;box-shadow: 3px 4px 5px rgba(0,0,0,0.3);width: 43%;height: 260px !important;overflow: auto;"></div></div>')
                }
                for (var i = 0; i < j.length; i++) {
                    $('#Icons').append('<div id="d_' + d + '" ><div data-d="' + d + '" class="col-md-12" style="margin-top: 35px;"><input onclick="SelectIcon(this,' + d + ')" type="radio" name="ico"><img src=' + j[i].ICON_ADRESS + ' itemid="' + j[i].ICON_ID + '"  style="width: 80%;height: 80%;height: 8;float: right;margin-top: -37px;"></div></div>')
                }


                $('#GroupS .col-md-12').each(function () {
                    $(this).children('.col-md-1').attr('disabled', 'disabled')
                });
                $('#GrupServices .col-md-12').each(function () {
                    $(this).children('.col-md-1').attr('disabled', 'disabled')
                    $(this).children('.btn').attr('disabled', 'disabled')
                    $(this).attr('class', 'col-md-12 box')
                    // $(this).children('div').children('.col-md-12').attr('class', 'col-md-12 box')
                });
                $('#GroupS').children('.col-md-12').attr('class', 'col-md-12 box');
                $('#GrupServices').children('.col-md-12').attr('class', 'col-md-12 box');
                //$('#GrupServices').children('div').children('col-md-12').attr('class','col-md-12 box')
                $(e).parent().attr('class', 'col-md-12');
                $(e).removeAttr('disabled')
            }
        }
    })
}
function MakeCheckHasGrupS(d, e) {
    $('#ServiceHasCost').children('#d_' + d).remove();
    $('#GrupHasServices').children('#d_' + d).remove();

    $('#GroupSHas').children('#d_' + d).remove();
}
function GetResponsibels(selected) {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Services.aspx/GetResponsibels",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var j = JSON.parse(data.d);
            for (var i = 0; i < j.length; i++) {
                $('#Respons').append('<option value=' + j[i].LOG_IN_ID + '>' + j[i].ACCOUNT_NAME + '</option>');
            }
            if (selected != undefined && selected != "") {
                $('#Respons').val(selected)
            }
        }
    })
}
function getEdizm(selected) {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Apartments.aspx/GetEdizm",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var j = JSON.parse(data.d);
            for (var i = 0; i < j.length; i++) {
                $('#edizm').append('<option value=' + j[i].ROOM_FOR_ID + '>' + j[i].ROOM_FOR_ + '</option>');
            }
            if (selected != undefined && selected != "") {
                $('#edizm').val(selected)
            }
        }
    })

}
function showTextForEdizm(e) {
    if ($(e).attr('value') == '+') {
        $('#edizmT').show('1000');
        $('#edizmbutton').show('1000');
        $(e).attr('value', '-')
    }
    else {
        $('#edizmT').hide('1000');
        $('#edizmbutton').hide('1000');
        $(e).attr('value', '+')
    }

}
function SaveEdizm(e) {
    var ValEdizm = $('#edizmT').val();
    if (ValEdizm.length != 0) {
        var obj = { "edizm": ValEdizm }
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Apartments.aspx/AddEdizm",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var j = JSON.parse(data.d);
                if (j.result == "ok") {
                    $('#edizm').val(j.UnitId);
                    $('#edizmT').val('').hide('1000');
                    $('#edizmbutton').hide('1000');
                    $('#EdizmAdding').val('+')
                }
                if (j.result == "in") {
                    $('#edizm').append('<option value=' + j.UnitId + '>' + ValEdizm + '</option>');
                    $('#edizm').val(j.UnitId);
                    $('#edizmT').val('').hide('1000');
                    $('#edizmbutton').hide('1000');
                    $('#EdizmAdding').val('+')

                }
            }
        })
    }
    else {
        $('#ErrEdizm').remove();
        $('#edizmT').after('<label id="ErrEdizm" style="color:red">Необходимо  указать Единица измерения</label>')
        window.setTimeout(function () {
            $('#ErrEdizm').remove();
        }, 3000)
    }
}
function MakeCheckProductService(PId, e) {
    if ($('#ServiceCost').length == 0) {
        $(e).parent().parent().parent().after('<div class="col-md-4"><label>Стоимость (руб.)</label><div id="ServiceCost" style="border: 1px solid #000;box-shadow: 3px 4px 5px rgba(0,0,0,0.3);width: 100%;height: 260px !important;overflow: auto;"></div></div>')
    }

    var checkedOrNot = $(e).prop('checked')
    if (checkedOrNot == true) {
        var ServiceName = $(e).next().text();
        $('#ServiceCost').append('<div  itemid=' + PId + ' class="margTop0"><label itemid=' + PId + ' class="checkBx" style="margin-left: 0px !important;">' + ServiceName + '</label><input type="number" id="nmbr" onchange="checkNumber(this)" min="0" itemid=' + PId + ' style="-right: -23px; */float: left;"><label style="float:right;" >Договорная</label><input itemid=' + PId + ' id="chk" onclick="checkCheckbox(this)" type="checkbox" style="float: right; margin-right:7px;"><hr></div>')
    }
    else {
        $('#ServiceCost').children('.col-md-12').each(function () {
            var pid = $(this).attr('itemid');
            if (pid == PId) {
                $(this).remove();
            }
        })
    }
}
function checkCheckbox(e) {
    if ($(e).prop('checked') == true) {
        //$(e).parent().children('#nmbr').val('').attr('disabled','disabled')
        $('#costServiceNew').attr('disabled', 'disabled')
    }
    else {
        // $(e).parent().children('#nmbr').val('').removeAttr('disabled', 'disabled')
        $('#costServiceNew').removeAttr('disabled')
    }
}
function SaveProductServ(e, d) {
    var successService = true;
    var NameService = $('#servName').val();
    if (NameService.length == 0) {
        successService == false;
        $('#ErrNameServ').remove();
        $('#servName').after('<label id="ErrNameServ" style="color:red">Необходимо вводить имя услуг</label>')
        window.setTimeout(function () {
            $('#ErrNameServ').remove();
        }, 3000)
    }
    var edizm = $('#edizm').val();
    if (edizm == 0) {
        successService = false;
        $('#ErrEdizm').remove()
        $('#EdizmAdding').after('<label id="ErrEdizm" style="color:red">Необходимо выбрать единица измерения</label>')
        window.setTimeout(function () {
            $('#ErrEdizm').remove();
        }, 3000)
    }
    if (successService == true) {
        var isQuantity = ($('isQuantity').prop('checked') == false) ? "0" : "1"
        var obj = { "NameService": NameService, "edizm": edizm, "isQuantity": isQuantity, "dd": d }
        $.ajax({
            error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
            type: "POST",
            url: "Apartments.aspx/AddProductService",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var j = JSON.parse(data.d);
                $(e).parent().parent().children('#addFormbtn').val('Добавить Услугу').attr('data-open', 'on')

                //$('#GrupServices').append('<div class="margTop0"><input type="checkbox" onclick="MakeCheckProductService(' + j.productId + ',this)" class="col-md-1" data-g=' + projId + ' itemid="423" style="-right: -23px; */float: left;"><label itemid="144" class="checkBx">' + NameService + '</label></div>')
                //if ($('#GrupServices').children('#addFormbtn').length == 0) {
                //    $('#GrupServices').children('col-md-12').prepend('<input type="button" id="addFormbtn" class="btn genBtn" value="Добавить Услугу" data-open="on" onclick="showAddForm(' + projId + ',this)" data-g=' + projId + ' itemid="423" style="-right: -23px; */float: left;width: 100%;">')
                //}
                var icon_Adress = $('#GroupS').children('#d_' + d).children('img').attr('src')
                var icon_Id = $('#GroupS').children('#d_' + d).children('img').attr('itemid');
                var directName = $('#GroupS').children('#d_' + d).children('label').text();
                var dCount = $('#GrupServices').children('#d_' + d).length
                //$(e).parent().empty();

                if (dCount == 0) {
                    $('#GrupServices').append('<div id="d_' + d + '"><div data-d="' + d + '" data-icad=' + icon_Adress + ' data-iconid=' + icon_Id + ' class="col-md-12" style="margin-top:0px;"><hr><div style="border-color: cornflowerblue;border-style: double;margin-bottom: 5px;">' + directName + '</div></div><div data-d="' + d + '" class="col-md-12 box" style="margin-top:0px;"><input type="checkbox" onclick="makeCheckProductS(' + j.productId + ',this,' + d + ')" class="col-md-1" data-g="' + d + '" itemid=' + j.productId + ' style="-right: -23px; */float: left;" disabled="disabled"><label  itemid="144" class="checkBx">' + NameService + '</label></div></div>')
                }
                else {
                    $('#GrupServices #d_' + d).append('<div data-d="' + d + '" class="col-md-12 box" style="margin-top:0px;"><input type="checkbox" onclick="makeCheckProductS(' + j.productId + ',this,' + d + ')" class="col-md-1" data-g="' + d + '" itemid=' + j.productId + ' style="-right: -23px; */float: left;" disabled="disabled"><label  itemid="144" class="checkBx">' + NameService + '</label></div>')
                }
                $(e).parent().children('label').remove();
                $(e).parent().children('hr').remove();

                $(e).parent().children('input').remove();
                $('#edizm').remove();
                $(e).parent().children('#edizm,#isQuantity,#servName,#EdizmAdding,#edizmT,#edizmbutton').remove();

                $('#GrupServices').css('width', "100%")

                $('#GroupS').children('.col-md-12').attr('class', 'col-md-12');
                $('#GroupS .col-md-12').each(function () {
                    $(this).children('.col-md-1').removeAttr('disabled')
                });
                $('#GrupServices').children('div').each(function () {
                    $(this).children().attr('class', 'col-md-12');
                })
                $('#GrupServices .col-md-12').each(function () {
                    $(this).children('.col-md-1').removeAttr('disabled')
                    $(this).children('.btn').removeAttr('disabled')
                });
                $(e).parent().children('#addFormbtn').val('Добавить Услугу').attr('data-open', 'on')
                //$(e).parent('.col-md-12').parent('.col-md-12').children('#addFormbtn').val('Добавить Услугу').attr('data-open', 'on')
            }
        })
    }
}
function checkNumber(e) {
    var ValNum = $(e).val();
    if (ValNum < 0) {
        $(e).val(0);
    }
}
function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46 || event.keyCode === 44) {
        return true;
    } else if (key < 48 || key > 57) {
        return false;
    } else {
        return true;
    }
};
function hideErrsMessage(e) {
    // $(e).keypress(validateNumber)
    var ids = $(e).attr('id');

    ids = '#' + ids + 'E';
    $(ids).hide();

}
function hideErrsMessage2(e) {
    var ids = $(e).attr('id');
    if (ids.indexOf('dol') > -1) {
        $('.dols').next('br').remove();
        $('.dols').remove();
        //var dolvalue = $(e).val()
        //if (dolvalue < 0 || dolvalue > 1) {
        //    $(e).val(0)
        //}
    }
    if (ids.indexOf('tel') > -1) {
        $('.tels').next('br').remove()
        $('.tels').remove()

        // //console.log('tel')
        // $(e).mask("(99) 9999*-9999"); 
        //$(e).usPhoneFormat({
        //    format: '(xxx) xxx-xxxx',
        //});
        //$(e).inputmask("(999) 999-999");

        //#PhoneV_E
        var phone = $(e).val();
        var success = true
        var PhoneNumbers = phone.match(/\d/g)

        //if (PhoneNumbers != null && PhoneNumbers.length == 10) {
        //    var tabCOunt = $('.tab-content .tab-pane').length;
        //    var emailCntCOunt = $('.tab-content .tab-pane #itms input[type="tel"]').length
        //    for (var i = 0; i < tabCOunt; i++) {
        //        $('.tab-content .tab-pane:eq(' + i + ') #itms input[type="tel"]').each(function () {
        //            var tel = $(this).val()
        //            if ($(e).attr('id') != $(this).attr('id')) {

        //                if (tel == phone) {
        //                    success = false;
        //                    $('#SaveUp').attr('disabled', 'disabled');
        //                    if ($('#PhoneV_E').length == 0) {

        //                        ErrorForControls($(e), 'Номер телефона повторяется')
        //                    }

        //                }
        //                else {
        //                    success = true
        //                    $('#SaveUp').removeAttr('disabled')
        //                    $('#PhoneV_E').remove();
        //                }
        //            }
        //        })
        //    }
        //}
        //if (success == true) {
        //    if (phone.length == 15) {
        //        //  CheckEmail_or_Phone(e, phone, "")
        //        //   //console.log("15")
        //    }
        //}
        $(e).inputmask("(999) 999-99-99");
    }
    if (ids.indexOf('email') > -1) {
        $('.emails').next('br').remove();
        $('.emails').remove();

        var email = $(e).val();
        var success = true
        if (email.length != 0) {
            if (isValidEmailAddress(email)) {
                success = true
                $('#emailV_E').remove();
                var tabCOunt = $('.tab-content .tab-pane').length;
                var emailCntCOunt = $('.tab-content .tab-pane #itms input[type="email"]').length
                for (var i = 0; i < tabCOunt; i++) {
                    $('.tab-content .tab-pane:eq(' + i + ') #itms input[type="email"]').each(function () {
                        var otheremail = $(this).val()
                        if ($(this).attr('id') != $(e).attr('id')) {
                            if (otheremail == email) {
                                success = false
                                if ($('#emailV_E').length == 0) {

                                    $('#SaveUp').attr('disabled', 'disabled')


                                    ErrorForControls($(e), 'Электронная почта повторяется')
                                }
                            }
                            else {
                                success = true
                                $('#SaveUp').removeAttr('disabled')
                                $('#emailV_E').remove();
                            }
                        }
                    }

                    )
                }
                // //console.log("emailCntCOunt " + emailCntCOunt);
            }
            else {
                success = false
                if ($('#emailV_E').length == 0) {

                    $('#SaveUp').attr('disabled', 'disabled')
                    ErrorForControls($(e), 'Введенное значение не соответствует формату электронной почты')
                }
                else {
                    $('#SaveUp').removeAttr('disabled')

                }
            }
        }
        if (success == true) {
            //  CheckEmail_or_Phone(e, "", email)

        }
    }
    ids = '#' + ids + '_E';
    $(ids + '+ br').remove();
    $(ids).remove();
    var lc = $(e).attr("id");
    if (lc == "lc") {
        var obj = $("#objs").val();
        CHeckAccNumber(e, $(e).val(), obj)
    }
    var email = $(e).attr('id')
    if ($(e).attr('id') != 'floor' && $(e).attr('type') != 'tel' && email.indexOf('email') == -1 && email.indexOf('lc') == -1) {
        var number = $(e).val().replace('-', '')
        $(e).val(number)
    }
    if ($(e).attr('id') === 'countR' || $(e).attr('id') === 'AmRoom') {

        var countR = ($('#countR').val().length == 0) ? 0 : parseInt($('#countR').val());
        var AmRoom = ($('#AmRoom').val().length == 0) ? 0 : parseInt($('#AmRoom').val());
        if (countR < AmRoom) {

            $('#SaveUp').attr('disabled', 'disabled')
            $('#countRErr,#AmRoomErr').remove();
            $('#countR').after('<label id="countRErr" style="color:red"></label>')

            ErrorForControls($('#countR'), 'Количество комнат л/с не может быть больше, чем общее количество комнат в помещении')


            ErrorForControls($('#AmRoom'), 'Количество комнат л/с не может быть больше, чем общее количество комнат в помещении')

        }
        else {
            $('#countRErr,#AmRoomErr').remove();
            $('#SaveUp').removeAttr('disabled')
        }

    }

    if ($(e).attr('id') === 'GenS' || $(e).attr('id') === 'GenSq') {
        var GenS = ($('#GenS').val().length == 0) ? 0 : parseFloat($('#GenS').val());
        var GenSq = ($('#GenSq').val().length == 0) ? 0 : parseFloat($('#GenSq').val());
        if (GenS < GenSq) {

            $('#SaveUp').attr('disabled', 'disabled')


            ErrorForControls($('#GenS'), 'Общая площадь по данному л/с не может быть больше, чем  Общая площадь в помещении')


            ErrorForControls($('#GenSq'), 'Общая площадь по данному л/с не может быть больше, чем  Общая площадь в помещении')

        }
        else {
            $('#GenSErr,#GenSqErr').remove();
            $('#SaveUp').removeAttr('disabled')
            var LiveSq = ($('#LiveSq').val().length == 0) ? 0 : parseFloat($('#LiveSq').val());
            if (LiveSq > GenSq) {

                $('#SaveUp').attr('disabled', 'disabled')

                $('#GenSq').after('<label id="GenSqErr2" style="color:red">Жилая площадь по данному л/с не может быть больше, чем Общая площадь по данному л/с</label>')

                ErrorForControls($('#GenSq'), 'Жилая площадь по данному л/с не может быть больше, чем Общая площадь по данному л/с')



                ErrorForControls($('#LiveSq'), 'Жилая площадь по данному л/с не может быть больше, чем Общая площадь по данному л/с')
                $('#SaveUp').attr('disabled', 'disabled')
            }
            else {

                $('#SaveUp').removeAttr('disabled')
                var LiveSqB = ($('#LiveSqB').val().length == 0) ? 0 : parseFloat($('#LiveSqB').val());

                if (LiveSqB > GenSq) {
                    $('#SaveUp').attr('disabled', 'disabled')



                    ErrorForControls($('#GenSq'), 'Общая площадь без летних зон по данному л/с не может быть больше, чем Общая площадь по данному л/с')


                    ErrorForControls($('#LiveSqB'), 'Общая площадь без летних зон по данному л/с не может быть больше, чем Общая площадь по данному л/с')

                }
                else {

                    $('#SaveUp').removeAttr('disabled')
                }

            }
            var LiveS_ = ($('#LiveS').val().length == 0) ? 0 : parseFloat($('#LiveS').val())
            if (LiveS_ > GenS) {

                $('#SaveUp').attr('disabled', 'disabled')
                ErrorForControls($('#GenS'), 'Жилая площадь не может быть больше, чем  Общая площадь в помещении')
            }
            else {

                $('#SaveUp').remove('disabled')
            }
        }


    }

    if ($(e).attr('id') === 'LiveS' || $(e).attr('id') === 'LiveSq') {
        var LiveS = ($('#LiveS').val().length == 0) ? 0 : parseFloat($('#LiveS').val());
        var LiveSq = ($('#LiveSq').val().length == 0) ? 0 : parseFloat($('#LiveSq').val());
        if (LiveS < LiveSq) {

            $('#SaveUp').attr('disabled', 'disabled')
            ErrorForControls($('#LiveS'), 'Жилая площадь по данному л/с не может быть больше, чем  Жилая площадь в помещении')

            ErrorForControls($('#LiveSq'), 'Жилая площадь по данному л/с не может быть больше, чем  Жилая площадь в помещении')


        }
        else {
            $('#LiveSErr,#LiveSqErr').remove();
            $('#SaveUp').removeAttr('disabled')
            var GenSq = ($('#GenSq').val().length == 0) ? 0 : parseFloat($('#GenSq').val());
            if (LiveSq > GenSq) {



                ErrorForControls($('#GenSq'), 'Жилая площадь по данному л/с не может быть больше, чем Общая площадь по данному л/с')

                ErrorForControls($('#LiveSq'), 'Жилая площадь по данному л/с не может быть больше, чем Общая площадь по данному л/с')

                $('#SaveUp').attr('disabled', 'disabled')
            }
            else {

                $('#SaveUp').removeAttr('disabled')
            }

            var GenS_ = ($('#GenS').val().length == 0) ? 0 : parseFloat($('#GenS').val())
            if (LiveS > GenS_) {

                $('#SaveUp').attr('disabled', 'disabled')
                ErrorForControls($('#LiveS'), 'Жилая площадь не может быть больше, чем  Общая площадь в помещении')
            }
            else {
                $('#GenSErr2,#LiveSErr2').remove()
                $('#SaveUp').remove('disabled')
            }
        }



    }


    if ($(e).attr('id') === 'LiveSqB') {
        var LiveSqB = ($('#LiveSqB').val().length == 0) ? 0 : parseFloat($('#LiveSqB').val());
        var GenSq = ($('#GenSq').val().length == 0) ? 0 : parseFloat($('#GenSq').val());
        if (LiveSqB > GenSq) {
            $('#SaveUp').attr('disabled', 'disabled')
            $('#GenSqErr3,#LiveSqBErr3').remove();
            ErrorForControls($('#GenSq'), 'Общая площадь без летних зон по данному л/с не может быть больше, чем Общая площадь по данному л/с')
            ErrorForControls($('#LiveSqB'), 'Общая площадь без летних зон по данному л/с не может быть больше, чем Общая площадь по данному л/с')

        }
        else {

            $('#SaveUp').removeAttr('disabled')
        }
    }


    if ($(e).attr('id') == 'countR') {
        var countR = $(e).val().replace(/[^0-9\.\,]/g, '');
        $(e).val(countR)
    }
}
function CheckEmail_or_Phone(e, phone, Email) {
    var dObj = { "Email": Email, "Phone": phone }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/CheckEmail_or_Phone",
        data: JSON.stringify(dObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            var j = JSON.parse(data.d)
            if (phone.length == 0) {
                //Email Altina yazilacak
                if (j.result == "1") {
                    if ($('#emailV_E').length == 0) {
                        $(e).after('<label id="emailV_E" style="color:red;padding: 0px 0;">Пользователь с данным e-mail уже зарегистрирован в системе. Пожалуйста, используйте другой e-mail для заведения учётной записи."</label>')

                        $('#SaveUp').attr('disabled', 'disabled')
                    }
                }
                else {
                    $('#emailV_E').remove();

                    $('#SaveUp').removeAttr('disabled')

                }


            }
            if (Email.length == 0) {
                //Phone Altina yazilacak
                if (j.result == "1") {
                    if ($('#PhoneV_E').length == 0) {

                        $('#SaveUp').attr('disabled', 'disabled')
                        $(e).after('<label id="PhoneV_E" style="color:red;padding: 0px 0;">Пользователь с данным № телефона уже зарегистрирован в системе. Пожалуйста, используйте другой № телефона  для заведения учётной записи"</label>')
                    }
                }
                else {
                    $('#PhoneV_E').remove();
                    $('#SaveUp').removeAttr('disabled')

                }
            }
        }
    })
}
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress)
}
function CHeckAccNumber(e, lc, objId) {
    var obj = { "number": lc, "ObjId": objId }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/CHeckAccNumber",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata = $.parseJSON(data.d);
            if (jsondata.result == 0) {
                $("#lc_E").remove();
                $('#SaveUp').removeAttr('disabled')

            }
            else {

                $('#SaveUp').attr('disabled', 'disabled')
                $(e).after('<label id="lc_E" class="errs">Номер лицевого счёта уже зарегистрирован на этом объекте</label>')
            }
        }
    })
}
function SaveApart(o, lg) {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/AddNewApartment",
        data: JSON.stringify(o),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            // SaveLog("Добавить помещение", "Важное", "Личный кабинет (Профиль Управляющего)", "Управляющий", "Добавлено новое помещение", Log)
            var json = JSON.parse(data.d);
            if (json.result == "OK") {
                //nomer
                // var jObj = JSON.parse(o);
                //SaveLog("Добавить помещение", "Важное", "Личный кабинет (Профиль Управляющего)", "Управляющий", "Добавлено новое помещение (Объект " + $('#objs option:selected').text() + " /Номер помещения " + $('#rnum').val() + ")", lg)
                //for (var i = 0; i < o.length; i++) {

                //}
                SaveLog("Добавить помещение", "Важное", "Личный кабинет (Профиль Управляющего)", "Управляющий", "Добавлен лицевой счет  (Объект " + $('#objs option:selected').text() + " /Номер помещения " + $('#rnum').val() + ")", lg)
                window.location.href = "Apartments.aspx";
            }
            else {
                $('#deleteO').val("OK");
                $('#cls').hide()
                $('#deleteO').click(function () {
                    // $('#closeUpl').click();
                    $('#cls').click();
                })
                alertWithButton2("Ошибка", "Помещение с таким назначением, номером и типом уже есть в системе!", "", "", "", "", "")
            }

            $('.ui-loader-background').hide();
            $('#loader').hide();
        }
    })
}
function gtTypeOfroom(slc, roomf) {
    roomf = (roomf == undefined) ? 0 : roomf
    var ob = { roomf: roomf }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/GetRoomTypes_ByRoomfor_",//"../Disp_Admin/RegisterRequest.aspx/getRoomTypes",
        data: JSON.stringify(ob),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // //console.log(jsondata_)
            $("#r_t").find('option').not(':first').remove()
            for (var i = 0; i < jsondata_.length; i++) {
                $("#r_t").append('<option value="' + jsondata_[i].ROOM_TYPE_ID + '">' + jsondata_[i].ROOM_TYPE + '</option>')

            }
            if (slc != "") {
                $("#r_t").val(slc).select2('val', slc)
            }


        }

    })
}
function gtTypeOfroomBase() {

    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "../Disp_Admin/RegisterRequest.aspx/getRoomTypes",

        contentType: "application/json; charset=utf-8",

        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // //console.log(jsondata_)

            for (var i = 0; i < jsondata_.length; i++) {
                //$("#appType").append('<option value="' + jsondata_[i].ROOM_TYPE_ID + '">' + jsondata_[i].ROOM_TYPE + '</option>')
                $('#appType').append('<input type="checkbox" data-url="null" value=' + jsondata_[i].ROOM_TYPE_ID + '   class="dispDatas" data-rmf="' + jsondata_[i].ROOM_FOR_ID + '"><label class="checkBx">' + jsondata_[i].ROOM_TYPE + '</label>')
            }

            // $('#appType').multiselect({

            //     includeSelectAllOption: true,
            //     nonSelectedText:'Выберите Тип помещения'

            // });
            // $('#appType').hide()
            //// $('.multiselect-selected-text:eq(1)').text('Выберите Тип помещения')

        }

    })
}
function getRoomForBase() {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/getRoomFor",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // //console.log(jsondata_)

            for (var i = 0; i < jsondata_.length; i++) {
                //$("#appPurp").append('<option value="' + jsondata_[i].ROOM_FOR_ID + '">' + jsondata_[i].ROOM_FOR_ + '</option>')
                $('#appPurp').append('<input type="checkbox"   value=' + jsondata_[i].ROOM_FOR_ID + '   class="dispDatas"><label class="checkBx">' + jsondata_[i].ROOM_FOR_ + '</label>')

            }
            //$('#appPurp').multiselect({

            //    includeSelectAllOption: true,
            //    nonSelectedText:'Выберите Назначение помещения'
            //});
            //$('#appPurp').hide()
            // $('.multiselect-selected-text:eq(0)').text('Выберите Назначение помещения')

        }
    })
}
function getRoomFor(slc) {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/getRoomFor",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // //console.log(jsondata_)
            var isNew = jsondata_[0].NewStructure;
            if (isNew != null) {
                $('#typeProp').remove();
                $('label[for="typeProp"]').remove();
                $('.tab-content').children('#tab0').children('.row').after('<hr><div class="row"><ul class="nav nav-tabs"><li data-tab="0" class="active" onclick="showTab(this)" style="cursor:pointer"><a data-toggle="tab"  aria-expanded="true">Физические лица</a></li><li data-tab="1" onclick="showTab(this)" style="cursor:pointer" class=""><a data-toggle="tab" aria-expanded="false">Юридические лица</a></li><li data-tab="2" onclick="showTab(this)" style="width: 20%;cursor:pointer;" class="GosTab"><a data-toggle="tab" aria-expanded="true">Государственные учреждения</a></li></ul><div class="tab-content"><div id="tab0" data-tab="0" class="faces tab-pane fade in active"><div class="col-md-12"><div class="col-md-5 bordering" ><label> Пользователи помещения</label><table><thead><tr><th>ФИО</th><th>Дата Рождения</th><th>Мобильный телефон</th></tr></thead><tbody><tr><td></td><td></td><td></td></tr></tbody></table></div><div class="col-md-2 arrowDiv" ><i class="fa fa-arrow-right arrows" aria-hidden="true"></i><br><i class="fa fa-arrow-right arrows" aria-hidden="true" ></i></div><div class="col-md-5 bordering"><label>Родственники</label><table><thead><tr><th>ФИО</th><th>Тип родства</th><th>Вид пользвателя</th><th>Дата рождени</th></tr></thead><tbody><tr><td></td><td></td><td></td><td></td></tr></tbody></table></div> </div><a class="btn genBtn" href="AddUsers_.aspx">Добавить физическое лицо</a></div><div id="tab1" data-tab="1" class="faces tab-pane fade"><h6 class="h6color">Юридические лица</h6><table><thead><tr><th>Наименование организации</th><th>Тип собственности</th><th>ИНН</th><th>КПП</th><th>ОГРН</th></tr></thead><tbody><tr><td></td><td></td><td></td><td></td><td></td></tr></tbody></table><a class="btn genBtn" href="AddLegalEntity_.aspx">Добавить юридическое лицо</a></div><div id="tab2" data-tab="2" class="faces tab-pane fade"><h6 class="h6color">Государственные учреждения</h6><table><thead><tr><th>Наименование Государственные учреждения</th><th>Право собственности</th><th>ИНН</th><th>КПП</th></tr></thead><tbody><tr><td></td><td></td><td></td><td></td></tr></tbody></table><a class="btn genBtn" href="GovernmentAgency.aspx">Добавить Государственные учреждения</a></div></div></div>')
            }
            for (var i = 0; i < jsondata_.length; i++) {
                $("#RoomF").append('<option value="' + jsondata_[i].ROOM_FOR_ID + '">' + jsondata_[i].ROOM_FOR_ + '</option>')

            }
            if (slc != "") {
                $("#RoomF").val(slc).select2('val', slc)
            }
        }
    })
}
function GetUproObj(lg_, slc) {
    var dObj = { "lg": lg_ }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/GetUproObj",
        data: JSON.stringify(dObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            var jsondata_1 = JSON.parse(data.d)
            for (var i = 0; i < jsondata_1.length; i++) {
                $("#objs").append('<option value="' + jsondata_1[i].Object_Id + '">' + jsondata_1[i].ObjectAdress + '</option>')
            }


            if (slc != "") {
                $("#objs").val(slc).select2('val', slc)
            }

        }
    })
}
function getlog2(lg, em) {
    var obj_lg = {
        lg_: lg,
        EventModul: em,

    };
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "../Client_Admin/CreateOpject.aspx/GetLogs",
        data: JSON.stringify(obj_lg),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //  //console.log(result)
            $("#lgs_").empty();
            //var jsondata_1 = JSON.stringify(result.d)
            var jsondata_2 = JSON.parse(result.d)
            // //console.log()
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
            //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            alert("FAIL");
        }
    });
}
function SearchLog(lg, St, C) {



    $("#lgs").empty();
    var obj_lg2 = {
        l_g: lg, Stext: St, Cl: C
    };
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "../Client_Admin/CreateOpject.aspx/SearchLog",
        data: JSON.stringify(obj_lg2),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //  //console.log(result)

            //var jsondata_1 = JSON.stringify(result.d)
            var jsondata_2 = JSON.parse(result.d)
            // //console.log()
            //lftRol
            for (var i = 0; i < jsondata_2.length; i++) {
                var accNa_me;
                if (jsondata_2[i].ACCOUNT_NAME == "") {
                    accNa_me = jsondata_2[i].E_MAIL
                }
                else {
                    accNa_me = jsondata_2[i].ACCOUNT_NAME;
                }
                $("#lgs").append("<li>" + jsondata_2[i].DATESTAMP + ": " + jsondata_2[i].EVENT_MESSAGE + ": " + accNa_me + "</li> ")
                //  $("#lgId_").text("Login_" + jsondata_2[i].ACCOUNT_QUANTITY)
            }


        },

        error: function (r) {
            // //alert("Error");
            //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            alert("FAIL");
        }
    });


}
function getOwnerShip() {
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "AddApartment.aspx/GetOwnerShip",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // //console.log(jsondata_)

            for (var i = 0; i < jsondata_.length; i++) {
                $("#typeProp").append('<option value="' + jsondata_[i].OWNERSHIP_TYPE_ID + '">' + jsondata_[i].OWNERSHIP_TYPE_ + '</option>')

            }



        }

    })
}
function AddElem(e, i) {
    var nexti = i + 1
    if ($('.inds').length < 40) {
        var typPropeval = $(e).val()


        $(e).before(giveElements(nexti).sobs)
        $(e).before(giveElements(nexti).dol)
        $(e).before(giveElements(nexti).tel)
        $(e).before(giveElements(nexti).email)
        $('span[id="delInd"]').remove()
        for (var k = 0; k <= nexti; k++) {
            $('input[id="email' + k + '"]').parent().parent().parent().after(giveElements(k).deleteInd)
        }
        $(e).attr('onclick', 'AddElem(this,' + nexti + ')')
        if (nexti == 9) {
            $(e).attr('style', 'display:none !important')
        }
    }



}
function delElem(e, i) {

    $(e).prevAll('.inds' + i + '').remove();
    var indsCount = $(e).parent('div').children('.rounded8').find('input[onkeyup="hideErrsMessage2(this)"]').length;
    $(e).remove()

    if (indsCount == 8) {
        $('span[id="delInd"]').remove();
    }

}

function changeStartStop(e) {
    if ($(e).prop('checked') == true) {
        $('#startDead,#endDead').attr('disabled', 'disabled');
        $('#startDead,#endDead').val("")
    }
    else {
        $('#startDead,#endDead').removeAttr('disabled');
        $('#startDead').val('1');
        $('#endDead').val('31');
    }
}
function ChangeNumbersStartStop(e) {
    var id_number = $(e).attr('id');
    if (id_number == 'startDead') {
        var start = parseInt($(e).val())
        var start_length = start.length
        if (start <= 0 && start_length != 0) {
            $(e).val(1)
        }
        if (start > 31) {
            $(e).val(31)
        }

        //var end = parseInt($('#endDead').val());
        //if (start >= end && start_length != 0) {
        //    start = end - 1;
        //    $(e).val(start)
        //}
    }

    if (id_number == 'endDead') {
        var end = parseInt($(e).val())
        if (end > 31) {
            $(e).val(31)
        }
        if (end <= 0 && end.length != 0) {
            $(e).val(2)
            $('#startDead').val(1);
        }
        //var start = $('#startDead').val();
        //if (start >= end && end.length != 0) {
        //    $(e).val(31)
        //    $('#startDead').val(30);
        //}
    }
}
function Cnahge_CNTR_DeadLine(e) {
    var start = $('#startDead').val();
    start = (start.length == 0) ? 0 : parseInt(start)
    var stop = $('#endDead').val();
    stop = (stop.length == 0) ? 0 : parseInt(stop)
    var on_end = ($('#mnth').prop('checked') == true) ? "1" : "";
    var objId = $('#objsM').val();
    var ob = { 'objId': objId, 'start': start, 'stop': stop, 'on_end': on_end }
    $.ajax({
        error: function (e) { $('.ui-loader-background').hide(); $('#loader').hide(); alert(e.responseJSON.Message) },
        type: "POST",
        url: "Counters.aspx/Cnahge_CNTR_DeadLine",
        data: JSON.stringify(ob),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#cancelDead').click()

        }
    })
}