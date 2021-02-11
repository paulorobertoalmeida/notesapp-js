"use strict"

const getSaveNotes = () => {
    const notesJSON = localStorage.getItem("notes");

    try{
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e){
        return [];
    }
}

const saveNotes = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
}
const removeNote = (id) => {
    const index = notes.findIndex((note) => note.id === id)

    if(index > -1) {
        notes.splice(index,1);
    }
}

const generateNoteDom = (note) => {
    const noteEl= document.createElement("a");
    const textEl= document.createElement("p");
    const statusEl= document.createElement("p");

    if (note.title.length > 0){
        textEl.textContent = note.title;
    } else {
        textEl.textContent = "Unnamed note";
    }
    textEl.classList.add("list-item__title")
    noteEl.appendChild(textEl);

    noteEl.setAttribute("href", "./edit.html#${note.id}")
    noteEl.classList.add("list-item")

    
}