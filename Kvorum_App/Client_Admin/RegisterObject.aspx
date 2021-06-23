<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="RegisterObject.aspx.cs" Inherits="Kvorum_App.Client_Admin.RegisterObject" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<link href="css/StyleSheet.css" rel="stylesheet" />
    <link href="css/Reestr_obektov.css" rel="stylesheet" />--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<div class="p-4">

        <h2 class=" font24b textBlack ml-0 pb-4">Объекты</h2> <!-- h2New -->

     
 </div>
        <div class="row w-100 m-0 min-vh-100">
            <div class="col-sm-12 p-0">

                <div  id="TableTools" class="flexHoriz w-100 m-0 p-4">
                    <div class=" w-15 mr-3">
                        <div id="ListLength" class="posRel mb-0 mr-3">
                            <%--	<select id="jk" class="pl-2 pr-2 border w-100 h56  rounded-lg">
						<option value="0" selected>Показать 20 записей</option>
						<option value="1">Показать 30 записей</option>		  
					</select>--%>
                        </div>

                    </div>



                    <form id="SearchForTable" class="shadow-in border-wh mb-0 text-left w-25 h56 te-posrel rounded-lg bgLightGrey3">
                        <div class="ml-2 pl-2 transp border-0">
                            <img src="../../img/search-ic.svg" class="w18" alt="">
                        </div>
                    </form>

                    <button onclick="GotoCreateFunction_C()" class="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto">
                        <img src="../../img/ic-plus.svg" class="w16 reddishSvg" alt=""></button>
                    <div class="ml-auto mb-0  w-15 h56">
                        <%--<select id="place" class="border pl-2 pr-2 rounded8 h56">
						<option value="0" selected>Физические лица</option>
						<option value="1">Юрики</option>
					</select>--%>
                    </div>

           <%--         <button class="btn btn1 outline shadow-none w56 h56 mr-3 flexCenter">
                        <img src="../img/ic-plus.svg" class="w18 reddishSvg" alt="" /></button>--%>

                    <%--<button class="btn btn1 outline shadow-none w56 h56 mr-3 flexCenter">
					<img src="../img/ic-sobs.svg" class="w18 reddishSvg" alt=""/></button>--%>
                </div>
                <div class="overflowX w-100">

					<table class="mngTable w-100" id="object_adress">
						<thead class="bgLightGrey">
                            <tr>
                                <th>Адрес объекта</th>
                                <th>Изображение объекта</th>
                                <th>Наименование организации</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>


                <%--<div id="loadNA">         <h2>Загрузка номеров помещений</h2>         <div style="padding-left:20px;">             <br />            <a href="#">Форма загрузки номеров помещений без ЛС</a>            <br />            <a href="#">Форма загрузки номеров помещений вместе с ЛС</a>            <br />            <br />                  <input type="file" />            <br />            <input type="checkbox" style="margin-right:5px;"/>             <label>Загрузить номера помещений вместе с ЛС</label>            <br />            <br />            <p>Следующие данные будут загружены:</p>         </div>         <table>             <thead><tr>                    <th>ЛС</th>                    <th>№помещения</th>                    <th>Этаж</th>                    <th>Подъезд</th>                    <th>Назначение помещения</th>                    <th>Тип помещения</th>                </tr></thead>             <tbody><tr>                    <td>123456789</td>                    <td>1</td>                    <td>1</td>                    <td>1</td>                    <td>Квартира</td>                    <td>Квартира</td>                </tr>                <tr>                    <td>123456788</td>                    <td>2</td>                    <td>1</td>                    <td>1</td>                    <td>Квартира</td>                    <td>Квартира</td>                </tr>                <tr>                    <td>123456787</td>                    <td>3</td>                    <td>1</td>                   <td>1</td>                    <td>Квартира</td>                    <td>Квартира</td>                </tr></tbody>            </table>            <br />            <div style="padding-left:20px;">                <button class="btn logBtn">Загрузить</button>                <button class="btn logBtn" style="background:#ccc">Отмена</button>            </div>    </div>--%>
            </div>
        </div>
</asp:Content>
