import NavBar from "../../../Component/Navbar";
import Footer from "../../../Component/Footer";
import Input from "../../../Component/Input.jsx";
import Button from "../../../Component/Button.jsx";
import { useNavigate, Form } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FetchAllAddresses } from "../../../api/AddressApi.jsx";
import { RotateLoader } from "react-spinners";

export default function ModifyAddressPage() {
  const addresses = useQuery({
    queryKey: ["addresses"],
    queryFn: FetchAllAddresses,
  });

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen flex-col justify-center px-20">
        <Header />
        <div className="py-2" />
        <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-3">
          {addresses.isFetching ? (
            <div className="flex justify-center py-20">
              <RotateLoader
                color="orange"
                loading={addresses.isFetching}
                cssOverride={{
                  justifyContent: "center",
                  borderColor: "red",
                }}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            addresses.data.map((address) => (
              <AddressTile address={address} key={address.id} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export function Header() {
  return (
    <>
      <div className="flex flex-col items-start">
        <span className="text-3xl font-bold text-orange-500">
          Your Addresses
        </span>
        <span className="text-xl text-black">
          Add and modify your addresses here!
        </span>
      </div>
    </>
  );
}

export function AddressTile({ address }) {
  return (
    <div className="flex flex-col items-start rounded-lg border border-slate-200 bg-gray-100 p-4 text-black shadow-lg">
      <span className="text-xl font-bold">{address.complete_address}</span>
      <span>
        {address.subdistrict}, {address.city}
      </span>
      <span className="text-sm">{address.postal_code}</span>
    </div>
  );
}
