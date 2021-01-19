
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
            //console.log(JSON.stringify(result));
        },
        error: function (r) {
            //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        }
    });
    return;
}
$(function () {

    $('#OutD').click(function ()
    {
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

  
    var LogId = sessionStorage.getItem("Log")
    if (LogId == null) {
        window.location.href = "../ClientLogin.aspx";

    }
    $("#lgId").text('Login_' + LogId);
    var obj_Chk = {
        Log: LogId
    };
    if (LogId!=742) {
     $.ajax({
            type: "POST",
            url: "../Disp_Admin/RegisterRequest.aspx/CheckkDisp",
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
                //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                alert("FAIL");
            }
        });
    }
    var obj_lg = {
        Clid: 341,
        EventModul: "Dispo",
        logDisp: LogId
    };
    //$.ajax({
    //    type: "POST",
    //    url: "../Client_Admin/CreateOpject.aspx/GetLogs",
    //    data: JSON.stringify(obj_lg),
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        //  //console.log(result)

    //        //var jsondata_1 = JSON.stringify(result.d)
    //        var jsondata_2 = JSON.parse(result.d)
    //        // //console.log()
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
    //        //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
    //    },
    //    failure: function (r) {
    //        alert("FAIL");
    //    }
    //});
   // GETSUPPNAME(LogId)
    var loc = window.location.pathname;
    var SUPP = sessionStorage.getItem('SUPP')//.toString(); Can't convert to string
    

    if (SUPP == null || SUPP.length == 0 || SUPP=="") {

        var o_b_j = { lg: LogId }
        if (LogId!=742) {
    $.ajax({
                type: "POST",
                url: "SRequests.aspx/GetSuppNamebyLogin",
                data: JSON.stringify(o_b_j),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //console.log(result)
                    var jsondata_2 = JSON.parse(result.d)
                    var SUPP = jsondata_2[0].GUID
                    sessionStorage.setItem('SUPP', SUPP);
                    //  $('body').attr('data-supp', SUPP)

                },

                error: function (r) {
                    //alert("Error");
                    //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                },
                failure: function (r) {
                    alert("FAIL");
                }
            });
        }
    }

    var oobj3 = { LgId: LogId }
    $.ajax({
        type: "POST",
        url: "SRequests.aspx/GetDispName",
        data: JSON.stringify(oobj3),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //console.log(result)
            var jsondata_2 = JSON.parse(result.d)

            $("#fiodsp").text(jsondata_2[0].ACCOUNT_NAME)

        }
    })
    
    if (loc == '/Supplier_Admin/CreateSRequest.aspx') {

        var R_id = sessionStorage.getItem("RId")
        $('#chkem').click(function ()
        {

            if ($(this).prop('checked') == true) {
                $('#opl').hide()
                $('#opl').prev('label').hide()
            }
            else {
                $('#opl').show()
                $('#opl').prev('label').show()
            }
        })
        if (R_id == "" || R_id == undefined || R_id == null) {
            
            getCurrentDispObject("", LogId);
            getDate();
            getTimeForS();
            $('#tm').val(getTime())
            $('#Acnum').focus(function () {
                getExistIndividualsAndScores($('#objctZ').val(), $('#Room').val());

            })
            getServiceSet("", LogId);
            //GetAccFortexnik(LogId, "");
            $('#backUo').click(function ()
            {
                window.location.href ="SRequests.aspx"
            })
            $(document).on('change', '#IspolList', function () {
                $("#IspolList_S").hide();
                var ispo_l = $(this).prop('selectedIndex');
                if (ispo_l == 1) {
                    $("#SaveMO").hide();
                    $("#SaveDD").show()
                }
                else {
                    $("#SaveDD").hide();
                    $("#SaveMO").show()
                }
            })
            $(document).on('change', '#objctZ', function ()
            {
                $('.col-md-12').remove()
                var objId = $('#objctZ').val()
                GetServicesForSupplier('', objId, LogId, null);

                getSuppsDatas(objId, LogId);
            })
            $("#SaveDD").click(function () {
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
                $('.col-md-12').each(function ()
                {
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
                            successRequest=false
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
                totality = (totality == undefined) ? '' : totality
                if (totality == 0 || totality.length == 0) {
                    $('#ErrTotal').remove();
                    $('#totlCost').text('Необходимо заполнить поля "Итого"').css('color','red')
                 //   $('#totalCostN').after('<label id="ErrTotal" style="color:red">Необходимо заполнить поля "Итого"</label>')
                    $("html, body").animate({ scrollTop: 500 }, "slow");
                    window.setTimeout(function () { $('#totlCost').text("Итого:").css('color','black'); }, 4000);
                    successRequest=false
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
                        RImg = RImg  + ImgSrc + ","
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
                        "SUPPSERVICES":SUPPSERVICES,
                        "WORKBEGIN": $('#tmS').val().replace(':', '-'),
                        "WORKDATE": Calendar.split('-').reverse().join('.'),
                        "WORKEND": $('#tmE').val().replace(':','-'),
                        "login": accnmbr,
                        "tokenID": ""
                    }
                   

                }
                //console.log(JSON.stringify(obj))
                if (successRequest == true) {
                  SaveRequest_Supp(obj)
                }
            })
            $('#SaveMO').click(function ()
            {
                $("#SaveDD").click();
            })
            $('#SendComent').hide();
        }
        else {
          
            $("#SendComent").click(function () {
                var imgD_url = $("#himgs > img").length;
                if ($("#RComment").val().length != 0 || imgD_url != 0) {
                    sensComment(R_id, $("#RComment").val(), imgD_url)
                    // alert("Ok")
                }
                else {
                    $("#RComment_S").text("Введите, пожалуйста, комментарий или прикрепите файл").show()
                }

            })
                $("#fileH").change(function () {
                    // $("#loader").show();
                    var filePath = $('#f_iles2').val();
                    //<img id="imgdwnl2" style="width:71px"/>//
                    var lastimage = $("#hstCom h4:last-child").text();
                    $("#cmntsts2").after()
                    var index = filePath.lastIndexOf("\\") + 1;
                    var filename = filePath.substr(index);

                    readURLH(this, filename);

                })
                function readURLH(input, imgName) {
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
                                        $('#fileH').hide();
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
                                    //console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

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
                function H_fileSave(rid, imgC) {//ImgAdres
                    var img_s = [];
                    imgC = $("#himgs > img:last").attr("itemid");
                    for (var i = 1; i <= imgC; i++) {
                        var imgAdres = ($(".HistImg[itemid='" + i + "']").attr("data-url") != undefined) ? $(".HistImg[itemid='" + i + "']").attr("data-url") : "";
                        img_s.push({ "ImgAdres": imgAdres })
                    }
                    var obj = { "R": rid, "imgs": img_s }
                    $.ajax({
                        type: "POST",
                        url: "CreateRequest.aspx/SaveHFile",
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
                                        $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (сегодня в " + getTime() + ")  </h5> ")
                                    }
                                    if (extention == "docx" || extention == "doc") {
                                        $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/word.png" style="width:71px" /></a>')
                                        $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (сегодня в " + getTime() + ")  </h5> ")

                                    }
                                    if (extention == "xlsx" || extention == "xls") {
                                        $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png"style="width:71px" /></a>')
                                        $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (сегодня в " + getTime() + ")  </h5> ")

                                    }
                                    if (extention == "pdf" || extention == "PDF") {
                                        $("#hstCom").append('<br><a href="' + F_ile + '" download=""> <img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png" style="width:71px" /></a>')
                                        $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (сегодня в " + getTime() + ")  </h5> ")

                                    }
                                    if (extention == "txt" || extention == "TXT") {
                                        $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png"style="width:71px" /></a>')
                                        $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (сегодня в " + getTime() + ")  </h5> ")

                                    }
                                }

                            }
                        }
                    })
                }
                GetRequesByR(R_id)
                var st = sessionStorage.getItem("st")
                if (st == 2) {
                    $('a[href="SRequests.aspx"]').click(function () {
                        var changes = sessionStorage.getItem('changes');
                        if (changes == "true") {
                            var result = confirm("Внесенные данные будут утеряны");
                            if (result == true) {
                                window.location.href = "SRequests.aspx"

                            } else {

                                return false;
                            }
                        }
                    })

                    $('a[href="AllRequsts.aspx"]').click(function () {
                        var changes = sessionStorage.getItem('changes');
                        if (changes == "true") {
                            var result = confirm("Внесенные данные будут утеряны");
                            if (result == true) {
                                window.location.href = "SRequests.aspx"

                            } else {

                                return false;
                            }
                        }
                    })

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
                    // $('#chkem').removeAttr('disabled');
                    $(document).on('change', '#IspolList', function () {
                        $("#IspolList_S").hide();
                        var ispo_l = $(this).prop('selectedIndex');
                        if (ispo_l == 1) {
                            $("#SaveMO").hide();
                            $("#SaveDD").show()
                        }
                        else {
                            $("#SaveDD").hide();
                            $("#SaveMO").show()
                        }
                    })
                    getDate();
                    $('#Acnum').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
             
                    getTime();
                    // $("#shServ").hide();
                    $("#hdPr").text("Прикрепленный файл")
                    //$("#hedrZ").text("Заявка № " + R_id + "   (Статус заявки \" \Отправлена \"\)").attr("Z_id", R_id);
                    $('#objctZ').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');//mms3
                    // $("#chkem").attr('disabled', 'disabled')
                    $("#Room").attr('disabled', 'disabled')
                    $("#Ind,#tm").attr('disabled', 'disabled')
                    $("#Phn").attr('disabled', 'disabled')
                    $("#AddedTable").hide();
                  $("#fileH").hide();
                    $("#HImg").show();
             
                    $("#Room_Type,#GServices").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#SendComent,#hstCom,#hstComh").hide();
                    $("#RText").attr('disabled', 'disabled');
                    // $("#files").attr('disabled', 'disabled');
                    $("#files").hide();
                    // $("#SaveDD").text("Работа выполнена")
                    $("#backUo").text("Отменить заявку")
                    //$("#SaveDD").click(function () {


                    //    Change_suppreq_status(LogId, $('#hedrZ').attr('z_id'), "1", "", $('#hedrZ').attr('r_num'))
                    //})
                    $("#SaveDD").text('Сохранить')
                    $("#SaveMO").text('Принять в работу').show();
                    $("#SaveDD").click(function () {
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
                        var opl = ($('#opl').prop('checked') == true) ? $('#fiodsp').text()+ '/'+ new Date().toString() : '';
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
                                "PAYED": opl,
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
                           SaveRequest_Supp2(obj,"S")
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
                        $('#myModal5 .modal-content2 .modal-footer2').children('.col-xs-2').remove();
                        if (successOtmen == true) {
                            $('#myModal5').show();
                            $('#reasonlbl').remove();
                            $('#myModal5').children('.modal-content2').children('.modal-header2').append('<label id="reasonlbl" style="font-size: 20px;color: rgb(0,147,233);">Укажите причину отмены заявки</label>').css('color', 'black')
                          
                            //$('#f_iles2').attr('onchange', 'FileForOtmen(this)')
                            $('#OkVipol').click(function () {

                                Change_suppreq_status(LogId, $('#hedrZ').attr('z_id'), "4", $('#cmntsts2').val(), $('#hedrZ').attr('r_num'))
                                  $('#cmntsts2').text('');
                                $('#close_5').click();
                                
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
                  
            
                }
                if (st == 1) {
                    //  $('#opl').attr('disabled','disabled')
                    $('a[href="SRequests.aspx"]').click(function () {
                        var changes = sessionStorage.getItem('changes');
                        if (changes == "true") {
                            var result = confirm("Внесенные данные будут утеряны");
                            if (result == true) {
                                window.location.href = "SRequests.aspx"

                            } else {

                                return false;
                            }
                        }
                    })

                    $('a[href="AllRequsts.aspx"]').click(function () {
                        var changes = sessionStorage.getItem('changes');
                        if (changes == "true") {
                            var result = confirm("Внесенные данные будут утеряны");
                            if (result == true) {
                                window.location.href = "SRequests.aspx"

                            } else {

                                return false;
                            }
                        }
                    })

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

                    //$(document).keyup(function () {
                    //    alert('hello')
                    //})
                    // $("#shServ").hide();
                    $('#Acnum').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#hdPr").text("Прикрепленный файл")
                    $("#hedrZ").text("Заявка № " + R_id + "   (Статус заявки \" \В работе \"\)");
                    $('#objctZ').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');//mms3
                    $("#chkem").attr('disabled', 'disabled')
                    $("#Room").attr('disabled', 'disabled')
                    $("#Ind").attr('disabled', 'disabled')
                    $("#Phn,#Sets").attr('disabled', 'disabled').css('background-color', 'rgb(235, 235, 228)')
                    $("#AddedTable").hide();
                    $("#fileH").hide();
                    $("#HImg").show();
                    // $("#PrServiceH").find('th:eq(2)').hide();
                    $("#calen1").attr('disabled', 'disabled')
                    $("#tmS,#tmE").attr('disabled', 'disabled')
                    $("#IspolList").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#Room_Type").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#SendComent").hide();
                    $("#RText").attr('disabled', 'disabled');
                    // $("#files").attr('disabled', 'disabled');
                    $("#files").hide();
                    $('#hstComh,#hstCom').hide();
                    $("#SaveDD").text("Работа выполнена")
                    $("#backUo").text("Отменить заявку")
                    $("#SaveDD").click(function () {
                        var successVipol = true;
                       
                        if (successVipol == true) {

                            RabotVipol(R_id)
                        }
                    })



                    $("#backUo").click(function () {
                        var successOtmen = true

                        var objOt = { "Rid": R_id, 'login_id': $('#lgId').text() }
                        if (successOtmen == true) {
                            $('#myModal5').show();
                            $('#reasonlbl').remove();
                            $('#myModal5').children('.modal-content2').children('.modal-header2').append('<label id="reasonlbl" style="font-size: 20px;color: rgb(0,147,233);">Укажите причину отмены заявки</label>').css('color', 'black')
                            $('#cmntsts2').text('');
                            $('#myModal5 .modal-content2 .modal-footer2').children('.col-xs-2').remove();
                            $('#f_iles2').attr('onchange', 'FileForOtmen(this)')
                            $('#OkVipol').click(function () {
                                
                                Change_suppreq_status(LogId, $('#hedrZ').attr('z_id'), "4", $('#cmntsts2').val(), $('#hedrZ').attr('r_num'))
                                $('#close_5').click();
                               
                            })
                            //$('#f_iles2').change(function () {
                            //    // $("#loader").show();
                            //    var filePath = $('#f_iles2').val();
                            //    //<img id="imgdwnl2" style="width:71px"/>//
                            //    var lastimage = $("#hstCom h4:last-child").text();
                            //    $("#cmntsts2").after()
                            //    var index = filePath.lastIndexOf("\\") + 1;
                            //    var filename = filePath.substr(index);
                            //    // filename = encodeURI();
                            //    readU_RLZakrit(this, filename);
                            //})
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
                    //$('#AddServ_s').attr('disabled');
                }

               
                // GetSelectedServ(R_id)
                // $("#SaveDD").text("Редактировать Заявку")
                if (st == 4 || st == 5) {
                    $("#hdPr").text("Прикрепленный файл")
                    $('#hstComh,#hstCom,#RComment').hide()
                    $('#SaveDD').hide();
                    $("#backUo").show().text('Назад');
                    $('#backUo').click(function () { window.location.href = "SRequests.aspx" });
                    $('#opl').attr('disabled', 'disabled')
                    // $("#shServ").hide();
                    $('#Acnum').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    if (st == 5) {
                        $("#hedrZ").text("Заявка № " + R_id + "   (Статус заявки \" \Закрыта \"\)");
                       // GetRSComment(R_id)
                        // $("#lstcmnt").show();
                        $("#lstcmnt").click(function () {
                            var last = $("#hstCom h4:last-child").text();
                            //alertMessage("", last, "");
                            Commentst();

                            //alert(last)
                        })
                    }
                    else {
                        $("#hedrZ").text("Заявка № " + R_id + "   (Статус заявки \" \Отменена \"\)");
                    }


                    $("#hComennt").hide();
                    $("#RComment,#hstComh,#hstCom").hide();
                    $('#objctZ,#Sets').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#chkem,opl").attr('disabled', 'disabled')
                    $("#Room").attr('disabled', 'disabled')
                    $("#Ind").attr('disabled', 'disabled')
                    $("#Phn").attr('disabled', 'disabled')
                    $("#AddedTable").hide();
                    // $("#PrServiceH").find('th:eq(2)').hide();
                    $("#calen1").attr('disabled', 'disabled')
                    $("#tmS,#tmE").attr('disabled', 'disabled')
                    $("#IspolList").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#Room_Type").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#RText").attr('disabled', 'disabled');
                    // $("#files").attr('disabled', 'disabled');
                    $("#files").hide();
                    $("#RComment,#hComennt").attr('disabled', 'disabled').show();;
                    $("#SaveDD,#SendComent").hide();
                    $("#objctZ").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)')

                    //  $('#PrServiceH tr:eq(0) td:eq(4) .delBtn').attr('disabled', 'disabled');

                }
                if (st == 3) {
                    $('#opl').attr('disabled', 'disabled');
                    // $("#shServ").hide();
                    $("#hdPr").text("Прикрепленный файл")
                   // GetRSComment(R_id)
                    $('#objctZ').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                   // getEngTextDispForVerVrbt(LogId, "2");
                    $("#hedrZ").text("Заявка № " + R_id + "   (Статус заявки \" \Выполнена \"\)");
                    $("#chkem").attr('disabled', 'disabled')
                    $("#Room").attr('disabled', 'disabled')
                    $("#Ind").attr('disabled', 'disabled')
                    $("#Phn").attr('disabled', 'disabled')
                    $("#cmntsts").css("max-height", "109px").css("max-width", "100%")
                    $("#fileH").hide();
                    $("#HImg").show();
                    $("#AddedTable").hide();
                    // $("#PrServiceH").find('th:eq(2)').hide();
                    $("#calen1").attr('disabled', 'disabled')
                    $("#tmS,#tmE").attr('disabled', 'disabled')
                    $("#IspolList").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#Room_Type,#Sets").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
                    $("#RText").attr('disabled', 'disabled');
                    //$("#files").attr('disabled', 'disabled');
                    $("#files").hide();
                    $("#SaveDD").text("Закрыть Заявку")
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
                    $("#SaveDD").click(function () {
                        var successZakrit = true;
                        //var P_Services = []
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
                        //        $(this).children('td:eq(3)').children('a').after('<label style="color:red" id="lblCost">Необходимо показать стоимость</label>')
                        //        window.setTimeout(function () {
                        //            // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
                        //            $('#lblCost').hide(1000);
                        //            $('#lblCost').remove();
                        //        }, 3000);
                        //        successZakrit = false;
                        //    }
                        //    var serviceId = $(this).children('td:eq(0)').attr('itemid');
                        //    P_Services.push({ 'SERVICE_ID': serviceId, 'QUANTITY': quant, 'COST': Cost })

                        //})
                        //if (P_Services.length == 0) {
                        //    successZakrit = false;
                        //    $("#PrService_S").text("Необходимо выбрать услугу").show();
                        //    $("html, body").animate({ scrollTop: 50 }, "slow");
                        //}
                        var opl = $('#opl').prop('checked');
                        opl = "" + opl + ""
                        if (successZakrit == true) {
                            var objV = { "Rid": R_id, "comment": $("#RComment").val(), 'login_id': $('#lgId').text() }
                            // alert("Ok");
                            // MakeZakrit(objV)
                            $('#myModal5').show();
                            $('#f_iles2').attr('onchange', 'fileForZakrit(this)');
                            $('#lblreason').remove();
                            $('#myModal5').children('.modal-content2').children('.modal-header2').append('<label id="lblreason" style="font-size: 20px;color: rgb(0,147,233);">Укажите причину закрыть заявки</label>').css('color', 'black')
                            $('#cmntsts2').text('Все работы по данной заявке выполнены');
                            $('#OkVipol').click(function () {
                                Change_suppreq_status(LogId, $('#hedrZ').attr('z_id'), "5", $('#cmntsts2').val(), $('#hedrZ').attr('r_num'))
                                $('#close_5').click();
                                
                            })
                            //$('#f_iles2').change(function () {
                            //    // $("#loader").show();
                            //    var filePath = $('#f_iles2').val();
                            //    //<img id="imgdwnl2" style="width:71px"/>//
                            //    var lastimage = $("#hstCom h4:last-child").text();
                            //    $("#cmntsts2").after()
                            //    var index = filePath.lastIndexOf("\\") + 1;
                            //    var filename = filePath.substr(index);
                            //    // filename = encodeURI();
                            //    readU_RLZakrit(this, filename);
                            //})


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
                            // $('#Close_Ot').click(function () { $('#close_5').click() })
                        }

                    })
                 
                    $("#backUo").click(function () {
                        Change_suppreq_status(LogId, $('#hedrZ').attr('z_id'), "1", "", $('#hedrZ').attr('r_num'))
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
    if (loc == '/Supplier_Admin/SRequests.aspx') {

        loadUnitedSuperUtilites_And_page()

      
    }

})


function loadUnitedSuperUtilites_And_page() {
    //$('#body').load('../Super_Disp/DispRequests.aspx #contentRegister')

    var script = document.createElement("script");

    script.src = "../Super_Disp/Utilities/UnitedSuper_Utilities.js"//;?" + Math.random()+"
    script.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(script);
}
 

/*
      sessionStorage.setItem("st", "")
      sessionStorage.setItem("RId","");
      if (LogId!=742) {
          gtStatuses();
          sessionStorage.setItem('changes', null)
          $('a[href="SRequests.aspx"]').css('background-color', '#FFDEAD')
          sessionStorage.setItem("All", "Notall");
          sessionStorage.removeItem("RId");
          sessionStorage.removeItem("st");
          getcurrdspObjForFilter(LogId);
          $('.ui-loader-background').show();
          $('#loader').show();
          SUPP = sessionStorage.getItem('SUPP')

          getRequestTable(LogId);
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
      else {
          Super_Supplier_Requests();
      }
      */
/*
function Change_suppreq_status(lg, reqGuid, status_id, dss,ReqNum)
{
    var obj = { tokenID: lg, REQ_GUID: reqGuid, STATUS_ID: status_id, DESCRIPTION: dss } 
    $.ajax({
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + '//WCFServices/MATORIN.QUICK_API.svc/Change_suppreq_status',
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var statusText = (status_id == "1") ? "принята в работу" : (status_id == "3") ? " выполнена" : (status_id == "5") ?"закрыта" :"отменена"
            SaveLog_S(statusText, "Простое", "Диспетчер", "Диспетчеризация", "Заявка < " + ReqNum + " > " + statusText+"", lg);
            window.location.href = "SRequests.aspx";
        }
    })
}
function getSuppsDatas(objId, lg) {
    var obj = {
        "obj": objId, "lg": lg
    }
    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/getSuppsDatas",
        data: JSON.stringify(obj),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d);
            $('#objctZ').attr('data-suppGuid', j[0].SUPP_GUID)
        }
    })
}
function Super_Supplier_Requests() {
    $.ajax({
        type: "POST",
        url: "SRequests.aspx/Super_Supplier_Requests",
       
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var jsondata_ = JSON.parse(data.d)
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
                        $(nTd).html('<a href="#" onclick="SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')" ' + emergency + '  >' + oData.STATUS + '</a>');
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\'' + oData.ATRIBUTE + '\',' + oData.STATUS + ')');
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
function getTimeForS()
{
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
function ControlTime(e)
{
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
            tmS =(parseInt(hours) + 1) + ":" + minut
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
function ControlDate(e)
{
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
 
function GetServicesForSupplier(e,objId, lg, service_guid)
{
    if (service_guid == "0") {
        service_guid = $(e).children('option:selected').attr('value')
    }
    var obj = { "obj": objId, "lg": lg, "service_guid": service_guid }
    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/GetServicesForSupplier",
        data: JSON.stringify(obj),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data)
        {
            var j = JSON.parse(data.d);
            //console.log(j);
            $('#objctZ').attr('data-supp', j[0].SERVICE_SUPPLIER)
            if (service_guid == null) {
                if (j[0].CHILDS != 0) {
                    $('#addg').remove();
                    $('#Phn').after('<input type="button" value="Добавить группа услуг" onclick="AddGroupServiceSupp(this)" id="addg" style="float:right;" class="btn btn-default logBtn"><div class="col-md-12" data-child="1" style="border-style: groove;border-color: lightblue;"><i class="fa fa-close removing3" itemid="1" onclick="removeGroupSupp(this)" style="font-size:25px" aria-hidden="true"></i><select onchange=GetServicesForSupplier(this,' + objId + ',' + lg + ',"0") id="grupS_1" style="width: auto; margin-top: 34px;margin-bottom: -10px;" class="select2 narrow wrap"></select></div>')
                    for (var i = 0; i < j.length; i++) {
                        $('#grupS_1').append('<option value=' + j[i].SERVICE_GUID + ' data-guid=' + j[i].SERVICE_GUID + '>' + j[i].SERVICE_GROUP + '</option>')
                    }
                    GetServicesForSupplier($('#grupS_1'), objId, lg, j[0].SERVICE_GUID)
                }
                else {
                    $('#Phn').after('<div class="col-md-12" data-child="0" data-S=' + j[0].SERVICE_GUID + ' style="border-style: groove;border-color: lightblue;"><table><thead><tr><th><select   id="Combo_0"  data-cost=' + j[0].SERVICE_COST + ' data-img=' + j[0].SERVICE_ICON + ' class="select2 narrow wrap" style="width: 100%;"></select></th><th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Кол-во" value="1" id="kol" style="width: auto;"></th> <th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Цена" value=' + j[0].SERVICE_COST + ' id="Ser_Summ" style="width: auto;"></th><th style="width: 120px;"><i class="fa fa-close removing3" itemid="1" onclick="removeServiceSupp(this)" style="font-size:25px" aria-hidden="true"></i></th></tr></thead><tbody><tr><td colspan="2"><textarea placeholder="Комментарий" style="width: 100%;"></textarea></td><td><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Окончателная сумма" disabled="disabled" value=' + j[0].SERVICE_COST + ' id="EndSumm" style="width: auto;"></td><td><img src=\"'+j[0].SERVICE_ICON+'\" style="width: 130px;"></td></tr></tbody></table><input type="button" value="Добавить услугу" id="AddServ_s" onclick="AddServiceSupp(this)" style="float:right" class="btn btn-default logBtn"></div>')

                    for (var i = 0; i < j.length; i++) {
                        $('#Combo_0').append('<option value=' + j[i].SERVICE_GUID + ' data-cost=' + j[i].SERVICE_COST + ' data-img=' + j[i].SERVICE_ICON +'>'+j[i].SERVICE_NAME+'</option>')
                    }

                    $('.col-md-12:last').after('<input type="number"  min=0 style="float:right;width:10%" onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + j[0].SERVICE_COST + '"/> <label style="float:right" id="totlCost">Итого: </label>');
                    $('.col-md-12:last').attr('data-total', j[0].SERVICE_COST);
                  //  $('.select2').attr('onchange', 'grupChange(this)')
                }
            }
            else {
                var GroupVal = $(e).val();
                $(e).next('table').remove();
                $('#AddServ_s').remove();
                $(e).parent().children('table').remove();
                $(e).after('<table><thead><tr><th><select onchange=getCosts(this) id="Combo_' + GroupVal + '" class="select2 narrow wrap" style="width: 100%;"></select></th><th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Кол-во" value="1" id="kol" style="width: auto;"></th> <th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Цена" id="Ser_Summ" value=' + j[0].SERVICE_COST+' style="width: auto;"></th><th style="width: 120px;"><i class="fa fa-close removing3" itemid="1" onclick="removeServiceSupp(this)" style="font-size:25px" aria-hidden="true"></i></th></tr></thead><tbody><tr><td colspan="2"><textarea placeholder="Комментарий" style="width: 100%;"></textarea></td><td><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Окончателная сумма" disabled="disabled" id="EndSumm" value=' + j[0].SERVICE_COST+' style="width: auto;"></td><td><img src="" style="width: 130px;"></td></tr></tbody></table><input type="button" value="Добавить услугу" id="AddServ_s" onclick="AddServiceSupp(this)" style="float:right" class="btn btn-default logBtn">')

                for (var i = 0; i < j.length; i++) {
                    $('#Combo_' + GroupVal).append('<option data-guid=' + j[i].SERVICE_GUID + '  value=' + j[i].SERVICE_GUID + ' data-cost=' + j[i].SERVICE_COST + ' data-img=' + j[i].SERVICE_ICON+'>' + j[i].SERVICE_NAME + '</option>')
                    var SERVICE_COST = j[0].SERVICE_COST
                    $(e).parent().parent().children('th:eq(2)').children('input[type="number"]').val(SERVICE_COST)
                    var SERVICE_ICON = j[0].SERVICE_ICON
                    $(e).parent().parent().parent().parent().children('tbody').children('tr:eq(0)').children('td:last').children('img').attr('src', SERVICE_ICON )
                }
                $('#totlCost,#totalCostN').remove();
                $('.col-md-12:last').after('<input type="number"  min=0 style="float:right;width:10%" onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + j[0].SERVICE_COST + '"/> <label style="float:right" id="totlCost">Итого: </label>');
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
    $('.col-md-12:last').after('<input type="number"  min=0 style="float:right;width:10%" onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + totalCost + '"/> <label style="float:right" id="totlCost">Итого: </label>');
    $('.col-md-12:last').attr('data-total', totalCost);
    
}
function grupChange(e)
{
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
    $('.col-md-12:last').after('<input type="number"  min=0 style="float:right;width:10%" onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + totalCost + '"/> <label style="float:right" id="totlCost">Итого: </label>');
    $('.col-md-12:last').attr('data-total', totalCost);
}
function ControlNummebrSupp(e)
{
    $(e).mask('##.00', { reverse: true, maxlength: false })
    var numberVal = $(e).val();
    numberVal = parseFloat(numberVal)
    if (numberVal <= 0) {
        $(e).val("1.00")
        numberVal = "1.00"
        numberVal = parseFloat(numberVal)
    }
    var NumberId = $(e).attr('id');
    if (NumberId == "kol" ) {
        var serviceSumm = $(e).parent().next().children('#Ser_Summ').val();
        serviceSumm = parseFloat(serviceSumm)
        var summery = serviceSumm * numberVal;
     //   $(e).parent().next().children('#Ser_Summ').val(summery);
        $(e).parent().parent().parent().next().children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val(summery)
    }
    if (NumberId =='Ser_Summ') {
        var serviceSumm = numberVal
        serviceSumm = parseFloat(serviceSumm)
        var kol = $(e).parent().prev().children('#kol').val();
        var summery = serviceSumm * parseFloat(kol);
        $(e).parent().next().children('#Ser_Summ').val(summery);
        $(e).parent().parent().parent().next().children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val(summery)
    }
    var totalCost=0
    $('.col-md-12').each(function ()
    {
        $(this).children('table').each(function ()
        {
            var endSums = $(this).children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val()
            if (endSums.length != 0) {
                totalCost = totalCost + parseFloat(endSums);
            }
        })
     
    })
    $('#totlCost,#totalCostN').remove();
    $('.col-md-12:last').after('<input type="number"  min=0 style="float:right;width:10%" onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + totalCost +'"/> <label style="float:right" id="totlCost">Итого: </label>');
    $('.col-md-12:last').attr('data-total', totalCost);
}
function controlTotal(e)
{
    if ($(e).val()<0) {
        $(e).val(0)
    }
}
function removeServiceSupp(e)
{
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
    $('.col-md-12:last').after('<input type="number"  min=0 style="float:right;width:10%" onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + totalCost + '"/> <label style="float:right" id="totlCost">Итого: </label>');
    $('.col-md-12:last').attr('data-total', totalCost);
}
function AddServiceSupp(e)
{
    var services = $(e).parent().children('table:eq(0)').clone()
    $(services).children('thead').children('tr:eq(0)').children('th:eq(0)').children('.select2:last').remove();
    var Service_guid = $(services).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').find('option:selected').attr('data-guid');
    var service_img = $(services).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').find('option:selected').attr('data-img');
    var service_cost = $(services).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').find('option:selected').attr('data-cost');//

    $(services).children('thead').children('tr:eq(0)').children('th:eq(1)').children('#kol').val("1")
    var combo_id = $(services).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').attr("id");
   
    combo_id = combo_id.substring(combo_id.indexOf('_')+1, 100);
    combo_id = parseInt(combo_id) + 1;
    
    $(services).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').attr("class", "select2 narrow wrap");
    
    $(services).children('thead').children('tr:eq(0)').children('th:eq(0)').children('select').attr("id", 'Combo_'+combo_id);
    $(services).children('thead').children('tr:eq(0)').children('th:eq(2)').children('#Ser_Summ').val(service_cost)
    $(services).children('tbody').children('tr:eq(0)').children('td:eq(0)').children('textarea').val("")
    $(services).children('tbody').children('tr:eq(0)').children('td:eq(1)').children('#EndSumm').val(service_cost)
    $(services).children('tbody').children('tr:eq(0)').children('td:eq(2)').children('img').attr("src", service_img);
    $(e).parent().children('table:last').after(services)
    $(e).parent().children('table').each(function ()
    {
        $(this).children('thead').children('tr').children('th:last').children('i').css('color', 'red');
    })
    var $select2 = $('.select2').select2({
        containerCssClass: "wrap"
    })
    if ($(e).parent().attr('data-child')==='0') {
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
function removeGroupSupp(e)
{
    var groupCount = $('.col-md-12').length
    if (groupCount>1) {
        $(e).parent().remove()
    }
    else {
        $(e).css('color','silver')
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
function AddGroupServiceSupp(e)
{
    var groups = $('.col-md-12:eq(0)').clone()
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
    $('.col-md-12:last').after('<input type="number"  min=0 style="float:right;width:10%" onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + totalCost + '"/> <label style="float:right" id="totlCost">Итого: </label>');
    $('.col-md-12:last').attr('data-total', totalCost);
    var $select2 = $('.select2').select2({
        containerCssClass: "wrap"
    })
    $(groups).children('table:eq(0)').children('thead').children('tr:eq(0)').children('th:eq(0)').children('.select2').slice(2).remove();
}
function getCosts(e)
{
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
    $('.col-md-12:last').after('<input type="number"  min=0 style="float:right;width:10%" onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value="' + totalCost + '"/> <label style="float:right" id="totlCost">Итого: </label>');
    $('.col-md-12:last').attr('data-total', totalCost);
}
function gtStatuses() {
    $.ajax({
        type: "POST",
        url: "../Disp_Admin/RegisterRequest.aspx/getStatuses",

        contentType: "application/json; charset=utf-8",

        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // //console.log(jsondata_)

            for (var i = 0; i < jsondata_.length; i++) {
                $("#sts").append('<option value="' + jsondata_[i].STATUS_ID + '">' + jsondata_[i].STATUS + '</option>')

            }



        }

    })
}
function getcurrdspObjForFilter(lgId) {
    var obj = { "lg": lgId }
    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/getObjectDisp",
        data: JSON.stringify(obj),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d);
            for (var i = 0; i < j.length; i++) {
                $('#object').append('<option value=' + j[i].OBJECT_ID + '>' + j[i].OBJECT_ADRESS+'</option>')
            }

        }
    })
}
function makefilter(objfilt, lg) {
    var obj = { "flt": objfilt, "Log": lg }
    $.ajax({
        type: "POST",
        url: "SRequests.aspx/Filterin",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            //console.log(jsondata_)

            if (jsondata_.length != 0) {
                //$('.formTable tr:not(:first)').remove();

                //for (var i = 0; i < jsondata_.length; i++) {//<td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")   href='CreateRequest.aspx'>" + jsondata_[i].ROOM_TYPE + "</a></td>
                //    var tic = (jsondata_[i].REQUEST_COMMENT == "True") ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                //    var emergency = (jsondata_[i].EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";

                //    $("#header_").after("<tr><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].REQUEST_ID + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].FIRST_NAME
                //        + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") class='adr" + i + "' href='CreateRequest.aspx'></a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].CR_DATE.substring(0, jsondata_[i].CR_DATE.indexOf(' ')) + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ")href='CreateRequest.aspx' title='" + jsondata_[i].REQUEST_TEXT + "'>" + jsondata_[i].REQUEST_TEXT + "</a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") class='isp" + i + "' href='CreateRequest.aspx'></a></td><td><a " + emergency + " onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].PLAN_END_DATE.substring(0, jsondata_[i].PLAN_END_DATE.indexOf(' ')) + "</a></td><td><a " + emergency + " href='CreateRequest.aspx' onclick=SendId(" + jsondata_[i].REQUEST_ID + "," + jsondata_[i].STATUS_ID + ") >" + jsondata_[i].STATUS
                //        + "</a></td><td>" + tic + "</td></tr >")
                //    gtObjBiInd(i, jsondata_[i].INDIVIDUAL_ID, jsondata_[i].ROOM_TYPE);//<td class='prs" + i + "'></td>
                //    gtIspol(i, jsondata_[i].REQUEST_ID)
                //    // gtservices(i, jsondata_[i].REQUEST_ID, jsondata_[i].STATUS_ID)

                //    // //console.log("ind Id: " + jsondata_[i].INDIVIDUAL_ID)
                //    //<td><a onclick=SendId(" + jsondata_[i].REQUEST_ID + ") href='CreateRequest.aspx'>" + jsondata_[i].ATRIBUTE + "</a></td>
                //}

                $('#RequestTables').dataTable({
                    orderCellsTop: true,
                    "destroy": true,
                    data: jsondata_,

                    columns: [{
                        'data': 'REQUEST_ID',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')"' + emergency + '  >' + oData.REQUEST_ID + '</a>');
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
                //$('#RequestTables').children('thead').children('tr').children('th').each(function () { $(this).append('<i style="margin-left:  5px;" data-icon="w" class="fa fa-unsorted" aria-hidden="true"></i>') })
                $('.ui-loader-background').hide();
                $('#loader').hide();


            }
            else {
                // $('.formTable tr:not(:first)').remove();
                // makefilter2(objfilt,lg)

                $('#RequestTables').dataTable({
                    orderCellsTop: true,
                    "destroy": true,
                    data: jsondata_,

                    columns: [{
                        'data': 'REQUEST_ID',
                        'fnCreatedCell': function (nTd, sData, oData, iRow, iCol) {
                            var emergency = (oData.EMERGENCY_TREATMENT == true) ? 'style="color:red;font-weight:bolder"' : "";
                            $(nTd).html('<a href="#" onclick="SendId(' + oData.REQUEST_ID + ',' + oData.STATUS_ID + ')"' + emergency + '  >' + oData.REQUEST_ID + '</a>');
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
                //$('#RequestTables').children('thead').children('tr').children('th').each(function () { $(this).append('<i style="margin-left:  5px;" data-icon="w" class="fa fa-unsorted" aria-hidden="true"></i>') })
                $('.ui-loader-background').hide();
                $('#loader').hide();
            }

        }
    })
}
function showAllServices() {
    $('.accMenu').show();
    $('input[onclick="showAllServices()"]').remove();
}
function MakeZakrit(obj) {
    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/MakeZakrit",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var LogId = sessionStorage.getItem("Log")
            var R_id = sessionStorage.getItem("RId");
            SaveLog_S("Закрыть заявку", "Простое", "Диспетчер", "Диспетчеризация", "Заявка < " + R_id + " > закрыта", LogId);
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
function     SaveFileOtmen(rid, img_s) {
    var obj = { "R": rid, "imgs": img_s }
    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/SaveHFile",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

        }
    })
}

function vernutVrabot(rid) {
   
    var modal = document.getElementById('myModal6');
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    $("#close_6").click(function () {
        modal.style.display = "none";
    })
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
function getEngTextDispForVerVrbt(logId, selected) {
    var obj = {
        lg: logId,

    };
    //alert(JSON.stringify(obj));

    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/GetTexniksAndothers",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var jsondata_ = JSON.parse(result.d)

            // //console.log(jsondata_)

            for (var i = 0; i < jsondata_.length; i++) {

                if (jsondata_[i].RS == "15") {
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
                $("#IspolList").val(selected);
                 $("#ispol2").val(selected);
                $("#Ispolname").text($("#IspolList option:selected").text()).attr("itemid", $("#IspolList option:selected").val())
            }
        }
    })
}

function sensComment(rid, rc, dturl) {
    if (rc.length != 0) {
        var obj = { "rq": rid, "cmnt": rc }
        $.ajax({
            type: "POST",
            url: "CreateSRequest.aspx/sntComment",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var hst = $("#hstCom").text().trim();
                if (hst == "-") {
                    $("#hstCom").empty();
                    $("#hstCom").append("<h4 style='margin-bottom:  -6px;'>- " + rc + "  </h4> (сегодня в " + getTime("") + ")")
                    $("#RComment").val("")

                }
                else {
                    $("#hstCom").append("<h4 style='margin-bottom:  -6px;'>- " + rc + "  </h4>     (сегодня в " + getTime("") + ")")
                    $("#RComment").val("")

                }
            }
        })
    }

    if (dturl != 0) {
        H_fileSave(rid, dturl)
        $("#HImg").attr("src", window.location.protocol + '//' + window.location.host + "/Files/upl.png").attr("data-url", "0")
    }
    $('#fileH').hide();

}
function H_fileSave(rid, imgC) {//ImgAdres
    var img_s = [];
    imgC = $("#himgs > img:last").attr("itemid");
    for (var i = 1; i <= imgC; i++) {
        var imgAdres = ($(".HistImg[itemid='" + i + "']").attr("data-url") != undefined) ? $(".HistImg[itemid='" + i + "']").attr("data-url") : "";
        img_s.push({ "ImgAdres": imgAdres })
    }
    var obj = { "R": rid, "imgs": img_s }
    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/SaveHFile",
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
                        $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (сегодня в " + getTime("") + ")  </h5> ")
                    }
                    if (extention == "docx" || extention == "doc") {
                        $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/word.png" style="width:71px" /></a>')
                        $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (сегодня в " + getTime("") + ")  </h5> ")

                    }
                    if (extention == "xlsx" || extention == "xls") {
                        $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/excel.png"style="width:71px" /></a>')
                        $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (сегодня в " + getTime("") + ")  </h5> ")

                    }
                    if (extention == "pdf" || extention == "PDF") {
                        $("#hstCom").append('<br><a href="' + F_ile + '" download=""> <img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/pedefe.png" style="width:71px" /></a>')
                        $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (сегодня в " + getTime("") + ")  </h5> ")

                    }
                    if (extention == "txt" || extention == "TXT") {
                        $("#hstCom").append('<br/><a href="' + F_ile + '" download=""><img data-url="' + F_ile + '" src="' + window.location.protocol + '//' + window.location.host + '/img/texete.png"style="width:71px" /></a>')
                        $("#hstCom").append("<h5 style='margin-bottom:  -6px;'>- (сегодня в " + getTime("") + ")  </h5> ")

                    }
                }

            }
        }
    })
}
function MakeOtmen(objOt) {
    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/MakeOtmen",
        data: JSON.stringify(objOt),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var LogId = sessionStorage.getItem("Log")
            var R_id = sessionStorage.getItem("RId");
            SaveLog_S("Отменить заявку", "Важное", "Диспетчер", "Диспетчеризация", "Заявка  < " + R_id + " > отменена", LogId);
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
function RabotVipol(R_id) {
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
        var LogId = sessionStorage.getItem("Log")
        Change_suppreq_status(LogId, $('#hedrZ').attr('z_id'), "3", $('#cmntsts2').val(), $('#hedrZ').attr('r_num'))
    })
}
function removeF3(e, num) {
    $(e).remove();
    $("#f_iles2").show();
    $("img[itemid='" + num + "']").remove();
    $(".titleF[itemid='" + num + "']").remove();
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


                    //alert("OK. See //console -  press F12");
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
                    //console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

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


                    //alert("OK. See //console -  press F12");
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
                    //console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

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


                    //alert("OK. See //console -  press F12");
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
                    //console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

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
function removeF(num) {
    // if (num == 0) {
    //.remove()//.val("");
    $("#fotoDisp" + num + "").parent().remove();
    $("#fotoDisp" + num + "").attr("data-url", "0").remove();//.attr("src", window.location.protocol + '//' + window.location.host + '/Files/upl.png')

    $("i[onclick='removeF(" + num + ")']").remove();
    var imgslenght = $("#imgss ").find('img').length;
    if (imgslenght < 5) {
        //var lastinputFileItem = $(".knop").find("img:last").attr("itemid");
        $("#files").show();
    }
}
function removeF2(e, num) {
    $(e).remove();
    $(".HistImg[itemid='" + num + "']").remove();
    $(".titleF2[itemid='" + num + "']").remove();
    $('#fileH').hide();
}
function DisableAllForPayed(s)
{
    if (s==2) {
        $('#opl').attr('disabled', 'disabled');
        $('#objctZ').attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');

        $("#chkem,#Room,#Ind,#Phn,#calen1,#tmS,#tmE,#RText").attr('disabled', 'disabled')
        $("#cmntsts").css("max-height", "109px").css("max-width", "100%")
        $("#IspolList,#Room_Type,#Sets").attr('disabled', 'disabled').css('background-color', 'rgb(235,235,228)');
        $("#fileH,#AddedTable,#files,#SendComent,#hstComh,#hstCom,#SaveDD").hide();
        $("#lstcmnt").show();
        
    }
}
//function GetRequesByR(R) {
//    var obj = { "GUID": R }
//    $.ajax({
//        type: "POST",
//        url: window.location.protocol + '//' + window.location.host + '//WCFServices/MATORIN.QUICK_API.svc/Get_supplier_request',
//        data: JSON.stringify(obj),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            //console.log(data);
//            //console.log("RequestDatas:");

//            var j = JSON.stringify(data.ResultData)
//            var jsondata_ = JSON.parse(j)

//            if (jsondata_.PAYED != null && jsondata_.PAYED.length != 0) {
//                $('#opl').prop('checked', true);
//                //sessionStorage.setItem("st", 3)
//              //  $('#calen1,#tmS,#tmE').attr('disabled', 'disabled')
//                // $('#SaveDD').hide();
//                DisableAllForPayed(jsondata_.STATUS);
//            }
//            $('#objctZ').empty()//$('#hedrZ').attr('r_num')
//            $("#hedrZ").text('Заявка № ' + jsondata_.ID + '   (Статус заявки "' + jsondata_.STATUS_NAME + '")').attr("Z_id", R).attr('r_num', jsondata_.ID);
//            $('#objctZ').append('<option value=' + jsondata_.OBJECT_ID + '>' + jsondata_.OBJECT + '</option>')
//            $('#objctZ').attr('data-suppGuid', jsondata_.SUPPLIER_GUID)
//            $('#objctZ').attr('data-supp', jsondata_.SUPPLIER)
//            $('#Room').val(jsondata_.ROOM)
//            $('#Acnum').val(jsondata_.login)
//            $('#Ind').val(jsondata_.CLIENT)
//            $('#Phn').val(jsondata_.PHONE_NUMBER)
//            var plan_date = jsondata_.WORKDATE
//            plan_date = plan_date.substr(0, 10);
//            plan_date = plan_date.split('.').reverse().join('-')
//            $('#calen1').val(plan_date)
//            var WorkBegin = jsondata_.WORKBEGIN
//            WorkBegin = WorkBegin.substr(0, 5);
//            $('#tmS').val(WorkBegin)
//            var WorkEnd = jsondata_.WORKEND
//            WorkEnd = WorkEnd.substr(0, 5);
//            $('#tmE').val(WorkEnd)
//            var COMMENT = decodeURI(jsondata_.COMMENT)
//            $('#RText').val(COMMENT)
//            var komments = decodeURI(jsondata_.COMMENTS)
//            $('#RComment').val(komments).attr('disabled','disabled')
//            $('.knop').hide()
//            if (jsondata_.FILES.length!=0) {
//     var files = jsondata_.FILES.split(',')
//                for (var i = 0; i < files.length; i++) {
//                    var format = files[i]
//                    format = format.substr(format.lastIndexOf('.') + 1)
//                    format = (format == 'docx' || format == 'doc') ? window.location.protocol + '//' + window.location.host + '/img/word.png' : (format == 'xlsx' || format == 'xls') ? window.location.protocol + '//' + window.location.host + '/img/excel.png' : (format == 'pdf' || format == 'PDF') ? window.location.protocol + '//' + window.location.host + '/img/pedefe.png' : (format == 'txt' || format == 'TXT') ? window.location.protocol + '//' + window.location.host + '/img/texete.png' : files[i]
//                    $('.knop').after('<div class="col-xs-2" id="zImg"><a href=' + files[i] + ' download=""><img class="foto-disp" data-url=' + '+files[i]+' + ' id="fotoDisp10" src=' + format + '></a></div>')
//                }
//            }
//            $("#lblIspo").hide();
//            $("#emIspo").hide();
//            $("#IspolFio").hide();
//            var LogId = sessionStorage.getItem("Log")
//            $('#PrService_S').before('<input type="number" min="0" style="float:right;width:10%" onchange="controlTotal(this)" onkeyup="controlTotal(this)" id="totalCostN" value=' + jsondata_.PAYMENT_SUMM + '><label style="float:right" id="totlCost">Итого: </label>')
//            if (LogId!=742) {
//                GetServicesForSupplierSelected(jsondata_.OBJECT_ID, LogId, "", jsondata_.SUPPSERVICES)
//            }
//            else {
//                $('#adr_S').before('<label>Поставшик</label><input type="text" disabled="disabled" value="' + jsondata_.SUPPLIER + '">')
//                GetServicesForSupplierSelected_Super(jsondata_.SUPPSERVICES)
//                $('input[value="Добавить услугу"],input[value="Добавить группа услуг"],input[type="number"],textarea[placeholder="Комментарий"],input[type="checkbox"]').attr('disabled', 'disabled');
//                $('.fa,#SaveDD,#SaveMO,#backUo').remove();
//                var $select2 = $('.select2').select2({
//                    disabled: "enable",
//                    containerCssClass: "wrap"
//                })
//            }
           

           
//        }

//    })
//}
function GetServicesForSupplierSelected(objId, lg, service_guid,array)
{
    var obj = { "obj": objId, "lg": lg, "service_guid": null }
    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/GetServicesForSupplierSelected",
        data: JSON.stringify(obj),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d);
           // //console.log(j);
            if (j[0].CHILDS != 0) {
                
              for (var k = array.length - 1; k >= 0; k--) {
                    if (k != array.length - 1) {
                        var PrevSGrupGUID = array[k + 1].SERVICE_GROUP_GUID
                        var curent = array[k].SERVICE_GROUP_GUID
                        if (PrevSGrupGUID == curent) {//<option>' + array[k].SERVICE_NAME + '</option>
                            $('.col-md-12[data-grupGuid=' + curent + ']').append('<table><thead><tr><th><select class="select2 narrow wrap" onchange=getCosts(this) id="Combo_' + k + '" style="width: 100%;"></select></th><th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Кол-во" value=' + array[k].SERVICE_COUNT + ' id="kol" style="width: auto;"></th> <th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Цена"  value=' + array[k].SERVICE_END_COST + ' id="Ser_Summ" style="width: auto;"></th><th style="width: 120px;"><i class="fa fa-close removing3" itemid="1" onclick="removeServiceSupp(this)" style="font-size:25px" aria-hidden="true"></i></th></tr></thead><tbody><tr><td colspan="2"><textarea placeholder="Комментарий"   style="width: 100%;">' + array[k].SERVICE_COMMENT + '</textarea></td><td><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Окончателная сумма" disabled="disabled" value=' + array[k].SERVICE_END_COST + ' id="EndSumm" style="width: auto;"></td><td><img src="" style="width: 130px;"></td></tr></tbody></table>')
                        }
                        else {
                            $('#Phn').after('<div class="col-md-12" data-grupGuid=' + array[k].SERVICE_GROUP_GUID + ' style="border-style: groove;border-color: lightblue;"><i class="fa fa-close removing3" itemid="1" onclick="removeGroupSupp(this)" style="font-size:25px" aria-hidden="true"></i><select onchange=GetServicesForSupplier(this,' + objId + ',' + lg + ',"0") class="select2 narrow wrap" id="grupS_' + k + '" style="width: auto; margin-top: 34px;margin-bottom: -10px;"></select></div>')
                            //<option>' + array[k].SERVICE_NAME + '</option>
                            $('#grupS_' + k + '').after('<table><thead><tr><th><select class="select2 narrow wrap" onchange=getCosts(this) id="Combo_' + k + '" style="width: 100%;"></select></th><th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Кол-во" value=' + array[k].SERVICE_COUNT + ' id="kol" style="width: auto;"></th> <th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Цена"  value=' + array[k].SERVICE_END_COST + ' id="Ser_Summ" style="width: auto;"></th><th style="width: 120px;"><i class="fa fa-close removing3" itemid="1" onclick="removeServiceSupp(this)" style="font-size:25px" aria-hidden="true"></i></th></tr></thead><tbody><tr><td colspan="2"><textarea placeholder="Комментарий"  style="width: 100%;">' + array[k].SERVICE_COMMENT + '</textarea></td><td><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Окончателная сумма" disabled="disabled" value=' + array[k].SERVICE_END_COST + ' id="EndSumm" style="width: auto;"></td><td><img src="" style="width: 130px;"></td></tr></tbody></table>')
                        }

                    }
                    else {//<option>' + array[k].SERVICE_NAME + '</option>
                        $('#Phn').after('<div class="col-md-12" data-grupGuid=' + array[k].SERVICE_GROUP_GUID + ' style="border-style: groove;border-color: lightblue;"><i class="fa fa-close removing3" itemid="1" onclick="removeGroupSupp(this)" style="font-size:25px" aria-hidden="true"></i><select onchange=GetServicesForSupplier(this,' + objId + ',' + lg + ',"0") class="select2 narrow wrap" id="grupS_' + k + '" style="width: auto; margin-top: 34px;margin-bottom: -10px;"></select></div>')
                        $('#grupS_' + k + '').after('<table><thead><tr><th><select class="select2 narrow wrap" onchange=getCosts(this) id="Combo_' + k + '" style="width: 100%;"></select></th><th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Кол-во" value=' + array[k].SERVICE_COUNT + ' id="kol" style="width: auto;"></th> <th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Цена"  value=' + array[k].SERVICE_END_COST + ' id="Ser_Summ" style="width: auto;"></th><th style="width: 120px;"><i class="fa fa-close removing3" itemid="1" onclick="removeServiceSupp(this)" style="font-size:25px" aria-hidden="true"></i></th></tr></thead><tbody><tr><td colspan="2"><textarea placeholder="Комментарий"  style="width: 100%;">' + array[k].SERVICE_COMMENT + '</textarea></td><td><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Окончателная сумма" disabled="disabled" value=' + array[k].SERVICE_END_COST + ' id="EndSumm" style="width: auto;"></td><td><img src="" style="width: 130px;"></td></tr></tbody></table>')

                  }
                //  GetServicesForSupplier($('#grupS_' + k + ''), objId, lg, array[k].SERVICE_GROUP_GUID)

                  GetServicesForSupplier2($('#Combo_' + k), objId, lg, array[k].SERVICE_GROUP_GUID, array[k].SERVICE_GUID)

                 // $('#Combo_' + k).val(array[k].SERVICE_GUID)
                    //   $('#grupS_' + k + '').append('<option>' + array[k].SERVICE_GROUP_NAME+'</option>')
                    for (var m = 0; m < j.length; m++) {
                        $('#grupS_' + k + '').append('<option value=' + j[m].SERVICE_GUID + '>' + j[m].SERVICE_GROUP + '</option>')
                  }
                    --$('.col-md-12[data-grupGuid=' + curent + ']') 
                    $('#grupS_' + k + '').parent().append('<input type="button" value="Добавить услугу" id="AddServ_s" onclick="AddServiceSupp(this)" style="float:right" class="btn btn-default logBtn">')
                  $('#grupS_' + k + ' option[value=' + array[k].SERVICE_GROUP_GUID + ']').attr('selected', 'selected')//.val(array[k].SERVICE_GROUP_GUID)
                  var $select2 = $('.select2').select2({
                      containerCssClass: "wrap"
                  })
                
                }
                $('#Phn').after('<input type="button" value="Добавить группа услуг" onclick="AddGroupServiceSupp(this)" id="addg" style="float:right;" class="btn btn-default logBtn">')
            }
            else {
                //console.log(array)
                //data-S=' + array[k].SERVICE_GUID + '
                $('#Phn').after('<div class="col-md-12" id="nochild" data-child="0"  style="border-style: groove;border-color: lightblue;"><input type="button" value="Добавить услугу" id="AddServ_s" onclick="AddServiceSupp(this)" style="float:right" class="btn btn-default logBtn"></div>')
                for (var k = array.length - 1; k >= 0; k--) {
                    $('#nochild').prepend('<table><thead><tr><th><select   id="Combo_' + k + '"  data-cost=' + array[k].SERVICE_COST + ' data-img=' + array[k].SERVICE_ICON + ' class="select2 narrow wrap" style="width: 100%;"></select></th><th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Кол-во" value=' + array[k].SERVICE_COUNT + ' id="kol" style="width: auto;"></th> <th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Цена" value=' + array[k].SERVICE_COST + ' id="Ser_Summ" style="width: auto;"></th><th style="width: 120px;"><i class="fa fa-close removing3" itemid="1" onclick="removeServiceSupp(this)" style="font-size:25px" aria-hidden="true"></i></th></tr></thead><tbody><tr><td colspan="2"><textarea placeholder="Комментарий" style="width: 100%;">' + array[k].SERVICE_COMMENT + '</textarea></td><td><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Окончателная сумма" disabled="disabled" value=' + array[k].SERVICE_END_COST + ' id="EndSumm" style="width: auto;"></td><td><img src=\"' + array[k].SERVICE_ICON + '\" style="width: 130px;"></td></tr></tbody></table>')
                    for (var i = 0; i < j.length; i++) {
                        $('#Combo_' + k).append('<option value=' + j[i].SERVICE_GUID + ' class="select2 narrow wrap" data-cost=' + j[i].SERVICE_COST + ' data-img=' + j[i].SERVICE_ICON + '>' + j[i].SERVICE_NAME + '</option>')
                    }
                    $('#Combo_' + k).val(array[k].SERVICE_GUID)
                    
                }
                var $select2 = $('.select2').select2({
                    containerCssClass: "wrap"
                })
                $('.select2').attr('onchange', 'grupChange(this)')
               
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

            if ($('#opl').prop('checked')==true) {
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
function GetServicesForSupplierSelected_Super(array)
{

    if (array[0].SERVICE_GROUP_GUID.length!=0) {
    for (var k = array.length - 1; k >= 0; k--) {
            if (k != array.length - 1) {
                var PrevSGrupGUID = array[k + 1].SERVICE_GROUP_GUID
                var curent = array[k].SERVICE_GROUP_GUID
                if (PrevSGrupGUID == curent) {//<option>' + array[k].SERVICE_NAME + '</option>
                    $('.col-md-12[data-grupGuid=' + curent + ']').append('<table><thead><tr><th><select class="select2 narrow wrap" onchange=getCosts(this) id="Combo_' + k + '" style="width: 100%;"><option>' + array[k].SERVICE_NAME + '</option></select></th><th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Кол-во" value=' + array[k].SERVICE_COUNT + ' id="kol" style="width: auto;"></th> <th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Цена"  value=' + array[k].SERVICE_END_COST + ' id="Ser_Summ" style="width: auto;"></th><th style="width: 120px;"><i class="fa fa-close removing3" itemid="1" onclick="removeServiceSupp(this)" style="font-size:25px" aria-hidden="true"></i></th></tr></thead><tbody><tr><td colspan="2"><textarea placeholder="Комментарий"   style="width: 100%;">' + array[k].SERVICE_COMMENT + '</textarea></td><td><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Окончателная сумма" disabled="disabled" value=' + array[k].SERVICE_END_COST + ' id="EndSumm" style="width: auto;"></td><td><img src="" style="width: 130px;"></td></tr></tbody></table>')
                }
                else {
                    $('#Phn').after('<div class="col-md-12" data-grupGuid=' + array[k].SERVICE_GROUP_GUID + ' style="border-style: groove;border-color: lightblue;"><i class="fa fa-close removing3" itemid="1" onclick="removeGroupSupp(this)" style="font-size:25px" aria-hidden="true"></i><select  class="select2 narrow wrap" id="grupS_' + k + '" style="width: auto; margin-top: 34px;margin-bottom: -10px;"><option>' + array[k].SERVICE_GROUP_NAME + '</option></select></div>')
                    //<option>' + array[k].SERVICE_NAME + '</option>
                    $('#grupS_' + k + '').after('<table><thead><tr><th><select class="select2 narrow wrap" onchange=getCosts(this) id="Combo_' + k + '" style="width: 100%;"><option>' + array[k].SERVICE_NAME + '</option></select></th><th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Кол-во" value=' + array[k].SERVICE_COUNT + ' id="kol" style="width: auto;"></th> <th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Цена"  value=' + array[k].SERVICE_END_COST + ' id="Ser_Summ" style="width: auto;"></th><th style="width: 120px;"><i class="fa fa-close removing3" itemid="1" onclick="removeServiceSupp(this)" style="font-size:25px" aria-hidden="true"></i></th></tr></thead><tbody><tr><td colspan="2"><textarea placeholder="Комментарий"  style="width: 100%;">' + array[k].SERVICE_COMMENT + '</textarea></td><td><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Окончателная сумма" disabled="disabled" value=' + array[k].SERVICE_END_COST + ' id="EndSumm" style="width: auto;"></td><td><img src="" style="width: 130px;"></td></tr></tbody></table>')
                }

            }
            else {//<option>' + array[k].SERVICE_NAME + '</option>
                $('#Phn').after('<div class="col-md-12" data-grupGuid=' + array[k].SERVICE_GROUP_GUID + ' style="border-style: groove;border-color: lightblue;"><i class="fa fa-close removing3" itemid="1" onclick="removeGroupSupp(this)" style="font-size:25px" aria-hidden="true"></i><select  class="select2 narrow wrap" id="grupS_' + k + '" style="width: auto; margin-top: 34px;margin-bottom: -10px;"><option>' + array[k].SERVICE_GROUP_NAME + '</option></select></div>')
                $('#grupS_' + k + '').after('<table><thead><tr><th><select class="select2 narrow wrap" onchange=getCosts(this) id="Combo_' + k + '" style="width: 100%;"><option>' + array[k].SERVICE_NAME + '</option></select></th><th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Кол-во" value=' + array[k].SERVICE_COUNT + ' id="kol" style="width: auto;"></th> <th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Цена"  value=' + array[k].SERVICE_END_COST + ' id="Ser_Summ" style="width: auto;"></th><th style="width: 120px;"><i class="fa fa-close removing3" itemid="1" onclick="removeServiceSupp(this)" style="font-size:25px" aria-hidden="true"></i></th></tr></thead><tbody><tr><td colspan="2"><textarea placeholder="Комментарий"  style="width: 100%;">' + array[k].SERVICE_COMMENT + '</textarea></td><td><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Окончателная сумма" disabled="disabled" value=' + array[k].SERVICE_END_COST + ' id="EndSumm" style="width: auto;"></td><td><img src="" style="width: 130px;"></td></tr></tbody></table>')

            }




            // $('#Combo_' + k).val(array[k].SERVICE_GUID)
            //   $('#grupS_' + k + '').append('<option>' + array[k].SERVICE_GROUP_NAME+'</option>')
            //for (var m = 0; m < j.length; m++) {
            //    $('#grupS_' + k + '').append('<option value=' + j[m].SERVICE_GUID + '>' + j[m].SERVICE_GROUP + '</option>')
            //}
            //$('.col-md-12[data-grupGuid=' + curent + ']')
//$('#grupS_' + k + '').parent().append('<input type="button" value="Добавить услугу" id="AddServ_s" onclick="AddServiceSupp(this)" style="float:right" class="btn btn-default logBtn">')
            //  $('#grupS_' + k + ' option[value=' + array[k].SERVICE_GROUP_GUID + ']').attr('selected', 'selected')//.val(array[k].SERVICE_GROUP_GUID)
            var $select2 = $('.select2').select2({
                containerCssClass: "wrap"
            })

        }
    }
    else {
      //  //console.log(array)
        for (var k = array.length - 1; k >= 0; k--) {
            $('#Phn').after('<div class="col-md-12" data-child="0" data-S=' + array[k].SERVICE_GUID + ' style="border-style: groove;border-color: lightblue;"><table><thead><tr><th><select   id="Combo_' + k + '"  data-cost=' + array[k].SERVICE_COST + ' data-img=' + array[k].SERVICE_ICON + ' class="select2 narrow wrap" style="width: 100%;"><option>' + array[k].SERVICE_NAME + '</option></select></th><th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Кол-во" value=' + array[k].SERVICE_COUNT + ' id="kol" style="width: auto;"></th> <th><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Цена" value=' + array[k].SERVICE_COST + ' id="Ser_Summ" style="width: auto;"></th><th style="width: 120px;"><i class="fa fa-close removing3" itemid="1" onclick="removeServiceSupp(this)" style="font-size:25px" aria-hidden="true"></i></th></tr></thead><tbody><tr><td colspan="2"><textarea placeholder="Комментарий" style="width: 100%;">' + array[k].SERVICE_COMMENT + '</textarea></td><td><input type="number" onkeyup="ControlNummebrSupp(this)" placeholder="Окончателная сумма" disabled="disabled" value=' + array[k].SERVICE_END_COST + ' id="EndSumm" style="width: auto;"></td><td><img src=\"' + array[k].SERVICE_ICON + '\" style="width: 130px;"></td></tr></tbody></table><input type="button" value="Добавить услугу" id="AddServ_s" onclick="AddServiceSupp(this)" style="float:right" class="btn btn-default logBtn"></div>')
           
            //$('#Combo_' + k).val(array[k].SERVICE_GUID)

        }
        var $select2 = $('.select2').select2({
            containerCssClass: "wrap"
        })
    }
}
function GetServicesForSupplier2(serviceCombo,objId, lg, service_guid,selected)
{
    var obj = { "obj": objId, "lg": lg, "service_guid": service_guid }
    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/GetServicesForSupplier",
        data: JSON.stringify(obj),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d);

            ////console.log("ccc");
           // //console.log(j);
            for (var i = 0; i < j.length; i++) {
                $(serviceCombo).append('<option value=' + j[i].SERVICE_GUID + ' data-cost=' + j[i].SERVICE_COST + ' data-img=' + j[i].SERVICE_ICON+'>' + j[i].SERVICE_NAME + '</option>')
             
            }
            $(serviceCombo).val(selected)
            
        }
    })
}
function getcurrdspObj(lgId, slcted) {
    var obj = { "lg": lgId }
    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/GetObjcurrentdsp",
        data: JSON.stringify(obj),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            // //console.log(jsondata_)

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
function getHasInds(ind_) {
    var obj = { "indId": ind_ }
    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/gethasInd",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata = JSON.parse(data.d);
            if (jsondata.length != 0) {
                $("#Ind").val(jsondata[0].FIRST_NAME).attr("itemid", jsondata[0].INDIVIDUAL_ID)
                // $("#Phn").val(jsondata[0].PHONE)
                $("#Room").val(jsondata[0].ROOM_NUMBER)
                // $("#Room_Type").val(jsondata[0].ROOM_TYPE_ID)
               // getcurrdspObj(LogId, jsondata[0].OBJECT_ID);
            }


        }
    })
}
function GetRSComment(rid) {
    var obj = { "rid": rid }
    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/GetRStTF",
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
function gtCommenst(selectedSetId, Rid_) {
    var objC = { "rid": Rid_ }
    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/GetCommentsById",
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

                    //if (selectedSetId != "") {
                    //    GetRelatedSets(selectedSetId, rc[0].Object_Id)

                    //}
                    var LogId = sessionStorage.getItem("Log")
                   getcurrdspObj(LogId, rc[0].Object_Id)

                    $("#hstComh").hide();

                    var date_ = jsondata_[i].COMMENT_DATETIME
                    var comment = jsondata_[i].REQUEST_COMMENT_.substring(0, jsondata_[i].REQUEST_COMMENT_.indexOf('|'));
                    if (comment != " " && comment != "") {
                        $("#hstCom").append('<h4 style="margin-bottom:  -6px;">- ' + comment + '</h4> (' + date_ + ')').hide();
                    }

                    $("#hstCom").hide().css("height", "190px");

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
                    $("#hstComh").hide();

                    if (jsondata_[i].REQUEST_COMMENT_ != " " && jsondata_[i].REQUEST_COMMENT_ != "") {
                        var date_ = jsondata_[i].COMMENT_DATETIME
                        $("#hstCom").append('<h4 style="margin-bottom:  -6px;">- ' + jsondata_[i].REQUEST_COMMENT_ + '<h4/> (' + date_ + ')').hide();
                    }
                    $("#hstCom").hide().css("height", "130px");
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
        url: "CreateSRequest.aspx/CommentFiles",
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

function SendId(RId, st) {
    sessionStorage.setItem("st", st)
    sessionStorage.setItem("RId", RId);
    window.location.href = "CreateSRequest.aspx"
}
function MaskPhone(e) {
    $(e).inputmask("+7(999) 999-99-99");
}
function SaveRequest_Supp(obj)
{
    $.ajax({
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + '//WCFServices/MATORIN.QUICK_API.svc/New_suppreq',
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata = JSON.stringify(data.ResultData)
            var jsondata_ = JSON.parse(jsondata)
            var LogId = sessionStorage.getItem("Log")
            if (jsondata_.Result =="Success") {
                SaveLog_S("Принять в работу", "Простое", "Диспетчер", "Диспетчеризация", "Заявка < " + jsondata_.ID + " >принята в работу", LogId);
                window.location.href = "SRequests.aspx"
            }
            
           
        }
    })
}
function SaveRequest_Supp2(obj,SP) {
    $.ajax({
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + '//WCFServices/MATORIN.QUICK_API.svc/New_suppreq_e',
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata = JSON.stringify(data.ResultData)
            var jsondata_ = JSON.parse(jsondata)
            var LogId = sessionStorage.getItem("Log")
            if (jsondata_.Result == "Success") {
                if (SP=="P") {
               //   SaveLog_S("Принять в работу", "Простое", "Диспетчер", "Диспетчеризация", "Заявка < " + jsondata_.ID + " >принята в работу", LogId);
                }
               
                if (SP=="S") {
                    SaveLog_S("Редактирована заявка", "Простое", "Диспетчер", "Диспетчеризация", "Заявка < " + jsondata_.ID + " >редактирована", LogId);
                    window.location.href = "SRequests.aspx"
                }
            }


        }
    })
}
function getRequestTable(loginId) {
  //  SN = encodeURI(SN)
    var o = { lg: loginId}
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
                        $(nTd).html('<a href="#" onclick="SendId(\''+ oData.ATRIBUTE +'\',' + oData.STATUS + ')"' + emergency + '  >' + oData.REQUEST_ID + '</a>');
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
                        var tic = (oData.TOTAL_COST != null && oData.TOTAL_COST.length!= 0) ? '<i class="fa fa-check" style="font-size:20px;color:green"></i>' : "";
                        $(nTd).html(tic);
                    },
                    "fnCreatedRow": function (nRow, oData, iDataIndex) {
                        $(nRow).attr('onclick', 'SendId(\''+ oData.ATRIBUTE +'\',' + oData.STATUS_ID + ')');
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
function getExistIndividualsAndScores(obj,rmNum)
{
    var obj = { obj: obj, rmNum: rmNum }
    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/getExistIndividualsAndScores",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //console.log(result);
            var j = JSON.parse(result.d)
            //console.log(j[0].NummberJson)
            var NummberJson = JSON.parse(j[0].NummberJson)
            // console.log(NummberJson[0].NUMBER)
            $('#Acnum').val(NummberJson[0].NUMBER)
            var IndividualJson = JSON.parse(j[0].IndividualJson)
            //console.log(IndividualJson)
            $("#IndList").empty();
            if (IndividualJson.length != 0 && IndividualJson.length > 1) {
                for (var i = 0; i < IndividualJson.length; i++) {
     $("#IndList").append('<label data-number="' + IndividualJson[i].PHONE + '" itemid="' + IndividualJson[i].INDIVIDUAL_ID + '" style="color: black;position:  relative;left: 1%;" onclick="selectInd(this)">' + IndividualJson[i].FIRST_NAME + ' </label>').show();
                }
            }
            if (IndividualJson.length != 0 && IndividualJson.length == 1) {
                $("#Ind").empty().val(IndividualJson[0].FIRST_NAME).attr("itemid", IndividualJson[0].INDIVIDUAL_ID)
                $("#Phn").empty().val(IndividualJson[0].PHONE)
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
function getCurrentDispObject(selected,lg)
{
    var obj = { lg: lg }
    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/getObjectDisp",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result)
        {
            var j = JSON.parse(result.d);
            for (var i = 0; i < j.length; i++) {
                $('#objctZ').append('<option value='+j[i].OBJECT_ID+'>'+j[i].OBJECT_ADRESS+'</option>')
            }
            if (selected != "") {
                $('#objctZ').val(selected);
            }
        }
    })
}
function getServiceSet(selected, lg)
{

    var obj = { lg: lg }
    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/getServiceSet",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var j = JSON.parse(result.d);
            $('#Sets').empty();
            $('#Sets').append('<option value="0">Выберите Направление</option>')
            $('#Sets').attr('onchange','GetRelatedDirects(0,this,'+lg+')')
            for (var i = 0; i < j.length; i++) {
                $('#Sets').append('<option value=' + j[i].SERVICE_SET_ID + '>' + j[i].SERVICE_SET_NAME+ '</option>')
            }
            if (selected != "") {
                $('#Sets').val(selected);
            }
        }
    })
}
function GetRelatedDirects(selected, e,lg) {
    $('#total').remove();
    if ($(e).val() != 0) {
        $('#Set_S').remove();
        $(e).next().remove();
        var Obj = { "sid": $(e).val(), lg: lg }
        $.ajax({
            type: "POST",
            url: "CreateSRequest.aspx/GetRelatedDirects",
            data: JSON.stringify(Obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var j = JSON.parse(data.d)
                if (j.length > 4) {
                    $('#Sets').after('<div class="col-md-12"><div id="left" class="col-md-6"></div><div id="right" class="col-md-6"></div></div><br/>')
                    for (var i = 0; i < j.length; i++) {
                        if (i % 2 == 0) {
                            $('#left').append('<div data-d=' + j[i].DIRECTION_ID + ' onclick="getServices(this,' + j[i].DIRECTION_ID + ','+lg+')" data-active="on" class="accMenu"> <img src=' + j[i].ICON_ADRESS + '   class="icon">' + j[i].DIRECTION_NAME + ' <i class="fa fa-chevron-down GrupOpenIcon" aria-hidden="true"   ></i></div>')
                        }
                        else {
                            $('#right').append('<div data-d=' + j[i].DIRECTION_ID + ' onclick="getServices(this,' + j[i].DIRECTION_ID + ','+lg+')" data-active="on" class="accMenu"> <img src=' + j[i].ICON_ADRESS + '   class="icon">' + j[i].DIRECTION_NAME + ' <i class="fa fa-chevron-down GrupOpenIcon" aria-hidden="true"    ></i></div>')
                        }
                    }
                }
                else {
                    $('#Sets').after('<div class="col-md-12"><div id="left" class="col-md-6"></div><div id="right" class="col-md-6"></div></div><br/>')
                    for (var i = 0; i < j.length; i++) {

                        $('#left').append('<div data-d=' + j[i].DIRECTION_ID + ' onclick="getServices(this,' + j[i].DIRECTION_ID + ','+lg+')" data-active="on" class="accMenu"> <img src=' + j[i].ICON_ADRESS + '   class="icon">' + j[i].DIRECTION_NAME + ' <i class="fa fa-chevron-down GrupOpenIcon" aria-hidden="true"   ></i></div>')

                    }
                }
                var rid = sessionStorage.getItem("RId")
                //if (rid.length != 0 && selected == 0 && $('input[onclick="showAllServices()"]').length==0) {
                //    $('.accMenu').parent().append('<input type="button" onclick="showAllServices()" class="btn genBtn" value="Изменить Группа Услуг"/>')
                //}
                if (selected != 0) {
                    var st = sessionStorage.getItem("st");

                    if (st == 2) {
                        //alert('2')
                        $('.accMenu').hide();
                        $('.accMenu[data-d="' + selected + '"]').show();
                        $('.accMenu[data-d="' + selected + '"]').parent().append('<input type="button" onclick="showAllServices()" class="btn genBtn" value="Изменить Группа Услуг"/>')
                        $('.accMenu[data-d="' + selected + '"]').children('input[type="checkbox"]').prop('checked', true);
                        $('#PrServiceH tbody tr').attr('data-d', selected);
                    }
                    else {
                        $('.accMenu').hide();
                        $('.accMenu[data-d="' + selected + '"]').show();
                        $('.accMenu').removeAttr('onclick').children('input[type="checkbox"]').hide();
                        $('.accMenu').children('.fa').hide();
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
}
function getServices(e, gs, lg)
{
    if ($(e).attr('data-active') == 'on') {
        $(e).parent().children('div').children('.fa').attr('class', 'fa fa-chevron-down GrupOpenIcon')
        $(e).children('.fa').attr('class', 'fa fa-chevron-up GrupOpenIcon')
        $(e).attr('data-active', 'off')
        $('.subMenu').remove();
        $(e).after('<div id="subMenu" data-d=' +gs + ' class="subMenu"  ></div>')
     var obj = { dId: gs, lg: lg }
        $.ajax({
            url: "CreateSRequest.aspx/getServices",
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
                        $(e).next('#subMenu').append('<div itemid="' + jsondata[i].SERVICE_ID + '"    class="col-md-12" style="margin-top:0px"><input type="checkbox" data-comment="' + jsondata[i].COMMENT +'" onclick="MakeCheckCheckBox(this,' + gs + ')" class="col-md-1" data-edizm="' + jsondata[i].SERVICE_TYPE_NAME + '" name="services1" value="' + jsondata[i].SERVICE_NAME + '" data-url="1" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left: -20px;margin-top: 8px;"><label   style="float:right;width:10%" itemid="' + jsondata[i].SERVICE_ID + '">' + jsondata[i].COST + '</label><label   style="margin-left: 20px !important; width:70%" itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_NAME + '</label></div><br/>')


                    }
                    else {//data="' + jsondata[i].SERVICE_TYPE_NAME + '-' + jsondata[i].SERVICE_NAME + '"
                        $(e).next('#subMenu').append('<div itemid="' + jsondata[i].SERVICE_ID + '"   class="col-md-12" style="margin-top:0px"><input type="checkbox"  data-comment="' + jsondata[i].COMMENT +'" onclick="MakeCheckCheckBox(this,' + gs + ')"  class="col-md-1" data-edizm="' + jsondata[i].SERVICE_TYPE_NAME + '" name="services1" value="' + jsondata[i].SERVICE_NAME + '"  data-url="0" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left: -20px;margin-top: 8px;"><label  style="float:right;width:10%" itemid="' + jsondata[i].SERVICE_ID + '">' + jsondata[i].COST + '</label><label   style="margin-left: 20px !important; width:70%" itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_NAME + '</label></div><br/>')
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
            }
        })
    }
    else {
        $(e).children('.fa').attr('class', 'fa fa-chevron-down GrupOpenIcon')
        $(e).attr('data-active', 'on')
        $(e).next('#subMenu').remove();
       
    }
}

function GetAccFortexnik(LgId, selected) {
    var obj = {
        lg: LgId,

    };
    //alert(JSON.stringify(obj));

    $.ajax({
        type: "POST",
        url: "CreateSRequest.aspx/GetTexniks",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            
            var jsondata_ = JSON.parse(result.d)
            for (var i = 0; i < jsondata_.length; i++) {

                if (jsondata_[i].RS == "15") {
                    $("#IspolList").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' </option>')
                    $("#ispol2").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + ' </option>')
                    $('#Otven').attr('itemid', jsondata_[i].LOG_IN_ID).val(jsondata_[i].ACCOUNT_NAME)
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
                 $("#ispol2").val(selected);
                $("#Ispolname").text($("#IspolList option:selected").text()).attr("itemid", $("#IspolList option:selected").val())
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
function SelectfileForRequest(e)
{
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

                    //alert("OK. See Console -  press F12");
                    // console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
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
                    

    
    

    --readURL(this, filename); 


                },
                failure: function (r) {
                    alert("FAIL");
                }
            });


        }


    }
}


function MakeCheckCheckBox(e, d) {
    var totalCost = 0
    if ($(e).prop('checked') == true) {

        if ($('#PrServiceH').attr('data-d') != undefined) {
            $('#PrServiceH tbody').empty();
        }
        if ($('#com').length==0) {

            $('#PrServiceH thead tr th:eq(3)').after('<th id="com">Комментарий</th>')
        }
        //  $('#PrServiceH tbody').empty();
        // $(e).children('input[type="checkbox"]').attr('checked', true);
        var dtUrl = $(e).attr('data-url');
        var dataName = $(e).attr("value");
        var itemId = $(e).attr("itemid");
        var cost = $(e).next('label').text();
        var comment = $(e).attr('data-comment')
        var doqi = (cost == 'Договорная') ? '<a onclick="Open_Pop(this)">Договорная</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div>' : '<a>' + cost + '</a>'
        var edizm = $(e).attr('data-edizm');
        $('#PrServiceH').show();
        var kolDis = (cost == 'Договорная') ? 'disabled="disabled"' : '';
        $('#listServiceH').show()
        if (dtUrl == 1) {
            //onkeyup="multiPlaying(this,500)" <td><input type="text" onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" value="1"></td>
            $("#PrServiceH tbody").append('<tr data-d=' + d + '><td itemid="' + itemId + '"> ' + dataName + '</td><td><input type="text" ' + kolDis + '  onkeyup=multiPlaying(this,"' + cost + '")  onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" value="1"></td><td>' + edizm + '</td><td  style="width:120px;text-align:center;">' + doqi + '</td><td>' + comment + '</td><td><a itemid="' + itemId + '" data="' + dataName + '" onclick="RemoveRow(this)" data-url="' + dtUrl + '" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</a></td></tr>')
        }
        if (dtUrl == 0) {
            --<tr><td style="width: 500px;" itemid="11">Доступ - Одноразовый пропуск</td><td><input disabled="disabled" type="text" value=""></td><td><button onclick="RemoveRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</button></td></tr>
            //<td  ><input disabled="disabled" type="text" value=""></td>
            $("#PrServiceH tbody").append('*<tr data-d=' + d + '><td   itemid="' + itemId + '"> ' + dataName + '</td><td><input disabled="disabled" type="text" value=""></td><td>' + edizm + '</td><td style="width:120px;text-align:center;"><a onclick=Open_Pop(this) >' + cost + '</a><div id="changeCost" style="display:none;background-color: lightgray;height: 65px;"><input type="text" id="dqCost" style="margin-top: 4px;"><input type="button" onclick="CloseDiv(this)" value="Отмена" style="background-color: aliceblue;"><input type="button" onclick="MakeCost(this)" value="OK" style="float: left;width: 47px;background-color: aliceblue;"></div></td><td>' + comment + '</td><td><a data-url="' + dtUrl + '" onclick="RemoveRow(this)" itemid="' + itemId + '" data="' + dataName + '"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</a></td></tr>')

        }
        $('#left,#right').children('div').each(function () {

            $(this).children('input[type="checkbox"]').prop('checked', false)

        })
        $('#PrServiceH tbody tr').each(function ()
        {
            var dataD = $(this).attr('data-d');
            if (dataD != d) {
                $(this).remove();
            }
        })

        //$('#PrServiceH').removeAttr('data-d');
        //$('#PrServiceH').removeAttr('data-s')
        //$('#PrServiceH thead tr th:eq(0)').text('Наименование услуги')
        //$('#PrServiceH thead tr th:eq(1),#PrServiceH thead tr th:eq(2),#PrServiceH thead tr th:eq(3)').show()
        //$('#PrServiceH tbody tr').each(function () {
        //    $(this).children('td:eq(1),td:eq(2),td:eq(3)').show();
        //})
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
    }
   
}
function RemoveRow(e) {
    var totalcost = 0
    var serviceId = $(e).attr('itemid');
    $('#subMenu').children('div[itemid=' + serviceId + ']').children('input[type="checkbox"]').prop('checked', false)
    
    $(e).parent().parent('tr').remove();

    $('#PrServiceH tbody tr').each(function () {
        var cost1 = $(this).children('td:eq(3)').children('a').text();
        if (cost1 != 'Договорная') {

            totalcost = totalcost + parseFloat(cost1)
        }
    })
    $('#total').text('Итого: ' + totalcost + " руб")

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
    if (dqCost.length != 0 && dqCost != 0) {
        var totalcost = 0
        $(e).parent().parent('td').find('a').text(dqCost);
        //  $('#total').text("Итого: " + $('#dqCost').val())
        //  $('#dqCost').val($('#dqCost').val());
        $('#PrServiceH tbody tr').each(function () {
            var servicecost = $(this).children('td:eq(3)').children('a').text();
            var DirectAndSetCost = $(this).children('td:eq(1)').children('a').text()
            var dataS = $('#PrServiceH').attr('data-s')
            var dataD = $('#PrServiceH').attr('data-d')
            var cost = (dataS != undefined || dataD != undefined) ? DirectAndSetCost : servicecost;
            if (cost != 'Договорная') {

                totalcost = totalcost + parseFloat(cost)
            }
        })
        //   if ($('#total')!=0) {
        //$('#total').text('Итого: ' + totalcost + " руб")
        //   }
        //   else {
        //       $('#PrServiceH').after('<label id="total" style="float: right; display: block;">Итого: ' + totalcost + ' руб</label>');
        //   }
        if (totalcost == 0) {
            $('#total').hide();
        }
        else {

            $('#total').remove();
            $('#PrServiceH').after('<label id="total" style="float: right; display: block;">Итого: ' + totalcost + ' руб</label>');
        }
    }
    else {
        //
        $(e).parent().parent('td').find('a').text("Договорная");
        // $('#dqCost').val("Договорная")
        // $('#total').text("Итого: Договорная")
    }
    $(e).parent('#changeCost').hide(1000);
}
function multiPlaying(e, Cost) {
    var totalC = 0
    if ($(e).val() != 0 && $(e).val().length != 0) {
        
        Cost = parseFloat($(e).val()) * Cost
        $(e).parent().next('td').next('td').children('a').text(Cost);
        //$('#PrServiceH tbody tr').each(function ()
        //{
        //    var c = $(this).children('td:eq(3)')
        //})
        for (var i = 0; i < $('#PrServiceH tbody tr').length; i++) {
            var c = $('#PrServiceH tbody tr:eq(' + i + ') td:eq(3) a').text();
            totalC = totalC + parseFloat(c);
        }
        $('#total').text('Итого: ' + totalC + " руб")

    }
    else {
        $(e).parent('td').next('td').next('td').children('a').text(Cost);
       
    }
    if (totalC == 0) {
        $('#total').hide();
    }
    else {
        $('#total').show();
    }
    

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
    if (h != "" && h != undefined) {
        time = (parseInt(hours) + 1) + ":" + minut
        $("#tm").val(time);
    }
    else {
        time =hours  + ":" + minut
        $("#tm").val(time);
    }
    if (h == "") {
        time = hours + ":" + minut
    }


    return time;
}
*/