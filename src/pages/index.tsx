import Head from 'next/head'

const Home = () => {
  return (
    <>
      <Head>
        <title>Spotify V2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center">
        <h1 className="text-3xl font-semibold text-green-500">Spotify V2</h1>
      </main>
    </>
  )
}

export default Home
