<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="NewsRegister.aspx.cs" Inherits="Kvorum_App.Manager.NewsRegister" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <h2>НОВОСТИ</h2>
    <div class="button">
            <a class="create" href="CreateNews.aspx"><i class="fa fa-plus-square-o" aria-hidden="true"></i>&nbsp;Создать</a>
        </div>
     <table id="tblNews">
        <thead><tr>
             <th>Дата и время</th>
            <th>Заголовок новости</th>
            <th>Автор</th>
            <th>Важность</th>
            <th>Закреплено</th>
            <th>Проект</th>
            
        </tr>
        </thead>
        <tbody id="newsBody">
            <%--   <tr role="row" class="odd"> 
                        <td class="sorting_1"><a href="http://172.20.20.115/Manager/Apartments.aspx#" onclick="GoTo(7100)">28.06.2019 15:30</a></td> 
                        <td><a href="http://172.20.20.115/Manager/Apartments.aspx#" onclick="GoTo(7100)">Они пришли с миром</a></td> 
                        <td><a href="http://172.20.20.115/Manager/Apartments.aspx#" onclick="GoTo(7100)">УФО</a></td> 
                        <td><a href="http://172.20.20.115/Manager/Apartments.aspx#" onclick="GoTo(7100)"><i style="" data-icon="w" class="fa fa-check" aria-hidden="true"></i></a></td> 
                        <td><a href="http://172.20.20.115/Manager/Apartments.aspx#" onclick="GoTo(7100)"><i style="" data-icon="w" class="fa fa-minus" aria-hidden="true"></i></a></td> 
                        <td><a href="http://172.20.20.115/Manager/Apartments.aspx#" onclick="GoTo(7100)">ЖК Суббота</a></td> 

                </tr> --%>
        </tbody>
    </table>
</asp:Content>
