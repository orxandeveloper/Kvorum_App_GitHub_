<%@ Page Title="" Language="C#" MasterPageFile="~/Super_Disp/Super.Master" AutoEventWireup="true" CodeBehind="DispRequests.aspx.cs" Inherits="Kvorum_App.Super_Disp.DispRequests" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
  
    <div class="col-lg-9half col-sm-12 p-0 min-vh-100 bgLightGrey3  " id="contentRegister">
          <style>
        .NewRequest {
            background: rgb(232,232,232) !important
        }
       
    </style>
        <span class="h90"></span>
     




        

        <script>
            $(document).ready(function () {

                var swiper = new Swiper(".swiper-container3", {
                    slidesPerView: 'auto',
                    loop: false,
                    spaceBetween: 20
                }
                );
            });
        </script>


        <%--</div>--%>


        <div class="bgWhite row w-100 m-0 ">
            <div class="col-sm-12 p-0">

                <div id="TableTools" class="flexHoriz w-100 m-0 p-3 justify-content-between flexHoriz">
                    <div id="ListLength" class="posRel w-15 mb-0 mr-3">
                        <%--<select id="jk" class="h56 pt-0 mr-3 border  font-weight-normal">
                            <option value="0" selected>Показывать 20 записей</option>
                            <option value="1">Показывать 30 записей</option>
                        </select>--%>
                    </div>
                    <form id="SearchForTable" class="shadow-in border-wh mb-0 text-left w200 h56 te-posrel rounded-lg bgLightGrey3">
                        <div class="ml-2 pl-2 transp border-0">
                            <img src="../../img/search-ic.svg" class="w18" alt="">
                        </div>
                        <%-- <input class="w-100 transp border-0 ml-2 pr-2 pt-1" type="search" placeholder="Поиск заявки" aria-label="Search">--%>
                    </form>
                    <!--	<div class="flex-grow-1">&nbsp;</div> -->
                    <%-- <div class="ml-auto mb-0  posRel mr-3 w-15">
                        <select id="reg" class="h56 pt-0 border font-weight-normal">
                            <option value="0" selected>Красота и здоровье</option>
                        </select>
                        <!--<label for="reg" class="w-95">Статус</label> -->
                    </div>--%>
                    <%-- <div class="posRel mb-0  mr-3 w-15">
                        <select id="tip" class="h56 pt-0 border font-weight-normal">
                            <option value="0" selected>Услуга 1</option>

                        </select>
                        <label for="tip" class="w-95">Услуги</label>
                    </div>--%>
                    <%--  <div class="posRel mb-0 mr-3 w-15 ">
                        <select id="task" class="h56 border font-weight-normal">
                            <option value="0" selected>Группа услуг 1</option>

                        </select>
                        <label for="task" class="w-95">Группа услуг</label>
                    </div>--%>
                 <%--   <button class="btn2 btn1 mb-0 mr-3 outline shadow-none w56 h56 flexCenter ">
                        <img src="../../img/upload.svg" class="w16 reddishSvg" alt="" /></button>--%>
                       <button onclick="GotoCreateFunction()" class="btn2 btn1 mb-0 outline shadow-none w56 h56 flexCenter ">
                        <img src="../../img/ic-plus.svg" class="w16 reddishSvg" alt="" /></button>
                    <!--	<button class="btn btn1 outline shadow-none w42 h42 flexCenter">
					<img src="../../img/dreidots2.svg" class="" alt=""/></button>				-->
                </div>
                <div class="w-100 overflowX pt-1 pb-4">
                    <table class="mngTable w-100" id="DispSRequestTables">

                        <thead class="bgLightGrey">
                            <tr>
                                <th>№ Заявки </th>
                                <th>Заявитель</th>
                                <th>Адрес</th>
                                <th>№ помещения</th>
                                <th>Дата создания</th>
                                <th>Обращение абонента</th>
                                <th>Планируемая дата</th>
                                <th>Тип Заявок</th>
                                <th>Статус</th>
                                <th>Ответственный</th>
                                <th>Оплата</th>

                            </tr>
                        </thead>

                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="p-5 intern">
                </div>
                <!-- p-5 -->



            </div>
            <!-- main block -->
        </div>
        <!-- row -->
        </div>
</asp:Content>
