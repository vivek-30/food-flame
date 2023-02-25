<!-- Header Logo -->
<p align="center">
  <img src="./client/src/assets/FoodFlame-logo.png" height="250" width="250" />
</p>

# FoodFlame
Manage all your favourite cooking recipes with `foodflame` app.  
Discover mouth watering dishes or share your loving recipe with others in minimal efforts.

## Table of Contents:
- [Setup and Installation](#setup-and-installation)  
- [Available Scripts](#available-scripts)  
- [API Routes](#api-routes)  
- [Schema](#schema)  
- [Available PORTS](#available-ports)

<a name="setup-and-installation"></a>

## Setup and Installation:
  1. Clone this Repo.
  ```bash
    git clone https://github.com/vivek-30/food-flame.git
  ```
  2. Start server inside `Server` directory.
  ```bash
    cd food-flame/Server
    npm install
    npm run dev
  ```
  3. Start react development environment inside `client` directory.
  ```bash
    cd food-flame/client
    npm install
    npm start
  ```

<a name="available-scripts"></a>

## Available Scripts:
__Frontend:__
  1. `npm start`  
  To start this react application.

  2. `npm run build`  
  create a production build of this app inside `/build` folder.

  3. `npm test`  
  Launches the test runner in the interactive watch mode.

  4. `npm run eject`  
  This command will remove the single build dependency from your project.

__Backend:__
  1. `npm start`  
  To start the server using `node`.

  2. `npm run devStart`  
  To start the server using `nodemon`.

<a name="api-routes"></a>

## API Routes:
__users:__
  1. `/user/sign-up` &emsp;[POST]  
  To sign up a user.

  2. `/user/log-in` &emsp;[POST]  
  To sign in a user.
  
  3. `/user/log-out` &emsp;[GET]   
  To log out a user.

__recipes:__

  1. `/recipes/` &emsp;[GET]  
  To get all recipes sorted according to their name.

  2. `/recipes/:id` &emsp;[GET]  
  To get a specific recipe having ID as `id`.

  3. `/recipes/add-recipe` &emsp;[POST]  
  To add a new recipe. (Check the schema below)

  4. `/recipes/:id` &emsp;[PUT]  
  To update a recipe having ID as `id`.

  5. `/recipes/:id` &emsp;[DELETE]  
  To remove a recipe having ID as `id`.

<a name="schema"></a>

## Schema:
__user:__
  ```js
    {
      username: String,
      email: String,
      password: String
    }
  ```
> All fields are required in case of `signup` but in case of `login` "username" can be omitted.

__recipe:__
  ```js
    {
      name: String,
      description: String,
      imageSRC: String,
      ingredients: [String],
      cookingSteps: [String]
    }
  ```
> Apart from `imageSRC` field all are required to save / create a recipe.

<a name="available-ports"></a>

## Available PORTS:
  1. `4000` - Server
  2. `3000` - Client
