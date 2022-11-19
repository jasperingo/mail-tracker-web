import { type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { H2Component } from "~/components/headers/h2.component";
import { DualListComponent } from "~/components/list-items/dual-list.component";
import { LetterItemComponent } from "~/components/list-items/letter-item.component";
import { type Letter } from "~/models/letter.model";
import { serverSession } from "~/server/session.server";
import { UserApiService } from "~/services/user-api.service";

type LoaderData = {
  letters: Letter[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await serverSession.getSession(request);

  try {
    const letters = await UserApiService.readLetters(session.get('userId'), session.get('accessToken'));

    return json<LoaderData>({ letters });
  } catch (error: any) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Response('Error', { status: error.status });
    }
  }
}

export default function MyLetters() {
  const { letters } = useLoaderData<LoaderData>();

  return (
    <div className="container">
      <H2Component text="Letters" />

      <DualListComponent 
        items={letters} 
        emptyText="No letter" 
        render={(l) => <LetterItemComponent letter={l} key={l.id} />} 
      />
    </div>
  );
}
