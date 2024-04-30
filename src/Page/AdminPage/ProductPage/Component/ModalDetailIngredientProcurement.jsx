import Modal from "../../../../Component/Modal";
import { useEffect, useRef, useState } from "react";
import { GetIngredientProcurement } from "../../../../api/IngredientProcurementApi";
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
export default function ModalDetailIngredientProcurement({
  open,
  setOpen,
  id,
}) {
  const [load, setLoad] = useState(true);
  const [ingredientProcurement, setIngredientProcurement] = useState([]);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setLoad(true);
    if (open) {
      const hampersDetail = async () => {
        const data = await GetIngredientProcurement(id);
        setIngredientProcurement(data);
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
          <div className="bg-orange-500 w-full p-4">
            <h1 className="text-3xl text-white font-semibold">
              <FontAwesomeIcon icon={faCartArrowDown} className=" me-2" />
              Ingredient Procurement Details
            </h1>
          </div>
          <div className="grid grid-cols-5 gap-6 px-6 mt-6">
            <div className="col-span-2">
              <div className=" h-[25rem]  rounded-lg border border-dashed border-gray-900/25 ">
                <LazyLoadImage
                  effect="blur"
                  alt="Ingredient Procurement Picture"
                  src={imageProcurement}
                  className="object-cover h-[25rem]  w-full "
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="w-screen">
                <h1 className="text-black font-semibold text-3xl mb-2">
                  Ingredient Procurement
                </h1>
                <Badge bgColor="bg-orange-500" ringColor="ring-transparent">
                  <p className=" text-white text-lg">
                    Date :{" "}
                    {
                      ingredientProcurement.ingredient_procurement
                        .procurement_date
                    }
                  </p>
                </Badge>
              </div>
              <div className="border-2 my-8 rounded-xl pb-4 ">
                <table className=" text-black w-full">
                  <thead>
                    <tr>
                      <th className="ps-4 py-4">Ingredient</th>
                      <th className="pe-2 text-center">Quantity</th>
                      <th className="text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredientProcurement.details.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td className="py-2 ps-2 ">
                            <FontAwesomeIcon
                              icon={faEgg}
                              className="text-orange-500 me-2"
                            />
                            {item.ingredients.ingredient_name}
                          </td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-center">
                            {item.total_price <= 999
                              ? item.total_price
                              : (item.total_price / 100).toFixed(1) + "K"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <h1 className="mt-4 text-end text-2xl font-semibold text-orange-500">
                {" "}
                <FontAwesomeIcon icon={faDollar} className="me-1" /> Total Price
                :{" "}
                {ingredientProcurement.ingredient_procurement.total_price <= 999
                  ? ingredientProcurement.ingredient_procurement.total_price
                  : (
                      ingredientProcurement.ingredient_procurement.total_price /
                      1000
                    ).toFixed(1) + "K"}
              </h1>
            </div>
          </div>
        </motion.div>
      )}
    </Modal>
  );
}
