"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

import { updateScheduleOfCircuitDetailsAndTestResults } from "./action";
import { UpdateScheduleOfCircuitDetailsAndTestResultsSchema } from "./schema";

export function UpdateScheduleOfCircuitDetailsAndTestResultsForm({
  electricalInstallationConditionReport,
}: {
  electricalInstallationConditionReport: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<
    z.infer<typeof UpdateScheduleOfCircuitDetailsAndTestResultsSchema>
  >({
    resolver: zodResolver(UpdateScheduleOfCircuitDetailsAndTestResultsSchema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      db: JSON.parse(electricalInstallationConditionReport.db as string) || [],
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
      dbLocation: "",
      dbZdb: "",
      dbIpf: "",
      dbConfirmationOfSupplyPolarity: false,
      dbPhaseSequenceConfirmed: false,
      dbSPDType: "",
      dbSPDStatusIndicator: false,
      dbSupplyFrom: "",
      dbOCPDBSnumber: "",
      dbOCPDType: "",
      dbOCPDNominalVoltage: "",
      dbOCPDRating: "",
      dbOCPDNumberOfPhases: "",
      dbRCDBSNumber: "",
      dbRCDType: "",
      dbRCDOperatingCurrent: "",
      dbRCDNumberOfPoles: "",
      dbRCDOperatingTime: "",
      testedByName: "",
      testedByPosition: "",
      testedBySignatureDate: "",
      testInstrumentMultiFunctionSerialNumber: "",
      testInstrumentContinuitySerialNumber: "",
      testInstrumentInsulationResistanceSerialNumber: "",
      testInstrumentEarthFaultLoopImpedanceSerialNumber: "",
      testInstrumentEarthElectrodeSerialNumber: "",
      testInstrumentRCDSerialNumber: "",
      dbCircuits: [],
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>
              Schedule of circuit details and test results
            </CardTitle>
            <CardDescription className="text-primary">
              Review and update the details of the circuits and test results below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                      <FormLabel>DB Designation</FormLabel>
                      <FormControl>
                        <Input placeholder="Consumer Unit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                    control={form.control}
                    name={`db.${index}.dbLocation`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DB Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Vestibule Wall" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbZdb`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DB Zdb</FormLabel>
                        <FormControl>
                          <Input placeholder="0.35" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbIpf`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DB Ipf</FormLabel>
                        <FormControl>
                          <Input placeholder="0.65" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbConfirmationOfSupplyPolarity`}
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel>Supply Polarity Confirmation</FormLabel>
                        </div>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbPhaseSequenceConfirmed`}
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel>Phase Sequence Confirmation</FormLabel>
                        </div>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbSPDType`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SPD Type</FormLabel>
                        <FormControl>
                          <Input placeholder="2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbSPDStatusIndicator`}
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel>SPD Status Indicator</FormLabel>
                        </div>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbSupplyFrom`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supply Source</FormLabel>
                        <FormControl>
                          <Input placeholder="Origin" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbOCPDBSnumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OCPD BS Number</FormLabel>
                        <FormControl>
                          <Input placeholder="N/A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbOCPDType`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OCPD Type</FormLabel>
                        <FormControl>
                          <Input placeholder="N/A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbOCPDNominalVoltage`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nominal Voltage</FormLabel>
                        <FormControl>
                          <Input placeholder="N/A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbOCPDRating`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OCPD Rating</FormLabel>
                        <FormControl>
                          <Input placeholder="N/A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbOCPDNumberOfPhases`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Phases</FormLabel>
                        <FormControl>
                          <Input placeholder="N/A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbRCDBSNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RCD BS Number</FormLabel>
                        <FormControl>
                          <Input placeholder="N/A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbRCDType`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RCD Type</FormLabel>
                        <FormControl>
                          <Input placeholder="N/A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbRCDOperatingCurrent`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RCD Operating Current</FormLabel>
                        <FormControl>
                          <Input placeholder="N/A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbRCDNumberOfPoles`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RCD Number of Poles</FormLabel>
                        <FormControl>
                          <Input placeholder="N/A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.dbRCDOperatingTime`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RCD Operating Time</FormLabel>
                        <FormControl>
                          <Input placeholder="N/A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.testedByName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tested By (Name)</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.testedByPosition`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tested By (Position)</FormLabel>
                        <FormControl>
                          <Input placeholder="Electrician" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.testInstrumentMultiFunctionSerialNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Multi-Function Tester Serial Number</FormLabel>
                        <FormControl>
                          <Input placeholder="101864488" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.testInstrumentContinuitySerialNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Continuity Tester Serial Number</FormLabel>
                        <FormControl>
                          <Input placeholder="N/A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.testInstrumentInsulationResistanceSerialNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Insulation Resistance Tester Serial Number
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="N/A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.testInstrumentEarthFaultLoopImpedanceSerialNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Earth Fault Loop Impedance Tester Serial Number
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="N/A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.testInstrumentEarthElectrodeSerialNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Earth Electrode Tester Serial Number
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="N/A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`db.${index}.testInstrumentRCDSerialNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RCD Tester Serial Number</FormLabel>
                        <FormControl>
                          <Input placeholder="N/A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                <Button
                  type="button"
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>

                {/* <CircuitsForm index={index} /> */}
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">
              Ensure the prosumer’s low voltage installation is inspected
              for condition.
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
      </form>
    </Form>
  );
}

// function CircuitsForm({ index }: { index: number }) {
//   const form = useForm<
//     z.infer<typeof UpdateScheduleOfCircuitDetailsAndTestResultsSchema>
//   >({
//     resolver: zodResolver(UpdateScheduleOfCircuitDetailsAndTestResultsSchema),
//     defaultValues: {
//       db: [],
//     },
//   });

//   const {
//     fields: circuitFields,
//     append: appendCircuit,
//     remove: removeCircuit,
//   } = useFieldArray({
//     control: form.control,
//     name: `db.${index}.dbCircuits`,
//   });

//   return (
//     <div>
//       {circuitFields.map((circuitItem, circuitIndex) => (
//         <div key={circuitItem.id} className="mb-4">
//           <Card className="shadow-none rounded-md">
//             <CardHeader>
//               <CardTitle>
//                 Circuit {circuitIndex + 1}
//                 <Button
//                   type="button"
//                   onClick={() => removeCircuit(circuitIndex)}
//                   variant="destructive"
//                   className="ml-4"
//                 >
//                   Remove Circuit
//                 </Button>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitNumber`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Circuit Number</FormLabel>
//                     <FormControl>
//                       <Input placeholder="1" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitDescription`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Circuit Description</FormLabel>
//                     <FormControl>
//                       <Input placeholder="General Sockets" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitTypeOfWiring`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Type of Wiring</FormLabel>
//                     <FormControl>
//                       <Input placeholder="A" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitReferenceMethod`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Reference Method</FormLabel>
//                     <FormControl>
//                       <Input placeholder="C" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitNumberOfPoints`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Number of Points</FormLabel>
//                     <FormControl>
//                       <Input placeholder="10" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitConductorLiveCSA`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Conductor CSA (Live)</FormLabel>
//                     <FormControl>
//                       <Input placeholder="2.5" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitConductorCPCCSA`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Conductor CSA (CPC)</FormLabel>
//                     <FormControl>
//                       <Input placeholder="1.5" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitMaxDisconnectionTime`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Max Disconnection Time</FormLabel>
//                     <FormControl>
//                       <Input placeholder="0.4" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitOCPDBSNumber`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>OCPD BS Number</FormLabel>
//                     <FormControl>
//                       <Input placeholder="BS61009" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitOCPDType`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>OCPD Type</FormLabel>
//                     <FormControl>
//                       <Input placeholder="B" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitOCPDRating`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>OCPD Rating</FormLabel>
//                     <FormControl>
//                       <Input placeholder="32" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitOCPDShortCircuitCapacity`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>OCPD Short Circuit Capacity</FormLabel>
//                     <FormControl>
//                       <Input placeholder="6" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitOCPDMaxPermittedZs`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>OCPD Max Permitted Zs</FormLabel>
//                     <FormControl>
//                       <Input placeholder="1.37" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitRCDBSNumber`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>RCD BS Number</FormLabel>
//                     <FormControl>
//                       <Input placeholder="BS61009" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitRCDType`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>RCD Type</FormLabel>
//                     <FormControl>
//                       <Input placeholder="A" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitRCDRating`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>RCD Rating</FormLabel>
//                     <FormControl>
//                       <Input placeholder="32" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitRCDOperatingCurrent`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>RCD Operating Current</FormLabel>
//                     <FormControl>
//                       <Input placeholder="30" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitContinuityr1`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Circuit Continuity r1</FormLabel>
//                     <FormControl>
//                       <Input placeholder="0.20" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitContinuityrn`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Circuit Continuity rn</FormLabel>
//                     <FormControl>
//                       <Input placeholder="0.20" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitContinuityr2`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Circuit Continuity r2</FormLabel>
//                     <FormControl>
//                       <Input placeholder="0.33" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitContinuityR1R2`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Circuit Continuity R1 + R2</FormLabel>
//                     <FormControl>
//                       <Input placeholder="0.17" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitInsulationResistanceLiveLive`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>
//                       Circuit Insulation Resistance (Live/Live)
//                     </FormLabel>
//                     <FormControl>
//                       <Input placeholder="999" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitInsulationResistanceLiveEarth`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>
//                       Circuit Insulation Resistance (Live/Earth)
//                     </FormLabel>
//                     <FormControl>
//                       <Input placeholder="999" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitInsulationResistanceTestVoltage`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Insulation Resistance Test Voltage</FormLabel>
//                     <FormControl>
//                       <Input placeholder="500" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitPolarity`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <div>
//                       <FormLabel>Circuit Polarity</FormLabel>
//                     </div>
//                     <Switch
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitMaximumZs`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>
//                       Measured Earth Fault Loop Impedance (Zs)
//                     </FormLabel>
//                     <FormControl>
//                       <Input placeholder="0.52" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitRCDOperatingTime`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>RCD Operating Time</FormLabel>
//                     <FormControl>
//                       <Input placeholder="11.9" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitRCDOTestButton`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <div>
//                       <FormLabel>RCD Test Button</FormLabel>
//                     </div>
//                     <Switch
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitAFDDOTestButton`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <div>
//                       <FormLabel>AFDD Test Button</FormLabel>
//                     </div>
//                     <Switch
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitComments`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>
//                       Circuit Comments and Additional Information
//                     </FormLabel>
//                     <FormControl>
//                       <Input placeholder="N/A" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name={`db.${index}.dbCircuits.${circuitIndex}.circuitsEquipmentVunerableToDamage`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Equipment Vulnerable to Damage</FormLabel>
//                     <FormControl>
//                       <Input placeholder="N/A" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </CardContent>
//           </Card>
//         </div>
//       ))}

//       <Button
//         type="button"
//         onClick={() =>
//           appendCircuit({
//             circuitNumber: "",
//             circuitDescription: "",
//             circuitTypeOfWiring: "",
//             circuitReferenceMethod: "",
//             circuitNumberOfPoints: "",
//             circuitConductorLiveCSA: "",
//             circuitConductorCPCCSA: "",
//             circuitMaxDisconnectionTime: "",
//             circuitOCPDBSNumber: "",
//             circuitOCPDType: "",
//             circuitOCPDRating: "",
//             circuitOCPDShortCircuitCapacity: "",
//             circuitOCPDMaxPermittedZs: "",
//             circuitRCDBSNumber: "",
//             circuitRCDType: "",
//             circuitRCDRating: "",
//             circuitRCDOperatingCurrent: "",
//             circuitContinuityr1: "",
//             circuitContinuityrn: "",
//             circuitContinuityr2: "",
//             circuitContinuityR1R2: "",
//             circuitContinuityR2: "",
//             circuitInsulationResistanceLiveLive: "",
//             circuitInsulationResistanceLiveEarth: "",
//             circuitInsulationResistanceTestVoltage: "",
//             circuitPolarity: false,
//             circuitMaximumZs: "",
//             circuitRCDOperatingTime: "",
//             circuitRCDOTestButton: false,
//             circuitAFDDOTestButton: false,
//             circuitComments: "",
//             circuitsEquipmentVunerableToDamage: "",
//           })
//         }
//       >
//         Add New Circuit
//       </Button>
//     </div>
//   );
// }
