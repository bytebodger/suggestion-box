# suggestion-box

### Objective

To demonstrate my proficiency in architecture, state management, and data presentation.

### Overview

This codebase simulates an online "suggestion box" that allows the user to:

- Submit new suggestions
- View suggestion comment threads
- Contribute to existing threads

### Requirements

1. **In-memory data provider:**  The app uses Zustand for in-memory data (i.e., state management).  The three main data objects are Comment, Suggestion, and User.  User represents any person who has submitted a suggestion or a comment.  Suggestion represents a single suggestion.  Comment represents a single comment.  The Suggestion interface contains an array of all associated comments.
2. **Mock data:** When the app loads, it automatically generates 10 random users and 10 random suggestions.  This uses the Lorem Ipsum functionality available in the `faker` NPM package.  The first randomly-generated user is assumed to be the currently-logged-in user.  Each randomly-generated suggestion is assigned randomly to one of the users.  Each suggestion also has a random number of comments that have been generated under it.
3. **UI:** The system uses Material UI to provide a "clean" look-and-feel for all display elements.  While the given display does not exactly mirror that which was provided in the PDF instructions, it adheres closely to that paradigm.
4. **Random suggestions:** I wasn't sure from the instructions whether you wanted to have some new button/feature that would allow you to create _additional_ randomly-generated suggestions on-the-fly?  I didn't add such a feature because I'm already randomly generating the initial load of 10 users and 10 suggestions when the app loads and you can add more suggestions/comments manually within the app.  However, the functionality in `useDataGenerator` would make it trivial to add such a button.
5. **User suggestions:** The functionality provided allows users to create new suggestions and add comments to existing suggestions.

### Submission

This repository should be self-contained, meaning that you shouldn't need any additional dependencies other than that which are included in the `package.json`.  (Assuming, of course, that you already have the ability to run a React project locally on your own system.)

To run this project, first clone the repository with

`git clone https://github.com/bytebodger/suggestion-box.git`

Then, once you've moved into the directory, run:

`npm install`

Followed by:

`npm start`

This should allow you to review all functionality in your browser at:

`http://localhost:3000`

### Notes

The following are some features that I'd like to highlight:

- The currently-viewed suggestion thread is highlighted in grey in the left nav.
- Every user is given an automatically-generated avatar with their initials and an algorithmically-assigned color.  This makes it easier to see which suggestions/comments came from which user.
- Timestamps are displayed both for suggestions and comments.
- In suggestion threads, comments from the original poster are displayed as right-aligned and highlighted in blue.  All other comments are displayed as left-aligned and highlighted in grey.
- New suggestions are accomplished with a sliding dialog box.
- The titles for each suggestion are truncated with an ellipsis if they are too long to be comfortably displayed in the left nav.
- Tooltips are provided where appropriate to give the user additional context.
- Suggestions are shown in the left nav in descending chronological order (most recent at the top).
- Comments are shown in chronological order (oldest at the top) so the discussion can be read in the order in which it was created.
- Datetimes are displayed as MM/DD/YYYY with the time shown on a 24-hour clock.  All datetimes are tracked with UTC timestamps, which are then displayed in the user's local time.
- The `<ShowIf/>` component is a helper component that allows for the display of conditional information in the JSX while maintaining a purely-declarative syntax.
- All code utilizes modern React syntax with Hooks and a strong adherence to TypeScript conventions.  There are no class-based components.

### Next Steps

The following were beyond the scope of the requested features, but would be logical to add in future iterations:

- A top nav bar that confirms the currently-logged-in user.
- Login functionality.
- Search
- The ability to click on any given user and see a new screen that shows all of their suggestions and/or all comments that they've added to existing suggestions.
- The ability to mark a suggestion as being "Resolved" or "Closed".
- The ability to mark a suggestion as being a "Duplicate" - presumably referencing another suggestion in which the main discussion may be ongoing.

### Evaluation Criteria

1. **Functionality:** I believe that this application meets all specified requirements.
2. **Code quality:** The code is carefully organized.  It uses a model where each file contains a single `export`.  Files are organized according to function (e.g., `\components`, `\enums`, `\functions`, etc.).  All shared functionality is organized under the `\common` directory.  I believe in an approach dictating that all components, objects, functions, etc. should be named as clearly as possible - thus sidestepping the need to exhaustively comment on what each part of the code _does_.
3. **Architecture:** The code should be easily extensible if new features were to be added.  Although there is only a single route, React Router was used to ensure that additional pages/modules could easily be added. 
4. **State management:** I have chosen Zustand for state management.  This approach is highly performant without all of the boilerplate which is common in Redux projects.