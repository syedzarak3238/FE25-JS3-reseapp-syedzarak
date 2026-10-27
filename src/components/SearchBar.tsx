import { Input } from "@/components/ui/input";

type Props = { value: string; onChange: (value: string) => void };

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Input
        id="search"
        type="search"
        placeholder="Sök land"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}