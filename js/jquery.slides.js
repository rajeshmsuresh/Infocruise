(function( $ ){
  $.fn.slides = function( options ) {
  
  	var settings = $.extend( {
  		fade : 100,
  		autoDuration : 5000
  	}, options );
  	
    this.each(function() {
    
    	var fadeActive = false;
    	var slideCount = 0;
    	var mouseInside = false;
    	
		  var slides = new Array();
		  var indicators = new Array();
		
		  var currentSlide = 0;
		
		  var jele = $(this);
		  var controls = jele.find('.controls');
		
		  var arrowLeft = $('<div class="arrow left"></div>').appendTo(controls);
		  var arrowRight = $('<div class="arrow right"></div>').appendTo(controls);
		  var pageIndicators = $('<ul></ul>').appendTo(controls);
		  var timer = 0;
		
		  var resetTimer = function() {
		    if (mouseInside) return;
		    clearTimeout(timer);
		    timer = setTimeout(function() { 
		      changeSlide(currentSlide + 1);
		    }, 
		    settings.autoDuration);
		  };
		
		  var changeSlide = function(si) {
			 if (slideCount <= 1 || fadeActive) return;
			 while(si < 0) { si += slideCount; }
			 while(si >= slideCount) { si -= slideCount; }
			 if (si == currentSlide) return;
			
			 clearTimeout(timer);
			
			 fadeActive = true;
			 slides[currentSlide].fadeOut(
				settings.fade, 
				function() {
					indicators[currentSlide].removeClass('current');
					indicators[si].addClass('current');
					
					slides[si].fadeIn(
						settings.fade, 
						function() {
							currentSlide = si; 
							fadeActive = false;
							resetTimer();
						}) 
				});
		  };

		  jele.find('.slide').each(function() {
			 var slide = $(this);
			 var i = $('<li data-index="' + indicators.length + '"></li>').appendTo(pageIndicators);
			
			 i.click(function() { changeSlide(parseInt($(this).attr('data-index'))); })
			
			 slides.push(slide)
			 indicators.push(i);
			
			 if (slideCount == 0)
			 {
				slide.show();
				i.addClass('current');
			 }
			 else
				slide.hide();
				
			  slideCount++;
		  });
		
		jele.mouseenter(function() { clearTimeout(timer); mouseInside = true; }).mouseleave(function() { mouseInside = false; resetTimer(); })
		
		arrowLeft.click(function() { changeSlide(currentSlide - 1); })
		arrowRight.click(function() { changeSlide(currentSlide + 1); })
		resetTimer();
    });
  };
})( jQuery );