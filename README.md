google-maps-javascript-boilerplate
==================================
Boilerplate for using the Google Maps JavaScript API

Usage
-----
- Include jQuery in your index.html
- Include the gmap.js file in your index.html
```html
<script type="text/javascript" src="js/gmap.js"></script>
```

Creating the Map
----------------
```javascript
var center = new google.maps.LatLng(0, 0);

var mapOptions = {
	zoom: 2,
	center: center,
	tilt: 0,
	panControl: false,
	zoomControl: true,
	streetViewControl: false,
	mapTypeControl: true,
	mapTypeId: google.maps.MapTypeId.HYBRID
};

var gmap = new GMap();

// "map_canvas" is the id of the div where you want the map to go
gmap.loadMap("map_canvas", mapOptions, center);
```

Adding a Marker to the Map
--------------------------
```javascript
var markerOptions = {
	position: new google.maps.LatLng(39.828354, -98.579457),
	title: '1st Marker',
	label: 'ST',
	fitBounds: false,
	iconColor: '00FF00',
	iconSize: '.85',
	iconFontSize: '11',
};

gmap.addMarker(markerOptions);
```

The only required marker option is 'position'

Geocode an Address/Add Marker
-----------------------------
gmap.geoCodeAddress('New York', function (geoCodeSuccess, status, latLng)
{
	if (geoCodeSuccess)
	{
		gmap.addMarker({
			position: latLng
		});
	}
});

License
-------
Copyright 2016 Michael Markidis

Licensed under the [MIT][mitlicense].

[mitlicense]: MIT-LICENSE.txt
