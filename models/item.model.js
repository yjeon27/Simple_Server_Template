const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
    name: {type: String, required: true, max: 100},
    type: {type: String, required: true},
    due:  {type: Number, required: false}
});


// Export the model
module.exports = mongoose.model('Item', ItemSchema);