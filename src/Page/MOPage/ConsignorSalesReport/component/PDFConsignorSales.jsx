import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

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
    width: "10%", // Menyesuaikan lebar kolom kecil
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableColWide: {
    width: "20%", // Lebar lebih besar untuk kolom yang berisi teks panjang
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableColWider: {
    width: "30%", // Lebar lebih besar untuk kolom yang berisi teks sangat panjang
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    wordWrap: "break-word", // Memotong teks yang terlalu panjang
  },
  bold: {
    fontWeight: "bold",
  },
  underline: {
    textDecoration: "underline",
  },
});

const PDFConsignorSales = ({ data, month, year }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Atma Kitchen</Text>
      <Text style={styles.header}>Jl. Centralpark No. 10 Yogyakarta</Text>
      <Text style={[styles.header, styles.underline, styles.bold]}>
        Consignor Sales Report
      </Text>
      <Text>Bulan: {month}</Text>
      <Text>Tahun: {year}</Text>
      <Text>Tanggal cetak: {new Date().toLocaleDateString()}</Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>No</Text>
          </View>
          <View style={styles.tableColWide}>
            <Text style={[styles.tableCell, styles.bold]}>Consignor</Text>
          </View>
          <View style={styles.tableColWider}>
            <Text style={[styles.tableCell, styles.bold]}>Product Name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Quantity Sold</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Sale Price</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Total</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Commission</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.bold]}>Received</Text>
          </View>
        </View>
        {data.map((item, index) => (
          item.products.map((product, productIndex) => (
            <View style={styles.tableRow} key={`${index}-${productIndex}`}>
              {productIndex === 0 && (
                <>
                  <View style={styles.tableCol} rowSpan={item.products.length}>
                    <Text style={styles.tableCell}>{index + 1}</Text>
                  </View>
                  <View style={styles.tableColWide} rowSpan={item.products.length}>
                    <Text style={styles.tableCell}>{item.consignor_name}</Text>
                  </View>
                </>
              )}
              <View style={styles.tableColWider}>
                <Text style={styles.tableCell}>{product.product_name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.quantity_sold} pcs</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.sale_price}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.total}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.commission}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.received}</Text>
              </View>
            </View>
          ))
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFConsignorSales;
