/************************************
//
//  Easy BC Map v1.0 - Joe Watkins
//
//  V3 Google Maps - https://developers.google.com/maps/documentation/javascript/
//  jQuery UI Maps - https://code.google.com/p/jquery-ui-map/
//  Normalize - http://necolas.github.io/normalize.css/
//  
//  ## Options
//
//  mapWrapper : '.map-wrapper',
//  dataItem : '.locations li', // each element containing data attributes
//  dataAttrLat : 'lat', // name of Latitude data attribute eg. data-lat
//  dataAttrLong : 'long', // name of Longitude 
//  infoBox : '.info-box', // <div class="info-box">..
//  iconBase : 'images/', // folder housing marker images
//  marker : 'marker.png', // images/marker.png
//  markerShadow : 'marker-shadow.png', // images/marker-shadow.png
//  disableDefaultUI: true,
//  mapTypeId: google.maps.MapTypeId.ROADMAP
//
//  ## EXAMPLE HTML

    <div class="map" id="map_canvas"></div>

        <ul class="locations">
            <li data-lat="27.6648274" data-long="-81.51575350000002">
                <div class="info-box">
                    <p><a href="http://www.google.com">Florida DrupalCamp - Feb 11 2012</a></p>
                </div>
            </li>

            <li data-lat="39.7391536" data-long="-104.9847034">
                <div class="info-box">
                    DrupalCon 2012 Denver - Mar 20 2012
                </div>
            </li>
        </ul>

*/
(function($){
 
    $.fn.easyBCMap = function(options) {

         //Set the default values, use comma to separate the settings
         var defaults = {
              mapWrapper : '.map-wrapper',
              mapContainer : this, // <div class="map">..
              dataItem : '.locations li', // <ul class="locations">..
              dataAttrLat : 'lat', // data-lat
              dataAttrLong : 'long', // data-long
              infoBox : '.info-box', // <div class="info-box">..
              iconBase : 'images/', // folder housing marker images
              marker : 'marker.png', // images/marker.png
              markerShadow : 'marker-shadow.png', // images/marker-shadow.png
              disableDefaultUI: true,
              mapTypeId: google.maps.MapTypeId.ROADMAP
         }
             
         var options =  $.extend(defaults, options);

         var o = options;

         $(o.mapContainer).gmap({
              'disableDefaultUI': o.disableDefaultUI,
              mapTypeId: o.mapTypeId, // ROADMAP, SATELLITE, HYBRID, TERRAIN
              'callback': function() {
                  var self = this;
                  $(o.dataItem).each(function(i, el) {
                      var lattitude = $(this).data(o.dataAttrLat),
                          longitude = $(this).data(o.dataAttrLong);
                      self.addMarker({
                          'position': new google.maps.LatLng(lattitude, longitude),
                          'bounds': true,
                          icon: o.iconBase + o.marker,
                          shadow: o.iconBase + o.markerShadow
                      }, function(map, marker) {
                          $(el).click(function() {
                              $(marker).triggerEvent('click');
                          });
                      }).click(function() {
                          self.openInfoWindow({
                              'content': $(el).find(o.infoBox).html()
                          }, this);
                      });
                  });
              }
          });

          // on resize for fun
          $(window).resize(function() {
            var parentWidth = $(o.mapWrapper).width();
            $(o.mapWrapper+' iframe').each(function(){
              $(this).attr('style', 'border: medium none; overflow: hidden; width: ' + parentWidth +  'px').attr("width",parentWidth+"px");
            });
          });

          // onload
          $(window).load(function() {
            var parentWidth = $(o.mapWrapper).width();
            $(o.mapWrapper+' iframe').each(function(){
              $(this).attr('style', 'border: medium none; overflow: hidden; width: ' + parentWidth +  'px').attr("width",parentWidth+"px");
            });
          });

 
    };
 
}(jQuery));