import { create } from 'zustand';
import type { Suggestion } from '../interfaces/Suggestion';

interface State {
   // values
   suggestions: Suggestion[],
   // getters
   getSuggestions: () => Suggestion[],
   // setters
   setSuggestions: (suggestions: Suggestion[]) => void,
}

export const suggestionStore = create<State>()((set, get) => ({
   // values
   suggestions: [],
   // getters
   getSuggestions: () => get().suggestions,
   // setters
   setSuggestions: suggestions => { set(() => ({ suggestions })) },
}))