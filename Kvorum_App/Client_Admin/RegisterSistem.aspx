<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="RegisterSistem.aspx.cs" Inherits="Kvorum_App.Client_Admin.RegisterSistem" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/Navigation-Clean1.css">
    <link rel="stylesheet" href="assets/css/styles.css">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="col-md-6" style="min-width:0;width:85%;position:relative;padding:0px;">
                    <h3 class="header" style="padding-left:0px;margin-left:0px;margin-right:auto;width:100%;padding-bottom:20px;">Мои ресурсы </h3></div>
    <div class="col-md-6" style="min-width:0;width:85%;position:relative;height:602px;">
                    <div class="table-responsive" style="width:70%;margin-right:0px;margin-left:15%;position:relative;">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="active" style="/*text-align:center;*/width:50%;"><strong>Название ресурса</strong></th>
                                    <th style="text-align:center;width:25%;">Тип списания</th>
                                    <th style="width:25%;text-align:center;">Осталось </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Заявки </td>
                                    <td style="text-align:center;">Разовое</td>
                                    <td style="text-align:center;">200 </td>
                                </tr>
                                <tr>
                                    <td>Лицевые счета</td>
                                    <td style="text-align:center;">Ежеденевное </td>
                                    <td style="text-align:center;">100 </td>
                                </tr>
                                <tr>
                                    <td>Консалтинг. Помощь по работе с системой</td>
                                    <td style="text-align:center;">Разовое</td>
                                    <td style="text-align:center;">10 </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/js/jquery.min.js"></script>
</asp:Content>
