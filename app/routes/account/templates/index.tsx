import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { H2Component } from "~/components/headers/h2.component";
import { DualListComponent } from "~/components/list-items/dual-list.component";
import { TemplateItemComponent } from "~/components/list-items/template-item.component";
import { type Template } from "~/models/template.model";
import { serverSession } from "~/server/session.server";
import { TemplateApiService } from "~/services/template-api.service";

type LoaderData = {
  templates: Template[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await serverSession.getSession(request);

  try {
    const templates = await TemplateApiService.read();

    return json<LoaderData>({ templates }, {
      headers: await serverSession.commitSession(session),
    });
  } catch (error: any) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Response('Error', { status: error.status });
    }
  }
}

export default function Templates() {
  const { templates } = useLoaderData<LoaderData>();

  return (
    <div className="container">
      <H2Component text="Templates" />

      <DualListComponent 
        items={templates} 
        emptyText="No template" 
        render={(t) => <TemplateItemComponent template={t} key={t.id} />} 
      />
    </div>
  );
}
