import { addContactService } from '../../services/add-contact.service.js'
import { store } from "../store.js";

import { SET_CONTACT, REMOVE_CONTACT } from '../reducer/contact.reducer.js'

export function loadTodo() {
    return addContactService.query()
        .then(contacts => {
            store.dispatch({ type: SET_CONTACT, contacts })
        })
        .catch(err => {
            console.log('car action -> Cannot load todos', err)
            throw err
        })
}

export function removeTodoOptimistic(contactId) {
    store.dispatch({ type: REMOVE_CONTACT, contactId })
    return addContactService.remove(contactId)
        .catch(err => {
            store.dispatch({ type: CONTACT_UNDO })
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

// export function saveTodo(todoSave, user) {
//     const type = todoSave._id ? UPDATE_TODO : ADD_TODO
//     return todoService.save(todoSave)
//         .then((savedTodo) => {
//             userService.saveActivity(user._id, savedTodo._id, 'Todo Saved', savedTodo)
//             store.dispatch({ type, savedTodo })
//             return savedTodo
//         })
//         .catch(err => {
//             console.log('todo action -> Cannot save todo', err)
//             throw err
//         })
// }

export function toggleTodo(todoId, user) {
    console.log('todoId', todoId)
    return addContactService.getById(todoId)
        .then(todo => {
            const todoToSave = { ...todo, isDone: !todo.isDone }
            return addContactService.save(todoToSave)
                .then((saveTodo) => {
                    store.dispatch({ type: UPDATE_TODO, todo: saveTodo })
                })
        })
        .catch(err => {
            console.log('Cannot toggle todo', err)
        })
}

