import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full bg-[#222222] py-8">
      <Link to="/" className="block">
        <h1 className="text-center text-3xl md:text-5xl font-bold" style={{ color: "#f6d964" }}>
          L e m b r .
        </h1>
      </Link>
    </header>
  );
};