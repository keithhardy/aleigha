"use client";

import { ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormItem, FormMessage } from "@/components/ui/form";
import { useIsMobile } from "@/hooks/use-mobile";

interface SelectPopoverProps<T> {
  name: string;
  label?: string;
  options: T[];
  getValue: (option: T) => string | number;
  getLabel: (option: T) => string;
  onChange?: (value: string | number) => void;
}

export function SelectPopover<T>({
  name,
  label,
  options,
  getValue,
  getLabel,
  onChange,
}: SelectPopoverProps<T>) {
  const isMobile = useIsMobile();
  const { setValue, watch } = useFormContext();
  const selectedValue = watch(name);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const anySheetOpen = sheetOpen;

  useEffect(() => {
    if (!anySheetOpen) return;

    const handleResize = () => {
      if (window.visualViewport) {
        const isKeyboardVisible = window.visualViewport.height < window.outerHeight * 0.75;
        setKeyboardVisible(isKeyboardVisible);
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, [anySheetOpen]);

  const handleChange = (value: string | number) => {
    setValue(name, value);
    onChange?.(value);
    setSheetOpen(false);
    setDialogOpen(false);
  };

  const selectedOption = options.find((option) => getValue(option) === selectedValue);

  return (
    <FormItem>
      {isMobile ? (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedOption ? getLabel(selectedOption) : `Select ${label}...`}
              <ChevronsUpDown className="ml-2 opacity-50" />
            </Button>
          </SheetTrigger>
          <SheetContent side={keyboardVisible ? "top" : "bottom"}>
            <Command>
              <CommandInput placeholder={`Search ${label}...`} />
              <CommandList className="scrollbar-hidden">
                <CommandEmpty>No {label?.toLowerCase()} found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={getValue(option)}
                      value={getLabel(option)}
                      onSelect={() => handleChange(getValue(option))}
                    >
                      {getLabel(option)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedOption ? getLabel(selectedOption) : `Select ${label}...`}
              <ChevronsUpDown className="ml-2 opacity-50" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Command>
              <CommandInput placeholder={`Search ${label}...`} />
              <CommandList className="scrollbar-hidden">
                <CommandEmpty>No {label?.toLowerCase()} found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={getValue(option)}
                      value={getLabel(option)}
                      onSelect={() => handleChange(getValue(option))}
                    >
                      {getLabel(option)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </DialogContent>
        </Dialog>
      )}
      <FormMessage />
    </FormItem>
  );
}
