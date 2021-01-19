<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="Users_.aspx.cs" Inherits="Kvorum_App.Manager.Users_" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .selectedL {
            background-color: #999 !important;
        }

        .bdfLabel {
            margin-left: -29px;
            margin-right: -30px;
        }

        .addMassDiv {
            width: 35%;
        }

        .AddUsers {
            float: left;
        }

        .MassUsers {
            float: left;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Пользователи</h2>

    <div style="padding: 20px;">
        <input type="button" id="fis" value="Физические лица" class="btn genBtn selectedL">
        <input type="button" id="Yur" value="Юридические лица" class="btn genBtn">
        <input type="button" id="Gos" value="Государственные учреждения" class="btn genBtn">
    </div>

    <div class="button addMassDiv">
        <a type="button" id="AddUsers" href="AddUsers_.aspx" class="btn genBtn AddUsers">Добавить физическое лицо</a>
        <input type="button" id="MassUsers" value="Выгрузить физическое лицо" class="btn genBtn MassUsers" style="float: right;">
    </div>
    <h4 style="padding-left: 20px;">Фильтр</h4>
    <div class="row" style="padding-left: 20px; margin-right: -15px;">
        <div class="col-md-6 col-xs-12">
            <label for="fio_pol">ФИО</label>

            <input type="text" id="fio_pol">
            <br>

            <label for="phone_pol">Мобилный телефон</label>

            <input type="text" id="phone_pol">


            <br>

            <label for="email_pol">Е-mail</label>

            <input type="text" id="email_pol" name="name" value="">
        </div>
        <div class="col-md-6 col-xs-12">
            <label for="userType_pol">Вид пользвателя</label>

            <select id="userType_pol"></select>
            <br>

            <label for="persAcc">Номер ЛС:</label>
            <input type="text" id="persAcc_pol" value="">
            <br>
            <label>Дата рождения</label>
            <input type="date" id="bd_pol"><br>
            <label>Период Рождение</label>
            <div class="col-md-12">
                <div class="col-md-1 bdfLabel">
                    <label>с:</label>
                </div>
                <div class="col-md-4">
                    <input type="date" id="bdf_pol">
                </div>
                <div class="col-md-1">
                    <label>по:</label>
                </div>
                <div class="col-md-4">
                    <input type="date" id="bdt_pol">
                </div>
            </div>



            <div style="clear: both;">&nbsp;</div>
            <div class="button" style="top: 0;">
                <button class="btn genBtn" id="fltr">Применить фильтр</button>

                <button class="btn genBtn" id="sbros">Сбросить результаты</button>
            </div>
            <!-- button-->
        </div>
    </div>
    <div style="clear: both;">&nbsp;</div>

    <table id="table_pol">
        <thead>
            <tr>
                <th>ФИО</th>
                <th>Роль пользователя</th>
                <th>Лицевой счет</th>
                <th>Мобильный телефон</th>
                <th>E-mail</th>
            </tr>
        </thead>
        <tbody id="pols">
        </tbody>
    </table>

</asp:Content>
