import { faker } from '@faker-js/faker';
import { EditNote } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { type ChangeEvent, useState } from 'react';
import { suggestionStore } from '../stores/suggestionStore';
import { userStore } from '../stores/userStore';
import { SlidingDialog } from './SlidingDialog';

export const AddSuggestion = () => {
   const [
      getSuggestions,
      setSuggestions,
   ] = suggestionStore(state => [
      state.getSuggestions,
      state.setSuggestions,
   ])
   const [getUser] = userStore(state => [state.getUser]);
   const [open, setOpen] = useState(false);
   const [description, setDescription] = useState('');
   const [title, setTitle] = useState('');

   const closeNewSuggestion = () => setOpen(false);

   const createSuggestion = () => {
      if (title === '') {
         setOpen(false);
         return;
      }
      const currentSuggestions = [...getSuggestions()];
      currentSuggestions.unshift({
         comments: [],
         id: faker.string.uuid(),
         submittedBy: getUser()?.id ?? '',
         submittedOn: dayjs().utc().valueOf(),
         text: description,
         title,
      });
      setSuggestions(currentSuggestions);
      setOpen(false);
   }

   const getNewSuggestionActions = () => {
      return <>
         <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: 2,
            paddingRight: 2,
            width: '100%',
         }}>
            <Box sx={{ display: 'inline' }}>
               <Button
                  aria-label={'Submit'}
                  onClick={createSuggestion}
                  variant={'outlined'}
               >
                  Submit
               </Button>
            </Box>
            <Button
               aria-label={'Cancel'}
               onClick={closeNewSuggestion}
               variant={'outlined'}
            >
               Cancel
            </Button>
         </Box>
      </>
   }

   const getNewSuggestionContent = () => {
      return <>
         <Box sx={{ paddingTop: 1 }}>
            <TextField
               aria-label={'Title'}
               label={'Title'}
               onChange={updateTitle}
               size={'small'}
               sx={{ width: '100%' }}
               value={title}
            />
         </Box>
         <Box sx={{ paddingTop: 1 }}>
            <TextField
               aria-label={'Description'}
               label={'Description'}
               multiline={true}
               onChange={updateDescription}
               rows={5}
               size={'small'}
               sx={{ width: '100%' }}
               value={description}
            />
         </Box>
      </>
   }

   const launchNewSuggestion = () => {
      setTitle('');
      setDescription('');
      setOpen(true);
   }

   const updateDescription = (event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value.trimStart());

   const updateTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value.trimStart());

   return <>
      <SlidingDialog
         actions={getNewSuggestionActions()}
         content={getNewSuggestionContent()}
         dialogProps={{
            sx: {
               '& .MuiDialog-container': {
                  '& .MuiPaper-root': {
                     maxWidth: '50vw',
                     width: '100%',
                  },
               },
            },
         }}
         onClose={closeNewSuggestion}
         open={open}
         title={'Submit new suggestion'}
      />
      <Button
         sx={{ height: 56 }}
         onClick={launchNewSuggestion}
         variant={'outlined'}
      >
         <EditNote/>
         New Suggestion
      </Button>
   </>
}