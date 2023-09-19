const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { TodoList } from '../cmps/TodoList.jsx'
// import { TodoFilter } from '../cmps/TodoFilter.jsx'
import {contactService} from '../services/add-contact.service.js'
import {ContactList} from '../cmps/ContactList.jsx'
import { loadContact, removeContact, saveContact } from '../store/action/contact.action.js'
// import { SET_FILTER } from '../store/reducers/todo.reducer.js'

export function ContactIndex() {
    const dispatch = useDispatch()
    const contacts = useSelector(storeState => storeState.contactModule.contacts)
    // const user = useSelector(storeState => storeState.userModule.loggedinUser)
    // const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
    console.log(contacts);

    useEffect(() => {
        loadContact()

            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [])

    // function onSetFilterBy(filterBy) {
    //     dispatch({ type: SET_FILTER, filterBy })
    // }

    function onRemoveContact(contactId) {
        removeContact(contactId)
            .then(() => {
                showSuccessMsg('todo removed')
            })
            .catch(err => {
                console.log('Cannot remove todo', err)
                showErrorMsg('Cannot remove todo')
            })
    }

   

    function onAddTodo() {
        const phoneNum = +prompt('enter contact num')
        const contactToSave = contactService.getEmptyContact()
        const newContact = { ...contactToSave, phone: phoneNum }
        saveContact(newContact)
            .then((newContact) => {
                console.log('saved:', newContact)
            })
            .catch(err => {
                console.log('Cannot add todo', err)
            })
    }


    return (
        <section className='main-area-container'>
            <section className='main-container'>
                {/* <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} /> */}
                <ContactList contacts={contacts} onRemoveContact={onRemoveContact}  />
                <button className='profile-btn add-btn' onClick={onAddTodo}>Add Todo +</button>
            </section>
        </section>
    )
}

