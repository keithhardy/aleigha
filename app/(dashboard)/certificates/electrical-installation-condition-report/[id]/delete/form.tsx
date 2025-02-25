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
import { DeleteElectricalInstallationConditionReportSchema } from "./schema";

export function DeleteElectricalInstallationConditionReportForm({
  electricalInstallationConditionReport,
}: {
  electricalInstallationConditionReport: ElectricalInstallationConditionReport;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof DeleteElectricalInstallationConditionReportSchema>>({
    resolver: zodResolver(DeleteElectricalInstallationConditionReportSchema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      serial: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof DeleteElectricalInstallationConditionReportSchema>) => {
    const response = await deleteElectricalInstallationConditionReport(data);

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });

    if (response.status === "success") {
      router.push("/certificates");
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
