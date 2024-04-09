import Drink from "../../assets/HomeAssets/Coffee.png";
import Button from "../../Component/Button";
export default function AboutPart() {
  return (
    <div className="h-screen flex bg-gradient-to-bl to-orange-50 via-current from-transparent py-24">
      <div className="w-1/2 text-black">
        <img src={Drink} alt="" className="w-8/12 drop-shadow-md" />
      </div>
      <div className="w-1/2 text-black text-start pe-44">
        <h1 className="font-semibold">About</h1>
        <h1 className="font-semibold mb-2">Atma Kitchen</h1>
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
        <Button className="rounded-xl bg-orange-500 text-white me-2 mt-7">
          Read More
        </Button>
      </div>
    </div>
  );
}
