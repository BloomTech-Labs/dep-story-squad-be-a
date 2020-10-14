// import createError from 'http-errors';
// import express from 'express';
// import cors from "cors";
// import cookieParser from 'cookie-parser';
// import logger from 'morgan';
// import helmet from 'helmet';

const { createError } = require('http-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const { ExpressOIDC } = require('@okta/oidc-middleware');
const session = require('express-session');

// Middleware:
const authRequired = require('./middleware/authRequired');
const ds_secret = require('./middleware/ds_secret');

// Routers:
// import accountRouter from './routes/account';
// import ds_story from './routes/ds_story';
// import promptRouter from './routes/prompt';
// import readingRouter from './routes/reading';
// import storyRouter from './routes/story';
// import stripeRouter from './routes/stripe';
// import studentRouter from './routes/student';
const accountRouter = require('./routes/account');
const ds_story = require('./routes/ds_story');
const promptRouter = require('./routes/prompt');
const readingRouter = require('./routes/reading');
const storyRouter = require('./routes/story');
const stripeRouter = require('./routes/stripe');
const studentRouter = require('./routes/student');

var app = express();

app.use('/apidoc', express.static('../apidoc'));
app.use(helmet());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(
  cors({
    origin: '*',
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const oidc = new ExpressOIDC({
  issuer: process.env.OKTA_URL_ISSUER,
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  appBaseUrl: process.env.BASE_URL,
  loginRedirectUri: `${process.env.BASE_URL}/callback`,
  scope: 'openid profile',
  routes: {
    loginCallback: {
      path: '/callback'
    },
  }
});
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));
app.use(oidc.router);

// application routes
app.use('/api/account', authRequired, accountRouter);
app.use('/api/ds_story', ds_secret, ds_story);
app.use('/api/prompt', authRequired, promptRouter);
app.use('/api/reading', authRequired, readingRouter);
app.use('/api/story', authRequired, storyRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/student', authRequired, studentRouter);

app.get('/api', (req, res) => {
  res.status(200).json({ api: "up" });
});

app.get('/', (req, res) => {
  res.status(200).json({ api: "up" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new createError.NotFound(`Route '${req.url}' Not Found.`));
});

// error handler
app.use(function (err, req, res, next) {
  if (createError.isHttpError(err)) {
    res.locals.message = err.message;
    res.locals.status = err.statusCode;
    if (process.env.NODE_ENV === 'development') {
      res.locals.error = err;
    }
  }
  
  if (process.env.NODE_ENV === 'production' && !res.locals.message) {
    res.locals.message = 'ApplicationError';
    res.locals.status = 500;
  }
  if (res.locals.status) {
    res.status(res.locals.status || 500);
    const errObject = { error: res.locals.error, message: res.locals.message };
    return res.json(errObject);
  }
  next(err);
});

module.exports = app;