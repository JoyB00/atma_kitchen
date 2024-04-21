import { Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import { allCategories } from "../../lib/CategoryFunctions";
export default function RootLayout() {
  const [categories] = useAtom(allCategories);
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
