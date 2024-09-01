import { configureStore } from '@reduxjs/toolkit';
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

const store = configureStore({
    reducer: {filters, heroes},
    moddleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
    devTools: process.env.NODE_ENV !== 'prodaction' ,
})
// const store = createStore( 
//     combineReducers({heroes, filters}),
//     compose(applyMiddleware(thunk, stringMiddleware),
//             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//     );

export default store;