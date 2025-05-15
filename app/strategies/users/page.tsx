import { getFacets, getTotal, getUsers } from "./actions";
import { columns } from "./components/table/columns";
import { Table } from "./components/table/table";

export const revalidate = 3600;

export default async function Users() {
  const data = await getUsers({
    pagination: { pageIndex: 0, pageSize: 10 },
  });
  const facets = await getFacets();
  const total = await getTotal();

  return (
    <Table
      columns={columns}
      getData={getUsers}
      getFacets={getFacets}
      getTotal={getTotal}
      initialData={data}
      initialFacets={facets}
      initialTotal={total}
    />
  );
}
