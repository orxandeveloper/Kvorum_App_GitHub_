<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="AddApartment.aspx.cs" Inherits="Kvorum_App.Manager.AddApartment" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .sortingArrow {
            font-size: 25px !important;
            color: #D11B25;
            margin-left: 7%;
            cursor:pointer
        }

        .pointer {
            cursor: pointer
        }

        #delInd {
            margin-bottom: 15px;
        }

            #delInd span {
                background: #D11B25 !important;
            }

        .removing3 {
            color: #D11B25;
            float: right;
            position: relative;
            z-index: 100;
            margin: 0.75em 1em 0.5em 0;
            border: 1px solid #ccc;
            padding: 3px 4px;
            border-radius: 50%;
            background: #EAEAEA !important;
            cursor: pointer
        }

        #plus {
            margin-left: 45%;
            width: 10%;
        }

        #plusImg {
            width: 62px !important;
        }

        .modalVn {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1000; /* Sit on top */
            padding-top: 100px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0, 100, 223, 0.4);
        }

        /* Modal Content */
        .modal-contentVn {
            position: relative;
            background-color: #fefefe;
            margin: auto;
            padding: 0;
            border: 1px solid #888;
            width: 75%;
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
        .closeVn {
            color: black;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

            .closeVn:hover,
            .closeVn:focus {
                color: #000;
                text-decoration: none;
                cursor: pointer;
            }

        .modal-headerVn {
            padding: 2px 16px;
            background-color: white;
            color: white;
        }

        .modal-bodyVn {
            height: 160px !important;
            width: 100%;
            padding: 15px;
            display: inline-block
        }

        .mhVn {
            text-align: left;
        }

        .modal-footerVn {
            padding: 2px 16px;
            color: white;
            height: 50px !important;
            text-align: left;
            height: 14px;
            background-color: white;
        }

        .AddVn {
            width: 24%;
            height: 35px;
            background-color: white;
            color: black;
            font-weight: 700;
            margin-left: 38%;
        }

        .modalVp {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1000; /* Sit on top */
            padding-top: 100px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0, 100, 223, 0.4);
        }

        /* Modal Content */
        .modal-contentVp {
            position: relative;
            background-color: #fefefe;
            margin: auto;
            padding: 0;
            border: 1px solid #888;
            width: 50%;
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
        .closeVp {
            color: black;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

            .closeVp:hover,
            .closeVp:focus {
                color: #000;
                text-decoration: none;
                cursor: pointer;
            }

        .modal-headerVp {
            padding: 2px 16px;
            background-color: white;
            color: white;
        }

        .modal-bodyVp {
            height: 100% !important;
            width: 100%;
            padding: 15px;
            display: inline-block
        }

        .mhVp {
            text-align: left;
            padding: 20px 0;
        }

        .modal-footerVp {
            padding: 2px 16px;
            color: white;
            height: 50px !important;
            text-align: left;
            height: 14px;
            background-color: white;
        }

        .AddVp {
            width: 24%;
            height: 35px;
            background-color: white;
            color: black;
            font-weight: 700;
            margin-left: 38%;
        }

        .removingNac, #removingNac {
            float: right;
            color: red;
            font-size: 20px;
            font-weight: 900;
        }

        .period {
            width: 15%
        }

        .Servc {
            margin-left: 20%;
        }

        .onbegin {
            width: 16%;
        }

        .onend {
            width: 11%;
        }

        .red_Placeholder::placeholder {
            /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: red;
            opacity: 1; /* Firefox */
        }

        label {
            line-height: 1em;
            padding: 10px 0;
        }

        #tr1 {
            background: #fff;
        }

            #tr1:hover {
                background: #f3f3f3;
            }

        .GosTab {
            width: 20%
        }

        .bordering {
            border-left: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            border-right: 1px solid #ddd;
            margin-left: 0px;
            border-top: 1px solid #ddd;
        }

        .arrowDiv {
            margin-top: 70px;
            text-align: center;
        }

        .arrows {
            font-size: 50px;
            color: rgb(0,100,223);
        }

        .create {
            text-decoration: none !important;
            color: #d44141;
            display: inline-block;
            background: transparent;
            font-family: 'PT Sans Narrow', sans-serif;
            font-size: 21px;
            float: right;
        }
    </style>

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="col-lg-9half col-sm-12 p-0 min-vh-100  bgLightGrey3 ">
        <!--  -->
        <span class="h90"></span>


        <div class="row w-100 m-0">
            <div class="col-sm-5 m-0">
                <!-- 1st block -->


                <div class="bgWhite rounded16 mt-4 ml-3 p-4 shadow">
                    <div>
                        <button class="btn genBtn" id="backAppart" style="background: #ccc">Назад</button>
                        <button id="SaveUp" class="btn genBtn">Сохранить</button>
                        <a id="DeletePOM" href="#" role="button" class="create" style="display: none;"><i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;Удалить</a>
                    </div>

                    <h3 class="font24 font-weight-bold p-3 w-100" id="PageH">Помещение и лицевой счет
	
			
                    </h3>


                    <div class="posRel h56 rounded-lg mb-3">
                        <select id="objs" required>
                            <option value="0">Выберите объект</option>
                        </select>
                        <label for="obj" class="w-95 transp backLab">Объект</label>
                    </div>


                    <div class="flexHoriz justify-content-between mb-2">

                        <div class="posRel h56 rounded-lg w-48">
                            <input id="rnum" required>
                            <label for="rnum" class="w-95 transp backLab">Номер помещения</label>
                        </div>
                        <div class="posRel h56 rounded-lg  w-48">
                            <input id="countR" class="countR" onkeyup="hideErrsMessage2(this)">
                            <label for="countR" class="w-95 transp backLab">Количество комнат</label>
                        </div>
                    </div>

                    <div class="flexHoriz justify-content-between mb-2">
                        <div class="posRel h56 rounded-lg w-48">
                            <input id="entr">
                            <label for="entr" class="w-95 transp backLab">Подъезд</label>
                        </div>

                        <div class="posRel h56 rounded-lg w-48">
                            <input id="floor">
                            <label for="floor" class="w-95 transp backLab">Этаж</label>
                        </div>
                    </div>




                    <div class="flexHoriz justify-content-between mb-2">
                        <div class="posRel h56 rounded-lg w-48">
                            <input id="LiveS" class="LiveS" onkeyup="hideErrsMessage2(this)">
                            <label for="LiveS" class="w-95 transp backLab">Жилая площадь, м<sup>2</sup></label>
                        </div>
                        <div class="posRel h56 rounded-lg w-48">
                            <input id="GenS" class="GenS" onkeyup="hideErrsMessage2(this)">
                            <label for="GenS" class="w-95 transp backLab">Общая площадь, м<sup>2</sup></label>
                        </div>
                    </div>

                    <div class="flexHoriz justify-content-between mb-2">
                        <div class="posRel h56 rounded-lg w-48">
                            <select id="RoomF" required style="width: 100%;">
                                <option value="0">Выберите Назначение помещения</option>

                            </select>
                            <label for="naznS" class="w-95 transp backLab">Назначение помещения</label>
                        </div>
                        <div class="posRel h56 rounded-lg  w-48">
                            <select id="r_t" required style="width: 100%;">
                                <option value="0">Выберите Тип помещения</option>

                            </select>
                            <label for="r_t" class="w-95 transp backLab">Тип помещения</label>
                        </div>

                    </div>






                    <div class="flexHoriz justify-content-between mb-2">


                        <div style="display: none" class="posRel h56 rounded-lg w-48">
                            <input id="regDt" class="" value="2012-02-30" type="date">
                            <label for="regDt" class="w-95 transp backLab">Зарегистрирована</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-7 m-0" id="AllLs">

                <div id="ls" class="ls" itemid="0">
                    <div class=" h60 w-100 bgWhite shadow rounded16 pl-3 mt-4 pr-3 ">
                        <ol class="list-unstyled list-inline flexHoriz te-menu m-0 h-100 ">
                            <li onclick="OpenTab(1,this)" class="w200 mr-3 h-100 m-0 pointer">
                                <a class=" font-weight-bold">Лицевые&nbsp;счета</a>
                            </li>
                            <li onclick="OpenTab(2,this)" class="w200 mr-3 h-100 m-0 active pointer">
                                <a class=" font-weight-bold">Собственники</a>
                            </li>


                            <li onclick="OpenTab(2,this)" style="display: none" class="w200 mr-3 h-100 m-0 pointer">
                                <a class=" font-weight-bold">Начисления&nbsp;и&nbsp;платежи</a>
                            </li>
                        </ol>
                    </div>

                    <div data-tabid="2" class="w-100 flexHoriz flex-wrap bgWhite shadow rounded16 p-4 mt-4">


                        <div class="posRel h56 rounded-lg  w-100">
                            <select onchange="typePropChange(this)" id="typeProp">
                                <option value="0">Выберите собственность</option>

                            </select>
                            <label for="typeProp" class="w-95 transp backLab">Тип собственности</label>
                        </div>



                    </div>

                    <div data-tabid="1" style="display: none !important" class="w-100 flexHoriz flex-wrap bgWhite shadow rounded16 p-4 mt-4">




                        <div class="row mb-3 mr-2 ml-1 w-100 p-0 rounded8">
                            <div class="col-md-12 m-0 p-0">
                                <div class="posRel h56 rounded-lg mb-3">
                                    <input class="lc" onkeyup="hideErrsMessage2(this)" required type="text" id="lc">
                                    <label for="lc" class="w-95 transp backLab">Лицевой счет</label>
                                </div>
                            </div>

                            <div class="flexHoriz justify-content-between mb-2 w-100">
                                <div class="posRel h56 rounded-lg w-48 m-0">
                                    <input disabled="disabled" onkeyup="hideErrsMessage2(this)" class="pss" type="text" id="pss" style="width: 71%;">
                                    <label for="pss" class="w-95 transp backLab">Пароль</label>
                                </div>

                                <button onclick="Generate(this)" id="GENER_Modal" class="btn btn1 outline shadow-none m-0 rounded-lg w-48 h56">
                                    <span>
                                        <img src="../img/ic-pass.svg" class="mr-2" alt="" />
                                        <span class="text-truncate">Сгенерировать</span>
                                    </span>
                                </button>
                            </div>

                            <div class="flexHoriz justify-content-between mb-2 w-100">
                                <div class="posRel h56 rounded-lg w-48">
                                    <input id="LiveSq" class="LiveSq"  onkeyup="hideErrsMessage2(this)">
                                    <label for="LiveSq" class="w-95 transp backLab">Жилая площадь, м<sup>2</sup></label>
                                </div>
                                <div class="posRel h56 rounded-lg w-48">
                                    <input id="GenSq" class="GenSq" onkeyup="hideErrsMessage2(this)">
                                    <label for="GenSq" class="w-95 transp backLab">Общая площадь, м<sup>2</sup></label>
                                </div>
                            </div>
                            <div class="flexHoriz justify-content-between mb-2 w-100">
                                <div class="posRel h56 rounded-lg w-48">
                                    <input id="LiveSqB" class="LiveSqB" onkeyup="hideErrsMessage2(this)">
                                    <label for="LiveSqB" class="w-95 transp backLab">Общая площадь без летних зон по данному л/с, м<sup>2</sup></label>
                                </div>
                                <div class="posRel h56 rounded-lg w-48">
                                    <input id="AmRoom" class="AmRoom" onkeyup="hideErrsMessage2(this)">
                                    <label for="AmRoom" class="w-95 transp backLab">Количество комнат<sup>2</sup></label>
                                </div>
                            </div>
                        </div>


                    </div>
                    <hr />
                </div>


                <button class="btn btn1 outline shadow-none rounded-pill" title="Добавить лицевой счет" id="plus">
                    <span class="bgLightGrey w24 rounded-pill"></span>
                    <img src="../img/ic-plus.svg" class="w12 reddishSvg position-absolute" alt="" id="plusImg">
                </button>
            </div>
            <!-- 2 block -->
        </div>
        <!-- row -->
    </div>


    <div id="myModalVn" class="modalVn">

        <!-- Modal content -->
        <div class="modal-contentVn">
            <div class="modal-headerVn">

                <span class="closeVn">×</span>
                <h2 id="mh7" class="mhVn">Внесение начислений </h2>
            </div>
            <div class="modal-bodyVn">
                <div class="col-md-12 Servc" data-total="0.00">
                    <div class="col-md-1 period">
                        <label>Период:</label><input type="text" id="Period" onkeyup="AddingNac(this)" value="" style="width: 100%;">
                    </div>
                    <div class="col-md-1 onbegin">
                        <label style="">Остаток на начало периода:</label><input id="ONBEGIN" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width: 100%;">
                    </div>

                    <div class="col-md-1 payments">
                        <label>Поступило</label><input id="PAYMENTS" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width: 100%;">
                    </div>

                    <%--<div class="col-md-1 Volume">
                        <label>Объем услуг</label><input id="VOLUME" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width: 100%;">
                    </div>--%>
                    <%-- <div class="col-md-1 edizm">
                        <label>Ед.изм.</label>
                        <select id="UNITS">
                            <option>-</option>
                            <option>шт</option>
                            <option>м²</option>
                            <option>м³</option>
                            <option>см</option>
                            <option>п.м.</option>
                            <option>кг</option>
                            <option>г</option>
                            <option>л</option>
                            <option>мл</option>
                            <option>ч</option>
                            <option>сек</option>
                        </select>
                    </div>--%>

                    <%--  <div class="col-md-1 tarif">
                        <label>Тариф руб/ед.</label><input id="TARIFF" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width: 100%;">
                    </div>--%>
                    <div class="col-md-1 overall">
                        <label>Начислено:</label><input id="OVERALL" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width: 100%;">
                    </div>
                    <%--   <div class="col-md-1 lgot">
                        <label>Льготы субсидии</label><input id="LGOTA" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width: 100%;">
                    </div>--%>
                    <%-- <div class="col-md-1 recalc">
                        <label>Перерасчеты (+/-)</label><input id="RECALC" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width: 100%;">
                    </div>--%>
                    <%-- <div class="col-md-1 overall2">
                        <label>Итого Начислено</label><input id="OVERALL2" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width: 100%;">
                    </div>--%>
                    <div class="col-md-1 onend">
                        <label>Итого к оплате руб.</label><input id="ONEND" onkeyup="AddingNac(this)" onchange="AddingNac(this)" type="number" value="0.00" style="width: 100%;">
                    </div>
                </div>
                <%--  <div class="col-md-12 vndiv" itemid="0">
                   <div class="col-md-3" style="width: 33%;">
                        <label>Тип начисления/платежа:</label>
                        <select onchange="getRelationService(this)" id="tipN0">
                            <option value="0">Выберите тип начисление</option>

                        </select>
                    </div>
                    <div class="col-md-3" style="width: 33%;">
                        <label>Услуга:</label>
                        <select id="srv" disabled="disabled">
                            <option value="0">Выберите услуги</option>
                        </select>
                    </div>


                    <div class="col-md-3" style="width: 33%;">
                        <label id="Nacllbl">Начислено:</label>
                        <input type="number" onkeyup="AddingNac(this)" value="0.00" style="width: 100%" id="Nac0">
                    </div>
                </div>--%>

                <span id="plusNac" style="width: 100%; font-size: 62px; color: green; margin-left: 50%; cursor: pointer">+</span>
                <%--  <label style="width: 23%;margin-left: 25px !important;margin-bottom: -27px !important;">Отправить квитанцию на житель</label>
                <input type="checkbox" id="sendReciept">--%>
                <%--<div class="col-md-12">

                    <div class="col-md-8">
                        <label style="float: right;">
                            Итого:</label>
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="sumNac" value="0.00" disabled="disabled">
                    </div>
                </div>--%>
            </div>
            <hr>
            <div class="modal-footerVn">
                <input type="button" id="AddVn" onclick="AddVnFunc()" class="AddVn" name="name" value="Сохранить">
            </div>
        </div>

    </div>
    <div id="myModalVp" class="modalVp">

        <!-- Modal content -->
        <div class="modal-contentVp">
            <div class="modal-headerVp">

                <span class="closeVp">×</span>
                <h2 class="mhVp">Внесение платежей </h2>
            </div>
            <div class="modal-bodyVp">
                <div class="col-md-12">
                    <div class="col-md-6" style="width: 33%;">
                        <label>Период:</label>
                        <select id="PeriodP"></select>
                    </div>



                </div>
                <div class="col-md-12 Vpdiv" itemid="0">
                    <div class="col-md-3" style="width: 33%;">
                        <label>Услуга</label>
                        <input type="text" id="srvP" disabled="disabled">
                    </div>
                    <div class="col-md-3" style="width: 33%;">
                        <label>Начислено:</label>
                        <input type="text" disabled="disabled">
                    </div>


                    <div class="col-md-3" style="width: 33%;">
                        <label id="platllbl">Постипула:</label>
                        <input type="number" onkeyup="Addingplat(this)" style="width: 100%" id="plat0">
                    </div>
                </div>


                <hr>
                <div class="col-md-12" style="margin-top: 70px;">

                    <div class="col-md-8">
                        <label style="float: right;">
                            Итого:</label>
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="sumplat" disabled="disabled">
                    </div>
                </div>
            </div>
            <hr>
            <div class="modal-footerVp">
                <input type="button" id="AddVp" class="AddVp" name="name" value="Сохранить">
            </div>
        </div>

    </div>

</asp:Content>
