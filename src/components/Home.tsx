import { useHomeData } from '../context/HomeDataContext';

function Home() {
  const { data, error } = useHomeData();

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  // TODO 
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default Home;
