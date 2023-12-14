const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://bpadhy01:${password}@cluster0.dwxjfb5.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

const Contact = mongoose.model("Contact", phonebookSchema);

const contact = new Contact({
  name: name,
  number: number,
  id: Math.floor(Math.random() * 1000),
});

contact.save().then((result) => {
  console.log("Phonebook:");
  Contact.find().then((result) => {
    result.forEach((contact) => {
      console.log(contact.name, contact.number);
    });
    mongoose.connection.close();
  });
});