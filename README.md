
Movie Review App
A simple web app to add movies, display them with details, and allow users to submit their reviews and ratings.

Features:
Add new movies with details like title, director, genre, release year, initial rating, review, and poster.

Display all added movies on the homepage with thumbnails and basic info.

View detailed information about each movie on a separate page.

Submit user reviews and ratings (1 to 5).

View all user-submitted reviews along with average rating for each movie.

Tech Stack:
Backend: Node.js, Express.js
Database: MongoDB with Mongoose
Frontend: EJS templating, Tailwind CSS for styling
Others: HTML5, JavaScript

Connect to MongoDB in Visual Studio Code
Visual Studio Code has great support for working with MongoDB databases.
We can create, manage, and query MongoDB databases from within VS code.

Step 1: First we need to install an extension in VS code.
"MongoDB for VS code"

Step 2: Connect to MongoDB.
default is a local MongoDB server at mongodb://127.0.0.1:27017

Note: Make sure your MongoDB server (mongo.exe) is running if you are connecting to a local MongoDB server.

Step 3: Let’s attach a MongoDB shell to the active connection.

Note: Make sure the MongoDB shell (mongo or mongosh) is installed and is on your path.

Step 4: MongoDB commands
There are MongoDB specific commands available in the VS Code Command Palette (Ctrl+Shift+P) as well as
through Explorer context menus.

Step 5: Using Playground inside Visual Studio Code. (Quick and easy way to query MongoDB).
Playgrounds let you create, run, and save MongoDB commands from a VS Code editor.

6.Run the app
node index.js
Open your browser and go to http://localhost:3000

Project Structure
movie-review-app/
│
├── public/             # Static files (e.g. images)
│   └── images/
│
├── views/              # EJS templates
│   ├── index.ejs
│   ├── movie.ejs
│   └── add.ejs
│
├── index.js            # Main server file
├── package.json
└── README.md

Acknowledgements
Tailwind CSS
EJS
MongoDB

