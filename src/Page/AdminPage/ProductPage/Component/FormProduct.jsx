import Input from "../../../../Component/Input";
import FileUploader from "../../../../Component/FileUploader";
import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Form } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProduct } from "../../../../api/ProductApi";
import { useNavigate } from "react-router-dom";

export default function FormProduct({ product }) {
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
  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id) => {
      console.log(id);
      await UpdateProduct(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onSuccess: () => {
      // navigate("/dashboard/product");
    },
  });
  return (
    <Form method="patch">
      <div className="grid grid-cols-5 mt-8">
        <div className="col-span-3 pe-12">
          <h1 className="text-xl font-medium">Basic Information</h1>
          <p className="text-gray-400 font-light mb-6">
            Please enter the basic information of your product.
          </p>
          <Input
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
            withAnimate
            id="kuantitas"
            label="Quantity"
            withLabel
            placeholder="Quantity"
            type="number"
            defaultValue={product ? product.kuantitas : ""}
          />
          <Input
            withAnimate
            id="harga_produk"
            label="Price"
            withLabel
            placeholder="Quantity"
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
        <Button className="mt-8 text-white me-2 bg-orange-500 " type="submit">
          <FontAwesomeIcon icon={faSave} className="me-1" /> Save
        </Button>
      </div>
    </Form>
  );
}
