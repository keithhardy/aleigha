import { ArrowLeft, ArrowRight, List, RotateCcw, Save } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { type UseFormReturn } from "react-hook-form";

import {
  DialogSheet,
  DialogSheetContent,
  DialogSheetTitle,
  DialogSheetTrigger,
} from "@/components/dialog-sheet";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../../components/ui/command";

interface FormBarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  sections: { title: string; url: string }[];
  baseUrl: string;
}

export function FormBar({ form, sections, baseUrl }: FormBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const currentIndex = sections.findIndex((section) =>
    pathname.endsWith(section.url),
  );
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection =
    currentIndex >= 0 && currentIndex < sections.length - 1
      ? sections[currentIndex + 1]
      : null;

  const [sectionsOpen, setSectionsOpen] = useState(false);

  return (
    <div className="sticky bottom-0 border-t bg-background">
      <div className="container mx-auto flex max-w-screen-xl justify-between px-6 py-4">
        <Button
          variant="outline"
          size="icon"
          type="button"
          disabled={!prevSection}
          onClick={() =>
            prevSection &&
            router.push(
              `${baseUrl}/${form.getValues("id")}/update/${prevSection.url}`,
            )
          }
        >
          <ArrowLeft />
        </Button>
        <div className="space-x-2">
          <DialogSheet open={sectionsOpen} onOpenChange={setSectionsOpen}>
            <DialogSheetTrigger asChild>
              <Button variant="outline" size="icon">
                <List />
              </Button>
            </DialogSheetTrigger>
            <DialogSheetContent className="p-0">
              <DialogSheetTitle className="hidden" />
              <Command className="pt-2">
                <CommandInput placeholder="Search..." />
                <CommandList className="scrollbar-hidden mt-1 border-t p-1">
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {sections.map((section, index) => (
                      <CommandItem
                        key={index}
                        value={section.title}
                        onSelect={() => {
                          setSectionsOpen(false);
                          router.push(
                            `${baseUrl}/${form.getValues("id")}/update/${section.url}`,
                          );
                        }}
                        className="truncate"
                      >
                        <p className="truncate">{section.title}</p>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DialogSheetContent>
          </DialogSheet>
          <Button
            variant="outline"
            size="icon"
            onClick={() => form.reset()}
            disabled={!form.formState.isDirty}
          >
            <RotateCcw />
          </Button>
          <Button
            type="submit"
            variant="outline"
            size="icon"
            disabled={!form.formState.isDirty || form.formState.isSubmitting}
          >
            <Save />
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          type="button"
          disabled={!nextSection}
          onClick={() =>
            nextSection &&
            router.push(
              `${baseUrl}/${form.getValues("id")}/update/${nextSection.url}`,
            )
          }
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
