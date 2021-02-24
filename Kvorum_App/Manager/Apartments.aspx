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



    <div class="col-lg-9half col-sm-12 p-0 min-vh-100 bgWhite  ">
        <!-- bgLightGrey3 -->
        <span class="h90"></span>
        <h2 class="h2New">Помещения и лицевые счета</h2>

        <div style="padding: 20px;">
            <a id="myBtn1" class="btn genBtn" href="AddApartment.aspx">Добавить помещение</a>
            <%-- <a id="myBtn2" class="btn genBtn" href="#">Загрузить номера помещений</a>--%>
            <a id="UplAcc" class="btn genBtn" href="#">Загрузить лицевые счета</a>
            <a id="PassGen" class="btn genBtn" href="#">СГЕНЕРИРОВАТЬ ПАРОЛИ</a>
            <a id="qr" class="btn genBtn qr" href="#">Распечатать QR-коды</a>
        </div>

        <div class="row w-100 m-0 min-vh-100">
            <div class="col-sm-12 p-0">

                <div class="flexHoriz w-100 m-0 p-3">
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

                    <button class="btn btn1 outline shadow-none w56 h56 mr-3 flexCenter">
                        <img src="../img/ic-plus.svg" class="w18 reddishSvg" alt="" /></button>

                    <%--<button class="btn btn1 outline shadow-none w56 h56 mr-3 flexCenter">
					<img src="../img/ic-sobs.svg" class="w18 reddishSvg" alt=""/></button>--%>
                </div>
                <div class="overflowX w-100">

                    <table id="ScoresAndRooms">
                        <thead>
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


                <%--<div id="loadNA">
         <h2>Загрузка номеров помещений</h2>
         <div style="padding-left:20px;">
             <br />
            <a href="#">Форма загрузки номеров помещений без ЛС</a>
            <br />
            <a href="#">Форма загрузки номеров помещений вместе с ЛС</a>
            <br />
            <br />
      
            <input type="file" />
            <br />

            <input type="checkbox" style="margin-right:5px;"/>
             <label>Загрузить номера помещений вместе с ЛС</label>
            <br />

            <br />
            <p>Следующие данные будут загружены:</p>
         </div>
         <table>
             <thead><tr>
                    <th>ЛС</th>
                    <th>№помещения</th>
                    <th>Этаж</th>
                    <th>Подъезд</th>
                    <th>Назначение помещения</th>
                    <th>Тип помещения</th>
                </tr></thead>
             <tbody><tr>
                    <td>123456789</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>Квартира</td>
                    <td>Квартира</td>
                </tr>
                <tr>
                    <td>123456788</td>
                    <td>2</td>
                    <td>1</td>
                    <td>1</td>
                    <td>Квартира</td>
                    <td>Квартира</td>
                </tr>
                <tr>
                    <td>123456787</td>
                    <td>3</td>
                    <td>1</td>
                    <td>1</td>
                    <td>Квартира</td>
                    <td>Квартира</td>
                </tr></tbody>
            </table>
            <br />
            <div style="padding-left:20px;">
                <button class="btn logBtn">Загрузить</button>
                <button class="btn logBtn" style="background:#ccc">Отмена</button>
            </div>
            
    </div>--%>
            </div>
        </div>
    </div>



    <div id="UploadAcc" class="modal2" style="min-width: 110%">

        <!-- Modal content -->
        <div class="modal-content2" style="width: 75%">
            <div class="modal-header2" style="background-color: white">
                <span class="close2" style="color: white" id="closeUpl">×</span>
                <h2 id="mh2" style="text-align: left; color: black">Загрузка лицевых счетов</h2>
            </div>
            <div class="modal-body2" style="height: 100px; height: 100px; padding: 15px; /* min-width: 100px; */display: inline-block;">
                <div id="loadLC2">

                    <div style="padding-left: 20px;">
                        <p>Пожалуйста, выбирайте только те типы и назначения помещений, которые указаны в форме загрузки</p>
                        <a href="../../img/Форма загрузки ЛС.xlsx" download title="Скачать форму">Форма загрузки лицевых счетов</a>
                        <br />
                        <br />

                        <input id="filesLC" onchange="LCFileChange(this)" type="file" />
                        <br />


                        <p id="sledUpLC">Следующие данные будут загружены:</p>
                    </div>
                    <table class="table" id="datatable">
                        <thead>
                            <tr>
                                <th>ЛС</th>
                                <th>Подъезд</th>
                                <th>Этаж</th>
                                <th>№помещения</th>
                                <th>Назначение помещения</th>
                                <th>Тип помещения</th>
                                <th>Тип собственности</th>
                                <th>Номер телефона</th>
                                <th>E-mail</th>
                                <th>Доля собственности</th>
                                <th>ФИО собственника</th>
                                <th>Общая площадь</th>
                                <th>Жилая площадь</th>
                                <th>Общая площадь без летних зон</th>
                                <th>Пароль</th>
                            </tr>
                        </thead>
                        <tbody id="scores">
                        </tbody>
                    </table>
                    <br />
                    <%--  <div style="padding-left:20px;">
            <button id="loadEx" class="btn logBtn">Загрузить</button>
            <button id="cancelLast" class="btn logBtn" style="background:#ccc">Отмена</button>
        </div>--%>
                </div>

            </div>
            <div class="modal-footer2" style="text-align: left; background-color: white">

                <input type="button" id="cancelLast" name="name" value="Отмена" style="width: 25%; float: right; height: 78%; background-color: white; color: black; font-weight: 700;">
                <input type="button" id="loadEx" name="name" value="Загрузить" style="float: left; width: 25%; height: 78%; background-color: white; color: black; font-weight: 700;">
            </div>
        </div>

    </div>
</asp:Content>
