<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="RegisterUO.aspx.cs" Inherits="Kvorum_App.Client_Admin.RegisterUO" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/StyleSheet.css" rel="stylesheet" />
    <link href="css/Reestr_obektov.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 
                
    <div class="content-title">
                <h2>Управляющие организации</h2>
          
                <div class="button UO">
                    <a class="create" href="CreateOrg.aspx"><i class="fa fa-plus-square-o" aria-hidden="true"></i>&nbsp;Создать </a>
                </div>

                <div class="reestr reestr-UO">
                    <table class="table">
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

                         
                    </tbody></table>
                </div>
            </div>


                 
    <script>
        function DetailUo(Uo) {
            sessionStorage.setItem("UOID", Uo);
           // alert(sessionStorage.getItem("UOID"))
        }
    </script>
</asp:Content>
