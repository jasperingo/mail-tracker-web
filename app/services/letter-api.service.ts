import {type  Letter } from "~/models/letter.model";
import HttpService from "~/services/http.service";

export const LetterApiService = {
  getPath(path: string | number = '') {
    return `letters/${path}`;
  },

  async create(
    form: { 
      title?: string; 
      templateId?: number;
      recipients?: {
        roleId?: number;
        level?: number;
      }[];
      letterValues: {
        value?: string;
        templateVariableId?: number;
      }[];
    },
    accessToken: string
  ): Promise<Letter> {
    return HttpService.mutate(this.getPath(), 'POST', form, accessToken);
  },

  read(accessToken?: string): Promise<Letter[]> {
    return HttpService.get(this.getPath(), accessToken);
  },

  readOne(id: number, accessToken?: string): Promise<Letter> {
    return HttpService.get(this.getPath(id), accessToken);
  },

  downloadOne(id: number, accessToken?: string) {
    return HttpService.getFile(this.getPath(`${id}/download`), accessToken);
  },

  signLetter(id: number, accessToken?: string): Promise<Letter> {
    return HttpService.mutate(this.getPath(`${id}/sign`), 'PUT', {}, accessToken);
  },
}
