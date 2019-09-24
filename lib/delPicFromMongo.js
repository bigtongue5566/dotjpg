const Pic = require('../models/pic');

module.exports = function(id){
    return new Promise((resovle,reject)=>{
        Pic.findByIdAndRemove(id,err=>{
            if(err){
                reject(err)
            }else{
                resovle()
            }
        })
    })
}
