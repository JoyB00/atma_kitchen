import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.6,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
});

const PDFIncomeExpense = ({ data, month, year }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Atma Kitchen</Text>
      <Text style={styles.header}>Jl. Centralpark No. 10 Yogyakarta</Text>
      <Text style={[styles.header, styles.bold]}>Income and Expense Report</Text>
      <Text>Bulan: {month}</Text>
      <Text>Tahun: {year}</Text>
      <Text>Print: {new Date().toLocaleDateString()}</Text>

      <Text style={styles.sectionTitle}>Income</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Type</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Amount</Text>
          </View>
        </View>
        {Object.entries(data?.Income || {}).map(([type, amount], index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{type}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{amount}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Expense</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Type</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Amount</Text>
          </View>
        </View>
        {Object.entries(data?.Expenses || {}).map(([type, amount], index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{type}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{amount}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFIncomeExpense;
