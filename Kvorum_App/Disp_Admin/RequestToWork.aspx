<%@ Page Title="" Language="C#" MasterPageFile="~/Disp_Admin/Dispatcher.Master" AutoEventWireup="true" CodeBehind="RequestToWork.aspx.cs" Inherits="Kvorum_App.Disp_Admin.RequestToWork" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
       <h2>Заявка №00435</h2>
        
    
         <form >
                
                   
         <div class="soderjanie">
                 <div class="status">
                   
                   Статус заявки: <span class="statusOK"><i class="fa fa-check-circle-o" aria-hidden="true"></i> В работе</span>
                     <br />
                    <label>Оплачено</label>
                    <input type="checkbox" />
                 </div>  
              <br />
                <input type="checkbox" checked disabled /><label>Аварийное обращение </label>
                    <br /><br />
                <label>Создан</label>
                <span>16.09.2017 10:14:17</span>
               <br />
                <label>Адрес</label>
                <span>г. Москва, ул. Полевая, д.12, корп.2</span>
               <br />
                <label>Заказчик</label>
                <span>Иванов Иван</span>
               <br />
                <label>Номер телефона</label>
                <span>+79654378210</span>
               <br />
                <label>Список услуг / товаров</label>
                
                <table><thead>
                    <tr>
                        <th>Наименование услуги/товара</th>
                        <th>Кол-во</th>
                        <th>Стоимость</th>
                        
                    </tr></thead><tbody>
                    <tr>
                        <td>Автомойка-Мойка автомобииля "Стандарт"</td>
                        <td>1</td>
                        <td>450</td>
                        
                    </tr>
                    <tr>
                        <td>Шиномонтаж-Балансировка колеса</td>
                        <td>4</td>
                        <td>1200,00</td>
                        
                    </tr></tbody>
                </table>
                    
               <br />
                
                <label>Тип доставки</label>
               <span>Курьером</span>
                
              <br />
                <label>Стоимость доставки</label>
                <a>250</a>
               <br />
                <label>Итоговая стоимость</label>
                <a>1000 руб</a>
              <br />
                <label>Исполнитель</label>
                <span>Исполнитель</span>
              <br />
                <label>Ответственный по заявке</label>
                <span>ФИО ответственного</span>
               <br />
                 <label>Планируемая дата и время выполнения заявки</label>
                    <span>15.11.2017 15:23:35</span>
              <br />
                <label>Описание заявки</label><br />
                <textarea class="opisanie" disabled></textarea>
              <br />
               
                 <label>История комментариев</label><br />
                 <textarea disabled>
- Не могли бы объяснить сложившуюся сумму?
сегодня в 12:18
- Да, конечно. 450 - мойка автомобиля "Стандарт", 450- мойка двигателя.
сегодня в 12:28
                 </textarea>
                <br />
                 <label>Комментарий</label>
                 <textarea name="text"></textarea>
                 <input type="submit" value="Отправить"  class="btn btn-default logBtn"/>
         <br />
                <label for="knop">Прикрепить файл к заявке</label>
                 <input id="knop" type="file" />
</div>
      

               <div class="buttons">
                    <button id="Vipolnena" class="btn btn-default logBtn" type="button" style="background-color:rgb(0,147,233);">Работа выполнена</button>
                    <button id="back_O" class="btn btn-default logBtn" type="button" style="background-color:rgb(149,153,156);">Отменить заявку</button>
                  
                </div>

               </form> 
</asp:Content>
