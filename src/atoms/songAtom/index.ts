import { atom } from 'recoil'

const currentTrackIdState = atom<string>({
  key: 'currentTrackIdState',
  default: '',
})

const isPlayingState = atom<boolean>({
  key: 'isPlayingState',
  default: false,
})

export { currentTrackIdState, isPlayingState }
