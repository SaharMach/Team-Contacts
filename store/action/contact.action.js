import { contactService } from '../../services/add-contact.service.js'
import { store } from "../store.js";

import { SET_CONTACT, REMOVE_CONTACT,ADD_CONTACT } from '../reducer/contact.reducer.js'

export function loadContact() {
    return contactService.query()
        .then(contacts => {
            console.log('contacts:', contacts)
            store.dispatch({ type: SET_CONTACT, contacts })
        })
        .catch(err => {
            console.log('car action -> Cannot load todos', err)
            throw err
        })
}

export function removeContact(contactId) {
    return contactService.remove(contactId)
        .then(() => {
            store.dispatch({ type: REMOVE_CONTACT, contactId })
        })
        .catch(err => {
            store.dispatch({ type: CONTACT_UNDO })
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function saveContact(contactSave) {
    console.log('contactSave:', contactSave)
    return contactService.save(contactSave)
        .then((savedContact) => {
            store.dispatch({ type: ADD_CONTACT, savedContact })
            return savedContact
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}

// export function toggleTodo(todoId, user) {
//     console.log('todoId', todoId)
//     return addContactService.getById(todoId)
//         .then(todo => {
//             const todoToSave = { ...todo, isDone: !todo.isDone }
//             return addContactService.save(todoToSave)
//                 .then((saveTodo) => {
//                     store.dispatch({ type: UPDATE_TODO, todo: saveTodo })
//                 })
//         })
//         .catch(err => {
//             console.log('Cannot toggle todo', err)
//         })
// }

