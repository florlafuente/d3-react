import Head from 'next/head'
import ChartContainer from '../components/ChartContainer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>D3 data viz con React</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChartContainer />
    </div>
  )
}
