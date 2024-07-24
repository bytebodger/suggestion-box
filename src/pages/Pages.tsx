import { Route, Routes } from 'react-router-dom';
import { Path } from '../common/enums/Path';
import { suggestionStore } from '../common/stores/suggestionStore';
import { Suggestion } from './suggestion/Suggestion';

export const Pages = () => {
   const [getSuggestion] = suggestionStore(state => [state.getSuggestion]);

   return <>
      <Routes>
         <Route
            element={
               <Suggestion suggestion={getSuggestion()}/>
            }
            path={Path.suggestion}
         />
         <Route
            element={
               <strong>
                  Page not found
               </strong>
            }
            path={Path.asterisk}
         />
      </Routes>
   </>
}