import { type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { H2Component } from "~/components/headers/h2.component";
import { TableComponent } from "~/components/tables/table.component";
import { UserTableRowComponent } from "~/components/tables/user-table-row.component";
import { type User } from "~/models/user.model";
import { serverSession } from "~/server/session.server";
import { UserApiService } from "~/services/user-api.service";

type LoaderData = {
  users: User[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await serverSession.getSession(request);

  try {
    const users = await UserApiService.read(session.get('accessToken'));

    return json<LoaderData>({ users });
  } catch (error: any) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Response('Error', { status: error.status });
    }
  }
}

const HEADING = ['ID', 'Title', 'First name', 'Last name', 'email', 'Matriculation number'];

export default function Users() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="container">
      <H2Component text="Users" />

      <TableComponent 
        emptyText="No Users"
        headings={HEADING}
        items={data.users}
        render={(item) => <UserTableRowComponent user={item} key={item.id} />}
      />
    </div>
  );
}
