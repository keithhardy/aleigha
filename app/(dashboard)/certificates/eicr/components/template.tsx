import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { Schema } from '../schema';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 5,
    borderBottom: '1px solid black',
    paddingBottom: 2,
  },
  text: {
    marginBottom: 3,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 10,
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  tableCol: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 3,
  },
  tableCell: {
    fontSize: 10,
  },
});

export default function EICRDocument({ data }: { data: Schema }) {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Electrical Installation Condition Report</Text>
          <Text>Date: {new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contractor Details</Text>
          <Text style={styles.text}>Trading Name: {data.contractorTradingName}</Text>
          <Text style={styles.text}>Address: {data.contractorAddress}</Text>
          <Text style={styles.text}>Phone: {data.contractorPhone}</Text>
          <Text style={styles.text}>Email: {data.contractorEmail}</Text>
          <Text style={styles.text}>Governing Body: {data.contractorGoverningBody}</Text>
          <Text style={styles.text}>Governing Body Number: {data.contractorGoverningBodyNumber}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client Details</Text>
          <Text style={styles.text}>Reference Number: {data.clientReferenceNumber}</Text>
          <Text style={styles.text}>Trading Name: {data.clientTradingName}</Text>
          <Text style={styles.text}>Address: {data.clientAddress}</Text>
          <Text style={styles.text}>Postcode: {data.clientPostcode}</Text>
          <Text style={styles.text}>Telephone: {data.clientTelephone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Details</Text>
          <Text style={styles.text}>Reference Number: {data.propertyReferenceNumber}</Text>
          <Text style={styles.text}>Occupier: {data.propertyOccupier}</Text>
          <Text style={styles.text}>Address: {data.propertyAddress}</Text>
          <Text style={styles.text}>Postcode: {data.propertyPostcode}</Text>
          <Text style={styles.text}>Telephone: {data.propertyTelephone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Purpose</Text>
          <Text style={styles.text}>purpose: {data.purpose}</Text>
          <Text style={styles.text}>Start Date: {data.startDate.toDateString()}</Text>
          <Text style={styles.text}>End Date: {data.endDate.toDateString()}</Text>
          <Text style={styles.text}>Records Available: {data.recordsAvailable}</Text>
          <Text style={styles.text}>Previous Report Available: {data.previousReportAvailable}</Text>
          <Text style={styles.text}>Previous Report Date: {data.previousReportDate.toDateString()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details of the Installation</Text>
          <Text style={styles.text}>Description Of Premises: {data.descriptionOfPremises}</Text>
          <Text style={styles.text}>Estimated Age Of Electrical Installation: {data.estimatedAgeOfElectricalInstallation}</Text>
          <Text style={styles.text}>Evidence Of Alterations: {data.evidenceOfAlterations}</Text>
          <Text style={styles.text}>Estimated Age Of Alterations: {data.estimatedAgeOfAlterations}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary of the Condition of the Installation</Text>
          <Text style={styles.text}>General Condition Of The Installation: {data.generalConditionOfTheInstallation}</Text>
          <Text style={styles.text}>Overall Assessment Of The Installation: {data.overallAssessmentOfTheInstallation}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extent and Limitations</Text>
          <Text style={styles.text}>Regulation Accordance: {data.regulationAccordance}</Text>
          <Text style={styles.text}>Electrical Instalation Covered By This Report: {data.electricalInstalationCoveredByThisReport}</Text>
          <Text style={styles.text}>Agreed Limitations: {data.agreedLimitations}</Text>
          <Text style={styles.text}>Agreed Limitations With: {data.agreedLimitationsWith}</Text>
          <Text style={styles.text}>Operational Limitations: {data.operationalLimitations}</Text>
        </View>
      </Page>

      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Assessment and Declaration</Text>
          <Text style={styles.text}>Inspectors Name: {data.inspectorsName}</Text>
          <Text style={styles.text}>Inspectors Signature: {data.inspectorsSignature}</Text>
          <Text style={styles.text}>Inspectors Signature Date: {data.inspectorsSignatureDate.toDateString()}</Text>
          <Text style={styles.text}>Retest Date: {data.retestDate.toDateString()}</Text>
          <Text style={styles.text}>Reason For Recommendation: {data.reasonForRecommendation}</Text>
          <Text style={styles.text}>Qualified Supervisors Name: {data.qualifiedSupervisorsName}</Text>
          <Text style={styles.text}>Qualified Supervisors Signature: {data.qualifiedSupervisorsSignature}</Text>
          <Text style={styles.text}>Qualified Supervisors SignatureDate: {data.qualifiedSupervisorsSignatureDate.toDateString()}</Text>
        </View>
      </Page>

      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Supply Characteristics</Text>
          <Text style={styles.text}>System Type And Earthing Arrangemets: {data.systemTypeAndEarthingArrangemets}</Text>
          <Text style={styles.text}>Supply Protective Device BS Number: {data.supplyProtectiveDeviceBSNumber}</Text>
          <Text style={styles.text}>Supply Protective Device Type: {data.supplyProtectiveDeviceType}</Text>
          <Text style={styles.text}>Supply Protective Device Rated Current: {data.supplyProtectiveDeviceRatedCurrent}</Text>
          <Text style={styles.text}>Number And Type Of Live Conductors: {data.numberAndTypeOfLiveConductors}</Text>
          <Text style={styles.text}>Confirmation Of Supply Polarity: {data.confirmationOfSupplyPolarity}</Text>
          <Text style={styles.text}>Other Sources Of Supply: {data.otherSourcesOfSupply}</Text>
          <Text style={styles.text}>Nominal Voltage Between Lines: {data.nominalVoltageBetweenLines}</Text>
          <Text style={styles.text}>Nominal Line Voltage To Earth: {data.nominalLineVoltageToEarth}</Text>
          <Text style={styles.text}>Nominal Frequency: {data.nominalFrequency}</Text>
          <Text style={styles.text}>Prospective Fault Current: {data.prospectiveFaultCurrent}</Text>
          <Text style={styles.text}>External Earth Fault Loop Impedance: {data.externalEarthFaultLoopImpedance}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Particulars of Instalation at the Origin</Text>
          <Text style={styles.text}>Maximum Demand: {data.maximumDemand}</Text>
          <Text style={styles.text}>Distributors Facility: {data.distributorsFacility}</Text>
          <Text style={styles.text}>Installation Earth Electrodes: {data.installationEarthElectrodes}</Text>
          <Text style={styles.text}>Earth Electrode Type: {data.earthElectrodeType}</Text>
          <Text style={styles.text}>Earth Electrode Location: {data.earthElectrodeLocation}</Text>
          <Text style={styles.text}>Electrode Resistance To Earth: {data.electrodeResistanceToEarth}</Text>
          <Text style={styles.text}>Earthing Conductor Material: {data.earthingConductorMaterial}</Text>
          <Text style={styles.text}>Earthing Conductor CSA: {data.earthingConductorCSA}</Text>
          <Text style={styles.text}>Earthing Conductor Verified: {data.earthingConductorVerified}</Text>
          <Text style={styles.text}>Main Protective Bonding Conductor Material: {data.mainProtectiveBondingConductorMaterial}</Text>
          <Text style={styles.text}>Main Protective Bonding Conductor CSA: {data.mainProtectiveBondingConductorCSA}</Text>
          <Text style={styles.text}>Main Protective Bonding Conductor Verified: {data.mainProtectiveBondingConductorVerified}</Text>
          <Text style={styles.text}>Water Installation Pipes: {data.waterInstallationPipes}</Text>
          <Text style={styles.text}>Gas Installation Pipes: {data.gasInstallationPipes}</Text>
          <Text style={styles.text}>Structural Steel: {data.structuralSteel}</Text>
          <Text style={styles.text}>Oil Installation Pipes: {data.oilInstallationPipes}</Text>
          <Text style={styles.text}>Lightning Protection: {data.lightningProtection}</Text>
          <Text style={styles.text}>Other: {data.other}</Text>
          <Text style={styles.text}>Main Switch Image: {data.mainSwitchImage}</Text>
          <Text style={styles.text}>Main Switch Location: {data.mainSwitchLocation}</Text>
          <Text style={styles.text}>Main Switch BS Number: {data.mainSwitchBSNumber}</Text>
          <Text style={styles.text}>Main Switch Type: {data.mainSwitchType}</Text>
          <Text style={styles.text}>Main Switch Rating: {data.mainSwitchRating}</Text>
          <Text style={styles.text}>Main Switch Poles: {data.mainSwitchPoles}</Text>
          <Text style={styles.text}>Main Switch CurrentRating: {data.mainSwitchCurrentRating}</Text>
          <Text style={styles.text}>Main Switch VoltageRating: {data.mainSwitchVoltageRating}</Text>
          <Text style={styles.text}>Main Switch RCDOperatingCurrent: {data.mainSwitchRCDOperatingCurrent}</Text>
          <Text style={styles.text}>Main Switch RCDType: {data.mainSwitchRCDType}</Text>
          <Text style={styles.text}>Main Switch RCDRatedTimeDelay: {data.mainSwitchRCDRatedTimeDelay}</Text>
          <Text style={styles.text}>Main Switch RCDMeasuredOperatingTime: {data.mainSwitchRCDMeasuredOperatingTime}</Text>
        </View>
      </Page>

      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Observations</Text>
          {
            data.observations.map((observation, index) => (
              <div key={index}>
                <Text style={styles.text}>Observation Code: {observation.observationCode}</Text>
                <Text style={styles.text}>Observation Details: {observation.observationDetails}</Text>
                <Text style={styles.text}>Observation Item Number: {observation.observationItemNumber}</Text>
                <Text style={styles.text}>Observation Location: {observation.observationLocation}</Text>
                <Text style={styles.text}></Text>
              </div>
            ))
          }
        </View>
      </Page>

      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 1</Text>
          <Text style={styles.text}>item_1_1A: {data.item_1_1A}</Text>
          <Text style={styles.text}>item_1_1B: {data.item_1_1B}</Text>
          <Text style={styles.text}>item_1_1C: {data.item_1_1C}</Text>
          <Text style={styles.text}>item_1_1D: {data.item_1_1D}</Text>
          <Text style={styles.text}>item_1_1E: {data.item_1_1E}</Text>
          <Text style={styles.text}>item_1_1F: {data.item_1_1F}</Text>
          <Text style={styles.text}>item_1_2: {data.item_1_2}</Text>
          <Text style={styles.text}>item_1_3: {data.item_1_3}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 2</Text>
          <Text style={styles.text}>item_2_1: {data.item_2_1}</Text>
          <Text style={styles.text}>item_2_2: {data.item_2_2}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 3</Text>
          <Text style={styles.text}>item_3_1A: {data.item_3_1A}</Text>
          <Text style={styles.text}>item_3_1B: {data.item_3_1B}</Text>
          <Text style={styles.text}>item_3_1C: {data.item_3_1C}</Text>
          <Text style={styles.text}>item_3_1D: {data.item_3_1D}</Text>
          <Text style={styles.text}>item_3_1E: {data.item_3_1E}</Text>
          <Text style={styles.text}>item_3_1F: {data.item_3_1F}</Text>
          <Text style={styles.text}>item_3_1G: {data.item_3_1G}</Text>
          <Text style={styles.text}>item_3_1H: {data.item_3_1H}</Text>
          <Text style={styles.text}>item_3_1I: {data.item_3_1I}</Text>
          <Text style={styles.text}>item_3_2: {data.item_3_2}</Text>
          <Text style={styles.text}>item_3_3A: {data.item_3_3A}</Text>
          <Text style={styles.text}>item_3_3B: {data.item_3_3B}</Text>
          <Text style={styles.text}>item_3_3C: {data.item_3_3C}</Text>
          <Text style={styles.text}>item_3_3D: {data.item_3_3D}</Text>
          <Text style={styles.text}>item_3_3E: {data.item_3_3E}</Text>
          <Text style={styles.text}>item_3_3F: {data.item_3_3F}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 4</Text>
          <Text style={styles.text}>item_4_1: {data.item_4_1}</Text>
          <Text style={styles.text}>item_4_2: {data.item_4_2}</Text>
          <Text style={styles.text}>item_4_3: {data.item_4_3}</Text>
          <Text style={styles.text}>item_4_4: {data.item_4_4}</Text>
          <Text style={styles.text}>item_4_5: {data.item_4_5}</Text>
          <Text style={styles.text}>item_4_6: {data.item_4_6}</Text>
          <Text style={styles.text}>item_4_7: {data.item_4_7}</Text>
          <Text style={styles.text}>item_4_8: {data.item_4_8}</Text>
          <Text style={styles.text}>item_4_9: {data.item_4_9}</Text>
          <Text style={styles.text}>item_4_10: {data.item_4_10}</Text>
          <Text style={styles.text}>item_4_11: {data.item_4_11}</Text>
          <Text style={styles.text}>item_4_12: {data.item_4_12}</Text>
          <Text style={styles.text}>item_4_13: {data.item_4_13}</Text>
          <Text style={styles.text}>item_4_14: {data.item_4_14}</Text>
          <Text style={styles.text}>item_4_15: {data.item_4_15}</Text>
          <Text style={styles.text}>item_4_16: {data.item_4_16}</Text>
          <Text style={styles.text}>item_4_17: {data.item_4_17}</Text>
          <Text style={styles.text}>item_4_18: {data.item_4_18}</Text>
          <Text style={styles.text}>item_4_19: {data.item_4_19}</Text>
          <Text style={styles.text}>item_4_20: {data.item_4_20}</Text>
          <Text style={styles.text}>item_4_21: {data.item_4_21}</Text>
          <Text style={styles.text}>item_4_22: {data.item_4_22}</Text>
          <Text style={styles.text}>item_4_23: {data.item_4_23}</Text>
          <Text style={styles.text}>item_4_24: {data.item_4_24}</Text>
          <Text style={styles.text}>item_4_25: {data.item_4_25}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 5</Text>
          <Text style={styles.text}>item_5_1: {data.item_5_1}</Text>
          <Text style={styles.text}>item_5_2: {data.item_5_2}</Text>
          <Text style={styles.text}>item_5_3: {data.item_5_3}</Text>
          <Text style={styles.text}>item_5_4: {data.item_5_4}</Text>
          <Text style={styles.text}>item_5_5: {data.item_5_5}</Text>
          <Text style={styles.text}>item_5_6: {data.item_5_6}</Text>
          <Text style={styles.text}>item_5_7: {data.item_5_7}</Text>
          <Text style={styles.text}>item_5_8: {data.item_5_8}</Text>
          <Text style={styles.text}>item_5_9: {data.item_5_9}</Text>
          <Text style={styles.text}>item_5_10: {data.item_5_10}</Text>
          <Text style={styles.text}>item_5_11: {data.item_5_11}</Text>
          <Text style={styles.text}>item_5_12: {data.item_5_12}</Text>
          <Text style={styles.text}>item_5_13: {data.item_5_13}</Text>
          <Text style={styles.text}>item_5_14A: {data.item_5_14A}</Text>
          <Text style={styles.text}>item_5_14B: {data.item_5_14B}</Text>
          <Text style={styles.text}>item_5_15: {data.item_5_15}</Text>
          <Text style={styles.text}>item_5_16: {data.item_5_16}</Text>
          <Text style={styles.text}>item_5_17: {data.item_5_17}</Text>
          <Text style={styles.text}>item_5_18: {data.item_5_18}</Text>
          <Text style={styles.text}>item_5_19: {data.item_5_19}</Text>
          <Text style={styles.text}>item_5_20: {data.item_5_20}</Text>
          <Text style={styles.text}>item_5_21: {data.item_5_21}</Text>
          <Text style={styles.text}>item_5_22: {data.item_5_22}</Text>
          <Text style={styles.text}>item_5_23: {data.item_5_23}</Text>
          <Text style={styles.text}>item_5_24: {data.item_5_24}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 6</Text>
          <Text style={styles.text}>item_6_1: {data.item_6_1}</Text>
          <Text style={styles.text}>item_6_2: {data.item_6_2}</Text>
          <Text style={styles.text}>item_6_3: {data.item_6_3}</Text>
          <Text style={styles.text}>item_6_4: {data.item_6_4}</Text>
          <Text style={styles.text}>item_6_5: {data.item_6_5}</Text>
          <Text style={styles.text}>item_6_6: {data.item_6_6}</Text>
          <Text style={styles.text}>item_6_7: {data.item_6_7}</Text>
          <Text style={styles.text}>item_6_8: {data.item_6_8}</Text>
          <Text style={styles.text}>item_6_9: {data.item_6_9}</Text>
          <Text style={styles.text}>item_6_10: {data.item_6_10}</Text>
          <Text style={styles.text}>item_6_11: {data.item_6_11}</Text>
          <Text style={styles.text}>item_6_12A: {data.item_6_12A}</Text>
          <Text style={styles.text}>item_6_12B: {data.item_6_12B}</Text>
          <Text style={styles.text}>item_6_13A: {data.item_6_13A}</Text>
          <Text style={styles.text}>item_6_13B: {data.item_6_13B}</Text>
          <Text style={styles.text}>item_6_13C: {data.item_6_13C}</Text>
          <Text style={styles.text}>item_6_13D: {data.item_6_13D}</Text>
          <Text style={styles.text}>item_6_13E: {data.item_6_13E}</Text>
          <Text style={styles.text}>item_6_14: {data.item_6_14}</Text>
          <Text style={styles.text}>item_6_15: {data.item_6_15}</Text>
          <Text style={styles.text}>item_6_16: {data.item_6_16}</Text>
          <Text style={styles.text}>item_6_17A: {data.item_6_17A}</Text>
          <Text style={styles.text}>item_6_17B: {data.item_6_17B}</Text>
          <Text style={styles.text}>item_6_17C: {data.item_6_17C}</Text>
          <Text style={styles.text}>item_6_17D: {data.item_6_17D}</Text>
          <Text style={styles.text}>item_6_18: {data.item_6_18}</Text>
          <Text style={styles.text}>item_6_19: {data.item_6_19}</Text>
          <Text style={styles.text}>item_6_20: {data.item_6_20}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 7</Text>
          <Text style={styles.text}>item_7_1A: {data.item_7_1A}</Text>
          <Text style={styles.text}>item_7_1B: {data.item_7_1B}</Text>
          <Text style={styles.text}>item_7_1C: {data.item_7_1C}</Text>
          <Text style={styles.text}>item_7_1D: {data.item_7_1D}</Text>
          <Text style={styles.text}>item_7_1E: {data.item_7_1E}</Text>
          <Text style={styles.text}>item_7_1F: {data.item_7_1F}</Text>
          <Text style={styles.text}>item_7_2A: {data.item_7_2A}</Text>
          <Text style={styles.text}>item_7_2B: {data.item_7_2B}</Text>
          <Text style={styles.text}>item_7_2C: {data.item_7_2C}</Text>
          <Text style={styles.text}>item_7_2D: {data.item_7_2D}</Text>
          <Text style={styles.text}>item_7_3A: {data.item_7_3A}</Text>
          <Text style={styles.text}>item_7_3B: {data.item_7_3B}</Text>
          <Text style={styles.text}>item_7_3C: {data.item_7_3C}</Text>
          <Text style={styles.text}>item_7_3D: {data.item_7_3D}</Text>
          <Text style={styles.text}>item_7_4A: {data.item_7_4A}</Text>
          <Text style={styles.text}>item_7_4B: {data.item_7_4B}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 8</Text>
          <Text style={styles.text}>item_8_1: {data.item_8_1}</Text>
          <Text style={styles.text}>item_8_2: {data.item_8_2}</Text>
          <Text style={styles.text}>item_8_3: {data.item_8_3}</Text>
          <Text style={styles.text}>item_8_4: {data.item_8_4}</Text>
          <Text style={styles.text}>item_8_5: {data.item_8_5}</Text>
          <Text style={styles.text}>item_8_6: {data.item_8_6}</Text>
          <Text style={styles.text}>item_8_7A: {data.item_8_7A}</Text>
          <Text style={styles.text}>item_8_7B: {data.item_8_7B}</Text>
          <Text style={styles.text}>item_8_7C: {data.item_8_7C}</Text>
          <Text style={styles.text}>item_8_7D: {data.item_8_7D}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 9</Text>
          <Text style={styles.text}>item_9_1A: {data.item_9_1A}</Text>
          <Text style={styles.text}>item_9_1B: {data.item_9_1B}</Text>
          <Text style={styles.text}>item_9_1C: {data.item_9_1C}</Text>
          <Text style={styles.text}>item_9_1D: {data.item_9_1D}</Text>
          <Text style={styles.text}>item_9_1E: {data.item_9_1E}</Text>
          <Text style={styles.text}>item_9_1F: {data.item_9_1F}</Text>
          <Text style={styles.text}>item_9_1G: {data.item_9_1G}</Text>
          <Text style={styles.text}>item_9_1H: {data.item_9_1H}</Text>
          <Text style={styles.text}>item_9_2: {data.item_9_2}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section 10</Text>
          <Text style={styles.text}>item_10_0: {data.item_10_0}</Text>
        </View>
      </Page>

      {data.dbs.map((db, dbIndex) => (
        <>
          <Page style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{db.dbDesignation}</Text>

              <View key={dbIndex}>
                <Text style={styles.text}>DB Designation: {db.dbDesignation}</Text>
                <Text style={styles.text}>DB Location: {db.dbLocation}</Text>
                <Text style={styles.text}>DB Zdb: {db.dbZdb}</Text>
                <Text style={styles.text}>DB IPF: {db.dbIpf}</Text>
                <Text style={styles.text}>dbConfirmationOfSupplyPolarity: {db.dbConfirmationOfSupplyPolarity}</Text>
                <Text style={styles.text}>dbPhaseSequenceConfirmed: {db.dbPhaseSequenceConfirmed}</Text>
                <Text style={styles.text}>dbSPDType: {db.dbSPDType}</Text>
                <Text style={styles.text}>dbSPDStatusIndicator: {db.dbSPDStatusIndicator}</Text>
                <Text style={styles.text}>dbSupplyFrom: {db.dbSupplyFrom}</Text>
                <Text style={styles.text}>dbOCPDBSnumber: {db.dbOCPDBSnumber}</Text>
                <Text style={styles.text}>dbOCPDType: {db.dbOCPDType}</Text>
                <Text style={styles.text}>dbOCPDNominalVoltage: {db.dbOCPDNominalVoltage}</Text>
                <Text style={styles.text}>dbOCPDRating: {db.dbOCPDRating}</Text>
                <Text style={styles.text}>dbOCPDNumberOfPhases: {db.dbOCPDNumberOfPhases}</Text>
                <Text style={styles.text}>dbRCDBSNumber: {db.dbRCDBSNumber}</Text>
                <Text style={styles.text}>dbRCDType: {db.dbRCDType}</Text>
                <Text style={styles.text}>dbRCDOperatingCurrent: {db.dbRCDOperatingCurrent}</Text>
                <Text style={styles.text}>dbRCDNumberOfPoles: {db.dbRCDNumberOfPoles}</Text>
                <Text style={styles.text}>dbRCDOperatingTime: {db.dbRCDOperatingTime}</Text>
                <Text style={styles.text}>testedByName: {db.testedByName}</Text>
                <Text style={styles.text}>testedByPosition: {db.testedByPosition}</Text>
                <Text style={styles.text}>testedBySignature: {db.testedBySignature}</Text>
                <Text style={styles.text}>testedBySignatureDate: {db.testedBySignatureDate}</Text>
                <Text style={styles.text}>testInstrumentMultiFunctionSerialNumber: {db.testInstrumentMultiFunctionSerialNumber}</Text>
                <Text style={styles.text}>testInstrumentContinuitySerialNumber: {db.testInstrumentContinuitySerialNumber}</Text>
                <Text style={styles.text}>testInstrumentInsulationResistanceSerialNumber: {db.testInstrumentInsulationResistanceSerialNumber}</Text>
                <Text style={styles.text}>testInstrumentEarthFaultLoopImpedanceSerialNumber: {db.testInstrumentEarthFaultLoopImpedanceSerialNumber}</Text>
                <Text style={styles.text}>testInstrumentEarthElectrodeSerialNumber: {db.testInstrumentEarthElectrodeSerialNumber}</Text>
                <Text style={styles.text}>testInstrumentRCDSerialNumber: {db.testInstrumentRCDSerialNumber}</Text>
              </View>
            </View>
          </Page>

          <Page style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{db.dbDesignation} Circuits</Text>

              {db.dbCircuits.map((circuit, circuitIndex) => (
                <View key={circuitIndex}>
                  <Text style={styles.text}>circuitNumber: {circuit.circuitNumber}</Text>
                  <Text style={styles.text}>circuitDescription: {circuit.circuitDescription}</Text>
                  <Text style={styles.text}>circuitTypeOfWiring: {circuit.circuitTypeOfWiring}</Text>
                  <Text style={styles.text}>circuitReferenceMethod: {circuit.circuitReferenceMethod}</Text>
                  <Text style={styles.text}>circuitNumberOfPoints: {circuit.circuitNumberOfPoints}</Text>
                  <Text style={styles.text}>circuitConductorLiveCSA: {circuit.circuitConductorLiveCSA}</Text>
                  <Text style={styles.text}>circuitConductorCPCCSA: {circuit.circuitConductorCPCCSA}</Text>
                  <Text style={styles.text}>circuitMaxDisconnectionTime: {circuit.circuitMaxDisconnectionTime}</Text>
                  <Text style={styles.text}>circuitOCPDBSNumber: {circuit.circuitOCPDBSNumber}</Text>
                  <Text style={styles.text}>circuitOCPDType: {circuit.circuitOCPDType}</Text>
                  <Text style={styles.text}>circuitOCPDRating: {circuit.circuitOCPDRating}</Text>
                  <Text style={styles.text}>circuitOCPDShortCircuitCapacity: {circuit.circuitOCPDShortCircuitCapacity}</Text>
                  <Text style={styles.text}>circuitOCPDMaxPermittedZs: {circuit.circuitOCPDMaxPermittedZs}</Text>
                  <Text style={styles.text}>circuitRCDBSNumber: {circuit.circuitRCDBSNumber}</Text>
                  <Text style={styles.text}>circuitRCDType: {circuit.circuitRCDType}</Text>
                  <Text style={styles.text}>circuitRCDRating: {circuit.circuitRCDRating}</Text>
                  <Text style={styles.text}>circuitRCDOperatingCurrent: {circuit.circuitRCDOperatingCurrent}</Text>
                  <Text style={styles.text}>circuitContinuityr1: {circuit.circuitContinuityr1}</Text>
                  <Text style={styles.text}>circuitContinuityrn: {circuit.circuitContinuityrn}</Text>
                  <Text style={styles.text}>circuitContinuityr2: {circuit.circuitContinuityr2}</Text>
                  <Text style={styles.text}>circuitContinuityR1R2: {circuit.circuitContinuityR1R2}</Text>
                  <Text style={styles.text}>circuitContinuityR2: {circuit.circuitContinuityR2}</Text>
                  <Text style={styles.text}>circuitInsulationResistanceLiveLive: {circuit.circuitInsulationResistanceLiveLive}</Text>
                  <Text style={styles.text}>circuitInsulationResistanceLiveEarth: {circuit.circuitInsulationResistanceLiveEarth}</Text>
                  <Text style={styles.text}>circuitInsulationResistanceTestVoltage: {circuit.circuitInsulationResistanceTestVoltage}</Text>
                  <Text style={styles.text}>circuitPolarity: {circuit.circuitPolarity}</Text>
                  <Text style={styles.text}>circuitMaximumZs: {circuit.circuitMaximumZs}</Text>
                  <Text style={styles.text}>circuitRCDOperatingTime: {circuit.circuitRCDOperatingTime}</Text>
                  <Text style={styles.text}>circuitRCDOTestButton: {circuit.circuitRCDOTestButton}</Text>
                  <Text style={styles.text}>circuitAFDDOTestButton: {circuit.circuitAFDDOTestButton}</Text>
                  <Text style={styles.text}>circuitComments: {circuit.circuitComments}</Text>
                  <Text style={styles.text}>circuitsEquipmentVunerableToDamage: {circuit.circuitsEquipmentVunerableToDamage}</Text>
                  <Text style={styles.text}></Text>
                </View>
              ))}
            </View>
          </Page>
        </>
      ))}
    </Document>
  );
}
