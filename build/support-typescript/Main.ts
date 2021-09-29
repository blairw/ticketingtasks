$(function () {
	DataHelper.retrieveItemsFromLocalStorage();
	LHSMenuController.refreshMainMenu();

	// Enable this if you need animated #anchor links
	// AnimationController.smoothScrollLinks();

	$("#NewCaseNoteButton").on("click", function () {
		let newCaseNoteTitle = $("#NewCaseNoteTextArea").val().toString();

		DataHelper.globalCurrentSelectedItem.addCaseNote(newCaseNoteTitle);

		$("#NewCaseNoteTextArea").val("");
	});

	$("#NewTaskButton").on("click", function () {
		let newTaskTitle = $("#NewTaskText").val().toString();

		let tt: TaskTicket = new TaskTicket(newTaskTitle);
		DataHelper.addNewItem(tt);
		$("#NewTaskText").val("");

		LHSMenuController.refreshMainMenu();
		RHSContentController.moveToMenuItemByID(tt.id);
	});



	let keyTrackers = {
		"#NewCaseNoteTextArea": "#NewCaseNoteButton",
		"#NewTaskText": "#NewTaskButton"
	};

	$.each(keyTrackers, function(myTextarea, myButton) {
		$(myTextarea).on("keyup", function () {
			let textEntered = <string>$(myTextarea).val();
			if (textEntered.length > 2) {
				$(myButton).removeClass("is-disabled");
			} else {
				$(myButton).addClass("is-disabled");
			}
		});
	});

});