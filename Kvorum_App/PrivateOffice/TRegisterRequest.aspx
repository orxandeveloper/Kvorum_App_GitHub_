<%@ Page Title="" Language="C#" MasterPageFile="~/PrivateOffice/Private.Master" AutoEventWireup="true" CodeBehind="TRegisterRequest.aspx.cs" Inherits="Kvorum_App.PrivateOffice.TRegisterRequest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <style>       .table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {padding:4px;
        }

    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 
        <div class="row">
		<div class="container">
            <div class="col-lg-3 ">
                <div class="titleHeader">Личный кабинет</div>
                <ul class="sidebarNav sidebarGrnd">
                    <li>
                        <a class="sideActive" href="">Мои заявки</a>
                    </li>
                    <li>
                        <a class="" href="">Заказать услугу</a>
                    </li>
                    <li>
                        <a class="" href="">Передать показания счётчиков</a>
                    </li>
                    <li>
                        <a class="" href="">Мои начисления и оплаты</a>
                    </li>
                    <li>
                        <a class="" href="">Мои уведомления</a>
                    </li>
                    <li>
                        <a class="" href="">Вопросы</a>
                    </li>
                    <li>
                        <a class="" href="">Профиль</a>
                    </li>
                </ul>

            </div>
            <div class="col-lg-9">
	            <ul class="breadcrumb">
			        <li class="active"><a href="#">Главная</a></li>
			        <li>Мои заявки</li>
	            </ul>
				

							
                <h2>Мои заявки</h2>
                <div class="space20"></div>

                
			    <!--table start-->						
	
            <table class="table">
                <thead>
                  <tr>
                            <td><span class="StatPeriod"><b>Статус:</b></span></td>
                            <td style="display:none"><span class="StatPeriod"><b>Направление:</b></span></td>
                            <td><span class="StatPeriod"><b>Номер:</b></span></td>
                            <td><span class="StatPeriod"><b>Период создания:</b></span></td>
                            <td>
                                <button type="button" id="createRequest" class="btn logBtn newBtn">Создать заявку</button></td>
                        </tr>
			      </thead>
                      <tbody>
                    <tr>
                            <td>
                                <select id="Jsts" name="FILTER_STATUS">
                                    <option value="0">Все статусы</option>
                              

                                </select>
                            </td>
                            <td style="display:none">
                                <select id="serviceType">
                                    <option value="0">Выбрать все</option>

                                <option value="1">Выполнение работ</option><option value="4">Допуск</option></select>
                            </td>
                             <td>
                                 <input type="number" id="rid" style="padding: 5px 0;" name="name" value="">
                            </td>

                            <td style="white-space: nowrap;"><input type="date" id="AstartTime" class="diz6" style="max-width:135px;">
                                <input type="date" id="AendTime" class="diz6" style="max-width:135px;">
                            </td>
                            <td style="white-space: nowrap;">
                                <input type="button" id="AllFiltering" class="btn genBtn" name="FILTER_SUBMIT" value="Начать поиск" style="float:none; margin-top:0;">
                                <input type="button" id="Asbrflt" class="btn genBtn greyBtn" name="FILTER_CANCEL" value="Очистить поля" style="float:none; margin-top:0;">
                            </td>
                        </tr>
                </tbody>
                </table>

                <div class="space30"></div>

                <table id="myTable" class="table tablesorter">
                    <thead>
                        <tr>
                            <td>Номер  
                                <%--<input type="button" id="num" onclick="Sortedby(this, 'FIODesc')" class="nsortA">--%>
                                <a >
                             <i data-icon="w" onclick="Sortedby(this, 'REQUEST_ID','asc')" class="fa fa-unsorted" aria-hidden="true"></i>
                                    </a>
                            </td>
                            <td>Дата и время создания заявки   
                                   <a >
                             <i data-icon="w" onclick="Sortedby(this, 'CR_DATE','asc')" class="fa fa-unsorted" aria-hidden="true"></i>
                                    </a>
                            </td>
                            <td>Выполнена  
                                   <a >
                             <i data-icon="w" onclick="Sortedby(this, 'DONE_DATE','asc')" class="fa fa-unsorted" aria-hidden="true"></i>
                                    </a>
                            </td>
                            <%--<td>Поставщик   
                                  <a >
                             <i   class="fa fa-arrows-v" aria-hidden="true"></i>
                                    </a>
                            </td>--%>
                            <td>Статус  
                                   <a >
                             <i  data-icon="w" onclick="Sortedby(this, 'STATUS_ID','asc')" class="fa fa-unsorted" aria-hidden="true"></i>
                                    </a>
                            </td>
                        </tr>
                    </thead>
                    <tbody id="requestBody">
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>	

    <div class="space40"></div>
  
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/vendor/slick/slick.js"></script>
    <!--<script src="js/jquery.nicescroll.js"></script>-->
    <script src="js/jflickrfeed.min.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/jquery.spasticNav.js"></script>
    <script src="js/jquery.prettyphoto.js"></script>
    <script src="js/main.js"></script>
    <script src="js/Utilities.js"></script>
         <script src="js/jquery-latest.js"></script>
  <%--  <script src="js/tablesorter.js"></script>
    <script>
        $(document).ready(function () {
            $("#myTable").tablesorter();
        })
    </script>--%>
</asp:Content>
