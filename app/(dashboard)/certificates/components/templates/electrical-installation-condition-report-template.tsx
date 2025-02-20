import { ElectricalInstallationConditionReport } from '@prisma/client';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import React from 'react';


const styles = StyleSheet.create({
  page: {
    fontSize: 12,
  },
});

export default function ElectricalInstallationConditionReportTemplate({ data }: { data: ElectricalInstallationConditionReport }) {
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
                <Text>Trading Name: {data.type}</Text>
                <Text>Address: {data.serial}</Text>
                <Text>Phone: {data.startDate?.toLocaleString()}</Text>
                <Text>Governing Body: {data.endDate?.toLocaleString()}</Text>
                <Text>Governing Body Number: {data.status}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
