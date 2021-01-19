<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="Disp.aspx.cs" Inherits="Kvorum_App.Client_Admin.Disp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Диспетчерские</h2>
    <div class="button">
        <a id="myBtn" href="CreateDisp.aspx" role="button" class="create"><i class="fa fa-plus-square-o" aria-hidden="true"></i>&nbsp;Создать</a>
    </div>

    <form runat="server">
        <ul class="dispList">
     
           
             
            
        </ul>
    </form>
    <script>
        function Activation(e, DId)
        {
            var obj = {
                D: DId
            };
            //alert(JSON.stringify(obj));

            $.ajax({
                type: "POST",
                url: "Disp.aspx/Activation",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var log_Id = sessionStorage.getItem("Log");
                    var DName = $(e).parent().find('a').find('h4').text();
                  //  var Id = sessionStorage.getItem("Clien_ID")
                    SaveLog("Активировать", "Простое", "Администратор", "Клиентское администрирование", "Активирована диспетчерская (" + DName + ")", log_Id);
                    $(e).hide();

                },

                error: function (r) {
                    //alert("Error");
                    console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                },
                failure: function (r) {
                    alert("FAIL");
                }
            });
        }
        function EdFunc(D_Id) {
           
            sessionStorage.setItem("Disp_ID", D_Id)
            window.location.href ="EditDisp.aspx"

        }

    </script>
</asp:Content>
