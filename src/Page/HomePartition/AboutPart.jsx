import Drink from "../../assets/HomeAssets/Coffee.png";
import Button from "../../Component/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function AboutPart() {
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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident
          recusandae rerum nam nisi sed ad corporis aliquid, ratione iure a
          obcaecati distinctio cum nesciunt ab dolorum quibusdam pariatur maxime
          ea. Optio voluptas voluptatum impedit id eos deleniti sunt soluta quis
          nam sint! Quam cumque consequatur corrupti aperiam explicabo rerum,
          nisi omnis nihil ipsam tenetur pariatur alias dignissimos quibusdam
          unde nobis. Quas eveniet, possimus commodi deleniti cumque facere
          officiis rem eligendi autem. Unde ea saepe dolores odit doloremque
          ullam tenetur eum? Cumque ea, doloribus fugiat nihil doloremque
          molestiae incidunt. Ab, ea?
        </p>
        <Button className="me-2 mt-7 rounded-xl bg-orange-500 text-white">
          Read More
        </Button>
      </div>
    </div>
  );
}
