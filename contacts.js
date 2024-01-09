const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error("Error al listar contactos:", error.message);
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const foundContact = contacts.find((contact) => contact.id === contactId);
    return foundContact;
  } catch (error) {
    console.error("Error al obtener el contacto por ID:", error.message);
    return null;
  }
}

async function addContact(newContact) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    contacts.push({
      id: generateId(),
      ...newContact,
    });
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contacto añadido correctamente:", newContact);
  } catch (error) {
    console.error("Error al añadir un nuevo contacto:", error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    let contacts = JSON.parse(data);
    contacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error("Error al eliminar el contacto por ID:", error.message);
  }
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
