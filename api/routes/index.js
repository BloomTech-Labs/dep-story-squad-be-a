import express from 'express';
const router = express.Router();

/**
 * @api {get} / Root path, ping
 * @apiName GetRoot
 * @apiGroup PingAPI
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "api": "up"
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3000/
 */
router.get('/', (req, res) => {
  if (req.userContext) {
    console.log(req.session.passport.user.tokens)
    // res.json({ token: req.session.passport.user.tokens })
    // const token = req.session.passport.user.tokens
    res.send(`
      Hello ${req.userContext.userinfo.name}!
      <form method="POST" action="/logout">
        <button type="submit">Logout</button>
      </form>
    `);
  } else {
    res.send('Please <a href="/login">login</a>');
  }
});
export default router;
