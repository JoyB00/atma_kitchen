import Input from "../../../../Component/Input";
import FileUploader from "../../../../Component/FileUploader";
import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Form } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddProduct, UpdateProduct } from "../../../../api/ProductApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Category = [
  {
    no: 1,
    name: "Cake",
  },
  {
    no: 2,
    name: "Bread",
  },
  {
    no: 3,
    name: "Drink",
  },
  {
    no: 4,
    name: "Entrusted",
  },
];
export default function FormProduct({ product }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initialState = product
    ? {
        id: product.id,
        nama_produk: product.nama_produk,
        kuantitas: product.kuantitas,
        harga_produk: product.harga_produk,
        deskripsi: product.deskripsi,
        id_kategori: product.id_kategori,
      }
    : {
        nama_produk: "",
        kuantitas: 0,
        harga_produk: 0,
        deskripsi: "",
        id_kategori: Category[0].no,
      };
  const [data, setData] = useState(initialState);

  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleChange = (event) => {
    console.log(`${event.target.name} : ${event.target.value}`);
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const addProduct = useMutation({
    mutationFn: (data) => {
      console.log(data.id_kategori);
      return AddProduct(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onSuccess: () => {
      queryClient.setQueryData(["products"], data);
      navigate("/dashboard/product");
    },
    onError: (error) => {
      throw error.message;
    },
  });

  const updateProduct = useMutation({
    mutationFn: (data) => {
      console.log(data.id);
      return UpdateProduct(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onSuccess: () => {
      queryClient.setQueryData(["products", { id: product.id }], data);
      navigate("/dashboard/product");
    },
    onError: (error) => {
      throw error.message;
    },
  });

  const swallUpdate = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to Update ${data.nama_produk} ?  `,
        text: `You won't be able to revert this!`,
        icon: `warning`,
        showCancelButton: true,
        confirmButtonColor: `#3085d6`,
        cancelButtonColor: `#d33`,
        confirmButtonText: `Yes, update it!`,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await updateProduct.mutateAsync(data);
            withReactContent(Swal).fire({
              title: `Updated!`,
              text: `Your file has been updated.`,
              icon: `success`,
            });
          } catch (error) {
            withReactContent(Swal).fire({
              title: `Something went wrong !`,
              text: error,
              icon: `error`,
            });
          }
        }
      });
  };
  const swallAdd = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to Add ${data.nama_produk} ?  `,
        text: `You won't be able to revert this!`,
        icon: `warning`,
        showCancelButton: true,
        confirmButtonColor: `#3085d6`,
        cancelButtonColor: `#d33`,
        confirmButtonText: `Yes, add it!`,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await addProduct.mutateAsync(data);
            withReactContent(Swal).fire({
              title: `Added!`,
              text: `Your Product Successful Added.`,
              icon: `success`,
            });
          } catch (error) {
            withReactContent(Swal).fire({
              title: `Something went wrong !`,
              text: error,
              icon: `error`,
            });
          }
        }
      });
  };

  return (
    <Form method={product ? "patch" : "post"}>
      <div className="grid grid-cols-5 mt-8">
        <div className="col-span-3 pe-12">
          <h1 className="text-xl font-medium">Basic Information</h1>
          <p className="text-gray-400 font-light mb-6">
            Please enter the basic information of your product.
          </p>
          <Input
            onChange={handleChange}
            withAnimate
            id="nama_produk"
            label="Product Name"
            withLabel
            placeholder="Product Name"
            type="text"
            defaultValue={
              product ? product.nama_produk : console.log("asdasdas")
            }
          />
          <Input
            onChange={handleChange}
            withAnimate
            id="kuantitas"
            label="Quantity"
            withLabel
            placeholder="Quantity"
            type="number"
            defaultValue={product ? product.kuantitas : ""}
          />
          <Input
            onChange={handleChange}
            withAnimate
            id="harga_produk"
            label="Price"
            withLabel
            placeholder="Price"
            type="number"
            defaultValue={product ? product.harga_produk : ""}
          />

          {/* category */}
          <div className="mb-2 ">
            <label htmlFor="category">Category</label>
          </div>

          <motion.select
            {...animate}
            className="block w-full text-black border-0 py-3.5 px-3 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm rounded-xl"
            onChange={handleChange}
            name="id_kategori"
            id="category"
            defaultValue={product ? product.id_kategori : Category[0].no}
          >
            {Category.map((category) => (
              <option
                value={category.no}
                key={category.no}
                selected={product && category.no === product.id_kategori}
              >
                {category.name}
              </option>
            ))}
          </motion.select>

          {/* description */}
          <div className="mb-2 mt-4">
            <label htmlFor="category">Description</label>
          </div>
          <motion.div {...animate} className="mt-2">
            <textarea
              onChange={handleChange}
              id="deskripsi"
              name="deskripsi"
              rows="5"
              className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Description"
              defaultValue={product ? product.deskripsi : ""}
            ></textarea>
          </motion.div>
        </div>
        <div className="col-span-2">
          <h1 className="text-xl font-medium">Product Image</h1>
          <p className="text-gray-400 font-light mb-12">
            Please add or change your image product.
          </p>
          <motion.div {...animate}>
            <FileUploader id="productImage" />
          </motion.div>
        </div>
      </div>
      <div className="flex justify-end sticky bottom-4   ">
        <NavLink to="/dashboard/product">
          <Button className="mt-8 text-orange-500 me-2 border-2 border-orange-500 bg-white hover:text-white">
            Discard
          </Button>
        </NavLink>
        <Button
          className="mt-8 text-white me-2 bg-orange-500 "
          type="button"
          onClick={product ? () => swallUpdate(data) : () => swallAdd(data)}
        >
          <FontAwesomeIcon icon={faSave} className="me-1" /> Save
        </Button>
      </div>
    </Form>
  );
}
