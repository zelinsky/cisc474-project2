# API
The *api* folder contains the API.

### Requirements
* Node.js
* npm
* mongodb

You can build and run the API with:
* `npm run build`
* `npm start`

The API expects mongodb to be running at 127.0.0.1:27017, but this can be changed in src/server.ts.

The API runs on port 3000 by default.


# Angular Application
The *angular* folder contains the Angular app.

### Requirements
* Angular 8

You can run the app with:
* `ng serve*

This will run the app on port 4200.

To change the API url the app makes requests to, edit the envrionment files in src/envrionments/.
