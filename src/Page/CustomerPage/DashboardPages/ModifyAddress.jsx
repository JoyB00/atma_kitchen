import NavBar from "../../../Component/Navbar";
import Footer from "../../../Component/Footer";
import Input from "../../../Component/Input.jsx";
import Button from "../../../Component/Button.jsx";
import { Form } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FetchAllAddresses } from "../../../api/AddressApi.jsx";
import { RotateLoader } from "react-spinners";
import { useState } from "react";
import { Modal } from "@mui/material";
import delivery from "../../../assets/delivery.json";
import Lottie from "lottie-react";
import { AddAddress } from "../../../api/AddressApi";

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
        <div className="py-4" />
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

export function AddAddressModal() {
  const [isOpened, setIsOpened] = useState(false);
  const [data, setData] = useState({});
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const openModal = () => {
    setIsOpened(true);
  };
  const closeModal = () => {
    setIsOpened(false);
  };

  const submit = async () => {
    try {
      const response = AddAddress(data);
      return response;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <Button onClick={openModal} className="bg-orange-500">
        New Address
      </Button>

      <Modal open={isOpened} onClose={closeModal}>
        <div className="flex size-full items-center justify-center">
          <div className="flex min-h-20 w-3/4 flex-col rounded-md bg-slate-100 p-8">
            <span className="text-2xl font-bold text-orange-600">
              Add Address
            </span>
            <span className="text-base font-semibold text-black">
              Make sure it is correct, so we can deliver faster 😊
            </span>
            <div className="py-2" />
            <div className="flex flex-row justify-around">
              <Form>
                <Input
                  onChange={handleChange}
                  withAnimate
                  label="Full address"
                  id="fullAddress"
                  type="text"
                  placeholder="Full address"
                />
                <Input
                  onChange={handleChange}
                  withAnimate
                  label="City"
                  id="city"
                  type="text"
                  placeholder="City"
                />
                <Input
                  onChange={handleChange}
                  withAnimate
                  label="Subdistrict"
                  id="subdistrict"
                  type="text"
                  placeholder="Subdistrict"
                />
                <Input
                  onChange={handleChange}
                  withAnimate
                  label="Postal code"
                  id="postalCode"
                  type="text"
                  placeholder="Postal code"
                />
                <div className="flex flex-row justify-center pt-2">
                  <Button
                    className="bg-orange-500 text-sm text-white"
                    onClick={submit}
                  >
                    Save
                  </Button>
                  <div className="px-1" />
                  <Button className="border-orange-500 text-sm text-orange-500 hover:text-white">
                    Cancel
                  </Button>
                </div>
              </Form>
              <div className="min-h-full w-px bg-slate-300" />
              <Lottie animationData={delivery} className="w-1/3" />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export function AddressTile({ address }) {
  return (
    <div className="flex flex-row items-start justify-between rounded-lg border border-slate-400 bg-gray-100 p-4 text-black shadow-md">
      <div className="flex flex-col text-start">
        <span className="text-xl font-bold">{address.complete_address}</span>
        <span>
          {address.subdistrict}, {address.city}
        </span>
        <span className="text-sm">{address.postal_code}</span>
      </div>
      <div className="flex flex-col text-white">
        {/* i'll switch this to fontawesome icon sometime 😅 */}
        <Button className="border-orange-500 text-orange-500 hover:text-white">
          Edit
        </Button>
        <div className="py-1" />
        <Button className="border-red-500 text-red-500 hover:text-white">
          Delete
        </Button>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col items-start text-start">
        <span className="text-3xl font-bold text-orange-500">
          Your Addresses
        </span>
        <span className="text-xl text-black">
          Add and modify your addresses here!
        </span>
      </div>
      <AddAddressModal />
    </div>
  );
}
