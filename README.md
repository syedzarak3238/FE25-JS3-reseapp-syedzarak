# ✈️ Reseapp

En reseapp som läser data från flera API:er och visar den på ett tydligt och tillgängligt sätt. Startsidan har en paginerad lista med länder med sökfält och regionfilter. Varje land har en detaljsida med basfakta, aktuellt väder och en kort introtext med bild från Wikipedia.





## Vad appen gör

- **Landlista:** alla länder hämtas med ett enda anrop. Sök, filter och paginering sker sedan i appen utan nya API-anrop. Varje land visar flagga, namn, region och huvudstad.
- **Sök och regionfilter:** sök på landsnamn och filtrera på Africa, Americas, Asia, Europe, Oceania eller All. Ny sökning eller nytt filter nollställer sidan till 1.
- **URL styr vyn:** sida, sökord och region ligger i URL:en, t.ex. `?page=2&query=fin&region=Europe`. Man kan ladda om sidan, dela länken och använda bakåtknappen.
- **Detaljsida:** `/country/SWE` visar flagga, namn och landets eget namn, region och subregion, huvudstad, befolkning, språk och valuta.
- **Väder:** aktuell temperatur, vind och en svensk beskrivning för huvudstaden via Open-Meteo. Huvudstadens koordinater slås upp med Open-Meteos ortssökning. Saknas huvudstaden eller hittas den inte används landets `latlng`.
- **Introtext och bild:** sammanfattning och bild från Wikipedia, med källhänvisning och länk till hela artikeln.
- **Laddning och fel:** spinner under hämtning och felmeddelande med knappen "Försök igen". Land, väder och Wikipedia hämtas oberoende av varandra, så om en del misslyckas visas resten av sidan ändå.
- **404:** egen 404-sida för okända adresser, och "Landet hittades inte" för ogiltiga landskoder.
- **Tillgänglighet:** semantisk HTML, label på sökfältet, `aria-pressed` på regionknapparna, alt-text på bilder, synlig fokusmarkering och tangentbordsstöd.
- **Responsivt:** mobile first med brytpunkter, inget horisontellt scroll på 375 px.

## Köra projektet lokalt

Du behöver Node.js installerat.

```bash

cd [MAPPNAMN]
npm install
npm run dev
```

Öppna sedan adressen som visas i terminalen (oftast `http://localhost:5173`).

Inga API-nycklar eller `.env`-filer behövs eftersom alla API:er som används är öppna.

Bygga för produktion:

```bash
npm run build
```

## Ramverk och varför

Jag valde **React (Vite) med React Router**. t.ex.: Appen behöver ingen server-rendering och använder bara öppna API:er utan nycklar, så en ren klientapp räcker. Vite är snabbt att starta och React Router passar bra för sidorna och URL-parametrarna (`useSearchParams`).]

Tekniker som används:

- React och TypeScript (egna typer för API-svaren, inget `any`)
- Tailwind CSS för styling
- React Router (`useSearchParams`, `useParams`) för routing och URL-state
- TanStack Query för hämtning, cache, laddning och felhantering
- Custom hooks för logiken (`useCountries`, `useCountry`, `useWeather`, `useWikipedia`, `useCountryFilters`)

## Projektstruktur

```
src/
  api/         API-anrop (countries, weather, wikipedia)
  types/       TypeScript-typer för API-svaren
  hooks/       Custom hooks med logik
  lib/         Hjälpfunktioner (formatering, väderkoder)
  components/  Små komponenter med ett tydligt ansvar
  pages/       Sidor (startsida, detaljsida, 404)
```

## API:er som används

- [countries.dev](https://countries.dev) för länder
- [Open-Meteo](https://open-meteo.com) för ortssökning och väder
- [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/) för introtext och bild

## Fördjupningar

Inga. Projektet är gjort på G-nivå. 

## AI-redovisning

Jag har använt **Claude (Anthropic)** i det här projektet till:

- att få en första version av projektets struktur och kod (komponenter, hooks, API-filer och konfiguration)
- förklaring av hur man lägger till shadcn/ui 
- att få hjälp att förstå hur man visar laddning och fel vid redovisningen

Jag har gått igenom koden fil för fil, testat appen själv och kan förklara all kod i projektet, även den jag fick hjälp med. 

## Reflektion

Det som gick bra var att dela upp koden i lager (typer, api, hooks, komponenter, sidor), vilket gjorde det lätt att hitta och ändra saker. Det svåraste var att förstå hur URL-state med useSearchParams fungerar och hur flera API:er kan ladda och misslyckas oberoende av varandra. Nästa gång skulle jag börja tidigare, committa oftare i mindre steg och validera API-svaren med Zod i stället för att bara typa dem."