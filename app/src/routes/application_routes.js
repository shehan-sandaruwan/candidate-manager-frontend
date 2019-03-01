const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
var http = require("http");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const {serverUrl,serverPort} = require('../constants');

//GET method
router.get('/', (req, res) => {
    var queryParams = {
        host: serverUrl,
        port: serverPort,
        path: '/application',
        method: 'GET'
    };
    var request = http.request(queryParams, function(response) {
        //var parsed = JSON.parse(response);
        response.setEncoding('utf8');
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
            
        });
        response.on('end',function(){
            var parsed = JSON.parse(str);
            
            res.send(parsed);
        });
        

    });
    request.end();
    
});




module.exports = router;