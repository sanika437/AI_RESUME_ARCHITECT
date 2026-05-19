import { Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-5 border-b border-white/10 backdrop-blur-lg bg-black/30 sticky top-0 z-50">

      <div className="flex items-center gap-3">
        <FaRobot className="text-purple-500 text-3xl" />

        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          Extensio.ai
        </h1>
      </div>

      <div className="flex gap-8 text-gray-300 font-medium">

        <Link
          to="/"
          className="hover:text-white transition"
        >
          Home
        </Link>

        <Link
          to="/dashboard"
          className="hover:text-white transition"
        >
          Dashboard
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;