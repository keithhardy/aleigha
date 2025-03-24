import { useEffect, useState, useCallback } from "react";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export const ResponsiveDialog = ({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  const isMobile = useIsMobile();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleResize = useCallback(() => {
    const viewportHeight = window.visualViewport?.height ?? window.outerHeight;
    setKeyboardVisible(viewportHeight < window.outerHeight * 0.75);
  }, []);

  useEffect(() => {
    window.visualViewport?.addEventListener("resize", handleResize);
    return () => window.visualViewport?.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const Component = isMobile ? Sheet : Dialog;
  const Content = isMobile ? SheetContent : DialogContent;

  return (
    <Component open={open} onOpenChange={onOpenChange}>
      <Content side={isMobile && keyboardVisible ? "top" : "bottom"}>
        {children}
      </Content>
    </Component>
  );
};
