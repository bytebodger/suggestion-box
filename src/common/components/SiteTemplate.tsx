import { AppBar, Box, CssBaseline, Drawer, List } from '@mui/material';
import { useEffect } from 'react';
import { Pages } from '../../pages/Pages';
import { useDataGenerator } from '../hooks/useDataGenerator';
import { AddSuggestion } from './AddSuggestion';
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
                  width: 300,
               },
               flexShrink: 0,
               width: 300,
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
            <AppBar
               position={'fixed'}
               sx={{
                  backgroundColor: 'white',
                  bottom: 0,
                  left: 0,
                  top: 'auto',
                  width: 299,
               }}
            >
               <AddSuggestion/>
            </AppBar>
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