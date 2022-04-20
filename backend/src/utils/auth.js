const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const config = require("./const");
const { SECRET } = require("../../configuration");

function auth() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: SECRET,
  };

  passport.use(
    new JwtStrategy(opts, (payload, callback) => {
      callback(null, payload);
    })
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", {
  session: false,
});
