<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="CreateAccount.aspx.cs" Inherits="Kvorum_App.Client_Admin.CreateAccount" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row w-100 m-0 min-vh-100">
        <div class="col-sm-12 p-0">

            <div class="row p-4 m-0">
                <div class="col-lg-6 col-sm-12">
                    <div class="bgWhite rounded16 shadow w-100 p-4">
                        <div class="flexHoriz w-100" id="infoCount">
                            <h2 id="Hacc" class="font24b textBlack">Создание учетной записи</h2>
                            <button id="DeleteAcc" style="display: none" class="transp border-0 ml-auto">
                                <img src="../img/ic-bin.svg" class="mr-3 position-absolute d-flex ml-n4 " alt="" />
                                <span id="delspan" class="font16b reddish">Удалить</span>
                            </button>
                        </div>
                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="login" disabled="disabled">
                                <label for="login" class="transp backLab">Login</label>
                            </div>

                        </div>
                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-75 mb-3">
                                <input type="password" required="required" class="pass" id="pass">
                                <label for="pass" class="transp backLab">Пароль</label>
                            </div>
                            <div class="posRel w-48 mb-3">
                                <input type="button" name="name" class="btn btn1 h56 outline shadow-none flexCenter" id="gen" value="Сгенерировать пароль">
                            </div>
                        </div>
                        <div class="w-100 flexHoriz flex-wrap justify-content-between">
                            <div class="posRel w-100 mb-3">
                                <input type="text"  required="required" class="fio" id="fio">
                                <label for="fio" class="transp backLab">Наименование (ФИО)</label>
                            </div>


                        </div>
                        <div class="w-100 flexHoriz flex-wrap justify-content-between">
                            <div class="posRel w-100 mb-3">
                                <input type="text" onkeyup="MaskPhone(this)" required="required" class="phone1" id="phone1">
                                <label for="phone1" class="transp backLab">Мобильный телефон</label>
                            </div>


                        </div>
                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" required="required" class="email" id="email">
                                <label class="transp backLab" for="email">E-mail</label>
                            </div>
                        </div>
                        <div id="mrss" itemid="0" class="mrss w-100 flexHoriz flex-wrap justify-content-between">
                             <div class="posRel w-40" itemid="0">
                                    <select class="mdls" onchange="GetRoleByModule(0,0,0)" id="m0" itemid="0">
                                        <option value="0" id="">Выберите Модуль</option>
                                    </select>
                                   <label for="m0" class="transp backLab">Модуль</label>
                                </div>
                                <div class="posRel w-40" itemid="0">
                                    <select class="rls" onchange="ChangeRole(0)" itemid="0">
                                        <option value="0">Выберите Роль</option>
                                    </select>
                                     <label for="r0" class="transp backLab">Роль</label>
                                </div>
                                <div class="posRel w-20" style="display:none" itemid="0">
                                    <input class="knp del btn btn1 h56 outline shadow-none flexCenter" onclick="delElements(0)" type="button" itemid="0" value="Удалить">
                                </div>
                           
                        </div>
                       <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-20 mb-3">
                              <input class="knp1 deActiveAdd btn btn1 h56 outline shadow-none flexCenter" onclick="AddMRSS()" disabled="disabled" type="button" value="Добавить">
                               
                            </div>
                        </div>
                        <div class="row mt-3 mb-3" id="btns">
                            <div class="col-sm-12 ">
                                <button id="CreateAcc" class="btn btn1 h56 mr-2" ><strong>Создать новую учетную запись</strong></button>

                                <button id="backAcc" class="btn btn1 h56 outline shadow-none flexCenter"  >Назад</button>

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
     

</asp:Content>
