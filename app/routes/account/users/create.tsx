import { type LoaderFunction, type ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { InputComponent } from "~/components/forms/input.component";
import { SubmitButtonComponent } from "~/components/forms/submit-button.component";
import { H2Component } from "~/components/headers/h2.component";
import { type ValidationError } from "~/models/validation-error.model";
import { serverSession } from "~/server/session.server";
import { UserApiService } from "~/services/user-api.service";

type LoaderData = {
  errors: {
    form: string;
    title: string;
    firstName: string;
    lastName: string;
    matriculationNumber: string;
    password: string;
  };
};

type ActionData = {
  title: string;
  firstName: string;
  lastName: string;
  matriculationNumber: string;
  password: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await serverSession.getSession(request);

  const data: LoaderData = {
    errors: {
      form: session.get('formError'),
      title: session.get('titleError'),
      firstName: session.get('firstNameError'),
      lastName: session.get('lastNameError'),
      password: session.get('passwordError'),
      matriculationNumber: session.get('matriculationNumberError'),
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
  const firstName = form.get('firstName')?.toString();
  const lastName = form.get('lastName')?.toString();
  const title = form.get('title')?.toString();
  const password = form.get('password')?.toString();
  const matriculationNumber = form.get('matriculationNumber')?.toString();

  try {
    await UserApiService.create({ 
      firstName, 
      lastName, 
      password,
      title: title?.length === 0 ? undefined : title,
      matriculationNumber: matriculationNumber?.length === 0 ? undefined : matriculationNumber,
    }, session.get('accessToken'));

    redirectTo = '/account/users';

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

export default function CreateUser() {
  const transition = useTransition();
  
  const data = useActionData<ActionData>();

  const { errors } = useLoaderData<LoaderData>();

  useEffect(() => { 
    if (transition.state === 'idle' && errors.form !== undefined) { 
      toast.error(errors.form);
    }
  }, [errors.form, transition.state]);

  return (
    <div className="container">
      <H2Component text="Create user" />

      <Form
        action=""
        method="post" 
        className="create-form" 
      >
        <fieldset disabled={transition.state !== 'idle'}>

          <InputComponent id="first-name-input" label="First name" name="firstName" value={data?.firstName} error={errors.firstName} />

          <InputComponent id="last-name-input" label="Last name" name="lastName" value={data?.lastName} error={errors.lastName} />

          <InputComponent id="title-input" label="Title" name="title" required={false} value={data?.title} error={errors.title} />

          <InputComponent id="matriculation-input" label="Matriculation number" name="matriculationNumber" required={false} value={data?.matriculationNumber} error={errors.matriculationNumber} />

          <InputComponent id="password-input" label="Password" name="password" type="password" value={data?.password} error={errors.password} />

          <SubmitButtonComponent text="Create user" />

        </fieldset>
      </Form>
    </div>
  );
}
