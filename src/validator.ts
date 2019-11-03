import { body, param, sanitizeParam } from "express-validator";
import { ObjectID } from "mongodb";

export class Validator {

  public toMongoId(value: string) {
      return new ObjectID(value);
  }

  // USERS

  public validateUser() {
    return [
      param("userId", "Invalid MongoId").isMongoId().bail().customSanitizer(this.toMongoId)
    ];
  }

  public validatePostUser() {
    return [
      body("username").not().isEmpty(),
      body("firstName").not().isEmpty(),
      body("lastName").optional()
    ];
  }

  public validatePutUser() {
    return [
      body("username").optional().not().isEmpty(),
      body("firstName").optional().not().isEmpty(),
      body("lastName").optional(),
      param("userId", "Invalid MongoId").isMongoId().bail().customSanitizer(this.toMongoId)
    ];
  }

  public validatePostPost() {
    return [
      // body("content", "Cannot be empty").not().isEmpty(),
      param("songId", "Invalid MongoId").isMongoId().bail().customSanitizer(this.toMongoId)
    ];
  }

  public validateGetPost() {
    return [
      param("postId", "Invalid MongoId").isMongoId().bail().customSanitizer(this.toMongoId)
    ];
  }

  public validateGetUserPosts() {
    return [
      param("userId", "Invalid MongoId").isMongoId().bail().customSanitizer(this.toMongoId)
    ];
  }

  public validateGetSongPosts() {
    return [
      param("songId", "Invalid MongoId").isMongoId().bail().customSanitizer(this.toMongoId)
    ];
  }

  public validatePutPost() {
    return [
      param("postId", "Invalid MongoId").isMongoId().bail().customSanitizer(this.toMongoId),
      // body("content").not().isEmpty()
    ];
  }

  public validateDeletePost() {
    return [
      param("postId", "Invalid MongoId").isMongoId().bail().customSanitizer(this.toMongoId),
    ];
  }
  public validateDeleteUser() {
    return [
      param("userId", "Invalid MongoId").isMongoId().bail().customSanitizer(this.toMongoId),
    ];
  }

}
