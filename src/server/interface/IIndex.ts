import { Model } from '../model/user'

export interface IIdex {
  getUser(id: string): Model.User
}
