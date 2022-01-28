import Head from 'next/head'

import HomeTemplate from 'src/templates/Home'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Spotify V2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeTemplate />
    </>
  )
}

export default HomePage
