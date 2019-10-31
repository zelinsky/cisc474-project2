import { body } from "express-validator";

export class Validator {
  public validateUser() {
    return [
      body("username").exists(),
      body("firstName").exists(),
      body("lastName").optional()
     ];
  }

  public validatePost() {
      return [
      body("content").not().isEmpty()
    ];
  }
}
