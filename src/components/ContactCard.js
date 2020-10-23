import React from "react";
import '../sass/components/_ContactCard.scss';

function ContactCard({ contact, editContact, removeContact }) {
    
    // handle when the user clicks edit on a contact
    function handleEditClick() {
        editContact(contact.id);
    }
    // handle when the user clicks remove or 'X' on a contact
    function handleRemoveClick() {
        removeContact(contact.id);
    }
    
    return (
        <section className="Contact-Card">
            <h4>{ contact.firstName + " " + contact.lastName }</h4>
            <address>
                <p>{ contact.addLine1 }</p>
                <p>{ contact.addLine2 }</p>
                <p>{ contact.townCity }</p>
                <p>{ contact.county }</p>
                <p>{ contact.postcode }</p>
            </address>
            {/* both telephone and email are linked so the browser can handle what to do with them when the user clicks on either attribute */}
            { contact.telephone ? <p>Telephone: <a href={"tel:" + contact.telephone}>{ contact.telephone }</a></p> : null }
            { contact.email ? <p>E-Mail: <a href={"mailto:" + contact.email}>{ contact.email }</a></p> : null }
            <section className="Contact-Buttons">
                {/* edit contact button for the user to alter contact details*/}
                <button className="Edit-Contact-Button" onClick={handleEditClick}>Edit</button>
                {/* remove contact button to delete a selected contact */}
                <button className="Remove-Contact-Button" onClick={handleRemoveClick}>X</button>
            </section>
        </section>
    );
}

export default ContactCard;