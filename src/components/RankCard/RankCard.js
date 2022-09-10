import React from "react"
import './RankCard.css';
import {QRCodeSVG} from "qrcode.react";


const RankCard = ({ imageUrl, name, entries }) => {

  return (

    <div className=''>
        <section className="section-contact">
        <div className="contact-card">
            <div className="card-image move">
                <img alt='' src={imageUrl} width='150px'/>
                <h2>{name}</h2>
            </div>
            <div className="card-text">
                <p>  {`Image Entry Count: ${entries}`} </p>
                <p>  KEEP UPLOADING </p>
            </div>
            <div className="card-text move">
              <h3 class="down">Unique QR Code:</h3>
            <QRCodeSVG value={imageUrl}/>
            </div>
        </div>
        </section>
    
    </div>
  );
}

export default RankCard;