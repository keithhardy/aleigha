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
import { useEffect } from "react";

const ResponsiveDialog = ({
  triggerButton,
  children,
  keyboardVisible,
  setKeyboardVisible,
  sheetOpen,
  setSheetOpen,
}: {
  triggerButton: React.ReactNode;
  children: React.ReactNode;
  keyboardVisible: boolean;
  setKeyboardVisible: (visible: boolean) => void;
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
}) => {
  const isMobile = useIsMobile();

  const handleSheetOpenChange = (isOpen: boolean) => {
    setSheetOpen(isOpen);
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
  });

  return (
    <>
      {isMobile ? (
        <Sheet open={sheetOpen} onOpenChange={handleSheetOpenChange}>
          <SheetTrigger asChild>{triggerButton}</SheetTrigger>
          <SheetContent side={keyboardVisible ? "top" : "bottom"}>
            <SheetTitle />
            {children}
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
          <DialogTrigger asChild>{triggerButton}</DialogTrigger>
          <DialogPortal>
            <DialogContent>
              <DialogTitle />
              {children}
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </>
  );
};

export default ResponsiveDialog;
