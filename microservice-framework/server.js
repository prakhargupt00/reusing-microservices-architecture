let body_parser = require('body-parser')
let express = require('express')

let app = express()
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

let port = process.env.PORT || 8080;
let router = express.Router();

// logging function
router.use(function(req, res, next) {
    console.log('Received request: ' + JSON.stringify(req.body));
    next();
});

router.get('/', function(req, res) {
    message = {
        text: 'TEST: API is working fine! <br> pass data to /api endpoint'
    }
    res.json(message);
});

router.post('/api', function(req, res) {

    // TODO: Add logic for parsing JSON for the microservice

    message = {
        text: 'POST request recieved!'
    }
    res.json(message);
});

app.use('/', router);
app.listen(port);

console.log("Server listening at port: " + port);