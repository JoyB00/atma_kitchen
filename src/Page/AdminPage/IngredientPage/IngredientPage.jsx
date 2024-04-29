import Button from "../../../Component/Button";
import Modal from "../../../Component/Modal";
import { useState, useRef } from "react";
import MenuComponent from "../../../Component/Menu";
export default function IngredientPage() {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  return (
    <div>
      <MenuComponent />
    </div>
  );
}
