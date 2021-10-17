const bcrypt = require("bcrypt");
var express =   require('express');
var app     =   express();
var cors    =   require('cors');
var dal     =   require('./dal.js');
const session = require('express-session')
const path = require('path');
const port = process.env.PORT || 8080;

const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(express.static("client/build"));
app.use(cors());
app.use(session({secret:'9a22dad3bd3f6a74c258586b1538480db3978bbb'
                    ,name:'9a22dad3bd3f6a74c258586b1538480db3978bbb'
                    ,saveUninitialized:false}))



//create user account
app.post('/account/create', function(req, res) {
    console.log(req);
    // check if user exists already 
    dal.findOne(req.body.email)
    .then((docs) => {
        if (docs.length == 0) {
            dal.create(req.body.name, req.body.email, req.body.password).
            then((user) => {
                console.log(user);
                res.send(user);
            });
        }
        else {
            res.send({code: "error"});
        }
    })
});

app.post('/account/login', urlencodedParser, function (req, res) {
    console.log(req.body.email, req.body.password);
    console.log(req.body);
    dal.findOne(req.body.email)
    .then((docs) => {
        console.log(docs);
        if (docs.length == 0) {
            res.send({code: "error"})
        }
        console.log(docs[0].password, req.body.password);
        if (docs[0].password === req.body.password) {
            req.session.loggedIn = req.body.email;
            res.send({code: "success"});
        }
        else {
            res.send({code: "failed"});
        }
    })
});

app.get('/account/logout', function (req, res) {
    console.log(req.session);
    req.session.loggedIn = undefined;
    res.send(req.session.loggedIn);
});

app.get('/account/info', function(req, res) {
    console.log("Getting info request ",req.session);
    res.send({user: req.session.loggedIn})
});

app.get('/account/balance/:email', function (req, res) {
    console.log(req.params);
    dal.findOne(req.params.email)
    .then((docs) => {
        console.log(docs);
        res.send({ docs: docs});
    })
});

app.post('/account/deposit', function (req, res) {
    console.log(req.body);
    dal.updateOne(req.body.user, req.body.balance)
    dal.createHistory(new Date(), req.params.user, req.body.balance, "deposit")
    .then((docs) => {
        res.send({code: "success"})
    })
});

app.post('/account/withdraw', function (req, res) {
    console.log(req.session);
    dal.updateOne(req.body.user, req.body.balance)
    const now = new Date();
    dal.createHistory(now, req.body.user, req.body.balance, "withdraw")
    .then((docs) => {
        res.send({code: "success"})
    })
});



//all accounts
app.get('/account/all/:email', function(req, res) {
    dal.allHistory(req.params.email).
        then((docs) => {
            console.log(docs);

            res.send(JSON.stringify(docs));
        });
});

require('./routes/html_routes')(app);

app.listen(port);
console.log('Running on port: ' + port);