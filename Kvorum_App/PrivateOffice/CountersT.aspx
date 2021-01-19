<%@ Page Title="" Language="C#" MasterPageFile="~/PrivateOffice/Private.Master" AutoEventWireup="true" CodeBehind="CountersT.aspx.cs" Inherits="Kvorum_App.PrivateOffice.CountersT" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
      <style>
        .dataCnt {
            border:1px solid #ccc; padding:5px; margin: 0 15px 0 7px;
        }
    </style>
       <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/vendor/slick/slick.js"></script>
    <!--<script src="js/jquery.nicescroll.js"></script>-->
    <script src="js/jflickrfeed.min.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/jquery.spasticNav.js"></script>
    <script src="js/jquery.prettyphoto.js"></script>
    <script src="js/main.js"></script>
    <script src="js/Utilities.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
         <div class="row">
		<div class="container">
            <!-- left sidebar -->
            <div class="col-lg-3 "> 
                <div class="titleHeader">Личный кабинет</div>
                <ul class="sidebarNav sidebarGrnd">
                    <li>
                        <a class="" href="">Мои заявки</a>
                    </li>
                    <li>
                        <a class="" href="">Заказать услугу</a>
                    </li>
                    <li>
                        <a class="sideActive"  href="">Передать показания счётчиков</a>
                    </li>
                    <li>
                        <a class="" href="">Мои начисления и оплаты</a>
                    </li>
                    <li>
                        <a class="" href="">Мои уведомления</a>
                    </li>
                    <li>
                        <a class="" href="">Вопросы</a>
                    </li>
                    <li>
                        <a class="" href="">Профиль</a>
                    </li>
                </ul>

            </div>

            <div class="col-lg-9">

	            <ul class="breadcrumb">
			        <li class="active"><a href="#">Главная</a></li>
			        <li>Информация о Ваших счётчиках</li>
	            </ul>

				<h2 id="infoH">Информация о Ваших счётчиках</h2>

				<%--<!--gvs-->	
                 <div id="gvc">                
                     <h3 class="hdrG">Счётчик Горячего ВодоСнабжения № 1234567890</h3>
                <div class="space20"></div>

                <div>
                    Дата последней поверки <span class="dataCnt" id="dataLastVerifyG">28.02.2018</span>
                    Дата следующей поверки <span class="dataCnt" id="dataNextVerifyG">28.08.2018</span>
                </div>
                <div class="space20"></div>
                
                <div class="row">
                    <div class="col-lg-5">
                       	
                        <h4>История переданных показаний:</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>ГВС:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-7">
                        <h4>Передать показания счётчика ГВС:</h4>
              
                                 <span style="padding: 10px 0; margin: 0 10px 0 0;"><strong>ГВС</strong>:</span>
                                
                                        <input type="number" id="cntG" value="111.11" class="cntInpFld"/>
                                 
                                        <input type="submit" value="Передать показания" class="btn genBtn cntBtn"/>
                                   
                    </div>
                </div> <!-- gvs -->
              
                <div class="space30"></div>
                </div>

                <!--hvs-->	
                <div id="xvc">
                <h3 class="hdrX">Счётчик Холодного ВодоСнабжения № 1234567890</h3>
                <div class="space20"></div>

                <div>
                    Дата последней поверки <span class="dataCnt" id="dataLastVerifyX">28.02.2018</span>
                    Дата следующей поверки <span class="dataCnt" id="dataNextVerifyX">28.08.2018</span>
                </div>
                <div class="space20"></div>
                
                <div class="row">
                    <div class="col-lg-5">
                       	
                        <h4>История переданных показаний:</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>ХВС:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-7">
                        <h4>Передать показания счётчика ХВС:</h4>
              
                                 <span style="padding: 10px 0; margin: 0 10px 0 0;"><strong>ХВС</strong>:</span>
                                
                                        <input type="number" id="cntX" value="111.11" class="cntInpFld"/>
                                 
                                        <input type="submit" value="Передать показания" class="btn genBtn cntBtn"/>
                                   
                    </div>
                </div> <!-- hvs -->

                <div class="space30"></div>
                </div>
                <!--teplo-->		
                <div id="teplo">
                <h3 class="hdrT">Счётчик Теплоэнергии № 1234567890</h3>
                <div class="space20"></div>

                <div>
                    Дата последней поверки <span class="dataCnt" id="dataLastVerifyT">28.02.2018</span>
                    Дата следующей поверки <span class="dataCnt" id="dataNextVerifyT">28.08.2018</span>
                </div>
                <div class="space20"></div>
                
                <div class="row">
                    <div class="col-lg-5">
                       	
                        <h4>История переданных показаний:</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Теплоэнергия:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-7">
                        <h4>Передать показания счётчика теплоэнергии:</h4>
              
                                 <span style="padding: 10px 0; margin: 0 10px 0 0;"><strong>Теплоэнергия</strong>:</span>
                                
                                        <input type="number" id="cntT" value="111.11" class="cntInpFld"/>
                                 
                                        <input type="submit" value="Передать показания" class="btn genBtn cntBtn"/>
                                   
                    </div>
                </div> <!-- teplo -->

                <div class="space30"></div>
                </div>
                <!--electro-->		
                <div id="elek">
                <h3 class="hdrE">Счётчик Электроэнергии № 1234567890</h3>
                <div class="space20"></div>

                <div>
                    Дата последней поверки <span class="dataCnt" id="dataLastVerifyE">28.02.2018</span>
                    Дата следующей поверки <span class="dataCnt" id="dataNextVerifyE">28.08.2018</span>
                </div>
                <div class="space20"></div>
                
                <div class="row">
                    <div class="col-lg-5">
                       	
                        <h4>История переданных показаний:</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Т1:</th>
                                    <th>Т2:</th>
                                    <th>Т3:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-7">
                        <h4>Передать показания счётчика электроэнергии:</h4>
              
                                 <span style="padding: 10px 0; margin: 0 10px 0 0;"><strong>Электроэнергия</strong>:</span>
                                
                                        <input type="number" id="cntE" value="111.11" class="cntInpFld"/>
                                 
                                        <input type="submit" value="Передать показания" class="btn genBtn cntBtn"/>
                                   
                    </div>
                </div> <!-- electro -->

                <div class="space30"></div>
                </div>
                <!--gas-->		
                <div id="Gas">
                <h3 class="hdrGs">Счётчик Газа № 1234567890</h3>
                <div class="space20"></div>

                <div>
                    Дата последней поверки <span class="dataCnt" id="dataLastVerifyGs">28.02.2018</span>
                    Дата следующей поверки <span class="dataCnt" id="dataNextVerifyGs">28.08.2018</span>
                </div>
                <div class="space20"></div>
                
                <div class="row">
                    <div class="col-lg-5">
                       	
                        <h4>История переданных показаний:</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Газ:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-7">
                        <h4>Передать показания счётчика газа:</h4>
              
                                 <span style="padding: 10px 0; margin: 0 10px 0 0;"><strong>Газ</strong>:</span>
                                
                                        <input type="number" id="cntGs" value="111.11" class="cntInpFld"/>
                                 
                                        <input type="submit" value="Передать показания" class="btn genBtn cntBtn"/>
                                   
                    </div>
                </div> <!-- gas -->


           <div class="space30"></div>  
                    </div>--%>
            </div> <!-- main -->
        </div> <!-- container -->

    </div>	<!-- row -->
    <div class="space40"></div>
</asp:Content>
