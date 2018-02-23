(function($) {
   
  $(document).ready( function() {    
    var navRegions = Array();
    var isMobile = false;
    
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      $('body').addClass('mobile');
      isMobile = true;
    }
    
    $('body').on('click', 'a', function() {
      $('header').removeClass('open');
    });
    
    
    // If the window is too small for our logos then we scroll them
    if (window.innerWidth < 1000) {
      var $clients = $('#clients');
      var offsetX = 0;
      var speed = 0.5;
      setInterval(function() {
        $clients.css('background-position', (offsetX -= speed) + 'px 100%');
      }, 17);
    }
    
    $('body').on('click', '.hamburger-icon', function() {
      var $body = $('body');
      var $header = $body.find('header').toggleClass('open');
      var $nav = $header.find('nav');
          
      if ($header.hasClass('open')) {
        var w = $nav.outerWidth();
        var h = $nav.outerHeight();
      
        $nav.css('margin-left', -w/2);
        $nav.css('margin-top', -h/2);
        
        var timeout = 200;
          $nav.find('a').each(function() {
            $(this).fadeTo(0, 0).delay(timeout += 150).fadeTo(350, 1);
          });
          
      } else {
        $nav.css('margin-left', 0);
        $nav.css('margin-top', 0);
      }
    });
    
    $('header nav a').each(function() {
      var rid = $(this).attr('href');
      if (rid[0] != '#') return;
      
      var regionInfo = {
        id : rid,
        region : $(rid),
        link : $(this)
      };
      
      navRegions.push(regionInfo);
    })
    
    $(document).scroll(
		  function() {
		    var scrollTop = $(document).scrollTop();

		    // setup header shadow show/hide
        if(scrollTop > 30 ) {
          $("header").addClass("pinned");
        } else {
				  $("header").removeClass("pinned");
        }
        
        // set current nav item
        var bestMatch = null;
        var foundRegion = false;
        var center = scrollTop + $(window).height() * 0.3;
        for (var i = 0; i < navRegions.length; i++)
        {
          var ri = navRegions[i];
          var os = ri.region.offset();
          var h = ri.region.height();
          
          if (center >= os.top)
            bestMatch = ri.link;
          
          ri.link.removeClass('current');
        }
        
        if (bestMatch != null)
          bestMatch.addClass('current');
          
        if (isMobile == false) {
          //Slow scroll of section.slide div.copy scroll and fade it out
          $('div#banner section.slide div.copy').css({
            'margin-top' : -(scrollTop/3)+"px",
            'opacity' : 1-(scrollTop/600)
          });
  
          //Slowly parallax the background of section.slide
          $('section.slide').css({
            'background-position' : 'center ' + (-scrollTop/6)+"px"
          });
        }
      }
      
    );
        
    // slides
    $('#banner').slides({ fade: 150, autoDuration: 10000 });
    
    // setup map
      var latlng = new google.maps.LatLng(12.923959,77.638705);
      var myOptions = {
        zoom: 16,
        center: latlng,
        draggable: false,
        panControl: false,
        zoomControl:  false,
        scaleControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
      
      var blueParksStyles = [
      {
        featureType: "all",
        stylers: [
          { hue: "#0283c7" },
          { visibility: "simplified" },
          { saturation: 10 },
          { lightness: 0 },
          { gamma: 1.0 }
        ]
      },
      {
        featureType: "administrative",
        elementType: "all",
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          { visibility: "off" }
        ]
      } 
      ];
      
      map.setOptions({styles: blueParksStyles});
      
      var image = 'images/marker.png';
      var burksonLatLng = new google.maps.LatLng(12.923959,77.638705);
      var newMarker = new google.maps.Marker({
        position: burksonLatLng,
        map: map,
        icon: image
      });

  });
}(jQuery));