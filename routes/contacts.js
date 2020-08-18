const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Contacts = require("../models/Contacts");
const { check, validationResult } = require("express-validator/check");

// router   GET api/contacts
// desc     Get a contact
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const contact = await Contacts.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// router   POST api/contacts
// desc     Add a contact
// @access  Private

router.post(
  "/",
  [auth, check("name", "No name found.").exists()],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty) res.status(400).json({ error: error.array() });
    const { name, email, phone, type } = req.body;
    try {
      const newContact = await new Contacts({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.send(contact);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

// router   PUT api/contacts/:id
// desc     Update a contact
// @access  Private

router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const selectContact = {};
  if (name) selectContact.name = name;
  if (email) selectContact.email = email;
  if (phone) selectContact.phone = phone;
  if (type) selectContact.type = type;
  try {
    let contact = await Contacts.findById(req.params.id);
    if (!contact) res.status(404).json({ msg: "Contact Not Found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact = await Contacts.findByIdAndUpdate(
      req.params.id,
      { $set: selectContact },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// router   DELETE api/contacts/:id
// desc     DELETE a contact
// @access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contacts.findById(req.params.id);
    if (!contact) res.status(404).json({ msg: "Contact Not Found" });

    await Contacts.findByIdAndRemove(req.params.id);
    res.json({ msg: "Deleted Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
