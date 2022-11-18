import { type ActionFunction, redirect } from '@remix-run/node';
import { serverSession } from '~/server/session.server';
import { AuthApiService } from '~/services/auth-api.service';

export const action: ActionFunction = async ({ request }) => {
  let redirectTo = '/';

  const session = await serverSession.getSession(request);

  const form = await request.formData();
  const email = form.get('email')?.toString();
  const password = form.get('password')?.toString();

  try {
    const response =  await AuthApiService.create({
      email, 
      password,
    });

    session.set('userId', response.userId);
    session.set('accessToken', response.accessToken);

    redirectTo = '/account/templates';
  } catch (error: any) {
    if (error instanceof Error) {
      throw error;
    } else if (error.status === 401) {
      session.flash('signInError', 'Email or password is incorrect');
    } else {
      session.flash('signInError', 'Oops! An error occured.');
    }
  }

  return redirect(redirectTo, {
    headers: await serverSession.commitSession(session),
  });
}
