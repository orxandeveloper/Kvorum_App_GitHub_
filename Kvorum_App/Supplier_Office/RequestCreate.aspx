<%@ Page Title="" Language="C#" MasterPageFile="~/Supplier_Office/SupOffice.Master" AutoEventWireup="true" CodeBehind="RequestCreate.aspx.cs" Inherits="Kvorum_App.Supplier_Office.RequestCreate" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .modalServ {
            display: none;
            position: fixed;
            z-index: 100;
            padding-top: 100px;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.4);
        }

        .modal-contentServ {
            position: relative;
            background-color: #fefefe;
            margin: 15% auto;
            padding: 6px;
            border: 1px solid #888;
            width: 44%;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
            -webkit-animation-name: animatetop;
            -webkit-animation-duration: 0.4s;
            animation-name: animatetop;
            animation-duration: 0.4s;
        }

        .modal-headerServ {
            background-color: #500000;
            color: white;
            margin-top: -20px;
        }

        .closeServ {
            color: #fff;
            float: right;
            margin: 5px 7px;
            cursor: pointer;
            font-size: 21px;
        }

        .modal-headerServ h2 {
            padding: 2px 16px;
            color: #fff;
            text-transform: uppercase;
            text-shadow: none;
        }

        .modal-bodyServ {
            min-height: 100px;
            display: inline-block;
            padding: 15px;
            height: 100px;
        }

            .modal-bodyServ p {
                font-size: 23px;
            }

        .modal-footerServ {
            font-size: 18px;
            color: #fff;
            padding: 2px 16px;
            text-align: left;
            background-color: #500000;
            height: 41px;
        }

        .divServ {
            border: 1px solid #000;
            box-shadow: 3px 4px 5px rgba(0,0,0,0.3);
            height: 150px;
            overflow: auto;
            width: 100%;
        }

        .radioServ {
            margin-left: 5px;
        }

        .labelPriceServ {
            float: right;
        }

        .labelTextServ {
            margin-top: -22px !important;
            margin-left: 5px;
        }

        .AddServ {
            width: 23%;
            height: 30px;
            background-color: #fefefe;
            color: #500000;
            font-weight: 700;
            margin-bottom: -26px;
            float: left;
        }

        .btcloseServ {
            width: 12%;
            background-color: white;
            color: #500000;
            font-weight: 400;
            float: right;
        }

        .foto-disp {
            width: 70%;
        }
    </style>
    <style>
        .modalFPAY {
            display: none;
            position: fixed;
            z-index: 100;
            /*padding-top: 100px;*/
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.4);
        }

        .modal-contentFPAY {
            position: relative;
            background-color: #fefefe;
            margin: 15% auto;
            padding: 6px;
            border: 1px solid #888;
            width: 35%;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
            -webkit-animation-name: animatetop;
            -webkit-animation-duration: 0.4s;
            animation-name: animatetop;
            animation-duration: 0.4s;
        }

        .modal-headerFPAY {
            background-color: #500000;
            color: white;
            margin-top: -20px;
            height: 30px
        }

        .closeFPAY {
            color: #fff;
            float: right;
            margin: 5px 7px;
            cursor: pointer;
            font-size: 21px;
        }

        .modal-headerFPAY h2 {
            padding: 2px 16px;
            color: #fff;
            text-transform: uppercase;
            text-shadow: none;
        }

        .modal-bodyFPAY {
            min-height: 100px;
            display: inline-block;
            padding: 15px;
            height: 100px;
        }

            .modal-bodyFPAY p {
                font-size: 23px;
            }

        .modal-footerFPAY {
            font-size: 18px;
            color: #fff;
            padding: 2px 16px;
            text-align: left;
            background-color: #500000;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <br>

    <ul class="breadcrumb">
        <li><a href="logged.html">Главная</a></li>
        <li class="active">Оформление заявки</li>
    </ul>
    <a href="CreatePassRequest.aspx" id="CPR" onclick="useSession()" style="float: right; display: none;" class="btn  btnAbort">Создать заявку на допуск</a>
    <h2 id="hedrZ">Оформление заявки</h2>

    <span id="adr_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
    <label>Адрес</label><br>
   <%-- <input id="adres" type="text" value="" style="width: 100%;">--%>
    <select  id="objctZ" style="width:100%">
        <option value="0">Выберите адрес объекта </option>

    </select>
    <br>
    <br>
    <span id="Ind_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
    <label>Заявитель</label><br>
    <input type="text" id="Ind" style="width: 100%;">
   
    <br>
    <br>
    <span id="Phn_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
    <label>Номер телефона</label><br>
    <input id="Phn" type="tel" onkeyup="MaskPhone(this)" placeholder="Введите номер телефона" style="width: 100%;">

 <%--   <br>
    <br />
    <label id="labelService">Услуга</label><br>
    <select style="width: 100%" id="Sgroup">
        <option value="0">Выберите  Услугу</option>
    </select>
    <button class="btn btnBack" style="display: none; background: #1a4f79; color: #fff; float: none;" id="shServ">Выбрать услугу</button>--%>

<div style="clear: both;">&nbsp;</div>

    <div class="row">
        <div class="col-xs-12 col-md-5">
            <label>Планируемая дата* </label>
            <input type="date" id="calen1" onkeyup="ControlDate(this)" onchange="ControlDate(this)" required="required" name="calendar" value="" min="2019-07-19">
        </div>
        <div class="col-xs-12 col-md-7" style="margin-top: 20px;">
            <span id="tm_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
            <label>Планируемое время* </label>
            <span style="margin-right: 7px;">с</span>
            <input type="time" id="tmS" onkeyup="ControlTime(this)" onchange="ControlTime(this)" required="required" name="time" value="12:00">
            <span style="margin-right: 7px; margin-left: 8px;">по</span>
            <input type="time" id="tmE" onkeyup="ControlTime(this)" onchange="ControlTime(this)" required="required" name="time" value="12:00">
        </div>
    </div>
    <div style="clear: both;">&nbsp;</div>


    <label id="hComennt">Описание</label>
    <textarea id="RText" style="width: 100%; height: 10em; padding: 10px 5px;"></textarea>

    <div style="clear: both;">&nbsp;</div>
    <label style="display: none" id="histComennt">История комментариев</label>
    <div id="himgscmnts" style="display: none; width: 100%; height: 10em; overflow: auto; background-color: #ebebe4; padding: 10px; border: 1px solid #aaa;">
    </div>
    <br />
    <label style="display: none" id="CommentHH">Комментарий</label><br />
    <input id="commentText" type="text" placeholder="Введите текст комментария…" style="display: none; width: 87%; height: 2.5em; padding-left: 10px;">
    <button id="SendComent" class="btn " type="button" style="display: none; width: auto; float: right; background: #1a4f79; color: #fff; border-radius: 0 15px 15px 0;">Отправить</button>

    <label id="hdPr">Прикрепить файл к заявке</label><br>

    <div id="imgss">
        <input class="knop" id="files" itemid="0" onchange="SelectfileForRequest(this)"  type="file">
       <%-- <input type="button" id="fakefiles" value="Выберите Файл"><br />--%>
    </div>

    <br>
    <br>
    <div style="clear: both"></div>

    <div class="buttons1">
        <button id="send" class="btn  btnAbort" type="button">Отправить</button>
        <button id="backUo" class="btn  btnBack" type="button">Назад</button>
    </div>



    <div class="space20"></div>



    <div id="myModalServ" class="modalServ" style="display: none;">

        <!-- Modal content -->
        <div class="modal-contentServ">
            <div class="modal-headerServ">
                <span class="closeServ" id="closeServ">×</span>
                <h2 id="mh">НЕУДАЧНОЕ ДЕЙСТВИЕ</h2>
            </div>
            <div class="modal-bodyServ">
                <div class="divServ" id="Servs">
                    <%-- <input type="radio" data-edizm="шт." name="services1" value="Техническая экспертиза проекта системы водоснабжения и канализации" data-url="1" itemid="1" class="radioServ">
                    <label class="labelPriceServ" itemid="1">1900.00</label>
                    <label class="labelTextServ" itemid="1">Техническая экспертиза проекта системы водоснабжения и канализации</label>--%>
                </div>

            </div>
            <div class="modal-footerServ">
                <input type="button" id="AddT" class="AddServ" name="name" value="Добавить услугу">
                <input type="button" id="CloseServ" name="name" value="Отмена" class="btcloseServ">
            </div>
        </div>

    </div>
    <div id="myModalFPAY" class="modalFPAY">

        <!-- Modal content -->
        <div class="modal-contentFPAY">
            <div class="modal-headerFPAY">
                <span class="closeFPAY" id="closeFPAY">×</span>
                <h2 id="mhFPAY"></h2>
            </div>
            <div class="modal-bodyFPAY">
                <%--//  <form name="TinkoffPayForm" onsubmit="pay(this); return false;">--%>
                <%--  <input class="tinkoffPayRow" type="text" placeholder="Сумма заказа" name="amount" required="" id="amountid" >
   <input class="tinkoffPayRow" type="submit" value="Оплатить">--%>
                <%--</form>--%>
            </div>
            <div class="modal-footerFPAY">
                <h3 id="mfFPAY"></h3>
            </div>
        </div>

    </div>
</asp:Content>
