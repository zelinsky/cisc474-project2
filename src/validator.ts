import { body } from "express-validator";

exports.validate = (method: any) => {
  switch (method) {
    case "postUser": {
     return [
        body("username").exists(),
        body("firstName").exists(),
        body("lastName").optional()
       ];
    }
  }
}