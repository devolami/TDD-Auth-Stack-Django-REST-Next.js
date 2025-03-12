import React from "react";

type LoaderProps = {
  children?: React.ReactNode;
};

const Loader = ({ children }: LoaderProps) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center flex-col bg-white transition-opacity duration-750">
      <div className="w-[75px] h-[75px] border-gray-300 border-[15px] border-t-green-700 rounded-full animate-spin"></div>
      {children}
    </div>
  );
};

export default Loader;
