// menu buttons
const newFolderBtn = document.getElementById("newFolderBtn");
const settingBtn = document.getElementById("settingBtn");
const selectBtn = document.getElementById("selectBtn");
const trashBinBtn = document.getElementById("trashBinBtn");
const editNoteBtn = document.getElementById("editNoteBtn");
const searchBtn = document.getElementById("searchBtn");

// big area
const main = document.querySelector("main");
const folderArea = document.getElementById("folderArea");
const listArea = document.getElementById("listArea");
const textArea = document.getElementById("textArea");


// detail select
const folder = document.querySelector('.folderItem');
const darkThemeBtn = document.getElementById("darkThemeBtn");
const autoDateTime = document.getElementById("autoDateTime");

// folder Items
const newFolder = document.getElementById("newFolder");
const folderItems = document.getElementById('folderItems');
const folderItem = document.getElementsByClassName('folderItem');

// listItems
const listItems = document.getElementById('listItems');

// Note CRUD select
const noteTitle = document.getElementById('noteTitle');
const mainNote = document.getElementById('mainNote');
const submitBtn = document.getElementById('submitBtn');

// create db

if (!window.indexedDB) {
	window.alert("this browser doesn't support indexedDB");
}

let db;

let dbReq = indexedDB.open("MOMO", 1);

dbReq.onerror = function(event) {
	alert('database error: ' + event.target.errorCode);
}

dbReq.onsuccess = function(event) {
	let db = dbReq.result;
}

dbReq.onupgradeneeded = function(event) {
	let db = dbReq.result;

	let folderStore = db.createObjectStore("folders", {keyPath:"id", autoIncrement:true});
	let noteStore = db.createObjectStore("notes", {keyPath:"id", autoIncrement:true});

	noteStore.createIndex("folderName", "folderName", {unique: false});
	
}

// create new folder

newFolderBtn.addEventListener('click', () => {
	newFolder.innerHTML = `
		<div class="folderItem" onkeydown="inputFolderName()">
		<i class="fa-solid fa-folder"></i>
		<input type="text" id="folderName">
		</div>
		`;
	newFolder.onload = () => {
		let folderName = document.getElementById("folderName");
	}
	if(newFolder.style.visibility = "hidden"){
		newFolder.style.visibility = "visible";
	}
});

// submit folder with Enter key


let inputFolderName = () => {
	if (event.key === 'Enter'){
		acceptFolder();

		newFolder.style.visibility = "hidden";
	}
}

// accept folder data


let acceptFolder = () => {

	let request = window.indexedDB.open('MOMO', 1);
	request.onerror = (event) => {
		alert('Database error', event.target.errorCode);
	}
		
	request.onsuccess = (event) => {
		let db = request.result;
		let transaction = db.transaction(['folders'], 'readwrite');

		transaction.oncomplete = (event) => {
			console.log('success');
		}
		transaction.onerror = (event) => {
			console.log('failed');
		}

		let objStore = transaction.objectStore('folders');


		let addReq = objStore.add({
			folderName: folderName.value
		})
	}

	createFolder();
};

// create folder view

let createFolder = () => {

	let request = window.indexedDB.open('MOMO', 1);
	request.onerror = (event) => {
		alert('Database error', event.target.errorCode);
	}

	request.onsuccess = (event) => {
		let db = request.result;
		let transaction = db.transaction(['folders'], 'readonly');
		transaction.onerror = (event) => {console.log('error')};
		transaction.oncomplete = (event) => {console.log('success')};

		let objStore = transaction.objectStore('folders');
		let cursorReq = objStore.openCursor();

		folderItems.innerHTML = "";

		cursorReq.onsuccess = (event) => {
			let cursor = event.target.result;

			if(cursor){
				let value = objStore.get(cursor.key);

				value.onsuccess = (event) => {
					console.log(event.target.result);
					return(folderItems.innerHTML += `
						<div class="folderItem" onclick="loadFolder(this)" id=${value.result.folderName}>
							<i class="fa-solid fa-folder"></i>
							<span class="folderName">${value.result.folderName}</span>
							<div class="numberOfNotes"></div>
						</div>
					`);
				}
				cursor.continue();
			}
		}
	}
};

let loadFolder = (event) => {
	main.setAttribute('id', event.id);
	createFolder();
	createNote();
}

//restore the folder when you refresh the page

(() => {
	createFolder();
})();

// form validation

submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
	console.log("button clicked");

	formValidation();
});

let formValidation = () => {
	if (noteTitle.value === ""){
		autoDateTime.innerHTML = "post cannot be blank";
		console.log("failure");
	} else {
			if (textId.id !== "" && listItems.childElementCount !== 0) {
				updateNote();
			} else {
				acceptData();
			}
		}
	};


// accept data

let acceptData = () => {

	let request = window.indexedDB.open('MOMO', 1);
	request.onerror = (event) => {
		alert('Database error', event.target.errroCode);
	}
	request.onsuccess = (event) => {
		let db = request.result;
		let transaction = db.transaction(['notes'], 'readwrite');

		transaction.oncomplete = (event) => {
			console.log('success');
		}
		transaction.onerror = (event) => {
			console.log('failed');
		}
		let objStore = transaction.objectStore('notes');

		let addReq = objStore.add({
			date: autoDateTime.innerHTML,
			title: noteTitle.value,
			main: mainNote.value,
			folderName: main.id
		})
	}
	createNote();
};

// create note

let createNote = () => {

	let request = window.indexedDB.open('MOMO', 1);
	request.onerror = (event) => {
		alert('Database error', event.target.errorCode);
	}

	request.onsuccess = (event) => {
		let db = request.result;
		let transaction = db.transaction(['notes'], 'readonly');
		transaction.onerror = (event) => {console.log('error')};
		transaction.oncomplete = (event) => {console.log('success')};

		let objStore = transaction.objectStore('notes');

		let folderNameIndex = objStore.index('folderName');
		let keyRng = IDBKeyRange.only(main.id);

		listItems.innerHTML = "";

		folderNameIndex.openCursor(keyRng).onsuccess = function(event) {
			let cursor = event.target.result;

			if(cursor){
				let value = objStore.get(cursor.key);

				value.onsuccess = (event) => {
					return (listItems.innerHTML += `
						<div class="listItem" id=${cursor.value.id}>
						<div onclick="loadNote(this)">
						<div class="title">${cursor.value.title}</div>
						<div class="textContents">${cursor.value.main}</div>
						<span class="editDate">${cursor.value.date}</span>
						</div>
						<span class="folderItem"><i class="fa-solid fa-folder"></i>${cursor.key}</span>
						<i class="fa-solid fa-delete-left" onclick="deleteNote(this)"></i>
						</div>
						`);
				}
				cursor.continue();
			}

		}
	}
	//resetForm();
};

// after user input, reset the text field

let resetForm = () => {
	noteTitle.value = '';
	mainNote.value = '';
	textId.id = '';
}

// delete note

let deleteNote = (event) => {

	let request = window.indexedDB.open('MOMO', 1);
	request.onerror = (event) => {
		console.log(event.target.errorCode);
	}

	request.onsuccess = () => {
		let db = request.result;
		let transaction = db.transaction('notes', 'readwrite');
		transaction.onerror = (event) => {console.log('failed')};
		transaction.oncomplete = (event) => {console.log('success')};
		
		let objStore = transaction.objectStore('notes');
		let deleteReq = objStore.delete(Number(event.parentElement.id));
		deleteReq.onsuccess = (event) => {
			console.log('deleted');
		}
	}

	createNote();
};

// load note

let textId = document.getElementsByClassName("textId")[0];


let loadNote = (e) => {
	noteTitle.value = e.childNodes[1].innerHTML;
	mainNote.value = e.childNodes[3].innerHTML;
	textId.setAttribute('id', e.parentElement.id);
	console.log(e.parentElement.id);
};

// restore the note when you refresh the page

(() => {
	createNote();
})();

// update note

const listItem = document.getElementsByClassName("listItem");

let updateNote = () => {

	let request = window.indexedDB.open('MOMO', 1);
	request.onerror = (event) => {
		alert('Database error', event.target.errorCode);
	}

	request.onsuccess = (event) => {
		let db = request.result;
		let transaction = db.transaction(['notes'], 'readwrite');
		transaction.onerror = (event) => {console.log('failed')};
		transaction.oncomplete = (event) => {console.log('success')};

		let objStore = transaction.objectStore('notes');
		let objStoreReq = objStore.get(Number(textId.id));

		objStoreReq.onsuccess = (event) => {
			let noteData = objStoreReq.result;

			noteData.date = autoDateTime.innerHTML;
			noteData.title = noteTitle.value;
			noteData.main = mainNote.value;

			let updateNoteReq = objStore.put(noteData);
			
			updateNoteReq.onerror = (event) => {
				console.log('update error');
			};
			updateNoteReq.onsuccess = (event) => {
				console.log('update success');
			};
		};
	};

	createNote();

}


// change focus to mainNote with enter

noteTitle.addEventListener('keypress', ({ key }) => {
	if (key == 'Enter') {
		mainNote.focus();
	};
});

// focus on the text edit erea and reset the form
editNoteBtn.addEventListener('click', () => { 
	noteTitle.focus();
	resetForm();
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
settingBtn.addEventListener('click', () => {
	const settingContent = document.querySelector('.settingContent');
	if ( settingContent.style.display === "none" ){
		settingContent.style.display = "block";
	} else {
		settingContent.style.display = "none";
	}
});

// dark mode change
document.addEventListener("DOMContentLoaded", function(event) {
	document.documentElement.setAttribute("data-theme", "light");
	
	darkThemeBtn.onclick = function() {
		let currentTheme = document.documentElement.getAttribute("data-theme");

		let switchTheme = currentTheme === "dark" ? "light" : "dark"

		document.documentElement.setAttribute("data-theme", switchTheme);
	}
});
