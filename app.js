const yargs = require("yargs");
const notes = require("./notes.js");

// todo: create add, remove, list, read commands:-

// add command
yargs.command({
    command : "add",
    describe : "addition of notes",
    builder: {
        title: {
            describe: "title of the note",
            demandOption: true,  // it makes compulsory to add given builder option
            type: "string",
        },
        body: {
            describe: "body of the note",
            demandOption: true,  // it makes compulsory to add given builder option
            type: "string",
        },
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    },
});

// remove command
yargs.command({
    command : "remove",
    describe : "removing the notes",
    builder: {
        title: {
            describe: "title of the note",
            demandOption: true, // it makes compulsory to add given builder option
            type: "string",
        }
    },       
    handler(argv) {
        notes.removeNote(argv.title);
    }
});

// list command
yargs.command({
    command : "list",
    describe : "list all the notes :)",
    handler() {
        notes.listNotes();
    },
});

// read command
yargs.command({
    command : "read",
    describe : "description",
    builder: {
        title: {
            describe: "title of the note",
            demandOption: true,  // it makes compulsory to add given builder option
            type: "string",
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
});

// console.log(yargs.argv);
yargs.parse();
