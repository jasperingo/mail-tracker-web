import { redirect, type ActionFunction } from "@remix-run/node";
import { serverSession } from "~/server/session.server";

export const action: ActionFunction = async ({ request }) => {
  const session = await serverSession.getSession(request);

  return redirect('/', {
    headers: await serverSession.destroySession(session),
  });
}
