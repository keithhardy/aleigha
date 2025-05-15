import { type Row } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export const ExpandToggle = <TData,>({ row }: { row: Row<TData> }) =>
  row.getCanExpand() ? (
    <Button variant="ghost" size="icon" onClick={row.getToggleExpandedHandler()}>
      {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
    </Button>
  ) : null;
