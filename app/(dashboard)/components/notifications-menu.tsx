import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";

export function NotificationsMenu() {
  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          Keith created a EICR
        </DropdownMenuItem>
        <DropdownMenuItem>
          Matt sent you a message
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
