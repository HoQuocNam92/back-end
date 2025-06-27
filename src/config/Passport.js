const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AuthService = require("../services/auth.service");

const LoginWithGoogle = ()=>{
  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.CALLBACKURL,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const google_id = profile.id;
      const email = profile.emails[0].value;
      const userName = profile.displayName;
      const data = { google_id, email, userName };
      const user = await AuthService.loginGmail(data);
      return  done(null, user);
    } catch (error) {
    return  done(error);
    }
  }));
}
module.exports = LoginWithGoogle;  
