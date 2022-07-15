// menu buttons
const newFolderButton = document.getElementById("newFolderButton");
const settingButton = document.getElementById("settingButton");
const selectButton = document.getElementById("selectButton");
const trashBinButton = document.getElementById("trashBinButton");
const editNoteButton = document.getElementById("editNoteButton");
const fontSettingButton = document.getElementById("fontSettingButton");
const imageButton = document.getElementById("imageButton");
const shareButton = document.getElementById("shareButton");
const searchButton = document.getElementById("searchButton");

// three big area
const folderArea = document.getElementsByClassName("folderArea");
const listArea = document.getElementsByClassName("listArea");
const textArea = document.getElementById("textArea");


// detail select
const folder = document.querySelector('.folderItem');
const darkThemeButton = document.getElementById("darkThemeButton");
const autoDateTime = document.getElementById("autoDateTime");

// CRUD select
const noteTitle = document.getElementById('noteTitle');
const mainNote = document.getElementById('mainNote');
const submitButton = document.getElementById('submitButton');

const listItems = document.getElementById('listItems');


// form validation

submitButton.addEventListener('click', (e) => {
	e.preventDefault();
	console.log("button clicked");

	formValidation();
});

let formValidation = () => {
	if (noteTitle.value === ""){
		autoDateTime.innerHTML = "post cannot be blank";
		console.log("failure");
	} else {
		acceptData();
	}
};


// accept data

let data = {};

let acceptData = () => {
	data["title"] = noteTitle.value;
	data["main"] = mainNote.value;
	console.log(data);

	createNote();
};

// create note

let createNote = () => {
	listItems.innerHTML += `
	<div class="listItem" onclick="editNote(this)">
		<div class="title">${data.title}</div>
			<div class="textContents">${data.main}</div>
			<span class="editDate">2022/07/08</span>
			<span class="folderItem"><i class="fa-solid fa-folder"></i>foldername</span>
			<i class="fa-solid fa-delete-left" onclick="deleteNote(this)"></i>
	</div>
	`;
};

// delete note

let deleteNote = (e) => {
	e.parentElement.remove();
};

// edit note

let editNote = (e) => {
	noteTitle.value = e.childNodes[1].innerHTML;
	mainNote.value = e.childNodes[3].innerHTML;
	e.remove();
};

// change focus to mainNote with enter

noteTitle.addEventListener('keydown', ({ key }) => {
	if (key == 'Enter') {
		mainNote.focus();
		};
	});


// focus on the text edit erea
editNoteButton.addEventListener('click', () => { 
	noteTitle.focus();
});

// pop-up menu
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

// dark mode change
document.addEventListener("DOMContentLoaded", function(event) {
	document.documentElement.setAttribute("data-theme", "light");
	
	darkThemeButton.onclick = function() {
		let currentTheme = document.documentElement.getAttribute("data-theme");

		let switchTheme = currentTheme === "dark" ? "light" : "dark"

		document.documentElement.setAttribute("data-theme", switchTheme);
	}
});

// create new folder

newFolderButton.addEventListener('click', () => {
	let div = document.createElement('div');

	div.innerHTML = document.querySelector('.folderItem').innerHTML;
	div.classList.add("folderItem");
	document.getElementById('folderItems').appendChild(div);
});

