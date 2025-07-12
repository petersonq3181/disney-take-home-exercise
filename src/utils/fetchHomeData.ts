import { HomeData } from '../types/types';

const HOME_DATA_URL = 'https://cd-static.bamgrid.com/dp-7068675309/home.json';

export async function fetchHomeData(): Promise<HomeData> {
  const res = await fetch(HOME_DATA_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch home data');
  }
  return res.json();
}
