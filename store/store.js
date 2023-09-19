import { contactReducer } from "./reducer/contact.reducer.js"

const { createStore, compose, combineReducers } = Redux

const rootReducer = combineReducers({
    contactModule: contactReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store

// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })

