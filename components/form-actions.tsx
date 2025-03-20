import {
  ArrowLeft,
  ArrowRight,
  List,
  RotateCcw,
  Save,
  Send,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { ResponsiveDialog } from "./responsive-dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

interface FormActionsProps {
  form: UseFormReturn<any>;
  sections: { title: string; url: string }[];
  baseUrl: string;
}

export default function FormActions({
  form,
  sections,
  baseUrl,
}: FormActionsProps) {
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
          <ResponsiveDialog
            trigger={
              <Button variant="outline" size="icon">
                <List />
              </Button>
            }
            content={(setOpen) => (
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList className="scrollbar-hidden">
                  <CommandEmpty>None found.</CommandEmpty>
                  <CommandGroup>
                    {sections.map((section, index) => (
                      <CommandItem
                        key={index}
                        value={section.title}
                        onSelect={() => {
                          setOpen(false);
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
            )}
          />
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
          <Button variant="outline" size="icon" onClick={() => form.reset()}>
            <Send />
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
