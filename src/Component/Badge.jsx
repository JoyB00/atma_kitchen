export default function Badge({ children, ringColor, bgColor }) {
  return (
    <span
      className={`inline-flex items-center rounded-xl ${bgColor} px-2 py-1 font-medium ring-1 ring-inset ${ringColor}`}
    >
      {children}
    </span>
  );
}
