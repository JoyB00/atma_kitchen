import { RotateLoader } from "react-spinners";

export default function LoadingTable({ loading }) {
  return (
    <div className="flex justify-center items-center">
      <RotateLoader color="orange" loading={loading} size={50} />
    </div>
  );
}
