﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="RequestsManager.aspx.cs" Inherits="Kvorum_App.Manager.RequestsManager" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="registerRequest" runat="server">


    </div>
           <%--  <div class="button">
            <a class="create" href="CreateDispRequest.aspx"><i class="fa fa-plus-square-o" aria-hidden="true"></i>&nbsp;Создать заявку</a>
        </div>
    <div class="button" style="float: left;">
            <a class="create" href="CreateSupRequest.aspx"><i class="fa fa-plus-square-o" aria-hidden="true"></i>Создать заявку поставщика</a>
        </div>
    <div class="filter" style="display:none">
    
            <button id="flt" class="btn genBtn">Фильтр</button> <br />
        <br />
            <script>
                document.getElementById('t').addEventListener('click', toggle);
                function toggle() {
                    var filter = document.getElementById('filter1');
                    filter.style.display = filter.style.display == 'none' ? 'block' : 'none';
                }
            </script>

        <div class="filter-boxes" id="filter1" style="display:none">
<div class="row">
    <div class="col-xs-5 col1">
          <label for="requestNumber">Номер заявки</label>
                <input type="text" id="requestNumber" style="width:60%"/>
        <br style="clear:both;"/>
          <label style="display:inline; padding-right:10px;">Номер помещения</label>
                <input id="rmNum" style="width: 45px; float:none; margin-left:10px;" type="text" />
             <div style="clear:both;font-size:5px;">&nbsp;</div>
        <label for="object">Объект</label>
                <select id="object">
                    <option value="0">Выбрать все</option>
                    <option>Объект 1</option>
                    <option>Объект 2 длинное название </option>
                    <option>Объект 3</option>
                </select> 
         <div style="clear:both;font-size:5px;">&nbsp;</div>
         <label style="">Тип помещения</label>
                <select id="rt"  >
                    <option value="0"> Выбрать все</option>
                    
                </select>
    </div>
    <div class="col-xs-7">
        <label for="nameClient">ФИО заявителя</label>
                <input id="frstname" type="text"/>
        <br style="clear:both;"/>
        <label for="startTime" style="display:inline;">Период создания с</label>
        <input id="startTime" type="date" name="calendar" value="" />        
        <label for="endTime">по</label>                
        <input id="endTime" type="date" name="calendar" value="" style="float:right;"/>
        
        <div style="clear:both;font-size:5px;">&nbsp;</div>

        <label>Статус</label>
                <select id="sts">
                    <option value="0">Выбрать все </option>
           
                </select><br />
     
</div><!-- row -->
     <div style="clear:both">&nbsp;</div>
             <div class="filterButtons">
                <button id="sbrflt" class="btn dtn-default genBtn" style="background:rgb(149,149,149)" >Сбросить фильтр</button>
                <button  id="filtering" class="btn dtn-default genBtn">Применить фильтр</button> </div>
        </div>
</div><!-- filter-boxes-->

        <div style="float:right;">
        
         <input type="search" placeholder="Поиск" class="shortSearch"/><button id="search" class="btn btn-default genBtn" style="min-width:50px;">Найти</button>
         </div>

         <a href="1" class="genBtn tableBtn" style="color:#000;display:none; background:#fff;float: right;">Посмотреть на карте</a>
         <a href="#" id="dgrm" class="genBtn tableBtn" style="color:#000; background:#fff;float: right;">Диаграммы</a>
         <button id="otchet" class="btn btn-default genBtn tableBtn" style="float: right;"> Отчет</button><hr />
     <div id="dgrm_" style="display:none" class="row">
         <div class="container">
             <a href="#" onclick="DownKol()"  style="width: 80px;color: white;background-color: rgb(0,100,223);text-align:  center;text-decoration:  unset;">Скачать</a><br />
              <a href="#" onclick="DownVseqo()"   style="width: 80px;color: white;background-color: rgb(0,100,223);text-align:  center;text-decoration:  unset;margin-left:  31vw;margin-top:  -2vw;margin-bottom:  -0.5vw;">Скачать</a><br />
             <div id="piechart" style="width: 500px; height: 500px;" class="col-md-6 col-xs-12"></div>
       
             <div id="vis_div" style="width: 600px; height: 400px;" class="col-md-6 col-xs-12"></div>
             
             </div>
     </div>
        <hr />
        

</div> <!-- filter -->
                    <table id="DispSRequestTables" class="formTable">
                     
                         <thead>
                             <tr>
                            <th> № Заявки </th>
                            <th>Заявитель</th>
                            <th>Адрес</th>
                                  <th>№ помещения</th>
                             <th>
                                <label class="adir">Тип помещения</label>
                                </th>
                            <th>Дата создания</th>
                            <th>Обращение абонента</th>
                            <th>Исполнитель</th>
                            <th>Планируемая дата</th>
                            <th>
                                <label>Услуга/товар</label>
                                    </th>
                                   <th>Тип Заявок</th>
                            <th>Статус</th>
                            <th>Оплата</th>
                        </tr>
                             </thead>
                        <tbody>

                        </tbody>
                    </table>--%>
      
</asp:Content>
