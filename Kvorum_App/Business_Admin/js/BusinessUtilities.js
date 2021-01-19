$(function () {
    var loc = window.location.pathname;
    $("#loader").hide();
   
    if (loc == "/Business_Admin/CreateOrg.aspx") {
        //alert(loc)
        var ClId = sessionStorage.getItem("Clien_ID")//localStorage.setItem("Clien_ID", jsondata.Id)
        //var clId2 = localStorage.getItem("Clien_ID2")//localStorage.setItem("Clien_ID2", Id)
        //ClId = (ClId != null) ? ClId : clId2
        // alert(ClId);
        if (ClId == null) {
            window.location.href = 'Client_Admin/AlertingError.aspx?reason=l'
        }
        $("#backUo").click(function ()
        {
            window.location.href = 'Client_Admin/RegisterUO.aspx'
        })
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
        $("#INN").keypress(validateNumber);
        $("#OGRN").keypress(validateNumber);
        $("#OKPO").keypress(validateNumber);
        $("#KPP").keypress(validateNumber);
        $("#RS").keypress(validateNumber);
        $("#BKRS").keypress(validateNumber);
        $("#bik").keypress(validateNumber);

        $("#adr").keyup(function () {
            $("#adrList").empty();
            var adres = $("#adr").val();
            if ($("#manu").is(":checked")) {

            }
            else {
                if (adres.length >= 4) {
                    ////console.log("""")
                    var obj = { txt: adres }

                    $.ajax({
                        url: "/Client_Admin/CreateOpject.aspx/GetStreetsBytext",
                        data: JSON.stringify(obj),
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            // //console.log(data);
                            var jsondata = JSON.parse(data.d);
                            ////console.log(jsondata.d[0].CODE);
                            // //console.log(data.d.CODE)
                            $.each(jsondata, function (key, value) {
                                $("#adrList").append('<option value="' + value.Name + ' " itemid=' + value.CODE + '></option>')
                                // //console.log(value.Name)
                            })
                        }
                    })

                }
                else {
                    $("#adrList").empty();
                }
            }

        })
        $("#bik").keyup(function () {
            var bik_ = $(this).val();
            if (bik_.length == 9) {
                var obj = { BIK: bik_ };
                $.ajax({
                    type: "POST",
                    url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/GetBankByBIK",
                    data: JSON.stringify(obj),
                    contentType:"application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        ////console.log(JSON.stringify(result))
                        //console.log(result);
                        var jsondata = JSON.stringify(result.ResultData)
                        var jsondata_ = JSON.parse(jsondata)
                        $("#BNAME").val(jsondata_.BNAME)
                        $("#BKRS").val(jsondata_.BKRS)
                       
                    }
                })
            }
        })

        var UoId = sessionStorage.getItem("UOID");
        if (UoId == "" || UoId == null || UoId == undefined) {
            $("#DeleteUO").hide();
            $("#SaveMO").click(function () {
                // alertMessage("""","""","""")
                var Inn_ = ($("#INN").val() != null) ? $("#INN").val() : "";
                var OGRN_ = $("#OGRN").val();
                var Name_ = $("#NAME").val();
                var KPP_ = $("#KPP").val();
                var OKPO_ = $("#OKPO").val();
                var adr_ = ($("#adr").val() != null) ? $("#adr").val() : null;

                var adrCode_;
                var adrtext_;
                var DOM_ = $("#DOM").val();
                var KORP_ = ($("#KORP").val().length != 0) ? "K. " + $("#KORP").val() : "";
                if (adr_ != "") {
                    if ($("#manu").is(":checked")) {
                        adrtext_ = adr_ + ", Д. " + DOM_ + ", " + KORP_;
                        adrCode_ = "";
                        //alert(adrtext_);

                    }
                    else {
                        adrtext_ = adr_ + ", Д. " + DOM_ + ", " + KORP_;
                        adrCode_ = $("#adrList option[value='" + $('#adr').val() + "']").attr('itemid')
                        if (adrCode_ == undefined) {
                            adrCode_ = ""
                        }
                        // alert(adrtext_ + "  CODE : " + adrCode_)
                    }
                }


                var BIK_ = ($("#bik").val() != null) ? $("#bik").val() : "";
                var BNAME_ = ($("#BNAME").val() != null) ? $("#BNAME").val() : "";
                var BKRS_ = ($("#BKRS").val() != null) ? $("#BKRS").val() : "";
                var RS_ = ($("#RS").val() != null) ? $("#RS").val() : "";
                var tlf_ = ($("#tlf").val() != null) ? $("#tlf").val() : "";
                var mail_ = ($("#mail").val() != null) ? $("#mail").val() : "";
                var vk_ = ($("#vk").val() != null) ? $("#vk").val() : "";
                var ok_ = ($("#ok").val() != null) ? $("#ok").val() : "";
                var fb_ = ($("#fb").val() != null) ? $("#fb").val() : "";
                var tw_ = ($("#tw").val() != null) ? $("#tw").val() : "";
               // var adrkod_j;
                if (OGRN_.trim() == "" || Name_.trim() == "" || KPP_.trim() == "" || OKPO_.trim() == "") {
                    alertMessage("Поле оставлено пустым", "Не оставляйте отмеченные поля пустыми", ":(")
                }
                else {
                    if (Inn_.length == 10) {

                        if (OKPO_.length == 8 || OKPO_.length == 10) {
                            if (KPP_.length == 9) {
                                if (OGRN_.length == 13 || OGRN_.length == 15) {
                                    //or
                                    if (BIK_.length == 9) {
                                        if (RS_.length == 20) {
                                            if (BKRS_.length == 20) {
                                                var obj = {
                                                    MAN_COMPANY_ID: null,
                                                    INN: Inn_,
                                                    KPP: KPP_,
                                                    OKPO: OKPO_,
                                                    OGRN_OGRNIP: OGRN_,
                                                    NAME: Name_,
                                                    LICENCE: "No Lic",
                                                    ADRESS_ID: adrCode_, //CODE from autocomplete
                                                    ADRESS: adrtext_,
                                                    PHONE: tlf_,
                                                    EMAIL: mail_,
                                                    VK: vk_,
                                                    OK: ok_,
                                                    FB: fb_,
                                                    TW: tw_,
                                                    CLIENT_ID: ClId,
                                                    BIK: BIK_,
                                                    BNAME: BNAME_,
                                                    BKRS: BKRS_,
                                                    RS: RS_,
                                                    action: "0" // 0-insert, 1-update, 2-delete
                                                };
                                                //alert(JSON.stringify(obj))

                                                $("#loader").show();
                                                $.ajax({
                                                    type: "POST",
                                                    url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/AddEditDelUO",
                                                    data: JSON.stringify(obj),
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: "json",
                                                    success: function (result) {

                                                        // alert("OK. See Console -  press F12");
                                                        alertMessage("Операция прошла успешно", "Добавление Управляюшего Организаций Успешно", ":)")
                                                        //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                                                        $("#loader").hide();
                                                        $("#bik").val('');
                                                        $("#BNAME").val('');
                                                        $("#BKRS").val('');
                                                        $("#RS").val('');
                                                        $("#tlf").val('');
                                                        $("#mail").val('');
                                                        $("#vk").val('');
                                                        $("#ok").val('');
                                                        $("#fb").val('');
                                                        $("#tw").val('');
                                                        $("#OGRN").val('');
                                                        $("#NAME").val('');
                                                        $("#KPP").val('');
                                                        $("#OKPO").val('');
                                                        $("#adr").val('');


                                                        $("#DOM").val('');
                                                        $("#KORP").val();
                                                    },

                                                    error: function (r) {
                                                        ////alert("Error");
                                                        alertMessage("Oшибка", "Не удалось выполнить операцию", ":(")
                                                        //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                                                        $("#loader").hide();
                                                    },
                                                    failure: function (r) {
                                                        // alert("FAIL");
                                                        alertMessage("Oшибка", "Не удалось выполнить операцию", "Fail")
                                                        $("#loader").hide();
                                                    }
                                                })
                                            }
                                            else {
                                                alertMessage("", "Меньше символов Корреспондентский счет", ":(")
                                            }
                                        }
                                        else {
                                            alertMessage("", "Меньше символов Расчетный счет", ":(")
                                        }
                                    }
                                    else {

                                        alertMessage("", "Меньше символов БИК", ":(")
                                    }
                                }
                                else {
                                    alertMessage("", "Меньше символов ОГРН", ":(")
                                }
                            }
                            else {
                                alertMessage("", "Меньше символов КПП", ":(")
                            }
                        }
                        else {
                            alertMessage("", "Меньше символов ОКПО", ":(")
                        }
                    }
                    else {
                        alertMessage("", "Меньше символов ИНН", ":(")
                    }


                }

            })
        }
        else {
            $("#SaveMO").text("Обновить");
            getDetailUO()
            $("#SaveMO").click(function () {
                // alertMessage("""","""","""")
                var Inn_ = ($("#INN").val() != null) ? $("#INN").val() : "";
                var OGRN_ = $("#OGRN").val();
                var Name_ = $("#NAME").val();
                var KPP_ = $("#KPP").val();
                var OKPO_ = $("#OKPO").val();
                var adr_ = ($("#adr").val() != null) ? $("#adr").val() : null;

                var adrCode_;
                var adrtext_;
                var DOM_ = $("#DOM").val();
                var KORP_ = ($("#KORP").val().length != 0) ? "K. " + $("#KORP").val() : "";
                if (adr_ != "") {
                    if ($("#manu").is(":checked")) {
                        adrtext_ = adr_ + ", Д. " + DOM_ + ", " + KORP_;
                        adrCode_ = "";
                        //alert(adrtext_);

                    }
                    else {
                        adrtext_ = adr_ + ", Д. " + DOM_ + ", " + KORP_;
                        adrCode_ = $("#adrList option[value='" + $('#adr').val() + "']").attr('itemid')
                        if (adrCode_ == undefined) {
                            adrCode_ = ""
                        }
                        // alert(adrtext_ + "  CODE : " + adrCode_)
                    }
                }


                var BIK_ = ($("#bik").val() != null) ? $("#bik").val() : "";
                var BNAME_ = ($("#BNAME").val() != null) ? $("#BNAME").val() : "";
                var BKRS_ = ($("#BKRS").val() != null) ? $("#BKRS").val() : "";
                var RS_ = ($("#RS").val() != null) ? $("#RS").val() : "";
                var tlf_ = ($("#tlf").val() != null) ? $("#tlf").val() : "";
                var mail_ = ($("#mail").val() != null) ? $("#mail").val() : "";
                var vk_ = ($("#vk").val() != null) ? $("#vk").val() : "";
                var ok_ = ($("#ok").val() != null) ? $("#ok").val() : "";
                var fb_ = ($("#fb").val() != null) ? $("#fb").val() : "";
                var tw_ = ($("#tw").val() != null) ? $("#tw").val() : "";
                 
                if (OGRN_.trim() == "" || Name_.trim() == "" || KPP_.trim() == "" || OKPO_.trim() == "") {
                    alertMessage("Поле оставлено пустым", "Не оставляйте отмеченные поля пустыми", ":(")
                }
                else {
                    if (Inn_.length == 10) {

                        if (OKPO_.length == 8 || OKPO_.length == 10) {
                            if (KPP_.length == 9) {
                                if (OGRN_.length == 13 || OGRN_.length == 15) {
                                    //or
                                    if (BIK_.length == 9) {
                                        if (RS_.length == 20) {
                                            if (BKRS_.length == 20) {
                                                var obj = {
                                                    MAN_COMPANY_ID: UoId,
                                                    INN: Inn_,
                                                    KPP: KPP_,
                                                    OKPO: OKPO_,
                                                    OGRN_OGRNIP: OGRN_,
                                                    NAME: Name_,
                                                    LICENCE: "No Lic",
                                                    ADRESS_ID: adrCode_, //CODE from autocomplete
                                                    ADRESS: adrtext_,
                                                    PHONE: tlf_,
                                                    EMAIL: mail_,
                                                    VK: vk_,
                                                    OK: ok_,
                                                    FB: fb_,
                                                    TW: tw_,
                                                    CLIENT_ID: ClId,
                                                    BIK: BIK_,
                                                    BNAME: BNAME_,
                                                    BKRS: BKRS_,
                                                    RS: RS_,
                                                    action: "1" // 0-insert, 1-update, 2-delete
                                                };
                                                //alert(JSON.stringify(obj))

                                                $("#loader").show();
                                                $.ajax({
                                                    type: "POST",
                                                    url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/AddEditDelUO",
                                                    data: JSON.stringify(obj),
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: "json",
                                                    success: function (result) {

                                                        // alert("OK. See Console -  press F12");
                                                        // alertMessage("Операция прошла успешно", "Добавление Управляюшего Организаций Успешно", ":)")
                                                        window.location.href ="Client_Admin/RegisterUO.aspx"
                                                        //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                                                        $("#loader").hide();
                                                        $("#bik").val('');
                                                        $("#BNAME").val('');
                                                        $("#BKRS").val('');
                                                        $("#RS").val('');
                                                        $("#tlf").val('');
                                                        $("#mail").val('');
                                                        $("#vk").val('');
                                                        $("#ok").val('');
                                                        $("#fb").val('');
                                                        $("#tw").val('');
                                                        $("#OGRN").val('');
                                                        $("#NAME").val('');
                                                        $("#KPP").val('');
                                                        $("#OKPO").val('');
                                                        $("#adr").val('');


                                                        $("#DOM").val('');
                                                        $("#KORP").val();
                                                    },

                                                    error: function (r) {
                                                        ////alert("Error");
                                                        alertMessage("Oшибка", "Не удалось выполнить операцию", ":(")
                                                        //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                                                        $("#loader").hide();
                                                    },
                                                    failure: function (r) {
                                                        // alert("FAIL");
                                                        alertMessage("Oшибка", "Не удалось выполнить операцию", "Fail")
                                                        $("#loader").hide();
                                                    }
                                                })
                                            }
                                            else {
                                                alertMessage("", "Меньше символов Корреспондентский счет", ":(")
                                            }
                                        }
                                        else {
                                            alertMessage("", "Меньше символов Расчетный счет", ":(")
                                        }
                                    }
                                    else {

                                        alertMessage("", "Меньше символов БИК", ":(")
                                    }
                                }
                                else {
                                    alertMessage("", "Меньше символов ОГРН", ":(")
                                }
                            }
                            else {
                                alertMessage("", "Меньше символов КПП", ":(")
                            }
                        }
                        else {
                            alertMessage("", "Меньше символов ОКПО", ":(")
                        }
                    }
                    else {
                        alertMessage("", "Меньше символов ИНН", ":(")
                    }


                }

            })
             
            $("#DeleteUO").click(function ()
            {
                alertWithButton("Вы Уверены,", "Вы уверены, что хотите удалить этот " + $("#NAME").val() + " Управляющие организацию?", "awd")
            });
            $("#deleteUO").click(function () {
                var obj = {
                    MAN_COMPANY_ID: UoId,
                    
                    action: "2" // 0-insert, 1-update, 2-delete
                };
                //alert(JSON.stringify(obj))

                $("#loader").show();
                $.ajax({
                    type: "POST",
                    url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/AddEditDelUO",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        // alert("OK. See Console -  press F12");
                        // alertMessage("Операция прошла успешно", "Добавление Управляюшего Организаций Успешно", ":)")
                        window.location.href = "Client_Admin/RegisterUO.aspx"
                        //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                     
                    },

                    error: function (r) {
                        ////alert("Error");
                        alertMessage("Oшибка", "Не удалось выполнить операцию", ":(")
                        //console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        $("#loader").hide();
                    },
                    failure: function (r) {
                        // alert("FAIL");
                        alertMessage("Oшибка", "Не удалось выполнить операцию", "Fail")
                        $("#loader").hide();
                    }
                })
            })
        }
       
       

        
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
    function getDetailUO()
    {
        var obj = {
            id: UoId
        };
        
        $.ajax({
            type: "POST",
            url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/GetUO",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //console.log(result)
                var jsondata_1 = JSON.stringify(result.ResultData)
                var jsondata_2 = JSON.parse(jsondata_1)
                

                $("#INN").val(jsondata_2.UOS[0].INN);
                $("#OGRN").val(jsondata_2.UOS[0].OGRN_OGRNIP);
                $("#NAME").val(jsondata_2.UOS[0].NAME);
                $("#KPP").val(jsondata_2.UOS[0].KPP);
                $("#OKPO").val(jsondata_2.UOS[0].OKPO);
 

                $("#adr").val(jsondata_2.UOS[0].ADRESS);
                var dom_ = $("#adr").val().substring($("#adr").val().lastIndexOf("Д. ") + 1, $("#adr").val().lastIndexOf(",")).replace('.', '').replace(' ', '');
                var korp_ = $("#adr").val().substring($("#adr").val().lastIndexOf(".") + 1, $("#adr").val().lastIndexOf("")).replace('.', '').replace(' ', '');
                $("#adr").val(jsondata_2.UOS[0].ADRESS.substring(0, jsondata_2.UOS[0].ADRESS.indexOf('Д')).replace(',', ''));
                $("#DOM").val(dom_);
                $("#KORP").val(korp_);

                $("#bik").val(jsondata_2.UOS[0].BANK_BIK);
                $("#BNAME").val(jsondata_2.UOS[0].BANK_NAME);
                $("#BKRS").val(jsondata_2.UOS[0].BANK_KRS);
                $("#RS").val(jsondata_2.UOS[0].RS);
                $("#tlf").val(jsondata_2.UOS[0].PHONE);
                $("#mail").val(jsondata_2.UOS[0].EMAIL);
                $("#vk").val(jsondata_2.UOS[0].VK);
                $("#ok").val(jsondata_2.UOS[0].OK);
                $("#fb").val(jsondata_2.UOS[0].FB);
                $("#tw").val(jsondata_2.UOS[0].TW);
                //console.log(jsondata_2.UOS[0].ADRESS_ID)

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

    
    if (loc == "/Business_Admin/CreateAccount.aspx")
    {
        //alert(loc)
        var ClId = sessionStorage.getItem("Clien_ID")//localStorage.setItem("Clien_ID", jsondata.Id)
        //var clId2 = localStorage.getItem("Clien_ID2")//localStorage.setItem("Clien_ID2", Id)
        //ClId = (ClId != null) ? ClId : clId2
        // alert(ClId);
        if (ClId == null) {
            window.location.href = 'Client_Admin/AlertingError.aspx?reason=l'
        }
        getRole();
        $("#CreateAcc").click(function ()
        {
            //var roltext = $("#role").val();

           // alert(roltext)
            var email = $("#email").val();
            var pass = $("#pass").val();
            var fio = $("#fio").val();
            var phone = $("#phone").val();
            if (isValidEmailAddress(email)) {
                if (pass.length != 0) {
                    if (pass.length>5) {
                        var numbers_ = /[0-9]/g
                        var upperCaseLetters = /[A-Z]/g;
                        var lowerCaseLetters = /[a-z]/g;
                        if (pass.match(numbers_) && pass.match(upperCaseLetters) && pass.match(lowerCaseLetters)) {
                            if (fio.length != 0) {
                                if (phone.length!=0) {

                                }
                                else {
                                    alertMessage("Пустые место осталось", "Не оставляйте поле Мобильный телефон пустым", ":(")
                                }
                           
                            }
                            else {
                                alertMessage("Пустые место осталось", "Не оставляйте поле Наименование (Ф.И.О.) пустым", ":(")
                            }
                        }
                        else {
                            alertMessage("Неправильный формат", "Пароль должен состоять, как минимум,из 6 символов. В пороле должны присустствовать символы латинского алфавита и цифры.Пароль должен содержать хотя бы по одному символу в верхнем и нижнем регитсре", ":(")
                        }
                    }
                    else {
                        alertMessage("Пароль слишком низкий", "Пароль должен состоять, как минимум,из 6 символов.", ":(")
                    }
                }
                else {
                    alertMessage("Пустые место осталось", "Не оставляйте поле пароль пустым", ":(")
                }
            }
            else {
                alertMessage("Неправильный формат", "Введите правильный формат электронной почты", ":(")
            }
        });
        $("#gen").click(function ()
        {
            $("#pass").empty();
            var bigCases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            var smallCases = "abcdefghijklmnopqrstuvwxyz"
            var numbers = "0123456789";
            var BigRand = bigCases[Math.floor(Math.random() * bigCases.length)];
            
            var smallRand = smallCases[Math.floor(Math.random() * smallCases.length)];
             
            var numbRand;
            for (var i = 0; i < 6; i++) {
                numbRand +=  numbers[Math.floor(Math.random() * numbers.length)];
            }
            var GenPas = BigRand + smallRand + numbRand.replace(/undefined/g, '')
            $("#pass").attr('type','text')
            $("#pass").val(GenPas)
             
        })
        
        //getModulById()
         

    }
    $("#role").change(function ()
    {
        var Id_ = $("#role").val();
        $("#modul").empty();
        getModulById(Id_)
       
    })

    function getRole()
    {
        $.ajax({
            type: "POST",
            url: "Business_Admin/CreateAccount.aspx/GetRoles",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                //console.log(result)
             
                var jsondata_1 = JSON.parse(result.d)
                for (var i = 0; i < jsondata_1.length; i++) {
                    //console.log(jsondata_1[i].ROLE_NAME)
                    $("#role").append('<option value="' + jsondata_1[i].ROLE_ID+ '">' + jsondata_1[i].ROLE_NAME+ '</option>')
                }
                getModulById(jsondata_1[0].ROLE_ID)
                 
                
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
    function getModulById( ID_)
    {
       // var Id_ = $("#role").val();
        var obj = { "Id": ID_}
        $.ajax({
            type: "POST",
            url: "Business_Admin/CreateAccount.aspx/GetModulById",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //var jsondata_ = JSON.parse(data.d)
                //if (jsondata_.result == 1) {
                //    //alert(jsondata_.idObject+" success")
                //    var idObject_ = jsondata_.idObject
                //    addDomain(idObject_)
                //    // alert("success")

                //}
                var jsondata_ = JSON.parse(data.d)
                ////console.log("hello "+jsondata_[0].MODUL_NAME)
                $("#modul").append('<option value="' + jsondata_[0].MODUL_NAME+'">' + jsondata_[0].MODUL_NAME+'</option>')

            }

        })
    }
    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress)
    }
   // $("#myModal").hide();
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

})