<%@ Page Title="" Language="C#" MasterPageFile="~/Supplier_Admin/Supplier.Master" AutoEventWireup="true" CodeBehind="CreateSRequest.aspx.cs" Inherits="Kvorum_App.Supplier_Admin.CreateSRequest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .subMenu {
            height: 160px;
            border-style: double;
            border-color: #2b4b90;
            overflow: auto;
        }

        .icon {
            width: 32px;
            float: left;
            margin-top: -2px;
            margin-right: 7px;
        }

        .accMenu {
            border-style: double;
            border-color: #2b4b90;
            cursor: pointer;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2 id="hedrZ">Создание заявки</h2>
    <%-- <img id="lstcmnt" src="../img/unlem.png" style="width:10%; display:none" />--%>
    <i id="lstcmnt" class="fa fa-exclamation-circle" style="font-size: 300%; color: green; display: none"></i>

    <form>
        <%--  <input id="chkem" type="checkbox" /><label class="checkBx">Аварийное обращение</label>--%>
        <div style="width: 24%;">
            <label class="checkBx" style="float: right;">Оплачено</label>
            <input id="opl" type="checkbox" style="float: right;">
           <%-- <input id="chkem" type="checkbox"><label class="checkBx">Аварийное обращение</label>--%>
        </div>
        <span id="adr_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <label>Адрес объекта*</label>
        <label style="color: red; display: none;" id="objctZ_Sp">""</label>
        <%--<div id="objctZ"  style="border: 1px solid #000; box-shadow: 3px 4px 5px rgba(0,0,0,0.3); height: 150px; overflow: auto; width: 67.5%">
        </div>--%>
        <%-- <input type="text" id="adr" list="adrList">
                <datalist id="adrList">
                   
                    </datalist>--%>
        <select id="objctZ">
            <option value="0">Выберите адрес объекта </option>
        </select>
        <span id="Room_Type_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <%--<label>Тип помещения*</label>
        <select id="Room_Type">
            <option value="0">Выберите тип помещения </option>
        </select>--%>
        <span id="Room_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <label>Номер помещения*</label>
        <%--<input id="Room" type="number" style="width: 100%;" />--%>
        <input type="text" id="Room" value="" />
        <span id="Acnum_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <label>Номер лицевого счета*</label>
        <%--<input id="Room" type="number" style="width: 100%;" />--%>
        <input type="text" id="Acnum" name="name" value="" />
        <div id="AcnumList" style="display: none; border: 1px solid #000; box-shadow: 3px 4px 5px rgba(0,0,0,0.3); height: 150px; overflow: auto; width: 67.5%">
        </div>
        <%--<input type="text" id="adr" list="adrList">
                    <datalist id="adrList">
                   
                    </datalist>--%>

        <span id="Ind_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <label>Заявитель*</label>
        <input id="Ind" type="text" />
        <div id="IndList" style="border: 1px solid rgb(0, 0, 0); display: none; box-shadow: rgba(0, 0, 0, 0.3) 3px 4px 5px; height: 150px; overflow: auto; width: 67.5%;">
        </div>
        <span id="Phn_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <label>Номер телефона*</label>
        <input id="Phn" onkeyup="MaskPhone(this)" type="text" />
      <%--  <label>Направление*</label>
        <select id="Sets" onchange="GetRelatedDirects(0,this)">
            <option value="0">Выберите Направление</option>
        </select>--%>
        <%--<select id="GServices">
           <option value="0">Выберите группу услуг</option>
        </select>--%>
      <%--  <div class="col-md-12">
            <h3>Группа 1</h3>

            <table>
                <thead>
                    <tr>
                        <th>
                            <select style="width: auto;">
                                <option>Услуга 1</option>
                                <option>Услуга 2</option>
                                <option>Услуга 4</option>
                            </select>
                        </th>
                        <th>
                            <input type="number" placeholder="Кол-во" style="width: auto;"></th>
                        <th>
                            <input type="number" placeholder="Цена" style="width: auto;"></th>
                        <th style="width: 120px;">
                            <input type="number" placeholder="Сумма Услуг" style="width: auto;"></th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="2">
                            <textarea placeholder="Комментарий" style="width: 100%;"></textarea></td>
                        <td>
                            <input type="number" placeholder="Окончателная сумма" style="width: auto;"></td>
                        <td>
                            <img src="https://www.nextlevelracing.com/wp-content/uploads/2017/02/nlr-product-png-3.png" style="width: 130px;"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-md-12">
            <h3>Группа 2</h3>

            <table>
                <thead>
                    <tr>
                        <th>
                            <select style="width: auto;">
                                <option>Услуга 1</option>
                                <option>Услуга 2</option>
                                <option>Услуга 4</option>
                            </select>
                        </th>
                        <th>
                            <input type="number" placeholder="Кол-во" style="width: auto;"></th>
                        <th>
                            <input type="number" placeholder="Цена" style="width: auto;"></th>
                        <th style="width: 120px;">
                            <input type="number" placeholder="Сумма Услуг" style="width: auto;"></th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="2">
                            <textarea placeholder="Комментарий" style="width: 100%;"></textarea></td>
                        <td>
                            <input type="number" placeholder="Окончателная сумма" style="width: auto;"></td>
                        <td>
                            <img src="https://www.nextlevelracing.com/wp-content/uploads/2017/02/nlr-product-png-3.png" style="width: 130px;"></td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>
                            <select style="width: auto;">
                                <option>Услуга 1</option>
                                <option>Услуга 2</option>
                                <option>Услуга 4</option>
                            </select>
                        </th>
                        <th>
                            <input type="number" placeholder="Кол-во" style="width: auto;"></th>
                        <th>
                            <input type="number" placeholder="Цена" style="width: auto;"></th>
                        <th style="width: 120px;">
                            <input type="number" placeholder="Сумма Услуг" style="width: auto;"></th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="2">
                            <textarea placeholder="Комментарий" style="width: 100%;"></textarea></td>
                        <td>
                            <input type="number" placeholder="Окончателная сумма" style="width: auto;"></td>
                        <td>
                            <img src="https://www.nextlevelracing.com/wp-content/uploads/2017/02/nlr-product-png-3.png" style="width: 130px;"></td>
                    </tr>
                </tbody>
            </table>
        </div>--%>

        <span id="PrService_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <label id="listServiceH" style="display: none">Список услуг</label>
        <%-- <input type="button" id="shServ" name="name" class="btn btn-default logBtn" style="width: 25%;" value="Выбрать Услугу" />--%>

        <table class="formTable" id="PrServiceH" style="display: none">
            <thead>
                <tr>
                    <th>Наименование услуги</th>
                    <th>Кол-во</th>
                    <th>Ед. изм</th>
                    <th style="width: 120px;">Стоимость (руб.)</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <%--   <div style="max-height: 200px; overflow: auto;">
            <table id="PrService" class="formTable" style="display: none">
            </table>
        </div>--%>
        <br />

        <table class="formTable" id="AddedTable" style="display: none; width: calc(100% - 20px);">
            <tr>
                <th style="width: 500px;">Наименование услуги/товара</th>
                <th style="width: 70px">Кол-во</th>
                <%-- <th style="width:120px;">Стоимость</th>--%>
                <th>Добавление в список</th>
            </tr>
        </table>
        <div style="max-height: 200px; overflow: auto;">
            <table id="PrService2" class="formTable" style="margin-top: 0; border-top: none; display: none">
            </table>
        </div>
        <%-- <button ></button>--%>
        <%-- <input type="button" class="btn btn-default genBtn" name="name"  id="AddServices" disabled="disabled" style="margin-top:5px;" value="Добавить услугу / товар" />--%>


        <div style="clear: both;">&nbsp;</div>

        <input id="dost" style="display: none" type="checkbox" /><label style="display: none" class="checkBx">Доставка</label>
        <span id="TDost_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <label style="display: none">Тип доставки</label>
        <select style="display: none" id="TDost" disabled="disabled">
            <option value="0">Выберите Тип доставки</option>
            <%-- <option>Самовывоз</option>--%>
        </select>


        <label style="display: none">Стоимость доставки</label>
        <input style="display: none" id="StDost" disabled="disabled" type="text" value="" />

        <label style="display: none">Итоговая стоимость</label>
        <input style="display: none" disabled="disabled" id="ItCost" type="text" value="" />
        <div class="row">
            <div class="col-xs-3">
                <label>Планируемая дата* </label>
                <input type="date" id="calen1" onkeyup="ControlDate(this)" onchange="ControlDate(this)"  required="required" name="calendar" value="" />
            </div>
            <div class="col-xs-9">
                <span id="tm_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
                <label>Планируемое время* </label>
                <span style="margin-right: 7px;">с</span>
              <input type="time" id="tmS" onkeyup="ControlTime(this)" onchange="ControlTime(this)" required="required" name="time" value="12:00">
                <span style="margin-right:7px;margin-left:8px;">по</span>
                <input type="time" id="tmE" onkeyup="ControlTime(this)" onchange="ControlTime(this)" required="required" name="time" value="12:00">
            </div>
        </div>
        <%--<div class="row" id="Rj" style="display: none">
            <div class="col-xs-3">
                <label>Предлагаемая дата с</label>
                <input type="date" id="calenOF" name="calendar" value="" />

            </div>
            <div class="col-xs-9">
                <span id="tmOF_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
                <label>Предлагаемая дата по</label>
                <input type="date" id="calenOT" name="calendar" value="" />
            </div>
        </div>
        <div class="row" id="RJ2" style="display: none">

            <div class="col-xs-3">
                <label>Предлагаемая время </label>
                с
                 <input type="time" id="tmOF1" name="calendar" value="" />
                по
                 <input type="time" id="tmOT1" name="calendar" value="" />

            </div>

            <div class="col-xs-9">

                <span id="tmOT_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
                <label>Предлагаемая время</label>
                с
                   <input type="time" id="tmOF2" name="calendar" value="" />
                по
                <input type="time" id="tmOT2" name="calendar" value="" />
            </div>
        </div>--%>
        <br />
        <%--          <label id="lblIspo">Исполнитель</label>
                <em id="emIspo">Исполнитель по умолчанию – диспетчер.</em>
                <input type="text" disabled="disabled" id="IspolFio" class="vfi" value="Введите ФИО исполнителя" />--%>

        <label style="display:none">Выберите исполнителя</label>
        <span id="IspolList_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <select id="IspolList" style="display:none">
            <%-- <option value="0">Выберите исполнителю</option>--%>
        </select>

        <label style="display:none">Ответственный по заявке</label>
        <input type="text" id="Otven" style="display:none" disabled="disabled" value="ФИО ответственного" />
        <span id="RText_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <label>Описание заявки</label>
        <textarea class="opisanie" id="RText"></textarea>

        <label id="hstComh" style="display: none">История комментариев</label>
        <div id="hstCom" style="display: none; border: dotted; overflow: auto; height: 190px; max-height: 190px;"><%--<h4>   - ""</h4>--%></div>
        <br />
        <input type="file" name="name" id="fileH" style="display: none" value="" />
       <%-- <span id="RComment_S" style="float: right; font-weight: bold; color: red; display: none">""</span>--%>
      <%--  <label id="hComennt">Комментарий</label>
        <div id="himgs">
        </div>--%>
        <%--<img   id="HImg" data-url="0" src=" ../Files/upl.png" style="display:none;width:71px;float: right;margin-right:  52%;">--%>
      <%--  <button id="SendComent" class="btn btn-default logBtn" type="button" style="width: auto; display:none ;float: right; margin-right: 42%;">Отправить</button>
        <textarea id="RComment" class="opisanie" style="height: 60px"></textarea>--%>

        <label id="hdPr">Прикрепить файл к заявке</label>
        <div id="imgss">
            <%--  <div class="col-xs-2" id="zImg">
               <%-- <img class="foto-disp"  data-url="0" itemid="0" id="fotoDisp0" src="../Files/upl.png"> 
            </div>--%>
            <input class="knop" id="files" onchange="SelectfileForRequest(this)" itemid="0" type="file" /><%--<br /><br /><br /><br /><br />--%>
        </div>

        <%--<label id="hdPr2" style="display:none">Прикрепить файл к заявке</label>
                    <div style="display:none" class="col-xs-2" id="zImg2">
                <img class="foto-disp" data-url="0" id="fotoDisp1" src="../Files/upl.png">
            </div>--%>

        <%--  <input class="knop" id="files2" style="display:none;margin-left: 9vw;" type="file" /><br /><br /><br /><br /><br />

               <label id="hdPr3" style="display:none">Прикрепить файл к заявке</label>
                    <div style="display:none" class="col-xs-2" id="zImg3">
                <img class="foto-disp" data-url="0" id="fotoDisp2" src="../Files/upl.png">
            </div>--%>

        <%--<input class="knop" id="files3" style="display:none;margin-left: 9vw;" type="file" /><br /><br /><br /><br /><br />

               <label id="hdPr4" style="display:none">Прикрепить файл к заявке</label>
                    <div style="display:none" class="col-xs-2" id="zImg4">
                <img class="foto-disp" data-url="0" id="fotoDisp3" src="../Files/upl.png"><br />
            </div>--%>

        <%--<input class="knop" id="files4" style="display:none;margin-left: 9vw;" type="file" /><br /><br />--%>
        <div style="clear: both"></div>
        <div class="buttons1">
            <button id="SaveDD" class="btn btn-default logBtn" type="button" style="background-color: rgb(0,147,233); width: auto;">Создать</button>
            <button id="SaveMO" class="btn btn-default logBtn" type="button" style="display: none; background-color: rgb(0,147,233); width: auto;">Отправить</button>
            <button id="backUo" class="btn btn-default logBtn" type="button" style="background-color: rgb(149,153,156);">Отмена</button>
        </div>
    </form>

    <div id="DerModalFenster" style="display: none;">
        <div style="padding: 20px; background: #fff; text-align: center; width: 300px; height: 150px;">
            <label>Стоимость услуги</label>
            <input type="text" />
            <button id="okBtn" class="btn genBtn">ОК</button>
            <button id="escBtn" class="btn genBtn" style="background: rgb(149,149,149);">Отмена</button>
        </div>
    </div>

    <%-- <script type="text/javascript">
         function ifrPopup(e) {
             $("#mh8").text("");
             var dtdUrl = $(e).children('img').attr('data-url');
             $("#ifr").attr('src', "https://docs.google.com/gview?url=" + dtdUrl +"&embedded=true");

             var modal = document.getElementById('myModal8');
             var span = document.getElementsByClassName("close_8")[0];
             modal.style.display = "block";
             $("#close_8").click(function () {

                 $("#ifr").attr('src', "");
                 modal.style.display = "none";
             })
             window.onclick = function (event) {
                 if (event.target == modal) {
                     $("#ifr").attr('src', "");
                     modal.style.display = "none";
                 }
             }
         }
     </script>--%>
</asp:Content>
