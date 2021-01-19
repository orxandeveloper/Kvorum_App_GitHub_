<%@ Page Title="" Language="C#" MasterPageFile="~/Disp_Admin/Dispatcher.Master" AutoEventWireup="true" CodeBehind="CreateDisp.aspx.cs" Inherits="Kvorum_App.Disp_Admin.CreateDisp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <h2>Создание диспетчерской</h2>
        
                <form runat="server">
                 
                        <label>Название диспетчерской</label>
                        <input type="text" style="width:68%;"/>
                       
                        <label>Номер телефона</label>
                        <input type="tel" />
                    
                        <label>Объект диспетчерской</label>
                        <select><option>Адрес объекта</option></select>
                        <input type="button" value="Выберите объект" class="btn btn-default genBtn"/>
                        
                        <label>Диспетчер</label>
                        <select><option>Учетные записи роли</option></select>
                        <input type="button" value="Выберите учетную запись" class="btn btn-default genBtn" />
                  
                        <label>Инженер</label>
                        <select><option>Учетные записи роли</option></select>
                        <input type="button" value="Выберите учетную запись" class="btn btn-default genBtn"/>
                     
                        <label>Техник</label>
                        <select><option>Учетные записи роли</option></select>
                        <input type="button" value="Выберите учетную запись"class="btn btn-default genBtn" />
                    
                    <div class="row">
                        <div class="col-xs-1">
                            <label>Иконка</label>
                        </div>
                        <div class="col-xs-2">
                            <img class="foto-disp" src="../img/disp2.png" />
                        </div>
                        <div class="col-xs-9">
                            <input type="button" value="Выбрать изображение из списка" class="btn btn-default genBtn" style="margin:1em 0 0.5em 0;"/>
                            <input type="file" value="Загрузить свое изображение" />
                        </div>
                    </div>
                  
                    <div class="buttons">
                 
                    <button id="saveD" class="btn btn-default logBtn" type="button" style="background-color:rgb(0,223,100);">Сохранить</button>
                     
                    <button id="saveActD" class="btn btn-default logBtn" type="button" style="background-color:rgb(0,100,223);">Сохранить и активировать</button>

                    <button id="backD" class="btn btn-default logBtn" type="button" style="background-color:rgb(149,153,156);">Назад</button>
                    </div>
                </form>
</asp:Content>
