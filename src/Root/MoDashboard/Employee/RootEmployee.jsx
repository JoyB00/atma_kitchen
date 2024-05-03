import { Outlet } from "react-router-dom";

export default function rootEmployee() {
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
