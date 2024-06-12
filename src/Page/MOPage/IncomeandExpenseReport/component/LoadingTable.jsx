// LoadingTable.jsx
import { RotateLoader } from "react-spinners";
import React from "react";

export default function LoadingTable({ loading }) {
  return (
    <div className="flex justify-center items-center h-full">
      <RotateLoader color="orange" loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader" />
    </div>
  );
}
