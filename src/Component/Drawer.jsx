export default function Drawer({ children, isOpen, setIsOpen, title }) {
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out backdrop-blur-sm " +
        (isOpen
          ? " transition-opacity opacity-100 duration-200 translate-x-0"
          : " transition-all opacity-0 translate-x-full")
      }
    >
      <section
        className={
          " w-screen max-w-sm right-0 absolute bg-white h-full shadow-xl delay-400 duration-200 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        {/* <article className="relative w-screen max-w-sm pb-10 flex flex-col space-y-6 overflow-y-scroll h-full"> */}
        <article className="relative w-screen max-w-sm pb-4 flex flex-col space-y-4 h-full">
          <header className="p-4 font-bold text-lg border-b-gray-100 border-b-2">
            {title}
          </header>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
