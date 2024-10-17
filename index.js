const newdate = new Date();
const userData = [];

function createNoteButton(userTitle, userNote) {
    const noteBG = document.createElement("div");
    const newButton = document.createElement("div");
    const newTitle = document.createElement("p");
    const newNote = document.createElement("p");
    newTitle.textContent = `${userTitle.slice(0, 10)}...`;
    newNote.textContent = `${userNote.slice(0, 10)}...`;
    newButton.append(newTitle, newNote);
    newButton.classList.add("note-button", "cursor-pointer");
    noteBG.append(newButton);
    noteBG.classList.add("note-bg");

    // trigger when user click noteBG or any of its child
    noteBG.addEventListener("click", (ev) => {

        // if the note already open then close
        if (noteBG.classList.contains("note-bg-active")) {

            // close only when user click the outer area of note (noteBG) not the note itself (newButton and its childs)
            if (ev.target.classList.contains("note-bg")) {
                noteBG.classList.remove("note-bg-active");
                newButton.classList.remove("note-button-active");
                newButton.classList.add("cursor-pointer");
                newTitle.textContent = `${userTitle.slice(0, 10)}...`;
                newNote.textContent = `${userNote.slice(0, 10)}...`;
                newTitle.classList.remove("note-title-p");
                newNote.classList.remove("note-p");
            }

        // open the note
        } else {
            noteBG.classList.add("note-bg-active");
            newButton.classList.add("note-button-active");
            newButton.classList.remove("cursor-pointer");
            newTitle.textContent = userTitle;
            newNote.textContent = userNote;
            newTitle.classList.add("note-title-p");
            newNote.classList.add("note-p");
        }
    })
    return noteBG;
}

document.querySelector(".footer").textContent = `copyright ${String.fromCodePoint("0x00A9")} ${newdate.getFullYear()}`;

// when adding a new note i do not read the userData[] only push the new data and append the newButton Element.
document.querySelector("form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const userTitle = document.querySelector("#user-input-title").value;
    const userNote = document.querySelector("#user-input-note").value;
    userData.push({userTitle, userNote});
    const newButton = createNoteButton(userTitle, userNote);
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