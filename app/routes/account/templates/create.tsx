import { type LoaderFunction, type ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { useState, useEffect } from "react";
import { DefaultEditor } from 'react-simple-wysiwyg';
import { toast } from 'react-toastify';
import { InputCollectionComponent } from "~/components/forms/input-collection.component";
import { InputComponent } from "~/components/forms/input.component";
import { SubmitButtonComponent } from "~/components/forms/submit-button.component";
import { TemplateVariableInputComponent } from "~/components/forms/template-variable-input.component";
import { H2Component } from "~/components/headers/h2.component";
import { type ValidationError } from "~/models/validation-error.model";
import { serverSession } from "~/server/session.server";
import { TemplateApiService } from "~/services/template-api.service";

type LoaderData = {
  errors: {
    form: string;
    title: string;
    content: string;
    templateVariables: string;
  };
};

type ActionData = {
  title: string;
  content: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await serverSession.getSession(request);

  const data: LoaderData = {
    errors: {
      form: session.get('formError'),
      title: session.get('titleError'),
      content: session.get('contentError'),
      templateVariables: session.get('templateVariablesError'),
    }
  };

  return json(data, {
    headers: await serverSession.commitSession(session),
  });
}

export const action: ActionFunction = async ({ request }) => {
  let redirectTo = request.url;

  const session = await serverSession.getSession(request);

  const form = await request.formData();
  
  const title = form.get('title')?.toString();
  const content = form.get('content')?.toString();
  const templateVariablesNames = form.getAll('templateVariables[name][]');
  const templateVariablesSources = form.getAll('templateVariables[source][]');
  const templateVariablesDatabaseFields = form.getAll('templateVariables[databaseField][]');

  try {
    const template = await TemplateApiService.create({ 
      title, 
      content, 
      templateVariables: templateVariablesNames.map((name, index) => ({
        name: name.toString(),
        source: templateVariablesSources[index].toString() as any,
        databaseField: templateVariablesDatabaseFields[index]?.toString(),
      }))
    }, session.get('accessToken'));

    redirectTo = `/account/templates/${template.id}`;

  } catch (error: any) {
    if (error instanceof Error) {
      throw error;
    } else if (error.status === 400) {
      const errors = error.body.error as ValidationError[];
      errors.forEach(item => session.flash(`${item.name}Error`, item.message));
    } else {
      session.flash('formError', 'Oops! An error occured.');
    }
  }

  return redirect(redirectTo, {
    headers: await serverSession.commitSession(session),
  });
}

export default function CreateTemplate() {
  const transition = useTransition();

  const data = useActionData<ActionData>();

  const { errors } = useLoaderData<LoaderData>();

  const [content, setContent] = useState(data?.content ?? '');
  
  const [variables, setVariables] = useState([0]);

  useEffect(() => { 
    if (transition.state === 'idle' && errors.form !== undefined) { 
      toast.error(errors.form);
    }
  }, [errors.form, transition.state]);

  return (
    <div className="container">
      <H2Component text="Create template" />

      <Form
        action=""
        method="post" 
        className="create-form" 
      >
        <fieldset disabled={transition.state !== 'idle'}>

          <InputComponent id="title-input" label="Title" name="title" value={data?.title} error={errors.title} />

          <div>
            <DefaultEditor value={content} onChange={(e) => setContent(e.target.value)} />
            <div className="text-red-500">{ errors.content }</div>
          </div>

          <input type="hidden" value={content} name="content" />

          <InputCollectionComponent 
            collection={variables}
            title="Template variables"
            buttonText="Add variable"
            error={errors.templateVariables}
            onAddButtonClick={() => setVariables((v) => [...v, v.length])}
            onRender={(v) => <TemplateVariableInputComponent key={v} />}
          />

          <SubmitButtonComponent text="Create template" />

        </fieldset>
      </Form>
    </div>
  );
}
