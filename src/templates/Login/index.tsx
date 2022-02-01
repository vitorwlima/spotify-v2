import { signIn } from 'next-auth/react'

import { LoginPageProps } from 'src/pages/login'

const LoginTemplate = ({ providers }: LoginPageProps) => {
  const spotifyProvider = providers?.spotify

  if (!spotifyProvider) {
    return <h2>Um erro ocorreu. Tente novamente mais tarde.</h2>
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-stone-900">
      <img
        className="mb-6 w-72"
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
        alt="Spotify - V2"
      />
      <button
        className="rounded-full bg-green-main p-5 text-white"
        onClick={() => signIn(spotifyProvider.id, { callbackUrl: '/' })}
      >
        Login with spotify
      </button>
    </div>
  )
}

export default LoginTemplate
