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
          <div className="bg-orange-500 w-full p-4">
            <h1 className="text-3xl text-white font-semibold">
              <FontAwesomeIcon icon={faCartArrowDown} className=" me-2" />
              Consignor Products
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
                  {consignor.consignor.consignor_name}
                </h1>
                <Badge bgColor="bg-orange-500" ringColor="ring-transparent">
                  <p className=" text-white text-lg">
                    <FontAwesomeIcon icon={faPhone} className="me-2" />
                    {consignor.consignor.phone_number}
                  </p>
                </Badge>
              </div>
              <div className="border-2 my-8 rounded-xl pb-4 ">
                <table className=" text-black w-full">
                  <thead>
                    <tr>
                      <th className="ps-4 py-4">Product</th>
                      <th className="pe-2 text-center">Ready Stock</th>
                      <th className="pe-2 text-center">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consignor.product.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td className="text-sm py-2 ps-2 ">
                            <FontAwesomeIcon
                              icon={faCookie}
                              className="text-orange-500 me-2"
                            />
                            {item.product_name}
                          </td>
                          <td className="text-sm text-center">
                            {item.ready_stock} pcs
                          </td>
                          <td className="text-sm text-center pe-2">
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
