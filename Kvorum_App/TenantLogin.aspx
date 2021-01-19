<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="TenantLogin.aspx.cs" Inherits="Kvorum_App.TenantLogin" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row" style="width:100%;min-width:100%;margin-top:26px;">
        <div class="col-sm-3 hidden-xs"></div>
        <div class="col-sm-6 col-xs-12" style="text-align:center;">
            <h1 class="loginHeader">ВХОД В СИСТЕМУ</h1>
        </div>     <div class="col-sm-3 hidden-xs"></div>
    </div>
   
    <div class="row"> 
        <div class="container">
            <div class="col-sm-3 hidden-xs"></div>
            <div class="col-sm-6 col-xs-12 loginMain">
                <img id="noC_per" style="display:none" src="img/Äè.png" />
                <input type="text" id="Per_A" placeholder="Логин: номер лицевого счёта" />
                <img src="img/Äè.png" style="display:none" id="yesC_adr" />  
               <%-- <select  id="pasC" style="padding: 12px">
                    <option>Адрес</option>
                </select>--%>
                <input type="text" id="adr" placeholder="Адрес" style="width:100%" list="adrList">
                <datalist id="adrList">
                   
                    </datalist>
                    <img  src="img/Äè.png" style="display:none" id="yesC_rmnum" />  
                <input type="text" id="rum_num" placeholder="Номер помещения"/>
            </div>
            <div class="col-sm-3 hidden-xs"></div>
        </div>
    </div>
     <div class="row">
         <div class="container">
        <div class="col-sm-3 hidden-xs"></div>
        <div class="col-sm-6 col-xs-12" style="text-align:center;">
            <input id="chkC" type="checkbox" class="boxLogin" checked/>
            <label class="checkLogin">Запомнить меня</label>
          <!--  <a href="#" style="margin-right: 1.3em!important;">Забыли пароль?</a>
            <a href="#">Регистрация</a> -->
          </div>
         <div class="col-sm-3 hidden-xs"></div></div>
    </div>
    <div class="row buttons">
         <div class="container">
             <div class="col-sm-3 hidden-xs"></div>
             <div class="col-sm-6 col-xs-12"  style="text-align:center;">
                 <button   class="btn btn-default logBtn" id="LogTenant" type="button" style="background-color:rgb(0,147,233);">Войти</button>
                 <button class="btn btn-default logBtn" type="button" id="Ot" style="background-color:rgb(149,153,156);">Отмена</button>
             </div>
         </div>
        <div class="col-sm-3 hidden-xs"></div>
    </div>
     <div id="myModal" class="modal" style="z-index: 13;">

  <!-- Modal content -->
  <div class="modal-content">
    <div class="modal-header">
      <span class="close" id="close">&times;</span>
      <h2 id="mh">Modal Header</h2>
    </div>
    <div class="modal-body" style="height: 100px;height: 100px;padding: 15px;/* min-width:100px; */display: inline-block;">
      <p id="txt" style="font-size: 23px;">Some text in the Modal Body</p>
      
    </div>
    <div class="modal-footer" style="text-align: left;">
      <h3 id="mf">Modal Footer</h3>
    </div>
  </div>

</div>
</asp:Content>
