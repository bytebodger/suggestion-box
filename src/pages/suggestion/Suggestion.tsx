import { faker } from '@faker-js/faker';
import { Chat } from '@mui/icons-material';
import { AppBar, Avatar, Box, Chip, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { getAvatarColor } from '../../common/functions/getAvatarColor';
import type { Suggestion as SuggestionProp } from '../../common/interfaces/Suggestion';
import { suggestionStore } from '../../common/stores/suggestionStore';
import { userStore } from '../../common/stores/userStore';

interface Props {
   suggestion: SuggestionProp | null,
}

export const Suggestion = ({ suggestion }: Props) => {
   const [
      getSuggestions,
      setSuggestions,
   ] = suggestionStore(state => [
      state.getSuggestions,
      state.setSuggestions,
   ])
   const [
      getUser,
      getUsers,
   ] = userStore(state => [
      state.getUser,
      state.getUsers,
   ]);
   const [comment, setComment] = useState('');

   if (suggestion === null)
      return null;

   const displayComments = () => {
      return suggestion.comments.map(comment => {
         const { id, submittedBy, submittedOn, text } = comment;
         const dateTime = dayjs(submittedOn).utc(true).format('MM/DD/YYYY @ HH:mm');
         const commenterIsOriginalPoster = submittedBy === suggestion.submittedBy;
         const user = getUsers().find(user => user.id === submittedBy);
         if (user === undefined)
            return null;
         const { firstName, lastName } = user;
         const avatar = (
            <Avatar sx={{
               bgcolor: getAvatarColor(firstName, lastName),
               fontSize: '10px',
               height: '22px',
               position: 'relative',
               top: 6,
               width: '22px',
            }}>
               {firstName[0]}{lastName[0]}
            </Avatar>
         )
         const chip = <>
            <Box>
               <Chip
                  label={text}
                  sx={{
                     color: commenterIsOriginalPoster ? 'white' : 'inherit',
                     backgroundColor: commenterIsOriginalPoster ? '#1FCBF5' : '#eeeeee',
                     height: 'auto',
                     padding: 1,
                     '& .MuiChip-label': {
                        display: 'block',
                        whiteSpace: 'normal',
                     },
                  }}
               />
               <br/>
               <Typography
                  sx={{
                     fontSize: '12px',
                     marginLeft: '20px',
                     marginRight: '20px',
                  }}
                  variant={'body2'}
               >
                  {dateTime}
               </Typography>
            </Box>
         </>
         let display;
         if (commenterIsOriginalPoster) {
            display = <>
               {chip}
               {avatar}
            </>
         } else {
            display = <>
               {avatar}
               {chip}
            </>
         }
         return (
            <Box
               key={`comment-${id}`}
               sx={{
                  clear: 'both',
                  textAlign: commenterIsOriginalPoster ? 'right' : 'left',
               }}
            >
               <Stack
                  direction={'row'}
                  spacing={1}
                  sx={{
                     float: commenterIsOriginalPoster ? 'inline-end' : 'inline-start',
                     marginTop: 2,
                  }}
               >
                  {display}
               </Stack>
            </Box>
         )
      })
   }

   const saveComment = () => {
      if (comment === '')
         return;
      const currentSuggestions = [...getSuggestions()];
      currentSuggestions.forEach(currentSuggestion => {
         if (currentSuggestion.id !== suggestion.id)
            return;
         currentSuggestion.comments.push({
            id: faker.string.uuid(),
            submittedBy: getUser()?.id ?? '',
            submittedOn: dayjs().utc().valueOf(),
            text: comment,
         })
      })
      setSuggestions(currentSuggestions);
      setComment('');
   }

   const updateComment = (event: ChangeEvent<HTMLInputElement>) => setComment(event.target.value.trimStart());

   return <>
      <Typography variant={'h6'}>
         {suggestion.title}
      </Typography>
      <Typography variant={'body1'}>
         {suggestion.text}
      </Typography>
      {displayComments()}
      <AppBar
         position={'fixed'}
         sx={{
            backgroundColor: 'white',
            bottom: 0,
            top: 'auto',
         }}
      >
         <Box sx={{ marginLeft: '300px' }}>
            <Box sx={{ padding: 1 }}>
               <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
               }}>
                  <TextField
                     aria-label={'Add to the discussion'}
                     label={'Add to the discussion'}
                     onChange={updateComment}
                     size={'small'}
                     sx={{ flexGrow: 1 }}
                     value={comment}
                  />
                  <Tooltip title={'Save Comment'}>
                     <IconButton
                        aria-label={'Save Comment'}
                        onClick={saveComment}
                     >
                        <Chat/>
                     </IconButton>
                  </Tooltip>
               </Box>
            </Box>
         </Box>
      </AppBar>
   </>
}