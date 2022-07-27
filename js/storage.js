let sqlite3 = require('sqlite3');
let db;

new sqlite3.Database('./MOMO.db', sqlite3.OPEN_READWRITE, (err) => {
	if (err && err.code == "SQLITE_CANTOPEN") {
		createDatabase();
		return;
	} else if (err) {
		console.log("Getting error " + err);
		exit(1);
	}
	runQueries(db);
});

function createDatabase() {
	let newdb = new sqlite3.Database('MOMO.db', (err) => {
		if (err) {
			console.log("Getting error " + err);
			exit(1);
		}
		createTables(newdb);
	})
}

function createTables(newdb) {
	newdb.exec(`
		create table folder (
			folderName text not null,
			folderIndex int not null
		);
		insert into folder (folderName, folderIndex)
			values("normal", 1),
						("folder1", 2),
						("folder2", 3);
		create table Notes (
			date blob,
			title text,
			main text,
			noteIndex int
		);
		insert into Notes (date, title, main ,noteIndex)
			values("monday", "note1", "hello", 1),
						("sunday", "note2", "my friend", 2),
						("friday", "note3", "tommy", 3);
		`), () => {
			runQueries(newdb);
		}
}

function runQueries(db) {
	db.all(`
		select folderName, folderIndex from folder
		where folderName = ?`, "normal", (err, rows) => {
			rows.forEach(row => {
				console.log(row.folderName);
			})
		})
}
