import express from "express";
import multer from "multer";
import { Controller } from "./controller";
import { Validator } from "./validator";

export class ApiRouter {
    private router: express.Router = express.Router();
    private controller: Controller = new Controller();
    private validator: Validator = new Validator();

    private storage: multer.StorageEngine = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, "uploads");
        },
        filename(req, file, cb) {
            cb(null, Date.now() + "_" + file.originalname);
        }
    });

    private fileFilter = function(req: any, file: any, cb: any) {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    private upload: multer.Instance = multer({ storage: this.storage, fileFilter: this.fileFilter });

    // Creates the routes for this router and returns a populated router object
    public getRouter(): express.Router {
        // GET
        this.router.get("/users", this.controller.getUsers);
        this.router.get("/users/:userId", this.validator.validateUser(), this.controller.getUser);
        this.router.get("/users/:userId/posts", this.validator.validateGetUserPosts(), this.controller.getUserPosts);
        this.router.get("/users/:userId/comments", this.controller.getUserComments);
        this.router.get("/songs", this.controller.getSongs);
        this.router.get("/songs/:songId", this.controller.getSong);
        this.router.get("/songs/:songId/posts", this.validator.validateGetSongPosts(), this.controller.getSongPosts);
        this.router.get("/posts", this.controller.getPosts);
        this.router.get("/posts/:postId", this.validator.validateGetPost(), this.controller.getPost);
        this.router.get("/posts/:postId/comments", this.controller.getPostComments);
        this.router.get("/comments", this.controller.getComments);
        this.router.get("/comments/:commentId", this.controller.getComment);

        // POST
        this.router.post("/users", this.validator.validatePostUser(), this.controller.postUser);
        this.router.post("/songs", this.controller.postSong);
        this.router.post("/songs/:songId/posts", this.upload.single("image"),
        this.validator.validatePostPost(), this.controller.postPost.bind(this.controller));
        this.router.post("/posts/:postsId/comments", this.controller.postComment);

        // PUT
        this.router.put("/users/:userId", this.validator.validatePutUser(), this.controller.putUser);
        this.router.put("/songs/:songId", this.controller.putSong);
        this.router.put("/posts/:postId", this.upload.single("image"),
        this.validator.validatePutPost(), this.controller.putPost.bind(this.controller));
        this.router.put("/comments/:commentId", this.controller.putComment);

        // DELETE
        this.router.delete("/users/:userId", this.controller.deleteUser);
        this.router.delete("/songs/:songId", this.controller.deleteSong);
        this.router.delete("/posts/:postId", this.validator.validateDeletePost(), this.controller.deletePost);
        this.router.delete("/comments/:commentId", this.controller.deleteComment);

        return this.router;
    }
}
