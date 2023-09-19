const { Link } = ReactRouterDOM
import { ContactPreview } from './ContactPreview.jsx'



export function ContactList({ contacts, onRemoveContact}) {
    console.log('List :' ,contacts);
    if (!contacts || !contacts.length) return <div className="loading">No contacts to show...</div>

    return (
        <section className="todo-list">
            <ul className="todo-items">
                {contacts && contacts.length > 0 ? (
                    contacts.map(contact => ( 
                        <li className="contact-item">
                            <ContactPreview contact={contact} />
                            <div className="action-btns">
                                {/* <Link to={`/todo/edit/${todo._id}`}>
                                    <button className="edit-btn">Edit</button>
                                </Link> */}
                                <button onClick={() => onRemoveContact(contact._id)} className="delete-btn">X</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No contact to show...</li>
                )}
            </ul>
        </section>

    )
}

