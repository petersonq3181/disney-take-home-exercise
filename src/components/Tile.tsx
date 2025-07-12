import { Tile as TileType } from '../types/types';
import { getTileImageUrl } from '../utils/utils';

interface TileProps {
  tile: TileType;
  isFocused: boolean;
}

function Tile({ tile, isFocused }: TileProps) {
  const imageUrl = getTileImageUrl(tile);

  return (
    <div
      className={`tile ${isFocused ? 'tile-focused' : ''}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
  );
};

export default Tile;
