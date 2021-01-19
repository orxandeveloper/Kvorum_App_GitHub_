<%@ Page Title="" Language="C#" MasterPageFile="~/Supplier_Office/SupOffice.Master" AutoEventWireup="true" CodeBehind="Requisites.aspx.cs" Inherits="Kvorum_App.Supplier_Office.Requisites" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <br/>
<ul class="breadcrumb">
            <li><a href="MainPage.aspx">Главная</a></li>
            <li class="active">Мои реквизиты</li>
        </ul>

   <div id="Comp_Info">
<style>
#Comp_Info input {
	text-align: left;
    width: 50%;
    width: -webkit-fill-available;
    background-color: #fff;
    border: none;
    padding: 0;
    border-bottom: 1px solid #ccc;
}
#Comp_Info .INFO_FOUNDERS {
	width: auto;
	clear: both;
	padding: 1em;
	background-color: #f3f3f3;
}
#LEGAL_ADRESS, #ADRESS {
	/*padding: 5px 8px; 
	border: 1px solid #ddd; 
	background-color: #F4F4F8;*/
}
#AddF {
	background-color: rgb(0,147,233); float: right;
    margin-top: -1em;
    width: 21%;
	display: none;
}
#bikS, #RSS, #BNAMES, #KPPS, #OKPOS, #INNS, #OGRNS, #Name_S {
	float: right; font-weight: bold; color: red; display: none;
	}
.passDat {margin: 0px; width: 50%;
    width: -webkit-fill-available;}
</style>
        <label>Полное юридическое наименование предприятия</label><br>
        <input disabled="disabled" type="text" id="FULL_NAME"><br>
        <br>

        <label>Сокращенное наименование</label>
     <br>

        <input disabled="disabled" type="text" id="NAME">
        <br>
        <br>
        <label>Прикрепленная иконка</label><br>
        <input disabled="disabled" type="file" id="filesN">
        <br>
        <span id="INNS" style="">""</span>
        <label>ИНН</label><br>
        <input disabled="disabled" type="text" id="INN" maxlength="10">
        <br>
        <br>
        <span id="OGRNS" style="">""</span>
        <label>КПП</label><br>
        <input disabled="disabled" type="text" id="KPP" maxlength="13">
        <br>

        <span id="Name_S" style="">""</span>
        <br>
        <label>ОКВЭД</label><br>
        <input disabled="disabled" type="text" id="OKVED">
        <br>
        <br>
        <span id="KPPS" style="">""</span>
        <label>ОГРН</label><br>
        <input disabled="disabled" type="text" id="OGRN" maxlength="9">
        <br>
        <br>
        <span id="OKPOS" style="">""</span>
        <label>Орган государственный регистрации</label><br>
        <input disabled="disabled" type="text" id="REGIST_ORGAN" maxlength="10">
        <br>
        <br>
        <label>Дата государственный регистрации</label><br>
        <input disabled="disabled" type="date" id="REGIST_DATE">

        <h4>Юридический адрес</h4>
        <div id="LEGAL_ADRESS" style="">
           <input disabled="disabled" type="text" id="add_r">
        </div>


        <h4>Фактический адрес</h4>
        <div id="ADRESS" style="">

            <input disabled="disabled" type="text" id="adr">
        </div>


        <br>
        <label>Телефон/Факс</label><br>
        <input disabled="disabled" type="text" id="PHONE_FAKS">
        <br>
        <br>
        <label>Адрес элэктронной почты</label><br>
        <input disabled="disabled" type="text" id="email_supp">
        <br>
        <br>
        <label>Пароль</label><br>
        <input disabled="disabled" type="password" id="pass_supp">
        <br>
        <br>
        <label style="width: 70%;">Cведения о величине зарегистрированного и оплаченного уставного (складочного) капитала  и/или величине уставного фонда, имущества</label><br>
        <input disabled="disabled" type="number" id="PAYMENT" style="width: 20%;">
		
        <button id="AddF" onclick="AddFounder(this)" class="btn btn-default logBtn" type="button" style="">Добавить учредителя</button>
        <br>
        <br>
    <div class="INFO_FOUNDERS" style="">
            <i class="fa fa-close removing3" itemid="1" onclick="removeFounder(this)" style="font-size: 20px; float: right;" aria-hidden="true"></i>
            <h3>Сведения об учредителях</h3>
 <div class="row"><div class="col-md-6 col-xs-12">
			<label>ФИО</label><br>
            <input disabled="disabled" type="text" id="fio_founders">
            <br>
            <br>
            <label>Дата Рождения</label><br>
            <input disabled="disabled" type="date" id="b_date_founders">
            <br>
            <br>
            <label>Гражданство</label><br>
            <input disabled="disabled" type="text" id="citi_founders">
            <br>
            <br>


            <label>Место жительства (регистрации) </label>
            <br>
            <input disabled="disabled" type="text" id="regist_founders">
            <br>
            <br>
            <label>Место пребывания</label><br>
            <input disabled="disabled" type="text" id="stay_founders">
            <br>
		</div><div class="col-md-6 col-xs-12">
            <div id="passport_datas_founders">
                <h3>Данные паспорта </h3>

                <label>Серия паспорта</label><br>
                <input disabled="disabled" type="text" id="passport_series_founders">
                <br>
                <br>
                <label>Номер паспорта</label><br>
                <input disabled="disabled" type="text" id="passport_number_founders">
                <br>
                <br>
                <label>Дата выдачи паспорта</label>
                <br>
                <input disabled="disabled" type="date" id="passport_date_founders">
                <br>
                <br>
                <label>Кем выдан паспорт </label>
                <br>
                <textarea  disabled="disabled" rows="5" id="issued_by_passport_founder" class="passDat"></textarea>
		
            </div>
    </div></div>
    </div>
    <div id="Ban_requisites">
        <h3>Банковские реквизиты </h3>
        <span id="bikS" style="">""</span>
        <label>БИК  </label>
        <br>
        <input  disabled="disabled" type="text" id="BIK">
        <br>
        <br>
        <span id="BNAMES"  style="">""</span>
        <label>Наименование банка</label>
        <br>
        <input type="text"  disabled="disabled" id="BANK_NAME">
        <br>
        <br>

        <label>Корреспондентский счет</label>
        <br>
        <input type="text"  disabled="disabled" id="CORRESP_ACCOUNT">
        <br>
        <br>
        <span id="RSS" style="">""</span>
        <label>Расчетный счет </label>
        <br>
        <input type="text"  disabled="disabled" id="CHECKING_ACCOUNT">

        <br>
        <br>
        <label>Размер суммы удержания от суммы операции в %</label><br>

        <input type="text"  disabled="disabled" id="FEE">
    </div>
    <div id="info_director">
        <h3>Сведения о руководителе</h3>
        <br>
        <label>ФИО</label>
        <br>
        <input type="text"  disabled="disabled" id="FIO">
        <br>
        <br>
        <label>Дата рождения</label>
        <br>
        <input type="date"  disabled="disabled" id="BIRTH_DATE">
        <br>
        <br>
        <label>Место рождения</label>
        <br>
        <input type="text"  disabled="disabled" id="BIRTH_PLACE">
        <br>
        <br>
        <label>Вид документа, удостоверяющего личность</label>
        <br>
        <input type="text"  disabled="disabled" id="TYPE_DOCUMENT">
        <br>
        <br>
        <label>Серия</label>
        <br>
        <input type="text"  disabled="disabled" id="SERIES_DOCUMENT">
        <br>
        <br>
        <label>Номер</label>
        <br>

        <input type="text"  disabled="disabled" id="NUMBERS_DOCUMENT">
        <br>
        <br>
        <label>Дата выдачи</label>
        <br>
        <input type="date"  disabled="disabled" id="DATE_ISSUE">
        <br>
        <br>
        <label>Орган, выдавший документ и код подразделения</label>
        <br>
        <input type="text"  disabled="disabled" id="DIVISION_CODE">
        <br>
        <br>
        <label>Контакный телефон</label>
        <br>
        <input type="text"  disabled="disabled" id="CONTACT_PHONE">
    </div>
    <div id="req_contacts">
        <h3>Контактные данные</h3>

        <label>Tinkoff ID</label>
        <br>

        <input type="text"  disabled="disabled" id="SHOP_ID" style="width: 85%;">

        <img style="width: 45px; float: right;" src="../img/tinkoff.png"><br>
        <br>

        <label>vkontakte:</label>
        <br>
        <input type="text"  disabled="disabled" id="VK">
        <br>
        <br>
        <label>Одноклассники:</label><br>

        <input type="text"  disabled="disabled" id="OK">
        <br>
        <br>
        <label>Facebook:</label>
        <br>
        <input type="text"  disabled="disabled" id="FB">
        <br>
        <br>
        <label>Twitter:</label>
        <br>
        <input type="text"  disabled="disabled" id="TW">
        <br>
    </div>
<br style="clear:both;"/>
</div> <!-- #Comp_Info -->
</asp:Content>
