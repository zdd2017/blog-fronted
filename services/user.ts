import { ApiService } from './index'

class UserService extends ApiService {
  public login(params) {
    return this.$post('login', params)
  }
}

export const userService = new UserService('user')
