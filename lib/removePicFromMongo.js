const Pic = require('../models/pic');
const escapeStringRegexp = require('escape-string-regexp');

module.exports = function(text,callback){
  Pic.findOne({tags:new RegExp(escapeStringRegexp(text),"i")},function(err,pic) {
    callback(pic);
  });
}
