import { type ActionFunction, redirect } from "@remix-run/node";
import { serverSession } from "~/server/session.server";
import { LetterApiService } from "~/services/letter-api.service";

export const action: ActionFunction = async ({ request }) => {
  let redirectTo = request.url;

  const session = await serverSession.getSession(request);

  const form = await request.formData();
  const letterId = Number(form.get('letterId')?.toString());

  try {
    await LetterApiService.signLetter(letterId, session.get('accessToken'));

    redirectTo = `/account/letters/${letterId}`;

  } catch (error: any) {
    if (error instanceof Error) {
      throw error;
    } else {
      session.flash('formError', 'Oops! An error occured.');
    }
  }

  return redirect(redirectTo);
}
