import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { formatCurrency } from "../../../../lib/FormatCurrency";

export default function ProductSalesTable({ search, data, length }) {
  const [page, setPage] = useState(1);
  const productPerPage = 8;
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;

  const handleChange = (e, p) => {
    setPage(p);
  };

  useEffect(() => {}, []);
  return (
    <>
      <table className=" mb-6 w-full rounded-2xl bg-white text-gray-500 drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <th className="px-6 text-center font-medium">No</th>
            <th className="py-8 text-start font-medium ">Product</th>
            <th className=" text-start font-medium ">Quantity</th>
            <th className="pe-6 text-start font-medium ">Price</th>
            <th className="pe-6 text-start font-medium ">Total</th>
          </tr>
        </thead>
        <motion.tbody
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {data.product
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.Product.toLowerCase().includes(search) ||
                    item.Product.includes(search);
            })
            .slice(startIndex, endIndex)
            .map((item, index) => (
              <motion.tr
                // variants={productItem}
                className="border-t-2 border-gray-100  text-black"
                key={item.id}
              >
                <td className="px-6 py-6 text-center font-medium">
                  {index + 1}
                </td>
                <td className="text-start font-medium">{item.Product}</td>
                <td className="text-start font-medium ">{item.Quantity} pcs</td>
                <td className="text-start font-medium ">
                  {formatCurrency(item.OriginalPrice)}
                </td>
                <td className="text-start font-medium ">
                  {formatCurrency(item.OriginalPrice * item.Quantity)}
                </td>
              </motion.tr>
            ))}
        </motion.tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <p className="p-8 text-end text-2xl font-semibold text-black">
                Total : {formatCurrency(data.total)}
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan={5}>
              <Pagination
                count={Math.ceil(length / productPerPage)}
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
