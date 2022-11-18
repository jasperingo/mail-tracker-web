import { type LoaderFunction, type ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { InputComponent } from "~/components/forms/input.component";
import { SelectComponent } from "~/components/forms/select.component";
import { SubmitButtonComponent } from "~/components/forms/submit-button.component";
import { H2Component } from "~/components/headers/h2.component";
import { type User } from "~/models/user.model";
import { type ValidationError } from "~/models/validation-error.model";
import { serverSession } from "~/server/session.server";
import { RoleApiService } from "~/services/role-api.service";
import { UserApiService } from "~/services/user-api.service";

type LoaderData = {
  users: User[];
  errors: {
    form: string;
    title: string;
    userId: string;
  };
};

type ActionData = {
  title: string;
  userId: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await serverSession.getSession(request);

  try {
    const users = await UserApiService.read(session.get('accessToken'));

    const data: LoaderData = {
      users,
      errors: {
        form: session.get('formError'),
        title: session.get('titleError'),
        userId: session.get('userIdError'),
      }
    };

    return json<LoaderData>(data, {
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
  let redirectTo = request.url;

  const session = await serverSession.getSession(request);

  const form = await request.formData();
  const title = form.get('title')?.toString();
  const userId = Number(form.get('userId')?.toString());

  try {
    await RoleApiService.create({ userId, title }, session.get('accessToken'));

    session.flash('success', 'User account created');

    redirectTo = '/account/roles';

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

export default function CreateRole() {
  const transition = useTransition();
  
  const data = useActionData<ActionData>();

  const { errors, users } = useLoaderData<LoaderData>();

  useEffect(() => { 
    if (transition.state === 'idle' && errors.form !== undefined) { 
      toast.error(errors.form);
    }
  }, [errors.form, transition.state]);

  return (
    <div className="container">
      <H2Component text="Create role" />

      <Form
        action=""
        method="post" 
        className="create-form" 
      >
        <fieldset disabled={transition.state !== 'idle'}>

          <InputComponent id="title-input" label="Title" name="title" value={data?.title} error={errors.title} />

          <SelectComponent 
            id="users-input" 
            label="User" 
            name="userId" 
            value={data?.userId} 
            error={errors.userId} 
            options={users.map((user) => ({ text: `${user.title ?? ''} ${user.firstName} ${user.lastName} (${user.email})`, value: user.id}))} 
          />

          <SubmitButtonComponent text="Create role" />

        </fieldset>
      </Form>

    </div>
  );
}
