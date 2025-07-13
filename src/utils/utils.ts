import { HomeData, Tile as TileType } from '../types/types';

const HOME_DATA_URL = 'https://cd-static.bamgrid.com/dp-7068675309/home.json';

// chose b/c it's a reasonable W/H ratio and is common in the tile data 
const ASPECT_RATIO = '1.78';

export async function fetchHomeData(): Promise<HomeData> {
  const res = await fetch(HOME_DATA_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch home data');
  }
  return res.json();
}

export function getTileImageUrl(tile: TileType): string | undefined {
  const ratioBlock = tile.image?.tile?.[ASPECT_RATIO];
  const firstKey = ratioBlock && Object.keys(ratioBlock)[0];
  return firstKey ? ratioBlock[firstKey]?.default?.url : undefined;
}

export function getTileTitle(tile: TileType): string | undefined {
  const titleBlock = tile?.text?.title?.full;
  if (!titleBlock) return undefined;

  const firstKey = Object.keys(titleBlock)[0];
  return titleBlock[firstKey]?.default?.content;
}
