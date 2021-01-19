<%@ Page Title="" Language="C#" ValidateRequest="false" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="CreateNews.aspx.cs" Inherits="Kvorum_App.Manager.CreateNews" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <style> 
                .newsChunk { 
                        text-align: justify; 
                        margin-bottom: 25px; 
                } 
                .newsDate { 
                        color: #3b404f; 
                        padding-right: 10px; 
                } 
        </style>     
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Создание/редактирование новости</h2>
    <div style="clear: both; height: 21px;">&nbsp;</div>
    <div class="row">
        <div class="col-md- col-xs-12">
            <label>Дата и время публикации</label>
            <input type="date" id="dateNews" required="required">
            <input type="time" id="timeNews"required="required">.
            <label>Заголовок новости</label>
            <input type="text" id="HeaderText">
            <label>Текст новости</label>

            <textarea id="NewText" name="editor1" ></textarea><%--class="ckeditor"--%>
 

            <label>Краткий текст</label>

            <textarea id="PreviewText" style="width:50%; height:100px" name="editor2"></textarea> <%--class="ckeditor"--%>
            <label>Прикрепленный файл</label>
            <input type="file" id="NewsFile">
            <br />
            <label>Прикрепленное изображение</label>
            
            <input type="file" id="filesN" >
          <%--  <img id="imgNews" src="https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg" style="width: 8%;">

            <i class="fa fa-close removing3" itemid="1" onclick="removeNewsImg(this)" style="font-size: 14px; float: left;" aria-hidden="true"></i>--%>
            <br>
            <input type="checkbox" id="ImpNews" style="margin-right: 9px;"><span id="rnumH">Важная новость</span>
            <br>


            <div style="border-style: groove; border-color: linen; width: 32%;">
                <span>Проект к которому относится новость</span><br>
                <input type="radio" id="forProject" name="newsFor" >
                <span style="margin-right:15px" id="forAlbl"></span>
                <input type="radio" name="newsFor" id="forAll"><span> Для всех</span>
            </div>
            <br />
            <input type="checkbox" id="fixed" style="margin-right: 9px;">
            <span >Закреплено</span>
            <div class="buttons1">
                <button id="backto" class="btn btn-default logBtn" type="button" style="background-color: rgb(149,153,156);">Назад</button>
                <button id="ShowNews" class="btn btn-default logBtn" type="button" style="background-color: rgb(0,147,233); width: auto;">Предварительный просмотр</button>
                <button id="SavePublish" class="btn btn-default logBtn" type="button" style="width: auto;">Опубликовать новость</button>
                <button id="SaveNews" class="btn btn-default logBtn" type="button" style="background-color: rgb(0,147,233); width: auto;">Сохранить</button>

            </div>


        </div>

    </div>
</asp:Content>
