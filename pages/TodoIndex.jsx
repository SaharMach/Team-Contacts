const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux
import { userService } from '../services/user.service.local.js'
import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { TodoList } from '../cmps/TodoList.jsx'
import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { loadTodo, removeTodoOptimistic, saveTodo, toggleTodo } from '../store/actions/todo.action.js'
import { SET_FILTER } from '../store/reducers/todo.reducer.js'

export function TodoIndex() {
    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todoModule.todos)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)


    useEffect(() => {
        loadTodo(user, filterBy)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    function onSetFilterBy(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })
    }

    function onRemoveTodo(todoId) {
        userService.saveActivity(user._id, todoId, 'Todo Removed')
        removeTodoOptimistic(todoId, user)
            .then(() => {
                showSuccessMsg('todo removed')
            })
            .catch(err => {
                console.log('Cannot remove todo', err)
                showErrorMsg('Cannot remove todo')
            })
    }

    function onToggleDoneTodo(todoId) {
        toggleTodo(todoId, user)
            .catch(err => {
                console.log('Cannot toggle todo', err)
                showErrorMsg('Cannot toggle todo')
            })
    }

    function onAddTodo() {
        const newTxt = prompt('enter todo txt')
        const todoToSave = todoService.getEmptyTodo(user._id)
        const newTodo = { ...todoToSave, txt: newTxt }
        saveTodo(newTodo, user)
            .then((savedTodo) => {
                console.log('saved:', savedTodo)
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)
            })
            .catch(err => {
                console.log('Cannot add todo', err)
                showErrorMsg('Cannot add todo')
            })
    }


    return (
        <section className='main-area-container'>

            <section className='main-container'>
                <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <TodoList onToggleDoneTodo={onToggleDoneTodo} onRemoveTodo={onRemoveTodo} todos={todos} />
                <button className='profile-btn add-btn' onClick={onAddTodo}>Add Todo +</button>
            </section>
        </section>
    )
}

