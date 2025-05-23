"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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
    defaultValues: electricalInstallationConditionReport,
  });

  const onSubmit = async (
    data: z.infer<typeof DeleteElectricalInstallationConditionReportSchema>,
  ) => {
    const response = await deleteElectricalInstallationConditionReport(data);

    if (response.status === "success") {
      form.reset(data);
    }

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
        <Button type="submit" variant="destructive">
          {form.formState.isSubmitting ? "Deleting" : "Delete"}
        </Button>
      </form>
    </Form>
  );
}
