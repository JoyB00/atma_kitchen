import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";

export default function RootLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
