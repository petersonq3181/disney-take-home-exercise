import { forwardRef, useState } from 'react';
import { Tile as TileType } from '../types/types';
import { getTileImageUrl } from '../utils/utils';

interface TileProps {
  tile: TileType;
  isFocused: boolean;
}

// temp patch solution to show an image when the given url image from the data is inaccessible 
const fallbackUrl = `${process.env.PUBLIC_URL}/fallback.png`;

const Tile = forwardRef<HTMLDivElement, TileProps>(({ tile, isFocused }, ref) => {
  const imageUrl = getTileImageUrl(tile)
  const [imgSrc, setImgSrc] = useState(imageUrl);

  return (
    <div
      ref={ref}
      className={`tile ${isFocused ? 'tile-focused' : ''}`}
    >
      <img
        src={imgSrc}
        onError={() => setImgSrc(fallbackUrl)}
        alt=""
        className="tile-img"
      />
    </div>
  );
});

export default Tile;
