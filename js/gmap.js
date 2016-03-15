/*
 * File: gmap.js
 * 
 * Purpose: Handles all interaction with the Google Map.
 */
var GMap = function () 
{
	this.map = null;
	var bounds = null;
	var geocoder = null;
	var distanceService = null;
};

/*
 * Creates the Google Map (w/ options) and loads it into the document.
 */
GMap.prototype.loadMap = function (mapName, mapOptions)
{
	var mapElem = document.getElementById(mapName);

	// create the map object
	this.map = new google.maps.Map(mapElem, mapOptions);

	// create a new bounds object
	this.bounds = new google.maps.LatLngBounds();

	// create a geocoder object
	this.geocoder = new google.maps.Geocoder();

	// create a distance matrix service object
	this.distanceService = new google.maps.DistanceMatrixService();
};

/*
 * Adds a marker to the map
 * 
 * @param {google.maps.LatLng} markerOpts all the options for the marker
 * 
 */
GMap.prototype.addMarker = function (markerOpts)
{
	var latLng = markerOpts['position'];
	var title  = markerOpts['title'];
	var label  = markerOpts['label'];
	var fitBounds = markerOpts['fitBounds'];
	var iconColor = markerOpts['iconColor'];
	var iconSize = markerOpts['iconSize'];
	var iconFontSize = markerOpts['iconFontSize'];

	// set defaults as needed
	if (title === undefined)
	{
		title = '';
	}
	if (label === undefined)
	{
		label = '';
	}
	if (fitBounds === undefined)
	{
		fitBounds = false;
	}
	if (iconColor === undefined)
	{
		iconColor = 'FF0000';
	}
	if (iconSize === undefined)
	{
		iconSize = '1';
	}
	if (iconFontSize === undefined)
	{
		iconFontSize = '12';
	}

	this.bounds.extend(latLng);

	if (fitBounds !== undefined && fitBounds)
	{
		this.map.fitBounds(this.bounds);
	}

	var icon = createIcon(label, iconColor, iconSize, iconFontSize);

	var marker = new google.maps.Marker(
	{
		map: this.map,
		position: latLng,
		icon: icon,
		title: title
	});

	return marker;
}

/*
 * Tries to geocode an address.
 */
GMap.prototype.geoCodeAddress = function (location, cb)
{
	var latLng = null;
	var geoCodeSuccess = false;

	this.geocoder.geocode({'address': location}, function (results, status)
	{
		if (status == google.maps.GeocoderStatus.OK)
		{
			geoCodeSuccess = true;

			latLng = results[0].geometry.location;
		}
		cb(geoCodeSuccess, status, latLng);
	});
}

function createIcon (iconLabel, iconColor, iconSize, iconFontSize)
{
	var icon = 'http://chart.apis.google.com/chart?chst=d_map_spin&chld=';

	icon += iconSize + '|0|';
	icon += iconColor + '|';
	icon += iconFontSize + '|_|' + iconLabel;

	return icon;
}
