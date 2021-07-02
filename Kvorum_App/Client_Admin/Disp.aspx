<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="Disp.aspx.cs" Inherits="Kvorum_App.Client_Admin.Disp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .cursor{
            cursor:pointer
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="row w-100 m-0 min-vh-100">
        <div class="col-sm-12 p-0">

            <div class="row p-4 m-0">
                <div class="col-lg-12 col-sm-12">

                    <div class="bgWhite rounded16 shadow w-100 p-4 dispList">

                        <div class="flexHoriz w-100 mb-4">
                            <h3 class="font18b " id="PageH">Диспетчерские</h3>
                            <a id="DeletePOM" href="#" role="button" onclick="GotoCreateFunction_C('CreateDisp.aspx')" style="color: #D11B25" class="create font18b position-relative ml-auto" style="">
                                <%--  <img src="../img/ic-bin.svg" class="mr-3 position-absolute d-flex ml-n4" alt="">--%>
                                <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;
                        Создать
                            </a>
                        </div>

                        
              <%--          <div class="col-lg-6 col-md-12 mb-3">
                            <div class="row m-0 bgWhite rounded16 shade w-50 h-40 p-4 ">
                                <div class="col-md-12 col-sm-12 pl-0 pr-1 column-flex align-items-center">
                                    <img src="https://upravbot.ru/img/disp2.png" class="w177 " alt="">
                                    <button onclick="GotoHistory(36075)" class="btn3 btn1 h48 w-100 outline shadow-none"><span>История показаний</span></button>
                                </div>
                            </div>
                        </div>--%>
                        <!-- row -->
                    </div>
                    <!-- wrapper -->
                </div>
            </div>
            <!-- row -->
        </div>
    </div>
</asp:Content>
