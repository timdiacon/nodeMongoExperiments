var models = require('../app/models');
// geocoding vars
var geocoderProvider = 'google'; //'datasciencetoolkit';
var httpAdapter = 'http';
var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter);


module.exports = {
    index: function(req, res) {
        models.Record.find({},{},{limit:10}, function(err, data) {
            res.json(data);
        });
    },
    
    findByName: function(req, res) {
        var name = req.params.name;
        var skip = req.params.skip
        models.Record.find({Organisation_name: { $regex:name, $options: 'i' }},{},{limit:10, skip:skip}, function(err, data){
            if(err){
                res.json({error: 'Record not found.'});
            } else {
                res.json(data);
            }
        });
    },

    // returns total number of records with a given name (used to create pagination)
    getNameCount: function(req, res){
        var name = req.params.name;
        models.Record.count({Organisation_name: { $regex:name, $options: 'i' }},function(err, count){
            if(err){
                res.json({error: 'Record not found.'});
            } else {
                res.json(count);
            }
        });
    },

    findNearMe: function(req, res){

        // geo code the postcode
        geocoder.geocode(req.params.postcode, function(err, data) {
            if(err){
                res.json(err);
            } else {                
                models.Record.find({Organisation_loc :{ $near:{ $geometry:{ type:"Point" , coordinates:[data[0].longitude, data[0].latitude] } , $maxDistance:500}}}, null, {limit:10}, function(err, cur){
                    if(err){
                        res.json({error: 'Record not found.'});
                    } else {
                        res.json(cur);
                    }
                });
            }
        });
    },

    // Adds geocoded location data to any record with a postcode
    geocodeAddress: function(req, res){
        console.log("geocoding init");
        res.json("This might take a while");

        var query = models.Record.find({Organisation_postcode: {$exists:true}, Organisation_loc:{$exists:false}},null, {limit:1});
        var stream = query.stream();

        stream.on('data', function (doc) {
            
            // get the geo data
            geocoder.geocode(doc.get('Organisation_postcode'), function(err, data) {
                if(err){
                    console.log("Error geocoding: " + doc._id + " / " + err);
                } else {
                    // convert to GeoJSON
                    var geo = { "type": "Point", "coordinates": [data[0].longitude, data[0].latitude] };
                    // set the value
                    models.Record.update({_id:doc._id}, {Organisation_loc:geo}, function(err,data){
                        if(err){
                            console.log("Error updating record: " + doc._id + " / " + err);
                        } else {
                            console.log(doc._id + " succesfully geocoded");
                        }
                    });
                }
            });

        }).on('error', function (err) {
            console.log("Error: " + err);
        }).on('close', function () {
            console.log("Stream Complete");
        });
    }
};
