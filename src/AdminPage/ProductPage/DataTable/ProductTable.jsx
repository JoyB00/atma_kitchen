import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../Component/Button";
import Product from "../../../assets/ProductAsset/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ProductTable() {
  return (
    <table className=" w-full mt-4  text-gray-500 bg-white rounded-2xl drop-shadow-md">
      <thead className="border-b-2">
        <tr>
          <th className="text-start font-medium py-8 ps-8">Product Name</th>
          <th className="text-start font-medium pe-6">Category</th>
          <th className="text-start font-medium pe-6 ">Qty</th>
          <th className="text-start font-medium pe-6">Price</th>
          <th className="text-center font-medium pe-6">Action</th>
        </tr>
      </thead>
      <tbody>
        {Product.map((item) => (
          <tr className="border-t-2 border-gray-100  text-black" key={item.no}>
            <td className="font-medium py-6 ps-6 ">
              <div className="flex items-center ">
                <img
                  src={item.src}
                  alt=""
                  className="w-16 h-16 rounded-full object-cover"
                />
                <p className="ps-3 text-xl">{item.title}</p>
              </div>
            </td>
            <td className="font-medium text-start">Cake</td>
            <td className="font-medium text-start">10</td>
            <td className="text-start font-medium ">{item.price}</td>
            <td className="font-medium ">
              <div className="flex justify-center ">
                <Button className="bg-orange-500 text-white me-2">
                  <FontAwesomeIcon icon={faPencil} className="me-2" />
                  Edit
                </Button>
                <Button className="bg-transparent border-orange-500 text-orange-500 hover:text-white">
                  <FontAwesomeIcon icon={faTrash} className="me-2" />
                  Hapus
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
