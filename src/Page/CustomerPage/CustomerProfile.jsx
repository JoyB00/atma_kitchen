import NavBar from "../../Component/Navbar";
import Footer from "../../Component/Footer";
import Button from "../../Component/Button";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

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
        <div className="py-2" />
        <div className="grid grid-flow-col auto-cols-max gap-3">
          <NavButton
            title="Edit profile"
            subtitle="Edit and view your information here"
            link={"/CustomerDashboard/EditProfile"}
          />
          <NavButton
            title="Change password"
            subtitle="Ever forget your password?"
          />
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
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <>
      <div className="flex flex-col items-start">
        <span className="font-bold text-orange-500 text-3xl">
          Greetings, {user.fullName}!
        </span>
        <span className="text-xl">Manage your profile here...</span>
      </div>
    </>
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
