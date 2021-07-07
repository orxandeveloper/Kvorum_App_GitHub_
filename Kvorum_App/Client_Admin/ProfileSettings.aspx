<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="ProfileSettings.aspx.cs" Inherits="Kvorum_App.Client_Admin.ProfileSettings" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .pointer{
            cursor:pointer
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
                            <h2 id="profilSettings" class="font24b textBlack mb-3">Настройки профиля</h2>

                        </div>
                      <div class="w-100 flexHoriz flex-wrap justify-content-between">
                            <div class="posRel w-100 mb-3">
                                <input type="text" required="required" class="FirstName" id="FirstName">
                                <label for="FirstName" class="transp backLab">Имя</label>
                            </div>
                        </div>
                        <div class="w-100 flexHoriz flex-wrap justify-content-between">
                            <div class="posRel w-100 mb-3">
                                <input type="text" required="required" class="SecondName" id="SecondName">
                                <label for="SecondName" class="transp backLab">Фамилия</label>
                            </div>
                        </div>
                        <div class="w-100 flexHoriz flex-wrap justify-content-between">
                            <div class="posRel w-100 mb-3">
                                <input type="text" class="MiddleName" id="MiddleName">
                                <label for="MiddleName" class="transp backLab">Отчество</label>
                            </div>
                        </div>


                          <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-85 mb-3">
                                <input type="text" disabled="disabled" required="required" id="email" class="email">
                                <label for="email" class="transp backLab">E-mail </label>
                            </div>
                            <div class="posRel w-24 mb-3 ml-3">
                                <a onclick="showNew(this,0,true)" class="flexHoriz pointer btn btn1 transp border flexCenter h-100 w-100">
                                    <img src="../img/tasks-ic-bl.svg" class="w24 reddishSvg mr-2" alt=""><p class="font14b mb-0">Изменить</p>

                                </a>
                            </div>
                        </div>
                        <div id="emailNewDiv" style="display: none !important" class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" required="required" id="emailNew" class="email">
                                <label for="email" class="transp backLab">Новый E-mail </label>
                            </div>
                        </div>
                       
                         <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-85 mb-3">
                                <input type="password" disabled="disabled" required="required" id="pass" class="pass">
                                <label for="pass" class="transp backLab">Пароль </label>
                            </div>
                          <div class="posRel w-24 mb-3 ml-3">
                                <a onclick="showNew(this,1,true)" class="flexHoriz pointer btn btn1 transp border flexCenter h-100 w-100">
                                    <img src="../img/tasks-ic-bl.svg" class="w24 reddishSvg mr-2" alt=""><p class="font14b mb-0">Изменить</p>

                                </a>
                            </div>
                        </div>
                         <div id="NRPassDiv" style="display: none !important" class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-50 mb-3 mr-3">
                                <input type="password" required="required" id="NPass" class="NPass">
                                <label for="NPass" class="transp backLab">Новый пароль</label>
                            </div>
                             <div class="posRel w-50 mb-3">
                                <input type="password" required="required" id="RPass" class="RPass">
                                <label for="RPass" class="transp backLab">Повторите новый пароль </label>
                            </div>
                        </div>
                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" onkeyup="MaskPhone(this)" required="required" id="tel" class="email">
                                <label for="tel" class="transp backLab">Мобильный телефон</label>
                            </div>
                        </div>
           
                        <h3 class="font16b mt-1">Сведения, необходимые для заключения договора</h3>
                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <select required="required" id="typE">
                                    <option value="0">Выберите вид организации</option>
                                    
                                </select>
                                <label for="typE" class="transp backLab">Вид организации</label>
                            </div>
                        </div>
                         <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="CompName" required="required" class="CompName">
                                <label for="CompName" class="transp backLab">Наименование организации *</label>
                            </div>

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
                                <input type="text" id="OKPO" required="required" maxlength="10" class="OKPO">
                                <label for="OKPO" class="transp backLab">ОКПО *</label>
                            </div>

                        </div>
                       
                         <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="KPP" required="required" maxlength="9" class="KPP">
                                <label for="KPP" class="transp backLab">КПП *</label>
                            </div>

                        </div>

                        
                        <div class="w-100 flexHoriz flex-wrap justify-content-between">
                            <h5 class="font16b mt-1">Юридический адрес</h5>
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="adr" required="required" class="adr" list="adrList">
                                <label for="adr" class="transp backLab">Область, город, район, улица</label>
                            </div>
                            <div class="w-100 mb-3" style="display:none">
                                <input id="manu" class="checkbox-item" type="checkbox">
                                <label for="manu">Ввести вручную</label>
                            </div>
                            <div class="posRel w-48">


                                <input type="text" required="required" class="DOM" id="DOM">
                                <label for="DOM" class="transp backLab">Дом</label>
                            </div>
                            <div class="posRel w-48">

                                <input type="text" class="KORP" id="KORP">
                                <label for="KORP" class="transp backLab">Строение/корпус</label>
                            </div>

                        </div>
                        <hr />
                        <h5 class="font16b mt-1">Реквизиты для оплаты услуг клиентами</h5>
                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="bik" required="required" maxlength="9" class="bik">
                                <label for="bik" class="transp backLab">БИК  *</label>
                            </div>
                        </div>
                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" disabled="disabled" required="required" id="BNAME" class="BNAME">
                                <label for="BNAME" class="transp backLab">Наименование банка</label>
                            </div>
                        </div>
                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" disabled="disabled" required="required" id="BKRS" maxlength="20" class="BKRS">
                                <label for="BKRS" class="transp backLab">Корреспондентский счет</label>
                            </div>
                        </div>

                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="RS" maxlength="20" required="required" class="RS">
                                <label for="RS" class="transp backLab">Расчетный счет  *</label>
                            </div>
                        </div>

                        
                        <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="INNB" maxlength="10" required="required" class="INNB">
                                <label for="INNB" class="transp backLab">ИНН банка</label>
                            </div>
                        </div>
                          <div class="flexHoriz justify-content-between mt-3">
                            <div class="posRel w-100 mb-3">
                                <input type="text" id="KPPB" maxlength="9" required="required" class="KPPB">
                                <label for="KPPB" class="transp backLab">КПП банка</label>
                            </div>
                        </div>

                        <div class="row mt-3 mb-3" id="btns">
                            <div class="col-sm-12 ">
                                <button class="btn btn1 h56 mr-2" id="SaveChanges"><strong>Сохранить изменения</strong></button>
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
