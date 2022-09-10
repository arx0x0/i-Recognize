import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    //Setting state values to initially be empty 
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  
  //Everything is the same as in Signin component, but now we are dealing with an extra state being name, so we set the state of name to be equal the event.target.value with the virtual DOM 
  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  //The API fetches the below with the register route specified, the app.post method, headers being JSON input here, and then the actual req.body content for the post method being lines 33-36
  onSubmitSignIn = () => {
    fetch('https://tranquil-sands-27874.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
    //If all of the above are true and match; then run the following promise: 
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          //Passing the user object from App.js, need this.props as whole app uses it and loadUser is a function in App.js
          this.props.loadUser(user) //This here refers to in the Register object to use loadUser exclusively onSubmitSignIn 
          //Referencing home from app.js, as onRouteChange was passed as a prop into Register.js
          this.props.onRouteChange('home');
        }
      })
  }

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;