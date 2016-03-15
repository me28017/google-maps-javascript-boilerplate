google-maps-javascript-boilerplate
==================================
Boilerplate for using the Google Maps JavaScript API

Usage
-----
- Include the map.css in your index.html
```html
<link rel="stylesheet" media="all" type="text/css" href="css/map.css">
```

- Include jQuery in your index.html
```html
<script type="text/javascript" src="js/libs/jquery-2.2.0.min.js"></script>
```

- Load the Google Maps JavaScript API using a script tag.
```html
<!-- Change the "YOUR_API_KEY" to your own Google Maps API key -->
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
```

- Include the gmap.js file in your index.html
```html
<script type="text/javascript" src="js/gmap.js"></script>
```

- Create a div section that will contain the google map.
```html
<body>
...
	<!-- Google Map Here -->
	<div id="map_canvas"></div>
...
</body>
```

- See the [index.html](index.html) file for a full example.

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
gmap.loadMap("map_canvas", mapOptions);
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
	iconFontSize: '11'
};

gmap.addMarker(markerOptions);
```

**Note**: The only required marker option is 'position'
```javascript
gmap.addMarker({position: new google.maps.LatLng(39.828354, -98.579457)});
```

Geocode an Address/Add Marker
-----------------------------
```javascript
gmap.geoCodeAddress('New York', function (geoCodeSuccess, status, latLng)
{
	if (geoCodeSuccess)
	{
		gmap.addMarker({
			position: latLng
		});
	}
});
```

Removing a Marker from the Map
------------------------------
```javascript
var marker = gmap.addMarker(markerOptions);

gmap.removeMarker(marker);
```

License
-------
Copyright 2016 Michael Markidis

Licensed under the [MIT][mitlicense].

[mitlicense]: MIT-LICENSE.txt
