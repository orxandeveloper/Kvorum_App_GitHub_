<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="AddApartment.aspx.cs" Inherits="Kvorum_App.Manager.AddApartment" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .removingNac,#removingNac {
        
        float: right;
        color:red;
        font-size:20px;
        font-weight:900;
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
        width:20%
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
    </style>
    <style>
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
    </style>
    <style>
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
    </style>
    <%-- <script src="https://raw.githubusercontent.com/igorescobar/jQuery-Mask-Plugin/master/src/jquery.mask.js"></script>--%>
    <%-- <script src="js/jquery.mask.js"></script>--%>
    <%--    <script src="https://unpkg.com/jquery-input-mask-phone-number@1.0.0/dist/jquery-input-mask-phone-number.js"></script>--%>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Новое помещение</h2>
    <div>
        <button class="btn genBtn" id="backAppart" style="background: #ccc">Назад</button>
        <button id="SaveUp" class="btn genBtn">Редактировать / Сохранить</button>
        <div class="button">
            <a id="DeletePOM" href="#" role="button" class="create" style="display: none;"><i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;Удалить</a>
        </div>
    </div>

    <div style="clear: both; height: 21px;">&nbsp;</div>
    <div class="row">
        <div class="col-md-6 col-xs-12">
            <label id="objsH">Объект:</label>

            <select id="objs">
                <option value="0">Выберите объект</option>
            </select>

            <label id="entrH">Подъезд:</label>

            <input id="entr" placeholder="Введите номер подъезда" />

            <label id="floorH">Этаж:</label>

            <input id="floor" placeholder="Введите номер этажа" />

            <label id="rnumH">Номер помещения:</label>

            <input id="rnum" placeholder="Введите номер помещения" />
        </div>
        <div class="col-md-6 col-xs-12">
            <label id="RoomFH">Назначение помещения:</label>

            <select id="RoomF" style="width: 100%;">
                <option value="0">Выберите Назначение помещения</option>

            </select>

            <label id="r_tH">Тип помещения:</label>

            <select id="r_t" style="width: 100%;">
                <option value="0">Выберите Тип помещения</option>

            </select>
            <label id="countRH" style="display: inline-block;">Количество комнат:</label>
            <input id="countR" onkeyup="hideErrsMessage2(this)" placeholder="Введите количество комнат" />

            <div style="clear: both; height: 8px; font-size: 1px;">&nbsp;</div>

            <label id="GenSH" style="display: inline-block;">Общая площадь, м<sup>2</sup>:</label>
            <input id="GenS" onkeyup="hideErrsMessage2(this)" placeholder="Введите общую площадь" />

            <div style="clear: both; height: 8px; font-size: 1px;">&nbsp;</div>

            <label id="LiveSH" style="display: inline-block;">Жилая площадь, м<sup>2</sup>:</label>
            <input id="LiveS" onkeyup="hideErrsMessage2(this)" placeholder="Введите жилую площадь" />
            <br />
            <button id="QRGenerate" onclick="GenerateQr_For_Room(this)" style="display:none" class="btn genBtn">Распечатать QR-код помещения</button>
        </div>
    </div>
    <h3>Лицевые счета:</h3>
    <ul class="nav nav-tabs" id="nav-tab">
        <li itemid="0" class="active"><i class="fa fa-close removing3" itemid="0" onclick="deltab(0)" style="display: none" aria-hidden="true"></i><a data-toggle="tab" href="#tab0">Новый лицевой счет</a></li>
        <li id="plus"><a href="#tab1">+</a></li>
    </ul>
    <div class="tab-content">
        <div id="tab0" data-tab="0" class="tab-pane fade in active">
            <div class="row">
                <div class="col-md-8 col-xs-12">
                    <label for="lc">Номер лицевого счета:</label>
                    <input onkeyup="hideErrsMessage2(this)" type="text" id="lc">
                    <label for="lc">Пароль:</label>
                    <input disabled="disabled" onkeyup="hideErrsMessage2(this)" type="text" id="pss" style="width: 71%;">
                    <button style="margin-left: 3px" onclick="Generate(this)" id="GENER" class="btn genBtn">СГЕНЕРИРОВАТЬ</button>


                    <label for="typeProp">Тип собственности:</label>

                    <select id="typeProp">
                        <option value="0">Выберите собственность</option>

                    </select>
                    <div id="itms">
                        <div class="col-xs-6 col-md-3" style="padding: 0 0 0 15px;">
                            <label id="sobsH" style="display: none">Собственник</label>

                        </div>
                        <div class="col-xs-6 col-md-3" style="padding: 0px 10px 0px 15px; display: block;">
                            <label id="dolH" style="display: none">Доля</label>

                        </div>
                        <div class="col-xs-6 col-md-3" style="padding: 0 5px;">
                            <label id="telH" style="display: none" for="telH">Номер&nbsp;телефона</label>

                        </div>
                        <div class="col-xs-6 col-md-3" style="padding: 0 0 0 10px;">
                            <label id="emailH" style="display: none">E-mail</label>

                        </div>

                        <%--  <div class="row" itemid="0">
                            <div class="col-xs-8 col-lg-4" style="padding:0 0 0 15px;">
                                <label id="sobsH" style="display:none">Собственник</label>
                                <%--<input type="text" id="sobs" itemid="0" style="display:none"  placeholder="Иванов Андрей Витальевич" /> 
                            </div>
                            <div class="col-xs-4 col-lg-2" style="padding:0 10px 0 15px;">
                                <label id="dolH" style="display:none">Доля</label>
                                <%--<input id="dol" type="text" itemid="0" style="display:none" placeholder="1/2" /> 
                            </div>
                            <div class="col-xs-6 col-lg-3" style="padding:0 5px;">
                                <label id="telH" style="display:none" for="telH">Номер&nbsp;телефона</label>
                               <%-- <input id="tel" type="tel" itemid="0" placeholder="+79853452674" style="width:100%;display:none" /> 
                            </div>
                            <div class="col-xs-6 col-lg-3" style="padding:0 0 0 10px;">
                                <label id="emailH" style="display:none">E-mail</label>
                               <%-- <input id="email" type="email" placeholder="pochta@mail.ru" itemid="0" style="width:100%;display:none" /> 
                            </div>
                        </div>--%>
                        <!-- row -->
                    </div>
                    <button style="display: none" id="Adding" class="btn genBtn">Добавить</button>
                </div>
                <div class="col-md-4 col-xs-12">
                    <label>Жилая площадь по данному л/с, м<sup>2</sup></label>
                    <input id="LiveSq" type="number" min="0" style="width: 50%;" onchange="hideErrsMessage2(this)" onkeyup="hideErrsMessage2(this)" />

                    <label>Общая площадь по данному л/с, м<sup>2</sup></label>
                    <input id="GenSq" type="number" min="0" style="width: 50%;" onchange="hideErrsMessage2(this)" onkeyup="hideErrsMessage2(this)" />

                    <label>Общая площадь без летних зон по данному л/с, м<sup>2</sup></label>
                    <input id="LiveSqB" type="number" min="0" style="width: 50%;" onchange="hideErrsMessage2(this)" onkeyup="hideErrsMessage2(this)" />

                    <label>Количество комнат</label>
                    <input type="number" min="0" onchange="hideErrsMessage2(this)" onkeyup="hideErrsMessage2(this)" id="AmRoom" />
                </div>
            </div>
            <!-- row-->
        </div>
        <!-- tab1 -->


    </div>
    <!-- tab-content -->
    <div style="clear: both; height: 20px;">&nbsp;</div>


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
                    <div class="col-md-1 onbegin" >
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
