const initialState = {
    cartItems: [],
    totalItems: 0,
    totalCost: 0
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const newItem = action.payload;
            const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id);

            if (existingItemIndex > -1) {
                const updatedCartItems = state.cartItems.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return {
                    ...state,
                    cartItems: updatedCartItems,
                    totalItems: state.totalItems + 1,
                    totalCost: state.totalCost + newItem.price
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...newItem, quantity: 1 }],
                    totalItems: state.totalItems + 1,
                    totalCost: state.totalCost + newItem.price
                };
            }

        case 'REMOVE_ITEM':
            const itemIdToRemove = action.payload;
            const itemToRemove = state.cartItems.find(item => item.id === itemIdToRemove);

            if (itemToRemove) {
                return {
                    ...state,
                    cartItems: state.cartItems.filter(item => item.id !== itemIdToRemove),
                    totalItems: state.totalItems - itemToRemove.quantity,
                    totalCost: state.totalCost - (itemToRemove.price * itemToRemove.quantity)
                };
            }
            return state;

        case 'INCREASE_QUANTITY':
            const itemIdToIncrease = action.payload;
            const increasedCartItems = state.cartItems.map(item =>
                item.id === itemIdToIncrease
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            const itemIncreased = state.cartItems.find(item => item.id === itemIdToIncrease);
            return {
                ...state,
                cartItems: increasedCartItems,
                totalItems: state.totalItems + 1,
                totalCost: state.totalCost + (itemIncreased ? itemIncreased.price : 0)
            };

        case 'DECREASE_QUANTITY':
            const itemIdToDecrease = action.payload;
            const updatedDecreasedCartItems = state.cartItems.map(item =>
                item.id === itemIdToDecrease
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );

            const itemDecreased = state.cartItems.find(item => item.id === itemIdToDecrease);
            if (itemDecreased && itemDecreased.quantity === 1) { // إذا كانت الكمية 1 وأصبحت 0، قم بحذفه
                return {
                    ...state,
                    cartItems: updatedDecreasedCartItems.filter(item => item.quantity > 0),
                    totalItems: state.totalItems - 1,
                    totalCost: state.totalCost - itemDecreased.price
                };
            } else if (itemDecreased && itemDecreased.quantity > 1) {
                return {
                    ...state,
                    cartItems: updatedDecreasedCartItems,
                    totalItems: state.totalItems - 1,
                    totalCost: state.totalCost - itemDecreased.price
                };
            }
            return state; // لا تفعل شيئًا إذا كانت الكمية بالفعل 0 أو أقل

        default:
            return state;
    }
};

export default cartReducer;