"use strict";

var express = require('express');
var path = require('path');
var serveIndex = require('serve-index');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/', serveIndex('public/examples', {'icons': true}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));


// configure folders
var staticFolders = ['css', 'data', 'images', 'js', 'libs'];
app.use(express.static(path.join(__dirname, 'public/examples')));
app.use('/lib', express.static(path.join(__dirname, 'bower_components/')));

staticFolders.forEach(function (item) {
    app.use('/'+item, express.static(path.join(__dirname, 'public/'+item)));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    //res.render('error', {
    //    message: err.message,
    //    error: {}
    //});
});

module.exports = app;