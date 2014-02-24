var home = require('../controllers/home'),
    records = require('../controllers/records');

module.exports.initialize = function(app) {
    app.get('/', home.index);

    app.get('/api/records', records.index);
    app.get('/api/records/:name/:skip', records.findByName);
    app.get('/api/recordcount/:name', records.getNameCount);
    app.get('/api/geocode', records.geocodeAddress);
};
