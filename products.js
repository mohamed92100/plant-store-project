import store from './redux/store.js';
import { addItem } from './redux/actions.js';

const products = [
    { id: 1, name: 'نبتة العنكبوت', price: 12.00, category: 'beginner-plants', image: 'images/plant1.jfif' },
    { id: 2, name: 'الصبار', price: 8.50, category: 'beginner-plants', image: 'images/plant2.jpg' },
    { id: 3, name: 'زنبق السلام', price: 20.00, category: 'flowering-plants', image: 'images/plant3.webp' },
    { id: 4, name: 'الأوركيد', price: 35.00, category: 'flowering-plants', image: 'images/plant4.webp' },
    { id: 5, name: 'فيلودندرون', price: 18.00, category: 'shade-plants', image: 'images/plant5.jfif' },
    { id: 6, name: 'نبتة الثعبان', price: 15.00, category: 'shade-plants', image: 'images/plant6.webp' },
];

const renderProducts = () => {
    document.getElementById('beginner-plants').innerHTML = '';
    document.getElementById('flowering-plants').innerHTML = '';
    document.getElementById('shade-plants').innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-thumbnail">
            <h3>${product.name}</h3>
            <p>السعر: $${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-product-id="${product.id}">أضف إلى السلة</button>
        `;

        const addButton = productDiv.querySelector('.add-to-cart-btn');
        const state = store.getState();
        if (state.cartItems.some(item => item.id === product.id)) {
            addButton.disabled = true;
        }

        addButton.addEventListener('click', () => {
            store.dispatch(addItem(product));
            addButton.disabled = true;
        });

        document.getElementById(product.category).appendChild(productDiv);
    });
};

document.addEventListener('DOMContentLoaded', renderProducts);

store.subscribe(() => {
    const state = store.getState();
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        const productId = parseInt(button.dataset.productId);
        // إذا كان المنتج موجوداً في السلة، قم بتعطيل الزر
        if (state.cartItems.some(item => item.id === productId)) {
            button.disabled = true;
        } else {
            // إذا تم إزالة المنتج من السلة (من صفحة السلة)، يمكنك هنا إعادة تفعيل الزر
            // (هذا ليس مطلوباً صراحةً في المعايير "بعد تحديده، يصبح الزر معطلاً" يشير لتعطيل دائم)
            // ولكن لأي تطبيق حقيقي، ستفعل هذا:
            // button.disabled = false;
        }
    });
});