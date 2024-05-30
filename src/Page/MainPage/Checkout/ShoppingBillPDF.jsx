// ShoppingBill.js
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { formatCurrency } from "../../../lib/FormatCurrency";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
});

const ShoppingBill = ({ transaction }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Shopping Bill</Text>
      <View style={styles.section}>
        <Text>Atma Kitchen</Text>
        <Text>Jl. Centralpark No. 10 Yogyakarta</Text>
      </View>
      <View style={styles.section}>
        <Text>No Nota : {transaction.transaction.transaction_number}</Text>
        <Text>
          Order Date : {transaction.transaction.order_date?.slice(0, 16)}
        </Text>
        <Text>
          Paid Off : {transaction.transaction.paidoff_date?.slice(0, 16)}
        </Text>
        <Text>
          Pick Up Date : {transaction.transaction.pickup_date?.slice(0, 16)}
        </Text>
      </View>
      <View style={styles.section}>
        <Text>
          Customer : {transaction.transaction.customer.users.email} /{" "}
          {transaction.transaction.customer.users.fullName}
        </Text>
        <Text>{transaction.transaction.delivery?.recipient_address}</Text>
        <Text>
          Delivery Method : {transaction.transaction.delivery?.delivery_method}
        </Text>
      </View>
      <View style={styles.section}>
        {transaction.details.map((item) => (
          <View key={item.id} style={styles.section}>
            <Text>
              {item.quantity}{" "}
              {item.hampers_id
                ? item.hampers.hampers_name
                : item.product.product_name}{" "}
              - {formatCurrency(item.price)}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text>
          Total: {formatCurrency(transaction.transaction.total_price)}
        </Text>
        {transaction.transaction.delivery?.delivery_method ===
          "Delivery Courier" && (
          <Text>
            Shipping Cost (rad. {transaction.transaction.delivery.distance} km):{" "}
            {formatCurrency(transaction.transaction.delivery.shipping_cost)}
          </Text>
        )}
        {transaction.transaction.used_point !== 0 && (
          <Text>
            Discount {transaction.transaction.used_point} points: -
            {formatCurrency(transaction.transaction.used_point * 100)}
          </Text>
        )}
        <Text>
          Point from this transaction: {transaction.transaction.earned_point}
        </Text>
        <Text>
          Customer Current Point: {transaction.transaction.current_point}
        </Text>
      </View>
    </Page>
  </Document>
);

export default ShoppingBill;
