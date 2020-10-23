import React, {useState} from "react";
import "./App.scss";
import EditContactForm from "./components/EditContactForm"
import AddContactForm from "./components/AddContactForm";
import ContactList from "./components/ContactList";

function App() {
  // a state to store all contacts in the application that can be passed
  // down to the 'ContactList' component
  const [contacts, addToContacts] = useState([]);
  // a state to store the contact that the user wants to edit
  const [contactToEdit, setContactToEdit] = useState([]);
  // a state to control whether the user is in 'editing mode' or not
  const [editingContact, toggleEditingContact] = useState(false);

  // function for adding a contact to the contact state from the 'AddContactForm' component
  function addContact(contact) {
    addToContacts([contact, ...contacts]);
  }

  // handle the clicking of the 'edit' button on each 'ContactCard' component 
  // to send the correct contact the user wants to edit
  function editContact(id) {
    setContactToEdit(contacts.filter(contact => contact.id === id));
    toggleEditingContact(true);
  }

  // remove a contact from the contacts state array
  function removeContact(id) {
    addToContacts(contacts.filter(contact => contact.id !== id));
  }

  // update an existing contact in the contacts state array
  function updateContact(updatedContact) {
    toggleEditingContact(false);
    // find the contact the user has updated in the contacts state array
    var contactIndex = contacts.findIndex(contact => contact.id === updatedContact.id);
    let newArr = [...contacts];
    newArr[contactIndex] = updatedContact;
    addToContacts(newArr);
  }

  return (
    <main className="App">
      <header className="App-header">
        <h3>React Address Book</h3>
      </header>
      <section>
        <h1><u>Contacts</u></h1>
        <AddContactForm addContact={addContact} />
        {editingContact ? <EditContactForm contact={ contactToEdit[0] } updateContact={updateContact} /> : null}
        <ContactList
          contacts={contacts}
          editContact={editContact}
          removeContact={removeContact}/>
      </section>
    </main>
  );
}

export default App;
