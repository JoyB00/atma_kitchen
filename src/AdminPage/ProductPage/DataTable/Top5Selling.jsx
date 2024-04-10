import Product from "../../../assets/ProductAsset/Product";
export default function Top5Selling() {
  return (
    <table className=" w-full h-[50%] mt-4 mb-6 text-gray-500 bg-white rounded-3xl drop-shadow-lg">
      <thead className="border-b-2">
        <tr>
          <th className="text-start font-medium py-8 ps-8">Top 5 Selling</th>
          <th className="text-start font-medium pe-6">Sold</th>
        </tr>
      </thead>
      <tbody>
        {Product.slice(0, 5).map((item) => (
          <tr className="border-t-2 border-gray-100  text-black" key={item.no}>
            <td className="font-medium py-6 ps-6 ">
              <div className="flex items-center ">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <p className="ps-3 text-xl">{item.title}</p>
              </div>
            </td>
            <td className="font-medium text-center pe-6">100 pcs</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
