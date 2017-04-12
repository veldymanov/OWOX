jQuery(document).ready(function(){

//------------------------------------------
//	Mobile menu (main)
//-------------------------------------------

	function dropnavOpen(event){
		event.preventDefault();		
		$('.js-dropnav').css('display', 'block');
	}
	
	$('.js-openBtn-link').on('click', dropnavOpen);
	
	$('.js-mobnav-item-link').on('click', dropnavOpen);
	
	$('.js-closeBtn-link').on('click', function (event){
		event.preventDefault();	
		
		$('.js-dropnav').css('display', 'none');		
	});
	
	$(document).on('click', function(event){ 
		var elTrgMatch = $(event.target).is('.js-dropnav, .js-openBtn-link, .js-mobnav-item-link');
		var elTrgMatch1 = $('.js-dropnav').has(event.target);
		if(!(elTrgMatch) && !(elTrgMatch1.length > 0)) {
			event.preventDefault();
			
			$('.js-dropnav').css('display', 'none');
		}
	});

//------------------------------------------
//	Info
//-------------------------------------------
	
	$('.js-panels-nav-item-link').on('click', function(event){
		event.preventDefault();
		
		$('.js-panel').removeClass('is-active');
		$('.js-panels-nav-item').removeClass('is-active');
		
		var thisElement = $(this).closest('.js-panels-nav-item');
		var thisArrayIndex = $('.js-panels-nav-item').index(thisElement);
		
		thisElement.addClass('is-active');
		$('.js-panel').eq(thisArrayIndex).addClass('is-active');	
	});

//------------------------------------------
//	Sales
//-------------------------------------------	

	$('.js-sales-openBtn').on('click', function(event){
		event.preventDefault();
		
		$('.js-sales-mobnav').css('display', 'block');
	});
	
	
	function salesIsActive(event){ 
		event.preventDefault();

		$('.js-sales-nav-item').removeClass('is-active');
		$('.js-sales-panel').removeClass('is-active');	

		var salesNavIndex = $('.js-sales-nav-item').index(this);
		var salesMobileNavIndex = $('.js-sales-mobnav-item').index(this);
		var thisArrayIndex;
		
		if (salesNavIndex >= 0) {
			thisArrayIndex = salesNavIndex;			
		} else if (salesMobileNavIndex >= 0){
			thisArrayIndex = salesMobileNavIndex;
			
			$('.js-sales-mobnav').css('display', 'none');
		}
		
		$('.js-sales-nav-item').eq(thisArrayIndex).addClass('is-active');
		$('.js-sales-panel').eq(thisArrayIndex).addClass('is-active');				
	}
	
	$('.js-sales-nav-item').on('click', salesIsActive);
	$('.js-sales-mobnav-item').on('click', salesIsActive);
	
});
