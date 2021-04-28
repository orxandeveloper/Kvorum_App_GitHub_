<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="CounterCard.aspx.cs" Inherits="Kvorum_App.Manager.CounterCard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <style>
        .delCSpan {
        color: gray!important;
        }
        #iconStop_C{
            margin-top: 15px;
        }
       .Stop_question{
          font-weight: bold;
    text-align: center;
    color: #095c68;

        }
        label {
            padding: 5px 0;
        }

        select {
            width: 100%
        }

        .genBtn {
            min-width: 5%;
        }

        .sameLine {
            display: inline-block;
            margin-right: 2% !important;
            width: auto;
            min-width: 45%;
            white-space: nowrap;
            text-align: right;
        }

        .sameInputLine {
            display: inline-block;
            width: 45% !important;
            
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
            background-color: rgba(255,0,0,0.4); /* Black w/ opacity */
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
            background-color: red;
            color: white;
        }

        .modal-body2 {
            padding: 2px 16px;
        }

        .modal-footer2 {
            padding: 2px 16px;
            background-color: red;
            color: white;
            height: 45px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<script>
$(document).ready(function() {
	$('.col-lg-9half').toggleClass('bgWhite');
	$('.col-lg-9half').toggleClass('bgLightGrey3');
	
	$('.navbar-nav .nav-link').each(function( ) { if ($(this).hasClass('active')) {$(this).toggleClass('active');} });
	$('.navbar-nav .nav-link:nth-child(4)').toggleClass('active');
});
 
</script> 
<div class="row w-100 m-0 min-vh-100">
	<div class="col-sm-12 p-0">
	
	<div class="row p-4 m-0">
	<div class="col-lg-6 col-sm-12">
		
	  <div class="bgWhite rounded16 shadow w-100 p-4">
	  
		<div class="flexHoriz w-100" id="infoCount">
			<h2 id="meterNum" class="font24b textBlack">Счетчик №3456789</h2>
			<button id="delC" class="transp border-0 ml-auto">
				<img src="../img/ic-bin.svg" class="mr-3 position-absolute d-flex ml-n4 " alt=""/>
				<span id="delspan" class="font16b reddish">Удалить счетчик</span>
			</button>
		</div>
		
		<div class="row mt-3 mb-3" id="btns">
			<div class="col-sm-12 ">
				<a class="btn btn1 w56 h56 outline shadow-none flexCenter mr-2" title="Приостановить" id="StopC"">
					<img src="../img/ic-pause.svg" class=" reddishSvg" alt="">
				</a>

				<a id="zamen" class="btn btn1 w56 h56 outline shadow-none flexCenter mr-2" title="Замена счетчика">
					<img src="../img/ic-switch.svg" class=" reddishSvg" alt="">
				</a>

				<button class="btn btn1 w56 h56 outline shadow-none flexCenter mr-2" title="Поверка счетчика" id="Pove">
					<img src="../img/time.svg" class=" reddishSvg" alt="">
				</a>

				<button class="btn btn1 h56 mr-2" id="SaveUp"><strong>Редактировать</strong></button>

				<button class="btn btn1 h56 outline shadow-none flexCenter" id="bacS">Назад</button>

				
			</div>

		</div>
		
		
		
              
                 <!--   <label>Тип помещения</label> -->
                    <select id="TRoomC">
                        <option value="0">Выберите Тип помещения</option>
                    </select>
<div class="p-0 font12">&nbsp;</div>
                 <!--   <label>Номер помещения</label>-->
                    <select id="roomNum">
                       <option value="0">Выберите Номер помещения</option>
                    </select>
<div class="p-0 font12">&nbsp;</div>
                  <!--  <label>ЛС</label>-->
                    <select id="Ps">
                        <option value="0">Выберите Лицевой счет</option>
                    </select>

					<div class="posRel w-100 mt-3 mb-3">
						<input type="text" id="MeterN" style="width:auto" />
						<label for="MeterN">Номер счетчика</label>
					</div>
					
                 <!--   <label>Тип счетчика</label>-->
                    <select id="TMeterC">
					 <option value="0">Выберите Тип счетчика</option>
                    </select>
		

                    <input type="checkbox" id="is_auto" disabled="disabled" class="checkbox-item">
                    <label for="is_auto" class="mt-3 ">Показания передаются автоматически</label>
     
	 
                    <div class="posRel w-100 mt-3 ">
						<input type="number" id="amT" />
						<label for="amT">Количество тарифов</label>
					</div>
					
					<div class="posRel w-100 mt-3 ">
						<input type="date" id="lst" />
						<label id="lblDataPosProver" for="lst">Дата последней поверки</label>
					</div>
					
					<div class="posRel w-100 mt-3 ">
						<input type="date" id="nxt" />
						<label id="lblDFuture" for="nxt" >Дата следующей поверки</label>
					</div>
					
			 
            <!-- row -->
 </div> <!-- wrapper -->
	</div><div class="col-lg-6 col-sm-12">
		<div class="bgWhite rounded16 shadow w-100 p-0">
<ul class="nav nav-tabs border-0 p-3"  role="tablist">
  <li class="nav-item d-flex">
    <a class="nav-link active border-0 font18b font-normal" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Показания</a>
  </li>
  <li class="nav-item">
    <a class="nav-link border-0 font18b font-normal" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Сведения</a>
  </li>
</ul>
<style>
	.font18b.font-normal {color: #020202;}
	.font18b.font-normal.active {color: #095C68;}

</style>
<div class="tab-content">

<div class="tab-pane p-3 fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
	
	<h3 id="istPok" class="font16b mt-3 pb-3">История показаний</h3>
	
</div>

<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <table class="mngTable w-100">
                <thead>
                    <tr>
                        <th>Дата и время</th>
                        <th>Событие</th>
                        <th>Прикреп. файл</th>
                        <th>Автор</th>
                    </tr>
                </thead>
                <tbody id="hist">
                </tbody>
            </table>
			<style>
				.mngTable td:last-child {text-overflow: ellipsis; overflow: hidden; max-width: 80%;  padding-top: 1rem;  display: block;}
			</style>
</div></div>			
			
		</div>	
			
	</div>
	</div> <!-- row -->
	</div>
</div> <!-- row -->	
<!--  <ul class="nav nav-tabs" id="nav-tab">
        <li class="active"><a data-toggle="tab" href="#tab1">Общие сведения</a></li>
        <li><a data-toggle="tab" href="#tab2">История</a></li>
    </ul>

    <div class="tab-content">
        <div id="tab1" class="tab-pane fade in active"> -->
          

           
            <%-- <div class="row">        <div class="col-xs-6">        <table class="table" style="margin:0;">               <thead><tr>                        <td>Дата подачи</td>                        <td>Т1</td>                        <td>Т2</td>                        <td>Тn</td>                    </tr></thead>                 <tbody>                    <tr>                        <td>   </td>                        <td>   </td>                        <td>   </td>                        <td>   </td>                    </tr>                   </tbody>         </table>     </div>        <div class="col-xs-6" style="padding-left:30px;">      <input type="text"/>   <button class="btn genBtn">Внести показания</button></div>       </div>--%>
        
	<!--	</div> -->
        <!-- tab1 -->
      <!--   <div id="tab2" class="tab-pane fade">


        </div>
   
    </div> tab-content -->


    <%--<div id="poverkaCnt" style="width:75%; border:1px solid #ccc; text-align:center;">	<h2 style="width:100%; padding:10px;">Поверка счетчика</h2>            <label class="sameLine">Тип счетчика</label>            <select class="sameInputLine">
                <option>ГВС</option>            </select>            <br />    
            
            <label class="sameLine">Номер счетчика</label>            <input class="sameInputLine" value="15487545"/>            <br />
            <input type="checkbox" style="float:none; margin-right:5px;"/> <label style="display:inline-block;">Поверка со снятием</label>            <br />
            <label class="sameLine">Дата снятия</label>
                <input class="sameInputLine" type="date" />                <br />
            <label class="sameLine">Дата установки</label>                <input class="sameInputLine" type="date" />                <br />
                     <label class="sameLine">Дата поверки</label>            <input class="sameInputLine" type="date" value="02.02.2020" />            <br />
                        <label class="sameLine">Дата следующей поверки</label>            <input class="sameInputLine" type="date" value="02.02.2020" />         <br />    <br />
                       <input type="file" style="position:relative; left:30%; cursor: pointer;"/>
                    <br />            <button class="btn logBtn">Ок</button>           <br/><br />          </div>--%>

    <div style="clear: both; height: 30px;">&nbsp;</div>
    <div id="myModal2" class="modal2" style="z-index: 3000; background-color: rgba(0 0 0 / 42%); display: none;">

        <!-- Modal content -->
        <div class="modal-content2 bgWhite rounded16 p-4 shadow" style="width: 31%">
            <div class="modal-header2 bgWhite flexHoriz">
         		<h2 class="font24b textBlack">Замена счетчика</h2>
                <span class="close2 ml-auto mr-3" id="close_Z" style="">
					<img src="../img/close.svg" alt="Закрыть" class="w24"/>
				</span>
            </div>
            <div class="modal-body2 w-100" style="">

                <div id="changeCounter" class="p-3">



                
                        <label for="selNA" class="">Номер помещения</label>
                        <select id="rmNumZ" class="sameInputLine">
                        </select><br>

                        <label for="selLC" class="">ЛС</label>
                        <select id="PsZ" class="sameInputLine">
                        </select><br>

                        <label for="typeCountZ" class="">Тип счетчика</label>
                        <select id="typeCountZ" onchange="ChangeType(this)" class="sameInputLine">
                        </select>


<div class="flexHoriz w-100 mb-3">
						<label for="oldCNum" class=" mb-0">Номер прежнего счетчика</label> <!-- for inPrevCnt sameLine-->                       
                        <input id="oldCNum" class="sameInputLine ml-auto" type="text" value="15487545" disabled="disabled" style="background-color: rgb(235, 235, 228);">
</div><div class="flexHoriz w-100 mb-3">
                        <label class=" mb-0" id="PrevClstDatalbl" >Показания прежнего счетчика</label>
                        <input type="text" id="PrevClstData" class="sameInputLine  ml-auto " value="100" disabled="disabled">
</div><div class="flexHoriz w-100 mb-3">
                        <label class=" mb-0">Дата показания прежнего счетчика</label>
                        <input class="sameInputLine  ml-auto " id="PrevnxtZ" type="date" disabled="disabled" style="background-color: rgb(235, 235, 228);"><br>
</div><div class="flexHoriz w-100 mb-3">
                        <label class=" mb-0">Номер нового счетчика</label>
                        <input class="sameInputLine  ml-auto " type="number" id="newCounterNum" value="" >
</div><div class="flexHoriz w-100 mb-3">
                        <label class=" mb-0">Дата последней поверки</label>
                        <input class="sameInputLine  ml-auto " id="lstControlZ" type="date" value="02.02.2020" >
</div><div class="flexHoriz w-100 mb-3">
                        <label class=" mb-0">Дата следующей поверки</label>
                        <input class="sameInputLine  ml-auto " type="date" id="nxtControlZ" value="02.02.2020">
</div><div class="flexHoriz w-100 mb-3">
                        <label class=" mb-0" id="nacPokZlbl">Начальное показание</label>
                        <input class="sameInputLine  ml-auto " data-num="1" id="nacPokZ" min="0" onkeyup="validateNegative(this)" type="number" >
</div><div class="flexHoriz w-100 mb-3">
                        <label class=" mb-0">Дата показания</label>
                        <input class="sameInputLine  ml-auto" id="dataPokz" type="date" value="02.02.2020">
</div>

                        <input type="file" id="file_Z" onchange="file_zChange(this)" style="position: relative; cursor: pointer;">

                        <br><br>
						
						<button class="btn btn1 outline shadow-none h48 flexCenter" id="OtmenZ">Отмена</button>
                        <button class="btn btn1 flexCenter h48 right" id="ChangeC">Заменить счетчик</button>
                        

                </div>

            </div>
            <div class="modal-footer2 p-0 h-auto" style="text-align: left; background-color: white">
            </div>
        </div>

    </div>
    <div id="myModalPover" class="modal2" style="z-index: 3000; background-color: rgba(0 0 0 / 42%); display: none;">

        <!-- Modal content -->
        <div class="modal-content2 bgWhite rounded16 shadow p-4" style="width: 31%">
            <div class="modal-header2 bgWhite flexHoriz" style="">
				<h2 class="font24b textBlack">Поверка счетчика</h2>
                <span class="close2 ml-auto mr-3" id="close_P" style="">
					<img src="../img/close.svg" alt="Закрыть" class="w24"/>
				</span>
            </div>
            <div class="modal-body2" style="">
                <div id="poverkaCnt" style="">

               
<div class="flexHoriz w-100 mb-3 mt-3">
                    <label class="mb-0">Тип счетчика</label>
                    <select id="CtypeP" class="sameInputLine ml-auto" style="background:rgb(235, 235, 228);">
                    </select>
                    <br>
</div><div class="flexHoriz w-100 mb-3">
                    <label class="mb-0">Номер счетчика</label>
                    <input id="CnumP" class="sameInputLine ml-auto" disabled="disabled">

</div><div class="flexHoriz w-100 mb-3">

                    <label class="mb-0">Дата поверки</label>
                    <input class="sameInputLine ml-auto" type="date" id="lstP">
</div><div class="flexHoriz w-100 mb-3">

                    <label class="mb-0">Дата следующей поверки</label>
                    <input class="sameInputLine" type="date" id="nxtP" value="02.02.2020" disabled="disabled" style="background-color: rgb(235, 235, 228);">
</div><div class=" mb-3">
                    
                    <input id="removal" onclick="removal(this)" type="checkbox" class="checkbox-item"  style="">
					<label class="mb-0" for="removal">Поверка со снятием</label>
</div>

                    <input type="file" id="file_P" onchange="file_pChange(this)" style="cursor: pointer;">

                    <br>   <br>
                    <button id="OkP" class="btn btn1 right h48 w177 flexCenter">Ок</button>
                    <br>
                    <br>
                </div>


            </div>

        </div>

    </div>
    <div id="myModalStopC" class="modal2" style="z-index: 3000; background-color: rgba(0 0 0 / 42%);">

        <!-- Modal content -->
        <div class="modal-content2 bgWhite rounded16 shadow border-0 p-4" style="width: 31%">
            <div class="modal-header2 bgWhite flexHoriz" style="">
				<h2 class="font24b textBlack">Приостановка счетчика</h2>
                <span class="close2 ml-auto mr-3" id="close_St" style="">
					<img src="../img/close.svg" alt="Закрыть" class="w24"/>
				</span>
            </div>
            <div class="modal-body2 " style="">
                <div id="priostanov" style="">

                    
                    <p class="mt-2 mb-2"><strong>Для возобновления работы счетчика потребуется внести данные о поверке счетчика. Также по данному счетчику нельзя будет внести показания. Вы уверены, что хотите приостановить данный счетчик?</strong></p>

<div class="posRel">
                   
                    <input type="date" class="sameInputLine" id="Sdate" >
					<label class="" for="Sdate">Дата выхода из строя</label> <!-- sameLine -->
</div>
                
                   <!-- <label>Комментарий</label> -->
                    <textarea rows="5" id="cmntS" cols="50" name="text" placeholder="Введите комментарий" class="p-1 rounded8"></textarea>
                    <br>
  <br>

                    <input type="file" id="file_S" onchange="file_StChange(this)" style="cursor: pointer;">
  <br> <br>
                    <br>
                   
                    <button id="Close_Stop_C" class="btn btn1 outline h42 w177 flexCenter shadow-none">Отмена</button>
					<button id="Stop_C" class="btn btn1 w177 h42 flexCenter right"><strong>Готово</strong></button>
                    <br>
                    <br>
                </div>
            </div>
        </div>
    </div>
    <div id="myModalDelC" class="modal2" style="z-index: 3000; background-color: rgba(0 0 0 / 42%);">

        <!-- Modal content -->
        <div class="modal-content2 bgWhite rounded16 shadow p-4" style="width: 31%">
            <div class="modal-header2 flexHoriz" style="background-color: white;">
			
                <h2 class="font24b textBlack">Удаление счетчика</h2>
				<span class="close2 ml-auto mr-3" id="close_D" style="">
					<img src="../img/close.svg" alt="Закрыть" class="w24"/>
				</span>
            </div>
            <div class="modal-body2" style="width: 131%; height: 100px; height: 100px; padding: 15px; /* min-width: 100px; */display: inline-block;">
				<p><strong>Вы действительно хотите удалить данный счетчик?</strong></p>
            </div>
            <div class="modal-footer2 flexHoriz" style="text-align: left; background-color: white">

             
                <input type="button" id="del_C" name="name" value="Да" class="flexCenter btn btn1 h48 w177">
				<input type="button" id="OtS" name="name" value="Отмена" class="ml-auto btn1 btn outline shadow-none h48 w177 flexCenter"/>
            </div>
        </div>
    </div>
</asp:Content>
