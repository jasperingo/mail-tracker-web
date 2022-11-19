import { type TemplateVariable } from "~/models/template-variable.model";
import { type Template } from "~/models/template.model";
import HttpService from "~/services/http.service";

export const TemplateApiService = {
  getPath(path: string | number = '') {
    return `templates/${path}`;
  },

  async create(
    form: { 
      title?: string; 
      content?: string; 
      templateVariables?: Pick<TemplateVariable, 'name' | 'source' | 'databaseField'>[],
    },
    accessToken: string
  ): Promise<Template> {
    return HttpService.mutate(this.getPath(), 'POST', form, accessToken);
  },

  read(accessToken?: string): Promise<Template[]> {
    return HttpService.get(this.getPath(), accessToken);
  },

  readOne(id: number, accessToken?: string): Promise<Template> {
    return HttpService.get(this.getPath(id), accessToken);
  },
}
