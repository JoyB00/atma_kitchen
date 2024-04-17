import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../Component/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";
import defaultImage from "../../../../assets/ProductAsset/lapis leggite.jpg";
import { DeleteProduct } from "../../../../api/ProductApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function ProductTable({ search, data, loading }) {
  const [page, setPage] = useState(1);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleChange = (e, p) => {
    setPage(p);
  };

  const productPerPage = 8;
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;

  const showSwall = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to delete ${data.nama_produk} ?  `,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          mutation.mutate(data.id);
          withReactContent(Swal).fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
  };

  {
  }

  const row = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
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
      await DeleteProduct(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <table className=" w-full mt-4 mb-6  text-gray-500 bg-white rounded-2xl drop-shadow-md">
      <thead className="border-b-2">
        <tr>
          <th className="text-start font-medium py-8 ps-8">Product Name</th>
          <th className="text-start font-medium pe-6">Category</th>
          <th className="text-start font-medium pe-6 ">Qty</th>
          <th className="text-start font-medium pe-6">Price</th>
          <th className="text-center font-medium pe-6">Action</th>
        </tr>
      </thead>
      {loading ? (
        <tbody>
          <tr>
            <td className="py-12 col-span-5" colSpan={5} align="center">
              <RotateLoader
                color="orange"
                loading={loading}
                cssOverride={{
                  justifyContent: "center",
                  // marginLeft: "50%",
                  borderColor: "red",
                }}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </td>
          </tr>
        </tbody>
      ) : (
        <motion.tbody variants={row} initial="hidden" animate="visible">
          {data
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search) ||
                    item.title.includes(search);
            })
            .slice(startIndex, endIndex)
            .map((item) => (
              <motion.tr
                variants={productItem}
                className="border-t-2 border-gray-100  text-black"
                key={item.id}
              >
                <td className="font-medium py-6 ps-6 ">
                  <div className="flex items-center ">
                    <img
                      src={defaultImage}
                      alt=""
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <p className="ps-3 text-lg">{item.nama_produk}</p>
                  </div>
                </td>
                <td className="font-medium text-start">Cake</td>
                <td className="font-medium text-start">10</td>
                <td className="text-start font-medium ">
                  {item.harga_produk <= 999
                    ? item.harga_produk
                    : (item.harga_produk / 1000).toFixed(1) + "K"}
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
                      onClick={() => showSwall(item)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="me-2" />
                      Hapus
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
        </motion.tbody>
      )}

      <tfoot>
        <tr>
          <td colSpan={5}>
            <Pagination
              count={Math.ceil(data / productPerPage)}
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
