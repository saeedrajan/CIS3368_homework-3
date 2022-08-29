// First I made the necessary imports and initializations 
var express = require('express');
// for building the endpoints
var app = express();
// needed for express
const bodyParser  = require('body-parser');
// Rest api libary
const axios = require('axios');
app.use(bodyParser.urlencoded());
// tells the app the template engine
app.set('view engine', 'ejs');

// After the import i created the get at the index
app.get('/', function(req, res) {
    // renders the index ejs template
    res.render('pages/index', {
        // I passed these placeholder var so it does not show anything when there is no data
        ali: '',
        heroList: [],
        image: '',
        name: ''
    })
})
// the post endpoint 
app.post('/', function(req, res) {
    // gets the reponse for the submited hero name
    axios.get('https://superheroapi.com/api/10221405381743383/search/' + req.body['textbox'])
    .then((response)=>{
        let heroData = response.data;
        res.render('pages/index', {
            // renders the page and passes the var of the response
            ali: 'Aliases:',
            // used the 0 as an index so if there is multiple of response it does not crash
            heroList: heroData.results[0]['biography']['aliases'],
            image: heroData.results[0]['image']['url'],
            name: heroData.results[0]['biography']['full-name']
        });
    })
});
console.log("Listening on port 8080")
app.listen(8080)