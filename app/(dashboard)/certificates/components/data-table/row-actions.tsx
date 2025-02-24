import { pdf } from "@react-pdf/renderer";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ElectricalInstallationConditionReportTemplate from "../templates/electrical-installation-condition-report-template";

export function RowActions({ certificate }: { certificate: any }) {
  const handlePDFDownload = async (certificate: any) => {
    let blob;

    if (certificate.type === "Electrical Installation Condition Report") {
      blob = await pdf(
        <ElectricalInstallationConditionReportTemplate data={certificate} />,
      ).toBlob();
    }

    if (blob) {
      const link = Object.assign(document.createElement("a"), {
        href: URL.createObjectURL(blob),
        download: `${certificate.propertyAddress}-${Date.now()}`,
      });

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }
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
          <Link
            href={`/certificates/${encodeURIComponent(certificate.type.trim().toLowerCase().replace(/\s+/g, "-"))}/${certificate.id}/update`}
            className="cursor-pointer"
          >
            Update
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/certificates/${encodeURIComponent(certificate.type.trim().toLowerCase().replace(/\s+/g, "-"))}/${certificate.id}/delete`}
            className="cursor-pointer"
          >
            Delete
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handlePDFDownload(certificate)}
          className="cursor-pointer"
        >
          Download PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
