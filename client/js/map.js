if (Meteor.isClient) {
  var MAP_ZOOM = 16;

  Meteor.startup(function() {
    //load google maps
     GoogleMaps.load();
   });

   //redner selected property on sidebar
  Template.map.onRendered(function() {
    $("#map-link").addClass('selected');
    $("#navigation-link").removeClass('selected');
    $("#locationSearch-link").removeClass('selected');
    $("#popularLocations-link").removeClass('selected');
    $("#settings-link").removeClass('selected');
  });

  Template.map.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('nusMap', function(map) {
      var marker;

      // Create and move the marker when latLng changes.
      self.autorun(function() {
        var latLng = Geolocation.latLng();
        if (! latLng)
          return;

        // If the marker doesn't yet exist, create it.
        if (! marker) {
          marker = new google.maps.Marker({
          position: new google.maps.LatLng(latLng.lat, latLng.lng),
          map: map.instance
          });
        }
        // The marker already exists, so we'll just change its position.
        else {
          marker.setPosition(latLng);
        }

        // Center and zoom the map view onto the current position.
        map.instance.setCenter(marker.getPosition());
        map.instance.setZoom(MAP_ZOOM);
      });
    });
  });


  Template.map.helpers({
    geolocationError: function() {
      var error = Geolocation.error();
      return error && error.message;
    },
    mapOptions: function() {
      var latLng = Geolocation.latLng();
      // Initialize the map once we have the latLng.
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: MAP_ZOOM
        };
      }else if (GoogleMaps.loaded()) {//if geolocation fails, Make sure the maps API has loaded
        // Map initialization options
        return {
          center: new google.maps.LatLng(1.2966, 103.7764),//NUS LatLng
          zoom: MAP_ZOOM
        };
      }
    }
  });

  Template.map.events({
      'click': function(){
          console.log("You clicked something");
          //access maps instance though maps object
          GoogleMaps.maps.exampleMap.instance;

      }
  });

}
