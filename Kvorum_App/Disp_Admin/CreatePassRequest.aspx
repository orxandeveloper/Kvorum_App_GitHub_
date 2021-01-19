<%@ Page Title="" Language="C#" MasterPageFile="~/Disp_Admin/Dispatcher.Master" AutoEventWireup="true" CodeBehind="CreatePassRequest.aspx.cs" Inherits="Kvorum_App.Disp_Admin.CreatePassRequest" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="col-xs-12 col-sm-9">
                <!-- main -->
                
    <h2>Заявка на допуск (Статус заявки "Отправлена")</h2>


    <div style="clear: both; height: 21px;">&nbsp;</div>
    <div class="row">
        <div class="col-md-6 col-xs-12">
		
			<label for="Ind">Заявитель</label>
			<input id="Ind" type="text">
     <!--   <div id="IndList" style="border: 1px solid rgb(0, 0, 0); display: none; box-shadow: rgba(0, 0, 0, 0.3) 3px 4px 5px; height: 150px; overflow: auto; width: 67.5%;">
        </div> -->

			<label for="Phn">Номер телефона</label>
			<input id="Phn" onkeyup="MaskPhone(this)" type="text">

			<label for="obj">Название объекта</label>
            <select id="obj">
                <option value="0">Выберите объект</option>
				<option value="358">Москва,Береговой проезд , Д. 5, К. 1</option>
			</select>
			
			<label for="obl">Область *</label>
            <select id="obl" required="">
                <option value="">Московская</option> <!-- чтобы required работал, value должно быть пустым -->
			</select>
			
			<label for="city">Город *</label>
            <select id="city" required="">
                <option value="">Выберите город</option>
			</select>
			
			<label for="street">Улица (проспект, шоссе и т.д.) *</label>
            <input id="street" required="" type="text" placeholder="Название улицы">
			
			<div class="row" style="margin-right: -15px;">
                <div class="col-xs-6">
					<label for="entrH">Дом (корпус и т.д.) *</label>
					<input id="entrH" required="" type="text" placeholder="Введите номер дома">
                </div>
                <div class="col-xs-6">
                    <label for="floorH">Этаж</label>
					<input id="floorH" type="text" placeholder="Введите номер этажа">
                </div>
            </div>

			<label for="Room">Помещение (тип, №)</label>
			<input type="text" id="Room" value="">
				
			<label>Лицевой счёт</label>
			<input type="text" id="Acnum" name="name" value="">

        </div>
        <div class="col-md-6 col-xs-12">
		    <label for="Categ">Категория работ</label>
			<input type="text" id="Categ" value="Допуск">
		
            <label for="PforWho">Для кого:</label>
            <select id="PforWho" style="width: 100%;">
                <option value="0">Гость / Курьер</option>
			</select>

			<label id="r_tH">Тип допуска:</label>
            <select id="r_t" style="width: 100%;">
                <option value="0">Разовый</option>
			</select>
			<label for="r_tH">Срок действия</label>
			<div class="row" style="margin-right: -15px;">
                <div class="col-xs-6">
					<input type="date" id="calen1" name="calendar" value="">
					<label style="float: left; display: block; padding-right: 10px;">с </label>
                </div>
                <div class="col-xs-6">
                    <input type="date" id="tm" name="time" value="">
					<label style="float: left; display: block; padding-right: 10px;">по </label>
               
                </div>
            </div>

			<div style="clear: both; height: 12px; font-size: 1px;">&nbsp;</div>
			 
            <label id="Pcomment">Комментарий</label>
            <input type="text" id="Pcomment" onkeyup="hideErrsMessage2(this)" placeholder="Введите текст">
		
            <label for="calen1">Дата и время создания </label>
            <input type="date" id="calen1" name="calendar" value="">
        
            <span id="tm_S" style="float: right; font-weight: bold; color: red; display: none">""</span>
            <label for="calen2">Дата и время отправки </label>
            <input type="date" id="calen2" name="time" value="">

			<label id="Categ">Автор</label>
			<input type="text" id="Categ" value="Сотрудник">

			<label id="Categ">Ответственный по направлению</label>
			<input type="text" id="Categ" value="Охрана">

        </div>
    </div>
	<div class="row">
		<div class="col-lg-12">
			<label id="hdPr">Прикрепить файл к заявке</label>
			<div id="imgss">
				<input type="button" name="name" id="file_btn" value="Выбрать Файл"><br>
				<input class="knop" style="display:none" id="files" itemid="0" type="file">
			</div>
		</div>
	</div> <!-- row -->
	
	 <div style="clear: both; height: 15px; font-size: 1px;">&nbsp;</div>
	
	
    <h3>Физические лица:</h3>
<div class="row">
		<div class="col-lg-12">
			<label id="hdPr">Прикрепить файл к заявке</label>
			<div id="imgss">
				<input type="button" name="name" id="file_btn" value="Выбрать Файл"><br>
				<input class="knop" style="display:none" id="files" itemid="0" type="file">
			</div>
		</div>
	</div>

	<table id="AllRequestTables" class="table formTable dataTable no-footer" role="grid" style="margin-left:0px;">
            
            <thead>
                <tr role="row">
					<th>ФИО/Наименование</th>
					<th>Контактный телефон</th>
					<th style="background-color: #dddddd; width: 10px;"></th>
					<th>Марка</th>
					<th>Гос.номер</th>
					<th>Контактный телефон</th>
					<th>Тип парковки</th>
					<th>Машиноместо</th>
					<th>Дополнительная информация</th>
	
				</tr>
            </thead>
          
			<tbody>
				<tr role="row" class="odd">
					<td>Морозов Виктор Викторович</td>
					<td>+12345556677</td>
					<td style="background-color: #dddddd; width: 10px;"></td>
					<td></td>
					<td></td>
					<td></td>
					<td>
						<select id="" style="margin:0;">
							<option value=""></option>
						</select>
					</td>
					<td>
						<select id="" style="margin:0;">
							<option value=""></option>
						</select>
					</td>
					<td>
						<select id="" style="margin:0;">
							<option value=""></option>
						</select>
					</td>
				</tr>
			</tbody>
        </table>
	
	
	    <div style="clear: both"></div>
        <div class="buttons1">
            <button id="SaveDD" class="btn btn-default logBtn" type="button" style="background-color: rgb(0,147,233); width: auto;">Отправить</button>
            <button id="backUo" class="btn btn-default logBtn" type="button" style="background-color: rgb(149,153,156);">Отмена</button>
        </div>

	
	<hr>



	
    <div style="clear: both; height: 20px;">&nbsp;</div>


  


            </div>
</asp:Content>
