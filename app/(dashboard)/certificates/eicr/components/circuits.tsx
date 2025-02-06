import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, useFieldArray } from "react-hook-form";

export default function Circuits({ index, control }: { index: number, control: Control<any> }) {
  const circuits = useFieldArray({
    control: control,
    name: `dbs.${index}.dbCircuits`,
  });

  return (
    <div className="col-span-9 p-4 space-y-2">
      <div className="grid grid-cols-9 gap-2">
        <FormLabel>Number</FormLabel>
        <FormLabel className="col-span-7">Description</FormLabel>
      </div>

      {circuits.fields.map((circuit, circuitIndex) => (
        <div key={circuit.id} className="grid grid-cols-9 items-end gap-2">
          <FormField
            control={control}
            name={`dbs.${index}.dbCircuits.${circuitIndex}.circuitNumber`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`dbs.${index}.dbCircuits.${circuitIndex}.circuitDescription`}
            render={({ field }) => (
              <FormItem className="col-span-5">
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" onClick={() => circuits.remove(circuitIndex)}>Delete</Button>
          <Button type="button" onClick={() => circuits.move(circuitIndex, circuitIndex - 1)}>Move Up</Button>
          <Button type="button" onClick={() => circuits.move(circuitIndex, circuitIndex + 1)}>Move Down</Button>
        </div>
      ))}

      <Button
        type="button"
        onClick={() =>
          circuits.append({
            circuitNumber: "",
            circuitDescription: "",
            circuitTypeOfWiring: "",
            circuitReferenceMethod: "",
            circuitNumberOfPoints: "",
            circuitConductorLiveCSA: "",
            circuitConductorCPCCSA: "",
            circuitMaxDisconnectionTime: "",
            circuitOCPDBSNumber: "",
            circuitOCPDType: "",
            circuitOCPDRating: "",
            circuitOCPDShortCircuitCapacity: "",
            circuitOCPDMaxPermittedZs: "",
            circuitRCDBSNumber: "",
            circuitRCDType: "",
            circuitRCDRating: "",
            circuitRCDOperatingCurrent: "",
            circuitContinuityr1: "",
            circuitContinuityrn: "",
            circuitContinuityr2: "",
            circuitContinuityR1R2: "",
            circuitContinuityR2: "",
            circuitInsulationResistanceLiveLive: "",
            circuitInsulationResistanceLiveEarth: "",
            circuitInsulationResistanceTestVoltage: "",
            circuitPolarity: true,
            circuitMaximumZs: "",
            circuitRCDOperatingTime: "",
            circuitRCDOTestButton: true,
            circuitAFDDOTestButton: true,
            circuitComments: "",
            circuitsEquipmentVunerableToDamage: "",
          })
        }
      >
        Add Circuit
      </Button>
    </div>
  )
}
