<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="ChangePass.aspx.cs" Inherits="Kvorum_App.ChangePass" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <div class="row" style="width:100%;min-width:100%;margin-top:26px;">
        <div class="col-sm-3 hidden-xs"></div>
        <div class="col-sm-6 col-xs-12" style="text-align:center;">
            <h1 class="loginHeader">Смена пароля</h1>
        </div>
        <div class="col-sm-3 hidden-xs"></div>
    </div>
    
 <div class="row"> 
        <div class="container">
            <div class="col-sm-3 hidden-xs"></div>
            <div class="col-sm-6 col-xs-12 loginMain">
                <img id="noCH" style="width: 48px;display:none;position: absolute;right: -30px;" src="img/NO.png" /><label id="regPass_CH" style="position: absolute;line-height:1;color:red;display:none;width:277px;right: -300px;top: 10px;">""</label>
                <input type="password" id="passCH" placeholder="Введите новый пароль" />
               <div style="clear:both;">&nbsp;</div>
                  <img src="img/Äè.png" style="width: 48px;display:none;position: absolute;right: -30px;" id="yesCH" />  <label id="regPass2_CH" style="position: absolute;line-height:1;color:red;display:none;width:277px;right: -300px;top: 75px;">""</label>
                <input type="password" id="RpasCH" placeholder="Введите новый пароль ещё раз" />
            </div>
            <div class="col-sm-3 hidden-xs"></div>
        </div>
    </div>
     
  <div class="row buttons">
         <div class="container">
             <div class="col-sm-3 hidden-xs"></div>
             <div class="col-sm-6 col-xs-12"  style="text-align:center;">
                 <button class="btn btn-default logBtn" id="btnCHang" type="button" style="background-color: rgb(0,147,233);">Сменить пароль</button>      
             </div>
         </div>
        <div class="col-sm-3 hidden-xs"></div>
  </div>
</asp:Content>
