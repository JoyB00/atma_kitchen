import { Outlet } from "react-router-dom";
export default function RootMenuPage() {
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
