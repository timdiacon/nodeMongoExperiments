var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var RecordSchema = new Schema({
    Organisation_name: { type: String },
    Organisation_address_line_1 : { type: String},
    Organisation_country : { type: String},
    Nature_of_Work_description: { type: String},
    lat: {type: String},
    lon: {type: String}
});

module.exports = {
    Record: mongoose.model('Record', RecordSchema , "records")
};
