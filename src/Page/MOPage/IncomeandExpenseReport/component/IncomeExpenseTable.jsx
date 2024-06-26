// IncomeExpenseTable.jsx
import React from "react";
import { Pagination } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";

export default function IncomeExpenseTable({ search, data }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const handleChange = (e, p) => {
    setPage(p);
  };

  console.log('Data in Table Component:', data); // Debug log

  const filteredIncome = Object.entries(data?.Income || {})
    .filter(([type]) => type.toLowerCase().includes(search.toLowerCase()));

  const filteredExpenses = Object.entries(data?.Expenses || {})
    .filter(([type]) => type.toLowerCase().includes(search.toLowerCase()));

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold">Income</h2>
      <table className="mb-6 w-full rounded-2xl bg-white text-gray-500 drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <th className="px-6 text-center font-medium">No</th>
            <th className="py-8 text-start font-medium">Type</th>
            <th className="text-start font-medium">Amount</th>
          </tr>
        </thead>
        <motion.tbody initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {filteredIncome.slice(startIndex, endIndex).map(([type, amount], index) => (
            <tr key={type} className="border-b-2">
              <td className="px-6 text-center">{startIndex + index + 1}</td>
              <td className="py-8">{type}</td>
              <td>{formatCurrency(amount)}</td>
            </tr>
          ))}
        </motion.tbody>
      </table>

      <h2 className="text-3xl font-semibold">Expenses</h2>
      <table className="w-full rounded-2xl bg-white text-gray-500 drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <th className="px-6 text-center font-medium">No</th>
            <th className="py-8 text-start font-medium">Type</th>
            <th className="text-start font-medium">Amount</th>
          </tr>
        </thead>
        <motion.tbody initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {filteredExpenses.slice(startIndex, endIndex).map(([type, amount], index) => (
            <tr key={type} className="border-b-2">
              <td className="px-6 text-center">{startIndex + index + 1}</td>
              <td className="py-8">{type}</td>
              <td>{formatCurrency(amount)}</td>
            </tr>
          ))}
        </motion.tbody>
      </table>
      <Pagination count={Math.ceil(filteredIncome.length / itemsPerPage)} page={page} onChange={handleChange} />
    </div>
  );
}
