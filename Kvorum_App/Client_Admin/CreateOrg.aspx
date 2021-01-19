<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="CreateOrg.aspx.cs" Inherits="Kvorum_App.Client_Admin.CreateOrg" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="button">
                <a id="DeleteUO" href="#" role="button" class="create"><i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;Удалить</a>
            </div>
    <h2 class="obekt" id="SozUp"> Создание  Управляющей организации</h2>
    <div class="">
        <div class="polya">
            <div class="buttons" style="padding-left:20px;">
    <input type="button" class="btn btn-default genBtn" id="ObUo" name="name" style="display:none" value="Объекты" />
    <input type="button" class="btn btn-default genBtn" id="INfoU"   name="name" value="Раскрытие информации" /></div>
                    <span id="INNS" style="float: right; font-weight:bold;color:red; display:none">""</span>
                    <label>ИНН*</label>  
                    <input type="text" id="INN"  maxlength="10"><br>
             <span id="OGRNS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                    <label>ОГРН *</label>
                    <input type="text" id="OGRN" maxlength="13">
                    <br>
             <%--<span style="float: right; font-weight:bold;color:red">""</span>--%>
             <span id="Name_S" style="float: right; font-weight:bold;color:red;display:none">""</span>
                    <label>Наименование организации *</label>
                    <input type="text" id="NAME">
                    <br>
             <span id="KPPS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                    <label>КПП *</label>
                    <input type="text" id="KPP" maxlength="9">
                    <br>
             <span id="OKPOS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                    <label>ОКПО *</label>
                    <input type="text" id="OKPO" maxlength="10">
                    <br>
                    <hr>
                    <h4>Юридический адрес</h4>
            <div style="padding: 5px 8px;border: 1px solid #ddd;background-color: #F4F4F8;">
                <span id="adrS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                    <label id="addr">Область, город, район, улица  *</label>
                    <input type="text" id="adr" list="adrList">
                    <datalist id="adrList">
                        
                    </datalist>
                    
                
                    <input id="manu" class="checkOut" type="checkbox">Ввести вручную
                        <br>
                    <label>Дом  *</label>
                 <span id="domS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                    <input type="text" id="DOM">
                    <br>
                    <label>Строение/корпус</label>
                    <input type="text" id="KORP">
            </div>
                    
                    <br>
                    <hr>
                    <h4>Банковские реквизиты </h4>
             <span id="bikS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                    <label>БИК  *</label>
                    <input type="text" id="bik" maxlength="9">
                    <br>
              <span id="BNAMES" style="float: right; font-weight:bold;color:red;display:none">""</span>
                     <label>Наименование банка</label>
                    <input type="text" id="BNAME" disabled="disabled">
                    <br>
             <span id="BKRSS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                     <label>Корреспондентский счет</label>
                    <input type="text" id="BKRS" disabled="disabled" maxlength="20">
                    <br>
             <span id="RSS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                    <label>Расчетный счет  *</label>
                    <input type="text" id="RS" maxlength="20">
                    <br>
                   

                   
                    
                    <hr>
                    <h4>Контактные данные</h4>
                    <label>Номер телефона</label>
                    <input type="text" id="tlf">
                    <br>
                    <label> Tinkoff ID</label>
                <img style="width: 45px;float: right;" src="../img/tinkoff.png">
                <input type="text" id="Shopid" style="width: 95%;"/>
            <br />
                    <label>E-mail*</label>
                    <input type="text" id="mail">
                    <br>
                    <label>vkontakte:</label>
                    <input type="text" id="vk">
                    <br>
                    <label>Одноклассники:</label>
                    <input type="text" id="ok">
                    <br>
                    <label>Facebook:</label>
                    <input type="text" id="fb">
                    <br>
                    <label>Twitter:</label>
                    <input type="text" id="tw">
                    <br>
             <button id="SaveMO" class="btn btn-default logBtn" type="button" style=" background-color:rgb(0,147,233);">Сохранить</button>
            <button id="backUo" class="btn btn-default logBtn" type="button" style="background-color:rgb(149,153,156);margin-left:7.5%;">Назад</button>
                </div>
           
            </div>
    <div style="clear:both;">&nbsp;</div>
</asp:Content>
