import Navbar from "../Component/Navbar";
import Welcome from "./ContactPartition/WelcomePart";
import Footer from "../Component/Footer";
export default function Contact() {

  return (
    <div className="w-full bg-transparent">
      <Navbar />
      <Welcome />
      <Footer />
    </div>
  );
}