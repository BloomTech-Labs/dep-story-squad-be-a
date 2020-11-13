// FOR TESTING ONLY:
// DS endpoints can be protected with this middleware
// DS_ADMIN_SECRET should be set as environment variable
// (match between back end and DS environments)

const ds_admin_secret =
  process.env.DS_ADMIN_SECRET || 'xD5w6CTfQSh6qs4xviIV6viQomie3ePjQQeDQjsr';

const dsAdmin = (req, res, next) => {
  if (req.headers.authorization == ds_admin_secret) {
    next();
  } else {
    res.status(401).json({ message: 'Could not match DS admin secret.' });
  }
};

// export default dsAdmin;
module.exports = dsAdmin;