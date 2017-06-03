
jQuery(document).ready(function(){

//------------------------------------------
//	Mobile menu (main)
//-------------------------------------------
	function dropnavOpen(event){
		event.preventDefault();		
		$('.js-dropnav').css('display', 'block');
		$('.js-closeBtn-link').css('display', 'block');	
	}
	function dropnavClose(event){
		event.preventDefault();	
		$('.js-dropnav').css('display', 'none');
		$('.js-closeBtn-link').css('display', 'none');			
	}
	
	$('.js-openBtn-link').on('click', dropnavOpen);
	$('.js-mobnav-item-link').on('click', dropnavOpen);
	$('.js-closeBtn-link').on('click', dropnavClose);
	
	$(document).on('click', function(event){ 
		var elTrgMatch = $(event.target).is('.js-dropnav, .js-openBtn-link, .js-mobnav-item-link');
		var elTrgMatch1 = $('.js-dropnav').has(event.target);
		if(!(elTrgMatch) && !(elTrgMatch1.length > 0)) {
			event.preventDefault();
			
			dropnavClose(event);
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
	
	touchslider = {
		output: function(/*string*/ msg) {
			if (console) {
				console.info(msg);
			}
		},
		
		/**
		 * We start by creating the sliding grid out of the specified
		 * element.  We'll look for each child with a class of cell when
		 * we create the slide panel.
		 */
		createSlidePanel: function(/*string*/ gridid, /*int*/ cellWidth, /*int*/ padding) {
			var x = padding;
				
			$(gridid).each(function() {
				$(this).css({
					'position': 'relative',
					'left': '0px'
				});
				
				$(this).parent().css({ 
						margin: '0 auto',
						overflow: 'hidden'
					});
				$(this).children('.js-offer-item').each(function() {
					$(this).css({
						width: cellWidth + 'px',
						height: '90%',
						position: 'absolute',
						left: x + 'px',
						top: padding + 'px'
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
					//new TouchEvent('TouchEvent');
					document.createEvent('TouchEvent');
					/*
					   Now that we've finished the layout we'll make our panel respond
					   to all of the touch events.
					 */
					touchslider.makeTouchable(gridid);
				} catch (e) {
					/*
					 * Then we aren't on a device that supports touch
					*/
				} finally {
					/*Starting Touch Area Size*/
					touchslider.touchAreaSize(gridid);
					/*Resizing Touch Area Size*/
					$(window).resize(function(){ touchslider.touchAreaSize(gridid) });
					
					/*Sliding by click*/
					$('.js-next').on('click', function(){ touchslider.nextClick(gridid)});
					$('.js-prev').on('click', function(){ touchslider.prevClick(gridid)});
				}
			});			
		},
		
		/**
		 * Sliding by click
		*/		
		nextClick: function(gridid){ //to left
			var left = touchslider.getLeft($(gridid));
			var maxDelta = touchslider.width - parseInt($(gridid).parent().width(), 10);
			
			left -=  touchslider.colWidth;
			
			if (Math.abs(left) <= Math.abs(maxDelta)) {
				touchslider.doSlide($(gridid), left, '0s');
			} 
		},
		
		prevClick: function(gridid){ //to right
			var left = touchslider.getLeft($(gridid));
			
			left +=  touchslider.colWidth;
			
			if(left <= 0){
				touchslider.doSlide($(gridid), left, '0s');
			} 
		},
		
		/**
		 * Fit Touch Area to Elements Quantity
		*/
		touchAreaSize: function(gridid){
			$(gridid).parent().each(function(){ 
					var touchAreaWidth100 = parseInt($(this).css({width: '100%'}).css('width'), 10);
					var elNumber = parseInt(touchAreaWidth100 / touchslider.colWidth, 10);
					
					var touchAreaWidth = elNumber * touchslider.colWidth;
				
					$(this).css({ 
						width: touchAreaWidth 
					});
				});	
		},
		
		/**
		 * This function just binds the touch functions for the grid.
		 * It is very important to stop the default, stop the
		 * propagation, and return false.  If we don't then the touch
		 * events might cause the regular browser behavior for touches
		 * and the screen will start sliding around.
		 */
		makeTouchable: function(/*string*/ gridid) {
			 $(gridid).each(function() {
				this.ontouchstart = function(e) {
					touchslider.touchStart($(this), e);
					//e.preventDefault();
					//e.stopPropagation();
					return true;
				};
				
				this.ontouchend = function(e) {
					e.preventDefault();
					e.stopPropagation();
					
					if (touchslider.sliding) {
						touchslider.sliding = false;
						touchslider.touchEnd($(this), e);
						return false;
					} else {
						/*
						   We never slid so we can just return true
						   and perform the default touch end
						 */
						return true;
					}
				};
				
				this.ontouchmove = function(e) {
					touchslider.touchMove($(this), e);
					e.preventDefault();
					e.stopPropagation();
					return false;
				};
			});
		},		

		/**
		 * A little helper to parse off the 'px' at the end of the left
		 * CSS attribute and parse it as a number.
		 */
		getLeft: function(/*JQuery*/ elem) {
			 return parseInt(elem.css('left'), 10);  //.substring(0, elem.css('left').length - 2), 10);
		},
		
		/**
		 * When the touch starts we add our sliding class a record a few
		 * variables about where the touch started.  We also record the
		 * start time so we can do momentum.
		 */
		touchStart: function(/*JQuery*/ elem, /*event*/ e) {
			 elem.css({
				 '-webkit-transition-duration': '0',
				 'transition-duration': '0'
			 });
			 
			 touchslider.startX = e.targetTouches[0].clientX;
			 touchslider.startLeft = touchslider.getLeft(elem);
			 touchslider.touchStartTime = new Date().getTime();
			 
		},
		
		/**
		 * When the touch ends we need to adjust the grid for momentum
		 * and to snap to the grid.  We also need to make sure they
		 * didn't drag farther than the end of the list in either
		 * direction.
		 */
		touchEnd: function(/*JQuery*/ elem, /*event*/ e) {
			 if (touchslider.getLeft(elem) > 0) {
				 /*
				  * This means they dragged to the right past the first item
				  */
				 touchslider.doSlide(elem, 0, '1s');
				 
				 elem.parent().removeClass('sliding');
				 touchslider.startX = null;
			 } else if ( Math.abs(touchslider.getLeft(elem))  > ( touchslider.width - elem.parent().width() )) {
				 /*
				  * This means they dragged to the left past the last item
				  */
				 touchslider.doSlide(elem, '-' + (touchslider.width - elem.parent().width()), '1s');
				 
				 elem.parent().removeClass('sliding');
				 touchslider.startX = null;
			 } else {
				 /*
					This means they were just dragging within the bounds of the grid
					and we just need to handle the momentum and snap to the grid.
				  */
				 touchslider.slideMomentum(elem, e);
			 }
		},
		
		/**
		 * If the user drags their finger really fast we want to push 
		 * the slider a little farther since they were pushing a large 
		 * amount. 
		 */
		slideMomentum: function(/*jQuery*/ elem, /*event*/ e) {
			 var slideAdjust = (new Date().getTime() - touchslider.touchStartTime) * 35;
			 var left = touchslider.getLeft(elem);
			 
			 /*
				We calculate the momentum by taking the amount of time they were sliding
				and comparing it to the distance they slide.  If they slide a small distance
				quickly or a large distance slowly then they have almost no momentum.
				If they slide a long distance fast then they have a lot of momentum.
			  */
			 
			 var changeX = 12000 * (Math.abs(touchslider.startLeft) - Math.abs(left));
			 
			 slideAdjust = Math.round(changeX / slideAdjust);
			 
			 var newLeft = left + slideAdjust;
			 
			 /*
			  * We need to calculate the closest column so we can figure out
			  * where to snap the grid to.
			  */
			 var t = newLeft % touchslider.colWidth;
			 
			 if ((Math.abs(t)) > ((touchslider.colWidth / 2))) {
				 /*
				  * Show the next cell
				  */
				 newLeft -= (touchslider.colWidth - Math.abs(t));
			 } else {
				 /*
				  * Stay on the current cell
				  */
				 newLeft -= t;
			 }
			 
			 if (touchslider.slidingLeft) {
				 var maxLeft = parseInt('-' + (touchslider.width - elem.parent().width()), 10);
				 /*
				  * Sliding to the left
				  */
				 touchslider.doSlide(elem, Math.max(maxLeft, newLeft), '0.5s');
			 } else {
				 /*
				  * Sliding to the right
				  */
				 touchslider.doSlide(elem, Math.min(0, newLeft), '0.5s');
			 }
			 
			 elem.parent().removeClass('sliding');
			 touchslider.startX = null;
		},
		
		doSlide: function(/*jQuery*/ elem, /*int*/ x, /*string*/ duration) { 
			 elem.css({
				 left: x + 'px',
				 '-webkit-transition-property': 'left',
				 '-webkit-transition-duration': duration,
				 'transition-property': 'left',
				 'transition-duration': duration
			 });
			 
			 if (x === 0) {
				 $('.js-prev').removeClass('is-active');
				 $('.js-next').addClass('is-active');
			 } else if (Math.abs(x) === touchslider.width - parseInt(elem.parent().width(), 10) ){
				 $('.js-next').removeClass('is-active');
				 $('.js-prev').addClass('is-active');
			 } else {
				 $('.js-prev').addClass('is-active');
				 $('.js-next').addClass('is-active');
			 }

		},
		
		/**
		 * While they are actively dragging we just need to adjust the
		 * position of the grid using the place they started and the
		 * amount they've moved.
		 */
		touchMove: function(/*JQuery*/ elem, /*event*/ e) {
			 if (!touchslider.sliding) {
				 elem.parent().addClass('sliding');
			 }
			 
			 touchslider.sliding = true;
			 
			  var deltaX = e.targetTouches[0].clientX - touchslider.startX;
			  var left = deltaX + touchslider.startLeft;
				 elem.css({left: left + 'px'});
			 
			 if (touchslider.startX > e.targetTouches[0].clientX) {
				 /*
				  * Sliding to the left
				  */
				 touchslider.slidingLeft = true;
			 } else {
				 /*
				  * Sliding to the right
				  */
				 touchslider.slidingLeft = false;
			 }
		}				
	}	

	touchslider.createSlidePanel('.js-offer', 215, 0);
	

	
});
