const jwt = require("jsonwebtoken");
const message = require("./config/constant");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res
      .status(401)
      .send({ status: message.FAIL, message: message.DATA_NO_TOKEN });

  try {
    const verified = jwt.verify(token, message.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ status: message.FAIL, data: message.DATA_WRONG });
  }
};
