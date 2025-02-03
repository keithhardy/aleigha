'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'

import { DefaultValues } from './default-values'
import { Schema, schema } from './schema'

export function ElectricalInstallationConditionReport() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: DefaultValues,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data: Schema) => console.log(data))}>
        <FormField control={form.control} name="contractorTradingName" render={({ field }) => (
          <FormItem>
            <FormLabel>Trading Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="contractorAddress" render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="contractorPhone" render={({ field }) => (
          <FormItem>
            <FormLabel>Telephone</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="contractorEmail" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="contractorGoverningBody" render={({ field }) => (
          <FormItem>
            <FormLabel>Governing Body</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="contractorGoverningBodyNumber" render={({ field }) => (
          <FormItem>
            <FormLabel>Governing Body Number</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="clientReferenceNumber" render={({ field }) => (
          <FormItem>
            <FormLabel>Client Reference Number</FormLabel>
            <FormControl>
              <Input placeholder="REF123456" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="clientTradingName" render={({ field }) => (
          <FormItem>
            <FormLabel>Trading Name</FormLabel>
            <FormControl>
              <Input placeholder="ABC Corp" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="clientAddress" render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input placeholder="456 Business Rd, London" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="clientPostcode" render={({ field }) => (
          <FormItem>
            <FormLabel>Postcode</FormLabel>
            <FormControl>
              <Input placeholder="EC1A 1BB" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="clientTelephone" render={({ field }) => (
          <FormItem>
            <FormLabel>Telephone</FormLabel>
            <FormControl>
              <Input placeholder="+44 9876 543210" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="propertyReferenceNumber" render={({ field }) => (
          <FormItem>
            <FormLabel>Property Reference Number</FormLabel>
            <FormControl>
              <Input placeholder="PR123456789" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="propertyOccupier" render={({ field }) => (
          <FormItem>
            <FormLabel>Occupier</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="propertyAddress" render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input placeholder="789 Elm St, Hometown" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="propertyPostcode" render={({ field }) => (
          <FormItem>
            <FormLabel>Postcode</FormLabel>
            <FormControl>
              <Input placeholder="HT1 4AB" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="propertyTelephone" render={({ field }) => (
          <FormItem>
            <FormLabel>Telephone</FormLabel>
            <FormControl>
              <Input placeholder="+44 1234 567890" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="purpose" render={({ field }) => (
          <FormItem>
            <FormLabel>Purpose for which this report is required</FormLabel>
            <FormControl>
              <Textarea className="min-h-[100px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="startDate" render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Inspection</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="endDate" render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Inspection</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="recordsAvailable" render={({ field }) => (
          <FormItem>
            <div>
              <FormLabel>Records Available</FormLabel>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="previousReportAvailable" render={({ field }) => (
          <FormItem>
            <div>
              <FormLabel>Previous Report Available</FormLabel>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="previousReportDate" render={({ field }) => (
          <FormItem>
            <FormLabel>Previous Report Date</FormLabel>
            <FormControl>
              <Input type="date" placeholder="Previous report date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="descriptionOfPremises" render={({ field }) => (
          <FormItem>
            <FormLabel>Description of Premises</FormLabel>
            <FormControl>
              <Input placeholder="Dwelling" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="estimatedAgeOfElectricalInstallation" render={({ field }) => (
          <FormItem>
            <FormLabel>Estimated Age of Installation</FormLabel>
            <FormControl>
              <Input placeholder="10 Years" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="evidenceOfAlterations" render={({ field }) => (
          <FormItem>
            <div>
              <FormLabel>Evidence of Alterations</FormLabel>
            </div>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="estimatedAgeOfAlterations" render={({ field }) => (
          <FormItem>
            <FormLabel>Estimated Age of Alterations</FormLabel>
            <FormControl>
              <Input placeholder="2 Years" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="generalConditionOfTheInstallation" render={({ field }) => (
          <FormItem>
            <FormLabel>General Condition</FormLabel>
            <FormControl>
              <Textarea className="min-h-[160px]" placeholder="General condition of the installation (in terms of electrical safety)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="overallAssessmentOfTheInstallation" render={({ field }) => (
          <FormItem>
            <FormLabel>Overall Assessment</FormLabel>
            <FormControl>
              <Input placeholder="Satisfactory" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="regulationAccordance" render={({ field }) => (
          <FormItem>
            <FormLabel>Regulation Accordance</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="electricalInstalationCoveredByThisReport" render={({ field }) => (
          <FormItem>
            <FormLabel>Electrical Installation Covered</FormLabel>
            <FormControl>
              <Textarea {...field} className="min-h-[100px]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="agreedLimitations" render={({ field }) => (
          <FormItem>
            <FormLabel>Agreed Limitations</FormLabel>
            <FormControl>
              <Textarea {...field} className="min-h-[100px]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="agreedLimitationsWith" render={({ field }) => (
          <FormItem>
            <FormLabel>Agreed With</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="operationalLimitations" render={({ field }) => (
          <FormItem>
            <FormLabel>Operational Limitations</FormLabel>
            <FormControl>
              <Textarea {...field} className="min-h-[100px]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="retestDate" render={({ field }) => (
          <FormItem>
            <FormLabel>Retest Date</FormLabel>
            <FormControl>
              <Input type="date" placeholder="Retest date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="reasonForRecommendation" render={({ field }) => (
          <FormItem>
            <FormLabel>Reason for Recommendation</FormLabel>
            <FormControl>
              <Textarea className="min-h-[100px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="inspectorsName" render={({ field }) => (
          <FormItem>
            <FormLabel>Inspector&apos;s Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <SignatureInput name="inspectorsSignature" />
        <FormField control={form.control} name="inspectorsSignatureDate" render={({ field }) => (
          <FormItem>
            <FormLabel>Inspector&apos;s Signature Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="qualifiedSupervisorsName" render={({ field }) => (
          <FormItem>
            <FormLabel>Qualified Supervisor&apos;s Name</FormLabel>
            <FormControl>
              <Input placeholder="Jane Smith" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <SignatureInput name="qualifiedSupervisorsSignature" />
        <FormField control={form.control} name="qualifiedSupervisorsSignatureDate" render={({ field }) => (
          <FormItem>
            <FormLabel>Qualified Supervisor&apos;s Signature Date</FormLabel>
            <FormControl>
              <Input type="date" placeholder="Date of signature" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Add useFieldArray to append observations  */}
        <FormField control={form.control} name="observations" render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input type="hidden" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="systemTypeAndEarthingArrangemets" render={({ field }) => (
          <FormItem>
            <FormLabel>System Type and Earthing Arrangements</FormLabel>
            <FormControl>
              <Input placeholder="TN-C-S" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="supplyProtectiveDeviceBSNumber" render={({ field }) => (
          <FormItem>
            <FormLabel>Supply Protective Device BS Number</FormLabel>
            <FormControl>
              <Input placeholder="BS 1361" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="supplyProtectiveDeviceType" render={({ field }) => (
          <FormItem>
            <FormLabel>Supply Protective Device Type</FormLabel>
            <FormControl>
              <Input placeholder="IIb" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="supplyProtectiveDeviceRatedCurrent" render={({ field }) => (
          <FormItem>
            <FormLabel>Rated Current of Supply Protective Device</FormLabel>
            <FormControl>
              <Input placeholder="80 A" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="numberAndTypeOfLiveConductors" render={({ field }) => (
          <FormItem>
            <FormLabel>Number and Type of Live Conductors</FormLabel>
            <FormControl>
              <Input placeholder="2 Wire Single Phase AC" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="confirmationOfSupplyPolarity" render={({ field }) => (
          <FormItem>
            <div>
              <FormLabel>Confirmation of Supply Polarity</FormLabel>
            </div>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="otherSourcesOfSupply" render={({ field }) => (
          <FormItem>
            <FormLabel>Other Sources of Supply</FormLabel>
            <FormControl>
              <Input placeholder="Photovoltaic System" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="nominalVoltageBetweenLines" render={({ field }) => (
          <FormItem>
            <FormLabel>Nominal Voltage Between Lines (U)</FormLabel>
            <FormControl>
              <Input placeholder="N/A" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="nominalLineVoltageToEarth" render={({ field }) => (
          <FormItem>
            <FormLabel>Nominal Line Voltage to Earth (U0)</FormLabel>
            <FormControl>
              <Input placeholder="230 V" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="nominalFrequency" render={({ field }) => (
          <FormItem>
            <FormLabel>Nominal Frequency (f)</FormLabel>
            <FormControl>
              <Input placeholder="50 Hz" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="prospectiveFaultCurrent" render={({ field }) => (
          <FormItem>
            <FormLabel>Prospective Fault Current (Ipf)</FormLabel>
            <FormControl>
              <Input placeholder="2.0 KA" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="externalEarthFaultLoopImpedance" render={({ field }) => (
          <FormItem>
            <FormLabel>External Earth Fault Loop Impedance (Ze)</FormLabel>
            <FormControl>
              <Input placeholder="0.35 Ω" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="maximumDemand" render={({ field }) => (
          <FormItem>
            <FormLabel>Maximum Demand</FormLabel>
            <FormControl>
              <Input placeholder="100 A" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="distributorsFacility" render={({ field }) => (
          <FormItem>
            <div>
              <FormLabel>Distributor&apos;s Facility</FormLabel>
            </div>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="installationEarthElectrodes" render={({ field }) => (
          <FormItem>
            <div>
              <FormLabel>Installation Earth Electrode(s)</FormLabel>
            </div>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="earthElectrodeType" render={({ field }) => (
          <FormItem>
            <FormLabel>Earth Electrode Type</FormLabel>
            <FormControl>
              <Input placeholder="Rod" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="earthElectrodeLocation" render={({ field }) => (
          <FormItem>
            <FormLabel>Earth Electrode Location</FormLabel>
            <FormControl>
              <Input placeholder="Front Garden" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="electrodeResistanceToEarth" render={({ field }) => (
          <FormItem>
            <FormLabel>Electrode Resistance to Earth</FormLabel>
            <FormControl>
              <Input placeholder="10.0 Ω" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="earthingConductorMaterial" render={({ field }) => (
          <FormItem>
            <FormLabel>Earthing Conductor Material</FormLabel>
            <FormControl>
              <Input placeholder="Copper" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="earthingConductorCSA" render={({ field }) => (
          <FormItem>
            <FormLabel>Earthing Conductor CSA</FormLabel>
            <FormControl>
              <Input placeholder="16 mm²" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="earthingConductorVerified" render={({ field }) => (
          <FormItem>
            <div>
              <FormLabel>Earthing Conductor Verified</FormLabel>
            </div>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mainProtectiveBondingConductorMaterial" render={({ field }) => (
          <FormItem>
            <FormLabel>Main Protective Bonding Conductor Material</FormLabel>
            <FormControl>
              <Input placeholder="Copper" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mainProtectiveBondingConductorCSA" render={({ field }) => (
          <FormItem>
            <FormLabel>Main Protective Bonding Conductor CSA</FormLabel>
            <FormControl>
              <Input placeholder="10 mm²" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mainProtectiveBondingConductorVerified" render={({ field }) => (
          <FormItem>
            <div>
              <FormLabel>Main Protective Bonding Conductor Verified</FormLabel>
            </div>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="waterInstallationPipes" render={({ field }) => (
          <FormItem>
            <FormLabel>Water Installation Pipes</FormLabel>
            <FormControl>
              <Input placeholder="0.02 Ω" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="gasInstallationPipes" render={({ field }) => (
          <FormItem>
            <FormLabel>Gas Installation Pipes</FormLabel>
            <FormControl>
              <Input placeholder="0.01 Ω" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="structuralSteel" render={({ field }) => (
          <FormItem>
            <FormLabel>Structural Steel</FormLabel>
            <FormControl>
              <Input placeholder="N/A" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="oilInstallationPipes" render={({ field }) => (
          <FormItem>
            <FormLabel>Oil Installation Pipes</FormLabel>
            <FormControl>
              <Input placeholder="N/A" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="lightningProtection" render={({ field }) => (
          <FormItem>
            <FormLabel>Lightning Protection</FormLabel>
            <FormControl>
              <Input placeholder="N/A" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="other" render={({ field }) => (
          <FormItem>
            <FormLabel>Other</FormLabel>
            <FormControl>
              <Input placeholder="N/A" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mainSwitchImage" render={({ field }) => (
          <FormItem>
            <FormLabel>Main Switch Photo</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mainSwitchLocation" render={({ field }) => (
          <FormItem>
            <FormLabel>Main Switch Location</FormLabel>
            <FormControl>
              <Input placeholder="Electric Cupboard" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mainSwitchBSNumber" render={({ field }) => (
          <FormItem>
            <FormLabel>Main Switch BS Number</FormLabel>
            <FormControl>
              <Input placeholder="BS 60898" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mainSwitchType" render={({ field }) => (
          <FormItem>
            <FormLabel>Main Switch Type</FormLabel>
            <FormControl>
              <Input placeholder="B" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mainSwitchRating" render={({ field }) => (
          <FormItem>
            <FormLabel>Main Switch Rating / Setting</FormLabel>
            <FormControl>
              <Input placeholder="100 A" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mainSwitchPoles" render={({ field }) => (
          <FormItem>
            <FormLabel>Main Switch Number of Poles</FormLabel>
            <FormControl>
              <Input placeholder="2" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mainSwitchCurrentRating" render={({ field }) => (
          <FormItem>
            <FormLabel>Main Switch Current Rating</FormLabel>
            <FormControl>
              <Input placeholder="100 A" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mainSwitchVoltageRating" render={({ field }) => (
          <FormItem>
            <FormLabel>Main Switch Voltage Rating</FormLabel>
            <FormControl>
              <Input placeholder="230 V" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mainSwitchRCDOperatingCurrent" render={({ field }) => (
          <FormItem>
            <FormLabel>Main Switch RCD Operating Current</FormLabel>
            <FormControl>
              <Input placeholder="30 mA" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mainSwitchRCDType" render={({ field }) => (
          <FormItem>
            <FormLabel>Main Switch RCD Type</FormLabel>
            <FormControl>
              <Input placeholder="A" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mainSwitchRCDRatedTimeDelay" render={({ field }) => (
          <FormItem>
            <FormLabel>Main Switch RCD Rated Time Delay</FormLabel>
            <FormControl>
              <Input placeholder="120 mS" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="mainSwitchRCDMeasuredOperatingTime" render={({ field }) => (
          <FormItem>
            <FormLabel>Main Switch RCD Measured Operating Time</FormLabel>
            <FormControl>
              <Input placeholder="92 mS" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {inspectionItems.map((item) => (
          <FormField
            key={item.id}
            control={form.control}
            // @ts-expect-error Field value is an enum, Input expects string
            name={item.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.item + ' - ' + item.label}</FormLabel>
                <FormControl>
                  <RadioGroupComponent onChange={field.onChange} defaultValue={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Add useFieldArray to append DB and Circuits  */}
        <FormField control={form.control} name="db" render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input type="hidden" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

      </form>
    </Form>
  )
}
