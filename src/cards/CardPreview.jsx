import React from 'react';

import Card from 'react-credit-cards';
import "react-credit-cards/es/styles-compiled.css";

const CardPreview = (props) => {
    
    const {
        card
    } = props;

    return (
        <>
            {
                (!card || !Object.keys(card).length) ?
                <div className='empty-card-preview'>
                    <div className='empty-preview-message'>*Click on one of card to preview here.</div> 
                </div>
            :
                <div className='card-preview'>
                    <h3 className='card-preview-title' >{card.name}</h3>
                    <Card
                        name={card.cardHolder}
                        number={card.cardNumber}
                        expiry={card.cardExpiration}
                        cvc={''}
                    ></Card>
                </div>
            }
        </>
    )
}

export default CardPreview