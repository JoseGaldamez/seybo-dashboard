import { create } from 'zustand'

export type Store = {
    authStatus: 'authorized' | 'unauthorized'
    username: string
    login(): void
    logout(): void
}

type Action = {
    setUser: (username: Store['username']) => void
}

export const useStore = create<Store & Action>((set) => ({
    authStatus: localStorage.getItem('authStatus') === 'authorized' ? 'authorized' : 'unauthorized',
    username: localStorage.getItem('username') || '',
    login: () => set(() => {
        localStorage.setItem('authStatus', 'authorized');
        return { authStatus: 'authorized' }
    }),
    logout: () => set(() => {
        localStorage.setItem('authStatus', 'unauthorized');
        localStorage.removeItem('username');
        return { authStatus: 'unauthorized' }
    }),
    setUser: (username) => set(() => {
        localStorage.setItem('username', username);
        return { username }
    })
}));