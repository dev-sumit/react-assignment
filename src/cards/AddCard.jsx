import React, { useState } from "react";

import Card from "react-credit-cards";

import { formatCreditCardNumber, formatExpirationDate, SUPPORTED_CARD_TYPES } from "utils";

import { cardActions } from "_store/cards.slice";

import 'cards/styles.css';
import "react-credit-cards/es/styles-compiled.css";
import { useDispatch } from "react-redux";

const AddCard = () => {

	const [cardNumber, setCardNumber] = useState("");
	const [name, setName] = useState("");
	const [cardHolder, setCardHolder] = useState("");
	const [category, setCategory] = useState("");
	const [expirationDate, setExpirationDate] = useState("");
	const [focused, setFocused] = useState("");

	const dispatch = useDispatch();

	const handleInputChange = ({ target }) => {

		switch (target.name) {
			case 'cardNumber':
				target.value = formatCreditCardNumber(target.value);
				setCardNumber(target.value);
				break;
			case 'expirationDate':
				target.value = formatExpirationDate(target.value);
				setExpirationDate(target.value);
				break;
			case 'cardHolder':
				setCardHolder(target.value);
				break;
			case 'category':
				setCategory(target.value);
				break;
			case 'name':
				setName(target.value);
				break;
			default:
				break;
		}
	};

	const handleInputFocus = ({ target }) => {
		setFocused(target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(cardActions.addCard({
			category,
			name,
			cardExpiration: expirationDate,
			cardHolder,
			cardNumber,
		}));

		formReset();
	};


	const formReset = () => {
		setCardNumber("");
		setName("");
		setCardHolder("");
		setCategory("");
		setExpirationDate("");
	};

	return (
		<div className="add-card-container">
			<div className="App-payment">
				<h1 className="main-header add-credit-title">Add Credit Card</h1>
				<div className="credit-card-demo">
					<Card
						number={cardNumber}
						name={cardHolder}
						expiry={expirationDate}
						focused={focused}
						cvc={''}
					/>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="tel"
							name="cardNumber"
							className="form-control"
							placeholder="Card Number"
							pattern="[\d| ]{16,22}"
							required
							value={cardNumber}
							onChange={handleInputChange}
							onFocus={handleInputFocus}
						/>
						<small>E.g.: 49..., 51..., 36..., 37...</small>
					</div>
					<div className="form-group">
						<input
							type="text"
							name="cardHolder"
							className="form-control"
							placeholder="Card Holder Name"
							maxLength={25}
							required
							value={cardHolder}
							onChange={handleInputChange}
							onFocus={handleInputFocus}
						/>
					</div>
					<div className="row form-group">
						<div className="col-6">
							<input
								type="tel"
								name="expirationDate"
								className="form-control"
								placeholder="Valid Thru"
								pattern="\d\d/\d\d"
								required
								value={expirationDate}
								onChange={handleInputChange}
								onFocus={handleInputFocus}
							/>
						</div>
						<div className="col-6">
							<select 
								className="form-control" 
								name='category' 
								value={category} 
								onChange={handleInputChange}
								required
							>
								<option value="" selected disabled hidden>Select card category</option>
                                {SUPPORTED_CARD_TYPES.map((item, index) =>
                                    <option key={index} name={item.displayName} value={item.value}>{item.displayName}</option> 
                                )}
                            </select>
						</div>
					</div>
                    <div className="form-group">
						<input
							type="text"
							name="name"
							className="form-control"
							placeholder="Card Name"
							maxLength={50}
							required
							value={name}
							onChange={handleInputChange}
							onFocus={handleInputFocus}
						/>
                        <small>E.g.: Anita's HDFC Card</small>
					</div>
					<div className="form-actions">
						<button className="btn btn-primary btn-block">SUBMIT</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddCard;
