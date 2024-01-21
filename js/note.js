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
        this.note_area.addEventListener("input", () => {
            this.noteManager.updateLocalStorage();
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
        if(this.note_area.innerHTML == null) {
            return "";
        }else {
            return this.note_area.innerHTML ;
        }
    }

    updateContent(newContent) {
        this.note_area.innerHTML = this.note_area.innerHTML.concat(newContent);
    }

    getKey() {
        return this.key;
    }

    getElement(){
        return this.note_wrapper;
    }
}