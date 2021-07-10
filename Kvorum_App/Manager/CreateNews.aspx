<%@ Page Title="" Language="C#" ValidateRequest="false" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="CreateNews.aspx.cs" Inherits="Kvorum_App.Manager.CreateNews" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <style> 
                .newsChunk { 
                        text-align: justify; 
                        margin-bottom: 25px; 
                } 
                .newsDate { 
                        color: #3b404f; 
                        padding-right: 10px; 
                } 
                .prjcts{
                        overflow: auto;
    height: 200px;
                }
        </style>  
		
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<script>
$(document).ready(function() {
$('.col-lg-9half').toggleClass('min-vh-100');
$('.col-lg-9half').toggleClass('max-vh-100');

	$('.navbar-nav .nav-link').each(function( ) { if ($(this).hasClass('active')) {$(this).toggleClass('active');} });
	$('.navbar-nav .nav-link:nth-child(2)').toggleClass('active');
});
</script>

<div class="overflowY h-95 bgLightGrey3 p-4">
	
	<div class="row">
		<div class="col-lg-8 col-sm-12">
		
<div class="row bgWhite rounded16 m-0 shadow">
	<div class="col-sm-12 p-0">
		<div class="flexHoriz w-100 pt-4 pl-4">
			<h2 class="font24b">Создание/редактирование новости</h2>
		</div>
 
		<div class="p-4">
		
		<div class="row mb-4">
	<div class="col-sm-7 flexHoriz flex-wrap justify-content-between">
		
			<div class="posRel w-48">
				<input type="date" id="dateNews" required="required">
				<label for="dateNews">Дата публикации</label>
			</div>
			<div class="posRel w-48">
				<input type="time" id="timeNews"required="required">
				<label for="timeNews">Время публикации</label>
			</div>
			<div class="w-48">
				<input type="checkbox" id="ImpNews" class="checkbox-item">
				<label id="rnumH" for="ImpNews">Важная&nbsp;новость</label>
			</div>
			<div class="w-48">
			    <input type="checkbox" id="fixed" class="checkbox-item">
				<label for="fixed" >Закреплено</label>
			</div>
		</div>	
		<div class="col-sm-5">	


            <div id="forNewsDiv" class="border p-3 rounded8 column-flex">
                <h4 class="font16b">Проект, к которому относится новость</h4>
				<div class="mb-3">
					<input type="checkbox" onclick="checkAll(this)" name="newsFor" class="checkbox-item" id="forAll" class="">
					<label for="forAll">Для всех</label>
				</div>
                <div id="prjcts" class="w-100 h-15 shadow rounded8 prjcts p-2 position-relative">
                    </div>
			<%--	<div class="radio-item pl-0">
					<input type="radio" id="forProject" name="newsFor" class="">
					<label for="forProject" id="forAlbl">Какой-то проект</label>
                </div>
				<div class="radio-item pl-0">
					<input type="radio" name="newsFor" id="forAll" class="">
					<label for="forAll">Для всех</label>
				</div>--%>
            </div>
        

		</div>
	</div>
		
			<div class="posRel w-100 mb-3">
				<input type="text" id="HeaderText">
				<label for="HeaderText">Заголовок новости</label>
			</div>
			
            <label>Текст новости</label>
			<textarea id="NewText" name="editor1" ></textarea>
         
		 <%--class="ckeditor" <textarea class="content richText-initial" style="display: none;"></textarea>--%>

	
	
	<!--<div class="content"></div><script src="../js/richtext/jquery.richtext.min.js"></script>
	<script>
		$( document ).ready(function() {
		   // $('.content').richText();
		});
	</script> -->





            <label>Краткий текст</label>

            <textarea id="PreviewText" style="width:50%; height:100px" name="editor2"></textarea> <%--class="ckeditor"--%>
     
		</div> <!-- p-4 -->
</div> </div> <!-- row -->
	</div>
	<div class="col-lg-4 col-sm-12 min-h-100">
		<div class="row bgWhite rounded16 m-0 shadow h-100 p-4">
			<div class="col-sm-12 p-0">
			
				<h4 class="font18b mb-3">
					Медиатека
				</h4>
			<label>Прикрепленный файл</label>
            <input type="file" id="NewsFile">
            
			<br />   <br />
            <label>Прикрепленное изображение</label>
            
            <input type="file" id="filesN" >
          <%--  <img id="imgNews" src="https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg" style="width: 8%;"><i class="fa fa-close removing3" itemid="1" onclick="removeNewsImg(this)" style="font-size: 14px; float: left;" aria-hidden="true"></i>--%>
            <br>
          
			</div>
		</div>
	</div>
</div>
</div> <!-- overflowY -->

<hr class="w-100 m-0 p-0">

<div class="w-100 pt-4 pr-4 bgWhite flexHoriz buttons1">
			
	
  
                <button id="backto" class="ml-auto btn btn1 outline shadow-none mr-3">Назад</button>
                <button id="ShowNews" class="btn btn1 mr-3">Предварительный просмотр</button>
                <button id="SavePublish" class="btn btn1 mr-3" type="button" style="width: auto;">Опубликовать новость</button>
                <button id="SaveNews" class="btn btn1">Сохранить</button>

        
	
		

		</div>


      <script src="../css/ckeditor/ckeditor.js"></script>
</asp:Content>