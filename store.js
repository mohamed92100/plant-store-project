import { createStore } from 'redux';
import cartReducer from './cartReducer.js';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cartState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error("Error loading state from localStorage:", error);
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cartState', serializedState);
    } catch (error) {
        console.error("Error saving state to localStorage:", error);
    }
};

const persistedState = loadState();

const store = createStore(
    cartReducer,
    persistedState,
    // هذا السطر لدعم Redux DevTools في المتصفح. قم بإزالته إذا واجهت مشاكل
    // أو لم تكن تستخدم DevTools
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;