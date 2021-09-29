class ToolbarController {
	public static dueDateDatePickerVisible = false;

	public static initialise() {
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

		$("#DueDateDatePicker").on("change", function() {
			$("#DueDateButton").removeClass("is-disabled");
		});

		let keyTrackers = {
			"#NewCaseNoteTextArea": "#NewCaseNoteButton",
			"#NewTaskText": "#NewTaskButton"
		};

		$.each(keyTrackers, function (myTextarea, myButton) {
			$(myTextarea).on("keyup", function () {
				let textEntered = <string>$(myTextarea).val();
				if (textEntered.length > 2) {
					$(myButton).removeClass("is-disabled");
				} else {
					$(myButton).addClass("is-disabled");
				}
			});
		});
	}
	public static userDidClickDueDateButton() {
		$("#DueDateDatePicker").animate({width:'toggle'}, 100);

		if (ToolbarController.dueDateDatePickerVisible) {
			// behaviour if due date picker visible
			let selectedDueDate = <string> $("#DueDateDatePicker").val();
			DataHelper.globalCurrentSelectedItem.setDueDate(selectedDueDate);

			$("#DueDateButton").removeClass("is-info");
			$("#DueDateButton").removeClass("is-disabled");
			$("#DueDateButton").html("🗓 due date");

		} else {
			// Adapted from https://stackoverflow.com/questions/596608/slide-right-to-left
			$("#DueDateButton").addClass("is-info");
			$("#DueDateButton").addClass("is-disabled");
			$("#DueDateButton").html("🗓 set due date");

			ToolbarController.dueDateDatePickerVisible = true;
		}
	}
}