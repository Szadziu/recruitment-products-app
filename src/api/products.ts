import type { Product } from '../types/product';

const PRODUCTS_ENDPOINT = 'https://s5.cosibella.pl/api/test/products';

export async function fetchProducts(): Promise<Product[]> {
  let response: Response;

  try {
    response = await fetch(PRODUCTS_ENDPOINT);
  } catch {
    throw new Error('Nie udało się połączyć z serwerem. Sprawdź połączenie z internetem i spróbuj ponownie.');
  }

  if (!response.ok) {
    throw new Error(`Serwer zwrócił błąd (${response.status}). Spróbuj ponownie później.`);
  }

  return (await response.json()) as Product[];
}
