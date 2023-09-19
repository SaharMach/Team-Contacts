// import { ADD_CAR, } from '../store/store.js'

const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { todoService } from '../services/add-contact.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { SET_FILTER } from '../store/store.js'
import { userService } from '../services/user.service.local.js'
import { SET_USER_TODO } from '../store/store.js'
import { TodoList } from '../cmps/TodoList.jsx'
import { TodoFilter } from '../cmps/TodoFilter.jsx'
import {SET_TODOS} from '../store/store.js'
import {REMOVE_TODO} from '../store/store.js'
import {ADD_TODO} from '../store/store.js'
import { UPDATE_TODO } from '../store/store.js'
import {ADD_ACTIVITY} from '../store/store.js'
import { SET_USER_BALANCE } from '../store/store.js'


export function TodoIndex() {
    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todos)
    const user = useSelector(storeState => storeState.loggedinUser)
    const filterBy = useSelector(storeState => storeState.filterBy)
    

    useEffect(() => {
        if(user){
            todoService.query(user._id, filterBy)
                .then(todos => {
                    userService.saveTodo(user._id,todos)
                    dispatch({type: SET_TODOS,  todos})
                    dispatch({ type: SET_USER_TODO,  todos})                   
            })
        }
    }, [filterBy])

    function onSetFilterBy(filter){
        dispatch({ type: SET_FILTER, filter})
    }

    function onRemoveTodo(todoId) {
        todoService.remove(todoId)
            .then(() => {
                showSuccessMsg('todo removed')               
                userService.saveActivity(user._id, todoId, 'Todo Removed')
                dispatch({ type: REMOVE_TODO, todoId })
            })
            .catch(err => {
                console.log('Cannot remove todo', err)
                showErrorMsg('Cannot remove todo')
            })
    }

    function onToggleDoneTodo(todoId){
        todoService.getById(todoId)
            .then(todo => {
                console.log('from toggle before changing', todo);
                const todoToSave = {...todo, isDone: !todo.isDone}
                let balance = user.balance
                balance = (todoToSave.isDone) ? balance += 10 : balance -= 10
                if(balance < 0) balance = 0
                dispatch({ type: SET_USER_BALANCE, balance})
                todoService.save(todoToSave)
                    .then((saveTodo) => {                   
                        dispatch({ type: UPDATE_TODO, todo: saveTodo })
                })
            })
            .catch(err => {
                console.log('Cannot toggle todo', err)
                showErrorMsg('Cannot toggle todo')
            })
    }
    
    function onAddTodo() {
        const newTxt = prompt('enter todo txt')
        const todoToSave = todoService.getEmptyTodo(user._id)
        const newTodo = {...todoToSave, txt: newTxt}        
        todoService.save(newTodo)
            .then((savedTodo) => {
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)
                console.log('savedTODOOOO ', savedTodo);
                userService.saveActivity(user._id, savedTodo._id, 'Todo Added',savedTodo)
                dispatch({ type: ADD_TODO, savedTodo })
            })
            .catch(err => {
                console.log('Cannot add todo', err)
                showErrorMsg('Cannot add todo')
        })
    }

    return (
        <section className='main-area-container'>

            <section className='main-container'>
                <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
                <TodoList onToggleDoneTodo={onToggleDoneTodo} onRemoveTodo={onRemoveTodo} todos={todos}/>
                <button className='profile-btn add-btn' onClick={onAddTodo}>Add Todo +</button>   
            </section>
        </section>
    )
}

