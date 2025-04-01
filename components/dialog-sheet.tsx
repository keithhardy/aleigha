"use client";

import * as DialogSheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "../lib/utils";

import { useIsMobile } from "@/hooks/use-mobile";

const DialogSheet = DialogSheetPrimitive.Root;

const DialogSheetTrigger = DialogSheetPrimitive.Trigger;

const DialogSheetClose = DialogSheetPrimitive.Close;

const DialogSheetPortal = DialogSheetPrimitive.Portal;

const DialogSheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogSheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogSheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogSheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
DialogSheetOverlay.displayName =
  DialogSheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface DialogSheetContentProps
  extends React.ComponentPropsWithoutRef<
    typeof DialogSheetPrimitive.Content
  >,
  VariantProps<typeof sheetVariants> { }

const DialogSheetContent = React.forwardRef<
  React.ElementRef<typeof DialogSheetPrimitive.Content>,
  DialogSheetContentProps
>(({ side = "right", className, children, ...props }, ref) => {
  const isMobile = useIsMobile();

  return (
    <DialogSheetPortal>
      <DialogSheetOverlay />
      <DialogSheetPrimitive.Content
        ref={ref}
        className={cn(
          isMobile
            ? sheetVariants({ side })
            : "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className,
        )}
        {...props}
      >
        <DialogSheetPrimitive.Close
          className={cn(
            isMobile
              ? "data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              : "data-[state=open]:bg-secondary",
            "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
          )}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogSheetPrimitive.Close>
        {children}
      </DialogSheetPrimitive.Content>
    </DialogSheetPortal>
  );
});
DialogSheetContent.displayName =
  DialogSheetPrimitive.Content.displayName;

const DialogSheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        isMobile ? "space-y-2" : "space-y-1.5",
        "flex flex-col space-y-2 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
};
DialogSheetHeader.displayName = "DialogSheetHeader";

const DialogSheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DialogSheetFooter.displayName = "DialogSheetFooter";

const DialogSheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogSheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogSheetPrimitive.Title>
>(({ className, ...props }, ref) => {
  const isMobile = useIsMobile();

  return (
    <DialogSheetPrimitive.Title
      ref={ref}
      className={cn(
        isMobile ? "text-foreground" : "leading-none tracking-tight",
        "text-lg font-semibold",
        className,
      )}
      {...props}
    />
  );
});
DialogSheetTitle.displayName =
  DialogSheetPrimitive.Title.displayName;

const DialogSheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogSheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<
    typeof DialogSheetPrimitive.Description
  >
>(({ className, ...props }, ref) => (
  <DialogSheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogSheetDescription.displayName =
  DialogSheetPrimitive.Description.displayName;

export {
  DialogSheet,
  DialogSheetPortal,
  DialogSheetOverlay,
  DialogSheetTrigger,
  DialogSheetClose,
  DialogSheetContent,
  DialogSheetHeader,
  DialogSheetFooter,
  DialogSheetTitle,
  DialogSheetDescription,
};
