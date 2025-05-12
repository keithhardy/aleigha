"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormBar } from "@/app/(dashboard)/certificates/components/form-bar";
import { UnsavedChangesDialog } from "@/app/(dashboard)/certificates/components/unsaved-changes-dialog";
import { Header, HeaderGroup, HeaderTitle } from "@/components/page-header";
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
        <div className="container mx-auto p-6">
          <Header>
            <HeaderGroup>
              <Link
                href={"/certificates"}
                className="inline-flex items-center text-sm font-semibold"
              >
                <MoveLeft size={22} className="mr-2" />
                <span>Back to Certificates</span>
              </Link>
              <HeaderTitle>
                Presence of adequate arrangements for parallel or switched
                alternative sources
              </HeaderTitle>
            </HeaderGroup>
          </Header>
          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>
                    Presence of adequate arrangements for parallel or switched
                    alternative sources
                  </CardTitle>
                  <CardDescription className="text-balance">
                    This section evaluates the presence of suitable arrangements
                    for parallel or switched alternative power sources, such as
                    microgenerators.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-8 p-0">
                  {inspectionItems.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      // @ts-expect-error Field value is an enum, Input expects string
                      name={item.id}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {item.item + " - " + item.label}
                          </FormLabel>
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
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-2">
                <p className="text-balance text-sm text-muted-foreground">
                  Ensure all items related to microgenerators are inspected.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
        <FormBar
          form={form}
          sections={sections}
          baseUrl={"/certificates/eicr"}
        />
        <UnsavedChangesDialog
          condition={form.formState.isDirty}
          action={form.handleSubmit(onSubmit)}
        />
      </form>
    </Form>
  );
}
