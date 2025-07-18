import { useEffect, useRef, useState } from 'react';
import { Tile as TileType } from '../types/types';
import Tile from './Tile';
import Modal from './Modal';

interface RowProps {
  tiles: TileType[];
  title?: string;
}

function Row({ tiles, title }: RowProps) {
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  const loopedTiles = [...tiles, ...tiles, ...tiles];
  const numTiles = tiles.length;
  const startIdx = numTiles;
  const endIdx = numTiles + numTiles - 1; 

  const [focusedIdx, setFocusedIdx] = useState(startIdx);
  const [selectedTile, setSelectedTile] = useState<TileType | null>(null);

  useEffect(() => {
    const handleArrowKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setFocusedIdx((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft') {
        setFocusedIdx((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleArrowKey);
    return () => window.removeEventListener('keydown', handleArrowKey);
  }, []);

  useEffect(() => {
    const handleSpaceKey = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        if (selectedTile) {
          setSelectedTile(null);
        } else {
          setSelectedTile(loopedTiles[focusedIdx]);
        }
      }
    };

    window.addEventListener('keydown', handleSpaceKey);
    return () => window.removeEventListener('keydown', handleSpaceKey);
  }, [selectedTile, loopedTiles]);

  useEffect(() => {
    const el = tileRefs.current[focusedIdx];
    if (el) {
      el.scrollIntoView({
        behavior: 'auto',
        inline: 'start',
        block: 'nearest'
      });
    }
    
    if (focusedIdx < startIdx) {
      setFocusedIdx(endIdx)
    } else if (focusedIdx > endIdx) {
      setFocusedIdx(startIdx)
    }
  }, [focusedIdx]);

  return (
    <section className="row-block">
      <h1 className="row-title">{title}</h1>
      <div className="row-container">
        {loopedTiles.map((tile, index) => (
          <Tile
            key={`${tile.contentId}-${index}`}
            tile={tile}
            isFocused={index === focusedIdx}
            ref={(el) => void (tileRefs.current[index] = el)}
          />
        ))}
      </div>

      {selectedTile && (
        <Modal tile={selectedTile} />
      )}
    </section>
  );
}

export default Row;
