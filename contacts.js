const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

// ================ listContacts

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    console.table(contacts);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

// ================ getContactById

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const selectContacts = contacts.find(
      (contact) => contact.id === Number(contactId)
    );
    if (!selectContacts) {
      throw new Error(`Contact with id = ${contactId} not found`);
    }
    console.table(selectContacts);
    return selectContacts;
  } catch (error) {
    console.log("hello people", error);
  }
}

// ================ addContact

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const id = contacts[contacts.length - 1].id + 1;
    const newContact = { id, name, email, phone };
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    console.table(updatedContacts);
    return updatedContacts;
  } catch (error) {
    throw error;
  }
}

// ================ removeContact

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== Number(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    // const delContacts = contacts.splice(idx, 1);
    console.table(filteredContacts);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
