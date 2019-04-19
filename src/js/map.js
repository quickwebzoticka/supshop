$(document).ready(function() {

	const showModal = function(idModal, text) {
    console.log($('#' + idModal));
    $('#' + idModal).attr('style', 'display:flex');
    $('#' + idModal).find('.send-success-content').text(text);
    setTimeout(function() { $('#' + idModal).fadeOut() }, 3000);
  };

	if ($('.map').length) {

			if ($('[data-addreses-wrapper-1]').length) {
				var addressTemplate1 = $('[data-addreses-wrapper-1]').find('.address-location').clone();
				var addressTemplate2 = $('[data-addreses-wrapper-2]').find('.address-location').clone();

				$('[data-addreses-wrapper-1]').find('.address-location').remove();
				$('[data-addreses-wrapper-2]').find('.address-location').remove();
			}

			const countEdit = function () {
				let count = $(this).find('input').val();
				$(document).find('#place-count').text(`${count} шт.`);
			}

			function makeAddresses (location, markers) {
				if (addressTemplate1) {
					let count = markers.length - 1;

					addressTemplate1.find('.address-location__name').text(location);
					// addressTemplate2.find('.address-location__name').text(location);

					$('[data-addreses-wrapper-1]').append(addressTemplate1.clone().attr('data-address-id', count));
					// $('[data-addreses-wrapper-2]').append(addressTemplate2.clone().attr('data-address-id', count));
				}

			}
      function initMap () {


        let map = new google.maps.Map(document.querySelector('.map'), {
          center: new google.maps.LatLng(59.928657, 30.360101),
          zoom: 15,
          streetViewControl: false,
          mapTypeControl: false,
          gestureHandling: 'greedy',
          scrollwheel: false,
          disableDefaultUI: true,
          draggable: false,
          styles: [
					  {
					    "elementType": "geometry",
					    "stylers": [
					      {
					        "color": "#1d2c4d"
					      }
					    ]
					  },
					  {
					    "elementType": "labels.text.fill",
					    "stylers": [
					      {
					        "color": "#8ec3b9"
					      }
					    ]
					  },
					  {
					    "elementType": "labels.text.stroke",
					    "stylers": [
					      {
					        "color": "#1a3646"
					      }
					    ]
					  },
					  {
					    "featureType": "administrative",
					    "elementType": "geometry",
					    "stylers": [
					      {
					        "visibility": "off"
					      }
					    ]
					  },
					  {
					    "featureType": "administrative.country",
					    "elementType": "geometry.stroke",
					    "stylers": [
					      {
					        "color": "#4b6878"
					      }
					    ]
					  },
					  {
					    "featureType": "administrative.land_parcel",
					    "elementType": "labels.text.fill",
					    "stylers": [
					      {
					        "color": "#64779e"
					      }
					    ]
					  },
					  {
					    "featureType": "administrative.province",
					    "elementType": "geometry.stroke",
					    "stylers": [
					      {
					        "color": "#4b6878"
					      }
					    ]
					  },
					  {
					    "featureType": "landscape.man_made",
					    "elementType": "geometry.stroke",
					    "stylers": [
					      {
					        "color": "#334e87"
					      }
					    ]
					  },
					  {
					    "featureType": "landscape.natural",
					    "elementType": "geometry",
					    "stylers": [
					      {
					        "color": "#023e58"
					      }
					    ]
					  },
					  {
					    "featureType": "poi",
					    "stylers": [
					      {
					        "visibility": "off"
					      }
					    ]
					  },
					  {
					    "featureType": "poi",
					    "elementType": "geometry",
					    "stylers": [
					      {
					        "color": "#283d6a"
					      }
					    ]
					  },
					  {
					    "featureType": "poi",
					    "elementType": "labels.text.fill",
					    "stylers": [
					      {
					        "color": "#6f9ba5"
					      }
					    ]
					  },
					  {
					    "featureType": "poi",
					    "elementType": "labels.text.stroke",
					    "stylers": [
					      {
					        "color": "#1d2c4d"
					      }
					    ]
					  },
					  {
					    "featureType": "poi.park",
					    "elementType": "geometry.fill",
					    "stylers": [
					      {
					        "color": "#023e58"
					      }
					    ]
					  },
					  {
					    "featureType": "poi.park",
					    "elementType": "labels.text.fill",
					    "stylers": [
					      {
					        "color": "#3C7680"
					      }
					    ]
					  },
					  {
					    "featureType": "road",
					    "elementType": "geometry",
					    "stylers": [
					      {
					        "color": "#304a7d"
					      }
					    ]
					  },
					  {
					    "featureType": "road",
					    "elementType": "labels.icon",
					    "stylers": [
					      {
					        "visibility": "off"
					      }
					    ]
					  },
					  {
					    "featureType": "road",
					    "elementType": "labels.text.fill",
					    "stylers": [
					      {
					        "color": "#98a5be"
					      }
					    ]
					  },
					  {
					    "featureType": "road",
					    "elementType": "labels.text.stroke",
					    "stylers": [
					      {
					        "color": "#1d2c4d"
					      }
					    ]
					  },
					  {
					    "featureType": "road.highway",
					    "elementType": "geometry",
					    "stylers": [
					      {
					        "color": "#2c6675"
					      }
					    ]
					  },
					  {
					    "featureType": "road.highway",
					    "elementType": "geometry.stroke",
					    "stylers": [
					      {
					        "color": "#255763"
					      }
					    ]
					  },
					  {
					    "featureType": "road.highway",
					    "elementType": "labels.text.fill",
					    "stylers": [
					      {
					        "color": "#b0d5ce"
					      }
					    ]
					  },
					  {
					    "featureType": "road.highway",
					    "elementType": "labels.text.stroke",
					    "stylers": [
					      {
					        "color": "#023e58"
					      }
					    ]
					  },
					  {
					    "featureType": "transit",
					    "stylers": [
					      {
					        "visibility": "off"
					      }
					    ]
					  },
					  {
					    "featureType": "transit",
					    "elementType": "labels.text.fill",
					    "stylers": [
					      {
					        "color": "#98a5be"
					      }
					    ]
					  },
					  {
					    "featureType": "transit",
					    "elementType": "labels.text.stroke",
					    "stylers": [
					      {
					        "color": "#1d2c4d"
					      }
					    ]
					  },
					  {
					    "featureType": "transit.line",
					    "elementType": "geometry.fill",
					    "stylers": [
					      {
					        "color": "#283d6a"
					      }
					    ]
					  },
					  {
					    "featureType": "transit.station",
					    "elementType": "geometry",
					    "stylers": [
					      {
					        "color": "#3a4762"
					      }
					    ]
					  },
					  {
					    "featureType": "water",
					    "elementType": "geometry",
					    "stylers": [
					      {
					        "color": "#0e1626"
					      }
					    ]
					  },
					  {
					    "featureType": "water",
					    "elementType": "labels.text.fill",
					    "stylers": [
					      {
					        "color": "#4e6d70"
					      }
					    ]
					  }
					]
				});

		var marker = new google.maps.Marker({
          map: map,
          icon: '../img/icons/map-marker.svg'
        });

		var input = document.getElementById('autocomplete');

        var autocomplete = new google.maps.places.Autocomplete(input);

        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo('bounds', map);

        // Set the data fields to return when the user selects a place.
        autocomplete.setFields(
            ['address_components', 'geometry', 'icon', 'name']);

				var markers = [];
        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.querySelectorAll('.infowindow-content')[0];
				infowindow.setContent(infowindowContent);

				function addMarker(location) {
					var marker = new google.maps.Marker({
						map: map,
						anchorPoint: new google.maps.Point(0, -29),
						icon: '../img/icons/map-marker.svg',
						position: location
					});
					markers.push(marker);
				}

				function fitBoundsToVisibleMarkers() {
					if (markers.length < 1) {

					}
					var bounds = new google.maps.LatLngBounds();		
					for (var i=0; i<markers.length; i++) {
							if(markers[i].getVisible()) {
									bounds.extend( markers[i].getPosition() );
							}
					}
					map.fitBounds(bounds);
					google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
						let temp = map.getZoom();
						temp -= 2
						setTimeout(function() {
							map.setZoom(temp);
						}, 0);
						
					})
				};

				function deleteMarker() {
					let index = $(this).closest('.address-location').data('address-id');
					console.log(markers);
					// markers[index].setMap(null);

						for (var i = 0; i < markers.length; i++) {
							console.log(`index:${index} === i:${i}`)
							if (index == i) {
								console.log(`index:${index} === i:${i}`)
								markers[i].setMap(null);
								markers.splice(i, i);
							}
						}
					if (markers.length == 0) {
						markers = [];
					}	
					
					$(this).closest('.address-location').remove();
					
				};

        autocomplete.addListener('place_changed', function() {
          // infowindow.close();
          // marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            showModal($('#send-error').attr('id'), 'Некорректный адрес');
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(10);
					}

					addMarker(place.geometry.location);
					fitBoundsToVisibleMarkers();
					
          if (window.location.href.indexOf('supertarget') > 1) {
          	marker.setVisible(false);
          } else {
          	marker.setVisible(true);
					}

					$(document).on('input', '.address-location__count', countEdit);
					$(document).on('click', '.address-location__btn', deleteMarker);

          var address = '';
          if (place.address_components) {
          	console.log(place.address_components);
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || ''),
              (place.address_components[3] && place.address_components[3].short_name || ''),
              (place.address_components[4] && place.address_components[4].short_name || ''),
              (place.address_components[5] && place.address_components[5].short_name || ''),
              (place.address_components[6] && place.address_components[6].short_name || ''),
              (place.address_components[7] && place.address_components[7].short_name || '')
            ].join(' ');
          }

          makeAddresses(address, markers);

          localStorage['giftLat'] 		= place.geometry.location.lat();
          localStorage['giftLng'] 		= place.geometry.location.lng();
          localStorage['giftAddress'] = address;

          if (window.location.href.indexOf('supertarget') > 1) {
          	var cityCircle = new google.maps.Circle({
	            strokeColor: '#FFFFFF',
	            strokeOpacity: 0.1,
	            strokeWeight: 0,
	            fillColor: '#FFFFFF',
	            fillOpacity: 0.1,
	            map: map,
	            center: place.geometry.location,
	            radius: 25
	          });

          	  $('.radius-hidden').show();

          	  $('.range-slider.container__radius.irs-hidden-input').on('change', function() {
          	  	cityCircle.setRadius = $(this).val();
          	  	cityCircle.set('radius', parseInt($(this).val(), 10) );
          	  })
          } else {
          	infowindow.open(map, marker);
          }


        });
    }

    initMap();
  }

});