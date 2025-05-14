import { getFacets, getUsers } from "./actions";
import { columns } from "./components/table/columns";
import { Table } from "./components/table/table";

export const revalidate = 3600;

export default async function Users() {
  const data = await getUsers({
    pagination: { pageIndex: 0, pageSize: 10 },
  });

  const facets = await getFacets();

  return <Table initialData={data} getData={getUsers} columns={columns} initialFacets={facets} />;
}
