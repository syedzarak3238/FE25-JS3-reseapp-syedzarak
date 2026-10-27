import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-blue-900 text-white">
      <nav
        aria-label="Huvudmeny"
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3"
      >
        <Link to="/" className="text-xl font-bold">
          ✈️ Reseapp 
        </Link>
        <Link to="/" className="underline">
          Alla länder
        </Link>
      </nav>
    </header>
  );
}
