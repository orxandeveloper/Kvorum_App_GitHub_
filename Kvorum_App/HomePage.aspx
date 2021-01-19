<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="HomePage.aspx.cs" Inherits="Kvorum_App.HomePage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
  <main class="p-0">
<span class="h80"></span>

<div class="position-relative">
	<div class="fon0"></div>
<div class="m-10 pt-5">
		
<div class="swiper-container">
<div class="swiper-pagination"></div>
<div class="swiper-wrapper">
	<div class="swiper-slide">
		<div class="row ">
			<div class="col-lg-5 pt-3">
				<!-- <h3>Управбот для жителей &ndash; это:</h3> <p>Один личный кабинет для всей недвижимости</p>-->
				<h1 class="mainSlider">Управбот &ndash; онлайн <br/>
				система управления недвижимостью</h1>
		
				<ol class="mt-5 mb-5 list-unstyled">				
					<li class="font18 pb-2"><img src="img/mark.svg" class="mt-n1 mr-2" alt=""/>Подключение - 0 р.</li>
					<li class="font18 pb-2"><img src="img/mark.svg" class="mt-n1 mr-2" alt=""/>Обслуживание - 0 р.</li>
					<li class="font18"><img src="img/mark.svg" class="mt-n1 mr-2" alt=""/>Внедрение - 0 р.</li>
				</ol>
			
				<button class="btn h48 mt-3 ml-1 pl-5 pr-5" type="button"><span class="font16">Подключить</span></button>
			
			</div>
			<div class="col-lg-7 p-0">
			
				<img src="img/main-1.png" class="sliderImg w-100" alt=""/>
				
	
			</div>
		</div>
	</div>	<!-- swiper-slide -->

</div>  <!-- swiper-wrapper -->
			<div class="p-0">&nbsp;</div>
	<div class="swiper-button-prev"><img src="img/btn-left.svg" class="" alt=""/></div>
    <div class="swiper-button-next"><img src="img/btn-right.svg" class="" alt=""/></div>
</div> <!-- swiper-container -->		
		
</div> <!-- m-10 -->

</div>

<div class="position-relative">
<div class="m-10">

<h2 class="mainHeader">Сложные задачи - простое решение</h2>

<div class="flexHoriz flex-wrap sol">
	<div class="sol-1">
		<a href="#"><span class="square"></span>
		<p class="text-center ml-0">Виртуальная диспетчерская</p></a>
	</div>
	<div class="sol-2">
		<a href="#"><span class="square"></span>
		<p class="text-center ml-0">Прием платежей</p></a>
	</div>
	<div class="sol-3">
		<a href="#"><span class="square"></span>
		<p class="text-center ml-0">Показания счетчиков</p></a>
	</div>	

	<div class=" sol-4">
		<a href="#"><span class="square"></span>
		<p class="text-center ml-0">Система пропусков</p></a>
	</div>
	<div class=" sol-5">
		<a href="#"><span class="square"></span>
		<p class="text-center ml-0">Услуги для жителей</p></a>
	</div>
	<div class=" sol-6">
		<a href="#"><span class="square"></span>
		<p class="text-center ml-0">Содержание домов</p></a>
	</div>	
</div>
<div class="mt-3">&nbsp;</div>

</div> <!-- m-10 -->



<div class="wrapperRed mt-3">

	<div class="m-10">
	
		<h2 class="mainHeader white pt-4">Управбот рекомендуют</h2>

		<div class="row pt-4">
			<div class="col-lg-4 col-sm-12">
				<img src="img/rec1.svg" class="square2" alt=""/>
				<span class="mt-3">Управляющие компании</span>
			</div>
			<div class="col-lg-4 col-sm-12">
			<img src="img/rec2.svg" class="square2" alt=""/>
				<span>Товарищество собственников жилья</span>
			</div>
			<div class="col-lg-4 col-sm-12">
			<img src="img/rec3.svg" class="square2" alt=""/>
				<span class="mt-3">Единые&nbsp;расчетные центры</span>
			</div>	
		</div>
		<div class="p-4">&nbsp;</div>
	</div> <!-- m-10 -->
</div>

<div class="m-10">
<h2 class="mainHeader">Об Управботе</h2>

<div class="row">
	<div class="col-lg-12">
		<img src="img/Video.png" class="w-100" alt=""/>
	</div>	
</div>

<h2 class="mainHeader">Рейтинг УК</h2>
<div class="position-relative">
<div class="rate"></div>
<div class="row">
	<div class="col-lg-6 order-lg-0 order-sm-1 column-flex">
		<div class="flex-grow-1">
			<p class="font16">Рейтинг строится на основе отзывов посетителей Управбота об уровне обслуживания и качестве услуг банков.
			</p>
			<p class="font16 pt-1">
			Оценка добавляется в рейтинг только после проверки отзыва администратором; значения рейтинга пересчитываются раз в сутки. <br/>
			Мы оставляем за собой право засчитывать или не засчитывать оценки посетителей.
			</p>
		</div>
		<div class="mt-4 mb-3">
			<button type="button" class="btn w177 h48 pl-3 pr-3 mr-4"><span>Перейти</span></button>
			<button type="button" class="btn w177 h48 pl-3 pr-3 bgBordo"><span>Оставить отзыв</span></button>
		</div>
	</div>
	<div class="col-lg-6 order-lg-1 text-center order-sm-0">
		<img src="img/people-rec.png" class="rateImg mb-5" alt=""/>
	
	</div>	
</div> <!-- row-->
</div> <!-- pos rel -->


<div class="p-5">&nbsp;</div>

<div class="overflowX w-100">
<table class="recTable">
<thead>
	<tr><th></th>
		<th>№</th>
		<th>Управляющая компания</th>
		<th>Средняя<br/>оценка</th>
		<th>Чистота<br/>и&nbsp;уборка</th>
		<th>Содержание<br/>многоквартирного&nbsp;дома</th>
		<th class="pl-5 pr-5">Тарифная&nbsp;политика</th>
		<th>Клиенто-ориентированность</th>
		<th>Средняя<br/>цена&nbsp;за&nbsp;м<sup>2</sup></th>
		<th></th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>1</td>
		<td><img src="img/firm1.png" class="thumb"/></td>
		<td>63,2</td>
		<td>4,5</td>
		<td>2134</td>
		<td>5</td>
		<td><img src="img/star-gl.svg" class="" alt=""/>
		<img src="img/star-gl.svg" class="" alt=""/>
		<img src="img/star-gl.svg" class="" alt=""/>
		<img src="img/star-gl.svg" class="" alt=""/>
		<img src="img/star-gl.svg" class="" alt=""/></td>
		<td>103 000 ₽</td>
	</tr>
	<tr>
		<td>2</td>
		<td><img src="img/firm2.png" class="thumb"/></td>
		<td>63,2</td>
		<td>4,5</td>
		<td>2134</td>
		<td>5</td>
		<td><img src="img/star-gl.svg" class="" alt=""/>
		<img src="img/star-gl.svg" class="" alt=""/>
		<img src="img/star-gl.svg" class="" alt=""/>
		<img src="img/star-gl.svg" class="" alt=""/>
		<img src="img/star-gr.svg" class="" alt=""/></td>
		<td>103 000 ₽</td>
	</tr>
	<tr>
		<td>3</td>
		<td><img src="img/firm3.png" class="thumb"/></td>
		<td>63,2</td>
		<td>4,5</td>
		<td>2134</td>
		<td>5</td>
		<td><img src="img/star-gl.svg" class="" alt=""/>
		<img src="img/star-gl.svg" class="" alt=""/>
		<img src="img/star-gl.svg" class="" alt=""/>
		<img src="img/star-gr.svg" class="" alt=""/>
		<img src="img/star-gr.svg" class="" alt=""/></td>
		<td>103 000 ₽</td>
	</tr>
	<tr>
		<td>4</td>
		<td><img src="img/firm4.png" class="thumb"/></td>
		<td>63,2</td>
		<td>4,5</td>
		<td>2134</td>
		<td>5</td>
		<td><img src="img/star-gl.svg" class="" alt=""/>
		<img src="img/star-gl.svg" class="" alt=""/>
		<img src="img/star-gr.svg" class="" alt=""/>
		<img src="img/star-gr.svg" class="" alt=""/>
		<img src="img/star-gr.svg" class="" alt=""/></td>
		<td>103 000 ₽</td>
	</tr>
	<tr>
		<td>5</td>
		<td><img src="img/firm5.png" class="thumb"/></td>
		<td>63,2</td>
		<td>4,5</td>
		<td>2134</td>
		<td>5</td>
		<td><img src="img/star-gl.svg" class="" alt=""/>
		<img src="img/star-gr.svg" class="" alt=""/>
		<img src="img/star-gr.svg" class="" alt=""/>
		<img src="img/star-gr.svg" class="" alt=""/>
		<img src="img/star-gr.svg" class="" alt=""/></td>
		<td>103 000 ₽</td>
	</tr>
</tbody>
</table>
</div>




	<h2 class="mainHeader">Мобильные приложения</h2>

	<div class="row">
<div class="col-lg-6 col-sm-12 mb-4">
		<div class="wrapperMP">
			<div class="row">
				<div class="col-sm-6">
					<div class="h-100 pl-5 column-flex">
						<div class="pt-5 flex-grow-1">
							<h4>Для жителей</h4>
							<p class="mt-4 mb-4">Управление счетом бывает удобным — попробуйте</p>
							<a class="white" href="app_ten.html">Подробнее 
								<img src="img/arrow-long.svg" class="ml-2" alt=""/>
							</a>
						</div>
						<div class="pb-4 mb-4 flexHoriz">
							<a class="apple flexCenter ml-2 mr-2" href="#">
								<span class="rounded-pill bgDark-lg48"></span>
								<img src="img/apple.svg" class="" alt=""/>
								
							</a>
							<a class="google flexCenter ml-4" href="#">
								<span class="rounded-pill bgDark-lg48"></span>
								<!-- <img src="img/google-gr.svg" class="" alt=""/> -->
								<div>&nbsp;</div>
							</a>
						</div>	
					</div>	
				</div>
				<div class="col-sm-6 pt-5 pr-5 overflow-hidden pb-0 column-flex align-items-end"> 
					<img src="img/logo_app.png" class="boxShade bgWhite p-2 mr-3 rounded16" alt=""/>
					<br/>
					<img src="img/app.png" class="boxShade mr-3" alt=""/>
				</div>
			</div>
		</div>
</div>
<div class="col-lg-6 col-sm-12 mb-4">
		<div class="wrapperMP bgGrey">
			<div class="row">
				<div class="col-sm-6">
					<div class="h-100 pl-5 column-flex">
						<div class="pt-5 flex-grow-1">
							<h4>Для сотрудников</h4>
							<p class="mt-4 mb-4">Управление счетом бывает удобным — попробуйте</p>
							<a class="white" href="app_ten.html">Подробнее 
								<img src="img/arrow-long.svg" class="ml-2" alt=""/>
							</a>
						</div>
						<div class="pb-4 mb-4 flexHoriz">
							<a class="google flexCenter ml-2" href="#">
								<span class="rounded-pill bgDark-lg48"></span>
								<!-- <img src="img/google-gr.svg" class="" alt=""/> -->
								<div>&nbsp;</div>
							</a>
						</div>
					</div>
				</div>
				<div class="col-sm-6 pt-5 pr-5 overflow-hidden pb-0 column-flex align-items-end"> 
					<img src="img/logo_app.png" class="boxShade bgWhite p-2 mr-3 rounded16" alt=""/>
					<br/>
					<img src="img/app.png" class="boxShade mr-3" alt=""/>
				</div>
			</div>
		</div>
</div>
</div><!-- row -->

</div> <!-- m-10 -->
<div class="p-3">&nbsp;</div>
<div class="bgLightGrey mt-4 pt-2">
	<div class="m-10 pb-5">
		<h2 class="mainHeader mt-5">С нами уже</h2>

		<div class="row pt-2 pb-5">
			<div class="col-lg-4 col-sm-12 snami-1">
				<img class="left" src="img/snami1.svg" alt=""/>
				<span class="left withUs"><strong class="big">1034</strong><br/>
				Лицевых счетов</span>
			</div>
			<div class="col-lg-4 col-sm-12 snami-2">
				<img class="left" src="img/snami2.svg"  alt=""/>
				<span class="left withUs"><strong class="big">345</strong><br/>
				УК и ТСЖ</span>
			</div>
			<div class="col-lg-4 col-sm-12 snami-3">
				<img class="left" src="img/snami3.svg"  alt=""/>
				<span class="left withUs"><strong class="big">23 456</strong><br/>
				Партнеров</span>
				
			</div>	
		</div>
	</div>	<!-- m-10 -->
</div> <!-- bgLightGrey -->

<div class="m-10">

<h2 class="mainHeader pt-3">Партнеры, которые доверяют нам</h2>

<div class="swiper-container">
<div class="swiper-pagination"></div>
<div class="swiper-wrapper">

	<div class="swiper-slide">
		<div class="wrapper4 flexHoriz">
			<div class=" p-2 align-self-center">
				<img class="square1" src="img/part (1).png" alt=""/>	
			</div>
			<div class=" p-2 align-self-center">
				<img class="square1" src="img/part (2).png" alt=""/>		
			</div>
			<div class=" p-2 align-self-center">
				<img class="square1" src="img/part (3).png" alt=""/>	
			</div>
			<div class=" p-2 align-self-center">
				<img class="square1" src="img/part (4).png" alt=""/>	
			</div>	
			<div class=" p-2 align-self-center">
				<img class="square1" src="img/part (1).png" alt=""/>	
			</div>
			<div class=" p-2 align-self-center">
				<img class="square1" src="img/part (2).png" alt=""/>		
			</div>
			<div class=" p-2 align-self-center">
				<img class="square1" src="img/part (3).png" alt=""/>	
			</div>
			<div class=" p-2 align-self-center">
				<img class="square1" src="img/part (4).png" alt=""/>	
			</div>	
		</div>
	</div> <!-- swiper-slide -->			
	<div class="swiper-slide">	
		<div class="wrapper4 flexHoriz">
			<div class=" p-2 align-self-center">
				<img class="square1" src="img/part (5).png" alt=""/>	
			</div>
			<div class=" p-2 align-self-center">
				<img class="square1" src="img/part (6).png" alt=""/>		
			</div>
			<div class=" p-2 align-self-center">
				<img class="square1" src="img/part (7).png" alt=""/>	
			</div>
			<div class=" p-2 align-self-center">
				<img class="square1" src="img/part (8).png" alt=""/>	
			</div>		
			<div class=" p-2 align-self-center">
				<img class="square1" src="img/part (1).png" alt=""/>	
			</div>
			<div class=" p-2 align-self-center">
				<img class="square1" src="img/part (2).png" alt=""/>		
			</div>
			<div class=" p-2 align-self-center">
				<img class="square1" src="img/part (3).png" alt=""/>	
			</div>
			<div class=" p-2 align-self-center">
				<img class="square1" src="img/part (4).png" alt=""/>	
			</div>	
		</div>	
	</div> <!-- swiper-slide -->
	
</div>  <!-- swiper-wrapper -->
<div class="p-2">&nbsp;</div>
	<div class="swiper-button-prev"><img src="img/btn-left.svg" class="" alt=""/></div>
    <div class="swiper-button-next"><img src="img/btn-right.svg" class="" alt=""/></div>
	
</div> <!-- swiper-container -->	

</div> <!-- m-10 -->
<div class="p-2">&nbsp;</div>

<div class="bgLightGrey pb-5 mb-0">
<div class="m-10 pb-5">

		<h2 class="mainHeader">Проекты, которыми мы гордимся
		
			
			<a class="btn right whiteBtn show-desktop" href="gk.html">
				<span class="flexHoriz flexCenter w-100">
					<span class="mr-2 ">Посмотреть все</span>
					<img src="img/arrow-blk.svg" class="greySvg" alt=""/>
				</span>
			</a>
		</h2>


	<div class="row">
		<div class="col-lg-3 col-sm-6">
			<div class="p-0">
				<span class="complexImg rad-top16" ></span>
				<img src="img/hand.png" class="handImg" alt=""/>
				<div class="bgWhite p-3 rad-bot16">
					<p class=""><strong>Сильвер-таун</strong></p>
					<span class="d-block gray3"><img src="img/geo.svg" class="grayscale w16 mt-n1 mr-1" alt=""/>
						Санкт-Петербург • 32 компании</span>
				</div>
			</div>
		</div>
		<div class="col-lg-3 col-sm-6">
			<div class="p-0">
				<span class="complexImg rad-top16" ></span>
				<img src="img/hand.png" class="handImg" alt=""/>
				<div class="bgWhite p-3 rad-bot16">
					<p class=""><strong>Сильвер-таун</strong></p>
					<span class="d-block gray3"><img src="img/geo.svg" class="mt-n1 mr-1 grayscale  w16" alt=""/>
						Москва • 7 компаний</span>
				</div>
			</div>	
		</div>
		<div class="col-lg-3 col-sm-6">
			<div class="p-0">
				<span class="complexImg rad-top16" ></span>
				<img src="img/hand.png" class="handImg" alt=""/>
				<div class="bgWhite p-3 rad-bot16">
					<p class=""><strong>Сильвер-таун</strong></p>
					<span class="d-block gray3"><img src="img/geo.svg" class="mt-n1 mr-1 grayscale w16" alt=""/>
						Москва • 7 компаний</span>
				</div>
			</div>		
		</div>
		<div class="col-lg-3 col-sm-6">
			<div class="p-0">
				<span class="complexImg rad-top16" ></span>
				<img src="img/hand.png" class="handImg" alt=""/>
				<div class="bgWhite p-3 rad-bot16">
					<p class=""><strong>Сильвер-таун</strong></p>
					<span class="d-block gray3"><img src="img/geo.svg" class="mt-n1 mr-1 grayscale w16" alt=""/>
						Москва • 7 компаний</span>
				</div>
			</div>
		</div>		
	</div>
	<div class="row pt-3">
		<div class="col-lg-3 col-sm-6 d-none d-sm-block">
			<div class="p-0">
				<span class="complexImg rad-top16" ></span>
				<img src="img/hand.png" class="handImg" alt=""/>
				<div class="bgWhite p-3 rad-bot16">
					<p class=""><strong>Сильвер-таун</strong></p>
					<span class="d-block gray3"><img src="img/geo.svg" class="mt-n1 mr-1 grayscale w16" alt=""/>
						Москва • 7 компаний</span>
				</div>
			</div>
		</div>
		<div class="col-lg-3 col-sm-6 d-none d-sm-block">
			<div class="p-0">
				<span class="complexImg rad-top16" ></span>
				<img src="img/hand.png" class="handImg" alt=""/>
				<div class="bgWhite p-3 rad-bot16">
					<p class=""><strong>Сильвер-таун</strong></p>
					<span class="d-block gray3"><img src="img/geo.svg" class="mt-n1 mr-1 grayscale w16" alt=""/>
						Москва • 7 компаний</span>
				</div>
			</div>	
		</div>
		<div class="col-lg-3 col-sm-6 d-none d-sm-block">
			<div class="p-0">
				<span class="complexImg rad-top16" ></span>
				<img src="img/hand.png" class="handImg" alt=""/>
				<div class="bgWhite p-3 rad-bot16">
					<p class=""><strong>Сильвер-таун</strong></p>
					<span class="d-block gray3"><img src="img/geo.svg" class="mt-n1 mr-1 grayscale w16" alt=""/>
						Москва • 7 компаний</span>
				</div>
			</div>		
		</div>
		<div class="col-lg-3 col-sm-6 d-none d-sm-block">
			<div class="p-0">
				<span class="complexImg rad-top16" ></span>
				<img src="img/hand.png" class="handImg" alt=""/>
				<div class="bgWhite p-3 rad-bot16">
					<p class=""><strong>Сильвер-таун</strong></p>
					<span class="d-block gray3"><img src="img/geo.svg" class="mt-n1 mr-1 grayscale w16" alt=""/>
						Москва • 7 компаний</span>
				</div>
			</div>
		</div>		
	</div>
	<div class="w-100">
		<a class="btn right whiteBtn show-mobile mt-4" href="gk.html">
			<span class="flexHoriz flexCenter w-100">
				<span class="mr-2 ">Посмотреть все</span>
				<img src="img/arrow-blk.svg" class="greySvg" alt=""/>
			</span>
		</a>
	</div> 

</div> <!-- m-10 -->
</div> <!-- bgLightGrey -->

<div class="bgRose mt-0">
	<div class="m-10">
	<h2 class="mainHeader">Нам доверяют</h2>

<div class="swiper-container">
<div class="swiper-pagination"></div>
<div class="swiper-wrapper">

	<div class="swiper-slide flexHoriz justify-content-between">

			<div class="w-30  bgWhite p-4 rounded16">
				<div class="flexHoriz mb-3">
					<img class="rounded-pill  w-25" src="img/avatar.png" alt=""/>	
					<span class=" w-75 p-2 pl-4"><p><strong class="font18">Алексей Константинов</strong></p><p class="gray1 mt-2">Представитель УК Звезда</p></span>
				</div>
				<p class="font16 gray1">Управбот очень удобен, современен и&nbsp;регулярно обновляется. Быстрота реакции, обратная связь, организация и тех поддержка на высоком уровне — это создаёт прекрасный фундамент для долгосрочного и успешного сотрудничества.</p>
		
			</div>
			<div class="w-30  bgWhite p-4 rounded16">
				<div class="flexHoriz mb-3">
					<img class="rounded-pill  w-25" src="img/avatar.png" alt=""/>	
					<span class=" w-75 p-2 pl-4"><p><strong class="font18">Алексей Константинов</strong></p><p class="gray1 mt-2">Представитель УК Звезда</p></span>
				</div>
				<p class="font16 gray1">Управбот очень удобен, современен и&nbsp;регулярно обновляется. Быстрота реакции, обратная связь, организация и тех поддержка на высоком уровне — это создаёт прекрасный фундамент для долгосрочного и успешного сотрудничества.</p>
		
			</div>
			<div class="w-30  bgWhite p-4 rounded16">
				<div class="flexHoriz mb-3">
					<img class="rounded-pill  w-25" src="img/avatar.png" alt=""/>	
					<span class=" w-75 p-2 pl-4"><p><strong class="font18">Алексей Константинов</strong></p><p class="gray1 mt-2">Представитель УК Звезда</p></span>
				</div>
				<p class="font16 gray1">Управбот очень удобен, современен и&nbsp;регулярно обновляется. Быстрота реакции, обратная связь, организация и тех поддержка на высоком уровне — это создаёт прекрасный фундамент для долгосрочного и успешного сотрудничества.</p>
		
			</div>			

	
	</div> <!-- swiper-slide  -->
	
	<div class="swiper-slide flexHoriz justify-content-around">
	

			<div class="w-30 bgWhite p-4 rounded16">
				<div>
					<img class="rounded-pill left w-25" src="img/avatar.png" alt=""/>	
					<span class="left w-75 pl-4 pb-4"><strong>Алексей Константинов</strong><p class="small">Представитель УК Звезда</p></span>
				</div>
				<p>Управбот очень удобен, современен и&nbsp;регулярно обновляется. Быстрота реакции, обратная связь, организация и тех поддержка на высоком уровне — это создаёт прекрасный фундамент для долгосрочного и успешного сотрудничества.</p>
		
			</div>
			<div class="w-30 bgWhite p-4 rounded16">
				<div>
					<img class="rounded-pill left w-25" src="img/avatar.png" alt=""/>	
					<span class="left w-75 pl-4 pb-4"><strong>Алексей Константинов</strong><p class="small">Представитель УК Звезда</p></span>
				</div>
				<p>Управбот очень удобен, современен и&nbsp;регулярно обновляется. Быстрота реакции, обратная связь, организация и тех поддержка на высоком уровне — это создаёт прекрасный фундамент для долгосрочного и успешного сотрудничества.</p>
			
			</div>
			<div class="w-30 bgWhite p-4 rounded16">
				<div>
					<img class="rounded-pill left w-25" src="img/avatar.png" alt=""/>	
					<span class="left w-75 pl-4 pb-4"><strong>Алексей Константинов</strong><p class="small">Представитель УК Звезда</p></span>
				</div>
				<p>Управбот очень удобен, современен и&nbsp;регулярно обновляется. Быстрота реакции, обратная связь, организация и тех поддержка на высоком уровне — это создаёт прекрасный фундамент для долгосрочного и успешного сотрудничества.</p>

			</div>

		

	</div> <!-- swiper-slide  -->	
	

	</div> <!--  swiper-wrapper -->	
	<div class="p-2">&nbsp;</div>
	<div class="swiper-button-prev"><img src="img/btn-left.svg" class="" alt=""/></div>
    <div class="swiper-button-next"><img src="img/btn-right.svg" class="" alt=""/></div>
	

	</div> <!-- swiper-container -->
	<div class="p-2">&nbsp;</div>
	</div> <!-- m-10 -->
</div> <!-- sliderCorrect -->


<div class="m-10 pb-5">
	<h2 class="mainHeader">Хотите узнать подробности?</h2>

	<div class="row sol">
		<div class="col-lg-4 col-sm-12 mor-1">
			<a href="clients.html"><span class="square"></span>
			<p class="text-center ml-0">Клиентам</p></a>
		</div>
		<div class="col-lg-4 col-sm-12 mor-2">
			<a href="partners.html"><span class="square"></span>
			<p class="text-center ml-0">Партнёрам</p></a>
		</div>
		<div class="col-lg-4 col-sm-12 mor-3">
			<a href="tenants.html"><span class="square"></span>
			<p class="text-center ml-0">Жителям</p></a>
		</div>	
	</div>
	
<div class="p-3">&nbsp;</div>
</div> <!-- m-10 -->


</main>
</asp:Content>
