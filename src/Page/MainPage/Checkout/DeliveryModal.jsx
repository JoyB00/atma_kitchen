import Modal from "@mui/material/Modal";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../../../Component/Button";

export default function ModalDelivery({ open, setOpen }) {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  useEffect(() => {
    setLoad(true);
    if (open) {
      const hampersDetail = async () => {
        // const data = await GetProductById(id);
        setData(data);
        setTimeout(() => {
          setLoad(false);
        }, 100);
      };
      hampersDetail();
    }
  }, [open]);
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex size-full items-center justify-center">
          <div className="flex w-2/4 flex-col rounded-xl bg-white">
            <div className=" p-5">
              <label htmlFor="delivery_method" className="ps-2 text-black">
                Delivery Method
              </label>
              <motion.select
                {...animate}
                className="mt-2 w-full rounded-3xl border-0 px-3 py-3 text-sm text-black shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                // onChange={handleSortByAscDsc}
                name="delivery_method"
                id="delivery_method"
                // value={sortSelected}
                defaultValue="default"
              >
                <option value="default" disabled>
                  Select Delivery Methods
                </option>
                <option value="Atma Kitchen Courier">
                  Atma Kitchen Courier
                </option>
                <option value="Pick-Up">Pick-Up</option>
              </motion.select>
            </div>
            <div className="flex w-full justify-end gap-x-2 rounded-b-xl bg-gray-100 p-4">
              <Button
                className="bg-orange-500 text-white"
                onClick={() => setOpen(false)}
              >
                Save
              </Button>
              <Button
                className="border-orange-500 bg-transparent text-orange-500 hover:text-white"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
