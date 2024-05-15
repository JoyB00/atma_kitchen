import Modal from "../../../../Component/Modal";
import { useEffect, useRef, useState } from "react";
import { GetConsignor } from "../../../../api/ConsignorApi";
import { BeatLoader } from "react-spinners";
import { motion } from "framer-motion";
import imageProcurement from "../../../../assets/9659497.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getPicture } from "../../../../api";
import Badge from "../../../../Component/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCookie,
  faDollar,
  faEgg,
  faGifts,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
export default function ModalProductConsignor({ open, setOpen, id }) {
  const [load, setLoad] = useState(true);
  const [consignor, setConsignor] = useState([]);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setLoad(true);
    if (open) {
      const hampersDetail = async () => {
        const data = await GetConsignor(id);
        setConsignor(data);
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
              Consignor Products
            </h1>
          </div>
          <div className="mt-6 grid grid-cols-5 gap-6 px-6">
            <div className="col-span-2">
              <div className=" h-[25rem]  rounded-lg border border-dashed border-gray-900/25 ">
                <LazyLoadImage
                  effect="blur"
                  alt="Ingredient Procurement Picture"
                  src={imageProcurement}
                  className="h-[25rem] w-full  object-cover "
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="w-screen">
                <h1 className="mb-2 text-3xl font-semibold text-black">
                  {consignor.consignor.consignor_name}
                </h1>
                <Badge bgColor="bg-orange-500" ringColor="ring-transparent">
                  <p className=" text-lg text-white">
                    <FontAwesomeIcon icon={faPhone} className="me-2" />
                    {consignor.consignor.phone_number}
                  </p>
                </Badge>
              </div>
              <div className="my-8 rounded-xl border-2 pb-4 ">
                <table className=" w-full text-black">
                  <thead>
                    <tr>
                      <th className="py-4 ps-4">Product</th>
                      <th className="pe-2 text-center">Ready Stock</th>
                      <th className="pe-2 text-center">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consignor.product.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td className="py-2 ps-2 text-sm ">
                            <FontAwesomeIcon
                              icon={faCookie}
                              className="me-2 text-orange-500"
                            />
                            {item.product_name}
                          </td>
                          <td className="text-center text-sm">
                            {item.ready_stock} pcs
                          </td>
                          <td className="pe-2 text-center text-sm">
                            {item.product_price <= 999
                              ? item.product_price
                              : (item.product_price / 1000).toFixed(1) + "K"}
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
