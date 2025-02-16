import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PlusCircle } from "lucide-react";

export function AddMenu() {
  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <PlusCircle />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          Certificate
        </DropdownMenuItem>
        <DropdownMenuItem>
          User
        </DropdownMenuItem>
        <DropdownMenuItem>
          Client
        </DropdownMenuItem>
        <DropdownMenuItem>
          Property
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
