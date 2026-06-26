# Lista produktów

Aplikacja frontendowa prezentująca listę produktów pobieraną dynamicznie z API. Projekt zrealizowany jako zadanie rekrutacyjne.

## Funkcjonalności

- Pobieranie listy produktów z `https://s5.cosibella.pl/api/test/products`
- Prezentacja produktów w formie siatki kart (ID, nazwa, kategoria, cena)
- Filtrowanie po kategorii (`<select>`) oraz po zakresie cenowym (min/max)
- Paginacja wyników
- Zachowanie stanu (filtry, strona) w parametrach URL — przetrwa odświeżenie strony i kopiowanie linku
- Modal ze szczegółami produktu po kliknięciu w kartę (wszystkie dane zwracane przez API)
- Wskaźnik ładowania, komunikat błędu połączenia z możliwością ponowienia, komunikat o braku wyników dla wybranych filtrów

## Stack technologiczny

- TypeScript (bez frameworków/bibliotek do budowy UI)
- Vite
- Sass (SCSS)

## Uruchomienie projektu

Wymagany Node.js (zalecana wersja 20+).

```bash
# instalacja zależności
npm install

# serwer deweloperski (http://localhost:5173)
npm run dev

# build produkcyjny do katalogu dist/
npm run build

# podgląd builda produkcyjnego
npm run preview
```

## Struktura projektu

```
src/
  api/        # pobieranie danych z API
  state/      # synchronizacja stanu z URL
  types/      # typy TypeScript
  ui/         # renderowanie poszczególnych części interfejsu
  utils/      # funkcje pomocnicze (formatowanie, escapowanie HTML)
  styles/     # style SCSS
  main.ts     # punkt wejścia aplikacji
```
