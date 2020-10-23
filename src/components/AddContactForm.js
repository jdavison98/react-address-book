import React, {useState} from "react";
import { v4 as uuid } from "uuid"
import "../sass/components/_AddContactForm.scss"

function AddContactForm({ addContact }) {
    // a state to control whether the 'AddContactForm' is rendered
    // changes state upon clicking the 'Add New Contact' button
    const [showForm, toggleShowForm] = useState(false);
    // a state to control if the user has clicked the 'Manually Enter Address' button
    const [manualAddressEntry, toggleManualAddressEntry] = useState(false);
    // a state to store the current values of the form input fields
    const [contact, setContact] = useState({
        id: "",
        firstName: "",
        lastName: "",
        houseNo: "",
        addLine1: "",
        addLine2: "",
        townCity: "",
        county: "",
        postcode: "",
        telephone: "",
        email: "",
    });

    // toggle the 'showForm' state
    function toggleForm() {
        toggleShowForm(!showForm);
        toggleManualAddressEntry(false);
    };

    // handle each form input field updating as the user types into them
    function handleFormInputChange(e) {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    function toggleAddressEntry() {
        toggleManualAddressEntry(true);
    };

    // handle the submitting of the form 
    function handleSubmit() {
        // check all the name and address fields are not empty
        if (contact.firstName.trim() && contact.lastName.trim() && contact.addLine1.trim() && contact.townCity.trim() && contact.county.trim() && contact.postcode.trim()) {
            // send the new contact up to the parent component
            addContact({ ...contact, id: uuid() });
            // hide the form on submission
            toggleShowForm();
            // reset the form input fields, otherwise they would keep data from last contact
            setContact({ ...contact,
                firstName: "",
                lastName: "",
                houseNo: "",
                addLine1: "",
                addLine2: "",
                townCity: "",
                county: "",
                postcode: "",
                telephone: "",
                email: "",
            });
        } else {
            // error message to tell the user to input a first and last name and a full address (addLine1, townCity, county, postcode)
            alert("please fill out all name and address fields");
        }
    };

    // find the address for the user based on 'houseNo' and 'postcode' via https://getaddress.io/
    async function findAddress(e) {
        e.preventDefault();
        // check the 'houseNo' and 'postcode' fields are not empty
        if (contact.houseNo.trim() && contact.postcode.trim()) {
            let address;
            const url = `https://api.getaddress.io/find/${contact.postcode}/${contact.houseNo}?api-key=W3T3Y1tMm0OAVpRwF1rguw28820`;
            // await a response from the API
            const response = await fetch(url);

            response
                .json()
                .then(response => {
                    // take the response address and update address fields with the data
                    address = response.addresses[0].split(", ");
                    setContact({ ...contact,
                        addLine1: address[0] + address[1],
                        addLine2:  address[2] + address[3],
                        townCity: address[5],
                        county: address[6],
                    });
                    // switch to full address input layout
                    toggleManualAddressEntry(true);
                })
                // catch any errors from the API, most likely a unrecognised address
                .catch(err => alert("unable to find address, please check you've entered a valid house number and postcode", console.log(err)));            
        } else {
            // browser alert to tell the user to input a house number and postcode
            alert("please enter a house number and postcode");
        }  
    }

    return (
        <>
        {/* conditional render based on the 'showForm' state*/}
        {showForm ? (
            <section className="Add-Contact-Form-Container">
                <form className="Add-Contact-Form" onSubmit={handleSubmit}>
                    <h3 style={{margin: "0 0 15px 0"}}>Add New Contact</h3>
                    <label>First Name:</label>
                    <input
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        value={contact.firstName}
                        onChange={handleFormInputChange}
                    />
                    <label>Last Name:</label>
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={contact.lastName}
                        onChange={handleFormInputChange}
                    />
                    {/* check manual address entry state for conditional render */}
                    {manualAddressEntry ? (
                        // if manualAddressEntry is true - render manual address entry inputs (addLine1, addLine2, townCity, county, postcode)
                        <>
                            <label>Address Line 1:</label>
                            <input
                                name="addLine1"
                                type="text"
                                placeholder="Address Line 1"
                                value={contact.addLine1}
                                onChange={handleFormInputChange}
                            />
                            <label>Address Line 2:</label>
                            <input
                                name="addLine2"
                                type="text"
                                placeholder="Address Line 2"
                                value={contact.addLine2}
                                onChange={handleFormInputChange}
                            />
                            <label>Town/City:</label>
                            <input
                                name="townCity"
                                type="text"
                                placeholder="Town/City"
                                value={contact.townCity}
                                onChange={handleFormInputChange}
                            />
                            <label>County:</label>
                            <input
                                name="county"
                                type="text"
                                placeholder="County"
                                value={contact.county}
                                onChange={handleFormInputChange}
                            />
                            <label>Postcode:</label>
                            <input
                                name="postcode"
                                type="text"
                                placeholder="Postcode"
                                value={contact.postcode}
                                onChange={handleFormInputChange}
                            />
                        </>
                    ) : (
                        // if manualAddressEntry is false - render address finding inputs (houseNo, postcode) and buttons
                        <>
                            <label>House No:</label><input
                                name="houseNo"
                                type="text"
                                placeholder="House No."
                                value={contact.houseNo}
                                onChange={handleFormInputChange}
                            />
                            <label>Postcode:</label>
                            <input
                                name="postcode"
                                type="text"
                                placeholder="Postcode"
                                value={contact.postcode}
                                onChange={handleFormInputChange}
                            />
                            <section className="Address-Buttons">
                                <button onClick={findAddress}>Find Address</button>
                                <button onClick={toggleAddressEntry}>Manually Enter Address</button>
                            </section>
                        </>
                    )}

                    <label>Telephone:</label>
                    <input
                        name="telephone"
                        type="tel"
                        placeholder="Telephone No."
                        value={contact.telephone}
                        onChange={handleFormInputChange}
                    />
                    <label>E-Mail:</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="E-Mail"
                        value={contact.email}
                        onChange={handleFormInputChange}
                    /><br/>
                    {/* button to tell the form to submit */}
                    <button className="Submit-Contact-Button" type="submit">Add To Contacts</button>
                    {/* button to close the 'add contact' form */}
                    <button className="Close-Contact-Form-Button" onClick={toggleForm}>X</button>
                </form>
            </section>
        ) : null }
        {/* button to open the 'add contact' form */}
        <button className="Add-New-Contact-Button" disabled={showForm} onClick={toggleForm}>Add New Contact</button>
        </>
    );
}

export default AddContactForm;