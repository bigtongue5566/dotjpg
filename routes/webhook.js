const express = require('express');
const router = express.Router();
const sendImgMessage = require('../lib/sendImgMessage.js');
const sendGenericMessage = require('../lib/sendGenericMessage');

// for Facebook verification
router.get('/', function(req, res, next) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong token');
});

router.post('/', function(req, res) {
    let messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i];
        let sender = event.sender.id;
        if (event.message && event.message.text) {
            let text = event.message.text;
            sendGenericMessage(sender, text);
        }
    }
    res.sendStatus(200);
});

module.exports = router;
