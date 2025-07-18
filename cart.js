import store from './redux/store.js';
import { removeItem, increaseQuantity, decreaseQuantity } from './redux/actions.js';

const cartItemsContainer = document.getElementById('cart-items-container');
const totalPlantsCountSpan = document.getElementById('total-plants-count');
const totalCartCostSpan = document.getElementById('total-cart-cost');
const checkoutBtn = document.getElementById('checkout-btn');

const renderCart = () => {
    const state = store.getState();
    const { cartItems, totalItems, totalCost } = state;

    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>عربة التسوق فارغة.</p>';
    } else {
        cartItems.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-thumbnail">
                <h3>${item.name}</h3>
                <div class="price-quantity">
                    <p>السعر: $${item.price.toFixed(2)}</p>
                    <p>الكمية: <span class="item-quantity">${item.quantity}</span></p>
                </div>
                <button class="increase-btn" data-product-id="${item.id}">+</button>
                <button class="decrease-btn" data-product-id="${item.id}">-</button>
                <button class="remove-btn" data-product-id="${item.id}">حذف</button>
            `;

            cartItemDiv.querySelector('.increase-btn').addEventListener('click', () => {
                store.dispatch(increaseQuantity(item.id));
            });
            cartItemDiv.querySelector('.decrease-btn').addEventListener('click', () => {
                store.dispatch(decreaseQuantity(item.id));
            });
            cartItemDiv.querySelector('.remove-btn').addEventListener('click', () => {
                store.dispatch(removeItem(item.id));
            });

            cartItemsContainer.appendChild(cartItemDiv);
        });
    }

    totalPlantsCountSpan.textContent = totalItems;
    totalCartCostSpan.textContent = totalCost.toFixed(2);
};

checkoutBtn.addEventListener('click', () => {
    alert("وظيفة الخروج ستكون متاحة قريباً!");
});

store.subscribe(renderCart);

document.addEventListener('DOMContentLoaded', renderCart);