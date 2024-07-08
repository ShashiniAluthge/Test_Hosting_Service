const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(`auth header is ${authHeader}`)
    console.log(`token is ${authHeader}`)
    console.log(token);
    if (token) {
      verify(token, process.env.JWT_SECERET_KEY, (err, decode) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Invalid token",
          });
        } else {
          console.log("im inside tokrn");
          next();
        }
      });
    } else {
      return res.json({
        success: 101,
        message: "No web token found",
      });
    }
  },
};
