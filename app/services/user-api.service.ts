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
      title?: string; 
      password?: string; 
      matriculationNumber?: string;
    },
    accessToken: string
  ): Promise<User> {
    return HttpService.mutate(this.getPath(), 'POST', form, accessToken);
  },

  read(accessToken: string): Promise<User[]> {
    return HttpService.get(this.getPath(), accessToken);
  },
}
