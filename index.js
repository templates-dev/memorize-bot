'use strict';

const express = require('express'),
      config = require('config'),
      request = require('request'),
      async = require('async'),
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
bot.addGreeting("Japanese-English-Mongolian dictionary chatbot. It lets you find words, kanji and more quickly and easily.");
bot.addGetStartedButton();
bot.addPersistentMenu([
    {
      "locale":"default",
      "composer_input_disabled": false,
      "call_to_actions":[
        {
          "title":"Home",
          "type":"postback",
          "payload":"HOME"
        },
        {
          "title":"Nested Menu Example",
          "type":"nested",
          "call_to_actions":[
            {
              "title":"Who am I",
              "type":"postback",
              "payload":"WHO"
            },
            {
              "title":"Joke",
              "type":"postback",
              "payload":"joke"
            },
            {
              "title":"Contact Info",
              "type":"postback",
              "payload":"CONTACT"
            }
          ]
        },
        {
          "type":"web_url",
          "title":"Source code",
          "url":"https://github.com/techstar-cloud/memorize-bot",
          "webview_height_ratio":"full"
        }
      ]
    }
  ]);
    
let dataSet = [];

function getWords() {
  request({
    uri: 'https://jisho.techstar.cloud/api/words',

  }, function (error, response, body) {
    if (!error) {
      const parsed = JSON.parse(body);
      const words = parsed.memorize;
      
      async.each(words, function(word, callback){
        dataSet.push({input: word.meanings, output: { meanings: word.meanings, meaningsMongolia: word.meaningsMongolia,  character: word.character, kanji: word.kanji, partOfSpeech: word.partOfSpeech } });
        
      }, function(error){
          console.error(error);
      });
      bot.learn(dataSet);
    } else {
      console.error("Failed calling jisho API");
    }
  });  
}

getWords();

//Train the neural network with an array of training data.
// bot.learn(dataSet);

//Subscribe to messages sent by the user with the bot.on() method.
bot.on('message', (event) => {
   
  const senderID = event.sender.id,
        message = event.message;
      
  if (message.text) {
      const result = bot.answer(message.text.toLowerCase());
      
      
      if (result == null || result == '') {
        bot.sendTextMessage(senderID, "Мэдэхгүй үг байна. ");
      } else {
        const word = JSON.parse(result);
        bot.sendTextMessage(senderID, word.character+" "+word.kanji+" "+word.meaningsMongolia+" "+word.partOfSpeech);
      }
  } 
});
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});