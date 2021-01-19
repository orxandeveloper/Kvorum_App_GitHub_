<%@ Page Title="" Language="C#" MasterPageFile="~/PrivateOffice/Private.Master" AutoEventWireup="true" CodeBehind="TRequest.aspx.cs" Inherits="Kvorum_App.PrivateOffice.TRequest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .modal2 {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(255,113,57,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content2 {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 25%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
    from {top:-300px; opacity:0} 
    to {top:0; opacity:1}
}

@keyframes animatetop {
    from {top:-300px; opacity:0}
    to {top:0; opacity:1}
}

/* The Close Button */
.close2 {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close2:hover,
.close2:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.modal-header2 {
    padding: 2px 16px;
    background-color: red;
    color: white;
}

.modal-body2 {padding: 2px 16px;}

.modal-footer2 {
    padding: 2px 16px;
    background-color: red;
    color: white;
    height: 45px;
}
</style>    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/vendor/slick/slick.js"></script>
    <!--<script src="js/jquery.nicescroll.js"></script>-->
    <script src="js/jflickrfeed.min.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/jquery.spasticNav.js"></script>
    <script src="js/jquery.prettyphoto.js"></script>
    <script src="js/main.js"></script>
    <link href="js/jquery-editable-select.min.css" rel="stylesheet" />
      <script src="js/jquery-editable-select.min.js"></script>
    <script src="js/Utilities.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<div class="row">
        <div class="container">
            <h1></h1>
             <div class="row">
                 <div class="col-lg-6"><h4 id="hedrZ">Заказ №1234</h4></div>
                 <div class="col-lg-6"><h4 style="text-align:right;" id="headerS">Статус заказа: "В работе"</h4></div>
             </div>
                <div style="clear: both; height: 30px; display:block;"></div>

              
            <!-- дата и время заказа -->
                <label id="createH" style="display:none">Дата и время создания заявки</label>
                <span   id="crdate" style="display:none" ></span>
                <%--<input type="time" id="crTime" style="display:none" name="time1" value="12:00" />--%>
                 <label>Адрес</label>
                <input type="text" id="adres" disabled="disabled"/>
               <%-- <div style="clear: both;">&nbsp;</div>--%>
            
                <label>Заявитель</label>
                <%--<input id="Ind" type="text" />--%>
          <%--   <select >
                    
                </select>--%>
            <select id="FirstN"   class="form-control">
  
</select>
               <!-- <div id="IndList" style="border: 1px solid rgb(0, 0, 0);display:none; box-shadow: rgba(0, 0, 0, 0.3) 3px 4px 5px; height: 150px; overflow: auto; width: 67.5%;">
                             </div> -->
                <span id="Phn_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
                <label>Номер телефона</label>
                <input id="Phone"  type="text" />
                <span id="PrService_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
               
                <label>Список услуг/товаров</label>
                <input type="button" id="shServ" name="name" class="btn genBtn" style="width: 25%; background:#007568;" value="Выбор услуги/товара" />
 
                 <table id="tblP" style="display:none">
                    <tr>
                        <th>Услуга/товар</th>
                        <%-- <th>Кол-во</th>
    <th>Стоимость</th>--%>
                        <th>Удаление из списка</th>
                    </tr>
                    <tbody id="PrService">

                    
                  
                        </tbody>
                </table>

                <div style="clear: both;">&nbsp;</div>

                <input id="dost" style="display: none" type="checkbox" />
                <label style="display: none" class="checkBx">Доставка</label>




                <span id="TDost_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
                <label style="display: none">Тип доставки</label>
                <select style="display:  none" id="TDost" disabled="disabled">
                    <option value="0" style="display:none">Выберите Тип доставки</option>
                    <%-- <option>Самовывоз</option>--%>
                </select>
                
                <div style="clear: both;">&nbsp;</div>

                <label style="display:  none">Стоимость доставки</label>
                <input style="display:  none" id="StDost" disabled="disabled" type="text" value="" />
             <label id="UdoDataH">Удобная дата </label>
             <input type="date" id="calen1" name="calendar" value=""  >
            <label id="UdoVremyaH">Удобная время </label>
              c
                <input type="time" id="tmS" name="time" value="12:00">
                по 
                <input type="time" id="tmE" name="time" value="12:00">
               
              <%--   <label id="hstComh" style="display:none">История комментариев</label>
                <div id="hstCom" style="border: dotted; overflow: auto; height: 130px; max-height: 190px;display:none"></div>--%>


                <label style="display: none">Итоговая стоимость</label>
                <input style="display: none" disabled="disabled" id="ItCost" type="text" value="" />
  


                <label id="PlanDateH" style="display:none">Планируемая дата </label>
                <input type="date" style="display:none" id="calenP1" name="calendar" value="" />
          
                <div style="clear: both;">&nbsp;</div>

                <span id="tm_S" style="float: right;display:none; font-weight: bold; color: red; display: none">""</span>
                <%--<label id="PlantimeH" style="display:none">Планируемое время </label>
               <input type="time" id="tm" style="display:none" name="time" value="12:00" /> <%--по с  
                  <input type="time" id="tm" style="display:none" name="time" value="15:00" />--%>
  <%--  <hr />--%>

                <label id="OFDateH" style="display:none">Предлагаемая дата </label>
                <input type="radio"   id="OFFdata" name="Ofdata" value="" style="margin:0 5px 0 10px;display:none"/><%--26.05.2018 27.05.2018--%>
                <input type="radio" id="OFTdata"   name="Ofdata" value=""  style="margin:0 5px 0 10px;display:none"/>
          
                <div style="clear: both;">&nbsp;</div>

                
                <label id="oftimeH2" style="display:none">Предлагаемая время </label>
                <input type="radio" id="otf" name="oftime"   style="margin:0 5px 0 10px;display:none;" /><%--12:00-15:00 15:00-18:00--%>
                <input type="radio" id="ott" name="oftime"   style="margin:0 5px 0 10px;display:none;" /> 

               <%-- <div style="clear:both;">&nbsp;</div>--%>
             <label id="hstComh" style="display:none">История комментариев</label>
                <div id="hstCom" style="border: dotted; overflow: auto; height: 130px; max-height: 190px;display:none"></div>
                 <div style="clear:both;">&nbsp;</div>
                <label id="hComennt">Комментарий</label>
             <button id="SendComent" class="btn btn-default logBtn" type="button" style="display: none; width: auto;">Отправить</button>
                <div id="himgs">
                </div>

                <textarea id="cmt" class="opisanie" style="height: 60px"></textarea>
               
                <label id="hdPr">Прикрепить файл к заявке</label>
                <div id="imgss">
         
               <input class="knop" id="files" itemid="0" type="file" />
               </div>

  
               <div style="clear: both"></div>
               <div class="buttons1">
                    <button id="send" class="btn logBtn btnSend" type="button" >Отправить</button>
                    <button id="MClose" class="btn logBtn btnAbort" type="button">Отменить</button>
                    <button id="Back" class="btn logBtn btnBack" type="button">Назад</button>
               </div>
        </div>
    </div>
    <div id="myModal2" class="modal2" style="z-index: 1000;background-color:  rgba(255,113,57,0.4);">

  <!-- Modal content -->
  <div class="modal-content2" style="">
    <div class="modal-header2" style="background-color:white">
      <span class="close2" style="color:black" id="close_">×</span>
      <h2 id="mh2" style="text-align: left;color:white">Modal Header</h2>
    </div>
    <div class="modal-body2" style="height: 100px;height: 100px;padding: 15px;/* min-width:100px; */display: inline-block;">
      <p id="txt2" style="font-size: 23px;">Some text in the Modal Body</p>
      
    </div>
    <div class="modal-footer2" style="text-align: left;background-color:white">
      
        <input type="button" id="cls" name="name" value="Закрыть" style="width: 25%;height: 78%;background-color: white;color: red;font-weight: 700;">
        <input type="button" id="deleteO" name="name" value="Удалить" style="float: right;width: 25%;height: 78%;background-color: white;color: red;font-weight: 700;">
    </div>
  </div>

</div>
    <div id="myModal7" class="modal2" style="z-index: 1000;background-color:  rgba(255,113,57,0.4);">

  <!-- Modal content -->
  <div class="modal-content2" style="">
    <div class="modal-header2" style="background-color:white">
      <span class="close2" style="color:black" id="close_7">×</span>
     <h2 id="mh7" style="text-align: left;color:white">Modal Header</h2>
    </div>
    <div class="modal-body2" style="height: 100px;width:100%;height: 100px;padding: 15px;/* min-width:100px; */display: inline-block;">
     <div style="border: 1px solid #000; box-shadow: 3px 4px 5px rgba(0,0,0,0.3); height: 150px; overflow: auto; width: 99.5%" id="Servs">
       <input type="checkbox" data="Выполнение работ-Водопровод" data-url="0" itemid="1" style="margin-left:5px"><label itemid="1" class="checkBx">Выполнение работ -Водопровод</label><input type="checkbox" data="Выполнение работ-Отопление" data-url="0" itemid="2" style="margin-left:5px"><label itemid="2" class="checkBx">Выполнение работ -Отопление</label>
 </div>
         
    </div>
    <div class="modal-footer2" style="text-align: left;height: 80px; background-color:white">
       
        
          <input type="button" id="AddT" name="name" value="Добавить услугу/товар" style="width: 43%;height: 37%;background-color: white;color: black;font-weight: 700;margin-left:  27%;margin-bottom: -26px;">
        <input type="button" id="CloseServ" name="name" value="Отмена" style="width: 25%;height: 37%;background-color: white;color: black;font-weight: 700;margin-top: -20px;">

    </div>
  </div>

</div>
    <div id="myModal5" class="modal2" style="z-index: 1000; background-color: rgba(255, 113, 57, 0.4); display: none;">

  <!-- Modal content -->
  <div class="modal-content2" style="">
    <div class="modal-header2" style="background-color:white">
      
      <span class="close2" style="color:black" id="close_5">×</span>
          <h3 id="ssm"></h3>
     
    </div>
    <div class="modal-body2" style="height: 100px;width:100%;height: 100px;padding: 15px;/* min-width:100px; */display: inline-block;">
        <img src="images/super.jpg" data-itm="good" onclick="SelectSmile(this)" style="width: 33%;" alt="Alternate Text">
        <img src="images/notbad.jpg" data-itm="notbad" onclick="SelectSmile(this)" style="width: 27%;" alt="Alternate Text">
        <img src="images/verybad.jpg" data-itm="bad" onclick="SelectSmile(this)" style="width: 25%;" alt="Alternate Text">
     <textarea style="width: 522px; height: 205px; max-width: 100%; min-width: 100%; max-height: 109px; min-height: 109px; margin: 0px;" id="cmntsts2"></textarea>
         
    </div>
    <div class="modal-footer2" style="text-align: left;height: 80px; background-color:white">
          <input type="button" id="OkVipol" name="name" value="ОК" style="width: 25%;height: 37%;background-color: white;color: black;font-weight: 700;margin-left:  48%;margin-bottom: -26px;">
        <input type="button" id="Close_Ot" name="name" value="Отмена" style="width: 25%;height: 37%;background-color: white;color: black;font-weight: 700;margin-top: -20px;">

    </div>
  </div>

</div>

</asp:Content>
