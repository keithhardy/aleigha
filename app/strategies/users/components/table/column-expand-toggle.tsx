import { type Row } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ExpandToggleProps<TData> {
  row: Row<TData>;
}

export function ExpandToggle<TData>({ row }: ExpandToggleProps<TData>) {
  return row.getCanExpand() ? (
    <Button variant="ghost" size="icon" onClick={row.getToggleExpandedHandler()}>
      {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
    </Button>
  ) : null;
}
