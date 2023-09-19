import { userService } from "../services/user.service.local.js"
import { utilService } from "../services/util.service.js"
import { todoService } from "../services/add-contact.service.js"

const { createStore, compose } = Redux

// export const SET_CARS = 'SET_CARS'
// export const REMOVE_CAR = 'REMOVE_CAR'

// export const SET_CART_IS_SHOWN = 'SET_CART_IS_SHOWN'
// export const REMOVE_CAR_FROM_CART = 'REMOVE_CAR_FROM_CART'
// export const ADD_CAR_TO_CART = 'ADD_CAR_TO_CART'
// export const CLEAR_CART = 'CLEAR_CART'

export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'
export const SET_USER_TODO = 'SET_USER_TODO'
export const SET_FILTER = 'SET_FILTER'
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const SET_FILTER_SELECT = 'SET_FILTER_SELECT'
export const ADD_ACTIVITY = 'ADD_ACTIVITY'
export const SET_USER_PREF = 'SET_USER_PREF'
export const SET_USER_FULLNAME = 'SET_USER_FULLNAME'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'


const initialState = {
    loggedinUser: userService.getLoggedinUser(),
    filterBy: todoService.getDefaultFilter(),
    todos: []
}

function appReducer(state = initialState, action) {
    let user
    let filterBy
    let todos
    switch (action.type) {
        case SET_USER:
            return { ...state, loggedinUser: action.user }
        case SET_USER_BALANCE:
            user = { ...state.loggedinUser, balance: action.balance }
            return { ...state, loggedinUser: user }
        case SET_USER_TODO:
            user = { ...state.loggedinUser, todos: action.todos }
            return { ...state, loggedinUser: user }
        case SET_USER_PREF:
            user = {...state.loggedinUser, prefs: action.prefs}
            return {...state, loggedinUser: user}
        case SET_USER_FULLNAME:
            user = {...state.loggedinUser, fullname: action.fullname}
            return {...state, loggedinUser: user}
        case SET_FILTER:
                return {...state,filterBy: { txt: action.filter.txt, sortBy: action.filter.sortBy}}
        case SET_TODOS:
            return { ...state, todos: action.todos }
        case UPDATE_TODO:
            todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }
        case ADD_TODO:
             todos = [...state.todos, action.savedTodo]
             return { ...state, todos }
        case REMOVE_TODO:
            todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }
        case ADD_ACTIVITY:
            return {...state, activities: action.activity}
        default:
            return state
    }
}

// // Cars
// case SET_CARS:
//     return { ...state, cars: action.cars }

// case REMOVE_CAR:
//     cars = state.cars.filter(car => car._id !== action.carId)
//     return { ...state, cars }

// case ADD_CAR:
//     cars = [...state.cars, action.car]
//     return { ...state, cars }

// case UPDATE_CAR:
//     cars = state.cars.map(car => car._id === action.car._id ? action.car : car)
//     return { ...state, cars }


// // Shopping Cart
// case SET_CART_IS_SHOWN:
//     return { ...state, isCartShown: action.isCartShown }

// case ADD_CAR_TO_CART:
//     shoppingCart = [...state.shoppingCart, action.car]
//     return { ...state, shoppingCart }

// case REMOVE_CAR_FROM_CART:
//     shoppingCart = state.shoppingCart.filter(car => car._id !== action.carId)
//     return { ...state, shoppingCart }

// case CLEAR_CART:
//     return { ...state, shoppingCart: [] }

// // User
// case SET_USER:
//     return { ...state, loggedinUser: action.user }

// case SET_USER_SCORE:
//     const user = { ...state.loggedinUser, score: action.score }
//     return { ...state, loggedinUser: user }



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(appReducer, composeEnhancers())

window.gStore = store


// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })

