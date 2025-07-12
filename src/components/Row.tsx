import { useEffect, useState } from 'react';
import { Tile as TileType } from '../types/types';
import Tile from './Tile';

interface RowProps {
  tiles: TileType[];
  title?: string;
}

function Row({ tiles, title }: RowProps) {
  const [focusedIdx, setFocusedIdx] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setFocusedIdx((prev) => (prev + 1) % tiles.length);
      } else if (e.key === 'ArrowLeft') {
        setFocusedIdx((prev) => (prev - 1 + tiles.length) % tiles.length);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [tiles.length]);

  return (
    <section className="row-block">
      <h1 className="row-title">{title}</h1>
      <div className="row-container">
        {tiles.map((tile, index) => (
          <Tile key={tile.contentId} tile={tile} isFocused={index === focusedIdx} />
        ))}
      </div>
    </section>
  );
};

export default Row;
