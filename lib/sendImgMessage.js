const request = require('request')
const token = process.env.Token
const findPicFromMongo = require('./findPicFromMongo');

module.exports = function(sender, text) {
    findPicFromMongo(text,function(pic) {
      let messageData = {
        attachment:{
          type:"image",
          payload:{
            url:pic?pic.url:'http://i.imgur.com/S6un0qA.jpg'
          }
        }
      }
      request({
          url: 'https://graph.facebook.com/v2.6/me/messages',
          qs: {access_token:token},
          method: 'POST',
          json: {
              recipient: {
                id:sender
              },
              message: messageData,
          }
      }, function(error, response, body) {
          if (error) {
              console.log('Error sending messages: ', error)
          } else if (response.body.error) {
              console.log('Error: ', response.body.error)
          }
      })
    });
}
