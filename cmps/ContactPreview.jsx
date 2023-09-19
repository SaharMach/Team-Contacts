// import { utilService } from "../services/util.service.js"



export function ContactPreview({ contact}) {
    return (
        <div >      
            <span className="todo-text">{contact.firstName + `${contact.lastName}`} </span>
            <span>Mail: {contact.email}</span>
            <span>Phone: {contact.phone} </span>
            <p>{contact.desc}</p>
        </div>
    )
}

