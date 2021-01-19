<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="Accounts.aspx.cs" Inherits="Kvorum_App.Client_Admin.Accounts" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2 id="hdrAcc"><%--Учетные записи клиента (Название основной компании клиента) ID клиента--%></h2>
    <div style="clear: both;">&nbsp;</div>
    <div class="row">
        <div class="col-xs-6">
            <input type="search" id="SearchAcc" placeholder="Поиск"  style="margin-left: 20px;" />
        </div>
        <div class="col-xs-6">
           <%-- <button id="SaveMO" class="btn btn-default genBtn" type="button" style="background-color: rgb(0,147,233); width: auto;">Создать новую учетную запись</button>--%>
            <div class="button">
            <a class="create" href="CreateAccount.aspx"><i class="fa fa-plus-square-o" aria-hidden="true"></i>&nbsp;Создать</a>
        </div>

        </div>
    </div>


    <table border="0" cellspacing="0" cellpadding="0">
        <tbody id="UoBody">
            <tr id="uz1">
                <td>
                    <label>Логин ID</label><input type="button" id="ld" onclick="Sortedby(this,'LDesc')" class="nsortA"></td>
               <%-- <td>
                    <label>Пароль</label></td>--%>
                <td>
                    <label>Наименование (ФИО)</label><input type="button" id="fi_o" onclick="Sortedby(this,'FIODesc')" class="nsortA"></td>
                <td>
                    <label>Телефон</label></td>
                <td>
                    <label>E-mail</label><%--<input type="button" id="em_ail"  onclick="Sortedby(this,'EmailDesc')" style="width:0.5vw;height:1.5vh;">--%></td>
                <td>
                    <label>Модуль</label><input type="button" id="md" class="nsortA"></td>
                <td>
                    <label>Роль</label><input type="button" id="rl" class="nsortA"></td>
                
            </tr>
          <%--  <tr>
                    <td><a href="CreateAccount.aspx" onclick="DetailAcc(463)">Id</a></td>
                    <td><a href="CreateAccount.aspx" onclick="DetailAcc(463)">pass</a></td>
                    <td><a href="CreateAccount.aspx" onclick="DetailAcc(463)">Name</a></td>
                    <td><a href="CreateAccount.aspx" onclick="DetailAcc(463)">tel</a></td>
                    <td><a href="CreateAccount.aspx" onclick="DetailAcc(463)">mail</a></td>
                    <td><a href="CreateAccount.aspx" onclick="DetailAcc(463)">Modul1</a><br /><a href="CreateAccount.aspx" onclick="DetailAcc(463)">Modul2</a></td>
                    <td><a href="CreateAccount.aspx" onclick="DetailAcc(463)">Role1</a><br /><a href="CreateAccount.aspx" onclick="DetailAcc(463)">Role2</a></td>
                </tr>--%>

        </tbody>

    </table>

    <div class="layoutBtns">
        <!--    <button id="SaveMO" class="btn btn-default logBtn" type="button" style="background-color:rgb(0,147,233); width:auto;">Создать новую учетную запись</button>-->
       <%-- <button id="backUo" class="btn btn-default logBtn" type="button" style="background-color: rgb(149,153,156); margin-left: 5%;">Назад</button>--%>
    </div>
    <script>
        function DetailAcc(accLogId) {
            sessionStorage.setItem("ComesTo", "");
            sessionStorage.setItem("LogId", accLogId)
        }
    </script>
</asp:Content>
