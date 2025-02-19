
import { columns } from '@/app/(dashboard)/certificates/components/data-table/columns';
import { DataTable } from '@/app/(dashboard)/certificates/components/data-table/data-table';
import { Header, HeaderDescription, HeaderGroup, Heading } from "@/components/page-header";
import { prisma } from '@/lib/prisma';

export default async function Certificates() {
  const certificates = [
    {
      "type": "MW",
      "date": "20/08/2022",
      "property": {
        "address": {
          "streetAddress": "463 Holmes port",
          "postCode": "PR16 4QB"
        }
      }
    },
    {
      "type": "Electrical Installation Condition Report",
      "date": "08/07/2022",
      "property": {
        "address": {
          "streetAddress": "2 Joseph mountains",
          "postCode": "N1K 5JX"
        }
      }
    },
    {
      "type": "DVCS",
      "date": "18/03/2020",
      "property": {
        "address": {
          "streetAddress": "13 Wade roads",
          "postCode": "LU7 4QW"
        }
      }
    },
    {
      "type": "EIC",
      "date": "14/09/2020",
      "property": {
        "address": {
          "streetAddress": "Studio 1\nPowell harbors",
          "postCode": "S0 3YP"
        }
      }
    },
    {
      "type": "EICR",
      "date": "22/04/2022",
      "property": {
        "address": {
          "streetAddress": "4 Frost islands",
          "postCode": "SE6 2DT"
        }
      }
    },
    {
      "type": "DVCS",
      "date": "03/05/2024",
      "property": {
        "address": {
          "streetAddress": "77 Reed roads",
          "postCode": "NN41 8WF"
        }
      }
    },
    {
      "type": "MW",
      "date": "08/09/2020",
      "property": {
        "address": {
          "streetAddress": "7 Thomas common",
          "postCode": "L77 5PG"
        }
      }
    },
    {
      "type": "MW",
      "date": "04/09/2021",
      "property": {
        "address": {
          "streetAddress": "206 Abbott mission",
          "postCode": "E9W 7LF"
        }
      }
    },
    {
      "type": "MW",
      "date": "23/09/2021",
      "property": {
        "address": {
          "streetAddress": "0 Ellie trafficway",
          "postCode": "M5 7ZA"
        }
      }
    },
    {
      "type": "MW",
      "date": "12/11/2023",
      "property": {
        "address": {
          "streetAddress": "Studio 26V\nJulia summit",
          "postCode": "DT25 0FG"
        }
      }
    }
  ]

  const eicrs = prisma.electricalInstallationConditionReport.findMany({
    include: {
      user: {
        select: {
          name: true
        }
      },
      client: {
        select: {
          name: true
        },
      },
      property: {
        include: {
          address: {
            select: {
              streetAddress: true,
              postCode: true
            }
          }
        }
      }
    }
  })

  return (
    <>
      <Header>
        <HeaderGroup>
          <Heading>View Certificates</Heading>
          <HeaderDescription>
            Manage your certificates. Browse through the list of certificates and easily add, update, or remove records as needed.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <DataTable columns={columns} data={certificates} />
    </>
  );
}
