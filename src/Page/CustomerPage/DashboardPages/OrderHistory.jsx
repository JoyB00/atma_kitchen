import Navbar from "../../../Component/Navbar";
import Footer from "../../../Component/Footer";

export default function OrderHistory() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen justify-center px-24">
        <Header />
      </div>
      <Footer />
    </>
  );
}

export function Header() {
  return (
    <div className="flex flex-col text-start">
      <span className="font-bold text-orange-500 text-3xl">Order History</span>
      <span className="text-xl">Did you miss our cake?</span>
    </div>
  );
}
