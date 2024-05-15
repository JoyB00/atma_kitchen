import { faGifts, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../Component/Button";
import ModalHampersDetail from "./ModalHampersDetail";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import defaultImage from "../../../../assets/ProductAsset/lapis leggite.jpg";
import { DeleteHampers, DisableHampers } from "../../../../api/HampersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getPicture } from "../../../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { loadEdit } from "../HampersPage";
import { useAtom } from "jotai";
import { BeatLoader } from "react-spinners";

export default function HampersTable({ data, search, length }) {
  const [page, setPage] = useState(1);
  const productPerPage = 8;
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;
  const queryClient = useQueryClient();
  const [load, setLoad] = useAtom(loadEdit);
  const [itemId, setItemId] = useState();
  const [openModal, setOpenModal] = useState(false);

  const handleLoadEdit = (id) => {
    setLoad(true);
    setItemId(id);
  };
  const handleChange = (e, p) => {
    setPage(p);
  };

  const handleOpenModal = (id) => {
    setOpenModal(true);
    setItemId(id);
  };

  const deleteHampers = useMutation({
    mutationFn: async (id) => {
      await DisableHampers(id);
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
            <th className="py-8 ps-8 text-start font-medium">Hampers Name</th>
            <th className="pe-6 text-start font-medium ">Details</th>
            <th className="pe-6 text-start font-medium ">Qty</th>
            <th className="pe-6 text-start font-medium">Price</th>
            <th className="pe-6 text-center font-medium">Action</th>
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
                <td className="py-6 ps-6 font-medium ">
                  <div className="flex items-center ">
                    <LazyLoadImage
                      effect="blur"
                      src={
                        item.hampers_picture
                          ? getPicture(item.hampers_picture, "hampers")
                          : defaultImage
                      }
                      alt=""
                      className="h-24 w-24 rounded-3xl object-cover"
                    />
                    <p className="ps-3 text-lg">{item.hampers_name}</p>
                  </div>
                </td>
                <td className="text-start font-medium">
                  <Button
                    className=" me-2 bg-transparent px-4 text-[0.9rem] text-orange-500 hover:text-white"
                    onClick={() => handleOpenModal(item.id)}
                  >
                    <FontAwesomeIcon icon={faGifts} className="me-2" />
                    See Details
                  </Button>
                </td>
                <td className="text-start font-medium">{item.quantity} pcs</td>
                <td className="text-center font-medium ">
                  {item.hampers_price <= 999
                    ? item.hampers_price
                    : (item.hampers_price / 1000).toFixed(1) + "K"}
                </td>
                <td className="font-medium ">
                  <div className="me-2 flex justify-center">
                    <NavLink to={`/AdminDashboard/hampers/${item.id}`}>
                      <Button
                        className="me-2 bg-orange-500 px-4 text-[0.9rem] text-white"
                        onClick={() => handleLoadEdit(item.id)}
                      >
                        {load && itemId == item.id ? (
                          <BeatLoader color="white" loading={load} size={12} />
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
            <td colSpan={5}>
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

      <ModalHampersDetail open={openModal} setOpen={setOpenModal} id={itemId} />
    </>
  );
}
