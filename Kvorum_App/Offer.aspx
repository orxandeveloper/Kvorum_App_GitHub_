<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="Offer.aspx.cs" Inherits="Kvorum_App.Offer" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="login1" style="display: block;">
    
	<div class="row" style="width:100%;min-width:100%;margin-top:26px;">
        <div class="col-sm-3 hidden-xs"></div>
        <div class="col-sm-6 col-xs-12" style="text-align:center;">
            <h1 class="loginHeader">Ознакомьтесь с условиями оферты</h1>
        </div>
		<div class="col-sm-3 hidden-xs"></div>
    </div>
   
    <div class="row"> 
       
        <div class="container">
            <div class="col-sm-3 col-xs-12"><h3>Шаг 1</h3></div>
            <div class="col-sm-6 col-xs-12 loginMain">
               
                    <textarea style="display: inline-block;width: 100%; height: 300px;margin: 0 10px 10px 0 !important; overflow-y: auto;">Оферта — это предложение заключить договор. Поэтому в ней должны быть условия этого договора: что клиент покупает, как получает заказ, сколько товар стоит и как оплатить. Юристы называют такие условия — существенными, без них оферта незаконна.

Проблема в том, что единого списка существенных условий для оферты нет. Условия зависят от предмета договора, и, часто, от мнения суда. Но обычно в оферте должны быть:

описание компании и клиента;
описание товара или услуги;
условия покупки. Стоимость, способы оплаты, условия возврата, замены, доставки;
условия оферты. Как клиент принимает оферту и когда меняются ее условия.
Вторая часть ГК
Дальше всё зависит от того, что и кому вы продаете. Если товар, существенные условия смотрите в требованиях к договору купли-продажи, если услуги — к договору подряда. Требования описывает вторая часть Гражданского кодекса. Каждая глава этой части — о конкретном типе договора, например, о договоре купли-продажи, подряда, поставки или аренды.

Закон о защите потребителей

Правила для отдельных товаров

Постановление об интернет-торговле

Чтобы составить список существенных условий для клиентов-физлиц понадобится еще два документа: закон о защите прав потребителей и правила продажи отдельных видов товаров. Если продаете через сайт, смотрите постановление о дистанционной торговле.
					</textarea>
             
            <br style="clear: both;">
				 
              
            </div>
            <div class="col-sm-3 hidden-xs"></div>
        </div>
    
       
        <div class="container">
			<div class="col-sm-3 hidden-xs"></div>
			<div class="col-sm-6 col-xs-12 " style="text-align:center;">
		
				<button id="CLogin" class="btn btn-default genBtn" type="button">Загрузить и прочитать</button>
				<br style="clear: both;"><br style="clear: both;">
				<input onclick="checkCheckBox(this,1)" id="chkC" type="checkbox" class="boxLogin">
				<label class="checkLogin">С условиями настоящей оферты ознакомлен и принимаю их безоговорочно в полном объёме.</label>   
				
				<br style="clear: both;"><br style="clear: both;">
				
				
			</div>
			<div class="col-sm-3 hidden-xs"></div>
		</div>
    </div>
	
    <hr id="hr" style="width: 80%; display: block; margin: 0 auto; height: 0; border-bottom: 1px solid #ccc;" size="0" noshade="">
    
	<%--<div class="row" style="width:100%;min-width:100%;margin-top:26px;">
        <div class="col-sm-3 hidden-xs"></div>
        <div class="col-sm-6 col-xs-12" style="text-align:center;">
            <h1 class="loginHeader">Анкета партнёра</h1>
        </div>
		<div class="col-sm-3 hidden-xs"></div>
    </div>
	
	<div class="row"> 
       
        <div class="container">
            <div class="col-sm-3 col-xs-12"><h3>Шаг 2</h3></div>
            <div class="col-sm-6 col-xs-12 loginMain">
	
				<div class="row"> 
      				<div class="col-lg-3">
						<img src="img/word.png" style="display: block; width: 96px; height: auto;">
					</div>
					<div class="col-lg-9">
							
						
						
						<a id="WordDownload" class="btn btn-default genBtn" type="button">Загрузить и прочитать</a>
						<br style="clear: both;">
						<br>
						<input id="chkWord" type="checkbox" class="boxLogin">
						<label class="checkLogin">Актуальность и достоверность данных Анкеты подтверждаю.</label>   						
						  
					</div>
				</div>  <!-- row -->
				
            </div>
            <div class="col-sm-3 hidden-xs"></div>
        </div>
    </div>
	
    <div class="row" style="width:100%;min-width:100%;margin-top:26px;">
        <div class="col-sm-3 hidden-xs"></div>
        <div class="col-sm-6 col-xs-12" style="text-align:center;">
            <h1 class="loginHeader">Прайс партнёра</h1>
        </div>
		<div class="col-sm-3 hidden-xs"></div>
    </div>
	
	<div class="row"> 
       
        <div class="container">
            <div class="col-sm-3 xidden-xs"></div>
            <div class="col-sm-6 col-xs-12 loginMain">
	
				<div class="row"> 
      				<div class="col-lg-3">
						<img src="img/excel.png" style="display: block; width: 96px; height: auto;">
					</div>
					<div class="col-lg-9">
							
						
						
						<button id="ExcelDownload" class="btn btn-default genBtn" type="button">Загрузить и прочитать</button>
						<br style="clear: both;">
						<br>
						<input id="chkCExcel" type="checkbox" class="boxLogin">
						<label class="checkLogin">Актуальность и достоверность данных Прайса подтверждаю.</label>   						
						  
					</div>
				</div>  <!-- row -->
				
            </div>
            <div class="col-sm-3 hidden-xs"></div>
        </div>   
   
		
    </div> --%><!-- row -->
	<br>
    <hr style="margin-top: 10px; width: 80%; display: block; margin: 0 auto; height: 0; border-bottom: 1px solid #ccc;" size="0" noshade="">
    
	</div>
    <div id="clLogbtns">
        <div class="row buttons">
			 <div class="container">
					<div class="col-sm-3 col-xs-12"><h3>Шаг 3</h3></div>
					<div class="col-sm-6 col-xs-12" style="text-align:center;">
						<button id="LoginLk" class="btn btn-default logBtn" type="button" style="background-color:rgb(0,147,233);">Перейти к использованию личного кабинета</button>
				   
					</div>
			 </div>
			<div class="col-sm-3 hidden-xs"></div>
		</div>
	</div>
</asp:Content>
