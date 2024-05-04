import { Outlet } from "react-router-dom";

export default function RootIngredient() {
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
