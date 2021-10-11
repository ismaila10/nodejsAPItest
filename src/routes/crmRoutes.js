import { addNewContact, deleteContact, getContactById, getContacts, updateContact } from '../controllers/crmController';

const express = require("express");
const router = express.Router();

router.get('/contact', getContacts);
router.post('/contact', addNewContact);
router.get('/contact/:contactId', getContactById);
router.put('/contact/:contactId', updateContact);
router.delete('/contact/:contactId', deleteContact);

// const routes = (app) => {
//     app.route('/contact')
//     .get((req, res, next) => {
//         // middleware
//         console.log(`Request de : ${req.originalUrl}`)
//         console.log(`Request type : ${req.method}`)
//         next();
//     },  getContacts)

//     .post(addNewContact);

//     app.route('/contact/:contactId')
//         .get(getContactById)
//         .put(updateContact)
//         .delete(deleteContact);
// }

module.exports = router;