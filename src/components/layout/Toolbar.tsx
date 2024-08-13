import React from "react";
import Nav from "./Nav";

const Toolbar: React.FC = () => {
  return (
    <footer className="fixed w-full bottom-0 right-0 border-t border-gray-200 bg-white md:hidden">
      <Nav />
    </footer>
  );
};

export default Toolbar;
