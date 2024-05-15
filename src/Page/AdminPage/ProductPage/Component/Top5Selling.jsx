import defaultImage from "../../../../assets/ProductAsset/lapis leggite.jpg";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getPicture } from "../../../../api";
export default function Top5Selling({ data }) {
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
    <table className=" mb-6 mt-4 h-[50%] w-full rounded-3xl bg-white text-gray-500 drop-shadow-lg">
      <thead className="border-b-2">
        <tr>
          <th className="py-8 ps-8 text-start font-medium">Top 5 Selling</th>
          <th className="pe-6 text-start font-medium">Sold</th>
        </tr>
      </thead>

      <motion.tbody variants={row} initial="hidden" animate="visible">
        {data.slice(0, 5).map((item) => (
          <motion.tr
            variants={productItem}
            className="border-t-2 border-gray-100  text-black"
            key={item.id}
          >
            <td className="py-6 ps-6 font-medium ">
              <div className="flex items-center ">
                <LazyLoadImage
                  effect="blur"
                  src={
                    item.product_picture
                      ? getPicture(item.product_picture, "product")
                      : defaultImage
                  }
                  alt={item.product_name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <p className="text-md ps-3">{item.product_name}</p>
              </div>
            </td>
            <td className="pe-6 text-center font-medium">100 pcs</td>
          </motion.tr>
        ))}
      </motion.tbody>
    </table>
  );
}
