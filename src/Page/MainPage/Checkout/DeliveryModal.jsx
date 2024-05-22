import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ModalDelivery({ open, setOpen }) {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState([]);
  const cancelButtonRef = useRef(null);
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
        <div className="item-center flex min-h-full justify-center">
          <div className="flex w-2/3 flex-col rounded-2xl bg-white  p-5">
            <motion.select
              {...animate}
              className="mt-2 w-full rounded-3xl border-0 px-3 py-3 text-sm text-black shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              // onChange={handleSortByAscDsc}
              name="category"
              id="category"
              // value={sortSelected}
              defaultValue="default"
            >
              <option value="default" disabled>
                Select Delivery Methods
              </option>
              <option value="Atma Kitchen Courier">Atma Kitchen Courier</option>
              <option value="Pick-Up">Pick-Up</option>
            </motion.select>
          </div>
        </div>
      </Modal>
    </>
  );
}
