import create from 'zustand'
import { devtools } from 'zustand/middleware'

const generalStore = (set) => ({
    locations: ['0'],
    setLocations: (locs) => set({locations: locs}),
    locationHistory: [],
    addToLocationHistory: (loc) => 
        set((state) => ({ locationHistory: [...state.locationHistory, loc] })),
    path: '',
    setPath: (p) => set({path: p}),
    path_playlist: undefined,
})

const useStore = create(devtools(generalStore))

export default useStore;

