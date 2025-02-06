import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, useFieldArray } from "react-hook-form";
import Circuits from "./circuits";

export default function Dbs({ control }: { control: Control<any> }) {
  const dbs = useFieldArray({
    control: control,
    name: `dbs`,
  });

  return (
    <>
      <div className="grid grid-cols-9 gap-2">
        <FormLabel>Designation</FormLabel>
        <FormLabel className="col-span-4">Location</FormLabel>
        <FormLabel>Zdb</FormLabel>
        <FormLabel className="col-span-2">Ipf</FormLabel>
      </div>

      {dbs.fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-9 items-end gap-2">
          <FormField control={control} name={`dbs.${index}.dbDesignation`} render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name={`dbs.${index}.dbLocation`} render={({ field }) => (
            <FormItem className="col-span-4">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name={`dbs.${index}.dbZdb`} render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name={`dbs.${index}.dbIpf`} render={({ field }) => (
            <FormItem className="col-span-2">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="button" onClick={() => dbs.remove(index)} className="ml-2">Delete</Button>

          <Circuits control={control} index={index} />
        </div>
      ))}

      <Button type="button" onClick={() => dbs.append({
        dbDesignation: '',
        dbLocation: '',
        dbZdb: '',
        dbIpf: '',
        dbConfirmationOfSupplyPolarity: true,
        dbPhaseSequenceConfirmed: true,
        dbSPDType: '',
        dbSPDStatusIndicator: true,
        dbSupplyFrom: '',
        dbOCPDBSnumber: '',
        dbOCPDType: '',
        dbOCPDNominalVoltage: '',
        dbOCPDRating: '',
        dbOCPDNumberOfPhases: '',
        dbRCDBSNumber: '',
        dbRCDType: '',
        dbRCDOperatingCurrent: '',
        dbRCDNumberOfPoles: '',
        dbRCDOperatingTime: '',
        testedByName: '',
        testedByPosition: '',
        testedBySignature: '',
        testedBySignatureDate: '',
        testInstrumentMultiFunctionSerialNumber: '',
        testInstrumentContinuitySerialNumber: '',
        testInstrumentInsulationResistanceSerialNumber: '',
        testInstrumentEarthFaultLoopImpedanceSerialNumber: '',
        testInstrumentEarthElectrodeSerialNumber: '',
        testInstrumentRCDSerialNumber: '',
        dbCircuits: [{
          circuitNumber: '',
          circuitDescription: '',
          circuitTypeOfWiring: '',
          circuitReferenceMethod: '',
          circuitNumberOfPoints: '',
          circuitConductorLiveCSA: '',
          circuitConductorCPCCSA: '',
          circuitMaxDisconnectionTime: '',
          circuitOCPDBSNumber: '',
          circuitOCPDType: '',
          circuitOCPDRating: '',
          circuitOCPDShortCircuitCapacity: '',
          circuitOCPDMaxPermittedZs: '',
          circuitRCDBSNumber: '',
          circuitRCDType: '',
          circuitRCDRating: '',
          circuitRCDOperatingCurrent: '',
          circuitContinuityr1: '',
          circuitContinuityrn: '',
          circuitContinuityr2: '',
          circuitContinuityR1R2: '',
          circuitContinuityR2: '',
          circuitInsulationResistanceLiveLive: '',
          circuitInsulationResistanceLiveEarth: '',
          circuitInsulationResistanceTestVoltage: '',
          circuitPolarity: true,
          circuitMaximumZs: '',
          circuitRCDOperatingTime: '',
          circuitRCDOTestButton: true,
          circuitAFDDOTestButton: true,
          circuitComments: '',
          circuitsEquipmentVunerableToDamage: '',
        }]
      })}>
        Add
      </Button>
    </>
  )
}
