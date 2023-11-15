export const ProductCardSkeleton = () => {
  return (
    <div className="shadow-md group h-[13rem] max-h-[13rem] md:h-[20rem] md:max-h-[20rem] flex flex-col gap-1 p-1 rounded-lg group relative z-0 animate-pulse">
      <div className="flex-grow bg-gray-200" />
      <div className="w-full h-10 flex items-center">
        <div className="flex-grow bg-gray-200 h-6"></div>
      </div>
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="flex flex-wrap flex-col  h-5/6 gap-2 pb-2  rounded-lg group relative z-0 pt-2">
      <div className="flex-grow w-full md:w-3/5 h-3/4 md:h-full bg-gray-200 animate-pulse" />
      <div className="flex flex-col gap-2 w-full md:w-2/5 pl-5 mt-5 md:mt-0 h-full">
        <div className="h-16 bg-gray-200 animate-pulse" />
        <div className="h-40 bg-gray-200 animate-pulse" />
        <div className="h-10 w-full bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};
