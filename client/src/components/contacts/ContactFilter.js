import React, { useRef, useContext, useEffect } from "react";
import ContactContext from "../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef("");

  const { filterContact, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value === "") {
      clearFilter();
    } else {
      filterContact(e.target.value);
    }
  };
  return (
    <form>
      <input
        useRef={text}
        className="form-group"
        placeholder="Filter Contacts..."
        onChange={onChange}
        type="text"
      />
    </form>
  );
};

export default ContactFilter;
