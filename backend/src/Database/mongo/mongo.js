const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://avrental:avrental@cluster0.1ktnd.mongodb.net/avrental?retryWrites=true&w=majority";
const mongoclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoclient.connect();
const db = mongoclient.db('avrental');
module.exports = {mongoclient, db};