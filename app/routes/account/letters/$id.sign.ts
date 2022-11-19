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
    console.log(error)
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Response('Error', { status: error.status });
    }
  }

  return redirect(redirectTo);
}
