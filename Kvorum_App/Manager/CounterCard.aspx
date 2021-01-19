<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="CounterCard.aspx.cs" Inherits="Kvorum_App.Manager.CounterCard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <style>
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
    <h2 id="meterNum">Счетчик №3456789</h2>

    <div class="row" id="btns">
        <div class="col-xs-12 col-md-6">
            <button class="btn genBtn" id="StopC" style="background: #333;">Приостановить</button>

            <button id="zamen" class="btn genBtn">Замена счетчика</button>

            <button class="btn genBtn" id="Pove">Поверка счетчика</button>
        </div>
        <div class="col-xs-12 col-md-6">
            <button class="btn genBtn" id="SaveUp" style="background: #3c3">Редактировать</button>

            <button class="btn genBtn" id="bacS" style="background: #999">Назад</button>

            <button id="delC" class="btn genBtn" style="background: #f33; float: right">Удалить счетчик</button>
        </div>

    </div>
    <div style="clear: both; height: 20px;">&nbsp;</div>

    <ul class="nav nav-tabs" id="nav-tab">
        <li class="active"><a data-toggle="tab" href="#tab1">Общие сведения</a></li>
        <li><a data-toggle="tab" href="#tab2">История</a></li>
    </ul>

    <div class="tab-content">
        <div id="tab1" class="tab-pane fade in active">
            <div class="row">
                <div class="col-xs-12 col-md-6">
                    <label>Тип помещения</label>
                    <select id="TRoomC">
                        <option value="0">Выберите Тип помещения</option>
                    </select>

                    <label>Номер помещения</label>
                    <select id="roomNum">
                        <option value="0">Выберите Номер помещения</option>
                    </select>

                    <label>ЛС</label>
                    <select id="Ps">
                        <option value="0">Выберите Лицевой счет</option>
                    </select>

                    <label>Номер счетчика</label>
                    <input type="text" id="MeterN" style="width:auto" />

                    <label>Тип счетчика</label>
                    <select id="TMeterC">
                    </select>
                    <br>
                    <br>
                    <input type="checkbox" id="is_auto" disabled="disabled" style="margin-right: 10px;">
                    <strong>Показания передаются автоматически</strong>
                    <br>
                    <br>
                    <label>Количество тарифов</label>
                    <input type="number" id="amT" />
                </div>
                <div class="col-xs-12 col-md-6">
                    <label id="lblDataPosProver">Дата последней поверки</label>
                    <input type="date" id="lst" />

                    <label id="lblDFuture">Дата следующей поверки</label>
                    <input type="date" id="nxt" />
                </div>
            </div>
            <!-- row -->


            <h3 id="istPok">История показаний</h3>
            <%-- <div class="row">
        <div class="col-xs-6">
        <table class="table" style="margin:0;">
               <thead><tr>
                        <td>Дата подачи</td>
                        <td>Т1</td>
                        <td>Т2</td>
                        <td>Тn</td>
                    </tr></thead>     
            <tbody>
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                    </tr>
                   </tbody> 
        </table>

     </div>
        <div class="col-xs-6" style="padding-left:30px;">      
 
            <input type="text"/>
    
        <button class="btn genBtn">Внести показания</button></div>   
    </div>--%>
        </div>
        <!-- tab1 -->
        <div id="tab2" class="tab-pane fade">

            <table class="table" style="margin: 20px 0;">
                <thead>
                    <tr>
                        <th>Дата и время</th>
                        <th>Событие</th>
                        <th>Прикрепленный файл</th>
                        <th>Автор</th>
                    </tr>
                </thead>
                <tbody id="hist">
                </tbody>
            </table>

        </div>
    </div>
    <!-- tab-content -->

    <br />
    <hr />
    <br />


    <br />
    <hr />
    <br />
    <%--<div id="poverkaCnt" style="width:75%; border:1px solid #ccc; text-align:center;">

            <h2 style="width:100%; padding:10px;">Поверка счетчика</h2>

            <label class="sameLine">Тип счетчика</label>
            <select class="sameInputLine">
                <option>ГВС</option>
            </select>            <br />    
            
            <label class="sameLine">Номер счетчика</label>
            <input class="sameInputLine" value="15487545"/>            <br />

            <input type="checkbox" style="float:none; margin-right:5px;"/> <label style="display:inline-block;">Поверка со снятием</label>            <br />

            <label class="sameLine">Дата снятия</label>
                <input class="sameInputLine" type="date" />                <br />

            <label class="sameLine">Дата установки</label>
                <input class="sameInputLine" type="date" />                <br />
         
            <label class="sameLine">Дата поверки</label>
            <input class="sameInputLine" type="date" value="02.02.2020" />            <br />
            
            <label class="sameLine">Дата следующей поверки</label>
            <input class="sameInputLine" type="date" value="02.02.2020" />         <br />    <br />
           
            <input type="file" style="position:relative; left:30%; cursor: pointer;"/>
        
            <br />
            <button class="btn logBtn">Ок</button>
            <br/><br />  

        </div>--%>


    <br />
    <hr />
    <br />

    <div style="clear: both; height: 30px;">&nbsp;</div>
    <div id="myModal2" class="modal2" style="z-index: 3000; background-color: rgba(9, 118, 255, 0.4); display: none;">

        <!-- Modal content -->
        <div class="modal-content2" style="width: 31%">
            <div class="modal-header2" style="background-color: white">
                <span class="close2" id="close_Z">×</span>

            </div>
            <div class="modal-body2" style="height: 100px; height: 100px; padding: 15px; /* min-width: 100px; */display: inline-block;">

                <div id="changeCounter" style="width: 143%; border: 1px solid #ccc; text-align: center;">


                    <h2 style="width: 100%; padding: 10px;">Замена счетчика</h2>

                    <div style="margin: 10px;">
                        <label for="selNA" class="sameLine">Номер помещения</label>
                        <select id="rmNumZ" class="sameInputLine">
                        </select><br>

                        <label for="selLC" class="sameLine">ЛС</label>
                        <select id="PsZ" class="sameInputLine">
                        </select><br>

                        <label for="typeCountZ" class="sameLine">Тип счетчика</label>
                        <select id="typeCountZ" onchange="ChangeType(this)" class="sameInputLine">
                        </select><br>

                        <label for="inPrevCnt" class="sameLine">Номер прежнего счетчика</label>
                        <input id="oldCNum" class="sameInputLine" type="text" value="15487545" disabled="disabled" style="background-color: rgb(235, 235, 228);"><br>

                        <label class="sameLine" id="PrevClstDatalbl">Показания прежнего счетчика</label>
                        <input type="text" id="PrevClstData" class="sameInputLine" value="100" disabled="disabled" style="background-color: rgb(235, 235, 228);"><br>

                        <label class="sameLine">Дата показания прежнего счетчика</label>
                        <input class="sameInputLine" id="PrevnxtZ" type="date" disabled="disabled" style="background-color: rgb(235, 235, 228);"><br>

                        <label class="sameLine">Номер нового счетчика</label>
                        <input class="sameInputLine" type="number" id="newCounterNum" value="" style="margin-top: 10px;"><br>

                        <label class="sameLine">Дата последней поверки</label>
                        <input class="sameInputLine" id="lstControlZ" type="date" value="02.02.2020" style="margin-top: 10px;"><br>

                        <label class="sameLine">Дата следующей поверки</label>
                        <input class="sameInputLine" type="date" id="nxtControlZ" value="02.02.2020" style="margin-top: 10px;"><br>

                        <label class="sameLine" id="nacPokZlbl">Начальное показание</label>
                        <input class="sameInputLine" data-num="1" id="nacPokZ" min="0" onkeyup="validateNegative(this)" type="number" style="margin-top: 10px;"><br>

                        <label class="sameLine">Дата показания</label>
                        <input class="sameInputLine" id="dataPokz" type="date" value="02.02.2020"><br>
                        <br>

                        <input type="file" id="file_Z" onchange="file_zChange(this)" style="position: relative; left: 30%; cursor: pointer;">

                        <br>

                        <button class="btn logBtn" id="ChangeC">Заменить счетчик</button>
                        <button class="btn logBtn" id="OtmenZ" style="background: #ccc">Отмена</button>

                    </div>
                </div>

            </div>
            <div class="modal-footer2" style="text-align: left; background-color: white">
            </div>
        </div>

    </div>
    <div id="myModalPover" class="modal2" style="z-index: 3000; background-color: rgba(9, 118, 255, 0.4); display: none;">

        <!-- Modal content -->
        <div class="modal-content2" style="width: 31%">
            <div class="modal-header2" style="background-color: white">
                <span class="close2" id="close_P">×</span>

            </div>
            <div class="modal-body2" style="width: 131%; height: 100px; height: 100px; padding: 15px; /* min-width: 100px; */display: inline-block;">
                <div id="poverkaCnt" style="width: 75%; border: 1px solid #ccc; text-align: center;">

                    <h2 style="width: 100%; padding: 10px;">Поверка счетчика</h2>

                    <label class="sameLine">Тип счетчика</label>
                    <select id="CtypeP" class="sameInputLine" style="background:rgb(235, 235, 228);">
                    </select>
                    <br>

                    <label class="sameLine">Номер счетчика</label>
                    <input id="CnumP" class="sameInputLine" disabled="disabled">

                    <br>

                    <label class="sameLine">Дата поверки</label>
                    <input class="sameInputLine" type="date" id="lstP">
                    <br>

                    <label class="sameLine">Дата следующей поверки</label>
                    <input class="sameInputLine" type="date" id="nxtP" value="02.02.2020" disabled="disabled" style="background-color: rgb(235, 235, 228);">
                    <br />
                    <label class="sameLine">Поверка со снятием</label>
                    <input id="removal" onclick="removal(this)" type="checkbox" class="sameInputLine"  style="float: right; margin-right: 8%; width: 32px;">
                    <br>
                    <br>

                    <input type="file" id="file_P" onchange="file_pChange(this)" style="position: relative; left: 30%; cursor: pointer;">

                    <br>
                    <button id="OkP" class="btn logBtn">Ок</button>
                    <br>
                    <br>
                </div>


            </div>

        </div>

    </div>
    <div id="myModalStopC" class="modal2" style="z-index: 3000; background-color: rgba(9, 118, 255, 0.4);">

        <!-- Modal content -->
        <div class="modal-content2" style="width: 31%">
            <div class="modal-header2" style="background-color: white;">
                <span class="close2" id="close_St" style="color: black;">×</span>

            </div>
            <div class="modal-body2" style="width: 131%; height: 100px; height: 100px; padding: 15px; /* min-width: 100px; */display: inline-block;">
                <div id="priostanov" style="width: 75%; border: 1px solid #ccc; text-align: center;">

                    <h2 style="width: 100%; padding: 20px;">Приостановка счетчика</h2>
                    <label class="Stop_question" >Для возобновления работы счетчика потребуется внести данные о поверке счетчика. Также по данному счетчику нельзя будет внести показания. Вы уверены, что хотите приостановить данный счетчик?</label>

                    <label class="sameLine" style="min-width: 0%;">Дата выхода из строя</label>
                    <input type="date" class="sameInputLine" id="Sdate" style="width: auto !important; background-color: rgb(235, 235, 228);">
                    <br>
                    <label>Комментарий</label>
                    <textarea rows="5" id="cmntS" cols="50" name="text" placeholder="Введите комментарий" style="padding: 0 5px;"></textarea>
                    <br>


                    <input type="file" id="file_S" onchange="file_StChange(this)" style="position: relative; left: 30%; cursor: pointer;">

                    <br>
                    <button id="Stop_C" class="btn logBtn">Готово</button>
                    <button id="Close_Stop_C" class="btn logBtn" style="background: #999;">Отмена</button>
                    <br>
                    <br>
                </div>
            </div>
        </div>
    </div>
    <div id="myModalDelC" class="modal2" style="z-index: 3000; background-color: rgba(9, 118, 255, 0.4);">

        <!-- Modal content -->
        <div class="modal-content2" style="width: 31%">
            <div class="modal-header2" style="background-color: white;">
                <span class="close2" id="close_D" style="color: black;">×</span>

            </div>
            <div class="modal-body2" style="width: 131%; height: 100px; height: 100px; padding: 15px; /* min-width: 100px; */display: inline-block;">
                <h2 style="width: 75%; padding: 20px;">Вы действительно хотите удалить данный счетчик?</h2>
            </div>
            <div class="modal-footer2" style="text-align: left; background-color: white">

                <input type="button" id="OtS" name="name" value="Отмена" style="width: 25%; float: right; height: 78%; background-color: white; color: black; font-weight: 700;">
                <input type="button" id="del_C" name="name" value="Да" style="float: left; width: 25%; height: 78%; background-color: white; color: black; font-weight: 700;">
            </div>
        </div>
    </div>
</asp:Content>
