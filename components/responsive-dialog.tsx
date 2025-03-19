import { useEffect, useState } from "react";

import {
  Dialog,
  DialogPortal,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export const ResponsiveDialog = ({
  trigger,
  content,
}: {
  trigger: React.ReactNode;
  content: (setOpen: (open: boolean) => void) => React.ReactNode;
}) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) setKeyboardVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const isKeyboardVisible =
          window.visualViewport.height < window.outerHeight * 0.75;
        setKeyboardVisible(isKeyboardVisible);
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side={keyboardVisible ? "top" : "bottom"}>
        <SheetTitle />
        {content(setOpen)}
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogTitle />
          {content(setOpen)}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
