const yargs = require("yargs");
const contacts = require("./contacts");
const app = require("./app");

async function handleListCommand() {
  const currentContacts = await contacts.listContacts();
  console.log("Lista actual de contactos:", currentContacts);
}

async function handleRemoveCommand(argv) {
  try {
    const contactId = argv.id;
    await contacts.removeContact(contactId);
    console.log("Contacto eliminado por ID:", contactId);
  } catch (error) {
    console.error("Error al eliminar el contacto por ID:", error.message);
  }
}

const argv = yargs
  .usage("$0 <command> [options]")
  .command({
    command: "list",
    describe: "List all contacts",
    handler: () => {
      handleListCommand();
    },
  })
  .command({
    command: "get <id>",
    describe: "Get contact by ID",
    handler: async (argv) => {
      const foundContact = await contacts.getContactById(argv.id);
      console.log("Contacto encontrado por ID:", foundContact);
    },
  })
  .command({
    command: "add",
    describe: "Add a new contact",
    builder: {
      name: {
        describe: "Name of the contact",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email of the contact",
        demandOption: true,
        type: "string",
      },
      phone: {
        describe: "Phone number of the contact",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      const newContact = {
        name: argv.name,
        email: argv.email,
        phone: argv.phone,
      };
      contacts.addContact(newContact);
      console.log("Nuevo contacto añadido:", newContact);
    },
  })
  .command({
    command: "remove <id>",
    describe: "Remove contact by ID",
    builder: {
      id: {
        describe: "ID of the contact to remove",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      handleRemoveCommand(argv);
    },
  })

  .help().argv;

if (process.argv.length <= 2) {
  app.startServer();
}
