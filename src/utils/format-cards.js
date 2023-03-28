import Payment from "payment";

function clearNumber(value = "") {
	return value.replace(/\D+/g, "");
}

export const SUPPORTED_CARD_TYPES = [
    {
        displayName: 'Visa',
        value: 'VISA'
    },
    {
        displayName: 'Master Card',
        value: 'MC'
    },
    {
        displayName: 'Amex',
        value: 'AM'
    }
];

export function formatCreditCardNumber(value) {
	if (!value) {
		return value;
	}

	const issuer = Payment.fns.cardType(value);
	const clearValue = clearNumber(value);
	let nextValue;

	switch (issuer) {
		case "amex":
			nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
				4,
				10
			)} ${clearValue.slice(10, 15)}`;
			break;
		default:
			nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
				4,
				8
			)} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
			break;
	}

	return nextValue.trim();
}

export function formatExpirationDate(value) {
	const clearValue = clearNumber(value);

	if (clearValue.length >= 3) {
		return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
	}

	return clearValue;
}
