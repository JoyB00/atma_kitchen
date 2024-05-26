import { Pagination } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "../../../../Component/Badge";
import { faGifts } from "@fortawesome/free-solid-svg-icons";
import ModalDetailTransaction from "./ModalDetailTransaction";

export default function OrderHistoryTable({ data, search, length }) {
  const [page, setPage] = useState(1);
  const productPerPage = 8;
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;
  const [itemId, setItemId] = useState();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (id) => {
    setOpenModal(true);
    setItemId(id);
  };

  const handleChange = (e, p) => {
    setPage(p);
  };

  return (
    <>
      <div className="w-full overflow-x-auto rounded-2xl bg-white">
        <table className="-2xl mt-2 w-lvw bg-white text-gray-500 drop-shadow-md ">
          <thead className="border-b-2">
            <tr>
              <th className="py-8 ps-8 text-start font-medium">Status</th>
              <th className="text-start font-medium ">Details</th>
              <th className="text-start font-medium ">Order Date</th>
              <th className="text-start font-medium ">Paid Off Date</th>
              <th className="text-start font-medium ">Pick Up Date</th>
              <th className="text-start font-medium ">Payment Method</th>
              <th className="text-start font-medium ">Used Point</th>
              <th className="text-start font-medium ">Earned Point</th>
              <th className="text-start font-medium ">Total Price</th>
              <th className="pe-6 text-start font-medium">Tip</th>
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
                  : item.status.toLowerCase().includes(search) ||
                      item.status.includes(search);
              })
              .slice(startIndex, endIndex)
              .map((item) => (
                <motion.tr
                  //   variants={productItem}
                  className="border-t-2 border-gray-100  text-black"
                  key={item.id}
                >
                  <td className="py-6 ps-6 text-start font-medium ">
                    <Badge bgColor="bg-orange-100" ringColor="ring-orange-500">
                      <p className="p-2 ">{item.status}</p>
                    </Badge>
                  </td>
                  <td>
                    {" "}
                    <Button
                      className=" me-2 bg-transparent px-4 text-[0.9rem] text-orange-500 hover:text-white"
                      onClick={() => handleOpenModal(item.id)}
                    >
                      <FontAwesomeIcon icon={faGifts} className="me-2" />
                      See Details
                    </Button>
                  </td>
                  <td className="font-medium ">
                    <div className="flex items-start ">
                      <p className="ps-3 ">{item.order_date}</p>
                    </div>
                  </td>
                  <td className="text-start font-medium">
                    {item.paidoff_date}
                  </td>
                  <td className="text-start font-medium">{item.pickup_date}</td>
                  <td className="text-start font-medium ">
                    {item.payment_method}
                  </td>
                  <td className="text-start font-medium">{item.used_point}</td>
                  <td className="text-start font-medium">
                    {item.earned_point}
                  </td>
                  <td className="text-start font-medium">{item.total_price}</td>
                  <td className="pe-6 text-start font-medium">{item.tip}</td>
                </motion.tr>
              ))}
          </motion.tbody>
          <tfoot>
            <tr>
              <td colSpan={10}>
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
      </div>
      <ModalDetailTransaction
        id={itemId}
        open={openModal}
        setOpen={setOpenModal}
      />
    </>
  );
}
