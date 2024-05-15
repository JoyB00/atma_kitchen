import { faGifts, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../Component/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { DeleteOtherProcurement } from "../../../../api/OtherProcurementApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loadEdit } from "../../../AdminPage/HampersPage/HampersPage";
import { useAtom } from "jotai";
import { BeatLoader } from "react-spinners";

export default function OtherProcurementTable({ search, data, length }) {
  const [page, setPage] = useState(1);
  const productPerPage = 8;
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;
  const queryClient = useQueryClient();
  const [load, setLoad] = useAtom(loadEdit);
  const [itemId, setItemId] = useState();
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e, p) => {
    setPage(p);
  };
  const handleLoadEdit = (id) => {
    setLoad(true);
    setItemId(id);
  };

  const deleteProcurement = useMutation({
    mutationFn: async (id) => {
      await DeleteOtherProcurement(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["otherProcurements"]);
    },
  });

  const swalDelete = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to delete this ?  `,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          toast.promise(
            deleteProcurement.mutateAsync(data.id),
            {
              loading: "Loading",
              success: "Your file has been Deleted",
              error: (err) => err,
            },
            {
              style: {
                backgroundColor: "#000000",
                color: "#ffffff",
              },
              position: "top-center",
            },
          );
        }
      });
  };
  useEffect(() => {
    setLoad(false);
  }, []);
  return (
    <>
      <table className=" mb-6 mt-4 w-full  rounded-2xl bg-white text-gray-500 drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <th className="text-center font-medium ">No</th>
            <th className="py-8 text-start font-medium ">Procurement Date</th>
            <th className="text-start font-medium  ">Item Name</th>
            <th className="pe-4 text-center font-medium ">Quantity</th>
            <th className="text-start font-medium  ">Price</th>
            <th className="text-start font-medium  ">Total Price</th>
            <th className="text-center font-medium  ">Actions</th>
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
                : item.item_name.toLowerCase().includes(search) ||
                    item.item_name.includes(search);
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
                <td className="text-start font-medium">
                  {item.procurement_date}
                </td>
                <td className="text-start font-medium"> {item.item_name}</td>
                <td className="pe-4 text-center font-medium">
                  {" "}
                  {item.quantity}
                </td>
                <td className="text-start font-medium ">
                  {item.price <= 999
                    ? item.price
                    : (item.price / 1000).toFixed(1) + "K"}
                </td>
                <td className="text-start font-medium ">
                  {item.total_price <= 999
                    ? item.total_price
                    : (item.total_price / 1000).toFixed(1) + "K"}
                </td>
                <td className="font-medium ">
                  <div className="me-2 flex justify-center">
                    <NavLink to={`/MoDashboard/otherProcurements/${item.id}`}>
                      <Button
                        className="me-2 bg-orange-500 px-4 text-[0.9rem] text-white"
                        onClick={() => handleLoadEdit(item.id)}
                      >
                        {load && itemId == item.id ? (
                          <BeatLoader color="white" loading={load} size={10} />
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faPencil} className="me-2" />
                            Edit
                          </>
                        )}
                      </Button>
                    </NavLink>
                    <Button
                      className="border-orange-500 bg-transparent px-2 text-[0.9rem] text-orange-500 hover:text-white"
                      onClick={() => swalDelete(item)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="me-2" />
                      Delete
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
        </motion.tbody>
        <tfoot>
          <tr>
            <td colSpan={7}>
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
