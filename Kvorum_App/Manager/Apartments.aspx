<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="Apartments.aspx.cs" Inherits="Kvorum_App.Manager.Apartments" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .ui-loader-background {
            width: 100%;
            height: 100%;
            top: 0;
            padding: 0;
            margin: 0;
            background: rgba(0, 0, 0, 0.3);
            display: none;
            position: fixed;
            z-index: 10000;
        }

        .ui-loading .ui-loader-background {
            display: block;
        }

        .rmFOr {
            border: 1px solid #000;
            box-shadow: 3px 4px 5px rgba(0,0,0,0.3);
            height: 65px;
            overflow: auto;
            width: 67.5%;
        }

        .qr {
            margin-left: 28.3%;
            margin-top: 8px;
        }

        .labelQr {
            margin-left: 25px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<div class="p-4">

        <h2 class=" font24b textBlack ml-0 pb-4">Помещения и лицевые счета</h2> <!-- h2New -->

        <div class="flexHoriz w-100">
            <a id="myBtn1" class="btn btn1 mr-3" href="AddApartment.aspx">Добавить помещение</a>
            <%-- <a id="myBtn2" class="btn genBtn" href="#">Загрузить номера помещений</a>--%>
            <a id="UplAcc" class="btn btn1 mr-3" href="#">Загрузить лицевые счета</a>
            <a id="PassGen" class="btn btn1 mr-3" href="#">Сгенерировать пароли</a>
            <a id="qr" class="btn btn1 mr-3 ml-auto mt-0 qr" href="#">Распечатать QR-коды</a>
        </div>
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

					<table class="mngTable w-100" id="ScoresAndRooms">
						<thead class="bgLightGrey">
                            <tr>
                                <th>Объект</th>
                                <th>Назначение помещения</th>
                                <th>Тип помещения</th>
                                <th>№ помещения</th>
                                <th>Этаж</th>
                                <th>Подъезд</th>
                                <th>ЛС</th>
                                <th>Собственник</th>
                            </tr>
                        </thead>
                        <tbody id="rooms">
                        </tbody>
                    </table>
                </div>


                <%--<div id="loadNA">         <h2>Загрузка номеров помещений</h2>         <div style="padding-left:20px;">             <br />            <a href="#">Форма загрузки номеров помещений без ЛС</a>            <br />            <a href="#">Форма загрузки номеров помещений вместе с ЛС</a>            <br />            <br />                  <input type="file" />            <br />            <input type="checkbox" style="margin-right:5px;"/>             <label>Загрузить номера помещений вместе с ЛС</label>            <br />            <br />            <p>Следующие данные будут загружены:</p>         </div>         <table>             <thead><tr>                    <th>ЛС</th>                    <th>№помещения</th>                    <th>Этаж</th>                    <th>Подъезд</th>                    <th>Назначение помещения</th>                    <th>Тип помещения</th>                </tr></thead>             <tbody><tr>                    <td>123456789</td>                    <td>1</td>                    <td>1</td>                    <td>1</td>                    <td>Квартира</td>                    <td>Квартира</td>                </tr>                <tr>                    <td>123456788</td>                    <td>2</td>                    <td>1</td>                    <td>1</td>                    <td>Квартира</td>                    <td>Квартира</td>                </tr>                <tr>                    <td>123456787</td>                    <td>3</td>                    <td>1</td>                   <td>1</td>                    <td>Квартира</td>                    <td>Квартира</td>                </tr></tbody>            </table>            <br />            <div style="padding-left:20px;">                <button class="btn logBtn">Загрузить</button>                <button class="btn logBtn" style="background:#ccc">Отмена</button>            </div>    </div>--%>
            </div>
        </div>




    <div id="UploadAcc" class="modal2" style="min-width: 110%">

        <!-- Modal content -->
        <div class="modal-content2 bgWhite rounded16 shadow w-75 p-4">
	<div class="modal-header2 bgWhite flexHoriz">
		<h2 id="mh2" class="font24b textBlack flexHoriz w-75">Загрузка лицевых счетов</h2>
		
		<span id="closeUpl" class=" bgWhite pl-2  ml-auto"> <!-- .close2 -->
			<img src="../img/close.svg" class="" alt="" style="cursor: default;">
		</span>
    </div>
            <div class="modal-body2" >
                <div id="loadLC2">

                    <div >
                        <p>Пожалуйста, выбирайте только те типы и назначения помещений, которые указаны в форме загрузки</p>
                        <a href="../../img/Форма загрузки ЛС.xlsx" download title="Скачать форму" class="font16b darkGreen">Форма загрузки лицевых счетов</a>

						<div class="mt-3 mb-3">
							<input id="filesLC" onchange="LCFileChange(this)" type="file" />
                        </div>


                        <p id="sledUpLC">Следующие данные будут загружены:</p>
                    </div>
                    <table class="mngTable mt-2" id="datatable">
                        <thead>
                            <tr class="bgLightGrey3">
                                <th>ЛС</th>
                                <th>Подъезд</th>
                                <th>Этаж</th>
                                <th>№помещения</th>
                                <th class="text-wrap">Назначение помещения</th>
                                <th class="text-wrap">Тип помещения</th>
                                <th class="text-wrap">Тип собственности</th>
                                <th class="text-wrap">Номер телефона</th>
                                <th>E-mail</th>
                                <th class="text-wrap">Доля собственности</th>
                                <th class="text-wrap">ФИО собственника</th>
                                <th class="text-wrap">Общая площадь</th>
                                <th class="text-wrap">Жилая площадь</th>
                                <th class="text-wrap">Общая&nbsp;площадь без&nbsp;летних&nbsp;зон</th>
                                <th>Пароль</th>
                            </tr>
                        </thead>
                        <tbody id="scores">
                        </tbody>
                    </table>
                    <br />
                    <%--  <div style="padding-left:20px;">  <button id="loadEx" class="btn logBtn">Загрузить</button>  <button id="cancelLast" class="btn logBtn" style="background:#ccc">Отмена</button>        </div>--%>
                </div>

            </div>
            <div class="modal-footer2 flexHoriz w-100" style="background-color:white">

                <input type="button" id="cancelLast" name="name" value="Отмена" class="flexCenter btn3 outline shadow-none btn1 w120 mr-3">
                <input type="button" id="loadEx" name="name" value="Загрузить" class=" ml-auto btn btn1 w120 flexCenter">
            </div>
        </div>

    </div>
</asp:Content>
