import { Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import {
  allIngredients,
  allCategories,
  allProducts,
} from "../../lib/FetchFunctions";
export default function RootDashboard() {
  const [categories] = useAtom(allCategories);
  const [ingredient] = useAtom(allIngredients);
  const [products] = useAtom(allProducts  );
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
