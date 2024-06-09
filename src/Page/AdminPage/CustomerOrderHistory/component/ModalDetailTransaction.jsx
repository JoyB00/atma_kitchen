import Modal from "../../../../Component/Modal";
import { useEffect, useRef, useState } from "react";
import { GetDetailTransaction } from "../../../../api/TransactionApi";
import { BeatLoader } from "react-spinners";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import imageProcurement from "../../../../assets/9659497.jpg";
import Badge from "../../../../Component/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCookie,
  faEgg,
  faGifts,
} from "@fortawesome/free-solid-svg-icons";
import { getPicture } from "../../../../api";
import { formatCurrency } from "../../../../lib/FormatCurrency";

export default function ModalDetailTransaction({ open, setOpen, id }) {
  const [load, setLoad] = useState(true);
  const [details, setDetails] = useState([]);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setLoad(true);
    if (open) {
      const hampersDetail = async () => {
        const data = await GetDetailTransaction(id);
        setDetails(data);
        setTimeout(() => {
          setLoad(false);
        }, 300);
      };
      hampersDetail();
    }
  }, [open]);

  return (
    <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
      {console.log("detail", details)}
      {load ? (
        <div className="mx-auto">
          <BeatLoader color="orange" loading={load} size={12} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-full bg-orange-500 p-4">
            <h1 className="text-3xl font-semibold text-white">
              <FontAwesomeIcon icon={faCartShopping} className=" me-2" />
              Transaction Details
            </h1>
          </div>
          <div className="mt-6 grid grid-cols-5 gap-6 px-6">
            <div className="col-span-5">
              <div className="w-screen">
                <h1 className="pb-2 font-semibold text-black ">Detail Items</h1>
                <Badge bgColor="bg-orange-500" ringColor="ring-transparent">
                  <p className=" text-lg text-white">
                    Total Price :{" "}
                    {details.transaction.total_price <= 999
                      ? details.transaction.total_price
                      : (details.transaction.total_price / 1000).toFixed(1) +
                        "K"}
                  </p>
                </Badge>
              </div>
              <div className="my-8 rounded-xl border-2 pb-4 ">
                <table className=" w-full text-black">
                  <thead>
                    <tr>
                      <th className="py-4 ps-4">Item</th>
                      <th className="pe-2 text-center">Quantity</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.details.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td className="py-2 ps-2  text-sm">
                            <div className="flex">
                              <LazyLoadImage
                                src={
                                  item.product
                                    ? getPicture(
                                        item.product.product_picture,
                                        "product",
                                      )
                                    : getPicture(
                                        item.hampers.hampers_picture,
                                        "hampers",
                                      )
                                }
                                className="rounded-xl object-cover"
                                effect="blur w-20 h-20"
                              />

                              <div className="my-auto ms-3 text-lg font-semibold ">
                                {item.product
                                  ? item.product.product_name
                                  : item.hampers.hampers_name}
                              </div>
                            </div>
                          </td>
                          <td className="text-center text-sm">
                            {item.quantity} pcs
                          </td>
                          <td className="text-center text-sm">
                            {item.price <= 999
                              ? item.price
                              : (item.price / 1000).toFixed(1) + "K"}
                          </td>
                          <td className="text-center text-sm">
                            {item.total_price <= 999
                              ? item.total_price
                              : (item.total_price / 1000).toFixed(1) + "K"}
                          </td>
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
