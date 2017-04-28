var restify = require('restify');
var builder = require('botbuilder');

// ==========================================
// Bot Setup
// ==========================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function(){
  console.log('%s listening at %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector, [
  function (session) {
    builder.Prompts.text(session, "Aww... I miss you...How are you doing?");
  },
  function (session, results) {
    session.userData.miss = results.response;
    builder.Prompts.food(session, "Hey there " + results.response + ", what is your favorite food? I never know.");
  },
  function (session, results) {
    session.userData.food = results.response;
    session.send("Got ya...I will cook you " + session.results.response + " next time! :)");
  }
]);
server.post('/api/messages', connector.listen());

// ==========================================
// Bot Dialogs
// ==========================================
// bot.dialog('/', function (session) {
//     session.send("Hey this is Mia. What's up? **Hugggss** <3");
// });
