const newdate = new Date();
const userData = [];

function createNoteButton(userTitle, userNote) {
    const newButton = document.createElement("div");
    const newTitle = document.createElement("p");
    const newNote = document.createElement("p");
    newTitle.textContent = `${userTitle.slice(0, 10)}...`;
    newNote.textContent = `${userNote.slice(0, 10)}...`;
    newButton.append(newTitle, newNote);
    newButton.classList.add("note-button", "cursor-pointer");
    return newButton;
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