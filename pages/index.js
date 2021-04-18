import Head from 'next/head'
import ChartContainer from '../components/ChartContainer';
import { getData } from './api/helado';

const Home = ({ data }) => {
  console.log(data);
  return (
    <div>
      <Head>
        <title>D3 data viz con React</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChartContainer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const data = await getData();

  return {
    props: {
      data,
    }, // will be passed to the page component as props
  }
}

export default Home;
