import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import type { Comment } from '../interfaces/Comment';
import { suggestionStore } from '../stores/suggestionStore';
import { userStore } from '../stores/userStore';

export const useDataGenerator = () => {
   const [
      getUsers,
      setUser,
      setUsers,
   ] = userStore(state => [
      state.getUsers,
      state.setUser,
      state.setUsers,
   ]);
   const [
      getSuggestions,
      setSuggestions,
   ] = suggestionStore(state => [
      state.getSuggestions,
      state.setSuggestions,
   ])

   const createSuggestions = (totalSuggestions: number = 1, clearSuggestions: boolean = true) => {
      const currentSuggestions = clearSuggestions ? [] : [...getSuggestions()];
      const users = getUsers();
      let referenceTime = dayjs().utc().valueOf();
      for (let i = 0; i < totalSuggestions; i++) {
         const id = faker.string.uuid();
         let randomUserIndex = Math.floor(Math.random() * users.length);
         const submittedBy = users[randomUserIndex].id;
         let randomTimeOffset = Math.floor(Math.random() * 10000000) + 10000000;
         referenceTime -= randomTimeOffset;
         const submittedOn = referenceTime;
         const title = faker.lorem.sentence();
         const randomSentenceCount = Math.floor(Math.random() * 5) + 1;
         const text = faker.lorem.sentences(randomSentenceCount);
         const randomTotalComments = Math.floor(Math.random() * 9) + 1;
         const comments: Comment[] = [];
         let commentTime = referenceTime;
         for (let j = 0; j < randomTotalComments; j++) {
            const id = faker.string.uuid();
            randomUserIndex = Math.floor(Math.random() * users.length);
            const submittedBy = users[randomUserIndex].id;
            randomTimeOffset = Math.floor(Math.random() * 1000000);
            commentTime += randomTimeOffset;
            const submittedOn = commentTime;
            const randomSentenceCount = Math.floor(Math.random() * 5) + 1;
            const text = faker.lorem.sentences(randomSentenceCount);
            comments.push({
               id,
               submittedBy,
               submittedOn,
               text,
            })
         }
         currentSuggestions.push({
            comments,
            id,
            submittedBy,
            submittedOn,
            text,
            title,
         })
      }
      setSuggestions(currentSuggestions);
      console.log(getSuggestions());
   }

   const createUsers = (totalUsers: number = 10) => {
      const currentUsers = [];
      for (let i = 0; i < totalUsers; i++) {
         currentUsers.push({
            firstName: faker.person.firstName(),
            id: faker.string.uuid(),
            lastName: faker.person.lastName(),
         })
      }
      setUsers(currentUsers);
      if (currentUsers.length === getUsers().length)
         setUser(currentUsers[0]);
      console.log(getUsers());
   }

   return {
      createSuggestions,
      createUsers,
   }
}