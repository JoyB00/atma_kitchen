export default function Footer() {
  return (
    <footer className=" pt-12 max-w-screen overflow-x-clip">
      <div className=" text-black grid grid-cols-4 text-start xl:px-56 lg:px-32 md:px-36 sm:px-12 ">
        <div className="col-span-1 px-2">
          <ul className="text-gray-500">
            <li className="font-extrabold text-lg text-black">
              Atma <span className="text-orange-500">Kitchen</span>
            </li>
            <li className="mt-2 sm:text-sm">
              <p>Atma Kitchen merupakan toko kue terbaik di Indonesia</p>
            </li>
            <li></li>
          </ul>
        </div>
        <div className="col-span-1 px-2">
          <ul className="text-gray-500">
            <li className="font-semibold text-black">Resource</li>
            <li className="my-3 sm:text-sm">Resource</li>
            <li className="my-3 sm:text-sm">Contact Us</li>
            <li className="my-3 sm:text-sm">FAQ</li>
          </ul>
        </div>
        <div className="col-span-1 px-2">
          <ul className="text-gray-500">
            <li className="font-semibold text-black">Menu</li>
            <li className="my-3 sm:text-sm">Cake</li>
            <li className="my-3 sm:text-sm">Bread</li>
            <li className="my-3 sm:text-sm">Drink</li>
            <li className="my-3 sm:text-sm">Hampers</li>
          </ul>
        </div>
        <div className="col-span-1 px-2">
          <ul className="text-gray-500">
            <li className="font-semibold text-black">Contact</li>
            <li className="my-3 sm:text-sm">
              Babarsari Street, Sleman, Yogyakarta, Indonesia
            </li>
            <li className="my-3 sm:text-sm">(0361) 123 456 789</li>
            <li className="my-3 sm:text-sm">atmaKitchen@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="py-2 bg-orange-500 lg:px-56 md:px-36 max-w-screen">
        <p className="text-white font-normal ">
          &copy; Copyright AtmaKitchen . All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
