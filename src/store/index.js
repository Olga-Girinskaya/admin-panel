import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'
import filters from '../reducers/filters';
import heroes from '../reducers/heroes';

//Middleware
const stringMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action);
}

// //enhancer
// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action);
//     }
//     return store;
// }

const store = createStore( 
    combineReducers({heroes, filters}),
    compose(applyMiddleware(thunk, stringMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    // compose(
    //     enhancer, //  Этот аргумен первый, потомуч то он включает в себе работу со строками, если поменять местами и придет строка, то программа упадет
    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;