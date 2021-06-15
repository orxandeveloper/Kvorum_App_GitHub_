
$(function () {


    //if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "") {
    //    //window.location = 'https://upravbot.ru' + window.location.pathname + window.location.hash; if ((window.location.hostname.toLowerCase().indexOf('upravbot.ru') == -1) || (window.location.hostname.toLowerCase().indexOf('.24') != -1)) 
    //}
    //else {
    //    if ((window.location.hostname.toLowerCase().indexOf('upravbot.ru') == -1) || (window.location.hostname.toLowerCase().indexOf('.24') != -1)) {
    //        window.location = 'https://upravbot.ru' + window.location.pathname + window.location.hash;
    //    }

    //}

    $("#eml").click(function () {
        window.location = "mailto:help-desk@upravbot.ru"
    })

    //localStorage.setItem("CLient_Id","123")

    //  $("#EmailC").val($.cookie())
    //$("#lg1").click(function Goto() {// #lg2
    //  // window.location = window.location.host;

    //})
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
    $("#lg1,#lg2").attr("href", window.location.protocol + "//" + window.location.host + "/HomePage.aspx")
    var loc = window.location.pathname;
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


    function PersAcc_Check(Pers) {
        var obj = {
            pers: Pers,

        };
        $.ajax({
            type: "POST",
            url: "TenantLogin.aspx/CheckPers",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata = $.parseJSON(data.d);
                if (jsondata.result == 0) {
                    var lent = $("#Per_A_E").length
                    if ($("#Per_A_E").length == 0) {
                        $("#Per_A").after('<label id="Per_A_E" style="color:red">Извините, указанный лицевой счёт в системе не обнаружен</label><br/>')
                        $("#noC_per").show().attr('src', 'img/no.png');
                    }

                }
                else {
                    $("#Per_A_E +br").remove()
                    $("#Per_A_E").remove();
                    $("#noC_per").attr("src", "img/Äè.png").show();
                }
            }
        })
    }
    function Logtenant(ob, remember, sc) {
        //TenantLogin
        $.ajax({
            type: "POST",
            url: "TenantLogin.aspx/Logtenant",
            data: JSON.stringify(ob),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var jsondata = JSON.parse(data.d);

                console.log(jsondata.result)
                if (jsondata.result != 0) {
                    //console.log(jsondata.result)
                    if (remember == true) {
                        //var jsondatas = JSON.parse(ob)
                        console.log(ob.Score)
                        var adr = $("#adr").val();
                        setCookie(ob.Score, adr, ob.ObjId, ob.Room_Num, ob.PassT)
                    }
                    else {
                        document.cookie = "cookieObject={}";
                    }
                    sessionStorage.setItem("LogData", JSON.stringify(data))
                    //    var domain = window.location.protocol + '//' + window.location.host + '/' + jsondata.result.substring(0, jsondata.result.indexOf('.'))
                    //  domain = domain+"/MainPage.aspx"
                    sessionStorage.setItem("ExitPage", window.location.href);
                    window.location.href = "PersonalOffice/MainPage.aspx";
                }
                else {
                    alertMessage("Ошибка", "Пожалуйста, проверьте правильность введенных данных", "");
                }
            }
        })
    }
    function getObjectId(adres) {
        var obj = {
            adr: adres

        };
        $.ajax({
            type: "POST",
            url: "TenantLogin.aspx/getObjectId",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata = $.parseJSON(data.d);
                if (jsondata.result != 0) {
                    $("#adr").attr("itemid", jsondata.result);
                    $("#yesC_adr").show().attr("src", "img/Äè.png")
                }
                else {
                    $("#adr").attr("itemid", "0");
                    $("#yesC_adr").show().attr("src", "img/NO.png");
                    var Adr_E = $("#Adr_E").length;
                    if (Adr_E == 0) {
                        $("#adr").after('<label id="Adr_E" style="color:red">Пожалуйста, проверьте правильность введенных данных</label> <br/>')
                    }

                }

            }
        })
    }
    function getRmNumCOunt(objId) {
        var returnVal;
        var obj = {
            ObjId: objId

        };
        $.ajax({
            type: "POST",
            url: "TenantLogin.aspx/CheckRmNum",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                var jsondata = $.parseJSON(data.d);
                returnVal = jsondata.result;
            }
        })
        return returnVal;
    }
    if (loc == "/ClientLogin.aspx") {
        sessionStorage.clear();
        getCookie();
        $("#adr").keyup(function () {
            $("#adrS").hide();
            $("#yesC_adr").hide().attr("src", "img/NO.png");
            $("#Adr_E +br").remove();
            $("#Adr_E").remove();

            $("#adrList").empty();
            var adres = $("#adr").val();
            if (adres.length >= 4) {
                //console.log("""")
                var obj = { txt: adres, score: ($('#Per_A').val().length == 0) ? "0" : $('#Per_A').val() }
                $.ajax({
                    url: "TenantLogin.aspx/GetStreetsBytext",
                    data: JSON.stringify(obj),
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        // console.log(data);
                        var jsondata = JSON.parse(data.d);
                        //console.log(jsondata.d[0].CODE);
                        // console.log(data.d.CODE)
                        $.each(jsondata, function (key, value) {
                            var objA = value.ObjectAdress;
                            //if (objA.endsWith(', ') || objA.endsWith(',')) {
                            //    if (objA.endsWith(',')) {
                            //        objA.substring(0, objA.length-1)
                            //    }
                            //    if (objA.endsWith(', ')) {
                            //        objA.substring(0,objA.length-10)
                            //    }
                            //   // objA = value.ObjectAdress
                            //}
                            $("#adrList").append('<option value="' + objA + ' " itemid=' + value.Object_Id + ' ></option>')
                            // console.log(value.Name)
                        })
                    }
                })

            }
            else {
                $("#adrList").empty();
            }


        })//mustChange
        $("#Per_A").keyup(function () {
            $("#Per_A_E +br").remove()
            $("#Per_A_E").remove();
            $("#noC_per").hide().attr("src", "img/Äè.png");
        })
        $("#Per_A").blur(function () {
            if ($("#Per_A").val().length != 0) {
                PersAcc_Check($("#Per_A").val())
            }
        })
        $('#adr').blur(function () {
            var adr = $("#adr").val();
            if (adr.length != 0) {
                getObjectId(adr);
            }


        })

        //$("#adr,#rum_num").focus(function()
        //{
        //    PersAcc_Check($("#Per_A").val())
        //})
        //$("#rum_num").focus(function() {
        //    var adr = $("#adr").val();
        //    getObjectId(adr);
        //})
        $("#rum_num").keyup(function () {
            $("#rum_num_E +br").remove();
            $("#rum_num_E").remove();
            $('#errNum').remove();
            $('#yesC_rmnum').attr('src', 'img/Äè.png').hide();
        })

        $("#Ot").click(function () {
            // $("#lg1").click();
            window.location.href = "HomePage.aspx"
        })
        $("#LogTenant").click(function () {
            var noC_per = $("#noC_per").attr("src");
            if (noC_per == "img/Äè.png") {
                var Per_A = $("#Per_A").val()
                if (Per_A.length != 0) {
                    var ObjId = $("#adr").attr('itemid');
                    if (ObjId.length != 0 && $("#adr").val().length != 0) {
                        var rum_num = $("#rum_num").val();
                        if (rum_num.length != 0) {
                            var rm_NumCOunt = getRmNumCOunt(ObjId);
                            if (rm_NumCOunt != 0 && rm_NumCOunt != undefined) {
                                if ($('#PassT').val().trim().length != 0) {
                                    var rem;
                                    if ($('#chkC').is(':checked')) {
                                        rem = true

                                    }
                                    else {
                                        rem = false;
                                    }
                                    var obj = { "Score": Per_A, "ObjId": ObjId, "Room_Num": rum_num, "PassT": $('#PassT').val() };
                                    Logtenant(obj, rem, Per_A);
                                }
                                else {
                                    $('#NoPassT').remove();
                                    $('#PassT').before('<img src="img/no.png" style="width: 48px;position:absolute;right:-30px;"  id="NoPassT">')
                                    $('#errPassT').remove();
                                    $('#PassT').val('')
                                    $('#PassT').after('<label style="color:red" id="errPassT">Пожалуйста, заполните поле "Пароль"</label>')
                                    window.setTimeout(function () {
                                        $('#errPassT,#NoPassT').remove();
                                    }, 3000)
                                }
                            }
                            else {
                                $("#yesC_rmnum").attr("src", "img/NO.png").show();
                                $('#rum_num_E').remove();
                                // var rum_num_E = $("#rum_num_E").length;
                                //if (rum_num_E != 0) {
                                $("#rum_num").after('<label id="rum_num_E" style="color:red">Пожалуйста, проверьте правильность введенных данных</label><br/>')
                                //   }

                            }

                        }
                        else {
                            $("#yesC_rmnum").attr("src", "img/NO.png").show();
                            $("#rum_num").after('<label id="errNum" style="color:red">Пожалуйста, заполните поле "Номер помещения"</label>')
                        }

                    }
                    else {
                        $("#yesC_adr").attr("src", "img/NO.png").show();
                        $("#adr").after('<label id="Adr_E" style="color:red">Пожалуйста, заполните поле "Адрес"</label>')
                    }
                }
                else {
                    $('#noC_per').attr('src', 'img/NO.png');
                    $('#Per_A').after('<label id="Per_A_E" style="color:red">Пожалуйста, заполните поле "Номер лицевого счета"</label>')

                }
            }
            else {
                $("#noC_per").show();
            }
        })
    }
    if (loc == "/ClientLogin.aspx") {
        $("#Fpss").remove()
        //var input = document.getElementById("pasC");
        //input.addEventListener("keyup", function (event) {
        //    event.preventDefault();
        //    if (event.keyCode === 13) {
        //        document.getElementById("CLogin").click();
        //    }
        //}
        //)
        $(document).keyup(function (e) {
            if (e.key === 'Enter') {
                if ($('input[value="Client"]').prop('checked') == true) {
                    $('#CLogin').click();
                }
                else {
                    $('#LogTenant').click();
                }

            }
            if (e.key === 'Escape') {
                $('#myModal').hide();
            }
        })
        $("#close").click(function () {
            //window.location.href = "ClientLogin.aspx"
        })
        $("#ot").click(function () {

            window.location.href = "HomePage.aspx"
        })
        var modal = document.getElementById('myModal');
        modal.style.display = "none";

        //if (document.cookie != "")
        //{
        // getCookie();
        //$("#rem").hide();
        //  $("#chkC").prop("checked", true);
        $("#noC").attr("src", "img/Äè.png");
        $("#remC").hide();
        //}
        // else 
        //{



        //}
        $("#remeC").hide();
        function hasNumbers(t) {
            return /\d/.test(t);
        }
        $("#EmailC").keyup(function () {
            var email = $("#EmailC").val();
            if (isValidEmailAddress(email) || email.match(/Login_(\d+)$/)) {
                $("#noC").show().attr("src", "img/Äè.png");
                $("#regMail_").hide()
            }
            else {
                $("#noC").show().attr("src", "img/NO.png");
                $("#regMail_").text("Введенное значение не соответствует формату электронной почты или Логина").show();
            }
            //if (email == "Login_") {
            //    if (email.match(/Login_(\d+)$/))
            //    {
            //        $("#noC").show().attr("src", "img/Äè.png");
            //    $("#regMail_").hide()
            //    }
            //    else {
            //        $("#noC").show().attr("src", "img/NO.png");
            //   $("#regMail_").text("Введенное значение не соответствует формату Login_Id").show();
            //    }
            //}
            //else {
            //    if (isValidEmailAddress(email)) {
            //        $("#noC").show().attr("src", "img/Äè.png");
            //        $("#regMail_").hide()
            //    }
            //    else {
            //        $("#noC").show().attr("src", "img/NO.png");
            //        $("#regMail_").text("Введенное значение не соответствует формату электронной почты").show();
            //    }
            //}
        })
        $("#noC").hide();
        $("#yesC").hide();
        //$("#pasC").keyup(function ()
        //{
        //    var password = $("#pasC").val();
        //    //if (password.length > 5) {
        //    //   
        //    //}
        //    //else {
        //    //   
        //    //}
        //    if (password.length > 5) {
        //        $("#regPass_").hide();
        //        $("#yesC").show().attr("src", "img/Äè.png");
        //        var numbers_ = /[0-9]/g
        //        var upperCaseLetters = /[A-Z]/g;
        //        var lowerCaseLetters = /[a-z]/g;
        //        if (password.match(/[a-z]/g) || password.match(/[A-Z]/g) ) {
        //            $("#yesC").show().attr("src", "img/Äè.png");
        //            $("#regPass_").hide();
        //            //var hasDuplicates = (/([a-zA-Z])\1/i).test(password)
        //            //if (hasDuplicates) {//email.match(/Login_(\d+)$/)
        //            //    $("#regPass_").show();
        //            //    $("#regPass_").text("Пароль должен содержать символы в разных регистрах")
        //            //    $("#yesC").show().attr("src", "img/NO.png")
        //            //}
        //            //else {
        //            //    $("#yesC").show().attr("src", "img/Äè.png")
        //            //    $("#regPass_").hide();

        //            //}
        //            if (password.match(/(.)\1/)) {
        //                $("#regPass_").show();
        //                $("#regPass_").text("Пароль должен содержать символы в разных регистрах")
        //                $("#yesC").show().attr("src", "img/NO.png")
        //            }
        //            else {
        //                $("#yesC").show().attr("src", "img/Äè.png")
        //                $("#regPass_").hide();
        //            }
        //            if (password.match(numbers_) && password.match(upperCaseLetters) && password.match(lowerCaseLetters)) {
        //                $("#yesC").show().attr("src", "img/Äè.png")
        //                $("#regPass_").hide();
        //            }
        //            else {
        //                $("#regPass_").show();
        //                $("#regPass_").text("Пароль должен содержать символы в разных регистрах")
        //                $("#yesC").show().attr("src", "img/NO.png")
        //            }

        //        }
        //        else {
        //            $("#yesC").show().attr("src", "img/NO.png")
        //            $("#regPass_").text("Пароль должен содержать латинские символы и цифры").show();
        //        }
        //        if (!password.match(numbers_)) {
        //            $("#yesC").show().attr("src", "img/NO.png")
        //            $("#regPass_").text("Пароль должен содержать латинские символы и цифры").show();
        //        }
        //    }
        //    else {
        //       // $("#regPass_").text("Мало символов").show();
        //       // $("#yesC").show().attr("src", "img/NO.png")
        //    }
        //})
        $("#CLogin").click(function () {

            var email = $("#EmailC").val();
            var password = $("#pasC").val();

            var iconmail = $("#noC").attr("src");
            var iconPass = $("#yesC").attr("src");
            if ($('#EmailC').val().length != 0 && $('#pasC').val().length != 0) {
                if (iconmail == "img/Äè.png" && iconPass == "img/Äè.png") {

                    //if ($("#chkC").prop("checked") == true) {
                    //    setCookie(email, password)
                    //}
                    //else {
                    //   // document.cookie = "cookieObject={}";
                    //}

                    var obj = { "email_": email, "pass_": password }
                    $.ajax({
                        type: "POST",
                        url: "ClientLogin.aspx/LoginSystem",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {

                            // loading.show()
                            LoginProcedure(data, false)


                        },
                        error: function (r) {
                            alert(r.responseText)
                            console.log(r)
                        }



                    })
                }
            }
            else {
                alertMessage("Неудачное действие", "Пожалуйста, заполните логин и пароль", ":(")
            }


        })

        $("#regist1").hide();
        $("#reg").click(function () {

            $("#login1").hide('1000');
            $("#regist1").show('1000');
        })
        $("#Otreg").click(function () {

            $("#regist1").hide('1000');
            $("#login1").show('1000');

        })
        $("#provb").click(function () {
            var orgText = 1; //$('#org option:selected').val()
            var email = $("#mail").val();
            var password = $("#pass").val();
            var iconMail_ = $("#no").attr("src");
            var iconPass_ = $("#yes").attr("src");
            if (orgText != 0) {
                if (iconMail_ == "img/Äè.png" && iconPass_ == "img/Äè.png") {

                    var obj = { "mail": email, "TipOrg": orgText, "Pass": password }
                    $.ajax({
                        type: "POST",
                        url: "RegistCust.aspx/ControlAndSave",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            loading.show()
                            console.log(data.d)
                            var jsondata = $.parseJSON(data.d);
                            if (jsondata.result == 2) {
                                // alert("success")
                                var gui = jsondata.guid
                                var Id = jsondata.Id
                                var LogId = jsondata.logId
                                var body = mailBody(window.location.protocol + "//" + document.location.host + "/Client_Admin/CreateOpject.aspx?Id=" + Id + "&g=" + gui, LogId);
                                SendVerificationMail(email, body, "Подтверждение регистрации");//dingo
                            }
                            else if (jsondata.result == 1) {
                                loading.hide()
                                //alert("Данный e-mail уже зарегистрирован")
                                // alertMessage("Неудачное действие", "Данный e-mail уже зарегистрирован", ":(")
                            }

                        },
                        error: function (r) {
                            alert(r.responseText)
                            console.log(r)
                        }



                    })
                }
            }
            else {
                alertMessage("Не выбран", "Выберите тип организации", ":(")
            }
        })

    }
    function SendVerificationMail(Vmail, Vbody, them) {

        var obj = {
            mailto: Vmail,
            subject: them,
            body: Vbody
        };
        $.ajax({
            type: "POST",
            url: "ClientLogin.aspx/SendMail",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                // if result.d.Result != 0 then result.d.Result has error 
                loading.hide()
                // alert("Маил оправлена");
                alertMessage("Успешное действие", "На Ваш e-mail отправлено письмо", "Не забудьте проверить спам")

                // console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
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
    function mailBody(ssilka, lgId) {
        //var html_ = '<div align="center">    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0"><tr><td align="center" style="padding:50px; background-color:#81BEF7; color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-weight:bold"><center style="max-width: 300px; width: 100%; font-stretch:expanded"><span style="color:#000000">УПРАВБОТ</span><br />ПОДТВЕРЖДЕНИЕ РЕГИСТРАЦИИ</center></td></tr><tr><td align="left" style="padding:50px; background-color:#dbd4d4; color:#000000; font-family:Arial, Helvetica, sans-serif"><span style="color:#000000">Здравствуйте!</span> <br/><br />Вы успешно зарегистрировались на портале UPRAVBOT.RU! <br/><br />Для завершения регистрации нажмите на кнопку подтверждения.<br/><br /><table style="width:70%; height:40px"><tr><td style=" padding: 1px;margin:1px; background-color:#b6ff00 !important; color:#ffffff!important; width:250px; height:40px; text-align:center; vertical-align:middle; border-color:forestgreen; border-radius:8px; border:solid; border-width:1px; display:table-cell; cursor:pointer"><a href="' + ssilka + '" style="padding:30px; border-radius:8px; background-color:#81BEF7; color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-weight:bold;display:block">Login_' + Id + '</a></td></tr></table><br /><br />' + ssilka + '<br />С наилучшими пожеланиями, <br /><br /><b>Робот УПРАВБОТ</b>.<br /><br /></td></tr><tr><td align="center" style="padding:50px; background-color:#81BEF7; color:#000000; font-family:Arial, Helvetica, sans-serif; font-weight:bold"><center style="max-width: 300px; width: 100%;">Все права защищены<br /><span style="color:#ffffff"><img style="width: 25%;" src="../img/logo.png"/></span></center></td></tr></table></div>'
        //var html_ = '<div align="center"><table border= "0" cellpadding= "0" cellspacing= "0" style= "margin:0; padding:0; max-width:600px; width: 600px; font-family:Arial, Helvetica, sans-serif; font-size:16px;"><tr><td align="left" style="height: 36px;display:block; margin-top:10px;"><strong>Подтверждение регистрации</strong></td><td align="right" width="202" height="96" rowspan="2" style=""><img src="../img/upravbot.png" alt="лого УправБот"/></td></tr><tr><td><img src="../img/line.png" style="height:50px;display:block; width:100%;" alt=""/></td></tr><tr><td align="left" colspan="2" style="color:#000000; font-family:Arial, Helvetica, sans-serif"><p>Здравствуйте!</p><p>Пожалуйста, подтвердите регистрацию на портале виртуальной управляющей организации. </p><p>Нажмите здесь для подтверждения регистрации:</p><div style="margin:auto;background-color:#003e71; color:#ffffff; width:292px; text-align:center; vertical-align:middle;  cursor:pointer"><a href="' + ssilka + '" style="padding:30px; border-radius:8px; background-color:#81BEF7; color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-weight:bold;display:block">Login_'+Id+'</a></div><p><center><strong style="color:#003e71">' + ssilka + '</strong></center></p><p>Вы можете сменить пароль в настройках профиля.</p><p>Если вы получили это сообщение электронной почты по ошибке, просто удалите его.</p><p>Если у вас есть вопросы по поводу получения данного письма или любой другой проблемы, связанной с работой виртуальной управляющей организации, пожалуйста, обратитесь в тех-подержку: <a href="mailto:help-desk@upravbot.ru">help-desk@upravbot.ru</a>.</p><p><em>C уважением,<br/>Ваша Виртуальная управляющая организация</em>.</p></td></tr></table></div>'
        var html_ = '<div align="center"><table border= "0" cellpadding= "0" cellspacing= "0" style= "margin:0; padding:0; width: 600px;"><tr><td align="center" style="padding:50px;  font-family:Arial, Helvetica, sans-serif; font-weight:bold"><center style="max-width: 300px; width: 100%; font-stretch:expanded"><img style="width: 25%;" src="' + window.location.protocol + '//' + window.location.host + '/img/logo.png" /><br/>УПРАВБОТ<br/><h3>Подтверждение регистрации</h3></center></td></tr><tr><td align="left" style="padding-left:50px; padding-right:50px; font-family:Arial, Helvetica, sans-serif"><span style="color:#000000">Здравствуйте!</span><br/><br/>Вы успешно зарегистрировались на портале UPRAVBOT.RU!<br/><br/>Для завершения регистрации нажмите на кнопку подтверждения.<br/><br/><center><table style="width:70%; height:40px;"><tr><td style="background-color:#003e71; color:#ffffff; width:250px; height:40px; text-align:center; vertical-align:middle; display:table-cell; cursor:pointer;"><a href="' + ssilka + '" style="padding:30px; color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-weight:bold;display:block;">Login_' + lgId + '</a></td></tr></table></center><br/><br/>' + ssilka + '<br/><p>Вы можете сменить пароль в настройках профиля.</p><p>При возникновении вопросов по работе портала «УПРАВБОТ», пожалуйста, обратитесь в техподдержку: <a href="mailto:help-desk@upravbot.ru">help-desk@upravbot.ru</a></p><p>Если у вас есть вопросы по поводу получения данного письма или любой другой проблемы, связанной с работой виртуальной управляющей организации, пожалуйста, обратитесь в тех-подержку: <a href="mailto:help-desk@upravbot.ru">help-desk@upravbot.ru</a>.</p><p><em>C уважением,<br/>Ваш «УПРАВБОТ»</em>.</p><br/><br/></td></tr></table></div>';
        return html_;
    }
    if (loc == "/ForgotPass.aspx") {
        //  alert("awd")
        // alertMessage("awd","awd","awd")
        $("#goBack").click(function () {
            //CHeckMail
            window.location.href = "ClientLogin.aspx"
        })
        $("#close").click(function () {
            window.location.href = "ClientLogin.aspx"
        })
        $("#mail").keyup(function () {
            var emailVal = $("#mail").val();
            //CHeckMail(emailVal);
            if (isValidEmailAddress(emailVal)) {
                $("#noF").show().attr("src", "img/Äè.png");
                $("#regMail_F").hide()

            }
            else {
                $("#noF").show().attr("src", "img/NO.png");
                $("#regMail_F").text("Введенное значение не соответствует формату электронной почты").show();
            }
        })

        function VassBody(ssilka, lgId)//<a href="' + ssilka + '">нажмите здесь для подтверждения регистрации. </a>
        {
            var html_ = '<div align="center"><table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0; width: 600px;"><tr><td align="center" style="padding:50px;  font-family:Arial, Helvetica, sans-serif; font-weight:bold"><center style="max-width: 300px; width: 100%; font-stretch:expanded"><img style="width: 25%;" src="' + window.location.protocol + '//' + window.location.host + '/img/logo.png" /><br />УПРАВБОТ<br /><h3>Восстановление Пароля</h3></center></td></tr><tr><td align="left" style="padding-left:50px; line-height:2; padding-right:50px; font-family:Arial, Helvetica, sans-serif"><span style="color:#000000">Здравствуйте!</span><br /><br />Для восстановления пароля на портале «УПРАВБОТ»,пожалуйста,нажмите на кнопку:<br /><br /><br /><br /><center><table style="width:70%; height:40px;"><tr><td style="background-color:#003e71; color:#ffffff; width:250px; height:40px; text-align:center; vertical-align:middle; display:table-cell; cursor:pointer;"><a href="' + ssilka + '" style="padding:30px; color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-weight:bold;display:block;">Восстановить_пароль</a></td></tr></table></center><br /><br/>Или перейдите по ссылке ниже: <br />' + ssilka + '<br /><p>Вы можете сменить пароль в настройках профиля.</p><p>Если Вы не запрашивали восстановление пароля, просто проигнорируйте это сообщение.</p><p>При возникновении вопросов по работе портала «УПРАВБОТ», пожалуйста, обратитесь в техподдержку: <a href="mailto:help-desk@upravbot.ru">help-desk@upravbot.ru</a>.</p><p><em>C уважением,<br />Ваш «УПРАВБОТ».</em>.</p><br/><br/></td></tr></table></div>'
            return html_;
        }
        $("#sendVas").click(function () {
            loading.show();
            var emailVal = $("#mail").val();
            var obj = { "email_": emailVal }
            var err = $("#noF").attr("src");
            if (err != "img/NO.png") {
                $.ajax({

                    type: "POST",
                    url: "ForgotPass.aspx/GetMailGuidId",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var jsondata = $.parseJSON(data.d);
                        if (jsondata.result == 1) {
                            //$("#no").show().attr("src", "img/NO.png");
                            //$("#regMessage").show();
                            //$("#regMessage").text("Данный e-mail уже зарегистрирован в системе")
                            var gui = jsondata.Guid
                            var Id = jsondata.Id
                            var LGId = jsondata.Logid
                            var body = VassBody(window.location.protocol + "//" + document.location.host + "/ChangePass.aspx?Id=" + Id + "&g=" + gui, LGId);
                            SendVerificationMail(emailVal, body, "Восстановление Пароля");//dingo
                            loading.hide();
                        }
                        if (jsondata.result == 2) {
                            //$("#regMessage").hide();
                            //$("#no").show().attr("src", "img/Äè.png");
                            $("#noF").show().attr("src", "img/NO.png");
                            $("#regMail_F").text("Данный e-mail не зарегистрирован в системе").show();
                            loading.hide();
                        }
                    }
                })
            }

        })

        /* */
    }

    if (loc == "/ChangePass.aspx") {
        var Id = new URL(location.href).searchParams.get('Id');
        // Id = 214;
        if (Id == null) {
            //Id = sessionStorage.getItem("Clien_ID"); //Orxcan
            //// alert(Id)
            ////Id=197
            //if (Id == null) {
            window.location.href = 'AlertingError.aspx?reason=l'
            // }
        }

        $("#passCH").keyup(function () {
            var password = $("#passCH").val();
            //if (password.length > 5) {
            //   
            //}
            //else {
            //   
            //}
            if (password.length > 5) {
                $("#regPass_CH").hide();
                $("#noCH").show().attr("src", "img/Äè.png");
                var numbers_ = /[0-9]/g
                var upperCaseLetters = /[A-Z]/g;
                var lowerCaseLetters = /[a-z]/g;
                if (password.match(/[a-z]/g) || password.match(/[A-Z]/g)) {
                    $("#noCH").show().attr("src", "img/Äè.png");
                    $("#regPass_CH").hide();
                    //var hasDuplicates = (/([a-zA-Z])\1/i).test(password)
                    //if (!hasDuplicates) {//email.match(/Login_(\d+)$/)
                    //    $("#regPass_CH").show();
                    //    $("#regPass_CH").text("Пароль должен содержать символы в разных регистрах")
                    //    $("#noCH").show().attr("src", "img/NO.png")
                    //}
                    //else {
                    //    $("#noCH").show().attr("src", "img/Äè.png")
                    //    $("#regPass_CH").hide();
                    //}
                    if (password.match(/(.)\1/)) {
                        $("#regPass_CH").show();
                        $("#regPass_CH").text("Пароль должен содержать символы в разных регистрах")
                        $("#noCH").show().attr("src", "img/NO.png")
                    }
                    else {
                        $("#noCH").show().attr("src", "img/Äè.png")
                        $("#regPass_CH").hide();
                    }
                    if (password.match(numbers_) && password.match(upperCaseLetters) && password.match(lowerCaseLetters)) {
                        $("#noCH").show().attr("src", "img/Äè.png")
                        $("#regPass_CH").hide();
                    }
                    else {
                        $("#regPass_CH").show();
                        $("#regPass_CH").text("Пароль должен содержать символы в разных регистрах")
                        $("#noCH").show().attr("src", "img/NO.png")
                    }
                }
                else {
                    $("#noCH").show().attr("src", "img/NO.png")
                    $("#regPass_CH").text("Пароль должен содержать латинские символы и цифры").show();
                }
                if (!password.match(numbers_)) {
                    $("#noCH").show().attr("src", "img/NO.png")
                    $("#regPass_CH").text("Пароль должен содержать латинские символы и цифры").show();
                }
            }
            else {
                $("#regPass_CH").text("Данное поле должно содержать как минимум 6 символов").show();
                $("#noCH").show().attr("src", "img/NO.png")
            }
        })
        $("#RpasCH").keyup(function () {
            var previousPass = $("#passCH").val();

            if (previousPass == $("#RpasCH").val()) {
                $("#yesCH").attr("src", "img/Äè.png");
                $("#regPass2_CH").hide();
            }
            else {
                $("#yesCH").attr("src", "img/NO.png").show();
                $("#regPass2_CH").text("Пароли не совпадают").show();
            }
        })
        $("#btnCHang").click(function () {
            var iconPass1 = $("#noCH").attr("src")
            var iconPass2 = $("#yesCH").attr("src")
            var pass = $("#RpasCH").val();
            if (iconPass1 == "img/Äè.png" && iconPass2 == "img/Äè.png") {
                var obj = { "Id": Id, "Pass": pass }
                $.ajax({

                    type: "POST",
                    url: "ChangePass.aspx/ChangePass_",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var jsondata = $.parseJSON(data.d);
                        if (jsondata.result == 1) {
                            window.location.href = "ClientLogin.aspx"
                        }
                    }
                })
            }
        })
    }
    if (loc == '/Offer.aspx') {
        $('#LoginLk').attr('disabled', 'disabled');
        var guid = sessionStorage.getItem('guid');
        getDocs(guid)
        $('#LoginLk').click(function () {
            Change_Supplier_Offer(guid)
        })
    }

    function Change_Supplier_Offer(guid) {
        var obj = { "guid": guid }
        $.ajax({
            type: "POST",
            url: "Offer.aspx/Change_Supplier_Offer",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //   alertMessage("Попробуйте войти позднее.", "Личный кабинет для поставщиков услуг находится в разработке.", ":(")
                //var guid = jsondata.guid
                sessionStorage.setItem("guid_supp", guid)
                window.location.href = "../Supplier_Office/Requests.aspx"
            }
        })
    }
    function getDocs(guid) {
        var obj = { "guid": guid }
        $.ajax({
            type: "POST",
            url: "Offer.aspx/getDocs",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var j = JSON.parse(data.d);
                for (var i = 0; i < j.length; i++) {
                    //hr
                    var file_ = j[i].FILES
                    var format = file_.split('.').pop()

                    if (format == 'docx' || format == 'doc') {
                        $('#hr').after('<div id="ank" class="row" style="width:100%;min-width:100%;margin-top:26px;"><div class="col-sm-3 hidden-xs"></div><div class="col-sm-6 col-xs-12" style="text-align:center;"><h1 class="loginHeader">Анкета партнёра</h1></div><div class="col-sm-3 hidden-xs"></div></div>')
                        if (i == 0) {
                            $('#ank').after('<div class="row"><div class="container"><div id="step2" class="col-sm-3 col-xs-12"><h3>Шаг 2</h3></div></div></div>')
                        }
                        $('#step2').after('<div class="col-sm-6 col-xs-12 loginMain"><div class="row"><div class="col-lg-3"><img src="img/word.png" style="display: block; width: 96px; height: auto;"></div><div class="col-lg-9"><a id="WordDownload" href=' + window.location.protocol + '//' + window.location.host + '' + j[i].FILES + ' download class= "btn btn-default genBtn" type = "button" > Загрузить и прочитать</a > <br style="clear: both;"><br><input id="chkWord" type="checkbox" onclick=checkCheckBox(this,2) class="boxLogin"><label class="checkLogin">Актуальность и достоверность данных Анкеты подтверждаю.</label></div></div><!-- row --></div>')
                    }
                    if (format == 'xlsx' || format == 'xls') {
                        $('#hr').after('<div id="ank" class="row" style="width:100%;min-width:100%;margin-top:26px;"><div class="col-sm-3 hidden-xs"></div><div class="col-sm-6 col-xs-12" style="text-align:center;"><h1 class="loginHeader">Прайс партнёра</h1></div><div class="col-sm-3 hidden-xs"></div></div>')
                        if (i == 0) {
                            $('#ank').after('<div class="row"><div class="container"><div id="step2" class="col-sm-3 col-xs-12"><h3>Шаг 2</h3></div></div></div>')
                        }
                        $('#step2').after('<div class="col-sm-6 col-xs-12 loginMain"><div class="row"><div class="col-lg-3"><img src="img/excel.png" style="display: block; width: 96px; height: auto;"></div><div class="col-lg-9"><a href=' + window.location.protocol + '//' + window.location.host + '' + j[i].FILES + ' download class= "btn btn-default genBtn" type = "button" > Загрузить и прочитать</a > <br style="clear: both;"><br><input id="chkWord" onclick=checkCheckBox(this,3) type="checkbox" class="boxLogin"><label class="checkLogin">Актуальность и достоверность данных Анкеты подтверждаю.</label></div></div><!-- row --></div>')
                    }

                }
            }
        })

    }
    function DeleteCookie() {
        document.cookie = "";
    }

    function setCookie(sc, adres, objId, rimNum, pass) {

        //document.cookie = "MailC=" + mail;
        //document.cookie = "passC" + pass;
        //  document.cookie = "";
        var customObject = {};
        customObject.Score = sc
        customObject.adress = adres
        customObject.ObjId = objId
        customObject.rumNum = rimNum
        customObject.Pass = pass
        //document.cookie = "cok" + '=;'
        var expires = new Date();
        expires.setTime(expires.getTime() + 31536000000);
        var jsonString = JSON.stringify(customObject)
        document.cookie = "cookieObject=" + jsonString + ';expires=' + expires.toUTCString();




    }
    function getCookie() {

        var cookie = document.cookie;

        if (cookie != "" && cookie != undefined && cookie.indexOf('cookieObject') >= 0) {
            // var cookiValueArra = document.cookie.split("=");
            var cookieOb = cookie.substring(cookie.indexOf('cookieObject'), cookie.indexOf('}') + 1)
            cookieOb = cookieOb.substring(cookieOb.indexOf('{'), cookieOb.indexOf('}') + 1)
            var cookieJson = JSON.parse(cookieOb);
            //alert(cookieJson.mailC);
            //alert(cookieJson.passC);
            if (cookieJson.length != 0) {
                $("#Per_A").val(cookieJson.Score);
                $("#adr").val(cookieJson.adress).attr('itemid', cookieJson.ObjId);
                $("#rum_num").val(cookieJson.rumNum)
                $('#PassT').val(cookieJson.Pass);
            }
            //if ($("#pasC").val().length != 0) {
            //    $("#chkC").prop('checked', true);
            //}
            //else {
            //    $("#chkC").removeAttr('checked');
            //}
        }



    }


    $("#login").hide();
    $("#imgreen,#login").hover(function () {

        $("#login").show();
    }, function () { $("#login").hide() });

    $("#kl").click(function () {
        window.location.href = "ClientLogin.aspx";
    })
    $("#jl").click(function () {
        window.location.href = "TenantLogin.aspx"
    })


    var btnslide = $(".swiper-button-next");
    window.setInterval(function () { btnslide.click() }, "5000")


    $("#cui").hide();
    $("#cup").hide();
    $("#ui").hide();
    $("#up").hide();
    $("#cup").hover(function () {
        $(this).css("background-color", "silver")
        $("#cui_").css("background-color", "silver")
    }, function () {
        $(this).css("background-color", "white")
        $("#cui_").css("background-color", "white")
    })
    $("#up").hover(function () {
        $(this).css("background-color", "silver")
        $("#ui_").css("background-color", "silver")
    }, function () {
        $(this).css("background-color", "white")
        $("#ui_").css("background-color", "white")
    })

    $("#cup").click(function () {
        $("#org").text($("#cupt").text())
        localStorage.setItem('org', '1');
        console.log(localStorage.getItem('org'))
        $("#img_org").attr("src", "img/Çñ¼¿¡.png")
        localStorage.setItem('org', '1');
        $("#pnl").animate({ height: '51' })
        window.setTimeout(function () {

            $("#cui").hide();
            $("#cup").hide();
            $("#ui").hide();
            $("#up").hide();
        }, 300)
        $("#open_").css({
            "-moz-transition": "transform 1s",
            "-webkit-transition": ": transform 1s",
            " transition": "transform 1s",
            "transform": "rotate(0deg)"
        })
    })
    $("#up").click(function () {
        $("#org").text($("#upt").text())
        localStorage.setItem('org', '2');
        console.log(localStorage.getItem('org'))
        $("#img_org").attr("src", "img/¬½¿Ñ¡G.png")
        $("#pnl").animate({ height: '51' })
        localStorage.setItem('org', '2');
        window.setTimeout(function () {

            $("#cui").hide();
            $("#cup").hide();
            $("#ui").hide();
            $("#up").hide();
        }, 300)
        $("#open_").css({
            "-moz-transition": "transform 1s",
            "-webkit-transition": ": transform 1s",
            " transition": "transform 1s",
            "transform": "rotate(0deg)"
        })
    })
    localStorage.setItem('org', '0');

    $("#open_").click(function () {

        var heightpnl = $("#pnl").outerHeight()
        if (heightpnl < 141) {
            $("#pnl").animate({ height: '141px' })
            $("#cui").show();
            $("#cup").show().hover(function () { });
            $("#ui").show();
            $("#up").show();
            $(this).css({
                "-moz-transition": "transform 2s",
                "-webkit-transition": ": transform 2s",
                " transition": "transform 2s",
                "transform": "rotate(-180deg)"
            })
        }
        else {

            $("#pnl").animate({ height: '51px' })
            window.setTimeout(function () {

                $("#cui").hide();
                $("#cup").hide();
                $("#ui").hide();
                $("#up").hide();
            }, 300)
            $(this).css({
                "-moz-transition": "transform 1s",
                "-webkit-transition": ": transform 1s",
                " transition": "transform 1s",
                "transform": "rotate(0deg)"
            })
        }


    })

    $("#no").hide();
    $("#remind").hide();
    function CHeckMail(email1) {
        var obj = { "mail_": email1 }
        $.ajax({
            type: "POST",
            url: "RegistCust.aspx/CheckMail",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata = $.parseJSON(data.d);
                if (jsondata.result == 1) {
                    $("#no").show().attr("src", "img/NO.png");
                    $("#regMessage").show();
                    $("#regMessage").text("Данный e-mail уже зарегистрирован в системе")
                    $("#Fpss").remove();
                    $("#pass").after('<a id="Fpss" href="ForgotPass.aspx">Напомнить Пароль</a>')
                }
                if (jsondata.result == 2) {
                    $("#regMessage").hide();
                    $("#no").show().attr("src", "img/Äè.png");
                }
            }
        })
    }
    $("#mail").keyup(function () {
        // var iconmail = $("#mail").split("@").pop();
        var email = $("#mail").val();
        //  alertMessage("awd","ad","awd")
        if (isValidEmailAddress(email)) {

            $("#regMessage").hide();
            $("#no").show().attr("src", "img/Äè.png");
            CHeckMail(email)

        } else {
            $("#regMessage").text("Введенное значение не соответствует формату электронной почты")
            $("#regMessage").show();
            $("#no").show().attr("src", "img/NO.png");

        }

    })
    checkRepeat = function (str) {
        var repeats = /(.)\1/;
        return repeats.test(str)
    }
    function hasRepeatedLetters(str) {
        var patt = /^([a-z])\1+$/;
        var result = patt.test(str);
        return result;
    }

    $("#yes").hide();
    $("#pass").keyup(function () {
        var password = $("#pass").val();

        if (password.length > 5) {
            $("#regPass").hide();
            $("#yes").show().attr("src", "img/Äè.png")
            var numbers_ = /[0-9]/g
            var upperCaseLetters = /[A-Z]/g;
            var lowerCaseLetters = /[a-z]/g;
            if (password.match(/[a-z]/g) || password.match(/[A-Z]/g)) {
                $("#yes").show().attr("src", "img/Äè.png")
                $("#regPass").hide();
                //var hasDuplicates = (/([a-zA-Z])\1/i).test(password)
                //if (!hasDuplicates) {//email.match(/Login_(\d+)$/)
                //    $("#regPass").show();
                //    $("#regPass").text("Пароль должен содержать символы в разных регистрах")
                //    $("#yes").show().attr("src", "img/NO.png")
                //}
                //else {
                //    $("#yes").show().attr("src", "img/Äè.png")
                //    $("#regPass").hide();
                //}
                if (password.match(/(.)\1/)) {
                    $("#regPass").show();
                    $("#regPass").text("Пароль должен содержать символы в разных регистрах")
                    $("#yes").show().attr("src", "img/NO.png")
                }
                else {
                    $("#yes").show().attr("src", "img/Äè.png")
                    $("#regPass").hide();
                }
                if (password.match(numbers_) && password.match(upperCaseLetters) && password.match(lowerCaseLetters)) {
                    $("#yes").show().attr("src", "img/Äè.png")
                    $("#regPass").hide();
                }
                else {
                    $("#regPass").show();
                    $("#regPass").text("Пароль должен содержать символы в разных регистрах")
                    $("#yes").show().attr("src", "img/NO.png")
                }

            }
            else {
                $("#regPass").show();
                $("#regPass").text("Пароль должен содержать латинские символы и цифры")

            }
            if (!password.match(numbers_)) {
                $("#yes").show().attr("src", "img/NO.png")
                $("#regPass").text("Пароль должен содержать латинские символы и цифры")
            }

        }
        else {
            $("#regPass").show();
            $("#regPass").text("Данное поле должно содержать как минимум 6 символов")
            $("#yes").show().attr("src", "img/NO.png")
        }

    })
    var loading = $("#loader");
    loading.hide();


    var loc = window.location.pathname;

    if (loc == "/RegistCust.aspx") {

        //var modal = document.getElementById('myModal');
        //modal.style.display = "none";
        //function alertMessage(Header_, text_, footer_) {
        //    $("#mh").text(Header_);
        //    $("#txt").text(text_);
        //    $("#mf").text(footer_)
        //    var modal = document.getElementById('myModal');
        //    var span = document.getElementsByClassName("close")[0];
        //    modal.style.display = "block";
        //    $("#close").click(function () {
        //        modal.style.display = "none";
        //    })
        //    window.onclick = function (event) {
        //        if (event.target == modal) {
        //            modal.style.display = "none";
        //        }
        //    }
        //}



    }

    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress)
    }
    function isValidPassword(password_) {
        var pattern_ = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/i)
        return pattern_.test(password_)
    }
});
$(document).ready(function () {
    $('#idendityLogin').click();
})
$(window).load(function () {
    $('#idendityLogin').click();
})
function PopupSelect(Header_, link_, isTenant = false) {
    if (isTenant == false) {
        $("#mh2").text(Header_);
        var parsedLink = JSON.parse(link_)
        //console.log(parsedLink)href="' + parsedLink[i].Link_ + '"
        for (var i = 0; i < parsedLink.length; i++) {
            $(".modal-body2").append('<h3><a class="PageText" link="' + parsedLink[i].Link_ + '" role="' + parsedLink[i].role + '" onclick="SendToPage(this)" style="cursor:pointer">' + parsedLink[i].LinkText_ + '</a></h1><hr class="color-white"/>')
        }
        parsedLink = [];
        // console.log(parsedLink)
        var modal = document.getElementById('myModal2');
        var span = document.getElementsByClassName("close_")[0];
        modal.style.display = "block";
        $("#close_,#cls").click(function () {
            //modal.style.display = "none";
            ////link_.splice(0, link_.length)
            //// link_ = [];
            //// link_.pop();
            //$(".modal-body2").empty();
            window.location.href = 'https://upravbot.ru/IDS4/connect/endsession'
        })
    }
    else {
        Header_ = 'Привязывать лицевой счет к емейлу "' + isTenant + '"'
        $("#mh2").text(Header_);
        //  var parsedLink = JSON.parse(link_)
        if (link_.length > 0) {
            for (var i = 0; i < link_.length; i++) {
                $(".modal-body2").append('<h3><a class="PageText" onclick="GoToLk(\'' + link_[i].LOGIN + '\')" style="cursor:pointer"> Личный кабинет по лицевому счету "' + link_[i].LOGIN + '"</a></h1><hr class="color-white"/>')
            }
        }
        else {
            $(".modal-body2").append('<h5><a class="PageText"> Лицевой Счет</a> <input type="text" id="sc_C"></h5><h5><a class="PageText">Пароль</a> <input type="text" class="pwd" id="pwd_C"></h5>')
            $('.modal-footer2').append('<button class="btn3 btn1 h48 outline shadow-none" onclick="ConnectSc(\'' + isTenant+'\')" type="button" id="Ot"><span>Привязывать к емейлу</span></button>')
        }
        parsedLink = [];
        // console.log(parsedLink)
        var modal = document.getElementById('myModal2');
        var span = document.getElementsByClassName("close_")[0];
        modal.style.display = "block";
        $("#close_,#cls").click(function () {
            //modal.style.display = "none";
            ////link_.splice(0, link_.length)
            //// link_ = [];
            //// link_.pop();
            //$(".modal-body2").empty();
            window.location.href = 'https://upravbot.ru/IDS4/connect/endsession'
        })
    }

}
function LoginProcedure(data, isTenant) {
    console.log(data.d)

    if (isTenant == false) {
        var jsondata = $.parseJSON(data.d);
        // console.log(jsondata[0].ROLE_ID)
        if (jsondata.result == 'ErrorIdendity') {
            window.location.href = 'https://upravbot.ru/IDS4/connect/endsession'
        }
        if (jsondata.result == 3) {
            alertMessage("Неудачное действие", "Пожалуйста, подтвердите свою регистрацию по электронной почте", ":(")
        }
        if (jsondata.result == 1) {
            sessionStorage.setItem("Clien_ID", jsondata.Id)
            //sessionStorage.setItem("LLogId", jsondata.LogId)
            sessionStorage.setItem("Log", jsondata.LogId)
            var LinksTexs1 = []
            if (jsondata.RoleId == 4) {
                sessionStorage.setItem("Log", jsondata.LogId)
                sessionStorage.setItem("Clien_ID", jsondata.Id)
                window.location.href = "Client_Admin/RegisterUO.aspx";
                sessionStorage.setItem("role", jsondata.RoleId)
                //LinksTexs1.push({ "Link_": "Client_Admin/RegisterUO.aspx", "LinkText_": " На Страницу Администрирование" })
                //LinksTexs1.push({ "Link_": "/Manager/Apartments.aspx", "LinkText_": " На Страницу Профиль управляющего" })
                //LinksTexs1.push({ "Link_": "Disp_Admin/RegisterRequest.aspx", "LinkText_": " На Страницу Диспечерская" })
                //PopupSelect("Выберите Страницу", JSON.stringify(LinksTexs1))
            }
            if (jsondata.RoleId == 3) {
                sessionStorage.setItem("Log", jsondata.LogId)
                sessionStorage.setItem("Clien_ID", jsondata.Id)
                sessionStorage.setItem("role", jsondata.RoleId)
                window.location.href = "Disp_Admin/RegisterRequest.aspx";
            }
            if (jsondata.RoleId == 1) {
                sessionStorage.setItem("Log", jsondata.LogId)
                sessionStorage.setItem("Clien_ID", jsondata.Id)
                sessionStorage.setItem("role", jsondata.RoleId)
                window.location.href = "/Manager/Apartments.aspx";
                // alert("ok")
            }
            if (jsondata.RoleId == 15) {

                sessionStorage.setItem("Log", jsondata.LogId)
                sessionStorage.setItem("Clien_ID", jsondata.Id)
                sessionStorage.setItem("role", jsondata.RoleId)
                window.location.href = "/Supplier_Admin/SRequests.aspx"
            }

            if (jsondata.RoleId == 17) {

                sessionStorage.setItem("Log", jsondata.LogId)
                sessionStorage.setItem("Clien_ID", jsondata.Id)
                sessionStorage.setItem("role", jsondata.RoleId)
                window.location.href = "/Super_Disp/DispRequests.aspx"
            }

            if (jsondata.RoleId == 16) {

                sessionStorage.setItem("Log", jsondata.LogId)
                sessionStorage.setItem("Clien_ID", jsondata.Id)
                sessionStorage.setItem("role", jsondata.RoleId)
                window.location.href = "/Responsible_Admin/Resp_Requests.aspx"
            }
        }
        else if (jsondata.result == 2) {
            alertMessage("Неудачное действие", "Неправильное имя пользователя или пароль. Проверьте правильность введенных данных", ":(")
        }
        else if (jsondata[0].result == 5) {
            //alert('ok');
            var LinksTexs = []
            sessionStorage.setItem("Clien_ID", jsondata[0].Id)
            sessionStorage.setItem("Log", jsondata[0].LogId)
            for (var i = 0; i < jsondata.length; i++) {
                if (jsondata[i].ROLE_ID == 3) {
                    LinksTexs.push({ "Link_": "Disp_Admin/RegisterRequest.aspx", "LinkText_": " На Страницу Диспечерская", "role": jsondata[i].ROLE_ID })
                }
                if (jsondata[i].ROLE_ID == 4) {
                    LinksTexs.push({ "Link_": "Client_Admin/RegisterUO.aspx", "LinkText_": " На Страницу Администрирование", "role": jsondata[i].ROLE_ID })
                }
                if (jsondata[i].ROLE_ID == 1) {
                    LinksTexs.push({ "Link_": "/Manager/Apartments.aspx", "LinkText_": " На Страницу Профиль управляющего", "role": jsondata[i].ROLE_ID })
                }
                if (jsondata[i].ROLE_ID == 16) {
                    LinksTexs.push({ "Link_": "/Responsible_Admin/Resp_Requests.aspx", "LinkText_": " На Страницу Профиль Ответственного", "role": jsondata[i].ROLE_ID })
                }
                if (jsondata[i].ROLE_ID == 17) {
                    LinksTexs.push({ "Link_": "/Super_Disp/DispRequests.aspx", "LinkText_": " На Страницу Супер Диспечерская", "role": jsondata[i].ROLE_ID })
                }
            }
            PopupSelect("Выберите Страницу", JSON.stringify(LinksTexs))
        }
        else if (jsondata.result == '10.0') {
            var guid = jsondata.guid
            sessionStorage.setItem('guid', guid)
            window.location.href = 'Offer.aspx'
        }
        else if (jsondata.result == '11.1') {
            //alertMessage("Попробуйте войти позднее.", "Личный кабинет для поставщиков услуг находится в разработке.", ":(")
            var guid = jsondata.guid
            sessionStorage.setItem("guid_supp", guid)
            window.location.href = "../Supplier_Office/Requests.aspx"
        }
    }
    else {
     
        PopupSelect("По какому лицевому счету?", JSON.parse(data.d), isTenant)
    }

}
function GoToLk(ls) {
   
    var encrypted = CryptoJS.AES.encrypt(ls, "UprovLk");
    console.log("encrypted: "+encrypted.toString());
 
    window.location.href = window.location.protocol + '//' + window.location.host + "/personaloffice/MainPage.aspx?id=" + encrypted;
    ////"http://localhost:54622/PersonalOffice/MainPage.aspx?id=" + encrypted
   
}
function ConnectSc(isTenant) {

    var sc_C = $('#sc_C').val().trim()
    var pwd_C = $('#pwd_C').val().trim()
    if (sc_C.length != 0 && pwd_C.length != 0) {
        var obj = { sc_C: sc_C, pwd_C: pwd_C, device_id: isTenant}
        $.ajax({
            type: "POST",
            url: "ClientLogin.aspx/ConnectLs",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jdata = JSON.parse(data.d);
                if (jdata[0].errNo== 0 && jdata[0].result== 'Success') {
                    $('#errNo').remove()
                    var sc_C = $('#sc_C').val()
                    GoToLk(sc_C)
                   // $('.modal-body2').after('<label id="errNo">' + jdata[0].errMsg+'</label>')
                }
            }
        })
    }
    else {
        $('#sc_C,#pwd_C').attr('placeholder','Необходимо заполнить')
    }
}
function IdendityLogin() {
    //  var hdnSession = $('#hdnSession').attr('value')
    //console.log('hdnSession: ' + hdnSession);
    var cookie = document.cookie;

    console.log(cookie)
    cookie = cookie.substring(cookie.indexOf('mycookie='))//cookie.substring(cookie.indexOf('=') + 1)//cookie.substring(cookie.indexOf('{'))
    cookie = cookie.substring(cookie.indexOf('{'))
    cookie = JSON.parse(cookie);
    //console.log(LoginId)
    //console.log();

    console.log(cookie)
    var isTenant = 'rol' in cookie ? false : true
    // console.log('isTenant: '+ isTenant)
    /*
     tenantJson

'{ "sub": "2a13b585-80d6-4d5c-a459-ead705f8df32", "family_name": "\u041A\u043E\u0437\u043B\u043E\u0432", "website": "http://lk.upravbot.ru:55555/CoreApi/api/v2/", "name": "\u041A\u043E\u043D\u0441\u0442\u0430\u043D\u0442\u0438\u043D", "given_name": "\u0412\u043B\u0430\u0434\u0438\u043C\u0438\u0440\u043E\u0432\u0438\u0447", "preferred_username": "kozlov@live.ru", "email": "kozlov@live.ru", "email_verified": true, "phone_number": "\u002B79169002210", "phone_number_verified": true }'
      */
    /*
     LoginJson
     '{"sub":"66878f52-5a05-40ad-9bb6-3c4a4a78651b","website":"http://lk.upravbot.ru:55555/CoreApi/api/v2/","email_verified":["true",true],"email":"amirov@matorin-un.ru","name":"Login_856","rol":"Internal","preferred_username":"Login_856"}'
      */
    var obj = { "Id_": cookie.preferred_username, "isTenant": isTenant }//"Login_726"
    $.ajax({
        type: "POST",
        url: "ClientLogin.aspx/LoginIdentity",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            isTenant = (isTenant == true) ? cookie.preferred_username : isTenant
            LoginProcedure(data, isTenant)
        },
        error: function (r) {
            window.location.href = 'https://upravbot.ru/IDS4/connect/endsession'

        }
    })


}
function goToLogin() {
    window.location.href = "ClientLogin.aspx";
}
function checkCheckBox(e, num) {
    var allchecked = true
    $('input[type="checkbox"]').each(function () {
        if ($(this).prop('checked') == false) {
            allchecked = false
        }
    })
    if (allchecked == true) {
        $('#LoginLk').removeAttr('disabled')
    }
    else {
        $('#LoginLk').attr('disabled', 'disabled')
    }
}
function selectLogin(e) {
    var value = $(e).val();
    if (value == "Client") {
        console.log("clcl")
        $("#clLog").show('1000');
        $("#clLog2").show('1020');
        $("#clLogbtns").show('1030');
        $('#tenantLog').hide('1040');
        $('#tenantLog2').hide('1060');
        $('#tenantBtns').hide('1050');
    }
    if (value == "Tenant") {
        $("#clLog").hide('1000');
        $("#clLog2").hide('1020');
        $("#clLogbtns").hide('1030');
        $('#tenantLog').show('1040');
        $('#tenantLog2').show('1060');
        $('#tenantBtns').show('1050');
    }
}
function SendToPage(e) {
    var linkAdress = $(e).attr('link')
    var role = $(e).attr('role')
    sessionStorage.setItem('role', role)
    window.location.href = linkAdress
}
