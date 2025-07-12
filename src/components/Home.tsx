import { useHomeData } from '../context/HomeDataContext';
import Row from './Row';

function Home() {
  const { data, error } = useHomeData();

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  const containers = data.data.StandardCollection.containers;
  const firstRow = containers[0];

  if (!firstRow?.set?.items?.length) {
    return <div>No data found</div>;
  }

  const rowTitle = firstRow.set?.text?.title?.full?.set?.default?.content || '';

  return (
    <main className="home-container">
      <Row tiles={firstRow.set.items} title={rowTitle} />
    </main>
  );
};

export default Home;
