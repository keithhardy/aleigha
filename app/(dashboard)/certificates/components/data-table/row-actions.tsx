import { Address, ElectricalInstallationConditionReport, Property } from "@prisma/client";
import { pdf } from "@react-pdf/renderer";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import ElectricalInstallationConditionReportTemplate from "../templates/electrical-installation-condition-report-template";

export function RowActions({
  electricalInstallationConditionReport,
}: {
  electricalInstallationConditionReport: ElectricalInstallationConditionReport & {
    property: Property & { address: Address };
  };
}) {
  const handlePDFDownload = async (
    electricalInstallationConditionReport: ElectricalInstallationConditionReport & {
      property: Property & { address: Address };
    },
  ) => {
    let blob;

    if (electricalInstallationConditionReport.type === "Electrical Installation Condition Report") {
      blob = await pdf(<ElectricalInstallationConditionReportTemplate electricalInstallationConditionReport={electricalInstallationConditionReport} />).toBlob();
    }

    if (blob) {
      const link = Object.assign(document.createElement("a"), {
        href: URL.createObjectURL(blob),
        download: `${electricalInstallationConditionReport.serial}_${encodeURIComponent(electricalInstallationConditionReport.property.address.streetAddress!.trim().toUpperCase().replace(/\s+/g, "_"))}`,
      });

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }
  };

  const generateSlug = (type: string) => {
    return type
      .trim()
      .split(/\s+/) // Split by spaces
      .map((word) => word[0].toLowerCase()) // Take the first letter of each word
      .join(""); // Join letters together
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/certificates/${generateSlug(electricalInstallationConditionReport.type)}/${electricalInstallationConditionReport.id}/update/contractor-client-property`} className="cursor-pointer">
            Update
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/certificates/${generateSlug(electricalInstallationConditionReport.type)}/${electricalInstallationConditionReport.id}/delete`} className="cursor-pointer">
            Delete
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handlePDFDownload(electricalInstallationConditionReport)} className="cursor-pointer">
          Download PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
