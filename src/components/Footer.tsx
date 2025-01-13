const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-6 flex h-[75px] w-full select-none items-center justify-between px-6 py-2 text-center">
      <div className="w-[40%] rounded-[12px] border bg-transparent bg-opacity-20 p-4 backdrop-blur-md backdrop-filter">
        Feito com ❤ pela Comunidade $BCT
      </div>
      <div className="w-[40%] rounded-[12px] border bg-transparent bg-opacity-20 p-4 backdrop-blur-md backdrop-filter">
        © {year} All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
