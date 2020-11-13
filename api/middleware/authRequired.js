const OktaJwtVerifier = require('@okta/jwt-verifier');

// expectedAudience will be updated
// (will require Okta account access)
const expectedAudience = 'api://default';
const oktaJwtVerifier = new OktaJwtVerifier({
  // Okta environment variables set manually
  // (only for testing!)
  issuer: `${process.env.OKTA_URL_ISSUER}`,
  clientId: `${process.env.OKTA_CLIENT_ID}`,
  assertClaims: {
    aud: expectedAudience,
  },
});

const testJWT = {
  claims: {
    uid: '',
    username: '',
    email: '',
  },
};

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
const authRequired = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV === 'testing') {
      req.jwt = testJWT;
      return next();
    }
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    
    if (!match) {
      res.status(401).json({ message: 'Token mismatch in Okta middleware.' });
    }

    const accessToken = match[1];
    oktaJwtVerifier
      .verifyAccessToken(accessToken, expectedAudience)
      .then((jwt) => {
        req.jwt = jwt;
        next();
      })
      .catch((err) => {
        if (err.parsedBody.email) {
          /* oktaJwtVerifier currently returns claims in error message.
          If this middleware receives claims in err.parsedBody,
          claims are attached to req.jwt and forwarded to router. */
          req.jwt = {};
          req.jwt.claims = err.parsedBody;
          next();
        } else {
          res
            .status(500)
            .json({ message: 'Okta JWT validation failed.', error: err });
        }
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error caught in Okta middleware.', error: err });
  }
};

module.exports = authRequired;
