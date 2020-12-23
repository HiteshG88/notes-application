const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
    const notes = loadNotes();

    // create a sub-array to find duplicate items, and stop search when item found.
    const duplicateNote = notes.find(note => {
        return note.title === title;
    })

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green("New Note Added!!"));
    } else {
        console.log(chalk.yellow("Sorry Title Taken!!"));
    }
}


const removeNote = (title) => {
    const notes = loadNotes();

    // check if give note exist in our list.
    const currentNote = notes.filter(note => {
        return note.title === title;
    });

    // length can only be 1 or 0 as duplicate notes are not including
    // refer addNotes for this
    if (currentNote.length === 1) {
        const index = notes.indexOf(title);

        notes.splice(index,1);   // splice modifies the array in place and returns a new array containing the elements that have been removed. The second parameter of splice is the number of elements to remove

        saveNotes(notes);
        console.log(chalk.green("Removed Title: "+ title));
    } else {
        console.log(chalk.red("Given Title doesn't Exist!"));
    }
}


const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse("....YOUR NOTES...."))
    if (notes.length === 0) {
        console.log("[]");
    } else {
        notes.forEach(note => {
            console.log(chalk.blue("Title: "+ note.title));
        });
    }
}


const readNote = (title) => {
    const notes = loadNotes();
    const givenNote = notes.find(note => note.title === title);
    if (givenNote) {
        console.log(chalk.green("Title: "+title));
        console.log(chalk.cyan("Body: "+givenNote.body));
    } else {
        console.log(chalk.red("No node found for title: "+title));
    }
    
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json"); // buffered data
        const dataJSON = dataBuffer.toString(); // string data
        return JSON.parse(dataJSON); // parsed object data
    } catch (e) {
        return []; // if there are no notes, return empty list.
    }
}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes); // object data to string data
    fs.writeFileSync("notes.json",dataJSON);
}


// only these methods will be accessible to other file.
module.exports = {
    listNotes: listNotes,
    readNote: readNote,
    addNote: addNote,
    removeNote: removeNote
}
