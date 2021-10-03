const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const user = jwt.verify(req.header('Authorization'), 'secret');
    if (!user) res.status(400).send('error')
    req.user = user;
    next()
  } catch(err) {
    console.log(err);
    next()
  };
};

//    res.status(200).header("Access-Control-Expose-headers", "Authorization")
 // .header('Authorization', token)