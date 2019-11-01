import express from "express";
import { validationResult } from "express-validator";
import fs from "fs";
import { ObjectID } from "mongodb";

export class Controller {

    public makeContent(req: express.Request) {
        if (req.file) {
            // const img = fs.readFileSync(req.file.path);
            // const encodeImg = img.toString("base64");
            const finalImg = {
                content: req.file.path, // Buffer.from(encodeImg, "base64")
                contentType: req.file.mimetype
            };
            return finalImg;
        } else {
            const { content } = req.body;
            const finalTxt = {
                content,
                contentType: "text"
            };
            return finalTxt;
        }
    }

    // GET

    public getUsers(req: express.Request, res: express.Response): void {
        req.app.locals.db.collection("users").find().toArray(function(err: any, results: any) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(results);
            }
        });
    }

    public getUser(req: express.Request, res: express.Response): void {
        res.send("GET USER " + req.params.userId);
    }

    public getUserPosts(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            req.app.locals.db.collection("posts").find({ userId: req.params.userId }).
                toArray(function(err: any, results: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.json(results);
                    }
                });
        }
    }

    public getUserComments(req: express.Request, res: express.Response): void {
        res.send("GET USER " + req.params.userId + "'s COMMENTS");
    }

    public getSongs(req: express.Request, res: express.Response): void {
        res.send("GET SONGS");
    }

    public getSong(req: express.Request, res: express.Response): void {
        res.send("GET SONG " + req.params.songId);
    }

    public getSongPosts(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            req.app.locals.db.collection("posts").find({ songId: req.params.songId }).
                toArray(function(err: any, results: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.json(results);
                    }
                });
        }
    }

    public getPosts(req: express.Request, res: express.Response): void {
        req.app.locals.db.collection("posts").find().toArray(function(err: any, results: any) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(results);
            }
        });

    }

    public getPost(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            req.app.locals.db.collection("posts").findOne({ _id: req.params.postId },
                function(err: any, result: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                });
        }
    }

    public getPostComments(req: express.Request, res: express.Response): void {
        res.send("GET POST " + req.params.postId + "'s COMMENTS");
    }

    public getComments(req: express.Request, res: express.Response): void {
        res.send("GET COMMENTS");
    }

    public getComment(req: express.Request, res: express.Response): void {
        res.send("GET COMMENT " + req.params.commentId);
    }

    // POST
    public postUser(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {

            const { username, firstName, lastName } = req.body;
            const doc = { username, firstName, lastName };

            req.app.locals.db.collection("users").insertOne(doc, function(err: any, response: any) {
                if (err) { // Handle errors here
                    res.sendStatus(500);
                } else {  // Success
                    res.json(response.ops[0]); // Respond with created object
                }
            });
        }
    }

    public postSong(req: express.Request, res: express.Response): void {
        res.send("POST SONG");
    }

    public postPost(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            const token = { userId: new ObjectID("5db72ec8d6e7710abea573bd") };
            const content = this.makeContent(req);
            const doc = { songId: req.params.songId, userId: token.userId, content };

            req.app.locals.db.collection("posts").insertOne(doc, function(err: any, response: any) {
                if (err) { // Handle errors here
                    res.sendStatus(500);
                } else {  // Success
                    res.json(response.ops[0]); // Respond with created object
                }
            });
        }
    }

    public postComment(req: express.Request, res: express.Response): void {
        res.send("POST COMMENT UNDER POST " + req.params.postID);
    }

    // PUT
    public putUser(req: express.Request, res: express.Response): void {
        res.send("PUT USER " + req.params.userId);
    }

    public putSong(req: express.Request, res: express.Response): void {
        res.send("PUT SONG " + req.params.songId);
    }

    public putPost(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            const content = this.makeContent(req);
            const newValues = { $set: { content } };
            req.app.locals.db.collection("posts").updateOne({ _id: req.params.postId }, newValues,
                function(err: any, response: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.json(response.result);
                    }
                });
        }
    }

    public putComment(req: express.Request, res: express.Response): void {
        res.send("PUT COMMENT " + req.params.commentId);
    }

    // DELETE
    public deleteUser(req: express.Request, res: express.Response): void {
        res.send("DELETE USER " + req.params.userId);
    }

    public deleteSong(req: express.Request, res: express.Response): void {
        res.send("DELETE SONG " + req.params.songId);
    }

    public deletePost(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            req.app.locals.db.collection("posts").deleteOne({ _id: req.params.postId },
                function(err: any, response: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.json(response.result);
                    }
                });
        }
    }

    public deleteComment(req: express.Request, res: express.Response): void {
        res.send("DELETE COMMENT " + req.params.commentId);
    }
}
