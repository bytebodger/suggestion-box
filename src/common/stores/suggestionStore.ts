import { create } from 'zustand';
import type { Suggestion } from '../interfaces/Suggestion';

interface State {
   // values
   suggestion: Suggestion | null,
   suggestions: Suggestion[],
   // getters
   getSuggestion: () => Suggestion | null,
   getSuggestions: () => Suggestion[],
   // setters
   setSuggestion: (suggestion: Suggestion) => void,
   setSuggestions: (suggestions: Suggestion[]) => void,
}

export const suggestionStore = create<State>()((set, get) => ({
   // values
   suggestion: null,
   suggestions: [],
   // getters
   getSuggestion: () => get().suggestion,
   getSuggestions: () => get().suggestions,
   // setters
   setSuggestion: suggestion => { set(() => ({ suggestion })) },
   setSuggestions: suggestions => { set(() => ({ suggestions })) },
}))