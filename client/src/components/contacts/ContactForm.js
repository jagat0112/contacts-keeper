import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../context/contact/contactContext";
import { v4 as uuid } from "uuid";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const {
    addContact,
    current,
    updateContact,
    clearCurrent,
    clearFilter,
  } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        id: uuid(),
        name: "",
        phone: "",
        email: "",
        type: "personnal",
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    id: uuid(),
    name: "",
    phone: "",
    email: "",
    type: "personnal",
  });

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    contact.name !== "" || contact.email !== ""
      ? addContact(contact)
      : alert("Input the valid name");
    setContact({
      name: "",
      phone: "",
      email: "",
      type: "personal",
    });
    clearFilter();
  };

  const onUpdate = (e) => {
    e.preventDefault();
    updateContact(contact);
    clearCurrent();
  };

  const { name, phone, email, type } = contact;
  return (
    <form onSubmit={current ? onUpdate : onSubmit}>
      <h3 className={current ? "text-success" : "text-primary"}>
        {current ? "Update Contact" : "Add Contact"}
      </h3>
      <input
        name="name"
        placeholder="Name"
        onChange={onChange}
        value={name}
        type="Text"
      />
      <input
        name="email"
        placeholder="Email"
        onChange={onChange}
        value={email}
        type="email"
      />
      <input
        name="phone"
        placeholder="Phone"
        onChange={onChange}
        value={phone}
        type="text"
      />
      <h5>Contact Type:</h5>
      <input
        type="radio"
        value="personal"
        name="type"
        checked={type === "personal"}
        onChange={onChange}
      />
      Personal{" "}
      <input
        type="radio"
        value="professional"
        name="type"
        checked={type === "professional"}
        onChange={onChange}
      />
      Professional
      {current ? (
        <input
          type="submit"
          className={"btn btn-success btn-block "}
          value={"Update Contact"}
        />
      ) : (
        <input
          type="submit"
          className={"btn btn-primary btn-block "}
          value={"Add Contact"}
        />
      )}
      {current ? (
        <button
          className="btn btn-light btn-block "
          onClick={() => clearCurrent()}
        >
          Cancel
        </button>
      ) : null}
    </form>
  );
};

export default ContactForm;
