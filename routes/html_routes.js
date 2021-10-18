const path = require('path');

module.exports = function (app) {
    app.get('/', function (req, res) {
        console.log(req);
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });

};