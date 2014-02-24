var models = require('../app/models');
var geocoderProvider = 'google';
var httpAdapter = 'http';
var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter);

module.exports = {
	test: function(doc){
		var postcode = doc.get('Organisation_postcode');
		if(postcode){
			geocoder.geocode(postcode, function(err, res) {
				models.Record.update({'Organisation_postcode':postcode}, {lat:res[0].latitude, lon:res[0].latitude}, function(err,data){
					console.log('record updated: ' + data);
				});
			});
		} else {
			console.log("No postcode: " + doc);
		}

	}
}