var map;
var markerList = [];
var infoWindows = [];
var currWindow;

function project_center() {
	findBrews(function(done) {
		locationList = []

		if (typeof done === 'undefined') {
			alert("Brewery not found. Did you spell everything correctly?")
		}

		console.log(done.data);
		for (let i of done.data) {
			coor = new Coordinate_gatherer(i.brewery.name, i.latitude, i.longitude, i.brewery.description, i.streetAddress, i.brewery.website)
			locationList.push(coor)
		}
		addMarkers(locationList)
	});
}

function initMap() {
	var center = {lat: 41.09024, lng: -95.712891};
	var mapProp = new google.maps.Map(document.getElementById('map'), {
	  	zoom: 4,
	  	center: center
	});
	map = new google.maps.Map(document.getElementById('map'), mapProp);
}

function removeMarkers() {
	for (i=0; i<markerList.length; i++){
		markerList[i].setMap(null);
	}
	markerList = [];
}

function addMarkers(locationList) {
	removeMarkers();
	repositionMap(locationList);
	let infoWindow = new google.maps.InfoWindow();

	for (let i of locationList){
		var marker = new google.maps.Marker({
			position: {lat: i.get_lat(), lng: i.get_long()},
			animation: google.maps.Animation.DROP
		})


		marker.setMap(map);
		markerList.push(marker);

		google.maps.event.addListener(marker, 'click', getInfoCallback(createContent(i)))
	}
}

function getInfoCallback(content){
	var infoWindow = new google.maps.InfoWindow({content: content});
	return function(){
		if (typeof currWindow != 'undefined') {
			currWindow.close();
		}
		infoWindow.setContent(content);
		infoWindow.open(map, this);
	}
	currWindow = infoWindow;

}

function repositionMap(locationList) {
	var avgLat = 0;
	var avgLng = 0;
	for (let i of locationList) {
		avgLat = avgLat + i.get_lat();
		avgLng = avgLng + i.get_long();
	}
	avgLat = avgLat / locationList.length;
	avgLng = avgLng / locationList.length;

	map.setCenter({lat: avgLat, lng: avgLng})
	map.setZoom(13);
}

function createContent(location) {
	var contentString = "<div>" + 
	"<div>" +
	"</div>" +
	"<h1>" + location.get_name() + "</h1>" +

	"<div>" + 
	"<p>" + location.get_address() + "</p>" + 
	"</div>" +

	"<div>" + 
	"<p>" + location.get_description() + "</p>" + 
	"</div>" +

	"<div>" + 
	"<a href=" + location.get_website() + ">" + location.get_website() + "</a>" + 
	"</div>" +

	"</div>"

	return contentString;
}

class Coordinate_gatherer{
	constructor(name, lat, long, description, address, website){
		this.name = name;
		this.lat = lat;
		this.long = long;
		this.address = address;
		this.website = website;
		this.description = description;
	}

	get_name() {
		return this.name;
	}

	get_lat() {
		return this.lat;
	}

	get_long() {
		return this.long;
	}

	get_description() {
		return this.description;
	}

	get_address() {
		return this.address;
	}

	get_website() {
		return this.website;
	}
}