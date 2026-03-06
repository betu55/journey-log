## Overview
Journey Log is a medium-fidelity, single-user web app for logging interesting places as cards (location, site name, photo, description, rating).

In the future, Journey Log can be extended into an application with multi-user support, authentication and authorization, and richer interaction with posted content, such as searching/filtering, likes, and comments.

## Documentation
##### There are two ways of running this project:

1. In the root directory (Easier), uses a package called *concurrently*

```bash
  npm install
  npm run install-all
  npm run dev
```

- This will install dependencies for the client and server modules, then run both concurrently.

2. Use two separate terminals (classic way), to go under each directory `/client` and `/server` and run the following:
```bash
  npm install
  npm run dev
```

- Once the project is up and running, click the URL in your terminal, and the app will open in a new tab on your browser.

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

  - Migrated from using a JSON file for data storage to a MongoDB database, which uses the old JSON to initialize data for the first time

  - Modularized the backend for easier navigation and separation of logic. folders like: routes (purely managing the routes), services(where the backend logic for communicating and updating the DB lies), controllers(appropriate status codes and api calls are handled here).

  - Made use of modals so that user can update or view a card by clicking on the card or pushing the edit button.

  - Expanded PlaceCard feature: When a place is clicked a popup appears with an expanded view of the log. This includes the pinned location of the place on an interactive map using leaflet.

  - Location Coordinate lookup: The first time a PlaceCard is clicked and expanded, the backend calls nominatim openstreetmap api to fetch coordinates and saves the data to MongoDB for future use.

3. Challenges

  - Environment Configuration: We overcame persistent Git 403 Forbidden errors by migrating the workflow to a macOS environment.

  - Challenges with installing MongoDB on older macOS environment, solved by migrating to Windows

  - Backend codebase was beginning to grow longer and harder to maintain, solved by refactoring code to make it more modular. Seperated backend into controller, routes, services and initialization scripts.
