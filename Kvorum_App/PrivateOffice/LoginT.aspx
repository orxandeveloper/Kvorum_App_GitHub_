<%@ Page Title="" Language="C#" MasterPageFile="~/PrivateOffice/Private.Master" AutoEventWireup="true" CodeBehind="LoginT.aspx.cs" Inherits="Kvorum_App.PrivateOffice.LoginT" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
        <style>
        .domAttention {color: #dd222d; clear:both; font-size:12px;position:relative; top:-10px;
        }
        .imgAttention {margin-left: -8px; margin-top: -3px;width:32px;
        }
        .domOk {color: #53da6a; clear:both; font-size:12px;position:relative; top:-10px;
        }
        h1.loginHeader { border-bottom: 2px solid #ccc;
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
    background-color: rgba(255,113,57,0.4); /* Black w/ opacity */
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
    from {top:-300px; opacity:0} 
    to {top:0; opacity:1}
}

@keyframes animatetop {
    from {top:-300px; opacity:0}
    to {top:0; opacity:1}
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
    background-color: red;
    color: white;
}

.modal-body2 {padding: 2px 16px;}

.modal-footer2 {
    padding: 2px 16px;
    background-color: red;
    color: white;
    height: 45px;
}
</style> 
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/vendor/slick/slick.js"></script>
    <!--<script src="js/jquery.nicescroll.js"></script>-->
    <script src="js/jflickrfeed.min.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/jquery.spasticNav.js"></script>
    <script src="js/jquery.prettyphoto.js"></script>
    <script src="js/main.js"></script>
    <script src="js/Utilities.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
          <div class="row" style="width:100%;min-width:100%;margin-top:26px;">
        <div class="col-sm-3 hidden-xs"></div>
        <div class="col-sm-6 col-xs-12" style="text-align:center;">
            <h1 class="loginHeader">ВХОД</h1>
        </div>
        <div class="col-sm-3 hidden-xs"></div>
    </div>
   

    <div class="row"> 
        <div class="container">
            <div class="col-sm-3 hidden-xs"></div>
            <div class="col-sm-6 col-xs-12 loginMain">
    
                <input type="text" id="score" placeholder="Логин: Номер лицевого счёта *" />
                <span id="" style="display:none" class="domAttention"> <img src="/img/NO.png" class="imgAttention"/>Неправильный лицевой счёт</span>
           
     
                <input type="password" id="PassT" placeholder="Пароль" style="width:100%" />

                
                 <span id="" style="color:red;display:none" class="domOk"><img src="/img/Äè.png" id="pssErr" class="imgAttention"/>Правильный номер помещения</span>
               
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
        </div>
        <div class="col-sm-3 hidden-xs"></div></div>
    </div>
    <div class="row buttons">
         <div class="container">
             <div class="col-sm-3 hidden-xs"></div>
             <div class="col-sm-6 col-xs-12"  style="text-align:center;">
                 <button id="CLogin" class="btn  logBtn" type="button" style="background-color:rgb(0,147,233);">Войти</button>
                 <button class="btn  logBtn" type="button" style="background-color:rgb(149,153,156);">Отмена</button>
             </div>
         </div>
        <div class="col-sm-3 hidden-xs"></div>
    </div>

    </div>
    
    <div class="space30"></div>
     <div id="myModal2" class="modal2" style="z-index: 1000;background-color:  rgba(255,113,57,0.4);">

  <!-- Modal content -->
  <div class="modal-content2" style="">
    <div class="modal-header2" style="background-color:white">
      <span class="close2" style="color:black" id="close_">×</span>
      <h2 id="mh2" style="text-align: left;color:black">Modal Header</h2>
    </div>
    <div class="modal-body2" style="height: 100px;height: 100px;padding: 15px;/* min-width:100px; */display: inline-block;">
      <p id="txt2" style="font-size: 23px;">Some text in the Modal Body</p>
      
    </div>
    <div class="modal-footer2" style="text-align: left;background-color:white">
      
        <input type="button" id="cls" name="name" value="Закрыть" style="width: 25%;height: 78%;background-color: white;color: red;font-weight: 700;">
        <input type="button" id="deleteO" name="name" value="Удалить" style="float: right;width: 25%;height: 78%;background-color: white;color: red;font-weight: 700;">
    </div>
  </div>

</div>
</asp:Content>
