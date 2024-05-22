export default function Footer() {
  return (
    <footer className=" pt-12 ">
      <div className=" grid grid-cols-4 text-start text-black sm:px-12 md:px-36 lg:px-32 xl:px-56">
        <div className="col-span-1 px-2">
          <ul className="text-gray-500">
            <li className="text-lg font-extrabold text-black">
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
      <div className="bg-orange-500 py-2 md:px-36 lg:px-56">
        <p className="font-normal text-white ">
          &copy; Copyright AtmaKitchen . All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
