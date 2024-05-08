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
      <div className="flex flex-col min-h-screen justify-center">
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
        <div className="grid grid-flow-col auto-cols-max gap-3">
          <NavButton
            title="See order history"
            subtitle="Ever forget your password?"
            link={"/CustomerDashboard/ChangePassword"}
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
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <img
              src="https://api.dicebear.com/8.x/adventurer/svg?seed=user.fullName"
              className="w-1/12 bg-orange-100 p-2 rounded-full"
            />
            <div className="px-2" />
            <div className="flex flex-col text-start">
              <span className="font-bold text-orange-500 text-3xl">
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
    <div className="flex flex-row items-start bg-gray-100 rounded-lg shadow-lg max-w-[42vw]">
      <div className="flex flex-col p-4 items-start pe-12">
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
      <div className="flex flex-col items-start p-4 h-full">
        <span className="text-[#f99417] font-bold text-xl">{title}</span>
        <span className="text-gray-600 text-left text-md">{subtitle}</span>
        <div className="h-full py-2" />
        <Button className="bg-orange-400" onClick={handleClick}>
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
      </div>
    </Card>
  );
}
