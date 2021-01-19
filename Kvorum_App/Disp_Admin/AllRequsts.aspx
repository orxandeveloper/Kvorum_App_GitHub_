<%@ Page Title="" Language="C#" MasterPageFile="~/Disp_Admin/Dispatcher.Master" AutoEventWireup="true" CodeBehind="AllRequsts.aspx.cs" Inherits="Kvorum_App.Disp_Admin.AllRequsts" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   <%--   <div class="button">
            <a class="create" href="CreateRequest.aspx"><i class="fa fa-plus-square-o" aria-hidden="true"></i>&nbsp;Создать</a>
        </div>--%>
        <!-- main -->
    <div id="registerRequest" runat="server">


    </div>
      <%--  <div class="filter">

            <button id="Aflt" class="btn genBtn">Фильтр</button>


            <div class="filter-boxes" id="Afilter1" style="display:none">
                <div class="row">
                    <div class="col-xs-5 col1">
                        <label for="requestNumber">Номер заявки</label>
                        <input type="text" id="ArequestNumber" style="width: 60%">
                        <br style="clear: both;">
                        <label style="display: inline; padding-right: 10px;">Номер помещения</label>
                        <input style="width: 45px; float: none; margin-left: 10px;" id="ArmNum" type="text">
                        <div style="clear: both; font-size: 5px;">&nbsp;</div>
                        <label for="object">Объект</label>
                        <select id="Aobject">
                          <option value="0">Выбрать все</option>
                        </select>
                        <div style="clear: both; font-size: 5px;">&nbsp;</div>
                        <label >Тип помещения</label>
                        <select  id="Art">
                            <option value="0"> Выбрать все</option>
                        </select>
                    </div>
                    <div class="col-xs-7">
                        <label for="nameClient">ФИО заявителя</label>
                        <input id="Afrstname" type="text">
                        <br style="clear: both;">
                        <label for="AstartTime" style="display: inline;">Период создания с</label>
                        <input id="AstartTime" type="date" name="calendar" value="">
                        <label for="AendTime">по</label>
                        <input id="AendTime" type="date" name="calendar" value="" style="float: right;">

                        <div style="clear: both; font-size: 5px;">&nbsp;</div>

                        <label>Статус</label>
                        <select id="Asts">
                           
                            <option value="0">Выбрать все </option>
                        </select><br>
                    </div>
                    <!-- row -->
                    <div style="clear:both">&nbsp;</div>
                    <div class="filterButtons">
                        <button class="btn dtn-default genBtn" id="Asbrflt" style="background: rgb(149,149,149)">Сбросить фильтр</button>
                        <button id="AllFiltering" class="btn dtn-default genBtn">Применить фильтр</button>
                    </div>
                </div>
            </div>
            <!-- filter-boxes-->

            <div style="float: right;">

                <input type="search" placeholder="Поиск" id="AshortSearch" style="display:none" class="shortSearch">
                <button id="Asearch" class="btn btn-default genBtn" style="min-width: 50px;display:none">Найти</button>
            </div>

            <a href="1" class="genBtn tableBtn" style="display:none;color: #000; background: #fff; float: right;">Посмотреть на карте</a>
            <a href="#" class="genBtn tableBtn" id="Adgrm" style="display:none color: #000; background: #fff; float: right;">Диаграммы</a>
            <button id="Aotchet" class="btn btn-default genBtn tableBtn" style="float: right;">Отчет</button>
            <input  id="Aotchet" class="btn btn-default genBtn tableBtn" style="float: right;" type="button" name="name" value="Отчет" />
            <hr />

             <div id="Adgrm_" style="display:none" class="row">
         <div class="container">
             <a href="#" onclick="ADwonKol()"  style="width: 80px;color: white;background-color: rgb(0,100,223);text-align:  center;text-decoration:  unset;">Скачать</a><br />
              <a href="#" onclick="AdwonVseqo()"   style="width: 80px;color: white;background-color: rgb(0,100,223);text-align:  center;text-decoration:  unset;margin-left:  31vw;margin-top:  -2vw;margin-bottom:  -0.5vw;">Скачать</a><br />
             <div id="piechart" style="width: 500px; height: 500px;" class="col-md-6 col-xs-12"></div>
       
             <div id="vis_div2" style="width: 600px; height: 400px;" class="col-md-6 col-xs-12"></div>
             
             </div>
     </div>
        <hr />

        </div>
        <!-- filter -->
        <table id="AllRequestTables" class="formTable">
            
                <thead >
                    <tr>
                    <th>№ Заявки</th>
                        
                    <th>Заявитель</th>
                         
                    <th>Адрес</th>
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
                         
                    <th>Статус</th>
                     <th>Оплата</th>
                         
                     </tr>
                </thead>
          
           <tbody>




            </tbody>
        </table>--%>
     
    <div id="AvraboteC" style="display:none"></div>

    
    <div id="AvpolneneC" style="display:none"></div>

    
    <div id="AOtmenC" style="display:none"></div>

     
    <div id="AzakritC" style="display:none"></div>
    <div id="AAlloff" style="display:none"></div>
    <div id="Otpravv" style="display:none"></div>
    <a href="#" id="Asvc" style="display:none"></a>
       <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="Script/download2.js"></script>
</asp:Content>
