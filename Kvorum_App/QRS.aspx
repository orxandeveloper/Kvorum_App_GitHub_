<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="QRS.aspx.cs" Inherits="Kvorum_App.QRS" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style>.tabService { 
        display:inline-block; 
        width: 31%; 
    text-align: center; 
    padding: 0.5%; 
    background-color: #fff; 
    border: 1px dashed #ccc; 
    
        font-style: normal; 
        font-family: Roboto, sans-serif; 
        font-size: 14px; 
        position: relative; 
        } 

.qr { 
        display: block; 
        margin: 0 auto; 
    width: 250px; 
    height: 250px; 
        } 
        
.headerServ { 
        color: #000; 
        display:block; 
        position: absolute; 
        bottom: 0; 
        line-height:1em;   
        width: 95%; 
        text-align: center; 
        height: 3em; 
        bottom: 0; 
        } 

@media print { 
        .tabService { height: 6cm;} 
        .qr {width: 5cm; height: auto;} 
}
</style>
</head>
<body>
    <form id="form1" runat="server">
       
    </form>
</body>
</html>
