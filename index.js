'use strict';

const express = require('express'),
      config = require('config'),
      Intelligo = require('intelligo');
      
const app = express();

const PAGE_ACCESS_TOKEN = (process.env.PAGE_ACCESS_TOKEN) ?
  (process.env.PAGE_ACCESS_TOKEN) :
  config.get('PAGE_ACCESS_TOKEN');
  
const VALIDATION_TOKEN = (process.VALIDATION_TOKEN) ?
  (process.env.VALIDATION_TOKEN) :
  config.get('VALIDATION_TOKEN');
  
const APP_SECRET = (process.env.APP_SECRET) ?
  (process.env.APP_SECRET) :
  config.get('APP_SECRET');

const bot = new Intelligo({
  PAGE_ACCESS_TOKEN: PAGE_ACCESS_TOKEN,
  VALIDATION_TOKEN: VALIDATION_TOKEN,
  APP_SECRET: APP_SECRET,
  FB_URL: 'https://graph.facebook.com/v3.1/',
  app: app
});

bot.initWebhook();

//Train the neural network with an array of training data.
bot.learn([
  { input: 'I feel great about the world!', output: 'happy' },
  { input: 'The world is a terrible place!', output: 'sad' },
]);

//Subscribe to messages sent by the user with the bot.on() method.
bot.on('message', (event) => {
   
  const senderID = event.sender.id,
        message = event.message;
      
  if (message.text) {
      const result = bot.answer(message.text);
      
      if (result == null || result == '')
        bot.sendTextMessage(senderID, "I don't now");
      else
        bot.sendTextMessage(senderID, result+"");
  } 
});
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});