import { HomeData, Tile as TileType } from '../types/types';

const HOME_DATA_URL = 'https://cd-static.bamgrid.com/dp-7068675309/home.json';

// chose b/c it's a reasonable H/W ratio and is common in the tile data 
const ASPECT_RATIO = '1.78';

export async function fetchHomeData(): Promise<HomeData> {
  const res = await fetch(HOME_DATA_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch home data');
  }
  return res.json();
}

export function getTileImageUrl(tile: TileType) {
  const ratioBlock = tile.image?.tile?.[ASPECT_RATIO];
  const firstKey = ratioBlock && Object.keys(ratioBlock)[0];
  return firstKey ? ratioBlock[firstKey]?.default?.url : undefined;
}
