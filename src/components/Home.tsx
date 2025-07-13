import { useEffect, useState } from 'react';
import { useHomeData } from '../context/HomeDataContext';
import Row from './Row';

function Home() {
  const { data, error } = useHomeData();
  const [rowIdx, setRowIdx] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const numRows = data?.data.StandardCollection.containers?.length || 0;

      if (e.key === 'ArrowDown') {
        setRowIdx((prev) => Math.min(prev + 1, numRows - 1));
      } else if (e.key === 'ArrowUp') {
        setRowIdx((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [data]);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  const currentRow = data?.data?.StandardCollection?.containers?.[rowIdx] ?? null;

  if (!currentRow?.set?.items?.length) {
    return <div>No data found</div>;
  }

  const rowTitle = currentRow.set?.text?.title?.full?.set?.default?.content || '';

  return (
    <main className="home-container">
      <div key={rowIdx} className="row-fade">
        <Row tiles={currentRow.set.items} title={rowTitle} />
      </div>
    </main>
  );
}

export default Home;
