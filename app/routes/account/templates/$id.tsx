import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { H2Component } from "~/components/headers/h2.component";
import { DualListComponent } from "~/components/list-items/dual-list.component";
import { TemplateVariableItemComponent } from "~/components/list-items/template-variable-item.component";
import { TemplateContentComponent } from "~/components/utils/template-content.component";
import { TemplateDateComponent } from "~/components/utils/template-date.component";
import { TemplateTitleComponent } from "~/components/utils/template-title.component";
import { type Template } from "~/models/template.model";
import { TemplateApiService } from "~/services/template-api.service";

type LoaderData = {
  template: Template;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    const template = await TemplateApiService.readOne(Number(params.id));

    return json<LoaderData>({ template });
  } catch (error: any) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Response('Error', { status: error.status });
    }
  }
}

export default function TemplateView() {
  const { template } = useLoaderData<LoaderData>();

  return (
    <div className="container">
      <H2Component text="Template" />

      <div>
        <TemplateTitleComponent title={template.title} />

        <TemplateDateComponent date={template.createdAt} />

        <TemplateContentComponent content={template.content} />

        <DualListComponent 
          items={template.templateVariables} 
          emptyText="No template variable" 
          render={(t) => <TemplateVariableItemComponent templateVariable={t} key={t.id} />} 
        />
      </div>

    </div>
  );
}
