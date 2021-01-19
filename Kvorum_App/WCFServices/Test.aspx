<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Test.aspx.cs" Inherits="WcfServices.Test" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <script src="logger.js"></script>

    <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css"
rel = "Stylesheet" type="text/css" /> 



     <style type="text/css">
    input {
        width : 200px;
        padding : 5px;
        margin : 5px;
    }
        .ui-autocomplete { 
            cursor:pointer; 
            height:200px; 
            overflow-y:scroll;
        }    
        .autocomplete-w1 { background:url(img/shadow.png) no-repeat bottom right; position:absolute; top:0px; left:0px; margin:6px 0 0 6px; /* IE6 fix: */ _background:none; _margin:1px 0 0 0; }
        .autocomplete { border:1px solid #999; background:#FFF; cursor:default; text-align:left; max-height:350px; overflow:auto; margin:-6px 6px 6px -6px; /* IE6 specific: */ _height:350px; _margin:0; _overflow-x:hidden; }
        .autocomplete .selected { background:#F0F0F0; }
        .autocomplete div { padding:2px 5px; white-space:nowrap; overflow:hidden; }
        .autocomplete strong { font-weight:normal; color:#3399FF; }
         .auto-style1 {
             height: 23px;
         }
  </style>
    <title>TEST PAGE</title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <table border="1" style="width:100%;">
                <tr>
                    <td rowspan="3">&nbsp;</td>
                    <td rowspan="3">&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td class="auto-style1"></td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                </tr>
            </table>
            <form id="moneta" method="post" action="https://demo.moneta.ru/assistant.htm">
<input type="hidden" name="MNT_ID" value="35732551"/>
<input type="hidden" name="MNT_AMOUNT" value="100"/>
<input type="hidden" name="paymentSystem.unitId" value="1015"/>
<input type="submit" value="Оплатить заказ"/>
</form>

            <form method="post" action="https://demo.moneta.ru/assistant.htm">
 <input type="hidden" name="MNT_ID" value="35732551"/>
 <input type="hidden" name="MNT_TRANSACTION_ID" value="154_111222333444"/>
 <input type="hidden" name="MNT_CURRENCY_CODE" value="RUB"/>
 <input type="hidden" name="MNT_AMOUNT" value="120.25"/>
 <input type="hidden" name="MNT_TEST_MODE" value="0"/>
 <input type="hidden" name="paymentSystem.unitId" value="317"/>
 <input type="hidden" name="MNT_SUCCESS_URL"
 value="https://www.matorin-un.ru/success.htm"/>
 <input type="hidden" name="MNT_FAIL_URL"
 value="https://www.matorin-un.ru/failure.htm"/>
 <input type="hidden" name="MNT_RETURN_URL"
 value="https://www.matorin-un.ru/payment.htm"/>
 <input type="hidden" name="MNT_INPROGRESS_URL"
 value="https://www.matorin-un.ru/processing.htm"/>
 <input type="hidden" name="MNT_CUSTOM1" value="1234567890"/>
 <input type="hidden" name="MNT_CUSTOM2" value="abcdefghij"/>
 <input type="hidden" name="MNT_CUSTOM3" value="somebody@somewhere.com"/>
 <input type="submit" value="Pay order"/>
</form>

<iframe src="https://demo.moneta.ru/assistant.widget?MNT_ID=35732551&MNT_TRANSACTION_ID=114_312123&MNT_CURRENCY_CODE=RUB&MNT_AMOUNT=999">
   Ваш браузер не поддерживает плавающие фреймы!
</iframe>

        </div>
        <input id="btnVersion" type="button" value="VERSION" />
        <input id="btnLog" type="button" value="SAVE LOG" />
        <input id="btnGetLog" type="button" value="GET LOG" />

        <table>
            <tr>
                <td>
                    <input id="Button13" type="button" value="Get_question OK" />
        <br/>
                    <input id="Button12" type="button" value="New_answer_add OK" />
                    <br/>
                    <input id="Button11" type="button" value="New_question_add OK" />
                    <br/>
                    <input id="Button10" type="button" value="Get_question_list OK" />
                    <br />
                    <input id="Button9" type="button" value="Show_news OK" />
                    <br/>
                    <input id="Button8" type="button" value="Get_news_feed OK" />
                    <br/>
        <input id="Button7" type="button" value="Get_payments_list OK" />
        <br />
        <input id="Button0" type="button" value="Get_request_list OK" />
        <br />
        <input id="Button1" type="button" value="New_request_add OK" />
        <input id="Button999" type="button" value="New_Request_add2 OK" />
        <br />
        <input id="Button2" type="button" value="Get_service_list OK" />
        <br />
        <input id="Button3" type="button" value="Meter_value_add OK" />
        <br />
        <input id="Button4" type="button" value="Get_meter_list OK" />
        <br />
        <input id="Button5" type="button" value="Get_object OK" />
        <br />
        <input id="Button6" type="button" value="Auth OK" />
                    </td>
                <td>
        <input id="Button33" type="button" value="Get_question Error" />
        <br/>
        <input id="Button32" type="button" value="New_answer_add Error" />
                    <br/>
                    <input id="Button31" type="button" value="New_question_add Error" />
                    <br/>
                    <input id="Button30" type="button" value="Get_question_list Error" />
                    <br/>
                    <input id="Button29" type="button" value="Show_news Error" />
                    <br/>
                    <input id="Button28" type="button" value="Get_news_feed Error" />
        <br />
        <input id="Button27" type="button" value="Get_payments_list Error" />
        <br />
        <input id="Button20" type="button" value="Get_request_list Error" />
        <br />
        <input id="Button21" type="button" value="New_request_add Error" />
        <br />
        <input id="Button22" type="button" value="Get_service_list Error" />
        <br />
        <input id="Button23" type="button" value="Meter_value_add Error" />
        <br />
        <input id="Button24" type="button" value="Get_meter_list Error" />
        <br />
        <input id="Button25" type="button" value="Get_object Error" />
        <br />
        <input id="Button26" type="button" value="Auth Error" />
                    <br />
        <input id="Button300" type="button" value="PAYMENT" />
                    
                </td>
                <td><div id="resulter"></div></td>
                </tr>
            </table>

        <input id="Button66" type="button" value="SendMail" />
        <input id="mailo" type="email" value="@matorin-un.ru" />
        <asp:TextBox ID="txtSearch" runat="server"></asp:TextBox>
        &nbsp;<input id="txtCode" type="text" value=""/>
        <br/>
        <input id="Button77" type="button" value="AddDomain OK" />
        <br/>
        <input id="DelDomain" type="button" value="DelDomain OK" />
        <br/>
        <br/>
        <input id="Button101" type="button" value="AddEditDelDisp OK" />
        <input id="INPUT_ACTION" name="INPUT_ACTION" value="0"  type="number" step="1" min="0" max="2"/>
        <br/>

        <br/>
        <input id="Button102" type="button" value="AddEditDelUO OK" />
        <input id="INPUT_ACTION2" name="INPUT_ACTION2" value="0"  type="number" step="1" min="0" max="2"/>
        <br/>
        <input id="Button111" type="button" value="GetUOList OK" />
        <br />
        <input id="Button113" type="button" value="GetUO OK" />
        <br/>
        <input id="Button112" type="button" value="GetOBJList OK" />
        <br/>
        <input id="Button114" type="button" value="GetOBJ OK" />
        <br/>
        <br/>
        <input id="Button116" type="button" value="GetACCList OK" />
        
        
        <br/>
        <br/>
        <input id="filer" type='file' onchange="readURL(this);" />
        <img id="img" src="#" alt="Изображение" />
        <input id="btnUpload" type="button" value="Upload Image" />

        <br/>
        <input id="Button103" type="button" value="GetBankByBIK OK" />
        <input id="Button120" type="button" value="GetRequestsNew OK" />

        
        <div id="tabs">
    <ul>
        <li><a href="#tabs-1">Tab 1</a></li>
        <li><a href="#tabs-2">Tab 2</a></li>
        <li><a href="#tabs-3">Tab 3</a></li>
    </ul>
    <div id="tabs-1">Content 1</div>
    <div id="tabs-2">Content 2</div>
    <div id="tabs-3">Content 3</div>
</div>
    </form>
</body>
    <script lang="javasccript">
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#img')
                        .attr('src', e.target.result)
                        .height(200);
                };

                reader.readAsDataURL(input.files[0]);
            }
        };
        
        jQuery(document).ready(function ($) {
            window.onbeforeunload = function (e) {
                e.returnValue = "Подтвержения перехода со страницы.";
            }
            
            $(function () {
                $("#tabs").tabs();
            });

            $("#txtSearch").autocomplete({
                source: function (request, response) {
                    console.log(request);
                    var obj = {
                        prefix : request.term,
                        code: "6600000100000"
                    };
                    $.ajax({
                        url: "Constructor_API.svc/GetStreets",
                        data: JSON.stringify(obj),
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            console.log(data);
                            response($.map(data.GetStreetsResult, function (item) {
                                return {
                                    label: item.split('|')[0],
                                    val: item.split('|')[1]
                                }
                            }))
                        },
                        error: function (response) {
                            alert(response.responseText);
                        },
                        failure: function (response) {
                            alert(response.responseText);
                        }
                    });
                },
                select: function (e, i) {
                    $("#txtCode").val(i.item.val);
                },
                minLength: 0,
                maxHeight: 400, // Максимальная высота списка подсказок, в пикселях
                width: 300, // Ширина списка
                zIndex: 9999, // z-index списка
                deferRequestBy: 0
                ,scroll: true
            });
        }).focus(function () {
            $(this).autocomplete("search", "");
        });

        // var formData = new FormData();

        $(function () {
            $("#btnUpload").click(function () {
                
                var formData = new FormData();
                var file = document.getElementById("filer").files[0]; // <input id="filer" type='file'/>

                formData.append('tokenid', '12312312-12312312-3-1');
                formData.append('sign', '1');
                formData.append('file', file, file.name);
                

                console.log(formData);

                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/UploadFile",
                    data: formData,
                    type: 'POST',
                    contentType: "multipart/form-data",
                    processData: false, 
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
            $("#btnLog").click(function () {
                SaveLog("TEST", "HIGH", "DISP", "CLIENT ADMIN", "Test message", "Login_Admin");
            });
            $("#btnGetLog").click(function () {
                GetLog("TEST", "DISP", "CLIENT ADMIN");
            });

            //MATORIN.QUICK_API.svc/GRL2/tokenID=C21314A9-09D9-F89D-4325-818E0069F145
            $("#Button120").click(function () {
                var obj = {
                    token_ID: 'C21314A9-09D9-F89D-4325-818E0069F145'
                };
                alert(JSON.stringify(obj));

                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/GRL2",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
            $("#Button116").click(function () {
                var obj = {
                    client_id: 221
                };
                alert(JSON.stringify(obj));

                $.ajax({
                    type: "POST",
                    url: "Constructor_API.svc/GetACCList",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });

            $("#Button300").click(function () {
                var obj = {
                    tokenID: "263487EA-4370-55D6-4325-7E840037341C",
                    AMOUNT: "287.00",
                    MONTH: "12",
                    YEAR: "2017",
                    CUSTOM: "customdata",
                    MODE: "REALPAY"
                };
                alert(JSON.stringify(obj));

                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/Payment",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });

            $("#Button112").click(function () {
                var obj = {
                    client_id: 1
                };
                alert(JSON.stringify(obj));

                $.ajax({
                    type: "POST",
                    url: "Constructor_API.svc/GetOBJList",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });

            $("#Button114").click(function () {
                var obj = {
                    id: 1
                };
                alert(JSON.stringify(obj));

                $.ajax({
                    type: "POST",
                    url: "Constructor_API.svc/GetOBJ",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });


            $("#Button111").click(function () {
                var obj = {
                    client_id: 1                    
                };
                alert(JSON.stringify(obj));

                $.ajax({
                    type: "POST",
                    url: "Constructor_API.svc/GetUOList",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });

            $("#Button113").click(function () {
                var obj = {
                    id: 112
                };
                alert(JSON.stringify(obj));

                $.ajax({
                    type: "POST",
                    url: "Constructor_API.svc/GetUO",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },
                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });

            $("#Button101").click(function () {
                var obj = {
                    disp_id: $("#INPUT_ACTION").val(),
                    client_id: 1,
                    disp_name: "TestDiaspatcer",
                    disp_phone_number : "89009998877" ,
                    disp_icon: null,
                    objects: "1,23,4,2", // id's objects divided by,  etc. 11,22,33,44
                    man_comp_id: 1,
                    action: $("#INPUT_ACTION").val()
                };
                alert(JSON.stringify(obj));

                $.ajax({
                    type: "POST",
                    url: "Constructor_API.svc/AddEditDelDisp",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
            $("#Button102").click(function () {
                var obj = {
                    MAN_COMPANY_ID: $("#INPUT_ACTION").val(),
                     INN : "111222333",
                     KPP : "23232",
                     OKPO : "333444",
                     OGRN_OGRNIP : "4455",
                     NAME : "Test UO",
                     LICENCE : "No Lic",
                     ADRESS_ID : null, //CODE from autocomplete
                     ADRESS : "Moscow, Lenin's str, b. 5",
                     PHONE : "(112)33344455",
                     EMAIL : "vasya@petya.com",
                     VK : "vk",
                     OK : "ok",
                     FB : "fb",
                     TW : "tweet",
                     CLIENT_ID : 1,
                     BIK: "040037470",
                     BNAME : null,
                     BKRS : null,
                     RS : "4010000055003223",
                     action: $("#INPUT_ACTION").val() // 0-insert, 1-update, 2-delete
                };
                alert(JSON.stringify(obj));

                $.ajax({
                    type: "POST",
                    url: "Constructor_API.svc/AddEditDelUO",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
            $("#Button103").click(function () {
                var obj = {
                    BIK: "040037470"                    
                };
                alert(JSON.stringify(obj));

                $.ajax({
                    type: "POST",
                    url: "Constructor_API.svc/GetBankByBIK",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });

            $("#Button13").click(function () {
                var obj = {
                    question_id: 682
                };
                alert(JSON.stringify(obj));
                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/Get_question",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
            ///WCFServices/Constructor_API.svc

            $("#Button66").click(function () {
                var obj = {
                    mailto : $("#mailo").val(),
                    subject : "ТестТема",
                    body: '<div align="center">    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0"><tr><td align="center" style="padding:50px; background-color:#81BEF7; color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-weight:bold"><center style="max-width: 300px; width: 100%; font-stretch:expanded"><span style="color:#000000">УПРАВБОТ</span><br />ПОДТВЕРЖДЕНИЕ РЕГИСТРАЦИИ</center></td></tr><tr><td align="left" style="padding:50px; background-color:#dbd4d4; color:#000000; font-family:Arial, Helvetica, sans-serif"><span style="color:#000000">Здравствуйте!</span> <br/><br />Вы успешно зарегистрировались на портале UPRAVBOT.RU! <br/><br />Для завершения регистрации нажмите на кнопку подтверждения.<br/><br /><table style="width:70%; height:40px"><tr><td style=" padding: 1px;margin:1px; background-color:#b6ff00 !important; color:#ffffff!important; width:250px; height:40px; text-align:center; vertical-align:middle; border-color:forestgreen; border-radius:8px; border:solid; border-width:1px; display:table-cell; cursor:pointer"><a href="www.google.com" style="padding:30px; border-radius:8px; background-color:#81BEF7; color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-weight:bold;display:block">Подтвердить!</a></td></tr></table><br /><br />С наилучшими пожеланиями, <br /><br /><b>Робот УПРАВБОТ</b>.<br /><br /></td></tr><tr><td align="center" style="padding:50px; background-color:#81BEF7; color:#000000; font-family:Arial, Helvetica, sans-serif; font-weight:bold"><center style="max-width: 300px; width: 100%;">Все права защищены<br /><span style="color:#ffffff">УПРАВБОТ</span></center></td></tr></table></div>'
                };
                alert(JSON.stringify(obj));
                
                $.ajax({
                    type: "POST",
                    url: "Constructor_API.svc/SendMail",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });

            //MATORIN.QUICK_API.svc/NRA2/tokenID=C21314A9-09D9-F89D-4325-818E0069F145/phone_number=/description=/work_kind=316AF570-1988-B925-4325-80F90041EDCE/files=/workdate=/workbegin=/workend=
            $("#Button999").click(function () {
                $.ajax({
                    type: "POST",
                    //url: "MATORIN.QUICK_API.svc/NRA2/tokenID=C21314A9-09D9-F89D-4325-818E0069F145/phone_number=777/description=222/work_kind=316AF570-1988-B925-4325-80F90041EDCE/files=23/workdate=20171010/workbegin=11-11/workend=11-55",
                    url: "MATORIN.QUICK_API.svc/NRA2?tokenID=C21314A9-09D9-F89D-4325-818E0069F145/phone_number=543534543/description=34534534534.+%0A+%0A32423423/work_kind=602A3DD6-F10F-10E2-4325-80F9006E3260/files=__DEFAULT_VALUE__/workdate=__DEFAULT_VALUE__/workbegin=__DEFAULT_VALUE__/workend=__DEFAULT_VALUE__/destination=%D0%A0%D0%B0%D0%B1%D0%BE%D1%82%D0%B0",
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });

            $("#Button77").click(function () {
                var obj = {
                    objectid : "1"
                };
                alert(JSON.stringify(obj));

                $.ajax({
                    type: "POST",
                    url: "Constructor_API.svc/AddDomain",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });

            $("#DelDomain").click(function () {
                var obj = {
                    objectid: "1",
                    numbering: "1"
                };
                alert(JSON.stringify(obj));

                $.ajax({
                    type: "POST",
                    url: "Constructor_API.svc/DeleteDomain",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });

            $("#Button12").click(function () {
                var obj = {
                    tokenID: "263487EA-4370-55D6-4325-7E840037341C",
                    question_id: 682,
                    title: "ТЕст Ответ",
                    description: "Тест текст ответа"
                };
                alert(JSON.stringify(obj));
                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/New_answer_add",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
            $("#Button11").click(function () {
                var obj = {
                    tokenID: "263487EA-4370-55D6-4325-7E840037341C",
                    title: "Тестовый вопрос",
                    description: "Описание тестового вопроса...."
                };
                alert(JSON.stringify(obj));
                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/New_question_add",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
            $("#Button10").click(function () {
                var obj = {
                    tokenID: "263487EA-4370-55D6-4325-7E840037341C"
                };
                alert(JSON.stringify(obj));
                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/Get_question_list",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
            $("#Button9").click(function () {
                var obj = {
                    ID: 282423
                };
                alert(JSON.stringify(obj));
                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/Show_news",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
            $("#Button8").click(function () {
                var obj = {
                    tokenID: "512A7501-96FA-B4CF-4325-7FF70033DFB3"
                };
                alert(JSON.stringify(obj));
                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/Get_news_feed",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
            $("#Button7").click(function () {
                var obj = {
                    tokenID: "C21314A9-09D9-F89D-4325-818E0069F145"
                };
                alert(JSON.stringify(obj));
                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/Get_payments_list",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
            $("#Button0").click(function () {
                var obj = {
                    tokenID: "0A425856-56F7-6427-4325-81A2003496DC"                    
                };
                alert(JSON.stringify(obj));
                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/Get_request_list",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
        });
        $(function () {
            $("#Button1").click(function () {
                var obj = {
                    tokenID : "0A425856-56F7-6427-4325-81A2003496DC",
                    work_kind : "C8028FBA-70E3-38FE-4325-80F9006F21F8",
                    phone_number : "(000)666-32-22",
                    description : "Тестовая " + Date.now()
                };
                alert(JSON.stringify(obj));
                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/New_request_add",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
        });
        $(function () {
            $("#Button2").click(function () {
                var obj = {
                };
                alert(JSON.stringify(obj));
                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/Get_service_list",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
        });

        $(function () {
            $("#btnVersion").click(function () {
                var obj = {
                };
                alert(JSON.stringify(obj));
                $.ajax({
                    type: "POST",
                    url: "Constructor_API.svc/GetVersion",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
        });

        $(function () {
            $("#Button3").click(function () {
                var obj = {
                    ID:"7479",
                    Value: "505"
                };
                alert(JSON.stringify(obj));
                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/Meter_value_add",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
        });
        $(function () {
            $("#Button4").click(function () {
                var obj = {
                    tokenID: "452666EB-3839-7D94-4325-7E840038ADF8"                   
                };
                alert(JSON.stringify(obj));
                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/Get_meter_list",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
        });
        $(function () {
            $("#Button5").click(function () {
                var obj = {
                    tokenID: "452666EB-3839-7D94-4325-7E840038ADF8"
                };
                alert(JSON.stringify(obj));
                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/Get_object",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });
        });
        $(function () {
            $("#Button6").click(function () {
                var obj = {
                    log: '15409036',
                    pass: '9111988'
                };
                alert(JSON.stringify(obj));
                $.ajax({
                    type: "POST",
                    url: "MATORIN.QUICK_API.svc/Auth",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        alert("OK. See Console -  press F12");
                        console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                    },

                    error: function (r) {
                        alert("ERROR");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        alert("FAIL");
                    }
                });
                return false;
            });



            //Error region
            $(function () {
                $("#Button33").click(function () {
                    var obj = {
                        question_id: ''                 
                    };
                    alert(JSON.stringify(obj));
                    $.ajax({
                        type: "POST",
                        url: "MATORIN.QUICK_API.svc/Get_question",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            alert("OK. See Console -  press F12");
                            console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                        },

                        error: function (r) {
                            alert("ERROR");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });
                    return false;
                });
                $("#Button32").click(function () {
                    var obj = {
                        tokenID: "UNDEFINED",
                        question_id : 682,
                        title: "OTVET",
                        description: "OPISANIE OTVETA"
                    };
                    alert(JSON.stringify(obj));
                    $.ajax({
                        type: "POST",
                        url: "MATORIN.QUICK_API.svc/New_answer_add",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            alert("OK. See Console -  press F12");
                            console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                        },

                        error: function (r) {
                            alert("ERROR");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });
                    return false;
                });
                $("#Button31").click(function () {
                    var obj = {
                        tokenID: "UNDEFINED",
                        title :"VOPROS",
	                    description : "OPISANIE VOPROSA"
                    };
                    alert(JSON.stringify(obj));
                    $.ajax({
                        type: "POST",
                        url: "MATORIN.QUICK_API.svc/New_question_add",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            alert("OK. See Console -  press F12");
                            console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                        },

                        error: function (r) {
                            alert("ERROR");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });
                    return false;
                });
                $("#Button30").click(function () {
                    var obj = {
                        tokenID: "UNDEFINED"
                    };
                    alert(JSON.stringify(obj));
                    $.ajax({
                        type: "POST",
                        url: "MATORIN.QUICK_API.svc/Get_question_list",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            alert("OK. See Console -  press F12");
                            console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                        },

                        error: function (r) {
                            alert("ERROR");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });
                    return false;
                });
                $("#Button29").click(function () {
                    var obj = {
                        ID: "UNDEFINED"
                    };
                    alert(JSON.stringify(obj));
                    $.ajax({
                        type: "POST",
                        url: "MATORIN.QUICK_API.svc/Show_news",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            alert("OK. See Console -  press F12");
                            console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                        },

                        error: function (r) {
                            alert("ERROR");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });
                    return false;
                });
                $("#Button28").click(function () {
                    var obj = {
                        tokenID: "UNDEFINED"
                    };
                    alert(JSON.stringify(obj));
                    $.ajax({
                        type: "POST",
                        url: "MATORIN.QUICK_API.svc/Get_news_feed",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            alert("OK. See Console -  press F12");
                            console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                        },

                        error: function (r) {
                            alert("ERROR");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });
                    return false;
                });
                $("#Button27").click(function () {
                    var obj = {
                        tokenID: "UNDEFINED"
                    };
                    alert(JSON.stringify(obj));
                    $.ajax({
                        type: "POST",
                        url: "MATORIN.QUICK_API.svc/Get_payments_list",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            alert("OK. See Console -  press F12");
                            console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                        },

                        error: function (r) {
                            alert("ERROR");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });
                    return false;
                });
                $("#Button20").click(function () {
                    var obj = {
                        tokenID: "UNDEFINED"
                    };
                    alert(JSON.stringify(obj));
                    $.ajax({
                        type: "POST",
                        url: "MATORIN.QUICK_API.svc/Get_request_list",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            alert("OK. See Console -  press F12");
                            console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                        },

                        error: function (r) {
                            alert("ERROR");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });
                    return false;
                });
            });
            $(function () {
                $("#Button21").click(function () {
                    var obj = {
                        tokenID: "UNDEFINED",
                        work_kind: "C8028FBA-70E3-38FE-4325-80F9006F21F8",
                        phone_number: "(000)666-32-22",
                        description: "Тестовая " + Date.now()
                    };
                    alert(JSON.stringify(obj));
                    $.ajax({
                        type: "POST",
                        url: "MATORIN.QUICK_API.svc/New_request_add",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            alert("OK. See Console -  press F12");
                            console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                        },

                        error: function (r) {
                            alert("ERROR");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });
                    return false;
                });
            });
            $(function () {
                $("#Button22").click(function () {
                    var obj = {
                    };
                    alert(JSON.stringify(obj));
                    $.ajax({
                        type: "POST",
                        url: "MATORIN.QUICK_API.svc/Get_service_list",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            alert("OK. See Console -  press F12");
                            console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                        },

                        error: function (r) {
                            alert("ERROR");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });
                    return false;
                });
            });
            $(function () {
                $("#Button23").click(function () {
                    var obj = {
                        ID: "7479",
                        Value: "0"
                    };
                    alert(JSON.stringify(obj));
                    $.ajax({
                        type: "POST",
                        url: "MATORIN.QUICK_API.svc/Meter_value_add",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            alert("OK. See Console -  press F12");
                            console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                        },

                        error: function (r) {
                            alert("ERROR");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });
                    return false;
                });
            });
            $(function () {
                $("#Button24").click(function () {
                    var obj = {
                        tokenID: "UNDEFINED"
                    };
                    alert(JSON.stringify(obj));
                    $.ajax({
                        type: "POST",
                        url: "MATORIN.QUICK_API.svc/Get_meter_list",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            alert("OK. See Console -  press F12");
                            console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                        },

                        error: function (r) {
                            alert("ERROR");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });
                    return false;
                });
            });
            $(function () {
                $("#Button25").click(function () {
                    var obj = {
                        tokenID: "UNDEFINED"
                    };
                    alert(JSON.stringify(obj));
                    $.ajax({
                        type: "POST",
                        url: "MATORIN.QUICK_API.svc/Get_object",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            alert("OK. See Console -  press F12");
                            console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                        },

                        error: function (r) {
                            alert("ERROR");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });
                    return false;
                });
            });
            $(function () {
                $("#Button26").click(function () {
                    var obj = {
                        log: 'UNDEFINED',
                        pass: 'UNDEFINED'
                    };
                    alert(JSON.stringify(obj));
                    $.ajax({
                        type: "POST",
                        url: "MATORIN.QUICK_API.svc/Auth",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {

                            alert("OK. See Console -  press F12");
                            console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                        },

                        error: function (r) {
                            alert("ERROR");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });
                    return false;
                });
            });
        });
    </script>
</html>
