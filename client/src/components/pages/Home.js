import React, { useEffect, useContext } from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";

import Welcome from "../layout/Welcome";

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <Welcome />
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
