## Overview
Journey Log is a medium-fidelity, single-user web app for logging interesting places as cards (location, site name, photo, description, rating). The current version is not full MERN and uses a Node.js/Express server with a JSON-based data store to support basic REST actions (view, add, delete).

In the future, Journey Log can be extended into a full MERN application with multi-user support, authentication and authorization, and richer interaction with posted content such as searching/filtering, likes, and comments.

## Documentation
##### There are two ways of running this project:

1. In the root directory (Easier), uses a package called *concurrently*

```bash
  npm install
  npm run install-all
  npm run dev
```

- This will install dependencies for the client and server modules then run both concurrently.

2. Use two separate terminals (classic way), to go under each directory `/client` and `/server` and run the following:
```bash
  npm install
  npm run dev
```

- Once the project is up and running click the url in your terminal and the app will open in a new tab on your browser.

## Reflection
*Work in progress*