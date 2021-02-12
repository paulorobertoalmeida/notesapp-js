"use strict"

const titleElement = document.querySelector("#note-title");
const titleElement = document.querySelector("#time-stamp");
const titleElement = document.querySelector("#note-body");
const noteId = location.hash.substr(1);
let notes = getSaveNotes();
let notes = notes.find( (note) => note.id === noteId);

if (!note){
    location.assign("./../index.html");

}

timeElement.textContent = generateLastEdited(note.updatedAt);
titleElement.value = note.title;
bodyElement.value = note.body;

titleElement.addEventListener("input", () = > {
    note.title = titleElement.value;
    note.updatedAt = moment().valueOf;
    timeElement.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
})