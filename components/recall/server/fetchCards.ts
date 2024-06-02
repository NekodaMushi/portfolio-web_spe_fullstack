// fetchCards.ts
import fetchCards from './action';

export async function getCardsData(page: number = 1) {
  try {
    const data = await fetchCards(page);
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
}
