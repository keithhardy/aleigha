"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import FormActions from "@/components/form-actions";
import { Header, HeaderGroup, Heading } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UnsavedChangesDialog } from "@/components/unsaved-changes-dialog";
import { useToast } from "@/hooks/use-toast";

import { updateScheduleOfCircuitDetailsAndTestResults } from "./action";
import { UpdateScheduleOfCircuitDetailsAndTestResultsSchema } from "./schema";
import { sections } from "../components/sections";

export function UpdateScheduleOfCircuitDetailsAndTestResultsForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<
    z.infer<typeof UpdateScheduleOfCircuitDetailsAndTestResultsSchema>
  >({
    resolver: zodResolver(UpdateScheduleOfCircuitDetailsAndTestResultsSchema),
    defaultValues: {
      id: certificate.id,
      db: JSON.parse(certificate.db as string) || [],
    },
  });

  const onSubmit = async (
    data: z.infer<typeof UpdateScheduleOfCircuitDetailsAndTestResultsSchema>,
  ) => {
    const response = await updateScheduleOfCircuitDetailsAndTestResults(data);

    if (response.status === "success") {
      form.reset(data);
    }

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "db",
  });

  const addDb = () => {
    append({
      dbDesignation: "",
      circuits: [],
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col"
      >
        <div className="container mx-auto max-w-screen-xl flex-grow p-6">
          <Header>
            <HeaderGroup>
              <Link
                href={"/certificates"}
                className="inline-flex items-center text-sm font-semibold"
              >
                <MoveLeft size={22} className="mr-2" />
                <span>Back to Certificates</span>
              </Link>
              <Heading>Schedule of circuit details and test results</Heading>
            </HeaderGroup>
          </Header>

          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>
                    Schedule of circuit details and test results
                  </CardTitle>
                  <CardDescription className="text-balance">
                    Review and update the details of the circuits and test
                    results below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <Button type="button" onClick={addDb}>
                    Add DB
                  </Button>
                  {fields.map((field, index) => (
                    <div key={field.id} className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`db.${index}.dbDesignation`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>DB designation</FormLabel>
                            <FormControl>
                              <Input placeholder="Consumer Unit" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="button" onClick={() => remove(index)}>
                        Delete
                      </Button>

                      <div>
                        <CircuitsForm index={index} control={form.control} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-balance text-sm text-muted-foreground">
                  Ensure the prosumer’s low voltage installation is inspected
                  for condition.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>

        <FormActions
          form={form}
          sections={sections}
          baseUrl={"/certificates/eicr"}
        />
      </form>

      <UnsavedChangesDialog
        condition={form.formState.isDirty}
        action={form.handleSubmit(onSubmit)}
      />
    </Form>
  );
}

function CircuitsForm({
  index,
  control,
}: {
  index: number;
  control: Control<any>;
}) {
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: `db.${index}.circuits`,
  });

  const addCircuit = () => {
    append({
      circuitNumber: "",
    });
  };

  return (
    <>
      <Button type="button" onClick={addCircuit}>
        Add New Circuit
      </Button>
      {fields.map((circuitItem, circuitIndex) => (
        <div key={circuitItem.id} className="space-y-4">
          <FormField
            control={control}
            name={`db.${index}.circuits.${circuitIndex}.circuitNumber`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Circuit number</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" onClick={() => remove(index)}>
            Delete
          </Button>
        </div>
      ))}
    </>
  );
}
