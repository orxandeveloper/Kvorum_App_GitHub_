<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="MyResources.aspx.cs" Inherits="Kvorum_App.Client_Admin.MyResources" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%-- <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>КВОРУМ</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/Navigation-Clean1.css">
    <link rel="stylesheet" href="assets/css/styles.css">--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   <h2>Мои ресурсы</h2>
  
                        <table class="table">
                            <thead>
                                <tr>
                                    <th style="width:50%;">Название ресурса</th>
                                    <th style="width:25%;">Тип списания</th>
                                    <th style="width:25%;">Осталось </th>
                                </tr>
                            </thead>
                            <tbody id="mr_">
                                
                            </tbody>
                        </table>
          
<%--    <script src="../js/jquery.min.js"></script>
    <script src="../bootstrap/js/bootstrap.min.js"></script>--%>
    <script>
        function getRDetail(R_Id)
        {
            sessionStorage.setItem("R_Id", R_Id)
        }
    </script>
</asp:Content>
