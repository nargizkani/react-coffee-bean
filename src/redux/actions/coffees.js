import axios from 'axios';

export const setLoaded = (payload) => ({
    type: 'SET_LOADED',
    payload,
});

export const fetchCoffees = (sortBy, category) => (dispatch) => {
    dispatch({
        type: 'SET_LOADED',
        payload: false,
    });

    axios
        .get(
            `/coffees?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`,
        )
        .then(({data}) => {
            dispatch(setCoffees(data));
        });
};

export const setCoffees = (items) => ({
    type: 'SET_COFFEES',
    payload: items,
});
