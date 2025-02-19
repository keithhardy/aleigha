import { columns } from '@/app/(dashboard)/certificates/components/data-table/columns';
import { DataTable } from '@/app/(dashboard)/certificates/components/data-table/data-table';
import { Header, HeaderDescription, HeaderGroup, Heading } from "@/components/page-header";
import { prisma } from '@/lib/prisma';

export default async function Certificates() {
  const electricalInstallationConditionReports = await prisma.electricalInstallationConditionReport.findMany({
    include: {
      creator: {
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
        select: {
          uprn: true,
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

  const certificates = [...electricalInstallationConditionReports]

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
