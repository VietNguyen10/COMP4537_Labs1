/**
 * Implementation referece:
 * ChatGPT
 * W3School
 * MDN
 * YouTube
 */
class Note{
    constructor(noteManager, key, conteneditable) {
        this.noteManager = noteManager;
        this.key = key;
        this.note_wrapper = document.createElement("div");
        this.note_wrapper.id = "note_wrapper";
        this.note_area = document.createElement("p");
        this.note_area.contentEditable = conteneditable;
        this.note_area.id = "note_area";
        this.note_area.innerHTML = "";
        this.note_area.addEventListener("input", () => {
            // Clear any existing timeout
            clearTimeout(this.saveTimeout);
        
            // Set a new timeout for 2 seconds (2000 milliseconds)
            this.saveTimeout = setTimeout(() => {
                this.noteManager.updateArray(this.key, this.note_area.innerHTML);
                this.noteManager.updateLocalStorage();
            }, 1000);
        });
        
        // Additionally, you may want to handle the blur event to clear the timeout
        this.note_area.addEventListener("blur", () => {
            clearTimeout(this.saveTimeout);
        });

        this.note_wrapper.appendChild(this.note_area);

        if(conteneditable) {
            this.remove_button = document.createElement("button");
            this.remove_button.textContent = "remove";
            this.remove_button.id = "remove_button";
            this.remove_button.addEventListener("click", () => {
                noteManager.deleteNotes(this.key);
                this.note_wrapper.remove();
            });
            this.note_wrapper.appendChild(this.remove_button);
        }
    }

    getContent() {
        if(this.note_area.innerHTML === "") {
            return "";
        }else {
            return this.note_area.innerHTML;
        }
    }

    updateContent(newContent) {
        this.note_area.innerText = newContent;
    }

    getKey() {
        return this.key;
    }

    getManager() {
        return this.noteManager;
    }
    getElement(){
        return this.note_wrapper;
    }
}