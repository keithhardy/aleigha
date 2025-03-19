import { useEffect, useState } from "react";

import {
  Dialog,
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

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.visualViewport?.height ?? window.outerHeight;
      setKeyboardVisible(viewportHeight < window.outerHeight * 0.75);
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () =>
      window.visualViewport?.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) setKeyboardVisible(false);
  };

  const Component = isMobile ? Sheet : Dialog;
  const Trigger = isMobile ? SheetTrigger : DialogTrigger;
  const Content = isMobile ? SheetContent : DialogContent;
  const Title = isMobile ? SheetTitle : DialogTitle;

  return (
    <Component open={open} onOpenChange={handleOpenChange}>
      <Trigger asChild>{trigger}</Trigger>
      <Content side={isMobile && keyboardVisible ? "top" : "bottom"}>
        <Title />
        {content(setOpen)}
      </Content>
    </Component>
  );
};
