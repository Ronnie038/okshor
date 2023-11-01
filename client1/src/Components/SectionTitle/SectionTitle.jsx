const SectionTitle = ({ children }) => {
  return (
    <div className="flex relative xl:justify-start lg:justify-normal md:justify-center mx-10 my-5">
      <div className=" -skew-x-[30deg] bg-primary w-72 h-12">
        <div className="absolute -left-3 -top-2 -skew-x-[5deg]  bg-secondary w-8 h-6"></div>
        <div className="absolute left-10 -top-2 -skew-x-[5deg]  bg-secondary w-48 h-3"></div>

        <div className="absolute -right-5 bottom-0 -skew-x-[5deg]  bg-secondary w-48 h-1"></div>
      </div>
      <div className="absolute top-3 lg:left-24 md:left-72 left-24 text-white font-semibold z-50">
        <h2>{children}</h2>
      </div>
    </div>
  );
};

export default SectionTitle;
