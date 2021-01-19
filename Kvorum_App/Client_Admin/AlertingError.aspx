<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AlertingError.aspx.cs" Inherits="Kvorum_App.Client_Admin.AlertingError" %>

<!DOCTYPE html>

<html ><%--xmlns="http://www.w3.org/1999/xhtml"--%>
<head runat="server">
    <title></title>
    <style>
        .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 25%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
    from {top:-300px; opacity:0} 
    to {top:0; opacity:1}
}

@keyframes animatetop {
    from {top:-300px; opacity:0}
    to {top:0; opacity:1}
}

/* The Close Button */
.close {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.modal-header {
    padding: 2px 16px;
    background-color: #E6E6FA;
    color: black;
}

.modal-body {padding: 2px 16px;}

.modal-footer {
    padding: 2px 16px;
    background-color: #E6E6FA;
    color: black;
}
</style>
</head>
<body>
  <div id="myModal" class="modal" style="z-index: 13;">

  <!-- Modal content -->
  <div class="modal-content">
    <div class="modal-header">
      <span class="close" id="close">×</span>
      <h2 id="mh" style="text-align: left;">Modal Header</h2>
    </div>
    <div class="modal-body" style="height: 100px;height: 100px;padding: 15px;/* min-width:100px; */display: inline-block;">
      <p id="txt" style="font-size: 23px;"></p>
      
    </div>
    <div class="modal-footer" style="text-align: left;">
      <h3 id="mf">Modal Footer</h3>
    </div>
  </div>

</div>
    <script src="js/jquery-1.9.1.js"></script>
     <%-- <script src="http://code.jquery.com/jquery-1.9.1.js"></script>--%>
    <script src="js/Client_Utilities.js"></script>
</body>
</html>
