'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'

import { DefaultValues } from './default-values'
import { Schema, schema } from './schema'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { SignatureInput } from './components/signature-input'
import { inspectionItems } from './components/inspection-items'
import { RadioGroupComponent } from './components/radio-group'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { observations } from './components/observations'

export function ElectricalInstallationConditionReport() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: DefaultValues,
  })

  const { fields: observationsFields, append: appendObservation, remove: removeObservation } = useFieldArray({ control: form.control, name: 'observations' })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data: Schema) => console.log(data))} className='space-y-4'>        <Card>
        <CardHeader>
          <CardTitle>Contractor</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
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
        </CardContent>
      </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <FormField control={form.control} name="clientReferenceNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>Client Reference Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="clientTradingName" render={({ field }) => (
              <FormItem>
                <FormLabel>Trading Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="clientAddress" render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="clientPostcode" render={({ field }) => (
              <FormItem>
                <FormLabel>Postcode</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="clientTelephone" render={({ field }) => (
              <FormItem>
                <FormLabel>Telephone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <FormField control={form.control} name="propertyReferenceNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>Property Reference Number</FormLabel>
                <FormControl>
                  <Input  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="propertyOccupier" render={({ field }) => (
              <FormItem>
                <FormLabel>Occupier</FormLabel>
                <FormControl>
                  <Input  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="propertyAddress" render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="propertyPostcode" render={({ field }) => (
              <FormItem>
                <FormLabel>Postcode</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="propertyTelephone" render={({ field }) => (
              <FormItem>
                <FormLabel>Telephone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Purpose</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
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
                <FormLabel>Start Date of Inspection</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                    onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="endDate" render={({ field }) => (
              <FormItem>
                <FormLabel>End Date of Inspection</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                    onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                  />
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
                  <Input
                    type="date"
                    value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                    onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Details of the Installation</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <FormField control={form.control} name="descriptionOfPremises" render={({ field }) => (
              <FormItem>
                <FormLabel>Description of Premises</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="estimatedAgeOfElectricalInstallation" render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Age of Installation</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary of the Condition of the Installation</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <FormField control={form.control} name="generalConditionOfTheInstallation" render={({ field }) => (
              <FormItem>
                <FormLabel>General Condition</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[160px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="overallAssessmentOfTheInstallation" render={({ field }) => (
              <FormItem>
                <FormLabel>Overall Assessment</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Extent and Limitations</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
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
                  <Input {...field} />
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overall Assessment and Declaration</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <FormField control={form.control} name="retestDate" render={({ field }) => (
              <FormItem>
                <FormLabel>Retest Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                    onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                  />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <SignatureInput name="inspectorsSignature" />
            <FormField control={form.control} name="inspectorsSignatureDate" render={({ field }) => (
              <FormItem>
                <FormLabel>Inspector&apos;s Signature Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                    onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="qualifiedSupervisorsName" render={({ field }) => (
              <FormItem>
                <FormLabel>Qualified Supervisor&apos;s Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <SignatureInput name="qualifiedSupervisorsSignature" />
            <FormField control={form.control} name="qualifiedSupervisorsSignatureDate" render={({ field }) => (
              <FormItem>
                <FormLabel>Qualified Supervisor&apos;s Signature Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                    onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supply Characteristics</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <FormField control={form.control} name="systemTypeAndEarthingArrangemets" render={({ field }) => (
              <FormItem>
                <FormLabel>System Type and Earthing Arrangements</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="supplyProtectiveDeviceBSNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>Supply Protective Device BS Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="supplyProtectiveDeviceType" render={({ field }) => (
              <FormItem>
                <FormLabel>Supply Protective Device Type</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="supplyProtectiveDeviceRatedCurrent" render={({ field }) => (
              <FormItem>
                <FormLabel>Rated Current of Supply Protective Device</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="numberAndTypeOfLiveConductors" render={({ field }) => (
              <FormItem>
                <FormLabel>Number and Type of Live Conductors</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="nominalVoltageBetweenLines" render={({ field }) => (
              <FormItem>
                <FormLabel>Nominal Voltage Between Lines (U)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="nominalLineVoltageToEarth" render={({ field }) => (
              <FormItem>
                <FormLabel>Nominal Line Voltage to Earth (U0)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="nominalFrequency" render={({ field }) => (
              <FormItem>
                <FormLabel>Nominal Frequency (f)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="prospectiveFaultCurrent" render={({ field }) => (
              <FormItem>
                <FormLabel>Prospective Fault Current (Ipf)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="externalEarthFaultLoopImpedance" render={({ field }) => (
              <FormItem>
                <FormLabel>External Earth Fault Loop Impedance (Ze)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Particulars of Instalation at the Origin</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <FormField control={form.control} name="maximumDemand" render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Demand</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="earthElectrodeLocation" render={({ field }) => (
              <FormItem>
                <FormLabel>Earth Electrode Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="electrodeResistanceToEarth" render={({ field }) => (
              <FormItem>
                <FormLabel>Electrode Resistance to Earth</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="earthingConductorMaterial" render={({ field }) => (
              <FormItem>
                <FormLabel>Earthing Conductor Material</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="earthingConductorCSA" render={({ field }) => (
              <FormItem>
                <FormLabel>Earthing Conductor CSA</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mainProtectiveBondingConductorCSA" render={({ field }) => (
              <FormItem>
                <FormLabel>Main Protective Bonding Conductor CSA</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="gasInstallationPipes" render={({ field }) => (
              <FormItem>
                <FormLabel>Gas Installation Pipes</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="structuralSteel" render={({ field }) => (
              <FormItem>
                <FormLabel>Structural Steel</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="oilInstallationPipes" render={({ field }) => (
              <FormItem>
                <FormLabel>Oil Installation Pipes</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="lightningProtection" render={({ field }) => (
              <FormItem>
                <FormLabel>Lightning Protection</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="other" render={({ field }) => (
              <FormItem>
                <FormLabel>Other</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mainSwitchImage" render={({ field }) => (
              <FormItem>
                <FormLabel>Main Switch Photo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mainSwitchLocation" render={({ field }) => (
              <FormItem>
                <FormLabel>Main Switch Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mainSwitchBSNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>Main Switch BS Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mainSwitchType" render={({ field }) => (
              <FormItem>
                <FormLabel>Main Switch Type</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mainSwitchRating" render={({ field }) => (
              <FormItem>
                <FormLabel>Main Switch Rating / Setting</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mainSwitchPoles" render={({ field }) => (
              <FormItem>
                <FormLabel>Main Switch Number of Poles</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mainSwitchCurrentRating" render={({ field }) => (
              <FormItem>
                <FormLabel>Main Switch Current Rating</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mainSwitchVoltageRating" render={({ field }) => (
              <FormItem>
                <FormLabel>Main Switch Voltage Rating</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mainSwitchRCDOperatingCurrent" render={({ field }) => (
              <FormItem>
                <FormLabel>Main Switch RCD Operating Current</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mainSwitchRCDType" render={({ field }) => (
              <FormItem>
                <FormLabel>Main Switch RCD Type</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mainSwitchRCDRatedTimeDelay" render={({ field }) => (
              <FormItem>
                <FormLabel>Main Switch RCD Rated Time Delay</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="mainSwitchRCDMeasuredOperatingTime" render={({ field }) => (
              <FormItem>
                <FormLabel>Main Switch RCD Measured Operating Time</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Observations</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className="grid grid-cols-9 gap-2">
              <FormLabel>Item Number</FormLabel>
              <FormLabel className="col-span-4">Details</FormLabel>
              <FormLabel>Code</FormLabel>
              <FormLabel className="col-span-2">Location</FormLabel>
            </div>

            {observationsFields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-9 items-end gap-2">
                <FormField control={form.control} name={`observations.${index}.observationItemNumber`} render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`observations.${index}.observationDetails`} render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`observations.${index}.observationCode`} render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`observations.${index}.observationLocation`} render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="button" onClick={() => removeObservation(index)} className="ml-2">Delete</Button>
              </div>
            ))}

            <Button type="button" onClick={() => appendObservation({
              observationItemNumber: '',
              observationDetails: '',
              observationCode: '',
              observationLocation: '',
            })}>
              Add
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule of Inspections</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            {inspectionItems.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={item.id as keyof z.infer<typeof schema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.item + ' - ' + item.label}</FormLabel>
                    <FormControl>
                      <RadioGroupComponent onChange={field.onChange} defaultValue={field.value as string} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribution Boards</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            {/* Add useFieldArray to append DB and Circuits  */}
            <FormField control={form.control} name="db" render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* <Input type="hidden" {...field} /> */}
                  <p>TODO: DB and Circuits</p>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
