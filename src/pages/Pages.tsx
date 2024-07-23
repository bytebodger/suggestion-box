import { Route, Routes } from 'react-router-dom';
import { Path } from '../common/enums/Path';
import { Home } from './home/Home';

export const Pages = () => {
   return <>
      <Routes>
         <Route
            element={
               <Home/>
            }
            path={Path.home}
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