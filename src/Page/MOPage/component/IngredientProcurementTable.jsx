import { faGifts, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../Component/Button";
import ModalHampersDetail from "../../AdminPage/HampersPage/component/ModalHampersDetail";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { DeleteHampers } from "../../../api/HampersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loadEdit } from "../../AdminPage/HampersPage/HampersPage";
import { useAtom } from "jotai";
import { BeatLoader } from "react-spinners";

export default function IngredientProcurementTable({ search, data, length }) {
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

  const handleOpenModal = (id) => {
    setOpenModal(true);
    setItemId(id);
  };

  const deleteHampers = useMutation({
    mutationFn: async (id) => {
      await DeleteHampers(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["hampers"]);
    },
  });

  const swalDelete = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to delete ${data.hampers_name} ?  `,
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
            deleteHampers.mutateAsync(data.id),
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
            }
          );
        }
      });
  };
  useEffect(() => {
    setLoad(false);
  }, []);
  return (
    <table className=" w-full mt-4 mb-6  text-gray-500 bg-white rounded-2xl drop-shadow-md">
      <thead className="border-b-2">
        <tr>
          <th className="text-center font-medium px-6">No</th>
          <th className="text-start font-medium py-8 ">Procurement Date</th>
          <th className="text-start font-medium px-6 ">Details</th>
          <th className="text-start font-medium pe-6 ">Total Price</th>
          <th className="text-start font-medium pe-6 ">Actions</th>
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
              : item.procurement_date.toLowerCase().includes(search) ||
                  item.procurement_date.includes(search);
          })
          .slice(startIndex, endIndex)
          .map((item, index) => (
            <motion.tr
              // variants={productItem}
              className="border-t-2 border-gray-100  text-black"
              key={item.id}
            >
              <td className="font-medium py-6 px-6 text-center">{index + 1}</td>
              <td className="font-medium text-start">
                {item.procurement_date}
              </td>
              <td className="font-medium text-start">
                {" "}
                <Button
                  className=" text-orange-500 me-2 px-4 text-[0.9rem] bg-transparent hover:text-white"
                  onClick={() => handleOpenModal(item.id)}
                >
                  <FontAwesomeIcon icon={faGifts} className="me-2" />
                  See Details
                </Button>
              </td>
              <td className="text-start font-medium ">
                {item.total_price <= 999
                  ? item.total_price
                  : (item.total_price / 1000).toFixed(1) + "K"}
              </td>
              <td className="font-medium ">
                <div className="flex justify-center me-2">
                  <NavLink to={`/AdminDashboard/product/${item.id}`}>
                    <Button
                      className="bg-orange-500 text-white me-2 px-4 text-[0.9rem]"
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
                    className="bg-transparent border-orange-500 text-orange-500 hover:text-white px-2 text-[0.9rem]"
                    onClick={() => swallDelete(item)}
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
