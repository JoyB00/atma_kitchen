import defaultImage from "../../../../assets/ProductAsset/lapis leggite.jpg";
import { RotateLoader } from "react-spinners";
import { motion } from "framer-motion";
export default function Top5Selling({ data, loading }) {
  const row = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const productItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <table className=" w-full h-[50%] mt-4 mb-6 text-gray-500 bg-white rounded-3xl drop-shadow-lg">
      <thead className="border-b-2">
        <tr>
          <th className="text-start font-medium py-8 ps-8">Top 5 Selling</th>
          <th className="text-start font-medium pe-6">Sold</th>
        </tr>
      </thead>
      {loading ? (
        <tbody>
          <tr>
            <td className="py-12 col-span-5" colSpan={5} align="center">
              <RotateLoader
                color="orange"
                loading={loading}
                cssOverride={{
                  justifyContent: "center",
                  // marginLeft: "50%",
                  borderColor: "red",
                }}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </td>
          </tr>
        </tbody>
      ) : (
        <motion.tbody variants={row} initial="hidden" animate="visible">
          {data.slice(0, 5).map((item) => (
            <motion.tr
              variants={productItem}
              className="border-t-2 border-gray-100  text-black"
              key={item.id}
            >
              <td className="font-medium py-6 ps-6 ">
                <div className="flex items-center ">
                  <img
                    src={defaultImage}
                    alt={item.nama_produk}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <p className="ps-3 text-md">{item.nama_produk}</p>
                </div>
              </td>
              <td className="font-medium text-center pe-6">100 pcs</td>
            </motion.tr>
          ))}
        </motion.tbody>
      )}
    </table>
  );
}
