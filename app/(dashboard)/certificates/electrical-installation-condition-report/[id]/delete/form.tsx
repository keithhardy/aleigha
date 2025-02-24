"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import { deleteElectricalInstallationConditionReport } from "./action";
import { Schema } from "./schema";

export function ElectricalInstallationConditionReportDeleteForm({
  electricalInstallationConditionReport,
}: {
  electricalInstallationConditionReport: ElectricalInstallationConditionReport;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      serial: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    try {
      await deleteElectricalInstallationConditionReport(data);

      router.push("/certificates");

      toast({
        title: "Electrical Installation Condition Report Deleted",
        description:
          "Electrical Installation Condition Report was successfully removed.",
      });
    } catch {
      toast({
        title: "Error",
        description:
          "Failed to delete the Electrical Installation Condition Report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 pb-4">
          <FormField
            control={form.control}
            name="serial"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Enter{" "}
                  <span className="text-foreground">
                    {electricalInstallationConditionReport.serial}
                  </span>{" "}
                  and press delete to remove.
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={
              form.watch("serial") !==
                electricalInstallationConditionReport.serial ||
              form.formState.isSubmitting
            }
            variant="destructive"
          >
            {form.formState.isSubmitting ? "Deleting" : "Delete"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
