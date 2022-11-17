import { type User } from "~/models/user.model";
import HttpService from "~/services/http.service";

export const UserApiService = {
  getPath(path: string | number = '') {
    return `users/${path}`;
  },

  async create(
    form: { 
      firstName?: string; 
      lastName?: string; 
      email?: string; 
      password?: string; 
    }
  ): Promise<User> {
    return HttpService.mutate(this.getPath(), 'POST', form);
  },
}
