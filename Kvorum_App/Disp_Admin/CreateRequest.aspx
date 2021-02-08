<%@ Page Title="" Language="C#" MasterPageFile="~/Disp_Admin/Dispatcher.Master" AutoEventWireup="true" CodeBehind="CreateRequest.aspx.cs" Inherits="Kvorum_App.Disp_Admin.CreateRequest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

   <%-- <style>

        
ul, #myUL {
  list-style-type: none;
}

#myUL {
  margin: 0;
  padding: 0;
}

.caret {
  cursor: pointer;
  -webkit-user-select: none; /* Safari 3.1+ */
  -moz-user-select: none; /* Firefox 2+ */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}

.caret::before {
  content: "\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

.caret-down::before {
  -ms-transform: rotate(90deg); /* IE 9 */
  -webkit-transform: rotate(90deg); /* Safari */
  transform: rotate(90deg);  
}

.nested {
  display: none;
}

.active {
  display: block;
}
        .subMenu {
    height: 160px;
    border-style: double;
    border-color: #2b4b90;
    overflow:auto;
   
}
        .icon{
                width: 32px;
    float: left;
    margin-top: -2px;
    margin-right: 7px;
        }
    
    .accMenu
    {
        border-style: double;
    border-color: #2b4b90;
     cursor:pointer;
    }

    </style>--%>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="registerRequest" class="col-lg-9half col-sm-12 p-0 min-vh-100 bgLightGrey3  " runat="server"></div>

</asp:Content>
