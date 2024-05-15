import NavBar from "../../Component/Navbar";
import Footer from "../../Component/Footer";
import Button from "../../Component/Button";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { RotateLoader } from "react-spinners";
import { GetLoggedInCustomer } from "../../api/CustomerApi";

export default function CustomerProfile() {
  return (
    <>
      <NavBar />
      <div className="flex min-h-screen flex-col justify-center">
        <CustomerProfileContent />
      </div>
      <Footer />
    </>
  );
}

export function CustomerProfileContent() {
  return (
    <>
      <div className="flex flex-col px-20">
        <Header />
        <div className="py-4" />
        <div className="grid auto-cols-max grid-flow-col gap-3">
          <NavButton
            title="See order history"
            subtitle="Want to see what you have ordered?"
            link={"/CustomerDashboard/OrderHistory"}
          />
          <NavButton
            title="Edit profile"
            subtitle="Edit and view your information here"
            link={"/CustomerDashboard/EditProfile"}
          />
          {/* <NavButton
            title="Change password"
            subtitle="Ever forget your password?"
            link={"/CustomerDashboard/ChangePassword"}
          /> */}
          <NavButton
            title="Change address"
            subtitle="Delivery to any location"
          />
        </div>
      </div>
    </>
  );
}

export function Header() {
  const user = useQuery({
    queryKey: ["user"],
    queryFn: GetLoggedInCustomer,
  });

  return (
    <>
      {user.isFetching ? (
        <>
          <div className="flex justify-center py-20">
            <RotateLoader
              color="orange"
              loading={user.isFetching}
              cssOverride={{
                justifyContent: "center",
                borderColor: "red",
              }}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col text-black">
          <div className="flex flex-row items-center">
            <img
              src="https://api.dicebear.com/8.x/adventurer/svg?seed=user.fullName"
              className="w-1/12 rounded-full bg-orange-100 p-2"
            />
            <div className="px-2" />
            <div className="flex flex-col text-start">
              <span className="text-3xl font-bold text-orange-500">
                Greetings, {user.data.users.fullName}!
              </span>
              <span className="text-xl">Manage your profile here...</span>
            </div>
          </div>
          <div className="py-2" />
          <ProfileDetails userDetail={user.data} />
        </div>
      )}
    </>
  );
}

export function ProfileDetails({ userDetail }) {
  return (
    <div className="flex max-w-[42vw] flex-row items-start rounded-lg bg-gray-100 shadow-lg">
      <div className="flex flex-col items-start p-4 pe-12">
        <span className="text-xl font-bold">Profile Details</span>
        <div className="py-1" />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-start">
            <span className="font-bold">Name</span>
            <span>{userDetail.users.fullName}</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-bold">E-mail</span>
            <span>{userDetail.users.email}</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-bold">Phone number</span>
            <span>{userDetail.users.phoneNumber}</span>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex flex-col items-start">
              <span className="font-bold">Balance</span>
              <span>{userDetail.nominal_balance}</span>
            </div>

            <div className="flex flex-col items-start">
              <span className="font-bold">Points</span>
              <span>{userDetail.point}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NavButton({ title, subtitle, link }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(link);
  };
  return (
    <Card className="w-64 ">
      <div className="flex h-full flex-col items-start p-4">
        <span className="text-xl font-bold text-[#f99417]">{title}</span>
        <span className="text-md text-left text-gray-600">{subtitle}</span>
        <div className="h-full py-2" />
        <Button className="bg-orange-400" onClick={handleClick}>
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
      </div>
    </Card>
  );
}
