<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="ProfileSettings.aspx.cs" Inherits="Kvorum_App.Client_Admin.ProfileSettings" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UPRAVOD</title>
      <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/Navigation-Clean1.css">
    <link href="../font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/styles.css">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
           <h2>Настройки профиля</h2>
       
     
            
 <div class="polya">
                <h4>Персональные данные клиента</h4>
                <span id="fioS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                <label>ФИО </label>
                <input type="text" id="fio" />
                 <span id="emailS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                <label>E-mail </label>
                <input type="text" id="email" />
                
               <span id="telS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                <label>Мобильный телефон</label>
                <input type="text" id="tel" />
                
                
                <input style="display:none" type="checkbox"/>
                <label style="display:none"  class="checkBx">Включить двухфакторную аутентификацию при входе</label> 
                 
    
                <br />
              <span id="CpassN" style="float: right; font-weight:bold;color:red;display:none">""</span>
                <label>Пароль </label>
                    <input type="password" id="pass" placeholder="Действующий пароль" class="inputPswdBlock"/>
       <span id="passN" style="float: left; font-weight:bold;color:red;display:none">""</span>
                    <input type="password" id="NPass" placeholder="Новый пароль" class="inputPswdBlock"/>
     <span id="passR" style=" font-weight:bold;color:red;display:none">""</span>
                    <input type="password" id="RPass" placeholder="Повторите новый пароль" class="inputPswdBlock"/>
                
                
                <input style="display:none" type="checkbox"/>
                <label style="display:none" class="checkBx">Включить рассылку новостей в личный кабинет жителя</label>
               
                    
                <br />
                
                <h4>Сведения, необходимые для заключения договора</h4>
                <span id="typES" style="float: right; font-weight:bold;color:red;display:none">""</span>
                <label>Вид организации</label>
                    <select id="typE">
                         <option value="0" id="first" >Выберите вид организации</option>
                       <%-- <option value="12" selected="">Юридическое лицо</option>
                        <option value="">Индивидуальный предприниматель</option>--%>
                    </select>
                <span id="CompNameS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                <label>Наименование организации</label>
                    <input type="text" id="CompName" />
                <!--
                <label>Фамилия </label>
                    <input type="text" />
                
                <label>Имя </label>
                    <input type="text" />
                
                <label>Отчество </label>
                    <input type="text" />
                -->
        <span id="INNS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                <label>ИНН* </label>
    
                    <input type="text" maxlength="10" id="INN" />
                 <span id="OGRNS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                <label id="ogrnH">ОГРН/ОГРНИП </label>
                    <input type="text" id="OGRN" maxlength="13" />
                <span id="okpoS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                <label>ОКПО </label>
                    <input type="text" id="okpo" maxlength="10"/>
                 <span id="kppS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                <label id="kppH" style="display:none">КПП </label>
                    <input type="text" style="display:none"  id="kpp" maxlength="9"/>
                
                <br />
     <span id="adrS" style="float: right; font-weight:bold;color:red;display:none">""</span>
     <h4>Юридический адрес</h4>
     <div style="padding: 5px 8px;border: 1px solid #ddd;background-color: #F4F4F8;">
         <label>Область, город, район, улица</label>
     
                <input type="text" id="adr" list="adrList">
                    <datalist id="adrList">
                   
                    </datalist>
               
                    <input id="manu" style="margin-left: inherit;" type="checkbox"> 
                   <label for="manu" class="checkOut">Ввести вручную</label>
 
            <div class="row" style="margin-right: -15px;">
                <div class="col-xs-6">
                    <span id="DOMS" style="float: right; font-weight:bold;color:red;display:none">""</span>
                    <label for="DOM">Дом</label>
                    <input type="text" id="dom">
                </div>
                <div class="col-xs-6">
                     
                    <label for="KORP">Строение/корпус</label>
                    <input type="text" id="korp">
                </div>
            </div>
     </div>
                
     <h4>Реквизиты для оплаты услуг клиентами</h4>
     <span id="bikS" style="float: right; font-weight:bold;color:red;display:none">""</span>
     <label>БИК</label>
     <input type="text" id="bik" maxlength="9">
     <span id="BNAMES" style="float: right; font-weight:bold;color:red;display:none">""</span>
      <label>Наименование банка</label>
      <input type="text" id="BNAME">
      <span id="BKRSS" style="float: right; font-weight:bold;color:red;display:none">""</span>
      <label>Корреспондентский счет</label>
      <input type="text" id="BKRS" maxlength="20">
      <span id="RSS" style="float: right; font-weight:bold;color:red;display:none">""</span>
      <label>Расчетный счет</label>
      <input type="text" id="RS" maxlength="20">
      <span id="INNBS" style="float: right; font-weight:bold;color:red;display:none">""</span>
       <label>ИНН банка</label>
                    <input type="text" maxlength="10" id="INNB" />
     <span id="KPPBS" style="float: right; font-weight:bold;color:red;display:none">""</span>
     <label>КПП банка</label>
                    <input type="text" maxlength="9" id="KPPB" />
               <%-- 
                
                <label>Наименование банка</label>
                    <input type="text" />
                
                <label>ИНН банка</label>
                    <input type="text" />
                
                <label>КПП банка</label>
                    <input type="text" />
                
                <label>БИК </label>
                    <input type="text" />
                
                <label>Кор. счет</label>
                    <input type="text" />
                
                <label>Расчетный счет</label>
                    <input type="text" />--%>
                
                    
      
                <div class="">
                
                    <button id="SaveChanges" class="btn btn-default logBtn" type="button" style="background-color:rgb(0,147,233);width:auto;">Сохранить изменения</button>
                   <%-- <button id="backUo" class="btn btn-default logBtn" type="button" style="background-color:rgb(149,153,156);margin-left:5%;">Отмена</button>--%>
                </div>

        </div>

       <%-- <a href="#" class="genBtn btn"style="margin-left:20px;">Настройка платежных систем</a>--%>
</asp:Content>
