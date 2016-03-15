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

License
-------
Copyright 2016 Michael Markidis

Licensed under the [MIT][mitlicense].

[mitlicense]: MIT-LICENSE.txt
