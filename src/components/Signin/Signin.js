import React from 'react';

//Turned Signin into a smart component (aka has state), it renders all the html now, we do this in order to be able to use req.body in the post method of the RESTful API folder for encryption purposes

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }
  
  //onEmailChange to get email input's state
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  //onPasswordChange to get password input's state
  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  //onSubmitSignIn uses state to fetch Signin's route + details TO THE BACKEND API. We send email because our server.js does req.body.email
  onSubmitSignIn = () => {
    //First argument is route then second is object containing the properties we want to pass on to the API
    fetch('https://tranquil-sands-27874.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      //Sending the body, which is the email and password states
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      //The post method in the API does res.json or res.status in this case, if a res.json is given then it derives the id of the current user and then it changes the loadUser state to the user that just signed in as well as route to home
      .then(response => response.json())

      .then(user => {
        if (user.id) { //Checking if user has id
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
  }

  render() {
    const { onRouteChange } = this.props;
    return ( //Sign in form from tachyons templates
      <div>
        <div> 
           <h1>i-Recognize</h1>
            <h3>Face Recognition App</h3>
            </div>
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
                onClick={this.onSubmitSignIn} //onClick, the Signin then receives onRouteChange within onSubmitSignIn when button is clicked
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
      </div>
    );
  }
}
//In the above (line 76), at onRouteChange('register') it takes the user to the register.js form when it detects an onClick on the p element it is within.

export default Signin;