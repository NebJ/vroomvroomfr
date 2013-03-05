function search () {
  geocode = $('#search-modal #selectPostalcode').val().split(';')
  window.city_geo = [
    parseFloat(geocode[0]),
    parseFloat(geocode[1])
  ];
  window.exam = $('#search-modal #selectExamen').val();

  var limit = 0.08;
  var markers = markerLayer.markers();
  var min_price = 99999999;
  var selected_poi = null;

  $.each(markers, function(i, elem) {
    coord = elem.location;
    if (
      (window.city_geo[0]-limit < coord.lat) &&
      (coord.lat < window.city_geo[0]+limit) &&
      (window.city_geo[1]-limit < coord.lon) &&
      (coord.lon < window.city_geo[1]+limit)
    ) {
      if (elem.data.properties.first_cost < min_price) {
        min_price = elem.data.properties.first_cost;
        selected_poi = elem;
        return true;
      }
    }
  });

  if (selected_poi) {
    // Simulate click through jQuery
    $(selected_poi.element).click();

    $('#search-modal').modal('hide');
  } else {
    alert("Désolé, nous n'avons pas d'auto-école dans la zone.");
  }
}

function showSidebar () {
  $("#sidebar").animate({ 
    right: 0,
  }, 400 );
}

function hideSidebar () {
  $("#sidebar").animate({ 
    right: -320,
  }, 400 );
}
