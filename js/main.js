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
		updateNote();
	}
};


// accept data

let data = [];

let acceptData = () => {
	data.push({
		date: autoDateTime.innerHTML,
		title: noteTitle.value,
		main: mainNote.value,

	});
	console.log(data);

	localStorage.setItem("data", JSON.stringify(data));

	createNote();
};

// create note

let createNote = () => {
	listItems.innerHTML = "";
	data.map((x, y) => {
		return (listItems.innerHTML += `
			<div class="listItem" id=${y}>
				<div onclick="loadNote(this)">
					<div class="title">${x.title}</div>
					<div class="textContents">${x.main}</div>
					<span class="editDate">${x.date}</span>
				</div>
				<span class="folderItem"><i class="fa-solid fa-folder"></i>foldername</span>
				<i class="fa-solid fa-delete-left" onclick="deleteNote(this)"></i>
			</div>

			`);
	});

	resetForm();
};

// after user input, reset the text field

let resetForm = () => {
	noteTitle.value = '';
	mainNote.value = '';
}

// delete note

let deleteNote = (e) => {
	e.parentElement.remove();

	data.splice(e.parentElement.id, 1);

	localStorage.setItem("data", JSON.stringify(data));

	resetForm();

	console.log(data);

};

// load note

const textId = document.getElementsByClassName("textId")[0];


let loadNote = (e) => {
	noteTitle.value = e.childNodes[1].innerHTML;
	mainNote.value = e.childNodes[3].innerHTML;
	textId.setAttribute('id', e.parentElement.id);
	console.log(e.parentElement.id);
};

// restore the note when you refresh the page

(() => {
	data = JSON.parse(localStorage.getItem("data")) || [];
	console.log(data);
	createNote();
})();

// update note

const listItem = document.getElementsByClassName('listItem');

let listItemId = [];
let updateNote = () => {


	for (let i = 1; i <= listItem.length + 1; i += 2) {
		listItemId.push(listItems.childNodes[i].id);
	}
	console.log(listItems);
	console.log(listItems.childNodes[1].id);
	console.log(listItem.length);
	console.log(listItemId);

	if ( listItemId.includes(textId.id) ){
		deleteSameNote();
	} else {
		console.log('dont have id');
	}

};

let deleteSameNote = () => {
	for (let i = 1; i < listItem.length * 2; i += 2) {
		if ( textId.id === listItems.childNodes[i].id ) {
			listItems.removeChild(listItems.childNodes[i]);
			data.splice(listItems.childNodes[i], 1);
			localStorage.setItem("data", JSON.stringify(data));
			listItemId.splice(listItems.childNodes[i].id, 1);
			textId.setAttribute('id', '');
		};
	};
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

// auto date and time

let getTime = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const days = String(date.getDate()).padStart(2, "0");
	const hour = String(date.getHours()).padStart(2, "0");
	const minute = String(date.getMinutes()).padStart(2, "0");
	const second = String(date.getSeconds()).padStart(2, "0");
	autoDateTime.innerHTML = `${year}/${month}/${days}/ ${hour}:${minute}:${second}`
};

getTime();
setInterval(getTime, 1000);

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

