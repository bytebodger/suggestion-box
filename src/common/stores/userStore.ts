import { create } from 'zustand';
import type { User } from '../interfaces/User';

interface State {
   // values
   user: User | null,
   users: User[],
   // getters
   getUser: () => User | null,
   getUsers: () => User[],
   // setters
   setUser: (user: User) => void,
   setUsers: (users: User[]) => void,
}

export const userStore = create<State>()((set, get) => ({
   // values
   user: null,
   users: [],
   // getters
   getUser: () => get().user,
   getUsers: () => get().users,
   // setters
   setUser: user => { set(() => ({ user })) },
   setUsers: users => { set(() => ({ users })) },
}))