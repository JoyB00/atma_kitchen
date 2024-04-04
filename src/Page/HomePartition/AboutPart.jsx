import Drink from "../../assets/HomeAssets/Coffee.png";
import Button from "../../Component/Button";
export default function AboutPart() {
  return (
    <div className="h-screen  flex bg-gradient-to-tl to-indigo-100 via-current from-transparent pt-44">
      <div className="w-1/2 text-black">
        <img src={Drink} alt="" className="w-8/12 drop-shadow-md" />
      </div>
      <div className="w-1/2 text-black text-start pe-44">
        <h1 className="font-semibold">About</h1>
        <h1 className="font-semibold mb-2">Atma Kitchen</h1>
        <p>
          It’s a long established fact that a reader will be distracted by the
          readable content of a page when looking at it’s layout. The Point of
          Using Lorem Ipsum
        </p>
        <p>
          It gas a more-or-less normal distribution of letters, as oppoesed to
          using ‘Content here, content here’.
        </p>
        <Button className="rounded-3xl bg-orange-500 text-white me-2 mt-7">
          Read More
        </Button>
      </div>
    </div>
  );
}
