function bodyDidLoad() {
	// TypeScript start-up
	Main.main();

	// Put stuff here if you need it to load outside of TypeScript system.
}

function vanillaJS_exportAndDeleteCompletedTickets() {
	var nativeObject = DataHelper.deleteAndReturnCompletedItems();
	vanillaJS_saveToJSONFile(nativeObject);
}

function vanillaJS_saveToJSONFile(nativeObject) {
	var jsonString = JSON.stringify(nativeObject);
	var newDate = new Date();
	var newDateString = newDate.toISOString();
	newDateString = newDateString.replace(":", "");
	newDateString = newDateString.replace(".", "");
	
	var blob = new Blob([jsonString], {type: "text/plain;charset=utf-8"});
	var filename = newDateString + ".ticketingtasks.json";
	saveAs(blob, filename);
}

