import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Styles untuk PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.6,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "14.28%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  underline: {
    textDecoration: "underline",
  },
  tableColSpan: {
    flexBasis: "75%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
});

const PDFAbsence = ({ data, month, year }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Atma Kitchen</Text>
      <Text style={styles.header}>Jl. Centralpark No. 10 Yogyakarta</Text>
      <Text style={[styles.header, styles.underline, styles.bold]}>
        Absence Report
      </Text>
      <Text>Bulan: {month}</Text>
      <Text>Tahun: {year}</Text>
      <Text>Tanggal cetak: 2 {month} {year}</Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>No</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Employee Name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Total Attendance</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Total Absent</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Daily Wages</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Bonus</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Total Wages</Text>
          </View>
        </View>
        {data.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{index + 1}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.employee_name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.total_attendance}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.total_absent}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.daily_wages}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.bonus}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.total_wages}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFAbsence;
