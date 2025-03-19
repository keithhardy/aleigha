import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"; // Adjust imports as needed

interface UnsavedChangesDialogProps {
  form: any;
  onSubmit: (data: any) => void;
}

export const UnsavedChangesDialog = ({ form, onSubmit }: UnsavedChangesDialogProps) => {
  const [unsavedChangesOpen, setUnsavedChangesOpen] = useState(false);
  const originalPush = useRef((url: string) => { });
  const router = useRouter();

  useEffect(() => {
    originalPush.current = router.push;

    router.push = (url: string) => {
      if (form.formState.isDirty) {
        setUnsavedChangesOpen(true);
        localStorage.setItem("nextUrl", url);
        return;
      } else {
        originalPush.current.call(router, url);
      }
    };

    return () => {
      router.push = originalPush.current;
    };
  }, [form.formState.isDirty, router]);

  const handleSaveAndContinue = () => {
    form.handleSubmit(onSubmit)();

    const nextUrl = localStorage.getItem("nextUrl");
    if (nextUrl) {
      router.push(nextUrl);
      localStorage.removeItem("nextUrl");
    }

    setUnsavedChangesOpen(false);
  };

  const handleContinue = () => {
    const nextUrl = localStorage.getItem("nextUrl");
    if (nextUrl) {
      router.push(nextUrl);
      localStorage.removeItem("nextUrl");
    }

    setUnsavedChangesOpen(false);
  };

  return (
    <AlertDialog open={unsavedChangesOpen} onOpenChange={setUnsavedChangesOpen}>
      <AlertDialogContent className="w-[90%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. Leave without saving?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setUnsavedChangesOpen(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleSaveAndContinue}>
            Save and continue
          </AlertDialogAction>
          <AlertDialogAction onClick={handleContinue} className="mt-2 sm:mt-0">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
