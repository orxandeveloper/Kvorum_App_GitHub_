<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="ClientLogin.aspx.cs" Inherits="Kvorum_App.ClientLogin" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
       
    <style>
        /* Center the loader */
        #loader {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 1;
            width: 150px;
            height: 150px;
            margin: -75px 0 0 -75px;
            border: 16px solid #f3f3f3;
            border-radius: 50%;
            border-top: 16px solid #3498db;
            width: 120px;
            height: 120px;
            -webkit-animation: spin 2s linear infinite;
            animation: spin 2s linear infinite;
        }

        @-webkit-keyframes spin {
            0% {
                -webkit-transform: rotate(0deg);
            }

            100% {
                -webkit-transform: rotate(360deg);
            }
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        /* Add animation to "page content" */
        .animate-bottom {
            position: relative;
            -webkit-animation-name: animatebottom;
            -webkit-animation-duration: 1s;
            animation-name: animatebottom;
            animation-duration: 1s
        }

        @-webkit-keyframes animatebottom {
            from {
                bottom: -100px;
                opacity: 0
            }

            to {
                bottom: 0px;
                opacity: 1
            }
        }

        @keyframes animatebottom {
            from {
                bottom: -100px;
                opacity: 0
            }

            to {
                bottom: 0;
                opacity: 1
            }
        }

        #myDiv {
            display: none;
            text-align: center;
        }
        /* The Modal (background) */
        .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            padding-top: 100px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }

        /* Modal Content */
        .modal-content {
            position: relative;
            background-color: #fefefe;
            margin: auto;
            padding: 0;
            border: 1px solid #888;
            width: 25%;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
            -webkit-animation-name: animatetop;
            -webkit-animation-duration: 0.4s;
            animation-name: animatetop;
            animation-duration: 0.4s
        }

        /* Add Animation */
        @-webkit-keyframes animatetop {
            from {
                top: -300px;
                opacity: 0
            }

            to {
                top: 0;
                opacity: 1
            }
        }

        @keyframes animatetop {
            from {
                top: -300px;
                opacity: 0
            }

            to {
                top: 0;
                opacity: 1
            }
        }

        /* The Close Button */
        .close {
            color: white;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

            .close:hover,
            .close:focus {
                color: #000;
                text-decoration: none;
                cursor: pointer;
            }

        .modal-header {
            padding: 2px 16px;
            background-color: rgb(6,59,117);
            color: white;
        }

        .modal-body {
            padding: 2px 16px;
        }

        .modal-footer {
            padding: 2px 16px;
            background-color: rgb(0,126,213);
            color: white;
        }
    </style>
    <style>
        .modal2 {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            padding-top: 100px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(6,59,117,0.4); /* Black w/ opacity rgb(6,59,117) */
        }

        /* Modal Content */
        .modal-content2 {
            position: relative;
            background-color: #fefefe;
            margin: auto;
            padding: 0;
            border: 1px solid #888;
            width: 25%;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
            -webkit-animation-name: animatetop;
            -webkit-animation-duration: 0.4s;
            animation-name: animatetop;
            animation-duration: 0.4s
        }

        /* Add Animation */
        @-webkit-keyframes animatetop {
            from {
                top: -300px;
                opacity: 0
            }

            to {
                top: 0;
                opacity: 1
            }
        }

        @keyframes animatetop {
            from {
                top: -300px;
                opacity: 0
            }

            to {
                top: 0;
                opacity: 1
            }
        }

        /* The Close Button */
        .close2 {
            color: white;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

            .close2:hover,
            .close2:focus {
                color: #000;
                text-decoration: none;
                cursor: pointer;
            }

        .modal-header2 {
            padding: 2px 16px;
            background-color: rgb(6,59,117);
            color: white;
        }

        .modal-body2 {
            padding: 2px 16px;
        }

        .modal-footer2 {
            padding: 2px 16px;
            background-color: rgb(6,59,117);
            color: white;
            height: 45px;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="hdnSession" runat="server" />
    
    <div id="loader"></div>
    <div id="login1" style="display: block;">
    <div class="row" style="width:100%;min-width:100%;margin-top:26px;">
        <div class="col-sm-3 hidden-xs"></div>
        <div class="col-sm-6 col-xs-12" style="text-align:center;"> 
            <h1 class="loginHeader">ВХОД В СИСТЕМУ</h1>
        </div>     <div class="col-sm-3 hidden-xs"></div>
    </div>
    <div class="row"> 
       <%-- <div class="container">
            <div class="col-sm-3 ">
                  <input type="radio" name="gender" value="male"> Male
                <input type="radio" name="gender" value="female"> Female
            </div>
        </div>--%>
        <div class="container">
            <div class="col-sm-3 hidden-xs"></div>
            <div class="col-sm-6 col-xs-12 loginMain"><label id="regMail_" style="position: absolute;line-height:1;color:red;display:none;width:277px;right: -300px;top: 10px;">""</label>
               
                    <input type="radio" name="Login" checked="checked" onclick=selectLogin(this) value="Client"> <label style="display: inline-block;margin: 0 10px 10px 0 !important;"> Клиент</label>
             
            
                     <input type="radio" name="Login" onclick=selectLogin(this) value="Tenant"> <label style="display: inline-block;margin: 0 10px 10px 0 !important;"> Житель</label>
               
               <div id="clLog">

               
                <img id="noC" src="img/NO.png" />
                <input type="text" id="EmailC" placeholder="Логин: ID/ e-mail" />
                <img src="img/Äè.png" id="yesC" />  <label id="regPass_" style="position: absolute;line-height:1;color:red;display:none;width:277px;right: -300px;top: 65px;">""</label>
                <input type="password" id="pasC" style="width:100%" placeholder="Пароль"/>
                   </div>
            </div>
            <div class="col-sm-3 hidden-xs"></div>
        </div>
        <div class="container" id="tenantLog" style="display:none">
            <div class="col-sm-3 hidden-xs"></div>
            <div class="col-sm-6 col-xs-12 loginMain">
                <img id="noC_per" style="display:none" src="img/Äè.png">
                <input type="text" id="Per_A" placeholder="Логин: номер лицевого счёта">
                <img src="img/Äè.png" style="display:none" id="yesC_adr">  
               
                <input type="text" id="adr" placeholder="Адрес" style="width:100%" list="adrList">
                <datalist id="adrList">
                   
                    </datalist>
                    <img src="img/Äè.png" style="display:none" id="yesC_rmnum">  
                <input type="text" id="rum_num" placeholder="Номер помещения">
                 <input type="password" id="PassT" placeholder="Пароль">
            </div>
            <div class="col-sm-3 hidden-xs"></div>
        </div>
        <div class="row" id="tenantLog2" style="display:none">
         <div class="container">
        <div class="col-sm-3 hidden-xs"></div>
        <div class="col-sm-6 col-xs-12" style="text-align:center;">
            <input id="chkC" type="checkbox" class="boxLogin" checked="">
            <label class="checkLogin">Запомнить меня</label>
          <!--  <a href="#" style="margin-right: 1.3em!important;">Забыли пароль?</a>
            <a href="#">Регистрация</a> -->
          </div>
         <div class="col-sm-3 hidden-xs"></div></div>
    </div>
        <div class="row buttons" id="tenantBtns" style="display:none">
         <div class="container">
             <div class="col-sm-3 hidden-xs"></div>
             <div class="col-sm-6 col-xs-12" style="text-align:center;">
                 <button class="btn btn-default logBtn" id="LogTenant" type="button" style="background-color:rgb(0,147,233);">Войти</button>
                 <button class="btn btn-default logBtn" type="button" id="Ot" style="background-color:rgb(149,153,156);">Отмена</button>
                 <button class="btn btn-default logBtn" type="button" id="idendityLogin" onclick="IdendityLogin()" style="display:none">IdendityLogin</button>
         
                 </div>
         </div>
        <div class="col-sm-3 hidden-xs"></div>
    </div>
    </div>
        <div id="clLog2">  <div class="row">
        <div class="col-sm-4 hidden-xs"></div>
        <div class="col-sm-4 col-xs-12" style="text-align:center;">
           <%-- <input id="chkC" type="checkbox" class="boxLogin" />
            <label id="rem" class="checkLogin">Запомнить меня</label>--%>
            <a href="ForgotPass.aspx" style="margin-right: 1.3em!important;">Забыли пароль?</a>
            <a href="#" id="reg">Регистрация</a>
          </div>
         <div class="col-sm-4 hidden-xs"></div>
    </div></div>
   <div id="clLogbtns">
        <div class="row buttons">
         <div class="container">
             <div class="col-sm-3 hidden-xs"></div>
             <div class="col-sm-6 col-xs-12"  style="text-align:center;">
                 <button id="CLogin"  class="btn btn-default logBtn" type="button" style="background-color:rgb(0,147,233);">Войти</button>
                 <button id="ot" class="btn btn-default logBtn" type="button" style="background-color:rgb(149,153,156);">Отмена</button>
             </div>
         </div>
        <div class="col-sm-3 hidden-xs"></div>
    </div>
   </div>
   
        </div>

    <!-- RegistCust-->

    <div id="regist1" style="display: none;">
   <div class="row">
        <div class="col-sm-3 hidden-xs"></div>
        <div class="col-sm-6 col-xs-12" style="text-align:center;">
            <h1 class="loginHeader">РЕГИСТРАЦИЯ НОВОГО КЛИЕНТА</h1>
            <p>Пожалуйста, заполните необходимые регистрационные данные.</p>
        </div>
       <div class="col-sm-3 hidden-xs"></div>
    </div>



    <div class="row" style="display:none">       
        <div class="container" style="margin-top:30px;">
            <div class="col-sm-3 hidden-xs"></div>
            <div class="col-sm-6 col-xs-12" style="text-align:center;">
                <label></label>
                <select id="org">
                    <option value="0">Выберите тип организации</option>
                    <option value="1">Управляющая организация</option>
                    <option value="2" style="display:none">Поставщик услуг</option>
                </select>
            </div>
            <div class="col-sm-3 hidden-xs"></div>
        </div>
    </div>


 <div class="row"> 
        <div class="container">
            <div class="col-sm-3 hidden-xs"></div>
            <div class="col-sm-6 col-xs-12 loginMain"><label id="regMessage" style="position: absolute;line-height:1;right: -212px;color: red;width: 183px; display:none">""</label>
                <img id="no" src="img/NO.png" />
                <input type="text" id="mail" placeholder="e-mail" />
                <img src="img/Äè.png" id="yes" /> <label id="regPass" style="position: absolute;right: -180px;color: red;width: 153px;display:none"">""</label>
                <input type="password" id="pass" placeholder="Пароль" style="width:100%"/>
            </div>
            <div class="col-sm-3 hidden-xs"></div>
        </div>
    </div>
     <div class="row">
        <div class="col-sm-4 hidden-xs"></div>
        <div class="col-sm-4 col-xs-12" style="text-align:center;">
          <%--  <input id="chkC" type="checkbox" class="boxLogin" checked/>
            <label class="checkLogin">Запомнить меня</label>--%>
           
            <p id="ruleP" style="background-color: rgb(233,233,233); padding: 5px;width:30vw;">
             Пароль должен состоять, как минимум, из 6&nbsp;символов. В&nbsp;пароле должны присутствовать символы латинского алфавита и&nbsp;цифры, наличие других знаков допустимо, но не обязательно. Пароль должен содержать хотя бы по одному символу в&nbsp;верхнем и&nbsp;нижнем регистре.</p>
          </div>
         <div class="col-sm-4 hidden-xs"></div>
    </div>
  <div class="row buttons">
         <div class="container">
             <div class="col-sm-4 hidden-xs"></div>
             <div class="col-sm-4 col-xs-12"  style="text-align:center;">
                 <button class="btn btn-default logBtn" id="provb" type="button" style="background-color: rgb(0,147,233); min-width:50%;">ЗАРЕГИСТРИРОВАТЬ</button>
                 <button class="btn btn-default logBtn" id="Otreg" type="button" style="background-color:rgb(149,153,156);">ОТМЕНА</button>       
             </div>
         </div>
        <div class="col-sm-4 hidden-xs"></div>
  </div>
             </div>
   


    
      <div id="myModal2" class="modal2" style="z-index: 1000;">

  <!-- Modal content -->
  <div class="modal-content2" style="">
    <div class="modal-header2">
      <span class="close2" id="close_">&times;</span>
      <h2 id="mh2" style="text-align: left;color:white">Modal Header</h2>
    </div>
    <div class="modal-body2" style="height: 100px;height: 100px;padding: 15px;/* min-width:100px; */display: inline-block;">
      <%--<p id="txt2" style="font-size: 23px;">Some text in the Modal Body</p>--%>
       
      
    </div>
    <div class="modal-footer2" style="text-align: left;">
      <%--<h3 id="mf2">Modal Footer</h3>--%>
     <%--   <input type="button" id="cls" name="name" value="Закрыть" style="width: 25%;height: 78%;background-color: white;color: red;font-weight: 700;"/>
        <input type="button" id="deleteO" name="name" value="Удалить" style="float: right;width: 25%;height: 78%;background-color: white;color: red;font-weight: 700;" />--%>
    </div>
  </div>

</div>
        <%--<script src="js/jquery-1.12.4.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/bs-animation.js"></script>
    <script src="js/swiper.jquery.min.js"></script>
    <script src="js/Simple-Slider.js"></script>
     <script src="scripts/utilities.js"></script> --%>
</asp:Content>
