<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="Services.aspx.cs" Inherits="Kvorum_App.Manager.Services" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>

        #AllDirects label {
        white-space:normal;
        }
        .directimg {
        
        width: 10%;
        float: right;
        }
        .directLabel {
        width: 100%;
        
        }
        .GrupImg {
        
        width: 10%;
        
        float: right;
        }
        .grupLabel {
        
        width: 100%;
        }
        .ServiceLabel {
        
        margin-left: 0px !important;
        }
        .ServiceNmbr {
            margin-right: -23px; 
        }
        .labelDoq {
        float:right;
        }
        .Servicechkbx {

            float: right !important;
            margin-right:7px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <h2>Услуги</h2>
    <select id="prj" style="width: auto;"></select>


    <h4 style="padding-left: 20px; display: none;">Фильтр</h4>
    <div class="row" style="padding-left: 20px; margin-right: -15px; display: none;">
        <div class="col-md-6 col-xs-12">
            <label for="appPurp">Назначение помещения</label>


            <div id="appPurp" class="rmFOr"></div>
            <br>

            <label for="appType">Тип помещения</label>


            <div id="appType" class="rmFOr">
            </div>
            <br>

            <label for="appNum">Номер помещения</label>

            <input type="text" id="appNum" name="name" value="">
        </div>
        <div class="col-md-6 col-xs-12">
            <label for="fio">ФИО собственника:</label>
            <input type="text" id="fio" value="">
            <br>

            <label for="persAcc">Номер ЛС:</label>
            <input type="text" id="persAcc" value="">
            <div style="clear: both;">&nbsp;</div>
            <div class="button" style="top: 0;">
                <button class="btn genBtn" id="fltr">Применить фильтр</button>

                <button class="btn genBtn" id="sbros">Сбросить результаты</button>
            </div>
            <!-- button-->
        </div>
    </div>
    <!-- row -->
    <hr />
    <%-- <div style="clear: both;">&nbsp;</div>--%>
    <input type="button" value="Добавить Новые услуги" class="btn genBtn" onclick="AddNewServicesToProject()" style="min-width: 13%;">
    <br />
    <div id="AllSSS" style="display:none;border-style: double;border-color: rgb(0,100,223);" class="col-md-12">
        <div class="col-sm-6 col-md-3">
            <h4 id="HSet">Направления</h4>
            <div id="AllServiceSets" class="bordBox">
                 
            </div>
        </div>
        <div class="col-sm-6 col-md-3">
            <h4 id="HDirect">Группы Услуг</h4>
            <div id="AllDirects" class="bordBox">
                 

            </div>

        </div>
        <div class="col-sm-6 col-md-3">
            <h4 id="HService">Услуги</h4>
            <div id="AllServices" class="bordBox">
                

            </div>

        </div>
        <div class="col-sm-6 col-md-3">
            <h4>Стоимость (руб.)</h4>
            <div id="AllServicesCost" class="bordBox"></div>
        </div>
        <br />
        <input type="button" id="ConnectServices" class="btn genBtn" style="float: right;margin: 15px;" value="Сохранить"/>
    </div>
    <br />
    <div class="col-md-12">
        <div class="col-md-3">
            <input type="button" value="+ Направления" style="float: right" onclick="AddNewSet()" class="btn genBtn">
            <label>Направление услуг</label>
            <div id="ExistDirections" style="border: 1px solid #000; box-shadow: 3px 4px 5px rgba(0,0,0,0.3); width: 100%; height: 260px !important; overflow: auto;">
                <%--  <input type="button" class="btn genBtn" onclick="ConnectSets()" value="Добавить Направление">--%>
                <hr />
                <%--                <div onclick="SelectSet(this,1)" data-s="1" style="background-color: white;"><img src="../img/icons/ic_rem4_512.png" itemid="7" style="width: 10%;float: right;"><label style=" width: 100%;">Orxan1</label><hr></div>
                 <div onclick="SelectSet(this,1)" data-s="1" style="background-color: white;"><img src="../img/icons/ic_rem4_512.png" itemid="7" style="width: 10%;float: right;"><label style=" width: 100%;">Orxan2</label><hr></div>
                 <div onclick="SelectSet(this,1)" data-s="1" style="background-color: white;"><img src="../img/icons/ic_rem4_512.png" itemid="7" style="width: 10%;float: right;"><label style=" width: 100%;">Orxan3</label><hr></div>--%>
            </div>
        </div>
        <div class="col-md-3">
            <input type="button" onclick="AddNewGrup()" style="float: right" class="btn genBtn" value="+ Группа услуг">
            <label>Группа услуг</label>

            <div id="ExistGrups" style="border: 1px solid #000; box-shadow: 3px 4px 5px rgba(0,0,0,0.3); width: 100%; height: 260px !important; overflow: auto;">
            </div>
        </div>
        <div class="col-md-3">
            <input type="button" value="+ Услуга" style="float: right" class="btn genBtn" onclick="AddService()">
            <label>Услуги</label>

            <div id="ExistServices" style="border: 1px solid #000; box-shadow: 3px 4px 5px rgba(0,0,0,0.3); width: 100%; height: 260px !important; overflow: auto;">
            </div>
        </div>
        <div class="col-md-3">
            <label>Стоимость (руб.)</label>
            <div id="ExistCostServices" style="border: 1px solid #000; box-shadow: 3px 4px 5px rgba(0,0,0,0.3); width: 100%; height: 260px !important; overflow: auto;">
            </div>
        </div>
    </div>


    <br>
    <hr>
    <br>
    <style>
        .bordBox {
            border: 1px solid #000;
            box-shadow: 3px 4px 5px rgba(0,0,0,0.3);
            width: 100%;
            height: 260px !important;
            overflow: auto;
            padding: 5px;
        }

        .catList {
            list-style: none;
            margin: 0;
            padding: 0;
        }

            .catList li {
                display: block;
                height: 30px;
            }

                .catList li label {
                    position: relative;
                    left: 5px;
                }

                .catList li .icon {
                    display: inline-block;
                    width: 26px;
                    height: 26px;
                    float: right;
                }
    </style>
</asp:Content>
