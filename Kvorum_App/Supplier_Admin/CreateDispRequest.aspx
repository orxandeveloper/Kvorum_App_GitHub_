<%@ Page Title="" Language="C#" MasterPageFile="~/Supplier_Admin/Supplier.Master" AutoEventWireup="true" CodeBehind="CreateDispRequest.aspx.cs" Inherits="Kvorum_App.Supplier_Admin.CreateDispRequest" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <h2 id="hedrZ">Создание заявки</h2>
    <%-- <img id="lstcmnt" src="../img/unlem.png" style="width:10%; display:none" />--%>
    <i id="lstcmnt" class="fa fa-exclamation-circle" style="font-size: 300%; color: green; display: none"></i>

    <form>
      <%--  <input id="chkem" type="checkbox" /><label class="checkBx">Аварийное обращение</label>--%>
        <style>
        .serviceDivs {
            margin-left:-40px
        }
    </style>
        <div style="width: 24%;">  
    <label class="checkBx" style="float: right;">Оплачено</label>
    <input id="opl" type="checkbox" style="float: right;">
    <input id="chkem" type="checkbox" style="display:none"><label id="lblEm" style="display:none" class="checkBx">Аварийное обращение</label>
    </div>
        <span id="prjcts_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <label style="display:none">Проект*</label>
        <select style="display:none" id="prjcts">
            <option value="0">Выберите проект </option>
        </select>
        <span id="adr_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <label>Адрес объекта*</label>
        <label style="color: red; display: none;" id="objctZ_Sp">""</label>
        <select id="objctZ">
            <option value="0">Выберите адрес объекта </option>
        </select>
       <label>Вид заявки*</label>
        <select id="RequestKind">
            <option value="0">Выберите вид заявки </option>
        </select>
         <input type="text" id="SerchService" onfocus="showResultArea(&quot;open&quot;)" onblur="showResultArea(&quot;close&quot;)" onkeyup="Search_Service(this)" placeholder="Поиск Услуг" style="display: none">
        

      <span id="PrService_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <label id="listServiceH" style="display:none">Список услуг</label>
       <%-- <input type="button" id="shServ" name="name" class="btn btn-default logBtn" style="width: 25%;" value="Выбрать Услугу" />--%>

        <table class="formTable" id="PrServiceH" style="display: none">
            <thead>
                <tr>
                    <th>Наименование услуг</th>
                       <th  >Кол-во</th>
                    <th>Ед. изм</th>
                    <th style="width: 120px;">Стоимость (руб.)</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <br />
          <span id="disps_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <label style="display:none">Диспетчеры*</label>
        <select id="disps" style="display:none">
           
        </select>
        
        
        <span id="Room_Type_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <label>Тип помещения*</label>
        <select id="Room_Type">
            <option value="0">Выберите тип помещения </option>
        </select>
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
        <input id="Phn" onkeyup="MaskPhone(this)"  type="text" />
       <%-- <label style="display:none" id="lblsearchtxt">Поиск</label>
        <input type="text" id="searchtxt" placeholder="Поиск по Услугам" style="width: 30%;display:none">--%>
        <%--<input type="button" value="Поиск услуг" id="SearchService" class="btn genBtn" style="display:none">--%>
      <%--  <label>Направление*</label>
        <select id="Sets" onchange="GetRelatedDirects(0,this)"><option value="0">Выберите Направление</option></select>--%>
        <%--<select id="GServices">
           <option value="0">Выберите группу услуг</option>
        </select>--%>
        
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
        <div class="row" id="planTime">
            <div class="col-xs-3">
                <label>Планируемая дата* </label>
                <input type="date" id="calen1" required="required" name="calendar" value="" />
            </div>
            <div class="col-xs-9">
                <span id="tm_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
                <label>Планируемое время* </label>
                <input type="time" id="tm" required="required" name="time" value="12:00" />
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

        <label id="lblispol" >Выберите исполнителя</label>
        <span id="IspolList_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <select id="IspolList" onchange="ChangeToSend(this)" >
            <%-- <option value="0">Выберите исполнителю</option>--%>
        </select>

        <label>Ответственный по заявке</label>
        <%--<input type="text" id="Otven" disabled="disabled" value="ФИО ответственного" />--%>
        <select id="Otven"  ></select>
        <span id="RText_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <label>Описание заявки</label>
        <textarea class="opisanie"  placeholder="Опишите кратко место проведения работ, а так же суть проблемы/задачи" id="RText"></textarea>

        <label id="hstComh" style="display: none">История комментариев</label> 
        <div id="hstCom" style="display: none; border: dotted; overflow: auto; height: 190px; max-height: 190px;"><%--<h4>   - ""</h4>--%></div>
        <br />
        <input type="button" name="name" id="fileH_btn" value="Выбрать Файл" style="display:none" />
        <input type="file" name="name" id="fileH" style="display: none" value="" />
        <span id="RComment_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <label id="hComennt">Комментарий</label>
        <div id="himgs">
        </div>
        <%--<img   id="HImg" data-url="0" src=" ../Files/upl.png" style="display:none;width:71px;float: right;margin-right:  52%;">--%>
        <button id="SendComent" class="btn btn-default logBtn" type="button" style="width: auto;float: right;margin-right: 42%;">Отправить</button>
        <textarea id="RComment" class="opisanie" style="height: 60px"></textarea>
        
        <label id="hdPr">Прикрепить файл к заявке</label>
        <div id="imgss">
            <%--  <div class="col-xs-2" id="zImg">
               <%-- <img class="foto-disp"  data-url="0" itemid="0" id="fotoDisp0" src="../Files/upl.png"> 
            </div>--%>
            <input type="button" name="name" id="file_btn" value="Выбрать Файл" /><br />
            <input class="knop" style="display:none" id="files" itemid="0" type="file" /><%--<br /><br /><br /><br /><br />--%>
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
           <%-- <button  id="updateRequest" style="display:none" class="btn logBtn">Сохранить</button>--%>
         <input type="button" id="updateRequest" style="" class="btn logBtn" value="Сохранить">
            <button id="SaveDD" data-status="1" class="btn btn-default logBtn" type="button" style="background-color: rgb(0,147,233); width: auto;">Принять в работу</button>
            <button id="SaveMO" data-status="2" class="btn btn-default logBtn" type="button" style="display: none; background-color: rgb(0,147,233); width: auto;">Отправить</button>
            <button id="backUo" class="btn btn-default logBtn" type="button" style="background-color: rgb(149,153,156);">Отмена</button>
        </div>
    </form>
        <div id="myModal5" class="modal2" style="z-index: 1000; background-color: rgba(0,100,223,0.4);">

        <!-- Modal content -->
        <div class="modal-content2" style="">
            <div class="modal-header2" style="background-color: white">
                <span class="close2" style="color: black" id="close_5">&times;</span>
                <%-- <h2 id="mh3" style="text-align: left;color:white">Modal Header</h2>--%>
            </div>
            <div class="modal-body2" style="height: 100px; width: 100%; height: 100px; padding: 15px; /* min-width: 100px; */display: inline-block;">
                <textarea style="width: 522px; height: 205px; max-width: 100%; min-width: 100%; max-height: 109px; min-height: 109px; margin: 0px;" id="cmntsts2">Все работы по данной заявке выполнены</textarea>

            </div>
            <hr />
            <div class="modal-footer2" style="text-align: left; height: 80px; background-color: white">

                <input class="knop" id="f_iles2" style="width: 124px" type="file">
                <input type="button" id="OkVipol" name="name" value="ОК" style="width: 25%; height: 37%; background-color: white; color: black; font-weight: 700; margin-left: 48%; margin-bottom: -26px;" />
                <input type="button" id="Close_Ot" name="name" value="Отмена" style="width: 25%; height: 37%; background-color: white; color: black; font-weight: 700; margin-top: -20px;" />

            </div>
        </div>

    </div>
    <div id="myModal6" class="modal2" style="z-index: 1000; background-color: rgba(0,100,223,0.4);">

        <!-- Modal content -->
        <div class="modal-content2" style="">
            <div class="modal-header2" style="background-color: white">
                <span class="close2" style="color: black" id="close_6">&times;</span>
                <%-- <h2 id="mh3" style="text-align: left;color:white">Modal Header</h2>--%>
            </div>
            <div class="modal-body2" style="height: 100px; height: 100px; padding: 15px; /* min-width: 100px; */display: inline-block;">
                <p id="txt6" style="font-size: 23px;">Исполнитель:</p>
                <p id="Ispolname" style="font-size: 23px;">Исполнитель ( по умолчанию Текущий исполнитель)</p>
                <select id="ispol2">
                    <option value="0">Выберите Исполнителя</option>
                </select>
            </div>
            <hr />
            <div class="modal-footer2" style="text-align: left; height: 80px; background-color: white">



                <input type="button" id="vrntVrabot" name="name" value="Вернуть в работу" style="float: right; width: 32%; height: 37%; background-color: white; color: black; font-weight: 700; margin-top: -20px;" />

            </div>

        </div>

    </div>
    <div id="DerModalFenster" style="display: none;">
        <div style="padding: 20px; background: #fff; text-align: center; width: 300px; height: 150px;">
            <label>Стоимость услуги</label>
            <input type="text" />
            <button id="okBtn" class="btn genBtn">ОК</button>
            <button id="escBtn" class="btn genBtn" style="background: rgb(149,149,149);">Отмена</button>
        </div>
    </div>
     
       
     <script type='text/javascript'>
         document.write('<' + 'script type="text/javascript" src="../Super_Disp/Utilities/SuperDisp_Utulities.js"></' + 'script>')//?' + Math.random() + '
          // script.src = "../Super_Disp/Utilities/SuperDisp_Utulities.js?" + Math.random();
         
</script>
</asp:Content>
