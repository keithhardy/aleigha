import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';


import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function RowActions({ certificate }: { certificate: any }) {
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
          <Link href={`/certificates/${encodeURIComponent(certificate.type.trim().toLowerCase().replace(/\s+/g, '-'))}/${certificate.id}/update`}>Update</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/certificates/${encodeURIComponent(certificate.type.trim().toLowerCase().replace(/\s+/g, '-'))}/${certificate.id}/delete`}>Delete</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
