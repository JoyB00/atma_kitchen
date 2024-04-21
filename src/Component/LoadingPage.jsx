import { RotateLoader } from "react-spinners";
export default function LoadingPage() {
  return (
    <>
      <div className="h-screen w-screen bg-orange-500 flex justify-center items-center">
        <RotateLoader
          color="orange"
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
}
