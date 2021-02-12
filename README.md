I-Do-It!
=========

## Description

I-Do-It! is an application made by Ian Lam, Mustafa Al-Ani, and Taylor Ivings for their Lighthouse Labs midterm project. It is a smart to do list
application, capable of taking a user's input, and returning a 'todo' with the correct category for the user's input (buy, read, eat and watch). 
If the program does not get the category correct, users have an option to either edit or delete the todo. Todos can be filtered by category, and once
completed, can be marked as such and are removed from the main page into their own completed filter.



## Getting Started

1. Install dependencies: `npm i`
2. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
3. Run the server: `npm run local`
4. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x


## USER STORIES

As a user, I want to be able to create a todo list which categorizes my selections based on one of 4 categories because I thrive on being organized.
As a user, I want to be able to see each individual list on its own, or a combination of lists together because sometimes I want to focus on specific tasks.
As a user, I want to be able to change the category of a submission if it is incorrect because technology isn't perfect
As a user, I want to be able to log in, log out, and change my profile because I want to customize my space.
As a user, I shouldn't be able to access other user's lists because I do not own those todo lists.
As a user, I shouldn't be able to change someone else's profile or log in as them because I do not own their user profile.
If I am not logged in, I should not be able to do much at all because I need to be logged in for the app to work.

## STRETCH GOALS
- HEROKU DEPLOYMENT
- Instead of returning just the user's input, return something related to input (recipe for food, movie or book infomation etc.)
- Indicator of a todo that has passed it's date





















