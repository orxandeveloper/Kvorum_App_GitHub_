$(document).ready(function (){
	// гугловские поля ввода
	$('.posRel input').click(function(){
		$("label[for='" + this.id + "']").addClass("transp");
	});
	$('.posRel input').focusout(function(){
		$("label[for='" + this.id + "']").addClass("backLab");
		$("label[for='" + this.id + "']").removeClass("w-95");
	});
	$('.posRel select').click(function(){		
		$("label[for='" + this.id + "']").addClass("transp");
	});
	$('.posRel select').focusout(function(){
		$("label[for='" + this.id + "']").addClass("backLab");
		$("label[for='" + this.id + "']").removeClass("w-95");
	});


	
	// фон иконки телефона в шапке при наведении на номер
	$('.linkText').mouseover(function() {
		$( ".nav-link .fonCircle1" ).addClass("fonCircle2");
	});
	$('.linkText').mouseout(function() {
		$( ".nav-link .fonCircle1" ).removeClass("fonCircle2");
	});
	$( ".nav-link .fonCircle1" ).mouseover(function() {
		$(".nav-link .fonCircle1").addClass("fonCircle2");
		$('.linkText').addClass("linkText_hover");
	});
	$( ".nav-link .fonCircle1" ).mouseout(function() {
		$(".nav-link .fonCircle1").removeClass("fonCircle2");
		$('.linkText').removeClass("linkText_hover");
	});
	// фон иконки телефона в форме
	$('.linkText1').mouseover(function() {
		$( ".tel .bgDark-lg42" ).addClass("bgDark-lg_hover");
	});
	$('.linkText1').mouseout(function() {
		$( ".tel .bgDark-lg42" ).removeClass("bgDark-lg_hover");
	});
	$( ".tel .bgDark-lg42" ).mouseover(function() {
		$('.linkText1').addClass("linkText_hover");
	});
	$( ".tel .bgDark-lg42" ).mouseout(function() {
		$('.linkText1').removeClass("linkText_hover");
	});	
	$( ".tel img" ).mouseover(function() {
		$('.linkText1').addClass("linkText_hover");
	});
	$( ".tel img" ).mouseout(function() {
		$('.linkText1').removeClass("linkText_hover");
	});	
	// кнопка "вверх"
	$(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scroll-up').fadeIn();
        } else {
            $('.scroll-up').fadeOut();
        }
    });
    $('.scroll-up').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });
	
	// карусели
	$(".swiper-container").each(function(index, element){
		var $this = $(this);
		$this.addClass("instance-" + index);
		$this.find(".swiper-button-prev").addClass("btn-prev-" + index);
		$this.find(".swiper-button-next").addClass("btn-next-" + index);
		
		var swiper = new Swiper(".instance-" + index, {
		   slidesPerView: 1,
					loop: false,
					spaceBetween: 30,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'},
			nextButton: ".btn-next-" + index,
			prevButton: ".btn-prev-" + index
		});
	});

	// mobile version hides text in grey block
	if($(window).width() > 1000)
	{
		$( ".block .collapse" ).addClass("show");
		$( ".block .collapsed" ).addClass("d-none");	
	} else {
		$( ".block .collapse" ).removeClass("show");
		$( ".block .collapsed" ).removeClass("d-none");	
	}
	// modal filter on/off
	$('#filter').click(function(){
		$('.modal').toggle();
	});
	$('#close').click(function(){
		$('.modal').toggle();
	});
	// modal
	$('#close2').click(function(){
		$('.modal').toggle();
	});
	$('#regYes').click(function(){
		$('.vashReg').toggle();	
	});
});