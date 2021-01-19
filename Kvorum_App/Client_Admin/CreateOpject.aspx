<%@ Page Title="" EnableViewState="false" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="CreateOpject.aspx.cs" Inherits="Kvorum_App.Client_Admin.CreateOpject" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .modalProject {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
             /* Sit on top z-index: 1;*/
            padding-top: 100px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
                                     /* Black w/ opacity */
            z-index: 2000; 
            background-color: rgba(9, 118, 255, 0.4);
        }

        /* Modal Content */
        .modal-contentProject {
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
        .mhProject {
            text-align: left;
            color: black
        }
        /* Add Animation */
        @-webkit-keyframes animatetop {
            from {
                top: -300px;
                opacity: 0
            }

            to {
                top: 0;
                opacity: 1
            }
        }

        @keyframes animatetop {
            from {
                top: -300px;
                opacity: 0
            }

            to {
                top: 0;
                opacity: 1
            }
        }

        /* The Close Button */
        .closeProject {
            color: black;
            float: right;
            font-size: 28px;
            font-weight: bold;
            display:none
        }

            .closeProject:hover,
            .closeProject:focus {
                color: #000;
                text-decoration: none;
                cursor: pointer;
            }

        .modal-headerProject {
            padding: 2px 16px;
            background-color: white;
            color: white;
        }

        .modal-bodyProject {
            padding: 2px 16px;
            height: 100px;
            height: 100px;
            padding: 15px;
            width: auto;
        }
        .uoProject {
             
        }
        .pName {
        
        }
        .AddProject {
        float: left; 
        width: 25%; 
        height: 78%; 
        background-color: white; 
        color: black; 
        font-weight: 700;
        
        }
        .modal-footerProject {
            padding: 2px 16px;
            
            color: white;
            height: 45px;
            text-align: left;
            background-color: white;
            margin-top: 44px;
            width: 100%;
        }
        .CancelProject {
            width: 25%; 
            float: right; 
            height: 78%; 
            background-color: white;
            color: black; 
            font-weight: 700;
        }
        .rmFOr{

        border: 1px solid #000;
    box-shadow: 3px 4px 5px rgba(0,0,0,0.3);
    height: 65px;
    overflow: auto;
    width: 67.5%;
}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <h2 id="h_2">Создание объекта</h2>

    <div class="button">
        <a id="myBtn" href="#modal" role="button" class="create"><i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;Удалить</a>
    </div>
    <div style="clear: both;"></div>

    <form runat="server">
        <label class="managerBox" id="sslkText" style="display: none">Страница дома</label>
        <%-- <span id="uobS" style=" font-weight:bold;color:red;display:none">""</span>--%>
        <a id="slk" target="_blank" href="#" style="display: none"></a>
        <span id="uoS" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <label for="uo">Управляющая организация</label>

        <select id="uo" style="width: 48%">
            <option value="0">Выберите Управляющую организацию</option>
        </select>
        
        <input type="button" name="name" class="btn btn-default genBtn" style="float: inherit; width: auto;" id="DobUo" value="Добавить" />
         <label for="uo2">Проект</label>

        <select data-b="0" id="Projects" style="width: 48%">
            <option value="0">Выберите Проект</option>
        </select>
         <input type="button" name="name" class="btn btn-default genBtn" style="float: inherit; width: auto;" id="DobProject" value="Добавить" />
        <h4>Адрес объекта</h4>
        <div style="/* border: groove */padding: 5px 8px; border: 1px solid #ddd; background-color: #F4F4F8;">
            <label for="adr">Область, город, район, улица</label>
            <span id="adrS" style="float: right; font-weight: bold; color: red; display: none">""</span>
            <input type="text" id="adr" list="adrList">
            <datalist id="adrList">
            </datalist>

            <input id="manu" style="margin-left: inherit;" type="checkbox">
            <label for="manu" class="checkBx">Ввести вручную</label>
            <div class="row" style="margin-right: -15px;">
                <div class="col-xs-6">
                    <label for="DOM">Дом</label>
                    <span id="domS" style="float: right; display: none; font-weight: bold; color: red;">""</span>
                    <input type="text" id="dom">
                </div>
                <div class="col-xs-6">
                    <label for="KORP">Строение/корпус</label>
                    <input type="text" id="korp">
                </div>
            </div>
        </div>



        <span id="uobS" style="font-weight: bold; color: red; display: none; float: right;">""</span>
        <label class="managerBox">Управляющий объекта</label>


        <select id="uob" style="width: 48%">
            <option value="0">Выберите Управляющего объекта </option>
        </select>
        <input type="button" name="name" class="btn btn-default genBtn" style="float: inherit; width: auto;" id="DobUob" value="Добавить" />
        <label for="files">Изображение объекта</label>
        <span id="flS" style="float: right; font-weight: bold; color: red; display: none">""</span>
        <div class="foto-obekt">
            <img class="foto" src="/img/brickdom.png">
            <br style="clear: both;">
            <input type="file" id="files">
            <div id="output" style="/*display: none*/"></div>
        </div>
        <br />
        <br />


        <div style="clear: both;"></div>
        <div class="buttons1">
            <button id="savO" class="btn btn-default logBtn" type="button" style="background-color: rgb(0,147,233);">Сохранить</button>
            <button id="back_O" class="btn btn-default logBtn" type="button" style="background-color: rgb(149,153,156); margin-left: 5%;">Назад</button>
            <%--<input type="button" name="name" id="tst" value="test" />--%>
        </div>
    </form>
    <div id="AddProjectModal" class="modalProject" style=" display: none;">

        <!-- Modal content -->
        <div class="modal-contentProject" >
            <div class="modal-headerProject">
                <span class="closeProject"  id="closeUplC">×</span>
                <h2 id="mhProject" class="mhProject" >Создать Проект</h2>
            </div>
            <div class="modal-bodyProject" >
                <label>Выберите Управляющую организацию</label>
                <select id="uoProject" class="uoProject" >
           
                </select>
                <br>
                <label> Проект</label>
                <input type="text" id="pName" class="pName" >
            </div>
            <div class="modal-footerProject" >
                <input type="button" id="CancelProject" class="CancelProject" name="name" value="Отмена" >
                <input type="button" id="AddProject" class="AddProject" name="name" value="Добавить" >
            </div>
        </div>

    </div>
</asp:Content>
