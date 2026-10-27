import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">❌Error 404❌ – Sidan hittades inte</h1>
      <Link to="/" className="text-blue-700 underline">
        ← Tillbaka till startsidan
      </Link>
    </div>
  );
}
