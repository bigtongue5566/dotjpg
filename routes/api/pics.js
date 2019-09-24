const express = require('express');
const imgur = require('imgur');
const router = express.Router();
const imgurClientId = process.env.imgur_clientId;
const Pic = require('../../models/pic');
const getAllPicsFromMongo = require('../../lib/getAllPicsFromMongo');
const findPicsFromMongo = require('../../lib/findPicsFromMongo');
const delPicFromMongo = require('../../lib/delPicFromMongo')
const updatePicFromMongo = require('../../lib/updatePicFromMongo')

imgur.setClientId(imgurClientId);
router.get('/', function(req, res, next){
  if(req.query.keyword){
    findPicsFromMongo(req.query.keyword,pics=>{
      res.json(pics)
    })
  }else{
    getAllPicsFromMongo().then(function(pics){
      res.json(pics)
    });  
  }
});


router.post('/', isLoggedIn,function(req, res, next){
  if (!req.body){
    return res.sendStatus(400);
  }
  let uploadPic = req.body;
  const uploadImgToImgur = imgur.uploadBase64(uploadPic.base64)
    .then((json) => {
      if(json.success){
        return json.data;
      }
      throw new Error('uploadError');
    });

  const saveToMongo = uploadImgToImgur.then((imgurObject)=>{
    imgurObject.link = imgurObject.link.replace(/^http:\/\//i, 'https://');
    let pic = new Pic();
    pic.imgurObject = imgurObject;
    pic.tags = uploadPic.tags;
    pic.save((err) => {
      if (err){
        throw new Error('mongoSaveError');
      }
      res.json({success:true});
    });
  }).catch((err)=>{
    console.error(err.message);
    res.status(500).json({success:false,message:err.message});
  });
});

router.put('/:id',isLoggedIn,function(req,res,next){
  if (!req.body){
    return res.sendStatus(400);
  }
  let updatePic = req.body;
  updatePicFromMongo(updatePic).then(()=>{
    res.json({success:true});
  }).catch(err=>{
    console.error(err.message);
    res.status(500).json({success:false,message:err.message});
  })
})

router.delete('/:id',isLoggedIn,function(req,res,next){
  delPicFromMongo(req.params.id).then(()=>{
    res.json({success:true});
  }).catch(err=>{
    console.error(err.message);
    res.status(500).json({success:false,message:err.message});
  })
})


module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
