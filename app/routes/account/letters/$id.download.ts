import { type LoaderFunction } from "@remix-run/node";
import { serverSession } from "~/server/session.server";
import { LetterApiService } from "~/services/letter-api.service";

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await serverSession.getSession(request);

  try {
    const letter = await LetterApiService.downloadOne(Number(params.id), session.get('accessToken'));

    letter.headers.append('Location', `/account/letters/${params.id}`);

    return new Response(letter.body, { status: 200, headers: letter.headers });
  } catch (error: any) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Response('Error', { status: error.status });
    }
  }
}
