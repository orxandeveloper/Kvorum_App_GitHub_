<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="CreateDisp.aspx.cs" Inherits="Kvorum_App.Client_Admin.CreateDisp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .foto-disp {
            width: 40%
        }

        .objcts {
            overflow: auto;
            height: 200px;
        }

        .pointer {
            cursor: pointer
        }
        .SImage{
                border-bottom: 10px solid #D11B25;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script>
        $(document).ready(function () {
            $('.col-lg-9half').toggleClass('bgWhite');
            $('.col-lg-9half').toggleClass('bgLightGrey3');


            // Select2
            /*
            $('div[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            console.log('tabs');
            changeSelect();
        })
        
        function changeSelect() {
            $("select.select2").select2({
                tags: true
            })
        }
        	
        if ($('select').data('select2')) {
           $('select').select2('destroy');
         }	
        	
            $("select.select2-hidden-accessible").select2('destroy');
        	
            elm.bind("$destroy", function () {
                if (elm.hasClass('.select2-offscreen')) {
                    elm.select2("destroy");
                }
            });*/
        });

    </script>

    <div class="row w-100 m-0">
        <div class="col-sm-5 m-0">
            <!-- 1st block -->


            <div class="bgWhite rounded16 mt-4 ml-3 p-4 shadow">
                <div class="flexHoriz w-100 mb-4">
                    <h3 class="font18b " id="PageH">Создание диспетчерской</h3>
                    <a id="DeletePOM" href="#" role="button" class="create font18b position-relative ml-auto" style="display: none;">
                        <img src="../img/ic-bin.svg" class="mr-3 position-absolute d-flex ml-n4" alt="" />
                        <!--<i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;-->
                        Удалить
                    </a>
                </div>
                <div class="flexHoriz justify-content-between mt-3">

                    <div class="posRel h56 rounded-lg w-100">
                        <input type="text" id="DispName" class="DispName" required="required">
                        <label for="DispName" class="transp backLab">Название диспетчерской</label>
                    </div>

                </div>

                <div class="flexHoriz justify-content-between mt-3">
                    <div class="posRel h56 rounded-lg w-100">
                        <input type="tel" id="telDisp" disabled="disabled">
                        <label for="telDisp" class="transp backLab">Номер телефона</label>
                    </div>
                </div>
                <div class="flexHoriz justify-content-between ml-5 w-100">
                    <div id="fDiv1" class="posRel h-56 rounded-lg mb-4 w-32 pointer">

                        <img class="foto-disp" id="fotoDisp3" onclick="SImage(this)" src="../img/disp1.png">
                    </div>
                    <div id="fDiv2" class="posRel h56 rounded-lg mb-4 w-32 pointer">

                        <img class="foto-disp" id="fotoDisp2" onclick="SImage(this)" src="../img/disp2.png">
                    </div>
                    <div id="fDiv3" class="posRel h56 rounded-lg mb-4 w-32 pointer">
                        <img class="foto-disp" id="fotoDisp1" onclick="SImage(this)" src="../img/disp3.png">
                    </div>
                </div>

                <div class="flexHoriz justify-content-between mt-3">
                    <div class="posRel h56 rounded-lg w-32">
                        <button id="filesB" class="btn3 btn1 h48 w-100 outline shadow-none"><span>Выберите Файл</span></button>
                        <input class="knop ml-2" id="files" style="display: none" type="file">
                    </div>
                </div>
                <div class="flexHoriz w-100 mt-4">
                    <button id="saveD" class="btn btn1 ml-3">Сохранить</button>
                    <button class="btn btn1 ml-3" id="saveActD">Сохранить и активировать</button>
                    <button class="btn btn1 outline shadow-none ml-3" id="backD">Назад</button>
                    <%--  <button class="btn btn1 outline shadow-none ml-auto" id="backAppart">Сохранить и активировать</button>--%>
                </div>
            </div>
        </div>

        <div class="col-lg-7 m-0" id="AllLs">

            <div id="ls" class="ls" itemid="0">
                <div class=" h60 w-100 bgWhite shadow rounded16 pl-3 mt-4 pr-3 ">
                    <ol class="list-unstyled list-inline flexHoriz te-menu m-0 h-100 ">
                        <li id="ObjLi" onclick="OpenTab(1,this)" class="w200 mr-3 h-100 m-0 active  pointer">
                            <a class=" font-weight-bold">Объекты</a>
                        </li>
                        <li id="AccLi" onclick="OpenTab(2,this)" class="w200 mr-3 h-100 m-0  pointer">
                            <a class=" font-weight-bold">Учетные записи</a>
                        </li>
                    </ol>
                </div>

                <div data-tabid="1"  class="w-100 flexHoriz flex-wrap bgWhite shadow rounded16 p-4 mt-4">
                    <div class="flexHoriz justify-content-between mt-3 w-100">

                        <div class="posRel h56 rounded-lg w-32">
                            <select id="prj"  required="required">
                                <option value="0">Выберите проект</option>
                            </select>
                            <label for="rnum" class="transp backLab">Проект</label>
                        </div>
                        <div class="posRel h56 rounded-lg ml-3 w-75">
                            <input id="SObj" class="SObj" >
                            <label for="SObj" class="">Найти объект</label>
                        </div>
                    </div>

                    <div id="objcts"  class="w-100 shadow rounded objcts">
                    </div>
                    <div class="flexHoriz w-100 mt-4">
                        <button class="btn btn1 mr-3 genBtn addBtn" id="AddOb" style="float: right;">Создать объект</button>
                    </div>
                </div>
            </div>

            <div data-tabid="2" style="display: none !important" data-focus="true" class="w-100 flexHoriz flex-wrap bgWhite shadow rounded16 p-4 mt-4">

                <div class="flexHoriz justify-content-between mt-3 w-100">

                    <div class="posRel h56 rounded-lg w-50">

                        <label for="rnum" class="">Доступрные учетные записи <strong>Диспетчера</strong></label>
                    </div>
                    <div class="posRel h56 rounded-lg ml-3 w-40">
                        <input id="SDispatcher" class="SDispatcher">
                        <label for="SDispatcher" class="">Поиск Диспетчеров</label>
                    </div>
                </div>
                <div id="Disps" class="w-100 shadow rounded objcts">
                </div>

                

                <div class="flexHoriz justify-content-between mt-5 w-100">

                    <div class="posRel h56 rounded-lg w-50">

                        <label for="rnum" class="">Доступрные учетные записи <strong>Исполнителей</strong></label>
                    </div>
                    <div class="posRel h56 rounded-lg ml-3 w-40">
                        <input id="S_Spes" class="countR">
                        <label for="S_Spes" class="">Поиск Исполнителей</label>
                    </div>
                </div>
                <div id="Spess" class="w-100 shadow rounded objcts">
                    
                </div>

                   <div class="flexHoriz justify-content-between mt-5 w-100">

                    <div class="posRel h56 rounded-lg w-50">

                        <label for="rnum" class="">Доступрные учетные записи <strong>Ответсвенного</strong></label>
                    </div>
                    <div class="posRel h56 rounded-lg ml-3 w-40">
                        <input id="S_Resps" class="countR">
                        <label for="S_Resps" class="">Поиск Ответсвенных</label>
                    </div>
                </div>
                <div id="Resps" class="w-100 shadow rounded objcts">
                 
                </div>
                 <div class="flexHoriz w-100 mt-4">
                        <button class="btn btn1 mr-3 genBtn addBtn" id="AddAcc" style="float: right;">Создать учетную запись</button>
                    </div>
            </div>

        </div>



    </div>
    <!-- 2 block -->
  
    
    <!-- main -->


</asp:Content>
