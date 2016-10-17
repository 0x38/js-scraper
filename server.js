/**
 * Crawler data Server
 */
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var async = require('async');
var morgan = require('morgan');
var _ = require('lodash');

var app = express();

//We're going to use Body Parser JSON to parse the json sent to the server
app.use(bodyParser.json());
app.use(morgan('dev'));

var mongoose = require ("mongoose");

// connection string
var dbUrl = 'mongodb://localhost/crawler_data';

var blogs = require('./modules/blogs/blogs.routes');
var events = require('./modules/events/events.routes');
var jobs = require('./modules/jobs/jobs.routes');
var sitemaps = require('./modules/sites/sitemap.routes');

// connect to the database
mongoose.connect(dbUrl, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + dbUrl + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + dbUrl);
  }
});

app.use('/blog', blogs);
app.use('/event', events);
app.use('/job', jobs);
app.use('/sitemap', sitemaps);


app.get('/', function(req, res) {
  res.json("Hello");
});

//Set up our app to listen on port 3000
app.listen(3000);

