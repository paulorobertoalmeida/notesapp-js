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

    statusEl.textContent = generateLastEdited(note.updateAt)
    statusEl.classList.add("list-item__subtitle")
    noteEl.appendChild(statusEl)

    return noteEl;
}

const sortNotes = (notes, sortBy) => {
    if (sortBy === "byEdited"){
        return notes.sort((a,b) => {
            if (a.updateAt > b.updateAt){
                return -1;
            } else if (a.updateAt < b.updateAt){
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === "byCreated") {
        return notes.sort( (a,b) => {
            if (a.createdAt > b.createdAt){
                return -1;
            } else if (a.createdAt < b.createdAt){
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === "alphabetical") {
        return notes.sort( (a,b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()){
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        return notes;
    }
}

const renderNotes = (notes, filters) => {
    const notesEl = document.querySelector("#notes")
    notes = sortNotes(notes, filters.sortBy);
    const filteredNotes = notes.filters.( (note) => {
        const title = note.title.toLowerCase();
        const filter = filters.searchText.toLowerCase();
        return title.includes(filter)
    })

    notesEl.innerHTML = "";

    if(filteredNotes.length > 0){
        filteredNotes.forEach( (note) => {
            const p = generateNoteDom(note);
            noteEl.appendChild(p);
        })
    } else {
        const emptyMessage = document.createElement("p")
        emptyMessage.textContent = "No notes to show"
        emptyMessage.classList.add("empty-message")
        notesEl.appendChild(emptyMessage)
    }
};
const generateLastEdited = (timestamp) => "Last edited ${moment(timestamp).fromNow()}";