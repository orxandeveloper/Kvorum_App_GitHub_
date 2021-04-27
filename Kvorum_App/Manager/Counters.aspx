<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="Counters.aspx.cs" Inherits="Kvorum_App.Manager.Counters" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        /*.cntTable td:first-child, .cntTable th:first-child, .cntTable td:last-child, .cntTable th:last-child {
            width: 20px;
            min-width: 20px;
            border: 2px solid transparent;
        }*/

        .cntTable td:last-child img, .cntTable th:last-child img {
            display: block;
            width: 25px;
            height: 25px;
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

        .rmFOr {
            border: 1px solid #000;
            box-shadow: 3px 4px 5px rgba(0,0,0,0.3);
            height: 65px;
            overflow: auto;
            width: 67.5%;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<div class="row w-100 m-0 min-vh-100">
	<div class="col-sm-12 p-0">

<div class="p-4">	
    <h2 class="font24b textBlack mt-2 mb-4">Счетчики</h2>

    <div class="flexHoriz w-100 ">
		<a id="arx" title="Счетчики в архиве" class="btn2 btn1 outline shadow-none w56min  h56 mr-3 flexCenter">
			<img src="../img/zipper.svg" class=" reddishSvg" alt="Счетчики в архиве"></a>		
		
	
		<a id="uplCounter" title="Загрузить счетчики" class="btn2 btn1 outline shadow-none w56 h56 mr-3 flexCenter">
			<img src="../img/ic-download.svg" class=" reddishSvg" alt="Загрузить счетчики"></a>
		<a id="downCounter" title="Выгрузить счетчики" class="btn2 btn1 outline shadow-none w56 h56 mr-3 flexCenter">
			<img src="../img/upload.svg" class=" reddishSvg" alt="Выгрузить счетчики"></a>
	   
			<a id="Exxcel"  style="display:none"   ></a>
			
	
	
		<a id="deadLine" title="Срок подачи показаний" class="btn2 btn1 outline shadow-none w56 h56 mr-3 flexCenter">
			<img src="../img/time.svg" class=" reddishSvg" alt="Срок подачи показаний"></a>	
		<span id="deadline_txt" class="font18b mr-3"></span> <!-- margin-right: -27% !important; -->

		
		<a id="massIndication" onclick="UI_ForIndication(this)" title="массовая Загрузка показаний" class="btn2 btn1 outline shadow-none w56 h56 mr-3 flexCenter">
			<img src="../img/mass-load.svg" class=" reddishSvg" alt="массовая Загрузка показаний"></a>
		
		<a id="addCounter" title="Добавить счетчик" class="btn2 btn1 outline shadow-none w56 h56 mr-3 flexCenter ml-auto">
				<img src="../img/ic-plus.svg" class=" reddishSvg" alt="Добавить счетчик"></a>	

    </div>
    <div style="display: none;">
        <!-- modal -->
        <h4>Загрузка счетчиков</h4>
        <div class="row" style="background: #f3f3f3; padding: 10px; margin: 0; width: 500px;">
            <div class="col-xs-7">
                <input id="fileLoad" type="file" value="Путь к файлу" />
            </div>
            <div class="col-xs-5">
                <button class="btn genBtn">Загрузить файл</button>
            </div>
        </div>
        <div style="clear: both; margin: 5px;">&nbsp;</div>
        <table style="margin: 0;">
            <thead>
                <tr>
                    <th>ЛС</th>
                    <th>Номер счетчика</th>
                    <th>Тип счетчика</th>
                    <th>Дата последней поверки</th>
                    <th>Дата следующей поверки</th>
                    <th>Тариф</th>
                    <th>Начальное показание</th>
                    <th>Дата показания</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <div style="clear: both; margin: 5px;">&nbsp;</div>

        <button class="btn genBtn" style="background: #ccc;">Отмена</button>
        <button class="btn genBtn">Загрузить</button>
    </div>

    <h4 class="font18b mt-4">Фильтр</h4>
    <div class="row mb-4 pr-3">

        <div class="col-md-6 col-xs-12">
		
          
            <%-- <select id="rmTypeF"  multiple="multiple" style="width: 100%;display:none">                <option value="0">Выберите тип помещения</option>             </select>--%>
		
		<div class="posRel mb-4">		
		<input type="hidden" id="temp1" value="1"/>
            <div class="rmFOr rounded8 border-1" id="rmTypeF" ></div>
			<label for="temp1" class="transp pointer-none w-50" style="background-color: white !important;">Тип помещения</label>	
		</div>
	
		
		<div class="posRel w-48 mb-3">	
           <input id="rumNumF"   type="text" style="width: 100%" value="">
		    <label for="rumNumF">Номер помещения</label>
		</div>

		<div class="posRel mb-4">		
			<input type="hidden" id="temp2" value="1"/>
			<div class="rmFOr rounded8 border-1" id="mtrsTypeF"></div>
			<label for="temp2" class="transp pointer-none w-50" style="background-color: white !important;">Тип счетчика</label>
		</div>	
			
            <%--  <select id="mtrsTypeF" multiple="multiple" style="width: 100%;">         <option value="0">Выберите тип счетчика</option>             </select>--%>
            
        </div>
        <div class="col-md-6 col-xs-12">
			  <div class="posRel w-100 mb-3">	  
				<input id="scF" type="text" value="">
				<label for="scF">Номер ЛС</label>
			</div>
			<div class="posRel w-100 mb-3">	 
				<input id="meterNumF" type="number" min="0" style="width: 100%;" value="">
				<label for="meterNumF">Номер счетчика</label>
			</div>
		
				<input type="checkbox" id="noArch" class="checkOut checkbox-item" />
				<label id="noArx" for="noArch">Не показывать счетчики в архиве</label>
		

            <div class="flexHoriz w-100 mt-4">
                <button id="ResetFilter" class="ml-auto btn btn1 outline shadow-none flexCenter">Сбросить результаты</button>
				<button id="MeterFilter" class="ml-3 btn btn1 flexCenter">Применить фильтр</button>
            </div>
        </div>
    </div>
</div> <!-- p-4 -->
	<div class="overflowX w-100 mb-4">

    <table class="cntTable mngTable w-100">
        <thead>
            <tr>

                <th>Объект</th>
                <th>Тип помещения </th>
                <th>№ помещения</th>
                <th>ЛС</th>
                <th>Тип счетчика </th>
                <th>№ счетчика </th>
                <th>Дата последней поверки</th>
                <th>Дата следующей поверки</th>
                <th style="border: 2px solid transparent;">&nbsp;</th>
            </tr>
        </thead>
        <tbody id="mtrs">
        </tbody>
    </table>
	</div>
  
    <style>
        #ifr {
            position: absolute;
            top: -412px;
            left: -318px;
            width: 1280px;
            height: 1200px;
        }
    </style>
	
    <div id="myModal5" class="modal2" style="z-index: 3000; background-color: rgba(9, 118, 255,0.4)">

        <!-- Modal content -->
        <div class="modal-content2 bgWhite rounded16 shadow w-75 p-4">
            <div class="modal-header2 bgWhite flexHoriz">
                <h2 id="mh5" class="font24b textBlack">Ошибка</h2>
				<span id="close5" class="close2 bgWhite pl-2 pr-3 mr-4 border-0 rounded-pill ml-auto">
					<img src="../img/close.svg" class="w24" alt="">
				</span>
            </div>
            <div class="modal-body2" id="mb5" >
                <%--<p id="txt2" style="font-size: 23px;">Some text in the Modal Body</p>--%>
                <%--<iframe   id="ifr"></iframe>--%>
            </div>
            <%--<div class="modal-footer2" style="text-align: left;background-color:white"> <input type="button" id="cls" name="name" value="Отмена" style="width: 25%; float:right; height: 78%;background-color: white;color: black;font-weight: 700;">        <input type="button" id="deleteO" name="name" value="Удалить" style="float: left;width: 25%;height: 78%;background-color: white;color: black;font-weight: 700;">
    </div>--%>
        </div>

    </div>
    <div id="UploadCounter" class="modal2" style="z-index: 2000; background-color: rgba(9, 118, 255, 0.4); display: none;">

        <!-- Modal content -->
        <div class="modal-content2 bgWhite rounded16 shadow w-75 p-0">
            <div class="modal-header2 bgWhite flexHoriz p-4">
                <h2 id="mh2" class="font24b bgWhite textBlack">Загрузка номеров счетчиков</h2>
				<span id="closeUplC" class="close2 bgWhite pl-2 pr-3 mr-4 border-0 rounded-pill ml-auto">
					<img src="../img/close.svg" class="" alt="">
				</span>
            </div>
            <div class="modal-body2">
                <div id="loadLC">
                    <div class="pl-4 pr-4">
                        <a href="../img/Форма загрузки счетчиков.xlsx" download="" class="darkGreen font16b" title="Скачать форму">Форма загрузки номеров счетчиков</a>
                        <br>
                        <br>

                        <input id="filesUPLC" onchange="UPLCounter(this)" type="file">
                        <br>
                    </div>
                    <table class="mngTable w-100 mb-3 mt-4" id="tblCntrs">
                        <thead class="bgLightGrey3">
                            <tr>
                                <th>ЛС</th>
                                <th>Номер счетчика</th>
                                <th>Тип счетчика</th>
                                <th>Дата последней поверки</th>
                                <th>Дата следующей поверки</th>
                                <th>Количество тарифов</th>
                                <th>Тариф</th>
                                <th>Начальное показание</th>
                                <th>Дата показания</th>
                            </tr>
                        </thead>
                        <tbody id="cntrs">
                        </tbody>
                    </table>
               
                </div>
               
            </div>
            <div class="modal-footer2 bgWhite flexHoriz mb-4">
                <input type="button" id="cancelLast" name="name" value="Отмена" class="btn btn1 outline shadow-none flexCenter mr-3 ml-auto">
                <input type="button" id="loadExC" name="name" value="Загрузить" class="btn btn1">
            </div>
        </div>

    </div>
    <div id="DeadLineCntr" class="modal2" style="z-index: 2000; background-color: rgba(9, 118, 255, 0.4); display: none;">

        <!-- Modal content -->
        <div class="modal-content2 bgWhite w-50 rounded16 shadow p-4">
            <div class="modal-header2 bgWhite flexHoriz w-100">
             
                <h2 id="mhDead" class="font24b bgWhite textBlack">Адрес</h2>
				<span id="closeDead" class="close2 bgWhite pl-2 pr-3 mr-4 border-0 rounded-pill ml-auto">
					<img src="../img/close.svg" class="" alt="">
				</span>
            </div>
            <div class="modal-body2 p-4 w-100">
             
                <h4 class="font18b mb-3">Крайний срок подачи показаний</h4>

				<div class="flexHoriz">
                    <span>С</span>
					<input type="number" onkeyup="ChangeNumbersStartStop(this)" onchange="ChangeNumbersStartStop(this)" min="0" max="31" value="1" id="startDead" class="ml-2 mr-3 w90 p-2">
                    <span>По</span>
                    <input type="number" onkeyup="ChangeNumbersStartStop(this)" onchange="ChangeNumbersStartStop(this)" value="31" id="endDead" class="ml-2 w90 p-2">
                </div>
					<input type="checkbox" onclick="changeStartStop(this)" id="mnth" class="checkbox-item">
					<label for="mnth" class="pt-4">Последний день месяца</label>
			
			</div>
            <div class="modal-footer2 bgWhite flexHoriz">

                <input type="button" id="cancelDead" name="name" value="Отмена" class="btn btn1 outline flexCenter shadow-none">
                <input type="button" id="SaveDeadLine" onclick="Cnahge_CNTR_DeadLine(this)" name="name" value="Сохранить" class=" ml-auto btn btn1 flexCenter ">
            </div>
        </div>

    </div></div></div>
</asp:Content>