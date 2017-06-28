//------------------------------------------
//	Mobile Menu Touchslider
//-------------------------------------------
var mobileMenuTouchSlider = {
	log: function(msg) {
//		var p = document.getElementById('log');
//		p.innerHTML = p.innerHTML + "<br>" + msg;
	},
	
	createSlidePanel: function(/*string*/ panel, /*el width px*/ width) {	
		this.width = width;
	
		try {
			document.createEvent('TouchEvent');
			this.makeTouchable(panel);
		} catch (e) {
			//  Then we aren't on a device that supports touch
		} finally {					

		}
	},
		
	makeTouchable: function(/*string*/ panel) {
		$(panel).each(function() {
			this.addEventListener('touchstart', function(e) {
				mobileMenuTouchSlider.touchStart($(this), e);
			}, false);
				
			this.addEventListener('touchmove', function(e) {
				mobileMenuTouchSlider.touchMove($(this), e);
			}, false);		
				
			this.addEventListener('touchend', function(e) {		
				mobileMenuTouchSlider.touchEnd($(this), e);
			}, false);	
		});
	},		

	touchStart: function(/*JQuery*/ elem, /*event*/ e) {	
		this.startX = e.targetTouches[0].clientX;
		this.startY = e.targetTouches[0].clientY;
		this.slider = 0; 						// Starting sliding position	
		this.startRight = this.getRight(elem); 
		
//		this.log("startRight: " + this.startRight);
	},
		
	touchMove: function(/*JQuery*/ elem, /*event*/ e) { 
		var deltaX = e.targetTouches[0].clientX - this.startX;
		var deltaY = e.targetTouches[0].clientY - this.startY;
			
		if (( (this.slider === 0 ) ) &&
			( Math.abs(deltaY) > Math.abs(deltaX)) ) {				
			//Default sliding
			this.slider = -1; 					//Default sliding position
							
		} else if (this.slider != -1) {	
			//this sliding
			e.preventDefault();
			
			this.slider = 1; 					//this sliding position		
			var right = this.startRight - deltaX;;
			
			if (right > 0) {
				right = 0;
			} 		

			elem.css({
				right: right + 'px'
			});	
		}
	},	
		
	/*
		When the touch ends we need to adjust the panel position,
		hide or show it.  
	 */
	touchEnd: function(/*JQuery*/ elem, /*event*/ e) {
		this.doSlide(elem, e);
	},
		
	getRight: function(/*JQuery*/ elem) {
		 return parseInt(elem.css('right'), 10);  
	},
		
	doSlide: function(/*jQuery*/ elem, /*event*/ e) {
		var right = this.getRight(elem);		 
			 
		if ((Math.abs(right)) < ((this.width / 2))) {
			// Show panel
			elem.animate({right: 0 + 'px'}, 300); 
				
		} else {
			// Hide panel
			elem.animate({right: -this.width + 'px'}, 300, function(){
					$(this).hide();
				});	
			$('#js-body').css('overflow','auto'); //Scroll Propagation
		}
			 		 
		this.startX = null;
		this.startY = null;
	}
};

//------------------------------------------
//	Sales Special Touchslider
//-------------------------------------------
var touchslider = {
	log: function(msg) {
//		var p = document.getElementById('log');
//		p.innerHTML = p.innerHTML + "<br>" + msg;
	},
		
	createSlidePanel: function(/*string*/ gridid, /*int*/ cellWidth, /*int*/ padding) {
		var padding = padding || 0;
		var x = padding;
				
		$(gridid).each(function() {
			//<div class='special-offer-content'>	
			$(this).parent().css({ 
				margin: '0 auto',
				overflow: 'hidden'
			});
				
			//<ul class='offer clearfix js-offer'> === gridid
			$(this).css({	
				'left': '0px',		
				'list-style-type': "none",
//				'margin': '0',
				'padding': '0',
				'position': 'relative'
			});
				
			//<li class='offer-item js-offer-item'>
			$(this).children('.js-offer-item').each(function() {
				$(this).css({
					'height': '90%',
					'left': x + 'px',
					'position': 'absolute',
					'top': padding + 'px',
					'width': cellWidth + 'px'					
				});

				x += cellWidth + padding;
			});
			/*
			   Many of the mobile browsers resize the screen and therefore
			   don't give accurate information about the size of the window.
			   We need to save this information so we can use it later when
			   we're sliding the grid.
			 */
			touchslider.width = x;
			touchslider.colWidth = cellWidth + padding;
				
			try {
				//Touch events check
				document.createEvent('TouchEvent');
					
				//Make our panel respondto all of the touch events.
				touchslider.makeTouchable(gridid);
			} catch (e) {
				// Then we aren't on a device that supports touch
			} finally {
				//Starting Touch Area Size
				touchslider.touchAreaSize(gridid);
					
				//Resizing Touch Area Size
				$(window).resize(function(){ touchslider.touchAreaSize(gridid) });
					
				//Sliding by click
				$('.js-prev').on('click', function(){ touchslider.prevClick(gridid) });
				$('.js-next').on('click', function(){ touchslider.nextClick(gridid) });
			}
		});			
	},
				
	prevClick: function(gridid){ //to left
		var left = this.getLeft($(gridid));
		var maxDelta = this.width - parseInt($(gridid).parent().width(), 10);
		
		if ( (left % this.colWidth) === 0) { //No click during sliding
			left -=  this.colWidth;
		
			if (Math.abs(left) <= Math.abs(maxDelta)) {
				this.doSlide($(gridid), left, '0.5s');
			} 
		}
	},
		
	nextClick: function(gridid){ //to right
		var left = this.getLeft($(gridid));
		
		if ( (left % this.colWidth) === 0) { //No click during sliding
			left +=  this.colWidth;
	
			if(left <= 0){
				this.doSlide($(gridid), left, '0.5s');
			} 
		}
	},
		
	// Fit Touch Area to Elements Quantity
	touchAreaSize: function(gridid){
		$(gridid).parent().each( function(){ 
				var touchAreaWidth100 = parseInt($(this).css({width: '100%'}).css('width'), 10);
				var elNumber = parseInt(touchAreaWidth100 / touchslider.colWidth, 10);
				
				var touchAreaWidth = elNumber * touchslider.colWidth;
				
				$(this).css({ 
					width: touchAreaWidth 
				});
			});	
	},
		
	makeTouchable: function(/*string*/ gridid) {
		 $(gridid).each(function() {
			this.ontouchstart = function(e) {
				touchslider.touchStart($(this), e);
			};
				
			this.ontouchmove = function(e) {
				touchslider.touchMove($(this), e);
			};		
				
			this.ontouchend = function(e) {
				touchslider.touchEnd($(this), e);
			};
		});
	},		

	/**
	 * When the touch starts we add our sliding class a record a few
	 * variables about where the touch started.  We also record the
	 * start time so we can do momentum.
	 */
	touchStart: function(/*JQuery*/ elem, /*event*/ e) {
		 elem.css({
			'-ms-transition': 'left 0s',
			'-moz-transition': 'left 0s',
			'-o-transition': 'left 0s',
			'transition': 'left 0s'
		 });
			 
		this.startX = e.targetTouches[0].clientX;
		this.startY = e.targetTouches[0].clientY;
		this.slider = 0; 							// Starting sliding position
		this.startLeft = this.getLeft(elem);
		this.touchStartTime = new Date().getTime();
	},
		
	/**
	 * While they are actively dragging we just need to adjust the
	 * position of the grid using the place they started and the
	 * amount they've moved.
	 */
	touchMove: function(/*JQuery*/ elem, /*event*/ e) {
		var deltaX = e.targetTouches[0].clientX - this.startX;
		var deltaY = e.targetTouches[0].clientY - this.startY;
		
		if (( (this.slider === 0 ) ) &&
			( Math.abs(deltaY) > Math.abs(deltaX)) ) {		
			
			//Default sliding			
			this.slider = -1; 							//Default sliding position
			
		} else if (this.slider != -1) {		
			//this sliding
			e.preventDefault();
			this.slider = 1; 							//this sliding position
			
			var left = deltaX + this.startLeft;
			
			elem.css({
				left: left + 'px'
			});
			 
			if (this.startX > e.targetTouches[0].clientX) {
				//Sliding to the left
				this.slidingLeft = true;
			} else {
				// Sliding to the right
				this.slidingLeft = false;
			}
		}
	},	
		
	/**
	 * When the touch ends we need to adjust the grid for momentum
	 * and to snap to the grid.  We also need to make sure they
	 * didn't drag farther than the end of the list in either
	 * direction.
	 */
	touchEnd: function(/*JQuery*/ elem, /*event*/ e) {
		if (this.getLeft(elem) > 0) {
			// This means they dragged to the right past the first item
			this.doSlide(elem, 0, '1s');
		 
			this.startX = null;
		} else if ( Math.abs(this.getLeft(elem))  > ( this.width - elem.parent().width() )) {
			// This means they dragged to the left past the last item
			this.doSlide(elem, '-' + (this.width - elem.parent().width()), '1s');
			 
			this.startX = null;
		} else {
			/*
				This means they were just dragging within the bounds of the grid
				and we just need to handle the momentum and snap to the grid.
			*/
			this.slideMomentum(elem, e);
		}
	},
		
	/**
	 * A little helper to parse off the 'px' at the end of the left
	 * CSS attribute and parse it as a number.
	 */
	getLeft: function(/*JQuery*/ elem) {
		 return parseInt(elem.css('left'), 10);  //.substring(0, elem.css('left').length - 2), 10);
	},

	doSlide: function(/*jQuery*/ elem, /*int*/ x, /*string*/ duration) { 
		elem.css({
			left: x + 'px',
			'-ms-transition': 'left ' + duration,
			'-moz-transition': 'left ' + duration,
			'-o-transition': 'left ' + duration,
			'-webkit-transition': 'left ' + duration,
			'transition': 'left ' + duration
		 });
			 
		if (x === 0) {
			$('.js-next').removeClass('is-active');
			$('.js-prev').addClass('is-active');
		} else if (Math.abs(x) === this.width - parseInt(elem.parent().width(), 10) ){
			$('.js-prev').removeClass('is-active');
			$('.js-next').addClass('is-active');
		} else {
			$('.js-prev').addClass('is-active');
			$('.js-next').addClass('is-active');
		}
	},	
		
	/**
	 * If the user drags their finger really fast we want to push 
	 * the slider a little farther since they were pushing a large 
	 * amount. 
	*/
	slideMomentum: function(/*jQuery*/ elem, /*event*/ e) {
		var slideAdjust = (new Date().getTime() - this.touchStartTime) * 65;
		var left = this.getLeft(elem);
			 
		/*
		We calculate the momentum by taking the amount of time they were sliding
		and comparing it to the distance they slide.  If they slide a small distance
		quickly or a large distance slowly then they have almost no momentum.
		If they slide a long distance fast then they have a lot of momentum.
		*/
			 
		var changeX = 12000 * (Math.abs(this.startLeft) - Math.abs(left));
			 
		slideAdjust = Math.round(changeX / slideAdjust);
			 
		var newLeft = left + slideAdjust;
			 
		/*
		 * We need to calculate the closest column so we can figure out
		 * where to snap the grid to.
		 */
		var t = newLeft % this.colWidth;
			 
		if ((Math.abs(t)) > ((this.colWidth / 2))) {
			/*
			* Show the next cell
			*/
			newLeft -= (this.colWidth - Math.abs(t));
		} else {
			/*
			 * Stay on the current cell
			 */
			newLeft -= t;
		}
			 
		if (this.slidingLeft) {
			var maxLeft = parseInt('-' + (this.width - elem.parent().width()), 10);
			/*
			 * Sliding to the left
			*/
			this.doSlide(elem, Math.max(maxLeft, newLeft), '0.5s');
		} else {
			/*
			 * Sliding to the right
			 */
			this.doSlide(elem, Math.min(0, newLeft), '0.5s');
		}
			 
		this.startX = null;
	}
};	


jQuery(document).ready(function(){

	//------------------------------------------
	//	Mobile menu (main)
	//-------------------------------------------
	//Dropnav Open Menu
	function menuSlideIn(event){
		event.preventDefault();		
		$('.js-dropnav').show().animate({right: "0px"}, 700);
		$('#js-body').css('overflow','hidden'); //Stop Scroll Propagation
	}
	
	//Dropnav Close Menu
	function menuSlideOut(event){
		var winSize = window.innerWidth;
		var displ = $('.js-dropnav').css("display");
		var right = $('.js-dropnav').css("right");
		var mthMenuIcon = $(event.target).is('.js-openBtn-link'); // true | false
		var mthMenuIconEls = $('.js-openBtn-link').has(event.target); // array
		var mthHdNav = $(event.target).is('.js-dropnav');		
		var mthHdNavEls = $('.js-dropnav').has(event.target);	
		
		if ( winSize > 1000 || right === "-260px" ||
			 mthMenuIcon || (mthMenuIconEls.length > 0) || 
			 mthHdNav || (mthHdNavEls.length > 0) ) {
			
			return true;
			
		} else if ( displ === "block" ) {
			
			event.preventDefault();		
			$('.js-dropnav').animate({right: "-260px"}, 700, function(){
				$(this).hide();
			});
			$('#js-body').css('overflow','auto'); //Scroll Propagation
		}
	}	
	
	$('.js-openBtn-link').on('click', menuSlideIn);
	$(document).on('click touchstart', menuSlideOut);

	//	Mobile Menu Touchslider Start	
	mobileMenuTouchSlider.createSlidePanel('.js-dropnav', 260);	
	
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
	$('.js-sales-nav-item:first-child').on('mouseover', function(event){
		event.preventDefault();
		
		$('.js-sales-panel').css('border-top-left-radius', '0');
	});
	
	$('.js-sales-nav-item:first-child').on('mouseleave', function(event){
		event.preventDefault();
		
		$('.js-sales-panel').css('border-top-left-radius', '5px');
	});	
	
	
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
	
	
	//------------------------------------------
	//	Sales Special Offer Touch
	//-------------------------------------------
	touchslider.createSlidePanel('.js-offer', 215);
	

});
