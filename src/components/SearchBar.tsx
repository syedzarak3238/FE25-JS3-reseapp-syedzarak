import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = { value: string; onChange: (value: string) => void };

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="search">Sök land</Label>
      <Input
        id="search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}