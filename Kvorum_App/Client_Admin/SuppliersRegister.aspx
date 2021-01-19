<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="SuppliersRegister.aspx.cs" Inherits="Kvorum_App.Client_Admin.SuppliersRegister" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
                   
    <div class="content-title">
                <h2>Поставщики</h2>
          
                <div class="button UO">
                    <a class="create" href="CreateSupplier.aspx"><i class="fa fa-plus-square-o" aria-hidden="true"></i>&nbsp;Создать </a>
                </div>

                <div class="reestr reestr-UO">
                    <table id="Supplierr" class="table">
                        <thead>
                            <tr>
                                <th>Сокращенное наименование</th>
                                <th>Адрес электронной почты </th>
                                <th>Телефон/факс</th>
                                <th>Шоп Id</th>
                                <th>Размер суммы удержания от суммы операции, в %</th>
                                <th>Договор оферты принят</th>
                            </tr>
                        </thead>
                        <tbody >

                         
                    </tbody></table>
                </div>
            </div>
</asp:Content>
