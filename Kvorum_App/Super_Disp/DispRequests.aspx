<%@ Page Title="" Language="C#" MasterPageFile="~/Super_Disp/Super.Master" AutoEventWireup="true" CodeBehind="DispRequests.aspx.cs" Inherits="Kvorum_App.Super_Disp.DispRequests" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
        .NewRequest {
            background: rgb(232,232,232) !important
        }
    </style>
    <div class="col-lg-9half col-sm-12 p-0 min-vh-100 bgLightGrey3  ">
        <span class="h90"></span>
        <!--		<div class="w-100 pt-2 bgWhite pl-2">
				<ol class="list-inline list-unstyled mb-0">
					<li class="list-inline-item">
						<a href="te-metr.html">
							<img src="../../img/btn-left.svg" class="w16 mt-n1 mr-1" alt="">
						</a>
					</li>
					<li class="list-inline-item">
							<p class="gray1 font18">Счётчик ГВС № 8739003</p>
					</li>
				</ol>
			</div> -->

        <%--<div class="intern pt-4 pl-4 pr-3 pb-3">--%>

        <%--	<div class="swiper-container3 overflow-hidden">--%>
        <!-- <div class="swiper-pagination"></div> -->
        <%--<div class="swiper-wrapper shopTags mb-4 ">
	<div class="swiper-slide w-24 ">
			<div class="bgWhite rounded16 shadow">
			<div class="row m-0 p-3 h-100">
				<div class="col-sm-5 flexCenter m-0 p-0">
					<svg id="pie1" class="w90 h-90" viewBox="-1 -1 2 2"></svg>
					<span class="graphData  w72 h72 flexCenter font18">1233</span>
				</div>
				<div class="col-sm-7  m-0 p-0 text-left column-flex">
				
					<h4 class=" font22 font-weight-bold">Выполнено</h4>
					
					<p class="font16 gray1">Всего 3453 заявок </p>

					<div class="posRel mt-auto h36">
						<select id="jk1" class=" h36 pt-0 border gray1 font-weight-normal">
							<option value="0" selected>	За текущий месяц</option>
							<option value="1">За неделю</option>		  
						</select>
				
					</div>
				</div>
			</div>	
		</div>
	</div> <!-- slide -->
		<div class="swiper-slide w-24 ">
			<div class="bgWhite rounded16 shadow">
			<div class="row m-0 p-3 h-100">
				<div class="col-sm-5 flexCenter m-0 p-0">
					<svg id="pie2" class="w90 h-90" viewBox="-1 -1 2 2"></svg>
					<span class="graphData  w72 h72 flexCenter font18">1233</span>
				</div>
				<div class="col-sm-7  m-0 p-0 text-left column-flex">
				
					<h4 class=" font22 font-weight-bold">В процессе</h4>
					
					<p class="font16 gray1">Всего 3453 заявок </p>

					<div class="posRel mt-auto h36">
						<select id="jk2" class=" h36 pt-0 border gray1 font-weight-normal">
							<option value="0" selected>	За текущий месяц</option>
							<option value="1">За неделю</option>		  
						</select>
	
					</div>
				</div>
			</div>	
		</div>
	</div> <!-- slide -->
		<div class="swiper-slide w-24 ">
			<div class="bgWhite rounded16 shadow">
			<div class="row m-0  p-3 h-100">
				<div class="col-sm-5 flexCenter m-0 p-0">
					<svg id="pie3" class="w90 h-90" viewBox="-1 -1 2 2"></svg>
					<span class="graphData  w72 h72 flexCenter font18">1233</span>
				</div>
				<div class="col-sm-7  m-0 p-0 text-left column-flex">
				
					<h4 class=" font22 font-weight-bold">Новая</h4>
					
					<p class="font16 gray1">Всего 3453 заявок </p>

					<div class="posRel mt-auto h36">
						<select id="jk3" class=" h36 pt-0 border gray1 font-weight-normal">
							<option value="0" selected>	За текущий месяц</option>
							<option value="1">За неделю</option>		  
						</select>
			
					</div>
				</div>
			</div>	
		</div>
	</div> <!-- slide -->
	<div class="swiper-slide w-24 ">
			<div class="bgWhite rounded16 shadow">
			<div class="row m-0 p-3 h-100">
				<div class="col-sm-5 flexCenter m-0 p-0">
					<svg id="pie4" class="w90 h-90" viewBox="-1 -1 2 2"></svg>
					<span class="graphData  w72 h72 flexCenter font18">1233</span>
				</div>
				<div class="col-sm-7  m-0 p-0 text-left column-flex">
				
					<h4 class=" font22 font-weight-bold">Просрочена</h4>
					
					<p class="font16 gray1">Всего 3453 заявок </p>

					<div class="posRel mt-auto h36">
						<select id="jk4" class=" h36 pt-0 border gray1 font-weight-normal">
							<option value="0" selected>	За текущий месяц</option>
							<option value="1">За неделю</option>		  
						</select>
						<!-- <label for="jk4" class="w-95 transp backLab">Показывать</label> -->
					</div>
				</div>
			</div>	
		</div>
	</div> <!-- slide -->
	
</div>--%>
        <!-- swiper-wrapper -->
        <!--			<div class="p-5">&nbsp;</div>
	<div class="swiper-button-prev"><img src="../../img/btn-left.svg" class="" alt=""/></div>
    <div class="swiper-button-next"><img src="../../img/btn-right.svg" class="" alt=""/></div> -->
        <%--</div>--%>
        <!-- swiper-container -->




        <script>
            //var z1 = percents(1233, 3453);
            //var z2 = 1 - z1;
            //var obr1 = percents(2.3, 5);
            //var obr2 = 1 - obr1;
            //var otz1 = percents(2.3, 5);
            //var otz2 = 1 - obr1;
            //function percents(x1, x2) {
            //    return Math.round(x1 * 100 / x2) / 100;
            //}

            //var obr2 = 1 - obr1;
            //drawGraph('#pie1', z1, z2);
            //drawGraph('#pie2', obr1, obr2);
            //drawGraph('#pie3', otz1, otz2);
            //drawGraph('#pie4', otz2, otz1);
            //function drawGraph(id, p1, p2) {
            //    const svgEl = document.querySelector(id);
            //    const slices = [
            //        { percent: p1, color: 'Coral' },
            //        { percent: p2, color: 'CornflowerBlue' }
            //    ];
            //    let cumulativePercent = 0;

            //    function getCoordinatesForPercent(percent) {
            //        const x = Math.cos(2 * Math.PI * percent);
            //        const y = Math.sin(2 * Math.PI * percent);
            //        return [x, y];
            //    }

            //    slices.forEach(slice => {
            //        // destructuring assignment sets the two variables at once
            //        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);

            //        // each slice starts where the last slice ended, so keep a cumulative percent
            //        cumulativePercent += slice.percent;

            //        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

            //        // if the slice is more than 50%, take the large arc (the long way around)
            //        const largeArcFlag = slice.percent > .5 ? 1 : 0;

            //        // create an array and join it just for code readability
            //        const pathData = [
            //            `M ${startX} ${startY}`, // Move
            //            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
            //            `L 0 0`, // Line
            //        ].join(' ');

            //        // create a <path> and append it to the <svg> element
            //        const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            //        pathEl.setAttribute('d', pathData);
            //        pathEl.setAttribute('fill', slice.color);
            //        svgEl.appendChild(pathEl);
            //    });

            //};


            /*const pieCharts = document.querySelectorAll('[data-percentage]');
        data-percentage="75"
                if (pieCharts) {
                      for (let i = 0; i < pieCharts.length; i += 1) {
                        const slice = pieCharts[i];
                        const percentage = slice.getAttribute('data-percentage');
                        const circumference = 31.4;
                        const strokeDash = Math.round((percentage * circumference) / 100);
                        const strokeDashArray = `${strokeDash} ${circumference}`;
                        slice.setAttribute('stroke-dasharray', strokeDashArray);
                      }
                    }*/

        </script>

        <script>
            $(document).ready(function () {

                var swiper = new Swiper(".swiper-container3", {
                    slidesPerView: 'auto',
                    loop: false,
                    spaceBetween: 20
                }
                );
            });
        </script>


        <%--</div>--%>


        <div class="bgWhite row w-100 m-0 ">
            <div class="col-sm-12 p-0">

                <div id="TableTools" class="flexHoriz w-100 m-0 p-3 justify-content-between flexHoriz">
                    <div id="ListLength" class="posRel w-15 mb-0 mr-3">
                        <%--<select id="jk" class="h56 pt-0 mr-3 border  font-weight-normal">
                            <option value="0" selected>Показывать 20 записей</option>
                            <option value="1">Показывать 30 записей</option>
                        </select>--%>
                    </div>
                    <form id="SearchForTable" class="shadow-in border-wh mb-0 text-left w200 h56 te-posrel rounded-lg bgLightGrey3">
                        <div class="ml-2 pl-2 transp border-0">
                            <img src="../../img/search-ic.svg" class="w18" alt="">
                        </div>
                        <%-- <input class="w-100 transp border-0 ml-2 pr-2 pt-1" type="search" placeholder="Поиск заявки" aria-label="Search">--%>
                    </form>
                    <!--	<div class="flex-grow-1">&nbsp;</div> -->
                    <%-- <div class="ml-auto mb-0  posRel mr-3 w-15">
                        <select id="reg" class="h56 pt-0 border font-weight-normal">
                            <option value="0" selected>Красота и здоровье</option>
                        </select>
                        <!--<label for="reg" class="w-95">Статус</label> -->
                    </div>--%>
                    <%-- <div class="posRel mb-0  mr-3 w-15">
                        <select id="tip" class="h56 pt-0 border font-weight-normal">
                            <option value="0" selected>Услуга 1</option>

                        </select>
                        <label for="tip" class="w-95">Услуги</label>
                    </div>--%>
                    <%--  <div class="posRel mb-0 mr-3 w-15 ">
                        <select id="task" class="h56 border font-weight-normal">
                            <option value="0" selected>Группа услуг 1</option>

                        </select>
                        <label for="task" class="w-95">Группа услуг</label>
                    </div>--%>
                 <%--   <button class="btn2 btn1 mb-0 mr-3 outline shadow-none w56 h56 flexCenter ">
                        <img src="../../img/upload.svg" class="w16 reddishSvg" alt="" /></button>--%>
                       <button onclick="GotoCreateFunction()" class="btn2 btn1 mb-0 outline shadow-none w56 h56 flexCenter ">
                        <img src="../../img/ic-plus.svg" class="w16 reddishSvg" alt="" /></button>
                    <!--	<button class="btn btn1 outline shadow-none w42 h42 flexCenter">
					<img src="../../img/dreidots2.svg" class="" alt=""/></button>				-->
                </div>
                <div class="w-100 overflowX pt-1 pb-4">
                    <table class="mngTable w-100" id="DispSRequestTables">

                        <thead class="bgLightGrey">
                            <tr>
                                <th>№ Заявки </th>
                                <th>Заявитель</th>
                                <th>Адрес</th>
                                <th>№ помещения</th>
                                <th>Дата создания</th>
                                <th>Обращение абонента</th>
                                <th>Планируемая дата</th>
                                <th>Тип Заявок</th>
                                <th>Статус</th>
                                <th>Ответственный</th>
                                <th>Оплата</th>

                            </tr>
                        </thead>

                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="p-5 intern">
                </div>
                <!-- p-5 -->



            </div>
            <!-- main block -->
        </div>
        <!-- row -->
        </div>
</asp:Content>
