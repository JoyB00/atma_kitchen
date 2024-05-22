import NavBar from "../../../Component/Navbar";
import Footer from "../../../Component/Footer";
import Input from "../../../Component/Input.jsx";
import Button from "../../../Component/Button.jsx";
import { Form } from "react-router-dom";
import { FetchAllAddresses } from "../../../api/AddressApi.jsx";
import { RotateLoader } from "react-spinners";
import { useState } from "react";
import { Modal } from "@mui/material";
import delivery from "../../../assets/delivery.json";
import Lottie from "lottie-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AddAddress,
  EditAddress,
  DeleteAddress,
} from "../../../api/AddressApi";
import { BeatLoader } from "react-spinners";
import { toast } from "react-hot-toast";

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
  const [isChildOpened, setIsChildOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  const openChildModal = () => {
    setIsChildOpened(true);
  };
  const closeChildModal = () => {
    setIsChildOpened(false);
  };

  const queryClient = useQueryClient();
  const submit = async () => {
    try {
      const response = await AddAddress(data);
      closeModal();
      closeChildModal();
      await queryClient.refetchQueries("addresses");
      setIsLoading(false);
      toast.success("The address has been added succesfully!");
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
                  label="Complete address"
                  id="complete_address"
                  type="text"
                  placeholder="Complete address"
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
                  id="postal_code"
                  type="text"
                  placeholder="Postal code"
                />
                <div className="flex flex-row justify-center pt-2">
                  <Button
                    className="bg-orange-500 text-sm text-white"
                    onClick={openChildModal}
                  >
                    Save
                  </Button>
                  <Modal open={isChildOpened} onClose={closeChildModal}>
                    <div className="flex size-full items-center justify-center text-black">
                      <div className="flex min-h-20 flex-col items-center rounded-md bg-slate-100 p-16">
                        <span className="text-lg">
                          Are you sure wanna add this address?
                        </span>
                        <div className="py-2" />
                        <div className="flex flex-row">
                          <Button
                            className="bg-orange-500 text-sm text-white"
                            onClick={submit}
                          >
                            {isLoading ? (
                              <BeatLoader
                                color="white"
                                loading={true}
                                size={10}
                              />
                            ) : (
                              <span>Yes, it is correct</span>
                            )}
                          </Button>
                          <div className="px-1" />
                          <Button
                            className="border-orange-500 text-sm text-orange-500 hover:text-white"
                            onClick={closeChildModal}
                          >
                            Nope, go back
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                  <div className="px-1" />
                  <Button
                    className="border-orange-500 text-sm text-orange-500 hover:text-white"
                    onClick={closeModal}
                  >
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

export function EditAddressForm({ address }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isChildOpened, setIsChildOpened] = useState(false);
  const [data, setData] = useState({
    id: address.id,
    complete_address: address.complete_address,
    city: address.city,
    subdistrict: address.subdistrict,
    postal_code: address.postal_code,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const openModal = () => {
    setIsOpened(true);
  };
  const closeModal = () => {
    setIsOpened(false);
  };
  const openChildModal = () => {
    setIsChildOpened(true);
  };
  const closeChildModal = () => {
    setIsChildOpened(false);
  };

  const queryClient = useQueryClient();
  const submit = async () => {
    try {
      setIsLoading(true);
      const response = await EditAddress(data);
      closeModal();
      closeChildModal();
      await queryClient.refetchQueries("addresses");
      setIsLoading(false);
      toast.success("The address has been edited succesfully!");
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* i'll switch this to fontawesome icon sometime 😅 */}
      <Button
        className="border-orange-500 text-orange-500 hover:text-white"
        onClick={openModal}
      >
        Edit
      </Button>

      <Modal open={isOpened} onClose={closeModal}>
        <div className="flex size-full items-center justify-center">
          <div className="flex min-h-20 w-1/2 flex-col rounded-md bg-slate-100 p-8">
            <span className="text-2xl font-bold text-orange-600">
              Edit Address
            </span>
            <span className="text-base font-semibold text-black">
              Make sure it is correct, so we can deliver faster 😊
            </span>
            <div className="py-2" />
            <Form>
              <Input
                onChange={handleChange}
                withAnimate
                label="Complete address"
                id="complete_address"
                type="text"
                placeholder="Complete address"
                defaultValue={address.complete_address}
              />
              <Input
                onChange={handleChange}
                withAnimate
                label="City"
                id="city"
                type="text"
                placeholder="City"
                defaultValue={address.city}
              />
              <Input
                onChange={handleChange}
                withAnimate
                label="Subdistrict"
                id="subdistrict"
                type="text"
                placeholder="Subdistrict"
                defaultValue={address.subdistrict}
              />
              <Input
                onChange={handleChange}
                withAnimate
                label="Postal code"
                id="postal_code"
                type="text"
                placeholder="Postal code"
                defaultValue={address.postal_code}
              />
              <div className="flex flex-row justify-center pt-2">
                <Button
                  className="bg-orange-500 text-sm text-white"
                  onClick={openChildModal}
                >
                  Save
                </Button>
                <Modal open={isChildOpened} onClose={closeChildModal}>
                  <div className="flex size-full items-center justify-center text-black">
                    <div className="flex min-h-20 flex-col items-center rounded-md bg-slate-100 p-16">
                      <span className="text-lg">
                        Are you sure wanna edit this address?
                      </span>
                      <div className="py-2" />
                      <div className="flex flex-row">
                        <Button
                          className="bg-orange-500 text-sm text-white"
                          onClick={submit}
                        >
                          {isLoading ? (
                            <BeatLoader
                              color="white"
                              loading={true}
                              size={10}
                            />
                          ) : (
                            <span>Yes, it is correct</span>
                          )}
                        </Button>
                        <div className="px-1" />
                        <Button
                          className="border-orange-500 text-sm text-orange-500 hover:text-white"
                          onClick={closeChildModal}
                        >
                          Nope, go back
                        </Button>
                      </div>
                    </div>
                  </div>
                </Modal>
                <div className="px-1" />
                <Button
                  className="border-orange-500 text-sm text-orange-500 hover:text-white"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export function DeleteAddressButton({ address }) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const openModal = () => {
    setIsOpened(true);
  };
  const closeModal = () => {
    setIsOpened(false);
  };

  const submit = async () => {
    try {
      setIsLoading(true);
      const response = await DeleteAddress(address.id);
      await queryClient.refetchQueries("addresses");
      setIsLoading(false);
      closeModal();
      toast.success("The address has been deleted succesfully!");
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        className="border-red-500 text-red-500 hover:text-white"
        onClick={openModal}
      >
        Delete
      </Button>
      <Modal open={isOpened} onClose={closeModal}>
        <div className="flex size-full items-center justify-center">
          <div className="flex min-h-20 w-1/2 flex-col rounded-md bg-slate-100 p-8">
            <span className="text-2xl font-bold text-orange-600">
              Delete Address
            </span>
            <span className="text-black">
              Are you sure to delete the address below? This action cannot be
              undone.
            </span>
            <div className="py-1" />
            <div className="flex flex-col rounded-lg border border-gray-300 bg-slate-200 p-4 text-slate-800 shadow-md">
              <span className="text-lg font-bold">
                {address.complete_address}
              </span>
              <span>
                {address.subdistrict}, {address.city}
              </span>
              <span>{address.postal_code}</span>
            </div>
            <div className="py-2" />
            <div className="flex flex-row">
              <Button className="bg-red-500 text-white" onClick={submit}>
                {isLoading ? (
                  <BeatLoader color="white" loading={true} size={10} />
                ) : (
                  <span>Yes, do as I say!</span>
                )}
              </Button>
              <div className="px-1" />
              <Button className="text-slate-600" onClick={closeModal}>
                Nope, go back
              </Button>
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
        <EditAddressForm address={address} />
        <div className="py-1" />
        <DeleteAddressButton address={address} />
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
