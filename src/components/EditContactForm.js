import React, {useState} from "react";
import '../sass/components/_EditContactForm.scss';

function EditContactForm({ contact, updateContact }) {
    // a state to store the values of the contact being edited
    const [editContact, setEditContact] = useState({
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        addLine1: contact.addLine1,
        addLine2: contact.addLine2,
        townCity: contact.townCity,
        county: contact.county,
        postcode: contact.postcode,
        telephone: contact.telephone,
        email: contact.email
    });

    // handle each form input field updating as the user types into them
    function handleFormInputChange(e) {
        setEditContact({ ...editContact, [e.target.name]: e.target.value });
    }

    // handle when the user submits the edited contact data
    function handleUpdateContact() {
        updateContact(editContact);
    }

    return (
        <section className="Edit-Contact-Form-Container">
            <form className="Edit-Contact-Form" onSubmit={handleUpdateContact}>
                <h3 style={{margin: "0 0 15px 0"}}>Edit Contact</h3>
                <label>First Name: </label>
                <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={editContact.firstName}
                    onChange={handleFormInputChange}
                />
                <label>Last Name: </label>
                <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={editContact.lastName}
                    onChange={handleFormInputChange}
                />
                <label>Address Line 1: </label>
                <input
                    name="addLine1"
                    type="text"
                    placeholder="Address Line 1"
                    value={editContact.addLine1}
                    onChange={handleFormInputChange}
                />
                <label>Address Line 2: </label>
                <input
                    name="addLine2"
                    type="text"
                    placeholder="Address Line 2"
                    value={editContact.addLine2}
                    onChange={handleFormInputChange}
                />
                <label>Town/City: </label>
                <input
                    name="townCity"
                    type="text"
                    placeholder="Town/City"
                    value={editContact.townCity}
                    onChange={handleFormInputChange}
                />
                <label>County: </label>
                <input
                    name="county"
                    type="text"
                    placeholder="County"
                    value={editContact.county}
                    onChange={handleFormInputChange}
                />
                <label>Postcode: </label>
                <input
                    name="postcode"
                    type="text"
                    placeholder="Postcode"
                    value={editContact.postcode}
                    onChange={handleFormInputChange}
                />
                <label>Telephone: </label>
                <input
                    name="telephone"
                    type="tel"
                    placeholder="Telephone No."
                    value={editContact.telephone}
                    onChange={handleFormInputChange}
                />
                <label>E-Mail: </label>
                <input
                    name="email"
                    type="email"
                    placeholder="E-Mail"
                    value={editContact.email}
                    onChange={handleFormInputChange}
                /><br/>
                {/* button to tell the form to submit */}
                <button className="Submit-Contact-Button" type="submit">Save Changes</button>
            </form>
        </section>
    )
}

export default EditContactForm;