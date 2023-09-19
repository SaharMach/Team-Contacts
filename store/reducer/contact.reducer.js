// import { todoService } from "../services/todo.service.js"

// export const SET_FILTER = 'SET_FILTER'
export const SET_CONTACT = 'SET_CONTACT'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'
// export const SET_FILTER_SELECT = 'SET_FILTER_SELECT'
// export const ADD_TODO = 'ADD_TODO'
// export const UPDATE_TODO = 'UPDATE_TODO'
export const CONTACT_UNDO = 'CONTACT_UNDO'


const initialState = {
    // filterBy: todoService.getDefaultFilter(),
    contacts: [],
    lastTodos: []
}

export function contactReducer(state = initialState, action) {
    let contacts
    let lastContact
    switch (action.type) {
        case SET_CONTACT:
            lastContact = [...action.contacts]
            return { ...state, contacts: action.contacts, lastTodos: lastContact }
        // case SET_FILTER:
        //     return { ...state, filterBy: { txt: action.filterBy.txt, sortBy: action.filterBy.sortBy } }
        // case UPDATE_TODO:
        //     todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
        //     return { ...state, todos }
        // case ADD_TODO:
        //     todos = [...state.todos, action.savedTodo]
        //     console.log('todos added', todos)
        //     return { ...state, todos }
        case REMOVE_TODO:
            lastContact = [...state.contacts]
            contacts = state.contacts.filter(contact => contact._id !== action.contactId)
            return { ...state, contacts, lastTodos: lastContact }
        case CONTACT_UNDO:
            contacts = [...state.lastContact]
            return { ...state, contacts }
        default:
            return state
    }
}


