<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="enter.aspx.cs" Inherits="WcfServices.WebForm2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <style type="text/css">
        .log {
    position: fixed; /* or absolute */
    top: 50%;
    left: 50%;
    width: 202px;
    height:100px;
    margin: -50px 0 0 -100px;
    background: #f0f0f0;
    border-radius : 5px;
    border-color:cadetblue;
    border-style: solid;
    border-width: 2px;
       }
        .head {
            position: relative; /* or absolute */
    width: 200px;
    height:20px;
    background: cadetblue;
    border-top-left-radius : 2px;
    border-top-right-radius : 2px;
    border-color:cadetblue;
    border-style: solid;
    border-width: 1px;
    align-content:center;
    text-align:center;
        }
        .head-text {
            align-content:center;
            text-align:center;
            vertical-align:middle;
            font-family:sans-serif;
            color:whitesmoke;
            font-weight:bold;
            font-size: 12px;
        }
        .inp {
            marign: 5px;
            width:110px
        }
        .auto-style1 {
            width: 11px;
        }
        .lbl {
            padding:10px;
            align-content:center;
            text-align:center;
            vertical-align:middle;
            font-family:sans-serif;
            color:cadetblue;
            font-weight:bold;
            font-size: 12px;
        }
        .btn {
    position: inherit; /* or absolute */
    width: 100px;
    height:20px;
    background: cadetblue;
    border-radius : 2px;
    border-color:cadetblue;
    border-style: solid;
    border-width: 1px;
    text-align:center;
    vertical-align:middle;
    font-family:sans-serif;
    color:whitesmoke;
    font-weight:bold;
    font-size: 12px;
    left:50%;
    cursor:pointer;
        }
        </style>
</head>
    

<body>
    <form id="form1" runat="server">
        <div id="log" class="log">
            <div class="head"> 
                <span class="head-text">Авторизация</span>
            </div>
            <table style="width:100%">
                <tr><td class="auto-style1"><label class="lbl">Логин:</label></td><td><input class="inp" type="text"/></td></tr>
                <tr><td class="auto-style1"><label class="lbl">Пароль:</label></td><td><input class="inp" type="password"/></td></tr>
                <tr><td colspan="2" style="align-content:center; text-align:center; vertical-align:middle"><input class="btn" type="submit" value="ВХОД" runat="server"/></td></tr>
            </table>            
            <br />            
        </div>
    </form>
</body>
</html>
