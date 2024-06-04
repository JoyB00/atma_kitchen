import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetMonthlySalesReport } from "../../../api/ReportApi.jsx";
import { useState, useRef } from "react";
import React from "react";
import { RotateLoader } from "react-spinners";
import { formatCurrency } from "../../../lib/FormatCurrency.jsx";
import { useReactToPrint } from "react-to-print";
import Button from "../../../Component/Button.jsx";
import BarChart from "../../AdminPage/MainDashboard/component/BarChart.jsx";
import * as chart from "../../AdminPage/MainDashboard/variable/chart.js";

export function MonthlySalesReportBody() {
  const selectedYear = useState(new Date().getFullYear());
  const monthlyTransactionList = useQuery({
    queryKey: ["monthlyTransaction"],
    queryFn: () => GetMonthlySalesReport({ year: selectedYear }),
  });
  const ref = React.createRef();
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  const Body = React.forwardRef((props, ref) => (
    <div ref={ref} className="px-6">
      <h1 className="text-4xl font-semibold">Atma Kitchen</h1>
      <p>Jl. Centralpark No. 10 Yogykarta</p>

      <div className="flex flex-col py-8">
        <span>Monthly sales report</span>
        <span>Year: {selectedYear}</span>
        <span>Print date: {new Date().toDateString()}</span>
      </div>
      {monthlyTransactionList.isFetching ? (
        <RotateLoader
          color="orange"
          loading={true}
          cssOverride={{
            justifyContent: "center",
            // marginLeft: "50%",
            borderColor: "red",
          }}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="flex flex-col">
          <MonthlySalesTable transactionList={monthlyTransactionList.data} />
          <MonthlyTransactionGraph
            transactionList={monthlyTransactionList.data}
          />
        </div>
      )}
    </div>
  ));

  return (
    <div className="flex flex-col">
      <Button className="bg-orange-500 text-white" onClick={handlePrint}>
        Print Report
      </Button>
      <div className="pt-8">
        <Body ref={ref} />
      </div>
    </div>
  );
}

export function MonthlySalesTable({ transactionList }) {
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <table className="rounded-xl bg-white">
      <thead>
        <tr>
          <th className="py-4 ps-8">Month</th>
          <th className="py-4">Sales count</th>
          <th className="py-4 pe-8">Sales total</th>
        </tr>
      </thead>

      {transactionList.count.map((item, i) => (
        <tr key={i}>
          <td className="ps-8">{monthName[i]}</td>
          <td>{transactionList.count[i]}</td>
          <td className="pe-8">{formatCurrency(transactionList.total[i])}</td>
        </tr>
      ))}
    </table>
  );
}

export function MonthlyTransactionGraph({ transactionList }) {
  const data = [
    {
      name: "Product",
      data: transactionList.total,
    },
  ];

  return (
    <div className="min-h-3/5 bg-white p-4">
      <BarChart
        chartData={data}
        chartOptions={chart.barChartOptionsConsumption}
      />
    </div>
  );
}
