import type { Comment } from './Comment';

export interface Suggestion {
   comments: Comment[],
   id: string,
   submittedBy: string,
   submittedOn: number,
   title: string,
}