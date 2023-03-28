import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddCardImage from 'assets/add-payment-card-svgrepo-com.svg';
import CreditCardsImage from 'assets/pay-by-credit-card-svgrepo-com.svg';

export { Home };

function Home() {
    const { user: authUser } = useSelector(x => x.auth);

    const navigate = useNavigate();

    return (
        <div>
            {authUser?.user?.name && <h1 className='main-header'>Hi, {authUser?.user?.name}!</h1>}

            <div className='card-sections'>
                <div className="section" onClick={() => navigate('/cards/new') }>
                    <div className='section-button'>
                        <img className='section-image' src={AddCardImage} alt='add card' />
                        <div>Add Card</div>
                    </div>
                </div>
                <div className='section'>
                    <div className='section-button' onClick={() => navigate('/cards')}>
                        <img className='section-image' src={CreditCardsImage} alt='cards' />
                        <div>Cards</div>
                    </div>
                </div>
            </div>

        </div>
    );
}
