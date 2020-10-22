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
const accountRouter = require('./routes/account');
const adminAccount = require('./routes/admin_account');
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

// OIDC calls included as another option
// (not implemented)
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
app.use('/api/admin_account', ds_secret, adminAccount);
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

module.exports = app;