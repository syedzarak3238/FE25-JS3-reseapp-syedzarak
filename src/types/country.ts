export type Flags = { svg: string; png: string };
export type Language = { name: string };
export type Currency = { code: string; name: string; symbol?: string };


export type CountrySummary = {
  name: string;
  alpha3Code: string;
  region: string;
  capital?: string;
  flags: Flags;
  population: number;
  area?: number;
};


export type Country = CountrySummary & {
  nativeName: string;
  alpha2Code: string;
  subregion?: string;
  latlng?: [number, number];
  languages?: Language[];
  currencies?: Currency[];
};
