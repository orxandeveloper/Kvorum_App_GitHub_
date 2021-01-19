<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="RegisterObject.aspx.cs" Inherits="Kvorum_App.Client_Admin.RegisterObject" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<link href="css/StyleSheet.css" rel="stylesheet" />
    <link href="css/Reestr_obektov.css" rel="stylesheet" />--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%--<div class="content-title">
        <h2>Объекты</h2>
    </div>
    <div>
        <div class="button">
            <a class="create" href="Client_Admin/CreateOpject.aspx">Создать новый</a>
        </div>
        <div class="reestr">
            <table class="table">
                <thead>
                    <tr>
                        <th class="adres">Адрес объекта</th>
                        <th class="foto">Изображение объекта</th>
                        <th class="name-UO">Наименование организации</th>
                    </tr>
                </thead>
                <tbody id="objs">
               
                  
                </tbody>
            </table>
        </div>
    </div>--%>
    <div class="content-title">
        <h2>Объекты</h2>

        <div class="button" onclick="cmsto();" id="crObject">
            <a class="create" href="CreateOpject.aspx"><i class="fa fa-plus-square-o" aria-hidden="true"></i>&nbsp;Создать</a>
        </div>
        <div class="reestr">
            <table class="table" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th class="adres">Адрес объекта</th>
                        <th class="foto">Изображение объекта</th>
                        <th class="name-UO">Наименование организации</th>
                    </tr>
                </thead>
                <tbody id="objs">
               
                  
                </tbody>
            </table>
        </div>
    </div>
    <script>
        function DetailObj(objId_) {
            sessionStorage.setItem("ComesTo", "")
            sessionStorage.setItem("ObjId", objId_);
           // alert(sessionStorage.getItem("ObjId"))
        }
        function cmsto() {
            sessionStorage.setItem("ComesTo","")
        }
    </script>
</asp:Content>
