import { Pagination } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import { getPicture } from "../../../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import { loadEdit } from "../HampersPage";
import { useAtom } from "jotai";
import { BeatLoader } from "react-spinners";

export default function CustomerTable({ data, search, length }) {
  const [page, setPage] = useState(1);
  const productPerPage = 8;
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;

  const handleChange = (e, p) => {
    setPage(p);
  };

  return (
    <>
      <table className=" w-full mt-4 mb-6  text-gray-500 bg-white rounded-2xl drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <th className="text-start font-medium text-sm py-8 ps-8">
              Full Name
            </th>
            <th className="text-start font-medium text-sm pe-6 ">Email</th>
            <th className="text-start font-medium text-sm pe-6 ">
              Phone Number
            </th>
            <th className="text-start font-medium text-sm pe-6">
              Date Of Birth
            </th>
            <th className="text-center font-medium text-sm pe-6">Point</th>
            <th className="text-center font-medium text-sm pe">
              Nominal Balance
            </th>
          </tr>
        </thead>
        <motion.tbody
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {data
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.users.fullName.toLowerCase().includes(search) ||
                    item.users.fullName.includes(search);
            })
            .slice(startIndex, endIndex)
            .map((item) => (
              <motion.tr
                //   variants={productItem}
                className="border-t-2 border-gray-100  text-black text-sm"
                key={item.id}
              >
                <td className="font-medium py-6 ps-6 text-sm">
                  <div className="flex items-center ">
                    <LazyLoadImage
                      effect="blur"
                      src={
                        item.hampers_picture
                          ? getPicture(item.hampers_picture, "hampers")
                          : "https://api.dicebear.com/8.x/adventurer/svg?seed=Abby"
                      }
                      alt="profile customer"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <p className="ps-3 ">{item.users.fullName}</p>
                  </div>
                </td>
                <td className="font-medium text-start text-sm">
                  <p className="ps-3 ">{item.users.email}</p>
                </td>
                <td className="font-medium text-start text-sm">
                  {item.users.phoneNumber}
                </td>
                <td className="text-center font-medium text-sm">
                  {item.users.dateOfBirth}
                </td>
                <td className="font-medium text-center text-sm">
                  {item.point}
                </td>
                <td className="font-medium text-center text-sm">
                  {item.nominal_balance}
                </td>
              </motion.tr>
            ))}
        </motion.tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
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
    </>
  );
}
