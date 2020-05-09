const fs = require('fs');
const chalk = require('chalk');

function getNotes() {
    return "Your Notes...";
}

const addNote = (title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find((note) => note.title === title);

    debugger

    if (!duplicateNote) {
        notes.push({
            'title': title,
            'body': body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('saved'));
    } else {
        console.log(chalk.red.inverse('failed'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter((note) => note.title !== title);
    if (notes.length > filteredNotes.length) {
        console.log(chalk.green.inverse("Note removed"));
        saveNotes(filteredNotes);
    } else {
        console.log(chalk.red.inverse('No note found'));
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        // console.log(e);
        return [];
    }

}

const readNotes = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if (note) {
        console.log(chalk.green.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('No note found'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green.inverse('Your Notes'));
    const print = notes.forEach(note => {
        console.log(chalk.blue(note.title));
    });
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

module.exports.getNotes = getNotes();
module.exports.addNote = addNote;
module.exports.removeNote = removeNote;
module.exports.listNotes = listNotes;
module.exports.readNotes = readNotes;