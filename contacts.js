const path = require('path');
const fs = require('fs').promises;
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet('1234567890abcdef', 5)

const contactsPath = path.resolve('./db/contacts.json');

  async function listContacts() {
      try {
          const contacts = await fs.readFile(contactsPath, 'utf8') 
          return JSON.parse(contacts);
      } catch (error){
        console.log(error.message);      
    }}
  
  

  async function getContactById(contactId) {
      try {
        const contacts = await listContacts();
          const contactById = contacts.find(contact => contact.id === contactId)
         return contactById;
      }
      catch(error){
        console.log(error.message);   
      }
    }

  
  async function removeContact(contactId) {
      try {
          const contacts = await listContacts();
          const newListContacts =  contacts.filter(contact => contact.id !== contactId)
          await fs.writeFile(contactsPath, JSON.stringify(newListContacts, null, 2))  
          return newListContacts;
      } catch(error){
        console.log(error.message);   
      }
        }
     
  
  async function addContact(name, email, phone) {
      const newContact = {id: nanoid(), name, email,phone}
      try {
          const contacts = await fs.readFile(contactsPath, 'utf8') 
          const parsedContacts = JSON.parse(contacts);
          const newContactsList = [...parsedContacts, newContact]
          await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null,2), 'utf8');
         return newContactsList;
        } catch(error) {
            console.log(error.message);   
        }     
  }



  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}