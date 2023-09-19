
import {storageService} from './async-storage.service.js'
import {utilService} from './util.service.js'
import { userService } from './user.service.js'
import { func } from 'prop-types'


const STORAGE_KEY = 'todoDB'

export const todoService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getEmptyTodo,
    getTodosProgress
}

let todos = [
    {ownerId: "eS3bQ" ,_id: 'abc123',  txt: 'Added a asdasd',isDone: true, at: 1523873242735},
    {ownerId: "eS3bQ" ,_id: 'abc124', txt: 'asdasd',isDone: true ,at: 1523873242735},
    {ownerId: "eS3bQ" ,_id: 'abc128', txt: 'qweqweqwe',isDone: false ,at: 1523873242735},
    {ownerId: "pkYlo" ,_id: 'abc125', txt: 'asdasdasdasxzc',isDone: false, at: 1523873242735}
]

function getTodosProgress(userId){
    return query(userId)
    .then(todos => {
        return {
            active: todos.filter(todo => todo.isDone), //supposed to be opposite!!!
            done: todos.filter(todo => !todo.isDone)  //supposed to be opposite!!!
        }
    })
    .catch(error => {
        console.error('Error get todos:', error)
        return {
            active: [],
            done: []
        }
    }) 
 }

function query(ownerId, filterBy={}) {
    let todosToShow = utilService.loadFromStorage(STORAGE_KEY)
    if(!todosToShow || !todosToShow.length) utilService.saveToStorage(STORAGE_KEY, todos)
    todosToShow = todosToShow.filter(todo => todo.ownerId === ownerId)
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        todosToShow = todosToShow.filter(todo => regExp.test(todo.txt))
    }

    if(filterBy.sortBy === 'active'){
        todosToShow = todosToShow.filter(todo => !todo.isDone)
        console.log('todosToShow:', todosToShow)
    }

    if(filterBy.sortBy === 'done'){
        todosToShow = todosToShow.filter(todo => todo.isDone)
    }
    return Promise.resolve(todosToShow)
}

function getDefaultFilter(){
    return {txt: '',sortBy:''}
}

function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}

function remove(todoId) {
    return storageService.remove(STORAGE_KEY, todoId)
}

function save(car) {
    if (car._id) {
        return storageService.put(STORAGE_KEY, car)
    } else {
        return storageService.post(STORAGE_KEY, car)
    }
}

function getEmptyTodo(ownerId) {
    return { 
        ownerId,
        txt: '',
        at: Date.now(),
        isDone: false
    }
}



