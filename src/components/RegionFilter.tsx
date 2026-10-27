import { Button } from "@/components/ui/button";

const REGIONS = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

type Props = {
  selected: string;
  onSelect: (region: string) => void;
};

export default function RegionFilter({ selected, onSelect }: Props) {
  return (
    <div role="group" aria-label="Filtrera på region" className="flex flex-wrap gap-2">
      {REGIONS.map((region) => {
        const isSelected = region === selected;
        return (
          <Button
            key={region}
            type="button"
            variant={isSelected ? "default" : "outline"}
            aria-pressed={isSelected}
            onClick={() => onSelect(region)}
          >
            {region}
          </Button>
        );
      })}
    </div>
  );
}
