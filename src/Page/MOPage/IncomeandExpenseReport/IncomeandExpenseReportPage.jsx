// IncomeandExpenseReportPage.jsx
import Sidebar from "../../AdminPage/AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../../AdminPage/AdminComponent/NavbarAdmin/NavbarAdmin";
import FooterDashboard from "../../../Component/FooterDashboard";
import { useState, useEffect } from "react";
import BodyIncomeExpenseReport from "./body/BodyIncomeExpense";
import { GetIncomeExpenseReport } from "../../../api/ReportApi";
import LoadingTable from "./component/LoadingTable";

export default function IncomeandExpenseReportPage() {
  const [search, setSearch] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [reportData, setReportData] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      setLoading(true);
      const data = await GetIncomeExpenseReport(year, month);
      console.log('Fetched Data:', data); // Debug log
      setReportData(data?.data || null);
      setLoading(false);
    }

    fetchReport();
  }, [year, month]);

  return (
    <div className="flex size-full min-h-screen min-w-full items-start bg-orange-100/50">
      <Sidebar role={user.role_id} />
      <div className="w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin
          url={
            user.role_id == 2
              ? "/AdminDashboard"
              : user.role_id == 3
              ? "/MoDashboard/incomeExpenseReport"
              : ""
          }
          page="Income and Expense Report"
          setSearch={setSearch}
        />
        <div className="mt-32 px-4">
          {loading ? (
            <LoadingTable loading={loading} />
          ) : (
            <BodyIncomeExpenseReport
              search={search}
              reportData={reportData}
              year={year}
              month={month}
              setYear={setYear}
              setMonth={setMonth}
            />
          )}
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
