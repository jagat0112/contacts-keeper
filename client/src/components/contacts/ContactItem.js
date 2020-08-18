import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../context/contact/contactContext";

function ContactItem({ contact }) {
  const { name, type, phone, email, _id } = contact;

  const contactContext = useContext(ContactContext);
  const { deleteContact, clearFilter, setCurrent } = contactContext;

  const removeContact = () => {
    deleteContact(_id);
    clearFilter();
  };
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "text-right badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {`${type[0].toUpperCase()}${type.slice(1)}`}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope" /> {email}
          </li>
        )}
      </ul>
      <ul className="list">
        {phone && (
          <li>
            <i className="fas fa-phone" /> {phone}
          </li>
        )}
      </ul>
      <button
        className="btn btn-sm"
        style={{ borderRadius: "5px", backgroundColor: "#A9A9A9" }}
        onClick={() => setCurrent(contact)}
      >
        Edit
      </button>
      <button
        className="btn btn-danger btn-sm"
        style={{ borderRadius: "5px" }}
        onClick={removeContact}
      >
        Delete
      </button>
    </div>
  );
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};
export default ContactItem;
