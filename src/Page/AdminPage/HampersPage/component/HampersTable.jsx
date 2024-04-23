import { faGifts, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../Component/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import defaultImage from "../../../../assets/ProductAsset/lapis leggite.jpg";
import { DeleteProduct } from "../../../../api/ProductApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getPicture } from "../../../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function HampersTable({ data, search, length }) {
  const [page, setPage] = useState(1);
  const productPerPage = 8;
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;

  const handleChange = (e, p) => {
    setPage(p);
  };
  return (
    <table className=" w-full mt-4 mb-6  text-gray-500 bg-white rounded-2xl drop-shadow-md">
      <thead className="border-b-2">
        <tr>
          <th className="text-start font-medium py-8 ps-8">Hampers Name</th>
          <th className="text-start font-medium pe-6 ">Details</th>
          <th className="text-start font-medium pe-6 ">Qty</th>
          <th className="text-start font-medium pe-6">Price</th>
          <th className="text-center font-medium pe-6">Action</th>
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
              : item.hampers_name.toLowerCase().includes(search) ||
                  item.hampers_name.includes(search);
          })
          .slice(startIndex, endIndex)
          .map((item) => (
            <motion.tr
              //   variants={productItem}
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
                    alt=""
                    className="w-24 h-24 rounded-3xl object-cover"
                  />
                  <p className="ps-3 text-lg">{item.hampers_name}</p>
                </div>
              </td>
              <td className="font-medium text-start">
                <Button
                  className=" text-orange-500 me-2 px-4 text-[0.9rem] bg-transparent hover:text-white"
                  // onClick={() => swallDelete(item)}
                >
                  <FontAwesomeIcon icon={faGifts} className="me-2" />
                  See Details
                </Button>
              </td>
              <td className="font-medium text-start">{item.quantity} pcs</td>
              <td className="text-start font-medium ">
                {item.hampers_price <= 999
                  ? item.hampers_price
                  : (item.hampers_price / 1000).toFixed(1) + "K"}
              </td>
              <td className="font-medium ">
                <div className="flex justify-center me-2">
                  <NavLink to={`/dashboard/product/${item.id}`}>
                    <Button className="bg-orange-500 text-white me-2 px-4 text-[0.9rem]">
                      <FontAwesomeIcon icon={faPencil} className="me-2" />
                      Edit
                    </Button>
                  </NavLink>
                  <Button
                    className="bg-transparent border-orange-500 text-orange-500 hover:text-white px-2 text-[0.9rem]"
                    // onClick={() => swallDelete(item)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="me-2" />
                    Hapus
                  </Button>
                </div>
              </td>
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
