<%@ Page Title="" Language="C#" MasterPageFile="~/Supplier_Office/SupOffice.Master" AutoEventWireup="true" CodeBehind="SupplierServices.aspx.cs" Inherits="Kvorum_App.Supplier_Office.SupplierServices" %>
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
            <li class="active">Услуги</li>
        </ul>



        <h2>Мои услуги <a href="RequestCreate.aspx" onclick="GoToSuppOficePage('RequestCreate.aspx')"class="btn newBtn txtRt" style="background: #1a4f79; color: #fff; border-radius: 0 15px 15px 0;">Создать услугу <span class="icnMain"></span></a></h2>
        <div class="space20"></div>


       


        <div class="space30"></div>

        <table id="Services_Table" class="table myOrders">
           <thead>
                             <tr>
                            <th> Услуга </th>
                            <th>Ед-изм</th>
                            <th>Сумма услуг</th>
                             
                            <th>Иконка услуг</th>
                            <th>Проект</th>
                         
                        </tr>
                             </thead>
            <tbody id="requestBody">


            </tbody>
        </table>

        <div class="space40"></div>
    <%-- <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>--%>
    
</asp:Content>
