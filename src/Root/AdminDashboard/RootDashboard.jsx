import { Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import { allCategories } from "../../lib/CategoryFunctions";
import allIngredients from "../../lib/IngredientFunctions";
export default function RootDashboard() {
  const [categories] = useAtom(allCategories);
  const [ingredient] = useAtom(allIngredients);
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
