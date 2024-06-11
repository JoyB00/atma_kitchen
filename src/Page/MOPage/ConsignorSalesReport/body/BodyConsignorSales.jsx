import React, { useEffect, useState } from "react";
import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { GetConsignorSalesReport } from "../../../../api/ReportApi";
import ConsignorTable from "../component/ConsignorTable";
import LoadingTable from "../component/LoadingTable";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import PDFConsignorSales from "../component/PDFConsignorSales";

export default function BodyConsignorSalesReport({ search }) {
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await GetConsignorSalesReport(year, month);
        console.log('Fetched Data:', result); // Log the fetched data for debugging
        setData(result); // Perbarui state dengan data yang diterima
      } catch (error) {
        setError("Failed to fetch data");
      }
      setLoading(false);
    };

    fetchData();
  }, [year, month]);

  const handlePrint = async (document, fileName) => {
    const blob = await pdf(document).toBlob();
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, "_blank");
    printWindow.addEventListener("load", () => {
      printWindow.print();
    });
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div>
      <div className="grid w-full grid-cols-4">
        <motion.div className="-z-2 col-span-4 me-2 grid grid-cols-3 rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 drop-shadow-md">
          <h1 className="col-span-2 py-8 ps-3 text-5xl font-semibold text-white">
            <FontAwesomeIcon icon={faReceipt} />
            Consignor Sales Report{" "}
          </h1>
          <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
        </motion.div>
      </div>

      <div className="mt-6 w-1/3 rounded-2xl bg-white p-4 drop-shadow-md">
        <h1 className="text-4xl font-semibold">Atma Kitchen</h1>
        <p>Jl. Centralpark No. 10 Yogyakarta</p>

        <div className="pt-6">
          <p className="font-semibold underline">CONSIGNOR SALES REPORT</p>
          <p>Bulan : {month}</p>
          <p>Tahun : {year}</p>
          <p>Print : 2 {month} {year}</p>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <div className="flex flex-col">
          <label htmlFor="year" className="mb-2">Select Year</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={handleYearChange}
            className="mt-2 w-full rounded-xl border-0 px-3 py-3 text-sm text-black shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="month" className="mb-2">Select Month</label>
          <select
            id="month"
            value={month}
            onChange={handleMonthChange}
            className="mt-2 w-full rounded-xl border-0 px-3 py-3 text-sm text-black shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          >
            {[...Array(12).keys()].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        {!loading && (
          <div className="flex items-end">
            <Button
              className="bg-orange-500 text-white"
              onClick={() =>
                handlePrint(
                  <PDFConsignorSales
                    data={data}
                    month={month}
                    year={year}
                  />,
                  "ConsignorSalesReport.pdf"
                )
              }
            >
              Print Report
            </Button>
          </div>
        )}
      </div>
      <div>
        {loading ? (
          <LoadingTable loading={loading} />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div>
            <div className="pt-6">
              <ConsignorTable data={data} search={search} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
