<%@ Page Title="" Language="C#" MasterPageFile="~/Client_Admin/Client.Master" AutoEventWireup="true" CodeBehind="InfoUO.aspx.cs" Inherits="Kvorum_App.InfoUO" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      
<div class="p-4">

        <h2  id="CompName" class=" font24b textBlack ml-0 pb-4">Объекты</h2> <!-- h2New -->

     
 </div>
        <div class="row w-100 m-0 min-vh-100">
            <div class="col-sm-12 p-0">

          
                 <div class="overflowX w-100">
         <table class="mngTable w-100 formTable">
            <thead>
                <tr>
                  <th>Наименование документа</th>
                  <th>Документ</th>
                </tr>
            </thead>
             <tr>
                 <td>Форма 1.1. Общая информация об управляющей организации, товариществе, кооперативе</td>
                 <td>
                      <label id="F1_T" style="display: none;color:red"></label>
                  <%--   <a href="1">Форма 1.1</a>
                     <a class="delete" href="1"><i class="fa fa-times-circle" aria-hidden="true"></i></a>
                                <br />--%>
                     <input style="display:none"   type="file" id="F1" name="name" value="" />
                     <%--<button onclick="clFunc(F1)" class="btn genBtn">Загрузить новый домент</button>--%>
                     <input type="button" class="btn genBtn"  onclick="clFunc('#F1')" name="name" value="Загрузить новый документ" />
                 </td>
             </tr>
             <tr>
                 <td>Лицензия</td>
                 <td>
                     <label id="F2_T" style="display: none;color:red"></label>
                   <%--  <a href="1">Лицензия</a>
                     <a class="delete" href="1"><i class="fa fa-times-circle" aria-hidden="true"></i></a>
                                <br />--%>
                     <input style="display:none" type="file" id="F2" name="name" value="" />
                     <%--<button  onclick="clFunc(F2)" class="btn genBtn">Загрузить новый домент</button>--%>
                      <input type="button" class="btn genBtn" onclick="clFunc('#F2')" name="name" value="Загрузить новый документ" />
                 </td>
             </tr>
             <tr>
                 <td>Форма 1.2. Сведения об основных показателях финансово-хозяйственной деятельности управляющей организации</td>
                 <td>
                     <label id="F3_T" style="display: none;color:red"></label>
                    <%-- <a href="1">Форма 1.2 за 2016</a>
                     <a class="delete" href="1"><i class="fa fa-times-circle" aria-hidden="true"></i></a>
                                <br />
                     <a href="1">Форма 1.2 за 2017</a>
                     <a class="delete" href="1"><i class="fa fa-times-circle" aria-hidden="true"></i></a>
                                <br />--%>
                    
                     <input style="display:none" type="file" id="F3" name="name" value="" />
                     <%--<button  onclick="clFunc(F3)" class="btn genBtn">Загрузить новый домент</button>--%>
                     <input type="button" class="btn genBtn" onclick="clFunc('#F3')" name="name" value="Загрузить новый документ" />
                 </td>
             </tr>
             <tr>
                 <td>Форма 1.3. Информация о привлечении управляющей организации, товарищества, кооператива, должностных лиц указанной организации, товарищества, кооператива к административной ответственности за нарушения в сфере управления многоквартирными домами (заполняется по каждому факту привлечения)</td>
                 <td>
                     <label id="F4_T" style="display: none;color:red"></label>
                    <%-- <a href="1">Форма 1.3</a>
                     <a class="delete" href="1"><i class="fa fa-times-circle" aria-hidden="true"></i></a>
                                <br />--%>
                     <input style="display:none" type="file" id="F4" name="name" value="" />
                    <%-- <button  onclick="clFunc(F3)" class="btn genBtn">Загрузить новый домент</button>--%>
                     <input type="button" class="btn genBtn" onclick="clFunc('#F4')" name="name" value="Загрузить новый документ" />
                 </td>
             </tr>
             <tr>
                 <td class="left raskr-inf-UO">Форма 1.4. Перечень многоквартирных домов, управление которыми осуществляют управляющая организация, товарищество, кооператив</td>
                 <td>
                     <label id="F5_T" style="display: none;color:red"></label>
                     <%--<a href="1">Форма 1.4</a>
                     <a class="delete" href="1"><i class="fa fa-times-circle" aria-hidden="true"></i></a>
                                <br />--%>
                      <input style="display:none" type="file" id="F5" name="name" value="" />
                     <%--<button  onclick="clFunc(F4)" class="btn genBtn">Загрузить новый домент</button>--%>
                     <input type="button" class="btn genBtn" onclick="clFunc('#F5')" name="name" value="Загрузить новый документ" />
                 </td>
             </tr>
             <tr>
                 <td class="left raskr-inf-UO">Форма 1.5. Перечень
 многоквартирных домов, в отношении которых договоры управления с управляющей организацией были расторгнуты в предыдущем календарном году; перечень многоквартирных домов, собственники помещений в которых в предыдущем календарном году на общем собрании приняли решение о прекращении их объединения в товарищества для совместного управления общим имуществом в многоквартирных домах, а также перечень многоквартирных домов, в которых членами кооперативов в предыдущем календарном году на их общем собрании приняты решения о преобразовании кооперативов в товарищества</td>
                 <td>
                     <label id="F6_T" style="display: none;color:red"></label>
                     <%--<a href="1">Форма 1.5</a>
                     <a class="delete" href="1"><i class="fa fa-times-circle" aria-hidden="true"></i></a>
                                <br />--%>
                     <input style="display:none" type="file" id="F6" name="name" value="" />
                     <input type="button" class="btn genBtn" onclick="clFunc('#F6')" name="name" value="Загрузить новый документ" />
                 </td>
             </tr>
         </table>
         <div class="buttons">
             <button id="savInfo" class="btn btn-default logBtn" type="button" ><strong>Сохранить</strong></button>
             <button id="back_Uo" class="btn btn-default logBtn" id="INfoU">Назад</button>
                    
                  
                </div>
      </div>


             
            </div>
        </div>
  
   
</asp:Content>
