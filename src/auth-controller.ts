import express from "express"; 
const bcrypt = require("bcrypt-nodejs"); 
const jwt = require("jsonwebtoken"); 
export class AuthController{ 
    public register = (req: express.Request, res: express.Response) => {
        console.log('called');  
        let username: string = req.body.username; 
        let firstName: string = req.body.firstName; 
        let lastName: string = req.body.lastName; 
        let password: string = req.body.password; 

        // ensure the user inputted all necessary data
        if (!username){ 
            return res.status(422).json({error : "Enter your username"});
        } 
        if (!password){ 
            return res.status(422).json({error: "Enter a password"}); 
        }
        if (!lastName){ 
            return res.status(422).json({error: "Enter Your Last Name"}); 
        }
        if (!firstName){ 
            return res.status(422).json({error: "Enter Your first name"}); 
        }

        // now check if the user already exists in the database 
        let query: Object = {username: username}; 
        var newUser: any = {username: username, 
            firstName: firstName, 
            lastName: lastName, 
            password: password}; 
        req.app.locals.db.collection("users").findOne(query, (err: Error, existingUser: Object) => {
            if (existingUser){ 
                res.status(422).json({error: "This username is already in the database"}); 
            }
            else{ 
                let SALT_FACTOR: number = 5; 
                bcrypt.genSalt(SALT_FACTOR, (err:Error, salt: string) => {
                    if (err) return err;
                
                    bcrypt.hash(newUser.password, salt, null, (err:Error, hash:string) => {
                        if (err) return err;
                        newUser.password = hash; 
                        req.app.locals.db.collection("users").insertOne(newUser);
                        delete newUser.password; 
                        let token:string = this.generateToken(newUser); 
                        res.status(200).json({status : "success", token: 'Bearer ' + token});
                        
                    });
                  });
                 
            }
        }); 
        
    }
    public login = (req: express.Request, res: express.Response) => { 
        console.log('hi'); 
        let username: string = req.body.username; 
        let password: string = req.body.password; 
        
        req.app.locals.db.collection("users").findOne({username: username}, (err: Error, user: any) => {
            if (!user){
                return res.status(400).json({error: "username not found"}); 
            }
            this.comparePassword(password, user.password, (err: Error, isMatch: boolean) => { 
                if (err){ 
                    console.log(err); 
                    return res.status(500).json({error: "bad data"}); 
                }
                if (!isMatch){ 
                    return res.status(400).json({error: "login details could not be verified"}); 
                }
                else { 
                    delete user.password; 
                    return res.status(200).json({token: "Bearer " + this.generateToken(user)}); 
                }
            }); 
        }); 
    }
    public comparePassword = (inputPass: string, dbPass: string, callback: (err: Error, result: boolean) => void) => {
        if (dbPass ==='*') {callback(null,false);return;}
        bcrypt.compare(inputPass, dbPass, function (err:Error, isMatch:boolean) {
            if (err) { return callback(err, false); }

            callback(null, isMatch);
        });
    }
    public generateToken = (user: Object) =>{
        return jwt.sign(user, "SuperSecretKeyzz", //this is post quantum security 
        {
            expiresIn: 10080 // in seconds
        });
    }
    public test = (req: express.Request, res: express.Response) => { 
        let resp: string = req.body.test; 
        return res.status(200).json({jimmy: resp}); 
    }
}

