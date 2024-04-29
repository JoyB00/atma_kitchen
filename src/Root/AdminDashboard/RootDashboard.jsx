import { Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import {
  allIngredients,
  allCategories,
  allProducts,
  allConsignors,
} from "../../lib/FetchFunctions";
export default function RootDashboard() {
  const [categories] = useAtom(allCategories);
  const [ingredient] = useAtom(allIngredients);
  const [products] = useAtom(allProducts);
  const [consignors] = useAtom(allConsignors);
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
