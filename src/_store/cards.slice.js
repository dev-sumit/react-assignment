import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchWrapper } from "_helpers";

// create slice

const name = "cards";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const cardActions = { ...slice.actions, ...extraActions };
export const cardsReducer = slice.reducer;

// implementation

function createInitialState() {
	return {
		cards: {},
		selectedCard: {}
	};
}

function createReducers() {
    return {
        selectCard
    };

    function selectCard(state, action) {
        state.selectedCard = action.payload;
    }
}

function createExtraActions() {
	const baseUrl = `${process.env.REACT_APP_API_URL}/v1/cards`;

	return {
		getAll: getAll(),
		addCard: addCard(),
	};

	function getAll() {
		return createAsyncThunk(
			`${name}/getAll`,
			async () => await fetchWrapper.get(baseUrl)
		);
	}

	function addCard() {
		return createAsyncThunk(
			`${name}/addCard`,
			async ({ category, name, cardExpiration, cardHolder, cardNumber }) =>
				await fetchWrapper.post(baseUrl, {
					category,
					name,
					cardExpiration,
					cardHolder,
					cardNumber,
				})
		);
	}
}

function createExtraReducers() {
	return {
		...getAll()
	};

	function getAll() {
		var { pending, fulfilled, rejected } = extraActions.getAll;
		return {
			[pending]: (state) => {
				state.cards = { loading: true };
			},
			[fulfilled]: (state, action) => {
				state.cards = action.payload;
			},
			[rejected]: (state, action) => {
				state.cards = { error: action.error };
			},
		};
	}

}
