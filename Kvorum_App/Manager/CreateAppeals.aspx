<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="CreateAppeals.aspx.cs" Inherits="Kvorum_App.Manager.CreateAppeals" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .delFile {
            background: #ccc
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Добавить  обращения</h2>
    <div>
        <button class="btn genBtn" id="backAddUser" style="background: #ccc">Назад</button>
        <button id="SaveAppeal" class="btn genBtn">Сохранить</button>
        <div class="button">
            <a id="DeletePOM" href="#" role="button" class="create" style="display: none;"><i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;Удалить</a>
        </div>
        <div class="col-md-12">
            <div class="col-md-3">
                <label>Дата обращения</label></div>
            <div class="col-md-7">
                <input type="date" id="dAp"></div>
            <div class="col-md-3">
                <label>Тема обращения</label></div>
            <div class="col-md-7">
                <select id="themAp"></select></div>
            <div class="col-md-3">
                <label>Короткое содержание обращения</label></div>
            <div class="col-md-7">
                <textarea id="ShortA"></textarea></div>

            <div class="col-md-3">
                <label>Ответственное лицо</label></div>
            <div class="col-md-7">
                <input type="text" id="respPers"></div>

            <div class="col-md-3">
                <label>Номер входяещего письма</label></div>
            <div class="col-md-7">
                <input type="text" id="InboxNum"></div>

            <div class="col-md-3">
                <label>Дата входяещего письма</label></div>
            <div class="col-md-7">
                <input type="date" id="InboxDate"></div>

            <div class="col-md-3">
                <label>Номер изходящего письма</label></div>
            <div class="col-md-7">
                <input type="text" id="OutboxNum"></div>

            <div class="col-md-3">
                <label>Дата изходящего письма</label></div>
            <div class="col-md-7">
                <input type="date" id="OutboxDate"></div>

            <div class="col-md-3">
                <label>Примечание</label></div>
            <div class="col-md-7">
                <textarea id="NoteA"></textarea></div>

            <div class="col-md-3">
                <label>Статус обращения</label></div>
            <div class="col-md-7">
                <select id="StatusAp"></select></div>
            <div class="col-md-3">
                <label>Файл обращения</label>
                <div class="col-md-6">
                    <input type="button" value="Прикрепить" class="btn genBtn"></div>
                <div class="col-md-6">
                    <input type="button" value="Удалить" class="btn genBtn delFile"  ></div>
            </div>

            <div class="col-md-7">
                <a>Скан письменного обращения1.jpg</a>
                <br>
                <a>ОБРАЩЕНИК.docx</a>
            </div>
            <div style="clear: both; height: 21px;">&nbsp;</div>
               
            <div class="col-md-3">
                <label>Файл аудиосообщения</label>
                <div class="col-md-6">
                    <input type="button" value="Прикрепить" class="btn genBtn"></div>
                <div class="col-md-6">
                    <input type="button" value="Удалить" class="btn genBtn delFile"></div>
            </div>
            <div class="col-md-7">
                <a>Звонок1.mp3</a>
            </div>
            <div style="clear: both; height: 21px;">&nbsp;</div>
            <div class="col-md-3">
                <label>Файл Ответа</label>
                <div class="col-md-6">
                    <input type="button" value="Прикрепить" class="btn genBtn"></div>
                <div class="col-md-6">
                    <input type="button" value="Удалить" class="btn genBtn delFile"></div>
            </div>
            <div class="col-md-7">
                <a>Скан письменного обращения1.jpg</a>
                <br>
                <a>ОБРАЩЕНИК.docx</a>
            </div>
        </div>
    </div>
</asp:Content>
