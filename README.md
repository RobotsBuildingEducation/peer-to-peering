# peer-to-peering

This software represents a skeleton for a social media application

## Environment variables

We are currently using one environment variable in the codebase, `VITE_FIREBASE_API_KEY`. This is a `.env` file under under `/client`, but it does not dislay on Github because it's listed under the `.gitignore` file under `/client`. You will need to connect your own Firebase API key when setting up your project with firebase:

In the future, it's likely we will use another environment variable to store OpenAI's API key under `client/functions`

## Frontend

The application uses a common way to setup React applications with Vite.
<br>
<br>

## Firebase

The application is using a common cloud provider with Google's Firebase.

The application is using the following firebase web services:

1. Authentication
2. Firestore
3. Hosting
4. Storage
5. Functions

In the future, it may use the following services:

- Extensions
- Machine Learning
- Analytics

## Dependencies

npm is used to install the following packages:

1. firebase
   Used to connect firebase to the frontend

2. react-firebaseui
   Used to render the login UI

3. lodash
   Used to handle common javascript logic and functionality
