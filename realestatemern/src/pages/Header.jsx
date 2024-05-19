import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="flex  border p-10 justify-between items-center">
      <div className="font-bold">
        <h1 className="text-3xl">
          Vellai<span className="text-orange-400">Estate</span>
        </h1>
      </div>
      <div className="flex gap-8 px-10  text-2xl">
        <Link to={"/"}>Home</Link>
        <Link to={"/sign-in"}>Sign-in</Link>
        <Link to={"/sign-up"}>Sign-up</Link>
      </div>
    </div>
  );
};

export default Header;
