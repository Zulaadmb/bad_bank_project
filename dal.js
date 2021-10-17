const MongoClient   = require('mongodb').MongoClient;
const url           = process.env.MONGODB_URI || 'mongodb://localhost:27017';
let db              = null;

//connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    //connect to myproject database
    db = client.db('myproject');
});

//create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
}

//all users
function all(){
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    });
};

//all users History
function allHistory(email){
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('transactionHistory')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    });
};

//one user
function findOne(email){
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    });
}

//write user
function updateOne(email, newBalance){
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .updateOne({email: email}, {$set: {balance: newBalance} });
    });
};

//create user account
function createHistory(timeStamp, email, balance, description){
    return new Promise((resolve, reject) => {
        const collection = db.collection('transactionHistory');
        const doc = {timeStamp, email, balance, description};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
}


module.exports = {create, all, findOne, updateOne, createHistory, allHistory};