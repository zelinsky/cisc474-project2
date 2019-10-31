import express from "express";
import { body } from "express-validator";
import {Controller} from "./controller";
import {Validator} from "./validator";

export class ApiRouter {
    private router: express.Router = express.Router();
    private controller: Controller = new Controller();
    private validator: Validator = new Validator();

    // Creates the routes for this router and returns a populated router object
    public getRouter(): express.Router {
        // GET
        this.router.get("/users", this.controller.getUsers);
        this.router.get("/users/:userId", this.controller.getUser);
        this.router.get("/users/:userId/posts", this.controller.getUserPosts);
        this.router.get("/users/:userId/comments", this.controller.getUserComments);
        this.router.get("/songs", this.controller.getSongs);
        this.router.get("/songs/:songId", this.controller.getSong);
        this.router.get("/songs/:songId/posts", this.controller.getSongPosts);
        this.router.get("/posts", this.controller.getPosts);
        this.router.get("/posts/:postId", this.controller.getPost);
        this.router.get("/posts/:postId/comments", this.controller.getPostComments);
        this.router.get("/comments", this.controller.getComments);
        this.router.get("/comments/:commentId", this.controller.getComment);

        // POST
        this.router.post("/users", this.validator.validateUser(), this.controller.postUser);
        this.router.post("/songs", this.controller.postSong);
        this.router.post("/songs/:songId/posts", this.validator.validatePost(), this.controller.postPost);
        this.router.post("/posts/:postsId/comments", this.controller.postComment);

        // PUT
        this.router.put("/users/:userId", this.controller.putUser);
        this.router.put("/songs/:songId", this.controller.putSong);
        this.router.put("/posts/:postId", this.controller.putPost);
        this.router.put("/comments/:commentId", this.controller.putComment);

        // DELETE
        this.router.delete("/users/:userId", this.controller.deleteUser);
        this.router.delete("/songs/:songId", this.controller.deleteSong);
        this.router.delete("/posts/:postId", this.controller.deletePost);
        this.router.delete("/comments/:commentId", this.controller.deleteComment);

        return this.router;
    }
}
