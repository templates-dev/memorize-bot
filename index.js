'use strict';

const CryptoBot = require('intelligo'),
      config = require( 'config'),
      request = require( 'request');

function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var isEcho = message.is_echo;
  var messageId = message.mid;
  var appId = message.app_id;
  var metadata = message.metadata;

  var messageText = message.text;
  var messageAttachments = message.attachments;
  var quickReply = message.quick_reply;

  if (isEcho) {
    console.log("Received echo for message %s and app %d with metadata %s", 
      messageId, appId, metadata);
    return;
  } else if (quickReply) {
    var quickReplyPayload = quickReply.payload;
    console.log("Quick reply for message %s with payload %s",
      messageId, quickReplyPayload);

    sendTextMessage(senderID, "Quick reply tapped");
    return;
  }

  if (messageText) {
    
    if (textMatches(messageText, "get started")) 
        sendWelcome(senderID);
        
    else if (textMatches(messageText, "btc")) 
      sendPrice(senderID, messageText);
    else if (textMatches(messageText, "eth")) 
      sendPrice(senderID, messageText);
    else if (textMatches(messageText, "ltc")) 
      sendPrice(senderID, messageText);
    else if (textMatches(messageText, "read receipt")) 
      sendReadReceipt(senderID);
    else if (textMatches(messageText, "typing on")) 
      sendTypingOn(senderID);
    else if (textMatches(messageText, "typing off")) 
      sendTypingOff(senderID);
    else if (textMatches(messageText, "help")) 
      sendHelp(senderID);
    else
      sendWelcome(senderID);
    
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}

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
