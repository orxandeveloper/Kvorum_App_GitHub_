<%@ Page Title="" Language="C#" MasterPageFile="~/Super_Disp/Super.Master" AutoEventWireup="true" CodeBehind="CreateDispRequest.aspx.cs" Inherits="Kvorum_App.Super_Disp.CreateDispRequest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <div class="col-lg-9half col-sm-12 p-0 min-vh-100 bgLightGrey3  ">	
		<span class="h90"></span>			
			<div class="w-100 pt-2 bgWhite pl-2">
				<ol class="list-inline list-unstyled mb-0">
					<li class="list-inline-item">
						<a href="te-metr.html">
							<img src="img/btn-left.svg" class="w16 mt-n1 mr-1" alt="">
						</a>
					</li>
					<li class="list-inline-item">
							<p class="gray1 font18">Новая заявка</p>
					</li>
				</ol>
			</div>

<div class="p-4 ">
	

	

<div class="bgWhite rounded16 mt-4 ml-3 p-4 shadow">
	
			<h3 class="font24 font-weight-bold pb-3 pt-3 w-100 flexHoriz " id="hedrZ">Создание заявки
				<div class="ml-auto">
							
    <!--<img id="lstcmnt" src="../img/unlem.png" style="width:10%; display:block" /> -->
    <i id="lstcmnt" class="fa fa-exclamation-circle" style="font-size: 300%; color: green; display: block"></i>
	
				</div>
			</h3>

	<style>
		.errorMark {font-size: 75%; padding: 3.5rem 1rem 0 1rem; color: red; }
		.errorMarkT {font-size: 75%; padding: 0 0 0 1rem; color: red; }
	</style>
    <form>

        <div class="flexHoriz mb-4">  
			<label class="mr-4 w-auto " >
				<input id="opl" type="checkbox" class="mr-1">
				Оплачено
			</label>
			<label class="pr-2 w-auto ">
				<input id="chkem" type="checkbox" class="mr-1">
				Аварийное обращение
			</label>
		</div>
		
		<div class="posRel h56 rounded-lg mb-4">
			
			<select id="prjcts">
				<option value="0">Выберите проект </option>
			</select>
			<label class="w-95" for="prjcts">Проект*</label>
			
			<span id="prjcts_S" class="errorMark" style="display: none">""</span>
        </div>
		
		<div class="posRel h56 rounded-lg mb-4">
			<span style="color: red; display: none;" id="objctZ_Sp">""</span>
		  
			<select id="objctZ">
				<option value="0">Выберите адрес объекта </option>
			</select>
			<label class="w-95" for="objctZ">Адрес объекта*</label>
			
			<span id="adr_S" class="errorMark" style="display: none">""</span>
		</div>
		
		
		<input type="button" id="shServ" name="name" class="btn btn1 h48 mb-3" style="width: auto;" value="Выбрать Услугу" />

		<div class="mb-3" style="display:block">

			<table class="mngTable w-50" id="PrServiceH">
				<thead>
					<tr>
						<th>Наименование&nbsp;услуг</th>
						   <th>Кол-во</th>
						<th>Ед.&nbsp;изм</th>
						<th style="width: 120px;">Стоимость&nbsp;(руб.)</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
			
			
			
		<div class="flexHoriz mb-4 mt-4" style="display:block">
			<div class="posRel h56 rounded-lg mb-0 w-50">
				<input type="text" id="searchtxt" placeholder="Поиск по Услугам" >
				<label class="w-95" for="searchtxt">Поиск</label> <!-- lblsearchtxt -->
			</div>
			<input type="button" value="Поиск услуг" id="SearchService" class="btn btn1 h56 ml-3">
		</div>
		
		<div class="flexHoriz w-50 justify-content-between">
			<div class="posRel h56 rounded-lg mb-4 w-48">
				<select id="Sets" onchange="GetRelatedDirects(0,this)"><option value="0">Выберите Направление</option></select>
				<label for="Sets" class="w-95">Направление*</label>
			</div>
			<div class="posRel h56 rounded-lg mb-4 w-48">
				<select id="GServices">
					<option value="0">Выберите группу услуг</option>
				</select>
				<label for="GServices" class="w-95">Группа услуг</label>
			</div>
		

		</div>
		<div style="max-height: 200px; overflow: auto;">
			<table id="PrService" class="mngTable w-50" style="display: block">
		
			</table>
		</div>
		
        <table class="mngTable w-50" id="AddedTable" style="display: block; ">
          <thead>  <tr>
                <th style="width: 500px;">Наименование услуги/товара</th>
                <th style="width: 70px">Кол-во</th>
                <th style="width:120px;">Стоимость</th>
                <th>Добавление в список</th>
            </tr></thead>
        </table>
        <div class="mb-3" style="max-height: 200px; overflow: auto;">
            <table id="PrService2" class="mngTable w-50" style="display: block"> 
		
   
            </table>
        </div>
    <!--  <button class="btn btn1"></button> -->
	
		<h3 id="listServiceH">Список услуг</h3>
        <input type="button" class="btn btn1" name="name"  id="AddServices" disabled="disabled" value="Добавить услугу / товар" />
			
		
	    	
			
		<span id="PrService_S" class="errorMarkT" style="display: none">""</span>
	  
		</div>
		
		<div class="posRel h56 rounded-lg mb-4" style="display:none">
			<select id="disps">
			   
			</select>
			<label class="w-95" for="disps" >Диспетчеры*</label>
			<span id="disps_S" class="errorMark" style="display: none">""</span>
        </div>
		
		<div class="posRel h56 rounded-lg mb-4">
			<select id="Room_Type">
				<option value="0">Выберите тип помещения </option>
			</select>
			<label class="w-95" for="Room_Type">Тип помещения*</label>
			<span id="Room_Type_S" class="errorMark" style="display: none">""</span>
		</div>
		
		<div class="flexHoriz justify-content-between w-100">
			<div class="posRel h56 rounded-lg mb-4 w-32"> 
				<!--<input id="Room" type="number" style="width: 100%;" />-->
				<input type="text" id="Room" value="" />
				<label class="w-95" for="Room">Номер помещения*</label>		
				<span id="Room_S" class="errorMark" style="display: none">""</span>
			</div>
			<div class="posRel h56 rounded-lg mb-4 w-32"> 
				<!--<input id="Room" type="number" style="width: 100%;" />-->
				<input type="text" id="Block" value="" />
				<label class="w-95" for="Block">Подъезд</label>		
				<span id="Block_S" class="errorMark" style="display: none">""</span>
			</div>			
			<div class="posRel h56 rounded-lg mb-4 w-32"> 
				<!--<input id="Room" type="number" style="width: 100%;" />-->
				<input type="text" id="Floor" value="" />
				<label class="w-95" for="Floor">Этаж</label>		
				<span id="Floor_S" class="errorMark" style="display: none">""</span>
			</div>				
		</div>	
		
		<div class="posRel h56 rounded-lg mb-4"> 
			<input type="text" id="Acnum" name="name" value="" />
			<label class="w-95" for="Acnum">Номер лицевого счета*</label>
			<span id="Acnum_S" class="errorMark" style="display: none">""</span>
		</div>
			
			
		<div id="AcnumList" class="posRel rounded-lg p-2 mb-4 border-1 shadow h-150 w-50 overflowY" style="display: none;"> 
			  
				<!--<input type="text" id="adr" list="adrList">
                    <datalist id="adrList">
                   
                    </datalist>-->

		</div>
		
		<div class="posRel h56 rounded-lg mb-4"> 
			<input id="Ind" type="text" />
				<div id="IndList" class="border-1 shadow h-150 w-50 overflowY" style="display: none">

				</div> 
			<label class="w-95" for="Ind">Заявитель*</label>
			<span id="Ind_S" class="errorMark" style="display: none">""</span>
		</div>
		
        <div class="posRel h56 rounded-lg mb-4"> 
			<input id="Phn" onkeyup="MaskPhone(this)"  type="text" />
			<label class="w-95" for="Phn">Номер телефона*</label>
			<span id="Phn_S" class="errorMark" style="display: none">""</span>
		</div>
     


        <div style="clear: both;">&nbsp;</div>



			
        <input id="dost" type="checkbox" value="false"/>
		<label for="dost" class="pb-2 w-95">Доставка</label>
		
	<div class="flexHoriz justify-content-between w-100" style="display: block">		
		
		<div class="posRel h56 rounded-lg mb-4 w-32">

			<select id="TDost">
				<option value="0">Выберите Тип доставки</option>
				<!-- <option>Самовывоз</option>-->
			</select>
			<label class="w-95" for="TDost">Тип доставки</label>
			<span id="TDost_S" class="errorMark" style="display: none">""</span>
		</div>
		<div class="posRel h56 rounded-lg mb-4 w-32">
			
			<input  id="StDost" type="text" value="" />
			<label class="w-95" for="StDost">Стоимость доставки</label>
		</div>
		<div class="posRel h56 rounded-lg mb-4 w-32">
			
			 <input id="ItCost" type="text" value="" /> <!--disabled="disabled" -->
			<label class="w-95" for="ItCost" >Итоговая стоимость</label>
		</div>
	</div>	

	<div class="flexHoriz justify-content-between w-100" style="display: block">		
		
		<div class="posRel h56 rounded-lg mb-4 w-48">
                
                <input type="date" id="calen1" required="required" name="calendar" value="" />
				<label class="w-95" for="calen1" >Планируемая дата* </label>
        </div>
		<div class="posRel h56 rounded-lg mb-4 w-48">
               
                
                <input type="time" id="tm" required="required" name="time" value="12:00" />
				<label class="w-95" for="tm">Планируемое время* </label>
				<span id="tm_S" class="errorMark" style="display: none">""</span>
		</div>
	</div>
    
	<div style="display: block">
		<h3>Предлагаемая дата</h3>    
		<div class="flexHoriz justify-content-between w-100 mt-4" >		
			<div class="posRel h56 rounded-lg w-48">
                <input type="date" id="calenOF" name="calendar" value="" />
				<label class="w-95" for="calenOF">с</label>
            </div>
           <div class="posRel h56 rounded-lg w-48">
				<input type="date" id="calenOT" name="calendar" value="" />
                <label class="w-95" for="calenOT">по</label>
            </div>
			
		</div><span id="tmOF_S" class="errorMarkT" style="display: block">Ошибка</span>
	</div>	
	<div style="display: block">
		<h3>Предлагаемое время</h3>
		<div class="mt-4 flexHoriz justify-content-between w-100" id="RJ2">
			
			<div class="posRel h56 rounded-lg w-48">
                
                 <input type="time" id="tmOF1" name="calendar" value="" />
				 <label class="w-95" for="tmOF1">с</label>
			</div>	 
			<div class="posRel h56 rounded-lg w-48">	 
                <label class="w-95" for="tmOT1">по</label>
                 <input type="time" id="tmOT1" name="calendar" value="" />
			</div>
		</div>	
		
		<div class="flexHoriz justify-content-between w-100 mt-4" id="RJ2">	
			<div class="posRel h56 rounded-lg w-48">
				<input type="time" id="tmOF2" name="calendar" value="" />
                <label class="w-95" for="tmOF2">с</label>
            </div>	 

			<div class="posRel h56 rounded-lg w-48">  
                <input type="time" id="tmOT2" name="calendar" value="" />
				<label class="w-95" for="tmOT2">по</label>
            </div>
			
		</div><span id="tmOT_S" class="errorMarkT" style="display: block">Ошибка</span>	
    </div>
	
	
	
        <br />
		
		<div class="posRel h56 rounded-lg mb-4 w-100">
               
				<input type="text" disabled="disabled" id="IspolFio" class="vfi" value="Введите ФИО исполнителя" />
				<label class="w-95" id="lblIspo" for="IspolFio" >Исполнитель</label>
		</div>

     	<em id="emIspo">Исполнитель по умолчанию – диспетчер.</em>   
		
		<div class="posRel h56 rounded-lg mb-4 w-100">
			<select id="IspolList" onchange="ChangeToSend(this)">
				<!-- <option value="0">Выберите исполнителю</option>--> 
			</select>
			<label class="w-95" for="IspolList">Выберите исполнителя</label>
			<span id="IspolList_S" class="errorMark" style="display: none">""</span>
		</div>
		
		<div class="posRel h56 rounded-lg mb-4 w-100">
			<label class="w-95" for="Otven">Ответственный по заявке</label>
			<!--<input type="text" id="Otven" disabled="disabled" value="ФИО ответственного" />-->
			<select id="Otven"  ></select>
			
			<span id="RText_S" class="errorMark" style="display: none">""</span>
		</div>
		
	
		<div class="border-gray rounded8 w-100 mt-3 mb-3">
		
			<textarea class=" rounded8 font16 w-100 h-150 border-0 pt-3 pl-3 " placeholder="Опишите кратко место проведения работ, а так же суть проблемы/задачи" id="RText"></textarea>
		</div>
		
		<div class="mb-3" style="display: block">
		
			<h3 id="hstComh">История комментариев</h3> 
		
			<div id="hstCom" style="border-radius: 8px; border: 1px dotted #777777; overflow: auto; height: 190px; max-height: 190px;"><!--<h4>   - ""</h4>-->
			</div>
        </div>
		
		
        <input type="button" name="name" id="fileH_btn" value="Выбрать Файл" style="display:block" />
        <input type="file" name="name" id="fileH" style="display: none" value="" />
        <span id="RComment_S" class="errorMark" style="display: none">""</span>
        
		<br/><br/><br/>
		
		
		
		<h3 id="hComennt">Комментарий</h3>
        <div id="himgs">
        </div>
 		<textarea id="RComment" class="opisanie w-100 rounded8 " style="height: 60px"></textarea>     
		
	
		 
		<div class="flexHoriz w-100 mt-3">
			 <input type="button" name="name" id="file_btn" value="" class="transp border-0 w32" 
			style="background: url('img/attach.svg') no-repeat center center;"/>
		 <!-- ../Files/upl.png -->
		 
			<button id="SendComent" class="ml-auto btn btn1 w-auto flexCenter" type="button">Отправить</button>
       
		</div>
        
   		<br/><br/><br/>    
	
		
		<h3 id="hdPr">Прикрепить файл к заявке</h3>
       
		<div id="imgss">
              <div class="col-xs-2" id="zImg">
               <!-- <img class="foto-disp"  data-url="0" itemid="0" id="fotoDisp0" src="../Files/upl.png">  -->
			   
            </div>
			
            <input type="button" name="name" id="file_btn" value="" class="transp border-0 w32" style="background: url('img/attach.svg') no-repeat center center;"/>
			
			
			<br />
            <input class="knop" style="display:block" id="files" itemid="0" type="file" /><br />
        </div>

	<div class="flexHoriz w-100 justify-items-start">
		<div class="m-2" id="zImg2">
            <img class="foto-disp" data-url="0" id="fotoDisp1" src="img/attach.svg">
        </div>
        <label id="hdPr2" class="w-auto mt-2">Прикрепить файл к заявке</label>

	</div>
        
		<input class="knop ml-2" id="files2" type="file" /><br />

<br />

		<input class="knop" id="files3" style="display:none;margin-left: 9vw;" type="file" /><br />


        <div style="clear: both"></div>
		
		
        <div class="buttons1">
           <button  id="updateRequest" style="display:block" class="h48 btn btn1 flexCenter">Сохранить</button>
		   
			<input type="button" id="updateRequest" style="" class="h48 btn btn1 flexCenter" value="Сохранить">
            <button id="SaveDD" class="h48 btn btn1 flexCenter" type="button" style="background: rgb(0,147,233); ">Принять в работу</button>
            <button id="SaveMO" class="h48 btn btn1 flexCenter" type="button" style="background: rgb(0,147,233); ">Отправить исполнителю</button>
            <button id="backUo" class="h48 btn btn1 flexCenter outline shadow-none" type="button" >Отмена</button>
        </div>
		
		
		
    </form>
	
	
	
	<br/>
	
        <div id="myModal5" style="z-index: 1000;" class="modal2 shadow p-3 bgWhite rounded16 w-100">

        <!-- Modal content -->
        <div class="modal-content2" style="">
            <div class="modal-header2 bgWhite">
                <span class="close2 font24" style="color: black" id="close_6">&times;</span>
                <h2 id="mh3"></h2>
            </div>
            <div class="modal-body2" class="h-150 w-100 ">
                <textarea class="w-100 h-100 m-0 border-grey p-2" id="cmntsts2">Все работы по данной заявке выполнены</textarea>

            </div>
            <hr />
            <div class="modal-footer2 flexHoriz w-100 m-0 p-0" style="">

                <input class="knop" id="f_iles2" style="width: 124px" type="file">
				
				
                <input type="button" id="OkVipol" name="name" value="ОК" class="ml-auto w-15 btn btn1 flexCenter" />
                <input type="button" id="Close_Ot" name="name" value="Отмена" class="ml-3 w-15 btn btn1 outline shadow-none flexCenter mr-0" />

            </div>
        </div>

    </div>
	
	<br/>
	
    <div id="myModal6" style="z-index: 1000;" class="modal2 shadow p-3 bgWhite rounded16 w-100">

        <!-- Modal content -->
        <div class="modal-content2" >
            <div class="modal-header2 position-relative" >
                <span class="close2 font24" style="color: black" id="close_6">&times;</span>
                <h2 id="mh3"></h2>
            </div>
            <div class="modal-body2">
                <p id="txt6" class="font24">Исполнитель:</p>
				
				<div class="posRel h56 rounded-lg mb-4 w-100">
					
					<select id="ispol2">
						<option value="0">Выберите Исполнителя</option>
					</select>
					<label class="w-95" id="Ispolname" for="ispol2">Исполнитель ( по умолчанию Текущий исполнитель)</label>
				 </div>
            </div>
			
            <hr />
			
            <div class="modal-footer2 flexHoriz w-100">

                <input type="button" id="vrntVrabot" name="name" value="Вернуть в работу" class="ml-auto w-32 btn btn1 outline shadow-none flexCenter" />

            </div>

        </div>

    </div>
	<br/>
	
    <div id="DerModalFenster" style="display: block;" class="shadow p-3 bgWhite rounded16 w300 h-150">
       
			<div class="posRel h56 rounded-lg mb-4 w-100">
				<label class="w-95" for="costServ">Стоимость услуги</label>
				<input type="text" id="costServ"/>
            </div>
			<div class="flexHoriz justify-content-between">
				<button id="okBtn" class="btn btn1 w-48 flexCenter">ОК</button>
				<button id="escBtn" class="btn btn1 outline shadow-none w-48 flexCenter">Отмена</button>
			</div>
   
    </div>
     
    <script type="text/javascript">
         function ifrPopup(e) {
             $("#mh8").text("");
             var dtdUrl = $(e).children('img').attr('data-url');
             $("#ifr").attr('src', "https://docs.google.com/gview?url=" + dtdUrl +"&embedded=true");

             var modal = document.getElementById('myModal8');
             var span = document.getElementsByClassName("close_8")[0];
             modal.style.display = "block";
             $("#close_8").click(function () {

                 $("#ifr").attr('src', "");
                 modal.style.display = "none";
             })
             window.onclick = function (event) {
                 if (event.target == modal) {
                     $("#ifr").attr('src', "");
                     modal.style.display = "none";
                 }
             }
         }
     </script>
			
			



</div>	<!-- main block -->
</div><!-- row -->

</asp:Content>
