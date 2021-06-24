<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="CreateOrg.aspx.cs" Inherits="Kvorum_App.Client_Admin.CreateOrg" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row w-100 m-0 min-vh-100">
        <div class="col-sm-12 p-0">

            <div class="row p-4 m-0">
                <div class="col-lg-6 col-sm-12">

                    <div class="bgWhite rounded16 shadow w-100 p-4">

                        <div class="flexHoriz w-100" id="infoCount">
                            <h2 id="meterNum" class="font24b textBlack">Создание Управляющей организации</h2>
                            <button id="delC" style="display: none" class="transp border-0 ml-auto">
                                <img src="../img/ic-bin.svg" class="mr-3 position-absolute d-flex ml-n4 " alt="" />
                                <span id="delspan" class="font16b reddish">Удалить организацию</span>
                            </button>
                        </div>



                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text"   required="required" class="Inn" id="INN" maxlength="10">
                                <label for="INN" class="transp backLab">ИНН*</label>
                            </div>

                        </div>


                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="OGRN" required="required" class="OGRN" maxlength="13">
                                <label for="OGRN" class="transp backLab">ОГРН *</label>
                            </div>

                        </div>



                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="NAME" required="required" class="NAME">
                                <label for="NAME" class="transp backLab">Наименование организации *</label>
                            </div>

                        </div>
                         <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="KPP" required="required" maxlength="9" class="KPP">
                                <label for="KPP" class="transp backLab">КПП *</label>
                            </div>

                        </div>

                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="OKPO" required="required" maxlength="10" class="OKPO">
                                <label for="OKPO" class="transp backLab">ОКПО *</label>
                            </div>

                        </div>
                        <div class="w-100 flexHoriz flex-wrap justify-content-between">
                            <h5>Юридический адрес</h5>
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="adr" required="required" class="adr" list="adrList">
                                <label for="adr" class="transp backLab">Область, город, район, улица</label>
                            </div>
                            <div class="w-100 mb-3">
                                <input id="manu" class="checkbox-item" type="checkbox">
                                <label for="manu">Ввести вручную</label>
                            </div>
                            <div class="posRel w-48">


                                <input type="text" required="required" class="DOM" id="DOM">
                                <label for="DOM" class="transp backLab">Дом</label>
                            </div>
                            <div class="posRel w-48">

                                <input type="text" required="required" class="KORP" id="KORP">
                                <label for="KORP" class="transp backLab">Строение/корпус</label>
                            </div>

                        </div>
                        <hr />
                        <h5>Банковские реквизиты</h5>
                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="bik" required="required" maxlength="9" class="bik">
                                <label for="bik" class="transp backLab">БИК  *</label>
                            </div>
                        </div>
                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" disabled="disabled" required="required" id="BNAMES" class="BNAMES">
                                <label for="BNAMES" class="transp backLab">Наименование банка</label>
                            </div>
                        </div>
                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" disabled="disabled" required="required" id="BKRSS" maxlength="20" class="BKRSS">
                                <label for="BKRSS" class="transp backLab">Корреспондентский счет</label>
                            </div>
                        </div>

                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="RS" maxlength="20" required="required" class="RS">
                                <label for="RS" class="transp backLab">Расчетный счет  *</label>
                            </div>
                        </div>
                        <hr />
                        <h5>Контактные данные</h5>
                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="tlf" class="tlf">
                                <label for="tlf" class="transp backLab">Номер телефона</label>
                            </div>
                        </div>
                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="Shopid" class="Shopid">
                                <label for="Shopid" class="transp backLab">Tinkoff ID</label>
                            </div>
                        </div>

                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="mail" class="mail">
                                <label for="mail" class="transp backLab">E-mail</label>
                            </div>
                        </div>

                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="vk" class="vk">
                                <label for="vk" class="transp backLab">Vkontakte:</label>
                            </div>
                        </div>
                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="ok" class="ok">
                                <label for="ok" class="transp backLab">Одноклассники:</label>
                            </div>
                        </div>
                         <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="fb" class="fb">
                                <label for="fb" class="transp backLab">Facebook:</label>
                            </div>
                        </div>
                         <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="tw" class="tw">
                                <label for="tw" class="transp backLab">Twitter:</label>
                            </div>
                        </div>

                        <div class="row mt-3 mb-3" id="btns">
                            <div class="col-sm-12 ">
                                <button class="btn btn1 h56 mr-2" id="SaveMO"><strong>Сохранить</strong></button>

                                <button class="btn btn1 h56 outline shadow-none flexCenter" id="back_O">Назад</button>

                                <a id="myBtn" href="#" role="button" style="display: none" class="create font18b position-relative delObj">
                                    <img src="../img/ic-bin.svg" class="mr-3 position-absolute d-flex ml-n4" alt="">
                                    <!--<i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;-->
                                    Удалить
                                </a>
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
