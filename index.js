const newdate = new Date();
const userData = [];

function createNoteButton(index) {
    const noteBG = document.createElement("div");
    const newButton = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const saveBtn = document.createElement("button");
    const newTitle = document.createElement("p");
    const editTitle = document.createElement("input");
    const newNote = document.createElement("p");
    const editNote = document.createElement("textarea");

    function showToEditDisplayTransition() {
        newButton.classList.add("note-button-edit");
        
        // hiding:
        editBtn.classList.add("hide");
        deleteBtn.classList.add("hide");
        newTitle.classList.add("hide");
        newNote.classList.add("hide");
        
        // showing:
        saveBtn.classList.remove("hide");
        editTitle.classList.remove("hide");
        editNote.classList.remove("hide");
    }
    function editToShowDisplayTransition() {
        newButton.classList.remove("note-button-edit");

        // update current newTitle & newNote. this is where React would do better
        newTitle.textContent = userData[index].userTitle;
        newNote.textContent = userData[index].userNote;

        // hiding:
        saveBtn.classList.add("hide");
        editTitle.classList.add("hide");
        editNote.classList.add("hide");

        // showing:
        editBtn.classList.remove("hide");
        deleteBtn.classList.remove("hide");
        newTitle.classList.remove("hide");
        newNote.classList.remove("hide");
    }

    // adding classes, text, and append all in order
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-button", "hide");
    saveBtn.textContent = "Save";
    saveBtn.classList.add("save-button", "hide");
    newTitle.textContent = `${userData[index].userTitle.slice(0, 10)}...`;
    newNote.textContent = `${userData[index].userNote.slice(0, 10)}...`;
    editTitle.classList.add("edit-title-input", "hide");
    editTitle.value = userData[index].userTitle;
    editNote.classList.add("edit-note-input", "hide");
    editNote.value = userData[index].userNote;
    newButton.append(deleteBtn, editBtn, newTitle, editTitle, newNote, editNote, saveBtn);
    newButton.classList.add("note-button", "cursor-pointer");
    noteBG.append(newButton);
    noteBG.classList.add("note-bg");

    // trigger when user select a note (click noteBG or any of its child)
    noteBG.addEventListener("click", (ev) => {

        // if the note already open then close
        if (noteBG.classList.contains("note-bg-active")) {

            // close only when user click the outer area of note (noteBG) not the note itself (newButton and its childs)
            if (ev.target.classList.contains("note-bg")) {

                // if user exit edit mode without saving
                if (!saveBtn.classList.contains("hide")) {
                    editToShowDisplayTransition();
                }
                noteBG.classList.remove("note-bg-active");
                newButton.classList.remove("note-button-active");
                newButton.classList.add("cursor-pointer");
                newTitle.textContent = `${userData[index].userTitle.slice(0, 10)}...`;
                newNote.textContent = `${userData[index].userNote.slice(0, 10)}...`;
                newTitle.classList.remove("note-title-p");
                newNote.classList.remove("note-p");
                editBtn.classList.add("hide");
            }

        // open the note
        } else {
            noteBG.classList.add("note-bg-active");
            newButton.classList.add("note-button-active");
            newButton.classList.remove("cursor-pointer");
            
            // i did not think this was possible...
            newTitle.textContent = userData[index].userTitle;
            newNote.textContent = userData[index].userNote;

            newTitle.classList.add("note-title-p");
            newNote.classList.add("note-p");
            editBtn.classList.remove("hide");
        }
    })

    // add edit feature
    editBtn.addEventListener("click", (ev) => {
        showToEditDisplayTransition();
    });
    
    saveBtn.addEventListener("click", (ev) => {
        
        // edit userData[]
        userData[index] = {
            userTitle: editTitle.value,
            userNote: editNote.value
        }
        editToShowDisplayTransition();
    });

    return noteBG;
}

document.querySelector(".footer").textContent = `copyright ${String.fromCodePoint("0x00A9")} ${newdate.getFullYear()}`;

// when adding a new note i do not read the userData[] only push the new data and append the newButton Element.
document.querySelector("form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const userTitle = document.querySelector("#user-input-title").value;
    const userNote = document.querySelector("#user-input-note").value;
    userData.push({userTitle, userNote});
    const newButton = createNoteButton(userData.length - 1);
    document.querySelector(".notes").append(newButton);
});

// each time user type something in searchbar, filter userData[], remove all childs from .notes, createNoteButton from filtered userData[]
document.querySelector(".searchbar > input").addEventListener("input", (ev) => {
    console.log(ev.target.value);
    const reg = new RegExp(ev.target.value);
    const filtered = userData.filter((obj, i) => {
        console.log(obj.userTitle);
        if (obj.userTitle.match(reg)) {
            return true;
        } else if (obj.userNote.match(reg)) {
            return true;
        } else return false;
    });
    document.querySelector(".notes").innerHTML = "";
    filtered.forEach((obj, i) => {
        const newButton = createNoteButton(obj.userTitle, obj.userNote);
        document.querySelector(".notes").append(newButton);
    })
})