import create from 'zustand'
import { devtools } from 'zustand/middleware'

const generalStore = (set) => ({
    locations: ['0'],
    setLocations: (locs) => set({locations: locs}),
    path: {name: undefined},
    setPath: (p) => set({path: p}),
    path_playlist: undefined,
})

const useStore = create(devtools(generalStore))

export default useStore;

