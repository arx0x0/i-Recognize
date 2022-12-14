import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  //Using control flow to change what the user sees by passing in onRouteChange and isSignedIn, we can alter showing a Sign Out input for home screen and a Sign Out input for Sign In screen
    if (isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
      );
    } else { //For when the user wants to sign in or register, the onRouteChange is called, isSigned in is false, until user clicks sign in or register with right credentials
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
          <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
        </nav>
      
      
      );
    }
    //Again signin and register work the same way above, it renders the register section using onRouteChange if sign in is clicked for example
    //AND we return the components over to App.js which renders them appropriately in index.js then index.html
}

export default Navigation;