import Modal from "../../../../Component/Modal";
import { useEffect, useRef, useState } from "react";
import { GetHampersById } from "../../../../api/HampersApi";
import { BeatLoader } from "react-spinners";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getPicture } from "../../../../api";
import Badge from "../../../../Component/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookie, faEgg, faGifts } from "@fortawesome/free-solid-svg-icons";
export default function ModalHampersDetail({ open, setOpen, id }) {
  const [load, setLoad] = useState(true);
  const [hampers, setHampers] = useState([]);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setLoad(true);
    if (open) {
      const hampersDetail = async () => {
        const data = await GetHampersById(id);
        setHampers(data);
        setTimeout(() => {
          setLoad(false);
        }, 300);
      };
      hampersDetail();
    }
  }, [open]);

  return (
    <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
      {console.log(hampers.details)}
      {load ? (
        <div className="mx-auto">
          <BeatLoader color="orange" loading={load} size={12} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-orange-500 w-full p-4">
            <h1 className="text-3xl text-white font-semibold">
              <FontAwesomeIcon icon={faGifts} className=" me-2" />
              Hampers Details
            </h1>
          </div>
          <div className="grid grid-cols-5 gap-6 px-6 mt-6">
            <div className="col-span-2">
              <div className="mt-2 h-full rounded-lg border border-dashed border-gray-900/25 px-2">
                <LazyLoadImage
                  effect="blur"
                  alt="Hampers Picture"
                  src={getPicture(hampers.hampers.hampers_picture, "hampers")}
                  className="object-cover h-[30rem] w-full "
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="w-screen">
                <h1 className="text-black font-semibold ">
                  {hampers.hampers.hampers_name.length < 11
                    ? hampers.hampers.hampers_name
                    : `${hampers.hampers.hampers_name.substring(0, 11)}...`}
                </h1>
                <Badge bgColor="bg-orange-500" ringColor="ring-transparent">
                  <p className=" text-white text-lg">
                    Price :{" "}
                    {hampers.hampers.hampers_price <= 999
                      ? hampers.hampers.hampers_price
                      : (hampers.hampers.hampers_price / 1000).toFixed(1) + "K"}
                  </p>
                </Badge>
              </div>
              <div className="border-2 mt-4 rounded-xl ">
                <ul className="text-black p-4">
                  {hampers.details.map((item) => {
                    return (
                      <li key={item.id} className="mb-3">
                        {item.ingredient_id ? (
                          <>
                            <FontAwesomeIcon
                              icon={faEgg}
                              className="text-orange-500 me-2"
                            />
                            {item.ingredients.ingredient_name}
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon
                              icon={faCookie}
                              className="text-orange-500 me-2"
                            />
                            {item.product.product_name}
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </Modal>
  );
}
