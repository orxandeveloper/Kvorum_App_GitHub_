<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="CreateAccount.aspx.cs" Inherits="Kvorum_App.Client_Admin.CreateAccount" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2 id="Hacc">Создание учетной записи</h2>
        
             <div class="button">
              <%--  <a id="myBtn" href="#modal" role="button" class="create"><i class="fa fa-plus-square-o" aria-hidden="true"></i>&nbsp;Создать учетную запись</a>--%>
                 <a id="DeleteAcc" href="#" role="button" class="create"><i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;Удалить</a>
            </div>
            <div style="clear: both;"></div> 
   
                <form>
              
                        <label>Login</label>
                        <input type="text" id="login" disabled="disabled"/>
                    
                        <label>Пароль</label>
                    
                    <label class="errs2" style="color:red; display:none;" id="UoPas_">""</label>

                        <input type="password" id="pass" style="width:70%;"/>

                    <button id="gen" class="btn btn-default genBtn" type="button" style="background-color:rgb(0,147,233);width:25%;float:right;">Сгенерировать пароль</button>
                    
                    <div style="clear:both;"></div>
                        <label>Наименование (ФИО)</label>
                   <%-- <img src="../img/NO.png" id="yesfio" style="display: none;float:left;position: relative;left: 0;top: -10px;width: 49px">--%>
                    <label class="errs2" style="color:red; display:none;" id="Uofio">""</label>
                        <input type="text" id="fio" />
                   
                        <label>Мобильный телефон</label>
                   <%-- <img src="../img/NO.png" id="yesPhone" style="display: none;float:left;position: relative;left: 0;top: -10px;width: 49px">--%>
                    <label class="errs2" style="color:red; display:none;"  id="UoPhone">""</label> 
                        <input type="tel" maxlength="18" id="phone1" onkeyup="MaskPhone(this)" />
                
                        <label>E-mail</label>
                     <%--<img src="../img/NO.png" id="yesmail" style="display: none;float:left;position: relative;left: 0;top: -10px;width: 49px">--%>
                    <label class="errs2" style="color:red; display:none;" id="Uomail">""</label> 
                        <input type="text" id="email" />

                        <%-- <img src="../img/NO.png" id="mrs" style="display: none;float:left;position: relative;left: 0;top: -10px;width: 49px">--%>
                    
                    <div id="mrss">
                        <div class="row">
                             <div  class="col-xs-4" itemid="0">
                                  <label id="">Модуль</label>
                             </div>
                            <div  class="col-xs-4" itemid="0">
                                 <label  >Роль</label>
                             </div>
                        </div>
                       <label class="errs2" style="color:red; display:none;" id="mrsIm">""</label> 
                        <div class="row" itemid="0">

                       
                         <div class="col-xs-4" itemid="0">
                            
                            
                            <select class="mdls" onchange="GetRoleByModule(0,0,0)"  itemid="0"  >
                                <option value="0"  id="">Выберите Модуль</option>
                         
                            </select>
                      </div>
                          <div  class="col-xs-4" itemid="0">
                             
                            <select class="rls" onchange="ChangeRole(0)" itemid="0">
                                <option value="0"   >Выберите Роль</option>
                            </select>
                      </div> 
                            <div class="col-xs-4" itemid="0"><input class="knp del"  type="button" itemid="0" style="display:none" onclick="delElements(0)"  value="Удалить"></div>
                        </div>

                        <div class="col-xs-4" itemid="1">
                           <%-- <input class="knp" type="button" itemid="1" value="Удалить"  onclick="DeleteElement(1)" />--%>
                          
                            <input class="knp1 deActiveAdd " onclick=AddMRSS()  type="button" disabled="disabled"   value="Добавить"  /> 

                      </div>
                             
                    </div><br />
                  <%--  <div class="row" itemid="1">
                        <div class="col-xs-4" itemid="1">
                            <label id="rls">Модуль</label>
                            
                            <select id="modul1" onchange="GetRoleById( this,1 )"   itemid="1"  >
                                <option value="0" id="Mr">Выберите Модуль</option>
                         
                            </select>
                      </div>
                         <div  class="col-xs-4" itemid="1">
                              <label for="role1">Роль</label>
                            <select id="role1" onchange="ActiveBtn(1)">
                                <option value="0" id="Vr" >Выберите Роль</option>
                            </select>
                      </div>
                      
                     
                      <div class="col-xs-4" itemid="1">
                            
                          <div style="clear:both;">&nbsp;</div>
                            <input class="knp1" id="knp1" type="button" itemid="1"   value="Добавить" onclick="AddElement(1)" /> 
                      </div>
                    </div>--%>
                     

             
                            <input style="display:none" type="checkbox"><label style="display:none" class="checkBx">Включить двухфакторную аутентификацию при входе (данное поле появляется только для администратора)</label>
                     
                       
                   
            
                    <div class="buttons1">
                 
                      <button id="CreateAcc" class="btn btn-default logBtn" type="button" style="background-color:rgb(0,147,233);width:auto;">Сохранить</button>
                      <button id="backAcc" class="btn btn-default logBtn" type="button" style="background-color:rgb(149,153,156);margin-left:5%;">Назад</button>
                    </div>

                </form>

    <script>
        var SMRvalues = [];
      //  $("#knp1").attr('disabled', '');
        function ActiveBtn(RoleItem)
        {
            var currentRole = "#role" + RoleItem;
            var currentAddbtn = "#knp" + RoleItem;
            var currentRoleSValue = $(currentRole + " option:selected").val();
            if (currentRoleSValue != 0) {
                // $(currentAddbtn).removeAttr('disabled').removeAttr("style")
                $(currentAddbtn).removeAttr('disabled').attr("class", "knp" + RoleItem + " ActiveAdd")//.attr("style","background-color:  rgb(0,147,233);color:  white;font-weight: 700;font-family: unset;border:none;")//css("background-color", "")
               
            }
            if (currentRoleSValue == 0) {
                $(currentAddbtn).attr('disabled', 'disabled').attr("class", "knp" + RoleItem + " deActiveAdd")//.attr("style","background-color: rgb(149,153,156);color:  white;font-family: unset;font-weight: 700;border: none;")//css("background-color","rgb(149,149,149)")
            }
           
           // console.log(currentRoleSValue)
        } 

        function AddElement(itemid_)
        {

            itemid_++;
            sessionStorage.setItem("itmId", itemid_)
            var prefiousItem = itemid_ - 1
            var previousRole = "#role" + prefiousItem;
            var PreviousModul = "#modul" + prefiousItem;
            var currentModul = "#modul" + itemid_
            var currentknpD = "#knp" + itemid_
            var previousknpD = "#knp" + prefiousItem

            $(previousknpD).attr('disabled', 'disabled').hide();//.css("background-color", "rgb(149,149,149)")
            //$(previousknpD).closest(".knp").hide();
            $(".knp[itemid='" + prefiousItem + "']").show();
            $(PreviousModul).attr('disabled', 'disabled')
            $(previousRole).attr('disabled', 'disabled')
            if (itemid_ - 1 == 55) {
                $(currentknpD).attr('disabled', 'disabled')//.css("background-color", "rgb(149,149,149)")
                SMRvalues.push({ "sm": $(PreviousModul + ' option:selected').text(), "sr": $(previousRole + ' option:selected').text() })

                sessionStorage.setItem("PreviousText", JSON.stringify(SMRvalues))
                //   $("#role2 option:contains('Диспетчер')").remove();
                console.log(SMRvalues)
                $(currentknpD).attr('disabled', 'disabled')//.css("background-color", "rgb(149,149,149)")
            }
            else {//style="background-color: rgb(149,153,156);color:  white;font-family: unset;font-weight: 700;border: none;"
                $("div[class='row'][itemid='" + prefiousItem + "']").after('<div class="row" itemid="' + itemid_ + '"><div class="col-xs-4" itemid= "' + itemid_ + '"><select id="modul' + itemid_ + '" onchange="GetRoleById( this,' + itemid_ + ' )" itemid="' + itemid_ + '"  ><option value="0" id="Mr">Выберите Модуль</option></select></div><div class="col-xs-4" itemid="' + itemid_ + '"><select id="role' + itemid_ + '" onchange="ActiveBtn(' + itemid_ + ')"  ><option value="0" id="Vr" >Выберите Роль</option></select></div><div class="col-xs-4" itemid="' + itemid_ + '"><input class="knp' + itemid_ + ' deActiveAdd" type="button" onclick=AddElement(' + itemid_ + ') itemid="' + itemid_ + '" id="knp' + itemid_ + '" value="Добавить"/><input class="knp del"  type="button" itemid="' + itemid_ + '" onclick=DeleteElement(' + itemid_ + ') value="Удалить"/></div></div>')
                getModul("#modul", itemid_,"","")
                $(currentknpD).attr('disabled', 'disabled')//.css("background-color", "rgb(149,149,149)")
                SMRvalues.push({ "sm": $(PreviousModul + ' option:selected').text(), "sr": $(previousRole + ' option:selected').text() })

                sessionStorage.setItem("PreviousText", JSON.stringify(SMRvalues))
                //   $("#role2 option:contains('Диспетчер')").remove();
                console.log(SMRvalues)
            }
           
          
            
        
        }
        function DeleteElement(itemid_)
        {
            $("#mrsIm").hide();
            $("#mrs").hide();
            var selectedRole = $("#role" + itemid_ + " option:selected").text();
            $("[itemid=" + itemid_ + "]").remove();
            itemid_--;
            sessionStorage.setItem("itmId", itemid_)
            var previosknp
            previosknp = ".knp" + itemid_ + ""
            PreviousModul = "#modul" + itemid_
            previousRole = "#role" + itemid_
            $(previosknp).removeAttr('disabled').attr("class", "knp" + itemid_ + " ActiveAdd").show().removeAttr("style");//.css("background-color", "")
            $(".knp[itemid='" + itemid_ + "']").show();
            $("#role" + itemid_ + "").removeAttr('disabled')
            $(PreviousModul).removeAttr('disabled', 'disabled')
            $(previousRole).removeAttr('disabled')


            var SelectedText = sessionStorage.getItem("PreviousText")
            var parsedJson = JSON.parse(SelectedText)
            console.log(parsedJson)
            var prevousModulSValue=$(PreviousModul + " option:selected").text()
            
            $("#role" + itemid_ + " option:contains('" + selectedRole + "')").show();

        }
        
        function getModul(modul,itm,lg,Smv,Srv_) {
            sessionStorage.setItem("itmId", itm)
            $.ajax({
                type: "POST",
                url: "CreateAccount.aspx/getModul",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    //console.log(result)

                    var jsondata_1 = JSON.parse(result.d)
                    for (var i = 0; i < jsondata_1.length; i++) {

                        // console.log(jsondata_1[i].MODUL_NAME)
                        if (jsondata_1[i].MODUL_ID == 1 || jsondata_1[i].MODUL_ID == 4 ) {
                            $(modul + itm).append('<option value="' + jsondata_1[i].MODUL_ID + '">' + jsondata_1[i].MODUL_NAME + '</option>')
                        }
                        
                    }
                    if (lg != "" || lg != undefined || lg != null) {
                        $("#modul" + itm + "").val(Smv)
                        var modulSelected = $("#modul" + itm + "").find('option:selected').val();

                        getRole("#role" + itm + "", modulSelected, Srv_, "")
                    }
                    //if (jsondata_1.length != 1)
                    //{
                    //    for (var i = 0; i < jsondata_1.length; i++) {
                    //        if (i != jsondata_1.length) {
                    //            $("#role" + i + "").attr("disabled","disabled")
                    //        }
                    //    }

                    //}
                    
                  

                   // getRoleById(jsondata_1[0].MODUL_ID, role_)


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
        var hasRoles2 = [];
        function getRole(role, mId, Srv,itm) { 
            
            //var previousRole = item--;
            //previousRole = $("#role" + previousRole + "").val()
            var obj = { "M_Id": mId }
            $.ajax({
                type: "POST",
                url: "CreateAccount.aspx/GetRole",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) { 
                    var jsondata_ = JSON.parse(data.d) 
                    // console.log(jsondata_)
                    if (Srv=="") {
                        if (itm != 1) {
                            var hasroles = []
                            for (var i = itm - 1; i >= 1; i--) {
                                hasroles.push({ "ROLE_ID": $("#role" + i + "").val() })
                            }
                            for (var i = 0; i < jsondata_.length; i++) {
                                var has = false;
                                for (var j = 0; j < hasroles.length; j++) {
                                    if (hasroles[j].ROLE_ID == jsondata_[i].ROLE_ID) {
                                        has = true;
                                        //  $(role).append('<option value="' + jsondata_[i].ROLE_ID + '">' + jsondata_[i].ROLE_NAME + '</option>')
                                    }
                                }
                                if (has == false) {
                                    $(role).append('<option value="' + jsondata_[i].ROLE_ID + '">' + jsondata_[i].ROLE_NAME + '</option>')
                                }
                            }
                        }
                        if (itm == 1) {
                            for (var i = 0; i < jsondata_.length; i++) {

                                // console.log(jsondata_[i].ROLE_NAME) 
                                $(role).append('<option value="' + jsondata_[i].ROLE_ID + '">' + jsondata_[i].ROLE_NAME + '</option>')
                                //$(role).find("#Vr").after('<option value="' + jsondata_[i].ROLE_ID + '">' + jsondata_[i].ROLE_NAME + '</option>')
                            }
                            if (Srv != "" || Srv != undefined || Srv != null) {
                                $(role).val(Srv)
                            }
                        }
                    }
                    else {
                        if (itm == "") {
                          //  hasRoles2.push({ "ROLE_ID": Srv })
                            var prole = role.substring(role.indexOf('e') + 1, role.length);
                            for (var k = prole - 1; k >= 1; k--) {
                                hasRoles2.push({ "ROLE_ID": $("#role" + k + "").val() })
                            }

                            for (var i = 0; i < jsondata_.length; i++) {
                                var has2 = false;
                                if (role=="#role1") {
                                    $(role).append('<option value="' + jsondata_[i].ROLE_ID + '">' + jsondata_[i].ROLE_NAME + '</option>')
                                }
                                else {
                                   
                                    //prole = "#role" + (prole - 1) + "";
                                    //var proleval = $(prole).val();
                                    //hasRoles2.push({ "ROLE_ID": proleval });
                                   
                                    for (var j = 0; j < hasRoles2.length; j++) {
                                       
                                        if (hasRoles2[j].ROLE_ID == jsondata_[i].ROLE_ID)
                                        {
                                            has2 = true;
                                        }
                                       
                                    }
                                    if (has2 == false) {
                                        $(role).append('<option value="' + jsondata_[i].ROLE_ID + '">' + jsondata_[i].ROLE_NAME + '</option>')
                                        
                                    }
                                }
                                    
                               
                               
                                //$(role).find("#Vr").after('<option value="' + jsondata_[i].ROLE_ID + '">' + jsondata_[i].ROLE_NAME + '</option>')
                            }
                            if (Srv != "" || Srv != undefined || Srv != null) {
                                $(role).val(Srv)
                               
                                //var prole = role.substring(role.indexOf('e') + 1, role.length);
                                //prole = "#role" + (prole - 1) + "";
                                //var proleval = $(prole).val();
                                
                                //$(role + " option[value='" + prole + "']").remove();
                            }

                            /*var has2 = false;

                                for (var j = 0; j < hasRoles2.length; j++) {
                                    if (hasRoles2[j].ROLE_ID == jsondata_[i].ROLE_ID) {
                                        has2 = true;
                                    }
                                }
                                if (has2 == false) {
                                    $(role).append('<option value="' + jsondata_[i].ROLE_ID + '">' + jsondata_[i].ROLE_NAME + '</option>')
                                }
                               */
                            //console.log("hasRoles2: " + JSON.stringify(hasRoles2));
                            
                           // jsondata_.splice()
                            //for (var i = 0; i < jsondata_.length; i++) {
                            //    var prevrol = $("#role" + (i + 1) + "").val();
                            //    var hasvalue = [];

                            //   // $("#role" + (i + 1) + "").val();
                            //}
                        }
                    }
                    
                    


                }

            })
        }

        function GetRoleById(element,item)
        {
            $("#mrs").hide()
            $("#mrsIm").hide()
            var modul1Selected = $(element).find('option:selected').val();
            $("#role" + item + " option:not(:first)").remove();
            var selectedtexs = sessionStorage.getItem("PreviousText")
           // console.log(selectedtexs)
            getRole("#role" + item + "", modul1Selected,"",item)
            //var SelectedText = sessionStorage.getItem("PreviousText")
            //if (SelectedText!="") {
            //    var parsedJson = JSON.parse(SelectedText)
            //   // console.log(parsedJson)
            //    var selectedTextCurrentModel = $(element).find('option:selected').text()
            //    $(document).ajaxStop(function () {
            //        // $("#role2 option:contains('Диспетчер')").remove();
            //        for (var i = 0; i < parsedJson.length; i++) {
            //            if (selectedTextCurrentModel == parsedJson[i].sm) {
            //                $("#role" + item + " option:contains('" + parsedJson[i].sr + "')").hide();
            //            }
            //        }
            //    })
            //}
          
            

           // console.log(selectedTextCurrentModel)
          //  console.log(parsedJson.length);
        }



       
    </script>
    <script>

    </script>
</asp:Content>
