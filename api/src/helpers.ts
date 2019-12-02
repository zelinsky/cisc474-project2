import { Request } from "express"
export interface IGetUserAuthInfoRequest extends Request {
  user: object // or any other type
}
export class User extends Object{ 
  _id: string
}
