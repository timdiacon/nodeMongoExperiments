var models = require('../app/models');
var geo = require('./geocoding.js');

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

    geocodeAddress: function(req, res){
        console.log("init geo code address");
        res.json("This might take a while");

        var query = models.Record.find({});
        var stream = query.stream();

        stream.on('data', function (doc) {
            geo.test(doc);
        }).on('error', function (err) {
            console.log("Error: " + err);
        }).on('close', function () {
            console.log("We're all done");
        });
    }
};
