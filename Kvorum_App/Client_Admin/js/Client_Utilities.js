$(function () {

    $(".logoMain2,.logoImgSmall").click(function () {
        sessionStorage.clear();
        window.location.href = "../HomePage.aspx"
    })
    $(".logoMain2,.logoImgSmall").mousedown(function () {
        sessionStorage.clear();
        window.location.href = "../HomePage.aspx"
    })
    function SaveLog(EVENT_TYPE, EVENT_STATUS, EVENT_ROLE, EVENT_MODULE, EVENT_MESSAGE, EVENT_MAKER) {
        var obj = {
            EVENT_TYPE: EVENT_TYPE,
            EVENT_STATUS: EVENT_STATUS,
            EVENT_ROLE: EVENT_ROLE,
            EVENT_MODULE: EVENT_MODULE,
            EVENT_MESSAGE: EVENT_MESSAGE,
            EVENT_MAKER: EVENT_MAKER
        };
        $.ajax({
            type: "POST",
            url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/InsertLog",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //console.log(JSON.stringify(result));
            },
            error: function (r) {
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            }
        });
        return;
    }


    function GetLog(EVENT_TYPE, EVENT_ROLE, EVENT_MODULE) {
        var obj = {
            EVENT_TYPE: EVENT_TYPE,
            EVENT_ROLE: EVENT_ROLE,
            EVENT_MODULE: EVENT_MODULE
        };
        $.ajax({
            type: "POST",
            url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/GetLog",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //console.log(JSON.stringify(result));
            },
            error: function (r) {
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            }
        });
        return;
    }

    $("#gotoObj").click(function () {
        sessionStorage.setItem("UoId", "")
    })

    var loc = window.location.pathname;

    var baseUrl = (window.location).href;
    var Id = new URL(location.href).searchParams.get('Id');
    var g = new URL(location.href).searchParams.get('g');
    if (g != null) {
        $("#myBtn").hide();
    }
    // Id = 214;
    if (Id == null) {

        // console.log("Ok")
        Id = 346;// sessionStorage.getItem("Clien_ID"); //Orxcan
        sessionStorage.setItem("Clien_ID",346)
        // alert(Id)
        //Id=197
        if (Id == null) {
            // window.location.href = 'AlertingError.aspx?reason=l'
            window.location.href = "../ClientLogin.aspx";
        }
    }
    else {
        sessionStorage.setItem("ComesTo", "");
        //alert(Id)
        sessionStorage.setItem("Clien_ID", Id)
        //  alert(Id);
    }
    // $("#loader,.ui-loader-background").hide();
    // var LLoggId = sessionStorage.getItem("LLogId")
    $("#vse1").click(function () {
        $("#ad1").removeAttr("class");
        $(this).attr("class", "current")
        getlog2(Id, 'Admin')
    })
    $("#ad1").click(function () {
        $("#vse1").removeAttr("class");
        $(this).attr("class", "current")
        //var event_role = 'Администратор';
        //var event_Modul = 'Клиентское администрирование';
        //GetLog('', event_role, event_Modul)
        getlog2(Id, 'Admin')
    })
    var oobj3 = {
        clId: Id
    };
    $.ajax({
        type: "POST",
        url: "CreateOpject.aspx/GetRolesLeftmenu",
        data: JSON.stringify(oobj3),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var j = JSON.parse(result.d)
            $('#cmpName').text('Компания: ' + j[0].COMPANY_NAME + '')
            $('#lgId').text('ID Учетной записи: ' + L_ogin_id + '')
            $('#role').text('Роль: ' + j[0].ROLE_ + '')
            $('#C_id').text('Идентификатор клиента : ' + Id + '')
            console.log("result:" + j)
        },

        error: function (r) {
            //alert("Error");
            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            alert("FAIL");
        }
    });
    //GetLeftMenuLogin_Id
    // $("#lgId_").text("Login_" + LLoggId)

    //getLeftMenuRole
    //   getlog2(Id, 'Admin')
    //GetLogs
    var L_ogin_id = 708//sessionStorage.getItem("Log")



    $("#Out_").click(function () {
        sessionStorage.clear();
        window.location.href = "../ClientLogin.aspx"
    })

    if (loc == "/Client_Admin/CreateOpject.aspx") {
        var ObjId = sessionStorage.getItem("ObjId")
        $("#loader,.ui-loader-background").hide();
        $("#dom").keyup(function () { $("#domS").hide() })

        $("#back_O").click(function () {

            var cmsf_O = sessionStorage.getItem("cmsf_O");

            window.location.href = (cmsf_O.length != 0) ? cmsf_O : "RegisterObject.aspx"
        })

        $('#AddProject').click(function () {
            var UprId = $('#uoProject').val();
            var ProjectName = $('#pName').val();
            if (UprId != 0) {
                if (ProjectName.length != 0) {
                    AddProject(UprId, ProjectName)
                }
                else {
                    $('#pName').after('<label id="pNameLBL" style="color:red">Необходимо заполнить поле "Проект"</label>')
                    window.setTimeout(function () {
                        // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
                        $('#pNameLBL').hide(1000);
                        $('#pNameLBL').remove();
                    }, 2000);
                }

            }
            else {
                $('#uoProject').after('<label id="uoprojectLBL" style="color:red">Выберите Управляющую организацию</label>')
                window.setTimeout(function () {
                    // $('#cntrs tr:eq(' + i - 1 + ')').removeAttr('style')
                    $('#uoprojectLBL').hide(1000);
                    $('#uoprojectLBL').remove();
                }, 2000);
            }
        })
        // GerUoList(Id, "");


        $("#DobUo").click(function () {
            SaveDataAndGoTo('CreateOrg.aspx')

        })
        $("#DobUob").click(function () {
            SaveDataAndGoTo("CreateAccount.aspx")
        })

        var currentDatas = sessionStorage.getItem("currentDatas")
        var Ob = sessionStorage.getItem("ComesTo")
        //if (Ob!="") {
        if (currentDatas != "" && currentDatas != null) {
            currentDatas = JSON.parse(currentDatas);
            // console.log(currentDatas[0].opt)
            GerUoList(Id, currentDatas[0].opt)
            // $("#uo").prop("selectedIndex", currentDatas[0].opt);
            $("#adr").val(currentDatas[0].adr);
            $("#dom").val(currentDatas[0].dom);
            $("#korp").val(currentDatas[0].korp);

            // $("#uob").prop("selectedIndex", currentDatas[0].logId)
            GetUprRoles(Id, currentDatas[0].logId)
            GetProjectForManComp(currentDatas[0].opt, currentDatas[0].prj)
            $(".foto").attr("src", currentDatas[0].image1)
            sessionStorage.setItem("ComesTo", "")
            //  sessionStorage.setItem("currentDatas","")
        }
        // }

        $("#adr,#dom").keyup(function () { $("#adrS").hide(); })
        // $("")
        $(document).on('change', '#uo', function () {
            var uoId = $(this).val();
            $("#Projects").find("option:not(:first)").remove();
            if (uoId != 0) {
                GetProjectForManComp(uoId, "")
            }
            $("#uoS").hide()
        })//

        $(document).on('change', '#uob', function () { $("#uobS").hide() })
        $('#DobProject').click(function () {
            var $options = $("#uo > option").clone();

            $('#uoProject').append($options);
            $('#uoProject').select2({
                width: '100%',
                dropdownParent: $('#AddProjectModal')
            });
            $('#AddProjectModal').show();
        })
        $('#closeUplC').click(function () {
            $('#uo').val($('#uoProject').val())
            GetProjectForManComp($('#uo').val(), $('#Projects').attr('data-b'))
            $('#uoProject').empty();
            // $('#uoProject').append('');
            $('#pName').val("")
            $('#AddProjectModal').hide();
        })
        $('#CancelProject').click(function () {
            $('#AddProjectModal').hide();
        })


        var objId = sessionStorage.getItem("ObjId")
        var KladrId;
        $("#savO").click(function () {
            sessionStorage.setItem("ComesTo", "")
            if (ObjId == "" || ObjId == undefined || ObjId == null) {
                // var id = localStorage.getItem("Clien_ID");

                if (checkControls_Oject().Issuccess == true) {
                    saveObject(Id, checkControls_Oject().adrtext_, checkControls_Oject().adrCode, checkControls_Oject().opt, checkControls_Oject().image1, checkControls_Oject()._logId, checkControls_Oject().project);
                }


            }
            else {
                if (checkControls_Oject().Issuccess == true) {
                    UpdateObject(ObjId, checkControls_Oject().adrtext_, checkControls_Oject().opt, checkControls_Oject().image1, checkControls_Oject()._logId, checkControls_Oject().project);
                }

            }




        })
        if (ObjId == "" || ObjId == undefined || ObjId == null) {

            $("#myBtn").hide();
            if (Ob == "") {

                GetUprRoles(Id, "");
                GerUoList(Id, "");
            }
        }
        else {
            //  alertMessage("awd", objId,"awd")
            // $("#savO").text('Обновить')
            $('#myBtn').show();
            $("#DobUo,#DobUob").hide();
            $("#myBtn").click(function () {
                alertWithButton("Вы действительно хотите удалить  объект?", $("#adr").val() + " Д. " + $("#dom").val() + " К. " + $("#korp").val(), "")
            })
            $("#deleteO").click(function () {
                deleteObject(ObjId);
            })
            //GetUprRoles(Id);
            getDetail(Id, ObjId);

            function alertWithButton(Header_, text_, footer_) {
                $("#mh2").text(Header_);
                if (text_.length >= 45) {
                    $("#txt2").attr("style", "font-size: 23px;width:50%;word-wrap:break-word;")
                }
                else {
                    $("#txt2").attr("style", "font-size: 23px")
                }
                $("#txt2").text(text_);
                $("#mf2").text(footer_)
                var modal = document.getElementById('myModal2');
                var span = document.getElementsByClassName("close_")[0];
                modal.style.display = "block";
                $("#close_,#cls").click(function () {
                    modal.style.display = "none";
                })
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            }
        }



        function gotoRegist() {
            //sessionStorage.setItem("UoId","");
            // window.location.href ="RegisterObject.aspx"
            var cmst = sessionStorage.getItem("ComesTo");
            var cmsf = sessionStorage.getItem("cmsf");
            if (cmst == "") {
                window.location.href = "RegisterObject.aspx"
            }
            if (cmsf == "dsp") {
                window.location.href = 'CreateDisp.aspx'
            }

        }
        function addDomain(ObjectId) {
            var obj = {
                objectid: ObjectId
            };
            // alert(JSON.stringify(obj));

            $.ajax({
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/AddDomain",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //async: false,
                success: function (result) {

                    //console.log(result)
                    var jsond = JSON.stringify(result.ResultData);
                    var jsonResultData = JSON.parse(jsond)
                    //  var dommain = document.domain + "/" + jsonResultData.URL.substring(0, jsonResultData.URL.indexOf('.'))
                    if (jsonResultData.Result == "Success") {


                        var dommain = window.location.protocol + '//' + window.location.host + '/' + jsonResultData.URL.substring(0, jsonResultData.URL.indexOf('.'))
                        console.log(dommain)

                        alertMessage("Страница дома ", "Для данного объекта создана страница дома, которая находится по адресу : <a onclick='gotoRegist()' target='blank' href='" + dommain + "'>" + dommain + "<a/> ", ":)")
                        $("#close").click(function () {
                            // window.location.href = "RegisterObject.aspx"
                            var cmst = sessionStorage.getItem("ComesTo");
                            var cmsf = sessionStorage.getItem("cmsf");
                            if (cmst == "") {
                                window.location.href = "RegisterObject.aspx"
                            }
                            if (cmsf == "dsp") {
                                window.location.href = 'CreateDisp.aspx'
                            }
                        })

                        window.onclick = function () {


                            var cmst = sessionStorage.getItem("ComesTo");
                            var cmsf = sessionStorage.getItem("cmsf");
                            if (cmst == "") {
                                window.location.href = "RegisterObject.aspx"
                            }
                            if (cmsf == "dsp") {
                                window.location.href = 'CreateDisp.aspx'
                            }

                        }

                    }
                    else {
                        alertMessage(" ", "Для Вашего объекта не удалось создать страницу дома.", "")
                        $("#close").click(function () {
                            // window.location.href = "RegisterObject.aspx"
                            var cmst = sessionStorage.getItem("ComesTo");
                            var cmsf = sessionStorage.getItem("cmsf");
                            if (cmst == "") {
                                window.location.href = "RegisterObject.aspx"
                            }
                            if (cmsf == "dsp") {
                                window.location.href = 'CreateDisp.aspx'
                            }
                        })

                        window.onclick = function () {


                            var cmst = sessionStorage.getItem("ComesTo");
                            var cmsf = sessionStorage.getItem("cmsf");
                            if (cmst == "") {
                                window.location.href = "RegisterObject.aspx"
                            }
                            if (cmsf == "dsp") {
                                window.location.href = 'CreateDisp.aspx'
                            }

                        }
                    }
                    $("#loader,.ui-loader-background").hide();
                    // console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                },

                error: function (r) {
                    addDomain(ObjectId)
                    var jsonerr = JSON.parse(r)
                    if (jsonerr.readyState == 4) {
                        window.location.href = "RegisterObject.aspx"
                        $("#loader,.ui-loader-background").hide();
                    }
                    // //alert("Error");
                    console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                },
                failure: function (r) {
                    alert("FAIL");
                }
            });

        }
        //alert(id);





        $("#files").change(function () {

            var filePath = $('#files').val();

            if (filePath.length != 0) {
                $("#loader,.ui-loader-background").show();
                var index = filePath.lastIndexOf("\\") + 1;
                var filename = filePath.substr(index);
                var ext = this.value.split('.').pop();
                ext = ext.toLowerCase()
                if (ext == "jpg" || ext == "jpeg" || ext == "png") {
                    readURL(this, filename);
                    $("#flS").hide();
                }
                else {
                    $("#files").val('');
                    $("#loader,.ui-loader-background").hide()
                    $("#flS").text("Неверный  формат файла  ").show();
                }

            }


        })
        function readURL(input, imgName) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {


                    $('.foto').attr('src', e.target.result);

                    //var nameImg = imgName
                    //var arrayBuffer = reader.result
                    //var bytes = new Uint8Array(arrayBuffer);
                    //var obj = { baseString: bytes, imgName: nameImg };
                    var formData = new FormData();
                    var file = document.getElementById("files").files[0];

                    formData.append('file', file, encodeURI(file.name));
                    formData.append('object_id', '1');
                    //console.log(formData);



                    $.ajax({
                        type: "POST",
                        url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",//"../WCFServices/Constructor_API.svc/UploadFile"
                        data: formData,
                        type: 'POST',
                        contentType: "multipart/form-data",
                        processData: false,
                        // //async: false,
                        success: function (result) {

                            //console.log(result)
                            //alert("OK. See Console -  press F12");
                            // console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                            //var jsondata_1 = jQuery.parseJSON(result)
                            //var jsondata_1 = JSON.stringify(result)
                            // var jsondata_1 = JSON.parse(result)
                            $('.foto').attr('src', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))//replace('~', '..'))
                            $("#loader,.ui-loader-background").hide();

                        },

                        error: function (r) {
                            $(".foto").attr('src', '/img/brickdom.png')
                            $("#loader,.ui-loader-background").hide();
                            //// //alert("Error");
                            //var jsonEroorData = JSON.parse(r);
                            //if (jsonEroorData.readyState==4) {
                            //    $('.foto').attr('src', result.URL.replace('~', '..'))
                            //    $("#loader,.ui-loader-background").hide();
                            //}
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                            //console.log("AJAX error in request: " + JSON.stringify(datas, null, 2));

                            var filePath = $('#files').val();
                            var index = filePath.lastIndexOf("\\") + 1;
                            var filename = filePath.substr(index);
                            readURL(input, filename)
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });


                }


            }
        }
        $("#adr").focus(function () {
            var manual = $("#manu").prop('checked');
            if (manual == true) {
                $("#adrList").empty().hide();
            }
        })
        $("#adr").keyup(function () {
            $("#adrList").empty();
            var adres = $("#adr").val();

            if (adres.length >= 4) {
                var manual = $("#manu").prop('checked');
                if (manual == false) {
                    searchAdress(adres)

                }
            }


        })

    }

    if (loc == "/Client_Admin/RegisterObject.aspx") {
        sessionStorage.setItem("ObjId", "");
        sessionStorage.setItem("ComesTo", "")
        sessionStorage.setItem("cmsf_O", "")
        sessionStorage.setItem("currentDatas", "")

        $("#loader,.ui-loader-background").hide();
        /// sessionStorage.setItem("UoId", uoI_d)
        var u_o_Id = sessionStorage.getItem("UoId")
        if (u_o_Id == "" || u_o_Id == null) {
            GetObject_adress(Id)

        }
        else {
            getObjMan(Id, u_o_Id)
        }


        //  $('#objs').find('tr').find('td').find('a').click(function () { alert($(this).attr('itemid')) })
    }

    function getObjMan(clId, u_o) {
        var o_b_j = {
            cl: clId,
            uo: u_o
        };


        $.ajax({
            type: "POST",
            url: "RegisterObject.aspx/getObjForman",
            data: JSON.stringify(o_b_j),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //console.log(""": "+result)
                var jsondata_1 = JSON.parse(result.d)

                for (var i = 0; i < jsondata_1.length; i++) {
                    $("#objs").append('<tr><td class="left"> <a  href="CreateOpject.aspx"  onclick="DetailObj(' + jsondata_1[i].Object_Id + ')">' + jsondata_1[i].ObjectAdress + '<a/></td><td><img class="foto-obekt" src="' + jsondata_1[i].ObjectPhoto + '"></td> <td> ' + jsondata_1[i].MAN_COMP_NAME + '</td></tr>')
                }
            },

            error: function (r) {
                // //alert("Error");
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                alert("FAIL");
            }
        });
    }

    if (loc == "/Client_Admin/RegisterUO.aspx") {
        $("#loader,.ui-loader-background").hide();
        sessionStorage.setItem("cmsf_uo", "");
        sessionStorage.setItem("UOID", "");
        GetUOList(Id);

    }

    var charRepeats = function (str) {
        for (var i = 0; i < str.length; i++) {
            if (str.indexOf(str[i]) !== str.lastIndexOf(str[i])) {
                return false; // repeats
            }
        }
        return true;
    }
    function alertMessage(Header_, text_, footer_) {
        $("#mh").text(Header_);
        $("#txt").append(text_);
        $("#mf").text(footer_)
        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        $("#close").click(function () {
            modal.style.display = "none";
        })
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    function getModulesBylgId(to, lg_, SearchText_) {
        var obj7 = { Lg: lg_ }
        $.ajax({
            type: "POST",
            url: "Accounts.aspx/getmodulNamebyid",
            data: JSON.stringify(obj7),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                // console.log(result)

                var jsondata_ = JSON.parse(result.d)

                //console.log(jsondata_)
                for (var i = 0; i < jsondata_.length; i++) {
                    $(to).append('<a href="CreateAccount.aspx" style="line-height:2;" onclick="DetailAcc(' + lg_ + ')">' + jsondata_[i].MODUL_NAME + '</a><br/>')
                }

                $('#UoBody').children('tr').each(function () {
                    $(this).children('td').each(function () {


                        var regex = new RegExp(SearchText_, 'gi');
                        $(this).children('a:contains("' + SearchText_ + '")').html($(this).text().replace(regex, "<span style='background:yellow'>" + SearchText_ + "</span>"));


                    })
                })
            },

            error: function (r) {
                // //alert("Error");
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                alert("FAIL");
            }
        });
    }

    function getRolesBylgId(to, l_g, SearchText_) {
        var obj8 = { lg: l_g }
        $.ajax({
            type: "POST",
            url: "Accounts.aspx/GetRolesNameById",
            data: JSON.stringify(obj8),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                // console.log(result)

                var jsondata_ = JSON.parse(result.d)

                //console.log(jsondata_)
                for (var i = 0; i < jsondata_.length; i++) {
                    $(to).append('<a href="CreateAccount.aspx" style="line-height:2;" onclick="DetailAcc(' + l_g + ')">' + jsondata_[i].ROLE_NAME + '</a><br/>')
                }
                $('#UoBody').children('tr').each(function () {
                    $(this).children('td').each(function () {


                        var regex = new RegExp(SearchText_, 'gi');
                        $(this).children('a:contains("' + SearchText_ + '")').html($(this).text().replace(regex, "<span style='background:yellow'>" + SearchText_ + "</span>"));


                    })
                })

            },

            error: function (r) {
                // //alert("Error");
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                alert("FAIL");
            }
        });
    }
    function getAccList(c_Id) {
        var obj = {
            clId: c_Id
        };
        $.ajax({
            type: "POST",
            url: "Accounts.aspx/GetACCList",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                // console.log(result)

                var jsondata_ = JSON.parse(result.d)

                console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {
                    //console.log(jsondata_[i].LOG_IN_ID)
                    //<td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].PASSWORD + '</a></td>
                    $("#uz1").after('<tr><td><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].LOG_IN_ID + '</a></td > <td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].ACCOUNT_NAME + '</a></td><td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].PHONE_NUMBER + '</a></td> <td><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].E_MAIL + '</a></td><td id="Mm' + jsondata_[i].LOG_IN_ID + '"></td><td id="Rr' + jsondata_[i].LOG_IN_ID + '"></td></tr >')
                    var to_ = "#Mm" + jsondata_[i].LOG_IN_ID
                    var To_2 = "#Rr" + jsondata_[i].LOG_IN_ID;
                    // $("#em" + jsondata_[i].LOG_IN_ID + "").after('""')
                    getModulesBylgId(to_, jsondata_[i].LOG_IN_ID)
                    getRolesBylgId(To_2, jsondata_[i].LOG_IN_ID)
                }

            },

            error: function (r) {
                //  //alert("Error");
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                alert("FAIL");
            }
        });
    }
    function PopupModulSelect(Header_, chks) {
        $("#mh3").text(Header_);
        var parsedLink = JSON.parse(chks)
        //console.log(parsedLink)
        for (var i = 0; i < parsedLink.length; i++) {
            $(".modal-body3").append('<input type="checkbox" class="sms" itemid="' + parsedLink[i].MODUL_ID + '"/>' + parsedLink[i].MODUL_NAME + '<hr/>')
        }
        parsedLink = [];
        // console.log(parsedLink)
        var modal = document.getElementById('myModal3');
        var span = document.getElementsByClassName("close_3")[0];
        modal.style.display = "block";
        $("#close_3,#cls3").click(function () {
            modal.style.display = "none";
            //link_.splice(0, link_.length)
            // link_ = [];
            // link_.pop();
            $(".modal-body3").empty();

        })
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                // link_.splice(0, link_.length)
                // link_ = [];
                $(".modal-body3").empty();
            }
        }
    }
    function PopupRoleSelect(Header_, chks) {
        $("#mh4").text(Header_);
        var parsedLink = JSON.parse(chks)
        //console.log(parsedLink)
        for (var i = 0; i < parsedLink.length; i++) {
            $("#modal-body4").append('<input type="checkbox" class="srs" itemid="' + parsedLink[i].ROLE_ID + '"/>' + parsedLink[i].ROLE_NAME + '<hr/>')
        }
        parsedLink = [];
        // console.log(parsedLink)
        var modal = document.getElementById('myModal4');
        var span = document.getElementById("close_4")[0];
        modal.style.display = "block";
        $("#close_4,#cls4").click(function () {
            modal.style.display = "none";
            //link_.splice(0, link_.length)
            // link_ = [];
            // link_.pop();
            $("#modal-body4").empty();

        })
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                // link_.splice(0, link_.length)
                // link_ = [];
                $("#modal-body4").empty();
            }
        }
    }
    function get_HasModul_S(CL) {
        var chks_ = [];
        var o_bj = {
            C: CL
        };
        $.ajax({
            type: "POST",
            url: "Accounts.aspx/GetHasModules",
            data: JSON.stringify(o_bj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                // console.log(result)

                var jsondata_ = JSON.parse(result.d)
                for (var i = 0; i < jsondata_.length; i++) {
                    chks_.push({ "MODUL_ID": jsondata_[i].MODUL_ID, "MODUL_NAME": jsondata_[i].MODUL_NAME })
                }
                PopupModulSelect("Выберите Модули", JSON.stringify(chks_));
                //console.log(jsondata_)

            },

            error: function (r) {
                //  //alert("Error");
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                alert("FAIL");
            }
        });
    }
    function get_HasRole_S(CL) {
        var chks_c = [];
        var o_bj = {
            C: CL
        };
        $.ajax({
            type: "POST",
            url: "Accounts.aspx/GetHasRoles",
            data: JSON.stringify(o_bj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //console.log(result)

                var jsondata_ = JSON.parse(result.d)
                for (var i = 0; i < jsondata_.length; i++) {
                    chks_c.push({ "ROLE_ID": jsondata_[i].ROLE_ID, "ROLE_NAME": jsondata_[i].ROLE_NAME })
                }
                PopupRoleSelect("Выберите Роли", JSON.stringify(chks_c));
                //console.log(jsondata_)

            },

            error: function (r) {
                //  //alert("Error");
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                alert("FAIL");
            }
        });
    }
    function gets_rtModulesAcc(Cl, chkms) {
        $("#UoBody tr:not(:first)").remove();
        var o_bj2 = {
            C: Cl,
            modules: chkms
        };

        //alert(JSON.stringify(obj));
        //$("#uz1").after('')
        $.ajax({
            type: "POST",
            url: "Accounts.aspx/getAccForSelModul",
            data: JSON.stringify(o_bj2),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                // console.log(result)

                var jsondata_ = JSON.parse(result.d)

                //console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {
                    //console.log(jsondata_[i].LOG_IN_ID)
                    //<td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>******</a></td>
                    $("#uz1").after('<tr><td><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].LOG_IN_ID + '</a></td > <td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].ACCOUNT_NAME + '</a></td><td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].PHONE_NUMBER + '</a></td> <td><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].E_MAIL + '</a></td><td id="Mm' + jsondata_[i].LOG_IN_ID + '"></td><td id="Rr' + jsondata_[i].LOG_IN_ID + '"></td></tr >')
                    var to_ = "#Mm" + jsondata_[i].LOG_IN_ID
                    var To_2 = "#Rr" + jsondata_[i].LOG_IN_ID;
                    // $("#em" + jsondata_[i].LOG_IN_ID + "").after('""')
                    getModulesBylgId(to_, jsondata_[i].LOG_IN_ID)
                    getRolesBylgId(To_2, jsondata_[i].LOG_IN_ID)
                }

            },

            error: function (r) {
                // //alert("Error");
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                // alert("FAIL");
            }
        })



    }
    function gets_rtRolesAcc(Cl, chkRs) {
        $("#UoBody tr:not(:first)").remove();
        var o_b_j2 = {
            C: Cl,
            rls: chkRs
        };

        //alert(JSON.stringify(obj));
        //$("#uz1").after('')
        $.ajax({
            type: "POST",
            url: "Accounts.aspx/getAccForSelRole",
            data: JSON.stringify(o_b_j2),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                // console.log(result)

                var jsondata_ = JSON.parse(result.d)

                //console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {
                    //console.log(jsondata_[i].LOG_IN_ID)
                    //<td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>******</a></td>
                    $("#uz1").after('<tr><td><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].LOG_IN_ID + '</a></td > <td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].ACCOUNT_NAME + '</a></td><td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].PHONE_NUMBER + '</a></td> <td><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].E_MAIL + '</a></td><td id="Mm' + jsondata_[i].LOG_IN_ID + '"></td><td id="Rr' + jsondata_[i].LOG_IN_ID + '"></td></tr >')
                    var to_ = "#Mm" + jsondata_[i].LOG_IN_ID
                    var To_2 = "#Rr" + jsondata_[i].LOG_IN_ID;
                    // $("#em" + jsondata_[i].LOG_IN_ID + "").after('""')
                    getModulesBylgId(to_, jsondata_[i].LOG_IN_ID)
                    getRolesBylgId(To_2, jsondata_[i].LOG_IN_ID)
                }

            },

            error: function (r) {
                //  //alert("Error");
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                // alert("FAIL");
            }
        })
    }

    if (loc == "/Client_Admin/Accounts.aspx") {

        sessionStorage.setItem("cmsf_a", "");
        var ClId = sessionStorage.getItem("Clien_ID")

        sessionStorage.setItem("LogId", "")
        // ClId = 223;//""

        getAccList(ClId)
        //alert(JSON.stringify(obj));
        $("#md").click(function () { get_HasModul_S(ClId) })
        $("#rl").click(function () { get_HasRole_S(ClId) })

        $("#gSrtModul").click(function () {
            var chkMs = []
            $(".sms").each(function () {
                // some staff

                var chkModul = $(this).prop('checked')
                if (chkModul == true) {
                    //  console.log()
                    chkMs.push({ "MODUL_ID": $(this).attr('itemid') })

                    // $("#myModal3").hide();

                }
            });
            if (chkMs.length != 0) {
                gets_rtModulesAcc(ClId, chkMs)
                chkMs = []
                $("#ld").attr('class', 'nsortA')
                $("#fi_o").attr('class', 'nsortA')
                $("#rl").attr('class', 'nsortA')
                $("#md").attr("class", "sortingA")
            }


        })
        $("#get_Srs").click(function () {
            var chkRs = []
            $(".srs").each(function () {
                var chkRole = $(this).prop('checked')
                if (chkRole == true) {
                    chkRs.push({ "ROLE_ID": $(this).attr('itemid') })
                }
            })
            if (chkRs.length != 0) {
                gets_rtRolesAcc(ClId, chkRs)
                chkRs = [];
                $("#ld").attr('class', 'nsortA')
                $("#fi_o").attr('class', 'nsortA')
                $("#md").attr('class', 'nsortA')
                $("#rl").attr("class", "sortingA")
            }

        })

        $("#SearchAcc").keyup(function () {
            $("#UoBody tr:not(:first)").remove();
            var SearchText_ = $(this).val();
            if (SearchText_.length != 0) {
                var obj = {
                    Stext_: SearchText_, clId: ClId
                };
                //alert(JSON.stringify(obj));
                $("#ld,#fi_o,#em_ail,#md,#rl").hide();
                $.ajax({
                    type: "POST",
                    url: "Accounts.aspx/SearchAcc",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        //console.log(result)

                        var jsondata_ = JSON.parse(result.d)

                        //console.log(jsondata_)

                        for (var i = 0; i < jsondata_.length; i++) {

                            // <td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>*****</a></td>
                            $("#uz1").after('<tr><td><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].LOG_IN_ID + '</a></td ><td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].ACCOUNT_NAME + '</a></td><td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].PHONE_NUMBER + '</a></td> <td><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].E_MAIL + '</a></td><td id="Mm' + jsondata_[i].LOG_IN_ID + '"></td><td id="Rr' + jsondata_[i].LOG_IN_ID + '"></td></tr >')
                            var to_ = "#Mm" + jsondata_[i].LOG_IN_ID
                            var To_2 = "#Rr" + jsondata_[i].LOG_IN_ID;
                            $('#UoBody').children('tr').each(function () {
                                $(this).children('td').each(function () {

                                    // a:contains("' + SearchText_+'")
                                    var regex = new RegExp(SearchText_, 'gi');
                                    $(this).children('a:contains("' + SearchText_ + '")').html($(this).text().replace(regex, "<span style='background:yellow'>" + SearchText_ + "</span>"));


                                })
                            })
                            // $("#em" + jsondata_[i].LOG_IN_ID + "").after('""')
                            getModulesBylgId(to_, jsondata_[i].LOG_IN_ID, SearchText_)
                            getRolesBylgId(To_2, jsondata_[i].LOG_IN_ID, SearchText_)
                        }
                        //' + jsondata_[i].MODULE_ROLES + '
                    },

                    error: function (r) {
                        ////alert("Error");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        // alert("FAIL");
                    }
                });
            }
            else {
                $("#ld,#fi_o,#em_ail,#md,#rl").show();
                var obj = {
                    clId: ClId
                };
                //alert(JSON.stringify(obj));
                $("#uz1").after('')
                $.ajax({
                    type: "POST",
                    url: "Accounts.aspx/GetACCList",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        // console.log(result)

                        var jsondata_ = JSON.parse(result.d)

                        //console.log(jsondata_)

                        for (var i = 0; i < jsondata_.length; i++) {
                            //console.log(jsondata_[i].LOG_IN_ID)
                            //<td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].PASSWORD + '</a></td>
                            $("#uz1").after('<tr><td><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].LOG_IN_ID + '</a></td > <td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].ACCOUNT_NAME + '</a></td><td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].PHONE_NUMBER + '</a></td> <td><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].E_MAIL + '</a></td><td id="Mm' + jsondata_[i].LOG_IN_ID + '"></td><td id="Rr' + jsondata_[i].LOG_IN_ID + '"></td></tr >')
                            var to_ = "#Mm" + jsondata_[i].LOG_IN_ID
                            var To_2 = "#Rr" + jsondata_[i].LOG_IN_ID;
                            // $("#em" + jsondata_[i].LOG_IN_ID + "").after('""')
                            getModulesBylgId(to_, jsondata_[i].LOG_IN_ID)
                            getRolesBylgId(To_2, jsondata_[i].LOG_IN_ID)
                        }

                    },

                    error: function (r) {
                        // //alert("Error");
                        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    },
                    failure: function (r) {
                        // alert("FAIL");
                    }
                });
            }
        })
        $("#SaveMO").click(function () { sessionStorage.setItem("ComesTo", ""); window.location.href = "CreateAccount.aspx" })
    }
    function CheckEmail(eml) {
        var obj = {
            email: eml
        };
        //alert(JSON.stringify(obj));

        $.ajax({
            type: "POST",
            url: "CreateAccount.aspx/CheckMail",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_2 = JSON.parse(data.d)
                if (jsondata_2.result == 0) {
                    $("#yesmail").hide();
                    $("#Uomail").hide();
                    $("#Uomail").html("")
                }
                else {
                    $("#yesmail").show();//
                    $("#Uomail").html('Данный e-mail уже зарегистрирован в системе<br/>').show();//.text("Данный e-mail уже зарегистрирован в системе").show();
                }

            }
        })
    }
    if (loc == "/Client_Admin/CreateAccount.aspx") {
        $("#fio").keyup(function () { $("#Uofio,#yesfio").hide() })
        $("#phone1").keyup(function () { $("#yesPhone,#UoPhone").hide() })
        $("#loader,.ui-loader-background").hide();
        $("#pass").keyup(function () {
            var password = $(this).val();
            if (password.length > 5) {
                $("#yesC").hide();
                $("#UoPass_").hide();
                var numbers_ = /[0-9]/g
                var upperCaseLetters = /[A-Z]/g;
                var lowerCaseLetters = /[a-z]/g
                if (password.match(/[a-z]/g) || password.match(/[A-Z]/g)) {
                    $("#yesC").hide();
                    $("#UoPass_").hide();
                    if (password.match(/(.)\1/)) {
                        $("#yesC").show();
                        $("#UoPas_").html('Пароль должен содержать символы в разных регистрах<br/>').show()//.text("Пароль должен содержать символы в разных регистрах").show();
                        //
                    }
                    else {
                        $("#yesC").hide();
                        $("#UoPas_").hide();
                    }
                    if (password.match(numbers_) && password.match(upperCaseLetters) && password.match(lowerCaseLetters)) {
                        $("#yesC").hide();
                        $("#UoPas_").hide();
                    }
                    else {
                        $("#yesC").show();
                        $("#UoPas_").html('Пароль должен содержать символы в разных регистрах<br/>').show()//.text("Пароль должен содержать символы в разных регистрах").show();//
                    }
                }
                else {
                    $("#yesC").show();
                    $("#UoPas_").html('Пароль должен содержать латинские символы и цифры<br/>').show()//.text("Пароль должен содержать латинские символы и цифры").show();
                }
                if (!password.match(numbers_)) {
                    $("#yesC").show();
                    $("#UoPas_").html('Пароль должен содержать латинские символы и цифры<br/>').show()//.text("Пароль должен содержать латинские символы и цифры").show();
                }
            }
            else {
                $("#yesC").show();
                $("#UoPas_").html('Данное поле должно содержать как минимум 6 символов<br/>').show();//.text("Данное поле должно содержать как минимум 6 символов").show();
            }
  
        })
        $("#email").keyup(function () {
            var email = $(this).val();
            if (isValidEmailAddress(email)) {
                $("#yesmail").hide();
                $("#Uomail").hide();
                $("#Uomail").html('""')
                CheckEmail(email);
            }
            else {
                $("#yesmail").show();
                $("#Uomail").html('Введенное значение не соответствует формату электронной почты<br/>').show();
            }
        })
        sessionStorage.setItem("itmId", null)
        SMRvalues.splice(0, SMRvalues);
        sessionStorage.setItem("PreviousText", "");
        //alert(loc)
        var ClId = sessionStorage.getItem("Clien_ID")//localStorage.setItem("Clien_ID", jsondata.Id)

        var LogId = sessionStorage.getItem("LogId")
        if (LogId == "") {
            $("#DeleteAcc").hide();

            //getModul("#modul", 1);
            getModules2("", 0, "")

            $("#CreateAcc").text("Создать новую учетную запись")
            $("#CreateAcc").click(function () {
                //var roltext = $("#role").val();

                // alert(roltext)

                var Login = $("#login").val()
                var email = $("#email").val();
                var pass = $("#pass").val();
                var fio = $("#fio").val();
                var phone = $("#phone1").val();//
                if (pass.length != 0) {
                    $("#yesmail").hide();
                    // $("#Uomail").hide();

                    if (fio.length != 0) {
                        $("#UoPas_").hide();
                        $("#yesC").hide();
                        if (phone.length != 0) {
                            $("#Uofio").hide();
                            $("#yesfio").hide();
                            if (email.length != 0) {


                                //$("#Uomail").text("Данный e-mail уже зарегистрирован в системе").show();
                                if (isValidEmailAddress(email) && $("#Uomail").html() != 'Введенное значение не соответствует формату электронной почты"<br/>' && $("#Uomail").css('display') == 'none') {

                                    var countofItem = $('#mrss .rls').length //sessionStorage.getItem("itmId");
                                    var Modul;
                                    var Role;
                                    var MR;
                                    var sm = [];
                                    var sr = []
                                    var obj = [];
                                    for (var i = 0; i < countofItem; i++) {
                                        Modul = $(".mdls:eq(" + i + ") option:selected").val();
                                        Role = $(".rls:eq(" + i + ") option:selected").val();
                                        //  MR += "Smodul: " + Modul + " SRole: " + Role+"\n";
                                        //sm.push({ 'Sm': Modul })
                                        //sr.push({'Sr': Role})
                                        // obj = [[Modul, Role]]
                                        if (Modul != 0 && Role != 0) {

                                            obj.push({ 'sm': Modul, 'sr': Role })
                                        }
                                    }

                                    $("#UoPhone").hide();
                                    $("#yesPhone").hide()
                                    if ($("#Uomail").css('display') == 'none' && $("#Uofio").css('display') == 'none' && $("#UoPhone").css('display') == 'none') {

                                        if (obj.length != 0) {


                                            var jsonObj = { 'SMSR': obj, 'accName_': fio, 'PNumb_': phone, 'Email_': email, 'Pass_': pass, 'ClId_': ClId, 'Login_': Login }
                                            $.ajax({
                                                type: "POST",
                                                url: "CreateAccount.aspx/SaveAcc",
                                                data: JSON.stringify(jsonObj),
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                                                success: function (data) {
                                                    //console.log(data.d)
                                                    var jsondata = $.parseJSON(data.d);
                                                    if (jsondata.result == 1) {
                                                        var comesTo = sessionStorage.getItem("ComesTo");//vck
                                                        // var cmsf = sessionStorage.getItem('cmsf')
                                                        //    if (comesTo == "ED") {
                                                        var ID = $("#login").val()
                                                        ID = ID.substr(ID.indexOf('_') + 1)
                                                        var f_io = $("#fio").val();
                                                        var Modul1 = $(".mdls[itemid=0]").val();
                                                        var Role1 = $(".rls[itemid=0]").val();
                                                        var arrAcc = [];
                                                        arrAcc.push({ "ID": ID, "f_io": f_io, "Modul1": Modul1, "Role1": Role1 })
                                                        sessionStorage.setItem("ComesTo", JSON.stringify(arrAcc));


                                                        //  }
                                                        var log_Id = sessionStorage.getItem("Log")
                                                        SaveLog("Создать новую учетную запись", "Простое", "Администратор", "Клиентское администрирование", "В системе создана учетная запись  (" + fio + ")", log_Id);
                                                        var cmsf_a = sessionStorage.getItem("cmsf_a");
                                                        window.location.href = (cmsf_a.length != 0) ? cmsf_a : "Accounts.aspx";
                                                        // window.location.href = document.referrer;
                                                        //  else if (comesTo=="dsp") {
                                                        //      var log_Id = sessionStorage.getItem("Log")
                                                        //      SaveLog("Создать новую учетную запись", "Простое", "Администратор", "Клиентское администрирование", "Создать новую учетную запись (" + fio + ")", log_Id);
                                                        //      window.location.href = "/Client_Admin/CreateDisp.aspx";
                                                        //  }

                                                        //else  if (comesTo == "OB" ) {
                                                        //      var log_Id = sessionStorage.getItem("Log")
                                                        //      SaveLog("Создать новую учетную запись", "Простое", "Администратор", "Клиентское администрирование", "Создать новую учетную запись (" + fio + ")", log_Id);
                                                        //      window.location.href = "/Client_Admin/CreateOpject.aspx";
                                                        //      // sessionStorage.removeItem("ComesTo")
                                                        //      // sessionStorage.setItem("ComesTo", null)
                                                        //  }
                                                        //  else if ( comesTo == "" ) {
                                                        //      var log_Id = sessionStorage.getItem("Log")
                                                        //      SaveLog("Создать новую учетную запись", "Простое", "Администратор", "Клиентское администрирование", "Создать новую учетную запись (" + fio + ")", log_Id);
                                                        //      window.location.href = "Accounts.aspx"
                                                        //  }


                                                    }
                                                    //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                                                },

                                                error: function (r) {
                                                    ////alert("Error");
                                                    console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                                                },
                                                failure: function (r) {
                                                    alert("FAIL");
                                                }
                                            })
                                        }
                                        else {
                                            //alertMessage(":(", "Выберите Модуль и Роль", ":(")
                                            $("#mrs").show();
                                            //$("#mrsIm").text("Выберите Модуль и Роль").show();
                                            $("#mrsIm").html('Выберите Модуль и роль<br/>').show()
                                        }


                                    }
                                }
                                else {
                                    $("#yesmail").show();
                                    if ($("#Uomail").html() == 'Данный e-mail уже зарегистрирован в системе<br>') {
                                        $("#Uomail").html('<img Данный e-mail уже зарегистрирован в системе<br>').show();//
                                    }
                                    else {
                                        $("#Uomail").html('<img Введенное значение не соответствует формату электронной почты<br/>').show();//
                                    }

                                }//
                            }
                            else {
                                $("#Uomail").html('Пожалуйста, заполните данное поле<br/>').show();
                            }
                        }
                        else {
                            $("#UoPhone").html('Пожалуйста, заполните данное поле<br/>').show();
                            $("#yesPhone").show();
                        }

                    }
                    else {
                        $("#Uofio").html('Пожалуйста, заполните данное поле<br/>').show();
                        $("#yesfio").show();
                    }
                }
                else {//id="yesC" style="float:left;""
                    $("#UoPas_").html('Пожалуйста, заполните данное поле<br/>').show();
                    $("#yesC").show();


                    //  alertMessage("Неправильный формат", "Введите правильный формат электронной почты", ":(")
                }
            });
            getLogin()
            $("#knp1").attr('disabled', 'disabled').attr("class", "knp1 deActiveAdd")//.attr("style","background-color: rgb(149,153,156);color:  white;font-family: unset;font-weight: 700;border: none;")//.css("background-color","rgb(149, 149, 149)")

        }
        else {
            $("#pass").keypress(function () { sessionStorage.setItem("p", "1") })
            $("#DeleteAcc").show();
            //$("#CreateAcc").text("Обновить")

            //alert(LogId);
            getDetailAcc(LogId)
            GetModeRole(LogId)
            $("#DeleteAcc").click(function () {

                alertWithButton("Вы действительно хотите удалить учетную запись?", " " + $("#fio").val() + " ", "")
            })
            $("#deleteO").click(function () { DeleteAccount(LogId) })

            $("#CreateAcc").click(function () {
                //var roltext = $("#role").val();

                // alert(roltext)

                var Login = $("#login").val().trim();
                var email = $("#email").val().trim();
                var p = sessionStorage.getItem("p")
                var pass = (p == 1) ? $("#pass").val().trim() : "";
                var fio = $("#fio").val().trim();
                var phone = $("#phone1").val();
                var UoPasvsbl = $("#UoPas_").css("display");
                if (UoPasvsbl != "block") {//isValidEmailAddress(email)
                    //if (pass.length != 0) {
                    //if (pass.length > 5) {
                    var numbers_ = /[0-9]/g
                    var upperCaseLetters = /[A-Z]/g;
                    var lowerCaseLetters = /[a-z]/g;

                    //if ((pass.match(numbers_) && pass.match(upperCaseLetters) && pass.match(lowerCaseLetters))||pass=="") {
                    if (fio.length != 0) {
                        if (phone.length != 0) {
                            if (isValidEmailAddress(email) && email.length != 0 && $("#Uomail").html() != 'Введенное значение не соответствует формату электронной почты"<br/>' && $("#Uomail").css('display') == 'none') {
                                var countofItem = $('#mrss .rls').length//sessionStorage.getItem("itmId");
                                var Modul;
                                var Role;
                                var MR;
                                var sm = [];
                                var sr = []
                                var obj = [];
                                var deletebtnVsblt = $("#DeleteAcc").css("display")
                                for (var i = 0; i < countofItem; i++) {
                                    Modul = $(".mdls:eq(" + i + ") option:selected").val();//$("#modul" + i + " option:selected").val();
                                    Role = $(".rls:eq(" + i + ") option:selected").val();//$("#role" + i + " option:selected").val();
                                    //  MR += "Smodul: " + Modul + " SRole: " + Role+"\n";
                                    //sm.push({ 'Sm': Modul })
                                    //sr.push({'Sr': Role})
                                    // obj = [[Modul, Role]]
                                    if (deletebtnVsblt == "none") {
                                        Modul = 3;
                                        Role = 4;
                                        obj.push({ 'sm': 3, 'sr': 4 })
                                    }
                                    else {

                                        obj.push({ 'sm': Modul, 'sr': Role })
                                    }
                                }
                                if (Modul != 0 && Role != 0) {
                                    var jsonObj = { 'SMSR': obj, 'accName_': fio, 'PNumb_': phone, 'Email_': email, 'Pass_': pass, 'ClId_': ClId, 'Login_': Login, "LgId": LogId }
                                    $.ajax({
                                        type: "POST",
                                        url: "CreateAccount.aspx/UpdateAcc",
                                        data: JSON.stringify(jsonObj),
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        success: function (data) {
                                            //console.log(data.d)
                                            var jsondata = $.parseJSON(data.d);
                                            if (jsondata.result == 1) {
                                                var log_Id = sessionStorage.getItem("Log");
                                                SaveLog("Сохранить изменения", "Простое", "Администратор", "Клиентское администрирование", "Изменены настройки учетной записи (" + fio + ")", log_Id);
                                                window.location.href = "Accounts.aspx"
                                            }
                                            //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                                        },

                                        error: function (r) {
                                            // //alert("Error");
                                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                                        },
                                        failure: function (r) {
                                            // alert("FAIL");
                                        }
                                    });
                                }
                                else {
                                    $("#mrs").show();
                                    $("#mrsIm").html('Выберите Модуль и роль<br/>').show()//.text("Выберите Модуль и роль").show();
                                }
                            }
                            else {
                                $("#yesmail").show();
                                if ($("#Uomail").html() == 'Данный e-mail уже зарегистрирован в системе<br>') {
                                    $("#Uomail").html('Данный e-mail уже зарегистрирован в системе<br>').show();//
                                }
                                else {
                                    $("#Uomail").html('Введенное значение не соответствует формату электронной почты<br/>').show();//
                                }
                            }


                        }
                        else {
                            // alertMessage("Пустые место осталось", "Не оставляйте поле Мобильный телефон пустым", ":(")
                            $("#UoPhone").html('Пожалуйста, заполните данное поле<br/>').show()//.text("Пожалуйста, заполните данное поле").show();//
                            $("#yesfio").show();//.text("Не оставляйте поле Мобильный телефон пустым").show();
                            $("#yesPhone").show();
                        }

                    }
                    else {
                        //alertMessage("Пустые место осталось", "Не оставляйте поле Наименование (Ф.И.О.) пустым", ":(")
                        $("#Uofio").html('Пожалуйста, заполните данное поле<br/>').show()//.text("Пожалуйста, заполните данное поле").show();//
                        $("#yesfio").show();
                    }
                    //}
                    //else {
                    //    alertMessage("Неправильный формат", "Пароль должен состоять, как минимум,из 6 символов. В пороле должны присустствовать символы латинского алфавита и цифры.Пароль должен содержать хотя бы по одному символу в верхнем и нижнем регитсре", ":(")
                    //}
                    //}
                    //else {
                    //    alertMessage("Пароль слишком низкий", "Пароль должен состоять, как минимум,из 6 символов.", ":(")
                    //}
                    //}
                    //else {
                    //    alertMessage("Пустые место осталось", "Не оставляйте поле пароль пустым", ":(")
                    //}
                }
                else {
                    // alertMessage("Неправильный формат", "Введите правильный формат электронной почты", ":(")
                }
            });


        }
        function getDetailAcc(lg) {
            //orx
            // var Id_ = $("#role").val();
            var obj = { "LogId_": lg }
            $.ajax({
                type: "POST",
                url: "Accounts.aspx/GetAccDetail",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                    //console.log(result)

                    var jsondata_ = JSON.parse(result.d)
                    $("#Hacc").text(jsondata_[0].ACCOUNT_NAME)
                    $("#email").val(jsondata_[0].E_MAIL)
                    $("#login").val("Login_" + jsondata_[0].LOG_IN_ID)
                    $("#pass").val(jsondata_[0].PASSWORD)
                    $("#fio").val(jsondata_[0].ACCOUNT_NAME)
                    $("#phone1").val(jsondata_[0].PHONE_NUMBER)
                    if (jsondata_[0].LOGIN == "") {
                        $("#DeleteAcc").hide();
                        $(".col-xs-4").hide();
                    }
                }

            })
        }
        function GetModeRole(lg_) {
            var obj = { "LogId": lg_ }
            var Aj1 = $.ajax({
                type: "POST",
                url: "CreateAccount.aspx/GetModel_Role",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var jsondata_ = JSON.parse(result.d)
                    //console.log(jsondata_.length);
                    //console.log(jsondata_)

                    // getModul("#modul", 1, lg_, jsondata_[0].sm, jsondata_[0].sr)
                    $('.row[itemid=0]').remove();
                    $('.knp1').attr('class', 'knp1 ActiveAdd genBtn').removeAttr('disabled');
                    for (var i = jsondata_.length - 1; i >= 0; i--) {
                        var displayDelete = (jsondata_.length > 1) ? '<input class="knp del" onclick="delElements(' + i + ')" type="button" itemid=' + i + '    value="Удалить">' : '<input class="knp del" style="display:none" onclick="delElements(' + i + ')" type="button" itemid=' + i + '    value="Удалить">'
                        $('#mrss').find('#mrsIm').after('<div class="row" itemid=' + i + '><div class="col-xs-4" itemid=' + i + '> <select class="mdls" onchange="GetRoleByModule(0,' + i + ',0)" itemid=' + i + '><option value= "0"  id= "" > Выберите Модуль</option></select></div><div  class="col-xs-4" itemid=' + i + '><select class="rls" onchange="ChangeRole(' + i + ')" itemid=' + i + '><option value="0"   >Выберите Роль</option></select></div><div class="col-xs-4" itemid=' + i + '>' + displayDelete + '</div></div>')
                        getModules2(jsondata_[i].sr, i, jsondata_[i].sm)
                    }
                    //for (var i = 0; i < jsondata_.length; i++) {//yeni   .row :last
                    //    $('#mrss').find('#mrsIm').after('<div class="row" itemid=' + i + '><div class="col-xs-4" itemid=' + i + '> <select class="mdls" onchange="GetRoleByModule(0,' + i + ',0)" itemid=' + i + '><option value= "0"  id= "" > Выберите Модуль</option></select></div><div  class="col-xs-4" itemid=' + i + '><select class="rls" onchange="ChangeRole(' + i + ')" itemid=' + i + '><option value="0"   >Выберите Роль</option></select></div><div class="col-xs-4" itemid=' + i + '><input class="knp del" onclick="delElements(' + i + ')" type="button" itemid=' + i + '    value="Удалить"></div></div>')
                    //    getModules2(jsondata_[i].sr, i, jsondata_[i].sm)
                    //}

                    //$("#knp1").attr("class", "knp1 ActiveAdd")
                    //for (var i = jsondata_.length; i > 1; i--) {

                    //    if (jsondata_.length == 1) {
                    //       //style="background-color:  rgb(0,147,233);color:  white;font-weight: 700;font-family: unset;border:none;"
                    //        $("div[class='row'][itemid='1']").after('<div class="row" itemid="' + i + '"><div class="col-xs-4" itemid= "' + i + '"><select id="modul' + i + '" onchange="GetRoleById( this,' + i + ' )" itemid="' + i + '"  ><option value="0" id="Mr">Выберите Модуль</option></select></div><div class="col-xs-4" itemid="' + i + '"><select id="role' + i + '" onchange="ActiveBtn(' + i + ')"  ><option value="0" id="Vr" >Выберите Роль</option></select></div><div class="col-xs-4" itemid="' + i + '"><input class="knp' + i + ' ActiveAdd" type="button"  onclick=AddElement(' + i + ') itemid="' + i + '" id="knp' + i + '"  value="Добавить"/><input class="knp del" type="button" itemid="' + i + '" onclick=DeleteElement(' + i + ') style="border: none;background-color: red;color: white;font-family: unset;font-weight: 700;" value="Удалить"/></div></div>')//
                    //    }
                    //    else {
                    //        $("#knp1").hide();
                    //        if (i == jsondata_.length) {//style="background-color:  rgb(0,147,233);color:  white;font-weight: 700;font-family: unset;border:none;"
                    //           // style = "border: none;background-color: red;color: white;font-family: unset;font-weight: 700;"
                    //            $("div[class='row'][itemid='1']").after('<div class="row" itemid="' + i + '"><div class="col-xs-4" itemid= "' + i + '"><select id="modul' + i + '" onchange="GetRoleById( this,' + i + ' )" itemid="' + i + '"  ><option value="0" id="Mr">Выберите Модуль</option></select></div><div class="col-xs-4" itemid="' + i + '"><select id="role' + i + '" onchange="ActiveBtn(' + i + ')"  ><option value="0" id="Vr" >Выберите Роль</option></select></div><div class="col-xs-4" itemid="' + i + '"><input class="knp' + i + ' ActiveAdd" type="button"  onclick=AddElement(' + i + ') itemid="' + i + '" id="knp' + i + '"  value="Добавить"/><input class="knp del" type="button" itemid="' + i + '" onclick=DeleteElement(' + i + ')  value="Удалить"/></div></div>')
                    //        }
                    //        else {//style="display:none;"background-color:  rgb(0,147,233);color:  white;font-weight: 700;font-family: unset;border:none;"
                    //            //style="display:none;border: none;background-color: red;color: white;font-family: unset;font-weight: 700;"
                    //            $("div[class='row'][itemid='1']").after('<div class="row" itemid="' + i + '"><div class="col-xs-4" itemid= "' + i + '"><select id="modul' + i + '" onchange="GetRoleById( this,' + i + ' )" itemid="' + i + '"  ><option value="0" id="Mr">Выберите Модуль</option></select></div><div class="col-xs-4" itemid="' + i + '"><select id="role' + i + '" onchange="ActiveBtn(' + i + ')"  ><option value="0" id="Vr" >Выберите Роль</option></select></div><div class="col-xs-4" itemid="' + i + '"><input class="knp' + i + ' ActiveAdd" type="button"  onclick=AddElement(' + i + ') itemid="' + i + '" id="knp' + i + '" style="display:none;"  value="Добавить"/><input class="knp knp del" type="button" itemid="' + i + '" style="display:none;" onclick=DeleteElement(' + i + ')  value="Удалить"/></div></div>')
                    //        }
                    //    }






                    //}
                    //sessionStorage.setItem("Sval", jsondata_)


                    //for (var i = 1; i < jsondata_.length; i++) {
                    //    getModul("#modul", (i + 1), lg_, jsondata_[i].sm, jsondata_[i].sr)
                    //}
                    //if (jsondata_.length == 55) {
                    //    for (var i = 1; i <= jsondata_.length; i++) {
                    //        $("#knp" + i + "").attr('disabled', 'disabled').css("background-color", "rgb(149,149,149)")
                    //    }
                    //}
                    //else {
                    //    for (var i = 1; i < jsondata_.length; i++) {
                    //        $("#knp" + i + "").attr('disabled', 'disabled').css("background-color", "rgb(149,149,149)")
                    //    }
                    //}

                    sessionStorage.setItem("itmId", jsondata_.length);
                },
                complete: function () { }

            })

        }


        function DeleteAccount(lg) {
            var obj = { "LogId": lg }
            $.ajax({
                type: "POST",
                url: "Accounts.aspx/DeleteAccount",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var log_Id = sessionStorage.getItem("Log");
                    SaveLog("Удалить", "Важное", "Администратор", "Клиентское администрирование", "В системе удален учетный запись (" + $("#fio").val() + ")", log_Id);
                    window.location.href = "Accounts.aspx"
                }

            })
        }
        $("#backAcc").click(function () {
            var cmsf_a = sessionStorage.getItem("cmsf_a");
            // var cmsf = sessionStorage.getItem("cmsf");

            //var last_Loc = document.referrer;
            window.location.href = (cmsf_a.length != 0) ? cmsf_a : "Accounts.aspx";

            //if (cmst == "") {
            //    window.location.href = "Accounts.aspx"
            //}
            //else if (cmst == "OB") {
            //    window.location.href = "/Client_Admin/CreateOpject.aspx"
            //}
            //else if (cmst == "ED")
            //{
            //    var newCmst = []
            //    newCmst.push({ "ID": 0, "f_io": 0, "Modul1": 0, "Role1": 0 })
            //    sessionStorage.setItem("ComesTo", JSON.stringify(newCmst))
            //    window.location.href ="/Client_Admin/EditDisp.aspx"
            //}
            //else if (cmst = "dsp") {
            //    window.location.href = "CreateDisp.aspx";
            //}
        })
        $("#gen").click(function () {
            $("#yesC").hide();
            $("#UoPas_").hide()
            $("#pass").empty();
            var bigCases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            var smallCases = "abcdefghijklmnopqrstuvwxyz"
            var numbers = "0123456789";
            var BigRand = bigCases[Math.floor(Math.random() * bigCases.length)];

            var smallRand = smallCases[Math.floor(Math.random() * smallCases.length)];

            var numbRand;
            for (var i = 0; i < 6; i++) {
                numbRand += numbers[Math.floor(Math.random() * numbers.length)];
            }
            var GenPas = BigRand + smallRand + numbRand.replace(/undefined/g, '')
            $("#pass").attr('type', 'text')
            $("#pass").val(GenPas)
            sessionStorage.setItem("p", "1")

        })

    }


    function getLogin() {
        $.ajax({
            type: "POST",
            url: "CreateAccount.aspx/getLogin",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                // console.log(data)

                var jsondata_1 = JSON.parse(data.d)
                // console.log(jsondata_1.result)
                $("#login").val(jsondata_1.result);


            },

            error: function (r) {
                // //alert("Error");
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                alert("FAIL");
            }
        });
    }



    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress)
    }

    if (loc == "/Client_Admin/CreateOrg.aspx") {
        //alert(loc)
        $('#tlf').keyup(function () {
            $(this).inputmask("(999) 999-99-99");
        })
        var ClId = sessionStorage.getItem("Clien_ID")//localStorage.setItem("Clien_ID", jsondata.Id)

        $("#backUo").click(function () {
            var cmsf_uo = sessionStorage.getItem("cmsf_uo");
            window.location.href = (cmsf_uo.length != 0) ? cmsf_uo : 'RegisterUO.aspx'
            //if (cmsto!="") {

            //    window.location.href = 'CreateOpject.aspx'
            //}
            //else {

            //    window.location.href = 'RegisterUO.aspx'
            //}
        })
        $("#ObUo").click(function () {
            var uoI_d = $(this).attr("itemid");
            sessionStorage.setItem("UoId", uoI_d)
            window.location.href = "RegisterObject.aspx"
        })
        $("#INfoU").click(function () {
            sessionStorage.setItem("UoName", $("#NAME").val())
            window.location.href = "InfoUO.aspx"
        })
        function validateNumber(event) {
            
            var key = window.event ? event.keyCode : event.which;
            if (event.keyCode === 8 || event.keyCode === 46) {
                return true;
            } else if (key < 48 || key > 57) {
                return false;
            } else {
                return true;
            }
        };
        $("#INN,#OGRN,#OKPO,#KPP,#RS,#BKRS,#bik").keypress(validateNumber);
       
        $("#INN,#OGRN,#OKPO,#KPP,#BKRS,#bik,#RS").keyup(function () {
            var maxlenght = $(this).attr("maxlength")
            var id = $(this).attr('Id')
            var Original_text = $('label[for="' + id + '"]').text();
            $('label[for="' + id + '"]').hide();
            $('#counter').remove();
            $(this).before("<label id='counter' class='transp backLab counter'>" + Original_text + " (Осталось " + (maxlenght - $(this).val().length) + " символов)</label>")
           // $(this).closest('label').text("" + Original_text + " (Осталось " + (maxlenght - $(this).val().length) + " символов)").show();
            if ($(this).val().length == maxlenght) {
                $('.counter').remove();
                $('label[for="' + id + '"]').show();
            }
        })
       
        $("#RS").keyup(function () {
            var maxlenght = $(this).attr("maxlength")
            $("#RSS").text("Осталось " + (maxlenght - $(this).val().length) + " символов").show();
            if ($(this).val().length == maxlenght) {
                $("#RSS").hide();
                var countRs = $(this).val();
                var obj = { RS: countRs };
                $.ajax({
                    type: "POST",
                    url: "CreateOrg.aspx/CheckRS",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //async: false,
                    success: function (data) {
                        //console.log(data);
                        var jsonResult = JSON.parse(data.d);
                        jsonResult = jsonResult.result;
                        if (jsonResult == 1) {
                            $("#RSS").text("Данный расчетный счёт уже существует в системе").show();
                        }
                        else {
                            $("#RSS").hide();
                        }
                        // console.log(jsonResult.result);
                    }
                })


            }


        })
        $("#bik").keyup(function () {
            var bik_ = $(this).val();
            if (bik_.length == 9) {
                GetBankByBIK(bik_);
            }
        })//bik_B
       
        $("#mail").keyup(function () {
            var email = $(this).val();
            if (isValidEmailAddress(email)) {
                $('#emailError').remove()
            }
            else {
                $('#emailError').remove()
                $(this).before('<span id="emailError" style="float: right; font-weight: bold; color: red;">Введенное значение не соответствует формату электронной почты</span>')
            }
        })
        function showbtnObjkt(uo) {
            var obj = {
                Uo_: uo
            };

            $.ajax({
                type: "POST",
                url: "CreateOrg.aspx/RelationObject",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    // console.log(result)
                    var jsondata_1 = JSON.parse(data.d)
                    if (jsondata_1.result == 0) {
                        $("#ObUo").hide()
                    }
                    if (jsondata_1.result == 1) {
                        $("#ObUo").show()
                    }


                },
                error: function (r) {
                    ////alert("Error");
                    console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                },
                failure: function (r) {
                    alert("FAIL");
                }

            });
        }

        var UoId = sessionStorage.getItem("UOID");
        if (UoId == "" || UoId == null || UoId == undefined) {
           
            $("#INfoU").hide();
            $("#SaveMO").click(function () {
                if (checkControls_ManagerComp().isSuccess == true) {
                    createNew_ManagerCompany(Id, checkControls_ManagerComp(),null);
                }
               
            })
       
        }
        else {
            $("#DeleteUO").show();
            //  $("#SaveMO").text("Обновить");
            showbtnObjkt(UoId);
            getDetailUO(UoId)
            //$("#SozUp").text(" ")
            $("#SaveMO").click(function () {
               
                if (checkControls_ManagerComp().isSuccess == true) {
                    createNew_ManagerCompany(Id, checkControls_ManagerComp(), UoId);
                }
            })

            $("#DeleteUO").click(function () {
                alertWithButton("Вы действительно хотите удалить управляющую организацию?", "" + $("#NAME").val() + "", "awd")
            });
            $("#deleteO").click(function () {
                DELETE_UO(UoId, SaveLog, alertMessage);
            })
        }




    }
    function alertWithButton(Header_, text_, footer_) {
        $("#mh2").text(Header_);
        if (text_.length >= 45) {
            $("#txt2").attr("style", "font-size: 23px;width:50%;word-wrap:break-word;")
        }
        else {
            $("#txt2").attr("style", "font-size: 23px")
        }
        $("#txt2").text(text_);
        $("#mf2").text(footer_)
        var modal = document.getElementById('myModal2');
        var span = document.getElementsByClassName("close_")[0];
        modal.style.display = "block";
        $("#close_,#cls").click(function () {
            modal.style.display = "none";
        })
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
  
    if (loc == "/Client_Admin/MyResources.aspx") {
        sessionStorage.setItem("R_Id", "")
        $("#loader,.ui-loader-background").hide();
        sessionStorage.setItem("itmId", null)
        //alert(loc)
        var ClId = sessionStorage.getItem("Clien_ID")//localStorage.setItem("Clien_ID", jsondata.Id)
        //var clId2 = localStorage.getItem("Clien_ID2")//localStorage.setItem("Clien_ID2", Id)
        //ClId = (ClId != null) ? ClId : clId2
        // alert(ClId);

        getResources(ClId)
    }
    function getResources(Cid) {
        // var Id_ = $("#role").val();
        var obj = { "Cl_Id": Cid }
        $.ajax({
            type: "POST",
            url: "MyResources.aspx/GetResource",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //console.log(result)

                var jsondata_ = JSON.parse(result.d)

                //console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {
                    //console.log(jsondata_[i].LOG_IN_ID)

                    $("#mr_").append('<tr><td><a href="CreateResource.aspx" onclick="getRDetail(' + jsondata_[i].RESOURSE_ID + ')">' + jsondata_[i].RESOURSE_NAME + '</a></td ><td><a href="CreateResource.aspx" onclick="getRDetail(' + jsondata_[i].RESOURSE_ID + ')">--</a></td><td><a href="CreateResource.aspx" onclick="getRDetail(' + jsondata_[i].RESOURSE_ID + ')"">' + jsondata_[i].PAST_QUANTITY + '</a></td></tr > ');


                }
            }

        })
    }
    if (loc == "/Client_Admin/ProfileSettings.aspx") {
        $("#loader,.ui-loader-background").hide();
        sessionStorage.setItem("itmId", null)
        //alert(loc)
        sessionStorage.setItem("ComesTo", "");
        var ClId = sessionStorage.getItem("Clien_ID")//localStorage.setItem("Clien_ID", jsondata.Id)
        //var clId2 = localStorage.getItem("Clien_ID2")//localStorage.setItem("Clien_ID2", Id)
        //ClId = (ClId != null) ? ClId : clId2
        // alert(ClId);

        $("#adr").focus(function () {
            var manual = $("#manu").prop('checked');
            if (manual == true) {
                $("#adrList").empty().hide();
            }
        })
        $("#adr").keyup(function () {
            $("#adrList").empty();
            var adres = $("#adr").val();

            if (adres.length >= 4) {
                var manual = $("#manu").prop('checked');
                if (manual == false) {
                    var obj = { txt: adres }

                    $.ajax({
                        url: "/Client_Admin/CreateOpject.aspx/GetStreetsBytext",
                        data: JSON.stringify(obj),
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            // console.log(data);
                            var jsondata = JSON.parse(data.d);
                            //console.log(jsondata.d[0].CODE);
                            // console.log(data.d.CODE)
                            $.each(jsondata, function (key, value) {
                                $("#adrList").append('<option value="' + value.Name + ' " itemid=' + value.CODE + '></option>')
                                // console.log(value.Name)
                            })
                        }
                    })
                }
            }
            //if ($("#manu").is(":checked")) {

            //}
            //else {
            //    if (adres.length >= 4) {
            //        //console.log("""")
            //        var obj = { txt: adres }

            //        $.ajax({
            //            url: "/Client_Admin/CreateOpject.aspx/GetStreetsBytext",
            //            data: JSON.stringify(obj),
            //            dataType: "json",
            //            type: "POST",
            //            contentType: "application/json; charset=utf-8",
            //            success: function (data) {
            //                // console.log(data);
            //                var jsondata = JSON.parse(data.d);
            //                //console.log(jsondata.d[0].CODE);
            //                // console.log(data.d.CODE)
            //                $.each(jsondata, function (key, value) {
            //                    $("#adrList").append('<option value="' + value.Name + ' " itemid=' + value.CODE + '></option>')
            //                    // console.log(value.Name)
            //                })
            //            }
            //        })

            //    }
            //    else {
            //        $("#adrList").empty();
            //    }
            //}

        })
        $("#pass").keyup(function () {
            var p = $(this).val()
            if (p.length >= 6) {
                var o = {
                    Log: L_ogin_id,
                    Pass: p
                };
                $.ajax({
                    type: "POST",
                    url: "ProfileSettings.aspx/ChkPass",
                    data: JSON.stringify(o),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var jsondata = $.parseJSON(data.d);
                        if (jsondata.result == 1) {
                            $("#CpassN").show().text("Текущий пароль введен  неправильно")
                        }
                        else {
                            $("#CpassN").hide();
                        }
                    }
                })
            }
            else {
                $("#CpassN").show().text("Текущий пароль введен  неправильно")
            }
        })
        $(document).on('change', '#typE', function () {
            var svalue = $("#typE").val();
            var ogrn = $("#OGRN").val()
            if (ogrn.length == 15) {
                //$("#OGRN").val().slice(0,- 2)
                //ogrn.substr(0, ogrn.length - 2)
                ogrn = ogrn.slice(0, 13)
                $("#OGRN").val(ogrn)
            }
            if (svalue == 1) {
                $("#OGRN").attr("maxlength", "13");
                $("#kppH").show();
                $("#kpp").show();
                $("#ogrnH").text("ОГРН")
            }
            if (svalue == 2) {
                $("#OGRN").attr("maxlength", "15");
                $("#kppH").hide();
                $("#kpp").hide();
                $("#kpp").val("");
                $("#ogrnH").text("ОГРНИП")
            }
            if (svalue != 0) {
                $("#typES").hide();

            }
            if (svalue == 0) {
                $("#kppH").hide();
                $("#kpp").hide()
            }
        });
        GetType_Entity();
        GetDetailCilent()

        $("#CompName").keyup(function () { $("#CompNameS").hide() })

        $("#INN").keypress(validateNumber);
        $("#INN").keyup(function () {
            var maxlenght = $(this).attr("maxlength")
            $("#INNS").text("Осталось " + (maxlenght - $(this).val().length) + " символов").show();
            if ($(this).val().length == maxlenght) {
                $("#INNS").hide();
            }
        })
        $("#OGRN").keypress(validateNumber);
        $("#OGRN").keyup(function () {
            var maxlenght = $(this).attr("maxlength")
            $("#OGRNS").text("Осталось " + (maxlenght - $(this).val().length) + " символов").show();
            if ($(this).val().length == maxlenght) {
                $("#OGRNS").hide();
            }
        })
        $("#okpo").keypress(validateNumber);
        $("#okpo").keyup(function () {
            var maxlenght = $(this).attr("maxlength")
            $("#okpoS").text("Осталось " + (maxlenght - $(this).val().length) + " символов").show();
            if ($(this).val().length == maxlenght) {
                $("#okpoS").hide();
            }
        })
        $("#kpp").keypress(validateNumber);
        $("#kpp").keyup(function () {
            var maxlenght = $(this).attr("maxlength")
            $("#kppS").text("Осталось " + (maxlenght - $(this).val().length) + " символов").show();
            if ($(this).val().length == maxlenght) {
                $("#kppS").hide();
            }
        })
        $("#RS").keypress(validateNumber);
        $("#RS").keyup(function () {
            var maxlenght = $(this).attr("maxlength")
            $("#RSS").text("Осталось " + (maxlenght - $(this).val().length) + " символов").show();
            if ($(this).val().length == maxlenght) {
                $("#RSS").hide();
            }
        })
        $("#BKRS").keypress(validateNumber);
        $("#BKRS").keyup(function () {
            var maxlenght = $(this).attr("maxlength")
            $("#BKRSS").text("Осталось " + (maxlenght - $(this).val().length) + " символов").show();
            if ($(this).val().length == maxlenght) {
                $("#BKRSS").hide();
            }
        })

        $("#bik").keypress(validateNumber);
        $("#bik").keyup(function () {
            var maxlenght = $(this).attr("maxlength")
            $("#bikS").text("Осталось " + (maxlenght - $(this).val().length) + " символов").show();
            if ($(this).val().length == maxlenght) {
                $("#bikS").hide();
            }
        })
        $("#KPPB").keypress(validateNumber);
        $("#KPPB").keyup(function () {
            var maxlenght = $(this).attr("maxlength")
            $("#KPPBS").text("Осталось " + (maxlenght - $(this).val().length) + " символов").show();
            if ($(this).val().length == maxlenght) {
                $("#KPPBS").hide();
            }
        })
        $("#INNB").keypress(validateNumber);
        $("#INNB").keyup(function () {
            var maxlenght = $(this).attr("maxlength")
            $("#INNBS").text("Осталось " + (maxlenght - $(this).val().length) + " символов").show();
            if ($(this).val().length == maxlenght) {
                $("#INNBS").hide();
            }
        })
        function gtBik(bik_) {
            var obj = { BIK: bik_ };
            $.ajax({
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/GetBankByBIK",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //async: false,
                success: function (result) {
                    //console.log(JSON.stringify(result))
                    //console.log(result);
                    var jsondata = JSON.stringify(result.ResultData)
                    var jsondata_ = JSON.parse(jsondata)
                    $("#BNAME").val(jsondata_.BNAME)
                    $("#BKRS").val(jsondata_.BKRS)

                },
                error: function () {
                    gtBik(bik_)
                }

            })
        }
        $("#bik").keyup(function () {
            var bi_k_ = $(this).val();
            if (bi_k_.length == 9) {
                gtBik(bi_k_)
            }
        })
        $("#NPass").keyup(function () {
            var PassVal = $(this).val();
            if (PassVal.length > 5) {
                $("#passN").hide();
                var numbers_ = /[0-9]/g
                var upperCaseLetters = /[A-Z]/g;
                var lowerCaseLetters = /[a-z]/g;
                if (PassVal.match(/[a-z]/g) || PassVal.match(/[A-Z]/g)) {
                    $("#passN").hide();

                    if (PassVal.match(/(.)\1/)) {
                        $("#passN").text("Пароль должен содержать символы в разных регистрах").show();
                    }
                    else {
                        $("#passN").hide();
                    }
                    if (PassVal.match(numbers_) && PassVal.match(upperCaseLetters) && PassVal.match(lowerCaseLetters)) {
                        $("#passN").hide();
                    }
                    else {
                        $("#passN").text('Пароль должен содержать символы в разных регистрах').show
                    }
                }
                else {
                    $("#passN").text("Пароль должен содержать латинские символы и цифры").show();
                }
                if (!PassVal.match(numbers_)) {
                    $("#passN").text("Пароль должен содержать латинские символы и цифры").show();
                }
            }
            else {
                $("#passN").text("Данное поле должно содержать как минимум 6 символов").show();
            }
            if (PassVal.length == 0) {
                $("#passN").hide();
            }
        })
        $("#RPass").keyup(function () {
            var RPass = $(this).val()
            var NPass = $("#NPass").val();
            if (RPass != NPass) {
                $("#passR").text("Новый пароль и повторный пароль не совпадают").show()
            }
            else {
                $("#passR").hide();
            }
        })
        $("#email").keyup(function () {
            if (isValidEmailAddress($(this).val())) {
                $("#emailS").hide();
            }
            else {
                $("#emailS").text("Введенное значение не соответствует формату электронной почты").show();
            }
        })
        $("#BNAME").keyup(function () { $("#BNAMES").hide() })
        $("#tel").keyup(function () { $("#telS").hide() })
        $("#adr").keyup(function () { $("#adrS").hide() })
        $("#dom").keyup(function () { $("#DOMS").hide(); })
        $("#fio").keyup(function () { $("#fioS").hide(); })
        $("#SaveChanges").click(function () {
            var NPass = $("#NPass").val().trim();
            var RPass = $("#RPass").val().trim();
            var pass = $("#pass").val().trim();
            if (NPass.length != 0 && RPass.length != 0) {
                if (NPass != RPass) {
                    // alertMessage("Не совпадают", "новый пароль и повторный пароль не совпадают", ":(")
                    $("#passR").text("новый пароль и повторный пароль не совпадают").show();
                    $("html, body").animate({ scrollTop: 50 }, "slow");
                }
            }
            var fio = $("#fio").val();
            if (fio.length != 0) {
                var email = $("#email").val().trim();//

                if (email.length != 0) {
                    $("#emailS").hide();
                    if ($('#emailS').css('display') == 'none') {
                        var tel = $("#tel").val().trim();
                        tel = (tel.length == 0) ? " " : tel;
                        if (tel.length != 0) {
                            if ($("#passN").css("display") == "none" && $("#passR").css("display") == "none" && $("#CpassN").css("display") == "none") {
                                $("#telS").hide();
                                var typE = $("#typE").val()
                                if (typE != 0) {
                                    $("#typES").hide();
                                    var CompName = $("#CompName").val();
                                    if (CompName.length != 0) {
                                        var INN = $("#INN").val();
                                        if (INN.length != 0) {
                                            if (INN.length == 10) {
                                                var OGRN = $("#OGRN").val();
                                                if (OGRN.length != 0) {
                                                    var OgrnMustLenght = (typE == 2) ? 15 : 13 //$("#OGRN").attr("maxlength");
                                                    if (OGRN.length == OgrnMustLenght) {
                                                        var okpo = $("#okpo").val();
                                                        if (okpo.length != 0) {

                                                            if (okpo.length == 10) {
                                                                var kpp = (typE == 1) ? $("#kpp").val() : "         ";
                                                                if (kpp.length == 9) {
                                                                    var adr = $("#adr").val();
                                                                    var dom = $('#dom').val();
                                                                    var korp = $('#korp').val();
                                                                    if (adr.length != 0) {
                                                                        if (dom.length != 0) {
                                                                            korp = (korp.length != 0) ? "К. " + korp : "";
                                                                            var adrtext_ = adr + ", Д. " + dom + ", " + korp;
                                                                            var bik = $("#bik").val();
                                                                            bik = (bik.length == 0) ? "         " : bik
                                                                            if (bik.length == 9) {
                                                                                var BNAME = $("#BNAME").val()
                                                                                BNAME = (BNAME == 0) ? " " : BNAME;
                                                                                if (BNAME.length != 0) {
                                                                                    var BKRS = $("#BKRS").val();
                                                                                    BKRS = (BKRS.length == 0) ? "                    " : BKRS
                                                                                    if (BKRS.length == 20) {
                                                                                        var RS = $("#RS").val();
                                                                                        if (RS.length == 20) {

                                                                                            var INNB = $("#INNB").val();
                                                                                            if (INNB.length == 10) {
                                                                                                var KPPB = $("#KPPB").val();
                                                                                                if (KPPB.length == 9) {
                                                                                                    var Login_Id = sessionStorage.getItem("loginId")
                                                                                                    var adress_Id = sessionStorage.getItem("AdressID")
                                                                                                    /*sessionStorage.setItem("loginId", jsondata_[i].LOG_IN_ID)
                                sessionStorage.setItem("AdressID", jsondata_[i].LOG_IN_ID)  LOG_IN_ID: Login_Id,*/
                                                                                                    var obj = {

                                                                                                        PASSWORD: RPass,
                                                                                                        ACCOUNT_NAME: "",
                                                                                                        PHONE_NUMBER: tel,
                                                                                                        E_MAIL: email,
                                                                                                        COMPANY_NAME: CompName,
                                                                                                        INN: INN,
                                                                                                        KPP: kpp,
                                                                                                        OGRN_OGRNIP: OGRN,
                                                                                                        ENTITY_TYPE_ID: typE,
                                                                                                        OKPO: okpo,
                                                                                                        HOUSE: adrtext_,
                                                                                                        BNAME: BNAME,
                                                                                                        INNB: INNB,
                                                                                                        KPPB: KPPB,
                                                                                                        BIK: bik,
                                                                                                        BKRS: BKRS,
                                                                                                        RS: RS,
                                                                                                        // ADRESS_ID: adress_Id ,
                                                                                                        CL: ClId,
                                                                                                        FIO: fio
                                                                                                    }
                                                                                                    $.ajax({
                                                                                                        type: "POST",
                                                                                                        url: "ProfileSettings.aspx/Save_Changes",
                                                                                                        data: JSON.stringify(obj),
                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                        dataType: "json",
                                                                                                        success: function (result) {

                                                                                                            // alert("OK. See Console -  press F12");
                                                                                                            //  alertMessage("Операция прошла успешно", "Ваши данные успешно добавлены", ":)")
                                                                                                            var log_Id = sessionStorage.getItem("Log")
                                                                                                            SaveLog("Сохранить изменения", "Простое", "Администратор", "Клиентское администрирование", "Изменены данные настройки профиля (" + $("#email").val() + ")", log_Id);
                                                                                                            window.location.href = "/Client_Admin/Accounts.aspx"
                                                                                                            //window.location.href = "RegisterUO.aspx"
                                                                                                            // console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));

                                                                                                        },

                                                                                                        error: function (r) {
                                                                                                            ////alert("Error");
                                                                                                            alertMessage("Oшибка", "Не удалось выполнить операцию", ":(")
                                                                                                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                                                                                                            $("#loader,.ui-loader-background").hide();
                                                                                                        },
                                                                                                        failure: function (r) {
                                                                                                            // alert("FAIL");
                                                                                                            alertMessage("Oшибка", "Не удалось выполнить операцию", "Fail")
                                                                                                            $("#loader,.ui-loader-background").hide();
                                                                                                        }
                                                                                                    })

                                                                                                }
                                                                                                else {

                                                                                                    $("#KPPBS").text("Осталось " + (9 - KPPB.length) + " символов ").show();
                                                                                                }

                                                                                            }
                                                                                            else {

                                                                                                $("#INNBS").text("Осталось " + (10 - INNB.length) + " символов ").show();
                                                                                            }
                                                                                        }
                                                                                        else {

                                                                                            $("#RSS").text("Осталось " + (20 - RS.length) + " символов ").show();
                                                                                        }
                                                                                    }
                                                                                    else {

                                                                                        $("#BKRSS").text("Осталось " + (20 - BKRS.length) + " символов ").show();
                                                                                    }
                                                                                }
                                                                                else {

                                                                                    $("#BNAMES").text("Необходимо заполнить поле Наименование банка").show();
                                                                                }
                                                                            }
                                                                            else {

                                                                                $("#bikS").text("Осталось " + (9 - bik.length) + " символов").show();
                                                                                //$("html, body").animate({ scrollTop: 350 }, "slow");
                                                                            }
                                                                        }
                                                                        else {
                                                                            $("#DOMS").text("Необходимо заполнить поле Дом").show();
                                                                        }
                                                                    }
                                                                    else {

                                                                        $("#adrS").text("Необходимо заполнить поле Адрес").show();

                                                                        // $("html, body").animate({ scrollTop: 350 }, "slow");
                                                                    }

                                                                }
                                                                else {

                                                                    $("#kppS").text("Осталось " + (9 - kpp.length) + " символов").show();
                                                                    $("html, body").animate({ scrollTop: 950 }, "slow");
                                                                }
                                                            }
                                                            else {

                                                                $("#okpoS").text("Осталось " + (10 - okpo.length) + " символов ").show();
                                                                $("html, body").animate({ scrollTop: 350 }, "slow");
                                                            }
                                                        }
                                                        else {

                                                            $("#okpoS").text("Необходимо заполнить поле ОКПО").show();
                                                            $("html, body").animate({ scrollTop: 350 }, "slow");
                                                        }
                                                    }
                                                    else {

                                                        $("#OGRNS").text("Осталось " + ($("#OGRN").attr("maxlength") - OGRN.length) + " символов ").show();
                                                        $("html, body").animate({ scrollTop: 350 }, "slow");
                                                    }
                                                }
                                                else {

                                                    if (typE == 2) {
                                                        $("#OGRNS").text("Необходимо заполнить поле ОГРНИП").show();
                                                    }
                                                    else {
                                                        $("#OGRNS").text("Необходимо заполнить поле ОГРН").show();
                                                    }

                                                    $("html, body").animate({ scrollTop: 350 }, "slow");
                                                }
                                            }
                                            else {

                                                $("#INNS").text("Осталось " + (10 - INN.length) + " символов  ").show();
                                                $("html, body").animate({ scrollTop: 350 }, "slow");
                                            }
                                        }
                                        else {

                                            $("#INNS").text("Необходимо заполнить поле ИНН").show();
                                            $("html, body").animate({ scrollTop: 350 }, "slow");
                                        }
                                    }
                                    else {

                                        $("#CompNameS").text("Необходимо заполнить поле Наименование организации").show();
                                        $("html, body").animate({ scrollTop: 350 }, "slow");
                                    }
                                }
                                else {
                                    $("#typES").text("Выберите вид организации").show();
                                    //alertMessage(":(", "Выберите тип организации", ":(")
                                    $("html, body").animate({ scrollTop: 50 }, "slow");
                                }
                            }
                            else {
                                $("html, body").animate({ scrollTop: 50 }, "slow");
                            }

                        }
                        else {
                            //  alertMessage("Пустые место осталось", "Не оставляйте поле Мобильный телефон пустым", ":(")
                            $("#telS").text("Пожалуйста, укажите номер телефона").show();
                            $("html, body").animate({ scrollTop: 50 }, "slow");
                        }
                    }
                    else {
                        // alertMessage("Неправильный формат", "Введите правильный формат электронной почты", ":(")
                        //  $("#emailS").text("Пожалуйста, укажите Эл. адрес").show();
                        $('#emailS').show();
                        $("html, body").animate({ scrollTop: 50 }, "slow");
                    }

                }
                else {
                    // alertMessage("Пустые место осталось", "Не оставляйте поле Эл. адрес пустым", ":(")
                    $("#emailS").text("Пожалуйста, укажите эл. адрес").show();
                    $("html, body").animate({ scrollTop: 50 }, "slow");
                }
            }
            else {
                $("#fioS").text("Пожалуйста, укажите ФИО").show();
                $("html, body").animate({ scrollTop: 50 }, "slow");
            }



        })
    }
    function GetType_Entity() {
        $.ajax({
            type: "POST",
            url: "ProfileSettings.aspx/GetEntityType",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //console.log(data)

                var jsondata_1 = JSON.parse(data.d)
                //console.log(jsondata_1[0].ENTITY_TYPE_NAME)
                for (var i = 0; i < jsondata_1.length; i++) {
                    $("#first").after("<option value='" + jsondata_1[i].ENTITY_TYPE_ID + "'>" + jsondata_1[i].ENTITY_TYPE_NAME + "</option>")
                }


            },

            error: function (r) {
                //  //alert("Error");
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                alert("FAIL");
            }
        });
    }
    function GetDetailCilent() {
        var obj = {
            Cl: ClId
        };
        $.ajax({
            type: "POST",
            url: "ProfileSettings.aspx/GetDetailClient",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //console.log(result)

                var jsondata_ = JSON.parse(result.d)

                //console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {

                    // console.log(jsondata_[i].LOG_IN_ID)
                    $("#fio").val(jsondata_[i].ACCOUNT_NAME)
                    $("#email").val(jsondata_[i].E_MAIL)
                    $("#tel").val(jsondata_[i].PHONE_NUMBER)
                    $("#pass").attr('oldpass', jsondata_[i].PASSWORD)
                    $("#typE").val(jsondata_[i].ENTITY_TYPE_ID)
                    if (jsondata_[i].ENTITY_TYPE_ID == 1) {

                        $("#kpp").show()
                        $("#kppH").show();
                        $("#ogrnH").text("ОГРН")
                        $("#kpp").val(jsondata_[i].KPP)

                    }
                    if (jsondata_[i].ENTITY_TYPE_ID == 2) {
                        $("#kpp").show();
                        $("#kpp").hide();
                        $("#kppH").hide();

                        $("#ogrnH").text("ОГРНИП")
                        $("#kpp").val("")
                    }
                    $("#CompName").val(jsondata_[i].COMPANY_NAME)
                    $("#INN").val(jsondata_[i].INN)
                    $("#OGRN").val(jsondata_[i].OGRN_OGRNIP)
                    $("#okpo").val(jsondata_[i].OKPO)


                    $("#adr").val(jsondata_[i].HOUSE)
                    var dom_ = $("#adr").val().substring($("#adr").val().lastIndexOf("Д. ") + 1, $("#adr").val().lastIndexOf(",")).replace('.', '').replace(' ', '');
                    // var korp_ = $("#adr").val().substring($("#adr").val().lastIndexOf("К. ") + 1, $("#adr").val().lastIndexOf("")).replace('.', '').replace(' ', '');

                    var numbers = /[0-9]/g
                    var korp_ = (jsondata_[i].HOUSE.lastIndexOf("К. ") > 0) ? jsondata_[i].HOUSE.substring(jsondata_[i].HOUSE.lastIndexOf("К. ") + 3) : ""//jsondata_[i].HOUSE.substr( jsondata_[i].HOUSE.length - 2);
                    if (!korp_.match(numbers)) {
                        korp_ = "";
                    }
                    $("#dom").val(dom_)
                    dom_ = "Д. " + dom_;
                    var adress = jsondata_[i].HOUSE.substring(0, jsondata_[i].HOUSE.indexOf(dom_))
                    adress = adress.substring(0, adress.lastIndexOf(","))
                    $("#adr").val(adress)
                    $("#korp").val(korp_)
                    //var adr = $("#adr").val()
                    //var l = adr.length - 1;
                    //var lastChar = adr.substring(l - 1, l);
                    //if (lastChar == ",") { // if the last char is dot, remove the last char
                    //    result = adr.substring(0, l - 1);
                    //    $("#adr").val(result)
                    //}
                    //$("#adr").val(adr.slice(0,-1))


                    $("#bik").val(jsondata_[i].BIK)
                    $("#BNAME").val(jsondata_[i].BNAME)
                    $("#BKRS").val(jsondata_[i].BKRS)
                    $("#RS").val(jsondata_[i].RS)
                    $("#INNB").val(jsondata_[i].INNB)
                    $("#KPPB").val(jsondata_[i].KPPB)
                    sessionStorage.setItem("loginId", jsondata_[i].LOG_IN_ID)
                    sessionStorage.setItem("AdressID", jsondata_[i].LOG_IN_ID)



                }

            },

            error: function (r) {
                // //alert("Error");
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                alert("FAIL");
            }
        });
    }
    function GetOpjectsForDisp(CL_Id, sob) {
        $("#objcts").empty();
        var obj = {
            ClId: CL_Id
        };

        var objecs = [];

        $.ajax({
            type: "POST",
            url: "CreateDisp.aspx/GetNotSelObj",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //console.log(result)
                //var jsondata_1 = JSON.stringify(result.ResultData)
                //var jsondata_2 = JSON.parse(jsondata_1)
                var jsondata_1 = JSON.parse(result.d)

                for (var i = 0; i < jsondata_1.length; i++) {

                    //console.log()//OBJECT_ID
                    $("#objcts").append('<input type="checkbox" itemid=' + jsondata_1[i].Object_Id + ' onclick=SObjdata(this,' + jsondata_1[i].Object_Id + ') class="dispDatas"/><label class="checkBx">' + jsondata_1[i].ObjectAdress + '</label>')
                    objecs.push({ "Object_Id": jsondata_1[i].Object_Id });

                }
                sessionStorage.setItem("objss", JSON.stringify(objecs))

                if (sob != "") {
                    for (var i = 0; i < sob.length; i++) {
                        $("#objcts input[type=checkbox]").each(function () {
                            if ($(this).attr('itemid') == sob[i].sObjss) {
                                $(this).prop('checked', true)
                            }
                        })
                    }
                    sessionStorage.removeItem('selObj')
                }

            },

            error: function (r) {
                ////alert("Error");
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                alert("FAIL");
            }
        });
    }
    function GetAccForDisp(CL_id, M_Id, R_ID, s_disp) {
        var obj = {
            CId: CL_id,
            MId: M_Id,
            RId: R_ID

        };
        //alert(JSON.stringify(obj));

        $.ajax({
            type: "POST",
            url: "CreateDisp.aspx/GetAccForMR",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                // console.log(result)

                var jsondata_ = JSON.parse(result.d)

                // console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {
                    // console.log(jsondata_[i].ACCOUNT_NAME)

                    //
                    //<input type="checkbox" style="margin-left:5px;"/><label class="checkBx">Диспетчер 1</label>

                    $("#Disps").append('<input type="checkbox" data-url="' + jsondata_[i].KPP + '"  itemid="' + jsondata_[i].LOG_IN_ID + '" onclick=SDsdata(this,' + jsondata_[i].LOG_IN_ID + ',' + jsondata_[i].KPP + ') class="dispDatas"/><label  class="checkBx">' + jsondata_[i].ACCOUNT_NAME + '</label>')
                }
                if (s_disp != "") {
                    for (var i = 0; i < s_disp.length; i++) {
                        $("#Disps input[type=checkbox]").each(function () {
                            if ($(this).attr('itemid') == s_disp[i].sDisp) {
                                $(this).prop('checked', true)
                            }
                        })
                    }
                    sessionStorage.removeItem('selDisps')
                }

            },

            error: function (r) {
                // //alert("Error");
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                alert("FAIL");
            }
        });

    }
    function GetAccForEngnrs(CL_id, S_injs) {
        var obj = {
            clientId: CL_id

        };
        //alert(JSON.stringify(obj));

        $.ajax({
            type: "POST",
            url: "CreateDisp.aspx/GetEngineers",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                // console.log(result)

                var jsondata_ = JSON.parse(result.d)

                // console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {
                    // console.log(jsondata_[i].ACCOUNT_NAME)

                    //
                    //<input type="checkbox" style="margin-left:5px;"/><label class="checkBx">Диспетчер 1</label>

                    $("#engnrs").append('<input type="checkbox" data-url="' + jsondata_[i].KPP + '" itemid="' + jsondata_[i].LOG_IN_ID + '" onclick=SEngdata(this,' + jsondata_[i].LOG_IN_ID + ',' + jsondata_[i].KPP + ') class="dispDatas"/><label  class="checkBx">' + jsondata_[i].ACCOUNT_NAME + '</label>')
                }
                if (S_injs != "") {
                    for (var i = 0; i < S_injs.length; i++) {
                        $("#engnrs input[type=checkbox]").each(function () {
                            if ($(this).attr('itemid') == S_injs[i].sInjs) {
                                $(this).prop('checked', true)
                            }
                        })
                    }
                    sessionStorage.removeItem('sInjs')
                }

            },

            error: function (r) {
                ////alert("Error");
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                alert("FAIL");
            }
        });

    }
    function GetAccFortex(ClId, s_tex) {
        var obj = {
            clientId: ClId

        };
        //alert(JSON.stringify(obj));

        $.ajax({
            type: "POST",
            url: "CreateDisp.aspx/GetTexniks",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                // console.log(result)

                var jsondata_ = JSON.parse(result.d)

                // console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {
                    // console.log(jsondata_[i].ACCOUNT_NAME)

                    //
                    //<input type="checkbox" style="margin-left:5px;"/><label class="checkBx">Диспетчер 1</label>

                    $("#tex").append('<input type="checkbox" itemid="' + jsondata_[i].LOG_IN_ID + '" onclick=STdata(this,' + jsondata_[i].LOG_IN_ID + ',' + jsondata_[i].KPP + ') class="dispDatas"/><label  class="checkBx">' + jsondata_[i].ACCOUNT_NAME + '</label>')
                }
                if (s_tex != "") {
                    for (var i = 0; i < s_tex.length; i++) {
                        $("#tex input[type=checkbox]").each(function () {

                            if ($(this).attr('itemid') == s_tex[i].stexs) {
                                $(this).prop('checked', true)
                            }
                        })
                    }
                    sessionStorage.removeItem('texs');
                }

            },

            error: function (r) {
                // //alert("Error");
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                alert("FAIL");
            }
        });

    }
    function getPhone() {
        $.ajax({
            type: "POST",
            url: "CreateDisp.aspx/getPhone",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                // console.log(data)

                var jsondata_1 = JSON.parse(data.d)
                // console.log(jsondata_1.phone)
                if (jsondata_1.phone != 000) {
                    $("#telDisp").val(jsondata_1.phone);
                }
                else {
                    $("#yesTelDisp").show();
                    $("#TlDIsp").text("Невозможно создать диспетчерскую. Нет свободных номеров телефонов. Обратитесь к администратору").show();
                }



            },

            error: function (r) {
                // //alert("Error");
                console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            },
            failure: function (r) {
                alert("FAIL");
            }
        });
    }
    if (loc == "/Client_Admin/CreateDisp.aspx") {
        getPhone();
        sessionStorage.setItem("currentDatas", "");
        var csmf = sessionStorage.getItem("cmsf_O")
        csmf = (csmf == "") ? sessionStorage.getItem("cmsf_a") : csmf;
        if (csmf == "") {
            GetOpjectsForDisp(Id, "")
            GetAccForDisp(Id, 4, 3, "")
            GetAccForEngnrs(Id, "")
            GetAccFortex(Id, "")
        }
        else {
            var sel_Obj = sessionStorage.getItem("selObj");
            sel_Obj = JSON.parse(sel_Obj)
            GetOpjectsForDisp(Id, sel_Obj)

            var sel_Disps = sessionStorage.getItem("selDisps");
            sel_Disps = JSON.parse(sel_Disps)
            GetAccForDisp(Id, 4, 3, sel_Disps)

            var s_Injs = sessionStorage.getItem("sInjs");
            s_Injs = JSON.parse(s_Injs);
            GetAccForEngnrs(Id, s_Injs);
            var s_texs = sessionStorage.getItem('texs')
            s_texs = JSON.parse(s_texs)
            GetAccFortex(Id, s_texs);
            var simg = sessionStorage.getItem("imgDisp");
            simg = simg.replace('"', '').replace('"', '').replace('"', '')
            $("#fotoDisp").attr('src', simg)
            var n_disp = sessionStorage.getItem('ndisp')
            $("#DispName").val(n_disp)




            sessionStorage.removeItem('ndisp')
            sessionStorage.setItem('cmsf_O', "");
            sessionStorage.setItem('cmsf_a', "");
        }

        $("#backD").click(function () { window.location.href = "/Client_Admin/Disp.aspx" })
        $("#telDisp").keyup(function () { $("#TlDIsp,#yesTelDisp").hide() })
        $("#DispName").keyup(function () { $("#NMDIsp,#yesNMDisp").hide() })
        $("#files").change(function () {

            var filePath = $('#files').val();

            if (filePath.length != 0) {
                $("#loader,.ui-loader-background").show();
                var index = filePath.lastIndexOf("\\") + 1;
                var filename = filePath.substr(index);
                var ext = this.value.split('.').pop();
                ext = ext.toLowerCase()
                // console.log(ext);
                if (ext == "jpg" || ext == "png") {
                    readURL(this, filename);
                    $("#flS").hide();
                }
                else {
                    $("#loader,.ui-loader-background").hide();
                    $("#flS").text("Неверный  формат файла ").show();
                }
            }

        })
        function readURL(input, imgName) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {


                    $('.foto-disp').attr('src', e.target.result);

                    //var nameImg = imgName
                    //var arrayBuffer = reader.result
                    //var bytes = new Uint8Array(arrayBuffer);
                    //var obj = { baseString: bytes, imgName: nameImg };
                    var formData = new FormData();
                    var file = document.getElementById("files").files[0];

                    formData.append('file', file, encodeURI(file.name));
                    formData.append('object_id', '1');
                    //console.log(formData);



                    $.ajax({
                        type: "POST",
                        url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
                        data: formData,
                        //cache: false,
                        type: 'POST',
                        //async:false,
                        contentType: "multipart/form-data",
                        processData: false,
                        success: function (result) {

                            //alert("OK. See Console -  press F12");
                            //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                            //var jsondata_1 = jQuery.parseJSON(result)
                            //var jsondata_1 = JSON.stringify(result)
                            // var jsondata_1 = JSON.parse(result)
                            $('.foto-disp').attr('src', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                            $("#loader,.ui-loader-background").hide();

                        },

                        error: function (r) {

                            //  //alert("Error");
                            //  console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                            $("#loader,.ui-loader-background").hide();
                            var filePath = $('#files').val();
                            var index = filePath.lastIndexOf("\\") + 1;
                            var filename = filePath.substr(index);
                            readURL(input, filename)
                        },
                        complete: function (r) {
                            //var jsonEroorData = JSON.parse(r);

                            //if (r.readyState == 4 && r.status == 200) { //do something }; 
                            //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
                            //    $("#loader,.ui-loader-background").hide();
                            //}
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });


                }


            }
        }

        $("#saveD").click(function () {
            var DispName = $("#DispName").val();
            if (DispName.length != 0) {

                var telDisp = $("#telDisp").val();
                if (telDisp.length != 0) {
                    $("#yesTelDisp").hide();
                    $("#TlDIsp").hide()

                    var Objcts = [];//JSON.parse(sessionStorage.getItem("Sobjcts"))//Must refactering Object_Id
                    $("#objcts input[type=checkbox]").each(function () {

                        if ($(this).is(":checked")) {
                            Objcts.push({ Object_Id: $(this).attr('itemid') });
                            //sessionStorage.setItem(selectedObj)

                        }
                    })
                    // Objcts = JSON.parse(Objcts)

                    if (Objcts != null) {
                        if (Objcts.length != 0) {
                            $("#yesObDisp").hide();
                            $("#ObDIsp").hide()
                            var Disps = [] //JSON.parse(sessionStorage.getItem("SDisps"))  LOG_IN_ID /KPP
                            $("#Disps input[type=checkbox]").each(function () {

                                if ($(this).is(":checked")) {
                                    Disps.push({ LOG_IN_ID: $(this).attr('itemid') });
                                    //sessionStorage.setItem(selectedObj)

                                }
                            })
                            //  Disps = JSON.parse(Disps)
                            if (Disps != null) {

                                if (Disps.length != 0) {
                                    $("#yesDDisp").hide();
                                    $("#DDIsp").hide()
                                    var Enginers = []//JSON.parse(sessionStorage.getItem("SENG")) LOG_IN_ID
                                    $("#engnrs input[type=checkbox]").each(function () {

                                        if ($(this).is(":checked")) {
                                            Enginers.push({ LOG_IN_ID: $(this).attr('itemid') });
                                            //sessionStorage.setItem(selectedObj)

                                        }
                                    })
                                    //   Enginers = JSON.parse(Enginers)
                                    if (Enginers != null) {
                                        if (Enginers.length != 0) {
                                            $("#yesEngDisp").hide();
                                            $("#EngDIsp").hide()

                                            var Tex = []//JSON.parse(sessionStorage.getItem("STEX"))LOG_IN_ID
                                            $("#tex input[type=checkbox]").each(function () {

                                                if ($(this).is(":checked")) {
                                                    Tex.push({ LOG_IN_ID: $(this).attr('itemid') });
                                                    //sessionStorage.setItem(selectedObj)

                                                }
                                            })
                                            //   Tex = JSON.parse(Tex);
                                            if (Tex != null) {
                                                if (Tex.length != 0) {
                                                    $("#yesTExDisp").hide();
                                                    $("#TExDIsp").hide()
                                                    var icon_ = $("#fotoDisp").attr('src');
                                                    var obj = {
                                                        Dsts: 0,
                                                        icon: icon_,
                                                        NDisp: DispName,
                                                        PhDisp: telDisp,
                                                        C: Id,
                                                        objs: Objcts,
                                                        DispAcc: Disps,
                                                        EngAcc: Enginers,
                                                        TexAcc: Tex
                                                    };

                                                    $.ajax({
                                                        type: "POST",
                                                        url: "CreateDisp.aspx/CRDisp",
                                                        data: JSON.stringify(obj),
                                                        contentType: "application/json; charset=utf-8",
                                                        dataType: "json",
                                                        success: function (result) {
                                                            var log_Id = sessionStorage.getItem("Log")
                                                            SaveLog("Сохранить", "Простое", "Администратор", "Клиентское администрирование", "В системе создана диспетчерская (" + $("#DispName").val() + ")", log_Id);
                                                            window.location.href = "Disp.aspx"
                                                        },
                                                        error: function (r) {
                                                            // //alert("Error");
                                                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                                                        },
                                                        failure: function (r) {
                                                            alert("FAIL");
                                                        }
                                                    });
                                                }
                                                else {
                                                    $("#yesTExDisp").show();
                                                    $("#TExDIsp").text("Пожалуйста, выберите Техника").show()
                                                }


                                            }
                                            else {
                                                //yesTExDisp
                                                //TExDIsp
                                                $("#yesTExDisp").show();
                                                $("#TExDIsp").text("Пожалуйста, выберите техника").show()
                                                //  $("html, body").animate({ scrollTop: 50 }, "slow");
                                            }
                                        }
                                        else {
                                            $("#yesEngDisp").show();
                                            $("#EngDIsp").text("Пожалуйста, выберите инженера").show()
                                            $("html, body").animate({ scrollTop: 500 }, "slow");
                                        }

                                    }
                                    else {
                                        //yesEngDisp
                                        //EngDIsp          
                                        $("#yesEngDisp").show();
                                        $("#EngDIsp").text("Пожалуйста, выберите инженера").show()
                                        $("html, body").animate({ scrollTop: 550 }, "slow");
                                    }
                                }
                                else {
                                    $("#yesDDisp").show();
                                    $("#DDIsp").text("Пожалуйста, выберите диспетчера").show()
                                    $("html, body").animate({ scrollTop: 50 }, "slow");
                                }

                            }
                            else {
                                //yesDDisp
                                //DDIsp
                                $("#yesDDisp").show();
                                $("#DDIsp").text("Пожалуйста, выберите диспетчера").show()
                                $("html, body").animate({ scrollTop: 50 }, "slow");
                            }
                        }
                        else {
                            $("#yesObDisp").show();
                            $("#ObDIsp").text("Пожалуйста, выберите Объект диспетчерской").show()
                            $("html, body").animate({ scrollTop: 50 }, "slow");
                        }

                    }
                    else {
                        //yesObDisp
                        //ObDIsp
                        $("#yesObDisp").show();
                        $("#ObDIsp").text("Пожалуйста, выберите Объект диспетчерской ").show()
                        $("html, body").animate({ scrollTop: 50 }, "slow");
                    }

                }
                else {
                    $("#yesTelDisp").show();
                    $("#TlDIsp").text("Пожалуйста, не оставляйте пустым данное поле").show()
                    $("html, body").animate({ scrollTop: 50 }, "slow");
                }

                $("#yesNMDisp").hide();
                $("#NMDIsp").hide()
            }
            else {
                $("#yesNMDisp").show();
                $("#NMDIsp").text("Пожалуйста, не оставляйте пустым данное поле").show()
                $("html, body").animate({ scrollTop: 50 }, "slow");
            }
        })
        $("#saveActD").click(function () {
            var DispName = $("#DispName").val();
            if (DispName.length != 0) {

                var telDisp = $("#telDisp").val();
                if (telDisp.length != 0) {
                    $("#yesTelDisp").hide();
                    $("#TlDIsp").hide()

                    //var Objcts = JSON.parse(sessionStorage.getItem("Sobjcts"))
                    var Objcts = [];//JSON.parse(sessionStorage.getItem("Sobjcts"))//Must refactering Object_Id
                    $("#objcts input[type=checkbox]").each(function () {

                        if ($(this).is(":checked")) {
                            Objcts.push({ Object_Id: $(this).attr('itemid') });
                            //sessionStorage.setItem(selectedObj)

                        }
                    })

                    if (Objcts != null) {
                        if (Objcts.length != 0) {
                            $("#yesObDisp").hide();
                            $("#ObDIsp").hide()
                            // var Disps = JSON.parse(sessionStorage.getItem("SDisps"))
                            var Disps = [] //JSON.parse(sessionStorage.getItem("SDisps"))  LOG_IN_ID /KPP
                            $("#Disps input[type=checkbox]").each(function () {

                                if ($(this).is(":checked")) {
                                    Disps.push({ LOG_IN_ID: $(this).attr('itemid') });
                                    //sessionStorage.setItem(selectedObj)

                                }
                            })
                            if (Disps != null) {

                                if (Disps.length != 0) {
                                    $("#yesDDisp").hide();
                                    $("#DDIsp").hide()
                                    //  var Enginers = JSON.parse(sessionStorage.getItem("SENG"))
                                    var Enginers = []
                                    $("#engnrs input[type=checkbox]").each(function () {

                                        if ($(this).is(":checked")) {
                                            Enginers.push({ LOG_IN_ID: $(this).attr('itemid') });
                                            //sessionStorage.setItem(selectedObj)

                                        }
                                    })
                                    if (Enginers != null) {
                                        if (Enginers.length != 0) {
                                            $("#yesEngDisp").hide();
                                            $("#EngDIsp").hide()

                                            //  var Tex = JSON.parse(sessionStorage.getItem("STEX"))
                                            var Tex = []//JSON.parse(sessionStorage.getItem("STEX"))LOG_IN_ID
                                            $("#tex input[type=checkbox]").each(function () {

                                                if ($(this).is(":checked")) {
                                                    Tex.push({ LOG_IN_ID: $(this).attr('itemid') });
                                                    //sessionStorage.setItem(selectedObj)

                                                }
                                            })
                                            if (Tex != null) {
                                                if (Tex.length != 0) {
                                                    $("#yesTExDisp").hide();
                                                    $("#TExDIsp").hide()
                                                    var icon_ = $("#fotoDisp").attr('src');
                                                    var obj = {
                                                        Dsts: 1,
                                                        icon: icon_,
                                                        NDisp: DispName,
                                                        PhDisp: telDisp,
                                                        C: Id,
                                                        objs: Objcts,
                                                        DispAcc: Disps,
                                                        EngAcc: Enginers,
                                                        TexAcc: Tex
                                                    };

                                                    $.ajax({
                                                        type: "POST",
                                                        url: "CreateDisp.aspx/CRDisp",
                                                        data: JSON.stringify(obj),
                                                        contentType: "application/json; charset=utf-8",
                                                        dataType: "json",
                                                        success: function (result) {
                                                            var log_Id = sessionStorage.getItem("Log")
                                                            SaveLog("Активировать", "Простое", "Администратор", "Клиентское администрирование", "Активация Диспетчерской (" + DispName + ")", log_Id);
                                                            window.location.href = "Disp.aspx"
                                                        },
                                                        error: function (r) {
                                                            // //alert("Error");
                                                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                                                        },
                                                        failure: function (r) {
                                                            alert("FAIL");
                                                        }
                                                    });
                                                }
                                                else {
                                                    $("#yesTExDisp").show();
                                                    $("#TExDIsp").text("Пожалуйста, выберите Техника").show()
                                                }


                                            }
                                            else {
                                                //yesTExDisp
                                                //TExDIsp
                                                $("#yesTExDisp").show();
                                                $("#TExDIsp").text("Пожалуйста, выберите техника").show()
                                            }
                                        }
                                        else {
                                            $("#yesEngDisp").show();
                                            $("#EngDIsp").text("Пожалуйста, выберите инженера").show()
                                            $("html, body").animate({ scrollTop: 500 }, "slow");
                                        }

                                    }
                                    else {
                                        //yesEngDisp
                                        //EngDIsp
                                        $("#yesEngDisp").show();
                                        $("#EngDIsp").text("Пожалуйста, выберите инженера").show()
                                        $("html, body").animate({ scrollTop: 500 }, "slow");
                                    }
                                }
                                else {
                                    $("#yesDDisp").show();
                                    $("#DDIsp").text("Пожалуйста, выберите диспетчера").show()
                                    $("html, body").animate({ scrollTop: 50 }, "slow");
                                }

                            }
                            else {
                                //yesDDisp
                                //DDIsp
                                $("#yesDDisp").show();
                                $("#DDIsp").text("Пожалуйста, выберите диспетчера").show()
                                $("html, body").animate({ scrollTop: 50 }, "slow");
                            }
                        }
                        else {
                            $("#yesObDisp").show();
                            $("#ObDIsp").text("Пожалуйста, выберите Объект диспетчерской").show()
                            $("html, body").animate({ scrollTop: 50 }, "slow");
                        }

                    }
                    else {
                        //yesObDisp
                        //ObDIsp
                        $("#yesObDisp").show();
                        $("#ObDIsp").text("Пожалуйста, выберите Объект диспетчерской ").show()
                        $("html, body").animate({ scrollTop: 50 }, "slow");
                    }

                }
                else {
                    $("#yesTelDisp").show();
                    $("#TlDIsp").text("Пожалуйста, не оставляйте пустым данное поле").show()
                    $("html, body").animate({ scrollTop: 50 }, "slow");
                }

                $("#yesNMDisp").hide();
                $("#NMDIsp").hide()
            }
            else {
                $("#yesNMDisp").show();
                $("#NMDIsp").text("Пожалуйста, не оставляйте пустым данное поле").show()
                $("html, body").animate({ scrollTop: 50 }, "slow");
            }
        })
        $("#AddAcc").click(function () {
            sessionStorage.setItem("LogId", "")
            var selectedObj = [];
            var selDisp = []
            var inj = []
            var texs = []
            $("#objcts input[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    selectedObj.push({ sObjss: $(this).attr('itemid') });
                    //sessionStorage.setItem(selectedObj)

                }
            })
            //console.log("selObj" + JSON.stringify(selectedObj));
            sessionStorage.setItem("selObj", JSON.stringify(selectedObj))
            $("#Disps input[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    selDisp.push({ sDisp: $(this).attr('itemid') });
                    //sessionStorage.setItem(selectedObj)

                }
            })
            // console.log("selDisps" + JSON.stringify(selDisp));
            sessionStorage.setItem("selDisps", JSON.stringify(selDisp))
            $("#engnrs input[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    inj.push({ sInjs: $(this).attr('itemid') });
                    //sessionStorage.setItem(selectedObj)

                }
            })
            //console.log("sInjs" + JSON.stringify(inj));
            sessionStorage.setItem("sInjs", JSON.stringify(inj))
            $("#tex input[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    texs.push({ stexs: $(this).attr('itemid') });
                    //sessionStorage.setItem(selectedObj)

                }
            })
            // console.log("texs" + JSON.stringify(texs));
            sessionStorage.setItem("texs", JSON.stringify(texs))
            var imgDisp = $("#fotoDisp").attr('src');
            //console.log("imgDisp", imgDisp);
            sessionStorage.setItem("imgDisp", imgDisp)
            var dspName = $("#DispName").val()
            sessionStorage.setItem('ndisp', dspName);

            sessionStorage.setItem("cmsf_a", "CreateDisp.aspx")
            window.location.href = "CreateAccount.aspx"
        })
        $("#AddOb").click(function () {
            var selectedObj = [];
            var selDisp = []
            var inj = []
            var texs = []
            $("#objcts input[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    selectedObj.push({ sObjss: $(this).attr('itemid') });
                    //sessionStorage.setItem(selectedObj)

                }
            })
            //console.log("selObj" + JSON.stringify(selectedObj));
            sessionStorage.setItem("selObj", JSON.stringify(selectedObj))
            $("#Disps input[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    selDisp.push({ sDisp: $(this).attr('itemid') });
                    //sessionStorage.setItem(selectedObj)

                }
            })
            // console.log("selDisps" + JSON.stringify(selDisp));
            sessionStorage.setItem("selDisps", JSON.stringify(selDisp))
            $("#engnrs input[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    inj.push({ sInjs: $(this).attr('itemid') });
                    //sessionStorage.setItem(selectedObj)

                }
            })
            //console.log("sInjs" + JSON.stringify(inj));
            sessionStorage.setItem("sInjs", JSON.stringify(inj))
            $("#tex input[type=checkbox]").each(function () {

                if ($(this).is(":checked")) {
                    texs.push({ stexs: $(this).attr('itemid') });
                    //sessionStorage.setItem(selectedObj)

                }
            })
            // console.log("texs" + JSON.stringify(texs));
            sessionStorage.setItem("texs", JSON.stringify(texs))
            var imgDisp = $("#fotoDisp").attr('src');
            //console.log("imgDisp", imgDisp);
            sessionStorage.setItem("imgDisp", imgDisp)
            sessionStorage.setItem('ndisp', $("#DispName").val());
            sessionStorage.setItem("cmsf_O", "CreateDisp.aspx")
            window.location.href = "CreateOpject.aspx"
        })
    }
    function GetDisps(ClId) {
        var obj = {
            C: ClId
        };
        //alert(JSON.stringify(obj));

        $.ajax({
            type: "POST",
            url: "Disp.aspx/GetDisps",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //  console.log(result)

                var jsondata_ = JSON.parse(result.d)

                // console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {
                    //console.log(jsondata_[i].LOG_IN_ID)
                    if (jsondata_[i].DISP_STATUS == false) {//
                        $(".dispList").append('<li><div><a href="#"   onclick=EdFunc(' + jsondata_[i].DISP_ID + ') id="disp_1"><img class="foto-disp" src="' + jsondata_[i].DISP_ICON_IMG + '" /><h4>' + jsondata_[i].DISP_NAME + '</h4></a><button id="disp1" class="btn btn-default dispBtn" onclick=Activation(this,' + jsondata_[i].DISP_ID + ') type="button">Активировать</button></div></li>')

                        //$(".dispList").append("<li><div><a href='#'   onclick=EdFunc(" + jsondata_[i].DISP_ID + ") id='disp_1'><img class='foto- disp' src='" + jsondata_[i].DISP_ICON_IMG + "' /><h4>" + jsondata_[i].DISP_NAME + "</h4></a><button id='disp1' class='btn btn-default dispBtn' onclick=Activation(this," + jsondata_[i].DISP_ID + ",'" + jsondata_[i].DISP_NAME + "') type='button'>Активировать</button></div></li>")
                    }
                    if (jsondata_[i].DISP_STATUS == true) {
                        $(".dispList").append('<li><div><a href="#" onclick=EdFunc(' + jsondata_[i].DISP_ID + ') id="disp_1"><img class="foto-disp" src="' + jsondata_[i].DISP_ICON_IMG + '" /><h4>' + jsondata_[i].DISP_NAME + '</h4></a><span> &nbsp;</span></div></li>')
                    }


                }

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
    if (loc == "/Client_Admin/Disp.aspx") {
        sessionStorage.removeItem("Disp_ID")
        GetDisps(Id);
        sessionStorage.setItem("ComesTo", "");
        sessionStorage.setItem('cmsf_O', "");

        sessionStorage.removeItem("Sobjcts")
        sessionStorage.removeItem("SDisps")
        sessionStorage.removeItem("SENG")
        sessionStorage.removeItem("STEX")
    }
    function OBjectChecked(DId, ClId, c_ms) {
        var obj = {
            DD: DId,
            Cl_Id: ClId
        };
        //alert(JSON.stringify(obj));
        var objsc = []
        $.ajax({
            type: "POST",
            url: "EditDisp.aspx/GetCheckedObjects",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //  console.log(result)
                if (c_ms == "") {
                    var jsondata_ = JSON.parse(result.d)

                    //console.log(jsondata_)

                    for (var i = 0; i < jsondata_.length; i++) {
                        //console.log(jsondata_[i].LOG_IN_ID)
                        if (jsondata_[i].ObjectPhoto == 1) {
                            $("#objcts").append('<input type="checkbox" checked itemid=' + jsondata_[i].Object_Id + ' onclick=SSObjdata(this,' + jsondata_[i].Object_Id + ') style="margin-left:5px"/><label   class="checkBx">' + jsondata_[i].ObjectAdress + '</label>')
                            objsc.push({ "Object_Id": jsondata_[i].Object_Id })
                        }
                        if (jsondata_[i].ObjectPhoto == 0) {
                            $("#objcts").append('<input type="checkbox" itemid=' + jsondata_[i].Object_Id + ' onclick=SSObjdata(this,' + jsondata_[i].Object_Id + ') style="margin-left:5px;"/><label   class="checkBx">' + jsondata_[i].ObjectAdress + '</label>')

                        }

                    }
                }
                if (c_ms != "") {
                    var jsondata_ = JSON.parse(result.d)

                    //console.log(jsondata_)

                    for (var i = 0; i < jsondata_.length; i++) {
                        //console.log(jsondata_[i].LOG_IN_ID)//muck
                        //if (c_ms[i].Object_Id == 1) {
                        //    $("#objcts").append('<input type="checkbox" checked itemid=' + jsondata_[i].Object_Id + ' onclick=SSObjdata(this,' + jsondata_[i].Object_Id + ') style="margin-left:5px"/><label   class="checkBx">' + jsondata_[i].ObjectAdress + '</label>')
                        //    objsc.push({ "Object_Id": jsondata_[i].Object_Id })
                        //}

                        $("#objcts").append('<input type="checkbox" itemid=' + jsondata_[i].Object_Id + ' onclick=SSObjdata(this,' + jsondata_[i].Object_Id + ') style="margin-left:5px;"/><label   class="checkBx">' + jsondata_[i].ObjectAdress + '</label>')

                    }
                    for (var i = 0; i < c_ms.length; i++) {
                        $('#objcts input:checkbox').each(function () {
                            //objects.push({ "Object_Id": $(this).attr('itemid') });
                            if ($(this).attr("itemid") == c_ms[i].Object_Id) {
                                $(this).prop('checked', true);
                                objsc.push({ "Object_Id": $(this).attr("itemid") })
                            }
                        });
                    }
                }

                //sessionStorage.getItem("""")
                sessionStorage.setItem("objss", JSON.stringify(objsc))
                // console.log("Obyektler: " + JSON.stringify(objsc))

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
    function GetAccForDisp2(CL_id, M_Id, R_ID) {
        var obj = {
            CId: CL_id,
            MId: M_Id,
            RId: R_ID

        };

        $.ajax({
            type: "POST",
            url: "CreateDisp.aspx/GetAccForMR",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                // <div id="account1">Комбаров Дмитрий Борисович</div>

                var jsondata_ = JSON.parse(result.d)
                for (var i = 0; i < jsondata_.length; i++) {


                    //$("#Disps").append('<input type="checkbox" onclick=SDsdata(this,' + jsondata_[i].LOG_IN_ID + ') style="margin- left:5px;"/><label  class="checkBx">' + jsondata_[i].ACCOUNT_NAME + '</label>')
                    $("#dsp").after('<div id="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + '</div>')
                }

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
    function getDis(D, r) {
        var obj = {
            DD: D,
            R: r
        };
        //alert(JSON.stringify(obj));
        var dispsArr = []
        $.ajax({
            type: "POST",
            url: "EditDisp.aspx/getDispsENgsTexs",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //  console.log(result)

                var jsondata_ = JSON.parse(result.d)

                //console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {
                    //<li><div>Зуев Георгий Александрович</div></li >

                    $("#dspDiv-ul").append('<li style="display: block;" data-value="dsp" itemid="' + jsondata_[i].LOG_IN_ID + '"><div>' + jsondata_[i].ACCOUNT_NAME + ' (Диспетчер)</div></li >')
                    //$("#dsp").after('<div itemid="' + jsondata_[i].LOG_IN_ID + '" draggable="true" ondrag="dragDisp(this)">' + jsondata_[i].ACCOUNT_NAME + '</div>')
                    dispsArr.push({ "LOG_IN_ID": jsondata_[i].LOG_IN_ID, "ACCOUNT_NAME": jsondata_[i].ACCOUNT_NAME })
                }
                // console.log("disps eski:" + JSON.stringify(dispsArr))
                sessionStorage.setItem("dsps", JSON.stringify(dispsArr))
                draggableDspDivUl();
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
    function getTex(D, r) {
        var obj = {
            DD: D,
            R: r
        };
        //alert(JSON.stringify(obj));
        var TexArr = []
        $.ajax({
            type: "POST",
            url: "EditDisp.aspx/getDispsENgsTexs",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //  console.log(result)

                var jsondata_ = JSON.parse(result.d)

                //console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {

                    //$("#tex").after('<div itemid="' + jsondata_[i].LOG_IN_ID + '" draggable="true" ondrag="dragTex(this)">' + jsondata_[i].ACCOUNT_NAME + '</div>')
                    //<li><div>Зуев Георгий Александрович</div></li >
                    $("#TexDiv-ul").append('<li style="display: block;" itemid="' + jsondata_[i].LOG_IN_ID + '" data-value="tex"><div>' + jsondata_[i].ACCOUNT_NAME + ' (Техник)</div></li >')
                    TexArr.push({ "LOG_IN_ID": jsondata_[i].LOG_IN_ID, "ACCOUNT_NAME": jsondata_[i].ACCOUNT_NAME })
                }
                sessionStorage.setItem("texArr", JSON.stringify(TexArr))
                console.log("Texniki Default :" + JSON.stringify(TexArr))
                draggableTexDivUl();
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
    function getIng(D, r) {
        var obj = {
            DD: D,
            R: r
        };
        //alert(JSON.stringify(obj));
        var IngArr = []
        $.ajax({
            type: "POST",
            url: "EditDisp.aspx/getDispsENgsTexs",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //  console.log(result)

                var jsondata_ = JSON.parse(result.d)

                //console.log(jsondata_)

                for (var i = 0; i < jsondata_.length; i++) {

                    //$("#ing").after('<div itemid="' + jsondata_[i].LOG_IN_ID + '" draggable="true" ondrag="dragInj(this)">' + jsondata_[i].ACCOUNT_NAME + '</div>')
                    $("#engDiv-ul").append('<li style="display: block;" itemid="' + jsondata_[i].LOG_IN_ID + '"data-value="eng"><div>' + jsondata_[i].ACCOUNT_NAME + ' (Инженер)</div =></li>');
                    IngArr.push({ "LOG_IN_ID": jsondata_[i].LOG_IN_ID, "ACCOUNT_NAME": jsondata_[i].ACCOUNT_NAME })

                }
                // console.log("Injener default :" + JSON.stringify(IngArr))
                sessionStorage.setItem("IngArr", JSON.stringify(IngArr))
                draggableEngDivUL();
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
    function GetNotDisp(Cl_Id, dd, cm_s) {
        var obj = {
            ClId: Cl_Id,
            DD: dd
        };
        //alert(JSON.stringify(obj));

        $.ajax({
            type: "POST",
            url: "EditDisp.aspx/GetNotDispAcc",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //console.log(result)
                if (cm_s == "") {
                    var jsondata_ = JSON.parse(result.d)

                    //console.log(jsondata_)

                    for (var i = 0; i < jsondata_.length; i++) {

                        //$("#ing").after('<div id="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + '</div>')
                        //<div id="account5" draggable="true" ondrag="dragACCS(this)" >Петров Иван Иванович</div>
                        //$(".dispList").append('<div   itemid="' + jsondata_[i].LOG_IN_ID + '" draggable="true" ondrag="dragACCS(this)" >' + jsondata_[i].ACCOUNT_NAME + '</div>')
                        //if (jsondata_[i].ENTITY_TYPE_ID == 3) {
                        //    $("#UZ").append('<li data-value="dsp" itemid="' + jsondata_[i].LOG_IN_ID + '"   ><div>' + jsondata_[i].ACCOUNT_NAME + ' (Диспетчер)</div></li>')
                        //    //<li data-value="dsp" class="ui-draggable ui-draggable-handle" style="position: relative;"><div>Singo (dsp)</div></li>
                        //}
                        //if (jsondata_[i].ENTITY_TYPE_ID == 2) {
                        //    $("#UZ").append('<li data-value="eng"  itemid="' + jsondata_[i].LOG_IN_ID + '" ><div>' + jsondata_[i].ACCOUNT_NAME + ' (Инженер)</div></li>')

                        //}
                        //if (jsondata_[i].ENTITY_TYPE_ID == 6) {
                        //    $("#UZ").append('<li data-value="tex" itemid="' + jsondata_[i].LOG_IN_ID + '"  ><div>' + jsondata_[i].ACCOUNT_NAME + ' (Техник)</div></li>')

                        //}
                        var jsonRoles = jsondata_[i].roles
                        var role_s = "";
                        var RoleText = "";
                        for (var j = 0; j < jsonRoles.length; j++) {

                            if (jsonRoles.length == 1) {
                                if (jsonRoles[j].ROLE_ID == 6) {
                                    //$("#UZ").append('<li data-value="tex" itemid="' + jsondata_[i].LOG_IN_ID + '"  ><div>' + jsondata_[i].ACCOUNT_NAME + ' (Техник)</div></li>')
                                    role_s = "tex";
                                    RoleText = "Техник";
                                }
                                if (jsonRoles[j].ROLE_ID == 2) {
                                    //$("#UZ").append('<li data-value="eng"  itemid="' + jsondata_[i].LOG_IN_ID + '" ><div>' + jsondata_[i].ACCOUNT_NAME + ' (Инженер)</div></li>')
                                    role_s = "eng";
                                    RoleText = "Инженер";
                                }
                                if (jsonRoles[j].ROLE_ID == 3) {
                                    //$("#UZ").append('<li data-value="dsp" itemid="' + jsondata_[i].LOG_IN_ID + '"   ><div>' + jsondata_[i].ACCOUNT_NAME + ' (Диспетчер)</div></li>')
                                    role_s = "dsp";
                                    RoleText = "Диспетчер";
                                }
                            }
                            else {

                                if (j == 0) {
                                    if (jsonRoles[j].ROLE_ID == 3) {
                                        role_s = "dsp"
                                        RoleText = 'Диспетчер'
                                    }
                                    if (jsonRoles[j].ROLE_ID == 2) {
                                        role_s = "eng"
                                        RoleText = 'Инженер'
                                    }
                                    if (jsonRoles[j].ROLE_ID == 6) {
                                        role_s = "tex"
                                        RoleText = 'Техник'
                                    }

                                }
                                else {
                                    if (jsonRoles[j].ROLE_ID == 3) {
                                        role_s = role_s + ",dsp"
                                        RoleText = RoleText + ", Диспетчер"
                                    }
                                    if (jsonRoles[j].ROLE_ID == 2) {
                                        role_s = role_s + ",eng"
                                        RoleText = RoleText + ", Инженер"
                                    }
                                    if (jsonRoles[j].ROLE_ID == 6) {
                                        role_s = role_s + ",tex"
                                        RoleText = RoleText + ", Техник"
                                    }
                                }

                            }

                        }
                        $("#UZ").append('<li style="width:100%" data-value="' + role_s + '" itemid="' + jsondata_[i].LOG_IN_ID + '"  ><div>' + jsondata_[i].ACCOUNT_NAME + ' (' + RoleText + ')</div></li>')
                    }
                    draggableUZ();
                }
                if (cm_s != "") {
                    var jsondata_ = JSON.parse(result.d)

                    //console.log(jsondata_)

                    for (var i = 0; i < jsondata_.length; i++) {

                        //$("#ing").after('<div id="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + '</div>')
                        //<div id="account5" draggable="true" ondrag="dragACCS(this)" >Петров Иван Иванович</div>
                        //$(".dispList").append('<div   itemid="' + jsondata_[i].LOG_IN_ID + '" draggable="true" ondrag="dragACCS(this)" >' + jsondata_[i].ACCOUNT_NAME + '</div>')
                        if (jsondata_[i].ENTITY_TYPE_ID == 3) {
                            $("#UZ").append('<li data-value="dsp" itemid="' + jsondata_[i].LOG_IN_ID + '"   ><div>' + jsondata_[i].ACCOUNT_NAME + ' (Диспетчер)</div></li>')
                            //<li data-value="dsp" class="ui-draggable ui-draggable-handle" style="position: relative;"><div>Singo (dsp)</div></li>
                        }
                        if (jsondata_[i].ENTITY_TYPE_ID == 2) {
                            $("#UZ").append('<li data-value="eng"  itemid="' + jsondata_[i].LOG_IN_ID + '" ><div>' + jsondata_[i].ACCOUNT_NAME + ' (Инженер)</div></li>')

                        }
                        if (jsondata_[i].ENTITY_TYPE_ID == 6) {
                            $("#UZ").append('<li data-value="tex" itemid="' + jsondata_[i].LOG_IN_ID + '"  ><div>' + jsondata_[i].ACCOUNT_NAME + ' (Техник)</div></li>')

                        }
                    }
                    draggableUZ();

                    //$("#dspDiv-ul li").each(function () {
                    //    var currliId = $(this).attr("itemid");
                    //    $("#UZ li").each(function () {
                    //        if (currliId == $(this).attr("itemid")) {
                    //            $(this).remove();
                    //        }
                    //    })
                    //})

                    //$("#TexDiv-ul li").each(function () {
                    //    var currliId = $(this).attr("itemid");
                    //    $("#UZ li").each(function () {
                    //        if (currliId == $(this).attr("itemid")) {
                    //            $(this).remove();
                    //        }
                    //    })
                    //})

                    //$("#engDiv-ul li").each(function () {
                    //    var currliId = $(this).attr("itemid");
                    //    $("#UZ li").each(function () {
                    //        if (currliId == $(this).attr("itemid")) {
                    //            $(this).remove();
                    //        }
                    //    })
                    //})


                }


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
    function draggableUZ() {
        $("#UZ li").draggable({
            revert: true,
            cursor: "move",
            start: function () {
                $("#UZ").css('overflow', '')
                $("#dspDiv").css("background-color", "rgb(192,192,192)")
                $("#TexDiv").css("background-color", "rgb(192,192,192)")
                $("#engDiv").css("background-color", "rgb(192,192,192)")
                $("#UZ").css("background-color", "rgb(192,192,192)")
            },
            stop: function () {
                $("#dspDiv").css("background-color", "")
                $("#UZ").css('overflow', 'auto')
                $("#TexDiv").css("background-color", "")
                $("#engDiv").css("background-color", "")
                $("#UZ").css("background-color", "")
                // $(this).remove();

                //alert($(this).attr("data-value"))
            }

        })
    }
    function draggableDspDivUl() {
        $("#dspDiv-ul li").draggable({
            revert: "invalid",
            cursor: "move",
            start: function () {
                $("#UZ").css('overflow', '')

                $("#UZ").css("background-color", "rgb(192,192,192)")
            },
            stop: function () {
                $("#dspDiv").css("background-color", "")
                $("#UZ").css('overflow', 'auto')
                $("#TexDiv").css("background-color", "")
                $("#engDiv").css("background-color", "")
                $("#UZ").css("background-color", "")
                //     var Disps = JSON.parse(sessionStorage.getItem("dsps"))
                //   //  console.log("Disop daraggable oncesi" + JSON.stringify(Disps))
                // var sDisp = $(this).attr("itemid")
                // // alert(sDisp)
                // for (var i = 0; i < Disps.length; i++) {
                //     if (Disps[i].LOG_IN_ID == sDisp) {
                //         Disps.splice(i, 1);

                //     }
                // }
                // sessionStorage.setItem("dsps", JSON.stringify(Disps))
                //console.log("Disop daraggable sonrasi" + JSON.stringify(Disps))

                //console.log("disp draggable dan sonraki: " + JSON.stringify(Disps))
            }, stack: "#UZ"

        })
    }
    function draggableTexDivUl() {
        $("#TexDiv-ul li").draggable({
            revert: "invalid",
            cursor: "move",
            start: function () {
                $("#UZ").css('overflow', '')

                $("#UZ").css("background-color", "rgb(192,192,192)")
            },
            stop: function () {
                $("#dspDiv").css("background-color", "")
                $("#UZ").css('overflow', 'auto')
                $("#TexDiv").css("background-color", "")
                $("#engDiv").css("background-color", "")
                $("#UZ").css("background-color", "")
                //var Texs = JSON.parse(sessionStorage.getItem("texArr"))
                //console.log("Texniki daraggable oncesi" + JSON.stringify(Texs))
                //var sTex = $(this).attr("itemid")
                //// alert(sDisp)
                //for (var i = 0; i < Texs.length; i++) {
                //    if (Texs[i].LOG_IN_ID == sTex) {
                //        Texs.splice(i, 1);

                //    }
                //}
                //sessionStorage.setItem("texArr", JSON.stringify(Texs))
                //console.log("Texniki daraggable sonrasi" + JSON.stringify(Texs))

            }, stack: "#UZ"

        })
    }
    function draggableDispDivUl() {
        $("#dspDiv-ul li").draggable({
            revert: "invalid",
            cursor: "move",
            start: function () {
                $("#UZ").css('overflow', '')

                $("#UZ").css("background-color", "rgb(192,192,192)")
            },
            stop: function () {
                $("#dspDiv").css("background-color", "")
                $("#UZ").css('overflow', 'auto')
                $("#TexDiv").css("background-color", "")
                $("#engDiv").css("background-color", "")
                $("#UZ").css("background-color", "")
                //var Texs = JSON.parse(sessionStorage.getItem("texArr"))
                //console.log("Texniki daraggable oncesi" + JSON.stringify(Texs))
                //var sTex = $(this).attr("itemid")
                //// alert(sDisp)
                //for (var i = 0; i < Texs.length; i++) {
                //    if (Texs[i].LOG_IN_ID == sTex) {
                //        Texs.splice(i, 1);

                //    }
                //}
                //sessionStorage.setItem("texArr", JSON.stringify(Texs))
                //console.log("Texniki daraggable sonrasi" + JSON.stringify(Texs))

            }, stack: "#UZ"

        })
    }
    function draggableEngDivUL() {
        $("#engDiv-ul li").draggable({
            revert: "invalid",
            cursor: "move",
            start: function () {
                $("#UZ").css('overflow', '')

                $("#UZ").css("background-color", "rgb(192,192,192)")
            },
            stop: function () {
                $("#dspDiv").css("background-color", "")
                $("#UZ").css('overflow', 'auto')
                $("#TexDiv").css("background-color", "")
                $("#engDiv").css("background-color", "")
                $("#UZ").css("background-color", "")
            }, stack: "#UZ"

        })
    }
    function DeleteDisp(dd) {
        var obj = {
            DD: dd

        };

        $.ajax({
            type: "POST",
            url: "EditDisp.aspx/DispDelete",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var log_Id = sessionStorage.getItem("Log");
                SaveLog("Удалить", "Важное", "Администратор", "Клиентское администрирование", "Удалена диспетчерская (" + $("#DName").val() + ")", log_Id);
                window.location.href = "Disp.aspx";
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
    if (loc == "/Client_Admin/EditDisp.aspx") {
        var Dddspid = sessionStorage.getItem("Disp_ID");
        var comes_to = sessionStorage.getItem("ComesTo");
        if (comes_to == "") {
            GetNotDisp(Id, Dddspid, "");
            getDis(Dddspid, 3)
            getTex(Dddspid, 6)
            getIng(Dddspid, 2)
            OBjectChecked(Dddspid, Id, "")
            GetNamePimage(Dddspid)
        }
        if (comes_to != "") {
            var NTI = sessionStorage.getItem("NI");
            NTI = JSON.parse(NTI);
            $("#DName").val(NTI[0].DName);
            $("#telDisp").val(NTI[0].telDisp);
            $("#fotoDisp").attr("src", NTI[0].fotoDisp);

            var Sobjects = sessionStorage.getItem("SObjects")
            Sobjects = JSON.parse(Sobjects)
            OBjectChecked(Dddspid, Id, Sobjects)
            var dsp_s = sessionStorage.getItem("SDisps");
            dsp_s = JSON.parse(dsp_s);
            for (var i = 0; i < dsp_s.length; i++) {
                $("#dspDiv-ul").prepend('<li style="display: block; position: relative;" data-value="dsp" itemid="' + dsp_s[i].LOG_IN_ID + '" class="ui-draggable ui-draggable-handle"><div>' + dsp_s[i].ACCOUNT_NAME + '</div></li>')
            }
            var tx_s = sessionStorage.getItem("TXS");
            tx_s = JSON.parse(tx_s)
            for (var i = 0; i < tx_s.length; i++) {
                $("#TexDiv-ul").prepend('<li style="display: block; position: relative;" itemid="' + tx_s[i].LOG_IN_ID + '" data-value="tex" class="ui-draggable ui-draggable-handle"><div>' + tx_s[i].ACCOUNT_NAME + '</div></li>')
            }

            var e_ng = sessionStorage.getItem("SEnginer");
            e_ng = JSON.parse(e_ng)
            for (var i = 0; i < e_ng.length; i++) {
                //
                $("#engDiv-ul").prepend('<li style="display: block; position: relative;" itemid="' + e_ng[i].LOG_IN_ID + '" data-value="eng" class="ui-draggable ui-draggable-handle"><div>' + e_ng[i].ACCOUNT_NAME + '</div></li>')

            }
            var NACC = sessionStorage.getItem("NACC");
            NACC = JSON.parse(NACC);
            for (var i = 0; i < NACC.length; i++) {
                $("#UZ").append('<li data-value="' + NACC[i].dv + '" itemid="' + NACC[i].LOG_IN_ID + '"   ><div>' + NACC[i].ACCOUNT_NAME + '</div></li>')
            }

            comes_to = JSON.parse(comes_to);
            if (comes_to[0].ID != 0) {
                if (comes_to[0].Modul1 == 4 && comes_to[0].Role1 == 3) {
                    $("#UZ").prepend('<li data-value="dsp" itemid="' + comes_to[0].ID + '" ><div>' + comes_to[0].f_io + ' (Диспетчер)</div></li>')
                }
                if (comes_to[0].Modul1 == 4 && comes_to[0].Role1 == 2) {
                    $("#UZ").prepend('<li data-value="eng" itemid="' + comes_to[0].ID + '" ><div>' + comes_to[0].f_io + ' (Инженер)</div></li>')
                }
                if (comes_to[0].Modul1 == 4 && comes_to[0].Role1 == 6) {
                    $("#UZ").prepend('<li data-value="tex" itemid="' + comes_to[0].ID + '" ><div>' + comes_to[0].f_io + ' (Техник)</div></li>')
                }
            }
            draggableTexDivUl();
            draggableEngDivUL();
            draggableDispDivUl();
            draggableUZ();
            // GetNotDisp(Id, Dddspid, NACC);
            sessionStorage.setItem("ComesTo", "");

        }


        $("#DName").keyup(function () { $("#NMDIsp").hide() })
        $("#myBtn").click(function () {
            alertWithButton("Вы действительно хотите удалить диспетчерскую", " " + $("#DName").val(), "");
        })

        $("#deleteO").click(function () {
            DeleteDisp(Dddspid)
        })

        $("#backD").click(function () { window.location.href = "/Client_Admin/Disp.aspx" })
        $("#dspDiv").droppable({
            accept: function (event) {
                var attr = $(event).attr('data-value');
                if (attr.indexOf('dsp') >= 0) {
                    return true;
                }
            },//'li[data-value="dsp"]',
            drop: function (event, ui) {
                ui.draggable.css("left", "").css("top", "").css("display", "block");
                $("#dspDiv-ul").prepend(ui.draggable)
                //        var Disps = JSON.parse(sessionStorage.getItem("dsps"))
                //      //  console.log("Dropable Oncesi: " + JSON.stringify(Disps))
                //   var attrvalue = ui.draggable.attr("itemId")
                //   var DName = ui.draggable.text();
                //   Disps.push({ "LOG_IN_ID": attrvalue, "ACCOUNT_NAME": DName });

                //   sessionStorage.setItem("dsps", JSON.stringify(Disps))
                //   console.log("Dropable sonrasi: " + JSON.stringify(Disps))
                //  // console.log("disps dropable dan sonraki:" + JSON.stringify(Disps))
                ////   ui.draggable.remove();
                $("#DDIsp").hide();
            }

        })
        $("#TexDiv").droppable({
            accept: function (event) {
                var attr = $(event).attr('data-value');
                if (attr.indexOf('tex') >= 0) {
                    return true;
                }
            },//'li[data-value="tex"]',
            drop: function (event, ui) {
                ui.draggable.css("left", "").css("top", "").css("display", "block");
                $("#TexDiv-ul").prepend(ui.draggable)
                //var Texs = JSON.parse(sessionStorage.getItem("texArr"))
                //var attrvalue = ui.draggable.attr("itemId")
                //var TName = ui.draggable.text();
                //Texs.push({ "LOG_IN_ID": attrvalue, "ACCOUNT_NAME": TName });
                ////alert(JSON.stringify(Disps));
                //sessionStorage.setItem("texArr", JSON.stringify(Texs))
                //console.log("tex dropable sonraki: " + JSON.stringify(Texs))
                $("#TExDIsp").hide();
            }
        })
        $("#engDiv").droppable({
            accept: function (event) {
                var attr = $(event).attr('data-value');
                if (attr.indexOf('eng') >= 0) {
                    return true;
                }
            },//'li[data-value="eng"]',
            drop: function (event, ui) {

                ui.draggable.css("left", "").css("top", "").css("display", "block");
                $("#engDiv-ul").prepend(ui.draggable)
                $("#EngDIsp").hide();
            }
        })
        $("#UZ").droppable({
            drop: function (event, ui) {
                ui.draggable.css("left", "").css("top", "").css("display", "block");
                $("#UZ").prepend(ui.draggable)
            }
        })
        //  GetOpjectsForDisp(Id)




        $("#btnCUZ").click(function () {
            sessionStorage.setItem("LogId", "")
            var NTI = [];
            NTI.push({ "DName": $("#DName").val(), "fotoDisp": $("#fotoDisp").attr("src"), "telDisp": $("#telDisp").val() })
            var objects = []
            $('#objcts input:checked').each(function () {
                objects.push({ "Object_Id": $(this).attr('itemid') });
            });
            var Dsps = []
            $('#dspDiv li').each(function (i) {
                // $(this).attr('rel'); // This is your rel value
                Dsps.push({ "LOG_IN_ID": $(this).attr("itemid"), "ACCOUNT_NAME": $(this).find('div').text() })
            });

            var Eng = []// JSON.parse(sessionStorage.getItem("IngArr"))
            $('#engDiv-ul li').each(function (i) {
                // $(this).attr('rel'); // This is your rel value
                Eng.push({ "LOG_IN_ID": $(this).attr("itemid"), "ACCOUNT_NAME": $(this).find('div').text() })
            });
            var Tx = []//JSON.parse(sessionStorage.getItem("texArr"))
            $('#TexDiv-ul li').each(function (i) {
                // $(this).attr('rel'); // This is your rel value
                Tx.push({ "LOG_IN_ID": $(this).attr("itemid"), "ACCOUNT_NAME": $(this).find('div').text() })
            });
            var NAcc = []
            $('#UZ li').each(function (i) {
                NAcc.push({ "LOG_IN_ID": $(this).attr("itemid"), "dv": $(this).attr('data-value'), "ACCOUNT_NAME": $(this).find('div').text() })
            })
            sessionStorage.setItem("SObjects", JSON.stringify(objects))
            sessionStorage.setItem("NI", JSON.stringify(NTI));
            sessionStorage.setItem("SDisps", JSON.stringify(Dsps));
            sessionStorage.setItem("SEnginer", JSON.stringify(Eng));
            sessionStorage.setItem("TXS", JSON.stringify(Tx));
            sessionStorage.setItem("NACC", JSON.stringify(NAcc));
            sessionStorage.setItem("ComesTo", "ED");
            window.location.href = "/Client_Admin/CreateAccount.aspx"
        })
        $("#files").change(function () {
            $("#loader,.ui-loader-background").show();
            var filePath = $('#files').val();

            var index = filePath.lastIndexOf("\\") + 1;
            var filename = filePath.substr(index);

            readURL(this, filename);

        })
        function readURL(input, imgName) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {


                    $('#fotoDisp').attr('src', e.target.result);

                    //var nameImg = imgName
                    //var arrayBuffer = reader.result
                    //var bytes = new Uint8Array(arrayBuffer);
                    //var obj = { baseString: bytes, imgName: nameImg };
                    var formData = new FormData();
                    var file = document.getElementById("files").files[0];

                    formData.append('file', file, encodeURI(file.name));
                    formData.append('object_id', '1');
                    //console.log(formData);



                    $.ajax({
                        type: "POST",
                        url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
                        data: formData,
                        type: 'POST',
                        contentType: "multipart/form-data",
                        processData: false,
                        //async: false,
                        success: function (result) {

                            //alert("OK. See Console -  press F12");
                            //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                            //var jsondata_1 = jQuery.parseJSON(result)
                            //var jsondata_1 = JSON.stringify(result)
                            // var jsondata_1 = JSON.parse(result)
                            $('#fotoDisp').attr('src', result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/"))
                            $("#loader,.ui-loader-background").hide();

                        },

                        error: function (r) {
                            //alert("Error");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                            var filePath = $('#files').val();
                            var index = filePath.lastIndexOf("\\") + 1;
                            var filename = filePath.substr(index);
                            readURL(input, filename)
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });


                }


            }
        }
        /*
        
       
        
        */
        $("#saveD").click(function () {
            var DispName = $("#DName").val();
            if (DispName.length != 0) {

                var telDisp = $("#telDisp").val();
                if (telDisp.length != 0) {
                    $("#yesTelDisp").hide();
                    $("#TlDIsp").hide()

                    var Objcts = JSON.parse(sessionStorage.getItem("objss"))

                    if (Objcts != null) {
                        if (Objcts.length != 0) {
                            $("#yesObDisp").hide();
                            $("#ObDIsp").hide()
                            var Disps = []
                            $('#dspDiv li').each(function (i) {
                                // $(this).attr('rel'); // This is your rel value
                                Disps.push({ "LOG_IN_ID": $(this).attr("itemid"), "ACCOUNT_NAME": $(this).find('div').text() })
                            });
                            if (Disps != null) {

                                if (Disps.length != 0) {
                                    $("#yesDDisp").hide();
                                    $("#DDIsp").hide()
                                    var Enginers = []// JSON.parse(sessionStorage.getItem("IngArr"))
                                    $('#engDiv-ul li').each(function (i) {
                                        // $(this).attr('rel'); // This is your rel value
                                        Enginers.push({ "LOG_IN_ID": $(this).attr("itemid"), "ACCOUNT_NAME": $(this).find('div').text() })
                                    });
                                    if (Enginers != null) {
                                        if (Enginers.length != 0) {
                                            $("#yesEngDisp").hide();
                                            $("#EngDIsp").hide()

                                            var Tex = []//JSON.parse(sessionStorage.getItem("texArr"))
                                            $('#TexDiv-ul li').each(function (i) {
                                                // $(this).attr('rel'); // This is your rel value
                                                Tex.push({ "LOG_IN_ID": $(this).attr("itemid"), "ACCOUNT_NAME": $(this).find('div').text() })
                                            });
                                            if (Tex != null) {
                                                if (Tex.length != 0) {
                                                    $("#yesTExDisp").hide();
                                                    $("#TExDIsp").hide()
                                                    var icon_ = $("#fotoDisp").attr('src');
                                                    var obj = {
                                                        DD: Dddspid,
                                                        icon: icon_,
                                                        NDisp: DispName,
                                                        PhDisp: telDisp,
                                                        C: Id,
                                                        objs: Objcts,
                                                        DispAcc: Disps,
                                                        EngAcc: Enginers,
                                                        TexAcc: Tex
                                                    };

                                                    $.ajax({
                                                        type: "POST",
                                                        url: "EditDisp.aspx/UpdateDisp",
                                                        data: JSON.stringify(obj),
                                                        contentType: "application/json; charset=utf-8",
                                                        dataType: "json",
                                                        success: function (result) {
                                                            var log_Id = sessionStorage.getItem("Log");
                                                            SaveLog("Обновить", "Простое", "Администратор", "Клиентское администрирование", "Изменены данные диспетчерской " + DispName + "", log_Id);
                                                            window.location.href = "Disp.aspx"
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
                                                else {
                                                    $("#yesTExDisp").show();
                                                    $("#TExDIsp").text("Пожалуйста, выберите Техника").show()
                                                }


                                            }
                                            else {
                                                //yesTExDisp
                                                //TExDIsp
                                                $("#yesTExDisp").show();
                                                $("#TExDIsp").text("Пожалуйста, выберите техника").show()
                                            }
                                        }
                                        else {
                                            $("#yesEngDisp").show();
                                            $("#EngDIsp").text("Пожалуйста, выберите инженера").show()
                                        }

                                    }
                                    else {
                                        //yesEngDisp
                                        //EngDIsp
                                        $("#yesEngDisp").show();
                                        $("#EngDIsp").text("Пожалуйста, выберите инженера").show()
                                    }
                                }
                                else {
                                    $("#yesDDisp").show();
                                    $("#DDIsp").text("Пожалуйста, выберите диспетчера").show()
                                }



                            }
                            else {
                                //yesDDisp
                                //DDIsp
                                $("#yesDDisp").show();
                                $("#DDIsp").text("Пожалуйста, выберите диспетчера").show()
                            }
                        }
                        else {
                            $("#yesObDisp").show();
                            $("#ObDIsp").text("Пожалуйста, выберите Объект диспетчерской").show()
                            $("html, body").animate({ scrollTop: 50 }, "slow");
                        }

                    }
                    else {
                        //yesObDisp
                        //ObDIsp
                        $("#yesObDisp").show();
                        $("#ObDIsp").text("Пожалуйста, выберите Объект диспетчерской ").show()
                        $("html, body").animate({ scrollTop: 50 }, "slow");
                    }

                }
                else {
                    $("#yesTelDisp").show();
                    $("#TlDIsp").text("Пожалуйста, не оставляйте пустым данное поле").show()
                    $("html, body").animate({ scrollTop: 50 }, "slow");
                }

                $("#yesNMDisp").hide();
                $("#NMDIsp").hide()
            }
            else {
                $("#yesNMDisp").show();
                $("#NMDIsp").text("Пожалуйста, не оставляйте пустым данное поле").show()
                $("html, body").animate({ scrollTop: 50 }, "slow");
            }
        })
        $("#backD").click(function () {
            //var Disp = [];
            //var Texs = [];
            //var Engs = [];
            //$('#dspDiv li').each(function (i) {
            //    // $(this).attr('rel'); // This is your rel value
            //    Disp.push({ "LOG_IN_ID": $(this).attr("itemid"), "ACCOUNT_NAME": $(this).find('div').text() })
            //});
            //console.log(Disp);
            //$('#TexDiv-ul li').each(function (i) {
            //    // $(this).attr('rel'); // This is your rel value
            //    Texs.push({ "LOG_IN_ID": $(this).attr("itemid"), "ACCOUNT_NAME": $(this).find('div').text() })
            //});
            //console.log(Texs);

            //$('#engDiv-ul li').each(function (i) {
            //    // $(this).attr('rel'); // This is your rel value
            //    Engs.push({ "LOG_IN_ID": $(this).attr("itemid"), "ACCOUNT_NAME": $(this).find('div').text() })
            //});
            //console.log(Engs);
            window.location.href = "/Client_Admin/Disp.aspx";
        })

    }
    function GetNamePimage(DId) {
        var obj = {
            DD: DId
        };
        //alert(JSON.stringify(obj));

        $.ajax({
            type: "POST",
            url: "EditDisp.aspx/getDispDatas",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //  console.log(result)

                var jsondata_ = JSON.parse(result.d)

                //console.log(jsondata_)
                $("#redDispname").text(jsondata_[0].DISP_NAME)
                $("#DName").val(jsondata_[0].DISP_NAME)
                $("#telDisp").val(jsondata_[0].DISP_PHONE_NUMBER)
                $("#fotoDisp").attr("src", jsondata_[0].DISP_ICON_IMG)


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
    if (loc == "/Client_Admin/InfoUO.aspx") {
        var cmPanem = sessionStorage.getItem("UoName");
        cmPanem = "Раскрытие информации об управляющей организации  \"" + cmPanem + "\""
        $("#CompName").text(cmPanem)
        cmPanem = sessionStorage.getItem("UoName");
        var uoId = sessionStorage.getItem("UOID");
        getDocs(uoId);
        $("#F1").change(function () {
            //$("#loader,.ui-loader-background").show();
            var filePath = $('#F1').val();

            var index = filePath.lastIndexOf("\\") + 1;
            var filename = filePath.substr(index);
            // filename = filename.replace(" ", "_").replace("(", "_").replace(")", "_");
            var ext = this.value.split('.').pop();
            // console.log(ext);
            if (ext == "doc" || ext == "docx" || ext == "xls" || ext == "xlsx" || ext == "pdf" || ext == "PDF") {
                readURL_1(this, filename);
                $("#F1_T").hide();
            }
            else {
                $("#F1_T").text("Неверный  формат файла ").show();
            }

        })
        function readURL_1(input, imgName) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {


                    //$('.foto-disp').attr('src', e.target.result);

                    //var nameImg = imgName
                    //var arrayBuffer = reader.result
                    //var bytes = new Uint8Array(arrayBuffer);
                    //var obj = { baseString: bytes, imgName: nameImg };
                    var formData = new FormData();
                    var file = document.getElementById("F1").files[0];

                    formData.append('file', file, file.name);
                    formData.append('object_id', '1');
                    //console.log(formData);



                    $.ajax({
                        type: "POST",
                        url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
                        data: formData,
                        //cache: false,
                        type: 'POST',
                        //async: false,
                        contentType: "multipart/form-data",
                        processData: false,
                        success: function (result) {

                            //alert("OK. See Console -  press F12");
                            console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                            //var jsondata_1 = jQuery.parseJSON(result)
                            //var jsondata_1 = JSON.stringify(result)
                            // var jsondata_1 = JSON.parse(result)
                            var img_Name = imgName.replace(/\ /g, '_');
                            //dat = imgName.replace(" ", "");

                            //$('.foto-disp').attr('src', result.URL.replace('~', '..'))
                            $(input).after('<a class="delete" onclick=delDoc("' + img_Name + '",this,"' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + '")><i class="fa fa-times-circle" aria-hidden="true"></i></a><br/><a katid=1 href="' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + '">' + img_Name + '</a><br/>')
                            //alert()
                            //   $("#loader,.ui-loader-background").hide();

                        },

                        error: function (r) {

                            //  //alert("Error");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                            var filePath = $('#F1').val();
                            var index = filePath.lastIndexOf("\\") + 1;
                            var filename = filePath.substr(index);
                            readURL_1(input, filename)
                        },
                        complete: function (r) {
                            //var jsonEroorData = JSON.parse(r);

                            //if (r.readyState == 4 && r.status == 200) { //do something }; 
                            //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
                            //    $("#loader,.ui-loader-background").hide();
                            //}
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });


                }


            }
        }
        $("#F2").change(function () {
            //$("#loader,.ui-loader-background").show();
            var filePath = $('#F2').val();

            var index = filePath.lastIndexOf("\\") + 1;
            var filename = filePath.substr(index);
            var ext = this.value.split('.').pop();
            // console.log(ext);
            if (ext == "doc" || ext == "docx" || ext == "xls" || ext == "xlsx" || ext == "pdf" || ext == "PDF") {
                readURL_2(this, filename);
                $("#F2_T").hide();
            }
            else {
                $("#F2_T").text("Неверный  формат файла ").show();
            }

        })
        function readURL_2(input, imgName) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {


                    //$('.foto-disp').attr('src', e.target.result);

                    //var nameImg = imgName
                    //var arrayBuffer = reader.result
                    //var bytes = new Uint8Array(arrayBuffer);
                    //var obj = { baseString: bytes, imgName: nameImg };
                    var formData = new FormData();
                    var file = document.getElementById("F2").files[0];

                    formData.append('file', file, file.name);
                    formData.append('object_id', '1');
                    //console.log(formData);



                    $.ajax({
                        type: "POST",
                        url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
                        data: formData,
                        //cache: false,
                        type: 'POST',
                        //async: false,
                        contentType: "multipart/form-data",
                        processData: false,
                        success: function (result) {

                            //alert("OK. See Console -  press F12");
                            //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                            //var jsondata_1 = jQuery.parseJSON(result)
                            //var jsondata_1 = JSON.stringify(result)
                            // var jsondata_1 = JSON.parse(result)
                            //$('.foto-disp').attr('src', result.URL.replace('~', '..'))
                            var img_Name = imgName.replace(" ", "_");
                            /*'<a href="' + result.URL.replace('~', '..') + '">' + imgName + '</a><a class="delete" ><i class="fa fa-times-circle" aria-hidden="true"></i></a><br/>'*/
                            $(input).after('<a class="delete" onclick=delDoc("' + img_Name + '",this,"' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + '")><i class="fa fa-times-circle" aria-hidden="true"></i></a><br/><a katid=2 href="' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + '">' + img_Name + '</a><br/>')
                            //   $("#loader,.ui-loader-background").hide();

                        },

                        error: function (r) {

                            //  //alert("Error");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                            var filePath = $('#F2').val();
                            var index = filePath.lastIndexOf("\\") + 1;
                            var filename = filePath.substr(index);
                            readURL_2(input, filename)
                        },
                        complete: function (r) {
                            //var jsonEroorData = JSON.parse(r);

                            //if (r.readyState == 4 && r.status == 200) { //do something }; 
                            //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
                            //    $("#loader,.ui-loader-background").hide();
                            //}
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });


                }


            }
        }

        $("#F3").change(function () {
            //$("#loader,.ui-loader-background").show();
            var filePath = $('#F3').val();

            var index = filePath.lastIndexOf("\\") + 1;
            var filename = filePath.substr(index);
            var ext = this.value.split('.').pop();
            // console.log(ext);
            if (ext == "doc" || ext == "docx" || ext == "xls" || ext == "xlsx" || ext == "pdf" || ext == "PDF") {
                readURL_3(this, filename);
                $("#F3_T").hide();
            }
            else {
                $("#F3_T").text("Неверный  формат файла ").show();
            }

        })
        function readURL_3(input, imgName) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {


                    //$('.foto-disp').attr('src', e.target.result);

                    //var nameImg = imgName
                    //var arrayBuffer = reader.result
                    //var bytes = new Uint8Array(arrayBuffer);
                    //var obj = { baseString: bytes, imgName: nameImg };
                    var formData = new FormData();
                    var file = document.getElementById("F3").files[0];

                    formData.append('file', file, file.name);
                    formData.append('object_id', '1');
                    //console.log(formData);



                    $.ajax({
                        type: "POST",
                        url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
                        data: formData,
                        //cache: false,
                        type: 'POST',
                        //async: false,
                        contentType: "multipart/form-data",
                        processData: false,
                        success: function (result) {

                            //alert("OK. See Console -  press F12");
                            //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                            //var jsondata_1 = jQuery.parseJSON(result)
                            //var jsondata_1 = JSON.stringify(result)
                            // var jsondata_1 = JSON.parse(result)
                            //$('.foto-disp').attr('src', result.URL.replace('~', '..'))
                            var img_Name = imgName.replace(" ", "_");
                            $(input).after('<a class="delete" onclick=delDoc("' + img_Name + '",this,"' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + '")><i class="fa fa-times-circle" aria-hidden="true"></i></a><br/><a katid=3 href="' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + '">' + img_Name + '</a><br/>')
                            //   $("#loader,.ui-loader-background").hide();

                        },

                        error: function (r) {

                            //  //alert("Error");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                            var filePath = $('#F3').val();
                            var index = filePath.lastIndexOf("\\") + 1;
                            var filename = filePath.substr(index);
                            readURL_3(input, filename)
                        },
                        complete: function (r) {
                            //var jsonEroorData = JSON.parse(r);

                            //if (r.readyState == 4 && r.status == 200) { //do something }; 
                            //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
                            //    $("#loader,.ui-loader-background").hide();
                            //}
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });


                }


            }
        }
        $("#F4").change(function () {
            //$("#loader,.ui-loader-background").show();
            var filePath = $('#F4').val();

            var index = filePath.lastIndexOf("\\") + 1;
            var filename = filePath.substr(index);
            var ext = this.value.split('.').pop();
            // console.log(ext);
            if (ext == "doc" || ext == "docx" || ext == "xls" || ext == "xlsx" || ext == "pdf" || ext == "PDF") {
                readURL_4(this, filename);
                $("#F4_T").hide();
            }
            else {
                $("#F4_T").text("Неверный  формат файла ").show();
            }

        })
        function readURL_4(input, imgName) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {


                    //$('.foto-disp').attr('src', e.target.result);

                    //var nameImg = imgName
                    //var arrayBuffer = reader.result
                    //var bytes = new Uint8Array(arrayBuffer);
                    //var obj = { baseString: bytes, imgName: nameImg };
                    var formData = new FormData();
                    var file = document.getElementById("F4").files[0];

                    formData.append('file', file, file.name);
                    formData.append('object_id', '1');
                    //console.log(formData);



                    $.ajax({
                        type: "POST",
                        url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
                        data: formData,
                        //cache: false,
                        type: 'POST',
                        //async: false,
                        contentType: "multipart/form-data",
                        processData: false,
                        success: function (result) {

                            //alert("OK. See Console -  press F12");
                            //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                            //var jsondata_1 = jQuery.parseJSON(result)
                            //var jsondata_1 = JSON.stringify(result)
                            // var jsondata_1 = JSON.parse(result)
                            var img_Name = imgName.replace(" ", "_");
                            //$('.foto-disp').attr('src', result.URL.replace('~', '..'))
                            $(input).after('<a class="delete" onclick=delDoc("' + img_Name + '",this,"' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + '")><i class="fa fa-times-circle" aria-hidden="true"></i></a><br/><a katid=4 href="' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + '">' + img_Name + '</a><br/>')
                            //   $("#loader,.ui-loader-background").hide();

                        },

                        error: function (r) {

                            //  //alert("Error");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                            var filePath = $('#F4').val();
                            var index = filePath.lastIndexOf("\\") + 1;
                            var filename = filePath.substr(index);
                            readURL_4(input, filename)
                        },
                        complete: function (r) {
                            //var jsonEroorData = JSON.parse(r);

                            //if (r.readyState == 4 && r.status == 200) { //do something }; 
                            //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
                            //    $("#loader,.ui-loader-background").hide();
                            //}
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });


                }


            }
        }
        $("#F5").change(function () {
            //$("#loader,.ui-loader-background").show();
            var filePath = $('#F5').val();

            var index = filePath.lastIndexOf("\\") + 1;
            var filename = filePath.substr(index);
            var ext = this.value.split('.').pop();
            // console.log(ext);
            if (ext == "doc" || ext == "docx" || ext == "xls" || ext == "xlsx" || ext == "pdf" || ext == "PDF") {
                readURL_5(this, filename);
                $("#F5_T").hide();
            }
            else {
                $("#F5_T").text("Неверный  формат файла ").show();
            }

        })
        function readURL_5(input, imgName) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {


                    //$('.foto-disp').attr('src', e.target.result);

                    //var nameImg = imgName
                    //var arrayBuffer = reader.result
                    //var bytes = new Uint8Array(arrayBuffer);
                    //var obj = { baseString: bytes, imgName: nameImg };
                    var formData = new FormData();
                    var file = document.getElementById("F5").files[0];

                    formData.append('file', file, file.name);
                    formData.append('object_id', '1');
                    //console.log(formData);



                    $.ajax({
                        type: "POST",
                        url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
                        data: formData,
                        //cache: false,
                        type: 'POST',
                        //async: false,
                        contentType: "multipart/form-data",
                        processData: false,
                        success: function (result) {

                            //alert("OK. See Console -  press F12");
                            //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                            //var jsondata_1 = jQuery.parseJSON(result)
                            //var jsondata_1 = JSON.stringify(result)
                            // var jsondata_1 = JSON.parse(result)
                            var img_Name = imgName.replace(" ", "_");
                            //$('.foto-disp').attr('src', result.URL.replace('~', '..'))
                            $(input).after('<a class="delete" onclick=delDoc("' + img_Name + '",this,"' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + '")><i class="fa fa-times-circle" aria-hidden="true"></i></a><br/><a katid=5 href="' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + '">' + img_Name + '</a><br/>')
                            //   $("#loader,.ui-loader-background").hide();

                        },

                        error: function (r) {

                            //  //alert("Error");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                            var filePath = $('#F5').val();
                            var index = filePath.lastIndexOf("\\") + 1;
                            var filename = filePath.substr(index);
                            readURL_5(input, filename)
                        },
                        complete: function (r) {
                            //var jsonEroorData = JSON.parse(r);

                            //if (r.readyState == 4 && r.status == 200) { //do something }; 
                            //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
                            //    $("#loader,.ui-loader-background").hide();
                            //}
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });


                }


            }
        }
        $("#F6").change(function () {
            //$("#loader,.ui-loader-background").show();
            var filePath = $('#F6').val();

            var index = filePath.lastIndexOf("\\") + 1;
            var filename = filePath.substr(index);
            var ext = this.value.split('.').pop();
            // console.log(ext);
            if (ext == "doc" || ext == "docx" || ext == "xls" || ext == "xlsx" || ext == "pdf" || ext == "PDF") {
                readURL_6(this, filename);
                $("#F6_T").hide();
            }
            else {
                $("#F6_T").text("Неверный  формат файла ").show();
            }

        })
        function readURL_6(input, imgName) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {


                    //$('.foto-disp').attr('src', e.target.result);

                    //var nameImg = imgName
                    //var arrayBuffer = reader.result
                    //var bytes = new Uint8Array(arrayBuffer);
                    //var obj = { baseString: bytes, imgName: nameImg };
                    var formData = new FormData();
                    var file = document.getElementById("F6").files[0];

                    formData.append('file', file, file.name);
                    formData.append('object_id', '1');
                    //console.log(formData);



                    $.ajax({
                        type: "POST",
                        url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",
                        data: formData,
                        //cache: false,
                        type: 'POST',
                        //async: false,
                        contentType: "multipart/form-data",
                        processData: false,
                        success: function (result) {

                            //alert("OK. See Console -  press F12");
                            //console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
                            //var jsondata_1 = jQuery.parseJSON(result)
                            //var jsondata_1 = JSON.stringify(result)
                            // var jsondata_1 = JSON.parse(result)
                            var img_Name = imgName.replace(" ", "_");
                            //$('.foto-disp').attr('src', result.URL.replace('~', '..'))
                            $(input).after('<a class="delete" onclick=delDoc("' + img_Name + '",this,"' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + '")><i class="fa fa-times-circle" aria-hidden="true"></i></a><br/><a katid=6 href="' + result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/") + '">' + img_Name + '</a><br/>')
                            //   $("#loader,.ui-loader-background").hide();

                        },

                        error: function (r) {

                            //  //alert("Error");
                            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                            var filePath = $('#F6').val();
                            var index = filePath.lastIndexOf("\\") + 1;
                            var filename = filePath.substr(index);
                            readURL_6(input, filename)
                        },
                        complete: function (r) {
                            //var jsonEroorData = JSON.parse(r);

                            //if (r.readyState == 4 && r.status == 200) { //do something }; 
                            //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
                            //    $("#loader,.ui-loader-background").hide();
                            //}
                        },
                        failure: function (r) {
                            alert("FAIL");
                        }
                    });


                }


            }
        }
        $("#back_Uo").click(function () {
            window.location.href = "/Client_Admin/CreateOrg.aspx"
        })
        $("#savInfo").click(function () {

            var DocS = []
            var CountTr = $(".formTable tr").length
            for (var i = 0; i <= 5; i++) {
                //var URL = $(".formTable").find("td:eq(1)").find("a[katid=1]").attr("href");
                //var docnm = $(".formTable").find("td:eq(1)").find("a[katid=1]").text();
                var Katid = i + 1;
                //info
                var KatCount = $(".formTable").find("tbody tr:eq(" + i + ")").find("td:eq(1)").find("a[katid=" + Katid + "]").length;
                for (var j = 0; j < KatCount; j++) {
                    var Url = $(".formTable").find("tbody tr:eq(" + i + ")").find("td:eq(1)").find("a[katid=" + Katid + "]:eq(" + j + ")").attr("href");
                    var DocName = $(".formTable").find("tbody tr:eq(" + i + ")").find("td:eq(1)").find("a[katid=" + Katid + "]:eq(" + j + ")").text();
                    DocS.push({ "KAT_ID": Katid, "D_URL": Url, "D_NAME": DocName });
                    Url = "";
                    DocName = "";
                }
            }
            // console.log(DocS[0].D_NAME);
            if (DocS.length == 0) {
                // alert("Пожалуйста, выберите документ!!!")
                DocS.push({ "KAT_ID": 0, "D_URL": 0, "D_NAME": 0 });
            }


            var ob_j7 = { McId: uoId, dc: DocS }
            $.ajax({
                type: "POST",
                url: "InfoUO.aspx/AddInfo",
                data: JSON.stringify(ob_j7),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var log_Id = sessionStorage.getItem("Log")
                    // for (var i = 0; i < DocS.length; i++) {
                    SaveLog("Сохранить", "Простое", "Администратор", "Клиентское администрирование", "Изменены параметры раскрытия информации компании " + cmPanem + "", log_Id);
                    // }
                    //В раздел "Раскрытие информации" добавлен новый документ: Название документа: ФИО пользователя, совершившего действие


                    window.location.href = "/Client_Admin/CreateOrg.aspx";
                }
            })

            //  console.log(JSON.stringify(DocS));

        })
    }
    if (loc == '/Client_Admin/CreateSupplier.aspx') {
        var SupGuid = sessionStorage.getItem("SupGuid")

        $('#FEE').keyup(function () {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value < 0 || this.value > 100) {
                this.value = ''
            }
        })


        if (SupGuid == '') {
            $('#SaveMO').click(function () {
                // GenerateJson($('#Comp_Info'))
                var Supp_success = true
                var INN = $('#INN').val();
                var KPP = $('#KPP').val();

                var OKVED = $('#OKVED').val();
                var OGRN_OGRNIP = $('#OGRN').val();
                var REGIST_ORGAN = $('#REGIST_ORGAN').val()
                var REGIST_DATE = $('#REGIST_DATE').val()
                REGIST_DATE = REGIST_DATE.split('-').reverse().join('.')

                var INFO_FOUNDERS;
                var fndrs = []
                $('.INFO_FOUNDERS').each(function () {
                    var NAME = $('#fio_founders').val();
                    var BIRTH_DATE = $('#b_date_founders').val();
                    var Citizen = $('#citi_founders').val();
                    var BIRTH_PLACE = $('#regist_founders').val();
                    var stay_founders = $('#stay_founders').val();
                    var SERIES_DOCUMENT = $('#passport_series_founders').val();
                    var NUMBERS_DOCUMENT = $('#passport_number_founders').val();
                    var DATE_ISSUE = $('#passport_date_founders').val();
                    var issued_by_passport_founder = $('#issued_by_passport_founder').val();
                    fndrs.push({ NAME: NAME, BIRTH_DATE: BIRTH_DATE, Citizen: Citizen, BIRTH_PLACE: BIRTH_PLACE, stay_founders: stay_founders, SERIES_DOCUMENT: SERIES_DOCUMENT, NUMBERS_DOCUMENT: NUMBERS_DOCUMENT, DATE_ISSUE: DATE_ISSUE, issued_by_passport_founder: issued_by_passport_founder })
                })
                INFO_FOUNDERS = JSON.stringify(fndrs);
                var FULL_NAME = $('#FULL_NAME').val();
                if (FULL_NAME.length == 0) {
                    Supp_success = false
                    $('#FULL_NAME_Err').remove();
                    $('#FULL_NAME').after('<label id="FULL_NAME_Err" style="color:red">Необходимо заполнить поле "Полное юридическое наименование предприятия"</label>')
                    $("html, body").animate({ scrollTop: $("#FULL_NAME").position() }, "slow");
                    window.setTimeout(function () {

                        $('#FULL_NAME_Err').hide();

                    }, 3500);
                }
                var NAME = $('#NAME').val();
                if (NAME.length == 0) {
                    Supp_success = false
                    $('#NAME_Err').remove();
                    $('#NAME').after('<label id="NAME_Err" style="color:red">Необходимо заполнить поле "Сокращенное наименование"</label>')
                    $("html, body").animate({ scrollTop: $("#NAME").position() }, "slow");
                    window.setTimeout(function () {

                        $('#NAME_Err').hide();
                        $
                    }, 3500);
                }
                var BIRTH_DATE = $('#BIRTH_DATE').val();
                var FIO = $('#FIO').val()

                var BIRTH_PLACE = $('#BIRTH_PLACE').val();
                var TYPE_DOCUMENT = $('#TYPE_DOCUMENT').val()
                var SERIES_DOCUMENT = $('#SERIES_DOCUMENT').val()
                var NUMBERS_DOCUMENT = $('#NUMBERS_DOCUMENT').val();
                var DATE_ISSUE = $('#DATE_ISSUE').val();
                var CONTACT_PHONE = $('#CONTACT_PHONE').val()
                var DIVISION_CODE = $('#DIVISION_CODE').val()
                var CLIENT_ID = Id
                var CHECKING_ACCOUNT = $('#CHECKING_ACCOUNT').val();
                var CORRESP_ACCOUNT = $('#CORRESP_ACCOUNT').val();
                var BANK_NAME = $('#BANK_NAME').val();
                var BIK = $('#BIK').val();
                var FEE = $('#FEE').val()

                var PAYMENT = $('#PAYMENT').val();
                //   var LICENCE = $('#LICENCE')
                var LEGAL_ADRESS = $('#LEGAL_ADRESS').children('#add_r').val();
                var ADRESS = $('#ADRESS').children('#adr').val()
                var PHONE_FAKS = $('#PHONE_FAKS').val();
                var EMAIL = $('#email_supp').val();
                var PASSWORD = $('#pass_supp').val();
                if (PASSWORD.length == 0) {
                    Supp_success = false
                    $('#PASSWORD_Err').remove();
                    $('#PASSWORD').after('<label id="PASSWORD_Err" style="color:red">Необходимо заполнить поле "Сокращенное наименование"</label>')
                    $("html, body").animate({ scrollTop: $("#PASSWORD").position() }, "slow");
                    window.setTimeout(function () {

                        $('#PASSWORD_Err').hide();
                        $
                    }, 3500);
                }
                var SHOP_ID = $('#SHOP_ID').val();
                var VK = $('#VK').val()
                var OK = $('#OK').val()
                var FB = $('#FB').val()
                var TW = $('#TW').val()
                var ICON = $('#ICON').attr('src');
                ICON = (ICON == undefined) ? '' : ICON
                if (Supp_success == true) {
                    var ob =
                    {
                        INN: INN,
                        KPP: KPP,
                        OKVED: OKVED,
                        OGRN_OGRNIP: OGRN_OGRNIP,
                        REGIST_ORGAN: REGIST_ORGAN,
                        REGIST_DATE: REGIST_DATE,
                        FULL_NAME: FULL_NAME,
                        NAME: NAME,
                        INFO_FOUNDERS: INFO_FOUNDERS,
                        BIRTH_DATE: BIRTH_DATE,
                        BIRTH_PLACE: BIRTH_PLACE,
                        TYPE_DOCUMENT: TYPE_DOCUMENT,
                        SERIES_DOCUMENT: SERIES_DOCUMENT,
                        NUMBERS_DOCUMENT: NUMBERS_DOCUMENT,
                        DATE_ISSUE: DATE_ISSUE,
                        CONTACT_PHONE: CONTACT_PHONE,
                        DIVISION_CODE: DIVISION_CODE,
                        CLIENT_ID: CLIENT_ID,
                        CHECKING_ACCOUNT: CHECKING_ACCOUNT,
                        CORRESP_ACCOUNT: CORRESP_ACCOUNT,
                        BANK_NAME: BANK_NAME,
                        BIK: BIK,
                        FIO: FIO,
                        PAYMENT: PAYMENT,
                        LEGAL_ADRESS: LEGAL_ADRESS,
                        ADRESS: ADRESS,
                        PHONE_FAKS: PHONE_FAKS,
                        VK: VK,
                        OK: OK,
                        FB: FB,
                        TW: TW,
                        SHOP_ID: SHOP_ID,
                        ICON: ICON,
                        FEE: FEE,
                        PASSWORD: PASSWORD,
                        EMAIL: EMAIL
                    }
                    //console.log(ob)
                    SaveSupplier(ob)
                }

            })
        }
        else {
            GetSupplierDetail(SupGuid)
            $('#SaveMO').click(function () {
                // GenerateJson($('#Comp_Info'))
                var Supp_success = true
                var INN = $('#INN').val();
                var KPP = $('#KPP').val();

                var OKVED = $('#OKVED').val();
                var OGRN_OGRNIP = $('#OGRN').val();
                var REGIST_ORGAN = $('#REGIST_ORGAN').val()
                var REGIST_DATE = $('#REGIST_DATE').val()
                REGIST_DATE = REGIST_DATE.split('-').reverse().join('.')

                var INFO_FOUNDERS;
                var fndrs = []
                $('.INFO_FOUNDERS').each(function () {
                    var NAME = $(this).children('#fio_founders').val();
                    var BIRTH_DATE = $(this).children('#b_date_founders').val();
                    var Citizen = $(this).children('#citi_founders').val();
                    var BIRTH_PLACE = $(this).children('#regist_founders').val();
                    var stay_founders = $(this).children('#stay_founders').val();
                    var SERIES_DOCUMENT = $(this).children('#passport_datas_founders').children('#passport_series_founders').val();
                    var NUMBERS_DOCUMENT = $(this).children('#passport_datas_founders').children('#passport_number_founders').val();
                    var DATE_ISSUE = $(this).children('#passport_datas_founders').children('#passport_date_founders').val();
                    var issued_by_passport_founder = $(this).children('#passport_datas_founders').children('#issued_by_passport_founder').val();
                    fndrs.push({ NAME: NAME, BIRTH_DATE: BIRTH_DATE, Citizen: Citizen, BIRTH_PLACE: BIRTH_PLACE, stay_founders: stay_founders, SERIES_DOCUMENT: SERIES_DOCUMENT, NUMBERS_DOCUMENT: NUMBERS_DOCUMENT, DATE_ISSUE: DATE_ISSUE, issued_by_passport_founder: issued_by_passport_founder })
                })
                INFO_FOUNDERS = JSON.stringify(fndrs);
                var FULL_NAME = $('#FULL_NAME').val();
                if (FULL_NAME.length == 0) {
                    Supp_success = false
                    $('#FULL_NAME_Err').remove();
                    $('#FULL_NAME').after('<label id="FULL_NAME_Err" style="color:red">Необходимо заполнить поле "Полное юридическое наименование предприятия"</label>')
                    $("html, body").animate({ scrollTop: $("#FULL_NAME").position() }, "slow");
                    window.setTimeout(function () {

                        $('#FULL_NAME_Err').hide();

                    }, 3500);
                }
                var NAME = $('#NAME').val();
                if (NAME.length == 0) {
                    Supp_success = false
                    $('#NAME_Err').remove();
                    $('#NAME').after('<label id="NAME_Err" style="color:red">Необходимо заполнить поле "Сокращенное наименование"</label>')
                    $("html, body").animate({ scrollTop: $("#NAME").position() }, "slow");
                    window.setTimeout(function () {

                        $('#NAME_Err').hide();
                        $
                    }, 3500);
                }
                var BIRTH_DATE = $('#BIRTH_DATE').val();
                var FIO = $('#FIO').val()

                var BIRTH_PLACE = $('#BIRTH_PLACE').val();
                var TYPE_DOCUMENT = $('#TYPE_DOCUMENT').val()
                var SERIES_DOCUMENT = $('#SERIES_DOCUMENT').val()
                var NUMBERS_DOCUMENT = $('#NUMBERS_DOCUMENT').val();
                var DATE_ISSUE = $('#DATE_ISSUE').val();
                var CONTACT_PHONE = $('#CONTACT_PHONE').val()
                var DIVISION_CODE = $('#DIVISION_CODE').val()
                var CLIENT_ID = Id
                var CHECKING_ACCOUNT = $('#CHECKING_ACCOUNT').val();
                var CORRESP_ACCOUNT = $('#CORRESP_ACCOUNT').val();
                var BANK_NAME = $('#BANK_NAME').val();
                var BIK = $('#BIK').val();
                var FEE = $('#FEE').val()

                var PAYMENT = $('#PAYMENT').val();
                //   var LICENCE = $('#LICENCE')
                var LEGAL_ADRESS = $('#LEGAL_ADRESS').children('#add_r').val();
                var ADRESS = $('#ADRESS').children('#adr').val()
                var PHONE_FAKS = $('#PHONE_FAKS').val();
                var EMAIL = $('#email_supp').val();
                var PASSWORD = $('#pass_supp').val();
                if (PASSWORD.length == 0) {
                    Supp_success = false
                    $('#PASSWORD_Err').remove();
                    $('#PASSWORD').after('<label id="PASSWORD_Err" style="color:red">Необходимо заполнить поле "Сокращенное наименование"</label>')
                    $("html, body").animate({ scrollTop: $("#PASSWORD").position() }, "slow");
                    window.setTimeout(function () {

                        $('#PASSWORD_Err').hide();
                        $
                    }, 3500);
                }
                var SHOP_ID = $('#SHOP_ID').val();
                var VK = $('#VK').val()
                var OK = $('#OK').val()
                var FB = $('#FB').val()
                var TW = $('#TW').val()
                var ICON = $('#ICON').attr('src');
                ICON = (ICON == undefined) ? '' : ICON
                if (Supp_success == true) {
                    var ob =
                    {
                        guid: SupGuid,
                        INN: INN,
                        KPP: KPP,
                        OKVED: OKVED,
                        OGRN_OGRNIP: OGRN_OGRNIP,
                        REGIST_ORGAN: REGIST_ORGAN,
                        REGIST_DATE: REGIST_DATE,
                        FULL_NAME: FULL_NAME,
                        NAME: NAME,
                        INFO_FOUNDERS: INFO_FOUNDERS,
                        BIRTH_DATE: BIRTH_DATE,
                        BIRTH_PLACE: BIRTH_PLACE,
                        TYPE_DOCUMENT: TYPE_DOCUMENT,
                        SERIES_DOCUMENT: SERIES_DOCUMENT,
                        NUMBERS_DOCUMENT: NUMBERS_DOCUMENT,
                        DATE_ISSUE: DATE_ISSUE,
                        CONTACT_PHONE: CONTACT_PHONE,
                        DIVISION_CODE: DIVISION_CODE,
                        CLIENT_ID: CLIENT_ID,
                        CHECKING_ACCOUNT: CHECKING_ACCOUNT,
                        CORRESP_ACCOUNT: CORRESP_ACCOUNT,
                        BANK_NAME: BANK_NAME,
                        BIK: BIK,
                        FIO: FIO,
                        PAYMENT: PAYMENT,
                        LEGAL_ADRESS: LEGAL_ADRESS,
                        ADRESS: ADRESS,
                        PHONE_FAKS: PHONE_FAKS,
                        VK: VK,
                        OK: OK,
                        FB: FB,
                        TW: TW,
                        SHOP_ID: SHOP_ID,
                        ICON: ICON,
                        FEE: FEE,
                        PASSWORD: PASSWORD,
                        EMAIL: EMAIL
                    }
                    //console.log(ob)
                    UpdateSupplier(ob)
                }

            })
        }

        $("#BIK").keyup(function () {
            var bik_ = $(this).val();
            if (bik_.length == 9) {
                var obj = { BIK: bik_ };
                $.ajax({
                    type: "POST",
                    url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/GetBankByBIK",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //async: false,
                    success: function (result) {
                        //console.log(JSON.stringify(result))
                        // console.log(result);
                        var jsondata = JSON.stringify(result.ResultData)
                        var jsondata_ = JSON.parse(jsondata)
                        $("#BANK_NAME").val(jsondata_.BNAME)
                        $("#CORRESP_ACCOUNT").val(jsondata_.BKRS)
                        if ($("#BANK_NAME").val().length == 0 && $("#CORRESP_ACCOUNT").val().length == 0) {
                            $("#bikS").text("Проверьте правильность введённого БИК").show()
                        }
                        else {
                            $("#bikS").hide();
                            $("#BNAMES").hide();
                            $("#BKRSS").hide();
                        }

                    }
                })
            }
        })

        $('#PHONE_FAKS').keyup(function () {
            $(this).inputmask("(999) 999-99-99");
        })

        $('#backUo').click(function () {
            window.location.href = "SuppliersRegister.aspx"
        })
        var now = new Date(),
            // minimum date the user can choose, in this case now and in the future
            minDate = now.toISOString().substring(0, 10);
        $('#REGIST_DATEб,#b_date_founders,#passport_date_founders,#BIRTH_DATE,#DATE_ISSUE').prop('max', minDate);
        $("#filesN").change(function () {





            var filePath = $('#filesN').val();

            if (filePath.length != 0) {
                $("#loader,.ui-loader-background").show();
                $('.ui-loader-background').show();
                var index = filePath.lastIndexOf("\\") + 1;
                var filename = filePath.substr(index);
                var ext = this.value.split('.').pop();
                ext = ext.toLowerCase()
                if (ext == "png" || ext == "jpg") {
                    $('.ui-loader-background').show();
                    $("#loader,.ui-loader-background").show();
                    $('#errEx,#files_E').remove();

                    readURLNews(this, filename);
                }
                else {
                    $('.ui-loader-background').hide();
                    $("#loader,.ui-loader-background").hide();
                    $('#filesN').val('');
                    $("#filesN").after('<label id="files_E" style="color:red">(png*, jpg*)</label>').show();
                }

            }


        })
    }
    if (loc == '/Client_Admin/SuppliersRegister.aspx') {
        GetSuppliers(Id)
        sessionStorage.setItem("SupGuid", '')
    }

});
function DELETE_UO(UoId, SaveLog, alertMessage) {
    var obj = {
        MAN_COMPANY_ID: UoId,
    };
    //alert(JSON.stringify(obj))
    $("#loader,.ui-loader-background").show();
    $.ajax({
        type: "POST",
        url: "CreateOrg.aspx/DelUO",//window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/AddEditDelUO",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //async: false,
        success: function(result) {
            // alert("OK. See Console -  press F12");
            // alertMessage("Операция прошла успешно", "Добавление Управляюшего Организаций Успешно", ":)")
            var log_Id = sessionStorage.getItem("Log");
            SaveLog("Удаление управляюшего организаций", "Простое", "Администратор", "Клиентское администрирование", "Удалена управляющая организация (" + $("#NAME").val() + ")", log_Id);
            window.location.href = "RegisterUO.aspx";
            console.log(JSON.stringify(result));
            $("#resulter").text(JSON.stringify(result));
        },
        error: function(r) {
            ////alert("Error");
       //     alertMessage("Oшибка", "Не удалось выполнить операцию", ":(");
           // console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
            $("#loader,.ui-loader-background").hide();
        },
        failure: function(r) {
            // alert("FAIL");
            alertMessage("Oшибка", "Не удалось выполнить операцию", "Fail");
            $("#loader,.ui-loader-background").hide();
        }
    });
}

function getDetailUO(UoId) {
    var obj = {
        id: UoId
    };

    $.ajax({
        type: "POST",
        url: "CreateOrg.aspx/GetUoById",//"../WCFServices/Constructor_API.svc/GetUO",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //async:false,
        //cache: false,
        success: function (result) {

             
            // var jsondata_1 = JSON.stringify(result.ResultData)
            var jsondata_2 = JSON.parse(result.d)
            console.log(jsondata_2)
            $("#ObUo").attr("itemid", UoId)
            $("#INN").val(jsondata_2[0].INN);
            $("#OGRN").val(jsondata_2[0].OGRN);
            $("#NAME").val(jsondata_2[0].NAME);
            $('#orgName').text(jsondata_2[0].NAME)
            $("#SozUp").text(jsondata_2[0].NAME)
            $("#KPP").val(jsondata_2[0].KPP);
            $("#OKPO").val(jsondata_2[0].OKPO);
            $('#Shopid').val(jsondata_2[0].SHOP_ID)

            
            $("#adr").val(jsondata_2[0].ADRESS);
            var dom_ = $("#adr").val().substring($("#adr").val().lastIndexOf("Д. ") + 1, $("#adr").val().lastIndexOf(",")).replace('.', '').replace(' ', '');
            var numbers = /[0-9]/g
            var korp_ = (jsondata_2[0].ADRESS.lastIndexOf("K. ") > 0) ? jsondata_2[0].ADRESS.substring(jsondata_2[0].ADRESS.lastIndexOf("K. ") + 3) : ""// jsondata_2[0].ADRESS.substr(jsondata_2[0].ADRESS.length - 2)
            if (!korp_.match(numbers)) {
                korp_ = "";
            }
            $("#DOM").val(dom_);
            dom_ = "Д. " + dom_;
            var adres = jsondata_2[0].ADRESS.substring(0, jsondata_2[0].ADRESS.indexOf(dom_))
            adres = adres.substring(0, adres.lastIndexOf(","))
            $("#adr").val(adres);
            //var korp_ = $("#adr").val().substring($("#adr").val().lastIndexOf(".") + 1, $("#adr").val().lastIndexOf("")).replace('.', '').replace(' ', '');
            //$("#adr").val(jsondata_2[0].ADRESS.substring(0, jsondata_2[0].ADRESS.indexOf('Д')).replace(',', ''));

            $("#KORP").val(korp_);

            $("#bik").val(jsondata_2[0].BANK_BIK);
            $("#BNAME").val(jsondata_2[0].BANK_NAME);
            $("#BKRS").val(jsondata_2[0].BANK_KRS);
            $("#RS").val(jsondata_2[0].RS);
            $("#tlf").val(jsondata_2[0].PHONE);
            $("#mail").val(jsondata_2[0].EMAIL);
            $("#vk").val(jsondata_2[0].VK);
            $("#ok").val(jsondata_2[0].OK);
            $("#fb").val(jsondata_2[0].FB);
            $("#tw").val(jsondata_2[0].TW);


        },
        error: function (r) {
            ////alert("Error");
            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            alert("FAIL");
        }
    });

}
function DetailUo(Uo) {
    sessionStorage.setItem("UOID", Uo);
    window.location.href = "CreateOrg.aspx";
    // alert(sessionStorage.getItem("UOID"))
}

function createNew_ManagerCompany(ClId, obj_, MAN_COMPANY_ID) {
    var obj = {
        MAN_COMPANY_ID: MAN_COMPANY_ID,
        INN: obj_.Inn_,
        KPP: obj_.KPP_,
        OKPO: obj_.OKPO_,
        OGRN_OGRNIP: obj_.OGRN_,
        NAME: obj_.Name_,
        LICENCE: "No Lic",
        ADRESS_ID: obj_.adrCode_,
        ADRESS: obj_.adrtext_,
        PHONE: obj_.tlf_,
        EMAIL: obj_.mail_,
        VK: obj_.vk_,
        OK: obj_.ok_,
        FB: obj_.fb_,
        TW: obj_.tw_,
        CLIENT_ID: ClId,
        BIK: obj_.BIK_,
        BNAME: obj_.BNAME_,
        BKRS: obj_.BKRS_,
        RS: obj_.RS_,
        action: (MAN_COMPANY_ID==null)?"0":"1",
        shopid: obj_.Shopid//$('#Shopid').val() // 0-insert, 1-update, 2-delete
    };
    var url = MAN_COMPANY_ID == null ? "CreateOrg.aspx/CRUD_UO" : "CreateOrg.aspx/UpdataUo"
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //async: false,
        success: function(result) {

            if (MAN_COMPANY_ID==null) {
     var cmsf_uo = sessionStorage.getItem("cmsf_uo");
                var log_Id = sessionStorage.getItem("Log");
                SaveLog("Создан", "Простое", "Администратор", "Клиентское администрирование", "В системе создана управляющая организация  (" + Name_ + ")", log_Id);
                window.location.href = (cmsf_uo.length != 0) ? cmsf_uo : 'RegisterUO.aspx';

            }
            else {
                var log_Id = sessionStorage.getItem("Log")
                SaveLog("Сохранить изменения", "Простое", "Администратор", "Клиентское администрирование", "Сохранены изменения в карточке управляющей организации (" + Name_ + ")", log_Id);
                window.location.href = "RegisterUO.aspx"
            }
        },
        error: function(r) {
            $("#loader,.ui-loader-background").hide();
        },
        failure: function(r) {
            // alert("FAIL");
            alertMessage("Oшибка", "Не удалось выполнить операцию", "Fail");
            $("#loader,.ui-loader-background").hide();
        }
    });
}

function checkControls_ManagerComp()
{
    var isSuccess=true
    $('[required="required"]').each(function ()
    {
        var value = $(this).val();
        if (isSuccess == true) {
            var maxlenght = $(this).attr('maxlength')
            var id = $(this).attr('Id')
            var Original_text = $('label[for="' + id + '"]').text();
            if (value.length != maxlenght && maxlenght != undefined) {
              
                $('.counter').remove()
                $('label[for="' + id + '"]').show()
                Original_text =  Original_text + "(Осталось " + (maxlenght - $(this).val().length) + " символов)"
                ErrorForControls($(this), Original_text)
                isSuccess=false
            }
            if (maxlenght == undefined) {
                if (value.length == 0) {
                    $('.counter').remove()
                    Original_text = 'Необходимо заполнить поле "' + Original_text + '"'
                    ErrorForControls($(this), Original_text)
                    isSuccess = false
                }
            }
            
        }
        else {
            return false;
        }

    })
    
    var Inn_ = ($("#INN").val() != null) ? $("#INN").val() : "";
    var OGRN_ = $("#OGRN").val();
    var Name_ = $("#NAME").val();
    var KPP_ = $("#KPP").val();
    var OKPO_ = $("#OKPO").val();
    var adr_ = ($("#adr").val() != null) ? $("#adr").val() : null;

    var adrCode_;
    adrCode_ = ($("#manu").is(":checked")) ? "" : adrCode_
    adrCode_ = (adrCode_ == undefined) ? "" : adrCode_
    var adrtext_;
    var DOM_ = $("#DOM").val();
    var KORP_ = ($("#KORP").val().length != 0) ? "K. " + $("#KORP").val() : "";
    adrtext_ = adr_ + ", Д. " + DOM_ + ", " + KORP_;

    var BIK_ = ($("#bik").val() != null) ? $("#bik").val() : "";
    var BNAME_ = ($("#BNAME").val() != null) ? $("#BNAME").val() : "";
    var BKRS_ = ($("#BKRS").val() != null) ? $("#BKRS").val() : "";
    var Shopid = $('#Shopid').val();
    var RS_ = ($("#RS").val() != null) ? $("#RS").val() : "";
    var tlf_ = ($("#tlf").val() != null) ? $("#tlf").val() : "";
    var mail_ = ($("#mail").val() != null) ? $("#mail").val() : "";
    var vk_ = ($("#vk").val() != null) ? $("#vk").val() : "";
    var ok_ = ($("#ok").val() != null) ? $("#ok").val() : "";
    var fb_ = ($("#fb").val() != null) ? $("#fb").val() : "";
    var tw_ = ($("#tw").val() != null) ? $("#tw").val() : "";
    
    return {
        isSuccess: isSuccess, Inn_: Inn_, OGRN_: OGRN_, Name_: Name_, KPP_: KPP_, OKPO_: OKPO_, adr_: adr_, adrCode_: adrCode_, adrtext_: adrtext_, BIK_: BIK_, BNAME_: BNAME_, BKRS_: BKRS_, Shopid: Shopid, RS_: RS_, tlf_: tlf_, mail_: mail_, vk_: vk_, ok_: ok_, fb_: fb_, tw_: tw_}
}
function GetBankByBIK(bik_) {
    var obj = { BIK: bik_ };
    $.ajax({
        type: "POST",
        url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/GetBankByBIK",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //async: false,
        success: function(result) {
            //console.log(JSON.stringify(result))
            // console.log(result);
            var jsondata = JSON.stringify(result.ResultData);
            var jsondata_ = JSON.parse(jsondata);
            $("#BNAME").val(jsondata_.BNAME);
            $("#BKRS").val(jsondata_.BKRS);
            if ($("#BNAME").val().length == 0 && $("#BKRS").val().length == 0) {
                $("#bikS").text("Проверьте правильность введённого БИК").show();
            }
            else {
                $("#bikS").hide();
                $("#BNAMES").hide();
                $("#BKRSS").hide();
            }
        }
    });
}

function GetUOList(Id) {
    var obj = {
        client_id: Id
    };
    $.ajax({
        type: "POST",
        url: "RegisterUO.aspx/GetUOList",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {


            var jsondata_1 = JSON.parse(result.d);
            console.log(jsondata_1)
            $('#ManagerCompany').dataTable({
                "destroy": true,
                data: jsondata_1,
                columns: [
                    {
                        'data': 'NAME',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="DetailUo(' + oData.MAN_COMPANY_ID + ')">' + oData.NAME + '</a>');
                        }
                    },
                    {
                        'data': 'INN',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="DetailUo(' + oData.MAN_COMPANY_ID + ')">' + oData.INN + '</a>');
                        }
                    },

                    {
                        'data': 'OGRN_OGRNIP',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="DetailObj(' + oData.MAN_COMPANY_ID + ')"> ' + oData.OGRN_OGRNIP + '</a>');
                        }
                    },
                    {
                        'data': 'KPP',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="DetailObj(' + oData.MAN_COMPANY_ID + ')"> ' + oData.KPP + '</a>');
                        }
                    },
                    {
                        'data': 'OKPO',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="DetailObj(' + oData.MAN_COMPANY_ID + ')"> ' + oData.OKPO + '</a>');
                        }
                    },
                    {
                        'data': 'ADRESS',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="DetailObj(' + oData.MAN_COMPANY_ID + ')"> ' + oData.ADRESS + '</a>');
                        }
                    }



                ]
                ,
                "initComplete": function (settings, json) {
                    changeDatatableElementStructures($('#ManagerCompany'))


                    // console.log ('bitti2')
                },

                "language": {
                    // "url":"//cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
                    "processing": "Подождите...",
                    "search": "Поиск",
                    "lengthMenu": "Показать _MENU_ записей",
                    "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
                    "infoEmpty": "Записи с 0 до 0 из 0 записей",
                    "infoFiltered": "(отфильтровано из _MAX_ записей)",
                    "infoPostFix": "",
                    "loadingRecords": "Загрузка записей...",
                    "zeroRecords": "Записи отсутствуют.",
                    "emptyTable": "В таблице отсутствуют данные",
                    "paginate": {
                        "first": "Первая",
                        "previous": "Предыдущая",
                        "next": "Следующая",
                        "last": "Последняя"
                    }
                }


            })
        },
        error: function (r) {
            // //alert("Error");
            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            alert("FAIL");
        }
    });
}

function AddProject(mc_id, PName) {
    var Obj = { "UoId": mc_id, "ProjectName": PName }
    $.ajax({
        type: "POST",
        url: "CreateOpject.aspx/AddProject",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            $('#closeUplC').click();
        }
    })
}
function deleteObject(objId) {
    var obj = { "obj_Id": objId }
    $.ajax({
        type: "POST",
        url: "CreateOpject.aspx/DeleteObject",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            if (jsondata_.result == 1) {

                var log_Id = sessionStorage.getItem("Log")
                sessionStorage.setItem("UoId", "")
                SaveLog("Удалить", "Важное", "Администратор", "Клиентское администрирование", "Удален объект (" + $("#adr").val() + ")", log_Id);
                window.location.href = "RegisterObject.aspx";

                //  deleteDomain(objId);
            }

        }

    })
}
function UpdateObject(objId, adrtext_, opt, image1, lg_, project, SaveLog) {
    var Jsonobj = { "ObjId": objId, "ObjAdres": adrtext_, "ObjName": adrtext_, "ManKompId": opt, "KladrId": "", "Photo": image1, "LogId": lg_, "PROJECT_ID": project };
    $.ajax({
        type: "POST",
        url: "CreateOpject.aspx/Update_Object",
        data: JSON.stringify(Jsonobj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d);
            if (jsondata_.result == 1) {
                var log_Id = sessionStorage.getItem("Log");
                sessionStorage.setItem("UoId", "");
                //    SaveLog("Обновить", "Простое", "Администратор", "Клиентское администрирование", "Изменены данные объекта в системе " + adrtext_ + "", log_Id);
                window.location.href = "RegisterObject.aspx";
            }
        }
    });

}

function getDetail(Id, objId) {
    var obj = { "CLId_": Id, "ObjId_": objId }
    $.ajax({
        type: "POST",
        url: "CreateOpject.aspx/getObject",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)


            if (jsondata_[0].OBJECT_ADRESS.indexOf('Д. ') > -1) {
                var dom = jsondata_[0].OBJECT_ADRESS.substring(jsondata_[0].OBJECT_ADRESS.lastIndexOf('Д. ') + 3, jsondata_[0].OBJECT_ADRESS.length)
                $("#dom").val(dom)
                var adr = jsondata_[0].OBJECT_ADRESS.substr(0, jsondata_[0].OBJECT_ADRESS.lastIndexOf(','))
                $("#adr").val(adr)

            }
            if (jsondata_[0].OBJECT_ADRESS.indexOf('Д. ') > -1 && jsondata_[0].OBJECT_ADRESS.indexOf('К. ') > -1) {
                var korp = jsondata_[0].OBJECT_ADRESS.substring(jsondata_[0].OBJECT_ADRESS.lastIndexOf('К. ') + 3, jsondata_[0].OBJECT_ADRESS.length);
                $("#korp").val(korp)

                var adr = jsondata_[0].OBJECT_ADRESS.substr(0, jsondata_[0].OBJECT_ADRESS.lastIndexOf(', Д'))
                var dom = $("#dom").val();
                var dom = dom.substring(0, dom.indexOf(','))
                $("#dom").val(dom)
                $("#adr").val(adr)
            }
            $("#uo").val(jsondata_[0].MAN_COMP_ID)
            $("#uob").val(jsondata_[0].PROJECT_ID)
            $("#imgObj").attr('src', jsondata_[0].OBJECT_PHOTO)

            GetProjectForManComp(jsondata_[0].MAN_COMP_ID, jsondata_[0].PROJECT_ID);
            $('#Projects').attr('data-b', jsondata_[0].DOMAIN_NAME)

            KladrId = jsondata_[0].KLADR_OBJECT_ID
            $("#h_2").text(jsondata_[0].OBJECT_ADRESS)
            GetUprRoles(Id, jsondata_[0].LOG_IN_ID)
            GerUoList(Id, jsondata_[0].MAN_COMP_ID)

        }

    })
}
function DetailObj(objId_) {
    sessionStorage.setItem("ComesTo", "")
    sessionStorage.setItem("ObjId", objId_);

    window.location.href = "CreateOpject.aspx";
}
function saveObject(Id, ObjectDatas, CODE_, uoId_, img, lg, prjct) {
    //uoId_ = (uoId_ == undefined || uoId_ == "" || uoId_ == null) ? 0 : uoId_
    // lg = (lg == undefined || lg == "" || lg == null) ? 0 : lg
    $("#loader,.ui-loader-background").show();

    var obj = { "Client_Id": Id, "Objectadr": ObjectDatas, "CODE": CODE_, "uoId": uoId_, "img_": img, "LogId": lg, "project_id": prjct };
    $.ajax({
        type: "POST",
        url: "CreateOpject.aspx/SaveClienObject",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            if (jsondata_.result == 1) {
                //alert(jsondata_.idObject+" success")
                var log_Id = sessionStorage.getItem("Log")
                SaveLog("Сохранить", "Простое", "Администратор", "Клиентское администрирование", "В системе создан объект   " + ObjectDatas + "", log_Id);
                var idObject_ = jsondata_.idObject
                sessionStorage.setItem("UoId", "");
                //  location.href = "RegisterObject.aspx";
                //addDomain(idObject_)
                var cmsf_O = sessionStorage.getItem("cmsf_O");
                window.location.href = (cmsf_O.length != 0) ? cmsf_O : "RegisterObject.aspx"
                // alert("success")

            }

        }

    })
}
function checkControls_Oject() {
    var adr = $("#adr").val();
    var adrCode = $("#adrList option[value='" + $('#adr').val() + "']").attr('itemid')
    adrCode = ($("#manu").is(":checked")) ? "" : adrCode
    adrCode = (adrCode == undefined) ? "" : adrCode
    var opt = $("#uo option:selected").attr('value')
    var project = $('#Projects').val();
    var dom = $('#dom').val();
    var korp = $('#korp').val();
    var image1 = $("#imgObj").attr('src');
    var _logId = $("#uob").val();
    var success = true
    if (opt == 0) {
        success = false
        ErrorForControls($("#uo"), "Выберите Управляющую организацию")
    }
    if (success == true && project == 0) {
        success = false
        ErrorForControls($('#Projects'), 'Выберите Проект')
    }
    if (success == true && adr.length == 0) {
        success = false
        ErrorForControls($("#adr"), "Введите область, город, район, улицу")
    }
    if (success == true && dom.length == 0) {
        success = false
        ErrorForControls($('#dom'), "Введите номер дома")
    }
    if (success == true && _logId == 0) {
        success = false
        ErrorForControls($('#uob'), "Выберите Управляющего объекта")
    }
    korp = (korp.length != 0) ? ", К. " + korp : "";
    var adrtext_ = adr + ", Д. " + dom + "" + korp;

    return { Issuccess: success, adrtext_: adrtext_, adrCode: adrCode, opt: opt, project: project, dom: dom, korp: korp, image1: image1, _logId: _logId }
}
function ErrorForControls(e, text) {
    var e_class = $(e).attr('class')
    if (e_class.indexOf('select2-hidden-accessible') != -1) {
        $(e).parent().find('.select2-selection').attr('style', 'border-color:#f06d06 !important')
        if (text != undefined) {
            
            $(e).next().next('label').hide()
           
            if ($(e).parent().children('#ErrorLabel_').length == 0) {
                $(e).next().next('label').after('<label id="ErrorLabel_" title="' + text + '" class="w-95 transp backLab" style="color:red">' + text + '</label>')
            }
            var select2Id = $(e).attr('id');
            var spanId = '#select2-' + select2Id + '-container'
            
            $(spanId).attr('title', text)
            window.setTimeout(function () {
            
                $('#ErrorLabel_').remove()
                $(e).next().next('label').show()
                 
               

            }, 5000);
        }
        window.setTimeout(function () {
            $(e).parent().find('.select2-selection').removeAttr('style')
        }, 5000);
    }
    else {
        $(e).attr('style', 'border-color:#f06d06;')
    }
    var position = $(e).offset().top 
    position = (window.location.pathname != '/Client_Admin/CreateOrg.aspx') ? $(e).offset().top : $(e).offset().top - 100
    $("html, body").animate({ scrollTop: position }, "slow");

    window.setTimeout(function () { $(e).removeAttr('style'); $('#servicelbl').remove() }, 5000);

    if (text != undefined && e_class != 'select2-hidden-accessible') {
        //  var originalText = $(e).next('label').text()
        $(e).next('label').hide()
        if ($(e).parent().children('#ErrorLabel_txt').length == 0) {
            $(e).next('label').after('<label id="ErrorLabel_txt" title="' + text + '" class="w-95 transp backLab" style="color:red">' + text + '</label>')//.attr('style', 'color: red').text(text)
        }
        //   $(e).next('label').attr('style', 'color: red').text(text)
        //  $(e).attr('title', text)
        window.setTimeout(function () {
            //  $(e).next('label').removeAttr('style').text(originalText)
            $(e).next('label').show()
            //   $(e).attr('title', '')
            $('#ErrorLabel_txt').remove();
        }, 5000);
    }
}
function GetUprRoles(CL_Id, sId) {
    var obj = { "ClId": CL_Id }
    $.ajax({
        type: "POST",
        url: "CreateOpject.aspx/GetUPRRoles",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)

            for (var i = 0; i < jsondata_.length; i++) {
                // console.log(jsondata_[i].ACCOUNT_NAME)
                $("#uob").append('<option value="' + jsondata_[i].LOG_IN_ID + '">' + jsondata_[i].ACCOUNT_NAME + '</option></select>')
            }
            if (sId != "") {
                $("#uob").val(sId);
            }

            $('#uob').select2()
        }

    })
}
function searchAdress(adres) {
    var obj = { txt: adres }

    //$.ajax({
    //    url: "/Client_Admin/CreateOpject.aspx/GetStreetsBytext",
    //    data: JSON.stringify(obj),
    //    dataType: "json",
    //    type: "POST",
    //    contentType: "application/json; charset=utf-8",
    //    success: function (data) {
    //        // console.log(data);
    //        var jsondata = JSON.parse(data.d);
    //        //console.log(jsondata.d[0].CODE);
    //        // console.log(data.d.CODE)
    //        $.each(jsondata, function (key, value) {
    //            $("#adrList").append('<option value="' + value.Name + ' " itemid=' + value.CODE + '></option>')
    //            // console.log(value.Name)
    //        })
    //    }
    //})
}
function GerUoList(CL_Id, Suo) {
    var obj = {
        client_id: CL_Id
    };
    $.ajax({
        type: "POST",
        url: "RegisterUO.aspx/GetUOList",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //console.log(result)
            var jsondata_1 = JSON.parse(result.d)
            for (var i = 0; i < jsondata_1.length; i++) {
                $("#uo").append('<option value="' + jsondata_1[i].MAN_COMPANY_ID + '">' + jsondata_1[i].NAME + '</option>')
            }

            if (Suo != "") {
                $("#uo").val(Suo)
            }
            $('#uo').select2()
        },

        error: function (r) {
            // //alert("Error");
            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            alert("FAIL");
        }
    });
}
function GetProjectForManComp(uo, s) {
    var Obj = { "UoId": uo, }
    $.ajax({
        type: "POST",
        url: "CreateOpject.aspx/GetProjectForMan",
        data: JSON.stringify(Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            // $("#Projects").find("option:not(:first)").remove();
            var jsonData = JSON.parse(data.d)
            for (var i = 0; i < jsonData.length; i++) {
                $("#Projects").append('<option value=' + jsonData[i].PROJECT_ID + '>' + jsonData[i].PROJECT_NAME + '</option>')
            }
            if (s.length != 0) {
                $("#Projects").val(s)
            }
            $('#Projects').select2()
        }
    })
}
function SaveDataAndGoTo(page) {
    sessionStorage.setItem("ComesTo", "")
    var adr = $("#adr").val();
    var adrCode = $("#adrList option[value='" + $('#adr').val() + "']").attr('itemid')
    var opt = $("#uo").val();
    var dom = $('#dom').val();
    var korp = $('#korp').val();
    var image1 = $(".foto").attr('src');
    var _logId = $("#uob").val();
    var prj = $('#Projects').val()
    var objectDetail = [];
    objectDetail.push({
        "adr": adr,
        "adrCode": adrCode,
        "opt": opt,
        "dom": dom,
        "korp": korp,
        "image1": image1,
        "logId": _logId,
        'prj': prj
    })
    if (page == 'CreateOrg.aspx') {
        sessionStorage.setItem("UOID", "");
        sessionStorage.setItem("cmsf_uo", "CreateOpject.aspx")
        sessionStorage.setItem("ComesTo", "Ob")
    }
    else if (page == 'CreateAccount.aspx') {
        sessionStorage.setItem("LogId", "")
        sessionStorage.setItem("ComesTo", "OB")
    }

    sessionStorage.setItem("currentDatas", JSON.stringify(objectDetail))
    window.location.href = page
}
function GetObject_adress(Id) {
    var obj = { client_id: Id };
    $.ajax({
        type: "POST",
        url: "RegisterObject.aspx/OBJ_List",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            console.log(result)
            var jsondata_1 = JSON.parse(result.d)
            $('#object_adress').dataTable({
                "destroy": true,
                data: jsondata_1,
                columns: [
                    {
                        'data': 'OBJECT_ADRESS',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="DetailObj(' + oData.OBJECT_ID + ')">' + oData.OBJECT_ADRESS + '</a>');
                        }
                    },
                    {
                        'data': 'OBJECT_IMG',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="DetailObj(' + oData.OBJECT_ID + ')"> <img class="foto-obekt w100" src="' + oData.OBJECT_IMG + '"></a>');
                        }
                    },

                    {
                        'data': 'MAN_COMP_NAME',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick="DetailObj(' + oData.OBJECT_ID + ')"> ' + oData.MAN_COMP_NAME + '</a>');
                        }
                    }
                ]
                ,
                "initComplete": function (settings, json) {
                    changeDatatableElementStructures($('#object_adress'))


                    // console.log ('bitti2')
                },

                "language": {
                    // "url":"//cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
                    "processing": "Подождите...",
                    "search": "Поиск",
                    "lengthMenu": "Показать _MENU_ записей",
                    "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
                    "infoEmpty": "Записи с 0 до 0 из 0 записей",
                    "infoFiltered": "(отфильтровано из _MAX_ записей)",
                    "infoPostFix": "",
                    "loadingRecords": "Загрузка записей...",
                    "zeroRecords": "Записи отсутствуют.",
                    "emptyTable": "В таблице отсутствуют данные",
                    "paginate": {
                        "first": "Первая",
                        "previous": "Предыдущая",
                        "next": "Следующая",
                        "last": "Последняя"
                    }
                }


            })
        },

        error: function (r) {
            // //alert("Error");
            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            alert("FAIL");
        }
    });
}
function changeDatatableElementStructures(e) {
    var E_id = $(e).attr('id')
    var Tablewrapper = '#' + E_id + '_wrapper'
    var TableLength = E_id + '_length'
    var TableFilter = '#' + E_id + '_filter'
    // $(Tablewrapper).prepend($('#TableTools'))
    $('#ListLength').append($('select[name="' + TableLength + '"]:eq(0)'))
    $('select[name="' + TableLength + '"]').children('option').each(function () {
        // .text('Показывать ' + $(this).val() + ' записей')
        $(this).text('Показывать ' + $(this).val() + ' записей')
    })
    $('#' + TableLength).remove();
    // $(TableFilter).children('label').children('input[type="search"]').remove()
    $('#SearchForTable').append($(TableFilter).children('label').children('input[type="search"]').attr('class', 'w-100 transp border-0 ml-2 pr-2 pt-1'))

    $(TableFilter).remove();

}
function GotoCreateFunction_C(page) {
    window.location.href = page;
}
function MaskPhone(e) {
    $(e).inputmask("+7(999) 999-99-99");
}

function Date_Controls(e) {
    var id = $(e).attr('id');
    if (id == "REGIST_DATE") {
        //$(e)
        var now = new Date(),
            // minimum date the user can choose, in this case now and in the future
            minDate = now.toISOString().substring(0, 10);
        if (ComputeBiggerDateNotReverse(minDate, $(e).val(), '-') == 2) {
            $(e).val(minDate)
        }

    }
    if (id == "b_date_founders") {
        //$(e)
        var now = new Date(),
            // minimum date the user can choose, in this case now and in the future
            minDate = now.toISOString().substring(0, 10);
        if (ComputeBiggerDateNotReverse(minDate, $(e).val(), '-') == 2) {
            $(e).val(minDate)
        }

    }
    if (id == "passport_date_founders") {
        //$(e)
        var now = new Date(),
            // minimum date the user can choose, in this case now and in the future
            minDate = now.toISOString().substring(0, 10);
        if (ComputeBiggerDateNotReverse(minDate, $(e).val(), '-') == 2) {
            $(e).val(minDate)
        }

    }
    //
    if (id == "BIRTH_DATE") {
        //$(e)
        var now = new Date(),
            // minimum date the user can choose, in this case now and in the future
            minDate = now.toISOString().substring(0, 10);
        if (ComputeBiggerDateNotReverse(minDate, $(e).val(), '-') == 2) {
            $(e).val(minDate)
        }

    }
    //DATE_ISSUE
    if (id == "DATE_ISSUE") {
        //$(e)
        var now = new Date(),
            // minimum date the user can choose, in this case now and in the future
            minDate = now.toISOString().substring(0, 10);
        if (ComputeBiggerDateNotReverse(minDate, $(e).val(), '-') == 2) {
            $(e).val(minDate)
        }

    }
}

function ComputeBiggerDateNotReverse(date1, date2, splitter) {
    var result
    date1 = date1.split(splitter)
    date2 = date2.split(splitter)
    var year1 = isNaN(parseInt(date1[0])) ? 0000 : parseInt(date1[0])
    var year2 = isNaN(parseInt(date2[0])) ? 0000 : parseInt(date2[0])

    var month1 = isNaN(parseInt(date1[1])) ? 00 : parseInt(date1[1])
    var month2 = isNaN(parseInt(date2[1])) ? 00 : parseInt(date2[1])

    var day1 = isNaN(parseInt(date1[2])) ? 00 : parseInt(date1[2])
    var day2 = isNaN(parseInt(date2[2])) ? 00 : parseInt(date2[2])

    if (year1 > year2) {
        result = 1
    }
    else if (year1 == year2) {
        result = 0
    }
    else if (year2 > year1) {
        result = 2
    }

    if (result.length == 0 || result == 0) {
        if (month1 > month2) {
            result = 1
        }
        else if (month1 == month2) {
            result = 0
        }
        else if (month2 > month1) {
            result = 2
        }
    }

    if (result.length == 0 || result == 0) {
        if (day1 > day2) {
            result = 1
        }
        else if (day1 == day2) {
            result = 0
        }
        else if (day2 > day1) {
            result = 2
        }
    }
    return result
}
function removeFounder(e) {
    if ($('.INFO_FOUNDERS').length != 1) {
        $(e).parent().prev().remove()
        $(e).parent().prev().remove()
        $(e).parent().remove()
    }
    else {
        $(e).hide();//.attr('disabled', 'disabled').css('color','gainsboro')
    }
}
function AddFounder(e) {
    var now = new Date(),
        // minimum date the user can choose, in this case now and in the future
        minDate = now.toISOString().substring(0, 10);
    $(e).after('<br><br><div class="INFO_FOUNDERS" style="border-style: double;border-color: rgb(0,147,233);"><i class="fa fa-close removing3" itemid="1" onclick="removeFounder(this)" style="font-size: 20px;float: right;" aria-hidden="true"></i><h4>Сведения об учредителях</h4><label>ФИО</label><input type="text" id="fio_founders"><label>Дата Рождения</label><input type="date" id="b_date_founders" max="' + minDate + '" onchange="Date_Controls(this)" onkeyup="Date_Controls(this)"><label>Гражданство</label><input type="text" id="citi_founders"><label>Место жителство (регистрации) </label><input type="text" id="regist_founders"><label>Место пребывания</label><input type="text" id="stay_founders"><br><div id="passport_datas_founders"><h4>Данные паспорта </h4><label>Серия паспорта</label><input type="text" id="passport_series_founders"><label>Номер паспорта</label><input type="text" id="passport_number_founders"><label>Дата выдачи паспорта</label><input type="date" id="passport_date_founders" max="' + minDate + '" onchange="Date_Controls(this)" onkeyup="Date_Controls(this)"><label>Кем выдан паспорт </label><textarea rows="5" id="issued_by_passport_founder" style="margin: 0px; width: 50%; height: 178px;"></textarea></div></div>')
    $('i[onclick="removeFounder(this)"]').show()//.css('color', 'red').removeAttr('disabled')
}
function GetSupplierDetail(guid) {
    var obj = { guid: guid }

    $.ajax({
        type: "POST",
        url: "CreateSupplier.aspx/GetSupplierDetail",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var j = JSON.parse(data.d)
            //console.log(j)

            $('#INN').val(j[0].INN);
            $('#KPP').val(j[0].KPP);

            $('#OKVED').val(j[0].OKVED);
            $('#OGRN').val(j[0].OGRN_OGRNIP);
            $('#REGIST_ORGAN').val(j[0].REGIST_ORGAN)
            var REGIST_DATE = j[0].REGIST_DATE// 
            REGIST_DATE = (REGIST_DATE != null) ? REGIST_DATE : ''
            $('#REGIST_DATE').val(REGIST_DATE)
            $('#FULL_NAME').val(j[0].FULL_NAME);
            $('#NAME').val(j[0].NAME);
            $('#BIRTH_DATE').val(j[0].BIRTH_DATE);
            $('#FIO').val(j[0].FIO)

            $('#BIRTH_PLACE').val(j[0].BIRTH_PLACE);
            $('#TYPE_DOCUMENT').val(j[0].TYPE_DOCUMENT)
            $('#SERIES_DOCUMENT').val(j[0].SERIES_DOCUMENT)
            $('#NUMBERS_DOCUMENT').val(j[0].NUMBERS_DOCUMENT);
            $('#DATE_ISSUE').val(j[0].DATE_ISSUE);
            $('#CONTACT_PHONE').val(j[0].CONTACT_PHONE)
            $('#DIVISION_CODE').val(j[0].DIVISION_CODE)
            // CLIENT_ID  Id
            $('#SozUp').text(j[0].FULL_NAME)
            $('#CHECKING_ACCOUNT').val(j[0].CHECKING_ACCOUNT);
            $('#CORRESP_ACCOUNT').val(j[0].CORRESP_ACCOUNT);
            $('#BANK_NAME').val(j[0].BANK_NAME);
            $('#BIK').val(j[0].BIK);
            $('#FEE').val(j[0].FEE)

            $('#PAYMENT').val(j[0].PAYMENT);
            //    LICENCE  $('#LICENCE')
            $('#LEGAL_ADRESS').children('#add_r').val(j[0].LEGAL_ADRESS);
            $('#ADRESS').children('#adr').val(j[0].ADRESS)
            $('#PHONE_FAKS').val(j[0].PHONE_FAKS);
            $('#email_supp').val(j[0].E_MAIL);
            $('#pass_supp').val(j[0].PASSWORD);
            $('#SHOP_ID').val(j[0].SHOP_ID);
            $('#VK').val(j[0].VK)
            $('#OK').val(j[0].OK)
            $('#FB').val(j[0].FB)
            $('#TW').val(j[0].TW)
            $('#ICON').attr('src');
            if (j[0].ICON != null && j[0].ICON != '') {
                $('#filesN').hide().after('<img id="ICON" src="' + j[0].ICON + '" style="width: 8%;"><i class="fa fa-close removing3" itemid="1" onclick="removeSuppImg(this)" style="font-size: 14px; float: left;" aria-hidden="true"></i>')
            }
            $('.INFO_FOUNDERS').prev().remove()
            $('.INFO_FOUNDERS').prev().remove()
            $('.INFO_FOUNDERS').remove()
            var j2 = JSON.parse(j[0].INFO_FOUNDERS)
            if (j2 != null) {
                var now = new Date(),
                    // minimum date the user can choose, in this case now and in the future
                    minDate = now.toISOString().substring(0, 10);
                $('#REGIST_DATEб,#b_date_founders,#passport_date_founders,#BIRTH_DATE,#DATE_ISSUE').prop('max', minDate);
                for (var i = 0; i < j2.length; i++) {

                    $('#AddF').after('<br><br><div class="INFO_FOUNDERS" style="border-style: double;border-color: rgb(0,147,233);"><i class="fa fa-close removing3" itemid="1" onclick="removeFounder(this)" style="font-size: 20px;float: right;" aria-hidden="true"></i><h4>Сведения об учредителях</h4><label>ФИО</label><input type="text" value="' + j2[i].NAME + '" id="fio_founders"><label>Дата Рождения</label><input type="date" max="' + minDate + '" onchange="Date_Controls(this)" onkeyup="Date_Controls(this)" value="' + j2[i].BIRTH_DATE + '" id="b_date_founders"><label>Гражданство</label><input type="text" value="' + j2[i].Citizen + '" id="citi_founders"><label>Место жителство (регистрации) </label><input type="text" value="' + j2[i].BIRTH_PLACE + '" id="regist_founders"><label>Место пребывания</label><input type="text" value="' + j2[i].stay_founders + '" id="stay_founders"><br><div id="passport_datas_founders"><h4>Данные паспорта </h4><label>Серия паспорта</label><input value="' + j2[i].SERIES_DOCUMENT + '" type="text" id="passport_series_founders"><label>Номер паспорта</label><input type="text" id="passport_number_founders" value="' + j2[i].NUMBERS_DOCUMENT + '"><label>Дата выдачи паспорта</label><input type="date" max="' + minDate + '" onchange="Date_Controls(this)" onkeyup="Date_Controls(this)" value="' + j2[i].DATE_ISSUE + '" id="passport_date_founders"><label>Кем выдан паспорт </label><textarea rows="5" id="issued_by_passport_founder"   style="margin: 0px; width: 50%; height: 178px;"> ' + j2[i].issued_by_passport_founder + '</textarea></div></div>')
                }
            }


        }
    })
}
function GoToSupplier(SupGuid) {
    sessionStorage.setItem("SupGuid", SupGuid)
    window.location.href = 'CreateSupplier.aspx';
}
function GetSuppliers(Cid) {
    var obj = { "Cid": Cid }
    $.ajax({
        type: "POST",
        url: "SuppliersRegister.aspx/GetSuppliers",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var jsondata_ = JSON.parse(data.d)
            //console.log(jsondata_)
            $('#Supplierr').dataTable({
                "destroy": true,
                data: jsondata_,
                columns: [
                    {
                        'data': 'NAME',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            $(nTd).html('<a href="#"  onclick=GoToSupplier("' + oData.GUID + '")>' + oData.NAME + '</a>');
                        }
                    },
                    {
                        'data': 'E_MAIL',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            var E_MAIL = (oData.E_MAIL == null) ? '-' : oData.E_MAIL
                            $(nTd).html('<a href="#"  onclick=GoToSupplier("' + oData.GUID + '")>' + E_MAIL + '</a>');
                        }
                    },
                    {
                        'data': 'PHONE_FAKS',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            var PHONE_FAKS = (oData.PHONE_FAKS == null) ? '-' : oData.PHONE_FAKS
                            $(nTd).html('<a href="#"  onclick=GoToSupplier("' + oData.GUID + '")>' + PHONE_FAKS + '</a>');
                        }
                    },
                    {
                        'data': 'SHOP_ID',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            var SHOP_ID = (oData.SHOP_ID != null) ? oData.SHOP_ID : '';
                            $(nTd).html('<a href="#"  onclick=GoToSupplier("' + oData.GUID + '")>' + SHOP_ID + '</a>');
                        }
                    },
                    {
                        'data': 'FEE',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            var FEE = (oData.FEE != null) ? oData.FEE : '';
                            $(nTd).html('<a href="#"  onclick=GoToSupplier("' + oData.GUID + '")>' + FEE + '</a>');
                        }
                    },

                    {
                        'data': 'ACCEPTING',
                        fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                            var ACCEPTING = (oData.ACCEPTING == '0') ? '<i style="" data-icon="w" class="fa fa-minus" aria-hidden="true"></i>' : '<i style="" data-icon="w" class="fa fa-plus" aria-hidden="true"></i>'
                            $(nTd).html('<a href="#"  onclick=GoToSupplier("' + oData.GUID + '")>' + ACCEPTING + '</a>');
                        }
                    },

                ]
                ,
                "language": {
                    // "url":"//cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
                    "processing": "Подождите...",
                    "search": "Поиск",
                    "lengthMenu": "Показать _MENU_ записей",
                    "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
                    "infoEmpty": "Записи с 0 до 0 из 0 записей",
                    "infoFiltered": "(отфильтровано из _MAX_ записей)",
                    "infoPostFix": "",
                    "loadingRecords": "Загрузка записей...",
                    "zeroRecords": "Записи отсутствуют.",
                    "emptyTable": "В таблице отсутствуют данные",
                    "paginate": {
                        "first": "Первая",
                        "previous": "Предыдущая",
                        "next": "Следующая",
                        "last": "Последняя"
                    },
                    "aria": {
                        "sortAscending": ": активировать для сортировки столбца по возрастанию",
                        "sortDescending": ": активировать для сортировки столбца по убыванию"
                    }
                }

            })
        }
    })
}
function removeSuppImg(e) {
    $(e).prev().remove();
    $(e).remove();
    $('#filesN').show().val('');
}
function readURLNews(input, imgName) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {


            $('.foto-disp').attr('src', e.target.result);

            //var nameImg = imgName
            //var arrayBuffer = reader.result
            //var bytes = new Uint8Array(arrayBuffer);
            //var obj = { baseString: bytes, imgName: nameImg };
            var formData = new FormData();
            var idFiles = $(input).attr('id')
            var file = document.getElementById(idFiles).files[0];

            formData.append('file', file, encodeURI(file.name));
            formData.append('object_id', '1');
            //console.log(formData);



            $.ajax({
                type: "POST",
                url: window.location.protocol + '//' + window.location.host + "/WCFServices/Constructor_API.svc/UploadFile",//window.location.protocol + '//' + window.location.host + "
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
                //cache: false,
                timeout: 3600000,
                crossDomain: true,

                success: function (result) {
                    $("#loader,.ui-loader-background").hide();

                    var F_ile = result.URL.replace('~', window.location.protocol + '//' + window.location.host + "/")
                    var extention = F_ile.substr(F_ile.lastIndexOf(".") + 1)
                    if (idFiles == 'filesN') {
                        $("#filesN").hide();
                        $("#filesN").after('<img id="ICON" src=' + F_ile + ' style="width: 8%;"><i class="fa fa-close removing3" itemid="1" onclick="removeSuppImg(this)" style="font-size: 14px; float: left;" aria-hidden="true"></i>')
                    }
                    else {
                        $("#NewsFile").after('<a href=' + F_ile + '><img id="FileNews" src="../img/prik.png" style="width: 8%;"/></a><i class="fa fa-close removing3" itemid="1" onclick="removeSuppImg(this)" style="font-size: 14px; float: left;" aria-hidden="true"></i><label id="fileName"> ' + imgName + '</label>')
                        $('#NewsFile').hide();
                    }


                    $('.ui-loader-background').hide();
                    $("#loader,.ui-loader-background").hide();

                },

                error: function (r) {

                    //  //alert("Error");
                    //  console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
                    $("#loader,.ui-loader-background").hide();
                    var filePath = $('#files').val();
                    var index = filePath.lastIndexOf("\\") + 1;
                    var filename = filePath.substr(index);
                    // readURL(input, filename)
                },
                complete: function (r) {
                    //var jsonEroorData = JSON.parse(r);

                    //if (r.readyState == 4 && r.status == 200) { //do something }; 
                    //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
                    //    $("#loader,.ui-loader-background").hide();
                    //}
                },
                failure: function (r) {
                    alert("FAIL");
                }
            });


        }


    }
}
function UpdateSupplier(o) {
    $.ajax({
        type: "POST",
        url: "CreateSupplier.aspx/UpdateSupplier",
        data: JSON.stringify(o),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            var j = JSON.parse(result.d)
            if (j.result == 'ok') {
                window.location.href = 'SuppliersRegister.aspx'
            }
            else {
                //console.log(result)
            }
            // 
        }
    })
}
function SaveSupplier(o) {
    $.ajax({
        type: "POST",
        url: "CreateSupplier.aspx/SaveSupplier",
        data: JSON.stringify(o),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            var j = JSON.parse(result.d)
            if (j.result == 'ok') {
                window.location.href = 'SuppliersRegister.aspx'
            }
            else {
                //console.log(result)
            }
            // 
        }
    })
}
function GenerateJson(e) {

    //var i = 0
    //$(e).children().each(function ()
    //{

    //    if ($(this).is('input')) {
    //        console.log('inputdu_' + i)
    //        console.log($(this).attr('id'))
    //        console.log('----------')
    //    }
    //    if ($(this).is('div')) {
    //        console.log('divdi_' + i)
    //        console.log($(this).html())
    //        console.log('----------')
    //    }
    //    i=i+1
    //})

    //-------------------
    str = [];
    var i = 0
    var fullString = ""
    var total = $(e).children(':input').length
    $(e).children().each(function () {

        var id;
        var value;
        var success = false
        if ($(this).is('input')) {
            id = $(this).attr('id');
            value = $(this).val();
            success = true;
        }
        if ($(this).is('div')) {
            var repeat = $(this).attr('data-array');
            if (repeat == true) {

            }
            else {
                $(this).children().each(function () {
                    //if inside of div has inputs than get them id's and values
                    if ($(this).is('input')) {
                        id = $(this).attr('id');
                        value = $(this).val();
                        success = true;
                    }
                })
            }
        }
        if (success == true) {
            var str = "";

            var O_scope = "{";
            var C_Scop = "}";
            if (i == 0) {
                fullString = "{" + fullString
            }
            i = i + 1;
            if (i == total) {
                str = '"' + id + '":"' + value + '"}'
            }
            else {
                str = '"' + id + '":"' + value + '",'
            }

            fullString = fullString + str
        }


    })
    //console.log(fullString)
    jsonObj = JSON.parse(fullString);
    //console.log(jsonObj);
}


function getDocs(UoId) {
    var ob = { McId: UoId }
    $.ajax({
        type: "POST",
        url: "InfoUO.aspx/getInfos",
        data: JSON.stringify(ob),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var jsondata_ = JSON.parse(result.d)
            for (var i = 0; i < jsondata_.length; i++) {

                var KatId = jsondata_[i].KAT_ID;


                $(".formTable").find("tbody tr:eq(" + (KatId - 1) + ")").find("td:eq(1)").prepend('<a katid=1 href="' + jsondata_[i].D_URL + '">' + jsondata_[i].D_NAME + '</a><a class="delete" onclick=delDoc("' + jsondata_[i].D_NAME + '",this,"' + jsondata_[i].D_URL + '")><i class="fa fa-times-circle" aria-hidden="true"></i></a><br/>')




                /*$(".formTable").find("tbody tr:eq(" + i + ")").find("td:eq(1)").find("a[katid=" + Katid + "]:eq("+j+")").attr("href");*/
                /* $(input).after('<a katid=1 href="' + result.URL.replace('~', '..') + '">' + imgName + '</a><a class="delete" onclick=delDoc("' + imgName + '",this,"' + result.URL.replace('~', '..') + '")><i class="fa fa-times-circle" aria-hidden="true"></i></a><br/>')*/
            }

        }
    })
}

function delDoc(docname, event, href) {
    alertWithButton2("Вы действительно хотите удалить этот документ?", " " + docname + " ", "")

    $("#deleteO").click(function () {
        var ob = { url: href }
        $.ajax({
            type: "POST",
            url: "InfoUO.aspx/DelDoc",
            data: JSON.stringify(ob),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $(event).remove();
                $('a[href="' + href + '"]').prev().remove()
                $('a[href="' + href + '"]+br').remove();
                $('a[href="' + href + '"]+br').remove();
                $('a[href="' + href + '"]').remove();
                $('#F1_T').hide();
                $('#F2_T').hide();
                $('#F3_T').hide();
                $('#F4_T').hide();
                $('#F5_T').hide();
                $('#F6_T').hide();

                $("#cls").click()
            }
        })


    })


}
function alertWithButton2(Header_, text_, footer_) {
    $("#mh2").text(Header_);
    if (text_.length >= 45) {
        $("#txt2").attr("style", "font-size: 23px;width:50%;word-wrap:break-word;")
    }
    else {
        $("#txt2").attr("style", "font-size: 23px")
    }
    $("#txt2").text(text_);
    $("#mf2").text(footer_)
    var modal = document.getElementById('myModal2');
    var span = document.getElementsByClassName("close_")[0];
    modal.style.display = "block";
    $("#close_,#cls").click(function () {
        modal.style.display = "none";
    })
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
function getModules_BylgId(to, lg_) {
    var obj7 = { Lg: lg_ }
    $.ajax({
        type: "POST",
        url: "Accounts.aspx/getmodulNamebyid",
        data: JSON.stringify(obj7),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            // console.log(result)

            var jsondata_ = JSON.parse(result.d)

            //console.log(jsondata_)
            for (var i = 0; i < jsondata_.length; i++) {
                $(to).append('<a href="CreateAccount.aspx" style="line-height:2;" onclick="DetailAcc(' + lg_ + ')">' + jsondata_[i].MODUL_NAME + '</a><br/>')
            }

        },

        error: function (r) {
            // //alert("Error");
            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            alert("FAIL");
        }
    });
}

function getRoles_BylgId(to, l_g) {
    var obj8 = { lg: l_g }
    $.ajax({
        type: "POST",
        url: "Accounts.aspx/GetRolesNameById",
        data: JSON.stringify(obj8),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            // console.log(result)

            var jsondata_ = JSON.parse(result.d)

            //console.log(jsondata_)
            for (var i = 0; i < jsondata_.length; i++) {
                $(to).append('<a href="CreateAccount.aspx" style="line-height:2;" onclick="DetailAcc(' + l_g + ')">' + jsondata_[i].ROLE_NAME + '</a><br/>')
            }

        },

        error: function (r) {
            // //alert("Error");
            console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
        },
        failure: function (r) {
            alert("FAIL");
        }
    });
}
function GetSortedTable(srtd) {
    $("#UoBody tr:not(:first)").remove();
    var Id_ = new URL(location.href).searchParams.get('Id');

 
sessionStorage.setItem("Clien_ID", Id_)
var obj9 = { sr_t: srtd, C: Id_ }
$.ajax({
    type: "POST",
    url: "Accounts.aspx/getSortedTable",
    data: JSON.stringify(obj9),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (result) {

        // console.log(result)

        var jsondata_ = JSON.parse(result.d)

        //console.log(jsondata_)
        for (var i = 0; i < jsondata_.length; i++) {
            //console.log(jsondata_[i].LOG_IN_ID)
            //<td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>******</a></td>
            $("#uz1").after('<tr><td><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].LOG_IN_ID + '</a></td > <td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].ACCOUNT_NAME + '</a></td><td ><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].PHONE_NUMBER + '</a></td> <td><a href="CreateAccount.aspx" onclick=DetailAcc(' + jsondata_[i].LOG_IN_ID + ')>' + jsondata_[i].E_MAIL + '</a></td><td id="Mm' + jsondata_[i].LOG_IN_ID + '"></td><td id="Rr' + jsondata_[i].LOG_IN_ID + '"></td></tr >')
            var to_ = "#Mm" + jsondata_[i].LOG_IN_ID
            var To_2 = "#Rr" + jsondata_[i].LOG_IN_ID;
            // $("#em" + jsondata_[i].LOG_IN_ID + "").after('""')
            getModules_BylgId(to_, jsondata_[i].LOG_IN_ID)
            getRoles_BylgId(To_2, jsondata_[i].LOG_IN_ID)
        }


    },

    error: function (r) {
        // //alert("Error");
        console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
    },
    failure: function (r) {
        alert("FAIL");
    }
});
}
 

function Sortedby(e, srt) {
    // sessionStorage.setItem("ss", srt);
    var cssval = $(e).css('background-color');
    if (cssval != 'rgb(0, 0, 255)') {
        $("#ld,#fi_o,#em_ail,#md,#rl").css('background-color', '');
        //alert(srt)
        GetSortedTable(srt);
        //$(e).css('background-color', 'blue');
        // $(e).css('background-image', 'blue');
        $("#ld").attr('class', 'nsortA')
        $("#fi_o").attr('class', 'nsortA')
        $("#rl").attr('class', 'nsortA')//
        $("#md").attr('class', 'nsortA')
        $(e).attr('class', 'sortingA')

    }
    else {
        srt = srt.replace('De', 'A')
        //alert(srt)
        GetSortedTable(srt);
        //  $(e).css('background-color', '');
        $("#ld").attr('class', 'nsortA')
        $("#fi_o").attr('class', 'nsortA')
        $("#rl").attr('class', 'nsortA')//
        $("#md").attr('class', 'nsortA')
        $(e).attr('class', 'nsortA')
    }


}
function clFunc(fName) {
    $(fName).click();
    //$(fName).change(function () {
    //   // alert($(fName).val())
    //   
    //})
}
function getModules2(SelectedR, itemid, selectedM) {

    $.ajax({
        type: "POST",
        url: "CreateAccount.aspx/getModul",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var jsondata_1 = JSON.parse(result.d)
            for (var i = 0; i < jsondata_1.length; i++) {
                if (jsondata_1[i].MODUL_ID == 1 || jsondata_1[i].MODUL_ID == 4) {
                    $('.mdls[itemid=' + itemid + ']').append('<option value="' + jsondata_1[i].MODUL_ID + '">' + jsondata_1[i].MODUL_NAME + '</option>')
                }
            }
            if (selectedM != "") {
                $('.mdls[itemid=' + itemid + ']').val(selectedM);
                GetRoleByModule("", itemid, SelectedR)
            }
        }
    })

}

function GetRoleByModule(lg, itemid, slctdR) {//GetRoleByModule 
    $("#mrsIm").hide()
    //  $('.knp1').attr('class', 'knp1 deActiveAdd').attr('disabled', 'disabled');
    var mdsSelval = $('.mdls[itemid=' + itemid + ']').val();
    if (mdsSelval == 0) {
        $('.knp1').attr('class', 'knp1 deActiveAdd').attr('disabled', 'disabled');
    }
    if (lg == 0) {
        $('.rls[itemid=' + itemid + '] option:not(:first)').remove();
        var mId = $('.mdls[itemid=' + itemid + ']').val();
        var obj = { "M_Id": mId }
        $.ajax({
            type: "POST",
            url: "CreateAccount.aspx/GetRole",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var jsondata_ = JSON.parse(data.d)
                var hasroles = []
                $('#mrss .rls').each(function (i) {
                    hasroles.push({ "ROLE_ID": $(this).val() })
                })
                for (var i = 0; i < jsondata_.length; i++) {
                    var has = false;
                    for (var j = 0; j < hasroles.length; j++) {
                        if (hasroles[j].ROLE_ID == jsondata_[i].ROLE_ID) {
                            has = true;
                        }
                    }
                    if (has == false) {
                        $('.rls[itemid=' + itemid + ']').append('<option value="' + jsondata_[i].ROLE_ID + '">' + jsondata_[i].ROLE_NAME + '</option>')
                    }
                }
                if (slctdR != "") {
                    $('.rls[itemid=' + itemid + ']').val(slctdR);
                }
                //for (var i = 0; i < jsondata_.length; i++) {
                //    $('.rls[itemid=' + itemid + ']').append('<option value="' + jsondata_[i].ROLE_ID + '">' + jsondata_[i].ROLE_NAME + '</option>')
                //}

            }
        })
    }
}
function ChangeRole(itemid) {
    $("#mrsIm").hide()
    var selval = $('.rls[itemid=' + itemid + ']').val();
    if (selval != 0) {
        //$('.knp[itemid=' + itemid + ']').show();
        $('.knp1').removeAttr('disabled').attr('class', 'knp1 ActiveAdd genBtn');
    }
    else {
        // $('.knp[itemid=' + itemid + ']').hide();
        $('.knp1').attr('class', 'knp1 deActiveAdd').attr('disabled', 'disabled');
    }

}

function AddMRSS() {

    var lastitemid = $("#mrss").find('select:last').attr('itemid');
    $('.knp[itemid=' + lastitemid + ']').show();
    $('.mdls[itemid=' + lastitemid + ']').attr('disabled', 'disabled')
    $('.rls[itemid=' + lastitemid + ']').attr('disabled', 'disabled')
    var nextitemid = parseInt(lastitemid) + 1;
    // lastitemid++
    $('.row[itemid=' + lastitemid + ']').after('<div class="row" itemid=' + nextitemid + '><div class="col-xs-4" itemid=' + nextitemid + '> <select class="mdls" onchange="GetRoleByModule(0,' + nextitemid + ',0)" itemid=' + nextitemid + '><option value= "0"  id= "" > Выберите Модуль</option></select></div><div  class="col-xs-4" itemid=' + nextitemid + '><select class="rls" onchange="ChangeRole(' + nextitemid + ')" itemid=' + nextitemid + '><option value="0"   >Выберите Роль</option></select></div><div class="col-xs-4" itemid=' + nextitemid + '><input class="knp del" onclick="delElements(' + nextitemid + ')" type="button" itemid=' + nextitemid + '    value="Удалить"></div></div>')
    $('.knp1').attr('class', 'knp1 deActiveAdd').attr('disabled', 'disabled');
    getModules2("", nextitemid, "");
    $('.del').show();
}
function delElements(itemid) {
    if (confirm('Вы действительно хотите удалить данную роль?')) {
        var divsrow = $('#mrss ').find('.row').length
        var currentModelVal = $('.mdls[itemid=' + itemid + ']').val();
        var currentRoleVal = $('.rls[itemid=' + itemid + ']').val();
        var currendtRoleText = $('.rls[itemid=' + itemid + '] option:selected').text();

        var lastitemid2 = $("#mrss").find('select:last').attr('itemid');
        var lastModeval = $('.mdls[itemid=' + lastitemid2 + ']').val();
        //if (currentModelVal == lastModeval)
        //{
        //    $('.rls[itemid=' + lastitemid2 + ']').append('<option value=' + currentRoleVal + '>'+currendtRoleText+'</option>');
        //}
        $('#mrss .mdls').each(function () {
            if ($(this).val() == currentModelVal) {
                var thisitemid = $(this).attr('itemid');
                $('.rls[itemid=' + thisitemid + ']').append('<option value=' + currentRoleVal + '>' + currendtRoleText + '</option>');
            }
        })
        if (divsrow != 2) {
            $('.row[itemid=' + itemid + ']').remove();
            var lastitemid = $("#mrss").find('select:last').attr('itemid');
            var lastRoleItemval = $('.rls[itemid=' + lastitemid + ']').val();
            $('.rls[itemid=' + lastitemid + ']').removeAttr('disabled', 'disabled')//
            $('.mdls[itemid=' + lastitemid + ']').removeAttr('disabled', 'disabled')
            if (lastRoleItemval != 0) {
                $('.knp1').removeAttr('disabled').attr('class', 'knp1 ActiveAdd genBtn');
            }
            else {
                $('.knp1').attr('class', 'knp1 deActiveAdd').attr('disabled', '');
            }

        }
        if (divsrow == 2) {
            $('.knp[itemid=' + itemid + ']').hide();
            var lastitemid = $("#mrss").find('select:last').attr('itemid');
            var lastRoleItemval = $('.rls[itemid=' + lastitemid + ']').val();
            if (lastRoleItemval != 0) {
                $('.knp1').removeAttr('disabled').attr('class', 'knp1 ActiveAdd genBtn');
            }
            else {
                $('.knp1').attr('class', 'knp1 deActiveAdd').attr('disabled', '');
            }
        }
        if ($('.del').length == 1) {
            $('.del').hide();
        }
    }

}

//function OncgangeFile(e)
//{
//    var filePath = $(e).val();
//    var errName = "#"+$(e).attr("id") + "_T"
//        $(errName).hide();
//        var index = filePath.lastIndexOf("\\") + 1;
//        var filename = filePath.substr(index);
//        var ext = $(e).val().split('.').pop();
//        // console.log(ext);
//        if (ext == "doc" || ext=="docx") {
//            $(errName).hide();
//            // readURL(this, filename);
//            var flnm = $(e)[0].files[0].name
//            var fName = $(e).attr("id")
//           readURL2(e, flnm, fName);

//        }
//        else {
//            $(errName).text("Неверный формат документа").show();
//        }
//}

//function readURL2(input, imgName,fnm) {
//    if (input.files && input.files[0]) {
//        fnm = fnm.replace("#", "");
//        var reader = new FileReader();
//        reader.readAsDataURL(input.files[0]);
//        reader.onload = function (e) {

//           // $('.foto-disp').attr('src', e.target.result);

//            //var nameImg = imgName
//            //var arrayBuffer = reader.result
//            //var bytes = new Uint8Array(arrayBuffer);
//            //var obj = { baseString: bytes, imgName: nameImg };
//            var formData = new FormData();

//            var file = document.getElementById(fnm).files[0];

//            formData.append('file', file, file.name);
//            formData.append('object_id', '1');
//            console.log(formData);
//            $.ajax({
//                type: "POST",
//                url: "../WCFServices/Constructor_API.svc/UploadFile",
//                data: formData,
//                //cache: false,
//                type: 'POST',
//                //async: false,
//                contentType: "multipart/form-data",
//                processData: false,
//                success: function (result) {

//                    //alert("OK. See Console -  press F12");
//                    console.log(JSON.stringify(result)); $("#resulter").text(JSON.stringify(result));
//                    //var jsondata_1 = jQuery.parseJSON(result)
//                    //var jsondata_1 = JSON.stringify(result)
//                    // var jsondata_1 = JSON.parse(result)
//                   // $('.foto-disp').attr('src', result.URL.replace('~', '..'))
//                    //  $("#loader,.ui-loader-background").hide();
//                    $(input).after('<a href="' + result.URL.replace('~', '..') + '">' + imgName +'</a><a class="delete" href= "1"><i class="fa fa-times-circle" aria-hidden="true"></i></a>')

//                },

//                error: function (r) {

//                    //  //alert("Error");
//                    console.log("AJAX error in request: " + JSON.stringify(r, null, 2));
//                },
//                complete: function (r) {
//                    //var jsonEroorData = JSON.parse(r);

//                    //if (r.readyState == 4 && r.status == 200) { //do something }; 
//                    //    $('.foto-disp').attr('src', result.URL.replace('~', '..'))
//                    //    $("#loader,.ui-loader-background").hide();
//                    //}
//                },
//                failure: function (r) {
//                    alert("FAIL");
//                }
//            });


//        }


//    }
//}