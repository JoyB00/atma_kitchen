import { HashLoader } from "react-spinners";
export default function LoadingPage() {
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-orange-500">
        <HashLoader
          color="orange"
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
}
