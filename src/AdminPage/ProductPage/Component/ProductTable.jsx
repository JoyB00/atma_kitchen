import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../Component/Button";
import Product from "../../../assets/ProductAsset/Product";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function ProductTable() {
  const [page, setPage] = useState(1);
  const handleChange = (e, p) => {
    setPage(p);
  };

  const productPerPage = 8;
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;

  const showSwall = () => {
    withReactContent(Swal)
      .fire({
        title: "Are you sure ?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          withReactContent(Swal).fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
  };

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
      <tbody>
        {Product.slice(startIndex, endIndex).map((item) => (
          <tr className="border-t-2 border-gray-100  text-black" key={item.no}>
            <td className="font-medium py-6 ps-6 ">
              <div className="flex items-center ">
                <img
                  src={item.src}
                  alt=""
                  className="w-16 h-16 rounded-full object-cover"
                />
                <p className="ps-3 text-xl">{item.title}</p>
              </div>
            </td>
            <td className="font-medium text-start">Cake</td>
            <td className="font-medium text-start">10</td>
            <td className="text-start font-medium ">{item.price}</td>
            <td className="font-medium ">
              <div className="flex justify-center me-2">
                <NavLink to={`/dashboard/product/${item.no}`}>
                  <Button className="bg-orange-500 text-white me-2 px-4">
                    <FontAwesomeIcon icon={faPencil} className="me-2" />
                    Edit
                  </Button>
                </NavLink>
                <Button
                  className="bg-transparent border-orange-500 text-orange-500 hover:text-white px-2"
                  onClick={showSwall}
                >
                  <FontAwesomeIcon icon={faTrash} className="me-2" />
                  Hapus
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={5}>
            <Pagination
              count={Math.ceil(Product.length / productPerPage)}
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
