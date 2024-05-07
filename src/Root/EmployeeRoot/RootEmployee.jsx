import { Outlet } from "react-router-dom";

export default function RootEmployee() {
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
