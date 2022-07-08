const newFolderButton = document.getElementById("newFolderButton");
const settingButton = document.getElementById("settingButton");
const selectButton = document.getElementById("selectButton");
const trashBinButton = document.getElementById("trashBinButton");
const editNoteButton = document.getElementById("editNoteButton");
const fontSettingButton = document.getElementById("fontSettingButton");
const imageButton = document.getElementById("imageButton");
const shareButton = document.getElementById("shareButton");
const searchButton = document.getElementById("searchButton");

const folderArea = document.getElementsByClassName("folderArea");
const listArea = document.getElementsByClassName("listArea");
const textArea = document.getElementsByClassName("textArea");

newFolderButton.addEventListener("click", () => {alert("New Folder")});

editNoteButton.addEventListener('click', () => { 
	document.getElementById('textInput').focus();
});


