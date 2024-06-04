import { Pagination } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "../../../../Component/Badge";
import {
  faCheckSquare,
  faGifts,
  faKitchenSet,
} from "@fortawesome/free-solid-svg-icons";
import ModalDetailTransaction from "../../../AdminPage/CustomerOrderHistory/component/ModalDetailTransaction";
import { formatCurrency } from "../../../../lib/FormatCurrency";
import { Checkbox } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { RecapTransactionToProcess } from "../../../../api/MOTransactionConfirmation";
import toast from "react-hot-toast";

export default function ProcessConfirmationTable({ data, search, length }) {
  const [page, setPage] = useState(1);
  const productPerPage = 8;
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;
  const [itemId, setItemId] = useState();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = (id) => {
    setOpenModal(true);
    setItemId(id);
  };

  const handleChange = (e, p) => {
    setPage(p);
  };

  const [dataRes, setDataRes] = useState({
    pickup_date_date: data.length > 0 ? data[0].pickup_date : null,

    item: [],
  });

  const handleSetData = (event, itemNew) => {
    if (event.target.checked) {
      setDataRes({ ...dataRes, item: [...dataRes.item, itemNew] });
    } else {
      const tempData = dataRes.item.filter(
        (itemSelected) => itemSelected !== itemNew,
      );
      setDataRes({ ...dataRes, item: tempData });
    }
  };

  const handleCheckAll = (event) => {
    if (allChecked === false) {
      const updatedItems = data.slice(startIndex, endIndex);
      setDataRes({ ...dataRes, item: updatedItems });
    } else {
      setDataRes({ ...dataRes, item: [] });
    }
    setAllChecked(() => !allChecked);
  };

  const [allChecked, setAllChecked] = useState(false);

  const handleClick = (data) => {
    if (data.item.length === 0) {
      toast.error("Please select the order before", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
    } else {
      RecapTransactionToProcess(data)
        .then((res) => {
          console.log(res);
          navigate("recapOrders", { state: res });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <Button
          className="mb-6 border-orange-500 text-orange-500 hover:text-white"
          onClick={handleCheckAll}
        >
          {" "}
          <FontAwesomeIcon icon={faCheckSquare} className="pe-2" /> Select All
        </Button>
        <Button
          className="mb-6 bg-orange-500 text-white"
          onClick={() => handleClick(dataRes)}
        >
          {" "}
          <FontAwesomeIcon icon={faKitchenSet} className="pe-2" /> Process Now
        </Button>
      </div>
      <div className="w-full overflow-x-auto rounded-2xl bg-white">
        {console.log("data", dataRes)}
        <table className="-2xl mt-2 w-lvw bg-white text-gray-500 drop-shadow-md ">
          <thead className="border-b-2">
            <tr>
              <th className="py-8 ps-8 text-start text-sm font-medium">
                Select
              </th>
              <th className="py-8 ps-8 text-start text-sm font-medium">
                Status
              </th>
              <th className="text-start text-sm font-medium ">Details</th>
              <th className="text-start text-sm font-medium ">
                Transaction No
              </th>
              <th className="text-start text-sm font-medium ">Pick Up Date</th>
              <th className="text-start text-sm font-medium ">
                Payment Method
              </th>
              <th className="text-start text-sm font-medium ">Used Point</th>
              <th className="text-start text-sm font-medium ">Earned Point</th>
              <th className="text-start text-sm font-medium ">
                Payment Amount
              </th>
              <th className="text-start text-sm font-medium ">Total Price</th>
              <th className="pe-6 text-start text-sm font-medium">Tip</th>
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
              .map((item, index) => (
                <motion.tr
                  //   variants={productItem}
                  className="border-t-2 border-gray-100  text-black"
                  key={item.id}
                >
                  <td className="py-0 ps-6 text-start text-sm font-medium ">
                    <div className="flex items-center justify-center">
                      <Checkbox
                        value={item.id}
                        checked={dataRes.item.includes(item)}
                        onChange={(event) => handleSetData(event, item)}
                      />
                    </div>
                  </td>
                  <td className="py-6 ps-6 text-start text-sm font-medium ">
                    <Badge bgColor="bg-green-100" ringColor="ring-green-500">
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
                  <td className="text-sm font-medium ">
                    <div className="flex items-start ">
                      <p className="ps-3 ">{item.transaction_number}</p>
                    </div>
                  </td>

                  <td className="text-start text-sm font-medium">
                    {item.pickup_date?.slice(0, 16)}
                  </td>
                  <td className="text-start text-sm font-medium ">
                    {item.payment_method}
                  </td>
                  <td className="text-start text-sm font-medium">
                    {item.used_point}
                  </td>
                  <td className="text-start text-sm font-medium">
                    {item.earned_point}
                  </td>
                  <td className="text-start text-sm font-medium">
                    {formatCurrency(item.payment_amount)}
                  </td>
                  <td className="text-start text-sm font-medium">
                    {formatCurrency(item.total_price)}
                  </td>
                  <td className="pe-6 text-start text-sm font-medium">
                    {item.tip < 0 ? 0 : formatCurrency(item.tip)}
                  </td>
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
