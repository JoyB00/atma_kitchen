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
      <table className=" mb-6 mt-4 w-full  rounded-2xl bg-white text-gray-500 drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <th className="py-8 ps-8 text-start text-sm font-medium">
              Full Name
            </th>
            <th className="pe-6 text-start text-sm font-medium ">Email</th>
            <th className="pe-6 text-start text-sm font-medium ">
              Phone Number
            </th>
            <th className="pe-6 text-start text-sm font-medium">
              Date Of Birth
            </th>
            <th className="pe-6 text-center text-sm font-medium">Point</th>
            <th className="pe text-center text-sm font-medium">
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
                className="border-t-2 border-gray-100  text-sm text-black"
                key={item.id}
              >
                <td className="py-6 ps-6 text-sm font-medium">
                  <div className="flex items-center ">
                    <LazyLoadImage
                      effect="blur"
                      src={
                        item.hampers_picture
                          ? getPicture(item.hampers_picture, "hampers")
                          : "https://api.dicebear.com/8.x/adventurer/svg?seed=Abby"
                      }
                      alt="profile customer"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <p className="ps-3 ">{item.users.fullName}</p>
                  </div>
                </td>
                <td className="text-start text-sm font-medium">
                  <p className="ps-3 ">{item.users.email}</p>
                </td>
                <td className="text-start text-sm font-medium">
                  {item.users.phoneNumber}
                </td>
                <td className="text-center text-sm font-medium">
                  {item.users.dateOfBirth}
                </td>
                <td className="text-center text-sm font-medium">
                  {item.point}
                </td>
                <td className="text-center text-sm font-medium">
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
