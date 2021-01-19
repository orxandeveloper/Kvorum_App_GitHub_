<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="GovernmentAgency.aspx.cs" Inherits="Kvorum_App.Manager.GovernmentAgency" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .descpLeg {
            width: 106%;
            height: 106px;
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

        .H6Leg {
            color: #095c68;
            font-size: 25px;
        }

        .CompNameLeg {
            width: 102%;
        }

        .addPhoneLeg {
            width: 100%;
        }

        .CompNameGov {
            width: 96%;
        }

        .OGRNGov {
            width: 93%;
        }

        .addPhoneLeg {
            width: 100%;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Добавить Государственные учреждения</h2>
    <div style="clear: both;">&nbsp;</div>
    <div class="col-md-12">
        <div class="col-md-3">
            <select id="sc">
                <option>Л/C</option>

            </select>
        </div>

    </div>
    <div style="clear: both;">&nbsp;</div>
    <div class="col-md-12">


        <div class="col-md-11">
            <ul class="nav nav-tabs nav-tabPol" id="nav-tab">
                <li class="active"><a data-toggle="tab" href="#tab0" aria-expanded="false">Общая информация</a></li>
                <li class=""><a data-toggle="tab" href="#tab1" aria-expanded="true">Документы</a></li>

                <li class=""><a data-toggle="tab" href="#tab2" aria-expanded="false">Заявки</a></li>
                <li class=""><a data-toggle="tab" href="#tab3" aria-expanded="false">Обращения</a></li>

            </ul>
            <div class="tab-content">
                <div id="tab0" data-tab="0" class="tab-pane fade in active">
                    <div class="row divBorder">

                        <div class="col-md-12">

                            <div class="col-md-12">
                                <div class="col-md-6">
                                    <h6 class="H6Leg">Государственные учреждения</h6>
                                </div>
                                <br>



                                <div class="col-md-6">
                                    <div class="col-md-4">
                                        <label>Лицевой счет</label>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" id="scGov">
                                    </div>

                                </div>



                            </div>

                        </div>
                        <div class="col-md-12">
                            <div class="col-md-3">
                                <label>Наименование организации</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="CompNameGov" class="CompNameGov">
                            </div>
                        </div>
                        <div style="clear: both;">&nbsp;</div>

                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div class="col-md-3">
                                    <label>ИНН</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="INNGov">
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="col-md-3">
                                    <label>ОГРН</label>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" id="OGRNGov" class="OGRNGov" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="row divBorder">
                        <h4 class="h6color">Адрес государственные учреждения</h4>


                        <div class="col-md-12">

                            <div class="col-md-3">
                                <div class="col-md-6">
                                    <label>Регион</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="RegionGov"></select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="col-md-6">
                                    <label>Район</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="DistrictGov"></select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="col-md-6">
                                    <label>Н.Пункт</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="PointGov"></select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="col-md-6">
                                    <label>Помещение</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="RoomGov"></select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="col-md-3">
                                <div class="col-md-6">
                                    <label>Город</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="CityGov"></select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="col-md-6">
                                    <label>Улица</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="streetGov"></select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="col-md-6">
                                    <label>Дом</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="HometGov"></select>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="col-md-6">
                                    <label>Индекс</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="IndexGov">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="col-md-3">
                            </div>
                            <div class="col-md-3">
                            </div>
                            <div class="col-md-3">
                            </div>

                        </div>

                        <div style="clear: both;">&nbsp;</div>



                    </div>


                    <div class="row divBorder">
                        <h4 class="h6color">Ответственное лицо</h4>
                        <div class="col-md-12">
                            <div class="col-md-4">
                                <div class="col-md-3">
                                    <label>ФИО</label>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" id="OfioGov">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="col-md-3">
                                    <label>Телефон</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="OphoneGov">
                                </div>
                                <div class="col-md-2">
                                    <input type="button" id="addOPhoneGov" class="addPhoneLeg" value="+">
                                </div>

                            </div>

                        </div>

                        <div class="col-md-12">
                            <div class="col-md-4"></div>
                            <div class="col-md-6">
                                <div class="col-md-3">
                                    <label>E-mail</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="OEmailGov">
                                </div>
                                <div class="col-md-2">
                                    <input type="button" id="addOEmaiGov" class="addPhoneLeg" value="+">
                                </div>
                            </div>
                        </div>
                        <div style="clear: both;">&nbsp;</div>



                    </div>
                    <div class="row divBorder">
                        <h4 class="h6color">Руководитель отделения</h4>
                        <div class="col-md-12">
                            <div class="col-md-4">
                                <div class="col-md-3">
                                    <label>ФИО</label>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" id="GfioGov">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="col-md-3">
                                    <label>Телефон</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="GphoneGov">
                                </div>
                                <div class="col-md-2">
                                    <input type="button" id="addGPhoneGov" class="addPhoneLeg" value="+">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="col-md-4"></div>
                            <div class="col-md-6">
                                <div class="col-md-3">
                                    <label>E-mail</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="GEmailGov">
                                </div>
                                <div class="col-md-2">
                                    <input type="button" id="addGEmaiGov" class="addPhoneLeg" value="+">
                                </div>
                            </div>
                        </div>
                        <div style="clear: both;">&nbsp;</div>
                    </div>
                    <div class="row divBorder">
                        <h4 class="h6color">Банковские реквизиты</h4>

                        <div class="col-md-12">
                            <div class="col-md-4">
                                <label>Наименование получателя средств</label></div>
                            <div class="col-md-6">
                                <input type="text" id="FundsNameGov"></div>
                        </div>
                        <div style="clear: both;">&nbsp;</div>
                        <div class="col-md-12">
                            <div class="col-md-4">
                                <div class="col-md-3">
                                    <label>БИК</label>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" id="BIKGov">
                                </div>


                            </div>

                            <div class="col-md-4">
                                <div class="col-md-3">
                                    <label>Банк</label>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" id="BankGov">
                                </div>


                            </div>

                            <div class="col-md-4">
                                <div class="col-md-3">
                                    <label>к/с</label>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" id="KorrGov">
                                </div>
                                <div class="col-md-3">
                                    <label>р/с</label>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" id="RoscGov">
                                </div>
                            </div>

                        </div>

                        <div style="clear: both;">&nbsp;</div>



                    </div>

                    <!-- row-->

                </div>
                <!-- tab0 -->
          <div id="tab1" class="tab-pane fade active in">
                    <div class="row divBorder">
                        <h6 class="h6color">Право собственности</h6>
                        <div class="col-md-12">

                            <div class="col-md-6">
                                <div class="col-md-6">
                                    <label>Кадастровый номер</label>
                                </div>
                                <div class="col-md-6">
                                    <input id="CadastralNumGov" type="text">
                                </div>

                                <div class="col-md-6">
                                    <label>Вид Собственности</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="typeProp2Gov"></select>
                                </div>

                                <div class="col-md-6">
                                    <label>Номер гос. регистрации права</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" id="RegRightNumberGov">
                                </div>
                                <div class="col-md-6">
                                    <label>Дата гос. регистрации права</label>
                                </div>
                                <div class="col-md-6">
                                    <input type="date" id="RegRightdateGov" class="dateIssue">
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
                                <input type="button" id="addScanSobsGov" value="Добавить" class="btn genBtn">
                                <div style="clear: both;">&nbsp;</div>
                                <input type="button" id="RemoveScanSobsGov" value="Удалить" class="btn genBtn RemoveScan">
                            </div>
                        </div>


                    </div>
                    <div class="col-md-12">
                        <h6 class="h6color" style="">Дополнительные документы</h6>
                        <div class="col-md-10">
                            <table id="allDocsL">
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
                            <input type="text" value="Добавить" id="addDocsGov" class="btn genBtn">
                            <input type="text" value="Удалить" id="removeDocsGov" class="btn genBtn RemoveScan">
                        </div>
                    </div>
                </div>
                <!-- tab1 -->

                <!-- tab3 -->

               <div id="tab3" data-tab="1" class="tab-pane fade active in">
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
                                <input type="text" id="NumberOutLettersGov">
                            </div>
                            <div class="col-md-2">
                                <label>Номер входящего письма</label>
                                <input type="text" id="NumberInLettersGov">
                            </div>
                            <div class="col-md-2">
                                <label>Дата обращения</label>
                                <br>

                                <input type="Date" id="AppealsDateGov" style="">
                            </div>
                            <div class="col-md-2">
                                <label>Ответсвенное лицо</label>
                                <br>
                                <input type="text" id="RespPersonGov">
                            </div>
                            <div class="col-md-2">
                                <label>Тема обращения</label>
                                <br>
                                <select id="ThemAppealsGov"></select>
                            </div>
                            <div class="col-md-2">
                                <label>Статус обращения</label>
                                <br>
                                <select id="StatusAppealsGov"></select>
                            </div>
                        </div>



                    </div>
                    <div class="row">
                        <table id="AppealsTableGov">
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
            </div>
        </div>




    </div>
</asp:Content>
