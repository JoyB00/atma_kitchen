import Navbar from "../../../Component/Navbar";
import Footer from "../../../Component/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../Component/Button";
export default function CheckoutPage() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="flex h-screen w-full flex-col bg-transparent">
      <Navbar />
      <div className="px-12 pt-32">
        <div className=" grid grid-cols-3 rounded-3xl border-transparent bg-gradient-to-t from-orange-400 to-orange-500 ps-6 drop-shadow-md">
          <h1 className="col-span-2 py-6 text-left font-semibold text-white">
            <FontAwesomeIcon icon={faCartShopping} /> CHECKOUT
          </h1>
          <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
        </div>
        <div className="grid grid-cols-12 gap-x-16 text-orange-500">
          <div className="col-span-8 text-start">
            <div className="mb-6 mt-4 w-full rounded-2xl border-2 border-gray-200 bg-white p-5 text-black">
              <p className="font-semibold text-gray-500">ALAMAT PENGIRIMAN</p>
              <p className="pt-4 font-semibold">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-orange-500"
                />{" "}
                Rumah &#183;{"  "}
                {user.fullName}
              </p>
              <p className="py-3">
                Rumah tembok orange depannya ada batu sikat, Lodtunduh,
                Kecamatan Ubud, Kabupaten Gianyar, Bali 80582, Ubud, Kab.
                Gianyar, Bali, 6289643938007
              </p>            </div>
            <table className="mb-6 mt-4 w-full rounded-2xl bg-white text-gray-500 drop-shadow-md">
              <thead className="border-b-2">
                <tr>
                  <th className="py-8 ps-8 text-start font-medium">
                    Hampers Name
                  </th>
                  <th className="pe-6 text-start font-medium ">Details</th>
                  <th className="pe-6 text-start font-medium ">Qty</th>
                  <th className="pe-6 text-start font-medium">Price</th>
                  <th className="pe-6 text-center font-medium">Action</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="col-span-4">
            <div className=" mt-4 rounded-2xl border-2 border-gray-200 p-5 text-start text-black">
              <p className="pb-4 font-semibold">Order Details</p>
              <div className="flex justify-between">
                <p>Total</p>
                <p>Total</p>
              </div>
              <Button className="mt-4 w-full border-orange-500 text-orange-500 hover:text-white">
                Choose Delivery Method
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto from-cyan-100 via-transparent md:pt-12">
        <Footer />
      </div>
    </div>
  );
}
