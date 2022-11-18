import { type Role } from "~/models/role.model";
import HttpService from "~/services/http.service";

export const RoleApiService = {
  getPath(path: string | number = '') {
    return `roles/${path}`;
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
  ): Promise<Role> {
    return HttpService.mutate(this.getPath(), 'POST', form, accessToken);
  },

  read(accessToken: string): Promise<Role[]> {
    return HttpService.get(this.getPath(), accessToken);
  },

  readOne(id: number, accessToken: string): Promise<Role> {
    return HttpService.get(this.getPath(id), accessToken);
  },
}
