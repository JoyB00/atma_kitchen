import Drink from "../../assets/HomeAssets/Coffee.png";
import Button from "../../Component/Button";
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function AboutPart() {
  const navigate = useNavigate();

  const About = () => {
    navigate('/about');
  };
  return (
    <div className="h-full flex bg-gradient-to-bl to-orange-50 via-transparent from-transparent py-24">
      <div className="w-1/2 text-black flex justify-start">
        <LazyLoadImage
          effect="blur"
          src={Drink}
          alt=""
          className="drop-shadow-md"
        />
      </div>
      <div className="w-1/2 pe-44 text-start text-black">
        <h1 className="font-semibold">About</h1>
        <h1 className="mb-2 font-semibold">Atma Kitchen</h1>
        <p>
        Atma Kitchen – Where every creation is made with Heart and Soul. We are a legit bakery where passion meets precision, and every creation tells a story. Founded on the principles of quality, creativity, and community, Atma Kitchen offers a delightful array of cakes, pastries, and baked goods that cater to all tastes and occasions.
        </p>
        <Button className="me-2 mt-7 rounded-xl bg-orange-500 text-white" onClick={About}>
          Read More
        </Button>
      </div>
    </div>
  );
}
