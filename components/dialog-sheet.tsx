"use client";

import * as DialogSheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";

import { useIsMobile } from "@/hooks/use-mobile";

import { cn } from "../lib/utils";

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
DialogSheetOverlay.displayName = DialogSheetPrimitive.Overlay.displayName;

const DialogSheetContent = React.forwardRef<
  React.ElementRef<typeof DialogSheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogSheetPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  const handleResize = React.useCallback(() => {
    const viewportHeight = window.visualViewport?.height ?? window.outerHeight;
    setKeyboardVisible(viewportHeight < window.outerHeight * 0.75);
  }, []);

  React.useEffect(() => {
    window.visualViewport?.addEventListener("resize", handleResize);
    return () =>
      window.visualViewport?.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <DialogSheetPortal>
      <DialogSheetOverlay />
      <DialogSheetPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out",
          isMobile
            ? cn(
                keyboardVisible
                  ? "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top"
                  : "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
                "data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
              )
            : "left-[50%] top-[50%] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className,
        )}
        {...props}
      >
        <DialogSheetPrimitive.Close
          className={cn(
            isMobile
              ? "data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              : "data-[state=open]:bg-secondary",
            "absolute right-[18px] top-[18px] rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none",
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
DialogSheetContent.displayName = DialogSheetPrimitive.Content.displayName;

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
DialogSheetTitle.displayName = DialogSheetPrimitive.Title.displayName;

const DialogSheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogSheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogSheetPrimitive.Description>
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
