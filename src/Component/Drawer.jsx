export default function Drawer({ children, isOpen, setIsOpen, title }) {
  return (
    <main
      className={
        " fixed inset-0 z-10 transform overflow-hidden bg-gray-900 bg-opacity-25 backdrop-blur-sm ease-in-out " +
        (isOpen
          ? " translate-x-0 opacity-100 transition-opacity duration-200"
          : " translate-x-full opacity-0 transition-all")
      }
    >
      <section
        className={
          " delay-400 absolute right-0 h-full w-screen max-w-sm transform bg-white shadow-xl transition-all duration-200 ease-in-out  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        {/* <article className="relative w-screen max-w-sm pb-10 flex flex-col space-y-6 overflow-y-scroll h-full"> */}
        <article className="relative flex h-full w-screen max-w-sm flex-col space-y-4 pb-4">
          <header className="border-b-2 border-b-gray-100 p-4 text-lg font-bold">
            {title}
          </header>
          {children}
        </article>
      </section>
      <section
        className=" h-full w-screen cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
