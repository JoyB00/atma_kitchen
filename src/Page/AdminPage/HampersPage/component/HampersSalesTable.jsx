import defaultImage from "../../../../assets/ProductAsset/lapis leggite.jpg";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import { Pagination } from "@mui/material";
import { getPicture } from "../../../../api";
export default function HampersSalesTable({ data, search, length }) {
  const [page, setPage] = useState(1);
  const productPerPage = 8;
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;

  const handleChange = (e, p) => {
    setPage(p);
  };
  const row = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const productItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <table className=" w-full h-[50%] mt-4 mb-6 text-gray-500 bg-white rounded-3xl drop-shadow-lg">
      <thead className="border-b-2">
        <tr>
          <th className="text-start font-medium py-8 ps-8">Hampers Sales</th>
          <th className="text-start font-medium pe-6">Sold</th>
        </tr>
      </thead>

      <motion.tbody variants={row} initial="hidden" animate="visible">
        {data
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.hampers_name.toLowerCase().includes(search) ||
                  item.hampers_name.includes(search);
          })
          .slice(startIndex, endIndex)
          .map((item) => (
            <motion.tr
              variants={productItem}
              className="border-t-2 border-gray-100  text-black"
              key={item.id}
            >
              <td className="font-medium py-6 ps-6 ">
                <div className="flex items-center ">
                  <LazyLoadImage
                    effect="blur"
                    src={
                      item.hampers_picture
                        ? getPicture(item.hampers_picture, "hampers")
                        : defaultImage
                    }
                    alt={item.hampers_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <p className="ps-3 text-md">{item.hampers_name}</p>
                </div>
              </td>
              <td className="font-medium text-center pe-6">100 pcs</td>
            </motion.tr>
          ))}
      </motion.tbody>
      <tfoot>
        <tr>
          <td colSpan={5}>
            <Pagination
              count={Math.ceil(length / productPerPage)}
              size="small"
              className="flex justify-center mb-4"
              onChange={handleChange}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
