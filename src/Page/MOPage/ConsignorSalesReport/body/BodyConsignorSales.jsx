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
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import PDFConsignorSales from "../component/PDFConsignorSales";


export default function BodyConsignorSalesReport({ search }) {
  const date = new Date();
  const [month, setMonth] = useState(
    date.toLocaleString("default", { month: "long" }),
  );

  const consignorReport = useQuery({
    queryKey: ["consignorReport"],
    queryFn: GetConsignorSalesReport,
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

  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="grid w-full grid-cols-4">
        <motion.div className="-z-2 col-span-4 me-2 grid grid-cols-3 rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 drop-shadow-md">
          <h1 className="col-span-2 py-8 ps-3 text-5xl font-semibold text-white">
            <FontAwesomeIcon icon={faReceipt} />
            Ingredient Stock Report{" "}
          </h1>
          <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
        </motion.div>
      </div>

      <div className="flex justify-between pt-6">
        <div className="mt-6 w-1/3 rounded-2xl bg-white p-4 drop-shadow-md">
          <h1 className="text-4xl font-semibold">Atma Kitchen</h1>
          <p>Jl. Centralpark No. 10 Yogykarta</p>

          <div className="pt-6">
            <p className="font-semibold underline">INGREDIENT STOCK REPORT</p>
            <p>Bulan : {month}</p>
            <p>Tahun : 2024</p>
            <p>Print : 2 {month} 2024</p>
          </div>
        </div>
        <div></div>{" "}
        {!ingredientReport.isFetching && (
          <div className="flex items-end">
            <Button
              className="bg-orange-500 text-white"
              onClick={() =>
                handlePrint(
                  <PDFConsignorSales
                    data={ingredientReport.data || []}
                    month={month}
                  />,
                )
              }
            >
              Print Report
            </Button>
          </div>
        )}
      </div>
      <div>
        {consignorReport.isFetching ? (
          <LoadingTable loading={consignorReport.isFetching} />
        ) : (
          <div>
            {console.log("data", consignorReport.data)}
            <div className="pt-6">
              <consignorStockTable
                search={search}
                data={consignorReport.data}
                length={consignorReport.data.length}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
