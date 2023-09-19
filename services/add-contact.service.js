
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { func } from 'prop-types'


const STORAGE_KEY = 'contactsDB'

export const contactService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getEmptyContact,
}
//jncfnfjenr
let contacts = [
    { _id: utilService.makeId(), firstName: 'Sahar', lastName: 'Machpud', email: 'saharqweqiwe@gmail.com', phone: '0545459542', desc: utilService.makeLorem(5) },
    { _id: utilService.makeId(), firstName: 'reut', lastName: 'edry', email: 'reut@gmail.com', phone: '0540304303', desc: utilService.makeLorem(5) },
    { _id: utilService.makeId(), firstName: 'asd', lastName: 'qwe', email: 'qwe@gmail.com', phone: '0545459545', desc: utilService.makeLorem(5) }
]


function query(filterBy = {}) {
    let contactToShow = utilService.loadFromStorage(STORAGE_KEY)
    if (!contactToShow || !contactToShow.length) utilService.saveToStorage(STORAGE_KEY, contacts)
    // if (filterBy.txt) {
    //     const regExp = new RegExp(filterBy.txt, 'i')
    //     todosToShow = todosToShow.filter(todo => regExp.test(todo.txt))
    // }

    // if(filterBy.sortBy === 'active'){
    //     todosToShow = todosToShow.filter(todo => !todo.isDone)
    //     console.log('todosToShow:', todosToShow)
    // }

    // if(filterBy.sortBy === 'done'){
    //     todosToShow = todosToShow.filter(todo => todo.isDone)
    // }
    return Promise.resolve(contactToShow)
}

function getDefaultFilter() {
    return { txt: '', sortBy: '' }
}

function getById(contactId) {
    return storageService.get(STORAGE_KEY, contactId)
}

function remove(contactId) {
    return storageService.remove(STORAGE_KEY, contactId)
}

function save(contact) {
    console.log('contact:', contact)
    if (contact._id) {
        return storageService.put(STORAGE_KEY, contact)
    } else {
        return storageService.post(STORAGE_KEY, contact)
    }
}

function getEmptyContact(firstName = 'Yossi', lastName ='EWIJRW', email = 'werwrwe@gmail.com', phone) {
    return {
        desc: utilService.makeLorem(5),
        firstName,
        lastName,
        email,
        phone,
    }
}



