<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="CreateSupplier.aspx.cs" Inherits="Kvorum_App.Client_Admin.CreateSupplier" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="button">
        <a id="DeleteUO" href="#" role="button" style="display: none" class="create"><i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;Удалить</a>
    </div>
    <h2 class="obekt" id="SozUp">Создание  поставщиков</h2>
    <div class="">
        <div class="polya">
            <div class="buttons" style="padding-left: 20px;">
                <input type="button" class="btn btn-default genBtn" id="ObUo" name="name" style="display: none" value="Объекты">
                <input type="button" class="btn btn-default genBtn" id="INfoU" name="name" value="Раскрытие информации" style="display: none;">
            </div>
            <div id="Comp_Info">
                <h4>Сведения о предприятии</h4>
                    <label>Полное юридическое наименование предприятия</label>
                        <input type="text" id="FULL_NAME">
                        <label>Сокращенное наименование</label>
                        <input type="text" id="NAME">
                <label>Прикрепленная иконка</label>
                <input type="file" id="filesN">
                <span id="INNS" style="float: right; font-weight: bold; color: red; display: none">""</span>
                <label>ИНН</label>
                <input type="text" id="INN" onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="10"><br>
                <span id="OGRNS" style="float: right; font-weight: bold; color: red; display: none">""</span>
                <label>КПП</label>
                <input type="text" id="KPP" onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="13">
                <br>

                <span id="Name_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
                <label>ОКВЭД</label>
                <input type="text" id="OKVED" onkeypress="return event.charCode >= 48 && event.charCode <= 57|| event.charCode == 46">
                <br>
                <span id="KPPS" style="float: right; font-weight: bold; color: red; display: none">""</span>
                <label>ОГРН</label>
                <input type="text" id="OGRN" onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="9">
                <br>
                <span id="OKPOS" style="float: right; font-weight: bold; color: red; display: none">""</span>
                <label>Орган государственный регистрации</label>
                <input type="text" id="REGIST_ORGAN" maxlength="10">
                <br>
                <label>Дата государственный регистрации</label>
                <input type="date" id="REGIST_DATE" onchange="Date_Controls(this)" onkeyup="Date_Controls(this)">

                <h4>Юридический адрес</h4>
             <div id="LEGAL_ADRESS" style="padding: 5px 8px; border: 1px solid #ddd; background-color: #F4F4F8;">
                    
                    <label id="add_rlbl">Область, город, район, улица  *</label>
                    <input type="text" id="add_r">
                </div>


                <h4>Фактический адрес</h4>
            <div id="ADRESS" style="padding: 5px 8px; border: 1px solid #ddd; background-color: #F4F4F8;">
                    <label id="addr">Область, город, район, улица  *</label>
                    <input type="text" id="adr">
                </div>


                <br>
                <label>Телефон/Факс</label>
                <input type="text" id="PHONE_FAKS">
                <label>Адрес электронной почты</label>
                <input type="text" id="email_supp">
                <label>Пароль</label>
                <input type="password"  id="pass_supp" />
                <label>Cведения о величине зарегистрированного и оплаченного уставного (складочного) капитала  или или величине уставного фонда,имущество</label>
                <input type="number" id="PAYMENT" onkeypress="return event.charCode >= 48 && event.charCode <= 57|| event.charCode != 45" min="0" style="width: 20%;">
                <button id="AddF" onclick="AddFounder(this)" class="btn btn-default logBtn" type="button" style="background-color: rgb(0,147,233);float: right;">Добавить учредителя</button>
                <br>
                <br>
                <div class="INFO_FOUNDERS" style="border-style: double;border-color: rgb(0,147,233);">
                    <i class="fa fa-close removing3" itemid="1" onclick="removeFounder(this)" style="display:none;font-size: 20px;float: right;" aria-hidden="true"></i>
                    <h4>Сведения об учредителях</h4>
                    <label>ФИО</label>
                    <input type="text" id="fio_founders">
                    <label>Дата Рождения</label>
                    <input type="date" id="b_date_founders" onchange="Date_Controls(this)" onkeyup="Date_Controls(this)">
                    <label>Гражданство</label>
                    <input  type="text" id="citi_founders"/>
                         
                    
                    <label>Место жителство (регистрации) </label>
                    <input type="text" id="regist_founders">
                    <label>Место пребывания</label>
                    <input type="text" id="stay_founders">
                    <br>

                    <div id="passport_datas_founders">
                        <h4>Данные паспорта </h4>

                        <label>Серия паспорта</label>
                        <input type="text" id="passport_series_founders">
                        <label>Номер паспорта</label>
                        <input type="text" id="passport_number_founders">
                        <label>Дата выдачи паспорта</label>
                        <input type="date" id="passport_date_founders" onchange="Date_Controls(this)" onkeyup="Date_Controls(this)"><label>Кем выдан паспорт </label>
                        <textarea rows="5" id="issued_by_passport_founder" style="margin: 0px; width: 50%; height: 178px;"></textarea>

                    </div>
                </div>
            </div>
            <hr>
            <div id="Ban_requisites">
                <h4>Банковские реквизиты </h4>
                <span id="bikS" style="float: right; font-weight: bold; color: red; display: none">""</span>
                <label>БИК  </label>
                <input type="text" id="BIK" onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="9">
                <br>
                <span id="BNAMES" style="float: right; font-weight: bold; color: red; display: none">""</span>
                <label>Наименование банка</label>
                <input type="text" id="BANK_NAME" >
                <br>
                
                <label>Корреспондентский счет</label>
                <input type="text" id="CORRESP_ACCOUNT" >
                <br>
                <span id="RSS" style="float: right; font-weight: bold; color: red; display: none">""</span>
                <label>Расчетный счет </label>
                <input type="text" id="CHECKING_ACCOUNT" onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="20">
                <label>Размер суммы удержания от суммы операции в %</label>
                <input type="text" id="FEE">
            </div>
            <div id="info_director">
                <h4>Сведения о руководителе</h4>
                <label>ФИО</label>
                <input type="text" id="FIO">
                <label>Дата рождения</label>
                <input type="date" id="BIRTH_DATE" onchange="Date_Controls(this)" onkeyup="Date_Controls(this)">
                <label>Место рождения</label>
                <input type="text" id="BIRTH_PLACE">
                <label>Вид документа, удостоверяющего личность</label>
                <input type="text" id="TYPE_DOCUMENT">
                <label>Серия</label>
                <input type="text" id="SERIES_DOCUMENT">
                <label>Номер</label>
                <input type="text" id="NUMBERS_DOCUMENT">
                <label>Дата выдачи</label>
                <input type="date" id="DATE_ISSUE" onchange="Date_Controls(this)" onkeyup="Date_Controls(this)">
                <label>Орган, выдавший документ и код подразделения</label>
                <input type="text" id="DIVISION_CODE">
                <label>Контактный телефон</label>
                <input type="text" onkeyup="MaskPhone(this)" id="CONTACT_PHONE">
            </div>
            <br>
            <hr>
            <h4>Контактные данные</h4>
          
            <label>Tinkoff ID</label>
            <img style="width: 45px; float: right;" src="../img/tinkoff.png">
            <input type="text" id="SHOP_ID" style="width: 95%;">
           
            <br>
            <label>vkontakte:</label>
            <input type="text" id="VK">
            <br>
            <label>Одноклассники:</label>
            <input type="text" id="OK">
            <br>
            <label>Facebook:</label>
            <input type="text" id="FB">
            <br>
            <label>Twitter:</label>
            <input type="text" id="TW">
            <br>
            <button id="SaveMO" class="btn btn-default logBtn" type="button" style="background-color: rgb(0,147,233);">Сохранить</button>
            <button id="backUo" class="btn btn-default logBtn" type="button" style="background-color: rgb(149,153,156); margin-left: 7.5%;">Назад</button>
        </div>

    </div>
    <div style="clear: both;">&nbsp;</div>
</asp:Content>
