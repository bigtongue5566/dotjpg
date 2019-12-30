const request = require('request')
const token = process.env.Token;
const findPicsFromMongo = require('./findPicsFromMongo');
const sendTextMessage = require('./sendTextMessage')

module.exports = function(sender,text) {
  let messageData = {
      "attachment": {
          "type": "template",
          "payload": {
              "template_type": "generic",
              "elements": []
          }
      }
  };
  findPicsFromMongo(text, function(pics) {
    if (pics&&pics.length) {
      let count = 1;
      for (pic of pics) {
        //"item_url": pic.url,
        let element = {
            "title": '#' + count++,
            "default_action":{
              "type":"web_url",
              "url": pic.imgurObject.link,
              "webview_height_ratio": "compact"
            },
            "image_url": pic.imgurObject.link,
        };
        messageData.attachment.payload.elements.push(element);
        if (count > 10) {
            break;
        }
      }
      request({
          url: 'https://graph.facebook.com/v2.6/me/messages',
          qs: {
              access_token: token
          },
          method: 'POST',
          json: {
              recipient: {
                  id: sender
              },
              message: messageData,
          }
      }, function(error, response, body) {
          if (error) {
              console.log('Error sending messages: ', error)
          } else if (response.body.error) {
              console.log('Error: ', response.body.error)
          }
      });
    }else{
        sendTextMessage(sender,'沒有找到有關的圖片')
    }
  });
}
