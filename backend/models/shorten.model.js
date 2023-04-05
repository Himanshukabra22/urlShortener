const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
    client: {
        type:String,
        required:true,
    },
    shorten: {
        type:String,
        required:true,
    }
},{
  collection: 'urlData'
});

module.exports = mongoose.model("urlData", dataSchema);