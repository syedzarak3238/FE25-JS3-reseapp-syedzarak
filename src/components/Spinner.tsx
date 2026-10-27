type Props = { label?: string };

export default function Spinner({ label = "Laddar..." }: Props) {
  return (
    <div role="status" className="flex items-center gap-3 p-4">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-blue-700" />
      <span>{label}</span>
    </div>
  );
}
