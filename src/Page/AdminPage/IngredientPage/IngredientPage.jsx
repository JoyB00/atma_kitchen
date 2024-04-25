import Button from "../../../Component/Button";
import Modal from "../../../Component/Modal";
import { useState, useRef } from "react";
export default function IngredientPage() {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  return (
    <div>
      <Button className="text-black" onClick={() => setOpen(true)}>
        add
      </Button>
      <Modal cancelButtonRef={cancelButtonRef} open={open} setOpen={setOpen} />
      <h1 className="text-black">Dendy</h1>
    </div>
  );
}
