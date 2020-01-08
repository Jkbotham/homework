# Homework - 14: Understanding The Code

## Task: 

```
AS A developer

I WANT a walk-through of the codebase

SO THAT I can use it as a starting point for a new project

```

---
### **server.js**

This file is the heart of the application and does all of the routing.  It calls required packages and external js files and folders allowing the rest of the application to use the packages.  This file is run by using 'node server.js' command. when run it syncs the mysql database with the models in the models folder and express beginings listening on port 8080.


Packages:
- express
- express-sessions
- mysql2
- passport
- passport-local
- bcryptsjs
- sequelize


Files and Folders linked to server.js
- config/passport
- models
- routes/hmtl-routes.js
- routes/api-routes.js


### **package.json**

>Package.json is a record of all node packages and dependences those packages require that are being used in the application.  These can easily be installed by running command 'npm i'.

---
### **/Config**

**config.json**   

>This contains the information about the applications MySQL server it will be using.  It provides username, password, database name, the ip address, and what dialect it will use to interface with the server.

**passport.js**

>This file defines the authentication process for passport. It specifies the type of username and password we are expecting and if than statments to return to the user if the password or username does not meet necessary parameters. Files and Folders linked to passport.js: /models and exporting 'passport'


---
### **/Config/Middleware**

**isAuthenticated.js**

>Restricts users from accessing routes they are not permitted to visit.

---

## **/Models**
>Models are used by sequelize to define tables and columns in a MySQL database.

**index.js**

>Index is the main config file used by sequelize.  Runs the interaction between the server and MySQL database

**user.js**

>defines a single table in the database named user. this file also defines a prototype being used to check the unhashed password against the hashed password stored in the database, and adds a hook to hash the users password using bcrypt package. User has a email column and a password column.  The email is a string, is not allowed to be empty, is unique to the database, and is using a validation of email. The password is a string and is not allowed to be empty. 

---

## **/public**
>The public folder (as defined in server.js) is avalible to the public that contains the html, css, and js files to run the website. The three differnt sites that make up the website are login.html, members.html, and signup.html. login.html requires style.css and login.js. members.html requires style.css and members.js. signup.html requires style.css and signup.js

---
### **/public/js**
**login.js**  
>Contains the functions being run when a user attempts to login.  Receives the username and password and posts  it to the /api/login route before redirecting the user to either a members site or returning an error.

**members.js**

>Contains a simple get request requesting the current users data from /api/user_data 

**signup.js**

>similar to login but intead allows the user to create an account, then posts the login information to /api/signup route and is redirected to the members page if no errors are returned.

---

### **/public/stylesheets**

**style.css**  
>Provides styling to login.html, members.html, and signup.html

---

## **/routes**

**api-routes.js**

>Contains api requests made by the website.  Within this file we have a route to create a new users, a user logout route, and a route to return user data 

**html-routes.js**

>This file is used to return the user with one of the three html pages based on the url the user goes to or are directed to by the application. 

 