var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    // need to manually import the Mixed Schema Type
    Mixed = mongoose.Schema.Types.Mixed;

var RecordSchema = new Schema({
    Organisation_name: { type: String },
    Organisation_address_line_1 : { type: String},
    Organisation_country : { type: String},
    Nature_of_Work_description: { type: String},
    Organisation_lat: {type: Number},
    Organisation_lon: {type: Number},
    Organisation_loc: {type: Mixed}
});

module.exports = {
    Record: mongoose.model('Record', RecordSchema , "records")
};
