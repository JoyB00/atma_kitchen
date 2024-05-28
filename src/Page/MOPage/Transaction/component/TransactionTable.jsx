import {
  faCalendar,
  faListCheck,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../Component/Button";
import Badge from "../../../../Component/Badge";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import defaultImage from "../../../../assets/ProductAsset/lapis leggite.jpg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getPicture } from "../../../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAtom } from "jotai";
import { BeatLoader } from "react-spinners";

export default function TransactionTable( transaction) {
  const [page, setPage] = useState(1);
  const transactionPerPage = 8;
  const startIndex = (page - 1) * transactionPerPage;
  const endIndex = page * transactionPerPage;
  const [isOpened, setIsOpened] = useState(false);
  

  return (
    <>
      <table className=" mb-6 mt-4 w-full  rounded-2xl bg-white text-gray-500 drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <th className="py-8 ps-8 text-start font-medium">Customer</th>
            <th className="pe-6 text-start font-medium">Product Name</th>
            <th className="pe-6 text-start font-medium">Total Price</th>
            <th className="pe-6 text-start font-medium">Quantity</th>
            <th className="pe-6 text-start font-medium">Item Status</th>
            <th className="pe-6 text-center font-medium">Action</th>
          </tr>
        </thead>


        <motion.tbody
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          {/* {data
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.product_name.toLowerCase().includes(search) ||
                    item.product_name.includes(search);
            })
            .slice(startIndex, endIndex)
            .map((item) => (
              <motion.tr
                variants={productItem}
                className="border-t-2 border-gray-100  text-black"
                key={item.id}
              >
                
                <td className="text-start text-sm font-medium">
                  {item.customer.fullName}
                </td>
                <td className="text-center text-sm font-medium ">
                  {item.quantity} pcs
                </td>
                <td className="text-center text-sm font-medium">
                  {item.price} 
                </td>
                <td className="text-start font-medium ">
                  <Badge bgColor="bg-green-50" ringColor="ring-green-500">
                    <p className="p-2 text-sm">
                     {item.status}
                    </p>
                  </Badge>
                </td>
                <td className="text-center">
                  <Button
                    className=" mx-2 w-7/12 bg-transparent px-4 text-center text-[0.9rem] text-orange-500 hover:text-white"
                   
                  >
                    <p>
                      <FontAwesomeIcon
                        icon={faListCheck}
                        className="me-2 text-sm"
                      />
                      Accept
                    </p>
                  </Button>
                </td>
                <td className="text-center">
                  <Button
                    className=" mx-2 w-7/12 bg-transparent px-4 text-center text-[0.9rem] text-orange-500 hover:text-white"
                   
                  >
                    <p>
                      <FontAwesomeIcon
                        icon={faListCheck}
                        className="me-2 text-sm"
                      />
                      Deny
                    </p>
                  </Button>
                </td>
              </motion.tr>
            ))} */}

        </motion.tbody>
        
      </table>
    
    </>
  );
}
