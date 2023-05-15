import { validPassword } from "@lib/authUtil";
import User from "@models/user";
import express from "express";
import passport from "passport";
import passportLocal, { IVerifyOptions } from "passport-local";

const LocalStrategy = passportLocal.Strategy;

const VerifyCallback = async (
  email: string,
  password: string,
  done: (error: any, user?: Express.User | false, options?: IVerifyOptions) => void,
) => {
  const user = await User.findOne({ email: email });

  if (user) {
    if (validPassword(password, user.password, user.salt)) {
      console.log("loggin", validPassword(password, user.password, user.salt));
      return done(null, user, { message: "user logged in" });
    }
    return done(null, false, { message: "Wrong Password" });
  }

  return done(null, false, { message: "user not present" });
};
const localStrategy = new LocalStrategy({ usernameField: "email", passwordField: "password" }, VerifyCallback);

const passportLoader = ({ app }: { app: express.Application }) => {
  passport.use(localStrategy);

  passport.serializeUser((user, done) => {
    done(null, user);
  });             

  passport.deserializeUser((userId, done) => {
    try {
      const user = User.findById(userId);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  app.use(passport.initialize());
  app.use(passport.session());
  console.log('passport initialiased');
};                                                                                                                           
export default passportLoader;                                                          
