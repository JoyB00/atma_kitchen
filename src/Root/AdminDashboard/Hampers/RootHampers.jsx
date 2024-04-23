import { Outlet } from "react-router-dom";

export default function RootHampers() {
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
