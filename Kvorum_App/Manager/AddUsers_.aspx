<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="AddUsers_.aspx.cs" Inherits="Kvorum_App.Manager.AddUsers_" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .BackTolLs {
              width:150px;
              background-color: #999 !important;
        }
        .buttonsF {
            float:right
        }
        .SaveF {
            width:150px        
        }
        .nav-tabPol {
            width: 720px;
        }

        .changesHistory {
            background-color: #999 !important;
        }

        .modal-bodyhistory {
            width: 100%;
        }

        .closeHistoryPop {
            width: 10%;
            margin-left: 40%;
        }

        .h6color {
            color: #095c68;
            margin-left: 20px;
        }

        .dateIssue {
            width: 100%;
            margin-bottom: 10px;
        }

        .skanLink {
            text-decoration-line: underline;
        }

        .RemoveScan {
            width: 33%;
            background-color: #999 !important;
        }

        .ShowAllDocs {
            width: 100%;
        }

        .changeDoc {
            width: 100%;
        }

        .scanCopyDoc {
            margin-left: 15px !important;
        }

        .divBorder {
            border-left: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            border-right: 1px solid #ddd;
            margin-left: 0px;
        }

        .IsEmansDiv {
            margin-left: 45px;
            text-align: right;
            width: 13%;
        }

        .deactiveEmans {
            background: rgb(235, 235, 228);
        }

        .restorationCapacityDiv {
            width: 53%;
            float: right;
        }

        .restorationCapacityLabel {
            margin-left: 5% !important;
        }

        .deprivCapaLabel {
            margin-left: 8% !important;
        }

        .deprivCapaDiv {
            margin-left: 5%;
            width: 30%;
        }

        .deprivCapaLabel {
            margin-left: 8% !important;
        }

        .opekunDepriv {
            background: rgb(235, 235, 228);
        }

        .AddDocDiv {
            margin-top: 20px;
        }

        .allDocsDataheadr {
            width: 20%;
        }

        .labelM {
            margin-left: -10px !important;
            margin-right: 30px !important;
        }

        .labelW {
            margin-left: -15px !important;
        }

        .Addphone_ {
            margin-left: -25px !important;
            width: 30px;
            text-align: center;
        }

        .QuestionLoyal {
            font-size: 27px;
        }

        .roundDiv {
            border-style: solid;
            border-radius: 50%;
            height: 48px;
            text-align: center;
        }

        .smileIcon {
            font-size: 47px;
            background: greenyellow;
            border-radius: 50%;
            height: 45px;
            width: 42px;
        }

        .mehIcon {
            font-size: 47px;
            background: yellow;
            border-radius: 50%;
            height: 45px;
            width: 42px;
        }

        .frownIcon {
            font-size: 47px;
            background: red;
            border-radius: 50%;
            height: 45px;
            width: 42px;
        }

        .IsHasChildDiv {
            width: 50%;
            float: right;
            margin-top: -20px;
        }

        .IsHasChildLabel {
            width: 53%;
        }

        .hasChildDiv {
            border-left: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            border-right: 1px solid #ddd;
            border-top: 1px solid #ddd;
        }

        .AddChild {
            float: right;
            width: 25%;
        }

        .MarkLabel {
            font-size: 13px;
        }

        .infoAboutPers {
            float: right;
            width: 70%;
        }

        .infoBorder {
            border-top: 1px solid #ddd;
        }

        .dateIssueMilReg {
            width: 50%;
        }


        .divconvictionh6 {
            width: 30%;
        }

        .AddConviction {
            margin-left: -56px !important;
            width: 30px;
            text-align: center;
            margin-top: 10px;
        }

        .ChangePersContent {
            position: relative;
            background-color: #fefefe;
            margin: auto;
            padding: 0;
            border: 1px solid #888;
            width: 35%;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
            -webkit-animation-name: animatetop;
            -webkit-animation-duration: 0.4s;
            animation-name: animatetop;
            animation-duration: 0.4s;
        }

        .persDatasDiv {
            width: 100%;
            line-height: 30px;
            border-left: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            border-right: 1px solid #ddd;
            border-top: 1px solid #ddd;
            margin-left: 0px;
        }

        .closeChangePersM {
            float: right
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Добавить физическое лицо</h2>
    <div class="buttonsF">
<input type="button" id="BackTolLs" value="Назад" class="btn genBtn BackTolLs">
    <input type="button" id="SaveF" value="Сохранить" class="btn genBtn SaveF">
</div>
    <div style="clear: both;">&nbsp;</div>
    <div class="col-md-12">
        <div class="col-md-3">
            <select id="sc">
                <option>Л/C</option>

            </select>
        </div>
        <div class="col-md-2">
            <select id="ind_type">
                <option>Собственник</option>

            </select>
        </div>
        <div class="col-md-2">
            <div class="col-md-1">
                <input type="checkbox" id="isLiving">
            </div>
            <div class="col-md-3">
                <label>Проживает</label>
            </div>
        </div>
        <div class="col-md-2">
            <div class="col-md-1">
                <input type="checkbox" id="IsRegistered">
            </div>
            <div class="col-md-2">
                <label>Прописан</label>
            </div>
        </div>
        <div class="col-md-1">
            <div class="col-md-1">
                <input type="checkbox" id="isGuardian">
            </div>
            <div class="col-md-1">
                <label>Опекун</label>
            </div>
        </div>
    </div>
    <div style="clear: both;">&nbsp;</div>
    <div class="col-md-12">


        <div class="col-md-11">
            <ul class="nav nav-tabs nav-tabPol" id="nav-tab">
                <li class="active"><a data-toggle="tab" href="#tab0" aria-expanded="true">Документы</a></li>
                <li class=""><a data-toggle="tab" href="#tab1" aria-expanded="false">Общая информация</a></li>
                <li class=""><a data-toggle="tab" href="#tab2" aria-expanded="false">Заявки</a></li>
                <li class=""><a data-toggle="tab" href="#tab3" aria-expanded="false">Обращения</a></li>

            </ul>
            <div class="tab-content">
                <div id="tab0" data-tab="0" class="tab-pane fade in active">
                    <div class="row divBorder">
                        <h6 class="h6color">Документ удостоверяющий личности</h6>
                        <div class="col-md-12">

                            <div class="col-md-6">
                                <div class="col-md-6">
                                    <label>Вид</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="doctype" required="required"></select>
                                </div>

                                <div class="col-md-6">
                                    <label>Серия</label>
                                </div>
                                <div class="col-md-6" >
                                    <input type="text" required="required" id="docseries">
                                </div>

                                <div class="col-md-6">
                                    <label>Номер</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="docNum">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="col-md-6">
                                    <label>Место выдачи</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="PlaceIssue">
                                </div>
                                <div class="col-md-6">
                                    <label>Дата выдачи</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="date" id="dateIssue" class="dateIssue">
                                </div>
                                <div class="col-md-6">
                                    <label>Код подразделения </label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="DivisionCode">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="col-md-3">
                                <label class="scanCopyDoc">
                                    Отсканированная копия документа</label>
                            </div>
                            <div class="col-md-3">
                                <a class="skanLink">Скан основной части.jpg</a>
                                <div style="clear: both;">&nbsp;</div>
                                <a class="skanLink">Скан прописки.jpg</a><br>
                            </div>

                            <div class="col-md-3">
                                <input type="button" id="addScan" value="Добавить" class="btn genBtn">
                                <div style="clear: both;">&nbsp;</div>
                                <input type="button" id="RemoveScan" value="Удалить" class="btn genBtn RemoveScan">
                            </div>
                            <div class="col-md-3">
                                <input type="button" id="changeDoc" value="Замена Документа" onclick="ExChangeDoc()" class="changeDoc">
                                <div style="clear: both;">&nbsp;</div>
                                <input type="button" id="ShowAllDocs" onclick="ModalDocHistory()" value="Показать все" class="ShowAllDocs">
                            </div>
                        </div>

                    </div>
                    <div class="row divBorder">
                        <h6 class="h6color">Свидетельство о собственности (Выписка з ЕГРН)</h6>
                        <div class="col-md-12">

                            <div class="col-md-6">
                                <div class="col-md-6">
                                    <label>Кадастровый номер</label>
                                </div>
                                <div class="col-md-6">
                                    <input id="CadastralNum" type="text">
                                </div>

                                <div class="col-md-6">
                                    <label>Вид Собственности</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="typeProp2"></select>
                                </div>

                                <div class="col-md-6">
                                    <label>Номер гос. регистрации права</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="RegRightNumber">
                                </div>
                                <div class="col-md-6">
                                    <label>Дата гос. регистрации права</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="date" id="RegRightdate" class="dateIssue">
                                </div>
                            </div>

                        </div>

                        <div style="clear: both;">&nbsp;</div>
                        <div class="col-md-12">
                            <div class="col-md-3">
                                <label class="scanCopyDoc">
                                    Отсканированная копия документа</label>
                            </div>
                            <div class="col-md-3">
                                <a class="skanLink">Скан документа 1.jpg</a>
                                <div style="clear: both;">&nbsp;</div>
                                <a class="skanLink">Скан документа 1.jpg</a><br>
                            </div>

                            <div class="col-md-3">
                                <input type="button" id="addScanSobs" value="Добавить" class="btn genBtn">
                                <div style="clear: both;">&nbsp;</div>
                                <input type="button" id="RemoveScanSobs" value="Удалить" class="btn genBtn RemoveScan">
                            </div>
                        </div>


                    </div>
                    <div class="row divBorder">
                        <h6 class="h6color">Военная служба</h6>
                        <div class="col-md-12">

                            <div class="col-md-6">
                                <div class="col-md-6">
                                    <label>Тип документа</label>
                                </div>
                                <div class="col-md-6">
                                    <input id="TypeDocMil" type="text">
                                </div>

                                <div class="col-md-6">
                                    <label>Серия</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="SeriesMilDoc">
                                </div>

                                <div class="col-md-6">
                                    <label>Номер</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="NumberMilDox">
                                </div>


                            </div>

                        </div>

                        <div style="clear: both;">&nbsp;</div>
                        <div class="col-md-12">
                            <div class="col-md-3">
                                <label class="scanCopyDoc">
                                    Отсканированная копия документа</label>
                            </div>
                            <div class="col-md-3">
                                <a class="skanLink">Скан документа 1.jpg</a>
                                <div style="clear: both;">&nbsp;</div>
                                <a class="skanLink">Скан документа 1.jpg</a><br>
                            </div>

                            <div class="col-md-3">
                                <input type="button" id="addScanSobsMil" value="Добавить" class="btn genBtn">
                                <div style="clear: both;">&nbsp;</div>
                                <input type="button" id="RemoveScanSobsMil" value="Удалить" class="btn genBtn RemoveScan">
                            </div>
                        </div>


                    </div>
                    <div class="row divBorder deactiveEmans">
                        <h6 class="h6color">Документы в случае эмансипации</h6>
                        <div class="IsEmansDiv">
                            <input type="checkbox" id="isEmans">Эмансипировать
                        </div>
                        <div style="clear: both;">&nbsp;</div>
                        <div class="col-md-12">

                            <div class="col-md-6">

                                <div class="col-md-6">
                                    <label>Тип документа</label>
                                </div>
                                <div class="col-md-6">
                                    <input id="TypeDocEmain" type="text" disabled="disabled">
                                </div>

                                <div class="col-md-6">
                                    <label>Номер документа</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="docNumberEman" disabled="disabled">
                                </div>

                                <div class="col-md-6">
                                    <label>Дата поставновления документа</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="date" id="resolutionDate" class="dateIssue" disabled="disabled">
                                </div>


                            </div>

                        </div>

                        <div style="clear: both;">&nbsp;</div>
                        <div class="col-md-12">
                            <div class="col-md-3">
                                <label class="scanCopyDoc">
                                    Отсканированная копия документа</label>
                            </div>
                            <div class="col-md-3">
                                <a class="skanLink">Скан документа 1.jpg</a>
                                <div style="clear: both;">&nbsp;</div>
                                <a class="skanLink">Скан документа 1.jpg</a><br>
                            </div>

                            <div class="col-md-3">
                                <input type="button" id="addScanSobsEmans" value="Добавить" class="btn genBtn" disabled="disabled">
                                <div style="clear: both;">&nbsp;</div>
                                <input type="button" id="RemoveScanSobsEmans" value="Удалить" class="btn genBtn RemoveScan" disabled="disabled">
                            </div>
                        </div>


                    </div>
                    <div class="row divBorder deactiveEmans">
                        <h6 class="h6color">Лишение дееспособности</h6>
                        <div class="restorationCapacityDiv">
                            <input type="checkbox" id="isRestorCapaciti"><label class="restorationCapacityLabel">Обращение при восстановлении дееспобности</label>
                        </div>
                        <div class="deprivCapaDiv">
                            <input type="checkbox" id="isDeprivCapaciti"><label class="deprivCapaLabel">Обращение при лишении дееспобности</label>
                        </div>


                        <div style="clear: both;">&nbsp;</div>
                        <div class="col-md-12">

                            <div class="col-md-6">

                                <div class="col-md-6">
                                    <label>Тип документа</label>
                                </div>
                                <div class="col-md-6">
                                    <input id="TypeDocCapa" type="text" disabled="disabled">
                                </div>

                                <div class="col-md-6">
                                    <label>Номер документа</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="docNumberCapa" disabled="disabled">
                                </div>

                                <div class="col-md-6">
                                    <label>Дата начала действия</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="date" id="StarDate" class="dateIssue" disabled="disabled">
                                </div>
                                <div class="col-md-6">
                                    <label>Дата прекращения действия</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="date" id="EndDate" class="dateIssue" disabled="disabled">
                                </div>
                                <div class="col-md-6">
                                    <label>Опекун</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="opekunDepriv" disabled="disabled" class="opekunDepriv" style="background: rgb(235, 235, 228);">
                                    </select>
                                </div>


                            </div>

                        </div>

                        <div style="clear: both;">&nbsp;</div>
                        <div class="col-md-12">
                            <div class="col-md-3">
                                <label class="scanCopyDoc">
                                    Отсканированная копия документа</label>
                            </div>
                            <div class="col-md-3">
                                <a class="skanLink">Скан документа 1.jpg</a>
                                <div style="clear: both;">&nbsp;</div>
                                <a class="skanLink">Скан документа 1.jpg</a><br>
                            </div>

                            <div class="col-md-3">
                                <input type="button" id="addScanSobsCapa" value="Добавить" class="btn genBtn" disabled="disabled">
                                <div style="clear: both;">&nbsp;</div>
                                <input type="button" id="RemoveScanSobCapa" value="Удалить" class="btn genBtn RemoveScan" disabled="disabled">
                            </div>
                        </div>


                    </div>
                    <div class="col-md-12">
                        <h6 class="h6color" style="">Дополнительные документы</h6>
                        <div class="col-md-10">
                            <table id="allDocs">
                                <thead>
                                    <tr>
                                        <th class="allDocsDataheadr">Дата</th>
                                        <th>Название</th>
                                    </tr>
                                </thead>


                                <tbody>
                                    <tr>
                                        <td>02.02.1992</td>
                                        <td><a class="skanLink">Ордер документов.jpg</a></td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>
                        <div class="col-md-2 AddDocDiv">
                            <input type="text" value="Добавить" id="addDocs" class="btn genBtn">
                            <input type="text" value="Удалить" id="removeDocs" class="btn genBtn RemoveScan">
                        </div>
                    </div>
                    <!-- row-->

                </div>
                <!-- tab0 -->
                <div id="tab1" data-tab="1" class="tab-pane fade">
                    <div class="row divBorder">
                        <h6 class="h6color">Персональные данные</h6>
                        <div class="col-md-12">

                            <div class="col-md-6">
                                <div class="col-md-6">
                                    <label>ФИО</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="FioPer">
                                </div>

                                <div class="col-md-6">
                                    <label>Пол</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="radio" class="col-md-1" id="M" checked="checked" name="gender">
                                    <label class="col-md-2 labelM">
                                        М</label>

                                    <input type="radio" class="col-md-2" id="W" name="gender">
                                    <label class="col-md-2 labelW">Ж</label>
                                    <br>
                                </div>

                                <div class="col-md-7">
                                    <input type="button" id="changePersData" onclick="changePersData()" value="Смена персональных данных" class="changeDoc">
                                    <div style="clear: both;">&nbsp;</div>
                                </div>
                                <div class="col-md-6">
                                    <label>Лицевой счет</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="scPer">
                                </div>
                                <div class="col-md-6">
                                    <label>Мобильный телефон</label>
                                </div>
                                <div class="col-md-5">
                                    <input type="text" id="phone_">
                                </div>
                                <div class="col-md-1">
                                    <input type="button" id="Addphone_" value="+" class="Addphone_" />
                                </div>

                                <div class="col-md-6">
                                    <label>Е-mail</label>
                                </div>
                                <div class="col-md-5">
                                    <input type="text" id="email_">
                                </div>
                                <div class="col-md-1">
                                    <input type="button" id="Addemail_" value="+" class="Addphone_" />
                                </div>
                                <div class="col-md-6">
                                    <label>Дата рождения</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="date" id="bdPer" class="dateIssue">
                                </div>

                                <div class="col-md-6">
                                    <label>Лояльность</label>
                                </div>
                                <div class="col-md-6">
                                    <div class="col-md-3 roundDiv">
                                        <label class="QuestionLoyal">?</label>
                                    </div>
                                    <div class="col-md-3">
                                        <i class="fa fa-smile-o smileIcon" aria-hidden="true"></i>
                                    </div>
                                    <div class="col-md-3">
                                        <i class="fa fa-meh-o mehIcon" aria-hidden="true"></i>
                                    </div>
                                    <div class="col-md-3">
                                        <i class="fa fa-frown-o frownIcon" aria-hidden="true"></i>
                                    </div>


                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="col-md-6">
                                    <label>Объект</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="objPers"></select>
                                </div>
                                <div class="col-md-6">
                                    <label>Область</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="regionPers">
                                </div>
                                <div class="col-md-6">
                                    <label>Город</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="cityPers">
                                </div>
                                <div class="col-md-6">
                                    <label>Дом</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="HomePers">
                                </div>

                                <div class="col-md-6">
                                    <label>Улица</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="StreetPers">
                                </div>

                                <div class="col-md-6">
                                    <label>Корпус/Секция/Строение</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="KorpsPers">
                                </div>
                                <div class="col-md-6">
                                    <label>Подъезд</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="EntrancePers">
                                </div>

                                <div class="col-md-6">
                                    <label>Этаж</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="FloorPers">
                                </div>
                                <div class="col-md-6">
                                    <label>Квартира(кабинет)</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="RoomNumberPers">
                                </div>

                                <div class="col-md-6">
                                    <label>Домашний телефон</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="HomePhonePers">
                                </div>

                                <div class="col-md-6">
                                    <label>Площадь</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="AreaPers">
                                </div>

                                <div class="col-md-6">
                                    <label>Индекс</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="IndexPers">
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="row divBorder">
                        <h6 class="h6color">Дополнительная информация</h6>
                        <div class="col-md-12">

                            <div class="col-md-6">
                                <div class="col-md-6">
                                    <label>Членство в ТСЖ</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="MembShiPers">
                                </div>

                                <div class="col-md-6">
                                    <label>Договор на управление</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="MContactPers">
                                </div>

                                <div class="col-md-7">
                                    <h6 class="h6color">Пропуска</h6>
                                </div>
                                <div class="col-md-6">
                                    <label>Тип пропуска</label>
                                </div>
                                <div class="col-md-5">
                                    <select id="TypePassPers"></select>
                                </div>
                                <div class="col-md-1">
                                    <input type="button" id="AddTypePass" value="+" class="Addphone_">
                                </div>
                                <div class="col-md-6">
                                    <label>Срок действия</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="ValidityPers"></select>
                                </div>


                                <div class="col-md-6">
                                    <label>Уникальный номер</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="IdNumber">
                                </div>






                            </div>
                            <div class="col-md-6">
                                <label class="IsHasChildLabel">Наличие несовершеннолетних детей</label>
                                <div class="col-md-6 IsHasChildDiv">
                                    <input type="radio" class="col-md-1" id="No" name="HasChild">
                                    <label class="col-md-2 labelM">Нет</label>

                                    <input type="radio" class="col-md-2" id="Yes" name="HasChild">
                                    <label class="col-md-2 labelW">Да</label>
                                    <br>
                                </div>
                            </div>
                            <div class="col-md-6 hasChildDiv deactiveEmans">



                                <div class="col-md-6">
                                    <label>ФИО ребенка</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="childNamePers" disabled="disabled">
                                </div>
                                <div class="col-md-6">
                                    <label>Дата рождения ребенка</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="date" id="childBDPers" class="dateIssue" disabled="disabled">
                                </div>
                                <div class="col-md-7">
                                    <input type="button" id="AddChild" value="+" disabled="disabled" class="AddChild">
                                </div>

                            </div>
                            <div class="col-md-6">
                                <label class="IsHasChildLabel">Наличие транспортного средства</label>
                                <div class="col-md-6 IsHasChildDiv">
                                    <input type="checkbox" class="col-md-1" id="NoMark" name="HasChild">



                                    <br>
                                </div>
                            </div>

                            <div class="col-md-6 hasChildDiv deactiveEmans">



                                <div class="col-md-6">
                                    <label class="MarkLabel">
                                        Марка транспортного средства</label>
                                </div>
                                <div class="col-md-6" style="">
                                    <input type="text" id="childNameMark" disabled="disabled">
                                </div>
                                <div class="col-md-6">
                                    <label class="MarkLabel">Номер транспортного средства</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="date" id="childBDMark" class="dateIssue" disabled="disabled">
                                </div>
                                <div class="col-md-7">
                                    <input type="button" id="AddChildMark" value="+" disabled="disabled" class="AddChild">
                                </div>

                            </div>


                        </div>
                        <div style="clear: both;">&nbsp;</div>

                        <div class="col-md-12 hasChildDiv">
                            <div class="col-md-6">
                                <div class="col-md-6">
                                    <label>
                                        Доверенное лицо<label>
                                        </label>
                                    </label>
                                </div>
                                <div class="col-md-5">
                                    <input type="text" id="TrusteePers">
                                </div>
                                <div class="col-md-1">
                                    <input type="button" id="AddTruste" value="+" class="Addphone_">
                                </div>
                                <div class="col-md-6">
                                    <label>Мобильный телефон</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="PhoneTrusteePers">
                                </div>
                                <div class="col-md-6">
                                    <label>E-mail</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="EmailTrusteePers">
                                </div>

                            </div>
                            <div class="col-md-12">
                                <div class="col-md-3">
                                    <label class="scanCopyDoc">Отсканированные документы (паспорт,доверенность)</label>
                                </div>
                                <div class="col-md-3">
                                    <a class="skanLink">Скан основной части.jpg</a>
                                    <div style="clear: both;">&nbsp;</div>
                                    <a class="skanLink">Скан прописки.jpg</a><br>
                                </div>

                                <div class="col-md-3">
                                    <input type="button" id="addScanSobsPers" value="Добавить" class="btn genBtn">
                                    <div style="clear: both;">&nbsp;</div>
                                    <input type="button" id="RemoveScanSobsPers" value="Удалить" class="btn genBtn RemoveScan">
                                </div>
                            </div>
                        </div>


                    </div>
                    <div style="clear: both;">&nbsp;</div>
                    <textarea id="infoAboutPers" class="infoAboutPers"></textarea>
                    <h6 class="h6color">Дополнительно о пользвателе:</h6>
                    <div style="clear: both;">&nbsp;</div>
                    <div class="row divBorder infoBorder">
                        <h6 class="h6color">Информация о рождении</h6>
                        <div class="col-md-12">

                            <div class="col-md-6">
                                <div class="col-md-6">
                                    <label>Национальность</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="Nationality"></select>
                                </div>

                                <div class="col-md-6">
                                    <label>Гражданство</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="Citizenship"></select>
                                </div>

                                <div class="col-md-6">
                                    <label>Страна рождения</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="birthCountry"></select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="col-md-6">
                                    <label>Область</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="RegionInfo"></select>
                                </div>
                                <div class="col-md-6">
                                    <label>Район</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="district"></select>
                                </div>
                                <div class="col-md-6">
                                    <label>Город</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="cityInfo"></select>
                                </div>
                                <div class="col-md-6">
                                    <label>Н.Пункт</label>
                                </div>

                                <div class="col-md-6">
                                    <select id="PointInfo"></select>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="row divBorder ">
                        <h6 class="h6color">Информация о военной службе</h6>
                        <div class="col-md-12">

                            <div class="col-md-6">
                                <div class="col-md-12">
                                    <label>Отношение к военной службе</label>
                                    <select id="AttitudeToMil"></select>
                                </div>


                                <div class="col-md-12">
                                    <label>Состав</label>
                                    <input type="text" id="structureMil">
                                </div>


                                <div class="col-md-12">
                                    <label>Военкомат</label>
                                    <input type="text" id="OfficeMil">
                                </div>

                            </div>
                            <div class="col-md-6">
                                <div class="col-md-12">
                                    <label>Дата выдачи направления на военный учет</label>
                                    <input type="date" id="dateIssueMilReg" class="dateIssueMilReg">
                                </div>
                                <div style="clear: both;">&nbsp;</div>

                                <div class="col-md-12">
                                    <label>Дата постановки на венный учет</label>
                                    <input type="date" id="dateMilAccount" class="dateIssueMilReg">
                                </div>
                                <div style="clear: both;">&nbsp;</div>

                                <div class="col-md-12">
                                    <label>Дата снятия с военного учета</label>
                                    <input type="date" id="DateOfdeReg" class="dateIssueMilReg">
                                </div>






                            </div>

                        </div>


                    </div>
                    <div class="row divBorder infoBorder">

                        <div class="col-md-12">
                            <div class="col-md-6 divconvictionh6">
                                <h6 class="h6color">Инвормация о судимости</h6>
                            </div>
                            <div class="col-md-1">
                                <input type="button" id="AddConviction" value="+" class="AddConviction">
                            </div>
                        </div>
                        <div style="clear: both;">&nbsp;</div>

                        <div class="col-md-12">

                            <div class="col-md-6">
                                <div class="col-md-6">
                                    <label>Судимость</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="Conviction">
                                </div>

                                <div class="col-md-6">
                                    <label>Суд</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="Court">
                                </div>



                            </div>
                            <div class="col-md-6">
                                <div class="col-md-6">
                                    <label>Дата Начало судимости</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="date" id="dateCourtStart" class="dateIssue">
                                </div>
                                <div class="col-md-6">
                                    <label>Дата окончания судимости</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="date" id="dateCourtEnd" class="dateIssue">
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="row divBorder infoBorder">

                        <div class="col-md-12">
                            <div class="col-md-6 divconvictionh6">
                                <h6 class="h6color">Место работы и учебы</h6>
                            </div>

                        </div>
                        <div style="clear: both;">&nbsp;</div>

                        <div class="col-md-12">

                            <div class="col-md-6">
                                <div class="col-md-6">
                                    <label>Место работы</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="workPlace">
                                </div>

                                <div class="col-md-6">
                                    <label>Должность</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="WorkPosition">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="col-md-6">
                                    <label>Место учебы</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="StudyPlace">
                                </div>
                                <div class="col-md-6">
                                    <label>Уровень</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="studyLevel"></select>
                                </div>
                                <div class="col-md-6">
                                    <label>Курс</label>
                                </div>

                                <div class="col-md-6">
                                    <select id="studyCours"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- tab1 -->
                <div id="tab3" data-tab="1" class="tab-pane fade">
                    <div class="row divBorder">
                        <div class="button">
                            <a class="create" href="CreateAppeals.aspx"><i class="fa fa-plus-square-o" aria-hidden="true"></i>Добавить</a>
                        </div>
                        <h6 class="h6color">История обращений</h6>
                        <br>
                        <div class="col-md-12 divBorder infoBorder">
                            <h6 class="h6color">Фильтр</h6>
                            <br>
                            <div class="col-md-2">
                                <label>Номер исходящего письма</label>
                                <input type="text" id="NumberOutLetters">
                            </div>
                            <div class="col-md-2">
                                <label>Номер входящего письма</label>
                                <input type="text" id="NumberInLetters">
                            </div>
                            <div class="col-md-2">
                                <label>Дата обращения</label>
                                <br>

                                <input type="Date" id="AppealsDate" style="">
                            </div>
                            <div class="col-md-2">
                                <label>Ответсвенное лицо</label>
                                <br>
                                <input type="text" id="RespPerson">
                            </div>
                            <div class="col-md-2">
                                <label>Тема обращения</label>
                                <br>
                                <select id="ThemAppeals"></select>
                            </div>
                            <div class="col-md-2">
                                <label>Статус обращения</label>
                                <br>
                                <select id="StatusAppeals"></select>
                            </div>
                        </div>



                    </div>
                    <div class="row">
                        <table>
                            <thead>
                                <tr>
                                    <th>№ п/п</th>
                                    <th>Дата обращения</th>
                                    <th>Тема обращения</th>
                                    <th>Короткое содержание обращения</th>
                                    <th>Ответственное лицо</th>
                                    <th>Номер изходящего письма</th>
                                    <th>Номер входящего письма</th>
                                    <th>Примечание</th>
                                    <th>Статус обращения</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
                <!-- tab3 -->
            </div>
        </div>
        <div class="col-md-1">
            <input type="button" id="changesHistory" onclick="changesHistory()" value="История изменений" class="btn genBtn changesHistory">
        </div>



    </div>

    <div id="ModalHistory" class="modalBnp" style="/* display: none; */">

        <!-- Modal content -->
        <div class="modal-contentBnp">
            <div class="modal-headerBnp">
                <span class="closebnp" onclick="closeHistoryPop()" id="closeHistory">×</span>
                <h2>Загрузка начислений и платежей</h2>
            </div>
            <div class="modal-bodybnp modal-bodyhistory">
                <div class="col-md-12 divBorder infoBorder">
                    <div class="col-md-6">
                        <label>История изменения персональных данных</label>

                    </div>

                    <div class="col-md-6">
                        <a>Свернуть/Развернуть</a>
                    </div>

                    <div class="col-md-12">
                        <table>
                            <thead>
                                <tr>
                                    <td>ФИО         
                                    </td>

                                    <td>Пол         
                                    </td>

                                    <td>Дата изменение персональных данных         
                                    </td>


                                    <td>Причина замены         
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>

                                    <td></td>

                                    <td></td>


                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="clear: both; height: 21px;">&nbsp;</div>
                </div>
                <div style="clear: both; height: 21px;">&nbsp;</div>
                <div class="col-md-12 divBorder infoBorder">
                    <div class="col-md-6">
                        <label>История Замены документов</label>

                    </div>
                    <div class="col-md-6">
                        <a>Свернуть/Развернуть</a>
                    </div>
                    <div style="clear: both; height: 21px;">&nbsp;</div>
                    <div class="col-md-2">
                        <label>Вид документа</label>
                    </div>
                    <div class="col-md-3">
                        <select id="docType"></select>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>Вид документа        
                                </td>

                                <td>Серия         
                                </td>

                                <td>Номер
                                </td>
                                <td>Место выдачи   
                                </td>
                                <td>Дата выдачи   
                                </td>
                                <td>Код подразделения   
                                </td>
                                <td>Причина
                                </td>
                                <td>Скан документа
                                </td>
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
                </div>
                <div style="clear: both;">&nbsp;</div>
                <div>
                    <input type="button" value="Выход" id="closeHistoryPop" onclick="closeHistoryPop()" class="closeHistoryPop">
                </div>
            </div>
        </div>
    </div>
    <div id="ModalChangePers" class="modalkvart">

        <!-- Modal content -->
        <div class="ChangePersContent">
            <div class="modal-headerkvart">
                <span class="closekvart" id="closeChangePersM" onclick="closechangePersData()">×</span>
                <h2>Смена персональных данных</h2>
            </div>
            <div class="modal-bodykvart persDatas">

                <div class="col-md-12 persDatasDiv">
                    <h4 class="h6color">Новые данные</h4>
                    <div class="col-md-6">
                        <label>ФИО</label>
                    </div>
                    <div class="col-md-6">
                        <label id="PastFio">PastFio</label>
                    </div>
                    <div class="col-md-6">
                        <label>Новое ФИО</label>
                    </div>
                    <div class="col-md-6">
                        <input type="text" id="newFio">
                    </div>
                    <div class="col-md-6">
                        <label>Пол</label>
                    </div>
                    <div class="col-md-6">
                        <label id="PastGender">М</label>
                    </div>
                    <div class="col-md-6">
                        <label>Новый пол</label>
                    </div>
                    <div class="col-md-6">
                        <input type="radio" class="col-md-1" id="MNew" checked="checked" name="gender">
                        <label class="col-md-2 labelM">
                            М</label>

                        <input type="radio" class="col-md-2" id="WNew" name="gender">
                        <label class="col-md-2 labelW">Ж</label>
                        <br>
                    </div>
                    <div class="col-md-6">
                        <label>Причина</label>
                    </div>
                    <div class="col-md-6">
                        <input type="text" id="reason">
                    </div>


                </div>
                <div class="col-md-12">
                    <div class="col-md-6">
                        <input type="button" value="Отмена" id="closeChangePersMb" onclick="closechangePersData()" class="btn genBtn changesHistory closeChangePersM">
                    </div>
                    <div class="col-md-6">
                        <input type="button" id="" value="Сохранить" class="btn genBtn">
                    </div>
                </div>
            </div>
        </div>



    </div>
        <div id="ModalExChangeDoc" class="modalkvart"  >

        <!-- Modal content -->
        <div class="ChangePersContent">
            <div class="modal-headerkvart">
                <span class="closekvart" id="closeExChangeDocM" onclick="closeExChangedoc()">×</span>
                <h2>Замена документа</h2>
            </div>
            <div class="modal-bodykvart persDatas">
                <input type="button" value="Показать все" onclick="ModalDocHistory()">

                <div class="col-md-12 persDatasDiv">
                    <h4 class="h6color">Новые данные</h4>
                    <div class="col-md-6">
                        <label>Вид документа</label>
                    </div>
                    <div class="col-md-6">
                        <select id="docTypeEx"></select>
                    </div>
                    <div class="col-md-6">
                        <label>Серия</label>
                    </div>
                    <div class="col-md-6">
                        <input type="text" id="SeriesDocEx">
                    </div>
                    <div class="col-md-6">
                        <label>Номер</label>
                    </div>
                    <div class="col-md-6">
                        <input type="text" id="NumDocEx">
                    </div>
                    <div class="col-md-6">
                        <label>Место выдачи</label>
                    </div>
                    <div class="col-md-6">
                        <input type="text" id="PlaceIssueEx">
                    </div>
                    <div class="col-md-6">
                        <label>Дата выдачи</label>
                    </div>
                    <div class="col-md-6">
                        <input type="date" id="dateIssueEx" class="dateIssue">
                    </div>
                    <div class="col-md-6">
                        <label>Код подразделения </label>
                    </div>
                    <div class="col-md-6">
                        <input type="text" id="DivisionCodeEx">
                    </div>
                    <div class="col-md-7">
                        <label>
                            Отсканированная копия документа
                        </label>

                        <div class="col-md-8 divBorder infoBorder">
                            <a class="skanLink">Скан основной части.jpg</a>

                            <a class="skanLink">Скан прописки.jpg</a><br>
                        </div>
                        <div class="col-md-3">
                            <input type="button" id="addScanEx" value="+" class="btn genBtn">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label>Причина замены</label>
                    </div>
                    <div class="col-md-6">
                        <input type="text" id="reasonEx">
                    </div>


                </div>
                <div class="col-md-12">
                    <div class="col-md-6">
                        <input type="button" value="Отмена" id="closeExChangedoc" onclick="closeExChangedoc()" class="btn genBtn changesHistory closeChangePersM">
                    </div>
                    <div class="col-md-6">
                        <input type="button" id="" value="Сохранить" class="btn genBtn">
                    </div>
                </div>
            </div>
        </div>



    </div>
<div id="ModalDocHistory" class="modalBnp" >

        <!-- Modal content -->
        <div class="modal-contentBnp">
            <div class="modal-headerBnp">
                <span class="closebnp" onclick="closeDocHistoryPop()" id="closeDocHistory">×</span>
                <h2>Все документы,удостоверящие личность</h2>
            </div>
            <div class="modal-bodybnp modal-bodyhistory">
                
                
                <input type="button" value="Заменить" onclick="ExChangeDoc()"><div class="col-md-12 divBorder infoBorder">
                    
                    
                    <div style="clear: both; height: 21px;">&nbsp;</div>
                    <div class="col-md-2">
                        <label>Вид документа</label>
                    </div>
                    <div class="col-md-3">
                        <select id="HistdocType"></select>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>Вид документа        
                                </td>

                                <td>Серия         
                                </td>

                                <td>Номер
                                </td>
                                <td>Место выдачи   
                                </td>
                                <td>Дата выдачи   
                                </td>
                                <td>Код подразделения   
                                </td>
                                <td>Причина
                                </td>
                                <td>Скан документа
                                </td>
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
                </div>
                <div style="clear: both;">&nbsp;</div>
                <div>
                    <input type="button" value="Выход" id="closeDocHistoryPop" onclick="closeDocHistoryPop()" class="closeHistoryPop">
                </div>
            </div>
        </div>
    </div>
</asp:Content>
