import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
  return (
    <div>
      <p className='f3 ma3'>
        {'The Detect button tracks faces in your pictures and generates a personalized ID card with a QR Code, paste in a link and get started!'}
      </p>
      <div className='center'>
        <div className='form center pa4 ma3 br3 shadow-5'>
        <input type='text' className='f4 pas2 w-70 center' onChange={onInputChange} /> 
          <button 
          className='w-30 grow f4 link ph3 pv2 dib white bg-purple'
          onClick = {onButtonSubmit}
          >Detect</button>
        </div>

      </div>

    </div>
  );
}

//{onInputChange} this gives the onInputChange function in App.js, an instantaneous state, whereas {onButtonSubmit} gives a signal to other promises and functions to run now that the data has been sent out 

export default ImageLinkForm;