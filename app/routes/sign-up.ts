import { type ActionFunction, redirect } from '@remix-run/node';
import { type ValidationError } from '~/models/validation-error.model';
import { serverSession } from '~/server/session.server';
import { UserApiService } from '~/services/user-api.service';

export const action: ActionFunction = async ({ request }) => {
  const session = await serverSession.getSession(request);

  const form = await request.formData();
  const firstName = form.get('upFirstName')?.toString();
  const lastName = form.get('upLastName')?.toString();
  const email = form.get('upEmail')?.toString();
  const password = form.get('upPassword')?.toString();

  try {
    const response =  await UserApiService.create({ 
      firstName, 
      lastName, 
      email, 
      password,
    });
    session.set('userId', response.id);
    session.flash('success', 'Account created, you can now sign in');
  } catch (error: any) {
    console.log(error);
    if (error instanceof Error) {
      throw error;
    } else if (error.status === 400) {
      const errors = error.body as ValidationError[];
      errors.forEach(item => session.flash(`${item.name}Error`, item.message));
    } else {
      session.flash('signUpFormError', 'Oops! An error occured.');
    }
  }

  return redirect('/', {
    headers: await serverSession.commitSession(session),
  });
}
