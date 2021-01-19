<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="AdjustPaymentSistem.aspx.cs" Inherits="Kvorum_App.Client_Admin.AdjustPaymentSistem" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/Navigation-Clean1.css">
    <link rel="stylesheet" href="assets/css/styles.css">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="col-md-6" style="min-width: 0; width: 85%; position: relative; padding: 0px;">
        <h3 class="header" style="padding-left: 0px; margin-left: 0px; margin-right: auto; width: 100%; padding-bottom: 20px; text-align: center;">Настройки платежных систем для оплаты жителей</h3>
    </div>
    <div class="col-md-6" style="min-width: 0; width: 85%; position: relative; padding: 0px; border-top: 1px solid lightgray;">
        <h5 class="header" style="padding-left: 0px; margin-left: 0px; margin-right: auto; width: 100%; padding-bottom: 0px; text-align: center;"><strong>PayOnline</strong> </h5>
    </div>
    <div class="col-md-12" style="width: 85%; padding-bottom: 10px; padding-left: 30%;">
        <span>Merchant ID</span>
        <input type="text" style="margin-left: 67px; width: 250px;">
    </div>
    <div class="col-md-12" style="width: 85%; padding-bottom: 10px; padding-left: 30%;">
        <span>Private security key</span>
        <input type="text" style="margin-left: 24px; width: 250px;">
    </div>
    <div class="col-md-12" style="width: 85%; padding: 0px; padding-top: 30px;">
        <h5 class="header" style="padding-left: 0px; margin-left: 0px; margin-right: auto; width: 100%; padding-bottom: 0px; text-align: center;"><strong>Монета.ру</strong> </h5>
    </div>
    <script src="assets/js/jquery.min.js"></script>
    <div class="col-md-12" style="width: 85%; padding: 0px; padding-bottom: 10px; padding-left: 30%; padding-top: 10px;">
        <span>Номер счета</span>
        <input type="text" style="margin-left: 62px; width: 250px;">
    </div>
    <div class="col-md-12" style="width: 85%; padding: 0px; padding-bottom: 10px; padding-left: 30%;">
        <span>Номер договора</span>
        <input type="text" style="margin-left: 39px; width: 250px;">
    </div>
    <div class="col-md-12" style="width: 85%; padding: 0px; padding-bottom: 10px; padding-left: 30%;">
        <span>Дата договора</span>
        <input type="text" style="margin-left: 51px; width: 250px;">
    </div>
    <div class="col-md-12" style="width: 85%; padding: 0px; padding-bottom: 10px; padding-left: 15px; padding-top: 230px;">
        <button class="btn btn-default" type="button" style="margin-left: 37%; background: lightblue; margin-bottom: 10px;">Сохранить изменения</button>
        <button class="btn btn-default" type="button" style="margin-left: 70px; margin-bottom: 10px;">Отмена </button>
    </div>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
</asp:Content>
