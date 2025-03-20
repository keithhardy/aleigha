import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const UnsavedChangesDialog = ({
  condition,
  action,
}: {
  condition: boolean;
  action: () => void;
}) => {
  const router = useRouter();
  const originalPush = useRef(router.push);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    originalPush.current = router.push;

    router.push = (url: string) => {
      if (condition) {
        setOpen(true);
        setUrl(url);
        return;
      } else {
        originalPush.current.call(router, url);
      }
    };

    return () => {
      router.push = originalPush.current;
    };
  }, [condition, router]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSaveAndContinue = () => {
    setOpen(false);
    action();
    if (url) setTimeout(() => originalPush.current.call(router, url), 1000);
  };

  const handleContinue = () => {
    setOpen(false);
    if (url) originalPush.current.call(router, url);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. Leave without saving?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="space-y-2">
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSaveAndContinue}>
            Save and continue
          </AlertDialogAction>
          <AlertDialogAction onClick={handleContinue}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
