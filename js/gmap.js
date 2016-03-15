
/*
 * Creates a new map.
 */
var GMap = function () 
{
	this.map = null;
	this.bounds = null;
	this.geocoder = null;
	this.distanceService = null;

	this.markerID = 0;
	this.markersArray = [];
};

/*
 * Creates the Google Map (w/ options) and loads it into the document.
 * 
 * @param {String} mapName - div ID for the map container
 * @param mapOptions - options to create the map with 
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
 * Adds a marker to the map.
 * 
 * @param markerOpts - all the options for the marker
 * @param markerOpts.position - The location of the marker
 * @param markerOpts.title - The tool-tip string for the marker
 * @param markerOpts.label - The inner label for the marker
 * @param markerOpts.fitBounds - true to force the map to fit the marker in the bounds; false otherwise
 * @param markerOpts.iconColor - the color of the marker
 * @param markerOpts.iconSize - the size of the marker
 * @param markerOpts.iconFontSize - the font size for the marker label
 * 
 * @returns {google.maps.Marker} The newly created marker.
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

	var icon = this.createIcon(label, iconColor, iconSize, iconFontSize);

	var marker = new google.maps.Marker(
	{
		map: this.map,
		position: latLng,
		icon: icon,
		title: title
	}); 

	// add the marker to the array
	marker.ID = this.markerID++;

	this.markersArray.push(marker);

	return marker;
};

/*
 * Removes a marker from the map.
 * 
 * @param {google.maps.Marker} marker - the marker to remove from the map.
 * @param {Boolean} resetBounds - if true, the bounds are rest and the map is fit to the new bounds.
 */
GMap.prototype.removeMarker = function (marker, resetBounds)
{
	if (marker !== undefined)
	{
		marker.setMap(null);

		// remove the marker from the array
		var found = false;
		var indexToRemove = 0;
		var markerID = marker.ID;
		var len = this.markersArray.length;
		var i = 0;

		while (i < len && !found)
		{
			var currMarker = this.markersArray[i];
			
			if (markerID === currMarker.ID)
			{
				found = true;
				indexToRemove = i;
			}

			i++;
		}

		if (found)
		{
			this.markersArray.splice(indexToRemove, 1);
		}

		if (resetBounds !== undefined && resetBounds)
		{
			// create a new bounds object
			this.bounds = new google.maps.LatLngBounds();
			
			// go through all markers and add them to the bounds
			i = 0;
			len = this.markersArray.length;

			while (i < len)
			{
				var currMarker = this.markersArray[i];
				var latLng = currMarker.getPosition();

				this.bounds.extend(latLng);

				i++;
			}

			// fit map to new bounds
			this.map.fitBounds(this.bounds);
		}
	}
};

/*
 * Tries to geocode an address.
 * 
 * @param {String} location - the address to geocode
 * @param {requestCallback} cb - the callback that handles the response.
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
};

/*
 * Creates a google icon.
 * 
 * @param iconLabel - the inner label of the marker
 * @param iconColor - the color of the marker
 * @param iconSize - the size of the marker
 * @param iconFontSize - the font size for the marker label
 */
GMap.prototype.createIcon = function (iconLabel, iconColor, iconSize, iconFontSize)
{
	var icon = 'http://chart.apis.google.com/chart?chst=d_map_spin&chld=';

	icon += iconSize + '|0|';
	icon += iconColor + '|';
	icon += iconFontSize + '|_|' + iconLabel;

	return icon;
};
