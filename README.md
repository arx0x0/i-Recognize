# i-Recognize

Fullstack Face Recognition Web Application, that upon an image url submit, surrounds the entered face with a detection box, then creates a QR code, the amount of user entries, and a cropped image of the user, all within a unique ID card. Users must register and then sign in to use the app. 
Note that if the box does not show up, there may be ongoing updates to the Clarifai API.

<img width="1440" alt="Screen Shot 2022-09-19 at 2 27 05 PM" src="https://user-images.githubusercontent.com/93293461/191563940-e2f52932-3d0e-4f4b-b2a7-c9c9412eda20.png">


## Deployment

https://i-recognize.herokuapp.com/

## Built With

### Front End
* [React](https://reactjs.org/docs/getting-started.html) - React-Native to create components and subcomponents with State, with promises to send user input to server
* [Tachyons](https://tachyons.io/) - For styling
### Back End
* [Clarifai](https://www.clarifai.com/) - Integrated the AI Face Detection Model to detect faces
* [Node+Express](https://nodejs.org/en/) - Used to make a RESTful API and server
* [PostgreSQL](https://www.postgresql.org/) - Database for user image entries and login/registration information
* [Knex](https://knexjs.org/) - Used to connect server to database
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - npm package for hashing user passwords

## Authors

* **Abdul Rahim Shami** - *Primary Creator* 

## Acknowledgments

* Huge props to Andrei Neagoie and Zero to Mastery Academy for teaching the basic functionality. 
* Used Readme template from PurpleBooth
