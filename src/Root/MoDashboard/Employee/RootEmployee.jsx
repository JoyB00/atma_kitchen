import { Outlet } from "react-router-dom";

export default function rootEmployee() {
  return (
    <main classname="w-full">
      <Outlet />
    </main>
  );
}
