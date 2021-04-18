import Head from 'next/head'
import Chart from '../components/Chart';
import { getData } from './api/covid';

const Home = ({ data }) => {
  return (
    <div>
      <Head>
        <title>D3 data viz con React</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Chart data={data} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const data = await getData();

  return {
    props: {
      data,
    },
  }
}

export default Home;
