import { Address, ElectricalInstallationConditionReport, Property } from "@prisma/client";
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
      <Page orientation="landscape" style={styles.page}>
        <View style={{ height: "100%", display: "flex" }}>
          <View>
            <Text>Electrical Installation Condition Report</Text>
          </View>

          <View>
            <View>
              <View>
                <Text>Contractor Details</Text>
                <Text>Trading Name: {electricalInstallationConditionReport.type}</Text>
                <Text>Address: {electricalInstallationConditionReport.property.address.streetAddress}</Text>
                <Text>Phone: {electricalInstallationConditionReport.startDate?.toLocaleString()}</Text>
                <Text>Governing Body: {electricalInstallationConditionReport.endDate?.toLocaleString()}</Text>
                <Text>Governing Body Number: {electricalInstallationConditionReport.status}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
