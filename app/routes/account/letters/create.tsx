import { type LoaderFunction, type ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { InputCollectionComponent } from "~/components/forms/input-collection.component";
import { InputComponent } from "~/components/forms/input.component";
import { LetterValueInputComponent } from "~/components/forms/letter-value-input.component";
import { RecipientInputComponent } from "~/components/forms/recipient-input.component";
import { SubmitButtonComponent } from "~/components/forms/submit-button.component";
import { H2Component } from "~/components/headers/h2.component";
import { TemplateContentComponent } from "~/components/utils/template-content.component";
import { TemplateDateComponent } from "~/components/utils/template-date.component";
import { TemplateTitleComponent } from "~/components/utils/template-title.component";
import { type Role } from "~/models/role.model";
import { type Template } from "~/models/template.model";
import { type User } from "~/models/user.model";
import { type ValidationError } from "~/models/validation-error.model";
import { serverSession } from "~/server/session.server";
import { LetterApiService } from "~/services/letter-api.service";
import { RoleApiService } from "~/services/role-api.service";
import { TemplateApiService } from "~/services/template-api.service";
import { UserApiService } from "~/services/user-api.service";

type LoaderData = {
  roles: Role[];
  user: User;
  template: Template;
  errors: {
    form: string;
    title: string;
    recipients: string;
    letterValues: string;
  };
};

type ActionData = {
  title: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;

  if (!searchParams.has('templateId')) {
    return redirect('/account/templates');
  }

  const session = await serverSession.getSession(request);

  try {
    const [roles, template, user] = await Promise.all([
      RoleApiService.read(session.get('accessToken')),
      TemplateApiService.readOne(Number(searchParams.get('templateId'))),
      UserApiService.readOne(session.get('userId'), session.get('accessToken')),
    ]);

    const data: LoaderData = {
      user,
      roles,
      template,
      errors: {
        form: session.get('formError'),
        title: session.get('titleError'),
        recipients: session.get('recipientsError'),
        letterValues: session.get('letterValuesError'),
      }
    };

    return json(data, {
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

export const action: ActionFunction = async ({ request }) => {
  const session = await serverSession.getSession(request);

  const form = await request.formData();
  
  const title = form.get('title')?.toString();
  const templateId = Number(form.get('templateId')?.toString());
  const recipientLevels = form.getAll('recipients[level][]');
  const recipientRoleIds = form.getAll('recipients[roleId][]');
  const letterValueValues = form.getAll('letterValues[value][]');
  const letterValueTemplateVariableIds = form.getAll('letterValues[templateVariableId][]');

  let redirectTo = `${request.url}?templateId=${templateId}`;

  try {
    const letter = await LetterApiService.create({
      title, 
      templateId,
      recipients: recipientLevels.map((level, index) => ({
        level: Number(level.toString()),
        roleId: Number(recipientRoleIds[index].toString()),
      })),
      letterValues: letterValueValues.map((letterValue, index) => ({
        value: letterValue.toString(),
        templateVariableId: Number(letterValueTemplateVariableIds[index].toString())
      })),
    }, session.get('accessToken'));

    redirectTo = `/account/letters/${letter.id}`;

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

export default function CreateLetter() {
  const transition = useTransition();

  const data = useActionData<ActionData>();

  const { template, roles, user, errors } = useLoaderData<LoaderData>();

  const [recipients, setRecipients] = useState([0]);

  useEffect(() => { 
    if (transition.state === 'idle' && errors.form !== undefined) { 
      toast.error(errors.form);
    }
  }, [errors.form, transition.state]);

  return (
    <div className="container">
      <H2Component text="Send letter" />

      <div className="lg:flex gap-x-4 lg:justify-center">
        <div>
          <TemplateTitleComponent title={template.title} />

          <TemplateDateComponent date={template.createdAt} />

          <TemplateContentComponent content={template.content} />
        </div>

        <Form
          action=""
          method="post" 
          className="create-form" 
        >
          <fieldset disabled={transition.state !== 'idle'}>

            <input name="templateId" value={template.id} type="hidden" />

            <InputComponent id="title-input" label="Title" name="title" value={data?.title} error={errors.title} />

            <InputCollectionComponent 
              collection={template.templateVariables}
              title="Letter values"
              error={errors.letterValues}
              onRender={(v) => <LetterValueInputComponent key={v.id} user={user} templateVariable={v} />}
            />

            <InputCollectionComponent 
              collection={recipients}
              title="Letter recipients"
              buttonText="Add recipient"
              error={errors.recipients}
              onAddButtonClick={() => setRecipients((v) => [...v, v.length])}
              onRender={(v) => <RecipientInputComponent index={v} roles={roles} key={v} />}
            />

            <SubmitButtonComponent text="Send letter" />

          </fieldset>
        </Form>
      </div>

    </div>
  );
}
