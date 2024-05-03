import { Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import {
  allIngredients,
  allCategories,
  allProducts,
  allConsignors,
  allCustomers,
} from "../../lib/FetchFunctions";
export default function RootAdminDashboard() {
  const [categories] = useAtom(allCategories);
  const [ingredient] = useAtom(allIngredients);
  const [products] = useAtom(allProducts);
  const [consignors] = useAtom(allConsignors);
  const [customers] = useAtom(allCustomers);
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
