import { type LoaderFunction, type ActionFunction, redirect, json } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { InputComponent } from "~/components/forms/input.component";
import { SubmitButtonComponent } from "~/components/forms/submit-button.component";
import { H2Component } from "~/components/headers/h2.component";
import { ProfileDetailItemComponent } from "~/components/list-items/profile-detail-item.component";
import { type User } from "~/models/user.model";
import { type ValidationError } from "~/models/validation-error.model";
import { serverSession } from "~/server/session.server";
import { UserApiService } from "~/services/user-api.service";

type LoaderData = {
  user: User;
  success: string;
  errors: {
    form: string;
    password: string;
    oldPassword: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await serverSession.getSession(request);

  try {
    const user = await UserApiService.readOne(session.get('userId'), session.get('accessToken'));

    return json<LoaderData>({ 
      user,
      success: session.get('success'),
      errors: {
        form: session.get('formError'),
        password: session.get('passwordError'),
        oldPassword: session.get('oldPasswordError'),
      }
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
  const password = form.get('password')?.toString();
  const oldPassword = form.get('oldPassword')?.toString();

  try {
    await UserApiService.updatePassword(session.get('userId'), {
      password,
      oldPassword,
    }, session.get('accessToken'));

    session.flash('success', 'User password updated');

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

  return redirect(request.url, {
    headers: await serverSession.commitSession(session),
  });
}

export default function Profile() {
  const transition = useTransition();

  const { errors, user, success} = useLoaderData<LoaderData>();

  useEffect(() => { 
    if (transition.state === 'idle' && errors.form !== undefined) { 
      toast.error(errors.form);
    } else if (transition.state === 'idle' && success !== undefined) {
      toast.success(success);
    }
  }, [errors.form, success, transition.state]);

  return (
    <div className="container">
      <H2Component text="Profile" />

      <div className="lg:flex gap-x-4 lg:justify-center">
        <div className="p-4 shadow shadow-orange-600 rounded-lg mb-4">
          <dl>
            <ProfileDetailItemComponent title="Title" body={user.title ?? '(No title)'} />
            <ProfileDetailItemComponent title="First name" body={user.firstName} />
            <ProfileDetailItemComponent title="Last name" body={user.lastName} />
            <ProfileDetailItemComponent title="Email" body={user.email} />
            <ProfileDetailItemComponent title="Matriculation number" body={user.matriculationNumber ?? '(No matriculation number)'} />
            <ProfileDetailItemComponent title="Joined on" body={new Date(user.createdAt).toUTCString()} />
          </dl>

          <Form action="/account/sign-out" method="post">
            <fieldset disabled={transition.state !== 'idle'}>
              <SubmitButtonComponent text="Sign out" />
            </fieldset>
          </Form>
        </div>

        <Form action="" method="post" className="w-96 p-4 shadow shadow-orange-600 rounded-lg mb-4">
          <fieldset disabled={transition.state !== 'idle'}>
            <InputComponent id="old-password-input" label="Current password" name="oldPassword" type="password" error={errors.oldPassword} />

            <InputComponent id="password-input" label="New Password" name="password" type="password" error={errors.password} />

            <SubmitButtonComponent text="Update password" />
          </fieldset>
        </Form>
        
      </div>

    </div>
  );
}
