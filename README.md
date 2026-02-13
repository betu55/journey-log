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

1. Submitted Content

    The project delivers a polished, responsive interface across four main views: Home, Add Place, About, and a custom 404 page.

2. Successes & Achievements

  - Navigation Bar: provides intuitive transitions between routes, maintaining a professional look and feel throughout the application.

  - Highly reusable Button component: serves multiple purposes—from submitting forms to deleting logs and navigating back to home.

  - Dynamic UI with PlaceCards: elegantly display travel logs, integrating delete triggers for a clean user interface.

  - Successful data flow: users can add a new journey and see it instantly rendered as a new card on the dashboard.

  - Solid navigation structure: includes a custom 404 handler that ensures a smooth user experience even when a path is not found.

  - Live search feature: Allows for easy search and displays places by place name

3. Challenges

    Environment Configuration: We overcame persistent Git 403 Forbidden errors by migrating the workflow to a macOS environment.