import { Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import { allIngredients, allCategories } from "../../lib/FetchFunctions";
export default function RootDashboard() {
  const [categories] = useAtom(allCategories);
  const [ingredient] = useAtom(allIngredients);
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
