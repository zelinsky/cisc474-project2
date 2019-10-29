import express from "express";
import { validationResult } from "express-validator";

export class Controller {
    // GET
    public getUsers(req: express.Request, res: express.Response): void {
        req.app.locals.db.collection("users").find().toArray(function (err: any, results: any) {
            if (err) {
                console.log("GET USERS ERROR");
            } else {
                res.json(results);
            }
        });
    }

    public getUser(req: express.Request, res: express.Response): void {
        res.send("GET USER " + req.params.userId);
    }

    public getUserPosts(req: express.Request, res: express.Response): void {
        res.send("GET USER " + req.params.userId + "'s POSTS");
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
        res.send("GET SONG " + req.params.songId + "'s POSTS");
    }

    public getPosts(req: express.Request, res: express.Response): void {
        req.app.locals.db.collection("posts").find().toArray(function (err: any, results: any) {
            if (err) {
                console.log("GET USERS ERROR");
            } else {
                res.json(results);
            }
        });

    }

    public getPost(req: express.Request, res: express.Response): void {
        res.send("GET POST " + req.params.postId);
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

            const {username, firstName, lastName} = req.body;
            const doc = {username, firstName, lastName};

            req.app.locals.db.collection("users").insertOne(doc, function(err: any, response: any) {
                if (err) { // Handle errors here
                    console.log("POST USER ERROR");
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
        req.body.songId = req.params.songId;
        req.app.locals.db.collection("posts").insertOne(req.body, function (err: any, response: any) {
            if (err) { // Handle errors here
                console.log("POST USER ERROR");
            } else {  // Success
                res.send(response.ops[0]); // Respond with created object
            }
        });
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
        res.send("PUT POST " + req.params.postId);
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
        res.send("DELETE POST " + req.params.postId);
    }

    public deleteComment(req: express.Request, res: express.Response): void {
        res.send("DELETE COMMENT " + req.params.commentId);
    }
}
