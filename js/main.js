const newFolderButton = document.getElementById("newFolderButton");
const settingButton = document.getElementById("settingButton");
const selectButton = document.getElementById("selectButton");
const trashBinButton = document.getElementById("trashBinButton");
const editNoteButton = document.getElementById("editNoteButton");
const fontSettingButton = document.getElementById("fontSettingButton");
const imageButton = document.getElementById("imageButton");
const shareButton = document.getElementById("shareButton");
const searchButton = document.getElementById("searchButton");


const darkThemeButton = document.getElementById("darkThemeButton");

const folderArea = document.getElementsByClassName("folderArea");
const listArea = document.getElementsByClassName("listArea");
const textArea = document.getElementsByClassName("textArea");

newFolderButton.addEventListener("click", () => {alert("New Folder")});

//focus on the text edit erea
editNoteButton.addEventListener('click', () => { 
	document.getElementById('textBox').focus();
});

//pop-up menu
settingButton.addEventListener('click', () => {
	const settingContent = document.querySelector('.settingContent');
	if ( settingContent.style.display === "none" ){
		settingContent.style.display = "block";
	} else {
		settingContent.style.display = "none";
	}
});

fontSettingButton.addEventListener('click', () => {
	const fontContent = document.querySelector('.fontContent');
	if ( fontContent.style.display === "none" ){
		fontContent.style.display = "block";
	} else {
		fontContent.style.display = "none";
	}
});

shareButton.addEventListener('click', () => {
	const shareContent = document.querySelector('.shareContent');
	if ( shareContent.style.display === "none" ){
		shareContent.style.display = "block";
	} else {
		shareContent.style.display = "none";
	}
});

//dark mode change
document.addEventListener("DOMContentLoaded", function(event) {
	document.documentElement.setAttribute("data-theme", "light");
	
	darkThemeButton.onclick = function() {
		let currentTheme = document.documentElement.getAttribute("data-theme");

		let switchTheme = currentTheme === "dark" ? "light" : "dark"

		document.documentElement.setAttribute("data-theme", switchTheme);
	}
});
