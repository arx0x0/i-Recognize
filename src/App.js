import React, { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import RankCard from './components/RankCard/RankCard';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import './App.css';

window.process = {
  env: {
      NODE_ENV: 'development'
  }
}

//Important: Throughout the code, 'this' usually refers to an object generated in response to a user input, like this.calculateFaceLocation is referring to the current user input and other methods may refer to other instant user properties

const initialState = { //Using initialState to be able to clear all values such as inputted images when another user signs in 
  input: '',
      imageUrl: '',
      box: {},
      route: 'signin', //Keeps track of where we are on page
      isSignedIn: false, //Default to keep newcomers locked out, it defaults to route 'signin' as on line 155
      //The user's state gets passed into register and signin as props and the user state keeps changing depending on the signin and register's state + control flow changes
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
     }
}
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  //loadUser allows us to set the state with the approved user we receive from Signin or from register, data here is referring to the state data received from SignIn.js and Register.js, so loadUser allows us to alter the state of user in the constructor and to be altered throughout the entire react app 
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

 
    //Returning an object containing the height and width of the image and setting boundary dimensions
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

    //Below function uses what calculateFaceLocation returns and sets its state as box, which then gets passed into FaceRecognition as props and puts a border/box around the face (if not working, issue with API itself)
  displayFaceBox = (box) => {
    this.setState({box: box});
  }


  //Setting the current value to what the user enters for any components using onInputChange
  onInputChange = (event) => { //getDerivedStateFromProps                         
    this.setState({input: event.target.value});
  }

    //On each ButtonSubmit set the state of imageUrl to current, use a promise to receive the clarifai api's face detect model + image input, then send the response object into calculateFaceLocation to detect where the face is and its width/height
  onButtonSubmit = () => { //compdidmount
    this.setState({imageUrl: this.state.input});
    fetch('https://tranquil-sands-27874.herokuapp.com/imageurl', { //Server picks this up
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      //Just the client side sending the server id as raw JSON
      body: JSON.stringify({ //
        input: this.state.input 
      })
    })
      .then(response => response.json()) //Retreiving server api response
      .then(response => { //If promise is fulfilled and Clarifai gives us a response being the second argument aka image input
        console.log('hi', response)
        if (response) { 
          fetch('https://tranquil-sands-27874.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            //Just the client side sending the server id as raw JSON
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            //Then waiting for a server's response
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log) //For error handling; place after every promise
        }
        //this.displayFaceBox runs the result of this.calculateFaceLocation(response) --> response being from image put route
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }


  //Function to detect route changes and set state of isSignedIn appropriately which then signals the program to change the route to home if isSignedIn: true
  onRouteChange = (route) => { //shouldcompupdate
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    } 
    this.setState({route: route}); //Setting the current state of route to depend on what it is given, such as register for example
    
  }

    //Rendering components and passing in instant states as their props, for example FaceRecognition shows the image in the bottom and adds a bounding box around the user's face, whereas ImageLinkForm takes the instant change in input and button submit and enables users to send data through the html elements of ImageLinkForm

  render() {
    //Destructuring variables to avoid repetition, again we are returning all of the html elements to index.js which then displays on index.html 
    const { isSignedIn, imageUrl, route, box } = this.state;

    return (
      <div className="App">

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <RankCard
                //Passing the name + #entries of the current user
                name={this.state.user.name}
                entries={this.state.user.entries}
                imageUrl = {this.state.imageUrl}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                catchUrl={this.catchUrl}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />

      
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
       <ParticleBackground/>
      </div>
      //What is happening above is that, if the current route is home then display the logo, rank, imagelinkform, and FaceRecognition, components, then: to specify else if route===signin then display the Signin component and then : is used to say else if then display Register component 
    );
  }
}


export default App;
