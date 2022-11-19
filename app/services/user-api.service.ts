import { type Letter } from "~/models/letter.model";
import { type Role } from "~/models/role.model";
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

  updatePassword(
    id: number | string,
    form: { password?: string; oldPassword?: string; },
    accessToken: string
  ): Promise<User> {
    return HttpService.mutate(this.getPath(`${id}/password`), 'PUT', form, accessToken);
  },

  read(accessToken: string): Promise<User[]> {
    return HttpService.get(this.getPath(), accessToken);
  },

  readOne(id: number, accessToken: string): Promise<User> {
    return HttpService.get(this.getPath(id), accessToken);
  },

  readRoles(id: number, accessToken?: string): Promise<Role[]> {
    return HttpService.get(this.getPath(`${id}/roles`), accessToken);
  },

  readLetters(id: number, accessToken?: string): Promise<Letter[]> {
    return HttpService.get(this.getPath(`${id}/letters`), accessToken);
  },
}
