# Gerrit – Chat with people nearby! (3rd Bootcamp Project - Week 9)

For our final project as web development students at Ironhack Berlin we created a mobile web application. We decided to build a chat platform with predefined chatrooms that are only open to users in the same approximate geolocation. In other words: It lets you chat to randoms close by.

To check our deployed version, follow this link: https://justgerrit.herokuapp.com

## Getting started

### Prerequisites

The required packages should be installed by running the following commands:

in the root:

```
npm install
npm install bootstrap react-bootstrap socket.io
npm install heroku-ssl-redirect
node bin/seed
```

in the client folder:

```
npm install
npm install --save passport-local passport bcryptjs  express-session
npm install react-router-dom axios react-map-gl
```

### Features
- Authentication
- Geographically restrained chatrooms
- User profiles
- Interactive Map

### Testing

To test the code run the following commands:

in the root

```
npm run dev
```

in the client folder:

```
npm start
```

## Built With

- [React](https://reactjs.org/) - The web framework used
- [MongoDB](https://www.mongodb.com/) - Used Database
- [Node.js](https://nodejs.org/en/) - Our server environment

## Authors

- **Fabian Scherer** - [github](https://github.com/fabianschu)
- **Are W. Sandvik** - [github](https://github.com/arews)
- **Noam Rubin** - [github](https://github.com/noamrubin22)

## Acknowledgments

- Ironhack Berlin
- Montasar Jarraya (our teacher)
- Pierre Portal (TA)
- André de Albuquerque (TA)
- Dalina Weidinger (TA)
- Svenja Maria Katharina Weiler (TA)
