import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import What from "./AboutPartition/WhatIsPart";
import Purpose from "./AboutPartition/PurposePart";
import JoinUs from "./AboutPartition/JoinUsPart";
export default function About() {

  return (
    <div className="w-full bg-transparent">
      <Navbar />
      <What />
      <Purpose />
      <JoinUs />
      <Footer />
    </div>
  );
}