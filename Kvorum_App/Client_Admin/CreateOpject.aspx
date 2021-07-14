<%@ Page Title="" EnableViewState="false" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="CreateOpject.aspx.cs" Inherits="Kvorum_App.Client_Admin.CreateOpject" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .delObj {
            float: right;
            color: #D11B25;
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
        .closeProject {
            color: black;
            float: right;
            font-size: 28px;
            font-weight: bold;
            display: none
        }

            .closeProject:hover,
            .closeProject:focus {
                color: #000;
                text-decoration: none;
                cursor: pointer;
            }

        .modal-headerProject {
            padding: 2px 16px;
            background-color: white;
            color: white;
        }

        .modal-bodyProject {
            padding: 2px 16px;
            height: 100px;
            height: 100px;
            padding: 15px;
            width: auto;
        }

        .uoProject {
        }

        .pName {
        }

        .AddProject {
            float: left;
            width: 25%;
            height: 78%;
            background-color: white;
            color: black;
            font-weight: 700;
        }

        .modal-footerProject {
            padding: 2px 16px;
            color: white;
            height: 45px;
            text-align: left;
            background-color: white;
            margin-top: 44px;
            width: 100%;
        }

        .CancelProject {
            width: 25%;
            float: right;
            height: 78%;
            background-color: white;
            color: black;
            font-weight: 700;
        }

        .rmFOr {
            border: 1px solid #000;
            box-shadow: 3px 4px 5px rgba(0,0,0,0.3);
            height: 65px;
            overflow: auto;
            width: 67.5%;
        }

        .adrDiv {
            overflow: auto;
            height: 200px;
        }
        .adrH:hover{
            background-color:#D11B25;
            color:white;
            cursor:pointer;
            
                
        }
        .searched{
            background-color:yellow
        }
        .searched:hover{
            background-color:#D11B25;
            color:white;
            cursor:pointer;
        }
        #adrs{
                overflow: auto;
    height: 200px;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row w-100 m-0 min-vh-100">
        <div class="col-sm-12 p-0">

            <div class="row p-4 m-0">
                <div class="col-lg-6 col-sm-12">

                    <div class="bgWhite rounded16 shadow w-100 p-4">

                        <div class="flexHoriz w-100" id="infoCount">
                            <h2 id="meterNum" class="font24b textBlack">Создание объекта</h2>
                            <button id="delC" style="display: none" class="transp border-0 ml-auto">
                                <img src="../img/ic-bin.svg" class="mr-3 position-absolute d-flex ml-n4 " alt="" />
                                <span id="delspan" class="font16b reddish">Удалить объект</span>
                            </button>
                        </div>

                        <div class="row mt-3 mb-3" id="btns">
                            <div class="col-sm-12 ">






                                <button class="btn btn1 h56 mr-2" id="savO"><strong>Сохранить</strong></button>

                                <button class="btn btn1 h56 outline shadow-none flexCenter" id="back_O">Назад</button>

                                <a id="myBtn" href="#" role="button" style="display: none" class="create font18b position-relative delObj">
                                    <img src="../img/ic-bin.svg" class="mr-3 position-absolute d-flex ml-n4" alt="">
                                    <!--<i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;-->
                                    Удалить
                                </a>
                            </div>

                        </div>

                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <select id="uo">
                                    <option value="0">Выберите Управляющую организацию</option>
                                </select>
                                <label for="uo" class="transp backLab">Управляющая организация</label>
                            </div>
                            <div class="posRel w-80 mb-3">
                                <input type="button"  name="name" class="btn btn1 h56 outline shadow-none flexCenter" id="DobUo" value="Добавить">
                            </div>
                        </div>


                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <select data-b="0" id="Projects">
                                    <option value="0">Выберите Проект</option>
                                </select>
                                <label for="Projects" class="transp backLab">Проект</label>
                            </div>
                            <div class="posRel w-80 mb-3">
                                <input type="button" name="name" class="btn btn1 h56 outline shadow-none flexCenter" style="float: inherit; width: auto;" id="DobProject" value="Добавить">
                            </div>
                        </div>




                        <div class="w-100 flexHoriz flex-wrap justify-content-between">
                            <div class="posRel w-100 mb-0">
                                <%---3--%>
                                <input type="text" onkeyup="DatData_GetAdressByText(this)" id="adr" class="adr" list="adrList">
                                <label for="adr" class="transp backLab">Область, город, район, улица</label>
                            </div>
                            <div id="adrs" style="display:none" class="w-100 shadow rounded8 objcts p-2 position-relative">
                            
                            </div>
                            <div class="w-100 mb-3 mt-3">
                                <input id="manu" onclick="removeSearch(this)" class="checkbox-item" type="checkbox">
                                <label for="manu">Ввести вручную</label>
                            </div>
                            <div class="posRel w-48">


                                <input type="text" class="dom" id="dom">
                                <label for="dom" class="transp backLab">Дом</label>
                            </div>
                            <div class="posRel w-48">

                                <input type="text" class="korp" id="korp">
                                <label for="korp" class="transp backLab">Строение/корпус</label>
                            </div>

                        </div>
                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <select id="uob">
                                    <option value="0">Выберите Управляющего объекта </option>
                                </select>
                                <label class="transp backLab" for="uob">Управляющий объекта</label>
                            </div>
                            <div class="posRel w-80 mb-3">
                                <input type="button" name="name" class="btn btn1 h56 outline shadow-none flexCenter" id="DobUob" value="Добавить">
                            </div>

                        </div>


                        <div>
                            <label>Изображение объекта</label>
                            <input type="file" id="files">
                            <div class="flexHoriz w-100">
                                <img id="imgObj" src="img/brickdom.png" class="w100">
                            </div>
                        </div>




                        <!-- row -->
                    </div>
                    <!-- wrapper -->
                </div>
            </div>
            <!-- row -->
        </div>
    </div>

    <div id="AddProjectModal" class="modalProject" style="display: none;">

        <!-- Modal content -->
        <div class="modal-contentProject  bgWhite rounded16 p-4 shadow">
            <div class="modal-headerProject  bgWhite flexHoriz">
                <%--  <span class="closeProject" id="closeUplC">×</span>--%>
                <label id="mhProject" class="textBlack font24b w-90 mb-0">Создать Проект</label>
                <span class="close2 ml-auto mr-3" id="closeUplC">
                    <img src="../img/close.svg" alt="Закрыть" class="w24">
                </span>
            </div>
            <div class="modal-bodyProject  mt-4">
                <%--  <label>Выберите Управляющую организацию</label>--%>
                <select id="uoProject" class="uoProject">
                </select>
                <br>
                <div class="posRel w-48">
                    <input type="text" id="pName" class="pName">
                    <label for="pName" class="transp backLab">Проект</label>
                </div>


            </div>
            <div class="modal-footerProject">


                <button class="btn btn1 h56 mr-2" id="AddProject"><strong>Добавить</strong></button>
                <button class="btn btn1 h56 outline shadow-none flexCenter CancelProject" id="CancelProject">Назад</button>
            </div>
        </div>

    </div>
</asp:Content>
