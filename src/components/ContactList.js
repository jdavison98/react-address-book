import React from "react";
import ContactCard from "./ContactCard";
import '../sass/components/_ContactList.scss';

function ContactList({ contacts, editContact, removeContact }) {
    return (
        <section className="Contact-List">
            {/* conditional rendering for if the contact array is empty or not */}
            {contacts[0] ? (
                contacts
                    // sort the contacts, first by 'lastName' and if last names are the same, sort by 'firstName'
                    .sort(function (a, b) {
                        // sort contacts by last name
                        if (a.lastName > b.lastName) { return 1 }
                        if (a.lastName < b.lastName) { return -1 }
                        // if last names are the same, sort by first name
                        if (a.firstName > b.firstName) { return 1 }
                        if (a.firstName < b.firstName) { return -1 }
                        return 0;
                    })
                    // map array objects to create contact card components
                    .map(contact => 
                        <ContactCard
                            key={contact.id}
                            contact={contact}
                            editContact={editContact}
                            removeContact={removeContact}
                        />
                    )
                // display a message when there are no contacts in the list
            ) : <h3>Try adding a new contact!</h3>}
        </section>
    )
}

export default ContactList;