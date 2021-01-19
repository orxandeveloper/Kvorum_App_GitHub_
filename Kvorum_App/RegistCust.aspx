<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="RegistCust.aspx.cs" Inherits="Kvorum_App.RegistCust" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/Footer-Clean.css" rel="stylesheet" />
    <link href="css/animate.min.css" rel="stylesheet" />
    <link href="css/swiper.min.css" rel="stylesheet" />
    <link href="css/Navigation-Clean1.css" rel="stylesheet" />
    <link href="css/Navigation-with-Button1.css" rel="stylesheet" />
    <link href="css/Navigation-with-Search1.css" rel="stylesheet" />
    <link href="css/Simple-Slider.css" rel="stylesheet" />
    <link href="css/styles.css" rel="stylesheet" />
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
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  from { bottom:-100px; opacity:0 } 
  to { bottom:0px; opacity:1 }
}

@keyframes animatebottom { 
  from{ bottom:-100px; opacity:0 } 
  to{ bottom:0; opacity:1 }
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
    from {top:-300px; opacity:0} 
    to {top:0; opacity:1}
}

@keyframes animatetop {
    from {top:-300px; opacity:0}
    to {top:0; opacity:1}
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
    background-color: rgb(0,126,213);
    color: white;
}

.modal-body {padding: 2px 16px;}

.modal-footer {
    padding: 2px 16px;
    background-color: rgb(0,126,213);
    color: white;
}
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="loader"></div>

    
    <div class="row">
        <div class="col-lg-12 col-lg-push-5 col-md-12 col-md-push-5">
            <p style="font-size: 24px; margin-top: 28px; font-weight: bold;">РЕГИСТРАЦИЯ НОВОГО КЛИЕНТА </p>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 col-lg-push-5 col-md-12">
            <img src="img/Line 71.png" style="width: 415px;"></div>
    </div>
    <div class="row">
        <div class="col-lg-12 col-lg-push-5 col-md-12" style="margin-top: 20px;">
            <p><strong>Пожалуйста, заполните необходимые регистрационные данные</strong> </p>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 col-lg-push-4 col-md-12">
            <img src="img/Line 71@2x.png" style="width: 715px;"></div>
    </div>
    <div class="row">
        <div class="col-lg-3 col-lg-offset-5 col-md-4 col-md-offset-5" id="pnl" style="border-style: outset; border-radius: 7px; border-color: black; margin-top: 47px; height: 51px; width: 322px;">
            <div class="row">
                <div class="col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-0">
                    <img id="img_org" src="img/Åa«S¿½8.png" style="width: 48px; height: 48px; margin-left: -28px"></div>
                <div class="col-lg-3 col-lg-offset-9 col-md-3 col-md-offset-10">
                    <img src="img/æ»¿ß«¬.png" id="open_" style="width: 48px; height: 48px;"></div>
                <div class="col-lg-7 col-lg-offset-2 col-md-12">
                    <p id="org" style="width: 201px; margin-top: 12px;">Выберите тип организации</p>
                </div>
                <div id="cui" class="col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-0">
                    <img src="img/Çñ¼¿¡.png" id="cui_" style="width: 48px; height: 48px; margin-left: -28px"></div>
                <div id="cup" class="col-lg-8 col-lg-offset-2 col-md-12">
                    <p id="cupt" style="width: 201px; margin-top: 12px;">Управляющая организация </p>
                </div>
                <div id="ui" class="col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-0">
                    <img src="img/¬½¿Ñ¡G.png" id="ui_" style="width: 48px; height: 48px; margin-left: -28px"></div>
                <div id="up" class="col-lg-8 col-lg-offset-2 col-md-12">
                    <p id="upt" style="width: 201px; margin-top: 12px;">Поставщиком услуг </p>
                </div>

            </div>

        </div>
    </div>

    <div class="row">
        <div class="col-lg-2 col-lg-offset-4 col-md-3 col-md-offset-4 col-sm-3 col-sm-offset-4 col-xs-12" style="width: 753px;">
            <div class="row">
                <div class="col-lg-3 col-lg-offset-0 col-md-3 col-md-offset-0 col-sm-3 col-xs-12" style="margin-top: 15px;">
                    <p>Е-mail </p>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" style="margin-top: 15px;">
                    <input type="text" id="mail" placeholder="Введите свой e-mail" style="width: 247px; border-radius: 7px; height: 36px">
                </div>
                <div class="col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-1 col-xs-12" style="width: 64px;">
                    <img src="img/NO.png" id="no" style="width: 48px; margin-top: 5px;"></div>
                <div class="col-lg-3 col-lg-offset-2 col-md-3 col-md-offset-2 col-xs-12" style="margin-top: 15px;">
                    <p id="remind" style="width: 146px; color: rgb(252,2,2);"><a href="#">Напомнит пароль</a></p>
                    <!--<a href="#"  >Напомнит пароль</a>-->
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-2 col-lg-offset-4 col-md-3 col-md-offset-4 col-sm-3 col-sm-offset-4 col-xs-12" style="width: 753px;">
            <div class="row">
                <div class="col-lg-3 col-lg-offset-0 col-md-3 col-md-offset-0 col-sm-3 col-xs-12" style="margin-top: 15px;">
                    <p>Введите пароль </p>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" style="margin-top: 15px;">
                    <input type="password" id="pass" placeholder="******" style="width: 247px; border-radius: 7px; height: 36px">
                </div>
                <div class="col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-1 col-xs-12" style="width: 64px;">
                    <img src="img/Äè.png" id="yes" style="width: 48px; margin-top: 5px;"></div>

            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-3 col-lg-offset-4 col-md-3 col-md-offset-4 col-sm-3 col-sm-offset-4 col-xs-12" style="width: 753px;">
            <div class="row" style="width: 397px;">
                <div class="col-lg-3 col-lg-offset-6 col-md-3 col-md-offset-6 col-sm-3 col-xs-12" style="width: 0px;">
                    <img src="img/checkbox_on.png" id="chk" style="width: 30px;"></div>
                <div class="col-lg-3 col-lg-offset-7 col-md-3 col-md-offset-7 col-sm-offset-7 col-xs-12" style="width: 142px;">
                    <p id="chkt">Запомнить меня</p>
                </div>
                <div class="col-md-12">
                    <p id="ruleP" style="background-color: rgb(233,233,233); height: 85px; width: 500px; margin-left: 83px;">
                        Пароль должен состоять, как минимум,из 6 символов. В пороле должны присустствовать символы латинского алфавита и цифры, наличие других знаков допустимо, но не обязателно. Пароль должен содержать хотя бы по одному символу в
                        верхнем и нижнем регитсре
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-3 col-lg-offset-5 col-md-3 col-md-offset-6 col-sm-3 col-sm-offset-6 col-xs-3 col-xs-offset-6" style="position: absolute; width: 348px;">
            <button class="btn btn-default" id="provb" type="button" style="width: 320px; min-width: none; max-width: none; background-color: rgb(0,147,233); background-image: url(&quot;img/Line 71@2x.png&quot;); color: rgb(255,255,255); border-radius: 7px;">ЗАРЕГИСТРИРОВАТЬ </button>
        </div>
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
    <script src="js/jquery-1.12.4.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/bs-animation.js"></script>
    <script src="js/swiper.jquery.min.js"></script>
    <script src="js/Simple-Slider.js"></script>
    <script src="scripts/utilities.js"></script>
    <script>
//var myVar;

//function myFunction() {
//    myVar = setTimeout(showPage, "3000");
//}

//function showPage() {
//  document.getElementById("loader").style.display = "none";
//  document.getElementById("myDiv").style.display = "block";
//}
</script>
</asp:Content>
