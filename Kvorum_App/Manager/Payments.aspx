<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="Payments.aspx.cs" Inherits="Kvorum_App.Manager.Payments" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <style>
        label { line-height: 1em;
                padding: 10px 0;}
        #tr1 {background:#fff;}
        #tr1:hover {background:#f3f3f3;
        }
        select {width:100%;}
    </style>
    <style>
        .modalBnp {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 2000; /* Sit on top */
            padding-top: 100px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color:rgba(9, 118, 255, 0.4); /* Black w/ opacity */
        }

        /* Modal Content */
        .modal-contentBnp {
            position: relative;
            background-color: #fefefe;
            margin: auto;
            padding: 0;
            border: 1px solid #888;
            width: 57%;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
            -webkit-animation-name: animatetop;
            -webkit-animation-duration: 0.4s;
            animation-name: animatetop;
            animation-duration: 0.4s
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
        .closebnp {
            color: black;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }
        .mhbnp{text-align: left;
    color: black;}
            .close2:hover,
            .close2:focus {
                color: #000;
                text-decoration: none;
                cursor: pointer;
            }

        .modal-headerBnp {
                background-color: white;
            padding: 2px 16px;
             
            color: white;
        }

        .modal-bodybnp {
            height: 100px;
                display: inline-block;
                padding: 15px;
            padding: 2px 16px;
        }

        .modal-footer2 {
            padding: 2px 16px;
            background-color: red;
            color: white;
            height: 45px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <h2>Начисления и платежи</h2>
       <h4 style="padding-left:20px;">Фильтр</h4>
    <div class="row" style="padding-left:20px;margin-right: -15px;">
        <div class="col-md-6 col-xs-12">
                <label for="appType">Тип помещения</label>
                <select id="appType">
                    <option>Апартаменты</option>
                </select>
                <br />

                <label for="appNum">Номер помещения</label>
                <select>
                    <option>1</option>
                </select>
                <br />
                <label for="persAcc">Номер ЛС:</label>
                <input type="text" id="persAcc" value=""/>
        </div>
        <div class="col-md-6 col-xs-12">
              <label for="fromDate"  style="display:inline-block;">Период с&nbsp;</label>
               <input id="fromDate" type="date" style="width:35%;"/>
             
               <input id="toDate" type="date" style="float:right;width:35%;"/>
                <label for="toDate" style="float:right;">по&nbsp;</label>
               <br />
               <label>Тип начисления/платежа:</label>
               <select>
                   <option>ЖКУ</option>
                   <option>КР</option>
               </select>

       
                <div style="clear:both;">&nbsp;</div>
               <div style="text-align:right;white-space:nowrap;">
                    <button class="btn genBtn">Поиск</button> <button id="UplPayment" class="btn genBtn" style="background:#393;">Загрузить начисления и платежи</button>
            </div>
        </div>
    </div> <!-- row -->
    <div style="clear:both;">&nbsp;</div> 

       
                <table class="table" style="margin:20px 0 0 0;">
                    <thead><tr>
                        <td>Период</td>
                        <td>Остаток на начало периода (-/+)</td>
                        <td>Начислено</td>
                        <td>Поступило</td>
                        <td>Итого к оплате</td>
                        <td>Оплатить до:</td>
                    </tr>
                    </thead>
                    <tbody><tr id="tr1">
                        <td>Август 2017</td>
                        <td>-617,79</td>
                        <td>1573,41</td>
                        <td>620,00</td>
                        <td>1571,2</td>
                        <td>10.09.2017
                            <span style="float:right;">
                                <a href="#" title="Сохранить"><i class="fa fa-floppy-o"></i></a>
                                <a href="#" title="Распечатать"><i class="fa fa-print"></i></a>
                            </span>
                        </td>
                    </tr>
                    <tr id="table1">
                        <td colspan="6">
                            <table class="table" style="margin:0;" id="servicesList">
                                <tr>
                                    <td style="width:12%;"></td>
                                    <td style="width:20%;">Услуга 1</td>
                                    <td style="width:10%;">123,00</td>
                                    <td style="width:12%;"></td>
                                    <td style="width:12%;"></td>
                                    <td style="width:15%;"></td>
                                    <td style="width:16.5%;"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>   
                    <tr>
                        <td>Июль 2017</td>
                        <td>-1896,14</td>
                        <td>1721,65</td>
                        <td>3000,00</td>
                        <td>617,79</td>
                        <td>10.08.2017</td>
                    </tr>
                    <tr>
                        <td>Июнь 2017</td>
                        <td>0,00</td>
                        <td>1896,14</td>
                        <td>0,00</td>
                        <td>1896,14</td>
                        <td>10.07.2017</td>
                    </tr></tbody>
                </table>
        <div style="clear:both; height:30px;">&nbsp;</div> 


    
       <br /><hr /><br />

        
    <br /><hr /><br />
    <div id="loadBillTemplate" style="width:auto;border:1px solid #ccc;display:none">
         <h2 style="padding:10px 20px;">Загрузка квитанций</h2>
         <div style="padding-left:20px;">
            <input type="file"  />
            <br />
            <label>Следующие файлы будут загружены:</label>
   
            <div style="width:auto; height: 75px; overflow-y:auto; border:1px solid #f3f3f3; padding:5px; margin-right:20px;">
                4763578.pdf<br />
                86464838.pdf<br />
                4763578.pdf<br />
                86464838.pdf<br />
                763578.pdf<br />
                86464838.pdf<br />
                4763578.pdf<br />
                86464838.pdf<br />
                27627627.pdf
            </div>

            <br />
            <button class="btn logBtn">Загрузить</button>
            <div style="clear:both;height:10px;">&nbsp;</div>

        </div>
  
    </div> <!-- loadBillTemplate -->
    <div style="clear:both;height:20px;">&nbsp;</div>

    <div id="msgOK" style="display:block; color:#393;">Данные загружены</div>
    <div id="msgErr" style="display:none; color:#933;">Для некоторых лицевых счетов обнаружено дублирование данных по услугам!<br />
           Пожалуйста, удалите некорректные данные.</div>
  
    <div id="ModalBNP" class="modalBnp" style="display:  none;">

  <!-- Modal content -->
  <div class="modal-contentBnp">
    <div class="modal-headerBnp"  >
      <span class="closebnp"  id="closebnp">×</span>
       
    </div>
    <div class="modal-bodybnp" >
        <div id="loadBnP" style="width: 100%;margin-top: 24px;">



         <h2 style="padding-top:10px;">Загрузка начислений и платежей</h2>
         <div id="sled" style="padding-left:20px;">
             <br />
            <label>Объект:</label>
             <select id="ObjBnp" style="width:25%">
                
            </select>
            
            <br />
      
            <input type="file" onchange="BNPFileChange(this)" id="fileBnP" />
            <br />
            
             <a href="../img/Форма загрузки начислений и платежей.xlsx">Форма для загрузки начислений и платежей</a>
            <br />

            <br />
            <p>Следующие данные будут загружены:</p>
 
         </div>
         <table class="table" style="width:auto; margin:20px;">
             <thead> 
                   <tr>
                    <th>ЛС</th>
                    <th>Период</th>
                    <th>Услуга</th>
   				    <th>Тип услуги</th>
                    <th>Остаток на начало периода</th>
                    <th>Начислено</th>
                    <th>Поступило</th>
                    <th>Остаток на конец периода</th>
                    </tr></thead>
                <tbody id="tblBnp">  

                
                 </tbody>
            </table>
            <br />
            <div style="padding-left:20px;">
                <button id="loadPmnt" class="btn logBtn">Загрузить</button>
              <!--  <button class="btn logBtn" style="background:#ccc">Отмена</button> -->
            </div>
            
            <div style="clear:both;height:10px;">&nbsp;</div>
        </div>
        </div>
      </div>
        </div>
   <%-- <script>
        $( "#tr1" ).click(function() {
          $( "#table1" ).toggle( "slow" );
        });
    </script>--%>
</asp:Content>
