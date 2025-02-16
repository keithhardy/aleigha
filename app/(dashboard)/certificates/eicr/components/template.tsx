import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import React from 'react';

import { Schema } from '../schema';

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
  },
});

export default function EICRDocument({ data }: { data: Schema }) {
  return (
    <Document>
      <Page orientation='landscape' style={styles.page}>
        <View style={{ height: '100%', display: 'flex' }}>
          <View>
            <Text>Electrical Installation Condition Report</Text>
          </View>

          <View>
            <View>
              <View>
                <Text>Contractor Details</Text>
                <Text>Trading Name: {data.contractorTradingName}</Text>
                <Text>Address: {data.contractorAddress}</Text>
                <Text>Phone: {data.contractorPhone}</Text>
                <Text>Email: {data.contractorEmail}</Text>
                <Text>Governing Body: {data.contractorGoverningBody}</Text>
                <Text>Governing Body Number: {data.contractorGoverningBodyNumber}</Text>
              </View>

              <View>
                <Text>Client Details</Text>
                <Text>Reference Number: {data.clientReferenceNumber}</Text>
                <Text>Trading Name: {data.clientTradingName}</Text>
                <Text>Address: {data.clientAddress}</Text>
                <Text>Postcode: {data.clientPostcode}</Text>
                <Text>Telephone: {data.clientTelephone}</Text>
              </View>

              <View>
                <Text>Property Details</Text>
                <Text>Reference Number: {data.propertyReferenceNumber}</Text>
                <Text>Occupier: {data.propertyOccupier}</Text>
                <Text>Address: {data.propertyAddress}</Text>
                <Text>Postcode: {data.propertyPostcode}</Text>
                <Text>Telephone: {data.propertyTelephone}</Text>
              </View>
            </View>

            <View>
              <View>
                <Text>Purpose</Text>
                <Text>purpose: {data.purpose}</Text>
                <Text>Start Date: {data.startDate.toDateString()}</Text>
                <Text>End Date: {data.endDate.toDateString()}</Text>
                <Text>Records Available: {data.recordsAvailable}</Text>
                <Text>Previous Report Available: {data.previousReportAvailable}</Text>
                <Text>Previous Report Date: {data.previousReportDate.toDateString()}</Text>
              </View>

              <View>
                <Text>Details of the Installation</Text>
                <Text>Description Of Premises: {data.descriptionOfPremises}</Text>
                <Text>Estimated Age Of Electrical Installation: {data.estimatedAgeOfElectricalInstallation}</Text>
                <Text>Evidence Of Alterations: {data.evidenceOfAlterations}</Text>
                <Text>Estimated Age Of Alterations: {data.estimatedAgeOfAlterations}</Text>
              </View>

              <View>
                <Text>Summary of the Condition of the Installation</Text>
                <Text>General Condition Of The Installation: {data.generalConditionOfTheInstallation}</Text>
                <Text>Overall Assessment Of The Installation: {data.overallAssessmentOfTheInstallation}</Text>
              </View>

              <View>
                <Text>Extent and Limitations</Text>
                <Text>Regulation Accordance: {data.regulationAccordance}</Text>
                <Text>Electrical Instalation Covered By This Report: {data.electricalInstalationCoveredByThisReport}</Text>
                <Text>Agreed Limitations: {data.agreedLimitations}</Text>
                <Text>Agreed Limitations With: {data.agreedLimitationsWith}</Text>
                <Text>Operational Limitations: {data.operationalLimitations}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>

      <Page orientation='landscape' style={styles.page}>
        <View>
          <Text>Overall Assessment and Declaration</Text>
          <Text>Inspectors Name: {data.inspectorsName}</Text>
          <Text>Inspectors Signature: {data.inspectorsSignature}</Text>
          <Text>Inspectors Signature Date: {data.inspectorsSignatureDate.toDateString()}</Text>
          <Text>Retest Date: {data.retestDate.toDateString()}</Text>
          <Text>Reason For Recommendation: {data.reasonForRecommendation}</Text>
          <Text>Qualified Supervisors Name: {data.qualifiedSupervisorsName}</Text>
          <Text>Qualified Supervisors Signature: {data.qualifiedSupervisorsSignature}</Text>
          <Text>Qualified Supervisors SignatureDate: {data.qualifiedSupervisorsSignatureDate.toDateString()}</Text>
        </View>
      </Page>

      <Page orientation='landscape' style={styles.page}>
        <View>
          <Text>Supply Characteristics</Text>
          <Text>System Type And Earthing Arrangemets: {data.systemTypeAndEarthingArrangemets}</Text>
          <Text>Supply Protective Device BS Number: {data.supplyProtectiveDeviceBSNumber}</Text>
          <Text>Supply Protective Device Type: {data.supplyProtectiveDeviceType}</Text>
          <Text>Supply Protective Device Rated Current: {data.supplyProtectiveDeviceRatedCurrent}</Text>
          <Text>Number And Type Of Live Conductors: {data.numberAndTypeOfLiveConductors}</Text>
          <Text>Confirmation Of Supply Polarity: {data.confirmationOfSupplyPolarity}</Text>
          <Text>Other Sources Of Supply: {data.otherSourcesOfSupply}</Text>
          <Text>Nominal Voltage Between Lines: {data.nominalVoltageBetweenLines}</Text>
          <Text>Nominal Line Voltage To Earth: {data.nominalLineVoltageToEarth}</Text>
          <Text>Nominal Frequency: {data.nominalFrequency}</Text>
          <Text>Prospective Fault Current: {data.prospectiveFaultCurrent}</Text>
          <Text>External Earth Fault Loop Impedance: {data.externalEarthFaultLoopImpedance}</Text>
        </View>

        <View>
          <Text>Particulars of Instalation at the Origin</Text>
          <Text>Maximum Demand: {data.maximumDemand}</Text>
          <Text>Distributors Facility: {data.distributorsFacility}</Text>
          <Text>Installation Earth Electrodes: {data.installationEarthElectrodes}</Text>
          <Text>Earth Electrode Type: {data.earthElectrodeType}</Text>
          <Text>Earth Electrode Location: {data.earthElectrodeLocation}</Text>
          <Text>Electrode Resistance To Earth: {data.electrodeResistanceToEarth}</Text>
          <Text>Earthing Conductor Material: {data.earthingConductorMaterial}</Text>
          <Text>Earthing Conductor CSA: {data.earthingConductorCSA}</Text>
          <Text>Earthing Conductor Verified: {data.earthingConductorVerified}</Text>
          <Text>Main Protective Bonding Conductor Material: {data.mainProtectiveBondingConductorMaterial}</Text>
          <Text>Main Protective Bonding Conductor CSA: {data.mainProtectiveBondingConductorCSA}</Text>
          <Text>Main Protective Bonding Conductor Verified: {data.mainProtectiveBondingConductorVerified}</Text>
          <Text>Water Installation Pipes: {data.waterInstallationPipes}</Text>
          <Text>Gas Installation Pipes: {data.gasInstallationPipes}</Text>
          <Text>Structural Steel: {data.structuralSteel}</Text>
          <Text>Oil Installation Pipes: {data.oilInstallationPipes}</Text>
          <Text>Lightning Protection: {data.lightningProtection}</Text>
          <Text>Other: {data.other}</Text>
          <Text>Main Switch Image: {data.mainSwitchImage}</Text>
          <Text>Main Switch Location: {data.mainSwitchLocation}</Text>
          <Text>Main Switch BS Number: {data.mainSwitchBSNumber}</Text>
          <Text>Main Switch Type: {data.mainSwitchType}</Text>
          <Text>Main Switch Rating: {data.mainSwitchRating}</Text>
          <Text>Main Switch Poles: {data.mainSwitchPoles}</Text>
          <Text>Main Switch CurrentRating: {data.mainSwitchCurrentRating}</Text>
          <Text>Main Switch VoltageRating: {data.mainSwitchVoltageRating}</Text>
          <Text>Main Switch RCDOperatingCurrent: {data.mainSwitchRCDOperatingCurrent}</Text>
          <Text>Main Switch RCDType: {data.mainSwitchRCDType}</Text>
          <Text>Main Switch RCDRatedTimeDelay: {data.mainSwitchRCDRatedTimeDelay}</Text>
          <Text>Main Switch RCDMeasuredOperatingTime: {data.mainSwitchRCDMeasuredOperatingTime}</Text>
        </View>
      </Page>

      <Page orientation='landscape' style={styles.page}>
        <View>
          <Text>Observations</Text>
          {
            data.observations.map((observation, index) => (
              <div key={index}>
                <Text>Observation Code: {observation.observationCode}</Text>
                <Text>Observation Details: {observation.observationDetails}</Text>
                <Text>Observation Item Number: {observation.observationItemNumber}</Text>
                <Text>Observation Location: {observation.observationLocation}</Text>
                <Text></Text>
              </div>
            ))
          }
        </View>
      </Page>

      <Page orientation='landscape' style={styles.page}>
        <View>
          <Text>Section 1</Text>
          <Text>item_1_1A: {data.item_1_1A}</Text>
          <Text>item_1_1B: {data.item_1_1B}</Text>
          <Text>item_1_1C: {data.item_1_1C}</Text>
          <Text>item_1_1D: {data.item_1_1D}</Text>
          <Text>item_1_1E: {data.item_1_1E}</Text>
          <Text>item_1_1F: {data.item_1_1F}</Text>
          <Text>item_1_2: {data.item_1_2}</Text>
          <Text>item_1_3: {data.item_1_3}</Text>
        </View>

        <View>
          <Text>Section 2</Text>
          <Text>item_2_1: {data.item_2_1}</Text>
          <Text>item_2_2: {data.item_2_2}</Text>
        </View>

        <View>
          <Text>Section 3</Text>
          <Text>item_3_1A: {data.item_3_1A}</Text>
          <Text>item_3_1B: {data.item_3_1B}</Text>
          <Text>item_3_1C: {data.item_3_1C}</Text>
          <Text>item_3_1D: {data.item_3_1D}</Text>
          <Text>item_3_1E: {data.item_3_1E}</Text>
          <Text>item_3_1F: {data.item_3_1F}</Text>
          <Text>item_3_1G: {data.item_3_1G}</Text>
          <Text>item_3_1H: {data.item_3_1H}</Text>
          <Text>item_3_1I: {data.item_3_1I}</Text>
          <Text>item_3_2: {data.item_3_2}</Text>
          <Text>item_3_3A: {data.item_3_3A}</Text>
          <Text>item_3_3B: {data.item_3_3B}</Text>
          <Text>item_3_3C: {data.item_3_3C}</Text>
          <Text>item_3_3D: {data.item_3_3D}</Text>
          <Text>item_3_3E: {data.item_3_3E}</Text>
          <Text>item_3_3F: {data.item_3_3F}</Text>
        </View>

        <View>
          <Text>Section 4</Text>
          <Text>item_4_1: {data.item_4_1}</Text>
          <Text>item_4_2: {data.item_4_2}</Text>
          <Text>item_4_3: {data.item_4_3}</Text>
          <Text>item_4_4: {data.item_4_4}</Text>
          <Text>item_4_5: {data.item_4_5}</Text>
          <Text>item_4_6: {data.item_4_6}</Text>
          <Text>item_4_7: {data.item_4_7}</Text>
          <Text>item_4_8: {data.item_4_8}</Text>
          <Text>item_4_9: {data.item_4_9}</Text>
          <Text>item_4_10: {data.item_4_10}</Text>
          <Text>item_4_11: {data.item_4_11}</Text>
          <Text>item_4_12: {data.item_4_12}</Text>
          <Text>item_4_13: {data.item_4_13}</Text>
          <Text>item_4_14: {data.item_4_14}</Text>
          <Text>item_4_15: {data.item_4_15}</Text>
          <Text>item_4_16: {data.item_4_16}</Text>
          <Text>item_4_17: {data.item_4_17}</Text>
          <Text>item_4_18: {data.item_4_18}</Text>
          <Text>item_4_19: {data.item_4_19}</Text>
          <Text>item_4_20: {data.item_4_20}</Text>
          <Text>item_4_21: {data.item_4_21}</Text>
          <Text>item_4_22: {data.item_4_22}</Text>
          <Text>item_4_23: {data.item_4_23}</Text>
          <Text>item_4_24: {data.item_4_24}</Text>
          <Text>item_4_25: {data.item_4_25}</Text>
        </View>

        <View>
          <Text>Section 5</Text>
          <Text>item_5_1: {data.item_5_1}</Text>
          <Text>item_5_2: {data.item_5_2}</Text>
          <Text>item_5_3: {data.item_5_3}</Text>
          <Text>item_5_4: {data.item_5_4}</Text>
          <Text>item_5_5: {data.item_5_5}</Text>
          <Text>item_5_6: {data.item_5_6}</Text>
          <Text>item_5_7: {data.item_5_7}</Text>
          <Text>item_5_8: {data.item_5_8}</Text>
          <Text>item_5_9: {data.item_5_9}</Text>
          <Text>item_5_10: {data.item_5_10}</Text>
          <Text>item_5_11: {data.item_5_11}</Text>
          <Text>item_5_12: {data.item_5_12}</Text>
          <Text>item_5_13: {data.item_5_13}</Text>
          <Text>item_5_14A: {data.item_5_14A}</Text>
          <Text>item_5_14B: {data.item_5_14B}</Text>
          <Text>item_5_15: {data.item_5_15}</Text>
          <Text>item_5_16: {data.item_5_16}</Text>
          <Text>item_5_17: {data.item_5_17}</Text>
          <Text>item_5_18: {data.item_5_18}</Text>
          <Text>item_5_19: {data.item_5_19}</Text>
          <Text>item_5_20: {data.item_5_20}</Text>
          <Text>item_5_21: {data.item_5_21}</Text>
          <Text>item_5_22: {data.item_5_22}</Text>
          <Text>item_5_23: {data.item_5_23}</Text>
          <Text>item_5_24: {data.item_5_24}</Text>
        </View>

        <View>
          <Text>Section 6</Text>
          <Text>item_6_1: {data.item_6_1}</Text>
          <Text>item_6_2: {data.item_6_2}</Text>
          <Text>item_6_3: {data.item_6_3}</Text>
          <Text>item_6_4: {data.item_6_4}</Text>
          <Text>item_6_5: {data.item_6_5}</Text>
          <Text>item_6_6: {data.item_6_6}</Text>
          <Text>item_6_7: {data.item_6_7}</Text>
          <Text>item_6_8: {data.item_6_8}</Text>
          <Text>item_6_9: {data.item_6_9}</Text>
          <Text>item_6_10: {data.item_6_10}</Text>
          <Text>item_6_11: {data.item_6_11}</Text>
          <Text>item_6_12A: {data.item_6_12A}</Text>
          <Text>item_6_12B: {data.item_6_12B}</Text>
          <Text>item_6_13A: {data.item_6_13A}</Text>
          <Text>item_6_13B: {data.item_6_13B}</Text>
          <Text>item_6_13C: {data.item_6_13C}</Text>
          <Text>item_6_13D: {data.item_6_13D}</Text>
          <Text>item_6_13E: {data.item_6_13E}</Text>
          <Text>item_6_14: {data.item_6_14}</Text>
          <Text>item_6_15: {data.item_6_15}</Text>
          <Text>item_6_16: {data.item_6_16}</Text>
          <Text>item_6_17A: {data.item_6_17A}</Text>
          <Text>item_6_17B: {data.item_6_17B}</Text>
          <Text>item_6_17C: {data.item_6_17C}</Text>
          <Text>item_6_17D: {data.item_6_17D}</Text>
          <Text>item_6_18: {data.item_6_18}</Text>
          <Text>item_6_19: {data.item_6_19}</Text>
          <Text>item_6_20: {data.item_6_20}</Text>
        </View>

        <View>
          <Text>Section 7</Text>
          <Text>item_7_1A: {data.item_7_1A}</Text>
          <Text>item_7_1B: {data.item_7_1B}</Text>
          <Text>item_7_1C: {data.item_7_1C}</Text>
          <Text>item_7_1D: {data.item_7_1D}</Text>
          <Text>item_7_1E: {data.item_7_1E}</Text>
          <Text>item_7_1F: {data.item_7_1F}</Text>
          <Text>item_7_2A: {data.item_7_2A}</Text>
          <Text>item_7_2B: {data.item_7_2B}</Text>
          <Text>item_7_2C: {data.item_7_2C}</Text>
          <Text>item_7_2D: {data.item_7_2D}</Text>
          <Text>item_7_3A: {data.item_7_3A}</Text>
          <Text>item_7_3B: {data.item_7_3B}</Text>
          <Text>item_7_3C: {data.item_7_3C}</Text>
          <Text>item_7_3D: {data.item_7_3D}</Text>
          <Text>item_7_4A: {data.item_7_4A}</Text>
          <Text>item_7_4B: {data.item_7_4B}</Text>
        </View>

        <View>
          <Text>Section 8</Text>
          <Text>item_8_1: {data.item_8_1}</Text>
          <Text>item_8_2: {data.item_8_2}</Text>
          <Text>item_8_3: {data.item_8_3}</Text>
          <Text>item_8_4: {data.item_8_4}</Text>
          <Text>item_8_5: {data.item_8_5}</Text>
          <Text>item_8_6: {data.item_8_6}</Text>
          <Text>item_8_7A: {data.item_8_7A}</Text>
          <Text>item_8_7B: {data.item_8_7B}</Text>
          <Text>item_8_7C: {data.item_8_7C}</Text>
          <Text>item_8_7D: {data.item_8_7D}</Text>
        </View>

        <View>
          <Text>Section 9</Text>
          <Text>item_9_1A: {data.item_9_1A}</Text>
          <Text>item_9_1B: {data.item_9_1B}</Text>
          <Text>item_9_1C: {data.item_9_1C}</Text>
          <Text>item_9_1D: {data.item_9_1D}</Text>
          <Text>item_9_1E: {data.item_9_1E}</Text>
          <Text>item_9_1F: {data.item_9_1F}</Text>
          <Text>item_9_1G: {data.item_9_1G}</Text>
          <Text>item_9_1H: {data.item_9_1H}</Text>
          <Text>item_9_2: {data.item_9_2}</Text>
        </View>

        <View>
          <Text>Section 10</Text>
          <Text>item_10_0: {data.item_10_0}</Text>
        </View>
      </Page>

      {data.dbs.map((db, dbIndex) => (
        <>
          <Page orientation='landscape' style={styles.page}>
            <View>
              <Text>{db.dbDesignation}</Text>

              <View key={dbIndex}>
                <Text>DB Designation: {db.dbDesignation}</Text>
                <Text>DB Location: {db.dbLocation}</Text>
                <Text>DB Zdb: {db.dbZdb}</Text>
                <Text>DB IPF: {db.dbIpf}</Text>
                <Text>dbConfirmationOfSupplyPolarity: {db.dbConfirmationOfSupplyPolarity}</Text>
                <Text>dbPhaseSequenceConfirmed: {db.dbPhaseSequenceConfirmed}</Text>
                <Text>dbSPDType: {db.dbSPDType}</Text>
                <Text>dbSPDStatusIndicator: {db.dbSPDStatusIndicator}</Text>
                <Text>dbSupplyFrom: {db.dbSupplyFrom}</Text>
                <Text>dbOCPDBSnumber: {db.dbOCPDBSnumber}</Text>
                <Text>dbOCPDType: {db.dbOCPDType}</Text>
                <Text>dbOCPDNominalVoltage: {db.dbOCPDNominalVoltage}</Text>
                <Text>dbOCPDRating: {db.dbOCPDRating}</Text>
                <Text>dbOCPDNumberOfPhases: {db.dbOCPDNumberOfPhases}</Text>
                <Text>dbRCDBSNumber: {db.dbRCDBSNumber}</Text>
                <Text>dbRCDType: {db.dbRCDType}</Text>
                <Text>dbRCDOperatingCurrent: {db.dbRCDOperatingCurrent}</Text>
                <Text>dbRCDNumberOfPoles: {db.dbRCDNumberOfPoles}</Text>
                <Text>dbRCDOperatingTime: {db.dbRCDOperatingTime}</Text>
                <Text>testedByName: {db.testedByName}</Text>
                <Text>testedByPosition: {db.testedByPosition}</Text>
                <Text>testedBySignature: {db.testedBySignature}</Text>
                <Text>testedBySignatureDate: {db.testedBySignatureDate}</Text>
                <Text>testInstrumentMultiFunctionSerialNumber: {db.testInstrumentMultiFunctionSerialNumber}</Text>
                <Text>testInstrumentContinuitySerialNumber: {db.testInstrumentContinuitySerialNumber}</Text>
                <Text>testInstrumentInsulationResistanceSerialNumber: {db.testInstrumentInsulationResistanceSerialNumber}</Text>
                <Text>testInstrumentEarthFaultLoopImpedanceSerialNumber: {db.testInstrumentEarthFaultLoopImpedanceSerialNumber}</Text>
                <Text>testInstrumentEarthElectrodeSerialNumber: {db.testInstrumentEarthElectrodeSerialNumber}</Text>
                <Text>testInstrumentRCDSerialNumber: {db.testInstrumentRCDSerialNumber}</Text>
              </View>
            </View>
          </Page>

          <Page orientation='landscape' style={styles.page}>
            <View>
              <Text fixed>{db.dbDesignation} Circuits</Text>

              {db.dbCircuits.map((circuit, circuitIndex) => (
                <View key={circuitIndex}>
                  <Text>circuitNumber: {circuit.circuitNumber}</Text>
                  <Text>circuitDescription: {circuit.circuitDescription}</Text>
                  <Text>circuitTypeOfWiring: {circuit.circuitTypeOfWiring}</Text>
                  <Text>circuitReferenceMethod: {circuit.circuitReferenceMethod}</Text>
                  <Text>circuitNumberOfPoints: {circuit.circuitNumberOfPoints}</Text>
                  <Text>circuitConductorLiveCSA: {circuit.circuitConductorLiveCSA}</Text>
                  <Text>circuitConductorCPCCSA: {circuit.circuitConductorCPCCSA}</Text>
                  <Text>circuitMaxDisconnectionTime: {circuit.circuitMaxDisconnectionTime}</Text>
                  <Text>circuitOCPDBSNumber: {circuit.circuitOCPDBSNumber}</Text>
                  <Text>circuitOCPDType: {circuit.circuitOCPDType}</Text>
                  <Text>circuitOCPDRating: {circuit.circuitOCPDRating}</Text>
                  <Text>circuitOCPDShortCircuitCapacity: {circuit.circuitOCPDShortCircuitCapacity}</Text>
                  <Text>circuitOCPDMaxPermittedZs: {circuit.circuitOCPDMaxPermittedZs}</Text>
                  <Text>circuitRCDBSNumber: {circuit.circuitRCDBSNumber}</Text>
                  <Text>circuitRCDType: {circuit.circuitRCDType}</Text>
                  <Text>circuitRCDRating: {circuit.circuitRCDRating}</Text>
                  <Text>circuitRCDOperatingCurrent: {circuit.circuitRCDOperatingCurrent}</Text>
                  <Text>circuitContinuityr1: {circuit.circuitContinuityr1}</Text>
                  <Text>circuitContinuityrn: {circuit.circuitContinuityrn}</Text>
                  <Text>circuitContinuityr2: {circuit.circuitContinuityr2}</Text>
                  <Text>circuitContinuityR1R2: {circuit.circuitContinuityR1R2}</Text>
                  <Text>circuitContinuityR2: {circuit.circuitContinuityR2}</Text>
                  <Text>circuitInsulationResistanceLiveLive: {circuit.circuitInsulationResistanceLiveLive}</Text>
                  <Text>circuitInsulationResistanceLiveEarth: {circuit.circuitInsulationResistanceLiveEarth}</Text>
                  <Text>circuitInsulationResistanceTestVoltage: {circuit.circuitInsulationResistanceTestVoltage}</Text>
                  <Text>circuitPolarity: {circuit.circuitPolarity}</Text>
                  <Text>circuitMaximumZs: {circuit.circuitMaximumZs}</Text>
                  <Text>circuitRCDOperatingTime: {circuit.circuitRCDOperatingTime}</Text>
                  <Text>circuitRCDOTestButton: {circuit.circuitRCDOTestButton}</Text>
                  <Text>circuitAFDDOTestButton: {circuit.circuitAFDDOTestButton}</Text>
                  <Text>circuitComments: {circuit.circuitComments}</Text>
                  <Text>circuitsEquipmentVunerableToDamage: {circuit.circuitsEquipmentVunerableToDamage}</Text>
                  <Text></Text>
                </View>
              ))}
            </View>
          </Page>
        </>
      ))}
    </Document>
  );
}
