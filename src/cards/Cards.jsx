import React, { useEffect } from "react";
import Card from "react-credit-cards";
import { useDispatch, useSelector } from "react-redux";
import { cardActions } from "_store";

import "cards/styles.css";
import "react-credit-cards/es/styles-compiled.css";
import CardPreview from "./CardPreview";

const Cards = () => {
	const dispatch = useDispatch();
	const { cards, selectedCard } = useSelector((state) => state.cards);

	useEffect(() => {
		dispatch(cardActions.getAll());
	}, [dispatch]);

	const selectCard = (card) => {
		dispatch(cardActions.selectCard(card));
	};

	return (
		<div className="cards-container">
			{/* No Cards Available */}
			{!cards || (!cards.loading && !Object.keys(cards).length) ? (
				<div className="no-cards-available">No Cards Available</div>
			) : (
				<div className="cards">
					<div className="card-stack-container">
						<h3 className="side-header">Credit Cards</h3>
						<div className="App-cards">
							<div className="cards-list">
								{cards &&
									!cards?.loading &&
									!cards?.error &&
									Array.isArray(cards?.results) &&
									cards?.results.map((card, index) => (
										<div
											key={index}
											className="card-view"
											onClick={() => selectCard(card)}
										>
											<Card
												name={card.cardHolder}
												number={card.cardNumber}
												expiry={card.cardExpiration}
												cvc={""}
											/>
										</div>
									))}
							</div>
						</div>
					</div>

					<div className="cards-preview-container">
						<h3 className="side-header">Card Preview</h3>
						<CardPreview card={selectedCard} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Cards;
