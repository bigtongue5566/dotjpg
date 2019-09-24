const Pic = require('../models/pic');

module.exports = function(){
  return Pic.find({});
}
