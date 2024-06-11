import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetIncomeExpenseReport } from "../../../../api/ReportApi";
import LoadingTable from "../component/LoadingTable";
import IncomeExpenseTable from "../component/IncomeExpenseTable";
import PDFIncomeExpense from "../component/PDFIncomeExpense";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import Button from "../../../../Component/Button";

export default function BodyIncomeExpense({ search }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["incomeExpenseReport", year, month],
    queryFn: () => GetIncomeExpenseReport(year, month),
  });

  const handlePrint = async (document, fileName) => {
    const blob = await pdf(document).toBlob();
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, "_blank");
    printWindow.addEventListener("load", () => {
      printWindow.print();
    });
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    refetch();
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    refetch();
  };

  if (isLoading) return <LoadingTable loading={isLoading} />;
  if (isError) return <div>Error loading data</div>;

  return (
    <div>
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
            onClick={() => handlePrint(
              <PDFIncomeExpense data={data.data} month={month} year={year} />,
              "IncomeExpenseReport.pdf"
            )}
          >
            Print Report
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 mb-6 p-4 bg-white rounded-2xl drop-shadow-md">
        <label className="mr-4">
          Pilih Bulan:
          <select value={month} onChange={handleMonthChange} className="ml-2 p-2 border rounded-md">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </label>
        <label className="mr-4">
          Pilih Tahun:
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            className="ml-2 p-2 border rounded-md"
          />
        </label>
      </div>
      <IncomeExpenseTable search={search} data={data.data} />
    </div>
  );
}
