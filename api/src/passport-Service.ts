import { doesNotReject } from "assert";

const passport = require('passport'); 
const JwtStrategy = require('passport-jwt').Strategy; 
const ExtractJwt = require('passport-jwt').ExtractJwt; 

const JwtOptions = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: "SuperSecretKeyzz" 
};
const JwtLogin = new JwtStrategy(JwtOptions, function(payload: Object, callback: any){
    console.log(payload);
    console.log(callback); 
    callback(null, payload); 
    
});
passport.use(JwtLogin);
 
export class PassportService{ 
    
    public requireAuth = passport.authenticate('jwt', { session: false });  

}