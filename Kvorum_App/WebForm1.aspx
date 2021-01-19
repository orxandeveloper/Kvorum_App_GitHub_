<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="Kvorum_App.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form runat="server">
        <asp:Button ID="Button1" OnClick="Button1_Click" runat="server" Text="Button" />
        <asp:Button ID="Button2" OnClick="Button2_Click" runat="server" Text="ADD EDIZM" />
        <asp:Button ID="Button3" OnClick="Button3_Click" runat="server" Text="Add PRODUCT_SERVICE WITH EDIZM" />
        <asp:Button ID="Button4" OnClick="Button4_Click" runat="server" Text="Add PROJECT_PRODUCT_SERVICE" />

        <asp:Button ID="Button5" OnClick="Button5_Click" runat="server" Text="Testing (Amateurs don't click)" />
        <asp:Button ID="button6" Text="GetLSANdEmailsFrom 34" OnClick="button6_Click" runat="server" />
    </form>


    <h2>Hello Orxanqwwqw</h2>
    <%--    <h4 style="font-weight: 100"><b>Добро пожаловать!</b> Для Вашего лицевого счета создана учетная запись в системе «УПРАВБОТ».</h4>
    <h4 style="font-weight: 100;">Здравствуйте! Для Вашего дома по адресу  <a href="#">"Адрес объекта"</a> функционируют мобильное приложение (<a href="#">Android</a>, <a href="#">IOS</a> ) и личный кабинет на странице дома .</h4>
    <h4 style="font-weight: 100;">Ваш логин: <b>"Номер лицевого счета"</b></h4>
    <h4 style="font-weight: 100;">Ваш пароль:<b>"Пароль"</b></h4>
    <h4 style="font-weight: 100;">Срок действия пароля в днях:<b>"срок действия пароля"</b></h4>
    <h4 style="font-weight: 100;">Вы можете поменять пароль в <a href="#">настройках профиля</a>  в личном кабинете или в мобильном приложении.</h4>
    <h4 style="font-weight: 100;">В личном кабинете и мобильном приложении Вы сможете:</h4>
    <img src="http://172.20.20.24/img/prebor.jpg" /><h4 style="width: 14%; margin-left: 10vw; margin-top: -5vw; font-weight: 700;">Подать показания приборов учета</h4>
    <br />
    <img src="http://172.20.20.24/img/money.png" style="margin-left: 36px; margin-top: 16px;" /><h4 style="font-weight: 700; margin-left: 10vw; margin-top: -4vw;">Оплатить счет за жилищно-коммунальные услуги онлайн</h4>
    <br />
    <img src="http://172.20.20.24/img/doci.png" style="margin-left: 36px; margin-top: 16px;" /><h4 style="font-weight: 700; margin-left: 10vw; margin-top: -3vw;">Оформить заявку</h4><br />
    <h4 style="font-weight:100">При возникновении вопросов по работе портала «УПРАВБОТ», пожалуйста, обратитесь в техподдержку: <a href="mailto:help-desk@upravbot.ru">help-desk@upravbot.ru</a></h4><br />
   <h4 style="font-weight:100;font-style:  italic;">C уважением,Ваш «УПРАВБОТ».</h4>--%>

   <%--  <div style="display: block; width: 100%; height: 100%; background-color: #f3f3f3; margin: 0px; padding: 0px; padding: 10px; font-family: sans-serif;"> 
<div style="display: block; max-width: 700px; margin-left: auto; margin-right: auto; background-color: #ffffff; padding: 20px;"> 
<h2>Добро пожаловать!</h2>
<p>Для Вашего лицевого счета создана учетная запись в&nbsp;системе &laquo;Автопилот&raquo;.</p> 
<p>Здравствуйте! Для Вашего дома по адресу <a href="#">"{0}"</a> функционируют мобильное приложение (<a href="#">Android</a>, <a href="#">iOS</a> ) и&nbsp;личный кабинет на странице дома.</p
<p>Ваш логин: <b>"{1}"</b></p> 
<p>Ваш пароль:<b>"{2}"</b></p> 

<p>Вы можете поменять пароль в&nbsp;<a href="#">настройках профиля</a> в&nbsp;личном кабинете или в&nbsp;мобильном приложении.</p> 
<p>В личном кабинете и мобильном приложении Вы сможете:</p> 
<ul style="list-style:none;"> 
<li style="display: block; margin-bottom:16px;"><img src="https://upravbot.ru/img/prebor.jpg" align="left" style="text-align: left; display: inline-block; height: 34px; width: auto; margin-right: 4px;" alt=""/> Подать показания приборов учета.</li> 
<li style="display: block;  margin-bottom:16px;"><img src ="https://upravbot.ru/img/money.png" align="left" style="text-align: left; display: inline-block; height: 28px; width: auto; margin-right: 10px;" alt=""/> Оплатить счет за жилищно - коммунальные услуги онлайн.</li> 
<li style="display: block;  margin-bottom:16px;"><img src = "https://upravbot.ru/img/doci.png"align="left" style="text-align: left; display: inline-block; height: 24px; width: auto; margin-right: 10px; margin-left:4px;" alt="" /> Оформить заявку.</li> 
</ul> 
<p>При возникновении вопросов по работе портала &laquo;Автопилот&raquo;, пожалуйста, обратитесь в&nbsp;техподдержку: <a href = "mailto:helpdesk@upravbot.ru">help-desk@upravbot.ru </a></p> 
<br/> 
<p>C уважением, Ваш &laquo;Автопилот&raquo;.</p> 
</div></div>--%>

<%--    <div style="display: block; width: 100%; position: absolute; left: 0; right: 0; top: 0; background-color: #f3f3f3;">
        <div style="display: block; margin: 0 auto; max-width: 700px; text-align: justify; font-family: sans-serif; color: #000033; background-color: #ffffff; padding: 0 10px;">
            <br />
            <br />
            <p>Уважаемый(ая)<span id="fio"> {0} </span>!</p>
            <br />
            <p>По Вашему личному счёту произведено начисление за период:</p>
            <p><strong><span id="datePeriod">{1}</span></strong></p>
            <br />
            <p>Вы можете оплатить и / или распечатать квитанцию в своём личном кабинете на сайте:</p>
            <p style="display: block; float: left; text-align: left; padding: 10px30px; background-color: #328ac3; width: auto;"><a href="{2}" style="color: white; text-decoration: none;">Вход</a></p>
            <br />
            <br style="clear: both;" />
            <p>или в мобильном приложении:</p>
            <p style="display: block; text-align: left"><a href="https://play.google.com/store/apps/details?id=ru.matorinun.matorin" style="color: #555ab7; cursor: pointer; text-decoration: none;">
                <img alt="Наше приложение в Плей Маркете" src="http://matorin-un.ru/portals/0/googleplay185.png" style="width: 185px; height: 51px;" title="Наше приложение в Плей Маркете" /></a>&nbsp;<a href="https://itunes.apple.com/ru/app/matorin-quick/id1389783867?mt=8"><img alt="Наше приложение в Апсторе" src="http://matorin-un.ru/portals/0/appstore185_1.png" style="width: 185px; height: 51px;" title="Наше приложение в Апсторе"></a></p>
            <br style="clear: both;" />
        </div>
    </div>--%>
</body>
</html>
