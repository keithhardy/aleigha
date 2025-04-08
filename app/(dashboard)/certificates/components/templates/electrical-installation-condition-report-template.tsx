import {
  Address,
  ElectricalInstallationConditionReport,
  Property,
} from "@prisma/client";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
  },
});

export default function ElectricalInstallationConditionReportTemplate({
  electricalInstallationConditionReport,
}: {
  electricalInstallationConditionReport: ElectricalInstallationConditionReport & {
    property: Property & { address: Address };
  };
}) {
  return (
    <Document>
      <Page orientation="landscape" style={styles.page} break>
        <View>
          <Text>Electrical Installation Condition Report</Text>
        </View>

        <View>
          {/* Certificate details */}
          <Text>Certificate Details</Text>
          <Text>ID: {electricalInstallationConditionReport.id ?? "na"}</Text>
          <Text>
            Type: {electricalInstallationConditionReport.type ?? "na"}
          </Text>
          <Text>
            Serial: {electricalInstallationConditionReport.serial ?? "na"}
          </Text>
          <Text>
            Status: {electricalInstallationConditionReport.status ?? "na"}
          </Text>
          {/* <Text>Creator: {electricalInstallationConditionReport.creator ?? "na"}</Text> */}
          <Text>
            Creator ID:{" "}
            {electricalInstallationConditionReport.creatorId ?? "na"}
          </Text>
          <Text>
            Created At:{" "}
            {electricalInstallationConditionReport.createdAt.toLocaleString() ??
              "na"}
          </Text>
          <Text>
            Updated At:{" "}
            {electricalInstallationConditionReport.updatedAt.toLocaleString() ??
              "na"}
          </Text>

          {/* Details of the contractor, client and installation */}
          <Text>Client Details</Text>
          {/* <Text>Client: {electricalInstallationConditionReport.client ?? "na"}</Text> */}
          <Text>
            Client ID: {electricalInstallationConditionReport.clientId ?? "na"}
          </Text>
          {/* <Text>Property: {electricalInstallationConditionReport.property ?? "na"}</Text> */}
          <Text>
            Property ID:{" "}
            {electricalInstallationConditionReport.propertyId ?? "na"}
          </Text>

          {/* Purpose of the report */}
          <Text>Purpose of the Report</Text>
          <Text>
            Purpose: {electricalInstallationConditionReport.purpose ?? "na"}
          </Text>
          <Text>
            Start Date:{" "}
            {electricalInstallationConditionReport.startDate?.toLocaleString() ??
              "na"}
          </Text>
          <Text>
            End Date:{" "}
            {electricalInstallationConditionReport.endDate?.toLocaleString() ??
              "na"}
          </Text>
          <Text>
            Records Available:{" "}
            {electricalInstallationConditionReport.recordsAvailable ?? "na"}
          </Text>
          <Text>
            Previous Report Available:{" "}
            {electricalInstallationConditionReport.previousReportAvailable ??
              "na"}
          </Text>
          <Text>
            Previous Report Date:{" "}
            {electricalInstallationConditionReport.previousReportDate?.toLocaleString() ??
              "na"}
          </Text>

          {/* Summary of the condition of the installation */}
          <Text>Summary of the Condition of the Installation</Text>
          <Text>
            General Condition:{" "}
            {electricalInstallationConditionReport.generalCondition ?? "na"}
          </Text>
          <Text>
            Estimated Age of Electrical Installation:{" "}
            {electricalInstallationConditionReport.estimatedAgeOfElectricalInstallation ??
              "na"}
          </Text>
          <Text>
            Evidence of Alterations:{" "}
            {electricalInstallationConditionReport.evidenceOfAlterations ??
              "na"}
          </Text>
          <Text>
            Estimated Age of Alterations:{" "}
            {electricalInstallationConditionReport.estimatedAgeOfAlterations ??
              "na"}
          </Text>
          <Text>
            Overall Assessment of the Installation:{" "}
            {electricalInstallationConditionReport.overallAssessmentOfTheInstallation ??
              "na"}
          </Text>

          {/* Declaration */}
          <Text>Declaration</Text>
          <Text>
            Recommended Retest Date:{" "}
            {electricalInstallationConditionReport.recommendedRetestDate?.toLocaleString() ??
              "na"}
          </Text>
          <Text>
            Reason for Recommendation:{" "}
            {electricalInstallationConditionReport.reasonForRecommendation ??
              "na"}
          </Text>
          {/* <Text>Inspector: {electricalInstallationConditionReport.inspector ?? "na"}</Text> */}
          <Text>
            Inspector ID:{" "}
            {electricalInstallationConditionReport.inspectorId ?? "na"}
          </Text>
          <Text>
            Inspection Date:{" "}
            {electricalInstallationConditionReport.inspectionDate?.toLocaleString() ??
              "na"}
          </Text>
          {/* <Text>Reviewer: {electricalInstallationConditionReport.reviewer ?? "na"}</Text> */}
          <Text>
            Reviewer ID:{" "}
            {electricalInstallationConditionReport.reviewerId ?? "na"}
          </Text>
          <Text>
            Review Date:{" "}
            {electricalInstallationConditionReport.reviewDate?.toLocaleString() ??
              "na"}
          </Text>

          {/* Observation */}
          <Text>Observations</Text>
          <Text>
            {JSON.stringify(
              electricalInstallationConditionReport.observations,
            ) ?? "na"}
          </Text>

          {/* Details and limitations of the inspection and testing */}
          <Text>Details and Limitations of the Inspection and Testing</Text>
          <Text>
            Regulation Accordance as Amended To:{" "}
            {electricalInstallationConditionReport.regulationAccordanceAsAmendedTo ??
              "na"}
          </Text>
          <Text>
            Details of the Electrical Installation:{" "}
            {electricalInstallationConditionReport.detailsOfTheElectricalInstallation ??
              "na"}
          </Text>
          <Text>
            Extent of Sampling:{" "}
            {electricalInstallationConditionReport.extentOfSampling ?? "na"}
          </Text>
          <Text>
            Agreed Limitations:{" "}
            {electricalInstallationConditionReport.agreedLimitations ?? "na"}
          </Text>
          <Text>
            Agreed Limitations With:{" "}
            {electricalInstallationConditionReport.agreedLimitationsWith ??
              "na"}
          </Text>
          <Text>
            Operational Limitations:{" "}
            {electricalInstallationConditionReport.operationalLimitations ??
              "na"}
          </Text>

          {/* Supply characteristics and earthing arrangements */}
          <Text>Supply Characteristics and Earthing Arrangements</Text>
          <Text>
            System Type and Earthing Arrangements:{" "}
            {electricalInstallationConditionReport.systemTypeAndEarthingArrangements ??
              "na"}
          </Text>
          <Text>
            Supply Protective Device BS Number:{" "}
            {electricalInstallationConditionReport.supplyProtectiveDeviceBSNumber ??
              "na"}
          </Text>
          <Text>
            Supply Protective Device Type:{" "}
            {electricalInstallationConditionReport.supplyProtectiveDeviceType ??
              "na"}
          </Text>
          <Text>
            Supply Protective Device Rated Current:{" "}
            {electricalInstallationConditionReport.supplyProtectiveDeviceRatedCurrent ??
              "na"}
          </Text>
          <Text>
            Number and Type of Live Conductors:{" "}
            {electricalInstallationConditionReport.numberAndTypeOfLiveConductors ??
              "na"}
          </Text>
          <Text>
            Confirmation of Supply Polarity:{" "}
            {electricalInstallationConditionReport.confirmationOfSupplyPolarity ??
              "na"}
          </Text>
          <Text>
            Other Sources of Supply:{" "}
            {electricalInstallationConditionReport.otherSourcesOfSupply ?? "na"}
          </Text>
          <Text>
            Nominal Voltage Between Lines:{" "}
            {electricalInstallationConditionReport.nominalVoltageBetweenLines ??
              "na"}
          </Text>
          <Text>
            Nominal Line Voltage to Earth:{" "}
            {electricalInstallationConditionReport.nominalLineVoltageToEarth ??
              "na"}
          </Text>
          <Text>
            Nominal Frequency:{" "}
            {electricalInstallationConditionReport.nominalFrequency ?? "na"}
          </Text>
          <Text>
            Prospective Fault Current:{" "}
            {electricalInstallationConditionReport.prospectiveFaultCurrent ??
              "na"}
          </Text>
          <Text>
            External Earth Fault Loop Impedance:{" "}
            {electricalInstallationConditionReport.externalEarthFaultLoopImpedance ??
              "na"}
          </Text>

          {/* Schedule of items inspected */}
          <Text>1.0 Intake Equipment (visual inspection only)</Text>
          <Text>
            Item 1.1A: {electricalInstallationConditionReport.item_1_1A ?? "na"}
          </Text>
          <Text>
            Item 1.1B: {electricalInstallationConditionReport.item_1_1B ?? "na"}
          </Text>
          <Text>
            Item 1.1C: {electricalInstallationConditionReport.item_1_1C ?? "na"}
          </Text>
          <Text>
            Item 1.1D: {electricalInstallationConditionReport.item_1_1D ?? "na"}
          </Text>
          <Text>
            Item 1.1E: {electricalInstallationConditionReport.item_1_1E ?? "na"}
          </Text>
          <Text>
            Item 1.1F: {electricalInstallationConditionReport.item_1_1F ?? "na"}
          </Text>
          <Text>
            Item 1.2: {electricalInstallationConditionReport.item_1_2 ?? "na"}
          </Text>
          <Text>
            Item 1.3: {electricalInstallationConditionReport.item_1_3 ?? "na"}
          </Text>

          <Text>
            2.0 Presence of adequate arrangements for parallel or switched
            alternative sources
          </Text>
          <Text>
            Item 2.1: {electricalInstallationConditionReport.item_2_1 ?? "na"}
          </Text>
          <Text>
            Item 2.2: {electricalInstallationConditionReport.item_2_2 ?? "na"}
          </Text>

          <Text>3.0 Methods of protection</Text>
          <Text>
            Item 3.1A: {electricalInstallationConditionReport.item_3_1A ?? "na"}
          </Text>
          <Text>
            Item 3.1B: {electricalInstallationConditionReport.item_3_1B ?? "na"}
          </Text>
          <Text>
            Item 3.1C: {electricalInstallationConditionReport.item_3_1C ?? "na"}
          </Text>
          <Text>
            Item 3.1D: {electricalInstallationConditionReport.item_3_1D ?? "na"}
          </Text>
          <Text>
            Item 3.1E: {electricalInstallationConditionReport.item_3_1E ?? "na"}
          </Text>
          <Text>
            Item 3.1F: {electricalInstallationConditionReport.item_3_1F ?? "na"}
          </Text>
          <Text>
            Item 3.1G: {electricalInstallationConditionReport.item_3_1G ?? "na"}
          </Text>
          <Text>
            Item 3.1H: {electricalInstallationConditionReport.item_3_1H ?? "na"}
          </Text>
          <Text>
            Item 3.1I: {electricalInstallationConditionReport.item_3_1I ?? "na"}
          </Text>
          <Text>
            Item 3.2: {electricalInstallationConditionReport.item_3_2 ?? "na"}
          </Text>
          <Text>
            Item 3.3A: {electricalInstallationConditionReport.item_3_3A ?? "na"}
          </Text>
          <Text>
            Item 3.3B: {electricalInstallationConditionReport.item_3_3B ?? "na"}
          </Text>
          <Text>
            Item 3.3C: {electricalInstallationConditionReport.item_3_3C ?? "na"}
          </Text>
          <Text>
            Item 3.3D: {electricalInstallationConditionReport.item_3_3D ?? "na"}
          </Text>
          <Text>
            Item 3.3E: {electricalInstallationConditionReport.item_3_3E ?? "na"}
          </Text>
          <Text>
            Item 3.3F: {electricalInstallationConditionReport.item_3_3F ?? "na"}
          </Text>

          <Text>
            4.0 Distribution equipment, including consumer units and
            distribution boards
          </Text>
          <Text>
            Item 4.1: {electricalInstallationConditionReport.item_4_1 ?? "na"}
          </Text>
          <Text>
            Item 4.2: {electricalInstallationConditionReport.item_4_2 ?? "na"}
          </Text>
          <Text>
            Item 4.3: {electricalInstallationConditionReport.item_4_3 ?? "na"}
          </Text>
          <Text>
            Item 4.4: {electricalInstallationConditionReport.item_4_4 ?? "na"}
          </Text>
          <Text>
            Item 4.5: {electricalInstallationConditionReport.item_4_5 ?? "na"}
          </Text>
          <Text>
            Item 4.6: {electricalInstallationConditionReport.item_4_6 ?? "na"}
          </Text>
          <Text>
            Item 4.7: {electricalInstallationConditionReport.item_4_7 ?? "na"}
          </Text>
          <Text>
            Item 4.8: {electricalInstallationConditionReport.item_4_8 ?? "na"}
          </Text>
          <Text>
            Item 4.9: {electricalInstallationConditionReport.item_4_9 ?? "na"}
          </Text>
          <Text>
            Item 4.10: {electricalInstallationConditionReport.item_4_10 ?? "na"}
          </Text>
          <Text>
            Item 4.11: {electricalInstallationConditionReport.item_4_11 ?? "na"}
          </Text>
          <Text>
            Item 4.12: {electricalInstallationConditionReport.item_4_12 ?? "na"}
          </Text>
          <Text>
            Item 4.13: {electricalInstallationConditionReport.item_4_13 ?? "na"}
          </Text>
          <Text>
            Item 4.14: {electricalInstallationConditionReport.item_4_14 ?? "na"}
          </Text>
          <Text>
            Item 4.15: {electricalInstallationConditionReport.item_4_15 ?? "na"}
          </Text>
          <Text>
            Item 4.16: {electricalInstallationConditionReport.item_4_16 ?? "na"}
          </Text>
          <Text>
            Item 4.17: {electricalInstallationConditionReport.item_4_17 ?? "na"}
          </Text>
          <Text>
            Item 4.18: {electricalInstallationConditionReport.item_4_18 ?? "na"}
          </Text>
          <Text>
            Item 4.19: {electricalInstallationConditionReport.item_4_19 ?? "na"}
          </Text>
          <Text>
            Item 4.20: {electricalInstallationConditionReport.item_4_20 ?? "na"}
          </Text>
          <Text>
            Item 4.21: {electricalInstallationConditionReport.item_4_21 ?? "na"}
          </Text>
          <Text>
            Item 4.22: {electricalInstallationConditionReport.item_4_22 ?? "na"}
          </Text>
          <Text>
            Item 4.23: {electricalInstallationConditionReport.item_4_23 ?? "na"}
          </Text>
          <Text>
            Item 4.24: {electricalInstallationConditionReport.item_4_24 ?? "na"}
          </Text>
          <Text>
            Item 4.25: {electricalInstallationConditionReport.item_4_25 ?? "na"}
          </Text>

          <Text>5.0 Distribution circuits</Text>
          <Text>
            Item 5.1: {electricalInstallationConditionReport.item_5_1 ?? "na"}
          </Text>
          <Text>
            Item 5.2: {electricalInstallationConditionReport.item_5_2 ?? "na"}
          </Text>
          <Text>
            Item 5.3: {electricalInstallationConditionReport.item_5_3 ?? "na"}
          </Text>
          <Text>
            Item 5.4: {electricalInstallationConditionReport.item_5_4 ?? "na"}
          </Text>
          <Text>
            Item 5.5: {electricalInstallationConditionReport.item_5_5 ?? "na"}
          </Text>
          <Text>
            Item 5.6: {electricalInstallationConditionReport.item_5_6 ?? "na"}
          </Text>
          <Text>
            Item 5.7: {electricalInstallationConditionReport.item_5_7 ?? "na"}
          </Text>
          <Text>
            Item 5.8: {electricalInstallationConditionReport.item_5_8 ?? "na"}
          </Text>
          <Text>
            Item 5.9: {electricalInstallationConditionReport.item_5_9 ?? "na"}
          </Text>
          <Text>
            Item 5.10: {electricalInstallationConditionReport.item_5_10 ?? "na"}
          </Text>
          <Text>
            Item 5.11: {electricalInstallationConditionReport.item_5_11 ?? "na"}
          </Text>
          <Text>
            Item 5.12: {electricalInstallationConditionReport.item_5_12 ?? "na"}
          </Text>
          <Text>
            Item 5.13: {electricalInstallationConditionReport.item_5_13 ?? "na"}
          </Text>
          <Text>
            Item 5.14A:{" "}
            {electricalInstallationConditionReport.item_5_14A ?? "na"}
          </Text>
          <Text>
            Item 5.14B:{" "}
            {electricalInstallationConditionReport.item_5_14B ?? "na"}
          </Text>
          <Text>
            Item 5.15: {electricalInstallationConditionReport.item_5_15 ?? "na"}
          </Text>
          <Text>
            Item 5.16: {electricalInstallationConditionReport.item_5_16 ?? "na"}
          </Text>
          <Text>
            Item 5.17: {electricalInstallationConditionReport.item_5_17 ?? "na"}
          </Text>
          <Text>
            Item 5.18: {electricalInstallationConditionReport.item_5_18 ?? "na"}
          </Text>
          <Text>
            Item 5.19: {electricalInstallationConditionReport.item_5_19 ?? "na"}
          </Text>
          <Text>
            Item 5.20: {electricalInstallationConditionReport.item_5_20 ?? "na"}
          </Text>
          <Text>
            Item 5.21: {electricalInstallationConditionReport.item_5_21 ?? "na"}
          </Text>
          <Text>
            Item 5.22: {electricalInstallationConditionReport.item_5_22 ?? "na"}
          </Text>
          <Text>
            Item 5.23: {electricalInstallationConditionReport.item_5_23 ?? "na"}
          </Text>
          <Text>
            Item 5.24: {electricalInstallationConditionReport.item_5_24 ?? "na"}
          </Text>

          <Text>6.0 Final circuits</Text>
          <Text>
            Item 6.1: {electricalInstallationConditionReport.item_6_1 ?? "na"}
          </Text>
          <Text>
            Item 6.2: {electricalInstallationConditionReport.item_6_2 ?? "na"}
          </Text>
          <Text>
            Item 6.3: {electricalInstallationConditionReport.item_6_3 ?? "na"}
          </Text>
          <Text>
            Item 6.4: {electricalInstallationConditionReport.item_6_4 ?? "na"}
          </Text>
          <Text>
            Item 6.5: {electricalInstallationConditionReport.item_6_5 ?? "na"}
          </Text>
          <Text>
            Item 6.6: {electricalInstallationConditionReport.item_6_6 ?? "na"}
          </Text>
          <Text>
            Item 6.7: {electricalInstallationConditionReport.item_6_7 ?? "na"}
          </Text>
          <Text>
            Item 6.8: {electricalInstallationConditionReport.item_6_8 ?? "na"}
          </Text>
          <Text>
            Item 6.9: {electricalInstallationConditionReport.item_6_9 ?? "na"}
          </Text>
          <Text>
            Item 6.10: {electricalInstallationConditionReport.item_6_10 ?? "na"}
          </Text>
          <Text>
            Item 6.11: {electricalInstallationConditionReport.item_6_11 ?? "na"}
          </Text>
          <Text>
            Item 6.12A:{" "}
            {electricalInstallationConditionReport.item_6_12A ?? "na"}
          </Text>
          <Text>
            Item 6.12B:{" "}
            {electricalInstallationConditionReport.item_6_12B ?? "na"}
          </Text>
          <Text>
            Item 6.13A:{" "}
            {electricalInstallationConditionReport.item_6_13A ?? "na"}
          </Text>
          <Text>
            Item 6.13B:{" "}
            {electricalInstallationConditionReport.item_6_13B ?? "na"}
          </Text>
          <Text>
            Item 6.13C:{" "}
            {electricalInstallationConditionReport.item_6_13C ?? "na"}
          </Text>
          <Text>
            Item 6.13D:{" "}
            {electricalInstallationConditionReport.item_6_13D ?? "na"}
          </Text>
          <Text>
            Item 6.13E:{" "}
            {electricalInstallationConditionReport.item_6_13E ?? "na"}
          </Text>
          <Text>
            Item 6.14: {electricalInstallationConditionReport.item_6_14 ?? "na"}
          </Text>
          <Text>
            Item 6.15: {electricalInstallationConditionReport.item_6_15 ?? "na"}
          </Text>
          <Text>
            Item 6.16: {electricalInstallationConditionReport.item_6_16 ?? "na"}
          </Text>
          <Text>
            Item 6.17A:{" "}
            {electricalInstallationConditionReport.item_6_17A ?? "na"}
          </Text>
          <Text>
            Item 6.17B:{" "}
            {electricalInstallationConditionReport.item_6_17B ?? "na"}
          </Text>
          <Text>
            Item 6.17C:{" "}
            {electricalInstallationConditionReport.item_6_17C ?? "na"}
          </Text>
          <Text>
            Item 6.17D:{" "}
            {electricalInstallationConditionReport.item_6_17D ?? "na"}
          </Text>
          <Text>
            Item 6.18: {electricalInstallationConditionReport.item_6_18 ?? "na"}
          </Text>
          <Text>
            Item 6.19: {electricalInstallationConditionReport.item_6_19 ?? "na"}
          </Text>
          <Text>
            Item 6.20: {electricalInstallationConditionReport.item_6_20 ?? "na"}
          </Text>

          <Text>7.0 Isolation and switching</Text>
          <Text>
            Item 7.1A: {electricalInstallationConditionReport.item_7_1A ?? "na"}
          </Text>
          <Text>
            Item 7.1B: {electricalInstallationConditionReport.item_7_1B ?? "na"}
          </Text>
          <Text>
            Item 7.1C: {electricalInstallationConditionReport.item_7_1C ?? "na"}
          </Text>
          <Text>
            Item 7.1D: {electricalInstallationConditionReport.item_7_1D ?? "na"}
          </Text>
          <Text>
            Item 7.1E: {electricalInstallationConditionReport.item_7_1E ?? "na"}
          </Text>
          <Text>
            Item 7.1F: {electricalInstallationConditionReport.item_7_1F ?? "na"}
          </Text>
          <Text>
            Item 7.2A: {electricalInstallationConditionReport.item_7_2A ?? "na"}
          </Text>
          <Text>
            Item 7.2B: {electricalInstallationConditionReport.item_7_2B ?? "na"}
          </Text>
          <Text>
            Item 7.2C: {electricalInstallationConditionReport.item_7_2C ?? "na"}
          </Text>
          <Text>
            Item 7.2D: {electricalInstallationConditionReport.item_7_2D ?? "na"}
          </Text>
          <Text>
            Item 7.3A: {electricalInstallationConditionReport.item_7_3A ?? "na"}
          </Text>
          <Text>
            Item 7.3B: {electricalInstallationConditionReport.item_7_3B ?? "na"}
          </Text>
          <Text>
            Item 7.3C: {electricalInstallationConditionReport.item_7_3C ?? "na"}
          </Text>
          <Text>
            Item 7.3D: {electricalInstallationConditionReport.item_7_3D ?? "na"}
          </Text>
          <Text>
            Item 7.4A: {electricalInstallationConditionReport.item_7_4A ?? "na"}
          </Text>
          <Text>
            Item 7.4B: {electricalInstallationConditionReport.item_7_4B ?? "na"}
          </Text>

          <Text>8.0 Current-using equipment (permanently connected)</Text>
          <Text>
            Item 8.1: {electricalInstallationConditionReport.item_8_1 ?? "na"}
          </Text>
          <Text>
            Item 8.2: {electricalInstallationConditionReport.item_8_2 ?? "na"}
          </Text>
          <Text>
            Item 8.3: {electricalInstallationConditionReport.item_8_3 ?? "na"}
          </Text>
          <Text>
            Item 8.4: {electricalInstallationConditionReport.item_8_4 ?? "na"}
          </Text>
          <Text>
            Item 8.5: {electricalInstallationConditionReport.item_8_5 ?? "na"}
          </Text>
          <Text>
            Item 8.6: {electricalInstallationConditionReport.item_8_6 ?? "na"}
          </Text>
          <Text>
            Item 8.7A: {electricalInstallationConditionReport.item_8_7A ?? "na"}
          </Text>
          <Text>
            Item 8.7B: {electricalInstallationConditionReport.item_8_7B ?? "na"}
          </Text>
          <Text>
            Item 8.7C: {electricalInstallationConditionReport.item_8_7C ?? "na"}
          </Text>
          <Text>
            Item 8.7D: {electricalInstallationConditionReport.item_8_7D ?? "na"}
          </Text>

          <Text>9.0 Special locations and installations</Text>
          <Text>
            Item 9.1A: {electricalInstallationConditionReport.item_9_1A ?? "na"}
          </Text>
          <Text>
            Item 9.1B: {electricalInstallationConditionReport.item_9_1B ?? "na"}
          </Text>
          <Text>
            Item 9.1C: {electricalInstallationConditionReport.item_9_1C ?? "na"}
          </Text>
          <Text>
            Item 9.1D: {electricalInstallationConditionReport.item_9_1D ?? "na"}
          </Text>
          <Text>
            Item 9.1E: {electricalInstallationConditionReport.item_9_1E ?? "na"}
          </Text>
          <Text>
            Item 9.1F: {electricalInstallationConditionReport.item_9_1F ?? "na"}
          </Text>
          <Text>
            Item 9.1G: {electricalInstallationConditionReport.item_9_1G ?? "na"}
          </Text>
          <Text>
            Item 9.1H: {electricalInstallationConditionReport.item_9_1H ?? "na"}
          </Text>
          <Text>
            Item 9.2: {electricalInstallationConditionReport.item_9_2 ?? "na"}
          </Text>

          <Text>10.0 Prosumer’s low voltage installation</Text>
          <Text>
            Item 10.0: {electricalInstallationConditionReport.item_10_0 ?? "na"}
          </Text>

          {/* Schedule of circuit details and test results */}
          <Text>Schedule of Circuit Details and Test Results</Text>
          <Text>
            DB:{" "}
            {JSON.stringify(
              electricalInstallationConditionReport.consumerUnits,
            ) ?? "na"}
          </Text>

          {/* Schedule of rates */}
          <Text>Schedule of Rates</Text>
          <Text>
            Rates:{" "}
            {JSON.stringify(electricalInstallationConditionReport.rates) ??
              "na"}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
