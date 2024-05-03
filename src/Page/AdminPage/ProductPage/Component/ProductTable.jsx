import {
  faCalendar,
  faCookie,
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
import { DeleteProduct, DisableProduct } from "../../../../api/ProductApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getPicture } from "../../../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAtom } from "jotai";
import { loadEdit } from "../../HampersPage/HampersPage";
import { BeatLoader } from "react-spinners";
import ModalShowRecipe from "./ModalShowRecipe";
import ModalShowLimit from "./ModalShowLimit";

export default function ProductTable({ search, data, length }) {
  const [page, setPage] = useState(1);
  const productPerPage = 8;
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;
  const [load, setLoad] = useAtom(loadEdit);
  const [idItemLoad, setIdItemLoad] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openModalLimit, setOpenModalLimit] = useState(false);

  const handleLoadEdit = (id) => {
    setLoad(true);
    setIdItemLoad(id);
  };
  const handleOpenModal = (id) => {
    setOpenModal(true);
    setIdItemLoad(id);
  };
  const handleOpenModalLimit = (id) => {
    setOpenModalLimit(true);
    setIdItemLoad(id);
  };

  const swallDelete = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to delete ${data.product_name} ?  `,
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
            mutation.mutateAsync(data.id),
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

  const handleChange = (e, p) => {
    setPage(p);
  };

  const productItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id) => {
      console.log(id);
      await DisableProduct(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    setLoad(false);
  }, []);
  return (
    <>
      <table className=" w-full mt-4 mb-6  text-gray-500 bg-white rounded-2xl drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <th className="text-start font-medium py-8 ps-8">Product Name</th>
            <th className="text-start font-medium pe-6">Product Status</th>
            <th className="text-start font-medium pe-6">Category</th>
            <th className="text-center font-medium pe-6 ">Ready Stock</th>
            <th className="text-center font-medium pe-6 ">Daily Stock</th>
            <th className="text-start font-medium pe-6">Price</th>
            <th className="text-center font-medium ">Recipes</th>
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
                <td className="font-medium py-6 ps-4 pe-6">
                  <div className="flex items-center ">
                    <LazyLoadImage
                      effect="blur"
                      src={
                        item.product_picture
                          ? getPicture(item.product_picture, "product")
                          : defaultImage
                      }
                      alt=""
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="ps-3 text-sm">{item.product_name}</p>
                      <Button
                        withoutAnimate
                        className=" text-orange-500 bg-transparent hover:text-orange-600 text-center"
                        onClick={() => handleOpenModalLimit(item.id)}
                      >
                        <p className="text-sm text-start">
                          <FontAwesomeIcon icon={faCalendar} className="me-2" />
                          See Limit Daily
                        </p>
                      </Button>
                    </div>
                  </div>
                </td>
                <td className="font-medium text-start text-sm">
                  {item.product_status}
                </td>
                <td className="font-medium text-start text-sm">
                  {item.categories.category_name}
                </td>
                <td className="font-medium text-center text-sm ">
                  {item.ready_stock} pcs
                </td>
                <td className="font-medium text-center text-sm">
                  {item.daily_stock} pcs
                </td>
                <td className="text-start font-medium ">
                  <Badge bgColor="bg-green-50" ringColor="ring-green-500">
                    <p className="p-2 text-sm">
                      {item.product_price <= 999
                        ? item.product_price
                        : (item.product_price / 1000).toFixed(1) + "K"}
                    </p>
                  </Badge>
                </td>
                <td className="text-center">
                  <Button
                    className=" text-orange-500 px-4 text-[0.9rem] mx-2 w-7/12 bg-transparent hover:text-white text-center"
                    onClick={() => handleOpenModal(item.id)}
                  >
                    <p>
                      <FontAwesomeIcon
                        icon={faCookie}
                        className="me-2 text-sm"
                      />
                      See Recipes
                    </p>
                  </Button>
                </td>
                <td className="font-medium ">
                  <div className="flex justify-center me-2">
                    <NavLink to={`/AdminDashboard/product/${item.id}`}>
                      <Button
                        className="bg-orange-500 text-white me-2 px-4 text-[0.9rem]"
                        onClick={() => handleLoadEdit(item.id)}
                      >
                        {load && idItemLoad == item.id ? (
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
            <td colSpan={8}>
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
      <ModalShowRecipe
        id={idItemLoad}
        open={openModal}
        setOpen={setOpenModal}
      />
      <ModalShowLimit
        id={idItemLoad}
        open={openModalLimit}
        setOpen={setOpenModalLimit}
      />
    </>
  );
}
