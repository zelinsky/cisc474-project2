import express from "express";

export class Controller {
    // GET
    public getUsers(req: express.Request, res: express.Response): void {
        res.send("GET USERS");
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
        res.send("GET POSTS");
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
        res.send("POST USER");
    }

    public postSong(req: express.Request, res: express.Response): void {
        res.send("POST SONG");
    }

    public postPost(req: express.Request, res: express.Response): void {
        res.send("POST POST UNDER SONG " + req.params.songId);
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
