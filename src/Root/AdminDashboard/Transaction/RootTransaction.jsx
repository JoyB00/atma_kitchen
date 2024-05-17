import { Outlet } from "react-router-dom";

export default function RootTransaction() {
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
