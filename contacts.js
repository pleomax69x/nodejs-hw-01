import { join, dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __dirname = dirname(fileURLToPath(import.meta.url));

const contactsPath = join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    // contactId = Number(contactId);
    const contacts = JSON.parse(data);
    const contactById = contacts.filter((contact) => contact.id === +contactId);
    console.table(contactById);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    console.log(contactsPath);
    if (err) throw err;
    const contacts = JSON.parse(data);
    const contactsFiltered = contacts.filter(
      (contact) => contact.id !== +contactId
    );

    fs.writeFile(
      contactsPath,
      JSON.stringify(contactsFiltered, null, 2),
      (err) => {
        if (err) throw err;
        console.log("Contact was remove!");
      }
    );
    console.table(contactsFiltered);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const id = uuidv4();
    contacts.push({ id, name, email, phone });

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) throw err;
      console.log("The file has been added!");
    });
    console.table(contacts);
  });
}

export { listContacts, getContactById, removeContact, addContact };
