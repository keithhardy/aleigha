"use client";

import { useRouter } from "next/navigation";

import {
  DialogSheet,
  DialogSheetContent,
  DialogSheetTitle,
} from "@/components/dialog-sheet";

export function Modal({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  function onDismiss() {
    router.back();
  }

  return (
    <DialogSheet open onOpenChange={onDismiss}>
      <DialogSheetContent className="p-0">
        <DialogSheetTitle className="hidden" />
        {children}
      </DialogSheetContent>
    </DialogSheet>
  );
}
