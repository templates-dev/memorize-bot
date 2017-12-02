'use strict';

const CryptoBot = require('intelligo'),
      config = require( 'config'),
      request = require( 'request');


const bot = new CryptoBot({
  accessToken: config.get('pageAccessToken'),
  verifyToken: config.get('validationToken'),
  appSecret: config.get('appSecret')
});

bot.start(8000);
bot.learnAI();

function sendPrice(receiptId, messageData) {
  request({
    uri: 'https://api.coinbase.com/v2/prices/'+messageData+'-USD/spot',

  }, function (error, response, body) {
    if (!error) {
      const parsed = JSON.parse(body);
      const price = parsed.data.amount;
      CryptoBot.sendTextMessage(receiptId, messageData+" price: "+price+" USD");
    } else {
      console.error("Failed calling Coinbase API");
    }
  });  
}
