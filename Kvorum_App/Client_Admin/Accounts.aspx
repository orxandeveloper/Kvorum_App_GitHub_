<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="Accounts.aspx.cs" Inherits="Kvorum_App.Client_Admin.Accounts" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<div class="p-4">

        <h2 class=" font24b textBlack ml-0 pb-4">Учетные записи клиента</h2> <!-- h2New -->

     
 </div>
        <div class="row w-100 m-0 min-vh-100">
            <div class="col-sm-12 p-0">

                <div  id="TableTools" class="flexHoriz w-100 m-0 p-4">
                    <div class=" w-15 mr-3">
                        <div id="ListLength" class="posRel mb-0 mr-3">
                   
                        </div>

                    </div>



                    <form id="SearchForTable" class="shadow-in border-wh mb-0 text-left w-25 h56 te-posrel rounded-lg bgLightGrey3">
                        <div class="ml-2 pl-2 transp border-0">
                            <img src="../../img/search-ic.svg" class="w18" alt="">
                        </div>
                    </form>

                    <button onclick="GotoCreateFunction_C('CreateAccount.aspx')" class="btn btn1 mb-0 outline shadow-none w56 h56 flexCenter ml-auto">
                        <img src="../../img/ic-plus.svg" class="w16 reddishSvg" alt=""></button>
                    <div class="ml-auto mb-0  w-15 h56">
                  
                    </div>
 
                </div>
                <div class="overflowX w-100">

					<table class="mngTable w-100" id="Accounts">
						<thead class="bgLightGrey">
                            <tr>
                                <th>Логин ID</th>
                                <th>Наименование (ФИО)</th>
                               
                                <th>Телефон</th>
                                <th>E-mail</th>
                                <th>Модуль</th>
                                <th>Роль</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>


             
            </div>
        </div>
</asp:Content>
