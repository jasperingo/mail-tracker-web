import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { H2Component } from "~/components/headers/h2.component";
import { DualListComponent } from "~/components/list-items/dual-list.component";
import { TemplateVariableItemComponent } from "~/components/list-items/template-variable-item.component";
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
        <h3 className="font-bold mb-2 text-xl text-orange-600">{ template.title }</h3>
        <div className="mb-4 text-gray-600">{ new Date(template.createdAt).toUTCString() }</div>

        <div className="shadow p-4 rounded-lg mb-8" dangerouslySetInnerHTML={{__html: template.content }}></div>

        <DualListComponent 
          items={template.templateVariables} 
          emptyText="No template variables" 
          render={(t) => <TemplateVariableItemComponent templateVariable={t} key={t.id} />} 
        />
      </div>

    </div>
  );
}
