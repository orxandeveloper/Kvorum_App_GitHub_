<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="AddCounter.aspx.cs" Inherits="Kvorum_App.Manager.AddCounter" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
       <h2 id="HAddC">Добавить счетчик</h2>
    <div  id="pop">

        
            
            <label>Тип помещения</label>
            <select id="RoomType">
                <option>Тип помещения</option>
            </select>
            
            <label>Номер помещения</label>
            <select id="RoomNum">
                <%--<option>Номер помещения</option>--%>
            </select>
            
            <label>ЛС</label>
            <select id="sc">
              
            </select>
            
            <label>Номер счетчика</label>
            <input type="text" id="meterNum"  onkeyup="PositiveValues(this)" style="width: 50%;">
            
            <label>Тип счетчика</label>
            <select id="mtrsType">
                <option value="0">Выберите тип счетчика</option>
            </select>
            <input type="checkbox" id="is_auto" style="margin-right: 10px;">
            <label style="margin-bottom: 9px !important;">Показания передаются автоматически</label>
            <label id="KolTarif">Количество тарифов</label>
            <input type="number" max="3" min="0" onkeyup="PositiveValues(this)" id="AmntTarif" style="width: 50%;">
            
            <label>Дата последней поверки</label>
            <input type="date" id="lstControl" value="02.02.2020">
            
            <label>Дата следующей поверки</label>
            <input id="nextControl" type="date" value="02.02.2020">
            
            <label data-num="1" id="readingH1">Начальное показание</label>
            <input type="number" data-num="1" min="0" onkeyup="PositiveValues(this)" id="reading1" style="width: 50%;">
            
            <label>Дата показания</label>
            <input type="date" id="currMdate" value="02.02.2020">
            <br /> <br />
            <input type="file" id="files" value="Прикрепить файл">
        
            <div class="buttons">
                <button id="AddC" class="btn logBtn">Добавить счетчик</button>
            </div>
    </div>
</asp:Content>
