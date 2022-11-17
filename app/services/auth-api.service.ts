import { type Auth } from '~/models/auth.model';
import HttpService from '~/services/http.service';

export const AuthApiService = {
  getPath(path = '') {
    return `auth/${path}`;
  },

  create(
    form: { email?: string; password?: string; }
  ): Promise<Auth> {
    return HttpService.mutate(this.getPath(), 'POST', form);
  },
};
