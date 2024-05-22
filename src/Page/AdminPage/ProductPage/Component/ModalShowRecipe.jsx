import Modal from "../../../../Component/Modal";
import { useEffect, useRef, useState } from "react";
import { GetProductById } from "../../../../api/ProductApi";
import { BeatLoader } from "react-spinners";
import { motion } from "framer-motion";
import imageProcurement from "../../../../assets/9659497.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getPicture } from "../../../../api";
import Badge from "../../../../Component/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faDollar,
  faEgg,
  faGifts,
} from "@fortawesome/free-solid-svg-icons";
export default function ModalShowRecipe({ open, setOpen, id }) {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState([]);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setLoad(true);
    if (open) {
      const hampersDetail = async () => {
        const data = await GetProductById(id);
        setData(data);
        setTimeout(() => {
          setLoad(false);
        }, 100);
      };
      hampersDetail();
    }
  }, [open]);

  return (
    <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
      {load ? (
        <div className="mx-auto">
          <BeatLoader color="orange" loading={load} size={12} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="w-full bg-orange-500 p-4">
            <h1 className="text-3xl font-semibold text-white">
              <FontAwesomeIcon icon={faCartArrowDown} className=" me-2" />
              Ingredient Procurement Details
            </h1>
          </div>
          <div className="mt-6 grid grid-cols-5 gap-6 px-6">
            <div className="col-span-2">
              <div className=" h-[25rem]  rounded-lg border border-dashed border-gray-900/25 ">
                <LazyLoadImage
                  effect="blur"
                  alt="Ingredient Procurement Picture"
                  src={
                    data.product.product_picture
                      ? getPicture(data.product.product_picture, "product")
                      : imageProcurement
                  }
                  className="h-[25rem] w-full object-cover "
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="w-screen">
                <h1 className="mb-2 text-3xl font-semibold text-black">
                  {data.product.product_name.length < 21
                    ? data.product.product_name
                    : `${data.product.product_name.substring(0, 21)}...`}
                </h1>
                <Badge bgColor="bg-orange-500" ringColor="ring-transparent">
                  <p className=" text-lg text-white">
                    {data.product.categories.category_name}
                  </p>
                </Badge>
              </div>
              <div className="my-6 rounded-xl border-2 pb-4 ">
                <table className=" w-full text-black">
                  <thead>
                    <tr>
                      <th className="py-4 ps-4">Ingredient</th>
                      <th className="pe-2 text-center">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recipe.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td className="py-2 ps-2 ">
                            <FontAwesomeIcon
                              icon={faEgg}
                              className="me-2 text-orange-500"
                            />
                            {item.ingredients.ingredient_name}
                          </td>
                          <td className="text-center">{item.quantity}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </Modal>
  );
}
