import User from "./User";

export default class UserFrontend extends User {
  constructor() {
    super()
  }
  override async addUser(): Promise<void>{
    throw new Error('Implement Add user frontend')
  }
}