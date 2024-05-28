import { Outlet } from "react-router-dom";

export default function rootTransaction() {
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
