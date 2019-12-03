import express from "express";
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

import {IGetUserAuthInfoRequest} from "./helpers"; 

//import * as bcrypt from "bcrypt";
//import * as jwt from "jsonwebtoken";

export class AuthController {
    public register = (req: express.Request, res: express.Response) => {
        console.log("called");
        const username: string = req.body.username;
        const firstName: string = req.body.firstName;
        const lastName: string = req.body.lastName;
        const password: string = req.body.password;

        // ensure the user inputted all necessary data
        if (!username) {
            return res.status(422).json({error : "Enter your username"});
        }
        if (!password) {
            return res.status(422).json({error: "Enter a password"});
        }
        if (!lastName) {
            return res.status(422).json({error: "Enter Your Last Name"});
        }
        if (!firstName) {
            return res.status(422).json({error: "Enter Your first name"});
        }

        // now check if the user already exists in the database
        const query: Object = {username};
        const newUser: any = {
            firstName,
            lastName,
            password,
            username};
        req.app.locals.db.collection("users").findOne(query, (err: Error, existingUser: object) => {
            if (existingUser) {
                res.status(422).json({error: "This username is already in the database"});
            } else {
                const SALT_FACTOR: number = 5;
                bcrypt.genSalt(SALT_FACTOR, (err: Error, salt: string) => {
                    if (err) { return err; }

                    bcrypt.hash(newUser.password, salt, null, (err: Error, hash: string) => {
                        if (err) { return err; }
                        newUser.password = hash;
                        req.app.locals.db.collection("users").insertOne(newUser);
                        delete newUser.password;
                        const token: string = this.generateToken(newUser);
                        res.status(200).json({status : "success", token: "Bearer " + token});

                    });
                  });

            }
        });

    }
    public login = (reqs: express.Request, res: express.Response) => {
        console.log("hi");
        var req: IGetUserAuthInfoRequest = reqs as IGetUserAuthInfoRequest; 
        const username: string = req.body.username;
        const password: string = req.body.password;
        
        req.app.locals.db.collection("users").findOne({username}, (err: Error, user: any) => {
            if (!user) {
                return res.status(400).json({error: "username not found"});
            }
            this.comparePassword(password, user.password, (err: Error, isMatch: boolean) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({error: "bad data"});
                }
                if (!isMatch) {
                    return res.status(400).json({error: "login details could not be verified"});
                } else {
                    delete user.password;
                    return res.status(200).json({token: "Bearer " + this.generateToken(user)});
                }
            });
        });
    }
    public comparePassword = (inputPass: string, dbPass: string, callback: (err: Error, result: boolean) => void) => {
        if (dbPass === "*") {callback(null, false); return; }
        bcrypt.compare(inputPass, dbPass, function(err: Error, isMatch: boolean) {
            if (err) { return callback(err, false); }

            callback(null, isMatch);
        });
    }
    public generateToken = (user: object) => {
        return jwt.sign(user, "SuperSecretKeyzz", // this is post quantum security
        {
            expiresIn: 10080 // in seconds
        });
    }
    public test = (req: express.Request, res: express.Response) => {
        const resp: string = req.body.test;
        console.log(req);
        return res.status(200).json({jimmy: resp});
    }
}
