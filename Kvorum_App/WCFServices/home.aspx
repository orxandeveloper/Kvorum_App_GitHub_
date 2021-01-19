<%@ Page Title="" Language="C#" MasterPageFile="~/Test.Master" AutoEventWireup="true" CodeBehind="home.aspx.cs" Inherits="WcfServices.home" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    321323
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link rel=""/>
    <script  lang="javascript">
        jQuery(document).ready(function ($) {
            $("#btnAddress").on("click", function (e) {
                console.log(e);


                var modal = new Custombox.modal({
                    content: {
                        effect: 'fadein',
                        target: '#modal_dialog'
                    }
                });

                // Open
                //modal.open();


                function bootbox_file() {
                    bootbox_confirm("<form class='form-horizontal' enctype='multipart/form-data' id='infos' action='#'>\
        <br/><input name='letter' type='file'>\
         \
        </form>", 'Upload', 'Cancel').modal('show');
                }
                bootbox_confirm("aaa", null, null);
                function bootbox_confirm(msg, callback_success, callback_cancel) {
                    var d = bootbox.confirm({
                        message: msg, title: "Upload New Letter", show: false, callback: function (result) {
                            if (result)
                                console.log("Hi ");
                            else if (typeof (callback_cancel) == 'function')
                                callback_cancel();
                        }
                    });

                    d.bind('shown.bs.modal', function () {
                        d.find("input:file").ace_file_input();
                    });
                    return d;
                }




                ////bootbox.prompt(
                ////    {
                ////        title: "Select your favourite items",
                ////        message: "Welcome to world of promt messages",
                ////        size: 'large',
                ////        inputType: 'checkbox',
                ////        inputOptions: [{
                ////            text: 'Shoes',
                ////            value: '1'
                ////        },
                ////        {
                ////            text: 'Bike',
                ////            value: '2'
                ////        },
                ////        {
                ////            text: 'Rose',
                ////            value: '3'
                ////        }],
                ////        inputType: 'email',
                ////        inputType: 'number',
                ////        inputType: 'select',
                ////        inputOptions: [{
                ////            text: 'Shoes',
                ////            value: '1'
                ////        },
                ////        {
                ////            text: 'Bike', onEscape: true,//allow escape button to dismiss promt
                ////            backdrop: true,// click on background dismiss alert
                ////            value: '2'
                ////        },
                ////        {
                ////            text: 'Rose',
                ////            value: '3'
                ////        }],
                ////        //inputType:'date',
                ////        callback: function (result) {
                ////            Example.show("confirm promt called successfully with result:" + result);
                ////        }
                ////    });

                //var warning = 'Are you sure you want to do this?';
                //$('.title').html(warning);
                //var dialog = $('#modal_dialog').dialog();
                //function Yes() {
                //    dialog.dialog('close');
                //    // Do something
                //}
                //function No() {
                //    dialog.dialog('close');
                //    // Do something else
                //}
                //$('#btnYes').click(Yes);
                //$('#btnNo').click(No);



                bootbox.form({
                    title: 'User details',
                    fields: {
                        name: {
                            label: 'Name',
                            value: 'John Connor',
                            type: 'text'
                        },
                        email: {
                            label: 'E-mail',
                            type: 'email',
                            value: 'johnconnor@skynet.com'
                        },
                        type: {
                            label: 'Type',
                            type: 'select',
                            options: [
                                { value: 1, text: 'Human' },
                                { value: 2, text: 'Robot' }
                            ]
                        },
                        alive: {
                            label: 'Is alive',
                            type: 'checkbox',
                            value: true
                        },
                        loves: {
                            label: 'Loves',
                            type: 'checkbox',
                            value: ['bike', 'mom', 'vg'],
                            options: [
                                { value: 'bike', text: 'Motorbike' },
                                { value: 'mom', text: 'His mom' },
                                { value: 'vg', text: 'Video games' },
                                { value: 'kill', text: 'Killing people' }
                            ]
                        },
                        passwd: {
                            label: 'Password',
                            type: 'password'
                        },
                        desc: {
                            label: 'Description',
                            type: 'textarea'
                        }
                    },
                    callback: function (values) {
                        console.log(values)
                    }
                });
            });
        });
    </script>
    <label>Адрес</label>
    <input id="address" type="text">
    <input id="btnAddress" type="button" value="..." />
    <input name="file" type="file" />
    <input type="button" value="Upload" />





     <div id='modal_dialog' style="top:-9999px; z-index:-9999">
     <div class='title'>
         Заголовок
    </div>
         <label>Регион</label>
         <input id="txtRegion" type='text' value='yes' />
         <br/>
    <input type='button' value='yes' id='btnYes' />
    <input type='button' value='no' id='btnNo' />
</div>

</asp:Content>
