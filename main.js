import store from './redux/store.js';

const cartCountSpan = document.getElementById('cart-count');

const updateCartCount = () => {
    const state = store.getState();
    cartCountSpan.textContent = state.totalItems;
};

store.subscribe(updateCartCount);

document.addEventListener('DOMContentLoaded', updateCartCount);