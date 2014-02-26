var models = require('../app/models');
var geocoderProvider = 'datasciencetoolkit';
var httpAdapter = 'http';
var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter);

module.exports = {
	geocodePostcode: function(postcode){
		geocoder.geocode(postcode, function(err, res) {
			if(err){
				console.log("Error geocoding: " + postcode + " / " + err);
			} else {
				//console.log(res[0]);
				models.Record.update({'Organisation_postcode':postcode}, {Organisation_lat:res[0].latitude, Organisation_lon:res[0].longitude}, function(err,data){
					if(err){
						console.log("Error updating record: " + postcode + " / " + err);
					} else {
						console.log(postcode + " succesfully geocoded");
					}
				});
			}
		});
	}
}