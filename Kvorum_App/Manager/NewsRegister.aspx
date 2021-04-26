<%@ Page Title="" Language="C#" MasterPageFile="~/Manager/Manager.Master" AutoEventWireup="true" CodeBehind="NewsRegister.aspx.cs" Inherits="Kvorum_App.Manager.NewsRegister" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

<script>
$(document).ready(function() {
	$('.navbar-nav .nav-link').each(function( ) { if ($(this).hasClass('active')) {$(this).toggleClass('active');} });
	$('.navbar-nav .nav-link:nth-child(2)').toggleClass('active');
});
</script>
  
<div class="row w-100 m-0 min-vh-100">
	<div class="col-sm-12 p-0">
	  
		<div class="flexHoriz w-100 p-4">
			<h2 class="font24b ">Новости</h2>
	  

<a class="btn btn1 create outline shadow-none ml-auto flexCenter w56 h56" href="CreateNews.aspx" title="Создать">
	<img src="../img/load-more.svg" class="w24" alt=""></a>
			
            
        </div>
		
		
     <table id="tblNews" class="mngTable w-100">
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
            <%--   <tr role="row" class="odd">                         <td class="sorting_1"><a href="http://172.20.20.115/Manager/Apartments.aspx#" onclick="GoTo(7100)">28.06.2019 15:30</a></td> 
                        <td><a href="http://172.20.20.115/Manager/Apartments.aspx#" onclick="GoTo(7100)">Они пришли с миром</a></td> 
                        <td><a href="http://172.20.20.115/Manager/Apartments.aspx#" onclick="GoTo(7100)">УФО</a></td> 
                        <td><a href="http://172.20.20.115/Manager/Apartments.aspx#" onclick="GoTo(7100)"><i style="" data-icon="w" class="fa fa-check" aria-hidden="true"></i></a></td> 
                        <td><a href="http://172.20.20.115/Manager/Apartments.aspx#" onclick="GoTo(7100)"><i style="" data-icon="w" class="fa fa-minus" aria-hidden="true"></i></a></td> 
                        <td><a href="http://172.20.20.115/Manager/Apartments.aspx#" onclick="GoTo(7100)">ЖК Суббота</a></td>                </tr> --%>
        </tbody>
    </table>
	
	</div></div>
</asp:Content>
