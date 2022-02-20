import { atom } from 'recoil'

const playlistIdState = atom<string>({
  key: 'playlistIdState',
  default: '',
})

const playlistState = atom<SpotifyApi.SinglePlaylistResponse | null>({
  key: 'playlistState',
  default: null,
})

export { playlistIdState, playlistState }
