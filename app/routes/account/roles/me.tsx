import { type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { H2Component } from "~/components/headers/h2.component";
import { RoleTableRowComponent } from "~/components/tables/role-table-row.component";
import { TableComponent } from "~/components/tables/table.component";
import { type Role } from "~/models/role.model";
import { serverSession } from "~/server/session.server";
import { UserApiService } from "~/services/user-api.service";

type LoaderData = {
  roles: Role[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await serverSession.getSession(request);

  try {
    const roles = await UserApiService.readRoles(session.get('userId'), session.get('accessToken'));

    return json<LoaderData>({ roles });
  } catch (error: any) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Response('Error', { status: error.status });
    }
  }
}

const HEADING = ['ID', 'Title', 'Start on', 'End on', 'User name', 'User email'];

export default function Roles() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="container">
      <H2Component text="Roles" />

      <TableComponent 
        emptyText="No Roles"
        headings={HEADING}
        items={data.roles}
        render={(item) => <RoleTableRowComponent role={item} key={item.id} />}
      />
    </div>
  );
}
