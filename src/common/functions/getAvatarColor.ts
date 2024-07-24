export const getAvatarColor = (firstName: string, lastName: string): string => {
   let hash = 0;
   const name = firstName + lastName;
   for (let i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
   }
   let color = '#';
   for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
   }
   return color;
}