export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item
});

export const removeItem = (id) => ({
    type: REMOVE_ITEM,
    payload: id
});

export const increaseQuantity = (id) => ({
    type: INCREASE_QUANTITY,
    payload: id
});

export const decreaseQuantity = (id) => ({
    type: DECREASE_QUANTITY,
    payload: id
});