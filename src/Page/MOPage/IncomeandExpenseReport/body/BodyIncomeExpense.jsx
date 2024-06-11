// BodyIncomeExpenseReport.jsx
import React from 'react';
import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import IncomeExpenseTable from "../component/IncomeExpenseTable";
import PDFIncomeExpense from "../component/PDFIncomeExpense";
import { pdf } from "@react-pdf/renderer";

export default function BodyIncomeExpenseReport({ search, reportData, year, month, setYear, setMonth }) {
  console.log('Report Data in Body Component:', reportData); // Debug log

  const handlePrint = async (document) => {
    const blob = await pdf(document).toBlob();
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, "_blank");
    printWindow.addEventListener("load", () => {
      printWindow.print();
    });
  };

  return (
    <div>
      <div className="grid w-full grid-cols-4">
        <motion.div className="-z-2 col-span-4 me-2 grid grid-cols-3 rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 drop-shadow-md">
          <h1 className="col-span-2 py-8 ps-3 text-5xl font-semibold text-white">
            <FontAwesomeIcon icon={faReceipt} />
            Income and Expense Report
          </h1>
          <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
        </motion.div>
      </div>

      <div className="flex justify-between pt-6">
        <div className="mt-6 w-1/3 rounded-2xl bg-white p-4 drop-shadow-md">
          <h1 className="text-4xl font-semibold">Atma Kitchen</h1>
          <p>Jl. Centralpark No. 10 Yogyakarta</p>
          <div className="pt-6">
            <p className="font-semibold underline">INCOME AND EXPENSE REPORT</p>
            <p>Bulan: {month}</p>
            <p>Tahun: {year}</p>
            <p>Print: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <div>
          <Button
            className="bg-orange-500 text-white"
            onClick={() =>
              handlePrint(
                <PDFIncomeExpense data={reportData} month={month} year={year} />
              )
            }
          >
            Print Report
          </Button>
        </div>
      </div>

      <div className="pt-6">
        <IncomeExpenseTable search={search} data={reportData} />
      </div>
    </div>
  );
}
