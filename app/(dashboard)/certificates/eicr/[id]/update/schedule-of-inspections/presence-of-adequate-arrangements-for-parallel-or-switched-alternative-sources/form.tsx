"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
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
import { UnsavedChangesDialog } from "@/components/unsaved-changes-dialog";
import { useToast } from "@/hooks/use-toast";

import { sections } from "../../components/sections";
import { RadioGroupComponent } from "../radio-group";
import { updatePresenceOfAdequateArrangements } from "./action";
import { inspectionItems } from "./inspection-items";
import { UpdatePresenceOfAdequateArrangementsSchema } from "./schema";

export function UpdatePresenceOfAdequateArrangementsForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<
    z.infer<typeof UpdatePresenceOfAdequateArrangementsSchema>
  >({
    resolver: zodResolver(UpdatePresenceOfAdequateArrangementsSchema),
    defaultValues: {
      id: certificate.id,
      item_2_1: certificate.item_2_1 || "na",
      item_2_2: certificate.item_2_2 || "na",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof UpdatePresenceOfAdequateArrangementsSchema>,
  ) => {
    const response = await updatePresenceOfAdequateArrangements(data);

    if (response.status === "success") {
      form.reset(data);
    }

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
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
              <Heading>
                Presence of adequate arrangements for parallel or switched
                alternative sources
              </Heading>
            </HeaderGroup>
          </Header>

          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <CardHeader>
                <CardTitle>
                  Presence of adequate arrangements for parallel or switched
                  alternative sources
                </CardTitle>
                <CardDescription className="text-primary">
                  This section evaluates the presence of suitable arrangements
                  for parallel or switched alternative power sources, such as
                  microgenerators.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {inspectionItems.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    // @ts-expect-error Field value is an enum, Input expects string
                    name={item.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.item + " - " + item.label}</FormLabel>
                        <FormControl>
                          <RadioGroupComponent
                            onChange={field.onChange}
                            value={field.value || "na"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </CardContent>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-2">
                <p className="text-sm text-muted-foreground">
                  Ensure all items related to microgenerators are inspected.
                </p>
                <Button
                  variant="outline"
                  type="submit"
                  disabled={
                    !form.formState.isDirty || form.formState.isSubmitting
                  }
                >
                  {form.formState.isSubmitting ? "Saving..." : "Save"}
                </Button>
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
