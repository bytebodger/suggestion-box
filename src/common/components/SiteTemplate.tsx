import { Box, CssBaseline, Drawer, List } from '@mui/material';
import { useEffect } from 'react';
import { Pages } from '../../pages/Pages';
import { useDataGenerator } from '../hooks/useDataGenerator';
import { LeftNav } from './LeftNav';

export const SiteTemplate = () => {
   const dataGenerator = useDataGenerator();

   useEffect(() => {
      dataGenerator.createUsers();
      dataGenerator.createSuggestions(10);
   }, [])

   return <>
      <Box sx={{
         display: 'flex',
         minWidth: 500,
      }}>
         <CssBaseline/>
         <Drawer
            sx={{
               '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: 240,
               },
               flexShrink: 0,
               width: 240,
            }}
            variant={'permanent'}
         >
            <Box sx={{
               marginTop: 3,
               overflow: 'auto',
            }}>
               <List sx={{ padding: 0 }}>
                  <LeftNav/>
               </List>
            </Box>
         </Drawer>
         <Box
            component={'main'}
            sx={{
               flexGrow: 1,
               p: 3,
            }}
         >
            <Pages/>
         </Box>
      </Box>
   </>
}