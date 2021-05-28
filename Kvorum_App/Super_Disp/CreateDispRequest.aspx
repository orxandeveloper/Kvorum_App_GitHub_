<%@ Page Title="" Language="C#" MasterPageFile="~/Super_Disp/Super.Master" AutoEventWireup="true" CodeBehind="CreateDispRequest.aspx.cs" Inherits="Kvorum_App.Super_Disp.CreateDispRequest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="col-lg-9half col-sm-12 p-0 min-vh-100 bgLightGrey3  " id="contentRegister">
        <style>
            .close2 {
                cursor: pointer
            }

            .removing2 {
                color: red
            }

            .modal-content2 {
                width: 50% !important;
                position: fixed;
                margin-top: 160em;
            }

            .modal2 {
                display: none;
                position: fixed;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 215em !important;
                background-color: rgba(0,0,0,0.5);
                z-index: 10000;
            }

            .foto-disp {
                width: 70px
            }

            #hstCom {
                border-radius: 8px;
                border: 1px dotted #777777;
                overflow: auto;
                height: 190px;
                max-height: 190px;
            }

            .SuppGrupRelations {
                color: #095c68;
                margin-left: 5px;
                margin-right: 5px;
            }

            .drct, .GrupOpenIcon  {
                cursor: pointer
            }
             .chkGrups {
                 cursor: pointer;
                 transform: scale(1.7);
				box-shadow: inset 0 0 1px 1px #D11B25;
            }

            .chkGrups:checked {
                filter: hue-rotate(138deg) brightness(0.88);
				box-shadow: none;
                }
				
            .icon {
                width: 40px
            }

            .selectdrc {
                border: 5px solid #b02014;
            }

            .totalh7 {
                height: 35px
            }

            .accMenu {
                width: 100%;
                cursor: pointer
            }

            .changeCost {
                background-color: #FFF1F1;
                height: 70px;
                display: none
            }

            .CostTd {
                width: 120px;
                text-align: center;
            }

            .doqOk {
                float: left;
                height: 35px !important;
                background: rgb(0, 147, 233);
            }

            .doqClose {
                float: right;
                height: 35px !important;
            }
        </style>
        <span class="h90"></span>
        <div class="w-100 pt-2 bgWhite pl-2">
            <ol class="list-inline list-unstyled mb-0">
                <li class="list-inline-item">
                    <a href="te-metr.html"></a>
                </li>
                <li class="list-inline-item"></li>
            </ol>
        </div>

        <div class="p-4 ">




            <div class="bgWhite rounded16 mt-4 ml-3 p-4 shadow">

                <h3 class="font24 font-weight-bold pb-3 pt-3 w-100 flexHoriz " id="hedrZ">Создание заявки
				<div id="divlst" class="ml-auto">

                    <!--<img id="lstcmnt" src="../../img/unlem.png" style="width:10%; display:block" /> -->
                    <i id="lstcmnt" class="fa fa-exclamation-circle" style="font-size: 300%; color: green; display: none"></i>

                </div>
                </h3>

                <style>
                    .errorMark {
                        font-size: 75%;
                        padding: 3.5rem 1rem 0 1rem;
                        color: red;
                    }

                    .errorMarkT {
                        font-size: 75%;
                        padding: 0 0 0 1rem;
                        color: red;
                    }

                    #grups {
                        overflow: overlay;
                        height: 500px;
                    }
                    #subMenu{
                        overflow: overlay;
    height: 272px;
                    }
                </style>
                <form>
                    <div class="flexHoriz mb-4">
                       
                            <input id="opl" type="checkbox" class="checkbox-item">
                            <label for="opl" class="mr-4 w-auto "> Оплачено
                        </label>
                        
                            <input id="chkem" type="checkbox" class="checkbox-item">
                           <label id="lblEm" for="chkem" class="pr-2 w-auto "> Аварийное обращение
                        </label>
                    </div>

                    <div class="posRel h56 rounded-lg mb-4">

                        <select id="prjcts">
                            <option value="0">Выберите проект </option>
                        </select>
                        <label class="w-95" for="prjcts">Проект*</label>

                        <span id="prjcts_S" class="errorMark" style="display: none">""</span>
                    </div>

                    <div class="posRel h56 rounded-lg mb-4">
                        <span style="color: red; display: none;" id="objctZ_Sp">""</span>

                        <select id="objctZ">
                            <option value="0">Выберите адрес объекта </option>
                        </select>
                        <label class="w-95" for="objctZ">Адрес объекта*</label>

                        <span id="adr_S" class="errorMark" style="display: none">""</span>
                    </div>

                    <div class="posRel h56 rounded-lg mb-4">
                        <span style="color: red; display: none;" id="objctZ_Sp">""</span>

                        <select id="RequestKind">
                            <option value="0">Выберите вид заявки</option>
                        </select>
                        <label class="w-95" for="RequestKind">Вид заявки*</label>

                        <span id="shServ_S" class="errorMark" style="display: none">""</span>
                    </div>

                    <div class="posRel h56 rounded-lg mb-4">
                        <input type="text" id="SerchService" onfocus="showResultArea(&quot;open&quot;)" onblur="showResultArea(&quot;close&quot;)" onkeyup="Search_Service(this)" placeholder="Поиск по Услугам" class="pt-0">
						<%-- <label class="w-95" for="SerchService">Поиск по Услугам</label>--%>
                        <!-- lblsearchtxt onblur="showResultArea(&quot;close&quot;)" -->
                    </div>


                    <%--<div class="flexHoriz mb-4 mt-4" style="display: block">
                        <div class="posRel h56 rounded-lg mb-0 w-50">
                            <input type="text" id="searchtxt" placeholder="Поиск по Услугам">
                            <label class="w-95" for="searchtxt">Поиск</label>
                            <!-- lblsearchtxt -->
                        </div>
                        <input type="button" value="Поиск услуг" id="SearchService" class="btn btn1 h56 ml-3">
                    </div>--%>





                    <table class="mngTable border-0  w-100" id="PrServiceH" style="display: none">
                        <thead>
                            <tr>
                                <th>Наименование услуг</th>
                                <th>Кол-во</th>
                                <th>Ед. изм</th>
                                <th>Стоимость (руб.)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>




                    <div class="posRel h56 rounded-lg mb-4">
                        <select id="Room_Type">
                            <option value="0">Выберите тип помещения </option>
                        </select>
                        <label class="w-95" for="Room_Type">Тип помещения*</label>
                        <span id="Room_Type_S" class="errorMark" style="display: none">""</span>
                    </div>

                    <div class="flexHoriz justify-content-between w-100">
                        <div class="posRel h56 rounded-lg mb-4 w-32">
                            <!--<input id="Room" type="number" style="width: 100%;" />-->
                            <input type="text" id="Room" value="" />
                            <label class="w-95" for="Room">Номер помещения*</label>
                            <span id="Room_S" class="errorMark" style="display: none">""</span>
                        </div>
                        <div class="posRel h56 rounded-lg mb-4 w-32">
                            <!--<input id="Room" type="number" style="width: 100%;" />-->
                            <input type="text" id="Entrance" value="" />
                            <label class="w-95" for="Entrance">Подъезд</label>
                            <span id="Block_S" class="errorMark" style="display: none">""</span>
                        </div>
                        <div class="posRel h56 rounded-lg mb-4 w-32">
                            <!--<input id="Room" type="number" style="width: 100%;" />-->
                            <input type="text" id="Floor" value="" />
                            <label class="w-95" for="Floor">Этаж</label>
                            <span id="Floor_S" class="errorMark" style="display: none">""</span>
                        </div>
                    </div>

                    <div class="posRel h56 rounded-lg mb-4">
                        <input type="text" id="Acnum" name="name" value="" />
                        <label class="w-95" for="Acnum">Номер лицевого счета*</label>
                        <span id="Acnum_S" class="errorMark" style="display: none">""</span>
                    </div>


                    <div id="AcnumList" class="posRel rounded-lg p-2 mb-4 border-1 shadow h-150 w-50 overflowY" style="display: none;">

                        <!--<input type="text" id="adr" list="adrList">
                    <datalist id="adrList">
                   
                    </datalist>-->

                    </div>

                    <div class="posRel h56 rounded-lg mb-4">
                        <input id="Ind" type="text" />
                        <div id="IndList" class="border-1 shadow h-150 w-50 overflowY" style="display: none">
                        </div>
                        <label class="w-95" for="Ind">Заявитель*</label>
                        <span id="Ind_S" class="errorMark" style="display: none">""</span>
                    </div>

                    <div class="posRel h56 rounded-lg mb-4">
                        <input id="Phn" onkeyup="MaskPhone(this)" type="text" />
                        <label class="w-95" for="Phn">Номер телефона*</label>
                        <span id="Phn_S" class="errorMark" style="display: none">""</span>
                    </div>



                    <div style="clear: both;">&nbsp;</div>

                    <div class="flexHoriz justify-content-between w-100" style="display: block">

                        <div class="posRel h56 rounded-lg mb-4 w-48">

                            <input type="date" id="calen1" required="required" name="calendar" value="" />
                            <label class="transp backLab" for="calen1">Планируемая дата* </label>
                        </div>
                        <div class="posRel h56 rounded-lg mb-4 w-48">


                            <input type="time" id="tm" required="required" name="time" value="12:00" />
                            <label class="transp backLab" for="tm">Планируемое время* </label>
                            <span id="tm_S" class="errorMark" style="display: none">""</span>
                        </div>
                    </div>
                    <br />
                    <div class="posRel h56 rounded-lg mb-4 w-100">
                        <select id="IspolList" onchange="ChangeToSend(this)">
                        </select>
                        <label class="w-95" for="IspolList">Выберите исполнителя</label>
                        <span id="IspolList_S" class="errorMark" style="display: none">""</span>
                    </div>

                    <div class="posRel h56 rounded-lg mb-4 w-100">
                        <label class="w-95" for="Otven">Ответственный по заявке</label>
                        <!--<input type="text" id="Otven" disabled="disabled" value="ФИО ответственного" />-->
                        <select id="Otven"></select>

                        <span id="RText_S" class="errorMark" style="display: none">""</span>
                    </div>


                    <div class="border-gray rounded8 w-100 mt-3 mb-3">

                        <textarea class=" rounded8 font16 w-100 h-150 border-0 pt-3 pl-3 " placeholder="Опишите кратко место проведения работ, а так же суть проблемы/задачи" id="RText"></textarea>
                    </div>

                    <div class="mb-3" style="display: none">

                        <h3 id="hstComh">История комментариев</h3>

                        <div id="hstCom">
                            <!--<h4>   - ""</h4>-->
                        </div>
                    </div>



                    <%--  <input type="file" name="name" id="fileH" style="display: none" value="" />
                    <span id="RComment_S" class="errorMark" style="display: none">""</span>--%>
                    <div class="posRel h56 rounded-lg mb-4 w-100">
                        <select id="reqType">
                            <option value="0">Внутренняя</option>
                            <option value="1">Внешняя</option>
                        </select>
                        <label class="transp backLab" for="reqType">Тип заявки</label>
                        <span id="reqType_S" class="errorMark" style="display: none">""</span>
                    </div>
                    <h3 id="hComennt">Комментарий</h3>
                    <div id="himgs">
                    </div>
                    <textarea id="RComment" class="opisanie w-100 rounded8 " style="height: 60px"></textarea>

                    <div class="flexHoriz w-100 mt-3" style="display: none !important">
                        <input type="button" name="name" id="file_btn" value="" class="transp border-0 w32"
                            style="background: url('../img/attach.svg') no-repeat center center;" />
                        <!-- ../Files/upl.png -->

                        <button id="SendComent" class="ml-auto btn btn1 w-auto flexCenter" type="button">Отправить</button>

                    </div>
                    <div id="imgss" class="flexHoriz w-100 justify-items-start">
                        <input class="knop ml-2" id="files" type="file" /><br />
                    </div>



                    <br />

                    <input class="knop" id="files3" style="display: none; margin-left: 9vw;" type="file" /><br />


                    <div style="clear: both"></div>


                    <div class="buttons1">
                        <%--  <button id="updateRequest" style="display: block" class="h48 btn btn1 flexCenter">Сохранить</button>--%>

                        <input type="button" id="updateRequest" style="" class="h48 btn btn1 mr-2 font-weight-bold" value="Сохранить">
                        <button id="SaveDD" data-status="1" class="h48 btn btn1 mr-2" type="button"><strong>Принять в работу</strong></button>
                        <button id="SaveMO" data-status="2" class="h48 btn btn1 mr-2" type="button"><strong>Отправить</strong></button>
                        <button id="backUo" class="h48 btn btn1 outline shadow-none" type="button">Отмена</button>
                    </div>
                </form>


                <div id="myModal6" style="z-index: 1000; display: none" class="modal2 shadow p-3 bgWhite rounded16 w-100">

                    <!-- Modal content -->
                    <div class="modal-content2">
                        <div class="modal-header2 position-relative">
                            <span class="close2 font24" style="color: black" id="close_6">&times;</span>
                            <h2 id="mh3"></h2>
                        </div>
                        <div class="modal-body2">
                            <p id="txt6" class="font24">Исполнитель:</p>

                            <div class="posRel h56 rounded-lg mb-4 w-100">

                                <select id="ispol2">
                                    <option value="0">Выберите Исполнителя</option>
                                </select>
                                <label class="w-95" id="Ispolname" for="ispol2">Исполнитель ( по умолчанию Текущий исполнитель)</label>
                            </div>
                        </div>

                        <hr />

                        <div class="modal-footer2 flexHoriz w-100">

                            <input type="button" id="vrntVrabot" name="name" value="Вернуть в работу" class="ml-auto w-32 btn btn1 outline shadow-none flexCenter" />

                        </div>

                    </div>

                </div>
                <br />

                <div id="DerModalFenster" style="display: block; display: none" class="shadow p-3 bgWhite rounded16 w300 h-150">

                    <div class="posRel h56 rounded-lg mb-4 w-100">
                        <label class="w-95" for="costServ">Стоимость услуги</label>
                        <input type="text" id="costServ" />
                    </div>
                    <div class="flexHoriz justify-content-between">
                        <button id="okBtn" class="btn btn1 w-48 flexCenter">ОК</button>
                        <button id="escBtn" class="btn btn1 outline shadow-none w-48 flexCenter">Отмена</button>
                    </div>

                </div>

                <script type="text/javascript">
                    function ifrPopup(e) {
                        $("#mh8").text("");
                        var dtdUrl = $(e).children('img').attr('data-url');
                        $("#ifr").attr('src', "https://docs.google.com/gview?url=" + dtdUrl + "&embedded=true");

                        var modal = document.getElementById('myModal8');
                        var span = document.getElementsByClassName("close_8")[0];
                        modal.style.display = "block";
                        $("#close_8").click(function () {

                            $("#ifr").attr('src', "");
                            modal.style.display = "none";
                        })
                        window.onclick = function (event) {
                            if (event.target == modal) {
                                $("#ifr").attr('src', "");
                                modal.style.display = "none";
                            }
                        }
                    }
                </script>





            </div>
            <!-- main block -->
            <div id="myModal5" style="display: none" class="modal2">

                <!-- Modal content -->
                <div class="modal-content2  dialog w-400 pt-2">
                    <div class="modal-header2 bgWhite">
                        <span class="close2 font24" style="color: black" id="close_5">&times;</span>
                        <h2 id="mh3"></h2>
                    </div>
                    <div class="modal-body2">
                        <textarea class="w-100 h-100 m-0 border-grey p-2" id="cmntsts2">Все работы по данной заявке выполнены</textarea>

                    </div>
                    <hr />
                    <div class="modal-footer2 flexHoriz w-100 m-0 p-0" style="">

                        <input class="knop" id="f_iles2" style="width: 100%" type="file">


                        <input type="button" id="OkVipol" name="name" value="ОК" class="ml-auto w-15 btn btn1 flexCenter" />
                        <input type="button" id="Close_Ot" name="name" value="Отмена" class="ml-3 w-15 btn btn1 outline shadow-none flexCenter mr-0" />

                    </div>
                </div>

            </div>
        </div>
        <!-- row -->
        <link href="../Super_Disp/Utilities/select2.css" rel="stylesheet" />
        <script src="../Super_Disp/Utilities/select2.full.js"></script>
    </div>
</asp:Content>
