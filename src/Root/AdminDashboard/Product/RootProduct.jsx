import { Outlet } from "react-router-dom";

export default function RootProduct() {
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
