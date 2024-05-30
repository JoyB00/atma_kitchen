import { Outlet } from "react-router-dom";

export default function RootShowIngredient() {
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
