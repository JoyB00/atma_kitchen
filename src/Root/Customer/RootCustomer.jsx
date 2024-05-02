import { Outlet } from "react-router-dom";
import { useAtom } from "jotai";

// import { allCustomers } from "../../lib/FetchFunctions";

export default function RootCustomer() {
  // const [customers] = useAtom(allCustomers);
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
