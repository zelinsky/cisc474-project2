import bodyParser from "body-parser";
import express from "express";
import {MongoClient} from "mongodb";
import {ApiRouter} from "./router";

class Application {
    public app: express.Application;
    public port: number;

    constructor() {
        this.app = express();
        this.setupMongo();
        this.port = +process.env.serverPort || 3000;
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.initCors();
    }
    // Starts the server on the port specified in the environment or on port 3000 if none specified.
    public start(): void {
        this.buildRoutes();
        this.app.listen(this.port, () => console.log("Server listening on port " + this.port + "!"));
    }

    public setupMongo(): void {
        const self = this;
        const databaseName: string = "project-db";
        const databaseUrl: string = "127.0.0.1:27017";
        MongoClient.connect("mongodb://" + databaseUrl,
            { useUnifiedTopology: true, useNewUrlParser: true }, function(err, client) {
            if (err) {
                return console.log(err);
            }
            self.app.locals.db = client.db(databaseName);
            console.log("Connected to MongoDb database " + databaseName + " at " + databaseUrl);
        });
    }

    // sets up to allow cross-origin support from any host.  You can change the options to limit who can access the api.
    // This is not a good security measure as it can easily be bypassed,
    // but should be setup correctly anyway.  Without this, angular would not be able to access the api it it is on
    // another server.
    public initCors(): void {
        this.app.use(function(req: express.Request, res: express.Response, next: any) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
    }
    // setup routes for the express server
    public buildRoutes(): void {
        this.app.use("/api", new ApiRouter().getRouter());
    }
}
const app = new Application();
app.start();
