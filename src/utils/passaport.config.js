const passport = require("passport");
const passportLocal = require("passport-local");
const BdsessionManager = require("../dao/mongoManager/BdsessionManager");
const { REGISTER_STRATEGY, LOGIN_STRATEGY } = require("./constants");
const { hashPassword, comparePassword } = require("./hashPassword");

const initPassaport = () => {
  passport.use(
    REGISTER_STRATEGY ,
    new passportLocal.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },async (req, username, password, done) => {
       
        const { firstName, lastName } = req.body;
        try {
            const exitEmail = await BdsessionManager.getEmail({email:username});
            
            if (exitEmail) {
              done(null, false);
            } else {
              const hash = await hashPassword(password);
              if (username === "adminCoder@coder.com") {
                const user = await BdsessionManager.createSession({
                  firstName: firstName,
                  lastName: lastName,
                  email: username,
                  password: hash,
                  rol: "administrador",
                });
                done(null, user);
              } else {
                const user = await BdsessionManager.createSession({
                  firstName: firstName,
                  lastName: lastName,
                  email: username,
                  password: hash,
                  rol: "users",
                });
                done(null, user);
              }
            }
            
        } catch (error) {
            done(error)
        }
      }
    )
  );
 

  passport.use(
    LOGIN_STRATEGY ,
    new passportLocal.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },async (req, username, password, done) => {
       
        try {
          const user = await BdsessionManager.getEmail({email:username})
          
          const isVadidPassword = await comparePassword(password, user.password)
           if (user && isVadidPassword) {
            done(null, user);
          }else{
            done(null, false);  
          }
         
         } catch (error) {
          done(null, false);
              
        }
      }
    )
  );
  passport.serializeUser((user, done)=>{
    done(null, user._id);
  })
  passport.deserializeUser(async (_id, done)=>{
    const user = await BdsessionManager.UserSession(_id)
    done(null, user)
  })
};




module.exports ={
    initPassaport,
}