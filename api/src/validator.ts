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

  public validatePost() {
    return [
      param("postId", "Invalid MongoId").isMongoId().bail().customSanitizer(this.toMongoId),
    ];
  }

  // SONGS
  public validateSong() {
    return [
      param("songId", "Invalid MongoId").isMongoId().bail().customSanitizer(this.toMongoId),
    ];
  }

  public validatePostSong() {
    return [
      body("title").not().isEmpty(),
      body("artist").not().isEmpty(),
      body("lyrics").not().isEmpty()
    ];
  }

  public validatePutSong() {
    return [
      body("title").optional().not().isEmpty(),
      body("artist").optional().not().isEmpty(),
      body("lyrics").optional().not().isEmpty(),
      param("songId", "Invalid MongoId").isMongoId().bail().customSanitizer(this.toMongoId),
    ];
  }

  public validateDeleteUser() {
    return [
      param("userId", "Invalid MongoId").isMongoId().bail().customSanitizer(this.toMongoId),
    ];
  }

  // COMMENTS
  public validateComment() {
    return [
      param("commentId", "Invalid MongoId").isMongoId().bail().customSanitizer(this.toMongoId)
    ];
  }

  public validatePostComment() {
    return [
      body("content", "Cannot be empty").not().isEmpty(),
      param("postId", "Invalid MongoId").isMongoId().bail().customSanitizer(this.toMongoId)
    ];
  }

  public validatePutComment() {
    return [
      body("content", "Cannot be empty").not().isEmpty(),
      param("commentId", "Invalid MongoId").isMongoId().bail().customSanitizer(this.toMongoId)
    ];
  }
}
