const saveButton = document.getElementById("save-button");
const body = document.getElementById("body");
const listeHtml = document.getElementById("liste");

saveButton.addEventListener("click", () => {
    const noteInput = document.getElementById("note-input");
    const note = noteInput.value;
    console.log(note)
    console.log(window.electronAPI.saveNote(note));
})

window.addEventListener("load",function () {
    let liste = window.electronAPI.getNotes();
    console.log(liste)
})

listeHtml.innerHTML += "<h3>Oui</h3>"

liste.map((element) => (
    listeHtml.innerHTML += "<h3 id='element'>"+{element}+"</h3>"
));

