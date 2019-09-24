const Pic = require('../models/pic');

module.exports = function(pic){
    return new Promise((resovle,reject)=>{
        Pic.findByIdAndUpdate(pic._id,{tags:pic.tags},err=>{
            if(err){
                reject(err)
            }else{
                resovle()
            }
        })
    })
}
