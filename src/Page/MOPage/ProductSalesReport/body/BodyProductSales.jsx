import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCookie,
  faE,
  faEgg,
  faFilter,
  faKitchenSet,
  faMoneyBill,
  faReceipt,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetProductSalesReport } from "../../../../api/ReportApi";
import ProductSalesTable from "../component/ProductSalesTable";
import LoadingTable from "../component/LoadingTable";
import { MONTH } from "../lib/month";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import PDFProductSales from "../component/PDFProductSales";

export default function BodyProductSales({ search }) {
  const [month, setMonth] = useState(MONTH[0]);
  const queryClient = useQueryClient();
  const [load, setLoad] = useState(false);

  const productSalesReport = useQuery({
    queryKey: ["productSales"],
    queryFn: () => GetProductSalesReport(month.value),
  });

  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleChange = (event, index) => {
    const selectedMonthValue = parseInt(event.target.value);
    const selectedMonthObject = MONTH.find(
      (item) => item.value === selectedMonthValue,
    );
    setMonth(selectedMonthObject);
  };

  const handlePrint = async (document, fileName) => {
    const blob = await pdf(document).toBlob();
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, "_blank");
    printWindow.addEventListener("load", () => {
      printWindow.print();
    });
  };

  useEffect(() => {
    queryClient.invalidateQueries(["productSales"]);
  }, [month]);

  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="grid w-full grid-cols-4">
        {console.log("month", month)}
        <motion.div className="-z-2 col-span-4 me-2 grid grid-cols-3 rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 drop-shadow-md">
          <h1 className="col-span-2 py-8 ps-3 text-5xl font-semibold text-white">
            <FontAwesomeIcon icon={faReceipt} /> Product Sales Report{" "}
          </h1>
          <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
        </motion.div>
      </div>

      <div className="mt-6 w-1/3 rounded-2xl bg-white p-4 drop-shadow-md">
        <h1 className="text-4xl font-semibold">Atma Kitchen</h1>
        <p>Jl. Centralpark No. 10 Yogykarta</p>

        <div className="pt-6">
          <p className="font-semibold underline">PRODUCT SALES REPORT</p>
          <p>Bulan : {month.name}</p>
          <p>Tahun : 2024</p>
          <p>Print : 2 {month.name} 2024</p>
        </div>
      </div>
      <div className="flex justify-between pt-6">
        <div>
          <label htmlFor="customer_id">Select Customer</label>
          <motion.select
            {...animate}
            className="mt-2 w-full rounded-xl border-0 px-3 py-3 text-sm text-black shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            onChange={handleChange}
            name="customer_id"
            id="customer_id"
            // value={month.value}
          >
            {MONTH.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </motion.select>
        </div>{" "}
        {!productSalesReport.isFetching && (
          <>
            <Button
              className="bg-orange-500 text-white"
              onClick={() =>
                handlePrint(
                  <PDFProductSales
                    data={productSalesReport.data || []}
                    month={month}
                  />,
                  `Product_Sales_Report_${month.name}_2024.pdf`,
                )
              }
            >
              Print Report
            </Button>
          </>
        )}
      </div>
      <div>
        {productSalesReport.isFetching ? (
          <LoadingTable loading={productSalesReport.isFetching} />
        ) : (
          <div>
            {console.log("data", productSalesReport.data)}
            <div className="pt-6">
              <ProductSalesTable
                search={search}
                data={productSalesReport.data}
                length={productSalesReport.data.product.length}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
