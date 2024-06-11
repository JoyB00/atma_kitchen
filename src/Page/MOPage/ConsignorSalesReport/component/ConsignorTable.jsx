import { Pagination } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ConsignorTable({ search, data }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const handleChange = (e, p) => {
    setPage(p);
  };

  const filteredData = data.filter(item => 
    item.consignor_name.toLowerCase().includes(search.toLowerCase()) ||
    item.products.some(product => 
      product.product_name.toLowerCase().includes(search.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(startIndex, endIndex);

  console.log('Table Data:', data); // Log the table data for debugging

  return (
    <>
      <table className="mb-6 w-full rounded-2xl bg-white text-gray-500 drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <th className="px-6 py-4 text-center font-medium">No</th>
            <th className="px-6 py-4 text-start font-medium">Consignor</th>
            <th className="px-6 py-4 text-start font-medium">Product Name</th>
            <th className="px-6 py-4 text-start font-medium">Quantity Sold</th>
            <th className="px-6 py-4 text-start font-medium">Sale Price</th>
            <th className="px-6 py-4 text-start font-medium">Total</th>
            <th className="px-6 py-4 text-start font-medium">Commission</th>
            <th className="px-6 py-4 text-start font-medium">Received</th>
          </tr>
        </thead>
        <motion.tbody
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {paginatedData.flatMap((item, index) =>
            item.products.map((product, productIndex) => (
              <motion.tr
                className="border-t-2 border-gray-100 text-black"
                key={`${index}-${productIndex}`}
              >
                {productIndex === 0 && (
                  <td
                    className="px-6 py-4 text-center font-medium"
                    rowSpan={item.products.length}
                  >
                    {startIndex + index + 1}
                  </td>
                )}
                {productIndex === 0 && (
                  <td
                    className="px-6 py-4 text-start font-medium"
                    rowSpan={item.products.length}
                  >
                    {item.consignor_name}
                  </td>
                )}
                <td className="px-6 py-4 text-start font-medium">
                  {product.product_name}
                </td>
                <td className="px-6 py-4 text-start font-medium">
                  {product.quantity_sold} pcs
                </td>
                <td className="px-6 py-4 text-start font-medium">
                  {product.sale_price}
                </td>
                <td className="px-6 py-4 text-start font-medium">
                  {product.total}
                </td>
                <td className="px-6 py-4 text-start font-medium">
                  {product.commission}
                </td>
                <td className="px-6 py-4 text-start font-medium">
                  {product.received}
                </td>
              </motion.tr>
            ))
          )}
        </motion.tbody>
        <tfoot>
          <tr>
            <td colSpan={8}>
              <Pagination
                count={Math.ceil(filteredData.length / itemsPerPage)}
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
