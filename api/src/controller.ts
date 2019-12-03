import express from "express";
import { validationResult } from "express-validator";
import fs from "fs";
import { ObjectID } from "mongodb";
import { IGetUserAuthInfoRequest, User } from "./helpers";
export class Controller {

    public makeContent(req: express.Request) {
        if (req.file) {
            // const img = fs.readFileSync(req.file.path);
            // const encodeImg = img.toString("base64");
            const finalImg = {
                content: req.file.path.replace("public", ""), // Buffer.from(encodeImg, "base64")
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
        req.app.locals.db.collection("users").find().toArray(function (err: any, results: any) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(results);
            }
        });
    }

    public getUser(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            req.app.locals.db.collection("users").findOne({ _id: req.params.userId },
                function (err: any, result: any) {
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

    public getUserPosts(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            req.app.locals.db.collection("posts").find({ userId: req.params.userId }).
                toArray(function (err: any, results: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.json(results);
                    }
                });
        }
    }

    public getUserComments(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            req.app.locals.db.collection("comments").find({ userId: req.params.userId }).
                toArray(function (err: any, results: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.json(results);
                    }
                });
        }
    }

    public getSongs(req: express.Request, res: express.Response): void {
        req.app.locals.db.collection("songs").find().toArray(function (err: any, results: any) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(results);
            }
        });
    }

    public getSong(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            req.app.locals.db.collection("songs").findOne({ _id: req.params.songId },
                function (err: any, result: any) {
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

    public getSongPosts(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            req.app.locals.db.collection("posts").find({ songId: req.params.songId }).
                toArray(async function (err: any, results: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        const promises = results.map(async (result: any) => {
                            const songResult = await req.app.locals.db.collection("songs").findOne({ _id: result.songId });
                            const userResult = await req.app.locals.db.collection("users").findOne({ _id: result.userId });
                            result.song = songResult;
                            result.user = userResult;
                        });
                        await Promise.all(promises);
                        res.json(results);
                    }
                });
        }
    }

    public getPosts(req: express.Request, res: express.Response): void {
        req.app.locals.db.collection("posts").find().toArray(async function (err: any, results: any) {
            if (err) {
                res.sendStatus(500);
            } else {
                const promises = results.map(async (result: any) => {
                    const songResult = await req.app.locals.db.collection("songs").findOne({ _id: result.songId });
                    const userResult = await req.app.locals.db.collection("users").findOne({ _id: result.userId });
                    result.song = songResult;
                    result.user = userResult;
                });
                await Promise.all(promises);
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
                async function (err: any, result: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else if (result) {
                        const songResult = await req.app.locals.db.collection("songs").findOne({ _id: result.songId });
                        const userResult = await req.app.locals.db.collection("users").findOne({ _id: result.userId });
                        result.song = songResult;
                        result.user = userResult;
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                });
        }
    }

    public getPostComments(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            req.app.locals.db.collection("comments").find({ postId: req.params.postId }).
                toArray(async function (err: any, results: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        const promises = results.map(async (result: any) => {
                            const songResult = await req.app.locals.db.collection("songs").findOne({ _id: result.songId });
                            const userResult = await req.app.locals.db.collection("users").findOne({ _id: result.userId });
                            result.song = songResult;
                            result.user = userResult;
                        });
                        await Promise.all(promises);
                        res.json(results);
                    }
                });
        }
    }

    public getComments(req: express.Request, res: express.Response): void {
        req.app.locals.db.collection("comments").find().toArray(async function (err: any, results: any) {
            if (err) {
                res.sendStatus(500);
            } else {
                const promises = results.map(async (result: any) => {
                    const postResult = await req.app.locals.db.collection("posts").findOne({ _id: result.postId });
                    const songResult = await req.app.locals.db.collection("songs").findOne({ _id: postResult.songId });
                    postResult.song = songResult;
                    const userResult = await req.app.locals.db.collection("users").findOne({ _id: result.userId });
                    result.post = postResult;
                    result.user = userResult;
                    res.json(result);
                });
                await Promise.all(promises);
                res.json(results);
            }
        });
    }

    public getComment(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            req.app.locals.db.collection("comments").findOne({ _id: req.params.commentId },
                async function (err: any, result: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else if (result) {
                        const postResult = await req.app.locals.db.collection("posts").findOne({ _id: result.postId });
                        const songResult = await req.app.locals.db.collection("songs").findOne({ _id: postResult.songId });
                        postResult.song = songResult;
                        const userResult = await req.app.locals.db.collection("users").findOne({ _id: result.userId });
                        result.post = postResult;
                        result.user = userResult;
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                });
        }
    }

    // POST
    public postUser(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {

            const { username, firstName, lastName } = req.body;
            const doc = { username, firstName, lastName };

            req.app.locals.db.collection("users").insertOne(doc, function (err: any, response: any) {
                if (err) { // Handle errors here
                    res.sendStatus(500);
                } else {  // Success
                    res.json(response.ops[0]); // Respond with created object
                }
            });
        }
    }

    public postSong(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            const { title, artist, lyrics } = req.body;
            const doc = { title, artist, lyrics };

            req.app.locals.db.collection("songs").insertOne(doc, function (err: any, response: any) {
                if (err) { // Handle errors here
                    res.sendStatus(500);
                } else {  // Success
                    res.json(response.ops[0]); // Respond with created object
                }
            });
        }
    }

    public postPost(reqs: express.Request, res: express.Response): void {
        //const errors = validationResult(req);
        if (false) {//)!errors.isEmpty()) {
            //res.status(422).json({ errors: errors.array() });
        } else {

            // const token = { userId: new ObjectID("5db72ec8d6e7710abea573bd") };
            const content = this.makeContent(reqs);
            var req: IGetUserAuthInfoRequest = reqs as IGetUserAuthInfoRequest;
            let user: User = req.user as User;
            const doc = { songId: req.params.songId, userId: new ObjectID(user._id), content };
            // console.log(doc);
            req.app.locals.db.collection("posts").insertOne(doc, function (err: any, response: any) {
                if (err) { // Handle errors here
                    res.sendStatus(500);
                } else {  // Success
                    res.json(response.ops[0]); // Respond with created object
                }
            });
        }
    }

    public postComment(reqs: express.Request, res: express.Response): void {
        const errors = validationResult(reqs);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {

            // const token = { userId: new ObjectID("5db72ec8d6e7710abea573bd") };
            var req: IGetUserAuthInfoRequest = reqs as IGetUserAuthInfoRequest;
            const { content } = req.body;
            let user: User = req.user as User;
            const doc = { postId: req.params.postId, userId: new ObjectID(user._id), content };

            req.app.locals.db.collection("comments").insertOne(doc, function (err: any, response: any) {
                if (err) { // Handle errors here
                    res.sendStatus(500);
                } else {  // Success
                    res.json(response.ops[0]); // Respond with created object
                }
            });
        }
    }

    // PUT
    public putUser(req: express.Request, res: express.Response): void {
        // res.send("PUT USER " + req.params.userId);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else if (Object.keys(req.body).length) {
            const values: { [key: string]: any[] } = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username
            };
            //console.log(values);
            for (const v in values) {
                if (!values[v]) {
                    delete values[v];
                }
            }
            //console.log(values);
            const newValues = { $set: values };

            req.app.locals.db.collection("users").updateOne({ _id: req.params.userId }, newValues,
                function (err: any, response: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.json(response.result);
                    }
                });
        } else {
            res.sendStatus(422);
        }
    }

    public putSong(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else if (Object.keys(req.body).length) {
            const values: { [key: string]: any[] } = {
                artist: req.body.artist,
                lyrics: req.body.lyrics,
                title: req.body.title
            };

            for (const v in values) {
                if (!values[v]) {
                    delete values[v];
                }
            }

            const newValues = { $set: values };
            req.app.locals.db.collection("songs").updateOne({ _id: req.params.songId }, newValues,
                function (err: any, response: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.json(response.result);
                    }
                });
        } else {
            res.sendStatus(422);
        }
    }

    public putPost(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            const content = this.makeContent(req);
            const newValues = { $set: { content } };
            req.app.locals.db.collection("posts").updateOne({ _id: req.params.postId }, newValues,
                function (err: any, response: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.json(response.result);
                    }
                });
        }
    }

    public putComment(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            const { content } = req.body;
            const newValues = { $set: { content } };
            req.app.locals.db.collection("comments").updateOne({ _id: req.params.commentId }, newValues,
                function (err: any, response: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.json(response.result);
                    }
                });
        }
    }

    // DELETE
    public deleteUser(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            req.app.locals.db.collection("users").deleteOne({ _id: req.params.userId },
                function (err: any, response: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.json(response.result);
                    }
                });
        }
    }

    public deleteSong(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            req.app.locals.db.collection("songs").deleteOne({ _id: req.params.songId },
                function (err: any, response: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.json(response.result);
                    }
                });
        }
    }

    public deletePost(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            req.app.locals.db.collection("posts").deleteOne({ _id: req.params.postId },
                function (err: any, response: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.json(response.result);
                    }
                });
        }
    }

    public deleteComment(req: express.Request, res: express.Response): void {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            req.app.locals.db.collection("comments").deleteOne({ _id: req.params.commentId },
                function (err: any, response: any) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.json(response.result);
                    }
                });
        }
    }
}
