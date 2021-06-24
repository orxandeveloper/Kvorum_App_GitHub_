<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="RegisterUO.aspx.cs" Inherits="Kvorum_App.Client_Admin.RegisterUO" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="p-4">

        <h2 class=" font24b textBlack ml-0 pb-4">Управляющие организации</h2>
        <!-- h2New -->


    </div>
    <div class="row w-100 m-0 min-vh-100">
        <div class="col-sm-12 p-0">

            <div id="TableTools" class="flexHoriz w-100 m-0 p-4">
                <div class=" w-15 mr-3">
                    <div id="ListLength" class="posRel mb-0 mr-3">
                    </div>

                </div>



                <form id="SearchForTable" class="shadow-in border-wh mb-0 text-left w-25 h56 te-posrel rounded-lg bgLightGrey3">
                    <div class="ml-2 pl-2 transp border-0">
                        <img src="../../img/search-ic.svg" class="w18" alt="">
                    </div>
                </form>

                <button onclick="GotoCreateFunction_C('CreateOrg.aspx')" class="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto">
                    <img src="../../img/ic-plus.svg" class="w16 reddishSvg" alt=""></button>
                <div class="ml-auto mb-0  w-15 h56">
                </div>

            </div>
            <div class="overflowX w-100">
                <table class="table" id="ManagerCompany">
                    <thead>
                        <tr>
                            <th>Наименование организации</th>
                            <th>ИНН</th>
                            <th>ОГРН/ОГРНИП</th>
                            <th>КПП</th>
                            <th>ОКПО</th>
                            <th>Юридический адрес</th>
                        </tr>
                    </thead>
                    <tbody id="uos">
                    </tbody>
                </table>
            </div>



        </div>
    </div>
</asp:Content>
