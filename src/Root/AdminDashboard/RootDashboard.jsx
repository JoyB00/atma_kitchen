import { Outlet } from "react-router-dom";

export default function RootDashboard() {
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
