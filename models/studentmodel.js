var mongoose = require('mongoose');

var batchSchema = mongoose.Schema({
  stdid: {
    type: String,
    unique: true
  },
  stdname: {
    type: String
  }
    
});



module.exports = mongoose.model('index', batchSchema);
