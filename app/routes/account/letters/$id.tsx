import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { H2Component } from "~/components/headers/h2.component";
import { DualListComponent } from "~/components/list-items/dual-list.component";
import { ListComponent } from "~/components/list-items/list.component";
import { RecipientItemComponent } from "~/components/list-items/recipient-item.component";
import { TemplateVariableItemComponent } from "~/components/list-items/template-variable-item.component";
import { TemplateContentComponent } from "~/components/utils/template-content.component";
import { TemplateDateComponent } from "~/components/utils/template-date.component";
import { TemplateTitleComponent } from "~/components/utils/template-title.component";
import { type Letter } from "~/models/letter.model";
import { TemplateVariableSource } from "~/models/template-variable.model";
import { serverSession } from "~/server/session.server";
import { LetterApiService } from "~/services/letter-api.service";

type LoaderData = {
  letter: Letter;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await serverSession.getSession(request);

  try {
    const letter = await LetterApiService.readOne(Number(params.id), session.get('accessToken'));

    return json<LoaderData>({ letter });
  } catch (error: any) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Response('Error', { status: error.status });
    }
  }
}

export default function LetterView() {
  const { letter } = useLoaderData<LoaderData>();

  return (
    <div className="container">
      <H2Component text="Letter" links={[{ text: 'Download', to: 'download' }]}/>

      <div>
        <TemplateTitleComponent title={letter.template.title} />

        <TemplateDateComponent date={letter.createdAt} />

        <TemplateContentComponent content={letter.template.content} />

        <div>
          <h4 className="font-bold mb-2">Letter values</h4>
          <DualListComponent 
            items={letter.template.templateVariables} 
            emptyText="No letter value" 
            render={(t) => (
              <TemplateVariableItemComponent 
                key={t.id} 
                templateVariable={t} 
                input={
                  t.source === TemplateVariableSource.INPUT 
                    ? letter.letterValues.find((v) => v.templateVariable.id === t.id)?.value 
                    : (letter.user as any)[t.databaseField]
                } 
              />
            )} 
          />
        </div>

        <div>
          <h4 className="font-bold mb-2">Letter recipients</h4>
          <ListComponent 
            items={letter.recipients} 
            emptyText="No recipient" 
            render={(r) => <RecipientItemComponent key={r.id} recipient={r} />} 
          />
        </div>
        
      </div>

    </div>
  );
}
