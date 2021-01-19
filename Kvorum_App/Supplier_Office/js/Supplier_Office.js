$(function () {

    var Guid = sessionStorage.getItem("guid_supp");
    
    if (Guid == null) {
        window.location.href='../ClientLogin.aspx'
    }
    else {
        getSupplierDetails_LK(Guid);
    }

    var loc = window.location.pathname;

    
    if (loc == '/Supplier_Office/Requests.aspx') {
        GetSupplierRequesets_LK(Guid)
        getTimeForS();
        getDate
    }
    if (loc == '/Supplier_Office/RequestCreate.aspx') {

        var R_id = sessionStorage.getItem("RId")
        if (R_id == null) {
            getTimeForS();
            getDate();
            GetObjectsBySupplierGuid_LK(Guid, "")
            GetServicesForSupplier_LK('', Guid, null);
            $("#send").click(function () {
                var slcObj = $("#objctZ").val();
                var successRequest = true;
                if (slcObj == 0) {
                    successRequest = false;
                    $("#adr_S").text("Необходимо выбрать адрес объекта").show();
                    $("html, body").animate({ scrollTop: 50 }, "slow");
                    window.setTimeout(function () { $('#adr_S').hide(); }, 3000);
                }


                var Ind = $("#Ind").val();
                if (Ind.length == 0) {
                    successRequest = false
                    $("#Ind_S").text("Необходимо заполнить поле \"Заявитель\"").show();
                    $("html, body").animate({ scrollTop: 50 }, "slow");
                    window.setTimeout(function () { $('#Ind_S').hide(); }, 3000);
                }

                var Phn = $("#Phn").val();
                if (Phn.length == 0) {
                    successRequest = false
                    $("#Phn_S").text("Необходимо заполнить поле \"Номер телефона\"").show();
                    $("html, body").animate({ scrollTop: 50 }, "slow");
                    window.setTimeout(function () { $('#Phn_S').hide(); }, 3000);
                }


                var Calendar = $("#calen1").val();
                //var time = $("#tm").val();



                //  var otvets = $("#Otven").attr('itemid');
                var RText = $("#RText").val();
                RText = encodeURIComponent(RText)
                // var indid = $("#Ind").attr("itemid");

                slcObj = JSON.parse(slcObj)
                //    var ObjId = $("#objctZ").val();
                var sclObjName = $("#objctZ option:selected").text();
                //  var indid = $("#Ind").attr("itemid")
                var RComment = $('#RComment').val()

                var SUPPSERVICES = []
                $('.marpad0').children('.col-md-12').each(function () {
                    $(this).children('table').each(function () {
                        var SERVICE_END_COST = $(this).children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val()
                        var SERVICE_COMMENT = $(this).children('tbody').children('tr:eq(0)').children('td:eq(0)').children('textarea').val()
                        var SERVICE_COST = $(this).children('thead').children('tr:eq(0)').children('th:eq(2)').children('#Ser_Summ').val();
                        var SERVICE_COUNT = $(this).children('thead').children('tr:eq(0)').children('th:eq(1)').children('#kol').val();
                        var SERVICE_GUID = $(this).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').find('option:selected').val();
                        if (SERVICE_COST.length == 0 || SERVICE_COST == 0) {

                            $('#ErrSumm').remove()
                            $(this).children('thead').children('tr:eq(0)').children('th:eq(2)').children('#Ser_Summ').after('<label id="ErrSumm" style="color:red">Необходимо заполнить поля "Цена"</label>')
                            $("html, body").animate({ scrollTop: 500 }, "slow");
                            window.setTimeout(function () { $('#ErrSumm').remove(); }, 3000);
                            successRequest = false
                        }
                        if (SERVICE_COUNT.length == 0 || SERVICE_COUNT == 0) {
                            $('#Errkol').remove()
                            $(this).children('thead').children('tr:eq(0)').children('th:eq(1)').children('#kol').after('<label id="Errkol" style="color:red">Необходимо заполнить поля "Количество"</label>')
                            $("html, body").animate({ scrollTop: 500 }, "slow");
                            window.setTimeout(function () { $('#Errkol').remove(); }, 3000);
                            successRequest = false
                        }
                        var SERVICE_NAME = $(this).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').find('option:selected').text();
                        SUPPSERVICES.push({
                            "SERVICE_COMMENT": SERVICE_COMMENT,
                            "SERVICE_COST": SERVICE_COST,
                            "SERVICE_COUNT": SERVICE_COUNT,
                            "SERVICE_CUSTOM": "",
                            "SERVICE_END_COST": SERVICE_END_COST,
                            "SERVICE_GUID": SERVICE_GUID,
                            "SERVICE_NAME": SERVICE_NAME,
                            "SERVICE_PERCENT": "",
                            "SERVICE_SHOP_ID": ""
                        })
                    })

                })
                var totality = $('#totalCostN').val()
                if (totality == 0 || totality.length == 0) {
                    $('#ErrTotal').remove();
                    $('#totlCost').text('Необходимо заполнить поля "Итого"').css('color', 'red')
                    //   $('#totalCostN').after('<label id="ErrTotal" style="color:red">Необходимо заполнить поля "Итого"</label>')
                    $("html, body").animate({ scrollTop: 500 }, "slow");
                    window.setTimeout(function () { $('#totlCost').text("Итого:").css('color', 'black'); }, 4000);
                    successRequest = false
                }
                RComment = encodeURI(RComment)
                var RImg = ""//[]; // $(".foto-disp").attr("data-url")
                //for (var i = 0; i < 4; i++) {
                //    RImg.push({ "REQUEST_COMMENT_": "=", "COMMENT_FILE": $("#fotoDisp" + i + "").attr("data-url"), "COMMENT_DATETIME": "++" });
                //}
                $("#imgss img").each(function () {
                    var ImgSrc = $(this).attr("data-url")
                    //  RImg.push({ "REQUEST_COMMENT_": "=", "COMMENT_FILE": ImgSrc, "COMMENT_DATETIME": "++" })
                    if ($(this).is(':last')) {
                        RImg = RImg + ImgSrc
                    }
                    else {
                        RImg = RImg + ImgSrc + ","
                    }
                })
                RImg = RImg.substr(0, RImg.lastIndexOf(','))
                var em_ = $('#chkem').prop('checked')
                em_ = "" + em_ + ""
                var opl = $('#opl').prop('checked');
                opl = "" + opl + ""
                var ispol = $('#IspolList').val();

                var obj = {
                    suppRequest:
                    {
                        "AUTHOR": Ind,
                        "CLIENT": Ind,
                        "COMMENT": $('#RText').val(),
                        "COMMENTS": "",//RComment,
                        "CUSTOM": "",
                        "FILES": RImg,
                        "OBJECT": $('#objctZ option:selected').text(),
                        "OBJECT_ID": $('#objctZ option:selected').val(),
                        "PAYMENT_SUMM": $('#totalCostN').val(),
                        "PHONE_NUMBER": Phn,
                        "ROOM": "",//room_,
                        "STATUS": "",
                        "SUPPLIER": $('#objctZ').attr('data-supp'),
                        "SUPPLIER_GUID": Guid,// $('#objctZ').attr('data-suppGuid'),
                        "SUPPSERVICES": SUPPSERVICES,
                        "WORKBEGIN": $('#tmS').val().replace(':', '-'),
                        "WORKDATE": Calendar.split('-').reverse().join('.'),
                        "WORKEND": $('#tmE').val().replace(':', '-'),
                        "login": "",// accnmbr,
                        "tokenID": ""
                    }


                }
                //console.log(JSON.stringify(obj))
                if (successRequest == true) {
                    SaveRequest_Supp(obj)
                }
            })
        }
        else {
            GetRequesByR_LK(R_id)
            var st = sessionStorage.getItem("st")
            if (st == 2) {
                 
                $("#hdPr").text("Прикрепленный файл")
                $('#objctZ').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');//mms3
                $("#Phn,#Ind").attr('disabled', 'disabled')
                $("#SendComent,#hstCom,#hstComh").hide();
                $("#RText").attr('disabled', 'disabled');
               
                $("#files").hide();
              
                $("#backUo").text("Отменить заявку")
                //$("#SaveDD").click(function () {


                //    Change_suppreq_status(LogId, $('#hedrZ').attr('z_id'), "1", "", $('#hedrZ').attr('r_num'))
                //})
                $("#send").text('Сохранить')
                $("#SaveMO").text('Принять в работу').show();
                $("#send").click(function () {
                    var slcObj = $("#objctZ").val();
                    var successRequest = true;
                    if (slcObj == 0) {
                        successRequest = false;
                        $("#adr_S").text("Необходимо выбрать адрес объекта").show();
                        $("html, body").animate({ scrollTop: 50 }, "slow");
                        window.setTimeout(function () { $('#adr_S').hide(); }, 3000);
                    }
                    var Ind = $("#Ind").val();
                    if (Ind.length == 0) {
                        successRequest = false
                        $("#Ind_S").text("Необходимо заполнить поле \"Заявитель\"").show();
                        $("html, body").animate({ scrollTop: 50 }, "slow");
                        window.setTimeout(function () { $('#Ind_S').hide(); }, 3000);
                    }
                    var Phn = $("#Phn").val();
                    if (Phn.length == 0) {
                        successRequest = false
                        $("#Phn_S").text("Необходимо заполнить поле \"Номер телефона\"").show();
                        $("html, body").animate({ scrollTop: 50 }, "slow");
                        window.setTimeout(function () { $('#Phn_S').hide(); }, 3000);
                    }


                    var Calendar = $("#calen1").val();
                 
                    var RText = $("#RText").val();
                    RText = encodeURIComponent(RText)
                

                 
                    var RComment = $('#RComment').val()
                   
                    var SUPPSERVICES = []
                    $('.marpad0').children('.col-md-12').each(function () {
                        $(this).children('table').each(function () {
                            var SERVICE_END_COST = $(this).children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val()
                            var SERVICE_COMMENT = $(this).children('tbody').children('tr:eq(0)').children('td:eq(0)').children('textarea').val()
                            var SERVICE_COST = $(this).children('thead').children('tr:eq(0)').children('th:eq(2)').children('#Ser_Summ').val();
                            var SERVICE_COUNT = $(this).children('thead').children('tr:eq(0)').children('th:eq(1)').children('#kol').val();
                            var SERVICE_GUID = $(this).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').find('option:selected').val();
                            if (SERVICE_COST.length == 0 || SERVICE_COST == 0) {

                                $('#ErrSumm').remove()
                                $(this).children('thead').children('tr:eq(0)').children('th:eq(2)').children('#Ser_Summ').after('<label id="ErrSumm" style="color:red">Необходимо заполнить поля "Цена"</label>')
                                $("html, body").animate({ scrollTop: 500 }, "slow");
                                window.setTimeout(function () { $('#ErrSumm').remove(); }, 3000);
                                successRequest = false
                            }
                            if (SERVICE_COUNT.length == 0 || SERVICE_COUNT == 0) {
                                $('#Errkol').remove()
                                $(this).children('thead').children('tr:eq(0)').children('th:eq(1)').children('#kol').after('<label id="Errkol" style="color:red">Необходимо заполнить поля "Количество"</label>')
                                $("html, body").animate({ scrollTop: 500 }, "slow");
                                window.setTimeout(function () { $('#Errkol').remove(); }, 3000);
                                successRequest = false
                            }
                            var SERVICE_NAME = $(this).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').find('option:selected').text();
                            SUPPSERVICES.push({
                                "SERVICE_COMMENT": SERVICE_COMMENT,
                                "SERVICE_COST": SERVICE_COST,
                                "SERVICE_COUNT": SERVICE_COUNT,
                                "SERVICE_CUSTOM": "",
                                "SERVICE_END_COST": SERVICE_END_COST,
                                "SERVICE_GUID": SERVICE_GUID,
                                "SERVICE_NAME": SERVICE_NAME,
                                "SERVICE_PERCENT": "",
                                "SERVICE_SHOP_ID": ""
                            })
                        })

                    })
                    var totality = $('#totalCostN').val()
                    if (totality == 0 || totality.length == 0) {
                        $('#ErrTotal').remove();
                        $('#totlCost').text('Необходимо заполнить поля "Итого"').css('color', 'red')
                        //   $('#totalCostN').after('<label id="ErrTotal" style="color:red">Необходимо заполнить поля "Итого"</label>')
                        $("html, body").animate({ scrollTop: 500 }, "slow");
                        window.setTimeout(function () { $('#totlCost').text("Итого:").css('color', 'black'); }, 4000);
                        successRequest = false
                    }
                    RComment = encodeURI(RComment)
                    var RImg = "" 
                    $("#imgss img").each(function () {
                        var ImgSrc = $(this).attr("data-url")
                         
                        if ($(this).is(':last')) {
                            RImg = RImg + ImgSrc
                        }
                        else {
                            RImg = RImg + ImgSrc + ","
                        }
                    })
                    RImg = RImg.substr(0, RImg.lastIndexOf(','))
                    var em_ = $('#chkem').prop('checked')
                    em_ = "" + em_ + ""
                    var opl = $('#opl').prop('checked');
                    opl = "" + opl + ""
                

                    var obj = {
                        suppRequest:
                        {
                            "AUTHOR": Ind,
                            "CLIENT": Ind,
                            "LOGIN": $('#Acnum').val(),
                            "GUID": $('#hedrZ').attr('z_id'),
                            "STATUS": st,
                            "PAYED": null,
                            "COMMENT": $('#RText').val(),
                            "COMMENTS": RComment,
                            "CUSTOM": "",
                            "FILES": RImg,
                            "OBJECT": $('#objctZ option:selected').text(),
                            "OBJECT_ID": $('#objctZ option:selected').val(),
                            "PAYMENT_SUMM": $('#totalCostN').val(),
                            "PHONE_NUMBER": Phn,
                            "ROOM": "",//room_,
                            "STATUS": "",
                            "SUPPLIER": $('#objctZ').attr('data-supp'),
                            "SUPPLIER_GUID": $('#objctZ').attr('data-suppguid'),
                            "SUPPSERVICES": SUPPSERVICES,
                            "WORKBEGIN": $('#tmS').val().replace(':', '-'),
                            "WORKDATE": Calendar.split('-').reverse().join('.'),
                            "WORKEND": $('#tmE').val().replace(':', '-'),
                            "login": "",
                            "tokenID": ""
                        }


                    }
                    //console.log(JSON.stringify(obj))
                    if (successRequest == true) {
                        SaveRequest_Supp2_LK(obj, "S")
                    }
                })
                $("#SaveMO").click(function () {
                    var slcObj = $("#objctZ").val();
                    var successRequest = true;
                    if (slcObj == 0) {
                        successRequest = false;
                        $("#adr_S").text("Необходимо выбрать адрес объекта").show();
                        $("html, body").animate({ scrollTop: 50 }, "slow");
                        window.setTimeout(function () { $('#adr_S').hide(); }, 3000);
                    }
                    var room_ = $("#Room").val();
                    if (room_.length == 0) {
                        successRequest = false
                        $("#Room_S").text("Необходимо заполнить поле \"Помещение\"").show();
                        $("html, body").animate({ scrollTop: 50 }, "slow");
                        window.setTimeout(function () { $('#Room_S').hide(); }, 3000);
                    }
                    var accnmbr = $("#Acnum").val();
                    if (accnmbr.length == 0) {
                        successRequest = false
                        $("#Acnum_S").text("Необходимо заполнить поле \"Номер лицевого счета\"").show();
                        $("html, body").animate({ scrollTop: 50 }, "slow");
                        window.setTimeout(function () { $('#Acnum_S').hide(); }, 3000);
                    }

                    var Ind = $("#Ind").val();
                    if (Ind.length == 0) {
                        successRequest = false
                        $("#Ind_S").text("Необходимо заполнить поле \"Заявитель\"").show();
                        $("html, body").animate({ scrollTop: 50 }, "slow");
                        window.setTimeout(function () { $('#Ind_S').hide(); }, 3000);
                    }

                    var Phn = $("#Phn").val();
                    if (Phn.length == 0) {
                        successRequest = false
                        $("#Phn_S").text("Необходимо заполнить поле \"Номер телефона\"").show();
                        $("html, body").animate({ scrollTop: 50 }, "slow");
                        window.setTimeout(function () { $('#Phn_S').hide(); }, 3000);
                    }


                    var Calendar = $("#calen1").val();
                    var time = $("#tm").val();



                    var otvets = $("#Otven").attr('itemid');
                    var RText = $("#RText").val();
                    RText = encodeURIComponent(RText)
                    var indid = $("#Ind").attr("itemid");

                    slcObj = JSON.parse(slcObj)
                    var ObjId = $("#objctZ").val();
                    var sclObjName = $("#objctZ option:selected").text();
                    var indid = $("#Ind").attr("itemid")
                    var RComment = $('#RComment').val()
                    //if (indid == undefined) {
                    //    var objNotInd = [];
                    //    objNotInd.push({ "Object_Adress": sclObjName, "Object_Id": ObjId, "room": room_, "indName": Ind, "phon": Phn, "score": $('#Acnum').val() })
                    //    RComment = RComment + "|" + JSON.stringify(objNotInd)
                    //    indid = 0;
                    //}
                    var SUPPSERVICES = []
                    $('.col-md-12').each(function () {
                        $(this).children('table').each(function () {
                            var SERVICE_END_COST = $(this).children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val()
                            var SERVICE_COMMENT = $(this).children('tbody').children('tr:eq(0)').children('td:eq(0)').children('textarea').val()
                            var SERVICE_COST = $(this).children('thead').children('tr:eq(0)').children('th:eq(2)').children('#Ser_Summ').val();
                            var SERVICE_COUNT = $(this).children('thead').children('tr:eq(0)').children('th:eq(1)').children('#kol').val();
                            var SERVICE_GUID = $(this).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').find('option:selected').val();
                            if (SERVICE_COST.length == 0 || SERVICE_COST == 0) {

                                $('#ErrSumm').remove()
                                $(this).children('thead').children('tr:eq(0)').children('th:eq(2)').children('#Ser_Summ').after('<label id="ErrSumm" style="color:red">Необходимо заполнить поля "Цена"</label>')
                                $("html, body").animate({ scrollTop: 500 }, "slow");
                                window.setTimeout(function () { $('#ErrSumm').remove(); }, 3000);
                                successRequest = false
                            }
                            if (SERVICE_COUNT.length == 0 || SERVICE_COUNT == 0) {
                                $('#Errkol').remove()
                                $(this).children('thead').children('tr:eq(0)').children('th:eq(1)').children('#kol').after('<label id="Errkol" style="color:red">Необходимо заполнить поля "Количество"</label>')
                                $("html, body").animate({ scrollTop: 500 }, "slow");
                                window.setTimeout(function () { $('#Errkol').remove(); }, 3000);
                                successRequest = false
                            }
                            var SERVICE_NAME = $(this).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').find('option:selected').text();
                            SUPPSERVICES.push({
                                "SERVICE_COMMENT": SERVICE_COMMENT,
                                "SERVICE_COST": SERVICE_COST,
                                "SERVICE_COUNT": SERVICE_COUNT,
                                "SERVICE_CUSTOM": "",
                                "SERVICE_END_COST": SERVICE_END_COST,
                                "SERVICE_GUID": SERVICE_GUID,
                                "SERVICE_NAME": SERVICE_NAME,
                                "SERVICE_PERCENT": "",
                                "SERVICE_SHOP_ID": ""
                            })
                        })

                    })
                    var totality = $('#totalCostN').val()
                    if (totality == 0 || totality.length == 0) {
                        $('#ErrTotal').remove();
                        $('#totlCost').text('Необходимо заполнить поля "Итого"').css('color', 'red')
                        //   $('#totalCostN').after('<label id="ErrTotal" style="color:red">Необходимо заполнить поля "Итого"</label>')
                        $("html, body").animate({ scrollTop: 500 }, "slow");
                        window.setTimeout(function () { $('#totlCost').text("Итого:").css('color', 'black'); }, 4000);
                        successRequest = false
                    }
                    RComment = encodeURI(RComment)
                    var RImg = ""//[]; // $(".foto-disp").attr("data-url")
                    //for (var i = 0; i < 4; i++) {
                    //    RImg.push({ "REQUEST_COMMENT_": "=", "COMMENT_FILE": $("#fotoDisp" + i + "").attr("data-url"), "COMMENT_DATETIME": "++" });
                    //}
                    $("#imgss img").each(function () {
                        var ImgSrc = $(this).attr("data-url")
                        //  RImg.push({ "REQUEST_COMMENT_": "=", "COMMENT_FILE": ImgSrc, "COMMENT_DATETIME": "++" })
                        if ($(this).is(':last')) {
                            RImg = RImg + ImgSrc
                        }
                        else {
                            RImg = RImg + ImgSrc + ","
                        }
                    })
                    RImg = RImg.substr(0, RImg.lastIndexOf(','))
                    var em_ = $('#chkem').prop('checked')
                    em_ = "" + em_ + ""
                    var opl = $('#opl').prop('checked');
                    opl = "" + opl + ""
                    var ispol = $('#IspolList').val();

                    var obj = {
                        suppRequest:
                        {
                            "AUTHOR": Ind,
                            "CLIENT": Ind,
                            "LOGIN": $('#Acnum').val(),
                            "GUID": $('#hedrZ').attr('z_id'),
                            "STATUS": st,
                            "PAYED": null,
                            "COMMENT": $('#RText').val(),
                            "COMMENTS": RComment,
                            "CUSTOM": "",
                            "FILES": RImg,
                            "OBJECT": $('#objctZ option:selected').text(),
                            "OBJECT_ID": $('#objctZ option:selected').val(),
                            "PAYMENT_SUMM": $('#totalCostN').val(),
                            "PHONE_NUMBER": Phn,
                            "ROOM": room_,
                            "STATUS": "",
                            "SUPPLIER": $('#objctZ').attr('data-supp'),
                            "SUPPLIER_GUID": $('#objctZ').attr('data-suppGuid'),
                            "SUPPSERVICES": SUPPSERVICES,
                            "WORKBEGIN": $('#tmS').val().replace(':', '-'),
                            "WORKDATE": Calendar.split('-').reverse().join('.'),
                            "WORKEND": $('#tmE').val().replace(':', '-'),
                            "login": accnmbr,
                            "tokenID": ""
                        }


                    }
                    //console.log(JSON.stringify(obj))
                    if (successRequest == true) {
                        SaveRequest_Supp2(obj, "P")
                        Change_suppreq_status(LogId, $('#hedrZ').attr('z_id'), "1", $('#cmntsts2').val(), $('#hedrZ').attr('r_num'))
                    }


                })
                $("#backUo").click(function () {
                    var successOtmen = true

                    var objOt = { "Rid": R_id, 'login_id': $('#lgId').text() }
                    $('#myModalAlert .modal-contentAlert .modal-footerAlert').children('h3').remove();
                   
                    if (successOtmen == true) {
                      
                         
                         
                        $('#myModalAlert').show();
                        $('#reasonlbl,#cmntsts2,#Close_ot,#OkVipol').remove();

                        $('#myModalAlert .modal-contentAlert .modal-footerAlert').css('height', '35px').append('<input type="button" id="OkVipol" onclick=Change_suppreq_status("4") style="background-color:white;float:left;color: #500000;width: 39%;" value="Отменить заявку"><input type="button" id="Close_ot" onclick="closeAlert(this)" style="background-color:white;float:right;color: #500000;width: 20%;" value="Закрыть">')

                        $('#myModalAlert').children('.modal-contentAlert').children('.modal-headerFLogin').append('<label id="reasonlbl" style="font-size: 20px;color: white;">Укажите причину отмены заявки</label>').css('color', 'black')

                        $('#myModalAlert').children('.modal-contentAlert').children('.modal-bodyAlert').css('width', '100%').append('<textarea id="cmntsts2" style="width: 100%;height: 85px;"></textarea>')
                        //$('#f_iles2').attr('onchange', 'FileForOtmen(this)')
                        //$('#OkVipol').click(function () {
                         

                                
                        //    $('#cmntsts2').text('');
                        //    $('#closeAlert').click();

                        //})

                        $('#closeAlert').click(function () {
                          //  $('#myModal5 .modal-body2').children('.titleF,.fa,img,br').remove();
                            $('#myModalAlert').hide();
                            //$('#cmntsts2').text('Все работы по данной заявке выполнены')
                            $('#cmntsts2').val('');
                        })
                       
                    }

                })


            }
            if (st == 1) {
             
             

               

               
                $("#hdPr").text("Прикрепленный файл")
                //$("#hedrZ").text("Заявка № " + R_id + "   (Статус заявки \" \В работе \"\)");
                $('#objctZ').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');//mms3
              
                $("#Ind").attr('disabled', 'disabled')
                $("#Phn").attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)')
            
            
               
                $("#calen1").attr('disabled', 'disabled')
                $("#tmS,#tmE").attr('disabled', 'disabled')
               
                $("#SendComent").hide();
                $("#RText").attr('disabled', 'disabled');
                // $("#files").attr('disabled', 'disabled');
                $("#files").hide();
               
                $("#send").text("Работа выполнена")
                $("#backUo").text("Отменить заявку")
                $("#send").click(function () {
                    var successVipol = true;

                    if (successVipol == true) {

                        var successOtmen = true

                        var objOt = { "Rid": R_id, 'login_id': $('#lgId').text() }
                        $('#myModalAlert .modal-contentAlert .modal-footerAlert').children('h3').remove();

                        if (successOtmen == true) {



                            $('#myModalAlert').show();
                            $('#reasonlbl,#cmntsts2,#Close_ot,#OkVipol').remove();

                            $('#myModalAlert .modal-contentAlert .modal-footerAlert').css('height', '35px').append('<input type="button" id="OkVipol" onclick=Change_suppreq_status("3") style="background-color:white;float:left;color: #500000;width: 39%;" value="ОК"><input type="button" id="Close_ot" onclick="closeAlert(this)" style="background-color:white;float:right;color: #500000;width: 20%;" value="Закрыть">')

                            $('#myModalAlert').children('.modal-contentAlert').children('.modal-headerFLogin').append('<label id="reasonlbl" style="font-size: 20px;color: white;">Укажите причину отмены заявки</label>').css('color', 'black')

                            $('#myModalAlert').children('.modal-contentAlert').children('.modal-bodyAlert').css('width', '100%').append('<textarea id="cmntsts2" style="width: 100%;height: 85px;">Все работы по данной заявке выполнены</textarea>')
                            //$('#f_iles2').attr('onchange', 'FileForOtmen(this)')
                            //$('#OkVipol').click(function () {



                            //    $('#cmntsts2').text('');
                            //    $('#closeAlert').click();

                            //})

                            $('#closeAlert').click(function () {
                                //  $('#myModal5 .modal-body2').children('.titleF,.fa,img,br').remove();
                                $('#myModalAlert').hide();
                                //$('#cmntsts2').text('Все работы по данной заявке выполнены')
                                $('#cmntsts2').val('');
                            })

                        }
                    }
                })

                $("#backUo").click(function () {
                    var successOtmen = true

                    var objOt = { "Rid": R_id, 'login_id': $('#lgId').text() }
                    $('#myModalAlert .modal-contentAlert .modal-footerAlert').children('h3').remove();

                    if (successOtmen == true) {



                        $('#myModalAlert').show();
                        $('#reasonlbl,#cmntsts2,#Close_ot,#OkVipol').remove();

                        $('#myModalAlert .modal-contentAlert .modal-footerAlert').css('height', '35px').append('<input type="button" id="OkVipol" onclick=Change_suppreq_status("4") style="background-color:white;float:left;color: #500000;width: 39%;" value="Отменить заявку"><input type="button" id="Close_ot" onclick="closeAlert(this)" style="background-color:white;float:right;color: #500000;width: 20%;" value="Закрыть">')

                        $('#myModalAlert').children('.modal-contentAlert').children('.modal-headerFLogin').append('<label id="reasonlbl" style="font-size: 20px;color: white;">Укажите причину отмены заявки</label>').css('color', 'black')

                        $('#myModalAlert').children('.modal-contentAlert').children('.modal-bodyAlert').css('width', '100%').append('<textarea id="cmntsts2" style="width: 100%;height: 85px;"></textarea>')
                        //$('#f_iles2').attr('onchange', 'FileForOtmen(this)')
                        //$('#OkVipol').click(function () {



                        //    $('#cmntsts2').text('');
                        //    $('#closeAlert').click();

                        //})

                        $('#closeAlert').click(function () {
                            //  $('#myModal5 .modal-body2').children('.titleF,.fa,img,br').remove();
                            $('#myModalAlert').hide();
                            //$('#cmntsts2').text('Все работы по данной заявке выполнены')
                            $('#cmntsts2').val('');
                        })

                    }

                })


                
            }


            // GetSelectedServ(R_id)
            // $("#SaveDD").text("Редактировать Заявку")
            if (st == 4 || st == 5) {
                $("#hdPr").text("Прикрепленный файл")
           
                $('#send').hide();
                $("#backUo").show().text('Назад');
                $('#backUo').click(function () { window.location.href = "Requests.aspx" });
                
              
               

                   
                $('#objctZ').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
             
               
                $("#Ind").attr('disabled', 'disabled')
                $("#Phn").attr('disabled', 'disabled')
                
               
                $("#calen1").attr('disabled', 'disabled')
                $("#tmS,#tmE").attr('disabled', 'disabled')
              
                $("#RText").attr('disabled', 'disabled');
             
                $("#files").hide();
                $("#hComennt").attr('disabled', 'disabled').show();;
                 
                $("#objctZ").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)')
 
            }
            if (st == 3) {
                $('#opl').attr('disabled', 'disabled');
                // $("#shServ").hide();
                $("#hdPr").text("Прикрепленный файл")
              
                $('#objctZ').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                //getEngTextDispForVerVrbt(LogId, "2");
              //  $("#hedrZ").text("Заявка № " + R_id + "   (Статус заявки \" \Выполнена \"\)");
               // $("#chkem").attr('disabled', 'disabled')
               // $("#Room").attr('disabled', 'disabled')
                $("#Ind").attr('disabled', 'disabled')
                $("#Phn").attr('disabled', 'disabled')
              //  $("#cmntsts").css("max-height", "109px").css("max-width", "100%")
                //$("#fileH").hide();
              //  $("#HImg").show();
             //   $("#AddedTable").hide();
                // $("#PrServiceH").find('th:eq(2)').hide();
                $("#calen1").attr('disabled', 'disabled')
                $("#tmS,#tmE").attr('disabled', 'disabled')
               // $("#IspolList").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
             //   $("#Room_Type,#Sets").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                $("#RText").attr('disabled', 'disabled');
                //$("#files").attr('disabled', 'disabled');
                $("#files").hide();
                $("#send").text("Закрыть Заявку")
                $("#backUo").text("Вернуть заявку в работу ")
                $("#lstcmnt").show();
                $("#SendComent").hide();
                $('#hstComh,#hstCom').hide();

                $("#vrntVrabot").click(function () {
                    // var GService = ($('#subMenu').attr('data-d') == undefined) ? 0 : $('#subMenu').attr('data-d');
                    // if (GService != 0) {
                    var successVernuVrabot = true
                    //    var P_Services = []
                    //$("#PrServiceH tbody tr").each(function () {
                    //    var quant = $(this).children('td:eq(1)').find('input').val();//$(this).next('td').find('input').val();
                    //    //if (quant.length != 0 || quant == 0) {
                    //    //    quant=1
                    //    //}
                    //    quant = (quant == "" || quant == null || quant == undefined) ? 0 : quant
                    //    var Cost = $(this).children('td:eq(3)').children('a').text();//$(this).next('td').next('td').text();
                    //    if (Cost == "Договорная") {
                    //        $('#lblCost').remove();
                    //        $("html, body").animate({ scrollTop: 550 }, "slow");
                    //        $(this).children('td:eq(3)').children('a').after('<label style="color:red" id="lblCost">Необходимо указать стоимость</label>')
                    //        window.setTimeout(function () {
                    //            // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
                    //            $('#lblCost').hide(1000);
                    //            $('#lblCost').remove();
                    //        }, 3000);
                    //        successVernuVrabot = false;
                    //    }
                    //    var serviceId = $(this).children('td:eq(0)').attr('itemid');
                    //    P_Services.push({ 'SERVICE_ID': serviceId, 'QUANTITY': quant, 'COST': Cost })

                    //})
                    //P_Services = JSON.stringify(P_Services)
                    //P_Services = JSON.parse(P_Services)
                    //var opl = $('#opl').prop('checked');
                    //opl = "" + opl + ""

                    var ispol_2 = ($("#ispol2 option:selected").val() == 0) ? $("#Ispolname").attr("itemid") : $("#ispol2 option:selected").val()
                    var objOt = { "Rid": R_id, "Ispol": ispol_2, 'login_id': $('#lgId').text() }
                    if (successVernuVrabot == true) {
                        $.ajax({
                            type: "POST",
                            url: "CreateSRequest.aspx/MakeVrabote",
                            data: JSON.stringify(objOt),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                var LogId = sessionStorage.getItem("Log")
                                var R_id = sessionStorage.getItem("RId");
                                SaveLog_S("Вернуть заявку в работу", "Важное", "Техник", "Диспетчеризация", "К вам возвращена заявка <" + R_id + ">", LogId);
                                window.location.href = "SRequests.aspx"
                                //var comes = sessionStorage.getItem("All");
                                //if (comes == "Notall") {
                                //    window.location.href = "SRequests.aspx"
                                //}
                                //else {
                                //    window.location.href = "AllRequsts.aspx"
                                //}
                            }
                        })
                    }
                    //   }
                    //else {
                    //    $('#GServices_Err').remove();
                    //    $('#Phn').after('<label style="color:red" id="GServices_Err">Необходимо выбрать группу услуг</label>')
                    //    window.setTimeout(function () {
                    //        $('#GServices_Err').remove();
                    //    }, 3000)
                    //    $("html, body").animate({ scrollTop: 500 }, "slow");
                    //}
                })
                $("#lstcmnt").click(function () {
                    var last = $("#hstCom h4:last-child").text();
                    //alertMessage("", last, "");
                    Commentst();

                    //alert(last)
                })
                $("#send").click(function () {
                    var successOtmen = true

                    var objOt = { "Rid": R_id, 'login_id': $('#lgId').text() }
                    $('#myModalAlert .modal-contentAlert .modal-footerAlert').children('h3').remove();

                    if (successOtmen == true) {



                        $('#myModalAlert').show();
                        $('#reasonlbl,#cmntsts2,#Close_ot,#OkVipol').remove();

                        $('#myModalAlert .modal-contentAlert .modal-footerAlert').css('height', '35px').append('<input type="button" id="OkVipol" onclick=Change_suppreq_status("5") style="background-color:white;float:left;color: #500000;width: 39%;" value="Закрыть Заявку"><input type="button" id="Close_ot" onclick="closeAlert(this)" style="background-color:white;float:right;color: #500000;width: 20%;" value="Отменить">')

                        $('#myModalAlert').children('.modal-contentAlert').children('.modal-headerFLogin').append('<label id="reasonlbl" style="font-size: 20px;color: white;">Укажите причину отмены заявки</label>').css('color', 'black')

                        $('#myModalAlert').children('.modal-contentAlert').children('.modal-bodyAlert').css('width', '100%').append('<textarea id="cmntsts2" style="width: 100%;height: 85px;">Все работы по данной заявке выполнены</textarea>')
                        //$('#f_iles2').attr('onchange', 'FileForOtmen(this)')
                        //$('#OkVipol').click(function () {



                        //    $('#cmntsts2').text('');
                        //    $('#closeAlert').click();

                        //})

                        $('#closeAlert').click(function () {
                            //  $('#myModal5 .modal-body2').children('.titleF,.fa,img,br').remove();
                            $('#myModalAlert').hide();
                            //$('#cmntsts2').text('Все работы по данной заявке выполнены')
                            $('#cmntsts2').val('');
                        })

                    }

                } )

                $("#backUo").click(function () {
                    Change_suppreq_status("1")
                })
                $('#GServices').attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)')
                $('#shServ,#Acnum').attr('disabled', 'disable');


                //$('#PrServiceH tbody tr').each(function ()
                //{
                //    $(this).children('td:eq(1)').children('input').attr('disabled', 'disabled')
                //    $(this).children('td:eq(3)').children('a').removeAttr('onclick');
                //    $(this).children('td:eq(4)').children('button').attr('disabled','disabled')
                //})
                //$("#backUo").click(function () {
                //   
                //})
            }
        }
    }

    if (loc == '/Supplier_Office/Requisites.aspx')
    {
        GetSupplierDetail(Guid);
    }
    if (loc =='/Supplier_Office/SupplierServices.aspx') {

        GetServicesBySuppGuid_LK(Guid)
    }

})
function GetServicesBySuppGuid_LK(guid)
{
    var o = { guid: guid }
    $.ajax({
        type: "POST",
        url: "SupplierServices.aspx/GetServicesBySuppGuid_LK",
        data: JSON.stringify(o),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var jsondata_ = JSON.parse(data.d)
            // //console.log(jsondata_);
            //' + oData.ATRIBUTE + '
            //\''+ oData.ATRIBUTE +'\'
            $('#Services_Table').DataTable({
                orderCellsTop: true,
                "destroy": true,
                data: jsondata_,

                columns: [{
                    'data': 'SERVICE_NAME',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                      
                        $(nTd).html('<a href="#" onclick="GoToServDet(\'' + oData.SERVICE_GUID + '\')" >' + oData.SERVICE_NAME + '</a>');
                    } 
                },
                {
                    'data': 'SERVICE_UNIT',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                       
                        $(nTd).html('<a href="#" onclick="GoToServDet(\'' + oData.SERVICE_GUID + '\')" >' + oData.SERVICE_UNIT + '</a>');
                    }
                },

                {
                    'data': 'SERVICE_COST',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                     
                        $(nTd).html('<a href="#" onclick="GoToServDet(\'' + oData.SERVICE_GUID + '\')" >' + oData.SERVICE_COST + '</a>');
                    } 
                },

                {
                    'data': 'SERVICE_ICON',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var SERVICE_ICON = (oData.SERVICE_ICON != null && oData.SERVICE_ICON.length!=0) ? '<img src=' + oData.SERVICE_ICON + ' style="width:30%">' : "";
                       
                        $(nTd).html(SERVICE_ICON );
                    }
                },

                {
                    'data': 'SERVICE_PROJECT',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                       
                        $(nTd).html('<a href="#" onclick="GoToServDet(\'' + oData.SERVICE_GUID + '\')" >' + oData.SERVICE_PROJECT + '</a>');
                    } 
                } 
                ],
             //   aaSorting: [[0, 'desc']],
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

            $('#Services_Table').children('thead').children('tr').children('th').each(function () { $(this).append('<i style="margin-left:  5px;" data-icon="w" class="fa fa-unsorted" aria-hidden="true"></i>') })
            $('.ui-loader-background').hide();
            $('#loader').hide();

        }
    })
}
function Change_suppreq_status( status_id)
{
    var tokenID = ""
    var REQ_GUID = $('#hedrZ').attr('z_id');
    var DESCRIPTION = $('#cmntsts2').val()
    var obj = { tokenID: tokenID, REQ_GUID: REQ_GUID, STATUS_ID: status_id, DESCRIPTION: DESCRIPTION }
    $.ajax({
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + '//WCFServices/MATORIN.QUICK_API.svc/Change_suppreq_status',
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            window.location.href = "Requests.aspx";
        }
    })
     
}
function closeAlert(e)
{
    $('#closeAlert').click();
}
function GetSupplierDetail(guid) {
    var obj = { guid: guid }

    $.ajax({
        type: "POST",
        url: "../Client_Admin/CreateSupplier.aspx/GetSupplierDetail",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d)
            //console.log(j)

            $('#INN').val(j[0].INN);
            $('#KPP').val(j[0].KPP);

            $('#OKVED').val(j[0].OKVED);
            $('#OGRN').val(j[0].OGRN_OGRNIP);
            $('#REGIST_ORGAN').val(j[0].REGIST_ORGAN)
            var REGIST_DATE = j[0].REGIST_DATE// 
            REGIST_DATE = (REGIST_DATE != null) ? REGIST_DATE : ''
            $('#REGIST_DATE').val(REGIST_DATE)
            $('#FULL_NAME').val(j[0].FULL_NAME);
            $('#NAME').val(j[0].NAME);
            $('#BIRTH_DATE').val(j[0].BIRTH_DATE);
            $('#FIO').val(j[0].FIO)

            $('#BIRTH_PLACE').val(j[0].BIRTH_PLACE);
            $('#TYPE_DOCUMENT').val(j[0].TYPE_DOCUMENT)
            $('#SERIES_DOCUMENT').val(j[0].SERIES_DOCUMENT)
            $('#NUMBERS_DOCUMENT').val(j[0].NUMBERS_DOCUMENT);
            $('#DATE_ISSUE').val(j[0].DATE_ISSUE);
            $('#CONTACT_PHONE').val(j[0].CONTACT_PHONE)
            $('#DIVISION_CODE').val(j[0].DIVISION_CODE)
            // CLIENT_ID  Id
            $('#CHECKING_ACCOUNT').val(j[0].CHECKING_ACCOUNT);
            $('#CORRESP_ACCOUNT').val(j[0].CORRESP_ACCOUNT);
            $('#BANK_NAME').val(j[0].BANK_NAME);
            $('#BIK').val(j[0].BIK);
            $('#FEE').val(j[0].FEE)

            $('#PAYMENT').val(j[0].PAYMENT);
            //    LICENCE  $('#LICENCE')
            $('#LEGAL_ADRESS').children('#add_r').val(j[0].LEGAL_ADRESS);
            $('#ADRESS').children('#adr').val(j[0].ADRESS)
            $('#PHONE_FAKS').val(j[0].PHONE_FAKS);
            $('#email_supp').val(j[0].E_MAIL);
            $('#pass_supp').val(j[0].PASSWORD);
            $('#SHOP_ID').val(j[0].SHOP_ID);
            $('#VK').val(j[0].VK)
            $('#OK').val(j[0].OK)
            $('#FB').val(j[0].FB)
            $('#TW').val(j[0].TW)
            $('#ICON').attr('src');
            if (j[0].ICON != null && j[0].ICON != '') {
                $('#filesN').hide().after('<img id="ICON" src="' + j[0].ICON + '" style="width: 8%;"/>')
            }
            $('.INFO_FOUNDERS').prev().remove()
            $('.INFO_FOUNDERS').prev().remove()
            $('.INFO_FOUNDERS').remove()
            var j2 = JSON.parse(j[0].INFO_FOUNDERS)
            if (j2 != null) {
                for (var i = 0; i < j2.length; i++) {

                    //$('#AddF').after('<br><br><div class="INFO_FOUNDERS" style="border-style: double;border-color: rgb(0,147,233);"><h4>Сведения об учредителях</h4><label>ФИО</label><input disabled="disabled" type="text" value="' + j2[i].NAME + '" id="fio_founders"><label>Дата Рождения</label><input disabled="disabled" type="date" value="' + j2[i].BIRTH_DATE + '" id="b_date_founders"><label>Гражданство</label><input disabled="disabled" type="text" value="' + j2[i].Citizen + '" id="citi_founders"><label>Место жителство (регистрации) </label><input disabled="disabled" type="text" value="' + j2[i].BIRTH_PLACE + '" id="regist_founders"><label>Место пребывания</label><input disabled="disabled" type="text" value="' + j2[i].stay_founders + '" id="stay_founders"><br><div id="passport_datas_founders"><h4>Данные паспорта </h4><label>Серия паспорта</label><input disabled="disabled" value="' + j2[i].SERIES_DOCUMENT + '" type="text" id="passport_series_founders"><label>Номер паспорта</label><input disabled="disabled" type="text" id="passport_number_founders" value="' + j2[i].NUMBERS_DOCUMENT + '"><label>Дата выдачи паспорта</label><input type="date" value="' + j2[i].DATE_ISSUE + '" disabled="disabled" id="passport_date_founders"><label>Кем выдан паспорт </label><textarea rows="5" id="issued_by_passport_founder" disabled="disabled"   style="margin: 0px; width: 50%; height: 178px;"> ' + j2[i].issued_by_passport_founder + '</textarea></div></div>')
                    $('#AddF').after('<br><br><div class="INFO_FOUNDERS" style=""><h3>Сведения об учредителях</h3><div class="row"><div class="col-md-6 col-xs-12"><label>ФИО</label><input disabled="disabled" type="text" value="' + j2[i].NAME + '" id="fio_founders"><label>Дата Рождения</label><input disabled="disabled" type="date" value="' + j2[i].BIRTH_DATE + '" id="b_date_founders"><label>Гражданство</label><input disabled="disabled" type="text" value="' + j2[i].Citizen + '" id="citi_founders"><label>Место жительства (регистрации)</label><input disabled="disabled" type="text" value="' + j2[i].BIRTH_PLACE + '" id="regist_founders"><label>Место пребывания</label><input disabled="disabled" type="text" value="' + j2[i].stay_founders + '" id="stay_founders"></div><div class="col-md-6 col-xs-12"><div id="passport_datas_founders"><p><strong>Данные паспорта</strong></p><label>Серия паспорта</label><input disabled="disabled" value="' + j2[i].SERIES_DOCUMENT + '" type="text" id="passport_series_founders"><label>Номер паспорта</label><input disabled="disabled" type="text" id="passport_number_founders" value="' + j2[i].NUMBERS_DOCUMENT + '"><label>Дата выдачи паспорта</label><input type="date" value="' + j2[i].DATE_ISSUE + '" disabled="disabled" id="passport_date_founders"><label>Кем выдан паспорт </label><textarea rows="3" id="issued_by_passport_founder" disabled="disabled" class="passDat"> ' + j2[i].issued_by_passport_founder + '</textarea></div></div></div></div>')
                }
            }
          


        }
    })
}
function SaveRequest_Supp2_LK(obj, SP) {
    $.ajax({
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + '//WCFServices/MATORIN.QUICK_API.svc/New_suppreq_e',
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata = JSON.stringify(data.ResultData)
            var jsondata_ = JSON.parse(jsondata)
           
            if (jsondata_.Result == "Success") {
               
                
                  
                    window.location.href = "Requests.aspx"
                
            }


        }
    })
}
function GetRequesByR_LK(R) {
    var obj = { "GUID": R }
    $.ajax({
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + '//WCFServices/MATORIN.QUICK_API.svc/Get_supplier_request',
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            //console.log(data);

            var j = JSON.stringify(data.ResultData)
            var jsondata_ = JSON.parse(j)
            $('#objctZ').empty()//$('#hedrZ').attr('r_num')
            $("#hedrZ").text('Заявка № ' + jsondata_.ID + '   (Статус заявки "' + jsondata_.STATUS_NAME + '")').attr("Z_id", R).attr('r_num', jsondata_.ID);
            $('#objctZ').append('<option value=' + jsondata_.OBJECT_ID + '>' + jsondata_.OBJECT + '</option>')
            $('#objctZ').attr('data-suppGuid', jsondata_.SUPPLIER_GUID)
            $('#objctZ').attr('data-supp', jsondata_.SUPPLIER)
            
           
            $('#Ind').val(jsondata_.CLIENT)
            $('#Phn').val(jsondata_.PHONE_NUMBER)
            var plan_date = jsondata_.WORKDATE
            plan_date = plan_date.substr(0, 10);
            plan_date = plan_date.split('.').reverse().join('-')
            $('#calen1').val(plan_date)
            var WorkBegin = jsondata_.WORKBEGIN
            WorkBegin = WorkBegin.substr(0, 5);
            $('#tmS').val(WorkBegin)
            var WorkEnd = jsondata_.WORKEND
            WorkEnd = WorkEnd.substr(0, 5);
            $('#tmE').val(WorkEnd)
            var COMMENT = decodeURI(jsondata_.COMMENT)
            $('#RText').val(COMMENT)
            var komments = decodeURI(jsondata_.COMMENTS)
           
            $('.knop').hide()
            if (jsondata_.FILES.length != 0) {
                var files = jsondata_.FILES.split(',')
                for (var i = 0; i < files.length; i++) {
                    var format = files[i]
                    format = format.substr(format.lastIndexOf('.') + 1)
                    format = (format == 'docx' || format == 'doc') ? window.location.protocol + '//' + window.location.host + '/img/word.png' : (format == 'xlsx' || format == 'xls') ? window.location.protocol + '//' + window.location.host + '/img/excel.png' : (format == 'pdf' || format == 'PDF') ? window.location.protocol + '//' + window.location.host + '/img/pedefe.png' : (format == 'txt' || format == 'TXT') ? window.location.protocol + '//' + window.location.host + '/img/texete.png' : files[i]
                    $('.knop').after('<div class="col-xs-2" id="zImg"><a href=' + files[i] + ' download=""><img class="foto-disp" data-url=' + '+files[i]+' + ' id="fotoDisp10" src=' + format + '></a></div>')
                }
            }
            else {
                $('#hdPr').hide();    
            }
            $('#calen1').parent().parent().before('<input type="number" min="0" onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + jsondata_.PAYMENT_SUMM+'"><label id="totlCost">Итого: </label>')
            GetServicesForSupplierSelected_LK(jsondata_.SUPPLIER_GUID, null, jsondata_.SUPPSERVICES)
        }
    })
}
function GetServicesForSupplierSelected_LK(sup_guid, service_guid, array) {
    var obj = { guid: sup_guid, service_guid: service_guid }
    $.ajax({
        type: "POST",
        url: "RequestCreate.aspx/GetServicesForSupplierSelected_LK",
        data: JSON.stringify(obj),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d);
            //console.log(j);
            if (j[0].CHILDS != 0) {

                for (var k = array.length - 1; k >= 0; k--) {
                    if (k != array.length - 1) {
                        var PrevSGrupGUID = array[k + 1].SERVICE_GROUP_GUID
                        var curent = array[k].SERVICE_GROUP_GUID
                        if (PrevSGrupGUID == curent) {//<option>' + array[k].SERVICE_NAME + '</option>
                            $('.col-md-12[data-grupGuid=' + curent + ']').append('<table><thead><tr><th><select class="select2 narrow wrap" onchange=getCosts(this) id="Combo_' + k + '"></select></th><th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Кол-во" value=' + array[k].SERVICE_COUNT + ' id="kol" ></th> <th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Цена"  value=' + array[k].SERVICE_END_COST + ' id="Ser_Summ" ></th><th ><i class="fa fa-close removing3" itemid="1" onclick="removeServiceSupp(this)"aria-hidden="true"></i></th></tr></thead><tbody><tr><td colspan="2"><textarea placeholder="Комментарий"  >' + array[k].SERVICE_COMMENT + '</textarea></td><td><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Окончателная сумма" disabled="disabled" value=' + array[k].SERVICE_END_COST + ' id="EndSumm" ></td><td><img src="" ></td></tr></tbody></table>')
                        }
                        else {
                            $('#Phn').after('<div class="col-md-12 Serv_supp" data-grupGuid=' + array[k].SERVICE_GROUP_GUID + '><i class="fa fa-close removing3" itemid="1" onclick="removeGroupSupp(this)"  aria-hidden="true"></i><select onchange=GetServicesForSupplier_LK(this,"' + sup_guid + '","0") class="combogrup select2 narrow wrap" id="grupS_' + k + '" ></select></div>')
                            //<option>' + array[k].SERVICE_NAME + '</option>
                            $('#grupS_' + k + '').after('<table class="table SuppServices"><thead><tr><th><select class="select2 narrow wrap" onchange=getCosts(this) id="Combo_' + k + '" ></select></th><th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Кол-во" value=' + array[k].SERVICE_COUNT + ' id="kol"></th> <th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Цена"  value=' + array[k].SERVICE_END_COST + ' id="Ser_Summ" ></th><th ><i class="fa fa-close removing3" itemid="1" onclick="removeServiceSupp(this)"  aria-hidden="true"></i></th></tr></thead><tbody><tr><td colspan="2"><textarea placeholder="Комментарий" >' + array[k].SERVICE_COMMENT + '</textarea></td><td><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Окончателная сумма" disabled="disabled" value=' + array[k].SERVICE_END_COST + ' id="EndSumm" ></td><td><img src="' + array[k].SERVICE_ICON + '" ></td></tr></tbody></table>')
                        }

                    }
                    else {//<option>' + array[k].SERVICE_NAME + '</option>
                        $('#Phn').after('<div class="col-md-12 Serv_supp" data-grupGuid=' + array[k].SERVICE_GROUP_GUID + ' ><i class="fa fa-close removing3" itemid="1" onclick="removeGroupSupp(this)"  aria-hidden="true"></i><select onchange=GetServicesForSupplier_LK(this,"' + sup_guid + '","0") class="combogrup select2 narrow wrap" id="grupS_' + k + '" ></select></div>')
                        $('#grupS_' + k + '').after('<table class="table SuppServices"><thead><tr><th><select class="select2 narrow wrap" onchange=getCosts(this) id="Combo_' + k + '" ></select></th><th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Кол-во" value=' + array[k].SERVICE_COUNT + ' id="kol"></th> <th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Цена"  value=' + array[k].SERVICE_END_COST + ' id="Ser_Summ" ></th><th ><i class="fa fa-close removing3" itemid="1" onclick="removeServiceSupp(this)" aria-hidden="true"></i></th></tr></thead><tbody><tr><td colspan="2"><textarea placeholder="Комментарий"  >' + array[k].SERVICE_COMMENT + '</textarea></td><td><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Окончателная сумма" disabled="disabled" value=' + array[k].SERVICE_END_COST + ' id="EndSumm"></td><td><img src="' + array[k].SERVICE_ICON + '" ></td></tr></tbody></table>')

                    }
                    //  GetServicesForSupplier($('#grupS_' + k + ''), objId, lg, array[k].SERVICE_GROUP_GUID)

                    GetServicesForSupplier2_LK($('#Combo_' + k), sup_guid, array[k].SERVICE_GROUP_GUID, array[k].SERVICE_GUID)

                    // $('#Combo_' + k).val(array[k].SERVICE_GUID)
                    //   $('#grupS_' + k + '').append('<option>' + array[k].SERVICE_GROUP_NAME+'</option>')
                    for (var m = 0; m < j.length; m++) {
                        $('#grupS_' + k + '').append('<option value=' + j[m].SERVICE_GUID + '>' + j[m].SERVICE_GROUP + '</option>')
                    }
                    /*$('.col-md-12[data-grupGuid=' + curent + ']')*/ $('#grupS_' + k + '').parent().append('<input type="button" value="Добавить услугу" id="AddServ_s" onclick="AddServiceSupp(this)" class="AddServiceSupp"  class="btn btn-default logBtn">')
                    $('#grupS_' + k + ' option[value=' + array[k].SERVICE_GROUP_GUID + ']').attr('selected', 'selected')//.val(array[k].SERVICE_GROUP_GUID)
                    var $select2 = $('.select2').select2({
                        containerCssClass: "wrap"
                    })

                }
                $('#Phn').after('<input type="button" value="Добавить группа услуг" onclick="AddGroupServiceSupp(this)" id="addg" class="AddGroupServiceSupp">')
            }
            else {
                //console.log(array)
                for (var k = array.length - 1; k >= 0; k--) {
                    $('#AddServ_s').remove();
                    $('#Phn').after('<div class="col-md-12 Serv_supp" data-child="0" data-S=' + array[k].SERVICE_GUID + ' ><table><thead><tr><th><select   id="Combo_' + k + '"  data-cost=' + array[k].SERVICE_COST + ' data-img=' + array[k].SERVICE_ICON + ' class="select2 narrow wrap"></select></th><th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Кол-во" value=' + array[k].SERVICE_COUNT + ' id="kol"></th> <th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Цена" value=' + array[k].SERVICE_COST + ' id="Ser_Summ" ></th><th ><i class="fa fa-close removing3" itemid="1" onclick="removeServiceSupp(this)"  aria-hidden="true"></i></th></tr></thead><tbody><tr><td colspan="2"><textarea placeholder="Комментарий" >' + array[k].SERVICE_COMMENT + '</textarea></td><td><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Окончателная сумма" disabled="disabled" value=' + array[k].SERVICE_END_COST + ' id="EndSumm" ></td><td><img src=\"' + array[k].SERVICE_ICON + '\"></td></tr></tbody></table></div>')
                    for (var i = 0; i < j.length; i++) {
                        $('#Combo_' + k).append('<option value=' + j[i].SERVICE_GUID + ' class="select2 narrow wrap" data-cost=' + j[i].SERVICE_COST + ' data-img=' + j[i].SERVICE_ICON + '>' + j[i].SERVICE_NAME + '</option>')
                    }
                    $('#Combo_' + k).val(array[k].SERVICE_GUID)
                  
                }
                var $select2 = $('.select2').select2({
                    containerCssClass: "wrap"
                })
                $('.select2').attr('onchange', 'grupChange(this)')

                $('.Serv_supp:last').append('<input type="button" value="Добавить услугу" id="AddServ_s" onclick="AddServiceSupp(this)" class="AddServiceSupp">')
            }
            var s_t = sessionStorage.getItem("st")
            if (s_t != 2) {
                $('input[value="Добавить услугу"],input[value="Добавить группа услуг"],input[type="number"],textarea[placeholder="Комментарий"],input[type="checkbox"]').attr('disabled', 'disabled');
                $('.fa').remove();
                var $select2 = $('.select2').select2({
                    disabled: "readonly",
                    containerCssClass: "wrap"
                })
            }
        }
    })
}
function GetServicesForSupplier2_LK(serviceCombo, sup_guid, service_guid, selected) {
    var obj = { "guid": sup_guid ,"service_guid": service_guid }
    $.ajax({
        type: "POST",
        url: "RequestCreate.aspx/GetServicesForSupplier_LK",
        data: JSON.stringify(obj),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d);

            ////console.log("ccc");
            // //console.log(j);
            for (var i = 0; i < j.length; i++) {
                $(serviceCombo).append('<option value=' + j[i].SERVICE_GUID + ' data-cost=' + j[i].SERVICE_COST + ' data-img=' + j[i].SERVICE_ICON + '>' + j[i].SERVICE_NAME + '</option>')

            }
            $(serviceCombo).val(selected)

        }
    })
}
function SendId(RId, st) {
    sessionStorage.setItem("st", st)
    sessionStorage.setItem("RId", RId);
    window.location.href = "RequestCreate.aspx"
}
function MaskPhone(e) {
    $(e).inputmask("+7(999) 999-99-99");
}
function removeF3(e, num) {
    $(e).remove();
    $("#f_iles2").show();
    $("img[itemid='" + num + "']").remove();
    $(".titleF[itemid='" + num + "']").remove();
}
function SelectfileForRequest(e) {
    var filePath = $(e).val();

    var index = filePath.lastIndexOf("\\") + 1;
    var filename = filePath.substr(index);

    readURL(e, filename);
}
function readURL(input, imgName) {
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

                    //alert("OK. See //console -  press F12");
                    // //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    //var jsondata_1 = jQuery.parseJSON(result)
                    //var jsondata_1 = JSON.stringify(result)
                    // var jsondata_1 = JSON.parse(result)
                    //  $("#files").hide();
                    var imgslenght = $("#imgss").find("img").length;
                    if (imgslenght != 5) {
                        imgslenght++
                        //  var lastImgItem = $("#imgss").find("img:last").attr("itemid");
                        // lastImgItem++;
                        $(input).after('<div class="col-xs-2" id="zImg"><img class="foto-disp" id="fotoDisp' + imgslenght + '" itemid=' + imgslenght + '  data-url="0"  src=""></div>')//../Files/upl.png
                        $("#files").val("");
                    }
                    if (imgslenght == 5) {
                        $("#files").hide();
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
                    }
                    if (extention == "xlsx" || extention == "xls") {
                        $('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/excel.png')
                        $('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                        $('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                    }
                    if (extention == "pdf" || extention == "PDF") {
                        $('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/pedefe.png')
                        $('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                        $('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                    }
                    if (extention == "txt" || extention == "TXT") {
                        $('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/texete.png')
                        $('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                        $('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                    }
                    //$("#hdPr2").show()
                    //$("#zImg2").show()
                    //$("#files2").show()

                    $("#loader").hide();

                },

                error: function (datas) {


                    //console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

                    var filePath = $('#files').val();
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
function SaveRequest_Supp(obj) {

    $.ajax({
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + '//WCFServices/MATORIN.QUICK_API.svc/New_suppreq',
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //console.log(data)
            var jsondata = JSON.stringify(data.ResultData)
            var jsondata_ = JSON.parse(jsondata)
            if (jsondata_.Result == "Success") {
                window.location.href = "Requests.aspx"
            }
        }
    })
}
function GetServicesForSupplier_LK(e, guid, service_guid)
{
    if (service_guid == "0") {
        service_guid = $(e).children('option:selected').attr('value')
    }
    var obj = { "guid": guid, "service_guid": service_guid }
    $.ajax({
        type: "POST",
        url: "RequestCreate.aspx/GetServicesForSupplier_LK",
        data: JSON.stringify(obj),

        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d);
            //console.log(j);
            $('#objctZ').attr('data-supp', j[0].SERVICE_SUPPLIER)
            if (service_guid == null) {
                if (j[0].CHILDS != 0) {
                    $('#addg').remove();
                    $('#Phn').after('<input type="button" value="Добавить группа услуг" onclick="AddGroupServiceSupp(this)" class="AddGroupServiceSupp" id="addg" class="btn btn-default logBtn"><div class="col-md-12 Serv_supp" data-child="1" ><i class="fa fa-close removing3" itemid="1" onclick="removeGroupSupp(this)"  aria-hidden="true"></i><select onchange=GetServicesForSupplier_LK(this,"' + guid + '","0") id="grupS_1" class="combogrup select2 narrow wrap"></select></div>')
                    for (var i = 0; i < j.length; i++) {
                        $('#grupS_1').append('<option value=' + j[i].SERVICE_GUID + ' data-guid=' + j[i].SERVICE_GUID + '>' + j[i].SERVICE_GROUP + '</option>')
                    }
                    GetServicesForSupplier_LK($('#grupS_1'), guid, j[0].SERVICE_GUID)
                }
                else {

                    $('#Phn').after('<div class="col-md-12 Serv_supp" data-child="0" data-S=' + j[0].SERVICE_GUID + ' ><table class="table SuppServices"><thead><tr><th><select   id="Combo_0"  data-cost=' + j[0].SERVICE_COST + ' data-img=' + j[0].SERVICE_ICON + ' class="select2 narrow wrap" ></select></th><th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Кол-во" value="1" id="kol" ></th> <th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Цена" value=' + j[0].SERVICE_COST + ' id="Ser_Summ" ></th><th><i class="fa fa-close removing3" itemid="1" onclick="removeServiceSupp(this)"  aria-hidden="true"></i></th></tr></thead><tbody><tr><td colspan="2"><textarea placeholder="Комментарий" ></textarea></td><td><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Окончателная сумма" disabled="disabled" value=' + j[0].SERVICE_COST + ' id="EndSumm" ></td><td><img src=\"' + j[0].SERVICE_ICON + '\" ></td></tr></tbody></table><input type="button" value="Добавить услугу" id="AddServ_s" onclick="AddServiceSupp(this)" class="AddServiceSupp" class="btn btn-default logBtn"></div>')

                    for (var i = 0; i < j.length; i++) {
                        $('#Combo_0').append('<option value=' + j[i].SERVICE_GUID + ' data-cost=' + j[i].SERVICE_COST + ' data-img=' + j[i].SERVICE_ICON + '>' + j[i].SERVICE_NAME + '</option>')
                    }

                    $('.col-md-12:last').after('<input type="number"  min=0  onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + j[0].SERVICE_COST + '"/> <label  id="totlCost">Итого: </label>');
                    $('.col-md-12:last').attr('data-total', j[0].SERVICE_COST);
                     $('.select2').attr('onchange', 'grupChange(this)')
                }
            }
            else {
                var GroupVal = $(e).val();
                $(e).next('table').remove();
                $('#AddServ_s').remove();
                $(e).parent().children('table').remove();
                $(e).after('<table class="table SuppServices"><thead><tr><th><select onchange=getCosts(this) id="Combo_' + GroupVal + '" class="select2 narrow wrap" ></select></th><th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Кол-во" value="1" id="kol" ></th> <th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Цена" id="Ser_Summ" value=' + j[0].SERVICE_COST + ' ></th><th ><i class="fa fa-close removing3" itemid="1" onclick="removeServiceSupp(this)"  aria-hidden="true"></i></th></tr></thead><tbody><tr><td colspan="2"><textarea placeholder="Комментарий" ></textarea></td><td><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Окончателная сумма" disabled="disabled" id="EndSumm" value=' + j[0].SERVICE_COST + ' ></td><td><img src="" ></td></tr></tbody></table><input type="button" value="Добавить услугу" id="AddServ_s" onclick="AddServiceSupp(this)" class="AddServiceSupp"  class="btn btn-default logBtn">')

                for (var i = 0; i < j.length; i++) {
                    $('#Combo_' + GroupVal).append('<option data-guid=' + j[i].SERVICE_GUID + '  value=' + j[i].SERVICE_GUID + ' data-cost=' + j[i].SERVICE_COST + ' data-img=' + j[i].SERVICE_ICON + '>' + j[i].SERVICE_NAME + '</option>')
                    var SERVICE_COST = j[0].SERVICE_COST
                    $(e).parent().parent().children('th:eq(2)').children('input[type="number"]').val(SERVICE_COST)
                    var SERVICE_ICON = j[0].SERVICE_ICON
                    $(e).parent().parent().parent().parent().children('tbody').children('tr:eq(0)').children('td:last').children('img').attr('src', SERVICE_ICON)
                }
                $('#totlCost,#totalCostN').remove();
                $('.col-md-12:last').after('<input type="number"  min=0 onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + j[0].SERVICE_COST + '"/> <label  id="totlCost">Итого: </label>');
                $('.col-md-12:last').attr('data-total', j[0].SERVICE_COST);
            }
        }

    })

    var $select2 = $('.select2').select2({
        containerCssClass: "wrap"
    })
    //$('.select2').attr('onchange','grupChange(this)')
    var totalCost = 0
    $('.col-md-12').each(function () {
        $(this).children('table').each(function () {
            var endSums = $(this).children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val()
            if (endSums.length != 0) {
                totalCost = totalCost + parseFloat(endSums);
            }
        })

    })
    $('#totlCost,#totalCostN').remove();
    $('.col-md-12:last').after('<input type="number"  min=0  onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + totalCost + '"/> <label  id="totlCost">Итого: </label>');
    $('.col-md-12:last').attr('data-total', totalCost);

}
function grupChange(e) {
    //var grup = $("#Combo_0 option:selected").text();
    var SERVICE_COST = $(e).find('option:selected').attr('data-cost');
    $(e).parent().parent().children('th:eq(2)').children('input[type="number"]').val(SERVICE_COST)
    $(e).parent().parent().children('th:eq(1)').children('input[type="number"]').attr('data-cost', SERVICE_COST)
    $(e).parent().parent().children('th:eq(1)').children('input[type="number"]').val('1')
    var SERVICE_ICON = $("#Combo_0").find('option:selected').attr('data-img');
    $('#totalCostN').val(SERVICE_COST);
    $(e).parent().parent().parent().parent().children('tbody').children('tr:eq(0)').children('td:last').children('img').attr('src', SERVICE_ICON)
    $(e).parent().parent().parent().parent().children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val(SERVICE_COST);
    var totalCost = 0
    $('.col-md-12').each(function () {
        $(this).children('table').each(function () {
            var endSums = $(this).children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val()
            if (endSums.length != 0) {
                totalCost = totalCost + parseFloat(endSums);
            }
        })

    })
    $('#totlCost,#totalCostN').remove();
    $('.col-md-12:last').after('<input type="number"  min=0  onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + totalCost + '"/> <label  id="totlCost">Итого: </label>');
    $('.col-md-12:last').attr('data-total', totalCost);
}
function controlTotal(e) {
    if ($(e).val() < 0) {
        $(e).val(0)
    }
}
function removeServiceSupp(e) {
    var tableLength = $(e).parent().parent().parent().parent().parent().children('table').length
    if (tableLength > 1) {
        $(e).parent().parent().parent().parent().remove()
    }
    else {
        $(e).css('color', 'silver');
    }
    var totalCost = 0
    $('.col-md-12').each(function () {
        $(this).children('table').each(function () {
            var endSums = $(this).children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val()
            if (endSums.length != 0) {
                totalCost = totalCost + parseFloat(endSums);
            }
        })

    })
    $('#totlCost,#totalCostN').remove();
    $('.col-md-12:last').after('<input type="number"  min=0  onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + totalCost + '"/> <label  id="totlCost">Итого: </label>');
    $('.col-md-12:last').attr('data-total', totalCost);
}
function removeGroupSupp(e) {
    var groupCount = $('.marpad0').children('.col-md-12').length
    if (groupCount > 1) {
        $(e).parent().remove()
    }
    else {
        $(e).css('color', 'silver')
    }

    var totalCost = 0
    $('.marpad0').children('.col-md-12').each(function () {
        $(this).children('table').each(function () {
            var endSums = $(this).children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val()
            if (endSums.length != 0) {
                totalCost = totalCost + parseFloat(endSums);
            }
        })

    })
    $('#totlCost,#totalCostN').remove();
    $('.marpad0').children('.col-md-12:last').after('<input type="number"  min=0  onchange="controlTotal(this)" onkeyup="controlTotal(this)"  value="' + totalCost + '"/> <label  id="totlCost">Итого: </label>');
    $('.marpad0').children('.col-md-12:last').attr('data-total', totalCost);

}
function AddGroupServiceSupp(e) {
    var groups = $('.marpad0').children
('.col-md-12:eq(0)').clone()
    $(groups).children('table').not(':first').remove()
    $(groups).children('.select2:last').remove();
    //  var Service_guid = $(groups).children('table:eq(0)').children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').find('option:selected').attr('data-guid');
    var service_img = $(groups).children('table:eq(0)').children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').find('option:selected').attr('data-img');
    var service_cost = $(groups).children('table:eq(0)').children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').find('option:selected').attr('data-cost');
    $(groups).children('table:eq(0)').children('thead').children('tr:eq(0)').children('th:eq(1)').children('#kol').val("1")
    $(groups).children('table:eq(0)').children('thead').children('tr:eq(0)').children('th:eq(2)').children('#Ser_Summ').val(service_cost)
    var grupS_id = $(groups).children('select:eq(0)').attr('id');
    grupS_id = grupS_id.substring(grupS_id.indexOf('_') + 1, 100);
    grupS_id = parseInt(grupS_id) + 1;
    $(groups).children('select:eq(0)').attr("class", "select2 narrow wrap");

    $(groups).children('select:eq(0)').attr("id", "grupS_" + grupS_id)
    var $select2 = $('.select2').select2({
        containerCssClass: "wrap"
    })

    $(groups).children('table:eq(0)').children('tbody').children('tr:eq(0)').children('td:eq(0)').children('textarea').val("")
    $(groups).children('table:eq(0)').children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val(service_cost)
    $(groups).children('table:eq(0)').children('tbody').children('tr:eq(0)').children('td:eq(2)').children('img').attr("src", service_img);

    $(e).after(groups);
    $('.col-md-12').children('i').css('color', 'red');
    var totalCost = 0
    $('.col-md-12').each(function () {
        $(this).children('table').each(function () {
            var endSums = $(this).children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val()
            if (endSums.length != 0) {
                totalCost = totalCost + parseFloat(endSums);
            }
        })

    })
    $('#totlCost,#totalCostN').remove();
    $('.col-md-12:last').after('<input type="number"  min=0  onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + totalCost + '"/> <label  id="totlCost">Итого: </label>');
    $('.col-md-12:last').attr('data-total', totalCost);
    var $select2 = $('.select2').select2({
        containerCssClass: "wrap"
    })
    $(groups).children('table:eq(0)').children('thead').children('tr:eq(0)').children('th:eq(0)').children('.select2').slice(2).remove();
}
function AddServiceSupp(e) {
    var services = $(e).parent().children('table:eq(0)').clone()
    $(services).children('thead').children('tr:eq(0)').children('th:eq(0)').children('.select2:last').remove();
    var Service_guid = $(services).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').find('option:selected').attr('data-guid');
    var service_img = $(services).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').find('option:selected').attr('data-img');
    var service_cost = $(services).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').find('option:selected').attr('data-cost');//

    $(services).children('thead').children('tr:eq(0)').children('th:eq(1)').children('#kol').val("1")
    var combo_id = $(services).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').attr("id");

    combo_id = combo_id.substring(combo_id.indexOf('_') + 1, 100);
    combo_id = parseInt(combo_id) + 1;

    $(services).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').attr("class", "select2 narrow wrap");

    $(services).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').attr("id", 'Combo_' + combo_id);
    $(services).children('thead').children('tr:eq(0)').children('th:eq(2)').children('#Ser_Summ').val(service_cost)
    $(services).children('tbody').children('tr:eq(0)').children('td:eq(0)').children('textarea').val("")
    $(services).children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val(service_cost)
    $(services).children('tbody').children('tr:eq(0)').children('td:eq(2)').children('img').attr("src", service_img);
    $(e).parent().children('table:last').after(services)
    $(e).parent().children('table').each(function () {
        $(this).children('thead').children('tr').children('th:last').children('i').css('color', 'red');
    })
    var $select2 = $('.select2').select2({
        containerCssClass: "wrap"
    })
    if ($(e).parent().attr('data-child') === '0') {
        $('.select2').attr('onchange', 'grupChange(this)')
    }
    var totalCost = 0
    $('.col-md-12').each(function () {
        $(this).children('table').each(function () {
            var endSums = $(this).children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val()
            if (endSums.length != 0) {
                totalCost = totalCost + parseFloat(endSums);
            }
        })

    })
    $('#totlCost,#totalCostN').remove();
    $('.col-md-12:last').after('<input type="number"  min=0 style="float:right;width:10%" onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + totalCost + '"/> <label style="float:right" id="totlCost">Итого: </label>');
    $('.col-md-12:last').attr('data-total', totalCost);

}
function getCosts(e) {
    var SERVICE_COST = $(e).find('option:selected').attr('data-cost');
    $(e).parent().parent().children('th:eq(2)').children('input[type="number"]').val(SERVICE_COST)
    var SERVICE_ICON = $(e).find('option:selected').attr('data-img');
    $(e).parent().parent().parent().parent().children('tbody').children('tr:eq(0)').children('td:last').children('img').attr('src', SERVICE_ICON)
    $(e).parent().parent().parent().parent().children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val(SERVICE_COST)
    var totalCost = 0
    $('.col-md-12').each(function () {
        $(this).children('table').each(function () {
            var endSums = $(this).children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val()
            if (endSums.length != 0) {
                totalCost = totalCost + parseFloat(endSums);
            }
        })

    })
    $('#totlCost,#totalCostN').remove();
    $('.col-md-12:last').after('<input type="number"  min=0  onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + totalCost + '"/> <label  id="totlCost">Итого: </label>');
    $('.col-md-12:last').attr('data-total', totalCost);
}
function ControlNummebrSupp(e) {
    $(e).mask('##.00', { reverse: true, maxlength: false })
    var numberVal = $(e).val();
    numberVal = parseFloat(numberVal)
    if (numberVal <= 0) {
        $(e).val("1.00")
        numberVal = "1.00"
        numberVal = parseFloat(numberVal)
    }
    var NumberId = $(e).attr('id');
    if (NumberId == "kol") {
        var serviceSumm = $(e).parent().next().children('#Ser_Summ').val();
        serviceSumm = parseFloat(serviceSumm)
        var summery = serviceSumm * numberVal;
        //   $(e).parent().next().children('#Ser_Summ').val(summery);
        $(e).parent().parent().parent().next().children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val(summery)
    }
    if (NumberId == 'Ser_Summ') {
        var serviceSumm = numberVal
        serviceSumm = parseFloat(serviceSumm)
        var kol = $(e).parent().prev().children('#kol').val();
        var summery = serviceSumm * parseFloat(kol);
        $(e).parent().next().children('#Ser_Summ').val(summery);
        $(e).parent().parent().parent().next().children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val(summery)
    }
    var totalCost = 0
    $('.col-md-12').each(function () {
        $(this).children('table').each(function () {
            var endSums = $(this).children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val()
            if (endSums.length != 0) {
                totalCost = totalCost + parseFloat(endSums);
            }
        })

    })
    $('#totlCost,#totalCostN').remove();
    $('.col-md-12:last').after('<input type="number"  min=0  onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + totalCost + '"/> <label  id="totlCost">Итого: </label>');
    $('.col-md-12:last').attr('data-total', totalCost);
}
function GetObjectsBySupplierGuid_LK(guid,selected)
{
    var obj = { "guid": guid }
    $.ajax({
        type: "POST",
        url: "RequestCreate.aspx/GetObjectsBySupplierGuid_LK",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d)
            for (var i = 0; i < j.length; i++) {
                $('#objctZ').append('<option value=' + j[i].OBJECT_ID + '>' + j[i].OBJECT_ADRESS+'</option>')
            }
            if (selected != "") {
                $('#objctZ').val(selected);
            }
        }
    })
}
function ControlDate(e) {
    var today = new Date(Date.now()).toLocaleString()
    today = today.slice(0, 10).replace('.', '-').replace('.', '-')
    var planDate = $(e).val();
    planDate = planDate.replace('.', '-').replace('.', '-')
    planDate = planDate.split('-').reverse().join('-');
    if (ComputeBiggerDate(planDate, today, '-') == 2) {
        today = today.split('-').reverse().join('-');
        $(e).val(today);
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
function ControlTime(e) {
    var dtToday = new Date();
    var hours = dtToday.getHours();
    var minut = dtToday.getMinutes();
    if (hours < 10) {
        hours = '0' + hours.toString();
    }
    if (minut < 10) {
        minut = '0' + minut.toString()
    }

    if ($(e).attr('id') == "tmS") {
        var tmS = $(e).val().split(':')
        var tmS_Hours = tmS[0]

        if (tmS_Hours <= hours) {
            tmS = (parseInt(hours) + 1) + ":" + minut
            $("#tmS").val(tmS);
        }
        if (tmS_Hours > hours) {
            tmS = (parseInt(tmS_Hours) + 1) + ":" + minut
            $("#tmE").val(tmS);
        }

    }
    if ($(e).attr('id') == "tmE") {
        var tmE = $(e).val().split(':')
        var tmE_Hours = tmE[0]
        var tmS = $('#tmS').val().split(':')
        var tmS_Hours = tmS[0]

        if (tmE_Hours <= tmS_Hours) {
            tmS = (parseInt(tmS_Hours) + 1) + ":" + minut
            $("#tmE").val(tmS);
        }
    }
}
function getTimeForS() {
    var dtToday = new Date();
    var hours = dtToday.getHours();
    var minut = dtToday.getMinutes();
    if (hours < 10) {
        hours = '0' + hours.toString();
    }
    if (minut < 10) {
        minut = '0' + minut.toString()
    }
    time = (parseInt(hours) + 1) + ":" + minut
    $("#tmS").val(time);
    time = (parseInt(hours) + 2) + ":" + minut
    $("#tmE").val(time);
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
function getSupplierDetails_LK(guid)
{
    var obj = { "guid": guid }
    $.ajax({
        type: "POST",
        url: "Requests.aspx/getSupplierDetails_LK",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d);
           // //console.log(j);

            $('#dropdownMenuButton').text('Профиль ('+j[0].E_MAIL+')');
            $('#welcome').text('Добро пожаловать, ' + j[0].NAME + ' !')
            $('.galHeader').text(j[0].FULL_NAME)
            $('.img-responsive').attr('style', 'background: url("' + j[0].ICON + '")')
            $('.gallery').css('background-size', 'cover')
            $('.gallery').css('background-position-y', 'bottom')
            if (j[0].PHONE_FAKS != "" && j[0].PHONE_FAKS!=null)
            {
                $('#contact').show().after('<div class="bossBx"><div><a href="tel:' + j[0].PHONE_FAKS + '">' + j[0].PHONE_FAKS + '</a></div><a href="tel:' + j[0].PHONE_FAKS +'"> </a></div>')
            }
            
        }
    })
}
function GetSupplierRequesets_LK(guid)
{
    var o = { guid: guid }
    $.ajax({
        type: "POST",
        url: "Requests.aspx/GetSupplierRequesets_LK",
        data: JSON.stringify(o),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var jsondata_ = JSON.parse(data.d)
          // //console.log(jsondata_);
            //' + oData.ATRIBUTE + '
            //\''+ oData.ATRIBUTE +'\'
            $('#RequestTables').DataTable({
                orderCellsTop: true,
                "destroy": true,
                data: jsondata_,

                columns: [{
                    'data': 'ID',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.GUID + '\',' + oData.STATUS_ID + ')"' + emergency + '  >' + oData.ID + '</a>');
                    },
                    'fnCreatedRow': function (nRow, aData, iDataIndex) {
                        //$(nRow).attr('onclick', 'SendId(' + aData.ID + ',' + aData.STATUS_ID_ID+')');
                        $('#RequestTables tbody tr:eq(' + iDataIndex + ')').attr('onclick', 'SendId(\'' + oData.GUID + '\',' + aData.STATUS_ID + ')');
                    },
                },
                {
                    'data': 'CLIENT',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.GUID + '\',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.CLIENT + '</a>');
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.GUID + '\',' + oData.STATUS_ID + ')');
                    },
                },

                {
                    'data': 'OBJECT',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.GUID + '\',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.OBJECT + '</a>');
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.GUID + '\',' + oData.STATUS_ID + ')');
                    },
                },

                {
                    'data': 'CRDATE',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        var CRDATE = oData.CRDATE
                        CRDATE = CRDATE.substring(0, 10)
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.GUID + '\',' + oData.STATUS_ID + ')" ' + emergency + '  >' + CRDATE + '</a>');
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.GUID + '\',' + oData.STATUS_ID + ')');
                    },
                },

                {
                    'data': 'COMMENT',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.GUID + '\',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.COMMENT + '</a>');
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.GUID + '\',' + oData.STATUS_ID + ')');
                    },
                },

                {
                    'data': 'SUPPLIER',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.GUID + '\',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.SUPPLIER + '</a>');
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.GUID + '\',' + oData.STATUS_ID + ')');
                    },
                },

                {
                    'data': 'WORKDATE',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.GUID + '\',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.WORKDATE.substring(0, oData.WORKDATE.indexOf(' ')) + '</a>');
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.GUID + '\',' + oData.STATUS_ID + ')');
                    },
                },
                {
                    'data': 'STATUS_ID',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.GUID + '\',' + oData.STATUS_ID + ')" ' + emergency + '  >' + oData.STATUS_NAME + '</a>');
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.GUID + '\',' + oData.STATUS_ID + ')');
                    },
                },

                {
                    'data': 'WORKDATE',
                    'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                        //var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                        //$(nTd).html('<a href="#" ' + emergency + '  >' + oData.WORKDATE.substring(0, oData.WORKDATE.indexOf(' ')) + '</a>');
                        var tic = (oData.PAYED == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                        $(nTd).html(tic);
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.GUID + '\',' + oData.STATUS_ID_ID + ')');
                    },
                },

                ],
                aaSorting: [[0, 'desc']],
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
function GoToSuppOficePage(page)
{
    if (page == 'RequestCreate.aspx') {
        sessionStorage.removeItem('TRst');
        sessionStorage.removeItem('RId');

        window.location.href=page

    }
    else {

        window.location.href = page
    }
}