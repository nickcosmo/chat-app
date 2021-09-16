# chat-app

This is my submission to this full stack [dev challenge](https://devchallenges.io/challenges/UgCqszKR7Q7oqb4kRfI0) (although I took some creative liberties).

What does this app do? - This is a full stack real time messaging application utilizing full stack JavaScript (see below for complete stack details). Some key features of this application include:
-   Authentication - using JWT or third party auth utlizing both Google and Github sign in options.
-   Real Time Communication - messages are sent in each channel in real time thanks to [Socket.io](https://socket.io/).
-   REST API Architecture - the back end is a Node.js application which processes requests from the user to fetch data and process user actions.

See the live site [here](https://chat-app-7c403.web.app/)!

## Tech

-   Front End: Vue, Vuetify
-   Back End: Node, Express, MongoDB, socket.io
-   Hosting with Firebase and Google App Engine

## Challenge

Fulfill user stories below:

-   [x] I can create a new channel with a name and description
-   [x] I can select a channel of my choice
-   [x] When I select a channel, I am added as a member of the channel
-   [x] I can see members of the channel
-   [x] I can send a message
-   [x] I can see other people's messages
-   [x] I can search for a group (optional)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
