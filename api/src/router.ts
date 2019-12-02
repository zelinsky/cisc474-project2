import express from "express";
import multer from "multer";
import { AuthController } from "./auth-controller";
import { Controller } from "./controller";
import { PassportService} from "./passport-Service";
import { Validator } from "./validator";

export class ApiRouter {
    private router: express.Router = express.Router();
    private controller: Controller = new Controller();
    private validator: Validator = new Validator();
    private auth: AuthController = new AuthController();
    private passportService: PassportService = new PassportService();

    private storage: multer.StorageEngine = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, "public/uploads");
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
        this.router.get("/users/:userId/posts", this.validator.validateUser(), this.controller.getUserPosts);
        this.router.get("/users/:userId/comments", this.validator.validateUser(), this.controller.getUserComments);
        this.router.get("/songs", this.controller.getSongs);
        this.router.get("/songs/:songId", this.validator.validateSong(), this.controller.getSong);
        this.router.get("/songs/:songId/posts", this.validator.validateGetSongPosts(), this.controller.getSongPosts);
        this.router.get("/posts", this.controller.getPosts);
        this.router.get("/posts/:postId", this.validator.validatePost(), this.controller.getPost);
        this.router.get("/posts/:postId/comments", this.validator.validatePost(), this.controller.getPostComments);
        this.router.get("/comments", this.controller.getComments);
        this.router.get("/comments/:commentId", this.validator.validateComment(), this.controller.getComment);

        // POST
        this.router.post("/users", this.validator.validatePostUser(), this.controller.postUser);
        this.router.post("/songs", this.validator.validatePostSong(), this.controller.postSong);
        this.router.post("/songs/:songId/posts", this.upload.single("image"),
        this.validator.validatePostPost(), this.controller.postPost.bind(this.controller));

        this.router.post("/posts/:postId/comments", this.passportService.requireAuth, this.validator.validatePostComment(), this.controller.postComment);
        this.router.post("/login", (req: express.Request, res: express.Response) => {
            this.auth.login(req, res);
        });
        this.router.post("/register", (req: express.Request, res: express.Response) => {
            this.auth.register(req, res);
        });
        // PUT
        this.router.put("/users/:userId", this.validator.validatePutUser(), this.controller.putUser);
        this.router.put("/songs/:songId", this.validator.validatePutSong(), this.controller.putSong);
        this.router.put("/posts/:postId", this.upload.single("image"),
        this.validator.validatePutPost(), this.controller.putPost.bind(this.controller));
        this.router.put("/comments/:commentId", this.validator.validatePutComment(), this.controller.putComment);

        // DELETE
        this.router.delete("/users/:userId", this.validator.validateDeleteUser(), this.controller.deleteUser);
        this.router.delete("/songs/:songId", this.validator.validateSong(), this.controller.deleteSong);
        this.router.delete("/posts/:postId", this.validator.validatePost(), this.controller.deletePost);
        this.router.delete("/comments/:commentId", this.validator.validateComment(), this.controller.deleteComment);

        return this.router;
    }
}
