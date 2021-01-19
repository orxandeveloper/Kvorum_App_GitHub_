$(function () {
    var path = window.location.pathname;
    var start_pos = path.indexOf('/') + 1;
    var end_pos = path.indexOf('/', start_pos);

    path = path.substring(start_pos, end_pos)
    //path = path.replace('/', '');
    //path = path.replace('/', '');
    //  window.location.href = path+"/MainPage.aspx"
    //alert(path);
    var score = sessionStorage.getItem('score');
    //if (score == null)
    //{
    //    window.location.href="~/ClientLogin.aspx"
    //}
    var loc = window.location.pathname
    loc = loc.substring(loc.lastIndexOf('/') + 1, loc.length)
    var lgtt = sessionStorage.getItem('lgt');
    if (lgtt == "ok") {
        $('#lgtT').hide();
    }
    else {
        $('#lgtT').show();
    }
    $('#treg').click(function () {
        var login = sessionStorage.getItem('lgt');
        if (login == "ok") {
            window.location.href = "TRegisterRequest.aspx";
        }
        else {
            sessionStorage.setItem('cmf', "TRegisterRequest.aspx");
            window.location.href = "LoginT.aspx"
        }
    })
    $('#cntr').click(function () {
        var login = sessionStorage.getItem('lgt');
        if (login == "ok") {
            window.location.href = "CountersT.aspx";
        }
        else {
            sessionStorage.setItem('cmf', "CountersT.aspx");
            window.location.href = "LoginT.aspx"
        }
    })
    if (loc == "CountersT.aspx") {
        getMetersT(score)

    }
    if (loc == "LoginT.aspx") {
        getCookiePrivate();
        $("#PassT").keyup(function () {
            var password = $("#PassT").val();

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

        })
        $('#score').keyup(function () {
            $('.domAttention').hide();
        })
        $('#CLogin').click(function () {
            if ($('#score').val().length != 0) {

                if ($('#PassT').val().length != 0) {
                    var domOks = $('.domOk').css('display');
                    var domAttentionS = $('.domAttention').css('display')
                    if (domOks == 'none' && domAttentionS == 'none') {
                        //alert('yuppi')
                        MakeLogin($('#score').val(), $('#PassT').val())
                    }
                }
                else {
                    $('.domOk').text('Необходимо заполнить поле для "Пароль"').show();
                }
            }
            else {
                $('.domAttention').text('Необходимо заполнить поле для "Номер лицевого счета"').show();
            }
        })

    }
    if (loc == "TRequest.aspx") {
        //    $("#adres").val($('.adres').children().text()).attr('itemid', $('.adres').attr('itemid'));
        var TRid = sessionStorage.getItem("TRId")
        var TRst = sessionStorage.getItem("TRst")
        $('select').editableSelect();
        $("#Back").click(function () {
            window.location.href = "TRegisterRequest.aspx";
        })
        if (TRid == "" || TRid == null || TRid == undefined) {
            $('#hedrZ,#headerS').hide();
            $('#MClose').hide();


            $(document).on('blur', '#FirstN', function () {
                var num = $('ul.es-list:eq(0) li[class="es-visible selected"]').attr('data-num');
                $('#Phone').empty().val(num);
            })
            getTenantDatas(score, "")
            GetProduct()
            $("#files").change(function () {
                // $("#loader").show();
                var filePath = $('#files').val();

                var index = filePath.lastIndexOf("\\") + 1;
                var filename = filePath.substr(index);

                readURL(this, filename);

            })
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
                        console.log(formData);



                        $.ajax({
                            type: "POST",
                            url: window.location.protocol + '//' + window.location.host + '//WCFServices/Constructor_API.svc/UploadFile',//https://172.20.20.24
                            data: formData,
                            type: 'POST',
                            contentType: false,
                            processData: false,
                            cache: false,
                            timeout: 3600000,
                            crossDomain: true,
                            //async: false,

                            success: function (result) {

                                //alert("OK. See Console -  press F12");
                                // console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                                //var jsondata_1 = jQuery.parseJSON(result)
                                //var jsondata_1 = JSON.stringify(result)
                                // var jsondata_1 = JSON.parse(result)
                                //  $("#files").hide();
                                var imgslenght = $(".foto-disp").length;
                                if (imgslenght != 5) {
                                    imgslenght++
                                    //  var lastImgItem = $("#imgss").find("img:last").attr("itemid");
                                    // lastImgItem++;
                                    /* $(input).after('<div class="col-xs-2" id="zImg"><img class="foto-disp" id="fotoDisp' + imgslenght + '" itemid=' + imgslenght + '  data-url="0"  src=""></div>')*///../Files/upl.png
                                    $("#files").val("");
                                }
                                if (imgslenght == 5) {
                                    $("#files").hide();
                                }
                                var F_ile = result.URL
                                F_ile = F_ile.substring(F_ile.indexOf('~') + 1, F_ile.length)
                                var extention = F_ile.substr(F_ile.indexOf(".") + 1)
                                F_ile = F_ile.substring(F_ile.indexOf(':') + 1, F_ile.length)
                                if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
                                    //$('#fotoDisp' + imgslenght + '').attr('src', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                                    //$('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                                    //$('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                                    $("#imgss").append('<div class="col-xs-2" id="zImg"><i class="fa fa-close" onclick="removeFJ(' + imgslenght + ',this)" aria-hidden="true" style="color: red;"></i><img class="foto-disp" id= "fotoDisp' + imgslenght + '" itemid= "' + imgslenght + '" data-url="//172.20.20.24' + F_ile + '" src= "//172.20.20.24' + F_ile + '"/></div>')
                                }
                                if (extention == "docx" || extention == "doc") {
                                    //$('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/word.png')
                                    //$('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                                    //$('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                                    $("#imgss").append('<div class="col-xs-2" id="zImg"><i class="fa fa-close" onclick="removeFJ(' + imgslenght + ',this)" aria-hidden="true" style="color: red;"></i><img class="foto-disp" id= "fotoDisp' + imgslenght + '" itemid= "' + imgslenght + '" data-url="//172.20.20.24' + F_ile + '" src= "//172.20.20.24/img/word.png"/></div>')
                                }
                                if (extention == "xlsx" || extention == "xls") {
                                    //$('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/excel.png')
                                    //$('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                                    //$('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                                    $("#imgss").append('<div class="col-xs-2" id="zImg"><i class="fa fa-close" onclick="removeFJ(' + imgslenght + ',this)" aria-hidden="true" style="color: red;"></i><img class="foto-disp" id= "fotoDisp' + imgslenght + '" itemid= "' + imgslenght + '" data-url="//172.20.20.24' + F_ile + '" src= "//172.20.20.24/img/excel.png"/></div>')
                                }
                                if (extention == "pdf" || extention == "PDF") {
                                    //$('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/pedefe.png')
                                    //$('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                                    //$('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                                    $("#imgss").append('<div class="col-xs-2" id="zImg"><i class="fa fa-close" onclick="removeFJ(' + imgslenght + ',this)" aria-hidden="true" style="color: red;"></i><img class="foto-disp" id= "fotoDisp' + imgslenght + '" itemid= "' + imgslenght + '" data-url="//172.20.20.24' + F_ile + '" src= "//172.20.20.24/img/pedefe.png"/></div>')
                                }
                                if (extention == "txt" || extention == "TXT") {
                                    //$('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/texete.png')
                                    //$('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                                    //$('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                                    $("#imgss").append('<div class="col-xs-2" id="zImg"><i class="fa fa-close" onclick="removeFJ(' + imgslenght + ',this)" aria-hidden="true" style="color: red;"></i><img class="foto-disp" id= "fotoDisp' + imgslenght + '" itemid= "' + imgslenght + '" data-url="//172.20.20.24' + F_ile + '" src= "//172.20.20.24/img/texete.png"/></div>')
                                }
                                //$("#hdPr2").show()
                                //$("#zImg2").show()
                                //$("#files2").show()

                                $("#loader").hide();

                            },

                            error: function (datas) {


                                console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

                                var filePath = $('#files').val();
                                var index = filePath.lastIndexOf("\\") + 1;
                                var filename = filePath.substr(index);
                                //  readURL(input, filename)
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
            $("#shServ").click(function () {
                ShowProducts();
            })
            $("#AddT").click(function () { getChecked(); })
            $("#CloseServ").click(function () { $("#close_7").click(); })
            getDate(1)
            getTime(1);
            $('#Phone').keyup(function () {
                $('#Phone_E+br').remove();
                $('#Phone_E').remove();
            })
            $('#tmS').change(function () {
                var val = $(this).val()
                if (val != "") {
                    var valueS = $(this).val().split(":")
                    var currentTime = getTime("");
                    if (currentTime < $(this).val()) {
                        var hour = parseInt(valueS[0]) + 1
                        var min = valueS[1]
                        var valueE = hour + ":" + min;
                        $("#tmE").val(valueE)
                    }
                    else {
                        var hour = parseInt(valueS[0]) + 1
                        var min = valueS[1]
                        var valueE = hour + ":" + min;
                        $(this).val(valueE)
                    }
                }
                else {
                    $(this).val(getTime(1))
                }



            })
            $('#tmE').change(function () {
                var val = $(this).val();
                if (val != "") {
                    if ($(this).val() <= $('#tmS').val()) {
                        var valueS = $('#tmS').val().split(":")
                        var hour = parseInt(valueS[0]) + 1
                        var min = valueS[1]
                        var valueE = hour + ":" + min;
                        $("#tmE").val(valueE)
                    }
                }
                else {
                    var valueS = $('#tmS').val().split(":")
                    var hour = parseInt(valueS[0]) + 1
                    var min = valueS[1]
                    var valueE = hour + ":" + min;
                    $("#tmE").val(valueE)
                }

            })
            $('#calen1').change(function () {
                var currentDate = getDate("");
                if (currentDate > $(this).val()) {
                    $(this).val(currentDate)
                }
                //else {
                //    var sdate = $(this).val();
                //    $(this).val()
                //}
            })
            $('#send').click(function () {
                var IndId = $('#FirstN').val();
                var phone = $('#Phone').val();
                if (IndId.length != 0) {
                    IndId = $('ul.es-list:eq(0) li[class="es-visible selected"]').attr('value');
                    IndId = (IndId == undefined) ? "0" : IndId

    /**/ if (IndId != undefined) {
                        if (phone.length != 0) {
                            phone = phone + "|" + $('#FirstN').val();
                            var P_Services = []
                            $("#PrService tr td:nth-child(1)").each(function () {
                                var quant = $(this).next('td').find('input').val();
                                quant = (quant == "" || quant == null || quant == undefined) ? 0 : quant
                                var Cost = $(this).next('td').next('td').text();
                                Cost = (Cost == "" || Cost == null || Cost == undefined) ? 0 : Cost
                                P_Services.push({ 'SERVICE_ID': $(this).attr("itemid"), 'QUANTITY': quant, 'COST': Cost })


                            })
                            P_Services = JSON.stringify(P_Services)
                            P_Services = JSON.parse(P_Services)
                            if (P_Services.length != 0) {
                                var adres = $('#adres').attr('itemid');
                                var ComforDate = $('#calen1').val();
                                var Com_T_from = $('#tmS').val();
                                Com_T_from = Com_T_from.replace(':', '-')
                                var Com_T_to = $("#tmE").val();
                                Com_T_to.replace(':', '-')
                                var RImg = [];
                                $('div[id="zImg"').each(function () {

                                    var img = $(this).find('img').attr('data-url')
                                    RImg.push({ "REQUEST_COMMENT_": "=", "COMMENT_FILE": img, "COMMENT_DATETIME": "++" })
                                });
                                var cmt = $("#cmt").val();
                                var object = { "score": score, "indId": IndId, "Phone": phone, "prs": P_Services, "Cf": RImg, "RC": cmt, "ObjId": adres, "comDate": ComforDate, "CFtime": Com_T_from, "CTtime": Com_T_to }
                                SaveRequest(object)
                            }
                            else {
                                $("#tblP").after('<label id="PrServiceE" style="color:red">Необходимо выбрать услугу</label>')
                            }
                        }
                        else {
                            {
                                $('#Phone').after('<label id="Phone_E" style="color:red">Необходимо заполнить поле "Номер телефона"</label><br>')
                            }
                        }
                    }
                    else {
                        $('#FirstN').after('<label id="FirstN_E" style="color:red">Заявитель не найден в системе</label><br>')
                    }

                }
                else {
                    $('#FirstN').after('<label id="FirstN_E" style="color:red">Необходимо заполнить поле "Заявитель"</label><br>')
                }
            })

        }
        else {
            if (TRst == "6") {
                $("#hedrZ").text('Заявка № ' + TRid)
                $('#headerS').text('Статус заявки: " Ожидание ответа диспетчера "')
                //$("#").text();
                $("#send").hide();
                //$('#MClose').click(function () {
                //    MakeCloseZ(TRid);
                //})
                $('#MClose').click(function () {
                    $('#myModal5 img').each(function () { $(this).hide() });
                    $('#OkVipol').attr('id', 'OtmenitZ');
                    $('#cmntsts2').text('').attr('placeholder', 'Пожалйста, введите комментарий');


                    RabotVipol(TRid)
                })
                $("#OkVipol").click(function () {
                    var idthis = $(this).attr('id');
                    if (idthis == "OkVipol") {
                        var cmntsZ = $('#cmntsts2').val();

                        var ssm = $('#ssm').text();

                        MakeZakrit(TRid, cmntsZ, ssm)
                    }
                    if (idthis == "verni") {
                        var comm = $('#cmntsts2').val();
                        VerniVRabot(TRid, comm)
                    }
                    if (idthis == "OtmenitZ") {
                        var cmC = $('#cmntsts2').val();
                        MakeCloseZ(TRid, cmC);
                    }
                    //console.log(JSON.stringify(imgs))
                })
            }
            if (TRst == "4") {
                $("#send,#MClose").hide();
                $("#hedrZ").text('Заявка № ' + TRid)
                $('#headerS').text('Статус заявки: " Отменена "')
                $('#cmt,#SendComent').attr('disabled', 'disabled')
                //$('#SendComent').hide();
                $('#files').hide();
            }
            if (TRst == "1") {
                $("#hedrZ").text('Заявка № ' + TRid)
                $('#headerS').text('Статус заявки: " В работе "')
                //$("#").text();
                $("#send").hide().text('Сохранить');
                $('#calen1,#tmS,#tmE').attr('disabled', 'disabled')
                $('#MClose').click(function () {
                    $('#deleteO').show();
                    $('#cls').val('Да')
                    $('#deleteO').val('Нет').click(function () { $('#close_').click(); })
                    $('#cls').click(function () {
                        MakeCloseZ(TRid, 0);
                    })
                    alertPrivate("", "Вы действительно хотите отменить заявку № " + TRid + "?", "")
                    //  
                })
                $('#send').click(function () {
                    var OFDates = $("input:radio[name='Ofdata']:checked").val()
                    var OFTimes = $("input:radio[name='oftime']:checked").val().split('-');
                    var oftimeS = OFTimes[0];
                    oftimeS = oftimeS.replace(':', '-')
                    var oftimeE = OFTimes[1];
                    oftimeE = oftimeE.replace(':', '-');
                    makeOplat(OFDates, oftimeS, oftimeE, TRid)
                })
            }
            if (TRst == "3") {
                $("#hedrZ").text('Заявка № ' + TRid)
                $('#headerS').text('Статус заявки: " Выполнена "');
                $('#send').text('Закрыть');
                // $('#hComennt,#SendComent,#cmt,#hdPr')
                $('#send').after('<button id="MVernut" class="btn logBtn btnAbort" type="button">Вернуть в работу</button>');
                $('#hComennt,#SendComent,#cmt,#hdPr,#imgss').show();
                //  $('#SendComent').hide();
                $('#send').click(function () {
                    $('#OkVipol').text('Закрыть заказ');
                    $('#Close_Ot').hide();
                    RabotVipol(TRid);
                    // MakeZakrit(TRid);

                })
                $("#OkVipol").click(function () {
                    var idthis = $(this).attr('id');
                    if (idthis == "OkVipol") {
                        var cmntsZ = $('#cmntsts2').val();

                        var ssm = $('#ssm').text();

                        MakeZakrit(TRid, cmntsZ, ssm)
                    }
                    if (idthis == "verni") {
                        var comm = $('#cmntsts2').val();
                        VerniVRabot(TRid, comm)
                    }
                    if (idthis == "OtmenitZ") {
                        var cmC = $('#cmntsts2').val();
                        MakeCloseZ(TRid, cmC);
                    }
                    //console.log(JSON.stringify(imgs))
                })
                $('#MVernut').click(function () {
                    $('#myModal5 img').each(function () { $(this).hide() });
                    $('#OkVipol').attr('id', 'verni');
                    $('#cmntsts2').text('').attr('placeholder', 'Пожалйста, введите комментарий');


                    RabotVipol(TRid)

                })
                //$('#verni').click(function () {
                //    
                //})
                $('#MClose').hide();
                $('#MClose').click(function () {
                    $('#myModal5 img').each(function () { $(this).hide() });
                    $('#OkVipol').attr('id', 'OtmenitZ');
                    $('#cmntsts2').text('').attr('placeholder', 'Пожалйста, введите комментарий');


                    RabotVipol(TRid)
                })
            }
            if (TRst == "2") {
                $("#hedrZ").text('Заявка № ' + TRid)
                $('#headerS').text('Статус заявки: " Отправлена "');
                $('#send').text('Закрыть').hide();;
                // $('#send').after('<button id="MVernut" class="btn logBtn btnAbort" type="button">Вернуть в работу</button>')
                $('#send').click(function () {
                    $('#OkVipol').text('Закрыть заказ');
                    $('#Close_Ot').hide();
                    RabotVipol(TRid);
                    // MakeZakrit(TRid);

                })
                $("#OkVipol").click(function () {
                    var idthis = $(this).attr('id');
                    if (idthis == "OkVipol") {
                        var cmntsZ = $('#cmntsts2').val();

                        var ssm = $('#ssm').text();

                        MakeZakrit(TRid, cmntsZ, ssm)
                    }
                    if (idthis == "verni") {
                        var comm = $('#cmntsts2').val();
                        VerniVRabot(TRid, comm)
                    }
                    if (idthis == "OtmenitZ") {
                        var cmC = $('#cmntsts2').val();
                        MakeCloseZ(TRid, cmC);
                    }
                    //console.log(JSON.stringify(imgs))
                })
                $('#MVernut').click(function () {
                    $('#myModal5 img').each(function () { $(this).hide() });
                    $('#OkVipol').attr('id', 'verni');
                    $('#cmntsts2').text('').attr('placeholder', 'Пожалйста, введите комментарий');


                    RabotVipol(TRid)

                })
                //$('#verni').click(function () {
                //    
                //})
                $('#MClose').click(function () {
                    //$('#myModal5 img').each(function () { $(this).hide() });
                    //$('#OkVipol').attr('id', 'OtmenitZ');
                    //$('#cmntsts2').text('').attr('placeholder', 'Пожалйста, введите комментарий');


                    //RabotVipol(TRid)
                    $('#deleteO').show();
                    $('#cls').val('Да')
                    $('#deleteO').val('Нет').click(function () { $('#close_').click(); })
                    $('#cls').click(function () {
                        MakeCloseZ(TRid, 0);
                    })
                    alertPrivate("", "Вы действительно хотите отменить заявку № " + TRid + "?", "")
                })
            }

            $('#hstComh,#hstCom').show();
            if (TRst != "3") {
                $('#SendComent').show();
            }
            if (TRst == "5") {
                $('#MClose').hide();
                $("#hedrZ").text('Заявка № ' + TRid)
                $('#headerS').text('Статус заявки: " Закрыта "');
                $('#send').text('Закрыть').hide();;
                $('#hComennt,#SendComent,#cmt,#hdPr,#imgss').hide();
                $('#calen1,#tmS').attr('disabled', 'disabled')
                // $('#send').after('<button id="MVernut" class="btn logBtn btnAbort" type="button">Вернуть в работу</button>')
                $('#send').click(function () {
                    $('#OkVipol').text('Закрыть заказ');
                    $('#Close_Ot').hide();
                    RabotVipol(TRid);
                    // MakeZakrit(TRid);

                })
                $("#OkVipol").click(function () {
                    var idthis = $(this).attr('id');
                    if (idthis == "OkVipol") {
                        var cmntsZ = $('#cmntsts2').val();

                        var ssm = $('#ssm').text();

                        MakeZakrit(TRid, cmntsZ, ssm)
                    }
                    if (idthis == "verni") {
                        var comm = $('#cmntsts2').val();
                        VerniVRabot(TRid, comm)
                    }
                    if (idthis == "OtmenitZ") {
                        var cmC = $('#cmntsts2').val();
                        MakeCloseZ(TRid, cmC);
                    }
                    //console.log(JSON.stringify(imgs))
                })
                $('#MVernut').click(function () {
                    $('#myModal5 img').each(function () { $(this).hide() });
                    $('#OkVipol').attr('id', 'verni');
                    $('#cmntsts2').text('').attr('placeholder', 'Пожалйста, введите комментарий');


                    RabotVipol(TRid)

                })
                //$('#verni').click(function () {
                //    
                //})
                $('#MClose').click(function () {
                    //$('#myModal5 img').each(function () { $(this).hide() });
                    //$('#OkVipol').attr('id', 'OtmenitZ');
                    //$('#cmntsts2').text('').attr('placeholder', 'Пожалйста, введите комментарий');


                    //RabotVipol(TRid)
                    $('#deleteO').show();
                    $('#cls').val('Да')
                    $('#deleteO').val('Нет').click(function () { $('#close_').click(); })
                    $('#cls').click(function () {
                        MakeCloseZ(TRid, 0);
                    })
                    alertPrivate("", "Вы действительно хотите отменить заявку № " + TRid + "?", "")
                })
            }
            //  $("#FirstN").attr('disabled', 'disabled')
            $("#shServ").hide();
            $("#calen1,#tmS,#tmE").attr('disabled');
            $('#prik').click(function () {
                $("#files").click();
            })
            $('#cmt').keyup(function () { $('#E_Comment+br').remove(); $('#E_Comment').remove() })
            GetTRequestById(TRid, score)
            $("#SendComent").click(function () {
                var imgD_url = $(".foto-disp").length;
                if ($("#cmt").val().length != 0 || imgD_url != 0) {
                    sensComment(TRid, $("#cmt").val(), imgD_url)
                    // alert("Ok")Введите, пожалуйста, комментарий или прикрепите файл
                }
                else {
                    $("#cmt").after('<label id="E_Comment"  style="float:left; color:red">Введите, пожалуйста, комментарий или прикрепите файл</label><br/>').show()
                }

            })
            $("#files").change(function () {
                // $("#loader").show();
                var filePath = $('#files').val();

                var index = filePath.lastIndexOf("\\") + 1;
                var filename = filePath.substr(index);
                $('#E_Comment+br').remove(); $('#E_Comment').remove()
                readURL(this, filename);

            })
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
                        console.log(formData);



                        $.ajax({
                            type: "POST",
                            url: "https://172.20.20.24//WCFServices/Constructor_API.svc/UploadFile",//window.location.protocol + '//' + window.location.host + "
                            data: formData,
                            type: 'POST',
                            contentType: false,
                            processData: false,
                            cache: false,
                            timeout: 3600000,
                            crossDomain: true,
                            //async: false,
                            success: function (result) {

                                //alert("OK. See Console -  press F12");
                                // console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                                //var jsondata_1 = jQuery.parseJSON(result)
                                //var jsondata_1 = JSON.stringify(result)
                                // var jsondata_1 = JSON.parse(result)
                                //  $("#files").hide();
                                var imgslenght = $(".foto-disp").length;
                                if (imgslenght != 5) {
                                    imgslenght++
                                    //  var lastImgItem = $("#imgss").find("img:last").attr("itemid");
                                    // lastImgItem++;
                                    /* $(input).after('<div class="col-xs-2" id="zImg"><img class="foto-disp" id="fotoDisp' + imgslenght + '" itemid=' + imgslenght + '  data-url="0"  src=""></div>')*///../Files/upl.png
                                    $("#files").val("");
                                }
                                if (imgslenght == 5) {
                                    $("#files").hide();
                                }
                                var F_ile = result.URL
                                F_ile = F_ile.substring(F_ile.indexOf('~') + 1, F_ile.length)
                                var extention = F_ile.substr(F_ile.indexOf(".") + 1)
                                if (extention != "docx" && extention != "doc" && extention != "xls" && extention != "xlsx" && extention != "pdf" && extention != "PDF" && extention != "txt" && extention != "TXT") {
                                    //$('#fotoDisp' + imgslenght + '').attr('src', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                                    //$('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                                    //$('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                                    $("#imgss").append('<div class="col-xs-2" id="zImg"><i class="fa fa-close" onclick="removeFJ(' + imgslenght + ',this)" aria-hidden="true" style="color: red;"></i><img class="foto-disp" id= "fotoDisp' + imgslenght + '" itemid= "' + imgslenght + '" data-url="//172.20.20.24' + F_ile + '" src= "//172.20.20.24' + F_ile + '"/></div>')
                                }
                                if (extention == "docx" || extention == "doc") {
                                    //$('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/word.png')
                                    //$('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                                    //$('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                                    $("#imgss").append('<div class="col-xs-2" id="zImg"><i class="fa fa-close" onclick="removeFJ(' + imgslenght + ',this)" aria-hidden="true" style="color: red;"></i><img class="foto-disp" id= "fotoDisp' + imgslenght + '" itemid= "' + imgslenght + '" data-url="//172.20.20.24' + F_ile + '" src= "//172.20.20.24/img/word.png"/></div>')
                                }
                                if (extention == "xlsx" || extention == "xls") {
                                    //$('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/excel.png')
                                    //$('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                                    //$('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                                    $("#imgss").append('<div class="col-xs-2" id="zImg"><i class="fa fa-close" onclick="removeFJ(' + imgslenght + ',this)" aria-hidden="true" style="color: red;"></i><img class="foto-disp" id= "fotoDisp' + imgslenght + '" itemid= "' + imgslenght + '" data-url="//172.20.20.24' + F_ile + '" src= "//172.20.20.24/img/excel.png"/></div>')
                                }
                                if (extention == "pdf" || extention == "PDF") {
                                    //$('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/pedefe.png')
                                    //$('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                                    //$('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                                    $("#imgss").append('<div class="col-xs-2" id="zImg"><i class="fa fa-close" onclick="removeFJ(' + imgslenght + ',this)" aria-hidden="true" style="color: red;"></i><img class="foto-disp" id= "fotoDisp' + imgslenght + '" itemid= "' + imgslenght + '" data-url="//172.20.20.24' + F_ile + '" src= "//172.20.20.24/img/pedefe.png"/></div>')
                                }
                                if (extention == "txt" || extention == "TXT") {
                                    //$('#fotoDisp' + imgslenght + '').attr('src', window.location.protocol + '//' + window.location.host + '/img/texete.png')
                                    //$('#fotoDisp' + imgslenght + '').attr('data-url', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                                    //$('#fotoDisp' + imgslenght + '').parent().prepend('<i class="fa fa-close" onclick=removeF(' + imgslenght + ') aria-hidden="true" style="color:red;"></i>')
                                    $("#imgss").append('<div class="col-xs-2" id="zImg"><i class="fa fa-close" onclick="removeFJ(' + imgslenght + ',this)" aria-hidden="true" style="color: red;"></i><img class="foto-disp" id= "fotoDisp' + imgslenght + '" itemid= "' + imgslenght + '" data-url="//172.20.20.24' + F_ile + '" src= "//172.20.20.24/img/texete.png"/></div>')
                                }
                                //$("#hdPr2").show()
                                //$("#zImg2").show()
                                //$("#files2").show()

                                $("#loader").hide();

                            },

                            error: function (datas) {


                                console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

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
        }
    }
    if (loc == "TRegisterRequest.aspx") {
        sessionStorage.setItem("TRId", "");
        getTenantRequests(score)
        getServiceTypes()
        getCurrentDateF();


        $("#createRequest").click(function () {
            window.location.href = "TRequest.aspx"
        })
        $('#Asbrflt').click(function () {
            $('#Jsts,#serviceType').val(0);
            $('#rid').val("");
            $('#AstartTime,#AendTime').val("");
            $('#requestBody').empty();
            getTenantRequests(score)
        })
        $('#AllFiltering').click(function () {
            var fltObj = [];
            fltObj.push({ "STATUS_ID": $("#Jsts").val(), "SERVICE_TYPE_ID": $("#serviceType").val(), "REQUEST_ID": $("#rid").val(), "Cr_S": $("#AstartTime").val(), "Cr_E": $("#AendTime").val() })
            makefilter(fltObj, score)
        })
        gtJStatuses()
    }
    getObjAndManager(path);



})
function AddDatasToHTML(mId, ctype, cnum, cLastDate, cNextDate) {
    var counter = '';
    if (ctype == "ГВС") {
        counter = '<div id="gvc"><h3 class="hdrG">Счётчик Горячего ВодоСнабжения № ' + cnum + '</h3><div class="space20"></div><div>Дата последней поверки <input id="lstGvc" disabled="disabled" type="date" >Дата следующей поверки <input id="nxtGvc" disabled="disabled" onchange=checkLst(this) type="date" ></div><div class="space20"></div><div class="row"><div class="col-lg-5"><h4>История переданных показаний:</h4><table class="table"><thead><tr><th>Дата</th><th>ГВС:</th></tr></thead><tbody id="gvsT' + cnum + '"><tr><td></td><td></td></tr></tbody></table></div><div class="col-lg-7"><h4>Передать показания счётчика ГВС:</h4><span style="padding: 10px 0; margin: 0 10px 0 0;"><strong>ГВС</strong>:</span><input type="number" id="cntG" value="0" class="cntInpFld"><input type="submit" id="GvcB' + cnum + '" onclick=pokaz(this,' + mId + ',"' + ctype + '",' + cnum + ') value="Передать показания" class="btn genBtn cntBtn"></div></div> <!-- gvs --> <div class="space30"></div></div>';
        cLastDate = cLastDate.split('.')
        var year = cLastDate[2];
        var month = cLastDate[1];
        var day = cLastDate[0];
        cLastDate = year + '-' + month + '-' + day
        $('#infoH').after(counter)
        $('#lstGvc').val(cLastDate);
        cNextDate = cNextDate.split('.');
        year = cNextDate[2];
        month = cNextDate[1];
        day = cNextDate[0];
        cNextDate = year + '-' + month + '-' + day;
        $('#nxtGvc').val(cNextDate);
        var d = new Date();
        var today = d.toISOString().substring(0, d.toISOString().indexOf('T'))
        if ($('#nxtGvc').val() > today) {
            $('#GvcB' + cnum).attr('disabled', 'disabled').css('background-color', 'rgb(149,153,156)')
        }
        else {
            $('#GvcB' + cnum).removeAttr('style').removeAttr('disabled');
        }
        getMetersValuesT(mId, 'gvsT' + cnum)
    }
    if (ctype == "ХВС") {
        counter = '<div id="xvc"><h3 class="hdrX">Счётчик Холодного ВодоСнабжения № ' + cnum + '</h3><div class="space20"></div><div>Дата последней поверки <input id="lstXvc" disabled="disabled" type="date" >Дата следующей поверки <input id="nxtXvc" disabled="disabled" onchange=checkLst(this) type="date" ></div><div class="space20"></div><div class="row"><div class="col-lg-5"><h4>История переданных показаний:</h4><table class="table"><thead><tr><th>Дата</th><th>ХВС:</th></tr></thead><tbody id="xvcT' + cnum + '"><tr><td></td><td></td></tr></tbody></table></div><div class="col-lg-7"><h4>Передать показания счётчика ХВС:</h4><span style="padding: 10px 0; margin: 0 10px 0 0;"><strong>ХВС</strong>:</span><input type="number" id="cntX" value="0" class="cntInpFld"><input type="submit" id="XvcB' + cnum + '" onclick=pokaz(this,' + mId + ',"' + ctype + '",' + cnum + ') value="Передать показания" class="btn genBtn cntBtn"></div></div> <!-- hvs --><div class="space30"></div></div>'
        $('#infoH').after(counter)
        cLastDate = cLastDate.split('.')
        var year = cLastDate[2];
        var month = cLastDate[1];
        var day = cLastDate[0];
        cLastDate = year + '-' + month + '-' + day
        //  $('#infoH').after(counter)
        $('#lstXvc').val(cLastDate);
        cNextDate = cNextDate.split('.');
        year = cNextDate[2];
        month = cNextDate[1];
        day = cNextDate[0];
        cNextDate = year + '-' + month + '-' + day;
        $('#nxtXvc').val(cNextDate);
        getMetersValuesT(mId, 'xvcT' + cnum)
        var d = new Date();
        var today = d.toISOString().substring(0, d.toISOString().indexOf('T'))
        if ($('#nxtXvc').val() > today) {
            $('#XvcB' + cnum).attr('disabled', 'disabled').css('background-color', 'rgb(149,153,156)')
        }
        else {
            $('#XvcB' + cnum).removeAttr('style').removeAttr('disabled');
        }
    }
    if (ctype == "Теплоэнергия") {
        counter = '<div id="teplo"><h3 class="hdrT">Счётчик Теплоэнергии № ' + cnum + '</h3><div class="space20"></div><div>Дата последней поверки <input id="lstTeplo" disabled="disabled" type="date" >Дата следующей поверки <input id="nxtTeplo" disabled="disabled" onchange=checkLst(this) type="date" ></div><div class="space20"></div><div class="row"><div class="col-lg-5"><h4>История переданных показаний:</h4><table class="table"><thead><tr><th>Дата</th><th>Теплоэнергия:</th></tr></thead><tbody id="teploT' + cnum + '"><tr><td></td><td></td></tr></tbody></table></div><div class="col-lg-7"><h4>Передать показания счётчика теплоэнергии:</h4><span style="padding: 10px 0; margin: 0 10px 0 0;"><strong>Теплоэнергия</strong>:</span><input type="number" id="cntT" value="0" class="cntInpFld"><input type="submit" id="TeploB' + cnum + '" onclick=pokaz(this,' + mId + ',"' + ctype + '",' + cnum + ') value="Передать показания" class="btn genBtn cntBtn"></div></div> <!-- teplo --><div class="space30"></div></div>'
        $('#infoH').after(counter)
        cLastDate = cLastDate.split('.')
        var year = cLastDate[2];
        var month = cLastDate[1];
        var day = cLastDate[0];
        cLastDate = year + '-' + month + '-' + day
        //  $('#infoH').after(counter)
        $('#lstTeplo').val(cLastDate);
        cNextDate = cNextDate.split('.');
        year = cNextDate[2];
        month = cNextDate[1];
        day = cNextDate[0];
        cNextDate = year + '-' + month + '-' + day;
        $('#nxtTeplo').val(cNextDate);

        getMetersValuesT(mId, 'teploT' + cnum)
        var d = new Date();
        var today = d.toISOString().substring(0, d.toISOString().indexOf('T'))
        if ($('#nxtTeplo').val() > today) {
            $('#TeploB' + cnum).attr('disabled', 'disabled').css('background-color', 'rgb(149,153,156)')
        }
        else {
            $('#TeploB' + cnum).removeAttr('style').removeAttr('disabled');
        }
    }
    if (ctype == "Электроэнергия") {
        counter = '<div id="elek"><h3 class="hdrE">Счётчик Электроэнергии № ' + cnum + '</h3><div class="space20"></div><div>Дата последней поверки <input id="lstElekt" disabled="disabled" type="date" >Дата следующей поверки <input id="nxtElekt" disabled="disabled" onchange=checkLst(this) type="date" ></div><div class="space20"></div><div class="row"><div class="col-lg-5"><h4 id="istoH' + cnum + '">История переданных показаний:</h4></div><div class="col-lg-7"><h4 id="pered' + cnum + '">Передать показания счётчика электроэнергии:</h4></div></div> <!-- electro --><div class="space30"></div></div>'
        $('#infoH').after(counter)
        cLastDate = cLastDate.split('.')
        var year = cLastDate[2];
        var month = cLastDate[1];//<table class="table"><thead><tr><th>Дата</th><th>Т1:</th><th>Т2:</th><th>Т3:</th></tr></thead><tbody id="elekT"><tr><td></td><td></td><td></td><td></td></tr></tbody></table>
        var day = cLastDate[0];//<span style="padding: 10px 0; margin: 0 10px 0 0;"><strong>Электроэнергия</strong>:</span><input type="number" id="cntE" value="0" class="cntInpFld"><input type="submit" id="ElektB' + cnum + '" onclick=pokaz(this,' + mId + ',"' + ctype + '") value="Передать показания" class="btn genBtn cntBtn">
        cLastDate = year + '-' + month + '-' + day
        //  $('#infoH').after(counter)
        $('#lstElekt').val(cLastDate);
        cNextDate = cNextDate.split('.');
        year = cNextDate[2];
        month = cNextDate[1];
        day = cNextDate[0];
        cNextDate = year + '-' + month + '-' + day;
        $('#nxtElekt').val(cNextDate);
        getMetersValuesT(mId, 'elekT' + cnum)
        var d = new Date();
        var today = d.toISOString().substring(0, d.toISOString().indexOf('T'))
        if ($('#nxtElekt').val() > today) {
            $('#ElektB' + cnum).attr('disabled', 'disabled').css('background-color', 'rgb(149,153,156)')
        }
        else {
            $('#ElektB' + cnum).removeAttr('style').removeAttr('disabled');
        }
    }
    if (ctype == "Газ") {
        counter = '<div id="Gas"><h3 class="hdrGs">Счётчик Газа № ' + cnum + '</h3><div class="space20"></div><div>Дата последней поверки <input id="lstGas" disabled="disabled" type="date" >Дата следующей поверки <input id="nxtGas" onchange=checkLst(this) disabled="disabled" type="date" ></div><div class="space20"></div><div class="row"><div class="col-lg-5"><h4>История переданных показаний:</h4><table class="table"><thead><tr><th>Дата</th><th>Газ:</th></tr></thead><tbody id="GasT' + cnum + '"><tr><td></td><td></td></tr></tbody></table ></div > <div class="col-lg-7"><h4>Передать показания счётчика газа:</h4><span style="padding: 10px 0; margin: 0 10px 0 0;"><strong>Газ</strong>:</span><input type="number" id="cntGs" value="0" class="cntInpFld"><input id="GasB' + cnum + '" type="submit" onclick=pokaz(this,' + mId + ',"' + ctype + '",' + cnum + ') value="Передать показания" class="btn genBtn cntBtn"></div></div> <!-- gas --><div class="space30"></div></div>'
        $('#infoH').after(counter)
        cLastDate = cLastDate.split('.')
        var year = cLastDate[2];
        var month = cLastDate[1];
        var day = cLastDate[0];
        cLastDate = year + '-' + month + '-' + day
        //  $('#infoH').after(counter)
        $('#lstGas').val(cLastDate);
        cNextDate = cNextDate.split('.');
        year = cNextDate[2];
        month = cNextDate[1];
        day = cNextDate[0];
        cNextDate = year + '-' + month + '-' + day;
        $('#nxtGas').val(cNextDate);
        getMetersValuesT(mId, 'GasT' + cnum)
        var d = new Date();
        var today = d.toISOString().substring(0, d.toISOString().indexOf('T'))
        if ($('#nxtGas').val() > today) {
            $('#GasB' + cnum).attr('disabled', 'disabled').css('background-color', 'rgb(149,153,156)')
        }
        else {
            $('#GasB' + cnum).removeAttr('style').removeAttr('disabled');
        }
    }

}
function checkLst(e) {
    var d = new Date();
    var parentDiv = $(e).parent().parent().attr('id')
    parentDiv = '#' + parentDiv;
    var today = d.toISOString().substring(0, d.toISOString().indexOf('T'))
    if ($(e).val() > today) {
        $(parentDiv + ' input[type="submit"]').attr('disabled', 'disabled').css('background-color', 'rgb(149,153,156)')
    }
    else {
        $(parentDiv + ' input[type="submit"]').removeAttr('style').removeAttr('disabled');
    }
}
function pokaz(e, mid, ctype, cnum) {
    var CurrentValue = $(e).prev().val();
    CurrentValue = parseInt(CurrentValue)
    var lastvalue = "";
    if (ctype == "ГВС") {
        lastvalue = $(e).parent().prev().find('.table tbody tr:eq(0) td:eq(1)').text()
        lastvalue = parseInt(lastvalue)
        if (lastvalue > CurrentValue) {
            if ($('#errst' + cnum + '').length == 0) {
                $(e).after('<label style="color:red" id="errst' + cnum + '">Введенные показание меньше предыдущих. Введите корректные данные</label>')
            }

        }
        else {

            AddMeterValue(e, mid, ctype, cnum, CurrentValue)
        }
    }
    if (ctype == "ХВС") {
        lastvalue = $(e).parent().prev().find('.table tbody tr:eq(0) td:eq(1)').text();//$(e).parent().prev().find('#gvsT' + cnum + ' tr:eq(0) td:eq(1)').text() 
        lastvalue = parseInt(lastvalue)
        if (lastvalue > CurrentValue) {
            if ($('#errst' + cnum + '').length == 0) {
                $(e).after('<label style="color:red" id="errst' + cnum + '">Введенные показание меньше предыдущих. Введите корректные данные</label>')
            }

        }
        else {

            AddMeterValue(e, mid, ctype, cnum, CurrentValue)
        }
    }
    if (ctype == "Теплоэнергия") {
        lastvalue = $(e).parent().prev().find('.table tbody tr:eq(0) td:eq(1)').text();//$(e).parent().prev().find('#xvcT' + cnum + ' tr:eq(0) td:eq(1)').text()
        lastvalue = parseInt(lastvalue)
        if (lastvalue > CurrentValue) {
            if ($('#errst' + cnum + '').length == 0) {
                $(e).after('<label style="color:red" id="errst' + cnum + '">Введенные показание меньше предыдущих. Введите корректные данные</label>')
            }

        }
        else {

            AddMeterValue(e, mid, ctype, cnum, CurrentValue)
        }
    }
    if (ctype == "Газ") {
        lastvalue = $(e).parent().prev().find('.table tbody tr:eq(0) td:eq(1)').text();
        lastvalue = parseInt(lastvalue)
        if (lastvalue > CurrentValue) {
            if ($('#errst' + cnum + '').length == 0) {
                $(e).after('<label style="color:red" id="errst' + cnum + '">Введенные показание меньше предыдущих. Введите корректные данные</label>')
            }

        }
        else {

            AddMeterValue(e, mid, ctype, cnum, CurrentValue)
        }
    }
    if (ctype != "ГВС" && ctype != "ХВС" && ctype != "Теплоэнергия" && ctype != "Газ") {
        if (ctype.indexOf('T3') != -1) {
            lastvalue = $(e).parent().prev().find('.table tbody tr:eq(0) td:eq(3)').text();
            lastvalue = parseInt(lastvalue)
            if (lastvalue > CurrentValue) {
                if ($('#T3errst' + cnum + '').length == 0) {
                    $(e).after('<label style="color:red" id="T3errst' + cnum + '">Введенные показание меньше предыдущих. Введите корректные данные</label>')
                }

            }
            else {

                AddMeterValue(e, mid, ctype, cnum, CurrentValue)
            }
        }
        if (ctype.indexOf('T2') != -1) {
            lastvalue = $(e).parent().prev().find('.table tbody tr:eq(0) td:eq(2)').text();
            lastvalue = parseInt(lastvalue)
            if (lastvalue > CurrentValue) {
                if ($('#T2errst' + cnum + '').length == 0) {
                    $(e).after('<label style="color:red" id="T2errst' + cnum + '">Введенные показание меньше предыдущих. Введите корректные данные</label>')
                }

            }
            else {

                AddMeterValue(e, mid, ctype, cnum, CurrentValue)
            }
        }
        if (ctype.indexOf('T1') != -1) {
            lastvalue = $(e).parent().prev().find('.table tbody tr:eq(0) td:eq(1)').text();//'#elekT' + cnum + '_1 tr:eq(0) td:eq(1)
            lastvalue = parseInt(lastvalue)
            if (lastvalue > CurrentValue) {
                if ($('#T1errst' + cnum + '').length == 0) {
                    $(e).after('<label style="color:red" id="T1errst' + cnum + '">Введенные показание меньше предыдущих. Введите корректные данные</label>')
                }

            }
            else {

                AddMeterValue(e, mid, ctype, cnum, CurrentValue)
            }
        }
    }
}
function AddMeterValue(event, mid, ctip, cnum, val) {
    var ob = { "type": ctip, "mid": mid, "VALUE_": val, "cnum": cnum }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/AddCounterValue",
        data: JSON.stringify(ob),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('.col-lg-9').find('*').not('#infoH').not('.breadcrumb').remove();
            var sc = sessionStorage.getItem('score');
            getMetersT(sc)
            //var today = d.toISOString().substring(0, d.toISOString().indexOf('T'))
            //today = today.split('-')
            //var year = today[0];
            //var month = today[1]
            //var day = today[2]
            //today = day + '.' + month + '.' + year;
            //if (ctip == "ГВС") {
            //    $(event).parent().prev().find('.table tbody').prepend('<tr><td>' + today + '</td><td>'+val+'</td></tr>')
            //}
            //if (ctip == "ХВС") {
            //    $(event).parent().prev().find('.table tbody').prepend('<tr><td>' + today + '</td><td>' + val + '</td></tr>')
            //}
            //if (ctip == "Теплоэнергия") {
            //    $(event).parent().prev().find('.table tbody').prepend('<tr><td>' + today + '</td><td>' + val + '</td></tr>')
            //}
            //if (ctip == "Газ") {
            //    $(event).parent().prev().find('.table tbody').prepend('<tr><td>' + today + '</td><td>' + val + '</td></tr>')
            //}
            //if (ctip != "ГВС" && ctip != "ХВС" && ctip != "Теплоэнергия" && ctip != "Газ")
            //{
            //    if (ctype.indexOf('T3') != -1) {
            //        var has_dt = $(event).parent().prev.find('.table tbody tr:eq(0) td:eq(3)').text();
            //        var has_date = $(event).parent().prev.find('.table tbody tr:eq(0) td:eq(3)').text();
            //        if (has_dt==) {

            //        }
            //       // $(event).parent().prev().find('.table tbody').prepend('<tr><td>' + today + '</td><td>' + val + '</td></tr>')
            //    }
            //    if (ctype.indexOf('T2') != -1) {

            //    }
            //    if (ctype.indexOf('T1') != -1) {

            //    }
            //}
        }
    })
}
function getMetersValuesT(mid, table) {
    var ob = { "mid": mid }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/getMetersValuesT",
        data: JSON.stringify(ob),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            // AMUNT_TARIF/VALUE_
            // LOG_IN_ID/VALUE_2
            // METERS_ID/VALUE_3
            // NEXT_DATE/DATE_
            $('#' + table).empty();
            var jsond = JSON.parse(data.d)
            if (table.indexOf('GasT') != -1) {
                for (var i = 0; i < jsond.length; i++) {
                    $('#' + table).append('<tr><td>' + jsond[i].NEXT_DATE.substring(0, jsond[i].NEXT_DATE.indexOf(' ')) + '</td><td>' + jsond[i].AMUNT_TARIF + '</td></tr>')
                }

            }
            if (table.indexOf('elekT') != -1) {
                //for (var i = 0; i < jsond.length; i++) {
                //    $('#' + table).append('<tr><td>' + jsond[i].NEXT_DATE.substring(0, jsond[i].NEXT_DATE.indexOf(' ')) + '</td><td>' + jsond[i].AMUNT_TARIF + '</td><td>' + jsond[i].LOG_IN_ID + '</td><td>' + jsond[i].METERS_ID + '</td></tr>')
                //}
                var cnum = table.substring(table.indexOf('T') + 1, table.length)
                for (var i = 0; i < jsond.length; i++) {

                    var value1 = jsond[i].AMUNT_TARIF;
                    var value2 = jsond[i].LOG_IN_ID;
                    var value3 = jsond[i].METERS_ID;//<span style="padding: 10px 0; margin: 0 10px 0 0;"><strong>Электроэнергия</strong>:</span><input type="number" id="cntE" value="0" class="cntInpFld"><input type="submit" id="ElektB8" onclick="pokaz(this,27,&quot;Электроэнергия&quot;)" value="Передать показания" class="btn genBtn cntBtn">

                    if (i == 0) {
                        if (value1 != "" && value2 != "" && value3 != "") {
                            $('#istoH' + cnum).after('<table class="table"><thead><tr><th>Дата</th><th>Т1:</th><th>Т2:</th><th>Т3:</th></tr></thead><tbody id="elekT' + cnum + '_3"></tbody></table>')
                            for (var i = 1; i <= 3; i++) {
                                var elekt = "elek_T" + i
                                $('#pered' + cnum).after('<span style="padding: 10px 0; margin: 0 10px 0 0;"><strong>Электроэнергия T' + i + '</strong>:</span><input type="number" id="cntE" value="0" class="cntInpFld"><input type="submit" id="ElektB8" onclick=pokaz(this,' + mid + ',"' + elekt + '",' + cnum + ') value="Передать показания" class="btn genBtn cntBtn"><br>')
                            }

                        }
                        if (value1 != "" && value2 != "" && value3 == "") {
                            $('#istoH' + cnum).after('<table class="table"><thead><tr><th>Дата</th><th>Т1:</th><th>Т2:</th></tr></thead><tbody id="elekT' + cnum + '_2"></tbody></table>')

                            for (var i = 1; i <= 2; i++) {
                                var elekt2 = "elek_T" + i
                                $('#pered' + cnum).after('<span style="padding: 10px 0; margin: 0 10px 0 0;"><strong>Электроэнергия T' + i + '</strong>:</span><input type="number" id="cntE" value="0" class="cntInpFld"><input type="submit" id="ElektB' + cnum + '" onclick=pokaz(this,' + mid + ',"' + elekt2 + '",' + cnum + ') value="Передать показания" class="btn genBtn cntBtn"><br>')
                            }
                        }
                        if (value1 != "" && value2 == "" && value3 == "") {
                            $('#istoH' + cnum).after('<table class="table"><thead><tr><th>Дата</th><th>Т1:</th></tr></thead><tbody id="elekT' + cnum + '_1"></tbody></table>')
                            // var elekt2=""
                            $('#pered' + cnum).after('<span style="padding: 10px 0; margin: 0 10px 0 0;"><strong>Электроэнергия T1</strong>:</span><input type="number" id="cntE" value="0" class="cntInpFld"><input type="submit" id="ElektB' + cnum + '" onclick=pokaz(this,' + mid + ',"elek_T1",' + cnum + ') value="Передать показания" class="btn genBtn cntBtn"><br>')
                        }
                    }

                }

                for (var i = 0; i < jsond.length; i++) {

                    var value1 = jsond[i].AMUNT_TARIF;
                    var value2 = jsond[i].LOG_IN_ID;
                    var value3 = jsond[i].METERS_ID;


                    if (value1 != "" && value2 != "" && value3 != "") {
                        // $('#istoH' + cnum).after('<table class="table"><thead><tr><th>Дата</th><th>Т1:</th><th>Т2:</th><th>Т3:</th></tr></thead><tbody id="elekT' + cnum + '_3"></tbody></table>')
                        $('#elekT' + cnum + '_3').append('<tr><td>' + jsond[i].NEXT_DATE.substring(0, jsond[i].NEXT_DATE.indexOf(' ')) + '</td><td>' + value1 + '</td><td>' + value2 + '</td><td>' + value3 + '</td></tr>')
                    }
                    if (value1 != "" && value2 != "" && value3 == "") {
                        // $('#istoH' + cnum).after('<table class="table"><thead><tr><th>Дата</th><th>Т1:</th><th>Т2:</th></tr></thead><tbody id="elekT' + cnum + '_2"></tbody></table>')
                        $('#elekT' + cnum + '_2').append('<tr><td>' + jsond[i].NEXT_DATE.substring(0, jsond[i].NEXT_DATE.indexOf(' ')) + '</td><td>' + value1 + '</td><td>' + value2 + '</td>')
                    }
                    if (value1 != "" && value2 == "" && value3 == "") {
                        //  $('#istoH' + cnum).after('<table class="table"><thead><tr><th>Дата</th><th>Т1:</th></tr></thead><tbody id="elekT' + cnum + '_3"></tbody></table>')
                        $('#elekT' + cnum + '_1').append('<tr><td>' + jsond[i].NEXT_DATE.substring(0, jsond[i].NEXT_DATE.indexOf(' ')) + '</td><td>' + value1 + '</td>')
                    }


                }
            }
            if (table.indexOf('teploT') != -1) {
                for (var i = 0; i < jsond.length; i++) {
                    $('#' + table).append('<tr><td>' + jsond[i].NEXT_DATE.substring(0, jsond[i].NEXT_DATE.indexOf(' ')) + '</td><td>' + jsond[i].AMUNT_TARIF + '</td></tr>')
                }

            }
            if (table.indexOf('xvcT') != -1) {
                for (var i = 0; i < jsond.length; i++) {
                    $('#' + table).append('<tr><td>' + jsond[i].NEXT_DATE.substring(0, jsond[i].NEXT_DATE.indexOf(' ')) + '</td><td>' + jsond[i].AMUNT_TARIF + '</td></tr>')
                }

            }
            if (table.indexOf('gvsT') != -1) {
                for (var i = 0; i < jsond.length; i++) {
                    $('#' + table).append('<tr><td>' + jsond[i].NEXT_DATE.substring(0, jsond[i].NEXT_DATE.indexOf(' ')) + '</td><td>' + jsond[i].AMUNT_TARIF + '</td></tr>')
                }

            }
        }
    })
}
function getMetersT(s) {
    var ob = { "s": s }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/GetCountersT",
        data: JSON.stringify(ob),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsond = JSON.parse(data.d);
            if (jsond.length != 0) {
                for (var i = 0; i < jsond.length; i++) {
                    var LastDate = jsond[i].PREVIOUS_DATE.substring(0, jsond[i].PREVIOUS_DATE.indexOf(' '))
                    var nextDate = jsond[i].NEXT_DATE.substring(0, jsond[i].NEXT_DATE.indexOf(' '))
                    AddDatasToHTML(jsond[i].METERS_ID, jsond[i].TYPE, jsond[i].METERS_NUMBER, LastDate, nextDate)
                }
            }
        }
    })
}
function MakeLogin(score, Pass) {
    var ob = { "score": score, "Pass": Pass }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/SecondLogin",
        data: JSON.stringify(ob),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d)
            if (json.result == "0") {
                // 
                if ($('#chkC').is(':checked')) {
                    rem = true
                    setCookiePrivate(score, Pass)
                }
                sessionStorage.setItem('lgt', 'ok');
                var got_o = sessionStorage.getItem('cmf')
                if (got_o != null) {
                    window.location.href = got_o
                }
                else {
                    window.location.href = "MainPage.aspx"
                }
                // alert('Happy')
            }
            else {
                // alert('bad')
                alertPrivate("Ошибка", "Пожалуйста, проверьте правильность введенных данных", "");
            }
        }
    })
}
function setCookiePrivate(s, p) {
    var customObject = {};
    customObject.Score = s
    customObject.Pass = p
    var expires = new Date();
    expires.setTime(expires.getTime() + 31536000000);
    var jsonString = JSON.stringify(customObject)
    document.cookie = "cookiePrivate=" + jsonString + ';expires=' + expires.toUTCString();
}
function getCookiePrivate() {
    var cookie = document.cookie;
    if (cookie != "" && cookie != undefined && cookie.indexOf('cookiePrivate') >= 0) {
        // var cookiValueArra = document.cookie.split("=");
        var cookieOb = cookie.substring(cookie.indexOf('cookiePrivate'), cookie.indexOf('}') + 1)
        cookieOb = cookieOb.substring(cookieOb.indexOf('{'), cookieOb.indexOf('}') + 1)
        var cookieJson = JSON.parse(cookieOb);
        //alert(cookieJson.mailC);
        //alert(cookieJson.passC);
        if (cookieJson.length != 0) {
            $("#score").val(cookieJson.Score);
            $("#PassT").val(cookieJson.Pass);
            // $("#rum_num").val(cookieJson.rumNum)
        }
        //if ($("#pasC").val().length != 0) {
        //    $("#chkC").prop('checked', true);
        //}
        //else {
        //    $("#chkC").removeAttr('checked');
        //}
    }
}
function getCurrentDateF() {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    var dayNe = parseInt(day) + 1

    var maxDate = year + '-' + month + '-' + day;
    // $('#calen').attr('max', maxDate);

    $('#AstartTime,#AendTime').val(maxDate);
    // $("#calen").

    return maxDate;


}
function Sortedby(e, by, asc) {

    var sc = sessionStorage.getItem('score');
    var ob = { "By": by, "score": sc, "asc": asc }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/sortingBy",
        data: JSON.stringify(ob),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata = JSON.parse(data.d)
            //FIRST_NAME-FIRST_NAME
            //ROOM_T-REQUEST_ID
            //ACCOUNT_NAME-CR_DATE
            //ROOM_NUMBER-STATUS
            //PHONE-STATUS_ID
            $('i[data-icon="w"]').attr('class', 'fa fa-unsorted')
            var icon = $(e).attr('class');
            if (asc == "asc") {
                $(e).attr('class', 'fa fa-caret-down').attr("onclick", "Sortedby(this, '" + by + "','desc')")
            }
            if (asc == "desc") {
                $(e).attr('class', 'fa fa-caret-up').attr("onclick", "Sortedby(this, '" + by + "','asc')")
            }
            $("#requestBody").empty();
            for (var i = 0; i < jsondata.length; i++) {
                var don_date = (jsondata[i].INDIVIDUAL_ID == "") ? '--' : jsondata[i].INDIVIDUAL_ID
                $('#requestBody').append('<tr ><td><a onclick="SendId(' + jsondata[i].ROOM_T + ',' + jsondata[i].PHONE + ')" href="TRequest.aspx">' + jsondata[i].ROOM_T + '</a></td><td><a onclick="SendId(' + jsondata[i].ROOM_T + ',' + jsondata[i].PHONE + ')" href="TRequest.aspx">' + jsondata[i].ACCOUNT_NAME + '</a></td><td><a onclick="SendId(' + jsondata[i].ROOM_T + ',' + jsondata[i].PHONE + ')" class="adr0" href="TRequest.aspx"  >' + don_date + '</a></td><td><a onclick="SendId(' + jsondata[i].ROOM_T + ',' + jsondata[i].PHONE + ')" href="TRequest.aspx"  >' + jsondata[i].ROOM_NUMBER + '</a></td></tr>')

            }
        }
    })
}
function VerniVRabot(rid, com) {
    sensComment(rid, com, 0)
    var obj = { "rid": rid }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/VerniVRabot",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            window.location.href = "TRegisterRequest.aspx";
        }
    })

}
function makefilter(fltObj, score) {
    var obj = { "flt": fltObj, "score": score }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/Makefilter",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata = JSON.parse(data.d)
            //FIRST_NAME-FIRST_NAME
            //ROOM_T-REQUEST_ID
            //ACCOUNT_NAME-CR_DATE
            //ROOM_NUMBER-STATUS
            //PHONE-STATUS_ID
            //console.log(data)
            $('#requestBody').empty();
            for (var i = 0; i < jsondata.length; i++) {
                var don_date = (jsondata[i].INDIVIDUAL_ID == "") ? '--' : jsondata[i].INDIVIDUAL_ID
                $('#requestBody').append('<tr ><td><a onclick="SendId(' + jsondata[i].ROOM_T + ',' + jsondata[i].PHONE + ')" href="TRequest.aspx">' + jsondata[i].ROOM_T + '</a></td><td><a onclick="SendId(' + jsondata[i].ROOM_T + ',' + jsondata[i].PHONE + ')" href="TRequest.aspx">' + jsondata[i].ACCOUNT_NAME + '</a></td><td><a onclick="SendId(' + jsondata[i].ROOM_T + ',' + jsondata[i].PHONE + ')" class="adr0" href="TRequest.aspx"  >' + don_date + '</a></td><td><a onclick="SendId(' + jsondata[i].ROOM_T + ',' + jsondata[i].PHONE + ')" href="TRequest.aspx"  >' + jsondata[i].ROOM_NUMBER + '</a></td></tr>')
            }
        },
        error: function (data) {
            //  console.log(data)
        }
    })
}
function getServiceTypes() {
    //serviceType
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/getServiceType",

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var json = JSON.parse(data.d);
            for (var i = 0; i < json.length; i++) {
                $('#serviceType').append('<option value=' + json[i].NUMBER + '>' + json[i].ACCOUNT_NAME + '</option>')
            }
        }
    })

}
// makeOplat(OFDates, oftimeS, oftimeE, TRid)
function makeOplat(OFDates, oftimeS, oftimeE, TRid) {
    var obj = { "rid": TRid, "OFDates": OFDates, "oftimeS": oftimeS, "oftimeE": oftimeE }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/makeOplat",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            window.location.href = "TRegisterRequest.aspx";
        }
    })
}
function RabotVipol(rid) {
    var modal = document.getElementById('myModal5');
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    $("#close_5").click(function () {
        modal.style.display = "none";
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

}
function MakeZakrit(r, cmZ, ssm) {//int rid,string rst,string sm
    var obj = { "rid": r, "rst": cmZ, "sm": ssm }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/MakeZakrit",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            window.location.href = "TRegisterRequest.aspx";
        }
    })
}
function MakeCloseZ(r, c) {
    sensComment(r, c, 0)

    var obj = { "rid": r }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/MakeClose",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            window.location.href = "TRegisterRequest.aspx";
        }
    })
}
function sensComment(rid, rc, dturl) {
    if (rc.length != 0) {
        var obj = { "rq": rid, "cmnt": rc }
        $.ajax({
            type: "POST",
            url: "../Disp_Admin/CreateRequest.aspx/sntComment",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var hst = $("#hstCom").text().trim();
                if (hst == "-") {
                    $("#hstCom").empty();
                    $("#hstCom").append("<h4 style='margin-bottom:  -6px;'>- " + rc + "  </h4> (сегодня в " + getTime() + ")")
                    $("#cmt").val("")

                }
                else {
                    $("#hstCom").append("<h4 style='margin-bottom:  -6px;'>- " + rc + "  </h4>     (сегодня в " + getTime() + ")")
                    $("#cmt").val("")

                }
            }
        })
    }

    if (dturl != 0) {
        H_fileSave(rid)
        //  $("#HImg").attr("src", window.location.protocol + '//' + window.location.host + "/Files/upl.png").attr("data-url", "0")
    }
    $('#prik').show();

}
function H_fileSave(rid) {
    var img_s = [];
    $('div[id="zImg"').each(function () {

        var imgAdres = $(this).find('img').attr('data-url')
        img_s.push({ "ImgAdres": imgAdres })
    });
    var obj = { "R": rid, "imgs": img_s }
    $.ajax({
        type: "POST",
        url: "../Disp_Admin/CreateRequest.aspx/SaveHFile",
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
            $('div[id="zImg"').each(function () {

                $(this).remove();
            });
        }

    })
}
function GetTRequestById(tr, sc) {

    var obj = { "rid": tr }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/GetTRequestById",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata = JSON.parse(data.d);
            /* rt.ACCOUNT_NAME = item["STATUS_ID"].ToString();
                rt.INDIVIDUAL_ID = item["INDIVIDUAL_ID"].ToString();
                rt.NUMBER = item["COMFORDATE"].ToString();
                rt.OBJECT_ID = item["COM_TIME_FROM"].ToString();
                rt.ROOM_NUMBER = item["COM_TIME_TO"].ToString();*/
            for (var i = 0; i < jsondata.length; i++) {
                getTenantDatas(sc, jsondata[i].INDIVIDUAL_ID);
                var date_ = jsondata[i].NUMBER
                date_ = date_.substr(0, 10);
                var year = date_.substr(6, 10);
                var month = date_.substr(3, 2)
                var day = date_.substr(0, 2);
                date_ = year + "-" + month + "-" + day
                // $("#calen1").val(date_)
                $("#tmS").val(jsondata[i].OBJECT_ID);
                $("#tmE").val(jsondata[i].ROOM_NUMBER)
                $("#createH").show().after('<br>');
                $("#crdate").text(jsondata[i].ROOM_T.substring(0, jsondata[i].ROOM_T.lastIndexOf(":"))).show().after('</br><br>');
                GetTSelectedServ(tr);
                if (jsondata[i].PHONE.indexOf('|') >= 0) {
                    var offs = jsondata[i].PHONE.split('|')

                    var PLAN_END_TIME = offs[0]
                    var PLAN_END_DATE = offs[1]
                    var OFFERED_DATE_FROM = offs[2];
                    var OFFERED_DATE_TO = offs[3];
                    var OFFERED_TIME_FROM1 = offs[4];
                    var OFFERED_TIME_FROM2 = offs[5];
                    var OFFERED_TIME_TO1 = offs[6]
                    var OFFERED_TIME_TO2 = offs[7]
                    //$('#OFDateH,#oftimeH2').show();
                    //$('#OFFdata').hide().val(OFFERED_DATE_FROM.substring(0, OFFERED_DATE_FROM.indexOf(" ") + 1)).after(OFFERED_DATE_FROM.substring(0, OFFERED_DATE_FROM.indexOf(" ") + 1));
                    //$('#OFTdata').hide().val(OFFERED_DATE_TO.substring(0, OFFERED_DATE_TO.indexOf(" ") + 1)).after(OFFERED_DATE_TO.substring(0, OFFERED_DATE_TO.indexOf(" ") + 1)).attr('checked', 'checked');
                    //$('#otf').hide().val(OFFERED_TIME_FROM1.substring(0, OFFERED_TIME_FROM1.lastIndexOf(':')) + ' - ' + OFFERED_TIME_FROM2.substring(0, OFFERED_TIME_FROM2.lastIndexOf(':'))).after(OFFERED_TIME_FROM1.substring(0, OFFERED_TIME_FROM1.lastIndexOf(':')) + ' - ' + OFFERED_TIME_FROM2.substring(0, OFFERED_TIME_FROM2.lastIndexOf(':')))

                    //$('#ott').hide().val(OFFERED_TIME_TO1.substring(0, OFFERED_TIME_TO1.lastIndexOf(':')) + ' - ' + OFFERED_TIME_TO2.substring(0, OFFERED_TIME_TO2.lastIndexOf(':'))).after(OFFERED_TIME_TO1.substring(0, OFFERED_TIME_TO1.lastIndexOf(':')) + ' - ' + OFFERED_TIME_TO2.substring(0, OFFERED_TIME_TO2.lastIndexOf(':')) + '</br></br>').attr('checked', 'checked');
                    $('#OFDateH,#OFFdata,#OFTdata,#oftimeH2,#otf,#ott').hide();
                    $('#UdoDataH').text('Планируемая дата выполнения')
                    $('#UdoVremyaH').text('Планируемое время выполнения')
                    $('#tmE').hide();
                    var po = $('#tmS').after()
                    document.getElementById('tmS').nextSibling.nodeValue = '';
                    document.getElementById('UdoVremyaH').nextSibling.nodeValue = '';
                    PLAN_END_DATE = PLAN_END_DATE.substring(0, PLAN_END_DATE.indexOf(' '))
                    PLAN_END_DATE = PLAN_END_DATE.replace('.', '-').replace('.', '-')
                    var date_ = PLAN_END_DATE.split('-')
                    // date_ = date_.substr(0, 10);
                    var year = date_[2];
                    var month = date_[1]
                    var day = date_[0];
                    date_ = year + "-" + month + "-" + day
                    $('#calen1').val(date_)
                    $('#calen1').css('margin-right', '5%').css('margin-left', '1%')
                    $('#tmS').css('margin-left', '1%');

                    var time = PLAN_END_TIME.split(':');
                    var hour = time[0];
                    var moniute = time[1]
                    time = hour + ':' + moniute
                    $('#tmS').val(time)



                }
                else {
                    // console.log("Phone yok")
                }
                var stVipol = sessionStorage.getItem("TRst")
                if (stVipol == "3" || stVipol == "5") {

                    $('#UdoDataH').text('Дата выполнеия заявки');
                    $('#UdoVremyaH').text('Время выполнения заявки');
                    var Done_Date = jsondata[i].FIRST_NAME.substring(0, jsondata[i].FIRST_NAME.indexOf(' '))
                    var Done_time = jsondata[i].FIRST_NAME.substring(jsondata[i].FIRST_NAME.indexOf(' ') + 1, jsondata[i].FIRST_NAME.length)
                    var date_ = Done_Date.split('.')
                    // date_ = date_.substr(0, 10);
                    var year = date_[2];
                    var month = date_[1]
                    var day = date_[0];
                    date_ = year + "-" + month + "-" + day
                    $('#calen1').val(date_)
                    var timeV = Done_time.split(':');
                    var hour = timeV[0];
                    var moniute = timeV[1]
                    timeV = hour + ':' + moniute
                    $('#tmS').val(timeV)
                }
                gtCommenstT(tr)
            }
        }
    })
}
function gtCommenstT(Rid_) {
    var objC = { "rid": Rid_ }
    $.ajax({
        type: "POST",
        url: "../Disp_Admin/CreateRequest.aspx/GetCommentsById",
        data: JSON.stringify(objC),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d);
            for (var i = 0; i < jsondata_.length; i++) {
                if (jsondata_[i].REQUEST_COMMENT_.indexOf('|') > 0) {
                    var rc = jsondata_[i].REQUEST_COMMENT_.substring(jsondata_[i].REQUEST_COMMENT_.indexOf('|') + 1, jsondata_[i].REQUEST_COMMENT_.length)
                    rc = JSON.parse(rc);
                    //  console.log(jsondata_)
                    $("#Room").val(rc[0].room)//indName
                    $("#Ind").val(rc[0].indName)
                    $("#Phn").val(rc[0].phon)
                    // getcurrdspObj(LogId, rc[0].Object_Id);
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
    // getCommentFiles(Rid_);
}
function GetTSelectedServ(R) {
    $("#PrService2").show();
    $("#PrService").show();
    $("#PrServiceH").show();
    var obj = { "R": R }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/getSelectedServT",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            $("#tblP th:eq(1)").remove();
            $("#tblP").show();
            //  console.log(jsondata_)
            for (var i = 0; i < jsondata_.length; i++) {
                // console.log(jsondata__[i].ACCOUNT_NAME)
                $("#PrService").append('<tr><td   itemid=' + jsondata_[i].SERVICE_ID + '> ' + jsondata_[i].SERVICE_NAME + '</td></tr>')




            }


        }

    })
}
function getTenantRequests(sc) {
    var ob = { "Score": sc }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/GetTenantRequestTable",
        data: JSON.stringify(ob),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata = JSON.parse(data.d)
            //FIRST_NAME-FIRST_NAME
            //ROOM_T-REQUEST_ID
            //ACCOUNT_NAME-CR_DATE
            //ROOM_NUMBER-STATUS
            //PHONE-STATUS_ID
            //INDIVIDUAL_ID-DONE_DATE

            for (var i = 0; i < jsondata.length; i++) {
                var don_date = (jsondata[i].INDIVIDUAL_ID == "") ? '--' : jsondata[i].INDIVIDUAL_ID
                $('#requestBody').append('<tr ><td><a onclick="SendId(' + jsondata[i].ROOM_T + ',' + jsondata[i].PHONE + ')" href="TRequest.aspx">' + jsondata[i].ROOM_T + '</a></td><td><a onclick="SendId(' + jsondata[i].ROOM_T + ',' + jsondata[i].PHONE + ')" href="TRequest.aspx">' + jsondata[i].ACCOUNT_NAME + '</a></td><td><a onclick="SendId(' + jsondata[i].ROOM_T + ',' + jsondata[i].PHONE + ')" class="adr0" href="TRequest.aspx"  >' + don_date + '</a></td><td><a onclick="SendId(' + jsondata[i].ROOM_T + ',' + jsondata[i].PHONE + ')" href="TRequest.aspx"  >' + jsondata[i].ROOM_NUMBER + '</a></td></tr>')
            }
        }
    })
}
function gtJStatuses() {
    var ob = { "Score": "as" }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/getStatuses",
        data: JSON.stringify(ob),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            // console.log(data)
            var jsondata_ = JSON.parse(data.d)
            // 

            for (var i = 0; i < jsondata_.length; i++) {
                if (jsondata_[i].STATUS_ID == 1 || jsondata_[i].STATUS_ID == 2 || jsondata_[i].STATUS_ID == 3 || jsondata_[i].STATUS_ID == 4 || jsondata_[i].STATUS_ID == 5) {
                    $("#Jsts").append('<option value="' + jsondata_[i].STATUS_ID + '">' + jsondata_[i].STATUS + '</option>')
                }

            }



        }

    })
    //getStatuses
    //$.ajax({
    //    type: "POST",
    //    url: "../ApiForPrivateOffice.aspx/getStatuses",

    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        console.log(data)
    //        var jsondata_ = JSON.parse(data.d)
    //        // console.log(jsondata_)

    //        for (var i = 0; i < jsondata_.length; i++) {

    //            if (jsondata_[i].STATUS_ID == 1 || jsondata_[i].STATUS_ID == 2 || jsondata_[i].STATUS_ID == 3 || jsondata_[i].STATUS_ID == 4 || jsondata_[i].STATUS_ID == 5) {
    //             $("#Jsts").append('<option value="' + jsondata_[i].STATUS_ID + '">' + jsondata_[i].STATUS + '</option>')
    //            }

    //        }
    //    },
    //    error: function (data) { console.log(data) }

    //})
}
function SaveRequest(ob) {
    // var obj = { "score": s }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/SaveRequest",
        data: JSON.stringify(ob),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata = JSON.parse(data.d);
            if (jsondata.result == "ok") {
                window.location.href = "TRegisterRequest.aspx";
            }
            else {
                alertPrivate("Ошибка", "Для вашего объекта не была выбрана диспетчерская. Обратитесь к управляющему.", "")
            }
        }
    })
}
function SendId(RId, st) {
    sessionStorage.setItem("TRst", st)
    sessionStorage.setItem("TRId", RId);
}
function alertPrivate(Header_, text_, footer_) {
    $("#mh2").text(Header_);
    $("#txt2").text(text_);
    $("#mf2").text(footer_)
    var modal = document.getElementById('myModal2');
    var span = document.getElementsByClassName("close_")[0];
    modal.style.display = "block";
    if (Header_ == "Ошибка") {

        $('#cls,#deleteO').hide();

    }
    $("#close_,#cls").click(function () {
        modal.style.display = "none";
    })
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
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
        $("#tmS").val(time).attr('min', time);
        time = (parseInt(hours) + 2) + ":" + minut
        $("#tmE").val(time)
    }
    if (h == "") {
        time = hours + ":" + minut
    }


    return time;
}
function getDate(s) {
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
    //  $('#calen1').attr('min', maxDate);
    if (s != "") {
        $('#calen1').val(maxDate);
    }
    else {
        return maxDate;
    }

    // $("#calen").

    return maxDate;


}
function getTenantDatas(s, selected) {
    var obj = { "score": s }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/getTenantDatas",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata = JSON.parse(data.d);
            var ADatas = jsondata.ADatas;
            $('.es-list').empty();
            for (var i = 0; i < ADatas.length; i++) {

                // $('#FirstN').append('<option data-num="' + ADatas[i].PHONE + '" value="' + ADatas[i].SHARE + '">' + ADatas[i].FIRST_NAME + '</option>')
                $('.es-list').append('<li class="es-visible" data-num="' + ADatas[i].PHONE + '" value="' + ADatas[i].SHARE + '" style="display: block;">' + ADatas[i].FIRST_NAME + '</li>')
            }
            //  $('#Phone').empty().val(ADatas[0].PHONE)
            var obj = jsondata.ObjDatas;
            $('#adres').val(obj[0].ObjectAdress).attr('itemid', obj[0].Object_Id)
            if (selected != "") {
                // $('#FirstN').val(selected)
                var textEs = $('ul.es-list:eq(0) li[value="' + selected + '"]').text()
                $('#FirstN').val(textEs).attr('disabled', 'disabled')
                $('#Phone').empty().val($('ul.es-list:eq(0) li[value="' + selected + '"]').attr('data-num')).attr('disabled', 'disabled')
            }
        }
    })
}
function RemoveRow(e) {
    var itemid = $(e).attr("itemid");
    var dtUrl = $(e).attr("data-url");//disabled or not
    var data = $(e).attr("data");
    $("#Servs").prepend('<label itemid="' + itemid + '" class="checkBx">' + data + '</label><input type="checkbox" data="' + data + '" data-url="' + dtUrl + '" itemid="' + itemid + '"  style="margin-left:5px">');
    $(e).closest('tr').remove();

    //  var total = $("#ItCost").val();
    //  var removedCost = $(e).closest('td').prev('td').text()
    //  total = total - removedCost
    //  //var stDost = $("#StDost").val()
    //  //total = parseInt(total) + parseInt(stDost)
    //  $("#ItCost").val(total);
    ////  console.log(total)
    // // 
    //  //  $(e).slideUp("slow", function () { $(e).closest("tr").remove() });
    //  $("#AddServices").prop("disabled", false)
    //  $(e).text("Добавить")
    //  $(e).attr('onclick', 'AddtoMain(this)')
    //  $(e).css("display", "block");
    //  var currentRow = $(e).closest('tr').clone()
    //  $(e).closest("tr").remove();
    //  $("#AddedTable").append(currentRow)
}
function ShowProducts() {

    $("#mh7").text("Выбор услуги/товара");

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
function getChecked() {
    $("#tblP").show();
    $("#PrServiceE").remove();
    $('#Servs input:checked').each(function () {
        var dtUrl = $(this).attr("data-url");//quantiti or not
        var dataName = $(this).attr("data");//servicetypeName_and Servis name
        var itemId = $(this).attr("itemid");//ServiceId
        $("#PrServiceH").show();
        $("#PrService").show();
        if (dtUrl == 1) {
            //onkeyup="multiPlaying(this,500)" <td  ><input type="text" onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" value="1"></td>
            $("#PrService").append('<tr><td itemid="' + itemId + '"> ' + dataName + '</td><td><button itemid="' + itemId + '" data="' + dataName + '" onclick="RemoveRow(this)" data-url="' + dtUrl + '" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</button></td></tr>')
        }
        if (dtUrl == 0) {
            /*<tr><td style="width: 500px;" itemid="11">Доступ - Одноразовый пропуск</td><td style="width: 70px;"><input disabled="disabled" type="text" value=""></td><td><button onclick="RemoveRow(this)" class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</button></td></tr>*/
            //<td  ><input disabled="disabled" type="text" value=""></td>
            $("#PrService").append('*<tr><td   itemid="' + itemId + '"> ' + dataName + '</td><td><button data-url="' + dtUrl + '" onclick="RemoveRow(this)" itemid="' + itemId + '" data="' + dataName + '"   class="btn delBtn"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Удалить</button></td></tr>')
        }
        $(this).remove();
        $('label[itemid="' + itemId + '"]').remove();
        $("#close_7").click();
    })
}
function GetProduct() {
    $.ajax({
        url: "../Disp_Admin/CreateRequest.aspx/GetProductServices",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            //  console.log(data);
            var jsondata = JSON.parse(data.d);
            var total = 0
            $("#Servs").empty();
            for (var i = 0; i < jsondata.length; i++) {


                if (jsondata[i].QUANTITY_IS == true) {
                    //$("#Servs").append('<input type="checkbox" data="' + jsondata[i].SERVICE_TYPE_NAME + '-' + jsondata[i].SERVICE_NAME + '" data-url="1" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left:5px"><label itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_TYPE_NAME + ' -' + jsondata[i].SERVICE_NAME + '</label>')
                    $('#Servs').append('<label itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_TYPE_NAME + ' -' + jsondata[i].SERVICE_NAME + '</label><input type="checkbox" data="' + jsondata[i].SERVICE_TYPE_NAME + '-' + jsondata[i].SERVICE_NAME + '" data-url="1" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left:5px"/>')
                }
                else {
                    //$("#Servs").append('<input type="checkbox" data="' + jsondata[i].SERVICE_TYPE_NAME + '-' + jsondata[i].SERVICE_NAME + '" data-url="0" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left:5px"><label itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_TYPE_NAME + ' -' + jsondata[i].SERVICE_NAME + '</label>')
                    $('#Servs').append('<label itemid="' + jsondata[i].SERVICE_ID + '" class="checkBx">' + jsondata[i].SERVICE_TYPE_NAME + ' -' + jsondata[i].SERVICE_NAME + '</label><input type="checkbox" data="' + jsondata[i].SERVICE_TYPE_NAME + '-' + jsondata[i].SERVICE_NAME + '" data-url="1" itemid="' + jsondata[i].SERVICE_ID + '"  style="margin-left:5px"/>')
                }


            }

            $("#ItCost").val(total)
        }
    })
}
function getObjAndManager(pth) {
    var obj = { "Pth": pth }
    $.ajax({
        type: "POST",
        url: "../ApiForPrivateOffice.aspx/GetObjAdr",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            //  console.log(result)
            var jsondata_1 = JSON.parse(result.d)
            //var jsondata_2 = JSON.parse(jsondata_1)

            for (var i = 0; i < jsondata_1.length; i++) {

                //console.log()//OBJECT_ID
                $(".adres").append('<span>' + jsondata_1[i].ObjectAdress + '</span>')
                $(".adres").attr('itemid', jsondata_1[i].Object_Id)
                document.title = jsondata_1[i].ObjectPhoto
                //Ваш управляющий-Варвара Сергеевна Плющ  >  8(903)002-03-01 >  upravdom@friend.me<
                $('#mngr').text('Ваш управляющий- ' + jsondata_1[i].KladrObjectId);
            }

        },

        error: function (r) {
            //alert("Error");
            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            alert("FAIL");
        }
    });
}
function removeFJ(num, e) {
    $(e).parent().remove();
    $('#files').show();
}
function SelectSmile(e) {
    $('#ssm').text('');
    if ($(e).attr('data-itm') == "good") {
        $('#ssm').text('Я доволен').css('color', 'green')
    }
    if ($(e).attr('data-itm') == "notbad") {
        $('#ssm').text('Неплохо').css('color', 'blue')
    }
    if ($(e).attr('data-itm') == "bad") {
        $('#ssm').text('Очень плохо').css('color', 'red')
    }
}