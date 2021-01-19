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

    <h2>Счетчики</h2>

    <div style="padding-left: 20px; margin-top: 20px;">
        <button id="uplCounter" class="btn genBtn">Загрузить счетчики</button>
        <button id="downCounter" class="btn genBtn" style="min-width: 15%;">Выгрузить счетчики</button>
        <a id="Exxcel"  style="display:none"   ></a>
        <button id="massIndication" onclick="UI_ForIndication(this)" class="btn genBtn" style="float:right;min-width: 15%;">массовая Загрузка показаний</button>
        <br />
        <button id="deadLine" class="btn genBtn" style="float: right;">Срок подачи показаний</button>
        <span id="deadline_txt" style="float: right; margin-right: -27% !important; font-size: 18px; font-weight: 600;"></span>
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

    <h4 style="padding-left: 20px;">Фильтр</h4>
    <div class="row" style="padding-left: 20px; margin-right: -15px;">

        <div class="col-md-6 col-xs-12">
            <label>Тип помещения</label>
            <%-- <select id="rmTypeF"  multiple="multiple" style="width: 100%;display:none">
                <%--<option value="0">Выберите тип помещения</option> 

            </select>--%>
            <div class="rmFOr" id="rmTypeF"></div>
            <label>Номер помещения</label>
            <input id="rumNumF"   type="text" style="width: 100%" value="">

            <label>Тип счетчика</label>
            <%--  <select id="mtrsTypeF" multiple="multiple" style="width: 100%;">
               <%-- <option value="0">Выберите тип счетчика</option> 

            </select>--%>
            <div class="rmFOr" id="mtrsTypeF"></div>
        </div>
        <div class="col-md-6 col-xs-12">
            <label>Номер ЛС</label>
            <input id="scF" type="text" value="">

            <label>Номер счетчика</label>
            <input id="meterNumF" type="number" min="0" style="width: 100%;" value="">
            <input type="checkbox" id="noArch" class="checkOut" style="top: 0;" />
            <label id="noArx" for="noArch">Не показывать счетчики в архиве</label>


            <div class="button" style="top: 0;">
                <button id="MeterFilter" class="btn genBtn">Применить фильтр</button>
                <button id="ResetFilter" class="btn genBtn" style="background: #ccc;">Сбросить результаты</button>
            </div>
        </div>
    </div>
    <div class="buttons" style="margin: 10px 0; padding-left: 20px;">



        <br />
        <button id="addCounter" class="btn logBtn">Добавить счетчик</button>
        <button id="arx" class="btn logBtn" style="float: right;">Счетчики в архиве</button>
    </div>


    <table class="cntTable">
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
    <div style="clear: both; margin: 10px;">&nbsp;</div>
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
        <div class="modal-content2" style="height: 900px">
            <div class="modal-header2" style="background-color: white">
                <span class="close2" style="color: black" id="close_5">×</span>
                <h2 id="mh5" style="text-align: left; color: black">Ошибка</h2>
            </div>
            <div class="modal-body2" id="mb5" style="height: 100px; height: 100px; padding: 15px; /* min-width: 100px; */display: inline-block;">
                <%--<p id="txt2" style="font-size: 23px;">Some text in the Modal Body</p>--%>
                <%--<iframe   id="ifr"></iframe>--%>
            </div>
            <%--<div class="modal-footer2" style="text-align: left;background-color:white">
      
        <input type="button" id="cls" name="name" value="Отмена" style="width: 25%; float:right; height: 78%;background-color: white;color: black;font-weight: 700;">
        <input type="button" id="deleteO" name="name" value="Удалить" style="float: left;width: 25%;height: 78%;background-color: white;color: black;font-weight: 700;">
    </div>--%>
        </div>

    </div>
    <div id="UploadCounter" class="modal2" style="z-index: 2000; background-color: rgba(9, 118, 255, 0.4); display: none;">

        <!-- Modal content -->
        <div class="modal-content2" style="width: 55%; min-width: 1000px;">
            <div class="modal-header2" style="background-color: white">
                <span class="close2" style="color: black" id="closeUplC">×</span>
                <h2 id="mh2" style="text-align: left; color: black">Загрузка номеров счетчиков</h2>
            </div>
            <div class="modal-body2" style="height: auto; padding: 15px; display: inline-block; width: 100%">
                <div id="loadLC">

                    <div style="padding-left: 20px;">

                        <a href="../img/Форма загрузки счетчиков.xlsx" download="" title="Скачать форму">Форма загрузки номеров счетчиков</a>
                        <br>
                        <br>

                        <input id="filesUPLC" onchange="UPLCounter(this)" type="file">
                        <br>
                    </div>
                    <table class="table" id="tblCntrs">
                        <thead>
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
                    <br>
                </div>
               
            </div>
            <div class="modal-footer2" style="text-align: left; background-color: white">

                <input type="button" id="cancelLast" name="name" value="Отмена" style="width: 25%; float: right; height: 78%; background-color: white; color: black; font-weight: 700;">
                <input type="button" id="loadExC" name="name" value="Загрузить" style="float: left; width: 25%; height: 78%; background-color: white; color: black; font-weight: 700;">
            </div>
        </div>

    </div>
    <div id="DeadLineCntr" class="modal2" style="z-index: 2000; background-color: rgba(9, 118, 255, 0.4); display: none;">

        <!-- Modal content -->
        <div class="modal-content2" style="width: 0%; min-width: 541px;">
            <div class="modal-header2" style="background-color: white">
                <span class="close2" style="color: black" id="closeDead">×</span>
                <h2 id="mhDead" style="text-align: left; color: black">Адресс</h2>
            </div>
            <div class="modal-body2" style="height: auto; padding: 15px; display: inline-block; width: 100%">
                <div>
                    <label style="font-size: 26px; margin-left: 15% !important;">Крайний срок подачи показаний</label>
                </div>
                <br>

                <div style="margin-left: 35%;">
                    <span>С</span><input type="number" onkeyup="ChangeNumbersStartStop(this)" onchange="ChangeNumbersStartStop(this)" min="0" max="31" value="1" id="startDead" style="margin-left: 5px; margin-right: 10px;">
                    <span>По</span>
                    <input type="number" onkeyup="ChangeNumbersStartStop(this)" onchange="ChangeNumbersStartStop(this)" value="31" id="endDead" style="margin-left: -3px;">
                </div>
                <br>
                <div style="margin-left: 35%;">

                    <span>Последний день месяца</span><input type="checkbox" onclick="changeStartStop(this)" id="mnth" style="margin-right: 10px;">
                </div>

            </div>
            <div class="modal-footer2" style="text-align: left; background-color: white">

                <input type="button" id="cancelDead" name="name" value="Отмена" style="width: 25%; float: right; height: 78%; background-color: white; color: black; font-weight: 700;">
                <input type="button" id="SaveDeadLine" onclick="Cnahge_CNTR_DeadLine(this)" name="name" value="Сохранить" style="float: left; width: 25%; height: 78%; background-color: white; color: black; font-weight: 700;">
            </div>
        </div>

    </div>
</asp:Content>
