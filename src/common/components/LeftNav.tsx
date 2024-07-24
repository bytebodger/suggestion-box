import { Avatar, Box, ButtonBase, Card, CardContent, Stack, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { getAvatarColor } from '../functions/getAvatarColor';
import { suggestionStore } from '../stores/suggestionStore';
import { userStore } from '../stores/userStore';
import type { MouseEvent } from 'react';

export const LeftNav = () => {
   const [
      getSuggestion,
      getSuggestions,
      setSuggestion,
   ] = suggestionStore(state => [
      state.getSuggestion,
      state.getSuggestions,
      state.setSuggestion,
   ]);
   const [getUsers] = userStore(state => [state.getUsers]);

   const displaySuggestions = () => {
      const currentSuggestion = getSuggestion();
      return getSuggestions().map(suggestion => {
         const { id, submittedBy, submittedOn, title } = suggestion;
         const trimmedTitle = title.length > 33 ? title.substring(0, 33).concat('...') : title;
         const user = getUsers().find(user => user.id === submittedBy);
         if (user === undefined)
            return null;
         const { firstName, lastName } = user;
         const dateTime = dayjs(submittedOn).utc(true).format('MM/DD/YYYY @ HH:mm');
         return (
            <ButtonBase
               aria-label={'View Suggestion Thread'}
               key={`suggestion-${id}`}
               onClick={updateSuggestion}
               sx={{
                  textAlign: 'left',
                  width: '100%',
               }}
               value={id}
            >
               <Tooltip title={'View Suggestion Thread'}>
                  <Box sx={{ width: '100%' }}>
                     <Card
                        sx={{ backgroundColor: id === currentSuggestion?.id ? '#eeeeee' : 'white' }}
                        variant={'outlined'}
                     >
                        <CardContent>
                           <Box>
                              <Typography
                                 sx={{ fontWeight: 'bold' }}
                                 variant={'body2'}
                              >
                                 {trimmedTitle}
                              </Typography>
                           </Box>
                           <Box>
                              <Typography
                                 sx={{ fontSize: '12px' }}
                                 variant={'body2'}
                              >
                                 {dateTime}
                              </Typography>
                           </Box>
                           <Box sx={{ marginTop: 1 }}>
                              <Stack
                                 direction={'row'}
                                 spacing={1}
                              >
                                 <Avatar sx={{
                                    bgcolor: getAvatarColor(firstName, lastName),
                                    fontSize: '10px',
                                    height: '22px',
                                    width: '22px',
                                 }}>
                                    {firstName[0]}{lastName[0]}
                                 </Avatar>
                                 <Typography variant={'body2'}>
                                    {firstName} {lastName}
                                 </Typography>
                              </Stack>
                           </Box>
                        </CardContent>
                     </Card>
                  </Box>
               </Tooltip>
            </ButtonBase>
         )
      })
   }

   const updateSuggestion = (event: MouseEvent<HTMLButtonElement>) => {
      const suggestionId = event.currentTarget.value;
      const suggestion = getSuggestions().find(suggestion => suggestion.id === suggestionId);
      if (suggestion === undefined)
         return;
      setSuggestion(suggestion);
   }

   return <>
      {displaySuggestions()}
   </>
}