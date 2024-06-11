// ProductSalesReport.js
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
    width: "33.3%",
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

const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

const PDFConsignorSales = ({ data, month }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Atma Kitchen</Text>
      <Text style={styles.header}>Jl. Centralpark No. 10 Yogyakarta</Text>
      <Text style={[styles.header, styles.underline, styles.bold]}>
        Ingredient Stock Report
      </Text>
      <Text>Bulan: {month}</Text>
      <Text>Tahun: 2024</Text>
      <Text>Tanggal cetak: 2 {month} 2024</Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Ingredient Name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Unit</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Quantity</Text>
          </View>
        </View>
        {data.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.ingredient_name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.unit}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.quantity}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFConsignorSales;
