var locations = [
    {
        title: 'Crudessence - Mackay', 
        location: {
            lat: 45.4975339, 
            lng: -73.5823068
        },
        type: ['vegan', 'raw','organic']
    },
    {
        title: 'Copper Branch - Bishop', 
        location: {
            lat: 45.4963241, 
            lng: -73.5776168
        },
        type: ['vegan']
    },
    {
        title: 'Aux vivres', 
        location: {
            lat: 45.5212052, 
            lng: -73.5906209
        },
        type: ['vegan']
    },
    {
        title: 'La Panthère Verte', 
        location: {
            lat: 45.521607, 
            lng: -73.5874597
        },
        type: ['vegan']
    },
    {
        title: 'Lola Rosa', 
        location: {
            lat: 45.5175668, 
            lng: -73.5928722
        },
        type: ['vegetarian']
    },
    {
        title: 'Vego', 
        location: {
            lat: 45.5154914, 
            lng: -73.566851
        },
        type: ['vegetarian']
    },
    {
        title: 'Lov', 
        location: {
            lat: 45.5006746, 
            lng: -73.561211
        },
        type: ['vegan']
    },
    {
        title: 'Mouton vert', 
        location: {
            lat: 45.468378, 
            lng: -73.6217996
        },
        type: ['vegan', 'organic' ],
    }
];


var Location = function(data) {
	var self = this;
	this.title = data.title;
	this.lat = data.location.lat;
	this.long = data.location.long;
    this.typeArr = data.type;
    // The following group uses the location array to create an array of markers on initialize.

    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
        position: data.position,
        title: data.title
    });
    // Push the marker to our array of markers.
    markers.push(marker);

}



var ViewModel =  function() {
    console.group("ViewModel");

    var self = this;

    this.filters = [ 
        {
            title :'vegan', 
            id: 1,
        },
        {
            title : 'raw',
            id: 2,
        },
        {
            title: 'organic', 
            id: 3,
        },
        {
            title: 'vegeterian',
            id: 4, 
        }
    ];

    selectedOption = ko.observable();
    var selectedValue = selectedOption();

    this.locationList = ko.observableArray([]);

    locations.forEach(function(item){
        self.locationList.push( new Location(item));
    });

    self.selectedVal = ko.computed(function () { 
        console.log("selectedOption()", selectedOption());
        return selectedOption() && selectedOption().title; 
    });

    console.log(selectedOption());


    self.filtered = ko.computed(function() {
        console.log("changed");
        return self.locationList().filter(function (item)());
    });
    console.log("filtered", self.filtered());
    console.groupEnd();
}

  
var map;

// Create a new blank array for all the listing markers.
var markers = [];

function initMap() {
    // Activate Knockout once the map is initialized
       

    // Create a styles array to use with the map.
    var styles = [
        {
        featureType: 'water',
        stylers: [
            { color: '#19a0d8' }
        ]
        },{
        featureType: 'administrative',
        elementType: 'labels.text.stroke',
        stylers: [
            { color: '#ffffff' },
            { weight: 6 }
        ]
        },{
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [
            { color: '#e85113' }
        ]
        },{
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            { color: '#efe9e4' },
            { lightness: -40 }
        ]
        },{
        featureType: 'transit.station',
        stylers: [
            { weight: 9 },
            { hue: '#e85113' }
        ]
        },{
        featureType: 'road.highway',
        elementType: 'labels.icon',
        stylers: [
            { visibility: 'off' }
        ]
        },{
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
            { lightness: 100 }
        ]
        },{
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            { lightness: -100 }
        ]
        },{
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            { visibility: 'on' },
            { color: '#f0e4d3' }
        ]
        },{
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            { color: '#efe9e4' },
            { lightness: -25 }
        ]
        }
    ];

    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.4898683, lng: -73.7208625},
        zoom: 12,
        styles: styles,
        mapTypeControl: false
    });


    ko.applyBindings(new ViewModel());

}

      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
        });
    }
}

      // This function will loop through the markers array and display them all.
function showListings() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}

// This function will loop through the listings and hide them all.
function hideListings() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}
