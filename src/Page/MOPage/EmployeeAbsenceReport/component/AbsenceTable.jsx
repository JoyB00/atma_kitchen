import { Pagination } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AbsenceTable({ search, data }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const handleChange = (e, p) => {
    setPage(p);
  };

  return (
    <>
      <table className="mb-6 w-full rounded-2xl bg-white text-gray-500 drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <th className="px-6 py-4 text-center font-medium">No</th>
            <th className="px-6 py-4 text-start font-medium">Employee Name</th>
            <th className="px-6 py-4 text-start font-medium">Total Attendance</th>
            <th className="px-6 py-4 text-start font-medium">Total Absent</th>
            <th className="px-6 py-4 text-start font-medium">Daily Wages</th>
            <th className="px-6 py-4 text-start font-medium">Bonus</th>
            <th className="px-6 py-4 text-start font-medium">Total Wages</th>
          </tr>
        </thead>
        <motion.tbody
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {data.slice(startIndex, endIndex).map((item, index) => (
            <motion.tr
              className="border-t-2 border-gray-100 text-black"
              key={index}
            >
              <td className="px-6 py-4 text-center font-medium">{startIndex + index + 1}</td>
              <td className="px-6 py-4 text-start font-medium">{item.employee_name}</td>
              <td className="px-6 py-4 text-start font-medium">{item.total_attendance}</td>
              <td className="px-6 py-4 text-start font-medium">{item.total_absent}</td>
              <td className="px-6 py-4 text-start font-medium">{item.daily_wages}</td>
              <td className="px-6 py-4 text-start font-medium">{item.bonus}</td>
              <td className="px-6 py-4 text-start font-medium">{item.total_wages}</td>
            </motion.tr>
          ))}
        </motion.tbody>
        <tfoot>
          <tr>
            <td colSpan={7}>
              <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                size="small"
                className="mb-4 flex justify-center"
                onChange={handleChange}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
