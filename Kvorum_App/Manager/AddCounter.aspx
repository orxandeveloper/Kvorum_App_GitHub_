<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="AddCounter.aspx.cs" Inherits="Kvorum_App.Manager.AddCounter" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<script>
$(document).ready(function() {
	$('.col-lg-9half').toggleClass('bgWhite');
	$('.col-lg-9half').toggleClass('bgLightGrey3');
});
 
</script>    
<div class="row w-100 m-0 min-vh-100">
	<div class="col-lg-5 col-sm-12 p-0">
<!-- HAddC -->

	<div class="bgWhite rounded16 m-4 p-3 shadow">
	
		<div class="flexHoriz">
			<h2 class="font24b mb-4 mt-3 flexHoriz w-100">Добавить счетчик</h2>
			<a id="DeletePOM" href="#" role="button" class="create font18b position-relative ml-auto" style="display: none;">
				<img src="../img/ic-bin.svg" class="mr-3 position-absolute d-flex ml-n4 mt-1" alt=""/>
				<!--<i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;--><span class="font16b reddish">Удалить</span>
			</a>
		</div>
		
		<div class="flexHoriz flex-wrap justify-content-between" id="pop">

   
		<div class="posRel mb-3 w-48">
            <select id="RoomType" class=" w-100 ">
                <option>Тип помещения</option>
            </select>
		<label for="RoomType">Тип помещения</label>
     	</div>	   
	    <div class="posRel mb-3 w-48">  
            <select id="RoomNum" class=" w-100">
                <option >Номер помещения</option>
            </select>
        <label for="RoomNum">Номер помещения</label> 
		</div>	   
	    <div class="posRel mb-3 w-48">  	
            <select id="sc" class=" w-100">
               <option >ЛС</option>
            </select>
            <label for="sc">ЛС</label>
		</div>	   
			
		<div class="posRel w-48 mb-3">
            <input type="text" id="meterNum"  onkeyup="PositiveValues(this)" class="w-100">
             <label for="meterNum" class="">Номер счетчика</label> 
		</div>

	    <div class="posRel mb-2 w-48">    
            <select id="mtrsType" class=" w-100">
                <option value="0">Выберите тип счетчика</option>
            </select>
			<label for="mtrsType">Тип счетчика</label> 
		</div>
		
		<div class="posRel w-48 mb-3 mt-2">	    
            <input type="number" max="3" min="0" onkeyup="PositiveValues(this)" id="AmntTarif" class="w-100">
			<label id="KolTarif" for="AmntTarif" class="">Количество тарифов</label>
        </div>	
		
            <input type="checkbox" id="is_auto" class="checkbox-item">
            <label class="w-90 mb-3" for="is_auto">Показания передаются автоматически</label>
     
		

		
		<div class="posRel w-48 mb-3">	    
            <input type="date" id="lstControl" value="02.02.2020">
			<label for="lstControl">Дата последней поверки</label>
        </div>
		
		<div class="posRel w-48 mb-3">	    
           
            <input id="nextControl" type="date" value="02.02.2020">
			<label for="nextControl">Дата следующей поверки</label>
        </div>
		
		<div class="posRel w-48 mb-3">	    
            
            <input type="number" data-num="1" min="0" onkeyup="PositiveValues(this)" id="reading1" class="w-100">
			<label data-num="1" id="readingH1" for="reading1" class="">Начальное показание</label>
        </div>
		
		<div class="posRel w-48 mb-3">	    
            <input type="date" id="currMdate" value="02.02.2020">
			<label for="currMdate">Дата показания</label>
		</div>
   
        <input type="file" id="files" value="Прикрепить файл">
                <br /> 
        
	
            <button id="AddC" class="btn btn1 w-100 mt-3 flexCenter h56"><span>Добавить счетчик</span></button>
      
    </div>
	
	</div></div></div>
	
	
</asp:Content>
