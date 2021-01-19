<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="EditDisp.aspx.cs" Inherits="Kvorum_App.Client_Admin.EditDisp" %>

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
     <div class="button">
                <a id="myBtn" href="#modal" role="button" class="create"><i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;Удалить</a>
            </div>
    <h2 id="redDispname" >Редактирование диспетчерской</h2>
   

   

    <div class="polya">
        <label style="color:red; display:none;" id="NMDIsp">""</label><br />
        <label>Название диспетчерской</label>
        <input type="text" id="DName" style="width: 68%;" />
         <label style="color:red; display:none;" id="TlDIsp">""</label><br />
        <label>Номер телефона</label>
        <input type="tel" disabled="disabled" id="telDisp" />
        <label style="color:red; display:none;" id="ObDIsp">""</label><br />
        <label>Объект диспетчерской</label>
        <div id="objcts" style="border: 1px solid #000; box-shadow: 3px 4px 5px rgba(0,0,0,0.3); height: 150px; overflow: auto; width: 67.5%">
        </div>
        <br />
        <%--<select><option>Адрес объекта</option></select>--%>
        <%-- <input type="button" value="Выберите объект" class="btn btn-default genBtn"/>--%>


        <div class="row">
            <div class="col-xs-1">
                <label>Иконка</label>
            </div>
            <div class="col-xs-2">
                <img class="foto-disp" id="fotoDisp" src="../img/disp2.png" />
            </div>
            <div class="col-xs-9">
                <%-- <input type="button" value="Выбрать изображение из списка" class="btn btn-default genBtn" style="margin: 1em 0 0.5em 0;" />--%>
                <input type="file" id="files" value="Загрузить свое изображение" style="margin-left: 5vw;" />
            </div>

        </div>
        <br />
        <div style="border: 1px solid #000; box-shadow: 3px 4px 5px rgba(0,0,0,0.3); height: 150px; overflow: auto; width: 67.5%">

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
        <br />
        <h4>Захватите необходимую учетную запись мышкой и перенесите к роли</h4>
        <div class="row">
            <div class="col-xs-6">
                <label style="color:red; display:none;" id="DDIsp">""</label><br />
                <div id="dspDiv" class="disp">
                    <label>Диспетчер</label>
                    <img class="foto-disp" id="dsp" src="../img/icon-disp.png" />
                    <%-- <div id="account1">Комбаров Дмитрий Борисович</div>--%>
                     <ul id="dspDiv-ul">
                        <%--<li>
                            <div>Зуев Георгий Александрович</div>
                        </li>
                        <li>
                            <div>Зуев Георгий Александрович</div>
                        </li>
                         <li>
                            <div>Зуев Георгий Александрович</div>
                        </li>--%>
                    </ul>
                </div>

                <label style="color:red; display:none;" id="TExDIsp">""</label><br />
                
                <div id="TexDiv" class="disp">
                    <label>Техник</label>
                    <img class="foto-disp" id="tex" src="../img/icon-tech.png" />
                    <%-- <div id="account2">Макеев Алексей Петрович</div>
                    <div id="account3">Глушаков Геннадий Иванович</div>--%>
                     <ul id="TexDiv-ul">
                        <%--<li>
                            <div>Зуев Георгий Александрович</div>
                        </li>
                        <li>
                            <div>Зуев Георгий Александрович</div>
                        </li>
                         <li>
                            <div>Зуев Георгий Александрович</div>
                        </li>--%>
                    </ul>
                </div>

                
                <label style="color:red; display:none;" id="EngDIsp">""</label><br />
                <div id="engDiv" class="disp">
                    <label>Инженер</label>
                    <img class="foto-disp" id="ing" src="../img/icon-ing.png" />
                    <ul id="engDiv-ul">
                        
                    <%--    <li>
                            <div>Зуев Георгий Александрович</div>
                        </li>
                         <li>
                            <div>Зуев Георгий Александрович</div>
                        </li>--%>
                    </ul>
                    <%--  <div id="account4">Зуев Георгий Александрович</div>--%>
                </div>
            </div>
            <div class="col-xs-6">
                <h4>Доступные учетные записи</h4>
                <ul class="dispList" id="UZ" style="overflow: auto;width: 70%">

                  
              <%--      
                    <li data-value="eng"><div>Cебастиян (eng)</div></li>
                    <li data-value="eng"><div>Chaplin (eng)</div></li>
                    <li data-value="tex"><div>Dingo (tex)</div></li>
                    <li data-value="tex"><div>Fingo (tex)</div></li>
                    <li data-value="tex"><div>Bingo (tex)</div></li>
                    <li data-value="dsp"><div>Singo (dsp)</div></li>
                    <li data-value="dsp"><div>SEka (dsp)</div></li>
                    <li data-value="dsp"><div>""(dsp)</div></li>
                    <li><div>Константин</div></li>--%>
                </ul>
                <%--   <div id="account5" draggable="true" ondrag="dragACCS(this)" >Петров Иван Иванович</div>--%>
            </div>
            <br />
            <button class="genBtn btn" id="btnCUZ">Создать новую учетную запись</button>
        </div>
         <div class="">

        <button id="saveD" class="btn btn-default logBtn" type="button" style="background-color: rgb(0,100,223);">Сохранить</button>
        <button id="backD" class="btn btn-default logBtn" type="button" style="background-color: rgb(149,153,156);">Назад</button>
    </div>
    </div>
    <!--row-->

   
    </div>
    <%-- <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"></script>  --%>
    <script>
        function SImage(e) {
            var bg = $(e).css("background-image")
            bg = bg.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '')
            $("#fotoDisp").attr("src", bg)
            //alert( )
        }
        //function dragACCS(e) {
        //    $(e).draggable({
        //        drag: function () { $(".dispList").removeAttr("style") }
        //        // stop: function () { $(".dispList").css("overflow","auto") }
        //    });
        //}
        var objcts = []
        function SSObjdata(e, IdObj) {
            $("#ObDIsp").hide();
            objcts = JSON.parse(sessionStorage.getItem("objss"))
            if ($(e).prop('checked') == true) {

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
            sessionStorage.setItem("objss", JSON.stringify(objcts))
            console.log("Obyektler Sonrasi : " + JSON.stringify(objcts));
        }
    </script>
</asp:Content>
