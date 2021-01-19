<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="CreateDisp.aspx.cs" Inherits="Kvorum_App.Client_Admin.CreateDisp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        ul {
            list-style: none;
        }

            ul li {
                display: inline-block;
            }

        li > input[type=radio] + label {
            display: block;
            background: url('../img/disp1.png') no-repeat;
            background-size: contain;
            height: 100px;
            width: 100px;
            padding: 18px;
            border: 10px solid white;
            cursor: pointer;
        }

        li > input[type=radio]:checked + label {
            border-bottom: 10px solid #f00;
        }

        li > #shipadd2 + label {
            background-image: url('../img/disp2.png');
        }

        li > #shipadd3 + label {
            background-image: url('../img/disp3.png');
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>Создание диспетчерской</h2>

    <form runat="server">

        <label>Название диспетчерской</label>
        <%-- <img src="../img/NO.png" id="yesNMDisp" style="display: none;float:left;position: relative;left: 0;top: -10px;width: 49px">--%>
                    <label style="color:red; display:none;" id="NMDIsp">""</label> 
        <input type="text" id="DispName" style="width: 68%;" />

        <label>Номер телефона</label>
       <%-- <img src="../img/NO.png" id="yesTelDisp" style="display: none;float:left;position: relative;left: 0;top: -10px;width: 49px">--%>
                    <label style="color:red; display:none;" id="TlDIsp">""</label> 
        <input type="tel" id="telDisp"  disabled="disabled"/>
        <div style="clear: both;">&nbsp;</div>

        <label>Объект диспетчерской</label>

        <%--<img src="../img/NO.png" id="yesObDisp" style="display: none;float:left;position: relative;left: 0;top: -10px;width: 49px">--%>
                    <label style="color:red; display:none;" id="ObDIsp">""</label> 
        <div class="genBtn addBtn" id="AddOb" style="float: right;">Создать объект</div>
        <div id="objcts" style="border: 1px solid #000; box-shadow: 3px 4px 5px rgba(0,0,0,0.3); height: 150px; overflow: auto; width: 67.5%">
        </div>
        <div style="clear: both;">&nbsp;</div>
        <div class="genBtn addBtn" id="AddAcc" >Создать учетную запись</div>
        <label>Диспетчер</label>
        
       <%--  <img src="../img/NO.png" id="yesDDisp" style="display: none;float:left;position: relative;left: 0;top: -10px;width: 49px">--%>
                    <label style="color:red; display:none;" id="DDIsp">""</label> 
        <div id="Disps" style="border: 1px solid #000; box-shadow: 3px 4px 5px rgba(0,0,0,0.3); height: 150px; overflow: auto; width: 67.5%">
        </div>
        <div style="clear: both;">&nbsp;</div>
        <label>Инженер</label>
         <%--<img src="../img/NO.png" id="yesEngDisp" style="display: none;float:left;position: relative;left: 0;top: -10px;width: 49px">--%>
                    <label style="color:red; display:none;" id="EngDIsp">""</label> 
        <div id="engnrs" style="border: 1px solid #000; box-shadow: 3px 4px 5px rgba(0,0,0,0.3); height: 150px; overflow: auto; width: 67.5%">
        </div>
        <div style="clear: both;">&nbsp;</div>

        <label>Техник</label>
             <%--<img src="../img/NO.png" id="yesTExDisp" style="display: none;float:left;position: relative;left: 0;top: -10px;width: 49px">--%>
                    <label style="color:red; display:none;" id="TExDIsp">""</label> 
        <div id="tex" style="border: 1px solid #000; box-shadow: 3px 4px 5px rgba(0,0,0,0.3); height: 150px; overflow: auto; width: 67.5%">
        </div>
        <div style="clear: both;">&nbsp;</div>
        <div class="row margin0">
             <span id="flS" style="float: right; font-weight:bold;color:red;display:none">""</span>
            <div class="col-xs-1">
               
                <label>Иконка</label>
            </div>
            <div class="col-xs-2">
                <img class="foto-disp"  id="fotoDisp" src="../img/disp2.png" />
            </div>
            <div class="col-xs-9">
                <%-- <input type="button" value="Выбрать изображение из списка" class="btn btn-default genBtn" style="margin:1em 0 0.5em 0;"/>--%>
                <input type="file" id="files" value="Загрузить свое изображение" style="margin-left:  5vw;" />
            </div>
            <div style="clear: both;">&nbsp;</div>
            <div style="border: 1px solid #000; box-shadow: 3px 4px 5px rgba(0,0,0,0.3); height: 150px; overflow: auto; width: 67.5%">
                <%--<input type="checkbox" style="margin-left:5px;"/><img   src="../img/disp1.png" />
                    <input type="checkbox" style="margin-left:5px;"/><img  src="../img/disp2.png" />
                    <input type="checkbox" style="margin-left:5px;"/><img  src="../img/disp3.png" />--%>
                <ul>
                    <li>
                        <input type="radio" hidden="" id="shipadd1" name="address">
                        <label for="shipadd1" onclick="SImage(this)"></label>
                    </li>
                    <li>
                        <input type="radio" hidden="" id="shipadd2" name="address">
                        <label for="shipadd2" onclick="SImage(this)"></label>
                    </li>
                    <li>
                        <input type="radio" hidden="" id="shipadd3" name="address">
                        <label for="shipadd3" onclick="SImage(this)"></label>
                    </li>
                </ul>
            </div>
            <div style="clear: both;">&nbsp;</div>
        </div>

        <div class="">

            <button id="saveD" class="btn btn-default logBtn" type="button" style="background-color: rgb(0,223,100);">Сохранить</button>

            <button id="saveActD" class="btn btn-default logBtn" type="button" style="background-color: rgb(0,100,223);">Сохранить и активировать</button>

            <button id="backD" class="btn btn-default logBtn" type="button" style="background-color: rgb(149,153,156);">Назад</button>
        </div>
    </form>
    <script>
       
            var objcts = [];
            function SObjdata(e,IdObj)
            {
                $("#yesObDisp").hide();
                $("#ObDIsp").hide()
                if ($(e).prop('checked') == true)
                {
                    objcts.push({ "Object_Id": IdObj });
                }
                else {
                    for (var i = 0; i < objcts.length; i++) {
                        if (objcts[i].Object_Id === IdObj) {
                           objcts.splice(i, 1);

                        }
                    }

                }
                // console.log(JSON.stringify(objcts));
                sessionStorage.setItem("Sobjcts", JSON.stringify(objcts))
        }
            var Disps=[]
            function SDsdata(e, DsId, MR_ID) {
                $("#yesDDisp").hide();
                $("#DDIsp").hide()
                if ($(e).prop('checked') == true) {
                    Disps.push({ "LOG_IN_ID": DsId, "KPP": MR_ID });
                }
                else {
                    for (var i = 0; i < Disps.length; i++) {
                        if (Disps[i].LOG_IN_ID === DsId) {
                            Disps.splice(i, 1);

                        }
                    }

                }
               // console.log(JSON.stringify(Disps));

                sessionStorage.setItem("SDisps", JSON.stringify(Disps))
            }
            var Enginers = []
            function SEngdata(e, engId, Mr_Id) {
                $("#yesEngDisp").hide();
                $("#EngDIsp").hide()
                if ($(e).prop('checked') == true) {
                    Enginers.push({ "LOG_IN_ID": engId, "KPP": Mr_Id});
                }
                else {
                    for (var i = 0; i < Enginers.length; i++) {
                        if (Enginers[i].LOG_IN_ID === engId) {
                            Enginers.splice(i, 1);

                        }
                    }

                }
                // console.log(JSON.stringify(Enginers));
                sessionStorage.setItem("SENG",JSON.stringify(Enginers))
            }
            var Tex = []
            function STdata(e, texId, MrId) {
                $("#yesTExDisp").hide();
                $("#TExDIsp").hide()
                if ($(e).prop('checked') == true) {
                    Tex.push({ "LOG_IN_ID": texId, "KPP": MrId });
                }
                else {
                    for (var i = 0; i < Tex.length; i++) {
                        if (Tex[i].LOG_IN_ID === texId) {
                            Tex.splice(i, 1);

                        }
                    }

                }
                // console.log(JSON.stringify(Tex));
                sessionStorage.setItem("STEX",JSON.stringify(Tex))
            }
            function SImage(e)
            {
                var bg = $(e).css("background-image")
                bg = bg.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '')
                $("#fotoDisp").attr("src", bg)
                $('#files').val('');
                $('#flS').hide();
                //alert( )
            }
    </script>
</asp:Content>
