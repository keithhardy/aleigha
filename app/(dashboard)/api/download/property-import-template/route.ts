import { stringify } from "csv-stringify/sync";
import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    {
      uprn: "",
      occupier: "",
      street_address: "",
      city: "",
      county: "",
      post_town: "",
      post_code: "",
      country: "",
    },
  ];

  const csv = stringify(data, {
    header: true,
    columns: Object.keys(data[0]),
  });

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition":
        'attachment; filename="property-import-template.csv"',
    },
  });
}
