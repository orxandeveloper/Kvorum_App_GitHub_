<%@ Page Title="" Language="C#" MasterPageFile="~/Supplier_Office/SupOffice.Master" AutoEventWireup="true" CodeBehind="Requests.aspx.cs" Inherits="Kvorum_App.Supplier_Office.Requests" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        
       <%-- <div class="carousel-reviews broun-block">

            <div id="carousel-reviews" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="item active">

                        <div class="gallery img-responsive">
                            <h3 class="galHeader"><span class="glyphicon glyphicon-home"></span>ФИЛИ ГРАД</h3>

                        </div>
                    </div>
                    <!--  <div class="item">
                               <div class="gallery img-responsive">
                                        <h3>А это тот же дом, который построил Джек</h3>	
				                </div>
                            </div>-->
                </div>
                <a class="left carousel-control" href="#carousel-reviews" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left"></span>
                </a>
                <a class="right carousel-control" href="#carousel-reviews" role="button" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right"></span>
                </a>
            </div>
            
        </div>--%>
        <!-- row end-->
        <br>

        <ul class="breadcrumb">
            <li><a href="MainPage.aspx">Главная</a></li>
            <li class="active">Заявки</li>
        </ul>



        <h2>Мои заявки <a href="RequestCreate.aspx" onclick="GoToSuppOficePage('RequestCreate.aspx')"class="btn newBtn txtRt" style="background: #1a4f79; color: #fff; border-radius: 0 15px 15px 0;">Сделать заявку <span class="icnMain"></span></a></h2>
        <div class="space20"></div>


        <!--table start-->

        <table class="table filterBorder">
            <tbody>
                <tr>
                    <td><span class="StatPeriod"><b>Статус:</b></span></td>
                    <td><span class="StatPeriod"><b>Номер:</b></span></td>
                    <!--   <td><span class="StatPeriod"><b>Направление:</b></span></td> -->

                    <td><span class="StatPeriod"><b>Период создания:</b></span></td>

                </tr>

                <tr>
                    <td>
                        <select id="Jsts" name="FILTER_STATUS">
                            <option value="0">Все статусы</option>
                            <option value="2">Отправлена</option>
                            <option value="1">В работе</option>
                            <option value="3">Выполнена</option>
                            <option value="4">Отменена</option>
                            <option value="5">Закрыта</option>
                        </select>
                    </td>
                    <!--    <td>
                                <select id="serviceType">
                                    <option value="0">Выбрать все</option>
									<option value="1">Выполнение работ</option>
									<option value="4">Допуск</option>
								</select>
                            </td> -->
                    <td>
                        <input type="number" id="rid" name="name" value="" style="width: 70px;">
                    </td>

                    <td style="white-space: nowrap;">
                        <input type="date" id="AstartTime"    class="diz6">
                        <input type="date" id="AendTime"   class="diz6">
                    </td>
                    <td rowspan="2" style="float: right; padding-right: 0; margin-top: -15px;">
                        <button id="AllFiltering" class="btn" name="FILTER_SUBMIT" style="border-radius: 15px 0 0 15px; color: #fff; background: #1a4f79">Применить</button>
                        <button id="Asbrflt" class="btn greyBtn" name="FILTER_CANCEL" style="border-radius: 0 15px 15px 0;">Сбросить результаты</button>
                    </td>
                </tr>

            </tbody>
        </table>



        <div class="space30"></div>

        <table id="RequestTables" class="table myOrders">
           <thead>
                             <tr>
                            <th> № Заявки </th>
                            <th>Заявитель</th>
                            <th>Адрес</th>
                            <%-- <th>
                                <label class="adir">Тип помещения</label>
                                </th>--%>
                            <th>Дата создания</th>
                            <th>Обращение абонента</th>
                            <th>Исполнитель</th>
                            <th>Планируемая дата</th>
                          <%--  <th>
                                <label>Услуга/товар</label>
                                    </th>--%>
                            <th>Статус</th>
                            <th>Оплата</th>
                        </tr>
                             </thead>
            <tbody id="requestBody">


            </tbody>
        </table>

        <div class="space40"></div>
    <%-- <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>--%>
    
</asp:Content>
