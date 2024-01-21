window.userMessage = user_message;
/**
 * Implementation referece:
 * ChatGPT
 * W3School
 * MDN
 * YouTube
 */
class NoteManager {
    constructor () {
        this.noteList = []
        this.loadFromLocalStorage();
        this.isupdate = false;  
        this.time = document.getElementById("time");


        // Check if the URL contains "reader.html"
        if (window.location.href.includes("reader.html")) {
            this.displayReaderNotes();
        } else {
            const addButton = document.getElementById("add-note-button");
            addButton.addEventListener("click", () => {
                this.addNote(true);
            });
            this.displayWriterNotes();
        }
    }
      
    addNote(isEditable) {
        const addbutton = document.getElementById("add-note-button"); 
        const key = this.createUniqueKey();
        let newNote = new Note(this, `note${key}`, isEditable);
        this.isupdate = true;
        this.noteList.push(newNote);
        document.getElementById("writer-content-container").insertBefore(newNote.getElement(), addbutton);
        this.updateLocalStorage()
    }

    deleteNotes(key) {
        const noteIndex = this.noteList.findIndex(note => note.getKey() === key);

        if (noteIndex !== -1) {
            localStorage.removeItem(key);
            this.noteList.splice(noteIndex, 1);
            this.isupdate = true;
            this.updateLocalStorage();
        }
    }

    displayWriterNotes() {
        const addbutton = document.getElementById("add-note-button");
        const contentContainer = document.getElementById("writer-content-container");

        for (let i = 0; i < this.noteList.length; i++) {
            const key = this.noteList[i].getKey();
            const content = this.noteList[i].getContent();

            let newNote = new Note(this, key, true); // Display in the writer HTML
            newNote.updateContent(content);
            contentContainer.insertBefore(newNote.getElement(), addbutton);
        }
    }

    displayReaderNotes() {
        const readOnlyContent = document.getElementById("reader-content-container");

        for (let i = 0; i < this.noteList.length; i++) {
            const key = this.noteList[i].getKey();
            const content = this.noteList[i].getContent();

            let newNote = new Note(this, key, false); // Display in the reader HTML
            newNote.updateContent(content);
            readOnlyContent.appendChild(newNote.getElement());
        }
    }

    updateLocalStorage() {
        if(this.isupdate){
            localStorage.setItem("time", JSON.stringify(this.getCurrentTime()));
            this.isupdate = false;
        }

        const serializedNotes = this.noteList.map(note => ({
            key: note.getKey(),
            content: note.getContent(),
        }));
        if (window.location.href.includes("reader.html")) {
            time.innerHTML = userMessage.UPDATE_TIME + localStorage.getItem("time");
        } else {
            time.innerHTML = userMessage.STORED_TIME + localStorage.getItem("time");
        }
        localStorage.setItem('noteList', JSON.stringify(serializedNotes));
    }

    loadFromLocalStorage() {

        const storedData = localStorage.getItem('noteList');
        if (storedData) {
            const serializedNotes = JSON.parse(storedData);
            this.noteList = serializedNotes.map(noteData => {
                const newNote = new Note(this, noteData.key, true);
                newNote.updateContent(noteData.content);
                return newNote;
            });
        }

        if (window.location.href.includes("reader.html")) {
            time.innerHTML = userMessage.UPDATE_TIME + localStorage.getItem("time");
        } else {
            time.innerHTML = userMessage.STORED_TIME + localStorage.getItem("time");
        }
    }

    createUniqueKey() {
        return new Date().getTime();
    }

    getCurrentTime() {
        const now = new Date();
    
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Convert to 12-hour format
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
    
        // Add leading zero if needed
        const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    
        const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}${ampm}`;
    
        return formattedTime;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const noteManager = new NoteManager();
});
